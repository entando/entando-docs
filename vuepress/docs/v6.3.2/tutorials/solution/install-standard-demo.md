---
sidebarDepth: 2
redirectFrom: /v6.3.2/tutorials/samples/install-standard-demo.html
---

# Entando Standard Banking Demo

[[toc]]

## Introduction

This tutorial will guide you through installing a demo application using the Entando Component Repository (ECR) and a set of Entando
bundles. This solution template includes: 

- microservices
- micro frontends
- multiple pages
- CMS content

The goal of this exercise is to demonstrate how Entando bundles can be used to: 

- quickly install and create functionality in an Entando Application
- enable packaged business capabilities
- allow developers to reuse full stack operations via bundles

Some of the key elements of the template are reviewed in the [Application Details section](#application-details) below.

## Installation

There are numerous assets installed as part of the Standard Banking Demo. Entando Bundles can include more or less components, depending on objectives. It is recommended that organizations develop guidelines for bundle sizing that fit the goals of their applications and teams.

### Prerequisites

- An Entando Application on any Kubernetes provider. Follow one of the [tutorials](../#operations) appropriate to your environment to install the Entando platform.
- The ent command line tool, installed and connected to your Kubernetes instance.

### Installation Steps

1. Apply the definitions for the four bundles that comprise the Standard Banking Demo. You'll need to adjust the `-n entando` option in each command to match your namespace or project.
```
ent bundler from-git -d -r https://github.com/entando-samples/standard-demo-banking-bundle.git | ent kubectl apply -n entando -f -
```
```
ent bundler from-git -d -r https://github.com/entando-samples/standard-demo-customer-bundle.git | ent kubectl apply -n entando -f -
```
```
ent bundler from-git -d -r https://github.com/entando-samples/standard-demo-manage-users-bundle.git | ent kubectl apply -n entando -f -
```
```
ent bundler from-git -d -r https://github.com/entando-samples/standard-demo-content-bundle.git | ent kubectl apply -n entando -f -
```

2. Log into your App Builder instance.

3. Select `Repository` from the menu on the left. Your bundles will be visible in the repository as shown in the screenshot below.
   ![Repository.png](./images/Repository.png)

4. Select `Install` for each bundle, where order of installation is important. The `standard-demo-content-bundle` will need to be installed last, as it relies on MFEs from the other bundles to set up each of the pages. 
   ![Installed.png](./images/Installed.png)

Each installation can take several minutes while the application downloads the Linux images for the microservices and installs the related assets. The `standard-demo-banking-bundle` and `standard-demo-customer-bundle` include microservices that require the initialization of containers and will take longer to install.

In the unlikely event you encounter conflicts during an initial installation, you will be presented with an Installation Plan like the one shown below. Select `Update All` in the upper right after making your selections.
   ![InstallPlan.png](./images/InstallPlan.png)


5. Access the Standard Banking Demo via one of the following options:

**Option 1** If you'd like to make the Standard Banking Demo your default home page, go to `App Builder → Pages → Settings`. In
   the dropdown for Home Page, select `Home / Home SD` and click `Save`.
   ![HomepageSelect.png](./images/HomepageSelect.png)

You can now navigate to your application's home page using the home icon in the upper right of the App Builder.


**Option 2** Alternatively, you can view the Standard Banking Demo home page by going to `Pages → Management`, finding `Home SD` in the page tree, and clicking `View Published Page` from its actions.

![Homepage.png](./images/Homepage.png)

:::warning 
(Entando 6.3.2) A cache issue impacting the first deployment of the `standard-demo-content-bundle` can prevent all widgets or MFEs from appearing on some pages, particularly the Dashboard page. 

To clear the cache, select `Administration` from the bottom of the left menu, then `Reload configuration`.

Alternatively, restarting the quickstart-server pod (which contains the Entando App Engine) will also clear the cache, and can be achieved with `ent k delete pod/<YOUR QUICKSTART-SERVER POD>`, e.g. `ent k delete pod/quickstart-server-deployment-5d785b997c-r4sc8`. It will take several minutes for the pod to redeploy after deletion. 
:::

## Application Details

The Entando Standard Banking Demo application demonstrates a number of the major features of the Entando platform, including:

* Keycloak integration for role based access controls
* Micro frontends implemented using React and Angular and co-existing on the same dashboard page
* Micro frontend communication techniques
* Microservices via Spring Boot
* Entando Content Management

### Micro Frontends (MFE)

The application includes six MFEs in which the above features complement one another to achieve custom functionality. These are described below.

#### 1. Card

![SeedCard.png](./images/SeedCard.png)

- The Card MFE is a React micro frontend that is visible on the My Dashboard page. The MFE makes an API call to the banking microservice to fetch a numeric result depending on the configured card type. The displayed value will change as the configuration is changed.
- The MFE is authorization-aware and will pass the bearer token to the microservice for authorization and authentication. If you render the dashboard page and you aren't authenticated, the widget displays an error message.
- This MFE emits events that are consumed by the Transaction Table widget.

#### 2. Card NG

![SeedCardNG.png](./images/SeedCardNG.png)

- The Card NG MFE is an Angular widget that is similar to the Card widget above, except for the choice of frontend technology.
- This MFE communicates with the Transaction Table widget, which is implemented in React.

#### 3. Manage Users



- The Manage Users MFE makes an API call to Keycloak to fetch user information. When the user is logged into the app, the MFE is visible from the dropdown under the username.
- By default, application users are not granted Keycloak authorization to manage users. This demonstrates role based access control for an MFE using Keycloak. To enable the Manage Users widget, login to Keycloak and assign the realm-management client's `view-users` and `manage-users` roles to the desired user.

Authorized View
![ManageUsersAuth.png](./images/ManageUsersAuth.png)

Not Authorized View
![ManageUsersNoAuth.png](./images/ManageUsersNoAuth.png)

#### 4. Transaction Table



- This MFE is a React micro frontend that consumes events from the Card MFEs detailed above.
- The Transaction Table widget makes an API call to the banking microservice to fetch transaction data for the user.

![TransactionTable.png](./images/TransactionTable.png)

#### 5. Sign Up


- The Sign Up MFE is a form widget that makes an API call to the customer microservice to create a new user. The Sign Up MFE is visible on the sign up page, and can be accessed from any page when a user is not authenticated.

  ![SignUp.png](./images/SignUp.png)

#### 6. Alert Icon



- The Alert Icon MFE displays an icon on the dashboard page. It includes a configuration MFE to allow the user to select the appropriate icon and datatype to display.
- In the default deployment, the Alert Icon MFE makes an API call to the banking microservice to fetch data.

![AlertIcons.png](./images/AlertIcons.png)

### Configuration Micro Frontends

When placed on a page, many of the MFEs detailed above include configuration screens visible in the App Builder at `Components → Micro frontends & Widgets`. To see the rendered config screen, place the MFE on a new page.

### Microservices

The application includes two microservices (service paths: `/banking` and `/customer`) to support the data visible in the MFEs detailed above. Both microservices demonstrate the automated deployment and linking of a microservice to an Entando Application via the Entando Operator.

The data for the microservices are created with Liquibase, demonstrating the use of the Operator and Liquibase + Spring Boot to automatically provision data into an environment. The demo data is available in the source code for the microservices on GitHub.

### Static Widgets

The application uses static HTML, FreeMarker, and JavaScript widgets to display content, e.g. headers, footers, images, etc. To view the static widgets, log into the App builder and select `Components → Micro frontends & Widgets`.

### Static CMS Content

The application makes extensive use of the Entando CMS. This includes the creation of content templates, content types, and content. If you want to learn more about the Entando CMS in the application, log into the App Builder and select `Content →  Templates`, `Content → Management`, or `Content → Types`.



## Source Code

The source code for the Entando Standard Banking Demo can be found on GitHub [here](https://github.com/entando-samples/standard-demo), along with our other open source examples and tutorials.
