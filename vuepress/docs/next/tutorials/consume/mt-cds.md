---
sidebarDepth: 2
---

# Content Delivery Server for Multitenancy
An Entando Content Delivery Server (CDS) is required in order to enable multiple tenants to be served by the same Entando application. This tutorial describes the steps required to setup CDS and configure the Entando App Engine to use it.

## Prerequisites
* [A working instance of Entando.](../../docs/getting-started/README.md) with the default Tomcat server image.

* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Create the CDS Resources
Descriptors for Keycloak access, ingress, service/deployment, and persistent volume claim are required for the CDS in order to separate the users and static assets for each tenant.

1. Login to the Keycloak admin console and get the RSA key for your realm by going to `Realm Settings` → `Keys`. 
2. Click on `Public Key` for `rsa-generated` provider and copy the content. This will be `YOUR-PUBLIC-KEYCLOAK-KEY` below.
3. Download the CDS descriptors template
``` bash
TODO
```
4. Replace the following placeholders with the appropriate values for your environment:

Conventions:
* The default CDS ingress URL is the following: YOUR-APP-NAME-cds.YOUR-HOSTNAME/YOUR-TENANT-ID
* The storage limit and request is set to 1Gi and can be modified on the persistent volume claim
* The file upload size limit is set to 150m and can be configured via the ingress annotations
* In order to enable TLS, add a TLS secret and configure it on the ingress 

| Placeholder | Descriptions 
|:--|:--
| YOUR-APP-NAME | The name of the application, e.g. quickstart
| YOUR-HOST-NAME | The base host name of the application, e.g. your-domain.com
| YOUR-TENANT-ID | The identifier for the tenant, e.g. mysite1 
| YOUR-PUBLIC-KEYCLOAK-KEY | The public RSA key for the corresponding Keycloak instance. Make sure to retain the wrapping text with linefeeds: `---BEGIN PUBLIC KEY... END PUBLIC KEY---\n`.

The preceding steps can be used to create additional tenants as well, simply by providing a new tenant identifier. The same Keycloak public key can be used if the tenants share a Keycloak instance using different realms. 

# Configure the Entando App Engine to use CDS
The Entando App Engine has to be reconfigured to use CDS. This is only required when creating the initial or primary tenant in a multi-tenant setup.

1. Scale the AppEngine (entando-de-app) to 0 replicas
2. Edit the EntandoApp deployment and add these environment variables: (TODO: shouldn't this be set on the EntandoApp CR instead of the deployment? Or use the configmap option?)
``` yaml
spec:
   env:
     - name: CDS_ENABLED
       value: "true"
     - name: CDS_PUBLIC_URL
       value: http://YOUR-APP-NAME-cds.YOUR-HOST-NAME/YOUR-TENANT-ID
     - name: CDS_PRIVATE_URL
       value: http://YOUR-TENANT-ID-cds-service:8080
     - name: CDS_PATH
       value: /api/v1
```
3. (Optional - is this needed if we modify the app itself?) The following two volume specifications can be removed to avoid leftover resources in the namespace. These are automaticaly created in the initial `entando-de-app` deployment:
``` yaml
 volumeMounts:
        - mountPath: /entando-data
          name: YOUR-APP-NAME-server-volume
```
``` yaml
 volumes:
      - name: YOUR-APP-NAME-server-volume
        persistentVolumeClaim:
          claimName: YOUR-APP-NAME-server-pvc
```

4. Scale the deployment back to 1 and check the system. The assets and resources provided by the AppEngine should be served by the CDS service.
