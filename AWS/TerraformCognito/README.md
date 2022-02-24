Create terraform.tfvars with the following entries:

custom_domain_name = Registered Domain Name

certificate_arn = ACM Certificate ARN

Refer this article on setting up Google as IDP and configure the following values:  https://aws.amazon.com/premiumsupport/knowledge-center/cognito-google-social-identity-provider/

google_client_id

google_client_secret

redirect_url

callback_url

logout_url