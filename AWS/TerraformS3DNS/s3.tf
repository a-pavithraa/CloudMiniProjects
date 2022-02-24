
resource "aws_s3_bucket" "websitebucket" {
  bucket = local.computed_bucket_name
  acl    = "public-read"
  policy = templatefile("templates/s3-policy.json", { bucket = "${local.computed_bucket_name}" })

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["https://${var.prefix}.${var.domain_name}"]
    max_age_seconds = 3000
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = local.common_tags
}

