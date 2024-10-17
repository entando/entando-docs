---
sidebarDepth: 2
---
# How Microservices Connect to Entando Apps

In this document, the assumptions and details related to the process of connecting a microservice to an Entando App is examined.

In order to fully understand the process, please familiarize yourself with these support documents:

1. [Entando custom resources](../reference/custom-resources.md)
2. [Entando ingresses](../getting-started/concepts-overview.md#entando-ingresses)

## How a Microservice from a Bundle Gets Deployed

When a bundle containing a microservice is installed in the Local Hub, some behind the scenes actions take place.

1. To begin, [EntandoPlugin custom resources](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/entandoplugins.entando.org.crd.yaml) are generated starting with the PluginDescriptor. Some fields will be automatically generated from the provided image.    
     * From the `image` field in the PluginDescriptor, the `organization`, `name` and `version` of the image will be extracted.  
     * `organization`, `name` and `version` are then converted to valid characters and composed to form the plugin name (`metadata.name`), the labels (`metadata.labels`) and the ingressPath (`spec.ingressPath`) of the custom resource.

     **NOTE**: Two PluginDescriptors having images with the same organization, name and version will generate a custom resource with the same `metadata.name` and `spec.ingressPath`.

2. Next, a check for a microservice with the same name is performed to verify if a new deployment is required.
3. If a microservice with the same name does not exist in the namespace where the EntandoApp has been deployed, a new EntandoPlugin custom resource is created and deployed in that namespace, using the details defined in the bundle.
4. At the same time, an EntandoAppPluginLink custom resource is deployed in the namespace in order to expose the microservice ingress path on the EntandoApp ingress.
5. If both the EntandoPlugin and the EntandoAppPluginLink custom resources are deployed correctly, the APIs of the microservice will be available from the same domain of the EntandoApp, making it possible to reach those APIs from the EntandoApp using relative urls.

This is the standard flow when no other micorservice with the same name is already present in the EntandoApp namespace.

If there is an existing microservice with the same name as the one generated from the PluginDescriptor, the Local Hub will connect the EntandoApp to
the existing microservice by generating and deploying the required EntandoAppPluginLink per step three above.
This way, plugins can be reused by many applications at the same time.

## Other Options

The naming convention recommended above are accurate for creating bundles and for self contained applications where the Entando Operator is managing the lifecycle of your microservices. If you have a substantial API infrastructure or intend to deploy a large number of versioned microservices, you can also utilize an API management infrastructure like API gateways. If you use an API gateway or other API abstraction layer, you will need to manually manage the ingress for the micro frontends in your application to point to the API gateway deployment.

In cases where conflicts occur, bundles can easily be renamed by updating metdata.

## Kubernetes Naming Conventions

Here are a few recommendations about naming conventions extracted from the [Kubernetes documentation on object names and ids](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/).

Most resource types require a name that can be used as a DNS subdomain name as defined in RFC 1123. This means the name must:
 - contain no more than 253 characters
 - contain only lowercase alphanumeric characters, '-' or '.'
 - start with an alphanumeric character
 - end with an alphanumeric character
