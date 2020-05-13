# Entando's Custom Resources for Kubernetes

## Objective

This document provides an overview of the Entando Kubernetes Custom Resources and their semantics in Entando 6.

## Prequesites

* Basic knowledge of Kubernetes and how to deploy Docker images to it
* Basic knowledge of Helm and how Helm Charts use YAML templates for parameterized deployments to Kubernetes

## Overview

Kubernetes comes with full CRUD support for its dozens of data structures types. It also allows clients to subscribe to
events generated as these resources get updated, and has very strong role based access control (RBAC) support on all resources.

The basic architecture for Kubernetes worked so well for the developers of Kuberentes that they decided to also make it
available to third  party developers. Kubernets now offers a mechanism to allow 3rd parties to provide its own custom
data structures that still leverage the CRUD support, event subscriptions and RBAC provided by Kubernetes out of the box.
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

The Entando Operator observes all the Core Entando Custom Resources one or more namespaces. This means that if a Core
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
[installation instructions](../local-install.md)

## EntandoKeycloakServer

The EntandoKeycloakServer Custom Resources is used to deploy and configure a Red Hat Keycloak Server instance on the
cluster. After deploying this Keycloak instance, the Entando Operator will create a Kubernetes Secret that provides
the necessary information for subsequent deployment operations to access the Keycloak instance as the Admin user. This
allows the rest of the Entando Kubernetes Controllers to create a Keycloak OIDC client for every HTTP service that
gets deployed. If you already have a Keycloak instance that you would use, you can skip this custom resource entirely
and simply create the `keycloak-admin-secret' in the operator's namespace as specified in
[this tutorial](../k8s-operator/tutorials/how-to-connect-to-external-keycloak.md)

### Overview
* Entando Cluster Citizen: [Keycloak](../k8s-operator/entando6-cluster-citizens.md#keycloak)
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
     of a previously  configured [EntandoDatabaseService](../k8s-operator/connecting-external-db.md),
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
* Entando Cluster Citizen: [Entando Kubernetes Service](../k8s-operator/entando6-cluster-citizens.md#entando-kubernetes-service)
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
standard images that can be used, but generally we expect our customers to provide their own images here.

### Overview
* Entando Cluster Citizen: [Entando App](../k8s-operator/entando6-cluster-citizens.md#entando-app)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-app-controller](https://hub.docker.com/r/entando/k8s-app-controller) 
  * Github Repo: [entando/entando-k8s-app-controller](https://github.com/entando-k8s/k8s-app-controller) 
* Deployment Details:
  * Docker image: [entando/entando-de-app-wildfly](https://hub.docker.com/r/entando/entando-de-app-wildfly) **or**  [entando/entando-de-app-eap](https://hub.docker.com/r/entando/entando-de-app-eap) 
  * Github Repo: [entando-k8s/entando-de-app](https://github.com/entando-k8s/entando-de-app) 
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
* `spec.keycloakSecretToUse` is used to determine which Kubernetes Secret to use to connect to the correct 
     Keycloak instance. If not specified, the default Secret `keycloak-admin-secret` will be used. Only useful 
     if you have more than one Keycloak server in your cluster.
* `spec.ingressHostName` is the hostname of the Kubernetes Ingress to be created for the Entando App. Please 
     ensure that this is accessible using the default routing suffix of your Entando Operator Deployment, or a DNS 
     name previously registered with your DNS provider. Keep in mind that EntandoPlugins linked to this app will
     also be made available on this host.
* `spec.parameters` is a Map of environment variables to pass to the EntandoApp Docker image. For example, this could
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

## EntandoPlugin
### Overview
* Entando Cluster Citizen: [Keycloak](../k8s-operator/entando6-cluster-citizens.md#keycloak)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-keycloak-controller](https://hub.docker.com/r/entando/k8s-keycloak-controller) 
  * Github Repo: [entando/entando-k8s-keycloak-controller](https://github.com/entando-k8s/k8s-keycloak-controller) 
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

## EntandoAppPluginLink
### Overview
* Entando Cluster Citizen: [Keycloak](../k8s-operator/entando6-cluster-citizens.md#keycloak)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-keycloak-controller](https://hub.docker.com/r/entando/k8s-keycloak-controller) 
  * Github Repo: [entando/entando-k8s-keycloak-controller](https://github.com/entando-k8s/k8s-keycloak-controller) 
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

## EntandoDatabaseService
### Overview
* Entando Cluster Citizen: [Keycloak](../k8s-operator/entando6-cluster-citizens.md#keycloak)
* Kubernetes Controller Details:
  * Docker image: [entando/entando-k8s-keycloak-controller](https://hub.docker.com/r/entando/k8s-keycloak-controller) 
  * Github Repo: [entando/entando-k8s-keycloak-controller](https://github.com/entando-k8s/k8s-keycloak-controller) 
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

