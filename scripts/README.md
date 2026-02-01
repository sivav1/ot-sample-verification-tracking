# Azure Deployment
This script provides a deployment for the entire OT Sample Verification system, orchestrating the cloud infrastructure for both the Angular UI and the .NET 9 API.
## Deployment Architecture
The script automates a dual-resource deployment strategy:
* Backend: Deploys the .NET 9 Web API to Azure App Service.
* Frontend: Deploys the Angular UI to Azure Static Web Apps.
* Connectivity: Automatically configures CORS on the Backend to trust the Frontend's auto-generated URL.

## Prerequisites
* Azure CLI (Official Install Guide)
* SWA CLI: npm install -g @azure/static-web-apps-cli
* .NET 9 SDK & Node.js v22

## Running the script
```bash
az login 
./scripts/deploy.sh
```

## What the Script Does
1. Infrastructure Validation
   Verifies the existence of the Azure Resource Group.
   Ensures both the App Service (API) and Static Web App (UI) resources are provisioned.
2. .NET 9 API Deployment
   Runs dotnet publish to create optimized binaries.
   Deploys the package to Azure via Zip-Deploy.
   Retrieves the live API URL to pass to the Frontend build.
3. Angular UI Deployment
   Dynamic Injection: Replaces the BaseUrl in appsettings.json with the newly retrieved Azure API URL.
   Production Build: Executes ng build --configuration production.
   SWA Upload: Uses the SWA CLI to push the dist folder to Azure.
4. Security & CORS Configuration
   Retrieves the auto-generated Frontend hostname.
   Updates the API's CORS policy: `az webapp cors add --allowed-origins <frontend-url>`.
   Enables supportCredentials on the App Service to allow secure header transmission.