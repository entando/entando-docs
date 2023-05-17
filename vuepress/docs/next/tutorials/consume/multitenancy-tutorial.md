---
sidebarDepth: 2
---

# Multitenancy on Entando

This tutorial details how to configure Entando to serve multiple tenants. The initial or primary tenant must first be configured with a content delivery server (CDS), cache management, and search capability services. Secondary tenants can then be added to the environment. See [Multitenancy on Entando](../../docs/consume/multitenancy.md) for more details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher](../../docs/getting-started/README.md) based on the Tomcat server image. This is the default for the `standardServerImage` in the `EntandoApp` custom resource.


## Configure the Services for the Primary Tenant

1. [Add CDS integration](./mt-cds.md) to manage static resources. 

2. [Configure the Redis](./redis.md) cache management service. 

3. [Add Solr integration](./solr.md) for the search engine. 

>Note: Access to the Local Hub and installation of bundles from a Hub catalog is restricted to the primary tenant.


## Configure the Secondary Tenant
The secondary tenant has the same capabilities as the primary tenant but with its own isolated data. For each new tenant, you will need to configure services for Keycloak, a CDS instance, Solr core, an ingress and database schema. Each tenant will also require a ConfigMap.

| Placeholder | Description 
|:--|:--
| YOUR-APP-NAME | The name of the application, e.g., quickstart
| YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com
| YOUR-TENANT1-ID | refers to the identifying name of the secondary tenant and also works as a subdomain name
| YOUR-NAMESPACE | The Kubernetes namespace name in which your app is running


### Keycloak Configuration
Import the realm for Keycloak from the primary tenant and reconfigure it for the secondary tenant.
1. Follow the first step of this tutorial [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md) 
2. Edit the generated JSON file of the realm with these updates:
     * Remove every `id` attribute in the file.  
     * Replace the properties `realm` & `displayName` with YOUR-TENANT1-ID.
     * Add `YOUR-TENANT1-ID` + "." as a prefix to the following fields:
`redirectUris` and `webOrigins` under `clientId` with `entando-web`, `YOUR-APP-NAME` and `YOUR-APP-NAME-de`.  

For example, if `YOUR-APP-NAME` is quickstart, and `YOUR-TENANT1-ID` is 2ndtenant1:
```
 "clientId" : "entando-web",
 "redirectUris" : [ "https://2ndtenant1.quickstart.k8s-entando.org/*" ],
 "webOrigins" : [ "https://2ndtenant1.quickstart.k8s-entando.org" ],
```
3. Save the edited file as `realm-YOUR-TENANT1-ID.json`.

4. Log in to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization), typically located at `http://YOUR-APPNAME.YOUR-HOST-NAME/auth`
5. In the Keycloak admin console, click `Entando` at the top of the left navigation bar. Click `Add Realm` from the drop-down menu. Select your tenant's JSON file or enter the name. The `Enabled` button should be "On" to access a new realm.
6. In the new realm, go to `Clients` and choose `Edit` under `Actions` for your application name under the list of Client IDs. Under the `Credentials` tab, regenerate the `Secret`. 
7. Repeat step 6 for `YOUR-APP-NAME-de` Client ID. 
8. Create an `admin` user to manage the users and roles for this realm. Go to `Manage Users` from the left navigation options and [choose `realm-management` Client Role and select `manage-realm` role](../../docs/consume/identity-management.md#authorization) for the admin user. 

### Configure the CDS 
 
Follow the same procedures for [configuring the primary tenant](./mt-cds.md) for your secondary tenant YOUR-TENANT1-ID.


### Solr
1. Create the Solr core for the secondary tenant:  
```	sh	
curl "http://YOUR-NAMESPACE-solr-solrcloud.YOUR-HOSTNAME/solr/admin/collections?action=CREATE&name=YOUR-TENANT1-ID&numShards=1&replicationFactor=3&maxShardsPerNode=2"
```

### Databases 
Create a single schema for your database that maps all the tables for content, templates, users, groups, widgets, etc. Liquibase is used for database management for both the primary and secondary tenants in mulititenancy but the prescribed default behavior of this process can be modified by using the following methods.

**Apply the Strategy in the App Engine Deployment**

Use this database strategy specification in the `entando-de-app` image to set the strategy for all tenants, including the primary and all secondary tenants.   
* `db.migration.strategy`: "skip|disabled|auto|generate_sql" # defaults to 'auto' which uses Liquibase to initialize checks and updates on the DBs

**Apply the Strategy for Secondary Tenant**  
For a secondary tenant, the `dbMigrationStrategy` environment variable in the tenant `ConfigMap` can be used to modify the default Liquibase DB management specification in the App Engine. 

* `dbMigrationStrategy`: "skip|disabled|auto|generate_sql" # default is 'skip'; to skip the entire Liquibase process of checking databasechangelog tables and changeSetFiles

* If `dbMigrationStrategy` is not present inside the tenant `ConfigMap`, it looks for the value in the db.migration.strategy system property.

### Create the New Tenant Ingress and Secret
Download the template `entando-tenant.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-tenant.yaml"</EntandoCode>

Replace the placeholders in `entando-tenant.yaml` with the appropriate values for your environment.

**Note** A tenant can have multiple fully qualified domain names (FQDNs), as long as they are defined in the `fqdns` field of the [ConfigMap](#create-and-apply-the-configmap). This field determines which tenant's ConfigMap to use when an http request is made.

Example:
```
"fqdns": "www.YOUR-TENANT2-CODE.com,YOUR-TENANT2-CODE.YOUR-HOST-NAME.com,news.YOUR-HOST-NAME.com"
```

### Configure the EntandoApp with the ConfigMap 

1. Scale down the EntandoApp deployment to 0:
```
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```
2. Edit deployment YAML and add the environment variable to point to the K8s Secret:

```
-env:
   - name: ENTANDO_TENANTS
     valueFrom:
         secretKeyRef:
          key: ENTANDO_TENANTS  # the key used inside the secret 
          name: YOUR-TENANT1-ID-SECRET # the name used for the secret 
          optional: false
```
3. Scale the deployment back up to 1 or more replicas:
```
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```
4. Confirm that the secondary tenant is working 


### Tomcat Options
Entando's multitenancy application uses the Tomcat servlet container and provides a few optional parameters.

**Enabling a Java Agent for Tomcat**  
To use a Java agent with your application, Entando provides a method using the initContainers with a PVC to prepare the JAR file with the information required for the agent. Add the following environment variables to the `entando-de-app-tomcat` deployment to activate the agent and provide the agent code from the JAR file.  
``` yaml
AGENT_ENABLED: "true" # if true, adds the agent options to tomcat, defaults to false
AGENT_OPTS: "-javaagent:~/YOUR-JARFILE.jar" # the jar file with the agent options to use, defaults to empty  
```
**Manage Upload File Size Limitations**  
Add these environment variables to the `entando-de-app-tomcat` deployment to customize the application-server and application upload file maximum sizes.

* For Tomcat application server, use `TOMCAT_MAX_POST_SIZE` to configure connector maxPostSize; the default value is 209,715,200 bytes. Enter the value in bytes.

* For the application, use `FILE_UPLOAD_MAX_SIZE` to configure the application upload limit; the default value is 52,428,800 bytes. Enter the value in bytes.
