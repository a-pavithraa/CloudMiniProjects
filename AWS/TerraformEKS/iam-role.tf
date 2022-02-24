data "tls_certificate" "cluster" {
  url = module.eks.cluster_oidc_issuer_url
}
resource "aws_iam_openid_connect_provider" "cluster" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = concat([data.tls_certificate.cluster.certificates.0.sha1_fingerprint], var.oidc_thumbprint_list)
  url             = module.eks.cluster_oidc_issuer_url
}

output "aws_iam_openid_connect_provider_arn" {
  value = join("", aws_iam_openid_connect_provider.cluster.*.arn)
}