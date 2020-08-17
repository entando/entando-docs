---
sidebarDepth: 2
---


# Entando 6 Azure Kubernetes Installation Instructions


## Prerequisites

- Azure account
- If you're not using Azure Cloud Shell:
  - Azure command line tool
  - Helm2 client 

## Overview

The steps below walk you through installing the Entando platform in an Azure Kubernetes Services (AKS) cluster. Generally the steps are:

- Create an AKS cluster with 5 nodes (to allow expansion for microservices)
- Install nginx as an ingress controller in the cluster
- Install Entando

If you're already comfortable setting up an EKS cluster and installing nginx then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions-crds).


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
8. Select the default `Kubernetes version` if it's not already selected, e.g. 1.16.13
9. Keep the default `Node size`, e.g. `Standard DS2 v2`
10. Change the `Node count` to `5`
11. Click `Next: Node Pools` to move to the next tab.
12. Keep the default values here
    - If you're familiar with AKS your can change as desired based on your objectives/knowledge
13. Click `Next: Authentication`
14. For `Authentication method` select `System-assigned managed identity`
    - You can pick a `Service principal` instead and Azure will automatically generate one for you. If you use an existing principal it is up to you to configure it and ensure you have the access you need.
15. Click `Next: Networking`
16. Enter a value for DNS name prefix, e.g. `cluster-1-dns`
17. Click `Review + Create`
    - Note: There are many other configuration options available for an AKS cluster. Generally, you can change these based on your experience and comfort level with the AKS platform. Entando uses base Kubernetes APIs so as long as you follow the Entando configuration instructions below you can tune your cluster infrastructure to meet your goals
18. Select `Create`
    - Note: If you're using an Azure free account, you may need to upgrade your account first to enable pay-as-you-go billing. The Azure free account default quota includes just 1-4 vCPU which is not sufficient for a full Kubernetes cluster.
19. Wait for your cluster to initialize.
    - This may take a few minutes

### Deploy NGINX Ingress Controller

1. Navigate to your cluster by clicking `Go to Resource` from the results page or by the top navigation `Home - Kubernetes service` and clicking on your cluster. 
2. Select `Connect`
3. Run the first two commands to connect to your cluster
    - The following instructions assume you'll use the Azure Cloud Shell but you can also run the commands in a local environment if you have `kubectl`
4. Deploy nginx with the commands below. See [nginx instructions](https://docs.microsoft.com/en-us/azure/aks/ingress-basic) for more details.

```
kubectl create namespace ingress-basic
```

```
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
```

```
helm install nginx-ingress stable/nginx-ingress \
    --namespace ingress-basic \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
  --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux
```


5. Get the external IP address for your ingress controller. Record the value of EXTERNAL-IP for `nginx-ingress-controller` from the command below.

```
kubectl get service -l app=nginx-ingress --namespace ingress-basic
```

### Verify the NGINX Ingress Install
We recommend setting up a test application so you can easily verify the ingress is working in your cluster. See [this page](../google-cloud-platform/#verify-the-nginx-ingress-install) for those steps. You can use either Azure Cloud Shell or your local `kubectl`.

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`.

1. Download the Custom Resource Definitions (CRDs) and unpack them
```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.2.0/dist/qs/custom-resources.tar.gz | tar -xz
```

2. Install the Entando CRDs: ```kubectl create -f dist/crd```

## Deploy Your Entando Application
You can now deploy your application to Azure Kubernetes Service.
1. Download and unpack the `entando-helm-quickstart release` here:
<https://github.com/entando-k8s/entando-helm-quickstart/releases>
   - See the included README file for more information on the following steps.
```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.2.0.tar.gz | tar xvz
```

2. Edit `values.yaml` in the root directory:
    - Set `supportOpenshift: false`
    - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the EXTERNAL-IP of your ingress controller and add nip.io to the end
      - For example: `ENTANDO_DEFAULT_ROUTING_SUFFIX: 52.188.177.248.nip.io`
   - Configure nginx as the ingress controller and enable file system groups for persistent volume access:
      - `ENTANDO_INGRESS_CLASS: "nginx"`
      - `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
   - See [Appendix A](#appendix-a-example-values-yaml-file-for-helm-quickstart) for an example values.yaml

3. Create the Entando namespace: ```kubectl create namespace entando```
4. Run helm to generate the template file:

```
helm template my-aks-app --namespace=entando ./ > my-aks-app.yaml
```
5. Deploy Entando via `kubectl create -f my-aks-app.yaml`
6. Watch Entando startup `kubectl get pods -n entando --watch`
7. Check for the Entando ingresses using `kubectl describe ingress -n entando`
8. Access your app on the url for the ingress of the app builder, e.g. `http://quickstart-entando.EXTERNAL-IP.nip.io/entando-de-app`

## Appendix A - Example values.yaml file for Helm Quickstart

In the example below the application will deploy with embedded databases and will use `nginx`
as the ingress controller. Replace `<YOUR-IP>` with the EXTERNAL-IP address of your nginx controller

```
app:
 name: quickstart
 dbms: none
operator:
 supportOpenshift: false
 env:
   ENTANDO_DOCKER_IMAGE_VERSION_FALLBACK: 6.0.0
   #ENTANDO_DOCKER_REGISTRY_OVERRIDE: docker.io # Remove comment if you want to always use a specific docker registry
   #ENTANDO_DOCKER_IMAGE_ORG_OVERRIDE: entando # Remove the comment if you want to always use a specific docker organization
   ENTANDO_DEFAULT_ROUTING_SUFFIX: <YOUR-IP>.nip.io
   ENTANDO_POD_READINESS_TIMEOUT_SECONDS: "1000"
   ENTANDO_POD_COMPLETION_TIMEOUT_SECONDS: "1000"
   ENTANDO_DISABLE_KEYCLOAK_SSL_REQUIREMENT: "true"
   ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS: "false"
   ENTANDO_INGRESS_CLASS: "nginx"
   ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"
 tls:
   caCrt:
   tlsCrt:
   tlsKey:
deployPDA: false
```
