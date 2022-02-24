resource "azurerm_resource_group" "aksresgroup" {
  name     = "aks-resource-group"
  location = var.location
}