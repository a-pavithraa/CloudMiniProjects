resource "azurerm_application_insights" "ai" {
  name                = "${var.prefix}appinsights"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  application_type    = "web"

}
# Create Logger
resource "azurerm_api_management_logger" "apimLogger" {
  name                = "${var.prefix}-logger"
  api_management_name = module.apim.name
  resource_group_name = azurerm_resource_group.rg.name

  application_insights {
    instrumentation_key = azurerm_application_insights.ai.instrumentation_key
  }
}