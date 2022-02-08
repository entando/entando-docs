---
sidebarDepth: 2
redirectFrom: /v6.3.2/tutorials/devops/installation/elastic-kubernetes-service/eks-install.html
---

# Installation on Amazon Elastic Kubernetes Service (EKS)

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/)
- AWS account
- kubectl
- helm3 client

## Overview

The steps below walk you though installing the Entando platform in an EKS cluster. Generally the steps are:

- Configure an IAM role to allow kubernetes to manage the cluster
- Create an EKS cluster with 5 nodes (to allow expansion for microservices)
- Install NGINX as an ingress controller in the cluster
- Install Entando

If you're already comfortable setting up an EKS cluster and installing NGINX then you may be able to skip to [setting up Entando](#install-the-entando-custom-resource-definitions-crds).

## Cluster Setup
These steps will use the AWS console to create the cluster. If you’re already familiar with creating an EKS cluster and assigning nodes to it via the AWS cli then you can use the cli process for cluster creation as well.

### Setup and Connect to the Cluster
1. Login to AWS as a non-super admin user
   - If you don’t have a user besides the super admin it is recommended that you create one. Clusters created using the super admin for your account will have some restrictions that may complicate your installation.
   - Your user will need access to EKS and at least the ability to create a cluster. You may need additional policies for Route53 and other services depending on your exact configuration.
2. Create an IAM role for the cluster so that AWS can provision assets. See <https://docs.aws.amazon.com/eks/latest/userguide/worker_node_IAM_role.html> for more details.
   - Go to `IAM → Roles → Create Role`
   - Select `AWS Service` for the type of trusted entity
   - Click `EKS` from the main list
   - Click `EKS - Cluster` under `Select your use case`
   - Click `Next: Permissions`
   - A Policy of `AmazonEKSClusterPolicy` should already be present
   - Click `Next: Tags`
   - (Optional) Add tags if you want
   - Click `Next: Review`
   - Name your role (you’ll need this later), e.g. `my-eks-role`
3. Refine the role to enable Node Groups management and to add ELB access so that the cluster can deploy a load balancer for NGINX.
   - Go to `IAM → Roles → my-eks-role`
   - Under Permissions click `Attach policies`
   - Add a policy of `AmazonEKSWorkerNodePolicy`
   - Add a policy of `AmazonEKS_CNI_Policy`
   - Add a policy of `AmazonEC2ContainerRegistryReadOnly`
   - Add a policy of `ElasticLoadBalancingFullAccess`
   - Under Trust Relationships click `Edit trust relationship`. Add `ec2.amazonaws.com` so the cluster can manage the EC2 resources. 
