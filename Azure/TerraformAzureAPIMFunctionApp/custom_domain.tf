//https://github.com/hashicorp/terraform-provider-azurerm/issues/15256
//resource "null_resource" "previous" {}

module "custom_domain_apim" {

  source                 = "./apim_custom_domain"
  apim_id                = module.apim.id
  apim_url               = module.apim.gateway_url
  keyvault_name          = var.keyvault_name
  keyvault_resgroup_name = var.keyvault_resgroup_name
  apim_principal_id      = module.apim.principal_id
  host_name              = var.host_name
  dns_zone_name          = var.dns_zone_name
  dns_zone_rg            = var.dns_zone_rg
  cert_key_vault_secret_id = var.cert_key_vault_secret_id
  prefix =var.prefix



}


