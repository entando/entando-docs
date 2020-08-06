---
sidebarDepth: 2
---

# EKS Notes For installing Entando

## Prerequisites

- aws cli
- aws account
- kubectl
- A domain or the ability to purchase one. Can use route 53 for this inside aws if doing it all inline
- helm2 client

## Overview

The steps below walk you though installing the Entando platform in an EKS cluster. Generally the steps are:

  - Create an EKS cluster with 5 nodes (to allow expansion for microservices)
  - Update the cluster role to allow ELB access for ingress
  - Install nginx as an ingress controller in the cluster
  - Register a domain (if you don't already have one)
  - Install Entando
  - Route traffic to your application

If you're already comfortable setting up an EKS cluster and installing nginx then you may be able to skip to step 10.

## Steps
These steps will use the AWS console to create the cluster. If you’re already familiar with creating an EKS cluster and assigning nodes to it via the AWS cli then you can use the cli process for cluster creation as well.

1. Login to AWS as a non-super admin user
    - If you don’t have a user besides the super admin it is recommended that you create one. Clusters created using the super admin for your account will have some restrictions that may complicate your installation.
    - Your user will need access to EKS and at least the ability to create a cluster. You may need additional policies for Route53 and other services depending on your exact configuration.
2. Create an IAM role for the cluster so that AWS can provision assets. See <https://docs.aws.amazon.com/eks/latest/userguide/worker_node_IAM_role.html> for more details.
    - Select `IAM` from services
    - Select `Create role`
    - Select `AWS Service` box at the top for the type of trusted entity
    - Click `EKS` from the main list
    - Click `EKS - Cluster` under `Select your use case`
    - Click `Next:Permissions`
    - A Policy of `AmazonEKSClusterPolicy` should already be present
    - Click `Next: Tags`
    - (Optional) Add tags if you want
    - Click `Next: Review`
    - Name your role (you’ll need this later), e.g. `my-eks-role`
3. Refine the role to enable Nodegroup management and to add ELB access so that the cluster can deploy a load balancer for nginx.
    - Go to `IAM -> Roles -> your role`. 
    - Under permissions click `Attach policies`
    - Add a policy of `AmazonEKSWorkerNodePolicy`
    - Add a policy of `AmazonEKS_CNI_Policy`
    - Add a policy of `AmazonEC2ContainerRegistryReadOnly`
    - Add a policy of `ElasticLoadBalancingFullAccess`
4. Go to `Services` and select `Elastic Kubernetes Service`
5. Create an EKS Cluster
    - Add a cluster name (e.g. `cluster-1`) and click `Create EKS cluster`
    - For `Cluster Service Role`, select the role you created above, e.g. `my-eks-role`. If you choose a different role it must have ELB permissions so the cluster can create a load balancer in `Networking` (Step 2).
    - Click `Next`
    - Use the defaults for `Networking` (Step 2) and click `Next`
    - Use the defaults for `Configure Logging` (Step 3) and click `Next`.
    - Review your settings and then click `Create`. Cluster provisioning usually takes between 10 and 15 minutes.
    - See <https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html> for more information on cluster creation.
    
6. Add a node group to the cluster
    - Go to `Services` -> `Elastic Kubernetes Service` -> `Clusters` -> Click on your cluster name.
    - Go to the `Compute` tab
    - Click `Add Node Group`
    - `Name`: give your group a name, e.g. `node-1`
    - `Node IAM Role`: Select your role from above. If the role doesn't appear, verify that you added the extra policies to the role.
    - `Subnets` - VPC subnets should already be setup and selected.
    - (Optional) Select `Allow remote access to nodes`.  Follow the links to create a new SSH key pair if you don't already have one.
    - Click `Next`
    - AMI type: `Amazon Linux 2`
    - Instance type: `t3.medium`
    - Click `Next`
    - Set `Maximum size` to 5. This will be over-resourced for a `Getting Started` experience but will leave capacity for adding microservices to your cluster without modifying the Nodegroup.
    - Click `Next`
    - Review your settings and then click `Create`
7. Connect kubectl to the cluster
    - *Note:* If this is a brand new setup you will need to login using the user you used to create your cluster in the console in the steps above. Make sure the users match.
       - ```aws-configure``` (and then provide the Access key, etc.)
    - ```aws eks --region region-code update-kubeconfig --name cluster_name```
    - More details and troubleshooting <https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html>
    - Your current context should now be configured for your AWS cluster:
```
    $  kubectl config current-context
    arn:aws:eks:us-east-2:483173223614:cluster/cluster-1
```

8. Add nginx controller for ingress. This depends on your role having permissions for ELB.
    - For basic nginx ingress install run this command 
```
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/aws/deploy.yaml
``` 
   - See <https://kubernetes.github.io/ingress-nginx/deploy/#aws> for more information.
   - For more detailed install steps see <https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/>
9. Get the ELB external URL for your nginx install
    - Run: ```kubectl get services -n ingress-nginx```
    - Get the value of the external address (EXTERNAL-IP) for the ingress-nginx-controller:
```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP                                                                     PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.100.102.83    ad234bd11a1ff4dadb44639a6bbf707e-0e0a483d966405ee.elb.us-east-2.amazonaws.com   80:30588/TCP,443:31923/TCP   2m11s
```    
        
10. Determine the domain to use for your cluster.
    - *Option 1*. Use a domain you already have available. You'll need to route traffic on that domain to the external cluster address noted in step 9.
    - *Option 2*. Register a domain in route 53.
    - The goal here is to provide a way to route wildcard traffic to the different parts of the apps and this can’t be done directly on the name for the ELB.
    - If you register a new domain use `nslookup` or `dig` to make sure the dns has propagated. This can take some time.
11. If you chose a Option 2 in step 10, add wildcard dns resolution in route 53 to the ELB address attached to nginx above. The wildcard can be wherever you want if you want to put this on a dedicated subdomain.
>Note: The value in your A record will automatically include dualstack. This allows the ELB to server both IPV4 and IPV6 traffic

12. Download the Custom Resource Definitions (CRDs) and unpack them

```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.2.0/dist/qs/custom-resources.tar.gz | tar -xz
```

13. Install the Entando CRDs.
    - Once per cluster you need to deploy the Entando Custom Resources.
    - Deploy the CRDs ```sudo kubectl create -f dist/crd```
14. Download and unpack the entando-helm-quickstart release you want to use from here: https://github.com/entando-k8s/entando-helm-quickstart/releases.

```
curl -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/v6.2.0/dist/qs/entando.yaml
```

15. See the included README file for more information on the following steps.
16. Edit values.yaml in the root directory:
    - Set ```supportOpenshift: false```
16. Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the URL of the domain you setup above
17. For example: `ENTANDO_DEFAULT_ROUTING_SUFFIX: entando-aws-test.org` if your domain is entando-aws-test.org
18. If not already present, set these values to utilize nginx as the ingress controller and file system groups for persistent volume access:
    - `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
    - `ENTANDO_INGRESS_CLASS: "nginx"`
    - You can also disable the operator limit checking with this setting: `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS: "false"`

19. Create the Entando namespace: ```kubectl create namespace entando```
20. Run helm to generate the template file:

```
helm template my-eks-app --namespace=entando ./ > my-eks-app.yaml
```
21. Deploy Entando via `kubectl create -f my-eks-app.yaml`
22. Watch Entando startup `kubectl get pods -n entando --watch`
23. Check for the Entando ingresses using `kubectl describe ingress -n entando`
24. Access your app on the url for the ingress of the app builder

## Troubleshooting
IAM And Roles
- <https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html>
- <https://stackoverflow.com/questions/56863539/getting-error-an-error-occurred-accessdenied-when-calling-the-assumerole-oper>

NGINX
- <https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/>
- Issue with permissions for NGINX ingress:
```
 Warning  SyncLoadBalancerFailed   38m                 service-controller  (combined from similar events): Error syncing load balancer: failed to ensure load balancer: error creating
```