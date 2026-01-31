#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

APP_NAME="ot-sample-verification-api"
RESOURCE_GROUP="otResourceGroup"
LOCATION="newzealandnorth"
PLAN_NAME="otAppServicePlan"
PROJECT_FILE="$PROJECT_ROOT/api/Ot.SampleVerificationTracker.Api/Ot.SampleVerificationTracker.Api/Ot.SampleVerificationTracker.Api.csproj"
PUBLISH_DIR="$PROJECT_ROOT/api/publish"
ZIP_FILE="$PROJECT_ROOT/api/deploy.zip"

echo "Using project root: $PROJECT_ROOT"

echo "Verifying Azure resources..."
if [ $(az group exists --name $RESOURCE_GROUP) = "false" ]; then
    az group create --name $RESOURCE_GROUP --location $LOCATION
fi

PLAN_EXISTS=$(az appservice plan list --query "[?name=='$PLAN_NAME'] | length(@)")
if [ "$PLAN_EXISTS" -eq 0 ]; then
    az appservice plan create --name $PLAN_NAME --resource-group $RESOURCE_GROUP --sku F1 --is-linux
fi

if ! az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP --o none 2>&1; then
    az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan $PLAN_NAME --runtime "DOTNETCORE|9.0"
fi

echo "Building .NET project..."
dotnet publish "$PROJECT_FILE" -c Release -o "$PUBLISH_DIR"

echo "Creating deployment package..."
cd "$PUBLISH_DIR" && zip -r "$ZIP_FILE" . && cd "$PROJECT_ROOT"

echo "Deploying ZIP to Azure..."
az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_NAME --src-path "$ZIP_FILE" --type zip

ANGULAR_URL="https://your-angular-app.azurewebsites.net"
echo "Configuring CORS for: $ANGULAR_URL"
az webapp cors add --resource-group $RESOURCE_GROUP --name $APP_NAME --allowed-origins $ANGULAR_URL

rm "$ZIP_FILE" && rm -rf "$PUBLISH_DIR"
echo "Deployment complete! Live at: https://$APP_NAME.azurewebsites.net"
