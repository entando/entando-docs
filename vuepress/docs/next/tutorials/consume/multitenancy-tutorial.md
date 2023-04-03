---
sidebarDepth: 2
---

# Multitenancy on Entando

This is the starting point to add multitenancy architecture to your application. First the primary tenant must be configured with cache management, search capability and content delivery server (CDS) services.  Then your secondary tenants can be created with the detailed steps below.   

See <!-- [Multitenancy on Entando](../../docs/consume/multitenancy.md) -->, for details on concepts and architecture. 

## Prerequisites
* [A working instance of Entando 7.2 or higher.](../../../docs/getting-started/README.md)

* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Configure the Services for the Primary Tenant

1. Configure the Redis cache management service. Redis integration tutorial

2. Add Solr integration for the external search engine. Solr integration tutorial

3. Add CDS integration to manage static resources. CDS integration tutorial

## Configure the Secondary Tenant

### Keycloak
Import the realm for Keycloak from the primary tenant and reconfigure it for the secondary tenant as follows.
1. Go to your [Keycloak admin console](../../docs/consume/identity-management.md#authorization) which is typically located at `http://YOUR-ENTANDOAPP-HOST-NAME/auth`.
2. Follow this tutorial to [Create a Backup of the Keycloak Realm](../devops/backing-restoring-keycloak.md). 
3. Edit the generated JSON file of the realm with these updates:
     * remove every `id` attribute. There will be many. Save the JSON as `realm-YOUR-TENANT1-CODE.json, using the tenant code. The tenant code will become the prefix of the domain host name or URL. 
     * Replace the properties `realm` & `displayName` with your tenant code.
     * Add tenant code as a prefix with a "." to the following fields:
"redirectUris" & "webOrigins" under the clientId for "entando-web", "quickstart" and "quickstart-de".  
For example: 
```
"redirectUris": [
    	"http://YOUR-TENANT1-CODE.10-219-168-241.nip.io/entando-de-app/*"
  	],
```
Save the file. 

4. In the Keycloak admin console, go to `Import` in the left navigation sidebar to import the new realm for tenant1.
5. go to Clients, to `Edit` under Actions for `quickstart` and `quickstart-de` Client IDs and regenerate the secrets under the Credentials tab.
6. In the new realm, create an `admin` user to manage the users and roles for this realm.

### Solr
Create the Solr core for the secondary tenant. 
1. Choose one option from below:
		1a. For Solr standalone:
			i. Shell into the SOLR pod:
			``` 
			kubectl exec -it POD-NAME -- /bin/bash
			```
			ii. Create the core:
			```
			bin/solr create_core -c YOUR-TENANT1-CODE
			```
		1b. For Solr in the cloud (HA):
			i. curl "http://YOUR-NAMESPACE-solr-solrcloud.[suffix_domain]/solr/admin/collections?action=CREATE&name=entando&numShards=1&replicationFactor=3&maxShardsPerNode=2"

### Configure CDS 
1. Adapt the descriptor YAMLs for the secondary tenant by renaming everything with the tenant code!


### Databases 
Create a single schema for your database that maps all the tables for content, templates, users, groups, widgets, etc. 

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
  - host: YOUR-TENANT1-CODE.10-219-168-241.nip.io
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
Create and apply a new ConfigMap for the secondary tenant and edit App Engine `entando-de-app` deployment to point to new ConfigMap.

1. Create a new ConfigMap. Here is a sample:
``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tenants-config
data:
  ENTANDO_TENANTS: >-
        [
            {
                "tenantCode": "YOUR-TENANT1-CODE",
                "fqdns": "YOUR-TENANT1-CODE.mt720.k8s-entando.org"
                "kcEnabled": true,
                "kcAuthUrl": "http://10-219-168-241.nip.io/auth",
                "kcRealm": "YOUR-TENANT1-CODE-REALM",
                "kcClientId": "quickstart",
                "kcClientSecret": "mNi9thJF6H4lBLgEsZvaLpzRBwlx39ws",
                "kcPublicClientId": "entando-web",
                "kcSecureUris": "",
                "kcDefaultAuthorizations": "",
                "dbDriverClassName": "org.postgresql.Driver",
                "dbUrl": "jdbc:postgresql://default-postgresql-dbms-in-namespace-service.entando.svc.cluster.local:5432/YOUR-TENANT1-CODE",
                "dbUsername": "postgres",
                "dbPassword": "e7d60efa865c4510",
                "cdsPublicUrl": "http://cds.10-219-168-241.nip.io/YOUR-TENANT1-CODE/",
                "cdsPrivateUrl": "http://YOUR-TENANT1-CODE-cds:8080/",
                "cdsPath": "api/v1",
                "solrAddress": "http://YOUR-SOLR-URL",
                "solrCore": "YOUR-TENANT1-CODE"
            }
        ]
```

2. Apply the ConfigMap
3. Scale down the App Engine deployment (de-app image) to 0
4. Open the de-app deployment image and edit `envFrom` to point to the new ConfigMap for your secondary tenant under spec.template.spec.containers.
	envFrom:
    	- configMapRef:
          name: YOUR-TENANT1-CONFIGMAP

### Creating Kubernetes Secrets 
Entando created the `ENTANDO_TENANTS` environment variables as a Kubernetes Secrets for sensitive tenant configuration parameters. 
For example:
```
     envFrom:
        - secretRef:
          name: ENTANDO_TENANTS
```
From: https://entando.myjetbrains.com/youtrack/issue/ENG-4700



