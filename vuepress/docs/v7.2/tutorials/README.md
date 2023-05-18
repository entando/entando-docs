---
sidebarDepth: 2
---

# Learning Paths
Entando simplifies the development of composable applications deployed on Kubernetes. Entando supports end-to-end modularity, with frontend and microservice architectures for codebases that are easier to understand, maintain, and debug across large, distributed teams. 

Check out the learning paths below to find step-by-step tutorials for the most common tasks, organized by architecture and level of complexity.


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
| [Create a React Micro Frontend](./create/mfe/react.md) | [Enable Communication between MFEs](./create/mfe/communication.md) | [Create an Entando Platform Capability (EPC)](./create/mfe/epc.md)|
| [Create an Angular Micro Frontend](./create/mfe/angular.md) | [Add Access Controls to your MFEs](./create/ms/add-access-controls.md) |
| [Create and Manage Content](./compose/content-tutorial.md)| [Enable Context Parameters for your MFEs](./create/mfe/context-params.md) |

## Backend Development

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Build and Publish a Simple Bundle](./create/pb/publish-simple-bundle.md)| [Build and Publish a Project Bundle](./create/pb/publish-project-bundle.md) | [Export a Bundle from an Existing Application](./create/pb/export-bundle-from-application.md) |
| [Generate Micro Frontends and Microservices Based on a Database Entity](./create/ms/generate-microservices-and-micro-frontends.md) |[Use JDL Studio to Create a Complex Database Entity](./create/ms/update-data-model.md) | [Manage Plugin Environment Variables](./devops/plugin-environment-variables.md)
| [Run Micro Frontends and Microservices in Your Local Environment](./create/ms/run-local.md) | [Add Access Controls to Your Microservices](./create/ms/add-access-controls.md) |
|[Add an API Claim to Connect a MFE to a Microservice](./create/ms/add-api-claim.md) |[Use Postman with OAuth2 APIs](./create/ms/use-postman-with-oauth2.md) 
|[Create a Spring Boot Microservice](./create/ms/spring-boot-ms.md)||

## Operations

| Basic | Intermediate | Advanced
| :-: | :-: | :-:
| [Set Up Entando on a Local Kubernetes Cluster](../docs/getting-started/) | [Customize the base Entando Application via a Docker Image](./devops/build-core-image.md) | [Install a Bundle from a Private Image Registry](./curate/bundle-private-images.md)
| [Set Up Entando on Amazon Elastic Kubernetes Service (EKS)](./getting-started/eks-install.md) | [Connect Your Entando Application to an External Database](./devops/external-db.md) | [Install Bundle Microservices from a Private Registry](./curate/ms-private-images.md)
| [Set Up Entando on Azure Kubernetes Service (AKS)](./getting-started/azure-install.md) | [Install the Standard Demo Application](./solution/install-standard-demo.md) | [Add a GitHub Actions CI Workflow](./create/pb/github-actions-workflow.md)
| [Set Up Entando on Google Kubernetes Engine (GKE)](./getting-started/gke-install.md) | [Configure the Entando Operator](./consume/entando-operator.md) | [Manage NGINX](./devops/manage-nginx.md)
| [Set Up Entando on Red Hat OpenShift](./getting-started/openshift-install.md) | [High Availability on Entando](./consume/high-availability.md) | [Set Up Plugin Profiles](./devops/plugin-configuration.md) |
| [Entando Installation on Kubernetes](./getting-started/kubernetes-install.md) |  |  |
| [Entando CLI Reference](../docs/getting-started/entando-cli.md) |  |


