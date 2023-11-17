---
sidebarDepth: 2
---

# Solr Integration
Solr is an enterprise search platform with full-text search, real-time indexing, dynamic clustering, database integration, and rich document handling. Solr can be integrated into applications built on Entando and is required for multitenant architecture.

This tutorial describes the installation steps for Solr integration, including the generation of the core collection which consists of the index and configuration files. For multitenant applications, a core collection must be generated for the primary or first tenant, and each of the secondary tenants. 

## Prerequisites
* [A working instance of Entando](../../docs/getting-started/README.md) based on the default Tomcat server image
* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md): `ent check-env develop`
* [Helm](https://helm.sh/docs/intro/install/) to handle the Solr installation

## Install and Configure Solr 
 
1. Install Solr Helm charts:  
``` bash
helm repo add apache-solr https://solr.apache.org/charts
helm repo update
```  
2. Install the Solr and Zookeeper CRDs.  
**Note:** Creating the CRDs and installing the operators are done at the cluster level and will require cluster-level permissions.
``` bash
kubectl create -f https://solr.apache.org/operator/downloads/crds/v0.5.0/all-with-dependencies.yaml
```
3. Install the Solr and Zookeeper operators:
``` bash
helm install solr-operator apache-solr/solr-operator --version 0.5.0
```
4. Download the template `entando-solrCloud.yaml`. Adjust the resource settings such as memory, CPU, storage, or replicas using this file.

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-solrCloud.yaml"</EntandoCode>

5. Create the Solr application resources:
``` bash
kubectl apply -f entando-solrCloud.yaml -n YOUR-NAMESPACE
``` 
6. Check that the service started properly:
``` bash
kubectl get solrclouds -w
```
You should see a response similar to this:
``` bash
NAME   VERSION   TARGETVERSION   DESIREDNODES   NODES   READYNODES   UPTODATENODES   AGE
solr   8                         3              3       3            3               79m
```

## Generate the Core

1. Set up port forwarding to the Solr common service:
``` bash
kubectl port-forward service/solr-solrcloud-common 8983:80
```
**Note:** `kubectl port-forward` should be left running.

2. Open another terminal and call the Solr API to generate the Solr core collection.     
 **Note:** the first core (the primary tenant in a multitenant environment, or the only core in a single tenant environment) must use `YOUR-TENANT-NAME`="entando" for the collection name below.  

| Placeholder | Description |
|:--|:-- |
| YOUR-TENANT-NAME | The identifying name of the current tenant. In most cases, it will also be used to determine the base URL of the tenant. For example, yoursite results in yoursite.your-domain.com. |

``` bash
curl "http://localhost:8983/solr/admin/collections?action=CREATE&name=YOUR-TENANT-NAME&numShards=1&replicationFactor=3&maxShardsPerNode=2"
```

>The number of shards and shards per node should be adjusted for very large quantities of content, such as 50k or more. In such cases, adjustments to replicas and other resources may be needed.

## Configure the EntandoApp Deployment
1. Scale down the EntandoApp deployment to 0:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```

2. Edit the deployment and add the following environment variables:

``` yaml
spec:
   containers:
     - env:
       - name: SOLR_ACTIVE
         value: "true"
       - name: SOLR_ADDRESS
         value: http://solr-solrcloud-common/solr 
```
 
3. Scale the `entando-de-app` deployment back up to 1 or more deployments:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```

## Generate the Solr Schema
1. When a new core is added to Solr, its schema also needs to be generated. This is done automatically for the first or primary collection. But for secondary collections, it must be triggered manually by clicking `Refresh` next to each content type under `App Builder` → `Content` → `Solr Configuration`.

2. Reindex the content using `App Builder` → `Content` → `Settings` → `Reload the indexes`. 

3. Confirm Solr is configured and the index is working correctly by using the `Search Form` widget to confirm Content items can be found via search. This widget is automatically placed in the header of a [page created via the Welcome Wizard](../../docs/compose/welcome-wizard.md). For example, searching for `platform` should return at least one result with the default content set.

## Options
### Direct Access to Solr Configuration 
The Solr configuration page can be accessed directly from the `Content` menu list in the App Builder. The configuration page allows you to monitor and update the schema and reload the indexes for each searchable type. 

To enable this option, set the environment variable `advancedSearch` specification to `true` in the EntandoApp deployment YAML.

**Resources**

* Go to the [Solr Operator](https://artifacthub.io/packages/helm/apache-solr/solr-operator) resource page for additional information.
* See the [Solr Getting Started page](https://solr.apache.org/guide/7_3/solr-tutorial.html) for more information.
