data "aws_route53_zone" "customdomain" {
  name = var.domain_name
}
/*data "aws_cloudfront_distribution" "cognitocf" {
  id = replace(module.aws_cognito_user_pool_complete_example.domain_cloudfront_distribution_arn, ".cloudfront.net", "")
}*/
resource "aws_route53_record" "cognito_dns" {
  zone_id = data.aws_route53_zone.customdomain.zone_id
  name    = var.custom_domain_name
  type    = "A"
  alias {
   
   name=module.aws_cognito_user_pool_complete_example.domain_cloudfront_distribution_arn
   //Specify Z2FDTNDATAQYW2. This is always the hosted zone ID when you create an alias record that routes traffic to a CloudFront distribution.
   //https://medium.com/@prity315/read-this-before-using-terraform-for-aws-cognito-a660bf1770d
   zone_id="Z2FDTNDATAQYW2"   
    evaluate_target_health = false
  }
}

output "cfarn"{
    value=replace(module.aws_cognito_user_pool_complete_example.domain_cloudfront_distribution_arn, ".cloudfront.net", "")
    
}
