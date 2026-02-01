# Sample Verification Tracker UI
A modern, reactive Angular application built as part of the OT Sample Verification Tracking system. This frontend provides a dashboard for tracking sample status and interacts with a .NET 9 REST API.
## Quick Start
### Prerequisites
* Node.js: v22.12.0 (LTS)
* Angular CLI: v19.0.0+
* Optional, for macOS management)

## Installation
### Clone and Navigate:

```
git clone <repository-url>
cd ui/ot-sample-verification-tracker-ui
```

### Install Dependencies:

```
npm install
```

### Start Development Server:
```
ng serve
```

Navigate to http://localhost:4200. By default it listens to port 4200.

## Configuration
The application uses a dynamic configuration approach.

Local: src/assets/appsettings.json points to http://localhost:5244/api by default.
Production: The deployment script injects the Azure API URL into the build artifacts, ensuring the code remains environment-agnostic.

## Improvements

This is a very basic angular app that just showcases a sample entry form and the list of samples already entered. I didn't want to overcomplicate it by introducing more of advanced concepts like ngrx stores whcih would be overengineering it. I will be honest, It's been some time since I worked with front-end (almost over a year), so I did take a bit more time than I anticipated for this. Also, I concentrated only on the main functionality and not much on the UX or UI looks.
1. I haven't applied any pagination in the table. I think that would be a first if I go for improving the experience
2. I have only added a generic error handling which could be improved to handle the API responses in a bit cleaner way
3. The way different components (`add-product-sample` and `list-product-sample`) are orchestrated into the main container is not ideal for a large scale application. I think it could be organised better for maintanance and performance improvements. We could maybe create some templated components, in thsi case, a template for split page, that could then be used as different page models for different routes.
4. It s not ideal to inject the api base url for production system via deployment script. We will have better approaches when deploying via github actions or other CI/CD pipelines 