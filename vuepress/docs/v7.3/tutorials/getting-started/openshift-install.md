---
sidebarDepth: 2
---

# Installation on OpenShift

## Overview
This tutorial shows how to manually install Entando into OpenShift 4.8.x. __Installation via the  Entando Operator is highly recommended for OpenShift 4.6+.__ See the [Installation on Red Hat OpenShift using the Operator tutorial](./openshift-install-by-operator.md) for specific instructions.

## Prerequisites
- An OpenShift 4.8.x installation
- The [OpenShift CLI](https://docs.openshift.com/container-platform/4.8/cli_reference/openshift_cli/getting-started-cli.html), e.g. `oc`

### Local Installation
You can run OpenShift 4.8.x in your local development environment with Code Ready Containers (CRC). Use the local development version for the cluster where you intend to deploy your application. See <https://developers.redhat.com/products/codeready-containers/download> for more details.

## Create the Project
The steps in this section require cluster admin access. If you are using CRC, make sure to use the administrator login provided when you started your local instance.

1. Login to your OpenShift environment. There are two options:
- Use the `oc login` command, which can be found under the profile menu in OpenShift. 
```shell
oc login --token=sha256~TO3QCeoLSbprlGZARBOBVAoaKFeb9Ag0RxztYifAcjE --server=https://api.cluster-4bb2.4bb2.example.opentlc.com:6443
``` 
- Use the command line interface from the OpenShift Console.

2. Install the cluster-scoped custom resource definitions (CRDs). This step is only required once per cluster.

<EntandoCode>kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v73 }}/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml
</EntandoCode>

3. Create the project for your application
```
oc new-project entando
```
Note: If you choose a different name for your project, adjust the commands below to supply your project name (e.g. `-n YOUR-PROJECT`) or use the `oc project` command to select the project.

The remaining steps in this tutorial can be performed by a user with project-level access, rather than a cluster admin.

## Configure the Project
1. (Optional) A ConfigMap can be used to modify the behavior of the Entando Operator. Refer to the [Entando Operator](../../tutorials/consume/entando-operator.md) page for more information.

2. Install the namespace-scoped custom resources

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v73 }}/dist/ge-1-1-6//namespace-scoped-deployment/namespace-resources.yaml"</EntandoCode>


## Configure the Entando Application
1. Download the `entando-app.yaml` template

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v73 }}/dist/ge-1-1-6/samples/entando-app.yaml"</EntandoCode>

2. Determine the hostname for your application, YOUR-HOST-NAME
  - If you're deploying to a managed cluster:
    - Determine the default hostname of your cluster. If you're unsure of the default hostname, please check with your cluster administrator.
    - Add a prefix with the name of your project or application. For example, YOUR-HOST-NAME could be `my-app.apps.cluster-4bb2.4bb2.example.opentlc.com`, where `apps.cluster-4bb2.4bb2.example.opentlc.com` is the hostname of the OpenShift cluster.
    - Entando creates the application using this address and relies on wildcard DNS resolution.
  - If you're using CRC:
    - Determine the IP address (YOUR-IP) of your cluster with `crc ip`
    - Your IP-based YOUR-HOST-NAME should follow this pattern: `quickstart.YOUR-IP.nip.io`, e.g. `quickstart.192.168.64.33.nip.io`. The suffix `.nip.io` makes use of the free [nip.io](https://nip.io/) DNS service so that any requests to this host name will resolve to your CRC instance. The prefix `quickstart` is arbitrary.
    
3. Edit `entando-app.yaml` and replace YOUR-HOST-NAME with the address from above. See the [Custom Resources overview](../../docs/reference/entandoapp-cr.md) for details on other `EntandoApp` options.
```yaml
spec:
  ingressHostName: YOUR-HOST-NAME
```

4. (Optional) If you used a name other than "entando" for your project, you'll also want to update the metadata/namespace property in `entando-app.yaml` to match.

## Deploy the Entando Application
1. Deploy Entando
```sh
oc apply -n entando -f entando-app.yaml
```
2. It can take around 10 minutes for the application to fully deploy. You can watch the pods warming up with this command:
```sh
oc get pods -n entando --watch
```
Use `Ctrl+C` to exit the command.

3. Once all the pods are in a running state, access the Entando App Builder at the following address:
```
http://YOUR-HOST-NAME/app-builder/
```

## Next Steps
Congratulations! To continue your journey with Entando, see the [Getting Started guide](../../docs/getting-started/#login-to-entando) for helpful login instructions and next steps.

## Appendix - Troubleshooting and Common Errors

### Permission Errors

If deploying your Entando Application into your OpenShift namespace generates permission errors, make sure the namespace you're deploying to has the `escalate` and `bind` verbs on Roles. Before installing Entando, run `oc auth can-i escalate role` with your given user in the targeted namespace. If `yes` is returned, the installation should complete. Note that access is only required in the namespace where you are deploying your Entando Application. No cluster level access is required.

Check with your cluster administrator if you need help assigning Roles. Generally, this requires the creation of a Role, preferably a ClusterRole with the above permissions. Your Entando installer needs to be given this Role in the target namespace, in accordance with how administrators manage security. For example, if the ClusterRole is `entando-installer` and the user's name is John, you can add the Role to the user with this command:
`oc policy add-role-to-user entando-installer john -n <your-namespace>`.

### Forbidden Error Installing Entando Custom Resource Definitions in CRC

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

### Network Issues

If you see errors when images are being retrieved (such as ErrImagePull or ImagePullBackOff), you may want to start CRC using ```crc start -n "8.8.8.8```, or configure the nameserver with ```crc config set nameserver 8.8.8.8``` before running ```crc start```. This will allow the cluster to perform DNS lookups via Google's public DNS server.

If you're on Windows, you should also check out these [Tips and Tricks](../../docs/reference/local-tips-and-tricks.md) since CRC relies on Windows Hyper-V by default. This can result in network issues when the host computer is restarted.
