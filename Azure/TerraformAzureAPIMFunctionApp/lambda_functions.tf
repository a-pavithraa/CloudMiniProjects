resource "azurerm_function_app" "functions" {
  name                       = "${var.prefix}-${var.environment}"
  location                   = var.location
  resource_group_name        = azurerm_resource_group.rg.name
  app_service_plan_id        = azurerm_app_service_plan.asp.id
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key
  storage_account_name       = azurerm_storage_account.storage.name
  version                    = "~3"

  app_settings = {
    https_only                               = true
    FUNCTIONS_EXTENSION_VERSION              = "~3"
    rapidapikey                              = var.rapidapi_key
    MONGODB_URL                              = var.mongodb_url
    MONGODB_DATABASE_NAME                    = var.mongodb_name
    MONGODB_COLLECTION_NAME                  = var.mongodb_container_name
    FUNCTIONS_WORKER_RUNTIME                 = "node"
    WEBSITE_CONTENTAZUREFILECONNECTIONSTRING = "${azurerm_storage_account.storage.primary_connection_string}"
    WEBSITE_CONTENTSHARE                     = "${azurerm_storage_account.storage.name}"
    HASH                                     = "${base64encode(filesha256("${path.module}/functioncode/Functions.zip"))}"
    WEBSITE_NODE_DEFAULT_VERSION             = "~14"
    WEBSITE_RUN_FROM_PACKAGE                 = "https://${azurerm_storage_account.storage.name}.blob.core.windows.net/${azurerm_storage_container.deployments.name}/${azurerm_storage_blob.appcode.name}${data.azurerm_storage_account_sas.example.sas}"
  }
}

output "fnhost" {
  value = azurerm_function_app.functions.default_hostname

}