---
sidebarDepth: 2
---

# Accessing Entando APIs

## Overview

Entando includes the Swagger UI in a quickstart environment and is reachable at `/entando-de-app/api/swagger-ui.html`:

    http://[your-host-name]/entando-de-app/api/swagger-ui.html

### Enable or disable the Swagger UI in a running container

The Swagger UI can be enabled or disabled in a running container by modifying the SPRING_PROFILES_ACTIVE environment variable for the entando-de-app container. 

1. Edit the deployment. The name may be different outside of a quickstart environment.
```
sudo kubectl -n entando edit deployment/quickstart-server-deployment
```

2. (Optional) Scale the deployment `spec.replicas` to 0 before updating the deployment. This is necessary if you're using an in-memory database, e.g. the default quickstart configuration, and will prevent database errors that can happen on an immediate restart after the profile is changed. Save the deployment to apply the change. 

3. Find the entando-de-app env variables section under `spec.template.spec.containers.env[image: entando-de-app]`

4a. To enable the swagger UI, add the SPRING_PROFILES_ACTIVE environment variable, if it's missing, or add `swagger` to its comma-delimited list.

```
        - name: SPRING_PROFILES_ACTIVE
          value: default,swagger
```
4b. To disable the swagger UI, remove `swagger` from the value.

5. (Optional) Reset the deployment `spec.replicas` back to 1.

6. Save the deployment to apply the change. 

## How to find your client secret
You'll need your client credentials to execute the Entando APIs. 

1. Login into your Keycloak instance

2. Go to `Administration → Clients`

3. Select the desired client (e.g. in a quickstart environment this is `quickstart-server`)

4. Click on the `Credentials` tab to get the secret 

## Setup in local environment

You may prefer to run a local standalone Entando application for some tasks. You'll need Java 11, maven, and Keycloak for authentication. See [these instructions](https://github.com/entando/app-builder/blob/master/with-keycloak.md) to setup a standalone Keycloak.

### Configure Keycloak

Configure your Keycloak client in order to support Swagger UI. A quickstart environment has this pre-configured.

1. Login to your Keycloak instance

2. Access the Administration console

3. Click on `Clients` on the left bar and select your client (e.g. `quickstart-server`)

4. Update the following values under `Settings`:
    - Set `Valid Redirect URIs` to `http://localhost:[your port]/entando-de-app/*` or `*` to allow all redirect URIs.
    - Set `Web Origins` to `http://localhost:[your port]` or `*` to accept all origins.

### Start the Entando Application

1.  Clone the Entando reference application:

        git clone https://github.com/entando/entando-de-app

2.  Start the application with the following options: 
    
    - Enable the Swagger profile via `-Dspring.profiles.active=swagger`
    - Enable the Keycloak profile via `-Pkeycloak`
    - Configure the application connection to Keycloak itself. For simplicity this uses the same client credentials you'll use to try out the APIs.
       - Set `-Dkeycloak.auth.url` to your Keycloak endpoint (including `/auth`), e.g. `-Dkeycloak.auth.url=http://my-keycloak-server/auth`   
       - Set `-Dkeycloak.client.id` to your client id, e.g. `-Dkeycloak.client.id=quickstart-server`
       - Set `-Dkeycloak.client.secret` to your client secret, e.g. `-Dkeycloak.client.secret=my-secret`. See [How to find your client secret](#how-to-find-your-client-secret) above.
    - (Optional) Set`-Djetty.port=8085` if the default port 8080 is already in use. 
    - (Optional) To skip the docker steps (or if you don't have docker installed/running), add `-DskipDocker=true`
    
    Here's a full example:
    
        mvn clean package jetty:run-war -Pjetty-local -Pderby -Pkeycloak -Dspring.profiles.active=swagger -Djetty.port=8085 -Dorg.slf4j.simpleLogger.log.org.eclipse.jetty.annotations.AnnotationParser=error -Dkeycloak.auth.url=http://my-keycloak-host/auth -Dkeycloak.client.id=quickstart-server -Dkeycloak.client.secret=my-client-secret -DskipDocker=true

3.  Wait for the application to start.

        [INFO] Started ServerConnector@1355c8be{HTTP/1.1, (http/1.1)}{0.0.0.0:8085}
        [INFO] Started @66257ms
        [INFO] Started Jetty Server

4. Navigate to the Swagger UI in a browser at `/entando-de-app/api/swagger-ui.html`

        http://localhost:[your port]/entando-de-app/api/swagger-ui.html
    

## APIs Overview

The Entando core exposes REST APIs for every action that can be taken in
the App Builder environment. For example, you can use
these APIs to create pages, create page templates or to add widgets to
pages. The APIs can be used to support automation, testing, or
integrations with external systems.

### API structure

All of the APIs share a common top level structure. Each response will
contain a top level entry for `errors`, `metadata`, and `payload`.

The `errors` will always contain code and a message string indicating an
error condition in the request. The `metadata` section is used for
paging, sorting, filtering and data that is distinct from the body. The
body of each response is included in the `payload` section of the
response and varies according to each API.

### Models

All of the model classes returned by the Entando core are annotated so that the model definition is included in the Swagger documentation. At the bottom of the Swagger page all of the model classes returned by the API endpoints can be found.

## Tutorial

1. Access your application Swagger UI as discussed above

2. Click on the `Authorize` button in the upper right corner

3. Enter the client id and client secret in the open window and click `Authorize`

4. If you are redirected to the Entando login page, log in with your credentials (default are `admin`/`adminadmin`)

5. You will be redirected to the Swagger UI page, now authenticated

6. Use the **Try it out** button on the APIs

    -   Scroll to `widget-controller`

    -   Select the blue GET row

    -   Select **Try it out**

    -   Look at the results in the window. You should see a Server response with Code 200 and full response body.