---
sidebarDepth: 2
---
# Installation on OpenShift using the Entando Operator

## Overview
The following tutorial shows how to install an Entando application using the Red Hat-certified `Entando Operator` and covers a few common enterprise configurations. If you're working with an OpenShift version prior to 4.6 then you may require the alternative [manual instructions](./openshift-install.md).

The first scenario listed below is similar to the Entando quickstart style of deployment which can be applied in many environments, including on local developer laptops. The subsequent scenarios build on that initial setup but can be performed directly as desired. Unless otherwise noted, you have the freedom to keep or modify the default options when using the `Entando Operator` and provided APIs in the tutorial steps. 

## Prerequisites
- A 4.6 (or higher) OpenShift installation 
  -  For simplicity the tutorial instructions are for a local Code Ready Containers (CRC) instance but this will require significant dedicated resources, e.g. at least 4 vCPU and 10GB RAM. In some environments you may need to start CRC using `crc start -n 8.8.8.8` in order to install operators. 
- Cluster-admin access to OpenShift for initial installation of the Entando Operator
- Familiarity with the OpenShift console and operation

## Scenario 1
The initial scenario is to deploy the operator and Entando application in a single namespace. We'll start with the smallest application footprint which uses an embedded database.
1. Locate the `Entando Operator` in the `Operators → OperatorHub` using the Filter feature.
2. Click `Install` to view the `Entando Operator` install options. 
3. Select `A specific namespace on the cluster` for the `Installation mode`.
4. Choose an empty namespace for `Installed Namespace`. You can create one from `Home → Projects` first, if needed, e.g. `entando`. 
5. Click `Install` to install the operator into your target namespace.
6. The install may take a few minutes to complete after which you can click `View Operator` to see the operator in your namespace, or you can go to `Operators → Installed Operators` at any point and select it from there. 
7. Now go to `Entando Composite Application` and click `Create instance`
8. Change the `Dbms Override` to `embedded`. This is the lightest and quickest way to test a full Entando application but you'll need to modify the yaml next.
9. (Optional) If you're working in anything but a single project environment, you'll need to provide an `Ingress Host Name Override` specific to your namespace, e.g. `entando-project-1.<my-base-openshift-url>.` In CRC you can keep the default `entando.apps-crc.testing` for your first project.
10. Switch to the YAML view and remove the following section since it isn't needed with an embedded database.
```
    - kind: EntandoDatabaseService
      metadata:
        name: inline-entando-database-service
      spec:
        createDeployment: true
``` 
11. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources. 
12. Go to `Entando Composite Application → my-entando-composite-app` to check the status of the deploy or its `Events` tab to follow its progress.

See the [Next Steps](#next-steps) below to continue your work with Entando or move on to the next Scenario if you want to try another variation.
 
 ## Scenario 2 - Shared PostgreSQL database
 For this scenario we'll prepare a more production-like configuration. Here we'll switch from an embedded on-disk database to a dedicated PostgreSQL database. For this scenario we'll start where step 6 ends in the previous scenario. If you already ran Scenario 1 you can either go to that project and remove the Composite App via `Installed Operators → Entando Operator → Entando Composite Application` or prepare a new project using steps 1-5 above.
 
Now let's create a new application, this time using PostgreSQL.
1. Go to `Entando Composite Application` and click `Create instance`
2. Keep the default `Dbms Override` as `postgresql`
3. (Optional) Set the `Ingress Host Name Override` as in step 9 above.
4. Click `Create`. The `Entando Operator` will now proceed to deploy the appropriate resources just as in Scenario 1 but with the addition of a PostgreSQL database deployment.

See the [Next Steps](#next-steps) below to continue your work with Entando or move on to the next Scenario if you want to try another variation.

## Next Steps
Once you've completed any of the scenarios above, you have several options.
*  Check out `Networking → Routes` to see the URLs for the running services. Common starting points include the `Entando App Builder` (e.g. `http://entando.apps-crc.testing/app-builder/`) or `Entando application` itself (e.g. `http://entando.apps-crc.testing/entando-de-app/`). 
* The list of possible [next steps](../../../../docs/getting-started/#next-steps) could also be useful.
 

