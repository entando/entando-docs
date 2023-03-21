---
sidebarDepth: 2
---

# EntandoApp Custom Resource 
The EntandoApp CR is the deployment of a Docker image that hosts the Entando and Java-based web application. Server-side components include the Entando App Engine, Entando Component Manager, Entando App Builder, and the user-facing application.
 
Entando offers standard WildFly, EAP, or Tomcat images for the definition, but typically customers provide their own CRD.

## Example EntandoApp
 
```yaml
apiVersion: entando.org/v1
kind: EntandoApp
metadata:
  namespace: entando
  name: your-app    
spec:
  environmentVariables: []
  dbms: embedded
  ingressHostName: your-app.192.168.64.5.nip.io
  standardServerImage: eap
  replicas: 1
 ```
## Specifications 
| Spec Name | Description |
| :- | :- |
| `spec.customServerImage`|  Used to deploy the Docker image containing your custom Entando App. Follow these instructions on how to [build your own image](../../tutorials/devops/build-core-image.md). This property and the `spec.standardServerImage` are mutually exclusive.|
|`spec.dbms` | Allowed values are: MySQL, PostgreSQL (default), Oracle, or embedded. Oracle is only supported as an external database.|
|`spec.ecrGitSshSecretName`| The configuration used by the Entando Component Manager to download bundles from authenticated Git repositories. It's a Secret containing a private key file named `rsa_id` that matches a public key configured in the authenticated Git repository.|
|`spec.environmentVariables`| A map of environment variables to pass to the EntandoApp Docker image. This can be used to provide connection details of custom datasources or message queues as discussed in the [custom datasources tutorial](../../tutorials/devops/change-default-datasource.md). These variables can sometimes be used as a mechanism to override any of the default environment variables that need customization.|
|  `ENTANDO_ECR_DEAPP_REQUEST_RETRIES`|  The number of times the Componenent Manager retries the component create/update process before quitting. Defaults to 3. |
| `ENTANDO_ECR_DEAPP_REQUEST_BACKOFF` | The number of seconds to wait before the next 'create' attempt is executed. Defaults to 5. |
| `ENTANDO_ECR_POSTINIT` | The configuration of the postinit process. |
| `ENTANDO_CONTAINER_REGISTRY_CREDENTIALS` | The configuration for authenticated [OCI registries](../../tutorials/curate/bundle-private-images.md). |
|`spec.ingressPath`| Specifies the ingress path of the EntandoApp to be deployed. |
|`spec.ingressHostName`| The hostname of the Kubernetes ingress to be created for the EntandoApp. EntandoPlugins linked to this app will also be made available on the host.|
|`spec.replicas`| The number of replicas to be made available on the deployment.|
|`spec.resourceRequirements`| The minimum and maximum [resource allocation](../reference/custom-resources.md#general-resourcerequirements-specifications) for the Entando App Engine container.|
|`spec.serviceAccountToUse`| The Kubernetes service account in the namespace of the EntandoApp used for the pods hosting the EntandoApps. The default is 'default'.|
|`spec.standardServerImage`| Either a `wildfly`,`eap` or `tomcat` image. This property and the `spec.customServerImage` are mutually exclusive. Refer to the [Docker image section](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#how-it-resolves-docker-images) to determine how the Docker registry and versions are calculated.|
|`spec.storageClass` | Name of the StorageClass to use for PersistentVolumeClaims created for this EntandoApp. For more information, go to [Kubernetes explanation of storage classes](https://kubernetes.io/docs/concepts/storage/storage-classes/).|
|`spec.tlsSecretName` | The name of a standard Kubernetes [TLS Secret](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) that will be used for the resulting ingress. This is only required if the [globally configured TLS Secret](https://github.com/entando-k8s/entando-k8s-controller-coordinator/blob/master/charts/entando-k8s-controller-coordinator/README.md#tls) for the operator is absent. |