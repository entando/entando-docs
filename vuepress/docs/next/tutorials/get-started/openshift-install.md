---
sidebarDepth: 2
---

# Installation on OpenShift

## Overview
This tutorial shows how to manually install Entando into OpenShift 4.x. __Installation via the Red Hat-certified Entando Operator is highly recommended for OpenShift 4.6+. Thanks to the Red Hat Marketplace, the Entando Operator should be available in your OperatorHub.__ See [this tutorial](./openshift-install-by-operator-hub.md) for instructions specific to the `Entando Operator`.

## Prerequisites

- An OpenShift installation (4.x)
- `oc` command line tool
- A Helm 3 client

## Local Installation
You can run OpenShift in your local development environment with Code Ready Containers (OpenShift 4.x). Use the local development version for the cluster where you intend to deploy your application.



For CRC: <https://developers.redhat.com/products/codeready-containers/download>

Once you've completed the installation above, capture the local IP address of your development instance with `crc ip`. You'll need this IP to configure your Entando Application.

Login to your OpenShift environment from the command line with `oc login`, using the URL and credentials for your cluster.

### Install the Entando Custom Resource Definitions (CRDs)
The `Entando Custom Resources` must be deployed once per cluster. This is the only step in this guide that requires cluster-level access. If you are running on CRC, make sure you are using the administrator login provided when you started your local instance.


1. Download the Custom Resource Definitions (CRDs) and deploy them
```
oc apply -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
```

2. Create the project for your application
```
oc new-project entando
```
Note: If you choose a different name for your project, adjust the commands below to supply your project name (e.g. `-n my-custom-projectname`).

3. Install namespace scoped resources
```
oc apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml
```

### Get your Cluster Default Ingress

If you're deploying on a managed cluster, get the default hostname from your cluster administrator. Entando uses wildcard addressing to connect different parts of your Entando Application, which requires the default route for applications exposed on your cluster. You'll set this value in step 3 below.

### Setup and Deploy
1. Select, download and unpack the entando-helm-quickstart release:
<https://github.com/entando-k8s/entando-helm-quickstart/releases>

 - See the included README file for more information on the following steps.

 ```
 curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz | tar xvz
 ```

2. Navigate to the new directory
```
cd entando-helm-quickstart-6.3.2
```
3. Edit `sample-configmaps/entando-operator-config.yaml`
   - If you're deploying to a managed cluster:
      - Set `entando.default.routing.suffix` to the default URL of applications deployed in your OpenShift cluster. If you're unsure of this value, please check with your cluster administrator.
      - Entando will create applications using the default URL and relies on wildcard DNS resolution.
   - If you're using CRC:
      - Set `entando.default.routing.suffix` to the value from `crc ip`, plus `nip.io`. For example, `entando.default.routing.suffix: 192.168.64.10.nip.io`.

4. Deploy your ConfigMap
```
oc apply -n entando -f sample-configmaps/entando-operator-config.yaml
```

5. Update Helm dependencies
```
helm dependency update
```
6. Run Helm to generate the template file
```
helm template my-app --namespace=entando ./ > my-app.yaml
```
   - If you're using Helm 2 instead of Helm 3, then replace ```helm template my-app``` with ```helm template --name=my-app```.
7. Deploy Entando
```
oc create -f my-app.yaml
```
   - If you see the error `no matches for kind "Deployment" in version "extensions/v1beta1"`, then you'll need to edit my-app.yaml and set `apiVersion: "apps/v1"` for the Deployment.
8. Watch Entando startup
```
oc get pods -n entando --watch
```
  - This step is complete when the `quickstart-composite-app-deployer` reports a status of Completed. For example:
```
quickstart-composite-app-deployer-0547               0/1     Completed           0          7m44s
```
  - The full pod name will differ, but will start with `quickstart-composite-app-deployer` by default.

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
The host path in the configuration above, plus `/app-builder/` (trailing slash is important), will allow you to log into your environment. For example,
`http://quickstart-entando.192.168.64.10.nip.io/app-builder/`.

