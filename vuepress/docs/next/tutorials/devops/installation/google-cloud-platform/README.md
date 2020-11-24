---
sidebarDepth: 2
---

# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com/>
- Install these tools locally if you're not using the Google Cloud Shell steps below:
    - [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) including gcloud
    - `kubectl` command line tool

## Cluster Setup

These steps only need to be completed once per cluster.

### Setup and Connect to the Cluster

1. Login to your Google Cloud account: <https://cloud.google.com/>
2. Go to `Kubernetes Engine → Clusters → Create Cluster`
3. Enter a name and select a `Location type`
   - The `Location type` settings are up to you. The defaults are fine for an initial test.
4. Leave the `Master version` on the default (e.g. `1.14.10-gke.36`)
5. On the left menu select `default-pool`
6. Under `Size` set the `Number of nodes` entry to 5.  (See [Appendix A](#appendix-a-cluster-sizing) for details.)
7. Click `Create`
8. Wait for the cluster to initialize. This will take a few minutes. There will be a green check mark when complete.
9. Click `Connect` for your new cluster.
10. Click `Run in Cloud Shell`
    - Alternatively, copy the provided command and execute it in your local environment to connect your local `kubectl` to your GKE cluster.
11. Run `kubectl get namespaces` to verify your connection:
```
a_user@cs-6000-devshell-vm-c34ef644-5584-4c5d-aa14-6e41af4a5c9a:~$ kubectl get namespaces
NAME              STATUS   AGE
default           Active   6m11s
kube-node-lease   Active   6m12s
kube-public       Active   6m12s
kube-system       Active   6m13s

```

### Install the NGINX Ingress Controller

Entando isn’t compatible out of the box  with the default ingress controller provided in GKE.
See here for more if you’re interested in GKE ingress: <https://cloud.google.com/kubernetes-engine/docs/concepts/ingress>

We’re going to install the NGINX ingress controller to manage the ingresses for Entando services
deployed by the operator. This will be a simpler and more adaptable configuration for most users and
environments. Users who really need the GKE ingress controller (rare) could integrate it following
the instructions provided by GKE and then customize the service definition created by the Entando
operator.

These are the minimal instructions to prepare NGINX ingress using the Google Cloud Shell. To install it
using your local `kubectl` or to vary other settings please see the more detailed documents here:
<https://cloud.google.com/community/tutorials/nginx-ingress-gke> and <https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke>.

1. Initialize your user as a cluster-admin:
```
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin \
--user $(gcloud config get-value account)
```

2. Install the ingress controller pods:
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
```

3. To check if the ingress controller pods have started, run the following command:
```   
   kubectl get pods -n ingress-nginx \
     -l app.kubernetes.io/name=ingress-nginx --watch
```

4. Wait until the ingress-nginx-controller status changes to `Running`:
```
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-27tgt        0/1     Completed   0          65s
ingress-nginx-admission-patch-7wmgl         0/1     Completed   1          65s
ingress-nginx-controller-7656c59dc4-7xgmc   1/1     Running     0          75s
```
5. Get the external IP address for your ingress controller. Record the value of EXTERNAL-IP for `nginx-ingress-controller` from the command below.

```
kubectl get service -n ingress-nginx
```

### Verify the NGINX Ingress install
We recommend setting up a test application so you can easily verify the ingress is working.

1. From the `Cloud Shell,` create a simple application by running the following command:
```
kubectl run hello-app --generator=run-pod/v1 --image=gcr.io/google-samples/hello-app:1.0 --port=8080
```

2. Expose the `hello-app` Pod as a Service:
```
kubectl expose pod hello-app
```

3. Create an `ingress-resource.yaml` file with this content:
```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress-resource
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
  rules:
  - http:
      paths:
      - path: /hello
        backend:
          serviceName: hello-app
          servicePort: 8080
```
4. Now create the Ingress Resource using `kubectl apply -f ingress-resource.yaml`
5. Verify that the Ingress Resource has been created using `kubectl get ingress ingress-resource`.
It may take a few minutes for the `Address` to be populated.
6. Verify you can access the web application by going to the `EXTERNAL-IP/hello` address, using the
`Address` from the previous nginx-ingress-controller. You should see the following:
```
Hello, world!
Version: 1.0.0
Hostname: hello-app
```

Note the external IP address of your ingress controller since you’ll need it for the application configuration.
The Entando deployment exposes an environment variable to set the ingress controller to be used as part of the deployment. That variable is `ENTANDO_INGRESS_CLASS` and should be set to `nginx` in deployments to GKE (this is documented in the application instructions below as well)

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`.

1.  Download the Custom Resource Definitions (CRDs) and unpack them:
```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz | tar -xz
```

2. Install the Entando CRDs: ```kubectl create -f dist/crd```

## Deploy Your Entando Application
You can now deploy your Entando applications to GKE.

### Setup and Deploy
1. Download and unpack the entando-helm-quickstart:

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.0.tar.gz | tar xvz
```

2. Edit `values.yaml`in the root directory:
   - Set `supportOpenshift: false`
   - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the IP value of your `nginx` controller plus .nip.io
      - For example: `ENTANDO_DEFAULT_ROUTING_SUFFIX: 35.223.161.214.nip.io`
      - We’re using <https://nip.io> because we need wildcard dns address resolution however nip.io is not required. If your enterprise has a different internal dns resolution scheme for development instances you can use that or other alternative dns services like xip.io.
   - If not already present, set these values to utilize nginx as the ingress controller and file system groups for persistent volume access:
      - `ENTANDO_INGRESS_CLASS: "nginx"`
      - `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
   - See [Appendix B](#appendix-b-example-values-yaml-file-for-helm-quickstart) for an example values.yaml
3. Create the Entando namespace:
```
kubectl create namespace entando
```
4. Update helm dependencies:
```
helm dependency update
```
5. Run helm to generate the template file:
```
helm template my-app --namespace=entando ./ > my-app.yaml
```
6. Deploy Entando via
```
kubectl create -f my-app.yaml
```
7. Watch Entando startup
```
kubectl get pods -n entando --watch
```
8. Check for the Entando ingresses using
```
kubectl describe ingress -n entando
````

This is a snippet:
```
quickstart-entando.34.71.130.61.nip.io
                                          /entando-de-app     quickstart-server-service:8080 (10.44.2.3:8080)
                                          /digital-exchange   quickstart-server-service:8083 (10.44.2.3:8083)
                                          /app-builder/       quickstart-server-service:8081 (10.44.2.3:8081)
```
9. Access Entando at the app-builder endpoint, e.g. `http://quickstart-entando.34.71.130.61.nip.io/app-builder/`

### Quickstart with Embedded Databases
The lightest weight and fastest to deploy option for evaluation and getting started uses embedded databases for the application and Keycloak.
To deploy quickstart with embedded databases at the top of values.yaml add `dbms: none` under the app section in the file. See Appendix B for an example.

### External Database
You can also use an external database instance for your application.
This is recommended for projects that will be developed for delivery to customers or stakeholders.
Any dbms that is reachable from the cluster can be used.

#### Example: Deploy Postgres to a Namespace on Your Cluster
These instructions will deploy a postgres instance to a namespace in your kubernetes cluster.

<https://github.com/GoogleCloudPlatform/postgresql-docker/blob/master/9/README.md#run-a-postgresql-server-kubernetes>

 - Note: If deployed this way the address you use for the database in the helm template must be a full address rather than an IP address alone. Use the database IP plus nip.io for a dev instances

Once deployed you can use the [external database instructions](../../external-database/) to
connect your Entando application to your instance.,

#### Connect CloudSQL to GKE

- This link describes creating a PG instances using the GCP Cloud SQL
   - <https://cloud.google.com/sql/docs/postgres/create-instance>
- Connecting from GKE to Cloud SQL
   - <https://cloud.google.com/sql/docs/postgres/connect-kubernetes-engine>


## Appendix A - Cluster Sizing
In the cluster setup instructions you set the number of nodes in your cluster to 5. This setting
assumes the default node type with a single VCPU per instance and 3.8 GB of RAM. The kubernetes
system and nginx will request approximately 1 CPU in total. The Entando application will deploy
on the remaining 4. This configuration is suitable for a development team but may need to be
expanded as microservices are added to the architecture.

If you’re running other applications (like a postgres instance) in your cluster you may need
more nodes.

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

## Appendix B - Example values.yaml file for Helm Quickstart

In the example below the application will deploy with embedded databases and will use `nginx`
as the ingress controller. Replace `<YOUR-NGINX-IP>` with the ip address where your `nginx`
instance is exposed on your cluster.

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
   ENTANDO_DEFAULT_ROUTING_SUFFIX: <YOUR-NGINX-IP>.nip.io
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
