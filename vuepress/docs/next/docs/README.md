---
sidebarDepth: 0
---

::: danger ATTENTION
This documentation is for the version of Entando currently under development and is a work in progress. 
Some screenshots or references to the previous version may be out-of-date and some documented features may 
only be available by building from source.
:::

# Entando Platform

Entando is the leading open source **Application Composition Platform** for Kubernetes. It enables parallel teams to accelerate development and innovation of business capabilities on a modern, cloud-native, and Kubernetes-native stack.

It is a distributed and composable environment in which components can be built, scaled and iterated independently, helping teams build agile applications that can adapt to change.

![Entando Platform Development Process](./getting-started/img/concepts.png) 

On the Entando Platform, development of an application is organized into four stages: Create, Curate, Compose, and Consume. In the simplest terms, you create functional building blocks, curate them in a catalog, compose the blocks into an application, which is then consumed by a user. The Enterprise Architect oversees the process, defining business domains and mapping the capabilities for the building blocks.

## Create Components 
Building a composable application on Entando involves designing and creating each independent component or building block. Developers can use the [Entando Component Generator](./create/component-gen-overview.md) and [Blueprint](./create/blueprint-features.md) to automate the building and packaging of projects using any technology they choose. The modular architecture of apps built on Entando means new business capabilities can be easily integrated without reworking existing systems. 

| Documentation | Tutorials        |
| :------------ | :--------- |
| [Entando Component Generator](./create/component-gen-overview.md) | [Micro Frontends](../tutorials/create/mfe/) |
| [Entando Blueprint Feature](./create/blueprint-features.md) | [Microservices](../tutorials/create/ms/generate-microservices-and-micro-frontends.md) |
| [Component Generation Technologies](./create/component-gen-tech.md) | [Build and Publish Project Bundles](../tutorials/create/pb/publish-project-bundle.md) |

## Curate and Share Components 
On the Entando Platform, Curate and Share means development teams can bundle and share components within a central catalog. Multiple teams can collaborate on a single component or packaged business capabilities (PBCs) and share them across organizations and applications. They can test and assess components for readiness, manage and publish versions, and share metadata for continuous upgrades. 

| Documentation | Tutorials        |
| :------------ | :-------- |
| [Bundle and Component Descriptors](./curate/bundle-details.md) | [Install Bundles from a Private Image Registry](../tutorials/curate/bundle-private-images.md) |
| [Filtering Bundles](./curate/bundle-filters.md) | [Install Bundle Microservices from a Private Image Registry](../tutorials/curate/ms-private-images.md) |
| [Customize Bundle Info in App Builder](./curate/bundle-presentation-config.md) |   |
| [Bundle Version and Updates FAQ](./curate/bundle-versions-faq.md) |  |
| [Bundle Uninstall](./curate/uninstall-flow.md) |  |


## Compose an Application 
The Compose stage is centered around the [Entando App Builder](./compose/app-builder.md), a low-code composition user interface where an application can be assembled using the prebuilt modular templates, widgets, PBCs and others. The [Entando Component Manager](./compose/ecm-overview.md) and [Local Hub](./compose/local-hub-overview.md) are integrated into the App Builder to manage your components, providing speed and flexibility.

| Documentation | Tutorials        |
| :------------ | :-------- |
| [Welcome Wizard](./compose/welcome-wizard.md) | [Page Management](../tutorials/compose/page-management.md) |
| [Local Hub](./compose/local-hub-overview.md) | [Widgets and Fragments](../tutorials/compose/widgets-fragments.md) |
| [Entando App Builder](./compose/app-builder.md) | [Content Creation](../tutorials/compose/content-tutorial.md) |
| [Entando Component Manager](./compose/ecm-overview.md) | [Content Templates](../tutorials/compose/content-templates-tutorial.md)  |
|  | [Digital Assets](../tutorials/compose/digital-assets-tutorial.md) |

## Consume Applications 
In the development lifecycle of an application, Consume is the execution stage where users interact with the app. On Entando, the modular design of components and services means they can be scaled individually, or as a whole, according to those interactions. Likewise, content can be updated, engine rules adapted, and upgrades carried out seamlessly. As a result, the development cycle is a continuous process with minimal disruptions and faster time to market.

| Documentation | Tutorials        |
| :------------ | :-------- |
| [Accessibility](./consume/accessibility.md) | [High Availability on Entando](../tutorials/consume/high-availability.md) |
| [Entando Operator](./consume/operator-intro.md) | [Add an API Claim](../tutorials/create/ms/add-api-claim.md) |
| [Entando APIs](./consume/entando-apis.md) | [Invoke Entando core APIs](../tutorials/consume/invoking-api.md) |
| [Entando Identity Management System](./consume/identity-management.md) | [External Identity Management System](../tutorials/consume/external-id-management.md) |


## Learn More
* [Entando Architecture](./getting-started/concepts-overview.md)
* [Solutions Templates](./getting-started/landing-page.md)
* [Getting Started](./getting-started/README.md)