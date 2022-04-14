---
sidebarDepth: 2
---
# Installation on Red Hat OpenShift using the Operator

## Overview
The following tutorial shows how to install an Entando Application using the Entando Operator and covers a few common enterprise configurations. You may also find the alternative [manual instructions](./openshift-install.md) useful.

Scenario 1 is similar to the Entando quickstart style of deployment which can be applied in many environments, including on developer laptops. The subsequent scenarios build on that initial setup but can also be performed independently. Unless otherwise noted, you have the freedom to keep or modify the default options when installing the Entando Operator and other resources. 

## Prerequisites
- OpenShift 4.8.x
- Cluster-admin access to OpenShift for initial installation of the Entando Operator
- Familiarity with the OpenShift console and operation

## Add the Entando Operator to the OperatorHub
A cluster admin can add the 7.0 version of the Entando Operator into the local OperatorHub using the following command.
```shell
oc apply -f https://raw.githubusercontent.com/entando/entando-releases/v7.0.1/dist/ge-1-1-6/samples/openshift-catalog-source.yaml
```

## Scenario 1 - Embedded Database
The initial scenario deploys the operator and Entando Application into a single namespace. We start with the smallest application footprint by using an embedded database, although this is not recommended for production use cases.
1. Locate the Entando Operator in the `Operators` → `OperatorHub`. Make sure to select the appropriate version.
2. Click `Install` to view the Entando Operator install options
3. Select `A specific namespace on the cluster` for the `Installation mode`
4. Choose an empty namespace for `Installed Namespace`. You can create one from `Home` → `Projects` first, if needed, e.g. `entando-one`. 
5. Click `Install` to install the operator into your target namespace
6. The install may take a few minutes to complete, after which you can click `View Operator` to see the operator in your namespace. You can also go to `Operators` → `Installed Operators` at any time and select it from there. 
7. Now go to `EntandoApp` and click `Create EntandoApp`
   - Keep the default `my-app` as your application name or select your own
   - Select the EntandoApp version: `7.0`
8. Provide an `Ingress Host Name` specific to your namespace, e.g. `my-app.YOUR-BASE-OPENSHIFT-URL`. In CRC you can keep the default `entando.apps-crc.testing` for your first project.
9. Change the `DBMS` value to `embedded`. This is the lightest and quickest way to test a full Entando Application. However, a non-embedded relational database is strongly recommended for production use.
10. Click `Create`. The Entando Operator proceeds to deploy the appropriate resources. 
11. Go to `EntandoApp` → `my-app` to check the status of the deploy

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 2 - PostgreSQL
For this scenario we prepare a more production-like configuration. Here we switch from an embedded on-disk database to a dedicated PostgreSQL database. This scenario starts where step 6 ends in the previous scenario. If you already ran Scenario 1, you can either go to that project and remove the EntandoApp and ProvidedCapabilities via `Installed Operators` → `Entando Operator` or prepare a new project using steps 1-5 above.
 
Now create a new application, this time using PostgreSQL.
1. Go to `EntandoApp` and click `Create instance`
   - Keep the default `my-app` as your application name or select your own
   - Select the EntandoApp version: `7.0`
2. Set the `Ingress Host Name` as in Scenario 1 above
3. Keep the default `DBMS` value of `postgresql`  
4. Click `Create`. The Entando Operator now deploys the appropriate resources as in Scenario 1 but with the addition of a PostgreSQL database deployment.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 3 - PostgreSQL plus OpenShift SSL
This scenario sets up PostgreSQL, like Scenario 2, but also enables SSL using OpenShift's internal Certificate Authority (CA). As a starting point, you can either remove the EntandoApp and ProvidedCapabilities using the Entando Operator or you can prepare a new project per steps 1-5 in Scenario 1.

1. Using your browser, examine and save the SSL certificate for your environment 
   - In Chrome, go to any OpenShift console page and click on `View Site Information` next to the URL. Note that it may be labeled `Not secure`. 
   - Go to `Details` -> `Copy to File` and save the certificate as a Base-64 encoded X.509 file, e.g. `openshift.cer`.
