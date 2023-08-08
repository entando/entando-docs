---
sidebarDepth: 2
---

# Convert v1 Bundle to v5  

This tutorial describes the process for converting a git-based (v1) bundle to the docker-based (v5) format introduced in Entando 7.1. The interactive automated conversion process using the ent CLI is listed below, followed by the manual steps.

**Advantages of the v5 Bundles**  
Docker-based (v5) bundles provide several innovations and an improved developer experience. Developers are encouraged to use this format for any new bundles and to upgrade older bundles.

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

## Automated Process

Use the following ent bundle command to convert your v1 bundle, using the path to the source descriptor YAML. The new bundle will be located in the same parent directory as the original and noted when the execution is complete. The interactive process will prompt you for some specifications about your bundle. These details are below. 

``` bash 
ent bundle convert --bundle-path /YOUR-BUNDLE-PATH
```

* For every micro frontend in your bundle, you will be asked to confirm if they should be treated as MFEs, widgets, or configuration widgets. 

* To provide the path containing the Docker files for services, you can enter a location when promted or use the flag `--svc-path`, e.g.,  `ent bundle convert --bundle-path YOUR-BUNDLE-PATH --svc-path YOUR-PATH/YOUR-SERVICES-FOLDER`.

* This automated process preserves these properties: healthCheckPath, roles, dbms, permissions, securityLevel, resources, ingressPath.

* Static assets or resources are moved to the `platform` folder in the v5 project. The typical assets included in this conversion process are as follows, in their corresponding folders. If any assets are included under names not on this list, they must be dealt with manually. 
PLATFORM_FOLDERS_NAME = [
'fragments',
'categories',
'pages',
'pageTemplates',
'contentTypes',
'contentTemplates',
'contents',
'assets',
'groups',
'labels',
'languages',
'pageModels',
'contentModels',
'resources'
]
* If the v1 bundle used the `ingressPath` specification in a microservice, it should be removed and replaced with an API claim. To create an API, use the `ent bundle api add` command and for more information, see the [API claim tutorial](../../tutorials/create/ms/add-api-claim.md).

>Note: If the original Docker compose file had multiple services, the command `ent bundle svc start YOUR-SERVICE-NAME` will not work for the converted v5 bundle because a valid service should have one service and the name of the service is the filename.

## Manual Process

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

## Package, Deploy and Install the Bundle
[Build and install](../../tutorials/create/pb/publish-project-bundle.md) your bundle.
   <EntandoInstallBundle/>

For an example tutorial, see [Generate Microservices and Micro Frontends](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md#configure-the-components).


