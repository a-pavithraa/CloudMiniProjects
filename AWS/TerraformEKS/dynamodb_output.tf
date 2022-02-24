output "dynamotable_arn" {
  description = "Dynamo table ARN"
  value       = module.dynamodb_table.dynamodb_table_arn
}

output "dynamotable_id" {
  description = "Dynamo table ID"
  value       = module.dynamodb_table.dynamodb_table_id
}