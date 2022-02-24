output "func_keys" {
  //value = "${lookup(azurerm_template_deployment.azfn_function_key.outputs, "functionkey")}"
  value=azurerm_api_management_named_value.apim_prop_azfn_key.value
}

output "gateway_url" {
    value= replace(azurerm_api_management.bookingapi.developer_portal_url,"https://","")
  
}

output "id" {
    value= azurerm_api_management.bookingapi.id
  
}

output "name" {
  value= azurerm_api_management.bookingapi.name
}

output "principal_id"{
    value =azurerm_api_management.bookingapi.identity[0].principal_id
}