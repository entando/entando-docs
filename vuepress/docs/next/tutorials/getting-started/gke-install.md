# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com/>
- Install these tools locally if you're not using the Google Cloud Shell steps below:
    - [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) including gcloud
    - `kubectl` command line tool

## Cluster Setup

These steps only need to be completed once per cluster.

1. Login to your Google Cloud account: <https://cloud.google.com/>

2. Go to `Kubernetes Engine` → `Clusters`

3. Select an existing project or create a new one

4. Click `Enable` for the `Kubernetes Engine API`

5. Once the API is enabled, click `Create` to create a cluster

6. Click the `Configure` button for the `GKE Standard` option. Unless otherwise indicated, you can keep the default configuration options.

7. In the left menu, select `default-pool` → `Nodes`

8. Select "e2-standard-2" as the Machine Type if you have a basic test cluster containing a single Entando Application. Additional CPUs and memory may be required for a shared cluster containing multiple Entando Applications or to improve performance. Refer to [Appendix A](#appendix-a-configuring-clustered-storage) for details on clustered storage.

9. Click `Create`

10. Wait for the cluster to initialize. This takes a few minutes. A green check mark appears when initialization has completed.

11. Click `Connect` for your new cluster

12. Click `Run in Cloud Shell`. Alternatively, copy the provided command and execute it in your local environment to connect your local `kubectl` to your GKE cluster.

13. Run `kubectl get namespaces` to verify your connection. The output should look similar to the following:
```
a_user@cs-6000-devshell-vm-c34ef644-5584-4c5d-aa14-6e41af4a5c9a:~$ kubectl get namespaces
NAME              STATUS   AGE
default           Active   6m11s
kube-node-lease   Active   6m12s
kube-public       Active   6m12s
kube-system       Active   6m13s

```

### Install the NGINX Ingress Controller

Entando isn’t compatible with the default ingress controller provided by GKE.
See <https://cloud.google.com/kubernetes-engine/docs/concepts/ingress> if you’re interested in GKE ingress.

The following steps install the NGINX ingress controller to manage the ingresses for Entando services
deployed by the operator. This is a simpler and more adaptable configuration for most users and
environments. Users who require the GKE ingress controller (this is rare) can follow
the integration instructions provided by GKE and then customize the service definition created by the Entando
operator.

These are the mimimum instructions to prepare the NGINX ingress using the Google Cloud Shell. Refer to <https://cloud.google.com/community/tutorials/nginx-ingress-gke> and <https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke> for installation using your local `kubectl` or to vary other settings.

1. Initialize your user as a cluster-admin
```
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin \
--user $(gcloud config get-value account)
```

2. Install the ingress controller pods
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
```

3. To check if the ingress controller pods have started, run the following command
```   
   kubectl get pods -n ingress-nginx \
     -l app.kubernetes.io/name=ingress-nginx --watch
```

4. Wait until the ingress-nginx-controller status changes to `Running`, for example
```
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-27tgt        0/1     Completed   0          65s
ingress-nginx-admission-patch-7wmgl         0/1     Completed   1          65s
ingress-nginx-controller-7656c59dc4-7xgmc   1/1     Running     0          75s
```
5. Get the external IP address for your ingress controller, e.g. the EXTERNAL-IP value of `nginx-ingress-controller`. Retry the command if the EXTERNAL-IP is shown as `<pending>`.

```
kubectl get service -n ingress-nginx
```

::: tip
NGINX is working correctly if a `404 Not Found` error page is generated when accessing the EXTERNAL-IP from your browser. For a more complete test, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::
### Install the Entando Custom Resource Definitions
The Entando custom resources must be deployed once per cluster.

1. Download the custom resource definitions (CRDs) and deploy the cluster-scoped resources
```
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```
2. Create a namespace for the Entando Application. Here we call the namespace "entando"; if you choose a different name, update the following commands whenever a namespace is provided.
```
kubectl create namespace entando
```
3. Install the namespace-scoped resources
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

## Deploy Your Entando Application
You can now deploy your Entando Application to GKE.

### Setup and Deploy
1. Download and unpack the entando-helm-quickstart
```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
See the included README for more information on subsequent steps
2. Go to the downloaded directory
```
cd entando-helm-quickstart-6.3.2
```
3. Edit `sample-configmaps/entando-operator-config.yaml` and add the properties below. Be sure to apply correct YAML spacing.
```
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```
4. Apply the operator ConfigMap to the namespace
```
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando
```
5. In the root directory, edit `values.yaml` 
   - Change the dbms setting from `embedded` to `postgresql`
   - Set `singleHostName` to EXTERNAL-IP.nip.io, e.g. 11.111.111.111.nip.io for instantaneous access. An alternative is to route your own DNS to the EXTERNAL-IP.

6. Run Helm to generate the template file
```
helm template quickstart --namespace=entando ./ > quickstart.yaml
```
7. Deploy the Entando Application 
```
kubectl apply -n entando -f quickstart.yaml
```

9. Watch the deployment complete
```
kubectl -n entando get pods --watch
```

10. Watch Entando startup. The application will be available when the `quickstart-composite-app-deployer` pod status is Completed.

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

### ECI Service Ingress

If you have configured TLS for the ECI service ingress, patch the ingress path after installation to include a trailing slash

```
kubectl -n {NAMESPACE} patch ingress quickstart-eci-ingress --type='json' -p='[{"op": "replace", "path": "/spec/rules/0/http/paths/0/path", "value":"/k8s/"}]'
ingress.extensions/quickstart-eci-ingress patched
```

### Workaround

Bypass an invalid login form and redirect when using TLS using this workaround.

1. Add the following to your application manifest

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

2. In your App Builder, go to `Pages` → `Settings` and set `Base URL` to `Static`

## Appendix A: Configuring Clustered Storage

In order to scale an Entando Application across multiple nodes, you must provide a storage class that supports
a `ReadWriteMany` access policy, e.g. by using a dedicated storage provider like GlusterFS.

The example below uses the GCP Cloud Filestore to provide clustered storage. However, it is best practice to expose an existing enterprise clustered file solution as a StorageClass.

::: tip
You do not need clustered storage to scale an Entando Application if you schedule all instances to the same node using a `ReadWriteOnce (RWO)` policy and taints on other nodes. Be aware of the impact to node resource allocation, as well as recovery if your application fails or becomes unreachable. Note that if the node fais or is shutdown, your application will be unresponsive while Kubernetes reschedules the pods to a different node.
:::

### Clustered Storage Using GCP Cloud Filestore
1. In the left menu of the GCP portal, find the Storage section and select `Filestore` -> `Instances`

2. Enable the Filestore if you haven't already

3. Select `Create Instance`

4. Adjust the field values from the defaults as needed. Take note of your instance ID.

5. Once the instance is created on the Filestore main page, note the IP address of your NFS

6. Install the provisioner that creates the StorageClass to enable deployment of Entando Applications. Use the commands below, replacing YOUR-NFS-IP and YOUR-NFS-PATH with your instance ID and the IP address of your cluster.

  ```
  helm repo add nfs-subdir-external-provisioner https://kubernetes-sigs.github.io/nfs-subdir-external-provisioner/
  ```
  ```
  helm install nfs-subdir-external-provisioner nfs-subdir-external-provisioner/nfs-subdir-external-provisioner \
      --set nfs.server=YOUR-NFS-IP \
      --set nfs.path=YOUR-NFS-PATH
  ```

  Learn about the provisioner and additional configuration options here:
  <https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner>

7. Verify that your client provisioned successfully by running the following command and looking for the storage class `nfs-client`
```
kubectl get sc
```

Example output:

```
NAME                 PROVISIONER                                     RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
nfs-client           cluster.local/nfs-subdir-external-provisioner   Delete          Immediate              true                   37m
premium-rwo          pd.csi.storage.gke.io                           Delete          WaitForFirstConsumer   true                   27h
standard (default)   kubernetes.io/gce-pd                            Delete          Immediate              true                   27h
standard-rwo         pd.csi.storage.gke.io                           Delete          WaitForFirstConsumer   true                   27h
```

8. Add these two variables to your operator ConfigMap:
```
entando.k8s.operator.default.clustered.storage.class: "nfs-client"
entando.k8s.operator.default.non.clustered.storage.class: "standard"
```

9. Deploy your Entando Application using the [instructions above](#setup-and-deploy). The server instances will
automatically use the clustered storage.
