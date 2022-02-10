---
redirectFrom: /v6.3.2/docs/component-generator/component-gen-overview.html
---

# Entando Component Generator  


The Entando Component Generator powered by JHipster is a tool that gives developers the ability to quickly generate Entando components that can be used to extend an Entando Application.

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

![Component Generator Flow](./img/component-gen-flow.png)

1. Create components
   - The Component Generator will create a Spring Boot microservice and optionally will create React micro frontends for entities that you add to your project
   - The microservice and generated micro frontends are runnable out of the box and preconfigured to connect to [Entando Identity Management](../consume/identity-management.md)
   - The code is meant to be edited and enhanced by developers. JHipster provides interactive updates and merges if you need to re-run the generator or add new functionality via JHipster
   - The microservice includes liquibase and integrated data mocking if you want to generate data in your API calls

2. Define bundle and deploy assets
   - The Entando blueprint includes scripts and tools to automatically generate a bundle ready for deployment to the ECR. The bundle will include your microservice, generated microfrontends, and any microfrontends that you have created manually under the `ui` folder
   - The generated Spring Boot microservice can be built and deployed to a Docker registry using the provided maven Jib plugin
   - Generated bundles can be pushed to a git repository of the users choice

3. Deploy bundles to [Entando Component Repository (ECR)](../compose/ecr-overview.md)
   - Once your Docker images are pushed to your registry and your bundle is available in Git you can generate an Entando bundle descriptor and push the bundles to the ECR
   - The bundles can be versioned and updated using tags in the git repository

4. Install in Entando Apps
   - Once the bundles are in the ECR they are available for deployment in any Entando application that has access to the ECR in the cluster
