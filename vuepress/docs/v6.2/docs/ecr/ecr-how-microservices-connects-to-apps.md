# ECR: How Microservices get Connected to Entando Apps

In this document we will describe some of the assumptions and details related to the process of connecting a microservice part of a bundle to an Entando App.

In order to fully understand the concepts explained in this piece of the documentation, please make sure you have familiarity with these concepts:

1. [Entando custom resources](../../docs/concepts/custom-resources.md)
2. [Entando ingresses](../../docs/concepts/Readme.md#entando-ingresses)

## How a Microservice from a Bundle gets Deployed with the ECR?

When a bundle containing a microservice is installed using the ECR, behind the scenes some actions take place.

1. To begin, an [EntandoPlugin custom resource](https://github.com/entando-k8s/entando-k8s-custom-model/blob/master/src/main/resources/crd/EntandoPluginCRD.yaml) is generated starting from the PluginDescriptor. Some fields will be automatically generated from the provided image.
- From the `image` field in the PluginDescriptor, we will extract the `organization`, `name` and `version` of the image.
- `organization`, `name` and `version` are then converted to valid characters and composed to form the plugin name (`metadata.name`), the labels (`metadata.labels`) and the ingressPath (`spec.ingressPath`) of the custom resource.

**NOTE**: Two PluginDescriptors having images with the same organization, name and version will generate a custom resource with the same `metadata.name` and `spec.ingressPath`.

2. Next, a check for a microservice with the same name is performed to verify if a new deployment is required for the microservice.
3. If a microservice with the same name is not available in the namespace where the Entando App has been deployed, a new EntandoPlugin custom resource is created and deployed in the namespace using the details defined in the bundle.
4. At the same time, an EntandoAppPluginLink custom resource is deployed in the namespace in order to expose the microservice ingress path on the EntandoApp ingress.
5. If both the EntandoPlugin custom resource and the EntandoAppPluginLink are deployed correctly, the APIs of the microservice will be available from the same domain of the EntandoApp, making it possible reach those APIs from the EntandoApp using relative urls.

This is the standard flow when no other micorservice with a given name is already available in the EntandoApp namespace.

If there is an existing microservice with the same name as the one generated from the PluginDescriptor, the ECR will connect the EntandoApp to
the existing microservice by generating and deploying the required EntandoAppPluginLink per step 3 above.
This way, plugins can be reused by many applications at the same time.

## Other Options

The naming convention recommendations above are accurate for creating bundles and for self contained applications where the Entando operator is managing the lifecycle of your microservices. If you have a substantial API infrastructure or you intend to deploy a large number of versioned microservices you can also utilize Entando with API management infrastructure like API gateways. If you are using an API gateway or other API abstraction layer you will need to manually manage the ingress for your micro frontends in your application to point to the API gateway deployment.

In cases where conflicts occur bundles can easily be renamed by updating metdata.

## Kubernetes naming conventions

Here some rules about naming conventions extracted from the [Kubernetes documentation on object names and ids](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/)

> Most resource types require a name that can be used as a DNS subdomain name as defined in RFC 1123. This means the name must:
> - contain no more than 253 characters
> - contain only lowercase alphanumeric characters, '-' or '.'
> - start with an alphanumeric character
> - end with an alphanumeric character
