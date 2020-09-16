---
sidebarDepth: 0
---

# Accessing Entando APIs

## Prerequisites

-   Java 8

-   maven

## Setup

1.  Clone the Entando reference app if you don’t already have it.

        git clone https://github.com/entando-k8s/entando-de-app

2.  Start the app for local execution and enable the swagger profile by
    passing `-Dspring.profiles.active=swagger` to the jetty command. Set
    the value of `-Djetty.port` to something available on your machine
    e.g. 8085.

         mvn clean package jetty:run-war -Pjetty-local -Pderby -Dspring.profiles.active=swagger -Djetty.port=8085 -Dorg.slf4j.simpleLogger.log.org.eclipse.jetty.annotations.AnnotationParser=error

* Note: If you don't have docker installed or running add `-DskipDocker=true` to the command above

3.  Wait for the app to start.

4.  Once started, navigate to the swagger ui in a browser.

<!-- -->

    http://localhost:[your port]/entando-de-app/api/swagger-ui.html

## Overview

The Entando core exposes REST APIs for every action that can be taken in
the App Builder and Admin Console environments. For example, you can use
these apis to create pages, create page templates or to add widgets to
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

All of the model classes returned by the Entando core are annotated so
that the model definition is included in the swagger documentation. At
the bottom of the swagger page all of the model classes returned by the
API endpoints can be found.

## Tutorial:

1.  Stop the Entando instance if it is running.

2.  In the project open `src/main/conf/systemParams.properties`.

3.  Change the value of this property to reflect the port you are using
    to run the app.

    -   applicationBaseURL

    -   For example if running on 8085 you would have
        `applicationBaseURL=http://localhost:8085/${entando.engine.web.context}/`

4.  Login to the admin console at ```http://localhost:8085/entando-de-app/do/login```

5.  Once logged in go to `Administration - API Management - Consumers.`

6.  Select the kebab button on the row labeled swagger.

7.  On that screen enable the button for `client_credentials`.

8.  On that screen enter `swagger` as the value for the secret.

9.  Click `Save`

10. Return to the Swagger UI, e.g. `http://localhost:8085/entando-de-app/api/swagger-ui.html`

11. Click `Authorize`

12. Enter

    -   `user: admin`

    -   `password: adminadmin`

    -   `client: swagger`

    -   `client_secret: swagger`

13. Use the **Try it out** button on the APIs

    -   Scroll to `widget-controller`

    -   Select the blue GET row

    -   Select **Try it out**

    -   Look at the results in the window
