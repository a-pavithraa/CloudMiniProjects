resource "aws_apigatewayv2_api" "apigateway" {
  name          = "${var.prefix}_api_gateway"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["*"]
    allow_headers = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "stage" {
  api_id = aws_apigatewayv2_api.apigateway.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

resource "aws_apigatewayv2_integration" "gateway_integration" {
  api_id = aws_apigatewayv2_api.apigateway.id

  integration_uri    = module.lambda_function_existing_package_local[each.key].lambda_function_invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
  for_each = {for i in local.combined_lambdas_list : i.function_name => i}
}


resource "aws_apigatewayv2_route" "routes" {
  api_id             = aws_apigatewayv2_api.apigateway.id 
  route_key = "${each.value.method} ${each.value.route}"
  target    = "integrations/${aws_apigatewayv2_integration.gateway_integration[each.key].id}"
  
  for_each = {for i in local.lambda_list : i.function_name => i}
}


resource "aws_apigatewayv2_route" "authenticated_routes" {
  api_id             = aws_apigatewayv2_api.apigateway.id
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.example.id

  route_key = "${each.value.method} ${each.value.route}"
  target    = "integrations/${aws_apigatewayv2_integration.gateway_integration[each.key].id}"
  
  for_each = {for i in local.authenticated_lambda_list : i.function_name => i}
  
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.apigateway.name}"

  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_function_existing_package_local[each.key].lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.apigateway.execution_arn}/*/*"
  for_each = {for i in local.combined_lambdas_list : i.function_name => i}
  depends_on = [
    module.lambda_function_existing_package_local
  ]
}

resource "aws_apigatewayv2_authorizer" "example" {
  api_id           = aws_apigatewayv2_api.apigateway.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "example-authorizer"

  jwt_configuration {
    audience = [var.cognito_client_id]
    issuer   = var.cognito_endpoint
  }
}


data "aws_route53_zone" "customdomain" {
  name = var.domain_name
}

module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  version     = "3.0.0"
  domain_name = trimsuffix(data.aws_route53_zone.customdomain.name, ".")
  zone_id     = data.aws_route53_zone.customdomain.zone_id
  subject_alternative_names = [
    "${var.prefix}.${var.domain_name}"
  ]

}

resource "aws_apigatewayv2_domain_name" "bookingapi" {
  domain_name = "${var.prefix}.${var.domain_name}"

  domain_name_configuration {
    certificate_arn = module.acm.acm_certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "r53apirecord" {
  name    = aws_apigatewayv2_domain_name.bookingapi.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.customdomain.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.bookingapi.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.bookingapi.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "example" {
  api_id      = aws_apigatewayv2_api.apigateway.id
  domain_name = aws_apigatewayv2_domain_name.bookingapi.id
  stage       = aws_apigatewayv2_stage.stage.id
}