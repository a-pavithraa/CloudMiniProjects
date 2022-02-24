locals {
  
  name                 = "travelpoc"
  computed_bucket_name = "${var.prefix}.${var.bucket_name}.${substr(uuid(), 0, 3)}"
  common_tags = {
    app     = "TravelService"
    version = "V1"
  }
}

