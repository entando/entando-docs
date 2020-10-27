# Objective

This tutorial will take you through the steps to install and run the Entando Component Generator powered by JHipster. At the end of the tutorial you can continue your journey by running your components locally or creating an Entando Bundle for the Entando Component Repository.

## Prerequisites

-   Java 1.8
-   Maven 3.0.5+
-   npm 6+
-   git
-   Docker
-   node 12+ (or LTS)
-   A Docker Hub account or access to a docker registry

## Overview

In this tutorial and in the subsequent tutorials linked at the bottom you'll learn to use the Entando Component Generator powered by JHipster to create and deploy microservices and micro frontends to the [Entando Component Repository](../../docs/ecr/ecr-overview.md) and Entando apps.

![Entando Component Generator](./img/component-gen-flow.png)

The general flow of the component generation is:

1. Run the Entando blueprint to create your components (Spring Boot microservice and optionally React micro frontends)
2. Customize and enhance your generated code
3. Build a bundle from your components
4. Deploy to the Entando Component Repository
5. Install your bundle in your Entando apps


## Installation

1. Install JHipster `npm install -g generator-jhipster@6.9.1`

2. Install the Entando Blueprint `npm install -g generator-jhipster-entando@6.2.0`

3. Create an empty directory to hold your project (this will hold your microservice and micro frontends)

4. On a command line `cd` into your directory and create an Entando plugin using the blueprint `jhipster --blueprints entando`

5. You'll be presented with a series of prompts to configure your application. The list below provides a set of choices. **You can select the defaults in every step of the tutorial if you want to go fast through this. Just hit Enter at each step**

 - If you want to go through the choices follow this guide. Except where noted below in bold you can choose what works best for you. Base values for the tutorial are in parentheses.
     - `What is the base name of your application?` (my-app or a name of your choice)
     - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)
     - `What is your default Java package name? `(Up to you)
     - `Which *type* of database would you like to use?` (SQL)
         - If you pick no database here you'll be building a stateless microservice which is a valid choice but the rest of this tutorial won't work)
     - `Which *production* database would you like to use?` (PostgreSQL or MySQL)
     - `Which *development* database would you like to use?` (H2 with disk-based persistence )
     - `Do you want to use the Spring cache abstraction?` (Yes, with the Caffeine implementation)
     - ` Do you want to use Hibernate 2nd level cache?` (Yes)
     - `Would you like to use Maven or Gradle for building the backend?` **Maven** <-- this is required for Entando and is the default
     - `Which other technologies would you like to use?` (Don't select any other technologies)
     - `What name would you give to the bundle to share on an Entando digital-exchange?` Enter a name for your Entando Bundle or accept the default
     - `Which is the organization name to use when publishing the docker image?` **At this point enter the name of the organization where you are going to push your docker image. If you're using your own docker hub account you should enter your username here.** (this can be changed later as needed)
     - `Would you like to generate micro frontends when creating entities?` (Always)
     - `Would you like to enable internationalization support` (Up to you)
     - `Please choose the native language of the application` (Up to you)
     - `Please choose additional languages to install` (if you picked internationalization)
     - `Besides JUnit and Jest, which testing frameworks would you like to use?` (Up to you)
     -  `Would you like to install other generators from the JHipster Marketplace?` (No)

 6. Next you will add an Entity to your microservice and create Micro Frontends. In your project run `jhipster entity Conference` where Conference is the name of the entity you want to generate
   - **Add Fields**
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
     - `Do you want to add filtering?` (Up to you or `Not Needed` if you're unsure)
     - `Do you want pagination on your entity?` (Yes, with infinite scroll)
     - At this point the blueprint will generate controllers, repositories, services, and micro frontends for your entity generation.
     - - `Overwrite src/main/resources/config/liquibase/master.xml?` When prompted with a conflict at this stage enter `a` for All. This will override existing files with the configuration changes needed for your new entity.

At this point you have a choice:

   - [Build your Entando Bundle and deploy your microservice and micro frontends to the Entando Component Repository.](./build-and-deploy.md)
   - [Go to the Running Locally tutorial to run your micro frontends and microservice in your local dev environment.](./run-local.md)
   - [Learn about the key elements included in the Blueprint generated widgets](../micro-frontends/generate-micro-frontends-from-a-database-entity/)
   
## Interesting Code 
* The basic project is a Spring Boot application.
   * ```/src/main/docker``` contains Docker files to help with local development environments
   * ```/src/main/java``` and ```src/main/resources``` contain the microservice codebase and configuration
   * ```/ui``` holds the micro frontends. By default each entity gets an MFE for details, form, and table.
   * ```/bundle``` is used to assemble the project code into an Entando Bundle.
