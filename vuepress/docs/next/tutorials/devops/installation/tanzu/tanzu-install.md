---
sidebarDepth: 2
---

# Installation on Tanzu Kubernetes Grid

## Prerequisites

- An installed instance of Tanzu
- A load balancer with an external IP or inbound DNS name for your cluster


### Tanzu Configuration

Ensure that the storage class in your Tanzu installation is marked as the `default`.

```
kubectl get sc
```

The default storage class will include a marker as the default in the name column. For example,
```
NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
standard (default)   kubernetes.io/gce-pd    Delete          Immediate              true                   23h
```

Patch the storage type for your cluster if necessary.

If running on Tanzu Kubernetes Grid 1.2.1 you need to patch the fs-type on the vsphere controller deployment. Details can be found in the [Tanzu
Kuberetes Grid Release notes](https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/1.2.1/rn/VMware-Tanzu-Kubernetes-Grid-121-Release-Notes.html)
under the heading
`Pods using PersistentVolumeClaim do not start or remain in the CrashLoopBackOff status, and Grafana and Harbor extension deployments fail`

This issue will present in an Entando deployment as a failure to create persistent volume claims in the Keycloak or
entando-composite-app pods on deployment.


To fix any existing clusters that you deployed  perform the following steps:

1. Update the vsphere-csi-controller configuration.
```
kubectl patch deployment -n kube-system vsphere-csi-controller --type=json -p='[{"op": "add", "path": "/spec/template/spec/containers/4/args/-", "value": "--default-fstype=ext4"}]'
```
2. Delete the vsphere-csi-controller pod.
```
kubectl delete pod -n kube-system -l app=vsphere-csi-controller
```
Deleting the pod causes it to be recreated with the new configuration.

### Deploy the NGINX Ingress Controller


### Setup and Deploy

1. Deploy the Entando Kubernetes custom resources and configuration
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando-k8s/entando-k8s-operator-bundle/v6.3.2/manifests/k8s-116-and-later/namespace-scoped-deployment/all-in-one.yaml
```
2. Download and unpack the entando-helm-quickstart:

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
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
kubect apply -f sample-configmaps/entando-operator-config.yaml -n entando
```

8. Open values.yaml in the entando-helm-quickstart
9. Changed the dbms from `embedded` to `postgresql`
8. Deploy your Entando application

```
helm template --name=quickstart ./ | kubectl apply -n entando -f -
```

9. Watch the deployment for completion
```
watch kubectl get pods -n entando
```
The deployment is done when your pods look like this (usually) `quickstart-server` is last to finish

```
NAME                                           READY   STATUS    RESTARTS   AGE
entando-operator-5f568649bb-vtmqm              1/1     Running   0          12m
quickstart-ab-deployment-5d8494d757-b2bxg            1/1     Running   0          2m4s
quickstart-cm-deployment-5f7cc5d4b-sf66w             0/1     Running   0          87s
quickstart-composite-app-deployer-5560               1/1     Running   0          11m
quickstart-db-deployment-6976df4874-fklfb            1/1     Running   0          7m30s
quickstart-deployer-3467                             1/1     Running   0          7m35s
quickstart-eci-k8s-svc-deployment-775875c54d-8hgr7   1/1     Running   0          8m32s
quickstart-kc-db-deployment-76dc84df4b-zgg8q         1/1     Running   0          11m
quickstart-kc-server-deployment-5f764b9d45-j2jbz     1/1     Running   0          11m
quickstart-server-deployment-6dc965654b-8tnx4        1/1     Running   0          4m30s
```















1. Download and unpack the entando-helm-quickstart release you want to use from here:
<https://github.com/entando-k8s/entando-helm-quickstart/releases>

 - See the included README file for more information on the following steps.

 ```
 curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.0.tar.gz | tar xvz
 ```

2. Change into the new directory
```
cd entando-helm-quickstart-6.3.0
```
3. Edit `values.yaml`in the root directory:
   - Set `supportOpenshift: false`
   - If you're deploying to a managed cluster:
      - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the default URL of applications deployed in your TKG cluster. If you're unsure of this value, please check with your cluster administrator for this URL.
      - Entando will create applications using that default URL and relies on wildcard DNS resolution.
      - If you're using an IP address append `nip.io` to the IP address or utilize the single domain deployment if you are only deploying on app at the URL you're planning to use.
  - Set `ENTANDO_INGRESS_CLASS: "nginx"`
  - Set `ENTANDO_REQUIRES_FILESYSTEM_GROUP_OVERRIDE: "true"`
4. Create the Entando namespace:
```
kubectl create namespace entando
```
5. Update helm dependencies:
```
helm dependency update
```
6. Run helm to generate the template file:
```
helm template my-app --namespace=entando ./ > my-app.yaml
```
   - If you're using Helm 2 instead of Helm 3, then replace ```helm template my-app``` with ```helm template --name=my-app```
7. Deploy Entando via
```
kubectl create -f my-app.yaml
```
   - If you see this error `no matches for kind "Deployment" in version "extensions/v1beta1"`, then you'll need to edit my-app.yaml and set `apiVersion: "apps/v1"` for the Deployment.
8. Watch Entando startup
```
oc get pods -n entando --watch
```
  - This step is complete when the `quickstart-server` pod shows 3/3 running. For example,
```
quickstart-server-deployment-6c89fb49f7-gpmqc   3/3   Running   0     72s
```
  - The full pod name will differ but by default will start with `quickstart-server-deployment`.

9. Check for the Entando ingresses using `oc describe ingress -n entando`. This is a snippet:
```
Name:             quickstart-ingress
Namespace:        entando
Address:          
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host                                 Path  Backends
  ----                                 ----  --------
  quickstart-entando.192.168.64.10.nip.io  
                                       /entando-de-app     quickstart-server-service:8080 (<none>)
                                       /digital-exchange   quickstart-server-service:8083 (<none>)
                                       /app-builder/       quickstart-server-service:8081 (<none>)
```
The host path in the configuration above plus `/app-builder/` (trailing slash is important) will allow you to log into your environment. For example,
`http://quickstart-entando.192.168.64.10.nip.io/app-builder/`
