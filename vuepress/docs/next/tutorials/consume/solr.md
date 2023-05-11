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

2. Install the Solr and Zookeeper CRDs
```
kubectl create -f https://solr.apache.org/operator/downloads/crds/v0.5.0/all-with-dependencies.yaml
```
3. Install the Solr operator and Zookeeper Operator
```
helm install solr-operator apache-solr/solr-operator --version 0.5.0
```
4. Download the template `entando-solrCloud.yaml`

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-solrCloud.yaml"</EntandoCode>

5. Replace the placeholders in `entando-solrCloud.yaml` with the appropriate values for your environment.
   
   | Placeholder | Description |
   |:--|:-- |
   | YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com |

3. Apply the Solr application YAML
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

1. Generate the Solr core with the following command

   | Placeholder | Description |
   |:--|:-- |
   | YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com |
   | YOUR-PRIMARY-CORE-NAME | The primary's tenant core name |

```
curl http://YOUR-SOLR-INGRESS/solr/admin/collections?action=CREATE&name=YOUR-PRIMARY-CORE-NAME&numShards=1&replicationFactor=3&maxShardsPerNode=2
```
You can get the ingress URL by running the following command `kubectl get ing | grep solr | awk '{print $3}'`. It is the first value which are separated by commas.

>The number of shards and shards per node should be adjusted for very large quantities of content, such as 50k or more. In such cases, adjustments to replicas and other resources may be needed.

## Edit the Entando App Engine Deployment
1. Scale down the App Engine deployment (entando-de-app image) to 0
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```

2. Using `YOUR-SOLR-INGRESS` from above, edit the App Engine deployment and add the following env variables

```
spec
  -env
     - name: SOLR_ACTIVE
       value: "true"
     - name: SOLR_ADDRESS
	     value: http://YOUR-SOLR-INGRESS/solr 
```
 
3. Scale the `entando-de-app` deployment back up to 1
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```

**Resources**

Go to the [Solr Operator](https://artifacthub.io/packages/helm/apache-solr/solr-operator) resource page for additional information.
