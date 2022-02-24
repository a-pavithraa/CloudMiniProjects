variable "region" {
  default = "us-east-1"
}

variable "prefix" {
  default = "travelservice"
}

variable "redirect_url"{
    default="http://localhost:3000/"
}
variable "callback_url"{
     default="http://localhost:3000/"
}
variable "logout_url"{
    default="http://localhost:3000/"
}

variable "reply_to_email_address"{
    default="a.pavithraa@gmail.com"
}
variable "domain_name" {
    default="pavithraavasudevan.com"
  
}
variable "custom_domain_name"{
    default="newauth.pavithraavasudevan.com"
}

variable "certificate_arn"{

}

variable "google_client_id"{

}
variable "google_client_secret"{
    
}