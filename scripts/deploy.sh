#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

APP_NAME="ot-sample-verification"
APP_NAME_API="$APP_NAME-api"
APP_NAME_UI="$APP_NAME-ui"
RESOURCE_GROUP="otResourceGroup"
LOCATION="eastasia"
PLAN_NAME="otAppServicePlan"
PROJECT_FILE="$PROJECT_ROOT/api/Ot.SampleVerificationTracker/Ot.SampleVerificationTracker.Api/Ot.SampleVerificationTracker.Api.csproj"
PUBLISH_DIR="$PROJECT_ROOT/api/publish"
ZIP_FILE="$PROJECT_ROOT/api/deploy.zip"
DIST_PATH="dist/ot-sample-verification-tracker-ui/browser" # Angular v17+ uses the /browser subfolder
UI_Dir="$PROJECT_ROOT/ui/ot-sample-verification-tracker-ui"

echo "Using project root: $PROJECT_ROOT"

echo "Verifying Azure resources..."
if [ $(az group exists --name $RESOURCE_GROUP) = "false" ]; then
    az group create --name $RESOURCE_GROUP --location $LOCATION
fi

PLAN_EXISTS=$(az appservice plan list --query "[?name=='$PLAN_NAME'] | length(@)")
if [ "$PLAN_EXISTS" -eq 0 ]; then
    az appservice plan create --name $PLAN_NAME --resource-group $RESOURCE_GROUP --sku F1 --is-linux
fi

if ! az webapp show --name "$APP_NAME_API" --resource-group $RESOURCE_GROUP --o none 2>&1; then
    az webapp create --name "$APP_NAME_API" --resource-group $RESOURCE_GROUP --plan $PLAN_NAME --runtime "DOTNETCORE|9.0"
fi

echo "Building .NET project..."
dotnet publish "$PROJECT_FILE" -c Release -o "$PUBLISH_DIR"

echo "Creating deployment package..."
cd "$PUBLISH_DIR" && zip -r "$ZIP_FILE" . && cd "$PROJECT_ROOT"

echo "Deploying ZIP to Azure..."
az webapp deploy --resource-group $RESOURCE_GROUP --name "$APP_NAME-api" --src-path "$ZIP_FILE" --type zip

rm "$ZIP_FILE" && rm -rf "$PUBLISH_DIR"
echo "Deployment complete! Live at: https://$APP_NAME_API.azurewebsites.net"

cd "$UI_Dir" || { echo "Directory not found"; exit 1; }

echo "Checking if Static Web App '$APP_NAME-ui' exists..."
# Using 'show' and checking the exit code (0 = exists, else = not found)
if ! az staticwebapp show --name "$APP_NAME_UI" --resource-group "$RESOURCE_GROUP" &> /dev/null; then
    echo "Creating Static Web App..."
    az staticwebapp create \
      --name "$APP_NAME_UI" \
      --resource-group "$RESOURCE_GROUP" \
      --location "$LOCATION" \
      --sku Free
else
    echo "Static Web App already exists."
fi

# Generates appsettings.json for prod deployment
cat <<EOF > src/assets/appsettings.prod.json
{
  "ApiSettings": {
    "BaseUrl": "https://$APP_NAME-api.azurewebsites.net/api",
    "Timeout": 30000,
    "RetryCount": 3
  }
}
EOF

# Build the Angular project for production
echo "Building Angular application..."
npm install --legacy-peer-deps --engine-strict=false
npm run build -- --configuration production

cp "$UI_Dir/src/assets/appsettings.prod.json" "$DIST_PATH/assets/appsettings.json"

# Create the Azure resource (if it doesn't exist)
echo "Checking for Azure Static Web App resource..."
az staticwebapp create \
  --name "$APP_NAME_UI" \
  --resource-group "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --sku Free

npm install -g @azure/static-web-apps-cli

# 4. Deploy the build artifacts
echo "Deploying to Azure..."
swa deploy "$DIST_PATH" \
  --env production \
  --app-name "$APP_NAME_UI" \
  --resource-group "$RESOURCE_GROUP"
  
WEB_APP_URL=$(az staticwebapp show \
    --name "$APP_NAME_UI" \
    --resource-group "$RESOURCE_GROUP" \
    --query "defaultHostname" \
    --output tsv)
    
echo "Configuring CORS for: $WEB_APP_URL"
az webapp cors add --resource-group $RESOURCE_GROUP --name "$APP_NAME_API" --allowed-origins "$WEB_APP_URL"
az resource update --name web --resource-group $RESOURCE_GROUP --namespace Microsoft.Web --resource-type config --parent "sites/$APP_NAME_API" --set properties.cors.supportCredentials=true

