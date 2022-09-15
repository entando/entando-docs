---
sidebarDepth: 2
---
# Local Hub

## Introduction

The Local Hub is a repository of modular components that can be reused within an Entando Application.

The following examines some of the nuts and bolts of the Local Hub.

### Component

An Entando component - simply referred to as component - is an identifiable resource or block of
code that can be used in an Entando widget, page or
application. Examples of components are widgets, micro frontends,
content types, labels, plugins, and static resources.

### Entando Bundle

An Entando Bundle is a package containing one or more components and descriptor files that provide information about the bundle. A git-based bundle requires a `descriptor.yaml` and is published in a Git registry. A docker-based bundle requires an `entando.json` and is published to Docker. Both git-based and docker-based bundles are shared with an Entando Application using the EntandoDeBundle custom resource.

### EntandoDeBundle Custom Resource

The EntandoDeBundle custom resource is a Kubernetes resource
readable by the Entando Operator. It provides information
about an Entando Bundle and makes the bundle available in Kubernetes for the
Entando Component Manager.

### Entando Component Manager (ECM)

The Entando Component Manager is part of the
EntandoApp and communicates with both the `entando-core` and Kubernetes cluster via the `entando-k8s-service`. The ECM reads the bundles from the cluster and exposes them with an API accessible from the App Builder. It is
also responsible for the installation and removal of components from the `entando-core`. 

### Entando-K8s-Service

The `entando-k8S-service` is part of the platform infrastructure and is
responsible for the low-level communication with the K8s cluster API.

## Architecture

![ECR Architecture](./img/ecr-architecture.png)

From an architectural point of view, the Entando Component Repository (ECR) is composed of: 
1. The `EntandoDeBundles`, which contain the metadata associated with a bundle. The list of EntandoDeBundles (or Entando Bundles) is displayed as the "Local Hub" in the App Builder.
2. The `entando-k8s-service`, which reads the bundles from the
cluster/namspace(s) and serves them via a consumable API 
3. The ECM, which creates the connection between the EntandoApp
and the K8s service.

### Example Flow

1.  From the Hub page in the App Builder, the user finds the
    list of bundles shared in that EntandoApp

2.  App Builder requests a list of available bundles from the ECM 

3.  ECM queries the K8s service to retrieve a list of
    bundles

4.  The `entando-k8s-service` queries the cluster/namespace(s) 
    for available bundles and returns the list to the ECM

5.  ECM sends the list to App Builder

6.  The user is able to see and install the available bundles
