resource "aws_iam_policy" "awsservicepolicy" {
  name        = var.name
  path        = var.path
  description = var.description
 
  policy = var.policy
}

data "aws_iam_policy_document" "sa_service_role" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type = "Federated"
      identifiers = [
        "arn:aws:iam::${var.account_id}:oidc-provider/${replace(var.oidc_issuer_url, "https://", "")}"
      ]
    }
    
    condition {
      test     = "StringEquals"
      variable = "${replace(var.oidc_issuer_url, "https://", "")}:sub"
      values = [
        "system:serviceaccount:${var.k8s_service_account_namespace}:${var.k8s_service_account_name}"
      ]
    }
    condition {
      test     = "StringEquals"
      variable = "${replace(var.oidc_issuer_url, "https://", "")}:aud"
      values = [
       "sts.amazonaws.com"
      ]
    }
  }
}
resource "random_string" "random" {
  length           = 10
  special          = false
  
}
resource "aws_iam_role" "sa_service_role" {
  name               = "sa-awsservice-role-${random_string.random.result}"
  assume_role_policy = data.aws_iam_policy_document.sa_service_role.json
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.sa_service_role.name
  policy_arn = aws_iam_policy.awsservicepolicy.arn
}

resource "kubernetes_service_account" "sa_service_role" {
  metadata {
    name      = var.k8s_service_account_name
    namespace = var.k8s_service_account_namespace
    annotations = {      
      "eks.amazonaws.com/role-arn" = aws_iam_role.sa_service_role.arn
    }
  }
}