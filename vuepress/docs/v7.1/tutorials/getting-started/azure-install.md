---
sidebarDepth: 2
---


# Installation on Azure Kubernetes Service (AKS)

The steps below walk you through installing the Entando Platform in an Azure Kubernetes Services (AKS) cluster.

- [Create a single AKS cluster](#cluster-setup)
- [Install NGINX as an ingress controller](#deploy-nginx-ingress-controller)
- [Install the Entando Custom Resources](#install-the-entando-custom-resources)
- [Configure the Entando Application](#configure-the-entando-application)
- [Deploy Entando](#deploy-your-entando-application)

If you're already comfortable setting up an AKS cluster and installing NGINX, then you may be able to skip to [setting up Entando](#install-the-entando-custom-resources).

## Prerequisites

- Azure account
- If you choose not to use the Azure Cloud Shell, you'll also need the Azure command line tool.

::: tip
If you're using an Azure free account, you may need to upgrade your account to enable pay-as-you-go billing. The Azure free account default quota allows just 1-4 vCPU which is not sufficient for this tutorial. There may be a delay before the quotas are updated when you upgrade your account.
:::

## Cluster Setup

### Setup and Connect to the Cluster

1. Login to Azure: <https://portal.azure.com/>
2. Select the `Kubernetes services` icon
    - If the icon isn't visible, click `More services` on the right and search for Kubernetes
3. Click `Create` in the upper left corner
4. Select `Create a Kubernetes cluster`. You'll start with the `Basics` tab.
5. Select a `Resource group` or create one with the `Create new` link, e.g. YOUR-RESOURCE-GROUP
6. Enter a name of your choice for the Kubernetes cluster name, e.g. YOUR-CLUSTER
7. Pick your `Region` if it wasn't automatically selected for you.
8. In the `Availability zones` dropdown, pick __one and only one__ availability zone
    - Generally, you could pick more than one but it will result in a failure in a quickstart environment. If you chose more than one availability zone you will have to provision storage, manage node affinity, and provide the correct network configuration to ensure your application deploys. We recommend only doing this for production clusters.
9. Select an [Entando-compatible Kubernetes version](https://www.entando.com/page/en/compatibility-guide), e.g. 1.23.x
10. Keep the default `Node size`, e.g. Standard DS2 v2
11. Keep the `Scale Method` set to `Autoscale` and the `Node count range` set from `1` to `5`
12. (Optional) If you're familiar with AKS, you can change settings under other tabs (e.g. `Node Pools`, `Access`) as desired but the defaults should work. Entando uses base Kubernetes APIs, so as long as you follow the Entando configuration instructions below, you can tune your cluster infrastructure to meet your goals.
13. Click `Review + Create` then `Create`. It may take several minutes for your cluster to initialize. 

Note: A different storage class can be configured for [Clustered Storage](./gke-install.md#appendix-configuring-clustered-storage).

### Deploy NGINX Ingress Controller

1. Navigate to your cluster by clicking `Go to Resource` from the results page, or go to `Home` → `Kubernetes service` and click on your cluster.
2. Select `Connect`
3. Select `Open Cloud Shell`
   - With a new Azure account, you may see a warning: `You have no storage mounted`. Follow the instructions to create a new storage account.
4. If it wasn't done automatically, run the first two commands (e.g. `az account set...` and `az aks get-credentials...`) to connect to your cluster. This should only be needed the first time you run the Azure Cloud Shell.
    - The following instructions assume you will use the Azure Cloud Shell but you can also run the commands in a local environment via `kubectl`
5. Deploy the NGINX controller to enable access to the cluster
``` sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml 
```
6. Get the external IP address for your ingress controller
``` sh
kubectl get services -n ingress-nginx
```
For example:
``` 
NAME                      TYPE          CLUSTER-IP    EXTERNAL-IP                        
ingress-nginx-controller  LoadBalancer  10.0.28.197   20.120.54.243
```
The value of the external URL (EXTERNAL-IP) should be available within a few minutes. You'll need this address for `YOUR-HOST-NAME` in the steps below.

::: tip
NGINX is working correctly if a `404 Not Found` error page is generated when accessing `YOUR-HOST-NAME` from your browser. For a more complete test, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using Azure Cloud Shell or your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::
See the [Install Guide for NGINX on Azure](https://kubernetes.github.io/ingress-nginx/deploy/#azure) for more information.

### Install the Entando Custom Resources

1. Apply the cluster-scoped custom resource definitions (CRDs). This is required only once per cluster.

<EntandoCode>kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
</EntandoCode>
   
2. Create the namespace for the Entando Application
```sh
kubectl create namespace entando
```
3. Download the `entando-operator-config` template so you can configure the [Entando Operator](../consume/entando-operator.md) 

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/samples/entando-operator-config.yaml"</EntandoCode>

4. Edit the `entando-operator-config.yaml` to add two properties
```yaml
data:
   entando.requires.filesystem.group.override: "true"
   entando.ingress.class: "nginx"
``` 

5. Apply the `ConfigMap`
```sh
kubectl apply -f entando-operator-config.yaml -n entando
```

6. Apply the namespace-scoped custom resources
   
<EntandoCode>kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml</EntandoCode>


7. You can use `kubectl get pods -n entando --watch` to see the initial pods start up. Use `Ctrl+C` to exit.
```
$ kubectl get pods -n entando
NAME                                   READY   STATUS    RESTARTS   AGE
entando-k8s-service-86f8954d56-mphpr   1/1     Running   0          5m53s
entando-operator-5b5465788b-ghb25      1/1     Running   0          5m53s
```

### Configure the Entando Application
1. Download the `entando-app.yaml` template

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/samples/entando-app.yaml"</EntandoCode>

2. Edit `entando-app.yaml`. Replace `YOUR-HOST-NAME` with `EXTERNAL-IP` + `.nip.io`. See [the EntandoApp custom resource overview](../../docs/reference/entandoapp-cr.md) for additional options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```
e.g. _ingressHostName: 20.120.54.243.nip.io_

## Deploy your Entando Application
1. You can now deploy your application to your AKS cluster
```
kubectl apply -n entando -f entando-app.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods warming up with the command below. Use `Ctrl+C` to exit the command.
```sh
kubectl get pods -n entando --watch
```
3. Once all the pods are in a running state, access the Entando App Builder at the following address
```
http://YOUR-HOST-NAME/app-builder/
```

See the [Getting Started guide](../../docs/getting-started/README.md#login-to-entando) for helpful login instructions and next steps. 

## Appendix A - Troubleshooting

If you get an error like: `0/5 nodes are available: 5 node(s) had volume node affinity conflict` or if several deployments fail to start, then you should check your availability zones. By default, an Azure cluster will include nodes from multiple zones, but Azure may not automatically provision their storage.

You can confirm this error in the AKS console as well:
1. In your cluster, select `Workloads` in the left nav
2. Click on the deployment for your server application. This is `quickstart-deployment` by default.
3. Click on the deployment name inside that application.
4. Click on the tab labeled `Conditions`
5. If you see an error that says `0/5 nodes are available: 5 node(s) had volume node affinity conflict`, then you need to reconfigure your cluster to have nodes in one zone, or work with your Azure operations team to provision storage to match node affinity.
