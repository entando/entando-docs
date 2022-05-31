---
sidebarDepth: 2
---

# Getting Started with Entando



::: warning
**Mac:** Entando 7 is not currently compatible with the Apple M1 ARM64 architecture found in some newer Macs.
:::

You can set up Entando in two simple steps or install it manually to meet your specific needs. 

* [Automatic Install](#automatic-install): The fastest way to locally install and start up Entando in Kubernetes.
* [Manual Install](#manual-install): Useful if you want a shared cluster or a custom local instance.

## Automatic Install
Automatically install Entando via the Entando command-line interface (CLI) and prepare a local developer environment with default settings.
The following steps launch an Ubuntu VM via Multipass, install Kubernetes, then deploy Entando to it.

1. Install [Multipass](https://multipass.run/#install)
``` http request
https://multipass.run/#install
```
2. Install Entando into Kubernetes on Ubuntu using the [Entando CLI](../reference/entando-cli.md)

```sh
curl -sfL https://get.entando.org | bash
```

3. The progress of the install is displayed on the console. Installation can take up to 10 minutes, depending on how long the Docker images take to download. The sequence of steps performed by the CLI is identical to the manual steps below. To understand what the CLI does, review the manual steps.
4. The URL to access the Entando App Builder will print to the console once the install completes.
5. Login with username:`admin` and password: `adminadmin`. Refer to [Login to Entando](#login-to-entando) for more information and next steps.

## Manual Install

Manual installation allows you to configure a shared cluster or customize a local developer environment. The following learn-as-you-go approach provides a working knowledge of Kubernetes as you install Entando in a local environment. After downloading the necessary files, your instance of Kubernetes will be up and running in <60 seconds.

This is a three stage process:

1. [Install Kubernetes](#install-kubernetes)
2. [Prepare the Kubernetes Environment](#prepare-kubernetes)
3. [Deploy Entando](#deploy-entando)

::: tip What's Needed to Run Kubernetes?
Kubernetes is a container orchestrator designed to manage a server cluster. It requires at least one master node running a Linux OS. A lightweight Ubuntu virtual machine (VM) can be created in seconds with Multipass. Choosing a Type 1 hypervisor eliminates a guest OS, maximizing speed and performance.
:::

### Install Kubernetes

#### Enable Hypervisor
::: tip Why a Hypervisor?
Hypervisors allow you to create and run VMs. Virtualization software that run on top of your operating system as "guests" are Type 2 hypervisors, e.g. VirtualBox or VMWare Workstation. Type 1 hypervisors run directly on your host machine.
:::

Install a Type 1 hypervisor for optimal performance.

**Mac:** Install `hyperkit`

``` bash
brew install hyperkit
```

**Windows:** [Install Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v?redirectedfrom=MSDN)

---

<details><summary>What if my machine doesn't support hyperkit or Hyper-V?</summary>

Install a Type 2 hypervisor that runs on top of your operating system.

- Install Virtual Box:
[Mac](https://multipass.run/docs/installing-on-macos)
[Windows](https://multipass.run/docs/installing-on-windows)

</details>

---

<br>

#### Launch an Ubuntu VM

::: tip Why Multipass?
Multipass is a cross-platform tool developed by the publishers of Ubuntu to create lightweight Ubuntu VMs in seconds.
:::

1. Install [Multipass](https://multipass.run/#install)

2. Launch a VM

``` bash
multipass launch --name quickstart --cpus 4 --mem 8G --disk 20G
```

3. Open a VM shell

``` bash
multipass shell quickstart
```

### Run Kubernetes

::: tip Why K3s?
K3s is a certified Kubernetes distribution designed for production workloads in resource-constrained environments.

It's packaged as a single <50MB binary that minimizes the dependencies and procedure required to install, run and auto-update a production Kubernetes cluster.
:::

1. Install the version of `K3s` supported by Entando 7.0. Note that this is not the latest version of K3s.

``` bash
curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL="v1.21.10+k3s1" sh -
```

2. Check that the cluster `STATUS` is `Ready`.

``` bash
sudo kubectl get node
```

---

<details><summary>What's running out of the box?</summary>

``` bash
sudo kubectl get pods -A
```

</details>

---

::: tip Congratulations!
You now have a local instance of Kubernetes up and running.
:::

Now that Kubernetes is running, you can use kubectl to send commands directly to K3s from the host machine, rather than from within the VM. To set this up with the [ent CLI](../reference/entando-cli.md), run `ent attach-vm quickstart` and then use `ent kubectl` for any calls to K8s. Alternatively, see the K3s documentation to [access your cluster with kubectl](https://rancher.com/docs/k3s/latest/en/cluster-access/).

### Prepare Kubernetes

To install Entando, we'll add `Custom Resources`, create a `Namespace` and configure external access to our cluster.

#### Create a Namespace

::: tip What are Namespaces?
Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called [namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/). You can use namespaces to allocate resources and set CPU/memory limits for individual projects or teams.
:::

``` bash
sudo kubectl create namespace entando
```

#### Add Custom Resources

::: tip Why Custom Resources?
Standard resources in Kubernetes include `Pods`, which are groups of one or more containers, `Services` to call or access Pods, and `Ingresses` to enable external access to Services.

[Custom resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) let you store and retrieve structured data. Combining a custom resource with a custom controller allows you to define a desired state to automate how your applications or services run in a Kubernetes cluster.
:::

Examples of custom resources in Entando are the [Entando App Engine](../../docs/getting-started/concepts-overview.md#entando-app-engine) and the [Entando Identity Management System](../../docs/getting-started/concepts-overview.md#entando-identity-management).

From your Ubuntu shell

1. Install the cluster-scoped custom resource definitions (CRDs)

``` shell
sudo kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

2. Install the namespace-scoped custom resources

``` shell
sudo kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml
```
#### Configure Access to Your Cluster

::: tip What about Networking?
Entando sets up [`Ingresses`](https://kubernetes.io/docs/concepts/services-networking/ingress/) in Kubernetes to expose HTTP routes from outside the cluster to services within the cluster. This is used to access Entando from a local browser.

If you run into network issues during startup, or if you are using Windows for your local development instance, you'll need to [troubleshoot your network](../reference/local-tips-and-tricks.md#network-issues). Indications of network issues can include Entando failing to completely start or a working Entando instance failing to restart later.
:::

To set up external access to your cluster, you need to specify the fully qualified domain of your Ubuntu VM, which we refer to via the placeholder YOUR-HOST-NAME. 

- On Windows with Hyper-V, YOUR-HOST-NAME is the name of your VM followed by `.mshome.net`, e.g. `quickstart.mshome.net`. 

- On Mac, Linux, or Windows without Hyper-V, you'll use a host name based on your VM's IP address. You can determine the IP address from within the VM with this command:
``` bash
hostname -I | awk '{print $1}'
```
- Your IP-based YOUR-HOST-NAME should follow this pattern: `quickstart.YOUR-IP.nip.io`, e.g. `quickstart.192.168.64.33.nip.io`. The suffix `.nip.io` makes use of the free [nip.io](https://nip.io/) DNS service so that any requests to this host name will resolve to your VM. The prefix `quickstart` is arbitrary so you can choose your own.

Now that you've determined YOUR-HOST-NAME, use it to configure the Entando Application.

1. Download the template `entando-app.yaml`.

```
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/samples/entando-app.yaml"
```

2. Modify `entando-app.yaml` to set the `ingressHostName` to YOUR-HOST-NAME. Examples:
- `ingressHostName`: quickstart.mshome.net
- `ingressHostName`: quickstart.192.168.63.33.nip.io

::: tip Embedded Databases
To speed up the _Getting Started_ environment, embedded databases are used by default.
See this [Tutorial on Default Databases](../../tutorials/devops/default-database.md) for information on how to change your database connection, or you can modify the `dbms` setting in the `entando-app.yaml`. 
:::

::: tip Entando Operator
An optional ConfigMap can be used to modify the behavior of the Entando Operator. For example, on a slower network, you may want to increase the download timeouts. Refer to the [Entando Operator](../../tutorials/devops/entando-operator.md) page for more information.
:::
### Deploy Entando


Deploy Entando by applying `entando-app.yaml` to your namespace.

```sh
sudo kubectl apply -f entando-app.yaml -n entando
```

---

Use the `get pods --watch` command to observe Entando starting up.

```sh
sudo kubectl get pods -n entando --watch
```

<details><summary>What does a successful startup look like?</summary>

- The `entando-operator` and `entando-k8s-service` start when you apply the namespace resources above, so they should already be in the `Running` status by the time you reach this point
- When you apply the `entando-app.yaml`, the `quickstart-deployer` starts and kicks off a series of deployments, beginning with the Keycloak deployment via the `default-sso-in-namespace-deployer`

**Jobs / Deployments**
- Some Pods, like `quickstart-deployer`, run to completion and then shutdown; they should eventually show `READY`: `0/1` and `STATUS`: `Completed`
- Other deployments, like `quickstart-ab-deployment` or `quickstart-deployment`, should eventually show `READY`: `1/1` and `STATUS`: `Running`
- The deployment is finished when the `quickstart-deployer` Pod shows a status of `Completed`  

**Lifecycle Events**
- Each line represents an event: `Pending`, `ContainerCreating`, `Running` or `Completed`
- Restarts should ideally be `0`; otherwise, there may be a resource problem (slow network, not enough CPU or memory, etc.) with your cluster, and Kubernetes is trying to self-heal

``` shell-session
NAME                                                  READY   STATUS              RESTARTS  AGE    
entando-operator-5b5465788b-s6wjh                    1/1     Running             0          99m
entando-k8s-service-86f8954d56-lp5nl                 1/1     Running             0          99m
quickstart-deployer-7217                             0/1     ContainerCreating   0          7s
quickstart-deployer-7217                             1/1     Running             0          14s
default-sso-in-namespace-deployer-2045               0/1     Pending             0          0s
default-sso-in-namespace-deployer-2045               0/1     Pending             0          0s
default-sso-in-namespace-deployer-2045               0/1     ContainerCreating   0          0s
default-sso-in-namespace-deployer-2045               1/1     Running             0          4s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  0/1     Pending             0          0s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  0/1     Pending             0          5s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  0/1     ContainerCreating   0          5s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  0/1     Running             0          88s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  0/1     Running             0          114s
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w  1/1     Running             0          115s
default-sso-in-namespace-deployer-2045               0/1     Completed           0          2m6s
default-sso-in-namespace-deployer-2045               0/1     Terminating         0          2m6s
default-sso-in-namespace-deployer-2045               0/1     Terminating         0          2m6s
quickstart-ab-deployment-5b5c7c4f5c-w774v            0/1     Pending             0          0s
quickstart-ab-deployment-5b5c7c4f5c-w774v            0/1     Pending             0          0s
quickstart-ab-deployment-5b5c7c4f5c-w774v            0/1     ContainerCreating   0          0s
quickstart-deployment-667859b44d-nnk79               0/1     Pending             0          0s
quickstart-cm-deployment-69bb5f9fd8-ll8dk            0/1     Pending             0          0s
quickstart-deployment-667859b44d-nnk79               0/1     Pending             0          2s
quickstart-deployment-667859b44d-nnk79               0/1     ContainerCreating   0          2s
quickstart-cm-deployment-69bb5f9fd8-ll8dk            0/1     Pending             0          2s
quickstart-cm-deployment-69bb5f9fd8-ll8dk            0/1     ContainerCreating   0          3s
quickstart-cm-deployment-69bb5f9fd8-ll8dk            0/1     Running             0          88s
quickstart-ab-deployment-5b5c7c4f5c-w774v            0/1     Running             0          102s
quickstart-ab-deployment-5b5c7c4f5c-w774v            0/1     Running             0          2m
quickstart-cm-deployment-69bb5f9fd8-ll8dk            0/1     Running             0          2m3s
quickstart-ab-deployment-5b5c7c4f5c-w774v            1/1     Running             0          2m10s
quickstart-cm-deployment-69bb5f9fd8-ll8dk            1/1     Running             0          2m12s
quickstart-deployment-667859b44d-nnk79               0/1     Running             0          3m29s
quickstart-deployment-667859b44d-nnk79               0/1     Running             0          4m50s
quickstart-deployment-667859b44d-nnk79               1/1     Running             0          4m52s
quickstart-deployer-7217                             0/1     Completed           0          7m17s
quickstart-deployer-7217                             0/1     Terminating         0          7m17s
quickstart-deployer-7217                             0/1     Terminating         0          7m17s
```

</details>

---

Press `Ctrl-C` to exit the `watch` command once everything is up and running.

---

<details><summary>What Pods come out of the box?</summary>

``` bash
sudo kubectl get pods -n entando
```

``` shell-session
NAME                                                  READY   STATUS    RESTARTS   AGE
entando-operator-5b5465788b-s6wjh                     1/1     Running   0          106m
entando-k8s-service-86f8954d56-lp5nl                  1/1     Running   0          106m
default-sso-in-namespace-deployment-7ddc5d44f-bsq7w   1/1     Running   0          7m4s
quickstart-ab-deployment-5b5c7c4f5c-w774v             1/1     Running   0          5m1s
quickstart-cm-deployment-69bb5f9fd8-ll8dk             1/1     Running   0          5m
quickstart-deployment-667859b44d-nnk79                1/1     Running   0          5m

```

</details>

---

The URL of your running Entando instance is http://YOUR-HOST-NAME/app-builder/.


- Example URL

``` bash
quickstart.192.168.64.33.nip.io/app-builder/
```

---

## Login to Entando

Now that you've installed Entando, login to the Entando App Builder.

![entando-login.png](./img/entando-login.png)

- Username: `admin`
- Password: `adminadmin`

After login, change your password to activate your account.

- Note: If the login process hangs for more than 5 seconds, refresh the browser.

![entando-app-builder.png](./img/entando-app-builder.png)

In the App Builder, applications are composed from various components, including micro frontends and CMS content.

::: tip Congratulations!
You now have Entando up and running on Kubernetes in your local environment.
:::

---
## Next Steps
Check out these resources to continue your journey with Entando!

* **Try a Tutorial:** Take advantage of the [Learning Paths](../../tutorials/), which organize a few of the most popular tutorials by user type.

* **Dig Deeper into Entando Concepts:** Review the [Docs](../) sections to more deeply understand the Entando building blocks.

* **Learn about the Quickstart Environment:** See the [Quickstart Tips](../reference/local-tips-and-tricks.md) for more information on how to manage your Getting Started or quickstart environment.  

---
