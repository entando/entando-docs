# Entando Component Generator


The Entando Component Generator, powered by JHipster, is a tool that quickly generates Entando components to extend an Entando Application.

The Component Generator leverages the [JHipster blueprint](https://www.jhipster.tech/modules/creating-a-blueprint/) to provide powerful templating and standard generation patterns.

## Objectives

The Component Generator has two main objectives, acceleration and standardization, which are examined below in greater detail.

### Accelerate Development

- Begin with running software: By automating the creation of microservices and micro frontends, the user is able to bypass the manual development required to build the default configuration of an Entando project.
- Customize as desired: The generated code is ready to be developed on and modified to enable features and capabilities.
- Avoid a learning curve: The Entando Blueprint uses standard tools, technologies, and patterns that can be consumed by developers who are not familiar with the underlying technology.

### Standardize Technology 

- Guarantee technology compliance: The Component Generator encodes business standards for networking, monitoring, build tools, and distribution into the Entando Blueprint to ensure that business requirements are satisfied.
- Guarantee internal compliance: The Entando Blueprint provides parameters to ensure the code complies with standards and practices of your organization including formatting, testing tools, static analysis tools, and package structures.
- Jumpstart 3rd party adoption: Teams can quickly recognize and adopt code from system integrators and other third parties because these patterns and standards are encoded into the default application.

## Generated Component Flow

The following provides an overview of the component generation process. To view the code and learn how to use the Entando Blueprint, refer to the [Entando Component Generator Tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md).

1. Create components
   - The Component Generator creates a Spring Boot microservice and, optionally, React micro frontends for entities that you add to your project.
   - The microservice and generated micro frontends are out-of-the-box runnable and preconfigured to connect to the [Entando Identity Management System](../consume/identity-management-system.md).
   - To integrate user edits and enhancements to the code, JHipster offers interactive updates and merges to re-run the modified generator. Alternatively, the user can add new functionality via JHipster.
   - The microservice includes Liquibase and integrated mocking to offer data generation in API calls.

2. Define the bundle and deploy assets
   - The Entando Blueprint generates code compatible with the docker-based bundle project structure introduced in Entando 7.1. The bundle project includes a microservice and entity-level microfrontends as well as other components added manually to the project.
   - The bundle project is packed into a Docker image to provide the manifest for the components contained in the project.
   - The Spring Boot microservice is packed into its own Docker image.

3. Deploy bundles to the [Local Hub](../compose/local-hub-overview.md)
   - Once the Docker images are pushed to a registry, the bundle can be deployed to the Local Hub in an Entando Application.
   - The bundle project can be versioned and updated at any time.

4. Install in Entando Apps
   - Once the bundle is deployed to the Local Hub, it can be installed in the Entando Application.
