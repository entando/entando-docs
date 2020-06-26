# Entando's Custom Resources for Kubernetes

## Objective

This document provides an overview of the Entando Kubernetes Custom Resources and their semantics in Entando 6.

## Prerequisites

* Basic knowledge of Kubernetes and how to deploy Docker images to it
* Basic knowledge of Helm and how Helm Charts use YAML templates for parameterized deployments to Kubernetes

## Overview

Amongst the many features it offers, Kubernetes also comes with a REST API that for dozens of different resources types.
Generally these API off full Create/Retrieve/Update/Delete (CRUD) access to each of the resource types. We 
typically format these resources in YAML or JSON and use commandline tools such as
`kubectl` or `oc` to manage them. Each of these resources has a clearly defined structure
that is well documented in the [Kubernetes API](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/) .
Kubernetes  also allows clients to subscribe to events generated as these resources get updated. These subscriptions 
are called 'watches' and allow clients to be notified whenever the state of a resource changes. Kubernetes also
enforces very strong role based access control (RBAC) support on all resources, with permissions down to the level
of granularity of operation (Create/Retrieve/Update/Delete/Watch) per resource.

The basic architecture for Kubernetes worked so well for the developers of Kubernetes that they decided to also make it
available to third  party developers. Kubernetes now offers a mechanism to allow 3rd parties to provide its own custom
resource types that still leverage the CRUD support, event subscriptions and RBAC provided by Kubernetes out of the box.
This mechanism is referred to as Custom Resources.

Custom Resources are very commonly used with Kubernetes Operators. Operators are Docker images that have been
deployed to Kubernetes Deployments. The generally observe a set of custom resources and perform some operations against
the Kubernetes API to reflect the state changes in the Custom Resource. We can say that the Custom Resources are associated
with specific semantics in how they are translated to 

One can introduce a new Custom Resource into Kubernetes by registering a Custom Resource Definition (CRD). This is really
just another yaml or json resource that defines the structure of the Custom Resource to be installed using the OpenAPI
JSON Schema format. When talking about Custom Resources, it is very important to distinguish between Custom Resource
Definitions and Custom Resources. CRD's are static type definitions provided by an Operator
provider such as Entando. For those familiar with programming languages, CRD's are like class definitions, whereas
Custom Resources are actual instances of that class.

Entando introduces two groups of Custom Resources. On the one hand, there are the core Entando Custom Resources required
for a basic installation of Entando in a Kubernetes cluster. These Custom Resources directly result in other
Kubernetes resources being deployed in the cluster. On the other hand, there are the Custom Resources specific
to the Entando Component Repository that serve primarily as metadata for other Entando components.

## The Core Entando Custom Resources

The Entando Operator observes all the Core Entando Custom Resources in one or more namespaces. This means that if a Core
Entando Custom Resource is created, updated or deleted, the Entando Operator will trigger a new run-to-completion Pod
that will translate that state change into a state change in the actual Kubernetes Cluster. Often, this will
result in the Deployment of one or more Docker images, but also one or more Services and sometimes and Ingress
too. We refer to the Docker Images that implement these run-to-completion Pods as Entando Kubernetes Controllers.

