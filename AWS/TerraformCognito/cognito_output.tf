output "client_pool_id"{
    description = "User Pool Id to be copied for authentication"
    value=module.aws_cognito_user_pool_complete_example.id
}

output "client_endpoint"{
    
    value=module.aws_cognito_user_pool_complete_example.endpoint
}
output "client_id" {
    value = module.aws_cognito_user_pool_complete_example.client_ids
  
}