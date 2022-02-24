
variable "prefix" {
  description = "The prefix which should be used for all resources in this example"
  default     = "hotelsearchservice"
}

variable "location" {
  description = "The Azure Region in which all resources in this example should be created."
  default     = "eastus"
}
variable "subscription_id" {

}
variable "subnet_count" {
  default = 2
}

variable "dnszone_rg" {
  description = "Resource group of DNS Zone"
}

variable "failover_location" {
  default = "westus"
}

variable "dns_resource_group" {
  default = "azaks"
  description = "Resource group name of Azure DNS Hosted Zone"
}
variable "email_id" {

}
variable "domain_name" {

description = "Registered Domain Name"

}

