---
sidebarDepth: 2
---

# Generate Microservices and Micro Frontends

## Overview

This tutorial describes how to use the Entando Component Generator (ECG) to create microservices and micro frontends for deployment to the [Local Hub](../../../docs/compose/local-hub-overview.md) of an Entando Application or a shared [Entando Hub](../../../docs/getting-started/landing-page.md#entando-hub). The ECG is powered by [JHipster](https://www.jhipster.tech/) and leverages the Entando Blueprint.

The output of this tutorial is [a new bundle project](../../../docs/curate/bundle-details.md#bundle-development-process) with several components: 
- A Spring Boot microservice with CRUD operations for a single database entity
- Three React micro frontends for displaying and managing the entity

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Set Up a New Bundle Project
1. Create a new bundle project directory. This will add a simple `entando.json` descriptor as a starting point.
```shell
ent bundle init YOUR-PROJECT-NAME
````

## Generate the Components
1. From the project directory, use the Entando CLI to add a basic microservice configuration to the project:
```shell
cd YOUR-PROJECT-NAME
ent bundle ms add conference-ms --stack=spring-boot
```

2. From the `conference-ms` directory, use the Entando Blueprint (powered by JHipster) to generate the `conference-ms` microservice:
```shell
cd microservices/conference-ms
ent jhipster --blueprints=entando
```

3. You'll be presented with a series of prompts pertaining to service generation. These are echoed below, with the base values for this tutorial in parentheses. Insert the corresponding entry as identified below. Note that the `Enter` key will select the default option.

    - `Please provide the project name:` (Up to you)
    - `What is the base name of your application?` (Up to you) 
    - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)
    - `What is your default Java package name?` (Up to you)
    - `Which *type* of database would you like to use?` (SQL)
          - If no database is selected you'll be building a stateless microservice, which is a valid choice, but the rest of this tutorial won't work.
    - `Which *production* database would you like to use?` (PostgreSQL)
    - `Which *development* database would you like to use?` (H2 with disk-based persistence)
     - `Which cache do you want to use? (Spring cache abstraction)` (Caffeine (local cache, for a single node))
    - `Do you want to use Hibernate 2nd level cache?` (Yes)
    - `Which other technologies would you like to use?` (Don't select any other technologies)
    - `Which BE dependencies do you want to use?` (Dependencies maintained by Entando (entando/entando-bundle-bom))
    - `Would you like to generate micro frontends when creating entities?` (Always)
    - `Would you like to enable internationalization support` (Up to you)
    - `Please choose the native language of the application` (Up to you)
    - `Besides JUnit and Jest, which testing frameworks would you like to use?` (Up to you)
    - `Would you like to install other generators from the JHipster Marketplace?` (No)

4. Enter "Yes" when prompted with the following overwrite to resolve the conflict:

`Overwrite .gitignore?`

5. Add an Entity to your microservice and create the corresponding micro frontends. In this tutorial, `Conference` is the name of the entity that will be added to the application.

 ```shell
ent jhipster entity Conference
```

6. You'll be presented with a series of prompts to add fields to your entity. These are echoed below, with the base values for this tutorial in parentheses. Input your preferences, and note that the `Enter` key will select the default option.

    - `Do you want to add a field to your entity?` (Yes)

    - `What is the name of your field?` (name)
    - `What is the type of your field?` (String)
    - `Do you want to add validation rules to your field?` (No)
    - `Do you want to add a field to your entity?` (Yes)
    - `What is the name of your field?` (location)
    - `What is the type of your field?` (String)
    - `Do you want to add validation rules to your field?` (No)
    - `Do you want to add a field to your entity?` (No)
    - `Do you want to add a relationship to another entity?` (No)
    - `Do you want to use separate service class for your business logic?` (Up to you)
       - If "yes":

       - `Do you want to use a Data Transfer Object (DTO)?` (Up to you)

       - `Do you want to add filtering?` (Up to you)
    - `Is this entity read-only?` (Up to you)
    - `Do you want pagination and sorting on your entity?` (Yes, with infinite scroll)
    - (If you chose to be prompted to generate micro frontends) `Do you want to generate micro frontends?` (Up to you)

7. Affirm each overwrite prompt to resolve conflicts as the Blueprint generates controllers, repositories, services and micro frontends for your entity. **Note: Enter "a" to the initial prompt to authorize changes to all the updated files.**

    - `Overwrite package.json?`

You have now generated a Spring Boot microservice with database integration and React-based micro frontends.     

### Output
   * ```/src/main/java``` and ```src/main/resources``` contain the microservice codebase and configuration.
   * ```/ui``` holds the React-based micro frontends. By default, JHipster generates 3 MFEs per entity to contain the details, form, and table.
   * ```/src/main/docker``` contains Docker files to help with local development environments.

## Configure the Components
1. From the root directory of the project, edit the `entando.json` file and update `microservices/conference-ms` to set the `healthCheckPath` and `dbms`:
```json
   "healthCheckPath":"/management/health",
   "dbms":"postgresql"
```

2. Move the generated `conference-table` MFE into the `microfrontends` directory in the bundle project. If you chose a different entity name, you'll need to adjust these commands accordingly.
```shell
ent bundle mfe add conference-table
mv microservices/conference-ms/ui/widgets/conference/tableWidget/{.,}* microfrontends/conference-table
```
>Note: In some shells (e.g. zsh), you may receive an "invalid argument" warning that can be ignored as long as the folders are relocated correctly.

3. Now add an API claim to connect the `conference-table` MFE to the `conference-ms` microservice. The connection information is stored in `entando.json`.
```shell
ent bundle api add conference-table conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
```
4. Repeat the previous steps for the `conference-details` and `conference-form` MFEs:

     a. Add the MFEs:
     ```shell
     ent bundle mfe add conference-details
     ent bundle mfe add conference-form
     ```
     b. Relocate the folders:
     ```shell
     mv microservices/conference-ms/ui/widgets/conference/detailsWidget/{.,}* microfrontends/conference-details
     mv microservices/conference-ms/ui/widgets/conference/formWidget/{.,}* microfrontends/conference-form
     ```
     c. Add the API claims:
     ```shell
     ent bundle api add conference-details conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
     ent bundle api add conference-form conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
     ```
5. For local development and testing, a custom command is needed in the `entando.json` to use a different port for each MFE as shown below: 
```
    "microfrontends": [
        {
            "name": "conference-table",
            "customElement": "conference-table",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "titles": {
                "en": "conference-table",
                "it": "conference-table"
            },
            "commands": {
                "run": "npm install && PORT=3000 npm start"
            },
            "apiClaims": [
                {
                    "name": "conference-api",
                    "type": "internal",
                    "serviceName": "conference-ms"
                }
            ]
        },
        {
            "name": "conference-details",
            "customElement": "conference-details",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "titles": {
                "en": "conference-details",
                "it": "conference-details"
            },
            "commands": {
                "run": "npm install && PORT=3001 npm start"
            },
            "apiClaims": [
                {
                    "name": "conference-api",
                    "type": "internal",
                    "serviceName": "conference-ms"
                }
            ]
        },
        {
            "name": "conference-form",
            "customElement": "conference-form",
            "stack": "react",
            "type": "widget",
            "group": "free",
            "publicFolder": "public",
            "titles": {
                "en": "conference-form",
                "it": "conference-form"
            },
            "commands": {
                "run": "npm install && PORT=3002 npm start"
            },
            "apiClaims": [
                {
                    "name": "conference-api",
                    "type": "internal",
                    "serviceName": "conference-ms"
                }
            ]
        }
    ],
```

6. Finally, move the Blueprint-provided auxiliary service definitions into the `svc` directory in the bundle project and enable the `keycloak` service for local testing:
```shell
mv microservices/conference-ms/src/main/docker/* svc/
ent bundle svc enable keycloak
```

## Next Steps
Follow one of the links below to run the bundle components locally, or build and publish the bundle into an Entando Application:
 
- [Run Blueprint-generated components locally in dev mode](./run-local.md)
- [Build and publish a project bundle](../pb/publish-project-bundle.md) to deploy your microservice and micro frontends to Entando
- Explore the benefits and features of [the Entando Blueprint](../../../docs/create/blueprint-features.md)
- [Iterate on your data model](./update-data-model.md) using the JHipster Domain Language (JDL)


