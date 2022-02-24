
module "apim" {
  source                  = "./apim"
  prefix                  = var.prefix
  resource_group_name     = azurerm_resource_group.rg.name
  resource_group_location = azurerm_resource_group.rg.location
  function_app_name       = azurerm_function_app.functions.name
  publisher_email         = var.publisher_email
  publisher_name          = var.publisher_name
  host_name               = azurerm_function_app.functions.default_hostname
  environment             = var.environment
  api_paths               = local.api_paths
  openid_url = var.openid_url
  depends_on = [
    azurerm_function_app.functions
  ]


}
