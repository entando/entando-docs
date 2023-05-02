---
sidebarDepth: 2
---

# Multitenancy on Entando

To apply multitenant architecture on Entando, you must create a primary environment where secondary tenants can reside and share resources. The primary tenant must initially be configured with content delivery server (CDS), cache management, and search capability services, each of which are linked below. Then, secondary tenants are created and configured with its own isolated set of services through a ConfigMap as detailed below.

Multitenancy on Entando requires the Tomcat server image for the App Engine to enable Redis session management. This is the default for the `standardServerImage` in the `EntandoApp` custom resource.

See [Multitenancy on Entando](../../docs/consume/multitenancy.md), for details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher.](../../../docs/getting-started/README.md)

* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Configure the Services for the Primary Tenant

1. [Add CDS integration] to manage static resources. 

2. [Configure the Redis] cache management service. 

3. [Add Solr integration] for the external search engine. 

## Configure the Secondary Tenant
The secondary tenant has the same capabilities as the primary tenant but with its own isolated data. For each new tenant, you will need to configure services for Keycloak, database system, Solr core, and CDS instance. Each tenant will also require a ConfigMap.

A subdomain name is required for each secondary tenant, referred to as tenant code internally. For this tutorial, `YOUR-TENANT1-CODE` is used to represent this name and code. A secondary tenant can have multiple fully qualified domain names (FQDNs), as long as they are defined in the `fqdns` field of the ConfigMap as shown in the example below. This field determines which tenant's ConfigMap to use when an http request is made.

### Keycloak Configuration
Import the realm for Keycloak from the primary tenant and reconfigure it for the secondary tenant as follows. 
1. Go to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization) which is typically located at `http://YOUR-HOST-URL/auth`.
2. Follow this tutorial to [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md). 
3. Edit the generated JSON file of the realm with these updates:
     * Remove the many `id` attributes in the file.  The tenant code will become the prefix of the domain host name or URL. 
     * Replace the properties `realm` & `displayName` with your tenant code.
     * Add the tenant code + "." as a prefix to the following fields:
`redirectUris` and `webOrigins` under the clientId for `entando-web`, `quickstart` and `quickstart-de` sections.  

For example: 
```
"redirectUris": [
    	"http://YOUR-TENANT1-CODE.YOUR-HOST-URL/entando-de-app/*"
  	],
```
4. Save the edited file as `realm-YOUR-TENANT1-CODE.json`, using your tenant code.

