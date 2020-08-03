# ECR: How Microservices get Connected to Entando Apps

In this document we will describe some of the assumptions and details related to the process of connecting a microservice part of a bundle to an Entando App.

## How a Microservice from a Bundle gets Deployed with the ECR?

When a bundle containing a microservice is installed using the ECR, behind the scenes some actions take place.

1. To begin, a check for a microservice with the same name is performed to verify if a new deployment is required for the microservice.
2. If a microservice with the same name is not available in the namespace where the Entando App has been deployed, a new EntandoPlugin custom resource is created and deployed in the namespace using the details defined in the bundle.
3. At the same time, an EntandoAppPluginLink custom resource is deployed in the namespace in order to expose the microservice ingress path on the EntandoApp ingress.
4. If both the EntandoPlugin custom resource and the EntandoAppPluginLink are deployed correctly, the APIs of the microservice will be available from the same domain of the EntandoApp, making it possible reach those APIs from the EntandoApp using relative urls

This is the standard flow when no other micorservice with a given name is already available in the EntandoApp namespace.

If there is already microservice with the same name of the one described in the bundle, the ECR will connect directly the EntandoApp to
the existing microservice by generating and deploying the required EntandoAppPluginLink as in the step 3 above.
This way, plugins can be reused by many applications at the same time.

## Some Pitfalls and How to Avoid Them

### Microservice Name Clashing

From the description above we see that the linking process between a microservice and an EntandoApp is based on the microservice name. This is built on the assumption that Kubernetes resources of a certain type are uniquely identified by their name in a namespace and therefore you can't have more than one resource with the same type and name in a given namespace.

This means that once a name is taken, no other microservice with the same name can be deployed in the same namespace. Moreover, if bundle contains a microservice with a name that's already taken in the EntandoApp namespace, the link will be made with that microservice rather than the one in the bundle.

To avoid this issue, you should try to provide a name for your microservice that's as unique as possible. For example you can include in the name your organization, or the version of the microservice. Or you can hash function that generates a name based on some plugin informations.

Check the [Kubernetes naming conventions](#k8s-name-conv) section for some rules on how to compose your microservice name. Here are some example of valid names:

- `organization.microservice-name.version`: entando.custom-microservice.v1
- `organization-microservice-name-major.minor`: my-org-special-microservice-v-2.0
- `SHA256(organization/name:version)`: 79982d02a615ac8c68c989e59069cff7ec52eb6e41418b71ad199a3857104bfc (SHA256 of my-organzation/my-app:v2.0)

### Linking to the Wrong microservice version

Another potential issue could occur when updating a bundle from version to another. When two versions of the same bundle contain a microservice with different docker images (e.g different versions) but identical name, a similar situation as the one above happens and a potentially wrong link could be created.

Again, to avoid the issue of linking with the wrong microservice the user can provide a unique name for each of the microservice version.
Here are some examples that take into consideration the versions in defining a unique name

Check the [Kubernetes naming conventions](#k8s-name-conv) section for  rules on how to compose your microservice name. Here are some example of valid names:

- `organization.microservice-name.version`: entando.custom-microservice.v1
- `organization-microservice-name-major.minor`: my-org-special-microservice-v-2.0
- `SHA256(organization/name:version)`: 79982d02a615ac8c68c989e59069cff7ec52eb6e41418b71ad199a3857104bfc (SHA256 of my-organzation/my-app:v2.0)

### Microservice Ingress Path Clashing

In Entando 6.2 when a bundle is uninstalled and the microservice is unlinked from the EntandoApp, from the EntandoApp ingress the path to the plugin is not removed. This could be an issue when trying to link an EntandoApp with different versions of the same microservices.

The EntandoApp ingress is updated with the microservice path only if the path is not already present in the ingress. Therefore,
different microservices with identical ingress path, as well as different versions of the same microservice with identical ingress path, could lead to incorrect behaviors.

To avoid this issue, the user can provide for the microservice a unique ingress-path that would hardly clash with other ingress-paths.

## Other Options

The naming convention recommendations above are accurate for creating bundles and for self contained applications where the Entando operator is managing the lifecycle of your microservices. If you have a substantial API infrastructure or you intend to deploy a large number of versioned microservices you can also utilize Entando with API management infrastructure like API gateways. If you are using an API gateway or other API abstraction layer you will need to manually manage the ingress for your micro frontends in your application to point to the API gateway deployment.

In cases where conflicts occur bundles can easily be renamed by updating metdata.

## Kubernetes name conventions <a id="k8s-name-conv"></a>

Here some rules about naming conventions extracted from the [Kubernetes documentation on object names and ids](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/)

> Most resource types require a name that can be used as a DNS subdomain name as defined in RFC 1123. This means the name must:
> - contain no more than 253 characters
> - contain only lowercase alphanumeric characters, '-' or '.'
> - start with an alphanumeric character
> - end with an alphanumeric character
