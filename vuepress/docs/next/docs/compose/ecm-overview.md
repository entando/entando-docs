# Entando Component Manager

​​An Entando Application is composed of the Entando App Builder, Entando App Engine, and Entando Component Manager. The Entando Component Manager (ECM) is a service that links the [Entando Component Repository](ecr-overview.md) (ECR) of the App Builder to the core application instance. It appears as `quickstart-cm-deployment` in the Kubernetes pod list:

![pods.png](./img/pods.png)

The ECM communicates with the Entando Kubernetes service to populate the ECR with the bundles deployed as [Custom Resources](../consume/custom-resources.md) in the Entando cluster. These bundles are available to the application and can be managed from within the ECR. 

<img src="./img/ecm-flow.png" width="800" height="597.73">

The Component Manager provides functionality to build and organize micro frontends and widgets from within the App Builder. It also manages the connections between an application and the installed plugins. 


### Key Features:

* Manages the installation and removal of project bundles

* Enables the availability of components in the App Builder through the Component Repository

* Handles versioning of component bundles for sharing and collaborating
