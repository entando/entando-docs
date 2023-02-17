---
sidebarDepth: 2
---
# Accessing Entando APIs


Entando includes the Swagger UI for API access in a quickstart environment. This document presents an overview and instructions on how to enable and access the Swagger UI.

## APIs Overview
The Entando App Engine uses REST APIs to enact all the functionality inside the App Builder. For example, APIs are used to add widgets to a page or create components like pages and page templates. APIs can also be used to support automation, testing, and integration with external systems.

## API Structure
All the APIs share a common top-level structure. Each response contains a top level entry for `errors`, `metadata`, and `payload`.

The `errors` contain code and a message string indicating the error condition of the request. The `metadata` section is used for paging, sorting, and filtering data not included in the body. The body of each response is included in the payload section and varies according to each API.

## Models
All of the model classes returned by the Entando App Engine are annotated with definitions included in the Swagger documentation. They are listed at the bottom of the Swagger page.

## Enable the Swagger UI

The Swagger UI can be enabled or disabled in a running Entando instance by modifying the `SPRING_PROFILES_ACTIVE` environment variable for the `entando-de-app` container. 

1. (Optional) Scale the deployment `spec.replicas` to 0.  

>This is necessary if you're using an in-memory database as in the default quickstart configuration.  This will prevent database errors on immediate restarts when the deployment is changed.

2. Edit the `entando-de-app` deployment. If you have different names for deployment and namespace, adjust the command below accordingly.

>Use the [ent CLI](../getting-started/entando-cli.md) to send commands to Kubernetes from the host machine.
```
kubectl -n entando edit deployment/quickstart-deployment
```

3. Find the `env` variables section under `spec.template.spec.containers.env[image: entando-de-app]`

4. To enable the Swagger UI, add the "SPRING_PROFILES_ACTIVE" variable. If it is already present, add `swagger` to its comma-delimited value list:
```
        - name: SPRING_PROFILES_ACTIVE
          value: default,swagger
```

5. (Optional) Reset the deployment `spec.replicas` back to 1 if it was changed in a previous step. Save the deployment to update.

### Disable Swagger UI

Repeat the steps above, but in step 4, remove `swagger` from the value list.

## Find Your Client Secret
You'll need your client credentials to execute Entando APIs. 

1. Log in into your Keycloak Administration Console at `http://[YOUR-HOST-NAME]/auth`. To find the Keycloak admin credentials, see the [Entando Identity Management System](./identity-management.md) page.

2. From the left navigation panel, go to `Clients`

3. Select the desired client (e.g. in a quickstart environment, this is `quickstart`)

4. Click on the `Credentials` tab to retrieve the Secret. Save the `Client Id` and `Secret` for the steps below.

## Access the APIs on Swagger
1.  To see the APIs, go to: 
``` sh
http://[YOUR-HOST-NAME]/entando-de-app/api/swagger-ui.html
```

2. Click on the Authorize button in the upper right corner.

3. Enter the client ID and Secret from above. Click Authorize.

4. You will be prompted to log in to your Keycloak instance as an Entando admin user if you have not already done so. The default credentials are admin/adminadmin. 

5. You will be redirected to the authenticated Swagger UI page. Select an API to see the methods in the drop-down list and click the `Try it out` button.  
Example:
   1. Scroll down to `widget-controller` and click anywhere on the row

   2. Select the `GET` method

   3. Click `Try it out`

   4. See the results in the window below showing Code 200 and a full response body