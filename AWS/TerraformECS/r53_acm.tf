data "aws_route53_zone" "customdomain" {
  name = var.domain_name
}


resource "aws_route53_record" "apps_lb_dns" {
  zone_id = data.aws_route53_zone.customdomain.zone_id
  name    = "${var.prefix}backend.${var.domain_name}"
  type    = "A"
  alias {
    name                   = module.alb.lb_dns_name
    zone_id                = module.alb.lb_zone_id
    evaluate_target_health = true
  }
}




module "acm" {
  source      = "terraform-aws-modules/acm/aws"
  version     = "3.0.0"
  domain_name = trimsuffix(data.aws_route53_zone.customdomain.name, ".")
  zone_id     = data.aws_route53_zone.customdomain.zone_id
  subject_alternative_names = [
    "*.${var.domain_name}"
  ]
  tags = local.common_tags
}
