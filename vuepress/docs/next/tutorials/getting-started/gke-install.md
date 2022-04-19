# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com>
- If you choose not to use the Google Cloud Shell, install the [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) 

## Cluster Setup

These steps only need to be completed once per cluster.

1. Login to your Google Cloud account: <https://cloud.google.com/>

2. Go to `Kubernetes Engine` → `Clusters`

3. Select an existing project or create a new one

4. Click `Enable` for the `Kubernetes Engine API`

5. Once the API is enabled, click `Create` to create a cluster

6. Click the `Configure` button for the `GKE Standard` option. Unless otherwise indicated, you can keep the default configuration options.

7. In the left menu, select `default-pool` → `Nodes`

8. Select "e2-standard-2" as the `Machine Type` if you are setting up a basic test cluster for a single Entando Application. Additional CPU and memory may be required for a shared cluster containing multiple Entando Applications or to improve performance. Refer to [Appendix A](#appendix-a-configuring-clustered-storage) for details on clustered storage.

9. Click `Create`. It may take a few minutes for the cluster to initialize. 

10. Click `Connect`

11. Click `Run in Cloud Shell`. Alternatively, connect your local `kubectl` to the GKE cluster.

12. Run `kubectl get node` to verify your connection. The output should list the nodes in your cluster.

### Install the NGINX Ingress Controller

The following steps install the NGINX ingress controller to manage the ingresses for Entando services deployed by the operator. This is a simpler and more adaptable configuration for most users and environments. Users who require the GKE ingress controller (this is rare) can follow
[the integration instructions provided by GKE](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress) and then customize the service definition created by the Entando operator.

These are the mimimum instructions to prepare the NGINX ingress using the Google Cloud Shell.
For installation using your local `kubectl` or to vary other settings, refer to the [Ingress with NGINX guide](https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke) or the [GCE-GKE tutorial](https://cloud.google.com/community/tutorials/nginx-ingress-gke).

1. Initialize your user as a cluster-admin
```sh
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin \
--user $(gcloud config get-value account)
```

2. Install the ingress controller pods
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
```

3. Get the external IP address for your ingress controller, e.g. the EXTERNAL-IP value of `nginx-ingress-controller`, once the ingress-nginx pods are all running. Use `Ctrl+C` to exit the command once the EXTERNAL-IP is displayed.

```sh
kubectl get service -n ingress-nginx --watch
```

::: tip
NGINX is working correctly if a `404 Not Found` NGINX error page is generated when accessing the EXTERNAL-IP from your browser. For a more complete test, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::

### Install the Entando Custom Resources

1. Download and apply the custom resource definitions (CRDs) to the cluster. This must be done once per cluster.
```sh
kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```
2. Create a namespace for the Entando Application. Here we call the namespace "entando". If you choose a different name, update the following commands whenever a namespace is provided.
```sh
kubectl create namespace entando
```
3. Download the `entando-operator-config` template so you can configure the [Entando Operator](../devops/entando-operator.md)
```sh
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/samples/entando-operator-config.yaml"
```
4. Edit the `entando-operator-config.yaml` to add two properties
```yaml
data:
   entando.requires.filesystem.group.override: "true"
   entando.ingress.class: "nginx"
``` 
5. Apply the `ConfigMap`
```sh
kubectl apply -f entando-operator-config.yaml -n entando
````
6. Install the namespace-scoped resources
```sh
kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml
```
7. You can use `kubectl get pods -n entando --watch` to see the initial pods start up. Use `Ctrl+C` to exit.
```sh
$ kubectl get pods -n entando
NAME                                   READY   STATUS    RESTARTS   AGE
entando-k8s-service-86f8954d56-mphpr   1/1     Running   0          95s
entando-operator-5b5465788b-ghb25      1/1     Running   0          95s
```

### Configure the Entando Application
1. Download the `entando-app.yaml` template
```sh
curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/samples/entando-app.yaml"
```

2. Edit `entando-app.yaml`. Replace `YOUR-HOST-NAME` with `EXTERNAL-IP + .nip.io`. See [the EntandoApp custom resource overview](../../docs/consume/custom-resources.md#entandoapp) for additional options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```
e.g. _ingressHostName: 20.120.54.243.nip.io_

## Deploy Your Entando Application
You can now deploy your application to your GKE cluster.

1. Deploy the Entando Application 
```sh
kubectl apply -n entando -f entando-app.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods warming up with the command below. Use `Ctrl+C` to exit.
```sh
kubectl get pods -n entando --watch
```

3. Once all the pods are in a running state, access the Entando App Builder at the following address
```
http://YOUR-HOST-NAME/app-builder/
```

See the [Getting Started guide](../../docs/getting-started/README.md#log-in-to-entando) for helpful login instructions and next steps.

## Appendix: Configuring Clustered Storage

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

8. Add these two variables to your operator `ConfigMap`:
```
entando.k8s.operator.default.clustered.storage.class: "nfs-client"
entando.k8s.operator.default.non.clustered.storage.class: "standard"
```

9. Deploy your Entando Application using the [instructions above](#setup-and-deploy). The server instances will automatically use the clustered storage.
