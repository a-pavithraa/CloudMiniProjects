locals {
  virtual_network_cidr = "10.16.0.0/16"
  dns_ip               = "10.16.0.10"
  api_gateway_cidr     = cidrsubnet(local.virtual_network_cidr, 8, 20)
  subnets = {
    cidrs = [for i in range(0, var.subnet_count, 1) : cidrsubnet(local.virtual_network_cidr, 8, i)]
    names = [for i in range(0, var.subnet_count, 1) : join("-", ["subnet", i])]
  }
}