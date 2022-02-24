// APIM code

resource "azurerm_api_management" "bookingapi" {
  name                = "${var.prefix}apim"
  location            = var.resource_group_location
  resource_group_name = var.resource_group_name 
  publisher_name = var.publisher_name
  publisher_email = var.publisher_email
  sku_name = "Standard_1"
  identity {
    type="SystemAssigned"
  }
}


resource "azurerm_api_management_api" "apim_api" {
  name                = "${var.prefix}-api"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.bookingapi.name
  revision            = "1"
  display_name        = var.prefix
  path                = "${var.prefix}-${var.environment}"
  protocols           = ["https"]
subscription_required = false
}


resource "azurerm_api_management_api_policy" "api_policy" {
  api_name            = "${azurerm_api_management_api.apim_api.name}"
  api_management_name = azurerm_api_management.bookingapi.name
  resource_group_name = var.resource_group_name

  xml_content = <<XML
<policies>
  <inbound>
    <set-backend-service id="tf-generated-policy" backend-id="${azurerm_api_management_backend.apim_backend.name}" />
    <base />
    <cors >
    <allowed-origins>
        <origin>*</origin>
    </allowed-origins>
    <allowed-methods>
        <method>*</method>
    </allowed-methods>
    <allowed-headers>
        <header>*</header>
    </allowed-headers>
    <expose-headers>
        <header>*</header>
    </expose-headers>
</cors>
  </inbound>    
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
XML
}

resource "azurerm_api_management_backend" "apim_backend" {
  name                = "${var.prefix}backend"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.bookingapi.name
  protocol            = "http"
  url                 = "https://${var.host_name}/api"

  credentials {
        header              = {
        "x-functions-key" = azurerm_api_management_named_value.apim_prop_azfn_key.value
        }
  }
}

data "azurerm_function_app_host_keys" "azfn_function_key" {
  name                = var.function_app_name
  resource_group_name =  var.resource_group_name
}

/**
resource "azurerm_template_deployment" "azfn_function_key" {
  name = "${var.prefix}-key-rgt"
  parameters = {
    "functionApp" = var.function_app_name
  }
  resource_group_name    = var.resource_group_name
  deployment_mode = "Incremental"

  template_body = <<BODY
  {
      "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
      "contentVersion": "1.0.0.0",
      "parameters": {
          "functionApp": {"type": "string", "defaultValue": ""}
      },
      "variables": {
          "functionAppId": "[resourceId('Microsoft.Web/sites', parameters('functionApp'))]"
      },
      "resources": [
      ],
      "outputs": {
          "functionkey": {
              "type": "string",
              "value": "[listkeys(concat(variables('functionAppId'), '/host/default'), '2018-11-01').functionKeys.default]"
              }
      }
  }
  BODY

 
}*/


resource "azurerm_api_management_named_value" "apim_prop_azfn_key" {
  name                = "${var.prefix}-key"
  resource_group_name = var.resource_group_name
  api_management_name = azurerm_api_management.bookingapi.name
  display_name        = "${var.prefix}-newkey"
 // value               = lookup(azurerm_template_deployment.azfn_function_key.outputs, "functionkey")
 value=data.azurerm_function_app_host_keys.azfn_function_key.default_function_key
  secret              = "true"
}

resource "azurerm_api_management_api_operation" "example" {
for_each = {for i in var.api_paths : i.operation_id => i}
  operation_id        = each.value.operation_id
  api_name            = azurerm_api_management_api.apim_api.name
  api_management_name = azurerm_api_management_api.apim_api.api_management_name
  resource_group_name = var.resource_group_name
  display_name        = each.value.description
  method              = each.value.method
  url_template        = each.value.url_path
  description         = each.value.description

  response {
    status_code = 200
  }
}

resource "azurerm_api_management_api_operation_policy" "apis" {
    for_each = {for i in var.api_paths : i.operation_id => i}
    api_management_name = azurerm_api_management_api.apim_api.api_management_name
    resource_group_name = var.resource_group_name
    api_name            = azurerm_api_management_api.apim_api.name
    operation_id        = each.value.operation_id
    xml_content =  <<XML
<policies>
  <inbound>
    <set-backend-service id="tf-generated-policy" backend-id="${azurerm_api_management_backend.apim_backend.name}" />
    <base />
    <cors >
    <allowed-origins>
        <origin>*</origin>
    </allowed-origins>
    <allowed-methods>
        <method>*</method>
    </allowed-methods>
    <allowed-headers>
        <header>*</header>
    </allowed-headers>
    <expose-headers>
        <header>*</header>
    </expose-headers>
</cors>
%{ if each.value.jwtAuth}
<validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Unauthorized">
            <openid-config url="${var.openid_url}" />
            <required-claims>
                <claim name="${var.claim_name}" match="all">
                    <value>${var.claim_Value}</value>
                </claim>
            </required-claims>
        </validate-jwt>
  %{endif }
  </inbound>    
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
XML
    depends_on = [azurerm_api_management_api_operation.example]
}