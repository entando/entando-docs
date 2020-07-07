# Objective

The objective of this lab is to briefly introduce the Entando JHipster Blueprint and to provide an introduction to using the blueprint to generate a microservice and micro-frontends for deployment into an Entando application.

## Prerequisites

-   Java 1.8

-   Maven 3.0.5+

-   npm 6+

-   git

-   Docker

-   node 10+ (or LTS)

## Setup for Blueprint Dev mode

1.  Install JHipster `npm install -g generator-jhipster@6.9.1`

2.  Clone the entando blueprint project to a location of your choice 
   ```
   git clone https://github.com/entando/entando-blueprint
   cd entando-blueprint
   git checkout -b v6.2.0-sprint5-rc
   ```
3.  Run this command from within entando-blueprint: `npm link`

4.  Create a new empty directory in a location of your choice outside of existing projects. Don’t create this inside the entando-blueprint project (as example create the folder: `/entando/hello-world`)

    -   This will be the directory where you create your plugin.

    -   It is important that the commands below are run in the directory you are creating

5.  On a command line change into the directory that you just created and run `npm link generator-jhipster-entando`

6.  Create a plugin using the blueprint. Run the following command `jhipster --blueprints entando`

7.  Select the following options (if nothing is specified in this list you can choose any available option)

    -   Microservice application

    -   Name of application: training (Or whatever you want)

    -   Port: 8081

    -   Default package: com.entando (or whatever you want)

    -   SQL

    -   MySQL or Postgres

    -   H2 with disk based persistence

    -   Yes, with the Caffeine implementation

    -   2nd level cache: Yes

    -   Maven

    -   Do not select any other technologies

    -   Accept the provided suggetion for the bundle name

    -   i18n: Yes

    -   Pick a default language

    -   Pick other languages you want

    -   Don’t add any other testing frameworks

    -   No other generators from the marketplace

8.  Adding an Entity and Creating the Micro-Frontends. In your new project run the following command `jhipster entity Conference`

    -   Select Yes for “Do you want to add a field to your entity”

    -   For the name of the field use: conferenceName

    -   Select String for type

    -   Select No for validation rules

    -   Select Yes for “Do you want to add a field to your entity”

    -   For the name of the field use: location

    -   Select String for type

    -   Select No for validation rules

    -   Select No for adding relationships

    -   Select No for Do you want to use separate service class for your
        business logic?

    -   You can choose any option you want here

Repeat the steps above for other entities that you want to add. Also, review the content and documentation around the JHipster Design Language (JDL) <https://start.jhipster.tech/jdl-studio/>

## Start keycloak using docker-compose

1.  Startup the Keycloak server:

        docker-compose -f src/main/docker/keycloak.yml up

### Notes:

if you have to install docker compose you can follow this guide:
<https://docs.docker.com/compose/install/>

## Start the microservice

1.  Start the generated Microservice executing the command:

        ./mvnw

### Notes:

If you want to reset the widget data (as example if you deleted all rows from the table widget) if during the generation of the microservice you selected "H2 with disk-based persistence" you can delete the target folder, restart the microservice and the data will be regenerated.

## Start the table widget

Now you can start your generated table widget:

1.  Go to the table widget folder in your project:

        cd ui/widgets/<your-entity-name>/tableWidget

2.  Then install and start your widget executing the command:

        npm install && npm start

3.  When the widget is started a browser window is opened and the widget URL is loaded

4.  If you’re not logged in you’re redirected to the login page.

5.  Log in using:

        Username: user
        Password: user

6.  After the login process you’ll be redirected to the widget page and you can see the table widget with some generated data.

## Start the form widget

Now you can start your generated form widget:

1.  If you are running another widget, stop it clicking `Ctrl+C` in your widget command line window

2.  Go to the form widget folder in your project:

        cd ui/widgets/<your-entity-name>/formWidget

3.  Then install and start your widget executing the command:

        npm install && npm start

4.  When the widget is started a browser window is opened with and the widget URL is loaded

5.  If you’re not logged in you’re redirected to the login page.

6.  Log in using:

        Username: user
        Password: user

7.  You’ll be redirected to the widget page and you can see the widget form with the ID 1 loaded.

### Form widget notes:

If you want to load other data you have to change the index.html file in the folder:

    cd ui/widgets/<your-entity-name>/formWidget/public

and change the id attribute in this line:

    <my-entity-form service-url="%REACT_APP_SERVICE_URL%" id="1" />

## Start the details widget

You can also start your generated details widget:

1.  If you are running another widget, stop it clicking `Ctrl+C` in your widget command line window

2.  Go to the details widget folder in your project:

        cd ui/widgets/<your-entity-name>/detailsWidget

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

    cd ui/widgets/<your-entity-name>/detailsWidget/public

and change the "id" attribute in this line:

    <my-entity-details service-url="%REACT_APP_SERVICE_URL%" id="1" />

## Notes

### Change keycloak dev settings

If you want to change your keycloak settings to use another keycloak installation (not the docker compose pre configured one) or if you want to change the service-url of your widget you can change the parameters set in the .env.local file that was generated by the entando-blueprint in the root folder of your react widgets:

    cd ui/widgets/<your-entity-name>/tableWidget

then edit the file `.env.local`

By default this variables are set to:

    REACT_APP_SERVICE_URL=http://localhost:8081/services/<your-application-name>/api
    REACT_APP_KEYCLOAK_URL=http://localhost:9080/auth
    REACT_APP_KEYCLOAK_REALM=jhipster
    REACT_APP_KEYCLOAK_CLIENT_ID=web_app

### The service-url Variable

The `service-url` variable is the api Microservice API URL.

### User is not authenticated message

When you run the widgets if you see the message: `User is not authenticated`. This means that probably your keycloak application is not running so please check if the docker-compose command is still in execution.

## Open the project in an IDE

This section just walks through the anatomy of the project and the micro frontends. 
You can skip this or review later as desired. The top level project is a normal Spring Boot application. 
You can look through the code and configuration in src/main/java to get a view of the server side. 
The micro frontends are in the ui folder. Each entity gets an MFE for details, table, and form.