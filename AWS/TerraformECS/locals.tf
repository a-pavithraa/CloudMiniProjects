locals {
  
  name                 = "stockservice"
   computed_bucket_name = "${var.prefix}.${var.bucket_name}.${substr(uuid(), 0, 3)}"
  common_tags = {
    app     = "StockService"
    version = "V1"
  }
}

