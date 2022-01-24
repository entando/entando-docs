---
sidebarDepth: 2
---
::: danger
This documentation is for the version of Entando currently under development and is a work in progress.
Some screenshots or references to the previous version may be out-of-date and some documented features may
only be available by building from source.
:::

# Tutorials

::: tip Entando simplifies the development of modern apps:

1. Built using modern JavaScript frameworks
2. Backed by microservices deployed in containers, and
3. Orchestrated by Kubernetes for fully automated DevOps lifecycles
:::

Entando supports full stack micro frontend and microservice architectures for codebases that are easier to undestand, maintain, and debug across large, distributed teams, and comes with a private component repository that makes it easy for teams to share and reuse components.

Use the navigation on the left to find step-by-step tutorials for common tasks or check out our learning paths below for a more structured approach.

## Learning Paths
### Frontend Development

<style>
table th:first-of-type {
    width: 33%;
}
table th:nth-of-type(2) {
    width: 33%;
}
table th:nth-of-type(3) {
    width: 34%;
}
</style>

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Build a Basic Widget](./tu-compose-app/widgets-fragments.md)| [Add Configuration to a Widget](./tu-create-components/mfe/widget-configuration.md)| [Generate Micro Frontends and Microservices Based on a Database Entity](./tu-create-components/ms/generate-microservices-and-micro-frontends.md) |
| [Create a React Micro Frontend](./tu-create-components/mfe/react.md) | [Enable Communication between MFEs](./tu-create-components/mfe/communication.md) |
| [Create an Angular Micro Frontend](./tu-create-components/mfe/angular.md) | [Add Access Controls to your MFEs](./tu-create-components/ms/add-access-controls.md) |
| [Create and Manage Content](./tu-compose-app/content-tutorial.md)| |


### Backend Development

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Build and Publish a Simple Bundle](./tu-create-components/pb/publish-simple-bundle.md)| [Build and Publish a Project Bundle](./tu-create-components/pb/publish-project-bundle.md) | [Export a Bundle from an Existing Application](./tu-create-components/pb/export-bundle-from-application.md) |
| [Generate Micro Frontends and Microservices Based on a Database Entity](./tu-create-components/ms/generate-microservices-and-micro-frontends.md) |[Use JDL Studio to Create a Complex Database Entity](./tu-create-components/ms/update-data-model.md) |
| [Run Micro Frontends and Microservices in Your Local Environment](./tu-create-components/ms/run-local.md) | [Add Access Controls to Your Microservices](./tu-create-components/ms/add-access-controls.md) |
||[Use Postman with OAuth2 APIs](./tu-create-components/ms/use-postman-with-oauth2.md)
### Operations

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Set Up Entando on a Local Kubernetes Cluster](../docs/getting-started/) | [Backing Up and Restoring Your Entando Environment](./configure-customize/backing-up-and-restoring-your-environment.md) | [Install Bundle Microservices from a Private Registry](./tu-curate-share/ecr-private-images.md) |
| [Set Up Entando on Amazon Elastic Kubernetes Service (EKS)](./get-started/eks-install.md) | [Customize the base Entando Application via a Docker Image](./configure-customize/build-core-image.md) |[Add a GitHub Actions CI Workflow](./tu-create-components/pb/github-actions-workflow.md)|
| [Set Up Entando on Azure Kubernetes Service (AKS)](./get-started/azure-install.md) |[Connect Your Entando Application to an External Database](./configure-customize/external-db.md) |
| [Set Up Entando on Google Kubernetes Engine (GKE)](./get-started/gke-install.md) | [Install the Standard Demo Application](./solution-templates/install-standard-demo.md)| 
| [Set Up Entando on Red Hat OpenShift](./get-started/openshift-install.md) | |
| [Set Up Entando on Tanzu Kubernetes Grid (TKG)](./get-started/tanzu-install.md) | |

