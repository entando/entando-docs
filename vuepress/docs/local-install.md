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

## Getting Started

First, let's see what comes out of the box.

``` bash
sudo kubectl get pods -n entando
```

``` shell-session
NAME                                                 READY   STATUS      RESTARTS   AGE
quickstart-composite-app-deployer-6hhfdgr3wv         1/1     Running     0          47m
quickstart-operator-65c58857cb-mcjlt                 1/1     Running     0          48m
quickstart-kc-db-deployment-77f6bc5fb5-tgl47         1/1     Running     0          46m
quickstart-kc-db-preparation-job-b36bd89a-e          0/1     Completed   0          44m
quickstart-kc-server-deployment-58467568b4-rfz5l     1/1     Running     0          44m
quickstart-kc-deployer-wzqwd2e9yq                    0/1     Completed   0          46m
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   1/1     Running     0          38m
quickstart-eci-deployer-md0viurw2z                   0/1     Completed   0          38m
quickstart-db-deployment-75d9c9c8bf-dj975            1/1     Running     0          35m
quickstart-db-preparation-job-7de62e75-4             0/1     Completed   0          35m
quickstart-server-deployment-c796c7f8-gfv5l          3/3     Running     0          27m
quickstart-deployer-xocwyq5jbq                       0/1     Completed   0          35m
quickstart-pda-db-deployment-7f45b69789-vp8pc        1/1     Running     0          22m
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Completed   0          20m
quickstart-pda-server-deployment-6b4685459-t5vgf     2/2     Running     0          19m
quickstart-pda-deployer-tuye2ew301                   0/1     Completed   0          22m
quickstart-pda-apl-deployer-ypxcaw7nmp               1/1     Running     0          16m
```

### Access Entando Servers

Next, let's check out our Ingresses to get the URLs for our server deployments

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

The Ingresses provide the `Host` and `Path` to access our servers.

### Identity Management

1. Navigate to Keycloak in your browser

``` shell-session
  Host                                        Path  Backends
  ----                                        ----  --------
  quickstart-kc-entando.192.168.64.33.nip.io
                                              /auth   quickstart-kc-server-service:8080 (10.42.0.14:8080)
```

Example: http://quickstart-kc-entando.192.168.64.33.nip.io/auth/

Replace the first part of the URL with your `Host`

2. Next, get the Kubernetes `Secret` to get the login and password.

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

3. Decode the secret

``` bash
sudo kubectl get secret keycloak-admin-secret -n entando -o go-template=\
"{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

``` shell-session
Username: entando_keycloak_admin
Password: MZ8bY4phMd
```

4. In your Keycloak browser, click `Administration Console`

Enter the Username and Password from your shell

#### Configure Client Roles

In this step, we'll configure the required Client Roles to give our user permission to access our pods

1. Click `Users` in the left sidebar

2. Click `View all users`

3. Click on the link next to the `admin` user to select the user

4. Click the `Role Mappings` tab

5. Under the `Client Roles` dropdown:

- Select `quickstart-pda-server`: Add all `Available Roles` to `Assigned Roles`
- Select `quickstart-pda-sidecar`: Add all `Available Roles` to `Assigned Roles`
- Select `quickstart-server`: Add all `Available Roles` to `Assigned Roles`

Your changes are saved automatically

### Entando App Builder

1. Navigate to the Entando App Builder in your browser

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

Example: http://quickstart-entando.192.168.64.33.nip.io/app-builder/

Replace the first part of the URL with your `Host`

2. Log in to Entando

- Username: admin
- Password: adminadmin

After log in, Entando will ask you to change your password to activate your account

#### What's next?

The App Builder is where you'll be able to compose your micro frontends alongside your CMS pages and content. Take a look at our docs to learn more about how to create micro frontends, add them to a page, and add CMS content.

[Create a Micro Frontend](http://docs.entando.com/#_tutorial_create_a_react_micro_frontend_widget)

[Add Micro Frontends to Your Pages with Entando CMS](http://docs.entando.com/#_publish_a_content_in_your_application_page_tutorial)

### Process Driven Applications

1. Click on `Go to Homepage` at the upper right hand side of your screen

This will open up the process driven application widgets

2. Click on `Connections` in the left sidebar

3. Click `Create new connection`

- Name: staging
- Engine: pam
- Connection URL: http://rhpam7-install-kieserver-rhpam7-install-entando.apps.serv.run/services/rest/server
- Username: pamAdmin
- Password: redhatpam1!
- Timeout: 60000

Next, we'll need to configure each widget to use the new `Connection` you created

#### Configure Smart Inbox Screen

1. Navigate to the Entando App Builder tab

2. Click the `Page Designer` tab at the upper left

3. Click `Page Tree`

4. Next to `PDA Smart Inbox`, click on the `Actions` menu > Click `Configure`

5. In the `PDA - Task List` widget, click on the settings menu at the upper right of the widget > Click `Settings`

6. Under `Knowledge Source` select the connection you created `staging`

- Scroll to the bottom of the screen, and click `Save`

7. Repeat the same steps for `PDA - Task Details`, `PDA - Task Comments`, and `PDA - Task Attachments`

8. Finally, navigate back to the PDA Home Page tab, click `Smart Inbox` on the left sidebar, and you'll be able to see the Smart Inbox, and the corresponding Task Details, Task Notes, and Attachments when you click on a task in the inbox.

#### Configure Dashboard

1. Repeat the same steps to enable access to the dashboard.

Navigate to Entando App Builder > Page Designer > Page Tree > PDA Dashboard > Configure

2. Configure the `PDA - Summary Card` and `PDA Overtime Graph` widgets to use the connection you created and under `Data Type` select `Requests`

3. After navigating back to the PDA Home Page tab, you can now see the Summary Card widgets

