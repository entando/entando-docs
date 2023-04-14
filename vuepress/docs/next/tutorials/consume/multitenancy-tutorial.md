---
sidebarDepth: 2
---

# Multitenancy on Entando

To apply multitenant architecture with multiple tenants on Entando, you must create a primary environment where the secondary tenants can reside and share certain resources. This tutorial provides the instructions for this application if Entando. The primary tenant must initially be configured with cache management, search capability and content delivery server (CDS) services. Then, secondary tenants can be created and configured with its own isolated set of services through a ConfigMap which is the last step in this process. 

See <!-- [Multitenancy on Entando](../../docs/consume/multitenancy.md) -->, for details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher.](../../../docs/getting-started/README.md)

* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Configure the Services for the Primary Tenant

1. Configure the Redis cache management service. Redis integration tutorial

2. Add Solr integration for the external search engine. Solr integration tutorial

3. Add CDS integration to manage static resources. CDS integration tutorial

## Configure the Secondary Tenant
The secondary tenant has the same capabilities as the primary tenant but with its own isolated data. For each new tenant, you will need to configure services for the Keycloak, database system, Solr core, and CDS instance. Each tenant will also require a ConfigMap.

A subdomain name is required for each tenant, referred to as YOUR-TENANT1-CODE. This is the main way the tenants are identified internally. A secondary tenant can have multiple Fully Qualified Domain Names, (FQDNs) as long as they are defined in the `fqdns` field in the ConfigMap as shown in the example below. The `fqdns` field determines which tenant's configmap to use when an http request is made.

### Keycloak Configuration
Import the realm for Keycloak from the primary tenant and reconfigure it for the secondary tenant as follows. Note that YOUR-TENANT1-CODE is the subdomain name of your first secondary tenant.
1. Go to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization) which is typically located at `http://YOUR-HOST-URL/auth`.
2. Follow this tutorial to [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md). 
3. Edit the generated JSON file of the realm with these updates:
     * remove every `id` attribute. There will be many. Save the JSON as `realm-YOUR-TENANT1-CODE.json, using the tenant code. The tenant code will become the prefix of the domain host name or URL. 
     * Replace the properties `realm` & `displayName` with your tenant code.
     * Add the tenant code as a prefix followed by "." to the following fields:
`redirectUris` & `webOrigins` under the clientId for `entando-web`, `quickstart` and `quickstart-de`.  
For example: 
```
"redirectUris": [
    	"http://YOUR-TENANT1-CODE.YOUR-HOST-URL/entando-de-app/*"
  	],
```
Save the file. 

4. In the Keycloak admin console, go to `Import` in the left navigation sidebar to add the new realm for first tenant. Select the new JSON file for the first tenant. **Is this the primary's keycloak admin console??? And do you import realm or "Add realm" under Entando Header **
5. Go to `Clients` and choose `Edit` under `Actions` for `quickstart` Client ID. Under the `Credentials` tab, regenerate Secret. Save this secret for your secondary tenant's ConfigMap. 
6. Repeat step 5 for `quickstart-de` Client ID. 
6. In the new realm, create an `admin` user to manage the users and roles for this realm. **what client roles should be assigned???**

### Solr
Create the Solr core for the secondary tenant. apply one option from below: 
 
* For Solr **standalone**:  
 1. Shell into the SOLR pod: 

	``` sh 
	kubectl exec -it POD-NAME -- /bin/bash
	```
 2. Create the core:

     ``` sh
	bin/solr create_core -c TENANT1-CORE-NAME
     ```  
  
* For Solr **cloud high availability (HA)** application:
	```	sh	
    curl "http://YOUR-NAMESPACE-solr-solrcloud.[suffix_domain]/solr/admin/collections?action=CREATE&name=entando&numShards=1&replicationFactor=3&maxShardsPerNode=2"
  ```

### Configure CDS 
If you created your CDS with a script, adapt it for secondary tenant with the new subdomain, modifying the ingress, editing the API paths and uploading the new resources. The following is a brief summary of the steps required when descriptors were used to configure the original CDS.
#### Create the descriptors
1. Adapt the descriptors from the primary tenant for the secondary tenant by editing the names with YOUR-TENANT1-CODE where applicable and the ingress with the additional tenant1 subdomain prefix. The descriptors include the persistent volume discriptor, Keycloak 
2. Apply the descriptors
3. Create the API requests which should include the following parameters:
  * "CDS_PATH" : # the base path of the new CDS 
  * "KC_URI" : # the url of token service of the tenant1 realm 
  * "KC_CLIENT_ID" : # the clientId of the reserved client used by the enanto-de-app in tenant1 realm
  **what is the reserved client???**
  * "KC_CLIENT_SECRET" : # the secret of that client

4. Create the archive and upload it to the CDS service the resources for YOUR-TENANT1-CODE. 

### Databases 
Create a single schema for your database that maps all the tables for content, templates, users, groups, widgets, etc. 
* Add Liquibase DB management option for secondary tenants

### Ingress
Create and apply the ingress descriptor with the following information.
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
  - host: YOUR-TENANT1-CODE.YOUR-HOST-URL
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

### ConfigMap 
Create and apply a new ConfigMap for the secondary tenant. Then edit the App Engine `entando-de-app` deployment to point to this ConfigMap.

1. Create a new ConfigMap containing the tenant codes, Keycloak, database, CDS and Solr services and ingresses. 

Here is an example: **isn't part in yaml format and part in json format???**
``` json
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

2. Use kubectl to create a secret for the ConfigMap. Though this step is optional, it is recommended for best practices.
```
kubectl -n ent create secret generic tenant-config --from-file=ENTANDO_TENANTS=YOUR-TENANTS-CONFIGMAP
```

3. Scale down the App Engine deployment (de-app image) to 0
4. Open the `entando-de-app` deployment and add the environment variable to point to the ConfigMap or to use the K8s Secret:  

4A. to point to the new ConfigMap under spec.template.spec.containers:
```
	envFrom:
    	- configMapRef:
          name: YOUR-TENANTS-CONFIGMAP
```
4B. If you're using a K8s Secret for the ConfigMap, use this environment variable instead:
```
envFrom:
- secretRef:
    name: tenant-config
```
or
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

**Where to put this information??**
* for wildfly/eap application server, use `JBOSS_MAX_POST_SIZE` to configure the listener max-post-size; the default value is 1,073,741,824 bytes. Enter the custom value in bytes.
