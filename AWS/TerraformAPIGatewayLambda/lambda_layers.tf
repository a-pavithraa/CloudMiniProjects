module "lambda_layer_with_package_deploying_externally" {
  source = "terraform-aws-modules/lambda/aws"

  create_layer = true

  layer_name          = "${random_pet.this.id}-layer-local"
  description         = "My amazing lambda layer (deployed from local)"
  compatible_runtimes = ["nodejs14.x"]

  create_package         = false
  local_existing_package = "${path.module}/layers/nodejs.zip"

  ignore_source_code_hash = true
}

output "lambda_layer_arn" {
  value = module.lambda_layer_with_package_deploying_externally.lambda_layer_arn

}