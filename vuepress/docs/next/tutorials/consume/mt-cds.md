---
sidebarDepth: 2
---

# Content Delivery Server for Multitenancy
An Entando Content Delivery Server (CDS) is required in order to enable multiple tenants to be served by the same Entando application. This tutorial describes the steps required to setup CDS and configure the Entando App Engine to use it.

## Prerequisites
* [A working instance of Entando](../../docs/getting-started/README.md) based on the default Tomcat server image.

## Create the CDS Resources
A set of resources are necessary to separate the storage and user data for each tenant.

1. Login to the Keycloak admin console and get the RSA key for your realm by going to `Realm Settings` → `Keys`. 
2. Click on `Public Key` for `rsa-generated` provider and copy the content. This will be `YOUR-PUBLIC-KEYCLOAK-KEY` below.
3. Download the template `entando-cds.yaml`:

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{ $site.themeConfig.entando.fixpack.v72 }}/dist/ge-1-1-6/samples/entando-cds.yaml"</EntandoCode>

4. Replace the placeholders in `entando-cds.yaml` with the appropriate values for your environment:

Conventions:
* The storage limit and request is set to 1Gi and can be modified on the persistent volume claim
* The file upload size limit is set to 150m and can be configured via the ingress annotations
* In order to enable TLS, add a TLS secret and configure it on the ingress 

| Placeholder | Description 
|:--|:--
| YOUR-APP-NAME | The name of the application, e.g. quickstart
| YOUR-HOST-NAME | The base host name of the application, e.g. your-domain.com
| YOUR-TENANT-ID | The identifier for the tenant, e.g. mysite1 
| YOUR-PUBLIC-KEYCLOAK-KEY | The public RSA key for the corresponding Keycloak instance. Make sure to retain the wrapping text with linefeeds: `---BEGIN PUBLIC KEY... END PUBLIC KEY---\n`.

The preceding steps can be used to create additional tenants as well, simply by providing a new tenant identifier. The same Keycloak public key can be used if the tenants share a Keycloak instance using different realms. 

5. Create the CDS resources 
``` bash
kubectl apply -f entando-cds-YOUR-TENANT-ID.yaml -n YOUR-NAMESPACE
```

# Configure the Entando App Engine to use CDS
::: tip
The Entando App Engine needs to be reconfigured just for the initial or primary tenant so all tenants use CDS in the same way.
:::

1. Scale the EntandoApp deployment down to 0 replicas:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```

2. Edit the deployment YAML
3. Add these environment variables:
``` yaml
spec:
  containers: 
    - env: 
      - name: CDS_ENABLED
        value: "true"
      - name: CDS_PUBLIC_URL
        value: http://YOUR-APP-NAME-cds.YOUR-HOST-NAME/YOUR-TENANT-ID
      - name: CDS_PRIVATE_URL
        value: http://YOUR-TENANT-ID-cds-service:8080
      - name: CDS_PATH
        value: /api/v1
```
3. Remove the volume and volumeMount which were automatically created by the initial install process:
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

4. Scale the deployment back up to 1 or more replicas:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```

5. Go to the home page of the Entando Application. Any images (e.g. the icons on the home page) or other static resources should be served from the `CDS_PUBLIC_URL`. 
