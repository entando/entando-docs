---
sidebarDepth: 2
---


# Entando 6 Azure Kubernetes Installation Instructions


## Prerequisites

- Azure account
   -  - Note: If you're using an Azure free account, you may need to upgrade your account first to enable pay-as-you-go billing. The Azure free account default quota includes just 1-4 vCPU which is not sufficient for this tutorial. There may be a delay before the quotas are updated when you upgrade your account.
- If you're not using Azure Cloud Shell:
  - Azure command line tool
  - Helm2 client

## Overview

The steps below walk you through installing the Entando platform in an Azure Kubernetes Services (AKS) cluster. Generally the steps are:

- Create an AKS cluster with 5 nodes (to allow expansion for microservices)
- Install nginx as an ingress controller in the cluster
- Install Entando

If you're already comfortable setting up an AKS cluster and installing nginx then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions-crds).

## Cluster Setup

### Setup and Connect to the Cluster

1. Login to Azure (<https://portal.azure.com/>)
2. Select the `Kubernetes services` icon
    - If not listed click `More services` on the right and search for Kubernetes
3. Click `Add` in upper left corner
4. Select `Kubernetes cluster`. You'll start with the `Basics` tab.
5. Select a `Resource group` or create one with the `Create new` link if it you don’t have one, e.g. `resource-group-1`
6. Enter a name of your choice in Kubernetes cluster name, e.g. `cluster-1`
7. Pick your `Region` if it wasn't automatically selected for you.
8. In the `Availability zones` dropdown pick __one and only one__ availability zone
    - Generally, you could pick more than one but it will result in a failure in a quickstart environment. If you chose more than one availability zone you will have to provision storage, manage node affinity, and ensure correct network configuration to ensure your application deploys. We recommend only doing this for production clusters.
9. Select  `1.18.10` for the `Kubernetes version`
10. Keep the default `Node size`, e.g. `Standard DS2 v2`
11. Change the `Node count` to `5`
12. Click `Next: Node Pools` to move to the next tab.
13. Keep the default values here
    - If you're familiar with AKS your can change as desired based on your objectives/knowledge
14. Click `Next: Authentication`
15. For `Authentication method` select `System-assigned managed identity`
    - You can pick a `Service principal` instead and Azure will automatically generate one for you. If you use an existing principal it is up to you to configure it and ensure you have the access you need.
16. Click `Next: Networking`
17. Enter a value for DNS name prefix, e.g. `cluster-1-dns`
18. Click `Review + Create`
    - Note: There are many other configuration options available for an AKS cluster. Generally, you can change these based on your experience and comfort level with the AKS platform. Entando uses base Kubernetes APIs so as long as you follow the Entando configuration instructions below you can tune your cluster infrastructure to meet your goals
19. Select `Create`
20. Wait for your cluster to initialize.
    - This may take a few minutes

### Deploy NGINX Ingress Controller

1. Navigate to your cluster by clicking `Go to Resource` from the results page or by the top navigation `Home - Kubernetes service` and clicking on your cluster.
2. Select `Connect`
3. Select `Bash`
4. Run the first two commands (e.g. `az account set...` and `az aks get-credentials...` to connect to your cluster. This should only be needed the first time you run the Azure Cloud Shell.
    - The Cloud Shell times out after 20 minutes of inactivity.
    - The following instructions assume you'll use the Azure Cloud Shell but you can also run the commands in a local environment if you have `kubectl`
5. Deploy nginx with the commands below. See [nginx instructions](https://docs.microsoft.com/en-us/azure/aks/ingress-basic) for more details.

```
kubectl create namespace ingress-basic
```

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update
```

```
helm install nginx-ingress ingress-nginx/ingress-nginx \
    --namespace ingress-basic \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
  --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux
```


6. Get the external IP address for your ingress controller. Record the value of EXTERNAL-IP for `nginx-ingress-controller` from the command below.

```
kubectl get service -n ingress-basic
```

### Verify the NGINX Ingress Install
We recommend setting up a test application so you can easily verify the ingress is working in your cluster. See [this page](../google-cloud-platform/gke-install#verify-the-nginx-ingress-install) for those steps. You can use either Azure Cloud Shell or your local `kubectl`.

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`.

1. Download the Custom Resource Definitions (CRDs) and deploy them
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

2. Install namespace scoped resources
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

## Deploy Your Entando Application
You can now deploy your application to Azure Kubernetes Service.
1. Download and unpack the entando-helm-quickstart:

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
- See the included README file for more information on subsequent steps.
2. Change into the new directory
```
cd entando-helm-quickstart-6.3.2
```
3. Edit the `sample-configmaps/entando-operator-config.yaml`
    - Add `entando.requires.filesystem.group.override: "true"`
    - Add `entando.ingress.class: "nginx"`

4. In values.yaml in the root folder set
    - Set `entando.default.routing.suffix` to the EXTERNAL-IP of your ingress controller and add nip.io to the end
      - For example: `entando.default.routing.suffix:: 52.188.177.248.nip.io`


5. Create the Entando namespace:
```
kubectl create namespace entando
```
6. Run helm to generate the template file
```
helm template quickstart ./ > my-aks-app.yaml
```
7. Deploy Entando via
```
kubectl create -f my-aks-app.yaml
```
8. Watch Entando startup. The application will be available when the `quickstart-composite-app-deployer` pod has a status of completed  
```
kubectl get pods -n entando --watch
```
9. Check for the Entando ingresses using
```
kubectl describe ingress -n entando
```
10. Access your app on the url for the ingress of the app builder, e.g. `http://quickstart-entando.EXTERNAL-IP.nip.io/entando-de-app`

## Appendix A - Troubleshooting

If you get an error like: `0/5 nodes are available: 5 node(s) had volume node affinity conflict.` or if your deployment hangs in a situation like this from `kubectl get pods -n entando`

```
NAME                                                 READY   STATUS      RESTARTS   AGE
my-aks-app-operator-644697776f-sxtq2                 1/1     Running     0          13m
quickstart-composite-app-deployer-2guz0n42pc         1/1     Running     0          13m
quickstart-deployer-jj4njqk4bg                       1/1     Running     0          10m
quickstart-eci-deployer-t0xktqsonk                   0/1     Completed   0          11m
quickstart-eci-k8s-svc-deployment-78f64c8d89-7c578   1/1     Running     0          11m
quickstart-kc-deployer-16gzv3clsj                    0/1     Completed   0          13m
quickstart-kc-server-deployment-7c9bc65744-g52nx     1/1     Running     0          13m
quickstart-server-deployment-55fcfc6b68-szvkl        0/3     Pending     0          10m
```

Double check your availability zones. By default an Azure cluster will include nodes from multiple zones but it will not provision storage
for all of those nodes so you can't deploy your application.

You can confirm this error in the AKS console as well:

1. In your cluster select `Workloads` in the left nav
2. Click on the deployment for your server application. This is `quickstart-server-deployment` by default
3. Click on the deployment name inside that application. There will be one
4. Click on the tab labeled `Conditions`
5. If you see an error that says `0/5 nodes are available: 5 node(s) had volume node affinity conflict.` Then you need to reconfigure
your cluster to have nodes in one zone or work with your Azure operations team to provision storage to match node affinity.
