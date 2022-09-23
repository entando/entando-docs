---
sidebarDepth: 2
---
# Run Blueprint-generated Microservices and Micro Frontends in Dev Mode
This tutorial guides you through running an Entando project with microservices and micro frontends in a local development environment. 

This tutorial is specific to a project generated with the Entando JHipster Blueprint, converted to a docker-based bundle. 

## Prerequisites

* [Generate Microservices and Micro Frontends](./generate-microservices-and-micro-frontends.md) tutorial. 
* Verify dependencies with the Entando CLI: `ent check-env develop`



## Start Keycloak and Microservice
The following steps utilize the ent bundle CLI.

1. From the project root directory, start up Keycloak. Using Docker Compose, this continues to run in the background until you use `ent bundle svc stop keycloak` to end the process. You can also view its logs with `ent bundle svc logs keycloak`. 
``` sh
ent bundle svc start keycloak
```
2. Start up the Spring Boot application `conference-ms`. The logs will be shown on the console and you can stop the application with `Ctrl+C`. Keep the microservice running while the MFEs are run.
``` sh
ent bundle run conference-ms
```
To check that it is working, go to `http://localhost:8081/`.

>1. If you want to reset the conference-ms data, and you selected "H2 with disk-based persistence" during microservice generation, you can delete the target folder, restart the microservice, and the data will be regenerated.
>2. The `service-url` variable is the microservice API URL.

## Start the Micro Frontends
### Run the conference-table MFE
1. From another shell, start the conference-table micro frontend from the project root directory. This command runs React in development mode so any changes you make to the source files should be immediately seen in the browser. 
``` sh
ent bundle run conference-table
```
If you are not logged in, you'll be redirected to do so. Log in using the following credentials. 
* Username: user 
* Password: user\
Once logged in, you will see the table widget with some generated data.


### Run the conference-form MFE

1.  If you are still running the previous micro frontend, click `Ctrl+C` to end the process

2. Start up the conference-form MFE 
``` sh
ent bundle run conference-form
```
The form to enter the name and location for conferences shoud open in your browser. You may enter and save new data to see it in the other MFEs.

<!-- >>If you want to modify a different row in the database, edit `microfrontends/conference-form/public/index.html` file. Change the `id` attribute in this line:
```
   <my-entity-form service-url="%REACT_APP_SERVICE_URL%" id="1" />
```
-->
### Run the conference-details MFE

1. If you are running the previous micro frontend, click `Ctrl+C` to end the process

2. Start the conference-details MFE
``` sh
ent bundle run conference-details
```
When the run is complete, you should see the details MFE with the ID 1 loaded.

<!-- >>If you want to modify a different row in the database, edit `microfrontends/conference-details/public/index.html` file. Change the `id` attribute in this line:

    <my-entity-details service-url="%REACT_APP_SERVICE_URL%" id="1" />
-->

### Keycloak Settings and Issues 
<!-- 1. Change Keycloak Dev Settings

If you want to use another Keycloak installation >> injected by the API Claims and config JSON structure.

 -->

1. In this Blueprint generated project, Docker Compose persists Keycloak data across restarts by default. If you want your data to reset on restarts:
   
   * Edit the svc/keycloak.yml file. Replace '-Dkeycloak.migration.strategy=IGNORE_EXISTING',
   with the following: 
   ``` yaml
   '-Dkeycloak.migration.strategy=OVERWRITE_EXISTING',
   ```
 
   * In the same file, remove this persistent volume statement under `volumes`:
   ``` yaml
   - ./keycloak-db:/opt/jboss/keycloak/standalone/data
   ```   
   * Keycloak changes should now reset every time you restart.

2. `User is not authenticated` Error message: If you see this message while running the components, it is likely that your Keycloak application is not running or the .env.local is not configured properly. Check if the Docker Compose command is still running. Otherwise, check the parameters in microservice/conference-x/.env.local.

