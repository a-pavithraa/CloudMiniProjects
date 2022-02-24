/**resource "aws_ses_email_identity" "email_ses" {
  email = "a.pavithraa@gmail.com"
}
*/
module "aws_cognito_user_pool_complete_example" {

  source = "lgallard/cognito-user-pool/aws"

  user_pool_name             = "${var.prefix}_pool"
  alias_attributes           = ["email"]
  auto_verified_attributes   = ["email"] 

    email_configuration = {
    email_sending_account  = "DEVELOPER"
    reply_to_email_address = var.reply_to_email_address
    source_arn             = "arn:aws:ses:us-east-1:721541693596:identity/aravamudhan.pavithra@craneww.com"
  }

  lambda_config = {
  
   pre_sign_up                    = aws_lambda_function.presignup_cognito.arn
   
  }

  password_policy = {
    minimum_length                   = 10
    require_lowercase                = false
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 120

  }

  

   
  # identity_providers
  identity_providers = [
    {
      provider_name = "Google"
      provider_type = "Google"

      provider_details = {
        authorize_scopes = "email"
        client_id        = var.google_client_id
        client_secret    = var.google_client_secret
      }

      attribute_mapping = {
        email    = "email"
        username = "sub"
        gender   = "gender"
      }
    }
  ]


  # user_pool_domain
  domain = var.custom_domain_name
  domain_certificate_arn=var.certificate_arn
  admin_create_user_config_allow_admin_create_user_only =false

  # clients
  clients = [      
    {
      allowed_oauth_flows                  = ["code", "implicit"]
      allowed_oauth_flows_user_pool_client = true
      allowed_oauth_scopes                 = ["email", "openid","aws.cognito.signin.user.admin","profile"]
      callback_urls                        = [var.callback_url]
      default_redirect_uri                 = var.redirect_url
      explicit_auth_flows                  = ["ALLOW_CUSTOM_AUTH", "ALLOW_USER_SRP_AUTH","ALLOW_REFRESH_TOKEN_AUTH"]
      generate_secret                      = false
      logout_urls                          = [var.logout_url]
      name                                 = "travelserviceclient"      
      supported_identity_providers         = ["Google", "COGNITO"]     
      refresh_token_validity               = 30
    }

  ]

  

  

  # tags
  tags = {
    Owner       = "infra"
    Environment = "production"
    Terraform   = true
  }
}