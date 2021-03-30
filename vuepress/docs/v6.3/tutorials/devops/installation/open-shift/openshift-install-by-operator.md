---
sidebarDepth: 2
---
# Installation on OpenShift using the Entando Operator

## Overview
The following tutorial shows how to install an Entando application using the Red Hat-certified `Entando Operator` and covers a few common enterprise configurations. If you're working with an OpenShift version prior to 4.6 then you may require the alternative [manual instructions](./openshift-install.md).

The first scenario listed below is similar to the Entando quickstart style of deployment which can be applied in many environments, including on local developer laptops. The subsequent scenarios build on that initial setup but can be performed directly as desired. Unless otherwise noted, you have the freedom to keep or modify the default options when installing the `Entando Operator` and other resources in the tutorials. 

## Prerequisites
- A 4.6 (or higher) OpenShift installation 
  -  For simplicity the tutorial instructions are for a local Code Ready Containers (CRC) instance but this will require significant dedicated resources, e.g. at least 4 vCPU and 10GB RAM. In some environments you may need to start CRC using `crc start -n 8.8.8.8` in order to install operators. 
- Cluster-admin access to OpenShift for initial installation of the Entando Operator
- Familiarity with the OpenShift console and operation

## Scenario 1 - Embedded Database
The initial scenario is to deploy the operator and Entando application in a single namespace. We'll start with the smallest application footprint which uses an embedded database.
1. Locate the `Entando Operator` in the `Operators → OperatorHub` using the Filter feature.
2. Click `Install` to view the `Entando Operator` install options. 
3. Select `A specific namespace on the cluster` for the `Installation mode`.
4. Choose an empty namespace for `Installed Namespace`. You can create one from `Home → Projects` first, if needed, e.g. `entando-one`. 
5. Click `Install` to install the operator into your target namespace.
6. The install may take a few minutes to complete after which you can click `View Operator` to see the operator in your namespace, or you can go to `Operators → Installed Operators` at any point and select it from there. 
7. Now go to `Entando Composite Application` and click `Create instance`
8. Change the `Dbms Override` to `embedded`. This is the lightest and quickest way to test a full Entando application but you'll need to modify the YAML as well in step 10.
9. (Optional) If you're working in anything but a single project environment, you'll need to provide an `Ingress Host Name Override` specific to your namespace, e.g. `entando-one.<my-base-openshift-url>.` In CRC you can keep the default `entando.apps-crc.testing` for your first project.
10. Switch to the YAML view and remove the following section since it isn't needed with an embedded database.
```
    - kind: EntandoDatabaseService
      metadata:
        name: inline-entando-database-service
      spec:
        createDeployment: true
``` 
11. (Optional) Feel free to edit the YAML to customize the names of the components deployed by the EntandoCompositeApp, e.g. `inline-entando-database-service`
12. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources. 
13. Go to `Entando Composite Application → my-entando-composite-app` to check the status of the deploy or its `Events` tab to follow its progress.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 2 - PostgreSQL
 For this scenario we'll prepare a more production-like configuration. Here we'll switch from an embedded on-disk database to a dedicated PostgreSQL database. For this scenario we'll start where step 6 ends in the previous scenario. If you already ran Scenario 1 you can either go to that project and remove the Composite App via `Installed Operators → Entando Operator → Entando Composite Application` or prepare a new project using steps 1-5 above.
 
Now let's create a new application, this time using PostgreSQL.
1. Go to `Entando Composite Application` and click `Create instance`
2. Keep the default `Dbms Override` as `postgresql`. You should not remove the EntandoDatabaseService in this case. 
3. (Optional) Set the `Ingress Host Name Override` as in step 9 above.
4. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources just as in Scenario 1 but with the addition of a PostgreSQL database deployment.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 3 - PostgreSQL plus OpenShift SSL
For this scenario we'll build on Scenario 2 but enable SSL using OpenShift's internal Certificate Authority. As a starting point, you can either remove the Composite App from the previous scenarios or prepare a new project per steps 1-5 in Scenario 1.

1. Using your browser, examine and save the SSL certificate for your environment. For example, in Chrome, go to any OpenShift console page, click on `View Site Information` next to the URL (it may be labeled `Not secure` ) then go to `Details -> Copy to File` and save the certificate as a Base-64 encoded X.509 file, e.g. `openshift.cer.`
2. Go to `Workflows → Secrets → Create` and select `Key/value secret`
3. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
4. Set the `Key`, e.g. `openshift.cer`
5. Set the `Value` by clicking `Browse...` and loading the file you saved in Step 1.
6. Click `Create`
7. Next go to `Workloads → ConfigMaps` and create a ConfigMap named `entando-operator-config` This is the ConfigMap used by the Operator to configure the deployments. You'll need to supply your own project name for the namespace. 
```
kind: ConfigMap
apiVersion: v1
metadata:
 name: entando-operator-config
 namespace: entando-one
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.use.auto.cert.generation: 'true'
```
8. Click `Create`

