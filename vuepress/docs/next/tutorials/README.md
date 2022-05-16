---
sidebarDepth: 2
---
::: danger ATTENTION
This documentation is for the version of Entando currently under development and is a work in progress.
Some screenshots or references to the previous version may be out-of-date and some documented features may
only be available by building from source.
:::


# Learning Paths

::: tip Entando simplifies and automates the DevOps lifecycle of applications orchestrated by Kubernetes.


* Build end-to-end modularity into your application for codebases that are easier to maintain and debug.
* Share and reuse components from a common catalog between teams and applications.
* Leverage the JHipster blueprint, standardizing and accelerating development.

:::
 

Check out the learning paths below, for varying levels of experience and needs for the developer.

## Frontend Development

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
| [Build a Basic Widget](./compose/widgets-fragments.md)| [Add Configuration to a Widget](./create/mfe/widget-configuration.md)| [Generate Micro Frontends and Microservices Based on a Database Entity](./create/ms/generate-microservices-and-micro-frontends.md) |
| [Create a React Micro Frontend](./create/mfe/react.md) | [Enable Communication between MFEs](./create/mfe/communication.md) |
| [Create an Angular Micro Frontend](./create/mfe/angular.md) | [Add Access Controls to your MFEs](./create/ms/add-access-controls.md) |
| [Create and Manage Content](./compose/content-tutorial.md)| |

## Backend Development

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Build and Publish a Simple Bundle](./create/pb/publish-simple-bundle.md)| [Build and Publish a Project Bundle](./create/pb/publish-project-bundle.md) | [Export a Bundle from an Existing Application](./create/pb/export-bundle-from-application.md) |
| [Generate Micro Frontends and Microservices Based on a Database Entity](./create/ms/generate-microservices-and-micro-frontends.md) |[Use JDL Studio to Create a Complex Database Entity](./create/ms/update-data-model.md) | [Manage Plugin Environment Variables](./devops/plugin-environment-variables.md)
| [Run Micro Frontends and Microservices in Your Local Environment](./create/ms/run-local.md) | [Add Access Controls to Your Microservices](./create/ms/add-access-controls.md) |
||[Use Postman with OAuth2 APIs](./create/ms/use-postman-with-oauth2.md)

## Operations

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Set Up Entando on a Local Kubernetes Cluster](../docs/getting-started/) | [Backing Up and Restoring Your Entando Environment](./devops/backing-up-and-restoring-your-environment.md) | [Install Bundle Microservices from a Private Registry](./curate/ecr-private-images.md) |
| [Set Up Entando on Amazon Elastic Kubernetes Service (EKS)](./getting-started/eks-install.md) | [Customize the base Entando Application via a Docker Image](./devops/build-core-image.md) |[Add a GitHub Actions CI Workflow](./create/pb/github-actions-workflow.md)|
| [Set Up Entando on Azure Kubernetes Service (AKS)](./getting-started/azure-install.md) |[Connect Your Entando Application to an External Database](./devops/external-db.md) | [Manage NGINX](./devops/manage-nginx.md)
| [Set Up Entando on Google Kubernetes Engine (GKE)](./getting-started/gke-install.md) | [Install the Standard Demo Application](./solution/install-standard-demo.md)| [Setup Plugin Profiles](./devops/plugin-configuration.md)
| [Set Up Entando on Red Hat OpenShift](./getting-started/openshift-install.md) | [Configure the Entando Operator](./devops/entando-operator.md) |
| [Entando CLI Reference](../docs/reference/entando-cli.md) |  |

