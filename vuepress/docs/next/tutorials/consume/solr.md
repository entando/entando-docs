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
* For multitenant applications, the [Content Delivery Server](./mt-cds.md) is required 

## Install and Configure Solr 
 
1. Install Solr:  
```
helm repo add apache-solr https://solr.apache.org/charts
helm repo update
```  
For more information, see the [Solr Getting Started page](https://solr.apache.org/guide/7_3/solr-tutorial.html).

2. Install the Solr and Zookeeper CRDs:
```
kubectl create -f https://solr.apache.org/operator/downloads/crds/v0.5.0/all-with-dependencies.yaml
```
3. Install the Solr operator and Zookeeper Operator:
```
helm install solr-operator apache-solr/solr-operator --version 0.5.0
```
4. Create a descriptor file `deployment-solrCloud.yaml` following the sample below. 

``` yaml
apiVersion: solr.apache.org/v1beta1
kind: SolrCloud
metadata:
  name: solr
spec:
  solrAddressability:
    external:
      domainName: YOUR-HOSTNAME
      method: Ingress
      useExternalAddress: true
  customSolrKubeOptions:
    podOptions:
      resources:
        limits:
          memory: 2Gi
          cpu: 1000m
        requests:
          cpu: 350m
          memory: 2Gi
  dataStorage:
    persistent:
      pvcTemplate:
        spec:
          resources:
            requests:
              storage: 10Gi
      reclaimPolicy: Delete
  replicas: 3
  solrImage:
    repository: entando/entando-solr
    tag: "8"
  solrJavaMem: -Xms2048M -Xmx2048M
  updateStrategy:
    method: StatefulSet
  zookeeperRef:
    provided:
      chroot: /explore
      image:
        pullPolicy: IfNotPresent
        repository: pravega/zookeeper
        tag: 0.2.13
      persistence:
        reclaimPolicy: Delete
        spec:
          accessModes:
            - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
      replicas: 3
      zookeeperPodPolicy:
        resources:
          limits:
            memory: 500Mi
          requests:
            cpu: 250m
            memory: 500Mi

```

3. Apply the Solr application YAML, replacing `entando` with your namespace as needed:
```
kubectl apply -f deployment-solrCloud.yaml -n entando
```
4. To check that the service has started properly:
```
kubectl get solrclouds -w
```
You should see a response similar to this:
```
NAME   VERSION   TARGETVERSION   DESIREDNODES   NODES   READYNODES   UPTODATENODES   AGE
solr   8                         1              1       1            1               79m
```

## Solr Standalone Integration

### Create the Core
1. Shell into the Solr pod:
``` 
kubectl exec -it YOUR-SOLR-POD-NAME -- /bin/bash
```
2. Generate the core:
```
bin/solr create_core -c YOUR-CORE-NAME
```

### Edit the Entando App Engine Deployment
1. Scale down the App Engine deployment (entando-de-app image) to 0.
2. Edit the App Engine deployment and add the following environment variables:

```
spec
  -env
    - name: SOLR_ACTIVE
      value: "true"
    - name: SOLR_ADDRESS
      value: http://solr-solrcloud-0:80/solr
```
3. Scale the `entando-de-app` deployment back up to 1 and check the system.

## Solr Integration for Multitenancy 

### Generate the Core

1. Generate the Solr core with the following command: 

```
curl http://YOUR-SOLR-INGRESS/solr/admin/collections?action=CREATE&name=YOUR-PRIMARY-CORE-NAME&numShards=1&replicationFactor=3&maxShardsPerNode=2
```
`YOUR-SOLR-INGRESS`= YOUR-NAMESPACE-solr-solrcloud.YOUR-HOSTNAME

E.g., if your namespace is `entando` and your hostname is `k8s-entando.org`   
YOUR-SOLR-INGRESS= entando-solr-solrcloud.k8s-entando.org

>The number of shards and shards per node should be adjusted for very large quantities of content, such as 50k or more. In such cases, adjustments to replicas and other resources may be needed.

### Edit the Entando App Engine Deployment
1. Scale down the App Engine deployment (entando-de-app image) to 0.
2. Using `YOUR-SOLR-INGRESS` from above, edit the App Engine deployment and add the following env variables:

```
spec
  -env
     - name: SOLR_ACTIVE
       value: "true"
     - name: SOLR_ADDRESS
	     value: http://YOUR-SOLR-INGRESS/solr 
```
 
3. Scale the `entando-de-app` deployment back up to 1 and check the system.

**Resources**

Go to the [Solr Operator](https://artifacthub.io/packages/helm/apache-solr/solr-operator) resource page for additional information.
