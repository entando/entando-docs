---
sidebarDepth: 2
---

# Bundle Management - ent bundle CLI
The Entando Bundle CLI extends the functionality of **ent** with a modular bundle management system. Starting with Entando 7.1, `ent bundle` orchestrates the lifecycle of a project,  packaging it into convenient recognizable bundles that can be inserted into any Entando Application. This composable approach takes advantage of a single project descriptor and repository, along with centralized [API management](ent-api.md) and [DB and Keycloak services](ent-svc.md).

This document covers `ent bundle` operations and how it manages a project.

1. [Initialization](#initialization)
2. [Build](#build)
3. [Run](#run)
4. [Package](#package)
5. [Publish](#publish)
6. [ECR Deploy](#ecr-bundle-commands)

### Bundle Development Overview
A single JSON descriptor file works as the manifest for an Entando project to be converted into a reusable bundle. The process starts with the initialization step which
sets up the structure and scaffolding needed for a new project. Alternatively, the ent tool allows a bundle to be initialized directly from the Entando Hub, speeding up the development process. 

With the structure set up, ent builds the project components for the micro frontends (MFEs) and microservices (MS). They are built in parallel, using processes that are dependent on the stack, filtered by type and name and given version numbers. 

The next step runs the components locally, resulting in log files in each of the component's directories.  

The `ent pack` step generates the artifacts and builds the Docker images. A single image is created for the bundle and all micro frontends while each microservice gets its own image.  Finally, these are published to a Docker repository. 

See [Build and Publish a Project Bundle](../../tutorials/create/pb/publish-project-bundle.md) for more details.

## ent bundle Command List 
syntax: `ent bundle [commands] [subcommand] [options]` 
| Commands | Subcommands|  Description
|:-|:-|:----------------------------------
|`build`||Build components (MFE, MS) with a selector
|`info`||Show status information for the bundle project 
|`init`||Initialize project folder structure and descriptor
|`mfe` |	`add`	 |  	Add an MFE project component
| |	`init`	|	Initialize MFE with scaffolding 
| |	`rm` |	Remove MFE project component 	
|`ms`|`add`| Add MS project components		 	
|	| `init`	|	Initialize MS with scaffolding
| |	`rm` |	Remove an MS project component
|`run`|| Run bundle components 
|`pack`||Create distribution artifacts (Docker images)
|`publish`||Publish images to a Docker registry

## Initialization 

| Command |  Description
|:--|:--
|`ent bundle init [name]` |Initialize a new project with the default structure and files
|`ent bundle init [name] --from-hub`| Initialize a bundle from an Entando Hub

#### Command Details
* `ent bundle init [name] --from-hub`: Utilize an existing bundle from an Entando Hub to jumpstart your project. The ent bundle tool will pull the package and rebuild the structure as needed, ready for customization. 

## Build
 
| Command| Descriptions
|:--|:--
|`ent bundle build [component-name]` | Build a single component
|`ent bundle build [mfe-1] [ms-2]...`| Build one or more named components
|`ent bundle build --all`|Build all the components in the project
|`ent bundle build --all-ms`|Build all microservices|
|`ent bundle build --all-mfe`|Build all the micro frontends|

#### Command Details
`ent bundle build`: Constructs the project files based on the `entando.json` provided. It executes according to the type of stack your components are built with. For instance, a React MFE starts an npm build process. A `build` log file is generated for each component inside the .entando/logs directory of your project.

## Run	
| Command| Descriptions
|:--|:--
|`ent bundle run [component-name]` | Locally run your single component
|`ent bundle run [mfe-1] [ms-2]...`| Locally run one or more named components passed as arguments 
|`ent bundle run --all`| Locally run all the components in the bundle
|`ent bundle run --all-ms`| Locally run the microservices in the bundle
|`ent bundle run --all-mfe`| Locally run the MFEs in the bundle

#### Command Details
`ent bundle run`: Executes processes dependent on the component type and stack. For example, mvn spring:boot will execute for a Sping Boot microservice. All the components in the bundle will run in parallel, with a log file generated for each inside the .entando/logs directory.

## Package
| Command| Descriptions
|:--|:--
|`ent bundle pack`|Generate the bundle artifacts, and the bundle and MS images 
|`ent bundle pack --org [organization]`|Generate the bundle artifacts, passing the organization name to Docker Hub|
|`ent bundle pack --file [my-dockerfile]`|Use a custom Dockerfile for your bundle |

#### Command Details
* `ent bundle pack`: The artifacts generated for micro frontends and microservices are stored in their respective folders. Their format depends on the component type.  For instance, a React micro frontend may result in HTML, JavaScript and CSS files.  

Once the artifacts are generated, Docker images for the microservices are built using the Dockerfile located in each respective folder, with the Docker build command. If the Dockerfile is missing, the `pack` command exits with failure.

## Publish
| Command| Descriptions
|:--|:--
|ent bundle publish| Publish your Docker images to Docker registry (default)
|ent bundle publish --org [organization]|Publish Docker images to the Docker registry, with a specified organization |
|ent bundle publish --registry [registry]| Publish the Docker images to your Docker registry|

## ECR Commands
Entando provides a series of `ent ecr` commands for managing bundle interactions with [the Entando Component Repository](../../docs/compose/ecr-overview.md) (ECR).

| Command| Descriptions
|:--|:--
|`ent ecr deploy`| Generate the custom resource (CR) and deploy it to the current profile |
|`ent ecr gen-secret`| Generate and display a plugin secret skeleton|
|`ent ecr generate-cr`|Generate the custom resource |
|`ent ecr get-bundle-id [repository-url]` | Calculate and display the bundle ID
|`ent ecr get-plugin-id --auto [repository-url]` | Calculate and display the plugin ID
|`ent ecr install`| Install a bundle to the ECR|
|`ent ecr install --conflict-strategy=OVERRIDE`|Adopt a strategy for conflicts on installed bundles|
|`ent ecr list`| Display the list of bundles associated with the current profile|
|`ent ecr uninstall`| Uninstall a bundle|

#### Command Details
* `ent ecr get-bundle-id` and `ent ecr get-plugin-id`: Entando uses a unique identifier for your bundle as a way to provide customization parameters and add security controls for bundle-specific resources. A unique identifier is also generated for each microservice plugin in your project.

* `ent ecr install --conflict-strategy=OVERRIDE`: If a project bundle has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP`, or `OVERRIDE` strategy for components.

## Git-based Bundle Commands
These ent CLI commands are required when using a Git-based (v1) bundle.
| Command| Descriptions
|:--|:--
|`ent bundler from-git`|Generate a CR for publication or exporting from a Git repository|
|`ent bundler from-env`|Generate a CR from an existing environment for the current or selected location|
|`ent prj be-log`| Fetch logs from bundle plugins|
|`ent prj be-test-run`|Initialize backend microservices|
|`ent prj build`|Build project components|
|`ent prj deploy`| Deploy the bundle into the ECR|
|`ent prj ext-keycloak start`|Initialize Keycloak with Docker Compose|
|`ent prj fe-test-run`|Initialize one or more frontend widgets, each from its own shell|
|`ent prj get-bundle-id --auto`|Determine the project bundle ID|
|`ent prj get-plugin-id --auto --repo=[URL]`|Determine the plugin ID of each microservice in the project|
|`ent prj install`| Install the bundle into Entando|
|`ent prj install --conflict-strategy=OVERRIDE`|Adopt a strategy for conflicts on installed bundles
|`ent prj pbs-init` | Initialize the bundle directory
|`ent prj pbs-publish`| Publish the artifacts to GitHub and Docker Hub

#### Command Details
* `ent prj install --conflict-strategy=OVERRIDE`: If a project bundle has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP`, or `OVERRIDE` strategy for components.

* `ent prj get-bundle-id` and `ent prj get-plugin-id`:  Entando uses a unique identifier for your bundle as a way to provide customization parameters and add security controls for bundle-specific resources. A unique identifier is also generated for each microservice plugin in your project.

* `ent bundler`: This provides an interactive mode to identify components to export. Point the bundler to existing environments to extract components and static assets into a custom bundle. This bundle can be used to migrate from one Entando environment to another (e.g. Dev to QA) or as a framework for building a new application.

     * An `env.json` file to configure the application URLs and client credentials must live in the directory from which the bundler is run. For example:
         ``` json
         {
            "coreBaseApi": "http://YOUR-DOMAIN-OR-IP/entando-de-app",
            "componentManagerApi": "http://YOUR-DOMAIN-OR-IP/digital-exchange",
            "clientId": "YOUR-CLIENT-ID",
            "clientSecret": "YOUR-CLIENT-SECRET"
         }
         ```
        Instructions to export a bundle, including how to configure `env.json`, can be found in the [Export and Publish a Bundle tutorial](../../tutorials/create/pb/export-bundle-from-application.md).
     * Extraction Error: If you receive an `Unable to extract the application client secret` error message:
         1. Verify that the current profile namespace and application name are correct and match the output of the following command:
            ``` sh
             ent status
            ```
         2. Assign the appropriate namespace and application name:
             ``` sh
              ent appname YOUR-APPNAME
              ent namespace YOUR-NAMESPACE
            ```
Check out [Run Blueprint-generated Microservices and Micro Frontends in Dev Mode](../../tutorials/create/ms/run-local.md) for additional information. 
