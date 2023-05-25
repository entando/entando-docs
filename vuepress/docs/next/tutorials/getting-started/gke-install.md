# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com>
- If you choose not to use the Google Cloud Shell, install the [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) 

## Cluster Setup

These steps only need to be completed once per cluster.

1. Log in to your Google Cloud account at <https://cloud.google.com/>

2. Go to `Kubernetes Engine` → `Clusters`

3. Select an existing project or create a new one

4. Click `Enable` for the `Kubernetes Engine API`

5. Once the API is enabled, click `Create` to create a cluster

6. Click the `Configure` button for the `GKE Standard` option. Unless otherwise indicated, you do not need to change the default configuration options. (Choosing the `GKE Autopilot` option typically results in a cluster with too few initial resources and can prolong the startup process as the cluster adds resources on demand.)

7. In the left menu, select `default-pool` → `Nodes`

8. Select "e2-standard-2" as the `Machine Type` if you are setting up a basic test cluster for a single Entando Application. Additional CPU and memory may be required for a shared cluster containing multiple Entando Applications or to improve performance. Refer to [Appendix A](#appendix-configuring-clustered-storage) for details on clustered storage.

9. Click `Create`. It may take a few minutes for the cluster to initialize. 

10. Click `Connect`

11. Click `Run in Cloud Shell`. Alternatively, connect your local `kubectl` to the GKE cluster.

12. Run `kubectl get node` to verify your connection. The output should list the nodes in your cluster.

### Install the NGINX Ingress Controller

The following steps install the NGINX Ingress Controller to manage the ingresses for Entando services deployed by the operator. These are the minimum instructions to prepare the NGINX ingress using the Google Cloud Shell, which is a simple and adaptable configuration for most users and environments. 

Users who require the GKE Ingress controller (this is rare) can follow [the integration instructions provided by GKE](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress) and then customize the service definition created by the Entando Operator.

For installation using your local `kubectl` or to vary other settings, refer to the [NGINX Ingress Controller documentation](https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke) or the [GCE-GKE tutorial](https://cloud.google.com/community/tutorials/nginx-ingress-gke).

::: tip
If you created a **Private Cluster**, you need to configure your firewall accordingly. Refer to the [NGINX Ingress Controller documentation](https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke) and the [Adding firewall rules for specific use cases](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules) GKE guide.
::: 

1. Initialize your user as a cluster-admin:
```sh
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin \
--user $(gcloud config get-value account)
```

2. Install the ingress controller pods:
```sh
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
```

3. Once the ingress-nginx pods are running, enter the following command to return the external IP address of your ingress controller. Use `Ctrl+C` to exit after the EXTERNAL-IP value for `nginx-ingress-controller` is displayed.

```sh
kubectl get service -n ingress-nginx --watch
```

::: tip
NGINX is working correctly if a `404 Not Found` NGINX error page is generated when accessing the EXTERNAL-IP from your browser. For a more complete test, you can [set up a simple test application](../devops/manage-nginx.md#verify-the-nginx-ingress-install) using your local `kubectl`. You can also [customize the NGINX ingress](../devops/manage-nginx.md#customize-the-nginx-configuration) to optimize the configuration for Entando.
:::

### Install the Entando Custom Resources

1. Download and apply the custom resource definitions (CRDs) to the cluster. This must be done once per cluster.

<EntandoCode>kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
</EntandoCode>

2. Create a namespace for the Entando Application. If you choose a name other than "entando," update the following commands wherever a namespace is provided.
```sh
kubectl create namespace entando
```
3. Download the `entando-operator-config` template to configure the [Entando Operator](../consume/entando-operator.md):

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-operator-config.yaml"</EntandoCode>

4. Edit the `entando-operator-config.yaml` to add two properties:
```yaml
data:
   entando.requires.filesystem.group.override: "true"
   entando.ingress.class: "nginx"
``` 
5. Apply the `ConfigMap`:
```sh
kubectl apply -f entando-operator-config.yaml -n entando
````
6. Install the namespace-scoped resources:

<EntandoCode>kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/namespace-scoped-deployment/namespace-resources.yaml</EntandoCode>

7. Use `kubectl get pods -n entando --watch` to observe the base pods initialize. Exit this command via `Ctrl+C`.
```sh
$ kubectl get pods -n entando
NAME                                   READY   STATUS    RESTARTS   AGE
entando-k8s-service-86f8954d56-mphpr   1/1     Running   0          95s
entando-operator-5b5465788b-ghb25      1/1     Running   0          95s
```

### Configure the Entando Application
1. Download the `entando-app.yaml` template:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-app.yaml"</EntandoCode>

2. Edit `entando-app.yaml`. Replace `YOUR-HOST-NAME` with `EXTERNAL-IP` + `.nip.io`. See [the EntandoApp custom resource overview](../../docs/reference/entandoapp-cr.md) for additional options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```
e.g. _ingressHostName: 20.120.54.243.nip.io_

## Deploy Your Entando Application
You can now deploy your application to your GKE cluster.

1. Deploy the Entando Application: 
```sh
kubectl apply -n entando -f entando-app.yaml
```
2. It can take 10 minutes or more for the application to fully deploy. You can watch the pods warming up with the command below. Use `Ctrl+C` to exit.
```sh
kubectl get pods -n entando --watch
```

3. Once all the pods are in a running state, access the Entando App Builder at the following address:
```
http://YOUR-HOST-NAME/app-builder/
```

See the [Getting Started guide](../../docs/getting-started/README.md#login-to-entando) for helpful login instructions and next steps.

## Appendix: Configuring Clustered Storage

In order to scale an Entando Application across multiple nodes, you must provide a storage class that supports
a `ReadWriteMany` access policy, e.g. by using a dedicated storage provider like GlusterFS.

The example below provides clustered storage via GCP Cloud Filestore. However, it is best practice to expose an existing clustered file solution as a StorageClass.

::: tip
You do not need clustered storage to scale an Entando Application if you schedule all instances to the same node via taints on other nodes and a `ReadWriteOnce (RWO)` policy. Be aware of the impact to node resource allocation and to recovery, should your application fail or become unreachable. Note that if the node fails or is shutdown, your application will be unresponsive while Kubernetes reschedules the pods to a different node.
:::

### Clustered Storage Using GCP Cloud Filestore
1. In the cluster `DETAILS` tab, under `Features`, find the `Filestore CSI driver` property and enable it

2. Wait for the changes to propagate--it may take a few minutes.

3. Ensure that the `Cloud Filestore API` is enabled under `API and services` on the main left menu

4. Verify that your client provisioned successfully. This is indicated by the presence of the storage class with the `rwx` suffix in the output of the following command:
```
kubectl get sc
```

Example output:

```
NAME                 PROVISIONER                                     RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
NAME                        PROVISIONER                    RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
enterprise-multishare-rwx   filestore.csi.storage.gke.io   Delete          WaitForFirstConsumer   true                   67m
enterprise-rwx              filestore.csi.storage.gke.io   Delete          WaitForFirstConsumer   true                   67m
premium-rwo                 pd.csi.storage.gke.io          Delete          WaitForFirstConsumer   true                   116m
premium-rwx                 filestore.csi.storage.gke.io   Delete          WaitForFirstConsumer   true                   67m
standard                    kubernetes.io/gce-pd           Delete          Immediate              true                   116m
standard-rwo (default)      pd.csi.storage.gke.io          Delete          WaitForFirstConsumer   true                   116m
standard-rwx                filestore.csi.storage.gke.io   Delete          WaitForFirstConsumer   true                   67m
```

5. Add the variables below to your operator `ConfigMap`:
```
entando.k8s.operator.default.clustered.storage.class: "standard-rwx"
entando.k8s.operator.default.non.clustered.storage.class: "standard"
```

6. Deploy your Entando Application using the [instructions above](#deploy-your-entando-application). The server instances will automatically use the clustered storage.
