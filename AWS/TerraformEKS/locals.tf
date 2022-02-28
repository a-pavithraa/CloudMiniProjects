locals {
  cluster_name                         = "${var.prefix}-${random_string.suffix.result}"
  k8s_service_account_namespace        = "default"
  k8s_service_account_name             = "hotelservice"
  k8s_externaldns_service_account_name = "external-dns"
  dynamodb_table_name                  = "BookmarkedHotels"
  cluster_version                      = "1.21"

  common_tags = {
    app     = "${var.prefix}"
    version = "V1"
  }
  monitoring_values = file(
  "${path.module}/helm_chart_config/monitoring_custom_values.yml")

  service_account_policies = [{
    name                 = "dynamodb_access_policy"
    description          = "DynamoDB Access Policy"
    service_account_name = "hotelservice"
    path                 = "/"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {

          "Effect" : "Allow",
          "Action" : ["dynamodb:*"],
          "Resource" : "arn:aws:dynamodb:${var.region}:${var.account_id}:table/${local.dynamodb_table_name}"
        }
      ]
    })

    }, {
    name                 = "externaldns_access_policy"
    service_account_name = "external-dns"
    description          = "External DNS Access Policy"
    path                 = "/"
    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Action" : [
            "route53:ChangeResourceRecordSets"
          ],
          "Resource" : [
            "arn:aws:route53:::hostedzone/${var.hosted_zone_id}"
          ]
        },
        {
          "Effect" : "Allow",
          "Action" : [
            "route53:ListHostedZones",
            "route53:ListResourceRecordSets"
          ],
          "Resource" : [
            "*"
          ]
        }
      ]
    })

  }]
}
