---
sidebarDepth: 1
---

# Entando Bundle CLI- Project Management
The ent bundle CLI extends the functionality and capability of Entando’s command line interface with a modular bundle management system. Starting from Entando 7.1, ent bundle orchestrates the lifecycle of a project, whether it comes with a single component or many, and packages them into convenient recognizable bundles that can be deployed on any Entando Platform.

This document introduces the lifecyle path of a project to ...
The main steps to bring a project to a published bundle is:

1. Initialization
2. Build
3. Run
4. Package
5. Publish
6. Generate Custom Resource

### Bundle lifecycle 
explain lifecyle briefly, 
advantages: single bundle descriptor
inititialize project from hub
centralized management of APIs and services such as DB and Keycloak
instead of using git and docker repositories, it now only uses Docker

## Bundle Commands 
syntax: `ent bundle [command] [subcommand] [arguments] [flags]` 
| Command | Subcommand| Arguments| Flags           | Description|
|:--|:--|:-------|:----------------------|:--|
|build||component_name|--all,  --all-mfe,  --all-ms| Build components (mfe, ms) with a selector|
|generate-cr	|||--image {image},  --digest|Generate Entando Custom Resource from a bundle project or from a Docker Repository|
|init|||--from-hub {url} |Initialize project folder structure and descriptor|
|ms|add|component_name|--stack {spring-boot l node l go} |Add ms project components			 	
|ms	| init	|||		Init with scaffolding|
|ms |	rm |	component_name ||		Remove ms project component|
|mfe |	add	 | component_name	|--stack {react l angular}, --type {app-builder l widget l widget-config} |	Add mfe project component|
|mfe |	init	|||		Init with scaffolding |
|mfe |	rm |	component_name	|| 	Remove mfe project component |		

## Initialization	
## Build		
## Package		
## Publish
## Generate CR



##Project Setup
1. Create a project directory
``` sh
mkdir testProject && cd testProject
```
2. Generate the project skeleton using the JHipster-based Entando Blueprint
``` sh
ent jhipster --blueprints entando
```
3. Generate an entity and MFEs
``` sh
ent jhipster entity Conference
```
4. Build the new project
``` sh
ent prj build
```

> Note: Using the `ent prj` wrapper avoids having to build each part of the project individually. The first run using `ent prj` can be slower due to MFE node downloads. See [the BLueprint tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md) for more details.

#### Prepare and Publish a Project Bundle
Use the publication system `pbs` to assemble your Entando project into a bundle that can be loaded into Kubernetes. This requires your GitHub credentials, an empty GitHub repository to hold your bundle artifacts, and a Docker Hub account or organization.
1. Initialize the bundle directory. This method accepts SSH and HTTPS URLs.
``` sh
ent prj pbs-init
``` 
2. Publish the build artifacts to GitHub and Docker Hub
``` sh
ent prj pbs-publish
```
3. Deploy the bundle into the Entando Component Repository
``` sh
ent prj deploy
```
See [Build and Publish a Project Bundle](../../tutorials/create/pb/publish-project-bundle.md) for more details.

#### Install the Project Bundle into an Application
The CLI allows you to install a bundle without accessing the Entando App Builder.

> Note: A bundle must be deployed before it can be installed.

Run the following command from the project folder:
``` sh
ent prj install
```

If a project bundle has already been installed, use `--conflict-strategy` to adopt a strategy for existing components (CREATE, SKIP, OVERRIDE), e.g:
``` sh
ent prj install --conflict-strategy=OVERRIDE
```
#### Run a Project Locally
1. Initialize Keycloak, which leverages Docker Compose
``` sh
ent prj ext-keycloak start
```
2. Initialize backend microservices
``` sh
ent prj be-test-run
```
To fetch logs from bundle plugins, use the command
```
ent prj be-log
```
3. Initialize one or more frontend widgets, each from its own shell
``` sh
ent prj fe-test-run
```
Check out [Run Blueprint-generated Microservices and Micro Frontends in Dev Mode](../../tutorials/create/ms/run-local.md) for additional information.


#### Determine Project Identifiers
Entando uses a unique identifier for your project bundle as a way to provide additional security controls around bundle-specific resources. A unique identifier is also calculated for each microservice plugin in your project.

Determine the project bundle ID:
```sh
ent prj get-bundle-id --auto
```

Determine the plugin ID of each microservice in the project:
```sh
ent prj get-plugin-id --auto --repo=<BUNDLE-REPO-URL>
```

### Bundle Management
The sections below describe common bundle operations and provide the associated commands.
#### Prepare a Bundle for Publication

Use the `ent bundler` command to prepare a bundle for publication:

``` sh
  ent bundler from-git
```   

Alternatively, the project command `ent prj generate-cr` provides a wrapped version of `ent bundler` and prepares a bundle custom resource from a Git repository. The output of `ent prj generate-cr` is a YAML file which can be piped to `ent kubectl` for direct application to Kubernetes.

Consult the `ent prj generate-cr` help text for command options (e.g. bundle name, description, repository). For an example of how to use `ent prj generate-cr`, refer to the [Build and Publish a Simple Bundle tutorial](../../tutorials/create/pb/publish-simple-bundle.md).

#### Extract a Bundle from an Application

The bundler provides an interactive mode to identify the components to export from the application. Point the bundler to an existing Entando Application to extract its components (pages, content, etc.) and static assets into a custom bundle. This bundle can be used to migrate Entando components from one environment to another (e.g. Dev to QA), as a template for building a new Entando Application, or as the skeleton of an Entando solution. 

To generate the bundle folder structure for an Entando project, including a top-level descriptor file:
``` sh
  ent bundler from-env  
```

An `env.json` file to configure the application URLs and client credentials must live in the directory from which the bundler is run.

For example:
``` json
{
   "coreBaseApi": "http://YOUR-DOMAIN-OR-IP/entando-de-app",
   "componentManagerApi": "http://YOUR-DOMAIN-OR-IP/digital-exchange",
   "clientId": "YOUR-CLIENT-ID",
   "clientSecret": "YOUR-CLIENT-SECRET"
}
```

Instructions to export a bundle, including how to configure `env.json`, can be found in the [Export and Publish a Bundle tutorial](../../tutorials/create/pb/export-bundle-from-application.md).

#### Entando Component Repository Wrapper
Entando provides a series of `ent ecr` commands for interaction with [the Entando Component Repository](../../docs/compose/ecr-overview.md) (ECR). The following commands apply specifically and only to bundles.


Display the list of bundles associated with the current profile:
```
ent ecr list
```

Generate a bundle and deploy it to the current profile:
```
ent ecr deploy
``` 

The helpers `get-bundle-id` and `get-plugin-id` have been added to `ent ecr` to calculate and display unique custom resource identifiers. This provides additional security controls around bundle-specific and microservice plugin resources.

Determine the bundle ID:
```
ent ecr get-bundle-id YOUR-BUNDLE-REPOSITORY-URL
```

Determine the plugin ID:
```
ent ecr get-plugin-id --auto YOUR-BUNDLE-REPOSITORY-URL
```

