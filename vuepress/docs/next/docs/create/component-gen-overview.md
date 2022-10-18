# Entando Component Generator


The Entando Component Generator, powered by JHipster, is a tool that gives developers the ability to quickly generate Entando components to extend an Entando Application.

The component generator takes advantage of the concept of [JHipster blueprints](https://www.jhipster.tech/modules/creating-a-blueprint/) to provide powerful templating and standard generation patterns.

## Objectives

The component generator has two main objectives

* Accelerate development
  * Automate the creation of microservices and micro frontends with code that runs without changes. Start from running software.
  * Code is meant to be developed on and changed by developers. Ready for customization.
  * Using standard tools, technologies, and patterns that can be consumed by developers who are not familiar with the underlying blueprint

* Standardize microservice creation and technology choices
  * Encode business standards for networking, monitoring, build tools, and distribution into a blueprint to ensure that developers are starting from a technical point that matches your teams requirements
  * Ensure code follows standards and practices of your teams including code formatting, testing tools, static analysis tools, package structures, and other rules specific to your organization
  * Enable teams to quickly recognize and adopt code from system integrators and other third parties because the patterns and standards are encoded in the starting point of your applications

## Generated Component Flow

This section provides an overview of the component generation process. If you want to jump into the code and a tutorial start here: [Entando Component Generator Tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md)

1. Create components
   - The Component Generator will create a Spring Boot microservice and optionally will create React micro frontends for entities that you add to your project
   - The microservice and generated micro frontends are runnable out of the box and preconfigured to connect to [Entando Identity Management](../consume/identity-management.md)
   - The code is meant to be edited and enhanced by developers. JHipster provides interactive updates and merges if you need to re-run the generator or add new functionality via JHipster
   - The microservice includes liquibase and integrated data mocking if you want to generate data in your API calls

2. Define bundle and deploy assets
   - The Entando Blueprint generates code compatible with the docker-based bundle project structure introduced in Entando 7.1. The bundle project will include a microservice, entity-level microfrontends, as well as other components you have added manually to the project.
   - The generated Spring Boot microservice can be built and deployed to a Docker registry using the provided build structure
   - The bundle itself is pushed to the same Docker registry

3. Deploy bundles to the [Local Hub](../compose/local-hub-overview.md)
   - Once your Docker images are pushed to your registry you can deploy the bundle to the Local Hub in an Entando Application
   - The bundle project can be versioned and updated at any time

4. Install in Entando Apps
   - Once the bundle is in the Local Hub, it is available for installation within the Entando Application
