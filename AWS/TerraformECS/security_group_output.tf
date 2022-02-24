

output "ecstask_sg_group_id" {
  description = "The ID of the security group"
  value       = module.ecstask_sg.this_security_group_id
}

output "ecstask_sg_group_vpc_id" {
  description = "The VPC ID"
  value       = module.ecstask_sg.this_security_group_vpc_id
}


output "ecstask_sg_group_name" {
  description = "The name of the security group"
  value       = module.ecstask_sg.this_security_group_name
}

