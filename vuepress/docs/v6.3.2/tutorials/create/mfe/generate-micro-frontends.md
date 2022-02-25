---
sidebarDepth: 2
---

# Generate Micro Frontends

## Overview

The Entando Component Generator is powered by [JHipster](https://www.jhipster.tech/) and used to create microservices and micro frontends for eventual deployment to the [Entando Component Repository](../../../docs/compose/ecr-overview.md) and Entando Applications.

![Entando Component Generator](./img/component-gen-flow.png)

The general flow of the component generation is:

1. Run the Entando Blueprint to create your components (Spring Boot microservice and optionally React micro frontends)
2. Customize and enhance your generated code
3. Build an Entando Bundle from your components
4. Deploy a Custom Resource for your bundle into Kubernetes
5. Install your Entando Bundle into your Entando Application(s)

This tutorial describes how to generate the React micro frontends mentioned in Step 1. 

## Prerequisites

- The [Entando CLI](../../../docs/reference/entando-cli.md#check-environment) to verify environmental dependencies (e.g. Java, npm, git, JHipster, Entando Blueprint).
``` sh
ent check-env develop
```  

- An existing project with a microservice for which you can create micro frontends. Refer to [Generate Microservices](../mfs/generate-microservices) for the corresponding tutorial.

### Manual Setup
We recommend using the `ent jhipster` command to generate microservices and micro frontends, but you can also run the following commands to initialize JHipster and the Entando Blueprint. If you choose the manual setup, replace all instances of `ent jhipster` in this tutorial with the `jhipster` command. 

1. Install JHipster
``` sh
npm install -g generator-jhipster@6.10.5
```

2. Install the Entando Blueprint
```sh
npm install -g generator-jhipster-entando@6.3.2
```

## Generate the Entity

Whether you elect to use the `ent jhipster` command or perform a manual setup, the next step is to add an Entity to your [existing microservice](../ms/generate-microservices.md) and create the corresponding Micro Frontends. In this tutorial, `Conference` is the name of the entity that will be added to the application.

1. Create the entity `Conference`
 ``` sh
ent jhipster entity Conference
```
2. You'll be presented with a series of prompts to add fields to your entity. These are listed below, with the base values for this tutorial in parentheses. Input what works best for you, and note that hitting Enter will select the default option.


     - `Do you want to add a field to your entity?` (Yes)
     
     - `What is the name of your field?` (Enter `name`)
     - `What is the type of your field?` (Select `String`)
     - `Do you want to add validation rules to your field?` (No)
     - `Do you want to add a field to your entity?` (Yes)
     - `What is the name of your field?` (Enter `location`)
     - `What is the type of your field?` (Select `String`)
     - `Do you want to add validation rules to your field?` (No)
     - `Do you want to add a field to your entity?` (No)
     - `Do you want to add a relationship to another entity?` (No)
     - `Do you want to use separate service class for your business logic?` (Up to you)
        - If yes:
        - `Do you want to use a Data Transfer Object (DTO)?` (Up to you)
        - `Do you want to add filtering?` (Up to you)
     - `Is this entity read-only?` (Up to you)
     - `Do you want pagination on your entity?` (Yes, with infinite scroll)
     - If you asked to be prompted about micro frontends when generating the project:
       - `Do you want to generate micro frontends?` (Up to you)
   - At this point the blueprint will generate controllers, repositories, services, and micro frontends for your entity.
     - `Overwrite src/main/resources/config/liquibase/master.xml?` When prompted with a conflict at this stage enter `a` for All. This will override existing files with the configuration changes needed for your new entity.

Your Entando project now includes React-based micro frontends!      

## Next Steps
You now have a choice:
   - [Build your Entando bundle](../pb/publish-project-bundle.md) and deploy your microservice and micro frontends to the Entando Component Repository
   - Folow the [Running Locally tutorial](./run-local.md) to run your microservice and micro frontends in your local dev environment
   - Learn about the key elements included in the [Blueprint generated widgets](../../../docs/create/blueprint-features.md)
   - [Iterate on your data model](./update-data-model.md) using the JHipster Domain Language (JDL)
