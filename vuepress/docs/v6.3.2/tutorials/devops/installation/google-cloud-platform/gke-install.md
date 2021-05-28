# Installation on Google Kubernetes Engine (GKE)

## Prerequisites

- Google Cloud account: <http://cloud.google.com/>
- Install these tools locally if you're not using the Google Cloud Shell steps below:
    - [Google Cloud SDK](https://cloud.google.com/sdk/docs#install_the_latest_cloud_tools_version_cloudsdk_current_version) including gcloud
    - `kubectl` command line tool

## Cluster Setup

These steps only need to be completed once per cluster.

1. Login to your Google Cloud account: <https://cloud.google.com/>
2. Go to `Kubernetes Engine → Clusters → Create Cluster`
3. Select the `Configure` button under the `Standard` option
4. Enter a name and select a `Location type`
   - The `Location type` settings are up to you. The defaults are fine for an initial test.
5. Select `1.18.16-gke.502` for the `Master version`
6. On the left menu select `default-pool`
7. Under `Size` set the `Number of nodes` entry to 5.  (See [Appendix A](#appendix-a-configuring-clustered-storage) for details.)
8. Click `Create`
9. Wait for the cluster to initialize. This will take a few minutes. There will be a green check mark when complete.
10. Click `Connect` for your new cluster.
11. Click `Run in Cloud Shell`
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


## Deploy Your Entando Application
You can now deploy your Entando applications to GKE.

### Setup and Deploy
1. Download and unpack the entando-helm-quickstart:

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
2. Deploy the Entando Kubernetes custom resources and configuration
```
kubectl apply -n [your-sandbox-namespace] -f https://raw.githubusercontent.com/entando-k8s/entando-k8s-operator-bundle/v6.3.2/manifests/k8s-116-and-later/namespace-scoped-deployment/all-in-one.yaml
```

3. In the entando-helm-quickstart edit this file `sample-configmaps/entando-operator-config.yaml`
4. Add these properties to the file (taking note of correct yaml spacing):

```
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```

5. Find this property in the file `entando.default.routing.suffix:`
6. Change the value to `<your nginx ip>.nip.io`. For example, `entando.default.routing.suffix: 35.232.231.65.nip.io`
7. Deploy the operator configuration

```
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n [your namespace]
```

8. Open values.yaml in the `entando-helm-quickstart`
9. Changed the dbms from `embedded` to `postgresql`
8. Deploy your Entando application

```
helm template --name=quickstart ./ | kubectl apply -n [your-sandbox-namespace] -f -
```

9. Watch the deployment for completion
```
watch kubectl get pods -n [your-sandbox-namespace]
```

Watch Entando startup. The application will be available when the `quickstart-composite-app-deployer` pod has a status of completed  

```
NAME                                                 READY   STATUS      RESTARTS   AGE
my-aks-app-operator-644697776f-sxtq2                 1/1     Running     0          13m
quickstart-composite-app-deployer-2guz0n42pc         1/1     Running     0          13m
quickstart-deployer-jj4njqk4bg                       1/1     Running     0          10m
quickstart-eci-deployer-t0xktqsonk                   0/1     Completed   0          11m
quickstart-eci-k8s-svc-deployment-78f64c8d89-7c578   1/1     Running     0          11m
quickstart-kc-deployer-16gzv3clsj                    0/1     Completed   0          13m
quickstart-kc-server-deployment-7c9bc65744-g52nx     1/1     Running     0          13m
quickstart-server-deployment-55fcfc6b68-szvkl        0/3     Pending     0          10m
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

### Appendix A: Configuring Clustered Storage

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

#### Clustered Storage Using GCP Cloud Filestore
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