5. In the Keycloak admin console, click `Entando` at the top of the left navigation bar. Click `Add Realm` from the drop-down menu. Select your tenant's JSON file or enter the name. The `Enabled` button should be "On" to access a new realm.
6. Go to `Clients` and choose `Edit` under `Actions` for `quickstart` Client ID. Under the `Credentials` tab, regenerate the `Secret`. Save this Secret for your secondary tenant's ConfigMap. 
7. Repeat step 6 for `quickstart-de` Client ID. 
8. In the new realm, create an `admin` user to manage the users and roles for this realm. Go to `Manage Users` from the left navigation options and [assign `realm-management` Client Role to the admin user](../../docs/consume/identity-management.md#role-assignment-for-pluginsmicroservices).

### Solr
1. Create the Solr core for the secondary tenant:  
```	sh	
    curl "http://YOUR-NAMESPACE-solr-solrcloud.[suffix_domain]/solr/admin/collections?action=CREATE&name=TENANT1-CORE-NAME&numShards=1&replicationFactor=3&maxShardsPerNode=2"
```

### Configure the CDS 
If you created your content delivery server with a script, adapt it for secondary tenant with the new tentant's subdomain, modifying the ingress, editing the API paths and uploading the new resources. The following describes the guidelines required when descriptors were used to configure the original CDS.
 
1. Adapt the descriptors from the primary tenant for the secondary tenant by editing the name with YOUR-TENANT1-CODE where applicable and the ingress with the additional tenant1 subdomain prefix. The required descriptors include the persistent volume, Keycloak, ingress, and deployment/service. 
2. Apply the edited descriptors.
3. Create the API requests which should include the following parameters:
  * `CDS_PATH` : # the base path of the new CDS 
  * `KC_URI` : # the url of the token service of tenant1's realm 
  * `KC_CLIENT_ID` : # the clientId of the corresponding confidential client used by the `entando-de-app` in tenant1's realm
  * `KC_CLIENT_SECRET` : # the secret of that client

4. Create an archive of the resources and upload it to the CDS service for YOUR-TENANT1-CODE. 

### Databases 
Create a single schema for your database that maps all the tables for content, templates, users, groups, widgets, etc. Liquibase is used for database management for both the primary and secondary tenants in mulititenancy but the prescribed default behavior of this process can be modified by using the following methods.

**Apply Strategy in the App Engine**

Use this database strategy specification in the entando-de-app image to set the strategy for all tenants, including the primary and all secondary tenants.   
* `db.migration.strategy`: "skip|disabled|auto|generate_sql" # defaults to 'auto' which uses Liquibase to initialize checks and updates on the DBs

**Apply Strategy for Secondary Tenant**  
For a secondary tenant, the `dbMigrationStrategy` environment variable in the tenant `ConfigMap` can be used to modify the default Liquibase DB management specification in the App Engine. 

* `dbMigrationStrategy`: "skip|disabled|auto|generate_sql" # default is 'skip'; to skip the entire Liquibase process of checking databasechangelog tables and changeSetFiles

* If `dbMigrationStrategy` is not present inside the tenant `ConfigMap`, it looks for the value in the db.migration.strategy system property.

### New Tenant Ingress 
Create and apply the ingress descriptor with the following information:
``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    entando.org/quickstart-appbuilder-path: /app-builder/
    entando.org/quickstart-de-path: /digital-exchange
    entando.org/quickstart-pn-3c07adf0-fac54a9f-entando3323-pn-3c07adf0-fa-path: /entando-epc-bootstrap-3c07adf0/app-builder-menu-bff
    entando.org/quickstart-server-path: /entando-de-app
  generation: 4
  labels:
    EntandoApp: quickstart
  name: YOUR-TENANT1-CODE-quickstart-ingress
  namespace: entando
spec:
  rules:
  - host: YOUR-TENANT1-CODE.YOUR-DOMAIN
    http:
      paths:
      - backend:
          service:
            name: quickstart-ab-service
            port:
              number: 8081
        path: /app-builder/
        pathType: Prefix
      - backend:
          service:
            name: quickstart-service
            port:
              number: 8080
        path: /entando-de-app
        pathType: Prefix
      - backend:
          service:
            name: quickstart-cm-service
            port:
              number: 8083
        path: /digital-exchange
        pathType: Prefix
      - backend:
          service:
            name: pn-3c07adf0-fac54a9f-entando-app-builder-menu-bff-service
            port:
              number: 8081
        path: /entando-epc-bootstrap-3c07adf0/app-builder-menu-bff
        pathType: Prefix
```

### Create and Apply the ConfigMap 
Create and apply a new ConfigMap for the secondary tenant as described below. Then edit the App Engine `entando-de-app` deployment to point to this ConfigMap.

1. Create a new ConfigMap containing the tenant codes, Keycloak, database, CDS and Solr services and ingresses. 

Here is an example: 
``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: YOUR-TENANTS-CONFIGMAP
data:
  ENTANDO_TENANTS: >-
        [
            {
                "tenantCode": "YOUR-TENANT1-CODE", # default subdomain name 
                "fqdns": "YOUR-TENANT1-CODE.YOUR-DOMAIN" # value string and comma separated domains
                "kcEnabled": true,
                "kcAuthUrl": "http://YOUR-DOMAIN/auth",
                "kcRealm": "YOUR-TENANT1-REALM",
                "kcClientId": "quickstart",
                "kcClientSecret": "YOUR-TENANT1-SECRET",
                "kcPublicClientId": "entando-web",
                "kcSecureUris": "",
                "kcDefaultAuthorizations": "",
                "dbDriverClassName": "org.postgresql.Driver",
                "dbUrl": "YOUR-POSTGRESQL-TENANT1-URL",
                "dbUsername": "postgres",
                "dbPassword": "e7d60efa865c4510",
                "cdsPublicUrl": "http://cds.YOUR-DOMAIN/YOUR-TENANT1-CODE/",
                "cdsPrivateUrl": "http://YOUR-TENANT1-CODE-cds:8080/",
                "cdsPath": "api/v1",
                "solrAddress": "http://YOUR-SOLR-URL",
                "solrCore": "TENANT1-CORE-NAME"
            },
            {
                "tenantCode": "YOUR-TENANT2-CODE",
                "fqdns": "www.YOUR-TENANT2-CODE.com,YOUR-TENANT2-CODE.YOUR-DOMAIN.com,news.YOUR-DOMAIN.com"
                "kcEnabled": true,
                "kcAuthUrl": "https://YOUR-DOMAIN/auth",
                "kcRealm": "YOUR-TENANT2-REALM",
                "kcClientId": "quickstart",
                "kcClientSecret": "YOUR-TENANT2-SECRET",
                "kcPublicClientId": "entando-web",
                "kcSecureUris": "",
                "kcDefaultAuthorizations": "",
                "dbDriverClassName": "org.postgresql.Driver",
                "dbUrl": "YOUR-POSTGRESQL-TENANT2-URL",
                "dbUsername": "postgres",
                "dbPassword": "xxx",
                "cdsPublicUrl": "http://cds.YOUR-DOMAIN/YOUR-TENANT2-CODE/",,
                "cdsPrivateUrl": "http://mt720-cds-YOUR-TENANT2-CODE-service.test-mt-720.svc.cluster.local:8080/",
                "cdsPath": "api/v1",
                "solrAddress": "http://solr-solrcloud-common.test-mt-720.svc.cluster.local/solr",
                "solrCore": "TENANT2-CORE-NAME"
  }
        ]
```

2. (Optional) Use kubectl to create a Secret for the ConfigMap. Though this step is optional, it is recommended for best practices.
```
kubectl -n YOUR-NAMESPACE create secret generic tenant-config --from-file=ENTANDO_TENANTS=YOUR-TENANT1-CONFIGMAP
```

3. Scale down the App Engine deployment (de-app image) to 0
4. Open the `entando-de-app` deployment and add the environment variable to point to the ConfigMap or to use a K8s Secret:  

   A. Point to the new ConfigMap under spec.template.spec.containers:
    ```
	   envFrom:
    	  - configMapRef:
          name: YOUR-TENANT1-CONFIGMAP
     ```
   B. If you're using a K8s Secret for the ConfigMap, use this environment variable instead:
    
     ```
     -env:
        - name: ENTANDO_TENANTS # this name is mandatory, you cannot change it
          valueFrom:
              secretKeyRef:
               key: ENTANDO_TENANTS  # the key used inside the secret 
               name: tenant-config # the name used for the secret 
               optional: false
```
5. Scale the de-app deployment back up to 1 and check the system and test the new new tenant.

### Tomcat Options
Entando's multitenancy application uses the Tomcat servlet container and provides a few optional parameters.

**Enabling a Java Agent for Tomcat**
To use a Java agent with your application, Entando provides a method using the initContainers with a PVC to prepare the JAR file with the information required for the agent. Add the following environment variables to the `entando-de-app-tomcat` deployment to activate the agent and provide the agent code from the JAR file.  
``` yaml
AGENT_ENABLED: "true" # if true, adds the agent options to tomcat, defaults to false
AGENT_OPTS: "-javaagent:~/YOUR-JARFILE.jar" # the jar file with the agent options to use, defaults to empty  
```
**Manange Upload File Size Limitations**  
Add these environment variables to the `entando-de-app-tomcat` deployment to customize the application-server and application upload file maximum sizes.

* For Tomcat application server, use `TOMCAT_MAX_POST_SIZE` to configure connector maxPostSize; the default value is 209,715,200 bytes. Enter the value in bytes.

* For the application, use `FILE_UPLOAD_MAX_SIZE` to configure the application upload limit; the default value is 52,428,800 bytes. Enter the value in bytes.




