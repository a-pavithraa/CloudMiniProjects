variable "prefix" {
  description = "The prefix which should be used for all resources in this example"
  default     = "bookingserviceapi"
  type        = string
}

variable "location" {
  description = "The Azure Region in which all resources in this example should be created."
  default     = "eastus"
  type        = string
}
variable "environment" {
  default = "prod"
  type    = string
}

variable "subnet_count" {
  default = 2
  type    = number
}

variable "dnszone_rg" {
  description = "Resource group of DNS Zone"
  type        = string
}

variable "rapidapi_key" {
  description = "RAPID API Key got when registering"
  type        = string

}


//B2C User Flow URL
variable "openid_url" {
  description = "B2C User flow URL"
 default="https://pocorgb2c.b2clogin.com/pocorgb2c.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_todo2101"
  
}
variable "dns_zone_name" {
  default     = "saaralkaatru.com"
  description = "DNS Name registered"
  type        = string

}
variable "dns_zone_rg" {
  default     = "azaks"
  description = "Resurce group name of Azure DNS Hosted Zone"
  type        = string

}

variable "host_name" {
  default     = "bookingserviceapi.saaralkaatru.com"
  description = "Custom Domain for APIM"
  type        = string
}


variable "publisher_name" {
  default = "test"
  type    = string
}
variable "publisher_email" {
  default = "test@test.com"
  type    = string
}

variable "mongodb_url" {
  type        = string
  description = "Connection String of mongodb"
}
variable "mongodb_name" {
  type        = string
  description = "Database Name"
}
variable "mongodb_container_name" {
  type        = string
  description = "Container Name"
}

// Following 3 variables are needed when custom domain is enabled
variable "keyvault_name" {
  description = "Key Vault name where certificate is uploaded"
  type        = string
  default     = ""

}
variable "keyvault_resgroup_name" {
  description = ""
  type        = string
}

variable "cert_key_vault_secret_id" {
  default = ""
  type    = string

}