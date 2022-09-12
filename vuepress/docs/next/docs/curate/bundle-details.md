---
sidebarDepth: 2
---

# Entando Bundle

The Entando Bundle structure is organized to leverage composable development methods, decoupling microservices, micro frontends, API management, and services such as ID management and databases.  Managed by the **ent bundle CLI** module, it builds and installs a bundle using the descriptor `entando.json`. This single descriptor defines all the components and resources of the docker-based bundle. The following page describes the descriptor, the bundle structure, its conventions, and the building process. 

The docker-based approach is a development from the previous Entando Bundle structure and to see the differences, refer to the [Bundle Evolution](bundle-comparison.md) page.

## Entando Bundle Conventions

* There is a single bundle descriptor, `entando.json`, initialized and managed by the [ent bundle CLI](../getting-started/ent-bundle.md). 
* Microservices and micro frontends each have their own folders and can be built independently.
* The `platform` directory is dedicated to other components such as fragments, pages, and static resources. 
* The `svc` directory is for auxiliary services and the docker-compose configuration files that define them. The ent CLI enables, starts and stops the services. MySQL, PostreSQL, and Keycloak services are available with Entando out-of-the-box, and for more details, go to the [ent CLI Services page](../getting-started/ent-svc.md).
* Optionally, a thumbnail for your bundle can be set by adding a JPG or PNG image file in the bundle root folder. The file MUST be named thumbnail and be 100kb or less, e.g. thumbnail.png.

## Project Structure 
```sh
   bundle-project/
  .git/
  .entando/  <= An internal working folder for the CLI for caches, logs, and build artifacts
    config.json    
    output/
      descriptors/
    logs/
      microservices/
      microfrontends/
  microservices/   <= Source and native build output for each microservice
    ms1/    
    ms2/   
    ms3/       
  microfrontends/  <= Source and native build output for each microfrontend
    mfe1/   
    mfe2/   
    mfe3/   
    mfe3-config <= mfe3 config UI         
  platform/     <= platform specific components    
    pageModels/
      pageModel.yaml
    pages/  
  svc/     <= auxiliary services for local development 
    keycloak.yaml
    ...         
  entando.json    <= project bundle descriptor
  thumbnail.jpg    <= bundle thumbnail
```

## Bundle Development Process

**Image Here**

The ent bundle CLI module manages the building and publishing of an Entando Bundle. From initialization to installation, from adding MFEs and MSs to calling for services such as Keycloak and making API claims, the ent bundle commands streamline the development of a bundle. 

At initialization, the project scaffolding is built. A project can be started from scratch or retrieved interactively from any Entando Hub as a starting point for a new bundle. MSs, MFEs, services, and API claims are then added. At this stage, components can be run locally and independently with the ent bundle commands.

The next steps build and pack the project into a bundle with the bundle descriptor, resulting in new Docker images. The specifics depend on the component type and stack, and Entando uses Spring Boot, mvn, and npm standard tools. The build phase constructs the microservices and micro frontends while the pack phase generates artifacts and builds the Docker images. Images are built for the bundle and for each microservice.

The images are pushed to a Docker registry in the publish step and tagged according to the bundle configuration. A custom registry may also be used.

Finally, the bundle can be deployed into a running Entando instance and installed into the local Hub. Any improvements to the bundle is made easy by retracing the **4 steps: pack, publish, deploy and install**. The install step can also be completed by the application Composer in the App Builder UI.

At every phase of the process, options are available to fine tune the process, and to see more information, go to the [ent bundle CLI](../getting-started/ent-bundle.md) documentation. 

## Bundle Descriptor entando.json
The following is a list of specifications in the bundle descriptor and its component parts.

