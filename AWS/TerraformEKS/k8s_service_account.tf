data "aws_caller_identity" "current" {}

module "k8_service_account" {
  for_each                      = { for i in local.service_account_policies : i.name => i }
  source                        = "./service_accounts"
  name                          = each.value.name
  description                   = each.value.description
  account_id                    = data.aws_caller_identity.current.account_id
  path                          = each.value.path
  policy                        = each.value.policy
  k8s_service_account_namespace = local.k8s_service_account_namespace
  k8s_service_account_name      = each.value.service_account_name
  oidc_issuer_url               = module.eks.cluster_oidc_issuer_url
  depends_on = [
    module.dynamodb_table
  ]
}