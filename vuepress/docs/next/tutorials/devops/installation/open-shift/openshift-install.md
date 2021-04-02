---
sidebarDepth: 2
---

# Installation on OpenShift

## Overview
This tutorial shows how to manually install Entando into OpenShift 3.11 or 4.x. If you're working with OpenShift 4.6+ then you also have the option of using the Red Hat-certified Entando Operator which should be available in your OperatorHub thanks to the Red Hat Marketplace. See [this tutorial](./openshift-install-by-operator-hub.md) for instructions specific to the `Entando Operator.`

## Prerequisites

- An OpenShift installation (3.11 or 4.x)
- `oc` command line tool
- A helm 3 client

## Local Installation
If you want to run OpenShift in your local development environment you can run Minishift (OpenShift 3.11) or Code Ready Containers (OpenShift 4). Use the local development version that matches the cluster where you intend to deploy your application.

For Minishift: <https://docs.okd.io/3.11/minishift/getting-started/installing.html>

For CRC: <https://developers.redhat.com/products/codeready-containers/download>

Once you've completed the installation above capture the local IP address of your development instance using `minishift ip` or `crc ip`. You'll need it when configuring your Entando application.

Login to your OpenShift environment from the command line with `oc login` using the URL and credentials for your cluster.

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`. This is the only step in this guide that requires cluster level access. If you are running on Minishift or CRC make sure you are connected using the administrator login provided when you started your local instance.

1.  Download the Custom Resource Definitions (CRDs) and unpack them:
```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz | tar -xz
```

2. Install the Entando CRDs:
```
oc create -f dist/crd
```

### Get your Cluster Default Ingress

If you're deploying on a managed cluster get the default hostname from your cluster administrator. Entando uses wildcard addressing to connect different parts of your Entando application and the default route for applications exposed on your cluster is needed. You'll set this value in step 3 below.

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
   - Set `supportOpenshift: true`
   - If you're deploying to a managed cluster:
      - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the default URL of applications deployed in your OpenShift cluster. If you're unsure of this value, please check with your cluster administrator for this URL.
      - Entando will create applications using that default URL and relies on wildcard DNS resolution.
   - If you're using Minishift or CRC:
      - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the value from `minishift ip` or `crc ip` plus `nip.io`. For example, `ENTANDO_DEFAULT_ROUTING_SUFFIX: 192.168.64.10.nip.io`
   - See [Appendix B](#appendix-b-example-values-yaml-file-for-helm-quickstart) for an example values.yaml
4. Create the Entando namespace:
```
oc new-project entando
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
oc create -f my-app.yaml
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

## Appendix A - Troubleshooting and Common Errors

### Permission Errors

If you get OpenShift permission errors deploying your Entando application into your OpenShift namespace make sure your user has the `escalate` and `bind` verbs on Roles in the namespace you're deploying to. Ultimately you need this command to `oc auth can-i escalate role` to return `yes`. That access is only required in the namespace where you are deploying your Entando application. No cluster level access is required.

Check with your cluster administrator if you need help assigning these roles. Generally this requires the creation of a role with those permissions, preferably a ClusterRole, and then depending on how administrators manage security your Entando installer needs to be given that role in the target namespace. So let's assume the clusterRole we create is `entando-installer` and the user's name is john, on OpenShift creating the rolebinding would be:
`oc policy add-role-to-user entando-installer john -n <your-namespace>`

Before installing, we suggest running `oc auth can-i escalate role` with your given user in the targeted namespace. If it says "yes" you should be able to install.

### Forbidden Error installing Entando Custom Resource Definitions in Minishift or CRC

If you get an error like the one below installing the CRDs in your local instance you need to login using the administrator role.
```
/opt/ocInstallLocal$ oc create -f dist/crd/
Error from server (Forbidden): error when creating "dist/crd/EntandoAppCRD.yaml": customresourcedefinitions.apiextensions.k8s.io is forbidden: User "developer" cannot create resource "customresourcedefinitions" in API group "apiextensions.k8s.io" at the cluster scope
```

The administrator credentials are printed when you started your local cluster in a message like this one:
```
To access the cluster, first set up your environment by following 'crc oc-env' instructions
INFO Then you can access it by running 'oc login -u developer -p developer https://api.crc.testing:6443'
INFO To login as an admin, username is 'kubeadmin' and password is xxxx-xxxx-xxxx-xxxx
```

### Application is not available when accessing app builder

If you get the message "Application is not available" when accessing the app-builder make sure to include a trailing slash in the URL. For example,
http://quickstart-entando.192.168.64.10.nip.io/app-builder/

### Network Issues

If you see errors when images are being retrieved (resulting in errors like ErrImagePull or ImagePullBackOff), you may want to start crc using ```crc start -n "8.8.8.8``` or configure the nameserver using ```crc config set nameserver 8.8.8.8``` before running ```crc start```. This will allow the cluster to perform DNS lookups via Google's public DNS server.

If you're on Windows, you should also check out the notes [here](../../../../docs/reference/local-tips-and-tricks.md) since Minishift and CRC rely on Windows Hyper-V by default. This can result in network issues when the host computer is restarted.


## Appendix B - Example values.yaml file for Helm Quickstart
The example below includes configuration for deployment on a locally installed instance:

```
app:
  name: quickstart
  dbms: none
#externalDatabase:
#  host: some.db.host
#  port: 32432
#  databaseName: sampledb
#  username:
#  password:
operator:
  supportOpenshift: true
  env:
    ENTANDO_DOCKER_IMAGE_VERSION_FALLBACK: 6.0.0
    #ENTANDO_DOCKER_REGISTRY_OVERRIDE: docker.io # Remove comment if you want to always use a specific docker registry
    #ENTANDO_DOCKER_IMAGE_ORG_OVERRIDE: entando # Remove the comment if you want to always use a specific docker organization
    ENTANDO_DEFAULT_ROUTING_SUFFIX: 192.168.64.10.nip.io
    ENTANDO_POD_READINESS_TIMEOUT_SECONDS: "1000"
    ENTANDO_POD_COMPLETION_TIMEOUT_SECONDS: "1000"
    ENTANDO_DISABLE_KEYCLOAK_SSL_REQUIREMENT: "true"
    ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS: "false"
    ENTANDO_K8S_OPERATOR_FORCE_DB_PASSWORD_RESET: "true"
  tls:
    caCrt:
    tlsCrt:
    tlsKey:
deployPDA: false
```
