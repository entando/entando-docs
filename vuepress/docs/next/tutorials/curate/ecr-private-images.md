---
sidebarDepth: 2
---

# Install Bundle Plugins from a Private Image Repository

## Overview
The standard deployment of the Entando Component Repository assumes that plugin images are pulled from public repositories. Public repositores do not require user authentication in order to pull an image. The following tutorial will show you how to add secrets to your Kubernetes environment so you can successfully pull images from private repositories.

## Prerequisites
* A running Entando application
* A bundle containing a microservice plugin based on an image from a private repository. You can set this up by [creating a microservice bundle](../create/ms/generate-microservices-and-micro-frontends.md) and making the corresponding Docker Hub repository private.

## Tutorial
The first step demonstrates how to create a Secret for Docker Hub but please see the [corresponding Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) for other options.

**1. Create the secret**
Supply the following parameters:
* the name of the new Secret, e.g. `my-docker-secret`.
* the URL to your registry server. For Docker Hub this is currently <https://hub.docker.com/_/registry>
* your Docker Hub username, password, and email.
* the Entando namespace, e.g. `entando` for a quickstart environment.

``` sh
kubectl create secret docker-registry YOUR-SECRET-NAME --docker-server=YOUR-REGISTRY-SERVER --docker-username=YOUR-USERNAME --docker-password=YOUR-PASSWORD --docker-email=YOUR-EMAIL -n entando
```

**2b. Deploy a new Entando Application**

If you're setting up a new Entando Application, you can [add the secret to the Entando Operator ConfigMap](../devops/entando-operator.md) under the property `entando.k8s.operator.image.pull.secrets`. This is just a list containing the names of Docker Secrets in the operator's namespace.

``` yaml
data: 
  entando.k8s.operator.image.pull.secrets: [YOUR-SECRET-NAME]
```

**2b. Update an existing Entando Application**

If you're updating an existing Entando Application, you can add the new Secret to the `entando-plugin` serviceaccount.

``` sh
kubectl edit serviceaccount entando-plugin -n entando
```

Add the secret to the serviceaccount. You can either add a new section if it's the first Secret or add another Secret to the list.
``` yaml
apiVersion: v1
imagePullSecrets:
  - name: YOUR-SECRET-NAME
kind: ServiceAccount
metadata:
  name: entando-plugin
```

If you describe the serviceaccount, it should list the Secret.
```sh
kubectl describe serviceaccount entando-plugin -n entando
```
_Output:_
```yaml
Name:                entando-plugin
Namespace:           entando
Image pull secrets:  YOUR-SECRET-NAME
```
If `(not found)` is listed next to the Secret name, then you may have added the Secret to the wrong namespace.


**3. Install the Entando Bundle**

 You can now install Entando Bundles from the `Entando App Builder` → `Entando Component Repository`. The microservice plugin should now be able to successfully pull the image.

## Troubleshooting
You may see an `ErrImagePull` status in `kubectl get pods` if a plugin is based on an image from a private repository and if there are any issues with the image URL or credentials, including a missing or incorrect Secret.