variable "prefix" {
  description = "The prefix which should be used for all resources in this example"
  default     = "pills"
}

variable "location" {
  description = "The Azure Region in which all resources in this example should be created."
  default     = "eastus"
}

variable "subscription_id" {

}
variable "dnszone_rg" {
  description = "Resource group of DNS Zone"
}

variable "allowed_methods" {
  type        = list(string)
  description = " A list of http headers that are allowed to be executed by the origin. Valid options are `DELETE`, `GET`, `HEAD`, `MERGE`, `POST`, `OPTIONS`, `PUT` or `PATCH`."
  default = [
    "GET",
    "HEAD"
  ]
}

variable "allowed_origins" {
  type        = list(string)
  description = "A list of origin domains that will be allowed by CORS."
  default     = ["*"]
}

variable "allowed_headers" {
  type        = list(string)
  description = "A list of headers that are allowed to be a part of the cross-origin request."
  default     = ["*"]
}

variable "exposed_headers" {
  type        = list(string)
  description = "A list of response headers that are exposed to CORS clients."
  default     = ["*"]
}

variable "max_age_in_seconds" {
  type        = number
  description = "The number of seconds the client should cache a preflight response.  Defaults to 2 days"
  default     = 60 * 60 * 24 * 2
}
variable "cdn_profile_name" {
  description = "Specifies the name of the CDN Profile"
  default     = "test"
}

variable "cdn_sku_profile" {
  description = "The pricing related information of current CDN profile. Accepted values are 'Standard_Akamai', 'Standard_ChinaCdn', 'Standard_Microsoft', 'Standard_Verizon' or 'Premium_Verizon'."
  default     = "Standard_Microsoft"
}

variable "custom_domain_name" {
  type        = string
  description = "The custom domain name to use for your website"
  default     = null
}
variable "index_path" {
  description = "path from your repo root to index.html"
  default     = "index.html"
}

variable "custom_404_path" {
  description = "path from your repo root to your custom 404 page"
  default     = "404.html"
}

variable "friendly_name" {

  default="Pills"
  
}

variable "domain_name" {  
  
}

variable "keyvault_name" {
  description = "Key Vault name where certificate is uploaded"
  type        = string
 

}
variable "keyvault_resgroup_name" {
  description = ""
  type        = string
}

variable "key_vault_cert_id" {
 
  type    = string

}