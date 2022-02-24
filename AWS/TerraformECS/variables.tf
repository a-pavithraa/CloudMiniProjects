# root variables.tf
variable "region_name" {
  default = "us-east-1"
}

variable "prefix" {
  default = "stockservice"
}
variable "domain_name" {

}
variable "instance_type" {
  default = "t3.micro"
}

variable "instance_keypair" {
  default = "terraformkey"
}

variable "private_instance_count" {
  default = 1
}

variable "bucket_name" {
  type        = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}