## Appendix A - Troubleshooting and Common Errors

### Permission Errors

If deploying your Entando Application into your OpenShift namespace generates permission errors, make sure the namespace you're deploying to has the `escalate` and `bind` verbs on Roles. Before installing Entando, run `oc auth can-i escalate role` with your given user in the targeted namespace. If `yes` is returned, the installation should complete. Note that access is only required in the namespace where you are deploying your Entando Application. No cluster level access is required.

Check with your cluster administrator if you need help assigning Roles. Generally, this requires the creation of a Role, preferably a ClusterRole with the above permissions. Your Entando installer needs to be given this Role in the target namespace, in accordance with how administrators manage security. For example, if the ClusterRole we create is `entando-installer` and the user's name is John, to create rolebinding on OpenShift use:
`oc policy add-role-to-user entando-installer john -n <your-namespace>`.



### Forbidden Error installing Entando Custom Resource Definitions in CRC

If installing the CRDs in your local instance generates an error like the one below, you need to login as an administrator.
```
/opt/ocInstallLocal$ oc create -f dist/crd/
Error from server (Forbidden): error when creating "dist/crd/EntandoAppCRD.yaml": customresourcedefinitions.apiextensions.k8s.io is forbidden: User "developer" cannot create resource "customresourcedefinitions" in API group "apiextensions.k8s.io" at the cluster scope
```

Administrator credentials are printed when you start your local cluster. For example:
```
To access the cluster, first set up your environment by following 'crc oc-env' instructions
INFO Then you can access it by running 'oc login -u developer -p developer https://api.crc.testing:6443'
INFO To login as an admin, username is 'kubeadmin' and password is xxxx-xxxx-xxxx-xxxx
```

### Application is not available when accessing App Builder

If you get the message "Application is not available" when accessing the App Builder, make sure to include a trailing slash in the URL. For example,
`http://quickstart-entando.192.168.64.10.nip.io/app-builder/`.

### Network Issues

If you see errors when images are being retrieved (such as ErrImagePull or ImagePullBackOff), you may want to start CRC using ```crc start -n "8.8.8.8```, or configure the nameserver with ```crc config set nameserver 8.8.8.8``` before running ```crc start```. This will allow the cluster to perform DNS lookups via Google's public DNS server.

If you're on Windows, you should also check out the notes [here](../../docs/reference/local-tips-and-tricks.md) since CRC relies on Windows Hyper-V by default. This can result in network issues when the host computer is restarted.

### Image Pull Error
When installing Entando 6.3.2 into OpenShift 4.6, you may run into an image pull error. This happens due to the Docker image having restricted registries. To address this, a property in the ConfigMap is used to override assignment of the default Docker registry to an image with no registry.
Create a ConfigMap named `entando-operator-config` with the property `entando.docker.registry.override: [registry.hub.docker.com](http://registry.hub.docker.com)`, as shown below:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
 name: entando-operator-config
 namespace: <namespace_name>
data:
 entando.docker.registry.override: registry.hub.docker.com
```

Replace `<namespace_name>` with the proper name for the namespace. Then create the ConfigMap from the command line, or from the OpenShift UI.

**Note: This configuration should occur after deploying the Operator, and before deploying the CompositeApp.**

## Next Steps
Once you've completed the installation, you have several options:
*  Check out `Networking → Routes` to see the URLs for the running services. Common starting points include the `Entando App Builder` (e.g. `http://entando.apps-crc.testing/app-builder/`) or the `Entando Application` (e.g. `http://entando.apps-crc.testing/entando-de-app/`). 
* This suggested [list of next steps](../../docs/getting-started/#next-steps) could also be useful.

<!--- If any changes are made to the Next Steps, please update the same in openshift-install-by-operator-hub.md --->