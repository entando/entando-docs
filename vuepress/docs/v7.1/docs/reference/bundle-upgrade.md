---
sidebarDepth: 2
---

# Bundle Upgrade Guideline

This guideline describes the process for upgrading a git-based bundle to the docker-based bundle (v5) introduced in Entando 7.1. 
 
Git-based bundles do not need to be to upgraded. Both types of bundles are compatible with Entando 7.1+, but the v5 bundles provide several innovations and an improved developer experience.

The improvements include:
* A simplified bundle directory structure
* A decoupled build and deployment process that is easier to understand, modify, and troubleshoot
* CI/CD integration and support 
* A single required Git source repository with Docker image repositories created automatically as needed
* Optimized file storage and transfer methods using a layered file system, beneficial for large projects
* A standardized bundle address format

## Quick References
* [Bundle Specifications](../curate/bundle-details.md)

* [Bundle Management](../getting-started/ent-bundle.md)

* [Bundle Version Comparison Table](./bundle-comparison.md)

## Upgrade Process

### 1. Initialize Bundle 

Initialize a new bundle to set up the docker-based bundle structure using the ent CLI:

``` 
ent bundle init YOUR-BUNDLE-NAME
```
### 2. Copy Assets
1. Use the ent CLI bundler command to export assets from an existing Entando Bundle. See the step-by-step [Export and Publish Tutorial](../../tutorials/create/pb/export-bundle-from-application.md). 

2. The `platform` directory is designated for resources such as fragments, contents, pages, and templates. Copy the output of the ent bundler to 'YOUR-BUNDLE-NAME/platform`. 
      
>-You can also accomplish this manually, but the ent bundler can automatically generate top-level descriptors for platform resources.  
-Widgets that are not MFEs are considered platform entities on Entando and should be placed in the `platform/widgets` directory.

### 3. Add Micro Frontends & Microservices
 
1. From inside your bundle project folder, add your micro frontend to the bundle descriptor `entando.json`:
``` sh
ent bundle mfe add YOUR-MFE
```
>Docker-based bundles have a centralized bundle descriptor that includes specifications for bundle entities such as micro frontends, microservices, and platform components. 

2. Copy the MFE files into `YOUR-BUNDLE-NAME/microfrontends`. For instance, for an MFE named YOUR-MFE: 

``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MFE/{.,}* microfrontends/YOUR-MFE
```
>Micro frontends and microservices are placed in their own directories in v5 bundles to streamline the CI/CD process.

3. Add your microservice:
``` sh
ent bundle ms add YOUR-MS
```
4. Copy YOUR-MS files to the new location:
``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MS/{.,}* microservicess/YOUR-MS
```
5. Repeat steps 1 through 4 for all micro frontends and microservices.

### 4. Add API Claims
1. Add an API claim to connect `YOUR-MFE` to a microservice as needed. The connection information is added to the descriptor `entando.json`.
```shell
ent bundle api add YOUR-MFE YOUR-API --serviceName=YOUR-MS --serviceUrl=http://localhost:8081
```

2. Repeat the previous step for all APIs as needed.

>Refer to the [API Management](../getting-started/ent-api.md) page for additional information.

### 5. Add Custom Commands to Test Locally (Optional)

For local development and testing, a custom command can be provided in the `entando.json` to specify a different port for each MFE as shown below: 
``` 
    "microfrontends": [
        {
            "name": "YOUR-MFE",
            "customElement": "YOUR-MFE",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "commands": {
                "run": "npm install && PORT=3000 npm start"
            },
            "apiClaims": [
                {
                    "name": "YOUR-API",
                    "type": "internal",
                    "serviceName": "YOUR-MS"
                }
            ]
        },
        {
            "name": "YOUR-MFE2",
            "customElement": "YOUR-MFE2",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "titles": {
                "en": "YOUR-MFE2",
                "it": "YOUR-MFE2"
            },
            "commands": {
                "run": "npm install && PORT=3001 npm start"
            },
            "apiClaims": [
                {
                    "name": "YOUR-API2",
                    "type": "internal",
                    "serviceName": "YOUR-MS2"
                }
            ]
        }
    ]
```
>In production, all microservices must run on port 8081.

### 6. Add Auxiliary Services
Copy auxiliary services such as DBMS or Keycloak into the `svc` directory as needed and enable them for local testing. For a Keycloak service:
``` sh
mv YOUR-ORIGIN-DIRECTORY/* svc/
ent bundle svc enable keycloak
```
>For details on adding services, see the [Auxiliary Services](../getting-started/ent-svc.md) page.

### 7. Pack and Install
[Build and install](../../tutorials/create/pb/publish-project-bundle.md) your bundle.
   <EntandoInstall71/>

For an example tutorial, see [Generate Microservices and Micro Frontends](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md#configure-the-components).


