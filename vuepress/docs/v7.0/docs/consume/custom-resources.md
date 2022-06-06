---
sidebarDepth: 2
---

# Entando Custom Resources for Kubernetes
Custom resources (CRs) extend the capabilities of the Kubernetes API to customize instances of your Entando Application. The resources uses Kubernetes API conventions, leveraging CRUD support, event subscriptions and RBAC out of the box. 
 
A custom resource is introduced by registering a Custom Resource Definition (CRD). This is a YAML or JSON resource that defines the structure of the resource using the OpenAPI JSON Schema format. It is important to distinguish between CRDs and custom resources. CRDs are static definitions provided by Entando. For those familiar with programming languages, CRDs are like class definitions, whereas custom resources are actual instances of the definition.
  
Entando distinguishes between two kinds of custom resources: a core resource required for the basic installation of Entando, and those that serve as metadata for other Entando components such as the database service. Following are the descriptions of some of the main CRDs.  
* [Entando Core Resource](#entando-core-resource)
* [General ResourceRequirements](#general-resourcerequirements-specifications)
* [EntandoApp Custom Resource](entandoapp-cr.md)
* [EntandoKeycloakServer Custom Resource](keycloak-cr.md)
* [EntandoDatabaseService Custom Resource](database-cr.md)
<!-- * [EntandoDeBundle Custom Resource]()-->
* [Other Custom Resources](#other-custom-resources)
> See  [Kubernetes custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) for more details.
  
## Entando Core Resource
The core resource is required for the basic installation of Entando in a Kubernetes cluster. The Entando Operator observes the Entando core custom resource in one or more namespaces. If the core custom resource is created, updated or deleted, the operator will trigger a new run-to-completion pod that implements the state change into the actual Kubernetes cluster. Typically, this results in the deployment of Docker images, services, and sometimes an ingress. Docker images that implement these run-to-completion pods are referred to as Entando Kubernetes Controllers.
 
## General ResourceRequirements Specifications 
 
All the custom resources that result in physical Kubernetes Deployments can be configured with specific resource requirements. These settings can be provided under the `spec` object of the custom resource. It supports the following attributes:

| Spec Name | Description |
| :- | :- |
| `spec.resourceRequirements.cpuLimit` | The maximum CPU allocation for the deployment's primary container.|
|`spec.resourceRequirements.cpuRequest` | The initial CPU allocation from the node the deployment's primary container is running on.|
| `spec.resourceRequirements.fileUploadLimit` | The maximum upload file size supported by the deployment.|
|`spec.resourceRequirements.memoryLimit` | The maximum memory the deployment's primary container will use. If it exceeds this amount, the container may be terminated by Kubernetes.|
|`spec.resourceRequirements.memoryRequest` | The initial memory requested from the node the deployment's primary container is running on.|
|`spec.resourceRequirements.storageLimit` | The maximum amount of storage required by the deployment.|
|`spec.resourceRequirements.storageRequest` | The initial storage requested from the persistence provider. Resizable storage is not supported by all storage providers and this may be the final size of the allocation.|
| Units |These specs require a number and a unit of measurement, e.g. "64Mi".|

Consult the [official Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container) for more information on configuring these attributes.

## Other Custom Resources 

#### EntandoPlugin CR
An EntandoPlugin CR is a microservice that can be made available to one or more EntandoApp in the cluster. Follow the instructions for using the Entando Blueprint to [build your own EntandoPlugin](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md) for an example. The deployment resulting from an EntandoPlugin is a single-container pod with the plugin Docker image specified. 
 
#### EntandoAppPluginLink CR
 
The EntandoAppPluginLink custom resource is created when an AppBuilder user links an EntandoPlugin to the current EntandoApp or deploys an EntandoPlugin for use in the current EntandoApp. The Entando Operator processes the resulting EntandoAppPluginLink and creates a path for the plugin on the ingress that exposes the EntandoApp in question. This path is determined by the `spec.ingressPath` property in the EntandoPlugin CRD. If the plugin resides in a namespace other than that of the EntandoApp, the operator creates a K8s service in the EntandoApp namespace to delegate the service in the plugin's namespace.
 
#### Provided Capability CR
The ProvidedCapability custom resource is used to express a requirement for a specific capability (e.g. DBMS, SSO) at a specific level or scope such as namespace, cluster, or labeled. This custom resource is used primarily to allow decoupling of the different controllers that the Entando Operator is made of.

#### Learn More 
* Learn more about [Configuring the Operator](../../tutorials/devops/entando-operator.md). 
* Detailed instructions on how to install Entando are available in our
[Getting Started tutorial](../getting-started). 

