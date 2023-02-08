---
sidebarDepth: 2
---
# Accessing Entando APIs


Entando includes the Swagger UI for API access in a quickstart environment. This document presents an overview and how to enable and access the Swagger UI for Entando APIs.

## APIs Overview
The Entando core exposes REST APIs for every action that can be taken in the App Builder. For example, you can use APIs to create pages, page templates or add widgets to pages. The APIs can be used to support automation, testing, or integrations with external systems as well.

## API Structure
All the APIs share a common top level structure. Each response will contain a top level entry for errors, metadata, and payload.

The errors will always contain code and a message string indicating an error condition in the request. The metadata section is used for paging, sorting, filtering and data that is distinct from the body. The body of each response is included in the payload section of the response and varies according to each API.

## Models
All of the model classes returned by the Entando core are annotated so that the model definition is included in the Swagger documentation. At the bottom of the Swagger page all of the model classes returned by the API endpoints can be found.

## Enable the Swagger UI

The Swagger UI can be enabled or disabled in a running Entando instance by modifying the `SPRING_PROFILES_ACTIVE` environment variable for the `entando-de-app` container. 

1. Edit the `entando-de-app` deployment. The deployment and namespace may have different names outside of a quickstart environment. 

>Use the [ent CLI](../getting-started/entando-cli.md) to send commands to Kubernetes from the host machine.
```
kubectl -n entando edit deployment/quickstart-deployment
```

2. (Optional) Scale the deployment `spec.replicas` to 0 before updating the deployment. This is necessary if you're using an in-memory database, e.g. the default quickstart configuration, and will prevent database errors that can happen on an immediate restart after the profile is changed. Save the deployment to update. 

3. In the deployment YAML, find the env variables section under `spec.template.spec.containers.env[image: entando-de-app]`

4. To enable the Swagger UI, add the "SPRING_PROFILES_ACTIVE" environment variable. If the variable is already present, add `swagger` to its comma-delimited value list:
```
        - name: SPRING_PROFILES_ACTIVE
          value: default,swagger
```

5. (Optional) Reset the deployment `spec.replicas` back to 1 if it was scaled to "0" in the previous steps. Save the deployment to update.

### Disable Swagger UI

Repeat the steps above, but in step 4, remove `swagger` from the value list.

## Find Your Client Secret
You'll need your client credentials to execute the Entando APIs. 

1. Login into your Keycloak Administration Console. To find the Kubernetes credentials, see the [Entando Identity Management System](./identity-management.md) page.

2. From the left nav, go to `Clients`

3. Select the desired client (e.g. in a quickstart environment this is `quickstart`)

4. Click on the `Credentials` tab to retrieve the secret 

## Access the APIs on Swagger
1.  To see the APIs, go to: 
``` sh
http://[YOUR-HOST-NAME]/entando-de-app/api/swagger-ui.html
```

2. Click on the Authorize button in the upper right corner.

3. Enter the client id and secret and click Authorize.

4. You will be prompted to log in to your Keycloak instance as an admin user if you have not already done so. The defaults are admin/adminadmin. 

5. You will be redirected to the authenticated Swagger UI page. Select an API to see the methods in the drop-down list and click the `Try it out` button.  
Example:
   1. Scroll down to `widget-controller`

   2. Select the `GET` method

   3. Click `Try it out`

   4. See the results in the window below. You should see a Server response with Code 200 and full response body.

### Next Steps
* For information, see the tutorial on [adding a REST API](../../tutorials/devops/add-rest-api.md).
* Learn how to [invoke Entando core APIs](../../tutorials/devops/invoking-api.md).