The Entando Operator itself is also implemented as a Docker Image. You can have a closer look at how it works in the
[entando-k8s-controller-coordinator](https://github.com/entando-k8s/entando-k8s-controller-coordinator) project on Github.
Apart from the normal Maven, Java and Docker files one would expect, you will also notice the
[entando-k8s-controller-coordinator Helm Chart](https://github.com/entando-k8s/entando-k8s-controller-coordinator/tree/master/charts/entando-k8s-controller-coordinator).
This Helm Chart is basically the entrypoint for installations of Entando 6 on Kubernetes. More detailed instructions
on how to install the Entando 6 Operator are available in our
[installation instructions](/docs/getting-started)

## EntandoKeycloakServer

The EntandoKeycloakServer Custom Resource is used to deploy and configure a Red Hat Keycloak Server instance on the
cluster. After deploying this Keycloak instance, the Entando Operator will create a Kubernetes Secret that provides
the necessary information for subsequent deployment operations to access the Keycloak instance as the Admin user. This
allows the rest of the Entando Kubernetes Controllers to create a Keycloak OIDC client for every HTTP service that
gets deployed. If you already have a Keycloak instance that you would use, you can skip this custom resource entirely
and simply create the `keycloak-admin-secret' in the operator's namespace as specified in
[this tutorial](/tutorials/devops/external-keycloak/)

### Overview
* Entando Cluster Citizen: [Keycloak](/docs/concepts/#entando-cluster-citizens)
* Custom Resource Definition: [EntandoKeycloakServer](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoKeycloakServerCRD.yaml)
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
  parameters: 
    KEYCLOAK_WELCOME_THEME: my-custom-theme
  tlsSecretName: my-tls-secret
  replicas: 1
  
```

###Explanation of properties
* `spec.dbms` is used to select the database management of choice. If this value matches up to the `spec.dbms` property
     of a previously  configured [EntandoDatabaseService](/tutorials/devops/external-database),
     the Keycloak image will be configured to use this service. 
     Alternatively, the Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for Keycloak to use. If left empty, or given value of 'none', Keycloak will be deployed using its own internal 
     H2 database.      
* `spec.imageName` is used to provide a customized image. By default, the operator will use the `entando/entando-keycloak`
     discussed above. When using the default image, please refer to the
     [relevant section](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#how-it-resolves-docker-images)
     in the README of the Entando Operator to determine how the Docker registry and version of this image will be calculated. 
     When you need to customize the theme or add extensions to Keycloak, you can create your own custom image and provide
     the value in this property. In this custom image, make sure you use the default image (`entando/entando-keycloak`)
     as a base image. You can then add your customizations and build your own image. Please use a fully qualified 
     Docker image name here.     
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for Keycloak. Please ensure that this is
     accessible using the default routing suffix of your Entando Operator Deployment, or a DNS name previously 
     registered with your DNS provider.
* `spec.isDefault` is 'true' by default and this should suffice for most conditions. This will result in the standard 
     `keycloak-admin-secret` being replaced by a Secret connecting you to this newly created Keycloak instance. 
     Theoretically one could use multiple Keycloak instances in a cluster, in which case this property should be false.
* `spec.parameters` is a Map of environment variables to pass to the Keycloak Docker image. For example, this could
     be used to select a specific theme for Keycloak to use using the variable KEYCLOAK_WELCOME_THEME. These parameters
     are applied to the container's environment variables after all variables have been calculated. It can therefore
     also be used as a mechanism to override any of the default environment variables that need customization.
* `spec.tlsSecretName` is the name of a standard Kubernetes 
     [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the
     resulting Ingress. This is only required if the 
     [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) 
     for the Operator is absent or has not been created with a wildcard hostname that supports this Keycloak instance's hostname.
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Keycloak Server                                    

## EntandoClusterInfrastructure

The EntandoClusterInfrastructure custom resource can be used to create the shared services that Entando requires in a cluster.
At the time of the writing of this document, there is really only one service, which is the Entando K8S Service, but this 
may change in future. Deployments resulting from this custom resources are configured to use the default Keycloak
Server specified in the `keycloak-admin-secret` using the `entando` realm. An Ingress will also be created as part of this 
deployment. At this point, there is no way to customize the image in question. 

### Overview
* Entando Cluster Citizen: [Entando Kubernetes Service](/docs/concepts/#entando-cluster-citizens)
* Custom Resource Definition: [EntandoClusterInfrastructure](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoClusterInfrastructureCRD.yaml)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-cluster-infrastructure-controller](https://hub.docker.com/r/entando/entando-k8s-cluster-infrastructure-controller) 
  * Github Repo: [entando-k8s/entando-k8s-keycloak-controller](https://github.com/entando-k8s/entando-k8s-cluster-infrastructure-controller) 
* Deployment Details:
  * Docker image: [entando/entando-k8s-service](https://hub.docker.com/r/entando/entando-k8s-service) 
  * Github Repo: [entando-k8s/entando-k8s-service](https://github.com/entando-k8s/entando-k8s-service) 
* Possible Database Images: none

### Example
```
---
kind: "EntandoClusterInfrastructure"
apiVersion: "entando.org/v1"
metadata:
  name: "test-eci"
  namespace: "eci-namespace"
spec:
  keycloakSecretToUse: some-keycloak-secret
  ingressHostName: "test-keycloak.ampie.dynu.net"
  isDefault: true
  parameters: 
    KEYCLOAK_WELCOME_THEME: my-custom-theme
  tlsSecretName: my-tls-secret
  replicas: 1
  
```

###Explanation of properties
* `spec.keycloakSecretToUse` is used to determine which Kubernetes Secret to use to connect to the correct 
     Keycloak instance. If not specified, the default Secret `keycloak-admin-secret` will be used. Only useful 
     if you have more than one Keycloak server in your cluster.
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando K8S Service. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment, or a DNS 
   name previously registered with your DNS provider.
* `spec.isDefault` is 'true' by default and this should suffice for most conditions. This will result in the standard 
     `entando-cluster-infrastructure-secret` being replaced by a Secret connecting you to this newly created
     Entando K8S Service.  Theoretically one could use multiple Entando K8S Services in a cluster, in which
     case this property should be false for new Entando K8S Services that should not override the default Secret.
* `spec.parameters` is a Map of environment variables to pass to the Entando K8S Service Docker image. For example, this could
     be used to override the ENTANDO_NAMESPACES_TO_OBSERVE variable that configures the set of Kubernetes namespaces
     this service should read EntandoDeBundles from. Also note that all of the 
     [Spring variables in entando-k8s-service project](https://github.com/entando-k8s/entando-k8s-service/blob/master/src/main/resources/application.properties)
     can also be overridden here by specifying the equivalent SNAKE_CASE names of the dot-delimited Spring properties.
     These parameters are applied to the container's environment variables after all variables have been calculated. 
     It can therefore also be used as a mechanism to override any of the default environment variables that need customization.
* `spec.tlsSecretName` is the name of a standard Kubernetes 
     [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the
     resulting Ingress. This is only required if the 
     [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) 
     for the Operator is absent or has not been created with a wildcard hostname that supports this Keycloak instance's hostname.
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Entando K8S Service                                    

## EntandoApp

An EntandoApp is a Deployment of a Docker image that hosts an Entando and Java based web application. Entando offers two
standard images that can be used, but generally we expect our customers to provide their own images here. An EntandoApp
Deployment packages three images into a single Pod: the Entando App Image in question, AppBuilder and Component Manager.

### Overview
* Custom Resource Definition: [EntandoApp](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoAppCRD.yaml)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-app-controller](https://hub.docker.com/r/entando/entando-k8s-app-controller) 
  * Github Repo: [entando/entando-k8s-app-controller](https://github.com/entando-k8s/entando-k8s-app-controller) 
* Deployment Details - Entando App:
  * Docker image: [entando/entando-de-app-wildfly](https://hub.docker.com/r/entando/entando-de-app-wildfly) **or**  [entando/entando-de-app-eap](https://hub.docker.com/r/entando/entando-de-app-eap) 
  * Github Repo: [entando-k8s/entando-de-app](https://github.com/entando-k8s/entando-de-app) 
  * Entando Cluster Citizen: [Entando App](/docs/concepts/#entando-cluster-citizens)
* Deployment Details - AppBuilder:
  * Docker image: [entando/app-builder](https://hub.docker.com/r/entando/app-builder) 
  * Github Repo: [entando/app-builder](https://github.com/entando/app-builder) 
* Deployment Details - ComponentManager:
  * Docker image: [entando/entando-component-manager](https://hub.docker.com/r/entando/entando-component-manager) 
  * Github Repo: [entando-k8s/entando-component-manager](https://github.com/entando-k8s/entando-component-manager) 
  * Entando Cluster Citizen: [Component Manager](/docs/concepts/#entando-cluster-citizens)
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
  namespace: "my-namespace"
spec:
  standardServerImage: wildfly
  customServerImage: your-org/your-image:4.3.2
  dbms: "postgresql"
  ingressPath: my-app
  keycloakSecretToUse: some-kc-secret
  clusterInfrastructureToUse: some-eci-secret  
  ingressHostName: "test-app.my-routing-suffix.com"
  parameters: 
    ENTANDO_VAR1: my-var1
  tlsSecretName: my-tls-secret
  replicas: 1
  
```

###Explanation of properties
* `spec.standardServerImage` can be either`wildfly` or `eap`. This instructs the Entando Operator to use one of the
     two standard Entando App images. 
     * For `wildfly` it will deploy the `entando/entando-de-app-wildfly` image 
     * For `eap` it will deploy the `entando/entando-de-app-eap` image
     This property and the `spec.customServerImage` are  assumed to be mutually exclusive. Only provide a value to
     one of the two. Please refer to the 
     [relevant section](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#how-it-resolves-docker-images)
     in the README of the Entando Operator to determine how the Docker registry and version of these images will be calculated.
* `spec.customServerImage` can be used to deploy the Docker image containing your own custom Entando App. Please 
     follow the instructions on how to [build your own image](/tutorials/customize-the-platform/app-engine/building-prepackaged-image).\
     This property and the `spec.standardServerImage` are  assumed to be mutually exclusive. Only provide a 
     value to one of the two.
* `spec.dbms` is used to select the database management of choice. If left empty, a default value of `postgresql` 
     is assumed. The value `none` is not supported. If this value matches up to the `spec.dbms` property
     of a previously configured [EntandoDatabaseService](/tutorials/devops/external-database),
     the Entando App will be configured to use this service. 
     Alternatively, the Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for the EntandoApp to use.
* `spec.ingressPath` specifies the web context of the Entando App to be deployed. This is required to create a single 
     path entry in the Ingress that is used to expose the Entando App. The default behaviour of Wildfly and 
     JBoss EAP is to use the name of the WAR file that is deployed, but it is possible to override this in the EntandoApp
     project itself using a [`jboss-web.xml` file](https://docs.jboss.org/jbossas/guides/webguide/r2/en/html/ch06.html).
     In the absence of the `jboss-web/xml` file, the web context  would be the the
     Maven artifactId of the Entando Opp project. It is also possible to modify this by changing the `<finalName>` element
     in the Maven `pom.xml`  
* `spec.clusterInfrastructureToUse` is the name of the Kubernetes Secret that provides the connection details to the
     EntandoClusterInfrastructure containining the Entando Component Repository for this App to use. This is only
     required if more than one EntandoClusterInfrastructure is available and this value can be omitted entirely under
     most conditions.  
* `spec.keycloakSecretToUse` is used to determine which Kubernetes Secret to use to connect to the correct 
     Keycloak instance. If not specified, the default Secret `keycloak-admin-secret` will be used. Only useful 
     if you have more than one Keycloak server in your cluster.
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando App. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment, or a DNS 
     name previously registered with your DNS provider. Keep in mind that EntandoPlugins linked to this app will
     also be made available on this host.
* `spec.parameters` is a Map of environment variables to pass to the EntandoApp Docker image. For example, this could
     be used to provide connection details for custom datasources or message queues as discussed in the 
     [custom datasources tutorial](/tutorials/customize-the-platform/change-default-datasources-and-connections/tutorials/how-to-configure-custom-datasource). Also note that all of the 
     [Spring variables in an Entando project](https://github.com/entando-k8s/entando-de-app/blob/master/src/main/conf/systemParams.properties)
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
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Entando App                                    

## EntandoPlugin

An Entando Plugin is a microservice that can be made available to one or more EntandoApps in the cluster. Please follow
our instructions on using our blueprint to [build your own EntandoPlugin](/tutorials/ecr/tutorials/from-blueprint-to-de). The
Deployment resulting from an EntandoPlugin is also a multi-container Pod deployment, and will include both the 
plugin Docker image specified and the EntandoPluginSidecar Docker Image  

### Overview
* Custom Resource Definition: [EntandoPlugin](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoPluginCRD.yaml)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-plugin-controller](https://hub.docker.com/r/entando/entando-k8s-plugin-controller) 
  * Github Repo: [entando/entando-k8s-plugin-controller](https://github.com/entando-k8s/entando-k8s-plugin-controller) 
* Deployment Details - plugin: 
  * Docker image: as provided by user
  * Entando Cluster Citizen: [Plugin](/docs/concepts/#entando-cluster-citizens)  
* Deployment Details - EntandoPluginSidecar:
  * Docker image: [entando/entando-plugin-sidecar](https://hub.docker.com/r/entando/entando-plugin-sidecar) 
  * Github Repo: [entando/entando-plugin-sidecar](https://github.com/entando/entando-plugin-sidecar) 
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
  namespace: "my-namespace"
spec:
  image: your-org/your-image:4.3.2
  securityLevel: lenient
  ingressPath: /my-plugin
  healthCheckPath: /actuator/health
  dbms: "postgresql"
  keycloakSecretToUse: some-kc-secret
  clusterInfrastructureToUse: some-eci-secret  
  ingressHostName: "test-app.my-routing-suffix.com"
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
  parameters: 
    ENTANDO_VAR1: my-var1
  tlsSecretName: my-tls-secret
  replicas: 1
```

###Explanation of properties
* `spec.image` is the Docker image you can provide for the plugin you want to deploy. Please follow
     our instructions on using our blueprint to [build your own EntandoPlugin](/tutorials/ecr/tutorials/from-blueprint-to-de)
     Currently only Docker images hosting Spring Boot applications are supported. It is therefore of  utmost 
     importance to start off with our blueprint and ensure that the resulting Spring Boot application respects
     the Spring variables to be set from the Entando Operator.
* `spec.dbms` is used to select the database management of choice. If left empty, or if the value is `none`, it
     is assumed that the plugin in question does not required a database. If this value matches up to 
     the `spec.dbms` property  of a previously  configured 
     [EntandoDatabaseService](/tutorials/devops/external-database),
     the Entando Plugin will be configured to use this service. 
     Alternatively, the Entando Operator will use this value to deploy a dedicated Database instance in this namespace
     for the Entando Plugin to use.
* `spec.ingressPath` specifies the web context where the Entando Plugin will be made available when linked to EntandoApps.
     Please ensure this is in sync with the `server.servlet.context-path` property set on your Spring Boot application.       
* `spec.clusterInfrastructureToUse` is the name of the Kubernetes Secret that provides the connection details to the
     EntandoClusterInfrastructure this Plugin will use. This is only
     required if more than one EntandoClusterInfrastructure is available and this value can be omitted entirely under
     most conditions.  
* `spec.keycloakSecretToUse` is used to determine which Kubernetes Secret to use to connect to the correct 
     Keycloak instance. If not specified, the default Secret `keycloak-admin-secret` will be used. Only useful 
     if you have more than one Keycloak server in your cluster.
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando Plugin. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment, or a DNS 
     name previously registered with your DNS provider. This hostname will not be used from your Widgets that you
     have implemented for this plugin as these widgets will use the hostname of the EntandoApp they are being used from.
     This hostname is useful for embedded web user interfaces used only on this plugin, such as admin user interfaces
     or diagnostic user interface.
* `spec.roles` specifies the set of roles that this plugin expects. At deployment time, the Entando Operator ensures
     that each of these roles are created on Keycloak for the Keycloak client representing this EntandoPlugin. It is
     up to the Plugin provider to ensure that Spring Security has been set up to enforce the access rules implied 
     by the individual roles. Each role has a unique `code` and a more human readable  `name` as property.   
* `spec.permissions` specifies the set of permissions this plugin requires on other services with known Keycloak Clients.
     At deployment time, the Entando Operator will use the service account user of this EntandoPlugin's Keycloak Client
     and create the necessary role bindings on the specified client id of the service to be used. 
     Each permission specifies the `clientId` in Keycloak of the target service, and the `role` that this EntandoPlugin
     should be bound to in that Keycloak client.  
* `spec.parameters` is a Map of environment variables to pass to the EntandoPlugin Docker image. 
     It is entirely up to the plugin provider to determine the semantics of each variable. We strongly suggest for
     plugin provider  to use  the standard Spring Property Resolver syntax for Spring variables, as this would allow
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
* `spec.replicas` - the number of replicas to be made available on the Deployment of this Entando Plugin                                    



## EntandoAppPluginLink

The EntandoAppPluginLink custom resource is created when an AppBuilder user links an EntandoPlugin to the current 
EntandoApp, or deploys an EntandoPlugin for use in the current EntandoApp. The Entando Operator processes the resulting
EntandoAppPluginLink and creates a path for the Plugin on the Ingress that exposes the EntandoApp in question. This path
is determined by the `spec.ingressPath` property on the EntandoPlugin custom resource itself. If the EntandoPlugin
resides in a namespace other than the namespace of the EntandoApp, the EntandoOperator creates a Kubernetes
Service in the namespace of the EntandoApp that simply delegates to the Service in the namespace of the EntandoPlugin.

### Overview
* Custom Resource Definition: [EntandoAppPluginLink](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoAppPluginLinkCRD.yaml)
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
  namespace: "my-namespace"
spec:
  entandoAppName: my-app
  entandoAppNamespace: my-namespace
  entandoPluginName: my-app
  entandoPluginNamespace: my-namespace
  
```

###Explanation of properties
* `spec.entandoAppName` specifies the name of the EntandoApp that requires the plugin, found in `EntandoApp.metadata.name`
* `spec.entandoAppNamespace` specifies the namespace of the EntandoApp that requires the plugin, found in `EntandoApp.metadata.namespace`
* `spec.entandoPluginName` specifies the name of the EntandoApp that requires the plugin, found in `EntandoPlugin.metadata.name`
* `spec.entandoPluginNamespace` specifies the namespace of the EntandoApp that requires the plugin, found in `EntandoPlugin.metadata.namespace`

## EntandoDatabaseService

By default, the Entando Operator deploys one of either the MySQL or PostgreSQL database Docker images for every custom
resource that requires a database. Many customers may however have existing infrastructure for their databases which
they may want to leverage. The EntandoDatabaseService custom resource allows customers to deploy a Service that points
to an external database. When deploying one of the Entando custom resources that require a database, the Entando
Operator will look for EntandoDatabases in the same namespace, and if it finds one with the same `spec.dbms` setting 
as the database required by the custom resource , it will create a dedicated schema/username/password combination
for the custom resource and point the deployment emanating from custom resource to this external database.   

* Custom Resource Definition: [EntandoDatabaseService](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoDatabaseServiceCRD.yaml)


### Example
```
---
kind: "EntandoDatabaseService"
apiVersion: "entando.org/v1"
metadata:
  name: "test-database-service"
  namespace: "my-namespace"
spec:
  dbms: "osracle"
  host: 10.0.12.41
  port: 1521
  databaseName: mydb 
  tablespace: 
  secretName: some-secret
  jdbcParameters:
    maxStatements: 300 
    loginTimeout: 180
```

###Explanation of properties
* `spec.dbms` is used to select the database management of choice. If this value matches up to the `spec.dbms` property
     of the Entando custom resource that will use it. Valid values are `oracle`, `postgresql` and `mysql`.
* `spec.host` can either be a valid IPv4 address, or a hostname. Where an IP address is provided, the Entando Operator
     will create a Kubernetes Service with an associated EndPoints resource to allow for routing to this address. Where
     a hostname is provided, the Entando Operator will simply create a Kubernetes Service of type `cname`
* `spec.port` is the port that the external database service is running on. This value is optional in which case we will
     use the default port for the DBMS vendor in question
* `spec.databaseName` is the name of the database that the Entando Operator should be creating schemas in. This property
     is only for use with PostgreSQL and Oracle, as MySQL doesn't distinguish between schemas and databases.
* `spec.tablespace` is only required for Oracle so that Schemas can be created in different tablespaces.
* `spec.secretName` should be the name (`Secret.metadata.name`) of a Kubernetes Secret in the same namespace that has
     a `username` key and a `password` key that will provide the Entando Operator with the necessary access and permissions
     to create Schemas and users on the database in question.                
* `spec.jdbcParameters` is a map of name/value pairs that will be appended to the JDBC connection string to allow for 
     further customization of the actual connection to the database.
      
## EntandoCompositeApp

The EntandoCompositeApp custom resource can be used to package a collection of Entando Core Custom Resources in a 
single YAML file for sequential deployment. Keep in mind that one can already use standard YAML syntax to package
a set of Kubernetes resources in a single file, separating each resource with a triple dash (`---`). The purpose
of this custom resource is therefor specifically to ensure that the deployment of the previous 'component' has
completed, and that  the resulting Pod is up and running before commencing deploying on the 'component'.  

The primary use case of this custom resource is to package a full Entando App and all its supporting service and 
plugins for easy installation as is often required for demos and POCs. Creating this kind of dependency for typical
production deployments is not advised, as it will inevitably result in a violation of pipeline isolation. The 
more commonly recommended approach is for your Entando Apps and Plugins to be fully deployable in isolation. Use this
custom resource with care. 

### Overview
* Custom Resource Definition: [EntandoCompositeApp](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoCompositeAppCRD.yaml)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-composite-app-controller](https://hub.docker.com/r/entando/entando-k8s-composite-app-controller) 
  * Github Repo: [entando/entando-k8s-composite-app-controller](https://github.com/entando-k8s/entando-k8s-composite-app-controller) 
### Example
```
---
kind: "EntandoCompositeApp"
apiVersion: "entando.org/v1"
metadata:
  name: "test-composite-app"
  namespace: "my-namespace"
spec:
  components:
    - kind: "EntandoKeycloakServer"
         metadata:
           name: "my-kc"
         spec:
           dbms: postgresql
           isDefault: true
           replicas: 1
       - kind: "EntandoClusterInfrastructure"
         metadata:
           name: "my-eci"
         spec:
           dbms: postgresql
           replicas: 1
           isDefault: true
       - kind: "EntandoApp"
         metadata:
           name: "my-app"
         spec:
           dbms: postgresql
           replicas: 1
           standardServerImage: wildfly
           ingressPath: /entando-de-app
       - kind: "EntandoPlugin"
         metadata:
           name: "my-pda"
         spec:
           image: "docker.io/entando/entando-process-driven-plugin:latest"
           replicas: 1
           dbms: "mysql"
```

###Explanation of properties
* `spec.components` specifies the list of Entando Core Custom Resources to be deployed **in sequence**. Please note
     that only the Entando Custom Resources discussed in this section can be used in this list. Custom resources
     related to the Entando Component Repository never result in actual deployments on the Kubernetes cluster and 
     therefore do not need to be specified in any sequence. You can use the normal triple dash YAML notation to 
     include them in the same YAML file  
