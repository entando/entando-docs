---
sidebarDepth: 2
---

# Multitenancy on Entando

This tutorial describes how to configure Entando to serve multiple tenants. The primary tenant is configured first, then secondary tenants can be added. See [Multitenancy on Entando](../../docs/consume/multitenancy.md) for details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher](../../docs/getting-started/README.md) based on the Tomcat server image. This is the default `standardServerImage` for the `EntandoApp` custom resource.

## Configure the Primary Tenant 
The primary tenant is configured with services for the content delivery server (CDS), cache management, and search capability. Follow the links below to complete the setup. 

1. [Install and enable the Entando Content Delivery Server (CDS)](./cds.md) to manage static resources. 

2. [Install and enable Redis](./redis.md) to handle caching and clustering. 

3. [Install and enable Solr integration](./solr.md) to enable enterprise search. 


## Configure the Secondary Tenant
For each secondary tenant, you will need to configure Keycloak, CDS, Solr, and a database schema. Then the ingress and a shared configuration Secret is created, after which the EntandoApp Engine is redirected to that Secret. 

#### Definitions
| Placeholder | Description 
|:--|:--
| YOUR-APP-NAME | The name of the application, e.g., quickstart
| YOUR-HOST-NAME | The base host name of the application, e.g., your-domain.com
| YOUR-TENANT-ID | The identifying name of the current tenant. In most cases, it will also be used to determine the base URL of the tenant. For example, yoursite results in yoursite.your-domain.com.
| YOUR-NAMESPACE | The Kubernetes namespace in which your app is running

### Keycloak
Each tenant requires its own Keycloak realm. Create the tenant-specific realm in the standard Entando-deployed Keycloak instance.

1. [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md) 
2. Remove the `id` attributes so Keycloak will recognize the data as new entries upon importing:
``` bash
sed -i'' '/"id" : "/ d' keycloak-realm.json
```

3. Replace the `realm` and `displayName` properties with YOUR-TENANT-ID. Note: supply the original realm name if it was not named `entando`.
``` bash
sed -i'' 's/"entando"/"YOUR-TENANT-ID"/g' keycloak-realm.json
```
4. Update the values of `redirectUris` and `webOrigins` to use YOUR-TENANT-ID:
``` bash
sed -i'' 's/\/\/YOUR-APP-NAME\./\/\/YOUR-TENANT-ID\.YOUR-APP-NAME\./g' keycloak-realm.json
```
> This should transform the URIs from `http(s)://YOUR-APP-NAME.YOUR-HOST-NAME` to `http(s)://YOUR-TENANT-ID.YOUR-APP-NAME.YOUR-HOST-NAME`.

5. Log in to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization), typically located at `http(s)://YOUR-APPNAME.YOUR-HOST-NAME/auth`.

6. Find `Entando` in the left sidebar, below the logo.  Click `Add Realm` and select your `keycloak-realm.json` file. Click `Create`.

7. In the new realm, go to `Clients` → Click the Client ID with `YOUR-APP_NAME`. Under the `Credentials` tab, regenerate the `Secret`. 

> Note: The Secret for this client will be needed in the `entando-tenants-secret.yaml` for the property `kcClientSecret` value `YOUR-TENANT-KC-SECRET` below.

8. Regenerate the Secret for Client ID `YOUR-APP-NAME-de`. 

> Note: The Secret for this client will also needed in the `entando-tenants-secret.yaml`, for the property `dekcClientSecret` value `YOUR-KEYCLOAK-CLIENT-SECRET` below.

