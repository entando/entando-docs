---
sidebarDepth: 2
---

# Installation on Tanzu Kubernetes Grid

## Prerequisites

- An installed instance of Tanzu
- A load balancer with an external IP or inbound DNS name for your cluster


### Tanzu Configuration

Ensure that the storage class in your Tanzu installation is marked as the `default`. The default storage class will include a marker as the default in the name column. For example,

```
kubectl get sc
```

```
NAME                 PROVISIONER             RECLAIMPOLICY   VOLUMEBINDINGMODE      ALLOWVOLUMEEXPANSION   AGE
standard (default)   kubernetes.io/gce-pd    Delete          Immediate              true                   23h
```

Patch the storage type for your cluster if necessary. If you are using a master Kubernetes instance you may need to patch the storage class in that instance.
A default storage class can be assigned by adding this annotation to the storage class:

```
metadata:
  annotations:
    storageclass.kubernetes.io/is-default-class: "true"
```

See [Appendix A](#appendix-a-persistent-volumes-and-storage) for more advanced storage class configurations.

#### Patch Tanzu File System Types
If your are running on Tanzu Kubernetes Grid 1.2.1 you need to patch the fs-type on the vsphere controller deployment. Details can be found in the [Tanzu
Kuberetes Grid Release notes](https://docs.vmware.com/en/VMware-Tanzu-Kubernetes-Grid/1.2.1/rn/VMware-Tanzu-Kubernetes-Grid-121-Release-Notes.html)
under the heading
`Pods using PersistentVolumeClaim do not start or remain in the CrashLoopBackOff status, and Grafana and Harbor extension deployments fail`

This issue will present in an Entando deployment as a failure to create persistent volume claims in the Keycloak or
Server pods on deployment.

To fix any existing clusters that you deployed perform the following steps:

1. Update the vsphere-csi-controller configuration.
```
kubectl patch deployment -n kube-system vsphere-csi-controller --type=json -p='[{"op": "add", "path": "/spec/template/spec/containers/4/args/-", "value": "--default-fstype=ext4"}]'
```
2. Delete the vsphere-csi-controller pod.
```
kubectl delete pod -n kube-system -l app=vsphere-csi-controller
```
Deleting the pod causes it to be recreated with the new configuration.

## Deploy the NGINX Ingress Controller

1. Deploy NGINX

```
helm install --name ingress-nginx ingress-nginx/ingress-nginx
```

2. Watch for the nginx pod to be in a status of Running. For example

```
kubectl get pods
```

```
NAME                                            READY   STATUS    RESTARTS   AGE
pod/ingress-nginx-controller-66dc9984d8-z5x46   1/1     Running   0          116m
pod/kuard-86664f98c9-7kqb5                      1/1     Running   0          74m
pod/kuard-86664f98c9-bx4zz                      1/1     Running   0          74m
pod/kuard-86664f98c9-fs27d                      1/1     Running   0          74m
```

3. Note the value of the `EXTERNAL-IP` for the nginx controller

```
kubectl get services
```

```
NAME                                         TYPE           CLUSTER-IP       EXTERNAL-IP      PORT(S)                      AGE
service/ingress-nginx-controller             LoadBalancer   100.66.153.199   192.168.100.50   80:30575/TCP,443:31235/TCP   116m
service/ingress-nginx-controller-admission   ClusterIP      100.70.59.21     <none>           443/TCP                      116m
service/kuard                                ClusterIP      100.64.49.203    <none>           80/TCP                       74m
service/kubernetes                           ClusterIP      100.64.0.1       <none>           443/TCP                      42h
````

In the example above the EXTERNAL-IP used in the setup below is 192.168.100.50.


## Setup and Deploy

1. Create a namespace for your Entando deployment

```
kubectl create namespace entando
```

2. Download and unpack the entando-helm-quickstart:

```
curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
```
3. Deploy the Entando Kubernetes custom resources and configuration
```
kubectl apply -n entando -f https://raw.githubusercontent.com/entando-k8s/entando-k8s-operator-bundle/v6.3.2/manifests/k8s-116-and-later/namespace-scoped-deployment/all-in-one.yaml
```

4. In the entando-helm-quickstart edit this file `sample-configmaps/entando-operator-config.yaml`
5. Add these properties to the file (taking note of correct yaml spacing):

```
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
```

6. Find this property in the file `entando.default.routing.suffix:`
7. Change the value to `<your nginx ip>.nip.io`. For example, `entando.default.routing.suffix: 35.232.231.65.nip.io`

::: tip
Depending on your configuration, network, and intended DNS address an application can also be deployed using a single hostname rather
than depending on wildcard DNS resolution.
:::


8. Deploy the operator configuration

```
kubect apply -f sample-configmaps/entando-operator-config.yaml -n entando
```

9. Open the `values.yaml` file in the entando-helm-quickstart
10. Change the dbms from `embedded` to `postgresql`
11. Deploy your Entando application

```
helm template --name=quickstart ./ | kubectl apply -n entando -f -
```

12. Watch the deployment for completion
```
kubectl get pods -n entando --watch
```
The deployment is done when your pods look like this `quickstart-server` is last to finish

```
NAME                                                 READY   STATUS    RESTARTS   AGE
entando-operator-5f568649bb-vtmqm                    1/1     Running   0          12m
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

## Appendix A - Persistent Volumes and Storage

In addition to using a default storage class as described above some installations define different storage for clustered and non-clustered persistent volumes.
In order to scale Entando server pods across multiple nodes a persistent storage with support for `ReadWriteMany` is required. You can configure your Entando instance to take advantage of provisioned clustered storage with these properties;

```
entando.k8s.operator.default.clustered.storage.class: <your clustered storage class>
entando.k8s.operator.default.non.clustered.storage.class: <your non-clustered storage class>
```
