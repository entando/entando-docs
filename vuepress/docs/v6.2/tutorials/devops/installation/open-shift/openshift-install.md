---
sidebarDepth: 2
---

# Installation on OpenShift

## Prerequisites

- An OpenShift installation (3.11 or 4.x)
- `oc` command line tool
- A helm 2 client

## Local Installation
If you want to run OpenShift in your local development environment you can run Minishift (OpenShift 3.11) or Code Ready Containers (OpenShift 4). Use the local development version that matches the cluster where you intend to deploy your application.

For minishift:
https://docs.okd.io/3.11/minishift/getting-started/installing.html

For CRC:
https://developers.redhat.com/products/codeready-containers/download

Once you've completed the installation above capture the local IP address of your development instance using `minishift ip` or `crc ip`. You'll need it when configuring your Entando application.

### Install the Entando Custom Resource Definitions (CRDs)
Once per cluster you need to deploy the `Entando Custom Resources`. This is the only step in this guide that requires cluster level access. If you are running on minishift or CRC make sure you are connected using the administrator login provided when you started your local instance.

1.  Download the Custom Resource Definitions (CRDs) and unpack them:
```
curl -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.2.0/dist/qs/custom-resources.tar.gz | tar -xz
```

2. Install the Entando CRDs: ```oc create -f dist/crd```

### Get your Cluster Default Ingress

If you're deploying on a managed cluster get the default hostname from your cluster administrator. Entando uses wildcard addressing to connect different parts of your Entando application and the default route for applications exposed on your cluster is needed. You'll set this value in step 2 below.

### Setup and Deploy
1. Download and unpack the entando-helm-quickstart release you want to use from here:
<https://github.com/entando-k8s/entando-helm-quickstart/releases>
   - e.g. `curl -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.2.0.tar.gz | tar xvz`
   - See the included README file for more information on the following steps.
2. Edit `values.yaml`in the root directory:
   - Set `supportOpenshift: true`
   - If you're deploying to a managed cluster:
      - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the default URL of applications deployed in your OpenShift cluster. If you're unsure of this check with your cluster administrator for this URL
      - Entando will create applications using that default URL and depends on wildcard DNS resolution
  - If you're using Minishift or CRC:
      - Set `ENTANDO_DEFAULT_ROUTING_SUFFIX` to the value from `minishift ip` or `crc ip` plus `npi.io`. For example, `ENTANDO_DEFAULT_ROUTING_SUFFIX: 192.168.64.10.nip.io`
  - See [Appendix B](#appendix-b-example-values-yaml-file-for-helm-quickstart) for an example values.yaml
3. Login to your openshift environment from the command line with `oc login` using the URL and credentials for your cluster
3. Create the Entando namespace: `oc new-project entando`
4. Update helm dependencies: `helm dependency update`
5. Run helm to generate the template file: `helm template --name=my-app --namespace=entando ./ > my-app.yaml`
6. Deploy Entando via `oc create -f my-app.yaml`
7. Watch Entando startup `oc get pods -n entando --watch`
  - This step is complete when the `quickstart-server` pods show 3/3 running. For example,

```
    quickstart-server-deployment-6c89fb49f7-gpmqc   3/3   Running   0     72s
```
     Your exact name will differ but will start with `quickstart-server-deployment` in the default configuration.
8. Check for the Entando ingresses using `oc describe ingress -n entando`. This is a snippet:

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
http://quickstart-entando.192.168.64.10.nip.io/app-builder/

## Troubleshooting and Common Errors

### Permission Errors

If you get OpenShift permission errors deploying your Entando application into your OpenShift namespace make sure your user has the `escalate` and `bind` verbs on Roles in the namespace you're deploying to. Ultimately you need this command to `oc auth can-i escalate role` to return `yes`. That access is only required in the namespace where you are deploying your Entando application. No cluster level access is required.

Check with your cluster administrator if you need help assigning these roles. Generally this requires the creation of a role with those permissions, preferably a ClusterRole, and then depending on how administrators manage security your Entando installer needs to be given that role in the target namespace. So let's assume the clusterRole we create is `entando-installer` and the user's name is john, on Openshift creating the rolebinding would be:
`oc policy add-role-to-user entando-installer john -n <your-namespace>`

Before installing, we suggest running `oc auth can-i escalate role` with your given user in the targeted namespace . If it says "yes" you should be able to install.

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
