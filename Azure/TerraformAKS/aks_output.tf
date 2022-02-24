output "aks_identity" {
  value = module.aks.system_assigned_identity
}

output "aks_user_identity" {
  value = module.aks.kubelet_identity
}

output "node_resource_group" {
  value = module.aks.node_resource_group
}


output "uai_client_id" {
  value = data.azurerm_user_assigned_identity.ingressid.client_id
}

output "uai_principal_id" {
  value = data.azurerm_user_assigned_identity.ingressid.principal_id
}