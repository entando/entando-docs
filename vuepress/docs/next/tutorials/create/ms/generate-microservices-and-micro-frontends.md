---
sidebarDepth: 2
---

# Generate Microservices and Micro Frontends

## Overview

This tutorial describes how to use the Entando Component Generator (ECG) to create microservices and micro frontends for deployment to the [Entando Component Repository](../../../docs/compose/ecr-overview.md) and Entando Applications. The ECG is powered by [JHipster](https://www.jhipster.tech/) and leverages the Entando Blueprint. 

![Entando Component Generator](./img/component-gen-flow.png)

The general flow of component generation is:

1. Run the Entando Blueprint to create your components (Spring Boot microservice and optionally React micro frontends)
2. Customize and enhance your generated code
3. Build an Entando Bundle from your components
4. Deploy a [Custom Resource](../../../docs/consume/custom-resources.md) for your bundle into Kubernetes
5. Install your Entando Bundle into your Entando Application(s)

## Prerequisites
Use the [Entando CLI](../../../docs/reference/entando-cli.md#check-the-environment) to verify environmental dependencies (e.g. Java, npm, git, JHipster, Entando Blueprint).
``` sh
ent check-env develop
```  

### Manual Setup
We recommend using the Entando CLI to generate microservices and micro frontends, but you can also manually initialize JHipster and the Entando Blueprint with the following commands. **Note: If you choose the manual setup, commands in this tutorial that include `ent jhipster` should instead use `jhipster`.**

1. Install JHipster
``` sh
npm install -g generator-jhipster@7.2.0
```

2. Install the Entando Blueprint
```sh
npm install -g generator-jhipster-entando@6.3.2
```

## Generate the Project
Whether you elect to use the `ent jhipster` command or perform a manual setup, the next step is to create a project with microservices.

1. Setup a new project directory
``` sh
mkdir testProject && cd testProject
```

2. Use `ent jhipster` (or `jhipster`) to generate the project skeleton via the Entando Blueprint
``` sh
ent jhipster --blueprints entando
```

3. This triggers a project initialization prompt. Enter "Yes" in response:

`The project dir doesn't seem to be initialized, should I do it now?` (**Yes**)

4. Enter "Yes" when prompted with the following overwrite to resolve the conflict:

`Overwrite .gitignore?`

5. You'll be presented with a series of additional prompts pertaining to project configuration. These are echoed below, with the base values for this tutorial in parentheses. Input your preference, except where a required entry is identified in **bold**. Note that the "Enter" key will select the default option.


    - `Please provide the project name:` (Up to you)

    - `What is the base name of your application?` (Up to you) 
    - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)
    - `What is your default Java package name?` (Up to you)
    - `Which *type* of database would you like to use?` (SQL)
          - If no database is selected you'll be building a stateless microservice, which is a valid choice, but the rest of this tutorial won't work.
    - `Which *production* database would you like to use?` (PostgreSQL or MySQL)
    - `Which *development* database would you like to use?` (H2 with disk-based persistence)
    - `Which cache do you want to use? (Spring cache abstraction)` (Caffeine (local cache, for a single node))
    - `Do you want to use Hibernate 2nd level cache?` (Yes)
    - `Which other technologies would you like to use?` (**Don't select any other technologies**)
    - `Which BE dependencies do you want to use?` (**Dependencies maintained by Entando (entando/entando-bundle-bom)**)
    - `What name would you give to the bundle to share on an Entando Component Repository?` (Up to you)
    - `Which is the organization name to use when publishing the docker image?` (**Enter the name of the organization where you are going to push your Docker image. If you're using your personal Docker hub account enter your username.**) <-- this can be changed later as needed
    - `Would you like to generate micro frontends when creating entities?` (Always)
    - `Would you like to enable internationalization support` (Up to you)
    - `Please choose the native language of the application` (Up to you)
    - `Besides JUnit and Jest, which testing frameworks would you like to use?` (Up to you)
    - `Would you like to install other generators from the JHipster Marketplace?` (No)

6. Next, add an Entity to your microservice and create the corresponding micro frontends. In this tutorial, `Conference` is the name of the entity that will be added to the application. Remember to replace `ent jhipster` with `jhipster` if you are not using the Entando CLI.

 ``` sh
ent jhipster entity Conference
```

7. You'll be presented with a series of prompts to add fields to your entity. These are echoed below, with the base values for this tutorial in parentheses. Input your preference, and note that the "Enter" key will select the default option.

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


8. Affirm each overwrite prompt (echoed below) to resolve conflicts as the Blueprint generates controllers, repositories, services, and micro frontends for your entity. **Note: Enter `a` in response to the initial prompt to authorize all overwrites to existing files with the necessary configuration changes.**
    - `Overwrite src/main/resources/config/liquibase/master.xml?` 

    - `Overwrite package.json?`
    - `Overwrite bundle/descriptor.yaml?`
    - `Overwrite bundle/plugins/jhipster-plugin.yaml?`
    - `Overwrite src/main/resources/config/liquibase/master.xml?`
    - `Overwrite src/main/java/com/mycompany/myapp/config/CacheConfiguration.java?`

You have now generated an Entando project, including a Spring Boot microservice with database integration and React-based micro frontends.      

### Project Structure
   * ```/src/main/docker``` contains Docker files to help with local development environments.
   * ```/src/main/java``` and ```src/main/resources``` contain the microservice codebase and configuration.
   * ```/ui``` holds the React-based micro frontends. By default, JHipster generates 3 MFEs per entity to contain the details, form, and table.
   * ```/bundle``` is used to assemble the project code into an Entando Bundle.

## Next Steps
Follow one of the links below to learn how to assemble and run a bundle locally or deploy it.

- [Build and publish a project bundle](../pb/publish-project-bundle.md) to deploy your microservice and micro frontends to the Entando Component Repository
- Learn how to [run Blueprint-generated components locally in dev mode](./run-local.md)
- Discover the benefits and features of [the Entando Blueprint](../../../docs/create/blueprint-features.md)
- [Iterate on your data model](./update-data-model.md) using the JHipster Domain Language (JDL)

