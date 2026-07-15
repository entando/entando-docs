---
sidebarDepth: 2
---

# Bundle Management

The Entando Bundle CLI extends the functionality of **ent** through a dedicated bundle management system. The `ent bundle` command orchestrates the lifecycle of a project, packaging it into a convenient and recognizable docker-based bundle that can be inserted into any Entando Application. This composable approach takes advantage of a single project descriptor and repository, along with centralized [API management](ent-api.md) and [DB and Keycloak services](ent-svc.md). Common operations and the steps required to create an Entando Bundle are detailed below.

In addition, this document describes the series of `ent ecr` commands that manage bundle interactions with the [Entando Component Repository](../../docs/compose/local-hub-overview.md) (ECR). These are applicable to both docker-based bundles and their git-based predecessors (< Entando 7.1). Notable commands applicable to creating and deploying git-based bundles only are also discussed.

## Entando Bundle Development

The `ent bundle` CLI tool provides a streamlined process to govern the files, structure, and management of Entando bundles. The bundle development lifecycle consists of 6 stages, each corresponding to a subcommand:

- [Initialization](#initialization): `ent bundle init` initializes a new bundle project, either with the default files and folders or from an existing bundle in an Entando Hub. The bundle format relies on a single JSON descriptor as the project manifest. 

- [Build](#build): With the structure established, `ent bundle build` generates micro frontend (MFE) and microservice (MS) components. These are filtered by type and name and assigned version numbers. 

- [Run](#run): `ent bundle run` and Keycloak integration enable components to be tested locally, external to an Entando cluster.   

- [Package](#package): `ent bundle pack` generates the bundle artifacts, the bundle image and the microservice images. One image is created for each microservice while a single image is created for the bundle and micro frontends. 

- [Publish](#publish): `ent bundle publish` pushes the Docker images to a Docker repository, after which the bundle can be deployed and installed. 

- [Deploy](#deploy): `ent bundle deploy` delivers a published bundle to the ECR of an Entando Application. The bundle custom resource is generated and tags are retrieved from Docker Hub.

- [Install](#install): `ent bundle install` applies the bundle to the Entando instance. It is then available in the App Builder for unlimited reuse within the application.

See the [Build and Publish a Simple Bundle](../../tutorials/create/pb/publish-simple-bundle.md) tutorial to see the full process. And for more information on Entando Bundle specifications, go to the [Bundle Details](../curate/bundle-details.md) page.

## Docker-based Bundle Commands

| Commands | Description |
|:- |:-
|`ent bundle build`| Build components (MFE, MS) with a selector |
|`ent bundle deploy`|Deploy a bundle to the Local Hub of an Entando Application
|`ent bundle generate-cr`| Generate the Entando Custom Resource for a bundle project |
|`ent bundle help` | Display help for ent bundle |
|`ent bundle info`| Show status information for the bundle project |
|`ent bundle init`| Initialize the project folder structure and descriptor |
|`ent bundle install`| Install a bundle to the Local Hub of an Entando Application|
|`ent bundle list`| List the available bundle components |
|`ent bundle mfe add` | Add a micro frontend |
| `ent bundle mfe rm` |  Remove a micro frontend |
|`ent bundle ms add` | Add a microservice |    
|`ent bundle ms rm` | Remove a microservice |
|`ent bundle run`| Run bundle components |
|`ent bundle pack`| Create distribution artifacts (Docker images) |
|`ent bundle publish`| Publish images to a Docker registry |
|`ent --debug bundle`| Enable debug mode |

### Initialization 

| Command |  Description
|:--|:--
|`ent bundle init [name]` | Initialize a new empty project with the default structure and files |
|`ent bundle init [name] --from-hub`| Initialize a bundle from the Entando Cloud Hub |
|`ent bundle init [name] --from-hub --hub-url=[url]` | Initialize a bundle from an enterprise Entando Hub |
|`ent bundle init [name] --from-hub --hub-url=[url] --hub-api-key=[]` | Initialize a bundle from a private Entando Hub with an API key|

#### Init Command Details
- Bundle names may only contain lowercase letters, numbers, periods(.) and dashes(-). They cannot start or end with periods or dashes.
- `--from-hub`: This option leverages an existing bundle from an Entando Hub to jumpstart your project. The `ent bundle` tool will pull the package and rebuild the structure, which can then be customized locally.

- `--hub-url`: Use this option to specify a custom Entando Hub, else ent defaults to the Entando Cloud Hub

- `--hub-api-key`: This flag supplies the [Hub API key](../../tutorials/solution/entando-hub.md#create-a-private-catalog) to access a bundle from a private enterprise Entando Hub to copy it locally. 

### Micro Frontend and Microservice
| Command| Descriptions
|:--|:--
|`ent bundle mfe add` --stack [stack-type] [name] | Add a React or Angular micro frontend |
|`ent bundle mfe add` --stack custom [name] | Add a custom stack micro frontend |
|`ent bundle ms add --stack [stack-type] [name]` | Add a Spring Boot or node microservice |     
|`ent bundle ms add` --stack custom [name]` | Add a custom stack microservice |

#### MFE and MS Command Details
- `ent bundle mfe add --stack custom [name]` & `ent bundle ms add --stack custom [name]`: When a custom stack is used for any MFE or microservice, custom commands for the build, run, and pack functions are required under the Command spec in the bundle descriptor `entando.json`. In addition, a version number must be specified for each component. Because Entando can only parse information from a pom.xml or package.json, the custom commands are required to manage the bundle, and the version number is required to track Docker images. For an example, see the [Bundle Details](../curate/bundle-details.md#micro-frontends-sample-code) page.

### Build
 
| Command| Descriptions
|:--|:--
|`ent bundle build [component-name]` | Build a single component |
|`ent bundle build [mfe-1] [ms-2]...`| Build one or more named components passed as arguments |
|`ent bundle build --all`| Build all the components in the project |
|`ent bundle build --all-ms`| Build all the microservices |
|`ent bundle build --all-mfe`| Build all the micro frontends |

#### Build Command Details
- `ent bundle build`:
   - The `build` command constructs the project files based on the `entando.json` descriptor.
   - Component type and stack determines the build process, e.g. a React MFE executes an npm build. It can be customized in the command section of the `entando.json`.
   - All the components in the bundle are built in parallel.
   - A log file for each component is generated inside the .entando/logs directory of the project.
- `--fail-fast`:
   -  Fail the command as soon as any subtask fails
- `--max-parallel=<value>`:
   -  Maximum number of subtasks running simultaneously. The default value is 3. Setting `max-parallel=1` results in a sequential process.
- `--stdout`:
   -  Print the subtask logs to the standard output (stdout) instead of individual log files. This is very useful in CI/CD pipelines.

### Run  
| Command| Descriptions
|:--|:--
|`ent bundle run [component-name]` | Locally run a single component |
|`ent bundle run [mfe-1] [ms-2]...`| Locally run one or more named components passed as arguments |
|`ent bundle run --all`| Locally run all the components in the project |
|`ent bundle run --all-ms`| Locally run all the microservices |
|`ent bundle run --all-mfe`| Locally run all the micro frontends |

#### Run Command Details
- `ent bundle run`:
   - The `run` command executes processes in accordance with the component type and stack, e.g `mvn spring-boot:run` for a Spring Boot microservice. It can be customized in the command section of the `entando.json`.
   - All the components in the bundle run in parallel, with the logs printed to the standard output.
   - The `run` command can be used to run multiple microservices side by side without collision in local development, but in production, they must run on port 8081.

### Package
| Command| Descriptions
|:--|:--
|`ent bundle pack`| Generate the bundle artifacts, the bundle image and the microservice images |
|`ent bundle pack --org [organization]`| Generate the bundle artifacts and images, passing the organization name to Docker Hub |
|`ent bundle pack --file [my-dockerfile]`| Use a custom Dockerfile for the bundle |
|`ent bundle pack --skip-docker-build`| Skip the building of Docker images |
|`ent bundle images`| Extract the names and tags of Docker images |

#### Pack Command Details
- `ent bundle pack`:
   - The artifacts generated for micro frontends and microservices are stored in their respective component folders. File format depends on component type, e.g. a React micro frontend may result in HTML, JavaScript and CSS files.  
   - Once the artifacts are generated, a Docker image for each microservice is built using the Dockerfile located in the microservice's folder. If the Dockerfile is missing, the `pack` command exits with failure.
   - The `pack` command executes either `mvn package` or `npm run build`, depending on the stack. These defaults can be overridden in the [custom command section](../curate/bundle-details.md#command-specification) of the bundle descriptor `entando.json`.
- `--fail-fast`:
    -  Fail the command as soon as any subtask fails
- `--max-parallel=<value>`:
    -  Maximum number of subtasks running simultaneously. The default value is 3. Setting `max-parallel=1` results in a sequential process.
- `--stdout`:
    -  Print the subtask logs to the standard output (stdout) instead of individual log files. This is very useful in CI/CD pipelines.
- `--skip-docker-build`:
    -  Allow the user to create a custom image build. The YAML descriptors and Dockerfile are created in the `.output` folder but no images are generated for the bundle and microservices.
- `ent bundle images`:
    - Return the Docker image names and tags. These are used to manually build the bundle and microservice images in the `.output` and microservice folders, respectively.

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

#### Install Command Details
* `ent bundle install --conflict-strategy=OVERRIDE`: If a bundle project has already been installed, the `--conflict-strategy` flag forces a `CREATE`, `SKIP` or `OVERRIDE` strategy for components

### Convert v1 to v5

| Command| Descriptions
|:--|:--
|`ent bundle convert --bundle-path [path1]`| `path1` is the root folder containing the bundle descriptor.yaml |
|`ent bundle convert --bundle-path [path1] --svc-path [path2]| `path2` is the services folder containing the Docker Compose files |

For more information, see the [Convert a v1 to v5 Bundle](../reference/convert-bundle.md) tutorial.

### Generate CR
| Command| Description
|:--|:--
|`ent bundle generate-cr -t []`| Generate the Custom Resource (CR) for a bundle project, including versions based on tags for development, production or both. The default is the production tag type. 

#### Generate CR Command Details

* `ent bundle generate-cr -t dev`: Selects only development tags to include in the CR for deployment
* `ent bundle generate-cr -t prod`: Selects only production tags to include in the CR for deployment
* `ent bundle generate-cr -t dev prod`: Selects both development and production tags to include in the CR for deployment

## ECR Commands 
The following commands are applicable to both docker-based and git-based bundles.

| Command| Descriptions
|:--|:--
|`ent ecr deploy`| Generate the custom resource (CR) and deploy it to the current profile |
|`ent ecr gen-secret`| Generate and display the skeleton for a plugin Secret |
|`ent ecr generate-cr`| Generate the deployment custom resource |
|`ent ecr get-bundle-id [repository-url]` | Calculate and display the bundle ID |
|`ent ecr get-plugin-code` | Calculate and display the plugin code |
|`ent ecr install`| Install a bundle in the ECR |
|`ent ecr install --conflict-strategy=OVERRIDE`| Adopt a strategy for conflicts affecting installed bundles |
|`ent ecr list`| Display the list of bundles associated with the current profile |
|`ent ecr uninstall`| Uninstall a bundle |

#### ECR Command Details
* `ent ecr get-bundle-id`: The unique identifier assigned to each bundle provides a mechanism to customize parameters and add security controls for bundle-specific resources

* `ent ecr get-plugin-code`: To retrieve the unique identifier for each microservice

   * Docker-based bundles: `ent ecr get-plugin-code YOUR-ORG/YOUR-PLUGIN-NAME --repo=docker://registry.hub.docker.com/YOUR-ORG/YOUR-BUNDLE`
   * Git-based bundles: `ent ecr get-plugin-code --auto --repo=[repository-url]`
   
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
#### Prj Command Details

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

