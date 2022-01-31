# Entando Component Manager

​​An Entando Application is composed of the Entando App Builder, Entando App Engine, and Entando Component Manager. The Entando Compoent Manager (ECM) is a service that links the Entando Component Repository (ECR) of the App Builder to the core application instance. 

The ECM communicates with the Entando Kubernetes service to populate the App Builder with the bundles that have been deployed as Custom Resources inside of the Entando cluster. These bundles are available to the application and can be managed from within the ECR. 

The Component Manager provides functionality to build and organize micro frontends and widgets from within the Entando App Builder. It also manages the connections between an application and the installed plugins. These interactions rely on Keycloak authorization and authentication features.


Key Features:
* Manages the installation and removal of project bundles

* Enables the availability of components in the App Builder through the Component Repository

* Handles versioning of component bundles for sharing and collaborating
