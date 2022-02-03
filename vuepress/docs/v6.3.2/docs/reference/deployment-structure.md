# Entando Deployment Structure

This page provides a high level overview of the key Entando GitHub repositories along with a brief description 
of how those repositories are realized in a running Entando deployment. The descriptions provided here are meant 
as a guide for identifying opportunities to dig deeper into the architecture and how things are structured 
rather than a panacea for understanding the architecture.

## entando-operator
The Entando operator coordinates the installation and configuration of all of the components of an Entando 
Cluster. The operator can be installed once per Entando Cluster and used to coordinate the plugin lifecycle for 
multiple Entando applications across many namespaces.

* GitHub: <https://github.com/entando-k8s/entando-k8s-controller-coordinator/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-k8s-controller-coordinator>

#### Customization
It is unlikely that the operator will be customized as part of an Entando implementation. It is not built to 
be extended inside the codebase. The most common pattern will be to use the existing custom resources that the 
operator knows how to deploy to extend the Entando platform.

## database init containers
During installation an Entando application needs to create several databases and also to initialize those 
databases with information when deploying from a backup in your images. At initialization the _entando-k8s-dbjob_ 
will be run 5 times in total. Once for keycloak, twice for the entando application (port and serv dbs), once to 
populate the Entando application database, and once to create the Component Repository database. 

* GitHub: <https://github.com/entando-k8s/entando-k8s-dbjob>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-k8s-dbjob>

The screenshot below highlights the init containers for the Entando application schema creation, db 
initialization, and component repository database.

![Init Containers Screenshot](./img/init-containers-screenshot.png)

Many managed kubernetes instances like OpenShift won’t show init containers in their dashboards. So if you’re 
troubleshooting you may need to look deeper. When fetching logs for an init container using kubectl you must 
pass the container name as an argument to the call. For example,

        kubectl logs <pod> -c <container> -n <namespace>        
        kubectl logs quickstart-kc-db-preparation-job-ddbdbddb-a  -c quickstart-kc-db-schema-creation-job -n sprint1-rc

#### Customization
It is unlikely that the init containers will be customized as part of an Entando project. The init containers 
will automatically restore a backup included in your application so that you can create custom images that 
include your application setup. 
See [Backing Up and Restoring Your Environment](../../tutorials/devops/backing-up-and-restoring-your-environment).


## entando-de-app
The _entando-de-app_ is a J2EE application and is an instance of the _entando-core_ (see a description of the 
_entando-core_ repo below). Reviewing the dependencies of this application in the pom.xml will reveal the 
dependencies on the _entando-core_, _entando-engine_, and _admin-console_ which encompass the core 
functionality in versions of Entando prior to Entando 6. In a quickstart deployment the _entando-de-app_ is deployed as part of the _entando-composite-app_ multi 
container pod.
* GitHub: <https://github.com/entando/entando-de-app/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-de-app-eap>,<https://hub.docker.com/repository/docker/entando/entando-de-app-wildfly>

#### Customization
The _entando-de-app_ is very likely to be customized as part of an Entando implementation. This image can be 
customized with new APIs, legacy Entando plugins, new database tables, or other extensions to the _entando-core_. 
It is highly recommended that most extensions to the platform in Entando 6 occur in microservices. However, legacy 
integrations, extensions to the CMS, and migrations from earlier Entando versions may require changes to the _entando-de-app_. 

## app-builder
The _app-builder_ is the front end of the _entando-de-app_. It communicates with the _entando-de-app_ via [REST 
APIs](../consume/entando-apis.md). The _app-builder_ is a React JS application and is served via node in the default 
deployment. In a quickstart deployment the _app-builder_ container is deployed in the _entando-composite-app_ 
multiple container pod. The _app-builder_ also communicates with the Component Manager via REST API to fetch 
information about Entando bundles deployed to the Entando Component Repository (ECR).

* GitHub: <https://github.com/entando/app-builder/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/app-builder/>

#### Customization
The _app-builder_ is built to be customized and will be customized as part of many Entando implementations. 
The _app-builder_ can be customized at runtime via micro frontends 
[widget configuration](../../tutorials/create/mfe/widget-configuration.md). The _app-builder_ can also be 
customized via the integration of custom modules that are added at 
[build time](../../tutorials/compose/extend-app-builder.md). 

## component-manager
The _component-manager_ provides the link between the entando-de-app (or your custom core instance) and the 
Entando Component Repository (ECR). The _component-manager_ queries the entando-k8s service to fetch available 
bundles that have been deployed as custom resources inside of an Entando cluster. 
The _component-manager_ also manages the relationships between an Entando application and the 
installed plugins. This can be seen in the plugin link custom resources in Kubernetes. 

