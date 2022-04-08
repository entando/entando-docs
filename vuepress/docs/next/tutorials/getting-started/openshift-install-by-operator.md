---
sidebarDepth: 2
---
# Installation on Red Hat OpenShift using the Operator

## Overview
The following tutorial shows how to install an Entando Application using the `Entando Operator` and covers a few common enterprise configurations. You may also find the alternative [manual instructions](./openshift-install.md) useful.

We have two sets of scenarios listed below:
* Scenario 1.1-1.5 for cluster admins who can create projects and install operators
* Scenario 2.1 for a user with access to administer a project 

Scenario 1.1 is similar to the Entando quickstart style of deployment which can be applied in many environments, including on local developer laptops. The subsequent scenarios (1.2-1.5) build on that initial setup but can be performed independently if desired. Unless otherwise noted, you have the freedom to keep or modify the default options when installing the `Entando Operator` and other resources in the tutorials. 

## Prerequisites
- OpenShift 4.8.x
- (For scenarios 1.x) cluster-admin access to OpenShift for initial installation of the Entando Operator
- (For scenarios 2.x) namepace-level access to a specific OpenShift project for installation of an Entando application using the pre-installed Entando Operator
- Familiarity with the OpenShift console and operation

## Add the Entando Operator to the OperatorHub
A cluster admin can add the 7.0 version of the Entando Operator into the local OperatorHub using the following command.
```shell
oc apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/samples/openshift-catalog-source.yaml
```

## Scenario 1.1 - Embedded Database
The initial scenario is to deploy the operator and Entando application in a single namespace. We'll start with the smallest application footprint by using an embedded database although this is not recommended for production use cases.
1. Locate the `Entando Operator` in the `Operators → OperatorHub`. Make sure to select the appropriate version.
2. Click `Install` to view the `Entando Operator` install options
3. Select `A specific namespace on the cluster` for the `Installation mode`
4. Choose an empty namespace for `Installed Namespace`. You can create one from `Home → Projects` first, if needed, e.g. `entando-one`. 
5. Click `Install` to install the operator into your target namespace
6. The install may take a few minutes to complete after which you can click `View Operator` to see the operator in your namespace, or you can go to `Operators → Installed Operators` at any point and select it from there. 
7. Now go to `EntandoApp` and click `Create EntandoApp`
   - Keep the default `my-app` for your application name or select your own
   - Select the Entando App version: `7.0`
8. Provide an `Ingress Host Name` specific to your namespace, e.g. `my-app.YOUR-BASE-OPENSHIFT-URL.` In CRC you can keep the default `entando.apps-crc.testing` for your first project.
9. Change the `DBMS` to `embedded`. This is the lightest and quickest way to test a full Entando application but your preferred relational database is strongly recommended for production use.
10. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources. 
11. Go to `EntandoApp → my-app` to check the status of the deploy

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 1.2 - PostgreSQL
 For this scenario we'll prepare a more production-like configuration. Here we'll switch from an embedded on-disk database to a dedicated PostgreSQL database. For this scenario we'll start where step 6 ends in the previous scenario. If you already ran Scenario 1.1 you can either go to that project and remove the EntandoApp and ProvidedCapabilities via `Installed Operators → Entando Operator` or prepare a new project using steps 1-5 above.
 
Now let's create a new application, this time using PostgreSQL.
1. Go to `EntandoApp` and click `Create instance`
   - Keep the default `my-app` for your application name or select your own
   - Select the Entando App version: `7.0`
2. Set the `Ingress Host Name` as in Scenario 1.1 above
3. Keep the default `DBMS` as `postgresql`  
4. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources just as in Scenario 1.1 but with the addition of a PostgreSQL database deployment.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 1.3 - PostgreSQL plus OpenShift SSL
For this scenario we'll setup PostgreSQL, just like Scenario 1.2, but also enable SSL using OpenShift's internal Certificate Authority (CA). As a starting point, you can either remove the EntandoApp and ProvidedCapabilities using the Operator or you can prepare a new project per steps 1-5 in Scenario 1.1.

