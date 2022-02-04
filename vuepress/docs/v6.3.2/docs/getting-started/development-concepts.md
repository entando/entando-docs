---
sidebarDepth: 2
---

# Development Concepts on Entando
 
With the Entando Platform, the development of an application is organized into distinct steps: create, curate, compose, and consume. In the simplest terms, you start by **creating** functional building blocks, **curate** the blocks in a catalog, **compose** them on a page or website, which is then **consumed** in an app where it can be scaled and improved upon. 

Entando provides a composable environment where these building blocks can be built independently, enabling parallel teams to accelerate development and innovation on a cloud and Kubernetes-native stack.

![Entando Platform Development Process](./img/concepts.png)

## Create Components 
The first step in building a modern application on Entando is to design and create each independant component or functional block for your application. Developers can use the Entando Component Generator or Blueprint to automate the building and packaging of project files, with the flexibility to customize. In this way, new business capabilities can be integrated into your application without rewriting existing systems. 

| Documentation | Tutorials        |
| :------------ | :--------- |
| [Entando Component Generator](../create/component-gen-overview.md) | [Micro Frontends](../../tutorials/create/mfe/) |
| [Entando Blueprint Feature](../create/blueprint-features.md) | [Microservices](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md) |
| [Component Generation Technologies](../create/component-gen-tech.md) | [Build and Publish Project Bundles](../../tutorials/create/pb/publish-project-bundle.md) |


	
## Curate and Share Components 
On the Entando Platform, Curate and Share means developer teams can share components within a central catalog made available to multiple teams or organizations. Entando's distributed and composable development process allows you to quickly edit, test, analyze, and publish a singular component or packaged business capabilities (PBC) repeatedly, without touching other parts of your application. This includes the ability to publish content and pages along with functional components such as micro frontends and microservices. 

| Documentation | Tutorials        |
| :------------ | :-------- |
| [Bundle and Component Descriptors](../curate/ecr-bundle-details.md) | [Install Bundles from a Private Git Repository](../../tutorials/curate/ecr-private-git-repo.md) |
| [Filtering Bundles](../curate/ecr-bundle-filters.md) | [Install Bundle Plugins from a Private Image Repo](../../tutorials/curate/ecr-private-images.md) |
| [Customize Bundle Info in App Builder](../curate/ecr-bundle-presentation-config.md) |   |
| [Bundle Version and Updates FAQ](../curate/ecr-bundle-versions-faq.md) |  |
| [Bundle Uninstall](../curate/ecr-uninstall-flow.md) |  |


## Compose an Application 
Business IT groups and developers Compose an Application with the Entando App Builder, a low-code composition UI. Assemble or update an application from the components already built in step one, adding templates, widgets, or full PBCs for functionality. The Entando Component Manager and Repository are integrated into the App Builder, making the composable process flexible and agile by managing all your components there. 

| Documentation | Tutorials        |
| :------------ | :-------- |
| [Welcome Wizard](../compose/welcome-wizard.md) | [Page Management](../../tutorials/compose/page-management.md) |
| [Entando Component Repository](../compose/ecr-overview.md) | [Widgets and Fragments](../../tutorials/compose/widgets-fragments.md) |
| [Entando App Builder]<!--(../compose/app-builder.md)--> | [Content Creation](../../tutorials/compose/content-tutorial.md) |
| [Entando Component Manager]<!--(../compose/ecm-overview.md)--> | [Content Templates](../../tutorials/compose/content-templates-tutorial.md)  |
|  | [Digital Assets](../../tutorials/compose/digital-assets-tutorial.md) |

## Consume Applications 
In the Consume step, the end-user or consumer interacts with an application to complete specific tasks, the runtime phase of an Entando Application. The modular design of the platform allows the application and services to be scaled according to that use. In the same way, applications can be continuously improved by adding or updating web content, changing engine rules, and deploying seamless upgrades to individual components. 



| Documentation | Tutorials        |
| :------------ | :-------- |
| [Accessibility](../consume/accessibility.md) | [External Identity Management System](../../tutorials/devops/external-id-management.md) |
| [Entando Operator](../consume/operator-intro.md) | [Add REST API](../../tutorials/devops/add-rest-api.md) |
| [Entando APIs](../consume/entando-apis.md) | [Invoke Entando core APIs](../../tutorials/devops/build-core-image.md) |
| [Custom Resources](../consume/custom-resources.md) | [Change Default Datasource](../../tutorials/devops/change-default-datasource.md) |
| [Entando Identity Management System](../consume/identity-management.md) |  |