* GitHub: <https://github.com/entando-k8s/entando-component-manager/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-component-manager/>

#### Customization
It is unlikely that the _component-manager_ will be customized as part of an Entando implementation.

## entando-k8s-service
The _entando-k8s-service_ acts as an abstraction layer to fetch data from kubernetes APIs. The primary 
functionality is in discovering and making available for installation Entando plugins. The 
_entando-k8s-service_ is invoked by the _component-manager_. 
* GitHub: <https://github.com/entando-k8s/entando-k8s-service/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-k8s-service/>

#### Customization
It is very unlikely that the _entando-k8s-service_ will be customized as part of an Entando implementation.

## keycloak
The _entando-keycloak_ project is an extension of the base Keycloak images. The extension provides the default 
themes for Entando, a customized realm and clients, and adds the Oracle ojdbc jars for connection to Oracle 
databases.
* GitHub: <https://github.com/entando/entando-keycloak/>
* DockerHub: <https://hub.docker.com/repository/docker/entando/entando-keycloak/>

#### Customization
The keycloak image will often be customized as part of an Entando implementation. Common extensions will 
include changing the theme, adding default connections, adding default social logins, adding default clients, 
or other changes. 

## Other Key Repositories 
### entando-core
The entando-core project is a J2EE application that exposes APIs for the Entando CMS, includes the legacy 
admin console, and includes the portal-ui project that performs the server side composition for pages 
rendered via an Entando application. Note that only the composition is performed server side. 
Javascript code is rendered on the client. The entando-core is realized via an instance that includes the 
WAR files generated from a core build as dependencies. In a default deployment this is the _entando-de-app_.

* GitHub: <https://github.com/entando/entando-core/>
* DockerHub: None (deployed to maven central)

#### Customization
For users familiar with versions prior to Entando 6 there will be cases where the _entando-core_ is customized. 
In most cases these customizations will be delivered via WAR overlay in the instance project. 
Using WAR overlay is a functional approach for users already  familiar with the process but it is highly 
recommended to extend the platform using microservices for new projects.

### entando-cms
The _entando-cms_ project is the _app-builder_ (React JS) side of the Entando WCMS. It is bundled into the 
_app-builder_ at build time and will be included in the default deployment of the _app-builder_ in almost all cases.
* GitHub: <https://github.com/entando/entando-cms/>
* DockerHub: None (deployed to npm)

#### Customization
In some cases the _entando-cms_ may be customized if new custom features are added to CMS specific 
functionality. However, most cases will use the more general _app-builder_ extension points noted above. 
The _entando-cms_ does not expose any dedicated extension interfaces outside of those already provided by the 
_app-builder_.

### entando-components
The entando-components project is a collection of legacy plugins for Entando 5 and earlier. These plugins are deployed as WAR dependencies in an entando-core instance.
* GitHub: <https://github.com/entando/entando-components/>
* DockerHub: None (deployed to maven central)

### Entando Kubernetes Controllers
There are a number of controllers that are available to the Entando operator to manage installations and 
components in an Entando Cluster. Those controllers are small and lightweight images that are executed as 
run to completion pods to manage the installation flow for different parts of the infrastructure. The 
controllers are implemented using Quarkus. For more information on the controllers, the Entando custom 
resources, and configuring your Entando deployment see also: 
[Custom Resources](../consume/custom-resources).

GitHub: 
* <https://github.com/entando-k8s/entando-k8s-composite-app-controller/>
* <https://github.com/entando-k8s/entando-k8s-plugin-controller/>
* <https://github.com/entando-k8s/entando-k8s-cluster-infrastructure-controller/>
* <https://github.com/entando-k8s/entando-k8s-app-controller/>
* <https://github.com/entando-k8s/entando-k8s-app-plugin-link-controller/>

DockerHub: 
* <https://hub.docker.com/repository/docker/entando/entando-k8s-composite-app-controller/>
* <https://hub.docker.com/repository/docker/entando/entando-k8s-plugin-controller/>
* <https://hub.docker.com/repository/docker/entando/entando-k8s-cluster-infrastructure-controller/>
* <https://hub.docker.com/repository/docker/entando/entando-k8s-app-controller/>
* <https://hub.docker.com/repository/docker/entando/entando-k8s-app-plugin-link-controller/>

#### Customization
It is unlikely that the controllers will be customized as part of an Entando implementation.
