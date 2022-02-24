module "dynamodb_table" {
  source   = "terraform-aws-modules/dynamodb-table/aws"
  name     = local.dynamodb_table_name
  hash_key = "username"

  attributes = [
    {
      name = "username"
      type = "S"
    }
  ]

  tags = local.common_tags
}