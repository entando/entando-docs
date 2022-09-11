---
sidebarDepth: 2
---

# Bundle Management

The Entando Bundle CLI extends the functionality of **ent** through a dedicated bundle management system. Starting with Entando 7.1, `ent bundle` orchestrates the lifecycle of a project, packaging it into a convenient and recognizable docker-based bundle that can be inserted into any Entando Application. This composable approach takes advantage of a single project descriptor and repository, along with centralized [API management](ent-api.md) and [DB and Keycloak services](ent-svc.md).

Common `ent bundle` operations and the steps required to create an Entando Bundle are discussed in the following sections:

1. [Initialization](#initialization)
2. [Build](#build)
3. [Run](#run)
4. [Package](#package)
5. [Publish](#publish)
6. [Deploy](#deploy)

This document also describes the series of `ent ecr` commands that manage bundle interactions with the [Entando Component Repository](../../docs/compose/local-hub-overview.md) (ECR). These are applicable to both docker-based bundles and their git-based predecessors (< Entando 7.1). Finally, notable commands applicable to creating and deploying git-based bundles only are discussed.

## Entando 7.1 Bundle Development

Beginning with Entando 7.1, the `ent bundle` command and its convenience methods govern the structure and files of an Entando Bundle. This format relies on a single JSON descriptor as the project manifest. A new bundle project can be initialized with the default files and folders or from an existing bundle in an Entando hub. 

With the structure established, build processes appropriate to type and stack will generate micro frontend (MFE) and microservice (MS) components in parallel. Components are filtered by type and name and assigned version numbers. 

Keycloak integration enables components to be run locally to test MFEs and MS external to an Entando cluster. Multiple components are run in parallel via commands dependent on type and stack, with a log file for each individual component generated in its directory.  

Packaging the bundle constructs the artifacts and Docker images. A single image is created for the bundle and all micro frontends while each microservice is allocated its own image. These are published to a Docker repository, after which the bundle can be deployed and installed. 

See [Build and Publish a Bundle Project](../../tutorials/create/pb/publish-project-bundle.md) for more details.

## Docker-based Bundle Commands
| Commands | Subcommands |  Description |
|:-|:-|:----------------------------------
|`ent bundle build`| | Build components (MFE, MS) with a selector |
|`ent bundle generate-cr`| | Generate the Entando Custom Resource for a bundle project |
|`ent bundle help` | | Display help for ent bundle |
|`ent bundle info`| | Show status information for the bundle project |
|`ent bundle init`| | Initialize the project folder structure and descriptor |
|`ent bundle list`| | List the available bundle components |
|`ent bundle mfe` |	`add` | Add a micro frontend |
| |	`rm` |	Remove a micro frontend |
|`ent bundle ms`|`add`| Add a microservice |	 	
| |	`rm` |	Remove a microservice |
|`ent bundle run`| | Run bundle components |
|`ent bundle pack`| | Create distribution artifacts (Docker images) |
|`ent bundle publish`| | Publish images to a Docker registry |
|`ent --debug bundle`| | Enable debug mode |

### Initialization 

| Command |  Description
|:--|:--
|`ent bundle init [name]` | Initialize a new empty project with the default structure and files |
|`ent bundle init [name] --from-hub`| Initialize a bundle from the Entando Cloud Hub |
|`ent bundle init [name] --from-hub --hub-url=[url]` | Initialize a bundle from a custom Entando hub |

#### Command Details
The option `--from-hub` leverages an existing bundle from an Entando hub to jumpstart your project. The ent bundle tool will pull the package and rebuild the structure, after which it can be customized locally. If the command does not include `--hub-url`, ent will default to use the Entando Cloud Hub. Include the option `--hub-url` to specify a custom hub.

### Build
 
| Command| Descriptions
|:--|:--
|`ent bundle build [component-name]` | Build a single component |
|`ent bundle build [mfe-1] [ms-2]...`| Build one or more named components passed as arguments |
|`ent bundle build --all`| Build all the components in the project |
|`ent bundle build --all-ms`| Build all the microservices |
|`ent bundle build --all-mfe`| Build all the micro frontends |

#### Command Details
The `build` command constructs the project files based on the `entando.json` descriptor and according to component stack. For instance, a React MFE executes an npm build process. A "build" log file is generated for each component inside the .entando/logs directory of the project.

### Run	
| Command| Descriptions
|:--|:--
|`ent bundle run [component-name]` | Locally run a single component |
|`ent bundle run [mfe-1] [ms-2]...`| Locally run one or more named components passed as arguments |
|`ent bundle run --all`| Locally run all the components in the project |
|`ent bundle run --all-ms`| Locally run all the microservices |
|`ent bundle run --all-mfe`| Locally run all the micro frontends |

#### Command Details
The `run` command executes processes in accordance with the component type and stack. For example, `mvn spring-boot:run` will execute commands appropriate to a Spring Boot microservice. All the components in the bundle will run in parallel, with the logs printed to the standard output.

### Package
| Command| Descriptions
|:--|:--
|`ent bundle pack`| Generate the bundle artifacts, the bundle image and the microservice images |
|`ent bundle pack --org [organization]`| Generate the bundle artifacts and images, passing the organization name to Docker Hub |
|`ent bundle pack --file [my-dockerfile]`| Use a custom Dockerfile for the bundle |

#### Command Details
When packaging the bundle, the artifacts generated for micro frontends and microservices are stored in their respective folders. File format depends on component type. For instance, a React micro frontend may result in HTML, JavaScript and CSS files.  

    Once the artifacts are generated, Docker images for the microservices are built using the Dockerfile located in each respective folder. If the Dockerfile is missing, the `pack` command exits with failure.

### Publish
| Command| Descriptions
|:--|:--
|`ent bundle publish`| Publish the Docker images to the default Docker registry |
|`ent bundle publish --org [organization]`| Publish the Docker images to the default Docker registry, specifying the organization |
|`ent bundle publish --registry [registry]`| Publish the Docker images to a specified Docker registry |

### Deploy
| Command| Descriptions
|:--|:--
|`ent bundle deploy`| Deploy a bundle to the Local Hub of an Entando Application |
|`ent bundle install`| Install a bundle in the Local Hub of an Entando Application |

## ECR Commands 
The following commands are applicable to both docker-based and git-based bundles.

| Command| Descriptions
|:--|:--
|`ent ecr deploy`| Generate the custom resource (CR) and deploy it to the current profile |
|`ent ecr gen-secret`| Generate and display the skeleton for a plugin Secret |
|`ent ecr generate-cr`| Generate the custom resource |
|`ent ecr get-bundle-id [repository-url]` | Calculate and display the bundle ID |
|`ent ecr get-plugin-code` | Calculate and display the plugin code |
|`ent ecr install`| Install a bundle in the ECR |
|`ent ecr install --conflict-strategy=OVERRIDE`| Adopt a strategy for conflicts affecting installed bundles |
|`ent ecr list`| Display the list of bundles associated with the current profile |
|`ent ecr uninstall`| Uninstall a bundle |

#### Command Details
* `ent ecr get-bundle-id` and `ent ecr get-plugin-code`: The unique identifier assigned to each bundle provides customization parameters and adds security controls for bundle-specific resources. Entando also generates a unique identifier for each microservice plugin.

* `ent ecr get-plugin-code`: 
   * Docker-based bundles make use of the options `[component-name] --repo=[repository-url]`
   * Git-based bundles make use of the options `--auto --repo=[repository-url]`
   
* `ent ecr install --conflict-strategy=OVERRIDE`: If a project bundle has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components.

## Git-based Bundle Commands

The following ent commands are used to manage git-based (< Entando 7.1) bundles.

| Command | Descriptions
|:--|:--
|`ent bundler from-git`| Generate a CR from a Git repository for publication or exporting |
|`ent bundler from-env`| Generate a CR from an existing environment for the current or selected location |
|`ent prj be-log`| Fetch the logs for bundle plugins |
|`ent prj be-test-run`| Initialize the microservices |
|`ent prj build`| Build the project components |
|`ent prj deploy`| Deploy the bundle into the ECR |
|`ent prj ext-keycloak start`| Initialize Keycloak with Docker Compose |
|`ent prj fe-test-run`| Initialize one or more frontend widgets, each from its own shell |
|`ent prj get-bundle-id --auto`| Determine the bundle ID |
|`ent prj get-plugin-code --auto [URL]`| Determine the plugin code of each microservice in the project |
|`ent prj install`| Install the bundle into Entando |
|`ent prj install --conflict-strategy=OVERRIDE`| Adopt a strategy for conflicts affecting installed bundles |
|`ent prj pbs-init` | Initialize the bundle directory |
|`ent prj pbs-publish`| Publish the artifacts to GitHub and Docker Hub |

#### Command Details

* `ent prj get-bundle-id` and `ent prj get-plugin-code`: The unique identifier assigned to each bundle provides customization parameters and adds security controls for bundle-specific resources. Entando also generates a unique identifier for each microservice plugin.

* `ent prj install --conflict-strategy=OVERRIDE`: If a project bundle has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components.

* `ent bundler`: Provides an interactive mode to identify components to export. Point the bundler to existing environments to extract components and static assets into a custom bundle. This bundle can be used to migrate from one Entando environment to another (e.g. Dev to QA) or as a framework for building a new application.

     * An `env.json` file to configure the application URLs and client credentials must be present in the directory from which the bundler is run. For example:
         ``` json
         {
            "coreBaseApi": "http://YOUR-DOMAIN-OR-IP/entando-de-app",
            "componentManagerApi": "http://YOUR-DOMAIN-OR-IP/digital-exchange",
            "clientId": "YOUR-CLIENT-ID",
            "clientSecret": "YOUR-CLIENT-SECRET"
         }
         ```
        Instructions to export a bundle, including how to configure `env.json`, can be found in the [Export and Publish a Bundle tutorial](../../tutorials/create/pb/export-bundle-from-application.md).
     * If an `Unable to extract the application client secret` extraction error is thrown:
         1. Verify that the current profile namespace and application name are correct and match the output of the following command:
            ``` sh
             ent status
            ```
         2. Assign the appropriate namespace and application name:
             ``` sh
              ent appname YOUR-APPNAME
              ent namespace YOUR-NAMESPACE
            ```
Follow the [Build and Publish a Project Bundle](../../tutorials/create/pb/publish-project-bundle.md) tutorial for more information about bundling a Docker-based project.
