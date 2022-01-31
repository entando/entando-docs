# Install Bundle Plugins from a Private Image Repository

## Overview
The standard deployment of the Entando Component Repository assumes that plugin images are pulled from public repositories. Public repositores do not require user authentication in order to pull an image. The following tutorial will show you how to add secrets to your Kubernetes environment so you can successfully pull images from private repositories.

## Prerequisites
* A running Entando application
* A bundle containing a microservice plugin based on an image from a private repository. You can set this up by [creating a microservice bundle](../create/ms/generate-microservices-and-micro-frontends.md) and making the corresponding Docker Hub repository private.

## Tutorial
The first step demontrates how to create a secret for Docker Hub but please see the [corresponding Kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry) for other options. Once you have the created the secret you can either apply it to a deployed Entando application or add it to the Helm template for a new deployment.

**1. Create the secret**
Supply the following parameters:
* the name of the new secret, e.g. `my-docker-secret`.
* the URL to your registry server. For Docker Hub this is currently <https://index.docker.io/v1/>
* your Docker Hub username, password, and email.
* the Entando namespace, e.g. `entando` for a quickstart environment.

``` sh
kubectl create secret docker-registry <your-secret-name> --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email> -n entando
```

**2a. Update a deployed Entando application**

If you're updating a deployed Entando application(for example a quickstart environment), you can add the new secret to the `entando-plugin` account. You'll need to supply your own namespace.

``` sh
kubectl edit serviceaccount entando-plugin -n entando
```

Add the secret to the serviceaccount. You can either add a new section if it's the first secret or add another secret to the list.
``` yaml
apiVersion: v1
imagePullSecrets:
  - name: your-secret-name
kind: ServiceAccount
metadata:
  name: entando-plugin
```

If you describe the serviceaccount, it should list the secret.
```sh
kubectl describe serviceaccount entando-plugin -n entando
```
_Output:_
```yaml
Name:                entando-plugin
Namespace:           entando
Image pull secrets:  your-secret-name
```
If `(not found)` is listed next to the secret name, then you may have added the secret to the wrong namespace.

**2b. Deploy a new Entando application**

If you're setting up a new Entando deployment by using an Entando Helm template (e.g. from the entando-helm-quickstart project), you can add the secret to the `values.yaml` file under the property `operator.imagePullSecrets`. This is just a list containing the names of Docker secrets in the operator's namespace.

``` yaml
<snip>
operator.imagePullSecrets: [your-secret-name]
<snip>
```

You can now generate the deployment yaml and deploy it to Kubernetes as usual.

**3. Install the Entando Bundle**

 You can now install the Entando Bundle from the `Entando App Builder` → `Entando Component Repository`. The microservice plugin should now be able to successfully pull the image.

## Troubleshooting
This is the kind of error you'll see from `kubectl get pods` if a plugin is based on an image from a private repository and if there are any issues with the image URL or credentials, including a missing or incorrect secret.
```sh
NAME                                                            READY   STATUS         
MYUSERNAME-MYPLUGIN-0-0-2-server-deployment-657688c5x8tfb       1/2     ErrImagePull
```