```
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
```
4. Go to `Services` and select `Elastic Kubernetes Service`
5. Create an EKS Cluster
   - Add a cluster name (e.g. `cluster-1`) and click `Create EKS cluster`
   - Select an [Entando-compatible Kubernetes version](https://www.entando.com/page/en/compatibility-guide), e.g. `1.20`
   - For `Cluster Service Role`, select the role you created above, e.g. `my-eks-role`. If you choose a different role it must have ELB permissions so the cluster can create a load balancer in `Networking`.
   - Click `Next`
   - Use the defaults for `Networking` and click `Next`
   - Use the defaults for `Configure Logging` and click `Next`.
   - Review your settings and then click `Create`. Cluster provisioning usually takes between 10 and 15 minutes.
   - See <https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html> for more information on cluster creation.
6. Add a Node Group to the cluster
   - Go to `Services → Elastic Kubernetes Service → Clusters` and click on your cluster name.
   - Go to `Configuration` and the `Compute` tab
   - Click `Add Node Group`
   - `Name`: give your group a name, e.g. `node-1`
   - `Node IAM Role`: Select the cluster role you created above. If the role doesn't appear, verify that you added the extra policies to the role.
   - Click `Next`
   - Review the Compute and Scaling configuration. Typically the AWS defaults should work.
   - AMI type: `Amazon Linux 2`
   - Instance type: `t3.medium`
   - Review the Node Group scaling configuration 
   - Set `Maximum size` to 5. This will be over-resourced for a `Getting Started` experience but will leave capacity for adding microservices to your cluster without modifying the Nodegroup.
   - Click `Next`
   - Review the Node Group network configuration.  
   - `Subnets` - VPC subnets should already be setup and selected.
   - Select `Configure SSH access to nodes`.  Follow the instructions to create a new SSH key pair if you don't already have one.
   - Select `All` to allow all source IPs to access the nodes, or to set your own restrictions via Selected Security Groups.  
   - Click `Next`
   - Review your settings and then click `Create`. It may take a few minutes for the node to be created.
7. Connect `kubectl` to the cluster
   - *Note:* If this is a brand new setup you will need to login using the user you used to create your cluster in the console in the steps above. Make sure the users match.
      - ```aws-configure``` (and then provide the Access key, etc.)
   - Setup your kube context via ```aws eks --region region-code update-kubeconfig --name cluster_name```, e.g. ```aws eks --region us-east-2 update-kubeconfig --name cluster-1```
   - More details and troubleshooting <https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html>
   - Your current context should now be configured for your AWS cluster. Run the command below to check:
    ```sh
    kubectl config current-context
    ```
   Your output should look something like this:
    ```
    arn:aws:eks:us-east-2:483173223614:cluster/cluster-1
    ```

### Install the NGINX Ingress Controller
1. Add the NGINX controller for ingress. This depends on your role having permissions for ELB.
   - For basic NGINX ingress install run this command
    ```sh
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.2/deploy/static/provider/cloud/deploy.yaml
    ```
   - See <https://kubernetes.github.io/ingress-nginx/deploy/#aws> as well as [this](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/) for more detailed install steps.
2. Get the ELB external URL for your NGINX install
   - Run: ```kubectl get services -n ingress-nginx```
   - Get the value of the external address (EXTERNAL-IP) for the ingress-nginx-controller:
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP                        
ingress-nginx-controller             LoadBalancer   10.100.102.83    ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com
```

### Verify the NGINX Ingress Install
We recommend verifying NGINX is working correctly. The simplest option is to access the EXTERNAL-IP in your browser. You should get a `404 Not Found` NGINX error page. Alternatively you can set up a simple test application. See [this page](./gke-install#verify-the-nginx-ingress-install) for those steps. You can use your local `kubectl` for that work.

There are situations where the default NGINX ingress configuration doesn't work well for Entando and must be customized. Refer to the [Development Tips and Tricks](../../docs/reference/local-tips-and-tricks.md#customizing-nginx) page for more information.
### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`.
1. Download the Custom Resource Definitions (CRDs) and deploy the cluster scoped resources
```sh
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```
Next you can create a namespace for the Entando Application.

2. Create the namespace
```sh
kubectl create namespace entando
```
3. Install the namespace scoped resources
```sh
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```
If you run `kubectl -n entando get pods`, you'll see the Entando operator is now running.

## Deploy Your Entando Application
You can now deploy your application to Amazon EKS.
1. Download and unpack the `entando-helm-quickstart` release:
```sh
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
- See the included README file for more information on the following steps.
2. Go to the downloaded directory
```sh
cd entando-helm-quickstart-6.3.2
```
3. Edit `sample-configmaps/entando-operator-config.yaml` and add the following settings in the data section
```yaml
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```  
4. Now create the ConfigMap for the operator
```sh
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando
```
5. Next, in `values.yaml` in the root directory set the following value:
   - Set `singleHostName` to the value of the `EXTERNAL-IP` of your `ingress-nginx-controller`:
      - For example: `singleHostName: ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com`
6. Run helm to generate the template file:
```sh
helm template my-eks-app -n entando ./ > my-eks-app.yaml
```
7. Deploy Entando via this command
```sh
kubectl apply -n entando -f my-eks-app.yaml 
```
8. Watch Entando startup `kubectl get pods -n entando --watch`. It can take around 10 minutes before the application is fully deployed and ready.
9. Check for the Entando ingresses using `kubectl describe ingress -n entando`
10. Access your app using the URL for the ingress of the App Builder. This will be the URL of your load balancer, followed by `/app-builder/` or `/entando-de-app/` for the deployed application, e.g. `http://ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com/app-builder/`

See the [Getting Started guide](../../docs/getting-started/#log-in-to-entando) for helpful login instructions and next steps.

## Appendix A - Troubleshooting
IAM and Roles
- <https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html>
- <https://stackoverflow.com/questions/56863539/getting-error-an-error-occurred-accessdenied-when-calling-the-assumerole-oper>

NGINX
- <https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/>
- Issue with permissions for NGINX ingress:
```
 Warning  SyncLoadBalancerFailed   38m                 service-controller  (combined from similar events): Error syncing load balancer: failed to ensure load balancer: error creating
```
