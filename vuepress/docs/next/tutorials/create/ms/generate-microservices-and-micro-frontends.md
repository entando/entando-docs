---
sidebarDepth: 2
---

# Generate Microservices and Micro Frontends

## Overview

This tutorial describes how to use the Entando Component Generator (ECG) to create microservices and micro frontends for deployment to the [Local Hub](../../../docs/compose/local-hub-overview.md) of an Entando Application or a shared [Entando Hub](../../../docs/getting-started/landing-page.md#entando.hub). The ECG is powered by [JHipster](https://www.jhipster.tech/) and leverages the Entando Blueprint. 

The [general development process](../../../docs/curate/bundle-details.md#bundle-development-process) is:

1. Set up a new bundle project
2. Run the Entando Blueprint to create your components (Spring Boot microservice and optionally React micro frontends)
3. Configure the bundle project to wire together the components.
4. Build an Entando Bundle from your components
5. Deploy a [custom resource](../../../docs/consume/custom-resources.md) for your bundle into Kubernetes
6. Install your Entando Bundle into your Entando Application(s)

## Prerequisites
* Use the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment) to verify environmental dependencies (e.g. Java, npm, git, JHipster, Entando Blueprint).
``` sh
ent check-env develop
```
* This tutorial sets up a bundle with the Docker-based format first introduced with Entando 7.1.

## Set Up a New Bundle Project
1. Create a new bundle project directory. This will add a simple `entando.json` descriptor as a starting point.
```shell
ent bundle init YOUR-PROJECT-NAME
````
2. Change into the project directory
```shell
cd YOUR-PROJECT-NAME
```

## Generate the Components
1. Use the entando cli to add a microservice to the project. This step creates the basic configuration and then the Entando Blueprint generates the service code in the following steps.
```shell
ent bundle ms add conference-ms --stack=spring-boot
```
2. Change to the microservice directory
```shell
cd microservices/conference-ms
```

3. Use the Entando Blueprint (powered by JHipster) to generate the `conference-ms` microservice.
```shell
ent jhipster --blueprints=entando
```

4. You'll be presented with a series of prompts pertaining to service generation. These are echoed below, with the base values for this tutorial in parentheses. Input your preferences, except where a required entry is identified in **bold**. Note that the `Enter` key will select the default option.

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
    - `Which other technologies would you like to use?` (**Don't select any other technologies**)
    - `Which BE dependencies do you want to use?` (Dependencies maintained by Entando (entando/entando-bundle-bom))
    - `Would you like to generate micro frontends when creating entities?` (Always)
    - `Would you like to enable internationalization support` (Up to you)
    - `Please choose the native language of the application` (Up to you)
    - `Besides JUnit and Jest, which testing frameworks would you like to use?` (Up to you)
    - `Would you like to install other generators from the JHipster Marketplace?` (No)

5. Enter "Yes" when prompted with the following overwrite to resolve the conflict:

`Overwrite .gitignore?`

6. Add an Entity to your microservice and create the corresponding micro frontends. In this tutorial, `Conference` is the name of the entity that will be added to the application.

 ```shell
ent jhipster entity Conference
```

7. You'll be presented with a series of prompts to add fields to your entity. These are echoed below, with the base values for this tutorial in parentheses. Input your preferences, and note that the `Enter` key will select the default option.

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

8. Affirm each overwrite prompt to resolve conflicts as the Blueprint generates controllers, repositories, services and micro frontends for your entity. **Note: Enter "a" in response to the initial prompt to authorize all overwrites to existing files with the necessary configuration changes.**

    - `Overwrite package.json?`

You have now generated a Spring Boot microservice with database integration and React-based micro frontends.     

### Output
   * ```/src/main/java``` and ```src/main/resources``` contain the microservice codebase and configuration.
   * ```/ui``` holds the React-based micro frontends. By default, JHipster generates 3 MFEs per entity to contain the details, form, and table.
   * ```/src/main/docker``` contains Docker files to help with local development environments.

Next you'll move the `/ui` and `/src/main/docker` files into the standard Entando bundle locations and then wire the MFEs and microservice together.

## Finish configuring the bundle project
1. Change back to the root directory of your project
```shell
cd ../..
```
2. Edit the `entando.json` and update `microservices/conference-ms` to set the healthCheckPath and dbms.
```json
   "healthCheckPath":"/management/health",
   "dbms":"postgresql"
```

3. Move the generated `conference-table` MFE into the correct location in the bundle project. If you chose a different entity name, you'll need to adjust these commands accordingly.
```shell
ent bundle mfe add conference-table
find microservices/conference-ms/ui/widgets/conference/tableWidget/. -mindepth 1 -maxdepth 1 -exec mv -t microfrontends/conference-table/ -- {} +
```

4. Now add an API claim to connect the `conference-table` MFE to the `conference-ms` microservice. This connection information is stored in the `entando-json`.
```shell
ent bundle api add conference-table conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
```

5. Repeat the previous steps for the `conference-details` and `conference-form` MFEs.
```shell
ent bundle mfe add conference-details
ent bundle mfe add conference-form
find microservices/conference-ms/ui/widgets/conference/detailsWidget/. -mindepth 1 -maxdepth 1 -exec mv -t microfrontends/conference-details/ -- {} +
find microservices/conference-ms/ui/widgets/conference/formWidget/. -mindepth 1 -maxdepth 1 -exec mv -t microfrontends/conference-form/ -- {} +
ent bundle api add conference-details conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
ent bundle api add conference-form conference-api --serviceName=conference-ms --serviceUrl=http://localhost:8081
```

6. Finally, move the auxiliary services into place in the bundle project and enable the keycloak service for local tests.
```shell
mv microservices/conference-ms/src/main/docker/* svc/
ent bundle svc enable keycloak
```

## Next Steps
Follow one of the links below to learn how to assemble and run a bundle locally or deploy it.

- [Build and publish a project bundle](../pb/publish-project-bundle.md) to deploy your microservice and micro frontends to the Entando Component Repository
- Learn how to [run Blueprint-generated components locally in dev mode](./run-local.md)
- Discover the benefits and features of [the Entando Blueprint](../../../docs/create/blueprint-features.md)
- [Iterate on your data model](./update-data-model.md) using the JHipster Domain Language (JDL)

