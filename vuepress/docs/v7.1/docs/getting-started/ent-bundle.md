---
sidebarDepth: 2
---

# Bundle Management

The Entando Bundle CLI extends the functionality of **ent** through a dedicated bundle management system. Starting with Entando 7.1, `ent bundle` orchestrates the lifecycle of a project, packaging it into a convenient and recognizable docker-based bundle that can be inserted into any Entando Application. This composable approach takes advantage of a single project descriptor and repository, along with centralized [API management](ent-api.md) and [DB and Keycloak services](ent-svc.md). Common operations and the steps required to create an Entando Bundle are detailed below.

In addition, this document describes the series of `ent ecr` commands that manage bundle interactions with the [Entando Component Repository](../../docs/compose/local-hub-overview.md) (ECR). These are applicable to both docker-based bundles and their git-based predecessors (< Entando 7.1). Notable commands applicable to creating and deploying git-based bundles only are also discussed.

## Entando 7.1 Bundle Development

Beginning with Entando 7.1, the `ent bundle` CLI tool introduces a streamlined process to govern the files, structure, and management of Entando bundles. The bundle development lifecycle consists of 6 stages, each corresponding to a subcommand:

- [Initialization](#initialization): `ent bundle init` initializes a new bundle project, either with the default files and folders or from an existing bundle in an Entando Hub. The bundle format relies on a single JSON descriptor as the project manifest. 

- [Build](#build): With the structure established, `ent bundle build` generates micro frontend (MFE) and microservice (MS) components. These are filtered by type and name and assigned version numbers. 

- [Run](#run): `ent bundle run` and Keycloak integration enable components to be tested locally, external to an Entando cluster.   

- [Package](#package): `ent bundle pack` generates the bundle artifacts, the bundle image and the microservice images. One image is created for each microservice while a single image is created for the bundle and micro frontends. 

- [Publish](#publish): `ent bundle publish` pushes the Docker images to a Docker repository, after which the bundle can be deployed and installed. 

- [Deploy](#deploy): `ent bundle deploy` delivers a published bundle to the ECR of an Entando Application. The bundle custom resource is generated and tags are retrieved from Docker Hub.

- [Install](#install): `ent bundle install` applies the bundle to the Entando instance. It is then available in the App Builder for unlimited reuse within the application.

See the [Build and Publish a Simple Bundle](../../tutorials/create/pb/publish-simple-bundle.md) tutorial to see the full process. And for more information on Entando Bundle specifications, go to the [Bundle Details](../curate/bundle-details.md) page. 

## Docker-based Bundle Commands
| Commands | Subcommands |  Description |
|:-|:-|:----------------------------------
|`ent bundle build`| | Build components (MFE, MS) with a selector |
|`ent bundle deploy`|| Deploy a bundle to the Local Hub of an Entando Application
|`ent bundle generate-cr`| | Generate the Entando Custom Resource for a bundle project |
|`ent bundle help` | | Display help for ent bundle |
|`ent bundle info`| | Show status information for the bundle project |
|`ent bundle init`| | Initialize the project folder structure and descriptor |
|`ent bundle install`| | Install a bundle to the Local Hub of an Entando Application|
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
|`ent bundle init [name] --from-hub --hub-url=[url]` | Initialize a bundle from a custom Entando Hub |

#### Command Details
- `--from-hub`: This option leverages an existing bundle from an Entando Hub to jumpstart your project. The ent bundle tool will pull the package and rebuild the structure, after which it can be customized locally.

- `--hub-url`: Use this option to specify a custom Entando Hub, else ent defaults to the Entando Cloud Hub

### Build
 
| Command| Descriptions
|:--|:--
|`ent bundle build [component-name]` | Build a single component |
|`ent bundle build [mfe-1] [ms-2]...`| Build one or more named components passed as arguments |
|`ent bundle build --all`| Build all the components in the project |
|`ent bundle build --all-ms`| Build all the microservices |
|`ent bundle build --all-mfe`| Build all the micro frontends |

#### Command Details
- `ent bundle build`:
   - The `build` command constructs the project files based on the `entando.json` descriptor
   - Component type and stack determines the build process, e.g. a React MFE executes an npm build
   - All the components in the bundle are built in parallel
   - A log file for each component is generated inside the .entando/logs directory of the project

### Run	
| Command| Descriptions
|:--|:--
|`ent bundle run [component-name]` | Locally run a single component |
|`ent bundle run [mfe-1] [ms-2]...`| Locally run one or more named components passed as arguments |
|`ent bundle run --all`| Locally run all the components in the project |
|`ent bundle run --all-ms`| Locally run all the microservices |
|`ent bundle run --all-mfe`| Locally run all the micro frontends |

#### Command Details
- `ent bundle run`:
   - The `run` command executes processes in accordance with the component type and stack, e.g `mvn spring-boot:run` is executed for a Spring Boot microservice
   - All the components in the bundle run in parallel, with the logs printed to the standard output
   - The `run` command can be used to run multiple microservices side by side without collision in local development, but in production, they must run on port 8081
   
### Package
| Command| Descriptions
|:--|:--
|`ent bundle pack`| Generate the bundle artifacts, the bundle image and the microservice images |
|`ent bundle pack --org [organization]`| Generate the bundle artifacts and images, passing the organization name to Docker Hub |
|`ent bundle pack --file [my-dockerfile]`| Use a custom Dockerfile for the bundle |

#### Command Details
- `ent bundle pack`:
   - The artifacts generated for micro frontends and microservices are stored in their respective component folders. File format depends on component type, e.g. a React micro frontend may result in HTML, JavaScript and CSS files.  
   - Once the artifacts are generated, a Docker image for each microservice is built using the Dockerfile located in the microservice's folder. If the Dockerfile is missing, the `pack` command exits with failure.

### Publish
| Command| Descriptions
|:--|:--
|`ent bundle publish`| Publish the Docker images to the default Docker registry |
|`ent bundle publish --org [organization]`| Publish the Docker images to the default Docker registry, specifying the organization |
|`ent bundle publish --registry [registry]`| Specify the Docker registry to which the images will be published |

### Deploy
| Command| Description
|:--|:--
|`ent bundle deploy`| Deploy a bundle to the Local Hub of an Entando Application |

### Install
| Command| Description
|:--|:--
|`ent bundle install`| Install a bundle in the Local Hub of an Entando Application |

#### Command Details
* `ent bundle install --conflict-strategy=OVERRIDE`: If a bundle project has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components

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
* `ent ecr get-bundle-id`: The unique identifier assigned to each bundle provides a mechanism to customize parameters and add security controls for bundle-specific resources

* `ent ecr get-plugin-code`: 
   * Get the unique identifier for the bundle plugin
   * Docker-based bundles make use of the options `[component-name] --repo=[repository-url]`
   * Git-based bundles make use of the options `--auto --repo=[repository-url]`
   
* `ent ecr install --conflict-strategy=OVERRIDE`: If a bundle project has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components

## Git-based Bundle Commands

The following ent commands are used to manage git-based (< Entando 7.1) bundles.

| Command | Descriptions
|:--|:--
|`ent bundler from-git`| Generate a CR from a Git repository for publication or exporting |
|`ent bundler from-env`| Generate a CR from an existing environment for the current or selected location |
|`ent prj be-log`| Fetch the logs for bundle plugins |
|`ent prj be-test-run`| Initialize one or more microservices |
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

**Note**: `ent prj` commands are deprecated in favor of `ent bundle` commands.

#### Command Details

* `ent prj get-bundle-id`: The unique identifier assigned to each bundle provides a mechanism to customize parameters and add security controls for bundle-specific resources

* `ent prj get-plugin-code`: Uniquely and safely identifies each bundle plugin and derived cloud-native resources

* `ent prj install --conflict-strategy=OVERRIDE`: If a bundle project has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components

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
     * If an `Unable to extract the application client secret` error is thrown:
         1. Verify that the current profile namespace and application name are correct and match the output of the following command:
            ``` sh
             ent status
            ```
         2. Assign the appropriate namespace and application name:
             ``` sh
              ent appname YOUR-APPNAME
              ent namespace YOUR-NAMESPACE
            ```
Follow the [Build and Publish a Bundle Project](../../tutorials/create/pb/publish-project-bundle.md) tutorial for more information about bundling a Docker-based project.
