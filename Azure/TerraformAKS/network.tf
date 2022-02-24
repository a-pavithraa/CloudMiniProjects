module "network" {
  source              = "Azure/network/azurerm"
  resource_group_name = azurerm_resource_group.aksresgroup.name
  address_space       = local.virtual_network_cidr
  subnet_prefixes     = local.subnets.cidrs
  subnet_names        = local.subnets.names
  depends_on          = [azurerm_resource_group.aksresgroup]
}
