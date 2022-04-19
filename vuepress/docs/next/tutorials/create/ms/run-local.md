---
sidebarDepth: 2
---
# Run Blueprint-generated Microservices and Micro Frontends in Dev Mode
## Overview
This tutorial will take you through running an Entando project (microservice and micro frontends) in a local development environment. If you haven't generated your Entando project yet, start with the [Generate Microservices and Micro Frontend](./generate-microservices-and-micro-frontends.md) tutorial first.

The steps below assume you are working in the top-level project directory.

## CLI Steps
The following steps make use of the Entando `ent prj` command. See the [Manual Steps](#manual-steps) section below for a more detailed description of what the individual commands do.

1. Startup Keycloak. This uses docker-compose under the hood. Since this is using Docker it will continue to run in the background until you stop it via `ent prj ext-keycloak stop`. You can also view its logs using `ent prj ext-keycloak logs`.
``` sh
ent prj ext-keycloak start
```
2. Startup the Spring Boot application containing your microservices. The logs will be shown on the console and you can stop the application via `CTRL+C`.
``` sh
ent prj be-test-run
```
3. Startup one or more of the frontend widgets, each from its own shell. You can stop the application using `Ctrl+C`. This command runs React in development mode so any changes you make to the source files should be immediately seen in the browser.
``` sh
ent prj fe-test-run
```

## Manual Steps

### Start Keycloak using docker-compose

1.  Startup the Keycloak server:
``` sh
  docker-compose -f src/main/docker/keycloak.yml up
```

#### Notes:
* If you have to install docker-compose you can follow this guide:
<https://docs.docker.com/compose/install/>
* By default docker-compose will recreate the Keycloak container (and reset the H2 database) each time it is started. You can make the following changes to persist Keycloak changes across restarts: 
  * Modify the following line in your `src/main/docker/keycloak.yml`
```
'-Dkeycloak.migration.strategy=OVERWRITE_EXISTING',
```
and replace it with this
```
'-Dkeycloak.migration.strategy=IGNORE_EXISTING',
```   
  * In the same file, add a persistent volume under `volumes`:
```
 - ./keycloak-db:/opt/jboss/keycloak/standalone/data
```   
Keycloak changes should now be persistent. You can reset your Keycloak database by emptying the `src/main/docker/keycloak-db` directory and restarting the container.

### Start the microservice

1.  Start the generated Microservice executing the command:

        ./mvnw

#### Notes:

If you want to reset the widget data (as example if you deleted all rows from the table widget) if during the generation of the microservice you selected "H2 with disk-based persistence" you can delete the target folder, restart the microservice and the data will be regenerated.

### Start the table widget

Now you can start your generated table widget:

1.  Go to the table widget folder in your project:

        cd ui/widgets/YOUR-ENTITY-NAME/tableWidget

2.  Then install and start your widget executing the command:

        npm install && npm start

3.  When the widget is started a browser window is opened and the widget URL is loaded

4.  If you’re not logged in you’re redirected to the login page.

5.  Log in using:

        Username: user
        Password: user

6.  After the login process you’ll be redirected to the widget page and you can see the table widget with some generated data.

### Start the form widget

Now you can start your generated form widget:

1.  If you are running another widget, stop it clicking `Ctrl+C` in your widget command line window

2.  Go to the form widget folder in your project:

        cd ui/widgets/YOUR-ENTITY-NAME/formWidget

3.  Then install and start your widget executing the command:

        npm install && npm start

4.  When the widget is started a browser window is opened with and the widget URL is loaded

5.  If you’re not logged in you’re redirected to the login page.

6.  Log in using:

        Username: user
        Password: user

7.  You’ll be redirected to the widget page and you can see the widget form with the ID 1 loaded.

#### Form widget notes:

If you want to load other data you have to change the index.html file in the folder:

    cd ui/widgets/YOUR-ENTITY-NAME/formWidget/public

and change the id attribute in this line:

    <my-entity-form service-url="%REACT_APP_SERVICE_URL%" id="1" />

### Start the details widget

You can also start your generated details widget:

1.  If you are running another widget, stop it clicking `Ctrl+C` in your widget command line window

2.  Go to the details widget folder in your project:

        cd ui/widgets/YOUR-ENTITY-NAME/detailsWidget

3.  Then install and start your widget executing the command:

        npm install && npm start

4.  When the widget is started a browser window is opened with and the widget URL is loaded

5.  If you’re not logged in you’re redirected to the login page.

6.  Log in using:

        Username: user
        Password: user

7.  You’ll be redirected to the widget page and you can see the widget form with the ID 1 loaded.

### Widget Details notes:

If you want to load other data you have to change the index.html file in the public folder:

    cd ui/widgets/YOUR-ENTITY-NAME/detailsWidget/public

and change the "id" attribute in this line:

    <my-entity-details service-url="%REACT_APP_SERVICE_URL%" id="1" />

## Notes

### Change Keycloak dev settings

If you want to change your Keycloak settings to use another keycloak installation (not the docker-compose pre-configured one) or if you want to change the service-url of your widget you can change the parameters set in the `.env.local` file that was generated by the Entando Blueprint in the root folder of your react widgets:

    cd ui/widgets/YOUR-ENTITY-NAME/tableWidget

then edit the file `.env.local`

By default this variables are set to:

    REACT_APP_SERVICE_URL=http://localhost:8081/services/YOUR-APPLICATION-NAME/api
    REACT_APP_KEYCLOAK_URL=http://localhost:9080/auth
    REACT_APP_KEYCLOAK_REALM=jhipster
    REACT_APP_KEYCLOAK_CLIENT_ID=web_app

### The service-url Variable

The `service-url` variable is the Microservice API URL.

### User is not authenticated message

When you run the widgets if you see the message: `User is not authenticated`. This means that probably your keycloak application is not running so please check if the docker-compose command is still in execution.