2. Go to `Workloads` → `Secrets` → `Create` and select `Key/value secret`
3. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
4. Set the `Key`, e.g. `openshift.cer`
5. Set the `Value` by clicking `Browse...` and loading the file you saved in Step 1
6. Click `Create`
7. Next, go to `Workloads` → `ConfigMaps` and create or update the ConfigMap named `entando-operator-config`. This is the ConfigMap used by the operator to configure the deployments. You can [download the Entando Operator template](../devops/entando-operator.md#add-a-new-configmap) as a starting point. Set the "data/entando.ca.secret.name" to match the name from step 3.
```yaml
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.use.auto.cert.generation: 'true'
```
8. Click `Create`

Now let's create a new application similar to Scenario 2, but with OpenShift SSL in place.  

9. Go to `EntandoApp` and click `Create instance`
   - Keep the default `my-app` as your application name or select your own
   - Select the EntandoApp version: `7.0`
   - Set the `Ingress Host Name` as in Scenario 1 above
   - Keep the default `DBMS` value of `postgresql`
10. Click `Create`. The Entando Operator proceeds to deploy the appropriate resources.

Once the deployment is complete, you can confirm that all routes use HTTPS with OpenShift's CA. You may still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 4 - PostgreSQL plus Self-Signed SSL
This scenario is similar to Scenario 3, but here you'll use a self-signed certificate instead of a certificate provided by OpenShift's internal Certificate Authority. As a starting point, you can either remove the EntandoApp and Provided Capabilities from the previous scenarios or prepare a new project per steps 1-5 in Scenario 1.

Start by creating a self-signed certificate and then prepare the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate, so you can use your preferred mechanism.

1. Using [OpenSSL](https://www.openssl.org/), create a certificate for your application. You'll need to adjust the Common Name (CN) value to match the `Ingress Host Name` for your project.
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

2. Go to `Workloads` → `Secrets` → `Create` and select `From YAML`. Use the following YAML as a starting point and then click `Create`.
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
3. Click on `Actions` → `Edit Secret` and use the `Browse...` buttons to upload the key and cert files.

Now create the `entando-ca-cert-secret` Secret, similar to what was done in Scenario 3, but this time using the self-signed certificate. 

4. Go to `Workloads` → `Secrets` → `Create` and select `Key/value secret`
5. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
6. Set the `Key`, e.g. `tls.crt`
7. Set the `Value` by clicking `Browse...` and loading the cert file from Step 1, e.g. `tls.crt`
8. Click `Create`
9. Next, go to `Workloads` → `ConfigMaps` and update or create a ConfigMap named `entando-operator-config`. This is the ConfigMap used by the operator to configure the deployments. You can [download the Entando Operator template](../devops/entando-operator.md#add-a-new-configmap) as a starting point. Set the "data/entando.ca.secret.name" and "data/entando.tls.secret.name" to match the names from above.
```yaml
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.tls.secret.name: entando-tls-secret
```
10. Click `Create`

Now let's create a new application similar to Scenario 3, but with the self-signed SSL certificate.  

11. Go to `EntandoApp` and click `Create instance`
  - Keep the default `my-app` as your application name or select your own
  - Select the EntandoApp version: `7.0`
  - Set the `Ingress Host Name` as in Scenario 1 above. It should match the CN used to generate the certificate in step 1.
  - Keep the default `DBMS` value as `postgresql`
12. Click `Create`. The Entando Operator now proceeds to deploy the appropriate resources.

Once the deployment is complete, you can confirm that all routes use HTTPS with the self-signed certificate. You may still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Next Steps
Once you've completed any of the scenarios above, you have several options.
*  Check out `Networking` → `Routes` to see the URLs for the running services. Common starting points include the Entando App Builder (e.g. `http://entando.apps-crc.testing/app-builder/`) or the Entando Application itself (e.g. `http://entando.apps-crc.testing/entando-de-app/`).
* See the [Entando Operator Configuration](../devops/entando-operator.md) for options related to timeout settings and the default image registry.
* This suggested [list of next steps](../../docs/getting-started/#next-steps) could also be useful.

<!--- If any changes are made to the Next Steps, please update the same in openshift-install.md  --->

