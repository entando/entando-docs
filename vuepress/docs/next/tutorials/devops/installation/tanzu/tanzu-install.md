---
sidebarDepth: 2
---

# Installation on OpenShift

## Prerequisites

- An installed instance of Tanzu
- A load balancer with an external IP or inbound DNS name for your cluster


### Tanzu Configuration

Ensure that the storage class in your Tanzu installation is marked as the `default`.

Patch the storage type for your cluster if necessary.

If running on Tanzu Kubernetes Grid 1.2.1 you need to patch the fs-type on the vsphere controller deployment. Details can be found in the [Tanzu
Kuberetes Grid Release notes](https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/1.2.1/rn/VMware-Tanzu-Kubernetes-Grid-121-Release-Notes.html) under the heading
```
Pods using PersistentVolumeClaim do not start or remain in the CrashLoopBackOff status, and Grafana and Harbor extension deployments fail
```

This issue will present in an Entando deployment as a failure to create persistent volume claims in the Keycloak or entando-composite-app pods on deployment.

The relevant commands from the release notes for an existing cluster;

To fix any existing clusters that you deployed before applying the workaround, perform the following steps:

Update the vsphere-csi-controller configuration.
```
kubectl patch deployment -n kube-system vsphere-csi-controller --type=json -p='[{"op": "add", "path": "/spec/template/spec/containers/4/args/-", "value": "--default-fstype=ext4"}]'
```
Delete the vsphere-csi-controller pod.
```
kubectl delete pod -n kube-system -l app=vsphere-csi-controller
```
Deleting the pod causes it to be recreated with the new configuration.


### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`. This is the only step in this guide that requires cluster level access. If you are running on Minishift or CRC make sure you are connected using the administrator login provided when you started your local instance.

1.  Download the Custom Resource Definitions (CRDs) and unpack them:
```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz | tar -xz
```

2. Install the Entando CRDs:
```
kubectl create -f dist/crd
```

### Deploy the NGINX Ingress Controller


### Setup and Deploy
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
