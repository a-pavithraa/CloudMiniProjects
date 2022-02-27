Connect-AzAccount
$PrincipalId= $(Get-AzureADServicePrincipal -Filter "AppId eq '205478c0-bd83-4e1b-a9d6-db63a3e1e1c8'").ObjectId
Write-Output "{ ""PrincipalId"" : ""$PrincipalId""}"