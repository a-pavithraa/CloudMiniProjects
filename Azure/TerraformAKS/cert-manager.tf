data "azurerm_client_config" "current" {}
provider "kubernetes" {
  host                   = module.aks.host
  client_certificate     = base64decode(module.aks.client_certificate)
  client_key             = base64decode(module.aks.client_key)
  cluster_ca_certificate = base64decode(module.aks.cluster_ca_certificate)
}


provider "helm" {
  kubernetes {
    host                   = module.aks.host
    client_certificate     = base64decode(module.aks.client_certificate)
    client_key             = base64decode(module.aks.client_key)
    cluster_ca_certificate = base64decode(module.aks.cluster_ca_certificate)
  }
}

#create namespace for cert mananger
resource "kubernetes_namespace" "cert" {
  metadata {
    name = "ingress-apgw"
  }
}

#deploy cert maanger
resource "helm_release" "cert" {
  name       = "cert-manager"
  namespace  = kubernetes_namespace.cert.metadata[0].name
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  depends_on = [azurerm_role_assignment.aks_accessvnet_role]
  set {
    name  = "version"
    value = "v1.7.0"
  }
  set {
    name  = "installCRDs"
    value = "true"
  }
}
locals {
  external_dns_vars = {
    resource_group         = var.dns_resource_group,
    tenant_id              = data.azurerm_client_config.current.tenant_id,
    subscription_id        = data.azurerm_client_config.current.subscription_id,
    log_level              = "debug",
    domain                 = var.domain_name
    userAssignedIdentityID = module.aks.kubelet_identity[0].client_id
  }


  external_dns_values = templatefile(
    "${path.module}/templates/external_dns_values.yaml.tmpl",
    local.external_dns_vars
  )
}
// referred from https://github.com/darkn3rd/blog_tutorials/tree/master/kubernetes/aks/series_0_provisioning/terraform/1_dns
resource "helm_release" "external_dns" {
  name             = "external-dns"
  repository       = "https://charts.bitnami.com/bitnami"
  chart            = "external-dns"
  namespace        = "external-dns"
  create_namespace = true
  //version          = "5.4.5"
  values = [local.external_dns_values]

}