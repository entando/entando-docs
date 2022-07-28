---
sidebarDepth: 2
---

# Bundle Management - ent bundle CLI
The Entando bundle CLI extends the functionality of **ent** with a modular bundle management system. Starting with Entando 7.1, ent bundle orchestrates the lifecycle of a project, whether it comes with a single component or many, and packages them into convenient recognizable bundles that can be inserted into any Entando Application. This modular approach takes advantage of a single project descriptor and repository, along with centralized [management of APIs](ent-api.md) and [services for DB and Keycloak](ent-svc.md).

This document covers ent bundle operations and how it manages the lifecycle of a bundle, organized by the steps required.

1. [Initialization](#initialization)
2. [Build](#build)
3. [Run](#run)
4. [Package](#package)
5. [Publish](#publish)
6. [ECR Deploy](#ecr-bundle-commands)

### Bundle Lifecycle Overview
A single JSON descriptor file can define the parameters of an Entando project, but the life of an Entando Bundle begins at initialization. The ent init step sets up the structure and scaffolding needed for a new bundle. This tool allows a project to be intialized directly from the Entando Hub, speeding up the development process. The second step builds the project components for the micro frontends (MFE) and microservices (MS), whether you have a single component or many MSs and MFEs. They are built in parallel, using processes that are dependent on your stack, and given version numbers filtered by type and name. 

The next step runs the components, processed in the same way by type and name, resulting in log files for each. The ent pack step generates the artifacts and builds the Docker images. A single Docker image is built for the bundle and all its microservices. Then Docker images are built for each micro frontend. Finally, these images are published to a Docker repository. 

See [Build and Publish a Project Bundle](../../tutorials/create/pb/publish-project-bundle.md) for more details.

## ent bundle Command List 
syntax: `ent bundle [commands] [subcommand] [arguments]` 
| Commands | Subcommands|  Description
|:--|:--|:--
|`build`||Build components (MFE, MS) with a selector
|`info`||Show status information for the bundle project 
|`init`||Initialize project folder structure and descriptor
|`ms`|`add`| Add ms project components		 	
|	| `init`	|	Init MS with scaffolding
| |	`rm` |	Remove a MS project component
|`mfe` |	`add`	 |  	Add a MFE project component
| |	`init`	|	Init with scaffolding 
| |	`rm` |	Remove MFE project component 	
|`run`|| Run bundle components 
|`pack`||Create distribution artifacts (Docker images)
|`publish`||Publish Docker images to a Docker registry


## Initialization 

| Command |  Description
|:--|:--
|`ent bundle init [name]` |Initialize a new project with the default structure and files
|`ent bundle init [name] --from-hub`| Initialize a bundle from an Entando Hub

#### Command Details
* `ent bundle init [name] --from-hub`: Utilize an existing bundle from an Entando Hub to jump start your project. The ent bundle CLI will pull the package and rebuild the structure as needed, ready for customization. 

## Build
 
| Command| Descriptions
|:--|:--
|`ent bundle build [component-name]` | Build a single component
|`ent bundle build [mfe-1] [ms-2]...`| Build every the component passed as arguments
|`ent bundle build --all`|Build all the components in the project
|`ent bundle build --all-ms`|Build all microservices|
|`ent bundle build --all-mfe`|Build all the microfrontend|

#### Command Details
`ent bundle build`: Constructs the project files based on the entando.json provided. It executes according to the type of stack your components are built with. For instance, npm build will be performed for a React MFE. A log file is generated for each component inside the .entando/logs directory for your project.

## Run	
| Command| Descriptions
|:--|:--
|`ent bundle run [component-name]` | Locally run your single component
|`ent bundle run [mfe-1] [ms-2]...`| Locally run all the components passed as arguments 
|`ent bundle run --all`| Locally run all the components in the bundle
|`ent bundle run --all-ms`| Locally run the MSs in the bundle
|`ent bundle run --all-mfe`| Locally run the MFEs in the bundle

#### Command Details
`ent bundle run`: Executes processes dependent on the component type and stack. For example, MVN spring:boot will execute for a Sping Boot microservice. All the components in the bundle will run in parallel, with a log file generated for each inside the .entando/logs directory.

## Package
| Command| Descriptions
|:--|:--
|`ent bundle pack`|Generate the bundle artifacts, and the bundle Docker image and MS images 
|`ent bundle pack --org [organization]`|Generate the bundle artifacts, passing the organization name to the Docker Hub|
|`ent bundle pack --file [my-dockerfile]`|Use a custom Dockerfile for your bundle |

#### Command Details
* `ent bundle pack`: For the MFEs and MSs, the generated artifacts are located inside each component's folders. Their format depends on the component type.  For instance, a React micro frontend may result in HTML, JavaScript and CSS files.  

When artifact generation is complete, microservices Docker images are built, executing the docker build command using the Dockerfile located in each microservice folder. If the Dockerfile is missing, the pack command exits with failure.

** Should we include info about where yaml descriptors are located, how they are produced from entando.json, pom.xml or package.json, or how to see the outputs for the MFE in the DEBUG mode

## Publish
| Command| Descriptions
|:--|:--
|ent bundle publish| Publish your Docker images to index.docker.io (default)
|ent bundle publish --org [organization]|Publish Docker images to the Docker registry, with a specified organization |
|ent bundle publish --registry [registry]| Publish the Docker images to your Docker registry|

#### Command Details
* `ent bundle publish --org`: If the organization name has changed, the Docker tag command can be used to create new image tags for the new name to be stored in .entando/config.json.

   docker tag OLD-ORG-NAME/YOUR-IMAGE:tag NEW-ORG-NAME/YOUR-IMAGE:tag

* `ent bundle publish --registry`
   1. A specific Docker registry can be used but it must be authenticated by using the --config flag on the login command.
     ```
     docker --config path/to/.docker login YOUR-REGISTRY
     ```
     This is how the authentication context used by ent is kept separated from the default authentication context for the user. Credentials will be stored unencrypted in `path/to/.docker/config.json` unless a credentials helper is used.

    2. If you are using a custom registry, images need to be renamed, prepending the custom registry name to the image names using this Docker command:
     ```
     docker tag YOUR-ORG-NAME/YOUR-IMAGE-NAME:tag YOUR-REGISTRY/YOUR-ORG-NAME/YOUR-IMAGE-NAME:tag
     ```
    
    ** 3. is this useful to include >>>>>> The path to the config file is mapped by the environment variable ENTANDO_CLI_DOCKER_CONFIG_PATH. 

## ECR Bundle Commands
Entando provides a series of `ent ecr` commands for managing bundle interactions with [the Entando Component Repository](../../docs/compose/ecr-overview.md) (ECR).

| Command| Descriptions
|:--|:--
|`ent ecr list`| Display the list of bundles associated with the current profile|
|`ent ecr deploy`| Generate the CR and deploy it to the current profile |
|`ent ecr get-bundle-id [repository-url]` | Calculate and display the bundle ID
|`ent ecr get-plugin-id --auto [repository-url]` | Calculate and display the plugin ID


#### Command Details
* `get-bundle-id` and `get-plugin-id`: Entando uses a unique identifier for your bundle as a way to provide customization parameters and added security controls around bundle-specific resources. A unique identifier is also generated for each microservice plugin in your project.

## Git-based Bundle Commands
These ent CLI commands are required when using a Git-based (v1) bundle.
| Command| Descriptions
|:--|:--
|`ent prj build`|Build the project components|
|`ent prj pbs-init` | Initialize the bundle directory
|`ent prj pbs-publish`| Publish the built artifacts to GitHub and Docker Hub
|`ent prj deploy`| Deploy the bundle into the ECR|
|`ent prj install`| Install the bundle into Entando|
|`ent prj install --conflict-strategy=OVERRIDE`|to adopt a strategy for installed bundles
|`ent prj ext-keycloak start`|Initialize Keycloak to leverage Docker Compose|
|`ent prj be-test-run`|Initialize backend microservices|
|`ent prj fe-test-run`|Initialize one or more frontend widgets, each from its own shell|
|`ent prj be-log`| Fetch logs from bundle plugins|
|`ent prj get-bundle-id --auto`|Determine the project bundle ID|
|`ent prj get-plugin-id --auto --repo=[URL]`|Determine the plugin ID of each microservice in the project|
|`ent bundler from-git`|Generate a custom resource for publication or exporting from a Git Repository|
|`ent bundler from-env`|Generate a custom resource from an existing environment into the current or selected location|

#### Command Details
* `ent prj install --conflict-strategy=OVERRIDE`: If a project bundle has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP`, or `OVERRIDE` strategy for components.

* `ent prj get-bundle-id` and `ent prj get-plugin-id`:  Entando uses a unique identifier for your bundle as a way to provide customization parameters and added security controls around bundle-specific resources. A unique identifier is also generated for each microservice plugin in your project.

* `ent bundler`: This provides an interactive mode to identify components to export. Point the bundler to existing environments to extract components and static assets into a custom bundle. This bundle can be used to migrate from one Entando environment to another (e.g. Dev to QA) or as a template for building a new application.

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
