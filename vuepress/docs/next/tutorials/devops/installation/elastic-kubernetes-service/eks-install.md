
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

## Steps
These steps will use the AWS console to create the cluster. If you’re already familiar with creating an EKS cluster and assigning nodes to it via the AWS cli then you can use the cli process for cluster creation as well.

1. Login to AWS as a non-super admin user
  - If you don’t have a user besides the super admin it is recommended that you create one. Clusters created using the super admin for your account will have some restrictions that may complicate your installation
2. Create an IAM role for the cluster so that AWS can provision assets
  - Select IAM from services
  - Select Create role
  - Select AWS Service box at the top
  - Click EKS from the main list
  - Click EKS - Cluster under Select your use case
  - A Policy of AmazonEKSClusterPolicy should already be present
  - Click Next: Tags
  - Add tags if you want (not required)
  - Click Next: Review
  - Name your role (you’ll need this later)
3. Add ELB access to your role so that the cluster can deploy a load balancer for nginx later on
  - Go back to the main IAM page
  - Select your role
  - Under permissions click Attach policies
  - Add a policy of `ElasticLoadBalancingFullAccess`
4. Select Elastic Kubernetes Service from Services
5. Click Create cluster
  - https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
  - Cluster provisioning usually takes between 10 and 15 minutes.
  - Pick the role above. If you create a new role note what it is. You have to assign ELB permissions to it so that the cluster can create a load balancer for nginx in step 2
6. Add a node group to the cluster
  - Click cluster name
  - Click add node group
  - You should already have an eks-work role and VPC setup but if not create them using the links on the page
  - You may also need to create a new ssh key-pair if you want to enable remote access to your nodes
  - Name your node group
  - Add 5 t3.medium nodes running Amazon Linux. This will be over resourced for a getting started experience but will allow you to scale to microservices in your cluster
7. Connect kubectl to the cluster

> Note If this is a brand new setup you will need to login using the user you used to create your cluster in the console in the steps above. Make sure the users match

  - aws eks --region region-code update-kubeconfig --name cluster_name
  - More details and troubleshooting https://docs.aws.amazon.com/eks/latest/userguide/create-kubeconfig.html

8. Add nginx controller for ingress (make sure the role has permissions for ELB)
  - Basic install run this command kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/aws/deploy.yaml
https://kubernetes.github.io/ingress-nginx/deploy/#aws
  - More detailed install https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/
9. Get the ELB URL for your nginx install
  - Run: kubectl get services -n ingress-nginx
  - Get the value of external IP
10. Register a domain in route 53 (or have one already from somewhere else)
  - Need a way to route wildcard traffic to the different parts of the apps and you can’t do it directly on the name for the ELB
  - If you register a new domain use nslookup or dig to make sure the dns has propagated. Can take some time
11. Add wildcard dns resolution in route 53 to the ELB address attached to nginx from the steps above above (the wildcard can be wherever you want if you want to put this on a dedicated subdomain.)
>Note: The value in your A record will automatically include dualstack. This allows the ELB to server both IPV4 and IPV6 traffic

12. Download the crds and unpack them
> Note: Any version later than 6.1.5 will work for deployment on EKS

```
curl -sfL https://github.com/entando-k8s/entando-k8s-custom-model/archive/v6.1.5.tar.gz | tar xvz
```

13. Install the Entando Custom Resource Definitions (CRDs)
  - Once per cluster you need to deploy the Entando Custom Resources.
  - cd entando-k8s-custom-model-6.1.5
  - Deploy the CRDs: kubectl create -f src/main/resources/crd/
14. Download and unpack the entando-helm-quickstart release you want to use from here: https://github.com/entando-k8s/entando-helm-quickstart/releases.

TODO TODO

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.2.0-sprint4-rc.tar.gz | tar xvz
```

15. See the included README file for more information on the following steps.
16. Edit values.yaml in the root directory:
  - Set supportOpenshift: false
16. Set ENTANDO_DEFAULT_ROUTING_SUFFIX to the URL of the domain you setup above
17. For example: ENTANDO_DEFAULT_ROUTING_SUFFIX: entando-aws-test.org
18. If not already present, set these values to utilize nginx as the ingress controller and file system groups for persistent volume access:
  - `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
  - `ENTANDO_INGRESS_CLASS: "nginx"`
  - You can also disable the operator limit checking with this setting: `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS: "false"`

19. Create the Entando namespace: kubectl create namespace entando
20. Run helm to generate the template file:

```
helm template my-eks-app --namespace=entando ./ > my-eks-app.yaml
```
21. Deploy Entando via `kubectl create -f my-app.yaml`
22. Watch Entando startup `kubectl get pods -n entando --watch`
23. Check for the Entando ingresses using `kubectl describe ingress -n entando`
24. Access your app on the url for the ingress of the app builder


## Troubleshooting
IAM And Roles
https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html
https://stackoverflow.com/questions/56863539/getting-error-an-error-occurred-accessdenied-when-calling-the-assumerole-oper
nginx
https://docs.nginx.com/nginx/deployment-guides/amazon-web-services/ingress-controller-elastic-kubernetes-services/
Issue with permissions for NGINX ingress:
 Warning  SyncLoadBalancerFailed   38m                 service-controller  (combined from similar events): Error syncing load balancer: failed to ensure load balancer: error creating
