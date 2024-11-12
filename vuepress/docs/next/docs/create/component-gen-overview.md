---
sidebarDepth: 2
---
# Entando Component Generator

The Entando Component Generator (ECG) is a tool that quickly generates project files for the modular components that make up a composable application.

The ECG leverages the [JHipster blueprint](https://www.jhipster.tech/modules/creating-a-blueprint/), providing powerful templating and standardized generation patterns.

## Objectives

The Component Generator has two main objectives, to standardize components and accelerate their development as described further below.

### Accelerate Development

- Begin by running the software: By automating the creation of microservices and micro frontends, the developer is able to bypass the manual steps that would have been required to build the default configuration of an Entando project.
- Customize as desired: The generated code is ready to be further modified and tailored to fit your unique needs.
- Avoid a steep learning curve: The Entando Blueprint uses standard tools, technologies, and patterns that can be consumed by any developer, especially those who are not familiar with the underlying system.

### Standardize Technology 

- Guarantee technology compliance: The ECG encodes business standards for networking, monitoring, build tools, and distribution into the Entando Blueprint to ensure that business requirements are satisfied.
- Guarantee internal compliance: The Entando Blueprint provides parameters to ensure the code complies with the standards and practices of your organization, including formatting, testing tools, static analysis tools, and package structures.
- Jumpstart 3rd party adoption: Teams can quickly recognize and adopt code from system integrators and other third parties because these patterns and standards are encoded into the default application.

## Component Generation Flow

The following provides an overview of the component generation process. To view the code and learn how to use the Entando Blueprint, refer to the [Entando Component Generator Tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md).

1. Create components
   - The ECG creates a Spring Boot microservice and optionally, React micro frontends for entities that you add to your project.
   - The microservice and (optional) micro frontends are runnable out of the box, preconfigured to connect to the [Entando Identity Management System](../consume/identity-management.md).
   - JHipster offers interactive updates and merges to ensure the Blueprint conforms to the current software revision. Developers can perform their own modifications to enhance the generated code or add new functionality via JHipster.
   - The microservice includes Liquibase and integrated data mocking to offer data generation in API calls.

2. Define the bundle and deploy assets
   - The Entando Blueprint generates code compatible with the docker-based bundle project structure. This includes a microservice and entity-level micro frontends, as well as any other components manually added to the project.
   - The project is packaged into a Docker image to provide the manifest for the component parts.
   - The Spring Boot microservice is packed into its own Docker image.

3. Deploy bundles to the [Local Hub](../compose/local-hub-overview.md)
   - Once the Docker images are pushed to a registry, the bundle can be deployed to the Local Hub in the App Builder.
   - Production bundles are installed to the Local Hub as a default of the Entando Component Manager. Development versions can be installed to the Local Hub via tag types, and for more information, see the [Entando Component Manager features](../compose/ecm-overview.md#key-features).
   - A bundle project can be versioned and updated for improvements at any time.

4. Install in an application
   - Once the bundle is deployed to the Local Hub, it can be installed in any Entando Application.
   - The bundle can be shared in an Enterprise Hub, if one was installed, to be used in other applications.
