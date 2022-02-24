## **Hotel Search Service:**

Aim of this mini project is to deploy an application across multiple services in AWS and Azure.  Services that are used for deployment are 

#### **AWS:**

- EKS (Elastic Kubernetes Service)
- ECS Fargate (Elastic Container Service)
- API Gateway and Lamba

#### **Azure:**

- AKS (Azure Kubernetes Service)

- APIM and Function App

Application backend is developed using Spring Boot , Node JS( for lambda and function app) and front end is developed using ReactJS.

I have created two separate folders for Azure and AWS. Each one has separate folders for Terraform code for each of the services, Frontend Code(since Authorization mechanism differs for each of the cloud providers) and Spring Boot backend code. The main difference in backend code is for AWS , DynamoDB is used and for Azure , Cosmos DB with MongoDBClient is used.

Authentication is done via Cognito in AWS and AD B2C in Azure

#### **Terraform:**

**<u>AWS:</u>**

   Separate terraform projects are created:

- Cognito User Pool along with app clients, custom domain names, Google IDP

- API Gateway along with Lambda Integration, Cognito Authorization, Pre SignUp Lambda, IAM roles,Custom Domain name, DynamoDB

- ECS Fargate along with VPC,ALB and Custom Domain

- EKS cluster with ingress, IAM roles, service accounts along with IAM role association for both DynamoDB and External DNS

- S3 bucket along with Cloud Front, SSL/TLS Certificate 

  

**<u>Azure:</u>**

Separate terraform projects are created for the following:

- AKS cluster along with API Gateway Ingress, IAM roles, helm charts for ExternalDNS and CertManager (LetsEncrypt), Custom Domai

- APIM along with Function App Integration, B2C Authorization for selected routes, Custom Domain along with SSL/TLS certificate (LetsEncrypt), CosmosDB 

- Azure Storage account along with Azure CDN

  

#### **Kubernetes Manifests:**

RapidAPI Key , Connection strings required for connecting to RapidAPI and DB can be configured via ConfigMap. Placeholders are present in the manifests.

FrontEnd React App:

 CI/CD pipelines for frontend app are configured for both AWS (github actions) and Azure (Azure Devops) projects. File Constants.js has to be updated (mentioned in the respective folder)



**<u>LetsEncrypt</u>**

Azure doesn't have a service equivalent to AWS ACM. For APIM, in order to generate SSL/TLS certificate for custom domain, we can use LetsEncrypt. 

Reference: https://github.com/shibayan/keyvault-acmebot

This project generates the certificates and stores them in Azure KeyVault which we can use for our custom domain.

**<u>Courses referred:</u>**

https://www.udemy.com/course/azure-kubernetes-service-with-azure-devops-and-terraform

https://www.udemy.com/course/aws-eks-kubernetes-masterclass-devops-microservices

https://www.udemy.com/course/serverless-tutorial-aws-lambda-and-azure-functions

https://www.udemy.com/course/terraform-certified/