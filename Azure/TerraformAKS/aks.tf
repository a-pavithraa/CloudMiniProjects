data "azurerm_subscription" "current" {}

data "azurerm_role_definition" "contributor" {
  name = "Contributor"
}

resource "azurerm_user_assigned_identity" "aksidentity" {
  resource_group_name = azurerm_resource_group.aksresgroup.name
  location            = azurerm_resource_group.aksresgroup.location

  name = "${var.prefix}aksidentity"
}
module "aks" {
  source              = "Azure/aks/azurerm"
  resource_group_name = azurerm_resource_group.aksresgroup.name

  prefix          = var.prefix
  cluster_name    = "${var.prefix}-aks"
  network_plugin  = "azure"
  vnet_subnet_id  = module.network.vnet_subnets[0]
  os_disk_size_gb = 50
  sku_tier        = "Paid"

  enable_http_application_routing = false
  enable_azure_policy             = true
  enable_auto_scaling             = true
  enable_host_encryption          = false
  agents_min_count                = 1
  agents_max_count                = 2
  agents_count                    = null # Please set `agents_count` `null` while `enable_auto_scaling` is `true` to avoid possible `agents_count` changes.
  agents_max_pods                 = 100
  agents_pool_name                = "akspool"
  agents_availability_zones       = ["1", "2"]
  agents_type                     = "VirtualMachineScaleSets"
  identity_type                   = "SystemAssigned"
  // user_assigned_identity_id =azurerm_user_assigned_identity.aksidentity.id

  agents_labels = {
    "nodepool" : "defaultnodepool"
  }

  agents_tags = {
    "Agent" : "defaultnodepoolagent"
  }

  enable_ingress_application_gateway      = true
  ingress_application_gateway_name        = "aks-agw"
  ingress_application_gateway_subnet_cidr = local.api_gateway_cidr

  network_policy = "azure"

  depends_on = [module.network]
}

data "azurerm_resource_group" "dnszone" { name = var.dnszone_rg }
/**data "azurerm_resource_group" "mainresourcegroup"{name = module.aks.node_resource_group}
data "azurerm_resources" "identityresources"{
 
 name ="ingressapplicationgateway-pills-aks"    
  type="Microsoft.ManagedIdentity/userAssignedIdentities"
  }*/



