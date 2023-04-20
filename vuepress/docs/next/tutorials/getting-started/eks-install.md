---
sidebarDepth: 2
---

# Installation on Amazon Elastic Kubernetes Service (EKS)

This tutorial walks you through installing the Entando Platform in an EKS cluster. The steps are:

- [Configure an IAM Role](#configure-an-identity-and-access-management-iam-role) to allow Kubernetes to manage the cluster
- [Create the EKS cluster](#create-the-eks-cluster)
- [Install NGINX](#install-the-nginx-ingress-controller) as an ingress controller 
- [Install the Entando Custom Resources](#install-the-entando-custom-resources)
- [Configure the Entando Application](#configure-the-entando-application)
- [Deploy the Entando Application](#deploy-your-entando-application)

If you're already comfortable setting up an EKS cluster and installing NGINX, then you may be able to skip to [setting up Entando](#install-the-entando-custom-resources).

## Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/)
- AWS account
- kubectl

## Create and Connect to the EKS Cluster 
These steps use the AWS console to create the cluster. Experienced AWS users may choose to use the equivalent CLI commands.

### Configure an Identity and Access Management (IAM) Role
1. [Login to AWS](http://console.aws.amazon.com/) as a non-`super admin` user
   - It is not recommended to use a `super admin` account since clusters created that way may have restrictions that complicate your installation.
   - The user account needs access to EKS and the minimum permissions to create a cluster, including the ability to view/update add-ons for the cluster. You may need additional policies for Amazon Route 53 or other services, depending on your configuration.

2. Create an IAM role for the cluster so that EKS can provision assets 
   1. From Services, `IAM` → `Create Role`
   2. Select `AWS Service` for the type of trusted entity
   3. Click `EKS` from the `Use cases`
   4. Check `EKS - Cluster`
   5. Click `Next`
   6. Verify that the `AmazonEKSClusterPolicy` is set
   7. Click `Next`
   8. Name your role (you’ll need this later), e.g. YOUR-EKS-ROLE 
   9. Click `Create role`

3. Refine the role to enable `Node Group` management and add Elastic Load Balancing (ELB) access so the cluster can deploy the load balancer for NGINX
   1. Go to `IAM` → `Roles` → `YOUR-EKS-ROLE`
   2. Under `Add permissions`, click `Attach policies`
   3. Find each of these named policies and then click `Attach policies` \
      `AmazonEKSWorkerNodePolicy` \
      `AmazonEKS_CNI_Policy` \
      `AmazonEC2ContainerRegistryReadOnly` \
      `ElasticLoadBalancingFullAccess`
    4. Go to `Trust Relationships` → `Edit trust policy` → `Add new statement`. Add `ec2.amazonaws.com` so the cluster can manage the EC2 resources.
```yaml
   {
      "Sid": "Statement1",
      "Effect": "Allow",
      "Principal": {
          "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
   }
```

Go to [Identity Management and Access on EKS](https://docs.aws.amazon.com/eks/latest/userguide/security-iam.html) for more details on roles.

### Create the EKS Cluster
1. Go to `Services` and select `Elastic Kubernetes Service`
2. Click `Add cluster` → `Create`
3. Set a unique name for the cluster, e.g. YOUR-CLUSTER-NAME
4. Select an [Entando-compatible Kubernetes version](https://www.entando.com/page/en/compatibility-guide), e.g. `1.23`
5. For `Cluster Service Role`, select the role you created above, e.g. YOUR-EKS-ROLE
6. Click `Next`
7. Use the defaults for the following steps (networking, logging, add-ons, etc.) and click `Next` for each.
8. Review your settings and then click `Create`. Cluster provisioning may take several minutes.

See [Creating an Amazon EKS Cluster](https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html) for more detailed information.

### Add a Node Group to the Cluster
1. Go to `Services` → `Elastic Kubernetes Service` → `Clusters` and select YOUR-CLUSTER-NAME
2. Go to `Compute`
3. Click `Add Node Group` and supply the following fields
   * `Name`: Give your group a name, e.g. YOUR-NODE-1
   * `Node IAM Role`: Select the cluster role you created above, e.g. YOUR-EKS-ROLE. If the role doesn't appear, verify that you modified the trust policy as noted above.
   * Click `Next`
4. Review the `Node Group compute configuration`. These AWS defaults will work fine:
   * AMI type: `Amazon Linux 2`
   * Instance type: `t3.medium`
5. Set the `Maximum size` to `5`. This is over-resourced for a Getting Started instance but offers capacity for adding microservices to your cluster without modifying the Node Group.
   * Click `Next`
6. For `Node Group network configuration`, the subnets should already be set up and selected
7. Select `Configure SSH access to nodes`. Follow the links to create a new SSH key pair if you don't already have one.
8. Select `All` to allow all source IPs
9. Click `Next`
10. Review your settings and then click `Create`. It may take a few minutes for the Node Group to be created.

### Add the EBS CSI Add-on
Starting with K8s 1.23, EKS requires an add-on in order to enable persistent volumes. The following instructions are for EBS CSI. See [the EBS CSI guide](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html), especially [the instructions for creating the IAM Role](https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html) for additional information.

1. Determine the OpenID Connect provider URL for the cluster by going to `Clusters` → YOUR-CLUSTER-NAME → `Overview`. It will be similar to this: 
```
https://oidc.eks.us-east-1.amazonaws.com/id/1C39B525EC0971750179719649SAMPLE
```

2. Follow [the AWS instructions](https://docs.aws.amazon.com/eks/latest/userguide/csi-iam-role.html) to prepare the IAM role required for the EBS CSI Add-on to function correctly. You will need to set up a new role using an OpenID Connect Identity Provider based on the OIDC URL from the previous step.
3. Add the EBS CSI Driver to your cluster by going to `EKS` → `Clusters` → YOUR-CLUSTER-NAME → `Add-ons` → `Get More add-ons`
4. Select `Amazon EBS CSI Driver`
5. For `Service Account Role`, leave "inherit from node"
6. Click `Next` and then `Create`
7. (Optional) The [EBS CSI guide](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) includes instructions for deploying a sample app to make sure the add-on is able to manage persistent volumes. This can be a useful check if storage timeouts occur when the Entando deployments start up.  

### Connect to the Cluster
1. *Note:* If this is a brand new setup, you will need to configure the AWS CLI using your user account. You'll need to provide your Access Key ID, Secret Key, and Region.
```sh      
aws configure
```
2. Set up your Kubernetes context
```sh
aws eks --region YOUR-REGION-CODE update-kubeconfig --name YOUR-CLUSTER-NAME
```
For example: `aws eks --region us-east-2 update-kubeconfig --name cluster-1`. More details and troubleshooting can be found in [the EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html).

3. Your current context should now be configured for your AWS cluster. Run the command below to check.
```sh
kubectl config current-context
```
Your output should look something like this: `arn:aws:eks:us-east-2:483173223614:cluster/cluster-1`

### Install the NGINX Ingress Controller
Add the NGINX controller for the ingress. This step relies on your role having permissions for Elastic Load Balancing (ELB).

1. Create the NGINX ingress controller
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.5.1/deploy/static/provider/aws/deploy.yaml
```
2. Get the ELB external URL for your NGINX install
```sh
kubectl get services -n ingress-nginx
```

For example:
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP                        
ingress-nginx-controller             LoadBalancer   10.100.102.83    ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com
```
The value of the external URL (EXTERNAL-IP) should be available within a few minutes. You'll use this address for YOUR-HOST-NAME in the steps below.

::: tip
NGINX is working correctly if a `404 Not Found` NGINX error page is generated when accessing `http://YOUR-HOST-NAME` from your browser. For a more complete test, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::

See the [NGINX AWS Guide](https://kubernetes.github.io/ingress-nginx/deploy/#aws) and [NGINX EKS Guide](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/) for more details.

### Install the Entando Custom Resources

1. Apply the cluster-scoped custom resource definitions (CRDs). This is required only once per cluster.

<EntandoCode>kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
</EntandoCode>

2. Create the namespace for the Entando Application
```sh
kubectl create namespace entando
```
3. Download the `entando-operator-config` template so you can configure the [Entando Operator](../consume/entando-operator.md). 

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v71 }}/dist/ge-1-1-6/samples/entando-operator-config.yaml"</EntandoCode>

4. Edit the `entando-operator-config.yaml` to set `data/entando.requires.filesystem.group.override: "true"`
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

2. Edit `entando-app.yaml` and replace YOUR-HOST-NAME with the NGINX address from above. See the [Custom Resources overview](../../docs/reference/entandoapp-cr.md) for details on other `EntandoApp` options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```

## Deploy your Entando Application
1. You can now deploy your application to your EKS cluster
```
kubectl apply -n entando -f entando-app.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods warming up with this command:
```sh
kubectl get pods -n entando --watch
```
Use `Ctrl+C` to exit the command.

3. Once all the pods are in a running state, access the Entando App Builder at the following address:
```
http://YOUR-HOST-NAME/app-builder/
```
Congratulations! To continue your journey with Entando, see the [Getting Started guide](../../docs/getting-started/#login-to-entando) for helpful login instructions and next steps.

## Appendix A - Troubleshooting
IAM and Roles
- [Installing aws-iam-authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)
- [AccessDenied error during AssumeRole operation](https://stackoverflow.com/questions/56863539/getting-error-an-error-occurred-accessdenied-when-calling-the-assumerole-oper)

NGINX
- [Using NGINX as the ingress controller on EKS](https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/)

For more details and troubleshooting, see [Create a kubeconfig for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html).
