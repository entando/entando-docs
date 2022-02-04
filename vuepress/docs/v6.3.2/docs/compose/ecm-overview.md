---
sidebarDepth: 2
---

# Entando Component Manager

​​An Entando Application is composed of the Entando App Builder, [Entando App Engine](../getting-started/concepts-overview.md#entando-app-engine), and Entando Component Manager. The Entando Component Manager (ECM) provides functionality to build and organize micro frontends and widgets from within the App Builder. It also manages the connections between an application and the installed plugins.

The Component Manager is a service that links the [Entando Component Repository](ecr-overview.md) (ECR) of the App Builder to the core application instance. It appears as `quickstart-cm-deployment` in the Kubernetes pod list:

![pods.png](./img/pods.png) 

The ECM communicates with the Kubernetes service to populate the ECR with the bundles available as [Custom Resources](../consume/custom-resources.md) in the Entando namespace. These bundles can be installed in the application and managed from within the ECR.

![ecm-flow.png](./img/ecm-flow.png)

In the flow pictured above:
1. A user visits the ECR page in the App Builder
2. The ECR makes a REST call to the `digital-exchange` endpoint
3. The Component Manager receives the `digital-exchange` request
4. The Component Manager calls the `k8s-service` to return the list of available `EntandoDeBundles` in the namespace

A similar process occurs when bundles are installed or uninstalled. The [Entando Operator](../consume/operator-intro.md) performs actions based on lifecycle events for affected Entando Custom Resources.

### Key Features:

* Manages the installation and removal of project bundles

* Makes components available in the App Builder through the Component Repository

* Handles versioning of component bundles for sharing and collaborating
