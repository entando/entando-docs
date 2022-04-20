---
sidebarDepth: 2
---


# Entando Custom Resources for Kubernetes

## Objective


This is an overview of Entando Kubernetes Custom Resources and their usage on the Entando Platform.


## Prerequisites

* Basic knowledge of Kubernetes and how to deploy Docker images

## Overview

Amongst its many features, Kubernetes comes with a REST API for dozens of different resource types.
Generally these APIs offer full Create/Retrieve/Update/Delete (CRUD) access to each of the resource types. We 
typically format these resources in YAML or JSON and use commandline tools such as
`kubectl` or `oc` to manage them. Each of these resources has a clearly defined structure

that is well documented in the [Kubernetes API](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

Kubernetes  also allows clients to subscribe to events generated as these resources get updated. These subscriptions 
are called 'watches' and allow clients to be notified whenever the state of a resource changes. It also
enforces a strong role based access control (RBAC) on all resources, with granular permissions at the level of operation (Create/Retrieve/Update/Delete/Watch) per resource.

The basic architecture for Kubernetes worked so well for its developers that it was made available to third  party developers. Kubernetes now offers a mechanism for third parties to provide their own custom
resource types that still leverqage CRUD support, event subscriptions and RBAC out of the box.
This mechanism is referred to as Custom Resources.

Custom Resources are most commonly used with Kubernetes Operators. Operators are Docker images that have been
deployed to Kubernetes Deployments. Generally, they observe a set of custom resources and perform some operations against
the Kubernetes API to reflect the state changes in the Custom Resource. We can say that Custom Resources are associated
with specific semantics in how they are translated in the cluster. 

A new Custom Resource can be introduced into Kubernetes by registering a Custom Resource Definition (CRD). This is 
just another yaml or json resource that defines the structure of the custom resource to be installed using the OpenAPI
JSON Schema format. When talking about Custom Resources, it is very important to distinguish between Custom Resource
Definitions and Custom Resources. CRD's are static type definitions provided by an Operator
provider such as Entando. For those familiar with programming languages, CRD's are like class definitions, whereas
Custom Resources are actual instances of that class.

Entando introduces two groups of Custom Resources. 

 * Core Custom Resources required
for a basic installation of Entando in a Kubernetes cluster. These directly result in other
Kubernetes resources being deployed in the cluster. 
* Custom Resources specific
to the Entando Component Repository that serve primarily as metadata for other Entando components.

## The Core Entando Custom Resources

The Entando Operator observes all the Core Entando Custom Resources in one or more namespaces. If a Core
Entando Custom Resource is created, updated or deleted, the Entando Operator will trigger a new run-to-completion Pod
that will translate that state change into a state change in the actual Kubernetes Cluster. Often, this will
result in the Deployment of one or more Docker images, along with one or more Services, and sometimes an Ingress. We refer to the Docker Images that implement these run-to-completion Pods as Entando Kubernetes Controllers.

The Entando Operator itself is also implemented as a Docker image. See the
[entando-k8s-controller-coordinator repo](https://github.com/entando-k8s/entando-k8s-controller-coordinator) for details.

More detailed instructions on how to install Entando are available in our
[Getting Started tutorial](../getting-started). Learn more about [Configuring the Operator here](../../tutorials/devops/entando-operator.md).


## The ResourceRequirements specification

All of the Entando Custom Resources that result in physical Kubernetes Deployments can be configured with specific
resource requirements. These settings can be provided under the `spec` object of the custom resource. It currently 
supports the following attributes:
* `spec.resourceRequirements.storageRequest` - the initial storage requested from the persistence provider. Please keep
in mind that resizable storage is not supported by all storage providers, and this may be the final size of the storage
allocated. 
* `spec.resourceRequirements.storageLimit` - the maximum amount of storage required by the deployment. 
* `spec.resourceRequirements.memoryRequest` - the initial memory requested from the node the deployment's primary container is running on.
* `spec.resourceRequirements.memoryLimit` - the maximum amount of memory the deployment's primary container will use. If
 it exceeds this amount, the container may be terminated by Kubernetes.
* `spec.resourceRequirements.cpuRequest` - the initial CPU allocation from the node the deployment's primary container is running on.
* `spec.resourceRequirements.cpuLimit` - the maximum CPU allocation for the deployment's primary container.
* `spec.resourceRequirements.fileUploadLimit`  - the maximum upload file size supported by the deployment.

All of these attributes require a number and a unit of measurement, e.g. "64Mi". Please consult the 
[official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container)
for more information on how to configure these attributes.

## EntandoKeycloakServer

The EntandoKeycloakServer Custom Resource is used to deploy and configure a Red Hat Keycloak Server instance on the
cluster. After deploying this Keycloak instance, the Entando Operator will create a Kubernetes Secret that provides
the necessary information for subsequent deployment operations to access the Keycloak instance as the Admin user. This
allows the rest of the Entando Kubernetes Controllers to create a Keycloak OpenID Connect (OIDC) client for every HTTP service that
gets deployed. If you already have a Keycloak instance that you want to use, you can skip this custom resource entirely and create the `keycloak-admin-secret` in the operator's namespace as specified in the 
[external Keycloak tutorial](../../tutorials/devops/external-id-management.md).

### Overview
* Entando Cluster Citizen: [Keycloak](../getting-started/concepts-overview.md#entando-cluster-citizens)
* Custom Resource Definition: [EntandoKeycloakServer](https://github.com/entando-k8s/entando-k8s-custom-model/blob/v7.0.0/src/main/resources/crd/entandokeycloakservers.entando.org.crd.yaml)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-keycloak-controller](https://hub.docker.com/r/entando/entando-k8s-keycloak-controller) 
  * Github Repo: [entando-k8s/entando-k8s-keycloak-controller](https://github.com/entando-k8s/entando-k8s-keycloak-controller) 
* Deployment Details:
  * Docker image: [entando/entando-keycloak](https://hub.docker.com/r/entando/entando-keycloak) 
  * Github Repo: [entando/entando-keycloak](https://github.com/entando/entando-keycloak) 
* Possible Database Images:
  * MySQL: [docker.io/centos/mysql-57-centos7](https://hub.docker.com/r/centos/mysql-57-centos7) 
  * PostgreSQL: [docker.io/centos/postgresql-96-centos7](https://hub.docker.com/r/centos/postgresql-96-centos7) 

### Example
```
---
kind: "EntandoKeycloakServer"
apiVersion: "entando.org/v1"
metadata:
  name: "test-keycloak"
  namespace: "keycloak-namespace"
spec:
  dbms: "postgresql"
  imageName: "entando/entando-keycloak"
  ingressHostName: "test-keycloak.ampie.dynu.net"
  isDefault: true
  environmentVariables: 
    - name: KEYCLOAK_WELCOME_THEME
      value: your-custom-theme
  tlsSecretName: your-tls-secret
  replicas: 1
  
```

### Explanation of properties
* `spec.dbms` is used to select the database management of choice. The Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for Keycloak to use. If this value matches the `spec.dbms` property
     of a previously  configured [EntandoDatabaseService](../../tutorials/devops/external-db),
     the Keycloak image will be configured to use this service. 
     If left empty or given a value of 'none', Keycloak will deploy using its own internal 
     H2 database.      
* `spec.imageName` is used to provide a customized image. By default, the operator will use the `entando/entando-keycloak`
     discussed above. When using the default image, please refer to the
     [Docker image section](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#how-it-resolves-docker-images)
     in the README of the Entando Operator to determine how the Docker registry and version for the image is calculated. 
     When you need to customize the theme or add extensions to Keycloak, you can create your own custom image and provide
     the value in this property. Make sure you use the default image (`entando/entando-keycloak`)
     as a base image. You can then add your customizations and build your own. Please use a fully qualified 
     Docker image name here.     
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for Keycloak. Please ensure that this is
     accessible using the default routing suffix of your Entando Operator Deployment or a DNS name previously 
     registered with your DNS provider.
* `spec.isDefault` is 'true' by default and this should suffice for most conditions. This will result in the standard 
     `keycloak-admin-secret` being replaced by a Secret connecting you to this newly created Keycloak instance. 
     Theoretically one could use multiple Keycloak instances in a cluster, in which case this property should be false.
* `spec.environmentVariables` is a Map of environment variables to pass to the Keycloak Docker image. For example, this could
     be used to select a specific theme for Keycloak with the variable KEYCLOAK_WELCOME_THEME. These parameters
     are applied to the container's environment variables after all variables have been calculated. It can therefore
     also be used as a mechanism to override any of the default environment variables that need customization.
* `spec.tlsSecretName` is the name of a standard Kubernetes 
     [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the
     resulting Ingress. This is only required if the 
     [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) 
     for the Operator is absent or has not been created with a wildcard hostname that supports this Keycloak instance's hostname.
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Keycloak Server.

* `spec.resourceRequirements` - the minimum and maximum [resource allocations](#the-resourcerequirements-specification) for the Keycloak server container.                                     

## EntandoApp

An EntandoApp is a Deployment of a Docker image that hosts an Entando and Java based web application. Entando offers two
standard images that can be used, but generally we expect our customers to provide their images here. An EntandoApp
deployment packages three images into a single Pod: the EntandoApp image discussed here, AppBuilder, and Component Manager.

### Overview

* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-app-controller](https://hub.docker.com/r/entando/entando-k8s-app-controller) 
  * Github Repo: [entando/entando-k8s-app-controller](https://github.com/entando-k8s/entando-k8s-app-controller) 
* Deployment Details - Entando App:
  * Docker image: [entando/entando-de-app-wildfly](https://hub.docker.com/r/entando/entando-de-app-wildfly) **or**  [entando/entando-de-app-eap](https://hub.docker.com/r/entando/entando-de-app-eap) 
  * Github Repo: [entando-k8s/entando-de-app](https://github.com/entando/entando-de-app) 
  * Entando Cluster Citizen: [Entando App](../getting-started/concepts-overview.md#entando-cluster-citizens)
* Deployment Details - AppBuilder:
  * Docker image: [entando/app-builder](https://hub.docker.com/r/entando/app-builder) 
  * Github Repo: [entando/app-builder](https://github.com/entando/app-builder) 
* Deployment Details - ComponentManager:
  * Docker image: [entando/entando-component-manager](https://hub.docker.com/r/entando/entando-component-manager) 
  * Github Repo: [entando-k8s/entando-component-manager](https://github.com/entando-k8s/entando-component-manager) 
  * Entando Cluster Citizen: [Component Manager](../getting-started/concepts-overview.md#entando-cluster-citizens)
* Possible Database Images:
  * MySQL: [docker.io/centos/mysql-57-centos7](https://hub.docker.com/r/centos/mysql-57-centos7) 
  * PostgreSQL: [docker.io/centos/postgresql-96-centos7](https://hub.docker.com/r/centos/postgresql-96-centos7) 

### Example
```
---
kind: "EntandoApp"
apiVersion: "entando.org/v1"
metadata:
  name: "test-app"
  namespace: "your-namespace"
spec:
  standardServerImage: wildfly
  customServerImage: your-org/your-image:4.3.2
  dbms: "postgresql"
  ingressPath: your-app
  ingressHostName: "test-app.your-routing-suffix.com"
  environmentVariables: 
    - name: ENTANDO_VAR1
      value: your-var1
  tlsSecretName: your-tls-secret
  replicas: 1
  ecrGitSshSecretName: your-secret
  storageClass: standard
  
```
### Explanation of properties
* `spec.standardServerImage` can be either`wildfly` or `eap`. This instructs the Entando Operator to use one of the
     two standard Entando App images. 
     * `wildfly` will deploy the `entando/entando-de-app-wildfly` image 
     * `eap` will deploy the `entando/entando-de-app-eap` image
     
     This property and the `spec.customServerImage` are  assumed to be mutually exclusive. Only provide a value to
     one of the two. Please refer to the 
     [Docker image section](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#how-it-resolves-docker-images)
     in the README of the Entando Operator to determine how the Docker registry and version of these images are calculated.
* `spec.customServerImage` can be used to deploy the Docker image containing your own custom Entando App. Please 
     follow the instructions on how to [build your own image](../../tutorials/devops/build-core-image.md).\
     This property and the `spec.standardServerImage` are  assumed to be mutually exclusive. Only provide a 
     value to one of the two.
* `spec.dbms` is used to select the database management of choice. If left empty, a default value of `postgresql` 
     is assumed. The value `none` is not supported. The Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for the EntandoApp to use. If this value matches the `spec.dbms` property
     of a previously configured [EntandoDatabaseService](../../tutorials/devops/external-db.md),
     the Entando App will be configured to use this service. 
    
* `spec.ingressPath` specifies the web context of the Entando App to be deployed. This is required to create a single 
     path entry in the Ingress that is used to expose the Entando App. The default behaviour of Wildfly and 
     JBoss EAP is to use the name of the WAR file that is deployed, but it is possible to override this in the EntandoApp
     project using a [`jboss-web.xml` file](https://docs.jboss.org/jbossas/guides/webguide/r2/en/html/ch06.html).
     In the absence of this file, the web context would be the
     Maven artifactId of the Entando App project. It is also possible to modify this by changing the `<finalName>` element
     in the Maven `pom.xml`.  


* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando App. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment or a DNS 
     name previously registered with your DNS provider. Keep in mind that EntandoPlugins linked to this app will
     also be made available on this host.
* `spec.environmentVariables` is a Map of environment variables to pass to the EntandoApp Docker image. For example, this could
     be used to provide connection details for custom datasources or message queues as discussed in the 
     [custom datasources tutorial](../../tutorials/devops/change-default-datasource.md). Also note that all of the 
     [Spring variables in an Entando project](https://github.com/entando/entando-de-app/blob/master/src/main/conf/systemParams.properties)
     can also be overridden here by specifying the equivalent SNAKE_CASE names of the dot-delimited Spring properties.
     These parameters are applied to the container's environment variables after all variables have been calculated.
     It can therefore also be used as a mechanism to override any of the default environment variables that need customization.
     Keep in mind that these parameters will be passed to each of the three containers in this Pod as environment 
     variables, and that care needs to be taken to avoid conflicting variable names.     
* `spec.tlsSecretName` is the name of a standard Kubernetes 
     [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the
     resulting Ingress. This is only required if the 
     [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) 
     for the Operator is absent or has not been created with a wildcard hostname that supports this Keycloak instance's hostname.
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Entando App.                                  
* `spec.resourceRequirements` - the minimum and maximum [resource allocation](#the-resourcerequirements-specification) for the Entando App Engine container.                                     
* `spec.ecrGitSshSecretName` - a secret containing a private key file named `rsa_id` that matches a public key configured in the Git server. 
* `spec.storageClass` - the name of the StorageClass to use for PersistentVolumeClaims created for this EntandoApp. For more information, go to [Kubernetes explanation on Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/).


## EntandoPlugin

An Entando Plugin is a microservice that can be made available to one or more EntandoApps in the cluster. Please follow
our instructions on using our blueprint to [build your own EntandoPlugin](../../tutorials/create/pb/publish-project-bundle.md). The
Deployment resulting from an EntandoPlugin is a single-container Pod deployment and will include the 
plugin Docker image specified.  

### Overview

* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-plugin-controller](https://hub.docker.com/r/entando/entando-k8s-plugin-controller) 
  * Github Repo: [entando/entando-k8s-plugin-controller](https://github.com/entando-k8s/entando-k8s-plugin-controller) 
* Deployment Details - plugin: 
  * Docker image: as provided by user
  * Entando Cluster Citizen: [Plugin](../getting-started/concepts-overview.md#entando-cluster-citizens)  
* Possible Database Images:
  * MySQL: [docker.io/centos/mysql-57-centos7](https://hub.docker.com/r/centos/mysql-57-centos7) 
  * PostgreSQL: [docker.io/centos/postgresql-96-centos7](https://hub.docker.com/r/centos/postgresql-96-centos7) 

### Example
```
---
kind: "EntandoPlugin"
apiVersion: "entando.org/v1"
metadata:
  name: "test-plugin"
  namespace: "your-namespace"
spec:
  image: your-org/your-image:4.3.2
  securityLevel: lenient
  ingressPath: /your-plugin
  healthCheckPath: /actuator/health
  dbms: "postgresql"
  ingressHostName: "test-app.your-routing-suffix.com"
  roles:
    - code: admin
      name: Administrators
    - code: user
      name: Users
  permissions: 
    - clientId: some-keycloak-client 
      role: some-admin
    - clientId: another-keycloak-client 
      role: another-admin
  environmentVariables: 
    - name: ENTANDO_VAR1
      value: your-var1
  tlsSecretName: your-tls-secret
  replicas: 1
```

### Explanation of properties
* `spec.image` is the Docker image you can provide for the plugin you want to deploy. Please follow
     our instructions on using our blueprint to [build your own EntandoPlugin](../../tutorials/create/pb/publish-project-bundle.md).
     If you start with the Entando Blueprint, the resulting Spring Boot application will make use of the environment variables set by the Entando Operator. 
* `spec.dbms` is used to select the database management of choice. The Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for the Entando Plugin to use. If left empty or if the value is `none`, it
     is assumed that the plugin in question does not require a database. If this value matches 
     the `spec.dbms` property  of a previously  configured 
     [EntandoDatabaseService](../../tutorials/devops/external-db.md),
     the Entando Plugin will be configured to use this service. 
* `spec.ingressPath` specifies the web context where the Entando Plugin will be made available when linked to EntandoApps.
     Please ensure this is in sync with the `server.servlet.context-path` property set in your Spring Boot application.       
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando Plugin. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment or a DNS 
     name previously registered with your DNS provider. This hostname will not be used from your Widgets that you
     implemented for this plugin, as these widgets will use the hostname of the EntandoApp they are used from.
     This hostname is useful for embedded web user interfaces in this plugin, such as admin user interfaces
     or diagnostic user interface.
* `spec.roles` specifies the set of roles that this plugin expects. At deployment time, the Entando Operator ensures
     that each of these roles are created on Keycloak for the Keycloak client representing this EntandoPlugin. It is
     up to the Plugin provider to ensure that Spring Security has been set up to enforce the access rules implied 
     by the individual roles. Each role has a unique `code` and a more human readable  `name` as a property.   
* `spec.permissions` specifies the set of permissions this plugin requires on other services with known Keycloak Clients.
     At deployment time, the Entando Operator will use the service account user of this EntandoPlugin's Keycloak Client
     and create the necessary role bindings on the specified client id of the service to be used. 
     Each permission specifies the `clientId` in Keycloak of the target service, and the `role` that this EntandoPlugin
     should be bound to in that Keycloak client.  
* `spec.environmentVariables` is a Map of environment variables to pass to the EntandoPlugin Docker image. 
     It is entirely up to the plugin provider to determine the semantics of each variable. We strongly suggest for the
     plugin provider to use the standard Spring Property Resolver syntax for Spring variables, as this would allow
     any of these variables to be overridden here by specifying the equivalent SNAKE_CASE names of the dot-delimited
     Spring properties.
     These parameters are applied to the container's environment variables after all variables have been calculated.
     It can therefore also be used as a mechanism to override any of the default environment variables that need customization.
     Keep in mind that these parameters will be passed to both containers in this Pod as environment 
     variables, and that care needs to be taken to avoid conflicting variable names.     
* `spec.tlsSecretName` is the name of a standard Kubernetes 
     [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the
     resulting Ingress. This is only required if the 
     [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) 
     for the Operator is absent or has not been created with a wildcard hostname that supports this Keycloak instance's hostname.
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Entando Plugin.                                    
* `spec.resourceRequirements` - the minimum and maximum [resource allocation](#the-resourcerequirements-specification) for the Entando Plugin container.                                     

## EntandoAppPluginLink

The EntandoAppPluginLink custom resource is created when an AppBuilder user links an EntandoPlugin to the current 
EntandoApp or deploys an EntandoPlugin for use in the current EntandoApp. The Entando Operator processes the resulting
EntandoAppPluginLink and creates a path for the Plugin on the Ingress that exposes the EntandoApp in question. This path
is determined by the `spec.ingressPath` property on the EntandoPlugin custom resource itself. If the EntandoPlugin
resides in a namespace other than the namespace of the EntandoApp, the EntandoOperator creates a Kubernetes
Service in the namespace of the EntandoApp that simply delegates to the Service in the namespace of the EntandoPlugin.

### Overview

* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-app-plugin-link-controller](https://hub.docker.com/r/entando/entando-k8s-app-plugin-link-controller) 
  * Github Repo: [entando/entando-k8s-app-plugin-link-controller](https://github.com/entando-k8s/entando-k8s-app-plugin-link-controller) 
### Example
```
---
kind: "EntandoAppPluginLink"
apiVersion: "entando.org/v1"
metadata:
  name: "test-link"
  namespace: "your-namespace"
spec:
  entandoAppName: your-app
  entandoAppNamespace: your-namespace
  entandoPluginName: your-app
  entandoPluginNamespace: your-namespace

```

### Explanation of properties
* `spec.entandoAppName` specifies the name of the EntandoApp that requires the plugin, found in `EntandoApp.metadata.name`
* `spec.entandoAppNamespace` specifies the namespace of the EntandoApp that requires the plugin, found in `EntandoApp.metadata.namespace`
* `spec.entandoPluginName` specifies the name of the EntandoApp that requires the plugin, found in `EntandoPlugin.metadata.name`
* `spec.entandoPluginNamespace` specifies the namespace of the EntandoApp that requires the plugin, found in `EntandoPlugin.metadata.namespace`

## EntandoDatabaseService

By default, the Entando Operator deploys one of either the MySQL or PostgreSQL database Docker images for every custom
resource that requires a database. Many customers may, however, have existing infrastructure for their databases which
they may want to leverage. The EntandoDatabaseService custom resource allows customers to deploy a Service that points
to an external database. When deploying one of the Entando Custom Resources that require a database, the Entando
Operator will look for EntandoDatabases in the same namespace. If it finds one with the same `spec.dbms` setting 
as the database required by the custom resource, it will create a dedicated schema/username/password combination
for the custom resource and point the deployment emanating from Custom Resources to this external database.   


### Example
```
---
kind: "EntandoDatabaseService"
apiVersion: "entando.org/v1"
metadata:
  name: "test-database-service"
  namespace: "your-namespace"
spec:
  dbms: "oracle"
  host: 10.0.12.41
  port: 1521
  databaseName: yourdb 
  tablespace: 
  secretName: some-secret
  jdbcParameters:
    maxStatements: 300 
    loginTimeout: 180
```

### Explanation of properties
* `spec.dbms` is used to select the database management of choice if this value matches the `spec.dbms` property
     of the Entando custom resource that will use it. Valid values are `oracle`, `postgresql` and `mysql`.
* `spec.host` can either be a valid IPv4 address or a hostname. Where an IP address is provided, the Entando Operator
     will create a Kubernetes Service with an associated EndPoints resource to allow for routing to this address. Where
     a hostname is provided, the Entando Operator will simply create a Kubernetes Service of type `cname`.
* `spec.port` is the port that the external database service is running on. This value is optional in which case we will
     use the default port for the DBMS vendor in question.
* `spec.databaseName` is the name of the database that the Entando Operator should be creating schemas in. This property
     is only for use with PostgreSQL and Oracle, as MySQL doesn't distinguish between schemas and databases.
* `spec.tablespace` is only required for Oracle so that Schemas can be created in different tablespaces.
* `spec.secretName` should be the name (`Secret.metadata.name`) of a Kubernetes Secret in the same namespace that has
     a `username` key and a `password` key to provide the Entando Operator with the necessary access and permissions
     to create Schemas and users on the database in question.                
* `spec.jdbcParameters` is a map of name/value pairs that will be appended to the JDBC connection string to allow for 
     further customization of the actual connection to the database.
      
