---
sidebarDepth: 2
---

# Bundle Upgrade Guideline

This guideline describes the process for upgrading a git-based bundle to the newly introduced docker-based bundle (v5). 
 
Git-based bundles do not need to be to upgraded. Both types of bundles are compatible with Entando 7.1+, but the v5 bundles provide several innovations and an improved developer experience.

The improvements include:
* A simplified bundle directory structure
* A decoupled build and deployment process that is easier to understand, modify, and troubleshoot
* CI/CD integration and support 
* A single required Git source repository with Docker image repositories created automatically as needed
* Optimized file storage and transfer methods using a layered file system, beneficial for large projects
* A standardized bundle address format

## Quick Reference
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
ent bundle mfe add YOUR-MFE1
```
>Docker-based bundles have a centralized bundle descriptor that includes specifications for bundle entities such as micro frontends, microservices, APIs, DBMS, and ID management. 

2. Copy the MFE files into the `YOUR-BUNDLE-NAME/microfrontends` directory. For instance, for an MFE named YOUR-MFE1: 

``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MFE1/{.,}* microfrontends/YOUR-MFE1
```
>Micro frontends and microservices are partitioned into their own directories in v5 bundles to streamline the CI/CD process.

3. Add your microservice:
``` sh
ent bundle ms add YOUR-MS1
```
4. Copy YOUR-MS1 files to the new location:
``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MS1/{.,}* microservicess/YOUR-MS1
```
5. Repeat steps 1 through 4 for all micro frontends and microservices.

### 4. Add API Claims
1. Add an API claim to connect `YOUR-MFE1` to a microsersive as needed. The connection information is added to the descriptor `entando.json`.
```shell
ent bundle api add YOUR-MFE1 YOUR-API --serviceName=YOUR-MS1 --serviceUrl=http://localhost:8081
```

2. Repeat the previous step for all APIs as needed.

### 5. Add Custom Commands to Test Locally

For local development and testing, a custom command is needed in the `entando.json` to use a different port for each MFE as shown below: 
``` 
    "microfrontends": [
        {
            "name": "YOUR-MFE1",
            "customElement": "YOUR-MFE1",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "commands": {
                "run": "npm install && PORT=3000 npm start"
            },
            "apiClaims": [
                {
                    "name": "YOUR-API1",
                    "type": "internal",
                    "serviceName": "YOUR-MS1"
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
### 7. Pack and Install
With the bundle project files in place and tested, [build and install](../../tutorials/create/pb/publish-project-bundle.md) your bundle.
   <EntandoInstall71/>

For an example tutorial, see [Generate Microservices and Micro Frontends](https://developer.entando.com/next/tutorials/create/ms/generate-microservices-and-micro-frontends.html#configure-the-components).


