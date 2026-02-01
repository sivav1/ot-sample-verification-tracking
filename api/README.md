# Sample verification tracker API

## Prerequisites

* .NET 9.0 SDK (or your specific version)
* Azure CLI

## Local development

### Configuration

* There's nothing much of a configuration variables required
* The system uses in memory database and hence there's no database connection needed separately

## Project Structure

The solution contains 2 projects. One is the main APi project `Ot.SampleVerificationTracker.Api` which is like a binder to run the API service and the second one is `Ot.SampleVerificationTracker.Common` which contains all the common resources like services, models, Dtos, Repositories, etc.
* Models/Dto: Data transfer objects and Entities.
* Repositories/: The repositories that communicates with db context to do db operations.
* Services/: Business logic and external integrations. 

## Azure deployment

This API can be deployed to an azure app service which can be either window or linux based.

### 1. Login to azure cli
```
az login
```

### 2. Publish the project
```
dotnet publish -c Release -o ./publish
```

### 3. Deploy to App Service
```
az webapp deployment source config-zip \
--resource-group otResourceGroup  \
--name ot-sample-verification-api  \
--src ./publish/publish.zip \
```

## Improvements
This is a very basic service. I have added just basic development methodologies to make sure the connectivity between front-end and the service.
Some of the improvements I think could have been attempted are as follows
1. Basic CORS policy applied in code level. An extensive level of dynamic CORS policy set could be applied to deal with the front-end sources of different environments instead of allowing all.
2. API versioning can be applied with the help of DI during the Web application builder phase and ApiVersion attributes in controllers. It can also help in marking a specific version for deprecation and inform the consumer
3. This is not a secured API. So we could add authorizers and authentication methods to make sure no unauthorized access is possible
4. I have added a general global exceptionhandler which may not handle the validation error response. So both maybe slightly different. We could improve it to respond with a common response structure
5. We could have added duplicate validation before adding the new sample
