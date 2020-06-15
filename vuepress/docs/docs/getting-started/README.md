---
sidebarDepth: 2
---

# Get Started with Entando in 3 Easy Steps

New to Kubernetes, hypervisors, and Helm charts?

This in-depth guide takes a learn-as-you-go approach, and will give you a working knowledge of Kubernetes as you get Entando up and running in a local environment.

1. [Install Kubernetes](#install-kubernetes)
2. [Prepare Kubernetes Environment](#prepare-kubernetes-environment)
3. [Deploy Entando](#deploy-entando)

Note: For advanced or long-time Entando users, check out our [Quick Reference](quick-reference) install guide with just the steps.

### Minimum required resources

A basic Entando app requires at least 30m and 2000Mi to start.
Here you can find more information about [Kubernetes resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/).


## Install Kubernetes

Since Entando is designed to run on Kubernetes, let's get started by installing our own instance of Kubernetes locally.

We've tested a variety of Kubernetes implementations including Minikube, Minishift, CodeReady Containers, K3s, and Microk8s to find the best combination of low cpu/memory usage, fast startup times, and minimal configuration so we can get started quickly. After downloading the necessary files, we'll have our own instance of Kubernetes up and running in < 60 seconds.

::: tip What's Needed to Run Kubernetes
Kubernetes is a container orchestrator designed to manage a server cluster. It requires at least one master node running a Linux OS. We'll be using Multipass to create a lightweight Ubuntu VM in seconds that runs on a bare metal hypervisor for speed and performance.
:::

### Enable Hypervisor
::: tip
Hypervisors allow you to create and run virtual machines. Virtualization software that run on top of your operating system like VirtualBox or VMWare Workstation are Type 2 hypervisors. Type 1 hypervisors run on bare metal.
:::

Let's install a bare metal hypervisor for optimal performance.

**Mac:** Install `hyperkit`.

``` bash
brew install hyperkit
```

**Windows:** [Install Hyper-V](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v?redirectedfrom=MSDN)

---

<details><summary>What if my machine doesn't support hyperkit or Hyper-V?</summary>

Use a Type 2 hypervisor that runs on top of your operating system:

- Install Virtual Box:
[Mac](https://multipass.run/docs/installing-on-macos)
[Windows](https://multipass.run/docs/installing-on-windows)

</details>

---

<br>

### Launch Ubuntu VM

::: tip
Multipass is a tool developed by the publishers of Ubuntu to create lightweight Ubuntu VMs in seconds.
:::

1. Install [Multipass](https://multipass.run/#install)

2. Launch VM

``` bash
multipass launch --name ubuntu-lts --cpus 4 --mem 8G --disk 20G
```

3. Open a shell

``` bash
multipass shell ubuntu-lts
```

### Run Kubernetes

::: tip
K3s is a certified Kubernetes distribution designed for production workloads in resource-constrained environments.

It's packaged as a single <40MB binary that reduces the dependencies and steps needed to install, run and auto-update a production Kubernetes cluster.
:::

1. Install `k3s`

``` bash
sudo curl -sfL https://get.k3s.io | sh -
```

2. Check for `Ready` `STATUS`.

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

## Prepare Kubernetes Environment

To install Entando, we'll add `Custom Resources`, create a `Namespace`, download a `Helm` chart, and configure external access to our cluster.

### Add Custom Resources

::: tip
Standard resources in Kubernetes include things like `Pods`, which are a group of one or more containers, `Services`, the way to call or access your pods, and `Ingresses`, for managing external access to your cluster.

[Custom resources let you store and retrieve structured data.](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) Combining a custom resource with a custom controller allows you to define a desired state to automate the running of your applications or services in a Kubernetes cluster.
:::

Examples of custom resources in Entando are:

- `Entando App Engine`
- `Entando Identity Management System`

From your Ubuntu shell:

1. Download custom resource definitions.

``` bash
wget -c https://dev.entando.org/assets/yaml/custom-resources.tar.gz -O - | tar -xz
```

2. Create custom resources

``` bash
sudo kubectl create -f custom-resources
```

### Create Namespace

::: tip
[Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called namespaces.](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

You can use namespaces to allocate resources and set cpu/memory limits for individual projects or teams. They can also encapsulate projects from one another.
:::

``` bash
sudo kubectl create namespace entando
```

### Download Helm Chart

::: tip
Helm is a package manager for Kubernetes that helps you define, install, and upgrade Kubernetes applications.
:::

``` bash
wget https://dev.entando.org/assets/yaml/entando.yaml
```

### Configure Access to Your Cluster

::: tip
Entando sets up `Ingresses` in Kubernetes to access services from outside your server cluster. We'll use this to access Entando from a local browser.
:::

To set up external access to your cluster, you'll need to replace the value of `ENTANDO_DEFAULT_ROUTING_SUFFIX` with your Ubuntu IP. You can look up your Ubuntu IP, and edit the YAML file manaully, but running the below commands will automatically update the IP address for you.

``` bash
IP=$(hostname -I | awk '{print $1}')
```

``` bash
sed -i "s/192.168.64.25/$IP/" entando.yaml
```

### Define resource limits

As described in the [minimum required resources section](#minimum-required-resources), Entando needs a well-defined amount of resources in order to start and Kubernetes takes care of using only the needed amount of them.
However, you can choose to impose boundaries on the minimum and maximum used/allocated resources by updating the downloaded `entando.yaml` file and setting the `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS` property to true.
In this way, Entando will allocate a predefined amount of resources and Kubernetes will act more strictly checking for resource availability.

By not imposing limits you can minimize initial needed resources and startup time, leaving Kubernetes free to manage its resources as he wants.
By imposing limits you can obtain a better-balanced system.

It's important to note that, accordingly to the Kubernetes documentation, in order to deploy on a namespace with limited quota
*every Container must have a memory request, memory limit, cpu request, and cpu limit*
so, in that case, you will need to set `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS` to true, otherwise your deploy will fail.

Here you can see the detailed resource requests/limits per container:

| Component                               | Mem requests | CPU requests | Mem limits  | CPU limits |
|-----------------------------------------|--------------|--------------|-------------|------------|
| AppBuilderDeployableContainer           |        128Mi |         125m |       512Mi |       500m |
| EntandoAppDeployableContainer           |        448Mi |         375m |      1792Mi |      1500m |
| ComponentManagerDeployableContainer     |        192Mi |         188m |       768Mi |       750m |  
| EntandoPluginSidecarDeployableContainer |        192Mi |         188m |       768Mi |       750m |
| EntandoPluginDeployableContainer        |        256Mi |         250m |      1024Mi |      1000m |
| EntandoK8SServiceDeployableContainer    |        192Mi |         250m |       768Mi |      1000m |
| KeycloakDeployableContainer             |        192Mi |         250m |       768Mi |      1000m |

## Deploy Entando

Deploying the Helm chart will deploy all of the Kubernetes resources required for Entando to run.

``` bash
sudo kubectl create -f entando.yaml
```

``` bash
sudo kubectl get pods -n entando --watch
```

---

<details><summary>What does a successful startup look like?</summary>

- First, you'll see the Entando operator: `ContainerCreating` > `Running`
- Next, the Entando composite app deployer: `Pending` > `ContainerCreating` > `Running`
- Then, Keycloak: `kc-deployer` > `kc-db-deployment`

**Jobs / Deployments**
- Jobs, like `kc-db-preparation-job` run once, and are `Completed`: `0/1`
- Database deployments, like `kc-db-deployment`, should end up as `Running`: `1/1`
- The Keycloak server deployment `kc-server-deployment`, should end up as `Running`: `1/1`
- The `quickstart-server-deployment` should end up as `3/3`

**Lifecycle Events**
- Each line represents an event: `Pending`, `ContainerCreating`, `Running` or `Completed`
- Restarts should ideally be `0`; otherwise, there was a problem with your cluster, and Kubernetes is trying to self-heal

``` shell-session
ubuntu@test-vm:~$ sudo kubectl get pods -n entando --watch
NAME                                   READY   STATUS              RESTARTS   AGE
quickstart-operator-8556c9c6f8-9ghwg   0/1     ContainerCreating   0          3s
quickstart-operator-8556c9c6f8-9ghwg   0/1     Running             0          49s
quickstart-composite-app-deployer-picaju7bf0   0/1     Pending             0          0s
quickstart-composite-app-deployer-picaju7bf0   0/1     Pending             0          0s
quickstart-composite-app-deployer-picaju7bf0   0/1     ContainerCreating   0          0s
quickstart-composite-app-deployer-picaju7bf0   1/1     Running             0          20s
quickstart-kc-deployer-mx7ms3sc2l              0/1     Pending             0          0s
quickstart-kc-deployer-mx7ms3sc2l              0/1     Pending             0          0s
quickstart-kc-deployer-mx7ms3sc2l              0/1     ContainerCreating   0          0s
quickstart-operator-8556c9c6f8-9ghwg           1/1     Running             0          88s
quickstart-kc-deployer-mx7ms3sc2l              1/1     Running             0          19s
quickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Pending             0          0s
quickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Pending             0          7s
quickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     ContainerCreating   0          7s
quickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Running             0          77s
quickstart-kc-db-deployment-c57f75d7f-wxmqr    1/1     Running             0          87s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Pending             0          0s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Pending             0          0s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Init:0/1            0          0s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Init:0/1            0          13s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     PodInitializing     0          15s
quickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Completed           0          17s
quickstart-kc-server-deployment-66484d596d-qr78q   0/1     Pending             0          0s
quickstart-kc-server-deployment-66484d596d-qr78q   0/1     Pending             0          0s
quickstart-kc-server-deployment-66484d596d-qr78q   0/1     ContainerCreating   0          0s
quickstart-kc-server-deployment-66484d596d-qr78q   0/1     Running             0          3m
quickstart-kc-server-deployment-66484d596d-qr78q   1/1     Running             0          4m36s
quickstart-kc-deployer-mx7ms3sc2l                  0/1     Completed           0          6m50s
quickstart-eci-deployer-kx9nhop22g                 0/1     Pending             0          0s
quickstart-eci-deployer-kx9nhop22g                 0/1     Pending             0          0s
quickstart-eci-deployer-kx9nhop22g                 0/1     ContainerCreating   0          0s
quickstart-eci-deployer-kx9nhop22g                 1/1     Running             0          5s
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Pending             0          0s
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Pending             0          0s
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     ContainerCreating   0          0s
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Running             0          97s
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   1/1     Running             0          2m7s
quickstart-eci-deployer-kx9nhop22g                   0/1     Completed           0          2m15s
quickstart-deployer-os19rw3eto                       0/1     Pending             0          0s
quickstart-deployer-os19rw3eto                       0/1     Pending             0          0s
quickstart-deployer-os19rw3eto                       0/1     ContainerCreating   0          1s
quickstart-deployer-os19rw3eto                       1/1     Running             0          6s
quickstart-db-deployment-7fff4c8479-qf469            0/1     Pending             0          0s
quickstart-db-deployment-7fff4c8479-qf469            0/1     Pending             0          4s
quickstart-db-deployment-7fff4c8479-qf469            0/1     ContainerCreating   0          4s
quickstart-db-deployment-7fff4c8479-qf469            0/1     Running             0          7s
quickstart-db-deployment-7fff4c8479-qf469            1/1     Running             0          19s
quickstart-db-preparation-job-5a55b267-6             0/1     Pending             0          0s
quickstart-db-preparation-job-5a55b267-6             0/1     Pending             0          0s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:0/4            0          0s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:0/4            0          4s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:1/4            0          5s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:1/4            0          8s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:2/4            0          9s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:2/4            0          6m42s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:3/4            0          7m20s
quickstart-db-preparation-job-5a55b267-6             0/1     Init:3/4            0          7m22s
quickstart-db-preparation-job-5a55b267-6             0/1     PodInitializing     0          7m23s
quickstart-db-preparation-job-5a55b267-6             0/1     Completed           0          7m25s
quickstart-server-deployment-5597597575-gtptz        0/3     Pending             0          0s
quickstart-server-deployment-5597597575-gtptz        0/3     Pending             0          4s
quickstart-server-deployment-5597597575-gtptz        0/3     ContainerCreating   0          4s
quickstart-server-deployment-5597597575-gtptz        0/3     Running             0          2m35s
quickstart-server-deployment-5597597575-gtptz        1/3     Running             0          2m37s
quickstart-server-deployment-5597597575-gtptz        2/3     Running             0          2m38s
quickstart-server-deployment-5597597575-gtptz        3/3     Running             0          3m5s
quickstart-deployer-os19rw3eto                       0/1     Completed           0          11m
quickstart-composite-app-deployer-picaju7bf0         0/1     Completed           0          20m
```

</details>

---

Press `Ctrl-C` to exit the watch command once everything is up and running.

---

<details><summary>What pods come out of the box?</summary>

``` bash
sudo kubectl get pods -n entando
```

``` shell-session
NAME                                                 READY   STATUS      RESTARTS   AGE
quickstart-operator-8556c9c6f8-9ghwg                 1/1     Running     0          132m
quickstart-kc-db-deployment-c57f75d7f-wxmqr          1/1     Running     0          130m
quickstart-kc-db-preparation-job-1d6ab9b6-7          0/1     Completed   0          129m
quickstart-kc-server-deployment-66484d596d-qr78q     1/1     Running     0          128m
quickstart-kc-deployer-mx7ms3sc2l                    0/1     Completed   0          130m
quickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   1/1     Running     0          123m
quickstart-eci-deployer-kx9nhop22g                   0/1     Completed   0          124m
quickstart-db-deployment-7fff4c8479-qf469            1/1     Running     0          121m
quickstart-db-preparation-job-5a55b267-6             0/1     Completed   0          121m
quickstart-server-deployment-5597597575-gtptz        3/3     Running     0          113m
quickstart-deployer-os19rw3eto                       0/1     Completed   0          121m
quickstart-composite-app-deployer-picaju7bf0         0/1     Completed   0          131m
```

</details>

---

#### Log in to Entando

Now that we've installed Entando, let's log in to `Entando App Builder`.

::: tip
[Ingress exposes HTTP routes from outside the cluster to services within the cluster.](https://kubernetes.io/docs/concepts/services-networking/ingress/)
:::

Get the URL to access Entando from your local browser.

``` bash
sudo kubectl get ingress -n entando -o jsonpath=\
'{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{"\n"}'
```

- Example URL:

``` bash
quickstart-entando.192.168.64.33.nip.io/app-builder/
```

---

![entando-login.png](./entando-login.png)

- Username: admin
- Password: adminadmin

After login, change your password to activate your account.

- Note: If the login process hangs for more than 5 seconds, refresh the browser.

![entando-app-builder.png](./entando-app-builder.png)

The App Builder is where we'll compose our micro frontends alongside CMS pages and content.

::: tip Congratulations!
We now have Entando up and running on Kubernetes in our local environment.
:::

---

<!-- <details><summary>For Developers: Learn how Ingresses work behind the scenes.</summary>

``` bash
sudo kubectl describe ingress -n entando
```

``` shell-session
Name:             quickstart-kc-ingress
Namespace:        entando
Address:          192.168.64.33
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host                                        Path  Backends
  ----                                        ----  --------
  quickstart-kc-entando.192.168.64.33.nip.io
                                              /auth   quickstart-kc-server-service:8080 (10.42.0.14:8080)
```

The Ingress provides the `Host` and `Path` to access our `Services`.

#### Identity Management

1. Find the URL to the Keycloak server.

``` shell-session
  Host                                        Path  Backends
  ----                                        ----  --------
  quickstart-kc-entando.192.168.64.33.nip.io
                                              /auth   quickstart-kc-server-service:8080 (10.42.0.14:8080)
```

- Example URL:

``` bash
http://quickstart-kc-entando.192.168.64.33.nip.io/auth/
```

Note: Replace the first part of the URL with the value of your `Host`

2. Get the Kubernetes `Secret` for the login and password.

``` bash
sudo kubectl get secrets -n entando
```

We're interested in the `keycloak-admin-secret`:

``` shell-session
NAME                                                 TYPE                                  DATA   AGE
quickstart-kc-db-admin-secret                        Opaque                                2      78m
quickstart-kc-db-secret                              Opaque                                2      76m
quickstart-kc-admin-secret                           Opaque                                2      76m
quickstart-kc-realm                                  Opaque                                1      76m
keycloak-admin-secret                                Opaque                                3      70m
```

3. Decode the secret.

``` bash
sudo kubectl get secret keycloak-admin-secret -n entando -o jsonpath=\
'{"\n Username: "}{.data.username | base64decode}{"\n Password: "}{.data.password | base64decode}{"\n"}'
"{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

- Example Username and Password:

``` shell-session
Username: entando_keycloak_admin
Password: MZ8bY4phMd
```

4. In your Keycloak browser, click `Administration Console`

Enter the Username and Password from your shell.

#### Entando App Builder

``` bash
sudo kubectl describe ingress -n entando
```

``` shell-session
Name:             quickstart-ingress
Namespace:        entando
Address:          192.168.64.33
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host                                     Path  Backends
  ----                                     ----  --------
  quickstart-entando.192.168.64.33.nip.io
                                           /entando-de-app     quickstart-server-service:8080 (10.42.0.22:8080)
                                           /digital-exchange   quickstart-server-service:8083 (10.42.0.22:8083)
                                           /app-builder/       quickstart-server-service:8081 (10.42.0.22:8081)
                                           /pda                quickstart-pda-server-service:8081 (10.42.0.28:8081)
```

- Example URL:

``` bash
http://quickstart-entando.192.168.64.33.nip.io/app-builder/
```

</details>

--- -->