Now let's create a new application, just like in Scenario 2 but with the OpenShift SSL in place.  

9. Go to `Entando Composite Application` and click `Create instance`
10. Keep the default `Dbms Override` as `postgresql`.  
11. (Optional) Set the `Ingress Host Name Override` as in Scenario 1 step 9.
12. You don't need to set the `TLS Secret Name Override` since it will be taken from the `entando-operator-config` ConfigMap.
13. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources.

Once the deployment is complete you can confirm that all routes use https with OpenShift's CA. You will likely still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 4 - PostgreSQL plus self-signed SSL
This scenario is similar to Scenario 3 but here we'll use a self-signed certificate rather than using OpenShift's Certificate Authority. As a starting point, you can either remove the Composite App from the previous scenarios or prepare a new project per steps 1-5 in Scenario 1.

We'll start by creating a self-signed certificate and then preparing the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate and you can use your own preferred mechanism.

1. Using [OpenSSL](https://www.openssl.org/) create a certificate for your application. You'll need to adjust the CN value to match your project.
```
openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -subj "/CN=entando.apps-crc.testing"
```
You should see output similar to this:
```
Generating a RSA private key
.....................................................................++++
........................................................................................................................................................................................++++
writing new private key to 'tls.key'
-----
```
Now we can create a TLS Secret using the generated files.

2. Go to `Workloads → Secrets → Create` and select `From YAML`. 
3. Enter this `YAML`, update the namespace to match your project, and click `Create`:
```
kind: Secret
apiVersion: v1
metadata:
  name: entando-tls-secret
  namespace: entando-one
data:
  tls.key: ''
  tls.crt: ''
type: kubernetes.io/tls
```
4. Click on `Actions → Edit Secret` and use the ```Browse...``` buttons to upload the key and cert files.

Now we'll also create the `entando-ca-cert-secret` Secret, similar to what was done in Scenario 3 but now using the self-signed certificate. 

5. Go to `Workflows → Secrets → Create` and select `Key/value secret`
6. Set the `Secret Name`, e.g. `entando-ca-cert-secret` 
7. Set the `Key`, e.g. `cert1.crt`
8. Set the `Value` by clicking `Browse...` and loading the cert file from Step 1, e.g. `tls.crt`
9. Click `Create`
10. Next go to `Workloads → ConfigMaps` and create a ConfigMap named `entando-operator-config.` This is the ConfigMap used by the Operator to configure the deployments. You'll need to supply your own project name for the namespace. 
```
kind: ConfigMap
apiVersion: v1
metadata:
 name: entando-operator-config
 namespace: entando-one
data:
 entando.ca.secret.name: entando-ca-cert-secret
 entando.tls.secret.name: entando-tls-secret
```
11. Click `Create`

Now let's create a new application, just like in Scenario 3 but with the self-signed SSL.  

12. Go to `Entando Composite Application` and click `Create instance`
13. Keep the default `Dbms Override` as `postgresql`.  
14. (Optional) Set the `Ingress Host Name Override` as in Scenario 1 step 9.
15. You don't need to set the `TLS Secret Name Override` since it will be taken from the `entando-operator-config` ConfigMap.
16. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources.

Once the deployment is complete you can confirm that all routes use https with the self-signed certificate. You will still see security warnings in the browser.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Scenario 5 - Cluster-scoped operator with wildcard SSL
For this scenario we'll install the Entando Operator so the same operator instance can manage applications across namespaces.
1. Locate the `Entando Operator` in the `Operators → OperatorHub` using the Filter feature.
2. Click `Install` to view the `Entando Operator` install options. 
3. Select `All namespaces on the cluster` for the `Installation mode`.
4. Keep the default `openshift-operators` for the `Installed Namespace`. 
5. Click `Install` to install the operator into the cluster.

Now, similar to Scenario 4, we'll setup a self-signed certificate but this time as a wildcard certificate and then configure the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate and you can use your own preferred mechanism.

6. Using [OpenSSL](https://www.openssl.org/) create a certificate for your application. You'll need to adjust the CN value to match your environment but make sure to include the leading `*.` for the wildcard designation.
```
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
```
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
```
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
17. You can now proceed to create one or more Entando applications in their own namespaces, e.g. using the steps for Scenario 1 starting from Step 7. You can leave out the `Ingress Host Name Override` since the cluster-scoped operator will provide it for you based on the routing.suffix.

See the [Next Steps](#next-steps) below to continue your work with Entando.

## Next Steps
Once you've completed any of the scenarios above, you have several options.
*  Check out `Networking → Routes` to see the URLs for the running services. Common starting points include the `Entando App Builder` (e.g. `http://entando.apps-crc.testing/app-builder/`) or `Entando application` itself (e.g. `http://entando.apps-crc.testing/entando-de-app/`). 
* This suggested [list of next steps](../../../../docs/getting-started/#next-steps) could also be useful.
 