1. Using your browser, examine and save the SSL certificate for your environment. For example, in Chrome, go to any OpenShift console page, click on `View Site Information` next to the URL (it may be labeled `Not secure` ) then go to `Details -> Copy to File` and save the certificate as a Base-64 encoded X.509 file, e.g. `openshift.cer`.
2. Go to `Workloads → Secrets → Create` and select `Key/value secret`
3. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
4. Set the `Key`, e.g. `openshift.cer`
5. Set the `Value` by clicking `Browse...` and loading the file you saved in Step 1
6. Click `Create`
7. Next go to `Workloads → ConfigMaps` and create or update the ConfigMap named `entando-operator-config`. This is the ConfigMap used by the Operator to configure the deployments. You can [download the Entando Operator template](../devops/entando-operator.md#add-a-new-configmap) as a starting point. Set the "data/entando.ca.secret.name" to match the name from step 3.
```yaml
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.use.auto.cert.generation: 'true'
```
8. Click `Create`

Now let's create a new application, just like in Scenario 1.2 but with OpenShift SSL in place.  

9. Go to `EntandoApp` and click `Create instance`
   - Keep the default `my-app` for your application name or select your own
   - Select the Entando App version: `7.0`
   - Set the `Ingress Host Name` as in Scenario 1.1 above
   - Keep the default `DBMS` as `postgresql`
10. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources.

Once the deployment is complete you can confirm that all routes use https with OpenShift's CA. You will likely still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 1.4 - PostgreSQL plus self-signed SSL
This scenario is similar to Scenario 1.3 but here you'll use a self-signed certificate rather than using OpenShift's Certificate Authority. As a starting point, you can either remove the EntandoApp and Provided Capabilities from the previous scenarios or prepare a new project per steps 1-5 in Scenario 1.1.

We'll start by creating a self-signed certificate and then prepare the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate so you can use your preferred mechanism.

1. Using [OpenSSL](https://www.openssl.org/) create a certificate for your application. You'll need to adjust the CN value to match the Ingress Host Name for your project.
```shell
openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -subj "/CN=entando.apps-crc.testing"
```
You should see output similar to this:
```shell
Generating a RSA private key
.....................................................................++++
........................................................................................................................................................................................++++
writing new private key to 'tls.key'
-----
```
Now you can create a TLS Secret using the generated files.

2. Go to `Workloads → Secrets → Create` and select `From YAML`. Use the following YAML as a starting point and then click `Create`.
```yaml
kind: Secret
apiVersion: v1
metadata:
  name: entando-tls-secret
data:
  tls.key: ''
  tls.crt: ''
type: kubernetes.io/tls
```
3. Click on `Actions → Edit Secret` and use the ```Browse...``` buttons to upload the key and cert files.

Now you'll create the `entando-ca-cert-secret` Secret, similar to what was done in Scenario 1.3 but this time using the self-signed certificate. 

4. Go to `Workloads → Secrets → Create` and select `Key/value secret`
5. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
6. Set the `Key`, e.g. `tls.crt`
7. Set the `Value` by clicking `Browse...` and loading the cert file from Step 1, e.g. `tls.crt`
8. Click `Create`
9. Next go to `Workloads → ConfigMaps` and update or create a ConfigMap named `entando-operator-config.` This is the ConfigMap used by the Operator to configure the deployments. You can [download the Entando Operator template](../devops/entando-operator.md#add-a-new-configmap) as a starting point. Set the "data/entando.ca.secret.name" and "data/entando.tls.secret.name" to match the names from above.
```yaml
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.tls.secret.name: entando-tls-secret
```
10. Click `Create`

Now let's create a new application, just like in Scenario 1.3 but with the self-signed SSL certificate.  

11. Go to `EntandoApp` and click `Create instance`
  - Keep the default `my-app` for your application name or select your own
  - Select the Entando App version: `7.0`
  - Set the `Ingress Host Name` as in Scenario 1.1 above. It should match the CN used to generate the cert in step 1.
  - Keep the default `DBMS` as `postgresql`
12. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources.

Once the deployment is complete you can confirm that all routes use https with the self-signed certificate. You will still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 1.5 - Cluster-scoped operator with wildcard SSL
For this scenario we'll install the Entando Operator so the same operator instance can manage applications across namespaces.
1. Locate the `Entando Operator` in the `Operators → OperatorHub` using the Filter feature.
2. Click `Install` to view the `Entando Operator` install options. 
3. Select `All namespaces on the cluster` for the `Installation mode`.
4. Keep the default `openshift-operators` for the `Installed Namespace`. 
5. Click `Install` to install the operator into the cluster.

Now, similar to Scenario 1.4, we'll setup a self-signed certificate but this time as a wildcard certificate and then configure the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate and you can use your own preferred mechanism.

6. Using [OpenSSL](https://www.openssl.org/) create a certificate for your application. You'll need to adjust the CN value to match your environment but make sure to include the leading `*.` for the wildcard designation.
```shell
openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -subj "/CN=*.apps-crc.testing"
```
You should see output similar to this:
```
Generating a RSA private key
.....................................................................++++
........................................................................................................................................................................................++++
writing new private key to 'tls.key'
-----
```
Now we can go to the `openshift-operators` project and create a TLS Secret using the generated files. 

7. Go to `Workloads → Secrets → Create` and select `From YAML`. 
8. Enter this `YAML` and click `Create`:
```yaml
kind: Secret
apiVersion: v1
metadata:
  name: entando-tls-secret
  namespace: openshift-operators
data:
  tls.key: ''
  tls.crt: ''
type: kubernetes.io/tls
```
9. Click on `Actions → Edit Secret` and use the ```Browse...``` buttons to upload the key and cert files.

Now we'll also create the `entando-ca-cert-secret` Secret using the self-signed wildcard certificate. 

10. Go to `Workflows → Secrets → Create` and select `Key/value secret`
11. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
12. Set the `Key`, e.g. `cert1.crt`
13. Set the `Value` by clicking `Browse...` and loading the cert file from Step 1, e.g. `tls.crt`
14. Click `Create`
15. Next go to `Workloads → ConfigMaps` and create a ConfigMap named `entando-operator-config.` This is the ConfigMap used by the Operator to configure the deployments. You'll need to supply the routing suffix for your environment. Don't include a leading `*.` since this is just the suffix. 
```yaml
kind: ConfigMap
apiVersion: v1
metadata:
 name: entando-operator-config
 namespace: openshift-operators
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.tls.secret.name: entando-tls-secret
 entando.default.routing.suffix: apps-crc.testing 
```
16. Click `Create`
17. You can now proceed to create one or more Entando applications in their own namespaces, e.g. using the steps for Scenario 1.1 starting from Step 7 or as a different user in Scenario 2.1. You can leave out the `Ingress Host Name Override` since the cluster-scoped operator will provide it for you based on the routing.suffix.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 2.1 - Developer Project
For this scenario we'll use the cluster-installed Entando Operator to install an Entando application by individually creating each of its elements. This is much like what is done in Scenarios 1.1-1.2 but gives you greater control of the overall setup of the application. The prerequisites are that the Operator was installed in the cluster and that you have access to your own project.

First we'll start by creating the database for the application.
1. Go to `Installed Operators`, make sure you've selected your own Project, e.g. `entando-two`, and and then go to `Provided APIs → Entando Database Service` and click `Create EntandoDatabaseService.`

The default settings work fine for this step. They include creating the deployment and using PostgresSQL for the DBMS. If you examine the YAML it looks something like this:
```yaml
apiVersion: entando.org/v1
kind: EntandoDatabaseService
metadata:
  namespace: entando-two
  name: my-entando-database-service
spec:
  createDeployment: true
  dbms: postgresql
  databaseName: my_database
```
2. Click `Create.` The operator will now create the deployment and resources needed for the database.

Next let's setup the Keycloak server for identity management.

3. Similar to Step 1, go to `Installed Operators -> Select your project (if needed) → Provided APIs → Entando Keycloak Server` and click `Create EntandoKeycloakServer.`
4. (Optional) Select a `TLS Secret` to secure the service, e.g `entando-tls-secret` per Scenario 1.5.
5. (Optional) Set the `Ingress Host Name` for your project, e.g. `entando-two.<my-base-openshift-url>`
6. Click `Create`

Once the deployment is complete you can check `Networking → Routes` to find the URL for the new Keycloak if you didn't specify the `Ingress Host Name`, e.g. `my-keycloak-entando-two.apps-crc.testing/auth/`. The generated admin credentials can be found under `Workloads → Secrets`, e.g. `my-keycloak-admin-secret`

Next we'll prepare the infrastructure service.

7. Go to `Installed Operators -> Select your project (if needed) → Provided APIs → Entando Cluster Infrastructure` and click `Create EntandoClusterInfrastructure.`
8. (Optional) Set the `Ingress Host Name`, e.g. `entando-two.<my-base-openshift-url>`
9. (Optional) If you chose to apply a `TLS Secret` in Step 4 then you'll want to do the same here by setting the `TLS Secret Name`, e.g. `entando-tls-secret.`
10. Click `Create`

Now we'll create the application itself.

11. Go to `Installed Operators -> Select your project (if needed) → Provided APIs → CLick on View more (if needed) -> EntandoApp` and click `Create instance.`
12. (Optional) Set the `Ingress Host Name`, e.g. `entando-two.<my-base-openshift-url>`
13. (Optional) If you chose to apply a `TLS Secret` in Step 4 then you'll want to do the same here by setting the `TLS Secret Name`, e.g. `entando-tls-secret.`

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Appendix A - Troubleshooting and Common Errors

### Image Pull Error
When installing Entando into OpenShift, you may run into an image pull error. This happens because of restricted registries for the docker image. 

To address this issue, a property in the ConfigMap is used to override the default docker registry.  Every time there is a docker image name without a registry, it will apply this override property. 

Create a ConfigMap named `entando-operator-config` with the property `entando.docker.registry.override: [registry.hub.docker.com](http://registry.hub.docker.com)` as shown below:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
 name: entando-operator-config
data:
 entando.docker.registry.override: registry.hub.docker.com
```
**Note: This configuration should be done after deploying the Operator and before deploying the EntandoApp.**


## Next Steps
Once you've completed any of the scenarios above, you have several options.
*  Check out `Networking → Routes` to see the URLs for the running services. Common starting points include the `Entando App Builder` (e.g. `http://entando.apps-crc.testing/app-builder/`) or `Entando application` itself (e.g. `http://entando.apps-crc.testing/entando-de-app/`). 
* This suggested [list of next steps](../../docs/getting-started/#next-steps) could also be useful. 

<!--- If any changes are made to the Next Steps, please update the same in openshift-install.md  --->