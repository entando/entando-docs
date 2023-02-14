---
permalink: /v6.3.2/docs/compose/ecr-overview.html
redirectFrom: /v6.3.2/docs/ecr/ecr-overview.html
---

# Entando Component Repository


The Entando Component Repository (ECR) is meant to be a repository to
share reusable components among different Entando instances.

The following glossary relates to the ECR and related concepts:

## Glossary

### Component

An Entando component - simply referred to as component - is a piece of
reusable code/resource to be used in an Entando widget, page or
application. Examples of components are widgets, microfrontends,
content-types, labels, plugins, and static resources

### ECR Bundle

An ECR bundle - is a package containing one or more components and a
'descriptor.yaml' file providing information about the bundle. The
bundle is published on an Git registry and is shared with an Entando
application using the EntandoDeBundle custom resource.

### EntandoDeBundle custom resource

The EntandoDeBundle custom resource is a Kubernetes custom resource
readable by the Entando6 operator. It’s used to provide information
about an ECR bundle and make the bundle available in kubernetes for the
entando-component-manager.

### Entando-component-manager

The entando-component-manager - a.k.a component-manager is part of the
Entando6 app and dialogs both with the Kubernetes cluster via the
entando-k8s-service and with the entando-core. The
entando-component-manager reads the bundles from the cluster and exposes
them via an API accessible from AppBuilder. The component-manager is
also responsible of the installation/removal of components from
entando-core

### Entando-K8S-service

The Entando-K8S-Service is part of the Entando infrastructure and is
responsible for the low-level communication with the K8S cluster API.

## Architecture

![ECR Architecture](./img/ecr-architecture.png)

From an architectural point of view, the ECR is composed of 
1. The EntandoDeBundles which contain the metadata associated with a bundle
2. The Entando-k8s-service which reads the bundles from the
cluster/namspace(s) and serves them via a consumable API 
3. The Component-manager which creates the connection between the EntandoApp
and the K8S-service.

## Example flow

1.  The user lands on the ECR page in app-builder and wants to see the
    list of bundles shared with that EntandoApp

2.  AppBuilder asks the component-manager for the list of available
    bundles

3.  Component-manager queries the k8s-service to get the available
    bundles

4.  The k8s-service queries the cluster/namespace(s) it is able to read
    from for available bundles and returns the list to the
    component-manager

5.  Component-manager returns a list to App-Builder

6.  The user is able to see the available bundles and is able to install
    one or more of them
