---
sidebarDepth: 2
---

# Multitenancy on Entando

This tutorial details how to configure Entando to serve multiple tenants. See [Multitenancy on Entando](../../docs/consume/multitenancy.md) for more details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher](../../docs/getting-started/README.md) based on the Tomcat server image. This is the default for the `standardServerImage` in the `EntandoApp` custom resource.

## Configure the Primary Tenant Services to Support Multitenancy
The initial or primary tenant must first be configured with a content delivery server (CDS), cache management, and search capability services. Each of these steps requires updating the default `entando-de-app` configuration.

1. [Install and enable the Entando Content Delivery Server (CDS)](./mt-cds.md) to manage static resources. 

2. [Install and enable Redis](./redis.md) to handle cache and clustering. 

3. [Install and enable Solr integration](./solr.md) to enable enterprise search. 

>Note: Access to the Local Hub and installation of bundles from a Hub catalog is restricted to the primary tenant.


## Configure the Secondary Tenant
The secondary tenant has the same capabilities as the primary tenant but with its own isolated data. For each new tenant, you will need to configure services for Keycloak, a CDS instance, Solr core, an ingress and database schema. Each tenant will also require a ConfigMap.

| Placeholder | Description 
|:--|:--
| YOUR-APP-NAME | The name of the application, e.g., quickstart
| YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com
| YOUR-TENANT-ID | Refers to the identifying name of the current tenant and also works as a subdomain name, e.g., yoursite results in yoursite.your-domain.com for the base url of the tenant
| YOUR-NAMESPACE | The Kubernetes namespace in which your app is running

### Keycloak
Each tenant requires its own Keycloak realm. The following steps show how to create a tenant-specific realm in the standard Entando-deployed Keycloak instance.

1. [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md) 
2. Remove the `id` attributes so Keycloak will recognize the data as new entries upon import:
``` bash
sed -i '/"id" : "/ d' keycloak-entando-realm.json
```
3. Replace the properties `realm` & `displayName` with YOUR-TENANT-ID. Adjust the original realm name if your source realm was not named `entando`.
``` bash
sed -i 's/"entando"/"YOUR-TENANT-ID"/g' keycloak-entando-realm.json
```
4. Update the values of `redirectUris` and `webOrigins` to use YOUR-TENANT-ID:
``` bash
sed -i 's/\/\/YOUR-APP-NAME\./\/\/YOUR-TENANT-ID\.YOUR-APP-NAME\./g' keycloak-entando-realm.json
```
> This should transform the URIs from `http(s)://YOUR-APP-NAME.YOUR-HOST-NAME` to `http(s)://YOUR-TENANT-ID.YOUR-APP-NAME.YOUR-HOST-NAME`

5. Log in to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization), typically located at `http(s)://YOUR-APPNAME.YOUR-HOST-NAME/auth`

6. Go to `Entando` in the top left nav → `Add Realm` → select your `keycloak-entando-realm.json file`. Click `Create`.

7. In the new realm, go to `Clients` → click on the client with the Client ID `YOUR-APP_NAME`. On the `Credentials` tab, regenerate the `Secret`. 

> Note: The Secret for this client will be needed  in the `entando-tenant-config` secret below as `YOUR-TENANT-KC-SECRET`

8. Regenerate the Secret for Client ID `YOUR-APP-NAME-de` as well. 

