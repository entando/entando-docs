# Entando App Builder

The App Builder plays a key role in the composition of Entando Applications. It is the feature-rich, low-code user interface to customize and manage applications includes a Dashboard and a modular CMS to streamline the design and build of an Entando Application.

![Entando App Builder](./img/app-builder.png)
<img src="./img/app-builder.png" width="800" height="393.76">

The App Builder allows you to create pages and content, configure widgets and plugins, and interact with the Entando Component Repository. It also interfaces with the Entando Hub, where you can share components and collaborate.

The Entando App Builder is the frontend of the core application instance. In the default deployment, the App Builder is a React JS application served by Node. In a quickstart environment, the App Builder container is deployed in a multiple container pod.

It communicates with the instance and Entando Component Manager (ECM) with REST APIs. By querying the ECM the App Builder can fetch information on the Entando Bundles deployed to the Entando Component Repository (ECR).

### Key Features:


* Install component bundles from the Entando Component Repository

* Append or update applications

* Use micro frontends to build pages from modular, editable content

* Deploy standalone packaged business capabilities

* Deliver standardized UX design with page and content templates 


### Next Steps:

* To begin, [install Entando](./getting-started/README.md#automatic-install)

* [Welcome Wizard](./welcome-wizard.md)

* [Create a new page](../../tutorials/compose/page-management.md)

* Try out components or packaged business capabilities from the [Entando Hub](./TODO)
