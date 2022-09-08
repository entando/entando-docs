---
sidebarDepth: 2
---

# Entando Bundle

The Entando Bundle structure is organized to leverage composable development methods, decoupling microservices, micro frontends, API management, and services such as ID management and databases.  Managed by the **ent bundle CLI** module, it builds and installs the bundle using the descriptor `entando.json`. This single descriptor defines all the components and resources of the docker-based bundle. The following page describes the descriptor, the bundle structure, its conventions, and the building process. 

The docker-based approach is a development from the previous Entando Bundle structure and to see the differences, refer to the [Bundle Evolution](bundle-comparison.md) page.

## Entando Bundle Conventions

* There is a single bundle descriptor `entando.json` written by the [ent bundle CLI](../getting-started/ent-bundle.md). 
* Microservices and micro frontends are partitioned into their own folders, with artifacts and Dockerfiles written to them.
* The `platform` directory is dedicated to other components such as fragments, pages, and static resources. For more information on component types and descriptors, see the [Bundle Component Details page](ecr-bundle-details.md). 
* The `svc` directory is dedicated to auxiliary services and the docker-compose configuration files that define them. The ent CLI enables, starts and stops the services. MySQL, PostreSQL, and Keycloak services are available with Entando out-of-the-box, and for more details, go to the [ent CLI Services page](../getting-started/ent-svc.md).
* Optionally, a thumbnail for your bundle can be set automatically by adding a JPG or PNG image file in the bundle root folder. The file MUST be named thumbnail and be 100kb or less, e.g. thumbnail.png.

## Project Structure 
```sh
   bundle-project/
  .git/
  .entando/
    config.json    <= internal folder, gitignored; contains mainly YAML descriptors, cached metadata, logs, intermediate build artifacts
    output/
      descriptors/
    logs/
      microservices/
      microfrontends/
  microservices/
    ms1/    <= component sources and native output
    ms2/    <= 
    ms3/    <=          
  microfrontends/
    mfe1/   <= component sources and native output
    mfe2/   <= 
    mfe3/   <= 
        mfe3-config <= mfe3 config UI         
  platform/      <= platform specific components    
    pageModels/
      pageModel.yml
    pages/  
  svc/     <= auxiliary services 
    keycloak.yml
    ...         
  entando.json    <= project bundle descriptor
  thumbnail.jpg    <= bundle thumbnail
```

## Bundle Development Process

**Image Here**

The ent bundle CLI module manages the building and processing of an Entando Bundle. From initialization to installation, from adding MFEs and MSs to calling for services such as Keycloak and making API claims, the ent bundle commands streamline the development of a bundle. 

At initialization, the project scaffolding is built. A project can be started from scratch or retrieved interactively from the Entando Hub. From the Hub, a bundle can be adapted as desired. Otherwise MFEs, MSs, services, and API claims are added. At this stage, components can be run locally and independently with the ent bundle commands.

The next steps build and pack the project into a bundle with the bundle descriptor, resulting in new Docker images. The specifics depends on the component type and stack and Entando uses the mvn and npm standard tools. The build phase constructs the microservices and micro frontends while the pack phase generates artifacts and builds the Docker images. Images are built for the bundle and for each microservice.

The images are pushed to a Docker registry in the publish step. Credentials are initialized and cached to .entando/config.json and version tags are set. A custom registry can be used as needed.

Finally, the bundle can be deployed into a running Entando instance and installed into the local Hub. Any improvements to the bundle is made easy by retracing the **4 steps: pack, publish, deploy and install**. The install step can also be completed in the App Builder.

At every phase of the process, options are available to fine tune the process and to see more details, go to the [ent bundle CLI](../getting-started/ent-bundle.md) documentation. 

## Bundle Descriptor entando.json
The following is a list of specifications in the bundle descriptor and its component parts.

#### Bundle Descriptor Specifications
|Name|Type|Validation|Description|
|:-|:-|:-|:-----------------------|
|`name`|String|Mandatory|Bundle project name. Also used as the default Docker image name|
|`version`|String|Madatory|Bundle version. It will be used as the default Docker image tag|
|`displayName`|String||A descriptive label to be used in the UI in place of name|
|`global`|Global|Optional|Global bundle configuration item|
|`global: nav`|MenuEntry[]|Optional|Bundle menu global links|
|`microservices`|Microservices|Optional|Bundle Microservices|
|`microfrontends`|Micro Frontends|Optional|Bundle Micro Frontends|

```json
{
  "name": "bundle-name",
  "description": "bundle description",
  "type" : "bundle",
  "version": "0.0.1",
  "global": {
    "nav": [
      {
        "label": {
          "it": "Italian Label",
          "en": "English Label"
        },
        "target": "global-nav-target",
        "url": "/global-nav-url"
      }
    ]
  }
}
```

#### Microservices Specifications
|Name|Type|Validation|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|Mandatory||Microservice name|
|`stack`|Enum|Mandatory|*spring-boot   *node|Microservice stack |
|`dbms`|Enum|Optional|*none  *embedded  *postgresql  *mysql  *oracle|DBMS required by the MS to provide services|
|`ingressPath`|String|Optional||Custom ingress path|
|`healthCheckPath`|String|Optional||Endpoint for a health check|
|`deploymentBaseName`|String|Optional||Used for defining custom pod names|
|`roles`|String[]|Optional||Exposed security roles|
|`env`|EnvironmentVariable[]|Optional||Required environment variables|
|`commands`|Command[]|Optional||Custom commands definitions|

