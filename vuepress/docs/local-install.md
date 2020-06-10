## Install Kubernetes

Since Entando is designed to run on Kubernetes, let's get started by installing our own instance of Kubernetes locally.

We've tested a variety of Kubernetes implementations including Minikube, Minishift, CodeReady Containers, K3s, and Microk8s to find the best combination of low cpu/memory usage, fast startup times, and minimal configuration so we can get started quickly. After downloading the necessary files, we'll have our own instance of Kubernetes up and running in < 60 seconds.

::: tip What's Needed to Run Kubernetes
Kubernetes is a container orchestrator designed to manage a server cluster. It requires at least one master node running a Linux OS. We'll be using Multipass to create a lightweight Ubuntu VM in seconds that runs on a bare metal hypervisor for speed and performance.
:::

### Hypervisors
::: tip
Hypervisors allow you to create and run virtual machines. Virtualization software that run on top of your OS like VirtualBox or VMWare Workstation are Type 2 hypervisors. Type 1 hypervisors run on bare metal.
:::

Let's install a type 1 hypervisor for optimal performance:

- **Mac:** Install hyperkit.

``` bash
brew install hyperkit
```

- **Windows:** Install Hyper-V.

[Install Hyper-V on Windows 10](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v?redirectedfrom=MSDN)

