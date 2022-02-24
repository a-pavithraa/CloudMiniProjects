module "lambda_function_existing_package_local" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = each.key
  description   = "My awesome lambda function"
  handler       = "index.handler"
  runtime       = "nodejs14.x"
  publish       = true
  attach_policies    = true
  //policies        = [aws_iam_role_policy_attachment.lambda_dybnamodb_policy.policy_arn]
  attach_policy_json = each.value.dynamodbAccess
 policy_json        = templatefile("template/dynamodbpolicy.json", { dynamodb_table_name = "${module.dynamodb_table.dynamodb_table_arn}" })
  create_package         = false
  local_existing_package = "${path.module}/LambdaFunctionsArchive/${each.value.file_name}.zip"


  layers = [
    module.lambda_layer_with_package_deploying_externally.lambda_layer_arn

  ]
  environment_variables = {
    rapidapikey = "1c166ffaf2msh3d0fe1a1205694ap1ec782jsnf88e53ed8511"

  }
  
  for_each = {for i in local.combined_lambdas_list : i.function_name => i}
}

data "aws_iam_policy_document" "lambda-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com"
       
      ]
    }
  }
}



resource "aws_iam_role" "lambda_exec" {
  name = "${var.prefix}_lambda_exec_role"
  assume_role_policy = data.aws_iam_policy_document.lambda-assume-role-policy.json

  /**assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })*/
}

/*resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


resource "aws_iam_policy" "lambda_dybnamodb_policy" {
  name        = "lambda_dybnamodb_policy"
  description = "Policy to access dynamo db"
  policy=templatefile("template/dynamodbpolicy.json", { dynamodb_table_name = "${module.dynamodb_table.dynamodb_table_arn}" })
}


resource "aws_iam_role_policy_attachment" "lambda_dybnamodb_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_dybnamodb_policy.arn
}

*/