### Bundle Descriptor Specifications
|Name|Type|Required|Description|
|:-|:-|:-|:-----------------------|
|`name`|String|Yes|Bundle project name; also used as the default Docker image name|
|`version`|String|Yes|Bundle version; used as the default Docker image tag|
|`displayName`|String||A descriptive label to be used in the UI in place of a name|
|`global`|Global|No|Global bundle configuration item|
|`global: nav`|[MenuEntry[]](#menuentry-specification)|No|Bundle menu global links|
|`microservices`|Microservices|No|Bundle Microservices|
|`microfrontends`|Micro Frontends|No|Bundle Micro Frontends|

```json
{
  "name": "my-bundle-name",
  "description": "my bundle description",
  "type" : "bundle",
  "version": "0.0.1"
  "svc": [
        "keycloak"
    ],
}
```

### Microservices Specifications
|Name|Type|Required|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|Yes||Microservice name|
|`stack`|Enum|Yes|*spring-boot   *node|Microservice stack |
|`dbms`|Enum|No|*none  *embedded  *postgresql  *mysql  *oracle|DBMS required by the MS to provide services|
|`ingressPath`|String|No||Custom ingress path|
|`healthCheckPath`|String|No||Endpoint for a health check|
|`deploymentBaseName`|String|No||Used for defining custom pod names|
|`roles`|String[]|No||Exposed security roles|
|`env`|[EnvironmentVariable[]](#environment-variables-specification)|No||Required environment variables|
|`commands`|Command[]|No||Custom commands definitions|

#### Microservices Sample Code
```json
"microservices": [
    {
      "name": "my-ms",
      "stack": "spring-boot",
      "dbms": "mysql",
      "ingressPath": "/ingress",
      "healthCheckPath": "/management/health",
      "roles": ["admin"],
      "env": [{ "VAR_1": "value" }]
    }
  ],
```

### Micro Frontends Specifications
|Name|Type|Required|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|Yes||Micro frontend name|
|`stack`|Enum|Yes|*react   *angular|MFE stack|
|`type`|Enum|Yes|*widget  *widget-config  *app-builder|Type of MFE|
|`slot`|Enum|Yes for `type=app-builder`|*primary-header  *primary-menu  *content|Named reference to an App Builder embedded position in a specific layout|
|`paths`|String[]|Yes for `type=app-builder` and `slot=content`||App Builder activation paths|
|`titles`|String[]|Yes for `type=widget`||Localized widget labels|
|`group`|String|Yes||Visibility group name|
|`publicFolder`|String|No|Default is `public`|MFE public folder (typically where index.html is located)|
|`apiClaims`|String[]|No||See [API Claim spec](#api-claim-specification) below|
|`nav`|[MenuEntry[]](#menuentry-specification)|No||Bundle menu global links|
|`commands`|Command[]|No||Custom commands definitions|
|`buildFolder`|String|No|Default is `build`|Corresponds to the MFE build folder |
|`mfeConfig`| MfeConfig[]|No||Custom configuration widget for App Builder|

#### Micro Frontends Sample Code 
```json
 "microfrontends": [
    {
      "name": "my-mfe",
      "stack": "react",
      "titles": { "en": "my_en_mfe_title", "it": "my_it_mfe_title" }
      "type": "app-builder",
      "slot": "content",
      "paths": ["/path1"],
      "group" : "free",
      "apiClaims": [...],
    },
    {
      "name": "my-mfe2",
      "stack": "react",
      "type": "widget",
      "publicFolder": "public",
      "titles": { "en": "my_en_mfe2_title", "it": "my_it_mfe2_title" },
      "group": "free",
      "commands": { "build": "custom-command" }
    }
```
#### mfeConfig Specifications
|Name|Type|Required|Description|
|:-|:-|:-|:------------------------|
|params| MfeParam[]  |Yes| User configuration for executing a widget|
|contextParams|String[]| Yes | Information extracted from the application context |
|systemParams|String[]| Yes | Static and system settings for execution of widget |

#### MfeParam Specification
|Name|Type|Required|Description|
|:-|:-|:-|:------------------------|
|name|String|Yes|Name of the parameter|
|description|String|No|Description of the parameter|

```json
{
  "systemParams": {
    "api": {
      "int-api": {
        "url": "apiClaim_int__DASH__api"
      },
      "ext-api": {
        "url": "apiClaim_ext__DASH__api"
      }
    }
  },
  "contextParams": {
    "page_code": "${page_code}",
    "info_startLang": "${info_startLang}",
    "systemParam_applicationBaseURL": "${systemParam_applicationBaseURL}"
  },
  "params": {
	  "paramA": "${widget_paramA}",
    "paramB": "${widget_paramB}"
  }
}
```
### API Claim Specification
|Name|Type|Required|Possible Value|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|Yes||Name|
|`type`|Enum|Yes|*internal  *external| Kind of claim with reference to bundle |
|`serviceName`|String|Yes||Microservice name into the bundle|
|`bundle`|String|Yes only for  `type=external`||Bundle Docker URL|

#### API Claim Spec Sample
 ```json
 "apiClaims": [
          {
              "name": "int-api-claim",
              "type": "internal",
              "serviceId": "my-ms"
          },
          {
              "name": "ext-api-claim",
              "type": "external",
              "bundleId": "ext-bundle",
              "serviceId": "ext-bundle-ms"
          }
      ],
 ```
### Command Specification
|Name|Type|Required|Description|
|:-|:-|:-|:------------------------|
|`build`|String|No|Custom build command|
|`run`|String|No|Custom run command|

#### Command Spec Sample Code
```json
"name": "my-ms3",
            "stack": "spring-boot",
            "healthCheckPath": "/health",
            "commands": {
                "run": "mvn -Dspring-boot.run.arguments=\"--server.port=8082\" spring-boot:run"
            },
```

#### MenuEntry Specification
|Name|Type|Required|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`label`|String[]|Yes||Localized entry on the PBC menu|
|`target`|Enum|Yes|*internal  *external|Where to open the menu link|
|`url`|String|||Address of the page to open when the menu is clicked|

#### Environment Variables Specification
|Name|Type|Required|Description|
|:-|:-|:-|:------------------------|
|`name`|String|Yes|Name of the environment variable to inject|
|`value`|String|No|Value to give to the environment variable|
|`valueFrom`|SecretKeyRef|No|Reference to the Secret from which to fetch the value|

<!--
Troubleshooting
1. **Support for Media/Images in Micro Frontends that are not in the Bundle**

Issues have been reported when rendering media and images of installed MFEs that result in an error of the URL not being found. Since most MFEs are transpiled using Webpack, a solution is to use a Webpack configuration called [Public Path](https://webpack.js.org/guides/public-path/) to specify the base path of the assets.

In Entando’s Portal UI render phase, the platform declares a base path of your MFE. For every widget published on a page, the App Engine will automatically declare the base path of the widget into the object `window.entando.widgets[widget-name].basePath`. 

Example: `YOUR-WIDGET` is published on a page; the base path of this widget is the object `window.entando.widgets[YOUR-WIDGET].basePath`.

Declare the base path in your MFE app, then create a file `public-path.js` with this one line:

```yaml
__webpack_public_path__ = window.entando.widgets[‘my-widget’].basePath;
```
-->