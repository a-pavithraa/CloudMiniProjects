provider "azurerm" {
    
    features {}
}
 
data "azurerm_client_config" "current" {}
 
#Create Resource Group
resource "azurerm_resource_group" "staticwebsite_rg" {
  name     = "${var.prefix}staticwebsite"
  location = var.location
}


 
#Create Storage account
resource "azurerm_storage_account" "storage_account" {
  name                = "${var.prefix}2402"
  resource_group_name = azurerm_resource_group.staticwebsite_rg.name
 
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
 
  static_website {
    index_document = "index.html"
  }
  blob_properties {
    cors_rule {
      allowed_methods    = var.allowed_methods
      allowed_origins    = var.allowed_origins
      allowed_headers    = var.allowed_headers
      exposed_headers    = var.exposed_headers
      max_age_in_seconds = var.max_age_in_seconds
    }
  }

  identity {
    type = "SystemAssigned"
  }
}
 
#Add index.html to blob storage

resource "azurerm_cdn_profile" "cdn-profile" {
 
  name                = var.cdn_profile_name
  resource_group_name = azurerm_resource_group.staticwebsite_rg.name
  location            = var.location
  sku                 = var.cdn_sku_profile
  
 // tags                = merge({ "Name" = format("%s", var.cdn_profile_name) }, var.tags, )
}

resource "random_string" "unique" {
 
  length  = 8
  special = false
  upper   = false
}

resource "azurerm_cdn_endpoint" "cdn-endpoint" {
  
  name                          = random_string.unique.result
  profile_name                  = azurerm_cdn_profile.cdn-profile.name
  location                      = var.location
  resource_group_name           = azurerm_resource_group.staticwebsite_rg.name
  origin_host_header            = azurerm_storage_account.storage_account.primary_web_host
  querystring_caching_behaviour = "IgnoreQueryString"
 

  origin {
    name      = "websiteorginaccount"
    host_name = azurerm_storage_account.storage_account.primary_web_host
  }

}

data "azurerm_dns_zone" "dns_zone" {
  name                = var.domain_name
  resource_group_name = var.dnszone_rg
}

resource "azurerm_dns_cname_record" "cname_record" {
  name                = var.custom_domain_name
  zone_name           = data.azurerm_dns_zone.dns_zone.name
  resource_group_name = data.azurerm_dns_zone.dns_zone.resource_group_name
  ttl                 = 3600
  target_resource_id  = azurerm_cdn_endpoint.cdn-endpoint.id
}

data "azurerm_key_vault" "cert-keyvault" {
  name                = var.keyvault_name
  resource_group_name = var.keyvault_resgroup_name
}
//Powershell module has to be executedInstall-Module -Name Az -AllowClobber
resource "null_resource" "add_sp"{
provisioner "local-exec" {
    command = "pwsh ${path.module}/customscript.ps1"
}
}

/**data "external" "getPrincipalId" {
  program = ["Powershell.exe", "./customscript.ps1"]
  query = {
      environment = "${var.environment_name}"
  }
}*/

data "azuread_service_principal" "sp_frontdoor" {
  display_name = "Microsoft.AzureFrontDoor-Cdn"
}
output "application_object_id" {
  value = data.azuread_service_principal.sp_frontdoor.id
}

resource "azurerm_role_assignment" "akv_sp" {
  scope                = data.azurerm_key_vault.cert-keyvault.id
  role_definition_name = "Key Vault Reader"
  principal_id         = data.azuread_service_principal.sp_frontdoor.id
}

resource "azurerm_cdn_endpoint_custom_domain" "example" {
  name            = "${var.custom_domain_name}"
  cdn_endpoint_id = azurerm_cdn_endpoint.cdn-endpoint.id
  host_name       = "${azurerm_dns_cname_record.cname_record.name}.${var.domain_name}"
  user_managed_https{
    key_vault_certificate_id=var.key_vault_cert_id
    tls_version="TLS12"
  }
}
/**data "azuread_application" "example" {
  object_id = "a270ae3d-5ae6-4c98-ac71-dff80c41a0b0"
}

output "application_object_id" {
  value = data.azuread_application.example.id
}*/






/**


*/
/**resource "null_resource" "add_custom_domain" {
  count = var.custom_domain_name != null ? 1 : 0
  triggers = { always_run = timestamp() }
  depends_on = [
    azurerm_cdn_endpoint.cdn-endpoint
  ]

  provisioner "local-exec" {
    command = "pwsh ${path.module}/CustomDomainScript.ps1"
    environment = {
      CUSTOM_DOMAIN      = var.custom_domain_name
      RG_NAME            = azurerm_resource_group.staticwebsite_rg.name
      FRIENDLY_NAME      = var.friendly_name
      STATIC_CDN_PROFILE = var.cdn_profile_name
    }
  }
}*/


