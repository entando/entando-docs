---
sidebarDepth: 2
---
# Entando Local Hub

## Introduction

The Entando Local Hub is a repository of modular components accessible from an Entando App Builder. It represents the Entando Bundles deployed or installed in the Entando Application.

The functional blocks and services of the Local Hub are examined below in further detail.

### Entando Component

Entando defines a component as an identifiable resource or block of code that can be used in an Entando Application. Examples of components are widgets, micro frontends, content types, labels, plugins, and static resources.

### Entando Bundle

An [Entando Bundle](../getting-started/concepts-overview.md#entando-bundle) is a package containing one or more components, the required descriptor files, and bundle metadata.

A git-based bundle requires a `descriptor.yaml` and is published in a Git registry. A docker-based bundle requires an `entando.json` and is published to Docker. Both git-based and docker-based bundles are shared with an Entando Application using the EntandoDeBundle custom resource.

### EntandoDeBundle Custom Resource

The EntandoDeBundle custom resource is a Kubernetes resource read by the Entando Operator. It provides information about an Entando Bundle and makes the bundle available to the Entando Component Manager in Kubernetes.

### Entando Component Manager

The [Entando Component Manager](../compose/ecm-overview.md) creates the connection between the EntandoApp
and the Entando Kubernetes integration service. It is part of the EntandoApp and communicates with both the `entando-core` and Kubernetes cluster. It is also responsible for the installation and removal of components from the `entando-core`. 

### Entando Kubernetes Integration Service

The [Entando Kubernetes integration service](../getting-started/concepts-overview.md#entando-kubernetes-service), or `entando-k8S-service`, is part of the platform infrastructure and responsible for the low-level communication with the K8s cluster API. It reads the bundles in an Entando Cluster and serves them with an API accessible from the App Builder.

## Architecture

![ECR Architecture](./img/ecr-architecture.png)

The following flow describes how the App Builder, Entando Kubernetes integration service and Entando Component Manager interact to populate the Local Hub with available bundles.

### Example Flow

1.  The user navigates to the Hub page in the App Builder to view the bundles shared with that EntandoApp

2.  The App Builder requests a list of bundles available to the EntandoApp from the Entando Component Manager 

3.  The Entando Component Manager queries the `entando-k8S-service` to retrieve the list of bundles

4.  The `entando-k8s-service` queries the cluster/namespace(s) and returns the list of available bundles to the Entando Component Manager

5.  The Entando Component Manager sends the list of bundles to the App Builder

6.  The available bundles appear in the Hub page of the App Builder, where they can be installed and managed by the user
