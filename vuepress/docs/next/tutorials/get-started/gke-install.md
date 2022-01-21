# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com/>
- Install these tools locally if you're not using the Google Cloud Shell steps below:
    - [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) including gcloud
    - `kubectl` command line tool

## Cluster Setup

These steps only need to be completed once per cluster.

1. Login to your Google Cloud account: <https://cloud.google.com/>
1. Go to `Kubernetes Engine → Clusters`
1. Select an existing project or create a new one.
1. Click Enable for the `Kubernetes Engine API`   
1. Once the API is enable, click `Create` to create a cluster
1. Click the `Configure` button for the `GKE Standard` option. Unless otherwise indicated you can keep the default configuration options.
1. On the left menu select `default-pool → Nodes`
1. For a basic test cluster with a single Entando application, select e2-standard-2 for the Machine type. For a shared cluster with multiple Entando applications or higher performance, you may want more CPUs and memory. (See [Appendix A](#appendix-a-configuring-clustered-storage) for details on clustered storage.)
1. Click `Create`
1. Wait for the cluster to initialize. This will take a few minutes. There will be a green check mark when complete.
1. Click `Connect` for your new cluster.
1. Click `Run in Cloud Shell`
    - Alternatively, copy the provided command and execute it in your local environment to connect your local `kubectl` to your GKE cluster.
12. Run `kubectl get namespaces` to verify your connection:
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
5. Get the external IP address for your ingress controller. Record the value of EXTERNAL-IP for `nginx-ingress-controller` from the command below. Retry the following command if the EXTERNAL-IP shows `<pending>` at first.

```
kubectl get service -n ingress-nginx
```

### Verify the NGINX Ingress install
We recommend setting up a test application so you can easily verify the ingress is working.

1. From the `Cloud Shell,` create a simple application by running the following command:
```
kubectl create deployment hello-server --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
```

2. Expose the `hello-app` deployment as a Service:
```
kubectl expose deployment hello-server --type LoadBalancer --port 80 --target-port 8080
```

3. Create an `ingress-resource.yaml` file with this content:
```
apiVersion: networking.k8s.io/v1
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
        pathType: Prefix
        backend:
          service:
            name: hello-server
            port: 
              number: 80
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

7. To reduce your GKE costs you can now remove the test deployment, service, and ingress.
```
kubectl delete deploy/hello-server service/hello-server ing/ingress-resource
```

There are situations where the default NGINX ingress configuration doesn't work well for Entando and must be customized. Refer to the [Development Tips and Tricks](../../../../docs/reference/local-tips-and-tricks.md#customizing-nginx) page for more information.
### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`.
1. Download the Custom Resource Definitions (CRDs) and deploy the cluster scoped resources
```
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```
Next you can create a namespace for the Entando Application. If you select your own name then update the following commands whenever a namespace is provided.

2. Create the namespace
```
kubectl create namespace entando
```
3. Install the namespace scoped resources
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

## Deploy Your Entando Application
You can now deploy your Entando application to GKE.

### Setup and Deploy
1. Download and unpack the entando-helm-quickstart:
```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
- See the included README file for more information on the following steps.
2. Go to the downloaded directory
```
cd entando-helm-quickstart-6.3.2
```
3. Edit `sample-configmaps/entando-operator-config.yaml` and add these properties (taking of correct yaml spacing):
```
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```
4. Run this command:
```
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando
```
5. In the root directory edit `values.yaml` 
   - change the dbms setting from `embedded` to `postgresql`
   - set `singleHostName` to EXTERNAL-IP.nip.io, e.g. 11.111.111.111.nip.io. An alternative is to route your own DNS to the EXTERNAL-IP but this setup will work immediately.

6. Run helm to generate the template file:
```
helm template quickstart --namespace=entando ./ > quickstart.yaml
```
7. Deploy the Entando Application 
```
kubectl apply -n entando -f quickstart.yaml
```

9. Watch the deployment for completion
```
kubectl -n entando get pods --watch
```

Watch Entando startup. The application will be available when the `quickstart-composite-app-deployer` pod has a status of completed  

```
NAME                                                 READY   STATUS    RESTARTS   AGE
entando-operator-5cdf787869-s8bwg                    1/1     Running   0          18m
quickstart-ab-deployment-5655bc6cc6-g55kr            1/1     Running   0          98s
quickstart-cm-deployment-6565fc67b8-cwgpc            0/1     Running   0          62s
quickstart-composite-app-deployer-9419               1/1     Running   0          10m
quickstart-db-deployment-6fdb96f98c-fgm5g            1/1     Running   0          5m55s
quickstart-deployer-9708                             1/1     Running   0          6m3s
quickstart-eci-k8s-svc-deployment-588ffd65c8-p5xcl   1/1     Running   0          7m7s
quickstart-kc-db-deployment-67c7fd4fbf-scwvj         1/1     Running   0          10m
quickstart-kc-server-deployment-7dbcc968f8-rg5lc     1/1     Running   0          9m31s
quickstart-server-deployment-6d966c78c4-tp6cz        1/1     Running   0          3m17s
```

## TLS Notes

If you have configured TLS related to the ingress for the ECI service

1. After the installation patch the ingress path for the ECI to include a trailing slash

```
kubectl -n {NAMESPACE} patch ingress quickstart-eci-ingress --type='json' -p='[{"op": "replace", "path": "/spec/rules/0/http/paths/0/path", "value":"/k8s/"}]'
ingress.extensions/quickstart-eci-ingress patched
```

## Workaround for invalid login form, redirect when using TLS

1. In your application manifest add

```
kind: EntandoCompositeApp
spec:
  components:
  - kind: EntandoKeycloakServer
    spec:
      environmentVariables:
        - name: APPLICATIONBASEURL
          value: https://{HOSTNAME}/entando-de-app/
```

2. In App Builder under `Pages → Settings` set `Base URL` to `Static`

## Appendix A: Configuring Clustered Storage

In order to scale an Entando Application across multiple nodes you must provide a storage class that supports
a `ReadWriteMany` access policy. There are many ways to accomplish this including using dedicated storage providers
like GlusterFS or others.

The instructions below provide an example of configuring using the GCP Cloud Filestore to provide the clustered storage
but if you have an existing enterprise clustered file solution and you can expose it as a StorageClass it is recommended to
use and test that configuration.

::: tip
You can also scale an Entando Application without clustered storage using a `ReadWriteOnce (RWO)` policy by ensuring that the
instances are all scheduled to the same node. This can be accomplished using taints on other nodes. Be aware of the pros and cons of scheduling
instances to the same node. This will give you protection if the application instance itself dies or becomes unreachable and will help
you get the most utilization of node resources. However, if the node dies or is shutdown you will have to wait for Kubernetes to reschedule the pods to a different node and your application will be down.
:::

### Clustered Storage Using GCP Cloud Filestore
1. In the GCP portal in the left menu find the Storage section and select `Filestore -> Instances`
2. Enable the Filestore if you haven't already
3. Select Create Instance
4. Fill in the fields keeping the defaults or updating to fit your specific needs. Remember your Instance ID
5. Once the instance is created on the Filestore main page note the IP address of your NFS
6. Now install the provisioner that will  create the StorageClass that will allow deployment of Entando Applications using the commands below replacing
`[your nfs ip]` and `[your nfs path]` with the IP address of your cluster and with the instance ID you chose above.

  ```
  helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/
  ```
  ```
  helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
      --set nfs.server=[your nfs ip] \
      --set nfs.path=[your nfs path]
  ```

  Read more about the provisioner and additional configuration options here:
  https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner

7. Check to ensure your client provisioned successfully
```
kubectl get sc
```

Looking for the storage class with a name of `nfs-client`. For example,

```
NAME                 PROVISIONER                                     RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
nfs-client           cluster.local/nfs-subdir-external-provisioner   Delete          Immediate              true                   37m
premium-rwo          pd.csi.storage.gke.io                           Delete          WaitForFirstConsumer   true                   27h
standard (default)   kubernetes.io/gce-pd                            Delete          Immediate              true                   27h
standard-rwo         pd.csi.storage.gke.io                           Delete          WaitForFirstConsumer   true                   27h
```

8. In your operator config map add these two variables:
```
entando.k8s.operator.default.clustered.storage.class: "nfs-client"
entando.k8s.operator.default.non.clustered.storage.class: "standard"
```

9. Deploy your Entando Application using the instructions above and the server instances will
automatically use the clustered storage.