*For machines that don't support a Type 1 hypervisor, install VirtualBox.*
[Mac](https://multipass.run/docs/installing-on-macos)
[Windows](https://multipass.run/docs/installing-on-windows)

### Lighweight, Ubuntu VM

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

### Micro Kubernetes

::: tip
K3s is a certified Kubernetes distribution designed for production workloads in resource-constrained environments.

It's packaged as a single <40MB binary that reduces the dependencies and steps needed to install, run and auto-update a production Kubernetes cluster.
:::

1. Install k3s

``` bash
sudo curl -sfL https://get.k3s.io | sh -
```

2. Check for `Ready` `STATUS`.

``` bash
sudo kubectl get node
```

*Optional:* See what's running out of the box

``` bash
sudo kubectl get pods -A
```

::: tip Congratulations!
You now have a local instance of Kubernetes up and running.
:::

## Install Entando

Entando is a platform that helps developers create apps as containerized micro frontends and microservices on Kubernetes. It comes with its own cluster infrastructure to wire micro frontends and microservices together, a shared component repository, an identity management system, a web content management system, and business automation to make it easier for you to create apps for your end users.

To install Entando, we'll define custom resources inside of Kubernetes, and then create a Kubernetes `Deployment` to deploy the platform. Default resources in Kubernetes include Pods, Services, and Ingresses. We'll be adding custom resources like the Entando App, Entando plugins, database servers, and identity management servers.

### Entando Custom Resources

Install Entando Custom Resource Definitions.

From your Ubuntu shell:

1. Download custom resource definitions.

``` bash
wget -c https://es-entando.github.io/custom-resources.tar.gz -O - | tar -xz
```

2. Create custom resource definitions

``` bash
sudo kubectl create -f custom-resources
```

### Kubernetes Namespace

::: tip
Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called namespaces. [kubernetes.io](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

You can use namespaces to allocate resources and set cpu/memory limits for individual projects or teams. They also can be helpful to further encapsulate projects from one another.
:::

``` bash
sudo kubectl create namespace entando
```

### Download Helm Chart

::: tip
Helm is a package manager for Kubernetes that helps you define, install, and upgrade Kubernetes applications.
:::

#### Entando Platform

If this is your first time trying out Entando, use `entando.yaml` for a faster install.
*Note: These files don't work out of the box with openshift. You can generate an openshift compatible version of entando using the quickstart project available at https://github.com/entando-k8s/entando-helm-quickstart*

``` bash
wget https://docs.entando.com/docs/assets/yaml/entando.yaml
```

``` bash
ENTANDO_HELM_CHART=entando.yaml
```

#### Entando Platform Bundled with Process Driven Applications

If you're using Entando for process automation, use `process-automation.yaml`.

``` bash
wget https://docs.entando.com/docs/assets/yaml/process-automation.yaml
```

``` bash
ENTANDO_HELM_CHART=process-automation.yaml
```

#### DBMS

Entando uses a Kubernetes Custom Resource named `EntandoCompositeApp` that is the core of the Entando infrastructure. It's composed of 3 parts:

- `EntandoKeycloakServer` (authentication manager)
- `EntandoClusterInfrastructure` (interface between Entando app and Kubernetes)
- `EntandoApp` (core logic application)

Each of these components needs a database to work and in order to speed up the boot process, an embedded database is used by default.
You can configure some behaviours of these components in the previously downloaded yaml file (`entando.yaml` or `process-automation.yaml`).
Each component can be individually configured guaranteeing a high level of flexibility.

If needed you can set the desired component to use a specific DBMS by update the previously downloaded yaml file (`entando.yaml` or `process-automation.yaml`) as follows:

1. open the chosen file and search for `EntandoCompositeApp` custom resource
2. identify the component to update in the related list
3. update the `spec.dbms` property with the desired value (you can specify different DBMS for different components)

Repeat previous steps for all components you need to change used DBMS on.

Valid values for `spec.dbms` property are: `none`, `postgresql`, `mysql`, `oracle`.

`none` value will result in using an embedded database with in-file persistence strategy.
If `none` (embedded database) is choosen each interested container requires a [PVC](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) mounted on path `/opt/jboss/keycloak/standalone/data/`


### Configure External Access to Your Cluster

::: tip
Entando sets up `Ingresses` in Kubernetes to access services from outside your server cluster. We'll use this to access Entando from our browser.
:::

To set up external access to your cluster, you'll need to replace the value of `ENTANDO_DEFAULT_ROUTING_SUFFIX` with your Ubuntu IP. You can look up your Ubuntu IP, and edit the YAML file manaully, but running the below commands will automatically update the IP address for you without having to open up the file.

*Note: Remember to run the `ENTANDO_HELM_CHART=...` command in the previous step so your shell knows which file to update. You can only choose one of the deployment options, either `entando.yaml` or `process-automation.yaml`.*

``` bash
IP=$(hostname -I | awk '{print $1}')
```

``` bash
sed -i "s/192.168.64.25/$IP/" $ENTANDO_HELM_CHART
```

### Deploy to Kubernetes

Deploying the Helm chart will deploy all of the Kubernetes resources required for Entando to run.

``` bash
sudo kubectl create -f process-automation.yaml
```

``` bash
sudo kubectl get pods -n entando --watch
```

This will take some time so take a short break, and we'll go through everything that was installed once everything's up and running.

<details><summary>Shell Output: kubectl get pods -n entando --watch</Summary>

#### Successful Startup

- First, you'll see the Entando operator: `ContainerCreating` > `Running`
- Next, the Entando composite app deployer: `Pending` > `ContainerCreating` > `Running`
- Then, Keycloak: `kc-deployer` > `kc-db-deployment`

**Jobs / Deployments**
- Jobs, like `kc-db-preparation-job` run once, and are `Completed`: `0/1`
- Database deployments, like `kc-db-deployment`, should end up as `Running`: `1/1`
- Server deployments, like `kc-server-deployment`, should end up as `Running`: `1/1`

**Lifecycle Events**
- Each line represents an event: `Pending`, `ContainerCreating`, `Running` or `Completed`
- Restarts should ideally be `0`; otherwise, there was a problem with your cluster, and Kubernetes is trying to self-heal

``` shell-session
ubuntu@test-vm:~$ sudo kubectl get pods -n entando --watch
NAME                                   READY   STATUS              RESTARTS   AGE
quickstart-operator-65c58857cb-mcjlt   0/1     ContainerCreating   0          39s
quickstart-operator-65c58857cb-mcjlt   0/1     Running             0          45s
quickstart-composite-app-deployer-6hhfdgr3wv   0/1     Pending             0          0s
quickstart-composite-app-deployer-6hhfdgr3wv   0/1     Pending             0          0s
quickstart-composite-app-deployer-6hhfdgr3wv   0/1     ContainerCreating   0          0s
quickstart-composite-app-deployer-6hhfdgr3wv   1/1     Running             0          20s
quickstart-kc-deployer-wzqwd2e9yq              0/1     Pending             0          0s
quickstart-kc-deployer-wzqwd2e9yq              0/1     Pending             0          0s
quickstart-kc-deployer-wzqwd2e9yq              0/1     ContainerCreating   0          0s
quickstart-operator-65c58857cb-mcjlt           1/1     Running             0          97s
quickstart-kc-deployer-wzqwd2e9yq              1/1     Running             0          20s
quickstart-kc-db-deployment-77f6bc5fb5-tgl47   0/1     Pending             0          0s
quickstart-kc-db-deployment-77f6bc5fb5-tgl47   0/1     Pending             0          6s
quickstart-kc-db-deployment-77f6bc5fb5-tgl47   0/1     ContainerCreating   0          6s
quickstart-kc-db-deployment-77f6bc5fb5-tgl47   0/1     Running             0          79s
quickstart-kc-db-deployment-77f6bc5fb5-tgl47   1/1     Running             0          90s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     Pending             0          0s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     Pending             0          0s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     Init:0/1            0          0s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     Init:0/1            0          11s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     PodInitializing     0          14s
quickstart-kc-db-preparation-job-b36bd89a-e    0/1     Completed           0          16s
quickstart-kc-server-deployment-58467568b4-rfz5l   0/1     Pending             0          0s
quickstart-kc-server-deployment-58467568b4-rfz5l   0/1     Pending             0          0s
quickstart-kc-server-deployment-58467568b4-rfz5l   0/1     ContainerCreating   0          0s
quickstart-kc-server-deployment-58467568b4-rfz5l   0/1     Running             0          2m56s
quickstart-kc-server-deployment-58467568b4-rfz5l   1/1     Running             0          5m37s
quickstart-kc-deployer-wzqwd2e9yq                  0/1     Completed           0          7m59s
quickstart-eci-deployer-md0viurw2z                 0/1     Pending             0          0s
quickstart-eci-deployer-md0viurw2z                 0/1     Pending             0          0s
quickstart-eci-deployer-md0viurw2z                 0/1     ContainerCreating   0          0s
quickstart-eci-deployer-md0viurw2z                 1/1     Running             0          5s
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   0/1     Pending             0          0s
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   0/1     Pending             0          1s
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   0/1     ContainerCreating   0          1s
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   0/1     Running             0          94s
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   1/1     Running             0          2m29s
quickstart-eci-deployer-md0viurw2z                   0/1     Completed           0          2m46s
quickstart-deployer-xocwyq5jbq                       0/1     Pending             0          0s
quickstart-deployer-xocwyq5jbq                       0/1     Pending             0          0s
quickstart-deployer-xocwyq5jbq                       0/1     ContainerCreating   0          0s
quickstart-deployer-xocwyq5jbq                       1/1     Running             0          5s
quickstart-db-deployment-75d9c9c8bf-dj975            0/1     Pending             0          0s
quickstart-db-deployment-75d9c9c8bf-dj975            0/1     Pending             0          4s
quickstart-db-deployment-75d9c9c8bf-dj975            0/1     ContainerCreating   0          4s
quickstart-db-deployment-75d9c9c8bf-dj975            0/1     Running             0          8s
quickstart-db-deployment-75d9c9c8bf-dj975            1/1     Running             0          18s
quickstart-db-preparation-job-7de62e75-4             0/1     Pending             0          0s
quickstart-db-preparation-job-7de62e75-4             0/1     Pending             0          0s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:0/4            0          0s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:0/4            0          3s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:1/4            0          6s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:1/4            0          8s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:2/4            0          11s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:2/4            0          6m40s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:3/4            0          7m56s
quickstart-db-preparation-job-7de62e75-4             0/1     Init:3/4            0          7m58s
quickstart-db-preparation-job-7de62e75-4             0/1     PodInitializing     0          8m5s
quickstart-db-preparation-job-7de62e75-4             0/1     Completed           0          8m7s
quickstart-server-deployment-c796c7f8-gfv5l          0/3     Pending             0          0s
quickstart-server-deployment-c796c7f8-gfv5l          0/3     Pending             0          4s
quickstart-server-deployment-c796c7f8-gfv5l          0/3     ContainerCreating   0          4s
quickstart-server-deployment-c796c7f8-gfv5l          0/3     Running             0          106s
quickstart-server-deployment-c796c7f8-gfv5l          1/3     Running             0          2m15s
quickstart-server-deployment-c796c7f8-gfv5l          2/3     Running             0          3m18s
quickstart-server-deployment-c796c7f8-gfv5l          3/3     Running             0          4m21s
quickstart-deployer-xocwyq5jbq                       0/1     Completed           0          13m
quickstart-pda-deployer-tuye2ew301                   0/1     Pending             0          0s
quickstart-pda-deployer-tuye2ew301                   0/1     Pending             0          0s
quickstart-pda-deployer-tuye2ew301                   0/1     ContainerCreating   0          0s
quickstart-pda-deployer-tuye2ew301                   1/1     Running             0          23s
quickstart-pda-db-deployment-7f45b69789-vp8pc        0/1     Pending             0          0s
quickstart-pda-db-deployment-7f45b69789-vp8pc        0/1     Pending             0          6s
quickstart-pda-db-deployment-7f45b69789-vp8pc        0/1     ContainerCreating   0          6s
quickstart-pda-db-deployment-7f45b69789-vp8pc        0/1     Running             0          98s
quickstart-pda-db-deployment-7f45b69789-vp8pc        1/1     Running             0          2m3s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Pending             0          0s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Pending             0          0s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Init:0/1            0          0s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Init:0/1            0          4s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     PodInitializing     0          11s
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Completed           0          13s
quickstart-pda-server-deployment-6b4685459-t5vgf     0/2     Pending             0          0s
quickstart-pda-server-deployment-6b4685459-t5vgf     0/2     Pending             0          5s
quickstart-pda-server-deployment-6b4685459-t5vgf     0/2     ContainerCreating   0          5s
quickstart-pda-server-deployment-6b4685459-t5vgf     0/2     Running             0          101s
quickstart-pda-server-deployment-6b4685459-t5vgf     1/2     Running             0          2m15s
quickstart-pda-server-deployment-6b4685459-t5vgf     2/2     Running             0          3m7s
quickstart-pda-deployer-tuye2ew301                   0/1     Completed           0          6m8s
quickstart-pda-apl-deployer-ypxcaw7nmp               0/1     Pending             0          0s
quickstart-pda-apl-deployer-ypxcaw7nmp               0/1     Pending             0          0s
quickstart-pda-apl-deployer-ypxcaw7nmp               0/1     ContainerCreating   0          0s
quickstart-pda-apl-deployer-ypxcaw7nmp               1/1     Running             0          6s
```

</details>

#### Entando Deployment Complete

Look for the following to verify that Entando deployed successfully.

``` shell-session
- quickstart-operator-65c58857cb-mcjlt           1/1     Running
...
- quickstart-kc-server-deployment-58467568b4-rfz5l   1/1     Running
...
- quickstart-server-deployment-c796c7f8-gfv5l          3/3     Running
...
- quickstart-pda-server-deployment-6b4685459-t5vgf     2/2     Running
```

You can press `Ctrl-C` to exit the watch command once everything is up and running.

::: tip Congratulations!
Entando is now up and running on Kubernetes.
:::