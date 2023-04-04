---
sidebarDepth: 2
---

# Solr Integration
Solr is an enterprise search platform with full-text search, real-time indexing, dynamic clustering, database integration, NoSQL features, and rich document handling. Solr is used in Entando's multitenancy architecture for its scalability and fault tolerance, as well as these features.

To employ Solr, the index and configuration files on a node called the core, has to be created for the primary and each secondary tenant. This tutorial covers the configuration for the Primary tenant. Configuring the service for a secondary tenant is a similar process, and for more information, see the main tutorial on multitenancy(ADDLINK)

## Configure Solr

### Create the Descriptor
1. Scale down the App Engine deployment (entando-de-app image) to 0.

2. Install Solr. For more information, see the [Solr Getting Started page](https://solr.apache.org/guide/7_3/solr-tutorial.html). 

3. Create a descriptor file and check that the ingress path serves your instance of Solr. 

For example:
``` yaml
apiVersion: v1
kind: Service
metadata:
  name: solr
spec:
  ports:
  - port: 8983
  selector:
    app: solr
  clusterIP: None
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: solr
spec:
  selector:
    matchLabels:
      app: solr
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: solr
    spec:
      containers:
      - image: solr:8
        name: solr
        ports:
        - containerPort: 8983
          name: solr
---
kind: Ingress
apiVersion: networking.k8s.io/v1
metadata:
  name: quickstart-solr-ingress
spec:
  rules:
    - host: solr.10-219-168-122.nip.io
      http:
        paths:
          - path: /solr
            pathType: ImplementationSpecific
            backend:
              service:
                name: solr
                port:
                  number: 8983
```

3. Apply the Solr application YAML.

### Edit the App Engine Deployment
1. Edit the `entando-de-app` deployment and add the following env variables for your instance:

```
- name: SOLR_ACTIVE
  value: "true"
- name: SOLR_ADDRESS
  value: http://solr:8983/solr
```
  * For a Solr Cloud high availability (HA) application, the address should be:
     ```
    - name: SOLR_ADDRESS
	  value: http://<SOLR_CLOUD_SERVICE>/solr
     ```

### Create the Core
1. Shell into the Solr pod:
``` 
kubectl exec -it YOUR-SOLR-POD-NAME -- /bin/bash
```
2. Generate the core:
    * For a Solr standalone application:
    ```
	bin/solr create_core -c entando
    ```
    * For a Solr Cloud (HA) application:
    ```
	curl http://YOUR-NAMESPACE-solr-solrcloud.YOUR-DOMAIN/solr/admin/collections?action=CREATE&name=entando&numShards=1&replicationFactor=3&maxShardsPerNode=2
    ```
3. Scale the `entando-de-app` deployment back up to 1 and check the system.
