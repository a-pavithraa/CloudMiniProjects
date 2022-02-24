data "azurerm_user_assigned_identity" "ingressid" {
  name                = "ingressapplicationgateway-${var.prefix}-aks"
  resource_group_name = module.aks.node_resource_group
  depends_on          = [module.aks, azurerm_role_assignment.aks_dns_role]
}


resource "azurerm_role_assignment" "aks_dns_role" {
  scope                = data.azurerm_resource_group.dnszone.id
  role_definition_name = data.azurerm_role_definition.contributor.name
  principal_id         = module.aks.kubelet_identity[0].object_id
}

resource "azurerm_role_assignment" "aks_network_role" {
  scope                = azurerm_resource_group.aksresgroup.id
  role_definition_name = data.azurerm_role_definition.contributor.name
  principal_id         = module.aks.kubelet_identity[0].object_id
}

//data "azurerm_subscription" "primary" {}
// dependency is added to postpone for rectifying the 
resource "azurerm_role_assignment" "aks_accessvnet_role" {

  scope                = azurerm_resource_group.aksresgroup.id
  role_definition_name = "Contributor"
  principal_id         = data.azurerm_user_assigned_identity.ingressid.principal_id
  //client_id=data.azurerm_user_assigned_identity.ingressid.client_id
  depends_on = [module.aks, azurerm_role_assignment.aks_dns_role]
}

resource "azurerm_role_assignment" "aks_networkingress_role" {
  scope                = module.network.vnet_id
  role_definition_name = "Network Contributor"
  principal_id         = data.azurerm_user_assigned_identity.ingressid.principal_id

  depends_on = [module.aks]
}
