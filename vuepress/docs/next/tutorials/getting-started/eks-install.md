---
sidebarDepth: 2
---

# Installation on Amazon Elastic Kubernetes Service (EKS)

This tutorial walks you through installing the Entando platform in an EKS cluster. The steps are:

- [Configure an IAM Role](#configure-an-iam-role) to allow kubernetes to manage the cluster
- [Create an EKS cluster](#create-the-eks-cluster) to allow expansion for microservices
- [Install NGINX](#install-the-nginx-ingress-controller) as an ingress controller 
- [Install Entando](#install-the-entando-custom-resource-definitions)


If you're already comfortable setting up an EKS cluster and installing NGINX then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions).

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/)
- AWS account
- kubectl
- Helm 3 client

## Create and Connect the EKS Cluster 
These steps use the AWS console to create the cluster. If you’re already familiar with creating an EKS cluster and assigning nodes via the AWS cli, then use the cli process for cluster creation as well.

### Configure an IAM Role
1. Login to AWS as a non-`super admin` user.
   - If you don’t have a user besides the super admin, it is recommended that you create one. Clusters created using the super admin for your account will have restrictions that may complicate your installation.
   - Your user needs access to EKS and the minimum credentials to create a cluster. You may need additional policies for Amazon Route 53 or other services, depending on your configuration.
2. Create an IAM role for the cluster so that AWS can provision assets. 
   1. From Services, `IAM` → `Create Role`
   2. Select `AWS Service` for the type of trusted entity
   3. Click `EKS` from the main list
   4. Click `EKS - Cluster` under `Select your use case`
   5. Click `Next:Permissions`. The `AmazonEKSClusterPolicy` should already be present
   6. Click `Next`
   7. Name your role (you’ll need this later), e.g. `YOUR-EKS-ROLE`
   8. (Optional) Add tags as desired
   9. Click `Next:CreateRole`

3. Refine the role to enable `Nodegroup` management and add elastic load balancer (ELB) access so the cluster can deploy the ELB for NGINX
   1. Go to `IAM` → `Roles` → `YOUR-EKS-ROLE`
   2. Under Permissions, click `Attach policies`
   3. Add a policy of `AmazonEKSWorkerNodePolicy` \
     Add a policy of `AmazonEKS_CNI_Policy` \
     Add a policy of `AmazonEC2ContainerRegistryReadOnly` \
     Add a policy of `ElasticLoadBalancingFullAccess`
4. Go to `Services` and select `Elastic Kubernetes Service`

Go to [Identity Management and Access on EKS](https://docs.aws.amazon.com/eks/latest/userguide/security-iam.html) for more details on roles.

### Create the EKS Cluster
1.   Add a cluster name and click `Create EKS cluster` (e.g. `YOUR-CLUSTER-1`).
2. Select 1.21 for the Kubernetes version.
3.  For `Cluster Service Role`, select the role you created above, `YOUR-EKS-ROLE`. If you choose a different role, it must have ELB permissions so the cluster can create a load balancer in `Networking`. 
4. Click `Next`.
5. Use the defaults for `Networking`(Step 2) and click `Next` 
6. Use the defaults for `Configure Logging` (Step 3) and click `Next`.
7. Review your settings and then click `Create`. Cluster provisioning usually takes between 10 and 15 minutes.

See [Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) for more detailed information.

### Add a Node Group to the Cluster
1. Go to `Services` → `Elastic Kubernetes Service` → `Clusters` and select`YOUR-CLUSTER-NAME` 
2. Go to `Compute` tab 
3. Click `Add Node Group`
4. Enter the following:
      * `Name`: give your group a name, e.g. `YOUR-NODE-1`
      * `Node IAM Role`: Select the cluster role you created above. If the role doesn't appear, verify that you added the extra policies to the role.
      * Click `Next`
5. For `Subnets` → the VPC subnets should already be setup and selected. Click `Next`
6. Click `Next` again.
7. Review the Compute and Scaling configuration. Typically, the AWS defaults below work:
     * AMI type: `Amazon Linux 2`
     * Instance type: `t3.medium`
Click `Next`
8. Review the Node Group scaling configuration. 
      * Set `Maximum size` to `5`. This is over-resourced for a Getting Started instance but offers capacity for adding microservices to your cluster without modifying the Nodegroup. 
      * Click `Next`
9. Select `Allow remote access to nodes`. Follow the links to create a new SSH key pair if you don't already have one.
10. Review your settings and then click `Create`. It may take a few minutes for the node to be created.

### Connect `kubectl` to the Cluster
   If this is a new setup, **login with the same user account that created the cluster in the steps above**. 
1. Enter ```aws-configure``` and then provide the Access key, etc.
2. Setup your kubectl or K8s context with: 
      ```
      aws eks --region YOUR-REGION-CODE update-kubeconfig --name YOUR-CLUSTER-NAME
      ```
      e.g. `aws eks --region us-east-2 update-kubeconfig --name cluster-1`
3. Your current context should now be configured for your AWS cluster. Run the command below to check:
    ```sh
    kubectl config current-context
    ```
   Your output should look something like this:
    ```
    arn:aws:eks:us-east-2:483173223614:cluster/cluster-1
    ```
 For more details and troubleshooting, see [Create a kubeconfig for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html).

### Install the NGINX Ingress Controller
Add the NGINX controller for the ingress. This depends on your role having permissions for ELB.

   - From the EKS cloud shell (or AWS client), use the login:

```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.5/deploy/static/provider/cloud/deploy.yaml 
```
See the K8s [Load Balancer Install Guide for AWS](https://kubernetes.github.io/ingress-nginx/deploy/#aws) and the [NGINX as Ingress Controller on EKS](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/) for more details.

::: tip
NGINX is working correctly if a `404 Not Found` error page is generated when accessing the EXTERNAL-IP from your browser. You can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::
### Install the Entando Custom Resource Definitions
Once per cluster, you need to deploy the `Entando Custom Resources`.
1. Download the Custom Resource definitions and deploy the cluster scoped resources:
```sh
kubectl apply -f https://raw.githubusercontent.com/entando-k8s/entando-k8s-operator-bundle/v7.0.0-pre5/manifests/k8s-116-and-later/namespace-scoped-deployment/cluster-resources.yaml

```

2. Create the namespace for the Entando Application:
```sh
kubectl create namespace entando
```
3. Create the ConfigMap.yaml as shown here:
```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: entando-operator-config
  namespace: entando
data:
  entando.requires.filesystem.group.override: 'true'
```
4. Apply the ConfigMap: 
```sh
kubectl apply -f configmap.yaml
```

5. Install the namespace scoped resources
```sh
kubectl apply -n entando -f https://raw.githubusercontent.com/entando-k8s/entando-k8s-operator-bundle/v7.0.0-pre5/manifests/k8s-116-and-later/namespace-scoped-deployment/namespace-resources.yaml
```
5. Run `kubectl get pods -n entando --watch` to see the pods start up. Use Ctl-c to exit.

Output example:
```
Azure:~$ kubectl get pods -n entando --watch
NAME                                  READY   STATUS    RESTARTS   AGE
entando-k8s-service-9765cbcdf-mvlrl   0/1     Running   0          11s
entando-operator-7747dbd867-ldjg4     1/1     Running   0          11s
entando-k8s-service-9765cbcdf-mvlrl   0/1     Running   0          16s
entando-k8s-service-9765cbcdf-mvlrl   1/1     Running   0          20s
```
6. Create or Download the entandoapp.yaml
Download the template here(Is there a way to download?) or Use the template below to create `entandoapp.yaml`. Replace `YOUR-APP` and `YOUR-INGRESS-IP` with your particular instance where YOUR-APP is any name you choose. The following variables can also be updated for your needs: `namespace`, `entandoAppVersion`, `dbms`

```yaml
apiVersion: entando.org/v1
kind: EntandoApp
metadata:
  namespace: entando
  name: YOUR-APP   
spec:
  environmentVariables: []
  entandoAppVersion: '6.4'
  dbms: embedded
  ingressHostName: YOUR-APP.YOUR-INGRESS-IP.nip.io
  standardServerImage: eap
  replicas: 1
```

## Deploy Your Entando Application
1. You can now deploy your application to Amazon EKS with this command:
```
kubectl apply -n entando -f entandoapp.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods with:
```
kubectl get pods -n entando --watch
```
3. Once all the pods are in a running state, access the Entando App Builder at the following URL. Note `YOUR_APP` and `YOUR-INGRESS-IP` are what was designated in `entandoapp.yaml`.

```
http://YOUR-APP.YOUR-INGRESS-IP.nip.io/app-builder/
```

Congratulations! To continue your journey on Entando see the [Getting Started guide](../../docs/getting-started/#log-in-to-entando) for helpful login instructions and next steps.

## Appendix A - Troubleshooting
IAM and Roles
- [Installing aws-iam-authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)
- [AccessDenied error during AssumeRole operation](https://stackoverflow.com/questions/56863539/getting-error-an-error-occurred-accessdenied-when-calling-the-assumerole-oper)

NGINX
- [Using NGINX as the ingress controller on EKS](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/)
- Issue with permissions for NGINX ingress:
```
 Warning  SyncLoadBalancerFailed   38m                 service-controller  (combined from similar events): Error syncing load balancer: failed to ensure load balancer: error creating
```
