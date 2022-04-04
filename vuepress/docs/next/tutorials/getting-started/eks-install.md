---
sidebarDepth: 2
---

# Installation on Amazon Elastic Kubernetes Service (EKS)

This tutorial walks you through installing the Entando Platform in an EKS cluster. The steps are:

- [Configure an IAM Role](#configure-an-identity-and-access-management-iam-role) to allow Kubernetes to manage the cluster
- [Create an EKS cluster](#create-the-eks-cluster) to allow expansion for microservices
- [Install NGINX](#install-the-nginx-ingress-controller) as an ingress controller 
- [Install Entando](#install-the-entando-custom-resource-definitions)


If you're already comfortable setting up an EKS cluster and installing NGINX, then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions).

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/)
- AWS account
- kubectl
- Helm 3 client

## Create and Connect the EKS Cluster 
These steps use the AWS console to create the cluster. If you’re already familiar with creating an EKS cluster and assigning nodes via the AWS CLI, then use the cli process for cluster creation as well.

### Configure an Identity and Access management (IAM) Role
1. Login to AWS as a non-`super admin` user
   - It is recommended that you create an user account that is not `super admin` if you do not aleady have one. Clusters created using the `super admin` account will have restrictions that may complicate your installation.
   - The user account created needs access to EKS and the minimum credentials to create a cluster. You may need additional policies for Amazon Route 53 or other services, depending on your configuration.
2. Create an IAM role for the cluster so that AWS can provision assets 
   1. From Services, `IAM` → `Create Role`
   2. Select `AWS Service` for the type of trusted entity
   3. Click `EKS` from the `Use cases`
   4. Check `EKS - Cluster`
   5. Click `Next`
   6. Verify that the `AmazonEKSClusterPolicy` is set
   7. Click `Next`
   8. Name your role (you’ll need this later), e.g. `YOUR-EKS-ROLE`
   9. Click `Create role`

3. Refine the role to enable `Node Group` management and add elastic load balancer (ELB) access so the cluster can deploy the ELB for NGINX
   1. Go to `IAM` → `Roles` → `YOUR-EKS-ROLE`
   2. Under `Add permissions`, click `Attach policies`
   3. Find each of these named policies and then click `Attach policies` \
      `AmazonEKSWorkerNodePolicy` \
      `AmazonEKS_CNI_Policy` \
      `AmazonEC2ContainerRegistryReadOnly` \
      `ElasticLoadBalancingFullAccess`
    4. Go to `Trust Relationships` → `Edit trust policy` → `Add new statement`. Add `ec2.amazonaws.com` so the cluster can manage the EC2 resources.

Go to [Identity Management and Access on EKS](https://docs.aws.amazon.com/eks/latest/userguide/security-iam.html) for more details on roles.

### Create the EKS Cluster
1. Go to `Services` and select `Elastic Kubernetes Service`
2. Click `Add cluster` → `Create`
3. Add a cluster name, e.g. (e.g. YOUR-CLUSTER-1).
4. Select 1.21 for the Kubernetes version.
5.  For `Cluster Service Role`, select the role you created above, `YOUR-EKS-ROLE`.
5. Click `Next`.
6. Use the defaults for `Networking` (Step 2) and click `Next`. 
7. Use the defaults for `Configure Logging` (Step 3) and click `Next`.
8. Review your settings and then click `Create`. Cluster provisioning may take several minutes.

See [Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) for more detailed information.

### Add a Node Group to the Cluster
1. Go to `Services` → `Elastic Kubernetes Service` → `Clusters` and select`YOUR-CLUSTER-NAME` 
2. Go to `Configuration` → `Compute` 
3. Click `Add Node Group`
4. Enter the following:
      * `Name`: Give your group a name, e.g. YOUR-NODE-1
      * `Node IAM Role`: Select the cluster role you created above. If the role doesn't appear, verify that you modified the trust policy as noted above.
      * Click `Next`
5. Review the `Node Group compute and scaling configuration`. These AWS defaults will work fine:
   * AMI type: `Amazon Linux 2`
   * Instance type: `t3.medium`
6. Set the `Maximum size` to `5`. This is over-resourced for a Getting Started instance but offers capacity for adding microservices to your cluster without modifying the Node Group.
   * Click `Next`
7. For `Node Group network configuration`, the subnets should already be setup and selected.
8. Select `Configure SSH access to nodes`. Follow the links to create a new SSH key pair if you don't already have one.
9. Select `All` to allow all source IPs.
10. Click `Next`   
11. Review your settings and then click `Create`. It may take a few minutes for the Node Group to be created.

### Connect to the Cluster
   1. *Note:* If this is a brand new setup you will need to configure the AWS CLI using the user account from the steps above. You'll need to provide your Access Key ID, Secret Key, and region.
```sh      
aws configure
```
   2. Setup your kube context via 
```sh
aws eks --region REGION-CODE update-kubeconfig --name YOUR-CLUSTER-1
```
   For example: `aws eks --region us-east-2 update-kubeconfig --name cluster-1`. More details and troubleshooting can be found here. <https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html>

   3. Your current context should now be configured for your AWS cluster. Run the command below to check
```sh
kubectl config current-context
```
   Your output should look something like this: `arn:aws:eks:us-east-2:483173223614:cluster/cluster-1`
 
### Install the NGINX Ingress Controller
Add the NGINX controller for the ingress. This depends on your role having permissions for ELB.

1. From the EKS cloud shell (or AWS client), login.
2. Apply this version of NGINX:
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.3/deploy/static/provider/aws/deploy.yaml
```
3. Get the ELB external URL for your NGINX install
```sh
kubectl get services -n ingress-nginx
```

Get the value of the external address (EXTERNAL-IP) for the ingress-nginx-controller:
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP                        
ingress-nginx-controller             LoadBalancer   10.100.102.83    ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com
```
You'll use this address for YOUR-HOST-NAME in the steps below.

::: tip
NGINX is working correctly if a `404 Not Found` error page is generated when accessing the EXTERNAL-IP from your browser. Alternatively, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::

See the [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/#aws) and the [NGINX as Ingress Controller on EKS](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/) for more details.

### Install the Entando Custom Resource Definitions
Once per cluster, deploy the `Entando Custom Resources`.
1. Download the Custom Resource definitions and deploy the cluster scoped resources:
```
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```
2. Create the namespace for the Entando Application:
```sh
kubectl create namespace entando
```
3. Download this `ConfigMap` template so you can configure the [Entando Operator](../devops/entando-operator.md). 
```sh
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/samples/entando-operator-config.yaml"
```
4. Edit the `entando-operator-config.yaml` to enable `data/entando.requires.filesystem.group.override`
```yaml
data:
   entando.requires.filesystem.group.override: "true"
``` 

5. Apply the `ConfigMap`: 
```sh
kubectl apply -f entando-operator-config.yaml -n entando
```

6. Install the namespace scoped resources
```sh
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml
```
7. You can use `kubectl get pods -n entando --watch` to see the initial pods start up. Use `Ctrl-C` to exit.
```
$ kubectl get pods -n entando
NAME                                   READY   STATUS    RESTARTS   AGE
entando-k8s-service-86f8954d56-mphpr   1/1     Running   0          5m53s
entando-operator-5b5465788b-ghb25      1/1     Running   0          5m53s
```

### Configure the Entando Application
1. Download the template `entando-app.yaml`.
```sh
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/samples/entando-app.yaml"
```

2. Edit `entando-app.yaml` and set `YOUR-HOST-NAME` to use the nginx address from above. See [this page](../../docs/consume/custom-resources.md#entandoapp) for details on other `EntandoApp` options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```

## Deploy your Entando Application
1. You can now deploy your application to Amazon EKS with this command:
```
kubectl apply -n entando -f entando-app.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods with:
```sh
kubectl get pods -n entando --watch
```
3. Once all the pods are in a running state, access the Entando App Builder at the following `YOUR-HOST-NAME/app-builder`.

```
http://YOUR-HOST-NAME/app-builder/
```

Congratulations! To continue your journey on Entando, see the [Getting Started guide](../../docs/getting-started/#log-in-to-entando) for helpful login instructions and next steps.

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
For more details and troubleshooting, see [Create a kubeconfig for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html).
