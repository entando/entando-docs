---
sidebarDepth: 0
---

# Accessing Entando APIs

## Overview

Following the [quickstart guide](../getting-started/quick-reference.md), Entando comes with Swagger UI enabled out of the box.
If you want to use Swagger UI in the local environment, proceed in the reading, otherwise you can directly go to step [Setup in the quickstart environment](#setup-in-the-quickstart-environment).

## Setup in local environment

### Prerequisites

-   Java 8

-   maven

### Setup

1.  Clone the Entando reference app if you don’t already have it.

        git clone https://github.com/entando-k8s/entando-de-app

2.  Start the app for local execution and 
    
    - enable the swagger profile by passing `-Dspring.profiles.active=swagger` to the jetty command. Set
    the value of `-Djetty.port` to something available on your machine e.g. 8085.
    
    - enable keycloak as authentication service by passing `-Dkeycloak.auth.url=[KEYCLOAK_AUTH]` `-Dkeycloak.client.id=[KEYCLOAK_CLIENT_ID]` `-Dkeycloak.client.secret=[KEYCLOAK_CLIENT_SECRET]`
    
        replace `KEYCLOAK_AUTH` with your Keycloak endpoint (tipically something like `http://quickstart-kc-quickstart.apps.rd.entando.org/auth`)
        
        replace `KEYCLOAK_CLIENT_ID` with your desired client id (tipically `quickstart-server`)
        
        replace `KEYCLOAK_CLIENT_SECRET` with your desired client's secret. To find the secret take a look at [How to find your client secret](#how-to-find-your-client-secret)
    
    Now you can launch the command: 
    
         mvn clean package jetty:run-war -Pjetty-local -Pderby -Dspring.profiles.active=swagger -Djetty.port=8085 -Dorg.slf4j.simpleLogger.log.org.eclipse.jetty.annotations.AnnotationParser=error
            -Dkeycloak.auth.url=http://quickstart-kc-quickstart.apps.rd.entando.org/auth -Dkeycloak.client.id=quickstart-server -Dkeycloak.client.secret=123412341-1234-1234-1234-123412341234

* Note: If you don't have docker installed or running add `-DskipDocker=true` to the command above

3.  Wait for the app to start.

4.  Once started, navigate to the swagger ui in a browser.

    http://localhost:[your port]/entando-de-app/api/swagger-ui.html


## Setup in the quickstart environment

Entando comes with Swagger UI enabled out of the box, it's reachable at `http://[your-entando-app-hostname]/entando-de-app/api/swagger-ui.html`, so for example at:

    http://quickstart-flex.apps.rd.entando.org/entando-de-app/api/swagger-ui.html


All you have to do is to [find your credentials](#how-to-find-your-client-secret) (client id and client secret) and start using Swagger UI.

## How to find your client secret

1. login into your keycloak instance

2. access the Administration console

3. click on *Clients* on the left bar and select your desired client (e.g. `quickstart-server`)

4. click on the _Credentials_ tab and get the secret 

## APIs Overview

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

1. access your application Swagger UI as discussed above

2. click on the `Authorize` button in the upper right corner

3. enter client id and client secret in the open window and click `Authorize`

4. if you are redirected to the Entando login page, log in with your credentials (default are `admin`/`adminadmin`)

5. you will be redirected to the Swagger UI page, now authenticated

6. Use the **Try it out** button on the APIs

    -   Scroll to `widget-controller`

    -   Select the blue GET row

    -   Select **Try it out**

    -   Look at the results in the window
