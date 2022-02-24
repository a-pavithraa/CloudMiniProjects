resource "random_string" "storage_name" {
  length  = 24
  upper   = false
  lower   = true
  number  = true
  special = false
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-${var.environment}"
  location = var.location
}








/**resource "azurerm_key_vault" "test" {
  name                        = "${var.prefix}pillskeyvault"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
    ]

    secret_permissions = [
      "Get",
    ]

    storage_permissions = [
      "Get",
    ]
  }
}

resource "azurerm_key_vault_certificate" "example" {
  name         = "example-certificate"
  key_vault_id = azurerm_key_vault.test.id

  certificate_policy {
    issuer_parameters {
      name = "Self"
    }

    key_properties {
      exportable = true
      key_size   = 2048
      key_type   = "RSA"
      reuse_key  = true
    }

    lifetime_action {
      action {
        action_type = "AutoRenew"
      }

      trigger {
        days_before_expiry = 30
      }
    }

    secret_properties {
      content_type = "application/x-pkcs12"
    }

    x509_certificate_properties {
      key_usage = [
        "cRLSign",
        "dataEncipherment",
        "digitalSignature",
        "keyAgreement",
        "keyCertSign",
        "keyEncipherment",
      ]

      subject            = "CN=api.saaralkaatru.com"
      validity_in_months = 12

      subject_alternative_names {
        dns_names = [
          "api.saaralkaatru.com",
          "pills.saaralkaatru.com",
        ]
      }
    }
  }
}

resource "azurerm_api_management_custom_domain" "example" {
  api_management_id = azurerm_api_management.bookingapi.id

  proxy {
    host_name    = "api.saaralkaatru.com"
    key_vault_id = azurerm_key_vault_certificate.example.secret_id
  }

  developer_portal {
    host_name    = "pills.saaralkaatru.com"
    key_vault_id = azurerm_key_vault_certificate.example.secret_id
  }
}*/