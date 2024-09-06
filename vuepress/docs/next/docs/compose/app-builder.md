---
sidebarDepth: 2
---

# Entando App Builder

On the Entando Platform, the App Builder is the user interface where you compose applications. It is a feature-rich, low-code UI to customize and manage applications using modular components and packaged business capabilities (PBCs). It offers a Dashboard and CMS to streamline the design and build process. 

![app-builder](./img/app-builder.png)

The App Builder allows you to create pages and content, configure widgets and plugins, and interact with the [Local Hub](local-hub-overview.md). It also allows you to integrate the [Entando Cloud Hub](https://entando.com/composable-platform/packaged-business-capabilities/) to access prebuilt packaged business capabilities or your own [enterprise Hub](../curate/hub-details.md), where you can collaborate and share custom components. 

Pages are designed and embedded with functionality via drag-and-drop:

![page-design](./img/page-design.png)

The App Builder is a React JS application served by Node. In a quickstart environment, the App Builder is deployed as a container. It is the frontend of the core application and uses REST APIs to communicate with the core instance and the [Entando Component Manager (ECM)](ecm-overview.md). The App Builder can query the ECM to fetch information about Entando Bundles available to the Local Hub.

### Key Features:

* Deploy, install, and update bundles and PBCs to your application from the Local Hub and the Entando Cloud Hub

* Preview page design and functionality

* Append or update applications

* Deliver standardized UX design with page and content templates 

* Use micro frontends to build pages from modular, editable content


### Next Steps:

* To begin, [install Entando](../getting-started/README.md#automatic-install)

* [Welcome Wizard](./welcome-wizard.md)

* [Create a new page](../../tutorials/compose/page-management.md)

* Check out the catalog at the [Entando PBCs Marketplace](https://entando.com/composable-platform/packaged-business-capabilities/).
