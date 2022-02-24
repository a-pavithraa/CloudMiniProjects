//https://github.com/hashicorp/terraform-provider-azurerm/issues/15256
//resource "null_resource" "previous" {}

data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "cert-keyvault" {
  name                = var.keyvault_name
  resource_group_name = var.keyvault_resgroup_name
}


resource "azurerm_key_vault_access_policy" "apim_said" {
  key_vault_id = data.azurerm_key_vault.cert-keyvault.id
  object_id    = var.apim_principal_id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  secret_permissions = [
    "Get",
    "List"
  ]

}



/**resource "time_sleep" "wait_60_seconds" {
  depends_on = [azurerm_key_vault_access_policy.apim_said]

  create_duration = "60s"
}*/

resource "azurerm_api_management_custom_domain" "apimcustomdomain" {
  api_management_id = var.apim_id

  proxy {
    host_name = var.host_name    
    key_vault_id = var.cert_key_vault_secret_id
  }

  /*depends_on = [
  time_sleep.wait_60_seconds
]*/
}


data "azurerm_dns_zone" "dnszone" {
  name                = var.dns_zone_name
  resource_group_name = var.dns_zone_rg
}

resource "azurerm_dns_cname_record" "cnamerecord" {
  name                = var.prefix
  zone_name           = data.azurerm_dns_zone.dnszone.name
  resource_group_name = data.azurerm_dns_zone.dnszone.resource_group_name
  ttl                 = 300
  record              = var.apim_url
}