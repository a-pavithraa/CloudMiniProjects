variable "cluster_name" {
   description = "Name of the cluster"
    type        = string
}


variable "app_count" {
    default = 1
     type        = number
}

variable "container_name" {
   description = "Container name to be used for application in task definition file"
    type        = string
}

variable "api_image" {
   description = "Container image to be used for application in task definition file"
    type        = string
}


variable "sec_container_name" {
    description = "Container name to be used for application in task definition file"
     type        = string
}

variable "sec_image" {
    description = "Container image to be used for application in task definition file"
     type        = string
}

variable "fargate_cpu" {
    default = 2048
}

variable "fargate_memory" {
    default = 4096
}
variable "app_port" {
    description = "value"
    default = 8102
  
}