**Microservices Sample Code**
```json
"microservices": [
    {
      "name": "ms-name",
      "stack": "spring-boot",
      "dbms": "mysql",
      "ingressPath": "/ingress",
      "healthCheckPath": "/management/health",
      "roles": ["admin"],
      "env": [{ "VAR_1": "value" }]
    }
  ],
```

#### Micro Frontends Specifications
|Name|Type|Validation|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|M||Micro frontend name|
|`stack`|Enum|M|*react   *angular|MFE stack|
|`type`|Enum|M|*widget  *widget-config  *app-builder|Type of MFE|
|`slot`|Enum|Mandatory for `type=app-builder`|*primary-header  *primary-menu  *content|Named reference to an App Builder embedded position in a specific layout|
|`paths`|string[]|Mandatory for `type=app-builder` and `slot=content`||App Builder activation paths|
|`titles`|[lang:string]: string|Mandatory for `type=widget`||Localized widget labels|
|`group`|String|Mandatory||Visibility group name|
|`publicFolder`|String|Optional||MFE public folder (typically where index.html is located)|
|`apiClaims`|[lang:string]: string|Optional||See [API Claim spec](#api-claim-specification) below|
|`nav`|MenuEntry[]|Optional||Bundle menu global links|
|`commands`|Command[]|Optional||Custom commands definitions|
|`buildFolder`|String|Optional||Corresponds to the MFE build folder |

#### Micro Frontends Sample Code
```json
 "microfrontends": [
    {
      "name": "mfe-name",
      "stack": "react",
      "titles": { "en": "en_mfe_title", "it": "it_mfe_title" }
      "type": "app-builder",
      "slot": "content",
      "paths": ["/path1"],
      "group" : "free",
      "apiClaims": [
          {
              "name": "int-api-claim",
              "type": "internal",
              "serviceId": "ms-name"
          },
          {
              "name": "ext-api-claim",
              "type": "external",
              "bundleId": "ext-bundle",
              "serviceId": "ext-bundle-ms"
          }
      ],
    },
    {
      "name": "mfe2-name",
      "stack": "react",
      "type": "widget",
      "publicFolder": "public",
      "titles": { "en": "en_mfe2_title", "it": "it_mfe2_title" },
      "group": "free",
      "commands": { "build": "custom-command" }
    }
```
#### API Claim Specification
|Name|Type|Validation|Possible Value|Description|
|:-|:-|:-|:-|:------------------------|
|`name`|String|Mandatory||Name|
|`type`|Enum|Mandatory|*internal  *external|API claim specifying internal or external to bundle|
|`serviceName`|String|Mandatory||Microservice name into the bundle|
|`bundle`|String|Mandatory only for  `type=external`||Bundle Docker URL|
* For an example, see the [Micro Frontends sample code](#micro-frontends-sample-code) above.

#### Permission Specification
|Name|Type|Validation|Description|
|:-|:-|:-|:------------------------|
|`clientId`|String|Mandatory|Client ID to assign|
|`permission`|String|Mandatory|Roles to assign to the client ID|

#### Command Specification
|Name|Type|Validation|Description|
|:-|:-|:-|:------------------------|
|`build`|String|Optional|Custom build command|
|`run`|String|Optional|Custom run command|

#### Command Spec Sample Code
```json
"name": "another-ms",
            "stack": "spring-boot",
            "healthCheckPath": "/health",
            "commands": {
                "run": "mvn -Dspring-boot.run.arguments=\"--server.port=8082\" spring-boot:run"
            },
```

#### MenuEntry Specification
|Name|Type|Validation|Possible Values|Description|
|:-|:-|:-|:-|:------------------------|
|`label`||Mandatory||Localized entry on the PBC menu|
|`target`||Mandatory|*internal  *external|Where to open the menu link|
|`url`|String|||Address of the page to open when the menu is clicked|

#### Environment Variables Specification
|Name|Type|Validation|Description|
|:-|:-|:-|:------------------------|
|`name`|String|Mandatory|Name of the environment variable to inject|
|`value`|String|Optional|Value to give to the environment variable|
|`valueFrom`|SecretKeyRef|Optional|Reference to the Secret from which to fetch the value|

### Troubleshooting
1. **Support for Media/Images in Micro Frontends that are not in the Bundle**

Issues have been reported when rendering media and images of installed MFEs that result in an error of the URL not being found. Since most MFEs are transpiled using Webpack, a solution is to use a Webpack configuration called [Public Path](https://webpack.js.org/guides/public-path/) to specify the base path of the assets.

In Entando’s Portal UI render phase, the platform declares a base path of your MFE. For every widget published on a page, the App Engine will automatically declare the base path of the widget into the object `window.entando.widgets[widget-name].basePath`. 

Example: `YOUR-WIDGET` is published on a page; the base path of this widget is the object `window.entando.widgets[YOUR-WIDGET].basePath`.

Declare the base path in your MFE app, then create a file `public-path.js` with this one line:

```yaml
__webpack_public_path__ = window.entando.widgets[‘my-widget’].basePath;
```
