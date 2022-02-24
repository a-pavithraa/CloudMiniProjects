/*data "kubernetes_service" "ingress_nginx" {
  metadata {
    name      = "${helm_release.ingress_nginx.name}-nginx-ingress-controller"
    namespace = kubernetes_namespace.ingress_nginx.metadata[0].name
  }
}

output "ingress_hostname" {
  value = data.kubernetes_service.ingress_nginx.load_balancer_ingress[0].hostname
}*/