9. Go to `Manage Users` and click on the `admin` user. [Grant the user the Role Mapping](../../docs/consume/identity-management.md#authorization) for the Client `realm-management` and Role `manage-realm`.

10. (Optional) Go to `Attributes` and set a unique password for the `admin` user.

### Content Delivery Server (CDS)
Each tenant requires its own set of CDS resources. Follow the [CDS tutorial](./mt-cds.md) to prepare these resources.

### Solr
Each tenant requires a dedicated Solr core or collection. Follow the [Solr tutorial](./solr.md#generate-the-core) to setup the core for the tenant. 

### Database
Each tenant requires a new database schema for the Entando tables related to the page structure, web content, widgets, etc. The following steps provide a way to export the schemas in a default Entando installation using the Entando-generated PostgreSQL instance. The exact commands will differ for external databases or different DBMS types.

1. Determine the name of your PostgreSQL pod (YOUR-POSTGRESQL-POD):
``` bash
kubectl get pods | grep postgres`
```
Example:
```
default-postgresql-dbms-in-namespace-deployment-54bb664745lxllh
```

2. Determine the names of the two source schemas:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- psql -d default_postgresql_dbms_in_namespace_db -c "SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE '%portdb%' OR schema_name LIKE '%servdb%';"
```
Example:
```
 quickstart_portdb_90419
 quickstart_servdb_90314
```
Use these values for YOUR-SCHEMA-1 and YOUR-SCHEMA-2 in the following step.

2. Export the two schemas:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- pg_dump -O -n YOUR-SCHEMA-1 -n YOUR-SCHEMA-2 default_postgresql_dbms_in_namespace_db > db_export.sql
```

3. Replace the schema names in the export file:
``` bash
sed -i 's/YOUR-SCHEMA-1/YOUR-TENANT-ID/g; s/YOUR-SCHEMA-2/YOUR-TENANT-ID/g' db_export.sql
```
> **Note:** The default Entando implementation used for the primary tenant has two schemas (portdb and servdb) but these are combined into a single schema for secondary tenants.

4. Import the new schema into PostgreSQL:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- psql -d default_postgresql_dbms_in_namespace_db < db_export.sql
```

> **Note:** TODO-remove? This step exports just the schema definitions. Entando will then initialize the default data in the schema when the application starts. A full database copy can also be used if preferred, e.g., when making a complete copy of an existing tenant or application. In this scenario, a copy of the source entando-data should also be used to initialize the tenant CDS.

### Tenant Configuration
#### Tenant Ingress
1. Download the template `entando-tenant-ingress.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-tenant-ingress.yaml"</EntandoCode>

2. Replace the placeholders with the appropriate values for your environment

3. Create the Ingress:
``` bash
kubectl apply -f entando-tenant-ingress.yaml -n YOUR-NAMESPACE
```

#### Tenant Configuration Secret
1. Download the template `entando-tenant-secret.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-tenant-secret.yaml"</EntandoCode>

2. Replace the placeholders with the appropriate values for your environment.

3. Create the Secret:
> **Warning:** if the `entando-tenant-secret` already exists, then the secret should be edited and a JSON block added for the new tenant.
```
kubectl apply -f entando-tenant-secret.yaml -n YOUR-NAMESPACE
```

### Configure the EntandoApp

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
        name: entando-tenant-secret
        key: ENTANDO_TENANTS              
        optional: false
```
3. Scale the deployment back up to 1 or more replicas:
```
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```
4. Confirm that the secondary tenant is working 
>TODO: Document the verificaton steps for each service, add notes to the service pages that the secondary tenants cannot be fully verified until the full MT is setup


## Appendix
### Liquibase Options
Liquibase is used for database management for both the primary and secondary tenants in mulititenancy but the prescribed default behavior of this process can be modified by using the following methods.

**Apply the Strategy in the App Engine Deployment**

Use this database strategy specification in the `entando-de-app` image to set the strategy for all tenants, including the primary and all secondary tenants.   
* `db.migration.strategy`: "skip|disabled|auto|generate_sql" # defaults to 'auto' which uses Liquibase to initialize checks and updates on the DBs

**Apply the Strategy for Secondary Tenant**  
For a secondary tenant, the `dbMigrationStrategy` environment variable in the tenant `ConfigMap` can be used to modify the default Liquibase DB management specification in the App Engine. 

* `dbMigrationStrategy`: "skip|disabled|auto|generate_sql" # default is 'skip'; to skip the entire Liquibase process of checking databasechangelog tables and changeSetFiles

* If `dbMigrationStrategy` is not present inside the tenant `ConfigMap`, it looks for the value in the db.migration.strategy system property.

### Tenant Domains
A tenant can have multiple fully qualified domain names (FQDNs), as long as they are defined in the `fqdns` field of the [ConfigMap](#create-and-apply-the-configmap). This field determines which tenant's configuration to use when a incoming request is made to the Entando Application.

Example:
```
"fqdns": "www.YOUR-HOST-NAME,blog.YOUR-HOST-NAME,news.YOUR-HOST-NAME"
```

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
