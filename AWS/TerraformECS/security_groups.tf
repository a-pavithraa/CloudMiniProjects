


module "loadbalancer_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "3.18.0"

  name        = "loadbalancer-sg"
  description = "Security Group with HTTP open for entire Internet (IPv4 CIDR), egress ports are all world open"
  vpc_id      = module.vpc.vpc_id
  # Ingress Rules & CIDR Blocks
  ingress_rules       = ["http-80-tcp", "https-443-tcp"]
  ingress_cidr_blocks = ["0.0.0.0/0"]
  # Egress Rule - all-all open
  egress_rules = ["all-all"]
  tags         = local.common_tags

  # Open to CIDRs blocks (rule or from_port+to_port+protocol+description)
  ingress_with_cidr_blocks = [
    {
      from_port   = 81
      to_port     = 81
      protocol    = 6
      description = "Allow Port 81 from internet"
      cidr_blocks = "0.0.0.0/0"
    },
  ]
}

module "ecstask_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "3.18.0"
  name        = "ecs-sg"
  description = "Security Group with HTTP open for entire Internet (IPv4 CIDR), egress ports are all world open"
  vpc_id      = module.vpc.vpc_id 
  ingress_rules       = ["http-80-tcp", "https-443-tcp"]
  ingress_with_cidr_blocks = [
  
    {
      from_port   = 80
      to_port     = 8102
      protocol    = 6
      description = "Allow "
      cidr_blocks = module.vpc.vpc_cidr_block
    },
     {
      from_port   = 8102
      to_port     = 8102
      protocol    = 6
      description = "Allow "
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]
  ingress_cidr_blocks = [module.vpc.vpc_cidr_block]  
  egress_rules = ["all-all"]
  tags         = local.common_tags
 
}




