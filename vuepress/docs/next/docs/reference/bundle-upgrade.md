---
sidebarDepth: 2
---

# Bundles Upgrade Guideline

Two types of bundles can be utilized on Entando 7.1+. The original git-based bundle added a composable method with reusable components. The newly introduced docker-based bundles optimize their structure and expands functionality. The [Bundle Evolution Comparison](./bundle-comparison.md) table lists the differences between the two types. The following page describes the guidelines for upgrading to docker-based v5 bundles.

Git-based bundles do not need to be to upgraded. Both types of bundles are compatible on Entando 7.1+, but docker-based bundles provide several innovations and an improved developer experience.

The improvements include:
* Simplified bundle directory structure
* A decoupled build and deployment process that is easier to understand, modify, and troubleshoot
* CI/CD integration and support 
* One Git source repository required with Docker image repositories created automatically as needed
* Optimized file storage and transfer methods using a layered file system, beneficial for large projects
* Standardized bundle address format

## Quick Reference
* [Bundle Specifications](../curate/bundle-details.md)

* [Bundle Management](../getting-started/ent-bundle.md)

* [Bundle Version Comparison Table](./bundle-comparison.md)

## Upgrade Process

### Initialize Bundle 

1. Initialize a new bundle to set up the standard Entando Bundle structure using the ent CLI:

``` 
ent bundle init YOUR-BUNDLE-NAME
```
### Copy Assets
1. Use the ent CLI bundler command to export assets from an existing Entando Bundle. See the step-by-step [Export and Publish Tutorial](../../tutorials/create/pb/export-bundle-from-application.md). 

2. `YOUR-BUNDLE-NAME/platform` directory is designated for resources such as fragments, contents, pages, and templates. Copy the output of the ent bundler to this folder. You can also accomplish this manually but there are advantages to the bundler such as generating top level descriptors for platform resources.
Note that widgets that are not MFEs are considered platform entities on Entando and should be placed in the `platform/widgets` directory.

### Add Micro Frontends & Microservices
 
1. Add your micro frontend to the new bundle descriptor `entando.json`:
``` sh
ent bundle mfe add YOUR-MFE1
```
The docker-based bundle has a centralized bundle descriptor with bundle entities such as micro frontends, microservices, APIs, DBMS, and ID management specifications. 

2. Copy the MFE files into `YOUR-BUNDLE-NAME/microfrontends` directory. For instance, for an MFE named YOUR-MFE1: 

``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MFE1/{.,}* microfrontends/YOUR-MFE1
```
Micro frontends and microservices are partitioned into their own directories in the docker-based bundles to streamline the CI/CD process.

3. Add your microservice:
``` sh
ent bundle ms add YOUR-MS1
```
4. Copy the microservice YOUR-MS1 files to the new location:
``` sh
mv YOUR-ORIGIN-DIRECTORY/YOUR-MS1/{.,}* microservicess/YOUR-MS1
```
5. Repeat steps 1 through 4 for all micro frontends and microservices.

### Add API Claims
1. Now add an API claim to connect the `YOUR-MFE1` to a microsersive as needed. The connection information is added to the descriptor `entando.json`.
```shell
ent bundle api add YOUR-MFE1 YOUR-API --serviceName=YOUR-MS1 --serviceUrl=http://localhost:8081
```

2. Repeat the previous step for all APIs as needed.

### Add Custom Commands to Test Locally

1. For local development and testing, a custom command is needed in the `entando.json` to use a different port for each MFE as shown below: 
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
Note that in production, all microservices must run on port 8081.

### Add Auxiliary Services
Copy the auxiliary services such as DBMS or Keycloak into the `svc` directory as needed and enable them for local testing. For a Keycloak service:
``` sh
mv YOUR-ORIGIN-DIRECTORY/* svc/
ent bundle svc enable keycloak
```
### Pack and Install
With the bundle project files in place and tested, [build and install](../../tutorials/create/pb/publish-project-bundle.md) your bundle.
   <EntandoInstall71/>


For an example tutorial, see [Generate Microservices and Micro Frontends](https://developer.entando.com/next/tutorials/create/ms/generate-microservices-and-micro-frontends.html#configure-the-components)