9. Go to `Manage` → `Users`. Click `View all users` and choose the `admin` user. Go to [Role Mapping](../../docs/consume/identity-management.md#authorization) and make this assignment: Client `realm-management` and Role `manage-realm`.

10. (Optional) Go to `Credentials` and reset the password for the `admin` user.

### Content Delivery Server (CDS)
Each tenant requires its own set of CDS resources. Follow the [CDS tutorial](./cds.md) to prepare these resources for each secondary tenant.

### Solr
Each tenant requires a dedicated Solr core or collection. Follow the [Solr tutorial](./solr.md#generate-the-core) to generate the core and schema for each secondary tenant. 

### Database
Each tenant requires a new database schema for the Entando tables related to the page structure, web content, widgets, etc. The following steps provide a way to export the schemas in a default installation using the Entando-generated PostgreSQL instance. The exact commands will differ for external databases and other DBMS.

1. Determine the name of your PostgreSQL pod (YOUR-POSTGRESQL-POD):
``` bash
kubectl get pods | grep postgres
```
Example:
```
default-postgresql-dbms-in-namespace-deployment-54bb664745lxllh
```

2. Determine the names of the three source schemas:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- psql -d default_postgresql_dbms_in_namespace_db -c "SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE '%portdb%' OR schema_name LIKE '%servdb%' OR schema_name LIKE '%dedb%';"
```
Example:
```
 quickstart_portdb_90419
 quickstart_servdb_90314
 quickstart_dedb_9472
```
Use these values for YOUR-SCHEMA-1, YOUR-SCHEMA-2, and YOUR-SCHEMA-3 in the following steps.

3. Export the schemas:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- pg_dump -O -n YOUR-SCHEMA-1 -n YOUR-SCHEMA-2 -n YOUR-SCHEMA-3 default_postgresql_dbms_in_namespace_db > db_export.sql
```

4. Replace the schema names in the export file:
``` bash
sed -i'' 's/YOUR-SCHEMA-1/YOUR-TENANT-ID/g; s/YOUR-SCHEMA-2/YOUR-TENANT-ID/g; s/YOUR-SCHEMA-3/YOUR-TENANT-ID/g' db_export.sql
```
**Note:** The default Entando implementation used for the primary tenant has two schemas (portdb and servdb) but these are combined into a single schema for secondary tenants.

5. Import the new schema into PostgreSQL:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- psql -d default_postgresql_dbms_in_namespace_db < db_export.sql
```

6. Truncate the Liquibase-managed log lock table to avoid issues with schema updates:
``` bash
kubectl exec -it YOUR-POSTGRESQL-POD -- psql -d default_postgresql_dbms_in_namespace_db -c "TRUNCATE YOUR-TENANT-ID.databasechangeloglock;"
```

### Tenant Configurations
#### Tenant Ingress
1. Download the template `entando-tenant-ingress.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-tenant-ingress.yaml"</EntandoCode>

2. Create an ingress for your primary and each of your secondary tenants. Replace the placeholders with the appropriate values for each tenant. Remember, your tenant ID will change for each ingress you create.
    * For every secondary tenant, add the following snippet with its tenant ID under `metadata.labels`:
      ``` yaml
      EntandoTenant: YOUR-TENANT-ID
      ```  
3. Apply each Ingress with the following command:

``` bash
kubectl apply -f YOUR-TENANT-ID-INGRESS.yaml -n YOUR-NAMESPACE
```
#### Tenant Configuration Secret
A single Secret needs to be defined with the configuration for each of the tenants. If the `entando-tenants-secret.yaml` already exists, then it should be edited with the addition of a new JSON block for the tenant.

1. Download the template `entando-tenants-secret.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v73 }}/dist/ge-1-1-6/samples/entando-tenants-secret.yaml"</EntandoCode>

2. Replace the placeholders with the appropriate values for each of your tenants.

3. Create the Secret:
```
kubectl apply -f entando-tenant-secret.yaml -n YOUR-NAMESPACE
```

### Configure the EntandoApp
The EntandoApp has to be configured just once to point to the `entando-tenants-secret.yaml`. When additional tenants are added, the EntandoApp deployment only needs to be restarted.

1. Scale down the EntandoApp deployment to 0:
```
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```
2. Edit the deployment YAML and add the environment variable to point to the K8s Secret.

``` yaml
-env:
  - name: ENTANDO_TENANTS
    valueFrom:
      secretKeyRef:
        name: entando-tenants-secret
        key: ENTANDO_TENANTS              
        optional: false
```
3. Scale the deployment back up to 1 or more replicas:
```
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```
4. Confirm that the secondary tenant is working correctly. This may include testing the EntandoApp itself (including digital assets delivered via CDS), the AppBuilder, and enterprise search for Solr. The tutorials for each service include verification steps that can be followed once the tenant configuration is fully in place.

## Bundles
Once tenants are in order, [Entando Bundles](../../docs/curate/bundle-details.md) can be deployed to each tenant independently, whether created anew or deployed from registries added in the App Builder. 

When bundles are installed to any tenant, the Component Manager injects an `ENTANDO_TENANT_CODE`, an environment variable related to the tenant domain name, into every microservice identifying which tenant it belongs to. 

To create or adapt bundles for multitenant applications, environment variables can be leveraged in the bundle descriptor to customize bundles. Microservices can be specified with an embedded or internal SQL DBMS but if an [external database](../devops/external-db-ms.md) is required, a plugin configuration secret will need to be configured.  

* [Create and Publish a Bundle project](../create/pb/publish-simple-bundle.md)
* [Learn about Entando Bundles](../../docs/curate/bundle-details.md)
* [Create your own Bundle](../../docs/getting-started/ent-bundle.md)
* [Configure External DBMS for Microservices](../devops/external-db-ms.md)

## Appendix
### Liquibase Options
Liquibase is the default for database management for multitenancy on Entando, but this process can be modified with the following methods.

**Apply the Strategy in the App Engine Deployment**

Use this specification in the `entando-de-app` image to set the strategy for all tenants, including the primary and secondary tenants.   
* `db.migration.strategy`: "skip|disabled|auto|generate_sql" # defaults to 'auto' which uses Liquibase to initialize checks and updates on the DBs

**Apply the Strategy for Secondary Tenants**  
For a secondary tenant, the `dbMigrationStrategy` value in the `entando-tenant-secret.yaml` can be modified to specify its behavior.  

* `dbMigrationStrategy`: "skip|disabled|auto|generate_sql" # default is 'skip'; to skip the entire Liquibase process of checking databasechangelog tables and changeSetFiles

* If `dbMigrationStrategy` is not present inside the tenant configuration, it looks for the value in the `db.migration.strategy` system property.

### Tenant Domains
A tenant can have multiple fully qualified domain names (FQDNs), as long as they are defined in the `fqdns` field of the tenant configuration secret. This field determines which tenant's configuration to use when an incoming request is made to the Entando Application.

Example:
```
"fqdns": "www.YOUR-HOST-NAME,blog.YOUR-HOST-NAME,news.YOUR-HOST-NAME"
```

### Tomcat Options
Entando's multitenancy application uses the Tomcat servlet container and provides a few optional parameters.

**Enabling a Java Agent for Tomcat**  
To use a Java agent with your application, use initContainers with a PVC (PersistenVolumeClaim) to prepare the JAR file with the information required for the agent. Add the following environment variables to the `entando-de-app-tomcat` deployment to activate the agent and provide the agent code from the JAR file.  
``` yaml
AGENT_ENABLED: "true" # if true, adds the agent options to tomcat, defaults to false
AGENT_OPTS: "-javaagent:~/YOUR-JARFILE.jar" # the jar file with the agent options to use, defaults to empty  
```
**Manage Upload File Size Limitations**  
Add these environment variables to the `entando-de-app-tomcat` deployment to customize the application-server and file upload maximum sizes.

* For the Tomcat application server, use `TOMCAT_MAX_POST_SIZE` to configure connector maxPostSize; the default value is 209,715,200 bytes. Enter the value in bytes.

* For the application, use `FILE_UPLOAD_MAX_SIZE` to configure the upload limit; the default value is 52,428,800 bytes. Enter the value in bytes.
