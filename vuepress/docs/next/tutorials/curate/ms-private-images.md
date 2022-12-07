---
sidebarDepth: 2
---

# Install Microservices from a Private Image Registry

## Overview
The standard deployment of Entando assumes that microservice images are pulled from public repositories. Private repositores require user authentication to pull an image. The following tutorial describes how to add Secrets to your Kubernetes environment to successfully pull images from private repositories.

## Prerequisites
* A running Entando Application
* A bundle containing a microservice plugin based on an image from a private repository. You can set this up by [creating a microservice bundle](../create/ms/generate-microservices-and-micro-frontends.md) and making the corresponding Docker Hub repository private.

## Tutorial
The first step demonstrates how to create a Secret for Docker Hub. See the [corresponding Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) for other options.

>Note: Use the [ent CLI](../../docs/getting-started/entando-cli.md) to send commands to Kubernetes from the host machine.

**1. Create the secret** 
Supply the following parameters:
* The name of the new Secret, e.g. `my-docker-secret`
* The URL to your registry server. For Docker Hub, this is currently `https://registry.hub.docker.com/`.
* Your Docker Hub username, password, and email
* The Entando namespace, e.g. `entando` for a quickstart environment

``` sh
kubectl create secret docker-registry YOUR-SECRET-NAME --docker-server=YOUR-REGISTRY-SERVER --docker-username=YOUR-USERNAME --docker-password=YOUR-PASSWORD --docker-email=YOUR-EMAIL -n entando
```

**2a. Deploy a new Entando Application**

If you're setting up a new Entando Application, you can [add the Secret to the Entando Operator ConfigMap](../devops/entando-operator.md) under the property `entando.k8s.operator.image.pull.secrets`. This is just a list containing the names of Docker Secrets in the operator's namespace.

``` yaml
data: 
  entando.k8s.operator.image.pull.secrets: [YOUR-SECRET-NAME]
```

**2b. Update an existing Entando Application**

If you're updating an existing Entando Application, you can add the new Secret to the `entando-plugin` serviceaccount.

``` sh
kubectl edit serviceaccount entando-plugin -n entando
```

Add the Secret to the serviceaccount. You can either add a new section if it's the first Secret or add another Secret to the list.
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

 You can now install Entando Bundles from the `Entando App Builder` → `Hub`. The microservice plugin should be able to successfully pull the image.

## Troubleshooting
You may see an `ErrImagePull` status in `kubectl get pods` if a plugin is based on an image from a private repository and there are issues with the image URL or credentials, including a missing or incorrect Secret.
