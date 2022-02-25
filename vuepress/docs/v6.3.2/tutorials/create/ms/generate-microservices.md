---
sidebarDepth: 2
redirectFrom: /v6.3.2/tutorials/backend-developers/generate-microservices-and-micro-frontends.html
---

# Generate Microservices

## Overview

The Entando Component Generator is powered by [JHipster](https://www.jhipster.tech/) and used to create microservices and micro frontends for eventual deployment to the [Entando Component Repository](../../../docs/compose/ecr-overview.md) and Entando Applications.

![Entando Component Generator](./img/component-gen-flow.png)

The general flow of the component generation is:

1. Run the Entando Blueprint to create your components (Spring Boot microservice and optionally React micro frontends)
2. Customize and enhance your generated code
3. Build an Entando Bundle from your components
4. Deploy a Custom Resource for your bundle into Kubernetes
5. Install your Entando Bundle into your Entando Application(s)

This tutorial describes how to generate the Spring Boot microservice mentioned in Step 1. 

## Prerequisites

- The [Entando CLI](../../../docs/reference/entando-cli.md#check-environment) to verify environmental dependencies (e.g. Java, npm, git, JHipster, Entando Blueprint).
``` sh
ent check-env develop
``` 

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

3. You'll be presented with a series of prompts to configure your project. These are listed below, with the base values for this tutorial in parentheses. Except where noted in **bold** you can input what works best for you. Note that hitting Enter will select the default option.
 
   - `What is the base name of your application?` (Up to you)\
   - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)\
   - `What is your default Java package name? `(Up to you)\
   - `Which *type* of database would you like to use?` (SQL)\
      - If you select no database you'll be building a stateless microservice, which is a valid choice, but the rest of this tutorial won't work
     - `Which  *production* database would you like to use?` (PostgreSQL or MySQL)\
     - `Which *development* database would you like to use?` (H2 with disk-based persistence )
     - `Do you want to use the Spring cache abstraction?` (Yes, with the Caffeine implementation)
     - ` Do you want to use Hibernate 2nd level cache?` (Yes)
     - `Would you like to use Maven or Gradle for building the backend?` **Maven** <-- this is required for Entando and is the default
     - `Which other technologies would you like to use?` (Don't select any other technologies)
     - `What name would you give to the bundle to share on an Entando digital-exchange?` Enter a name for your Entando bundle or accept the default
     - `Which is the organization name to use when publishing the docker image?` **At this point enter the name of the organization where you are going to push your docker image. If you're using your own docker hub account you should enter your username here.** (this can be changed later as needed)
     - `Would you like to generate micro frontends when creating entities?` (Always)
     - `Would you like to enable internationalization support` (Up to you)
     - `Please choose the native language of the application` (Up to you)
     - `Please choose additional languages to install` (if you picked internationalization)
     - `Besides JUnit and Jest, which testing frameworks would you like to use?` (Up to you)
     - `Would you like to install other generators from the JHipster Marketplace?` (No)

You now have a Entando project containing a Spring Boot microservice with database integration.      

### Project Structure
   * ```/src/main/docker``` contains Docker files to help with local development environments.
   * ```/src/main/java``` and ```src/main/resources``` contain the microservice codebase and configuration.
   * ```/ui``` will store the [React-based micro frontends created for the microservice](../mfe/generate-micro-frontends.md). By default, each entity is allocated an MFE for details, form, and table.
   * ```/bundle``` is used to assemble the project code into an Entando bundle.

## Next Steps

You are now ready to generate micro frontends for your project! See [Generate Micro Frontends](../mfe/generate-micro-frontends.md) for a step-by-step guide.

