---
author: Nathan Shaw
date: 2023-08-09
title: "Installing Entando for local development using Docker Desktop"
summary: Setting up a local development environment and optimizing it for daily use is a critical task. Although most development tasks for Entando-compatible components do not require a local Entando instance, there are times when you want to test a new bundle and do not have a full remote cluster available. This blog post explores setting up a small cluster in Docker Desktop for this purpose. 
tags:
- Local Development
- Docker Desktop
- Install
- Entando 7.2
cover: /images/covers/2023-08-09-docker.png
---
Setting up a local development environment and optimizing it for daily use is a critical task. Although most development tasks for Entando-compatible components do not require a local Entando instance, there are times when you want to test a new bundle and do not have a full remote cluster available. This blog post explores setting up a small cluster in [Docker Desktop](https://www.docker.com/products/docker-desktop/) for this purpose.

There are numerous options available when setting up a local development environment using Kubernetes. Entando's [Getting Started Guide](../v7.2/docs/getting-started/README.md) makes use of [Multipass](https://multipass.run/) for this purpose but this approach isn't always possible, for instance, in some enterprise environments where Docker Desktop is allowed but direct use of Windows Subsystem for Linux is not. In this situation, enabling Kubernetes in Docker Desktop can be the simplest path forward.

>*Note:* The following steps were tested on Windows 11 with Docker Desktop (current at the time), including K8s 1.24.

# Enable Kubernetes in Docker Desktop
1. Start by enabling [Kubernetes in Docker Desktop](https://docs.docker.com/desktop/kubernetes/). In most cases this just involves enabling the option in the Docker Desktop UI and restarting Docker Desktop but there are some edge cases noted in the documentation.

>*Optional:* For local development, connecting the Entando CLI to your local cluster can be very useful. That can be done by [creating or selecting your ent profile](../v7.2/docs/getting-started/entando-cli.md) and then connecting your profile to the Kubernetes context using `ent profile link docker-desktop`. The following commands will reference `kubectl`, but as always this can be replaced by `ent kubectl` or the shorter `ent k`.

2. Check that Kubernetes is up and running:
``` bash
kubectl get node
```

>*Tip:* You can use [the standard Docker tutorial](https://www.docker.com/blog/how-kubernetes-works-under-the-hood-with-docker-desktop/) to setup a quick `LoadBalancer` and sample `Deployment`. Installing those resources in a dedicated namespace can make removing the resources later a simpler task.

# Install the NGINX Ingress Controller
Entando uses a small set of paths for the different services in an Entando Application so we'll need to install an ingress controller. We'll use the NGINX version since it is used in most of the [Entando install guides](../v7.2/tutorials/README.md)

1. Enable the NGINX ingress controller [following the steps here](https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop):
``` bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

2. Access an arbitrary URL against localhost and you should now see an NGINX 404 error, for example, `http://localhost/some-path`.

# Install Entando
Many of the following steps are identical to those in the [Getting Started guide](../v7.2/docs/getting-started/README.md) so see that page for explanatory details. 
> *Note:* Make sure to check for the correct Entando patch version for the install steps since this blog post specifically documents the steps for Entando 7.2.2.

1. Create the namespace:
``` bash
kubectl create namespace entando
```

2. Download the operator config map template:
``` bash
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.2.2/dist/ge-1-1-6/samples/entando-operator-config.yaml"
```

3. Edit the file to select the NGINX ingress controller:
``` yaml
data: 
  entando.ingress.class: "nginx"
```

4. Create the operator `ConfigMap`:
``` bash
kubectl apply -f entando-operator-config.yaml -n entando
```

5. Add the cluster resources:
``` bash
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.2.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

6. Add the namespace resources:
``` bash
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v7.2.2/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml
```

7. Determine your IP address (YOUR-IP in step 9 below) using `hostname -I | awk '{print $1}'` or by visiting `https://whatismyip.com`.

8. Download the Entando Application template
``` bash
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.2.2/dist/ge-1-1-6/samples/entando-app.yaml"
```

9. Edit the template and set the ingressHostName to `entando.YOUR-IP.nip.io` or another address that will route to your local machine.
> *Note:* Some connections from one pod to another will use a public address, rather than a cluster-level address. If the Component Manager and `entando-de-app` deployments fail to start correctly, this is the most likely cause. See the [tips and tricks page](../v7.2/docs/reference/local-tips-and-tricks.md) for troubleshooting tips. In my testing I realized my router had recently upgraded, blocking all port forwarding, so I had to re-enable that setting.

10. Create the Entando Application resource which will start the installation process:
``` bash
kubectl apply -f entando-app.yaml -n entando
```

11. After 10 minutes or so, confirm your application is working. See the [Getting Started guide](../v7.2/docs/getting-started/README.md#next-steps) for additional next steps.

# Observations
I can see a few pros and cons for this configuration:

*Pros*
* Docker Desktop has broad adoption so making use of its built-in support for Kubernetes can be very straightforward.
* Networking is a typical challenge for local Kubernetes environments but I didn't observe anything more difficult with this setup.
* You can easily turn off Kubernetes (and come back to it later) by disabling the option in Docker Desktop.

*Cons*
* I didn't do a thorough comparison, but anecdotally Docker Desktop with Kubernetes consumes more resources, CPU and memory, than Entando's Multipass-based approach due to the overhead of Docker Desktop itself.
* At least on Windows, the Multipass setup works seamlessly with Windows networking by automatically provisioning an `entando.mshome.net` address and mapping it to the Multipass VM. That can be a better experience, and often simpler from a network standpoint, then using an `.nip.io` address.
* Since Multipass directly uses a single container, it's easier to take and restore snapshots of test instances there.

# Next Steps
It would be interesting to do a similar investigation using [Minikube](https://minikube.sigs.k8s.io/docs/), [kind](https://kind.sigs.k8s.io/), or [k3d](https://k3d.io/). There are numerous write ups in the broader community (e.g., [https://linuxconcept.com/comparing-minikube-kind-and-k3d] ) comparing resource usage, production-like qualities, and developer friendliness, but a review from an Entando perspective has not been done in a while. [Community](../v7.2/docs/community/contributing.md) contributions would be welcome here!
