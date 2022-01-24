---
sidebarDepth: 2
---


# Installation on Azure Kubernetes Service (AKS)

## Prerequisites

- Azure account
   - Note: If you're using an Azure free account, you may need to upgrade your account first to enable pay-as-you-go billing. The Azure free account default quota includes just 1-4 vCPU which is not sufficient for this tutorial. There may be a delay before the quotas are updated when you upgrade your account.
- If you're not using Azure Cloud Shell, you'll also need:
  - Azure command line tool
  - Helm3 client

## Overview

The steps below walk you through installing the Entando platform in an Azure Kubernetes Services (AKS) cluster. These are the basic steps:

- Create a single cluster with up to 5 nodes
- Install NGINX as an ingress controller
- Install Entando

If you're already comfortable setting up an AKS cluster and installing NGINX, then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions-crds).

## Cluster Setup

### Setup and Connect to the Cluster

1. Login to Azure: <https://portal.azure.com/>
2. Select the `Kubernetes services` icon
    - If the icon isn't visible, click `More services` on the right and search for Kubernetes
3. Click `Create` in the upper left corner
4. Select `Create a Kubernetes cluster`. You'll start with the `Basics` tab.
5. Select a `Resource group` or create one with the `Create new` link if it you don’t have one, e.g. `resource-group-1`
6. Enter a name of your choice for the Kubernetes cluster name, e.g. `cluster-1`
7. Pick your `Region` if it wasn't automatically selected for you.
8. In the `Availability zones` dropdown pick __one and only one__ availability zone
    - Generally, you could pick more than one but it will result in a failure in a quickstart environment. If you chose more than one availability zone you will have to provision storage, manage node affinity, and provide the correct network configuration to ensure your application deploys. We recommend only doing this for production clusters.
9. Select an [Entando-compatible Kubernetes version](https://www.entando.com/page/en/compatibility-guide), e.g. `1.20.x`
10. Keep the default `Node size`, e.g. `Standard DS2 v2`
11. Keep the `Scale Method` set to `Autoscale` and the `Node count range` set from `1` to `5`
12. Click `Next: Node Pools` to move to the next tab
13. Keep the default values here
    - If you're familiar with AKS you can change these settings as desired
14. Click `Next: Authentication`
15. For `Authentication method` select `System-assigned managed identity`
    - You can also select `Service principal` to have Azure automatically generate one for you. If you use an existing principal, it is up to you to configure it and ensure you have the access you need.
16. Click `Next: Networking`
17. Enter a value for DNS name prefix, e.g. `cluster-1-dns`
18. Click `Review + Create`
    - Note: There are many other configuration options available for an AKS cluster. Generally, you can change these based on your experience and comfort level with the AKS platform. Entando uses base Kubernetes APIs so as long as you follow the Entando configuration instructions below you can tune your cluster infrastructure to meet your goals.
19. Select `Create`
20. Wait for your cluster to initialize. This may take a few minutes.

Note: A different storage class can be configured by following [these instructions](./gke-install.md#appendix-a-configuring-clustered-storage).

### Deploy NGINX Ingress Controller

1. Navigate to your cluster by clicking `Go to Resource` from the results page or by the top navigation `Home - Kubernetes service` and clicking on your cluster.
2. Select `Connect`
3. Select `Open Cloud Shell`
   - With a new Azure account you may see a warning: `You have no storage mounted`. Follow the instructions to create a new storage account.
4. Run the first two commands (e.g. `az account set...` and `az aks get-credentials...`) to connect to your cluster. This should only be needed the first time you run the Azure Cloud Shell.
    - The following instructions assume you'll use the Azure Cloud Shell but you can also run the commands in a local environment via `kubectl`
5. Add the NGINX controller to enable access to the cluster
``` sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.5/deploy/static/provider/cloud/deploy.yaml 
```
   See <https://kubernetes.github.io/ingress-nginx/deploy/#azure> for more information.

6. Get the external IP address for your ingress controller
``` sh
kubectl get services -n ingress-nginx
```
   The output should be similar to this:
``` 
NAME                      TYPE          CLUSTER-IP    EXTERNAL-IP                        
ingress-nginx-controller  LoadBalancer  10.0.28.197   20.120.54.243
```
   Record the value of the EXTERNAL-IP.

### Verify the NGINX Ingress Install
We recommend verifying NGINX is working correctly. The simplest option is to access the EXTERNAL-IP in your browser. You should get a `404 Not Found` NGINX error page. Alternatively you can set up a simple test application. See [this page](../get-started/gke-install#verify-the-nginx-ingress-install) for those steps. You can use either Azure Cloud Shell or your local `kubectl`.

There are situations where the default NGINX ingress configuration doesn't work well for Entando and must be customized. Refer to the [Development Tips and Tricks](../../docs/reference/local-tips-and-tricks.md#customizing-nginx) page for more information.

### Install the Entando Custom Resource Definitions (CRDs)
1. Download the Custom Resource Definitions (CRDs) and, once per cluster, deploy the cluster scoped resources
```sh
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

2. Create the Entando namespace
``` sh
kubectl create namespace entando
```

3. Now install the namespace scoped resources
``` sh
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

## Deploy Your Entando Application
You can now deploy your application to Azure Kubernetes Service.
1. Download and unpack the entando-helm-quickstart files

``` sh
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
   See the included README file for more information on subsequent steps.

2. Change into the new directory
``` sh
cd entando-helm-quickstart-6.3.2
```
3. Edit `sample-configmaps/entando-operator-config.yaml` and add the following settings in the data section
``` yaml
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```  
4. Now create the ConfigMap for the operator
``` sh
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando
```
5. Next, in `values.yaml` in the root directory, set the following value:
    - Set `singleHostName` to the value of the `EXTERNAL-IP` of your `ingress-nginx-controller` and add nip.io to the end:
        - For example: `singleHostName: 20.120.54.243.nip.io `
6. Run helm to generate the template file
``` sh
helm template quickstart -n entando ./ > quickstart.yaml
```
7. Deploy Entando via this command
``` sh
kubectl apply -n entando -f quickstart.yaml 
```
8. Watch Entando startup. It can take around 10 minutes before the application is fully deployed and ready. The application will be available when the `quickstart-composite-app-deployer-*` pod has a status of `Completed`.  
``` sh
kubectl get pods -n entando --watch
```
9. Check for the Entando ingresses using
``` sh
kubectl describe ingress -n entando
```
10. Access your application using the URL for the corresponding ingress, e.g. `http://EXTERNAL-IP.nip.io/entando-de-app/`

See the [Getting Started guide](../../docs/getting-started/README.md#log-in-to-entando) for helpful login instructions and next steps. 

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

Double check your availability zones. By default an Azure cluster will include nodes from multiple zones, but Azure may not automatically provision their storage.

You can confirm this error in the AKS console as well:

1. In your cluster select `Workloads` in the left nav
2. Click on the deployment for your server application. This is `quickstart-server-deployment` by default
3. Click on the deployment name inside that application. There will be one
4. Click on the tab labeled `Conditions`
5. If you see an error that says `0/5 nodes are available: 5 node(s) had volume node affinity conflict.` Then you need to reconfigure
your cluster to have nodes in one zone or work with your Azure operations team to provision storage to match node affinity.
