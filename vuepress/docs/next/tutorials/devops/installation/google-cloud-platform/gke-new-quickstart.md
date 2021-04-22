1. Login to your Google Cloud account: <https://cloud.google.com/>
2. Go to `Kubernetes Engine → Clusters → Create Cluster`
3. Enter a name and select a `Location type`
   - The `Location type` settings are up to you. The defaults are fine for an initial test.
4. Select `1.16.15-gke.4901` for the `Master version`
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
kubect apply -f sample-configmaps/entando-operator-config.yaml -n [your namespace]
```

8. Open values.yaml in the entando-helm-quickstart
9. Changed the dbms from `embedded` to `postgresql`
8. Deploy your Entando application

```
helm template --name=quickstart ./ | kubectl apply -n [your-sandbox-namespace] -f -
```

9. Watch the deployment for completion
```
watch kubectl get pods -n [your-sandbox-namespace]
```
The deployment is done when your pods look like this (usually) `quickstart-server` is last to finish

```
NAME                                           READY   STATUS    RESTARTS   AGE
entando-operator-5f568649bb-vtmqm              1/1     Running   0          12m
test-ab-deployment-5d8494d757-b2bxg            1/1     Running   0          2m4s
test-cm-deployment-5f7cc5d4b-sf66w             0/1     Running   0          87s
test-composite-app-deployer-5560               1/1     Running   0          11m
test-db-deployment-6976df4874-fklfb            1/1     Running   0          7m30s
test-deployer-3467                             1/1     Running   0          7m35s
test-eci-k8s-svc-deployment-775875c54d-8hgr7   1/1     Running   0          8m32s
test-kc-db-deployment-76dc84df4b-zgg8q         1/1     Running   0          11m
test-kc-server-deployment-5f764b9d45-j2jbz     1/1     Running   0          11m
test-server-deployment-6dc965654b-8tnx4        1/1     Running   0          4m30s
```
