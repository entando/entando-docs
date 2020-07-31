# Objective

This tutorial will take you through the steps to install and run the Entando Component Geneartor powered by JHipster. At the end of the tutorial you can continue your journey by running your components locally or creating an Entando Bundle for the Entando Component Repository.

## Prerequisites

-   Java 1.8
-   Maven 3.0.5+
-   npm 6+
-   git
-   Docker
-   node 12+ (or LTS)
-   A Docker Hub account or access to a docker registry

## Installation

1. Install JHipster `npm install -g generator-jhipster@6.9.1`

2. Install the Entando Blueprint `npm install -g  generator-jhipster-entando@6.2.0`

3. Create an empty directory to hold your project (this will hold your microservice and micro frontends)

4. On a command line `cd` into your directory and create an Entando plugin using the blueprint `jhipster --blueprints entando`

5. You'll be presented with a series of prompts to configure your application. The list below provides a set of choices. **You can select the defaults in every step of the tutorial if you want to go fast through this. Just hit Enter at each step**
  - If you want to go through the choices follow this guide. Except where noted below in bold you can choose what works best for you. Base values for the tutorial are in parentheses.
     - `What is the base name of your application?` (my-app or a name of your choice)
     - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)
     - `What is your default Java package name? `(org.entando)
     - `Which *type* of database would you like to use?` (SQL)
         - If you pick no database here you'll be building a stateless microservice which is a valid choice but the rest of this tutorial won't work)
     - `Which *production* database would you like to use?` (Postgres or MySQL)
     - `Which *development* database would you like to use?` (H2 with disk-based persistence )
     - `Do you want to use the Spring cache abstraction?` (Yes, with the Ehcache implementation)
     - ` Do you want to use Hibernate 2nd level cache?` (Yes)
     - `Would you like to use Maven or Gradle for building the backend?` **Maven** <-- this is required for Entando and is the default
     - `Which other technologies would you like to use?` (Don't select any other technologies)
     - `What name would you give to the bundle to share on an Entando digital-exchange?` Enter a name for your Entando Bundle or accept the default
     - `Which is the organization name to use when publishing the docker image?` **At this point enter the name of the organization where you are going to push your docker image. If you're using your own dockhub account you should enter your username here.** (this can be changed later as needed)
     - `Would you like to generate micro frontends when creating entities?` (Always)
     - `Would you like to enable internationalization support` (up to you)
     - `Please choose the native language of the application` (up to you)
     - `Please choose additional languages to install` (if you picked internationalization)
     - `Besides JUnit and Jest, which testing frameworks would you like to use?` (up to you)
     -  `Would you like to install other generators from the JHipster Marketplace?` (select no)

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

 7. When prompted with a conflict at this stage enter `a` for All.

At this point you have a choice. C

   - [Build your Entando Bundle and deploy your microservice and micro frontends to the Entando Component Repository.](./build-and-deploy.md)

   - [Go to the Running Locally tutorial to run your micro frontends and microservice in your local dev environment.](./run-local.md)
