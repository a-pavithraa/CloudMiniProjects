variable "dns_zone_name" {

  description = "DNS Name registered"
  type        = string

}
variable "dns_zone_rg" {
  
  description = "Resurce group name of Azure DNS Hosted Zone"
  type        = string

}

variable "keyvault_name" {
  description = "Key Vault name where certificate is uploaded"
  type        = string
 

}
variable "keyvault_resgroup_name" {
  description = ""
  type        = string
}

variable "cert_key_vault_secret_id" {
 
  type    = string

}

variable "host_name" {
 
  description = "Custom Domain for APIM"
  type        = string
}

variable "apim_id"{
     type        = string

}
variable "apim_url"{
     type        = string

}
variable "apim_principal_id" {
   type        = string
  
}
variable "prefix" {
   type        = string
  
}