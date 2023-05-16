---
sidebarDepth: 2
---

# Solr Integration
Solr is an enterprise search platform with full-text search, real-time indexing, dynamic clustering, database integration, NoSQL features, and rich document handling. Solr can be integrated into applications made on Entando and is especially useful in applications built for high availiability multitenant architecture.

To employ Solr, the index and configuration files called the core, has to be created. This tutorial decribes the instructions for both the general and multitenant use cases. For a mulitenant application, a core has to be generated for the primary and each of the secondary tenants. For secondary tenants, see the [Multitenacy on Entando](./multitenancy-tutorial.md) tutorial.

## Prerequisites
* [A working instance of Entando](../../docs/getting-started/README.md). with the default Tomcat server image
* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md): `ent check-env develop`
* [Helm](https://helm.sh/docs/intro/install/) to handle Solr installation

## Install and Configure Solr 
 
1. Install Solr Helm charts  
```
helm repo add apache-solr https://solr.apache.org/charts
helm repo update
```  
For more information, see the [Solr Getting Started page](https://solr.apache.org/guide/7_3/solr-tutorial.html).

2. Install the Solr and Zookeeper CRDs. **Note:** creating the CRDs and installing the operators is done at the cluster level and will require cluster-level permissions.
```
kubectl create -f https://solr.apache.org/operator/downloads/crds/v0.5.0/all-with-dependencies.yaml
```
3. Install the Solr and Zookeeper operators
```
helm install solr-operator apache-solr/solr-operator --version 0.5.0
```
4. Download the template `entando-solrCloud.yaml`

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-solrCloud.yaml"</EntandoCode>

5. Replace the placeholders in `entando-solrCloud.yaml` with the appropriate values for your environment. You can also adjust the resource settings, e.g., memory, cpu, storage, replicas.
   
   | Placeholder | Description |
   |:--|:-- |
   | YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com |

3. Create the Solr application resources
```
kubectl apply -f entando-solrCloud.yaml -n YOUR-NAMESPACE
```
4. To check that the service has started properly:
```
kubectl get solrclouds -w
```
You should see a response similar to this:
```
NAME   VERSION   TARGETVERSION   DESIREDNODES   NODES   READYNODES   UPTODATENODES   AGE
solr   8                         3              3       3            3               79m
```

## Generate the Core

1. Enable port-forwarding
First you need to enable a port forwarding to the Solr common service using Kubectl
```
kubectl port-forward service/solr-solrcloud-common 8983:80
```
kubectl port-forward does not return. To continue, you need to open another terminal.

2. Call the Solr API to generate the core

   | Placeholder | Description |
   |:--|:-- |
   | YOUR-TENANT-ID | The identifier for the tenant, e.g., mysite1 |

If you are building the primary tenant, then you have to use "entando" instead of "YOUR-TENANT-ID" for the collection name.

```
curl "http://localhost:8983/solr/admin/collections?action=CREATE&name=YOUR-TENANT-ID&numShards=1&replicationFactor=3&maxShardsPerNode=2"
```

>The number of shards and shards per node should be adjusted for very large quantities of content, such as 50k or more. In such cases, adjustments to replicas and other resources may be needed.

## Edit the Entando App Engine Deployment
1. Scale down the App Engine deployment (entando-de-app image) to 0
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```

2. Edit the App Engine deployment and add the following env variables

```
spec
  -env
     - name: SOLR_ACTIVE
       value: "true"
     - name: SOLR_ADDRESS
	     value: http://solr-solrcloud-common/solr 
```
 
3. Scale the `entando-de-app` deployment back up to 1
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```

**Note:** When Solr is first enabled, the application content should be reindexed via `App Builder` → `Content` → `Settings` → `Reload the indexes`

4. (Optional) Confirm Solr is configured correctly:
* Access the App Builder and verify the `Solr Configuration` menu is present under the Content menu. This allows tactically re-indexing specific content types.
* Use the Search Form widget to confirm Content items can be found via search. This widget is automatically placed in the header of a [page created via the Welcome Wizard](../../docs/compose/welcome-wizard.md).

**Resources**

Go to the [Solr Operator](https://artifacthub.io/packages/helm/apache-solr/solr-operator) resource page for additional information.
