# Entando 6 GCP Installation Instructions

## Prerequisites

- Google cloud account (http://cloud.google.com/)
- gcloud command line tool
-- Download here: https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version)
- kubectl command line tool locally installed (recommended but optional if using Cloud Shell)

## Cluster Setup

These steps only need to be completed once per cluster.

### Setup and Connect to the Cluster

1. Login to your GCP account https://cloud.google.com/
2. In the upper left corner select the menu item and select Kubernetes Engine
3. Select Clusters
4. Select Create Cluster
5. Enter a name and select a Location type
  - These settings are up to you. The defaults are fine for an initial test
6. Leave the master version on the default (1.14.10-gke.36)
7. On the left menu select “default-pool”
8. Under Size set the number of nodes entry to 5  (see cluster sizing in Appendix A for details)
9. Select Create
10. Wait for the cluster to initialize. This will take a few minutes. There will be a green checkmark when complete
11. From the Clusters page in the Kubernetes Engine hit the Connect button
12. Copy the provided command and execute in your local environment to connect your local kubectl to your GKE cluster.
    - You can also run the commands in this guide in Cloud Shell if you prefer.
13. Run kubectl get namespaces to make sure you connected and you should see the default kubernetes namespaces in the result

### Install Nginx Ingress Controller

Out of the box Entando isn’t compatible with the default ingress controller provided in GKE. See here for more if you’re interested in GKE ingress: https://cloud.google.com/kubernetes-engine/docs/concepts/ingress

We’re going to install the Nginx ingress controller to manage the ingress for Entando services deployed by the operator. This will be a simpler and more adaptable configuration for most users and environments. Users who really need the GCE ingress controller (rare) could integrate it following the instructions provided by GKE and then customize the service definition created by the Entando operator.

Make sure you’re connected to your cluster with kubectl from the instructions above.

1. Follow the instructions here: https://cloud.google.com/community/tutorials/nginx-ingress-gke

   - Note that you will have RBAC enabled in a default cluster installation
   - We recommend deploying the provided hello-app example application to your cluster as well as the ingress for the app to ensure that your ingress controller is correctly configured
2. Note the external IP address of the load balancer on your ingress controller (you’ll need it for the application configuration)

The Entando deployment exposes an environment variable to set the ingress controller to be used as part of the deployment. That variable is `ENTANDO_INGRESS_CLASS` and should be set to `nginx` in deployments to GKE (this is documented in the application instructions below as well)

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the Entando Custom Resources. Make sure you’re connected to your cluster with kubectl from the instructions above

1. Download the custom model for the appropriate release: https://github.com/entando-k8s/entando-k8s-custom-model/releases/tag/v6.1.5
  - Note: Any version later than 6.1.5 will work for deployment on GKE
2. Unzip the archive to a location of your choice
3. On the command line go to the crd folder: cd src/main/resources/crd/
4. Deploy the CRDs with: `kubectl create -f .`

## Deploy Your Entando Application
Once the cluster setup steps above have been completed you can deploy your Entando applications to GKE.

### Setup and Deploy

1. Download the entando-helm-quickstart release
  - TODO: For internal purposes we’ll use master. Once we’re happy with it and ready to send externally we can update this to use a release tag
https://github.com/entando-k8s/entando-helm-quickstart
2. In values.yaml set  `supportOpenshift: false`
3. In values.yaml set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the IP value of your `nginx` controller plus .nip.io
  - For example: `ENTANDO_DEFAULT_ROUTING_SUFFIX: 35.223.161.214.nip.io`
  - We’re using nip.io because we need wildcard dns address resolution however nip.io is not required. If your enterprise has a different internal dns resolution scheme for development instances you can use that or other alternative dns services like xip.io.
4. In values.yaml if not already present add environment variables under env to utilize nginx as the ingress controller and file system groups for persistent volume access. The two environment variables to set are:
  - `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
  - `ENTANDO_INGRESS_CLASS: "nginx"`

### Quickstart with Embedded Databases
The lightest weight and fastest to deploy option for evaluation and getting started uses embedded databases for the application and Keycloak.
To deploy quickstart with embedded databases at the top of values.yaml add `dbms: none` under the app section in the file. See Appendix B for an example.

### External Database
You can also use an external database instance for your application. This is recommended for projects that will be developed for delivery to customers or stakeholders. Any dbms that is reachable from the cluster can be used.

#### Example: Deploy Postgres to a Namespace on Your Cluster
These instructions will deploy a postgres instance to a namespace in your kubernetes cluster.

https://github.com/GoogleCloudPlatform/postgresql-docker/blob/master/9/README.md#run-a-postgresql-server-kubernetes

 - Note: If deployed this way the address you use for the database in the helm template must be a full address rather than an IP address alone. Use the database IP plus nip.io for a dev instances

Once deployed you can use the external database instructions TODO to connect your Entando application to your instance

#### Connect CloudSQL to GKE

- This link describes creating a PG instances using the GCP Cloud SQL
   - https://cloud.google.com/sql/docs/postgres/create-instance
- Connecting from GKE to Cloud SQL
   - https://cloud.google.com/sql/docs/postgres/connect-kubernetes-engine


## Appendix A - Cluster Sizing
In the cluster setup instructions you set the number of nodes in your cluster to 5. This setting assumes the default node type with a single VCPU per instance and 3.8 GB of RAM. The kubernetes system and nginx will request approximately 1 CPU in total. The Entando application will deploy on the remaining 4. This configuration is suitable for a development team but may need to be expanded as microservices are added to the architecture.

If you’re running other applications (like a postgres instance) in your cluster you may need more nodes.

### Updating the Nodes in Your Cluster
1. Select Kubernetes Engine from the left nav in GCP
2. Select Clusters
3. Hit the Edit button (pencil on the right)
4. Scroll to bottom
5. Click the link labeled default-pool
6. Edit button at the top
7. Change the nodes to the number you'd like to include
8. Save
9. Wait until updated on clusters page (green checkmark on cluster)

## Appenix B - Example values.yaml file for Helm Quickstart

In the example below the application will deploy with embedded databases and will use `nginx` as the ingress controller. Replace `<your-nginx-ip>` with the ip address where your `nginx` instance is exposed on your cluster.

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
   ENTANDO_DEFAULT_ROUTING_SUFFIX: <your-nginx-ip>.nip.io
   ENTANDO_POD_READINESS_TIMEOUT_SECONDS: "1000"
   ENTANDO_POD_COMPLETION_TIMEOUT_SECONDS: "1000"
   ENTANDO_DISABLE_KEYCLOAK_SSL_REQUIREMENT: "true"
   ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"
   ENTANDO_INGRESS_CLASS: "nginx"
   ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS: "false"
 tls:
   caCrt:
   tlsCrt:
   tlsKey:
deployPDA: false

```
