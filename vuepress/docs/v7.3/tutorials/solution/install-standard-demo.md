---
sidebarDepth: 2
---

# Entando Standard Banking Demo

This tutorial guides you through installing a demo application using the Local Hub and a set of Entando
Bundles. The solution template includes: 

- Microservices
- Micro frontends
- Multiple pages
- CMS content

The goal of this exercise is to showcase how Entando Bundles can be used to: 

- Quickly install and create functionality in an Entando Application
- Enable packaged business capabilities (PBCs)
- Allow developers to reuse full-stack operations via bundles

Several key elements of this template are reviewed in the [Application Details section](#application-details) below.

## Installation

The Standard Banking Demo installs bundles containing multiple assets. Entando Bundles should contain the number and types of components necessary to satisfy business and developer objectives.

### Prerequisites

- A running instance of Entando. [Install Entando on any Kubernetes provider](../#operations) or see [Getting Started](../../docs/getting-started/) for more information. 
- The [Entando CLI](../../docs/getting-started/entando-cli.md), installed and connected to your Kubernetes cluster.

### Automatic Installation
Install the Standard Banking Demo by integrating the Entando Cloud Hub into your App Builder:

1. **Log in to your App Builder**

2. **Go to `Hub` → `Select Registry`**

3. **Choose `Entando Hub` if it has been configured. If not:**
     1. Choose `New Registry`
     2. In the pop-up window, enter: \
         Name: Entando Hub \
         URL: https://entando.com/entando-hub-api/appbuilder/api
     3. Click `Save` 
     4. In `Select Registry`, choose `Entando Hub` 

4. **From the Hub Catalog, `Deploy` and `Install` each of the four Standard Banking Demo bundles:**

   ::: warning
   **Order of installation is important.** The `standard-demo-content-bundle` must be installed last, as it relies on MFEs from the other bundles to set up each page. To uninstall the Banking demo, the `standard-demo-content-bundle` must be uninstalled first to resolve dependencies before other bundles can be be removed. 
   :::

     `standard-demo-banking-bundle` \
     `standard-demo-customer-bundle` \
     `standard-demo-manage-users-bundle` \
     `standard-demo-content-bundle` 

     1. Click on the bundle entry
     2. In the pop-up window, click "Deploy"
     3. In this same pop-up window, click "Install"
     >Note: It may take several minutes to download Linux images for the microservices and install related assets. Container initialization for `standard-demo-banking-bundle` and `standard-demo-customer-bundle` microservices are especially time-consuming.
     4. Exit out of the pop-up window
     5. Repeat steps 1-4 for each bundle

     ![sd-cloud-hub.png](./sd-images/sd-cloud-hub.png) 

     ::: tip
     These bundles will appear in your Local Hub with abbreviated names: 

     `standard-demo-banking-bundle` → `sd-banking` \
     `standard-demo-customer-bundle` → `sd-customer` \
     `standard-demo-manage-users-bundle` → `sd-manage-users` \
     `standard-demo-content-bundle` → `standard-demo` 

     ![sd-local-hub1.png](./sd-images/sd-local-hub1.png)
     :::

### Manual Installation
1. **Apply the definitions for the four bundles that comprise the Standard Banking Demo:**
   ```
   ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-banking-bundle.git"
   ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-customer-bundle.git"
   ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-manage-users-bundle.git"
   ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-content-bundle.git"
   ```

2. **Log in to your App Builder instance**

3. **Select `Hub` in the left menu to view the bundles deployed to your Local Hub**

4. **`Install` each bundle:**

   ::: warning
   **Order of installation is important.** The `standard-demo-content-bundle` must be installed last, as it relies on MFEs from the other bundles to set up each page. To uninstall the Banking demo, the `standard-demo-content-bundle` must be uninstalled first to resolve dependencies before other bundles can be be removed.
   :::

     1. Click on the bundle entry
     2. In the pop-up box, click "Install"
     >Note: It may take several minutes to download Linux images for the microservices and install related assets. Container initialization for `standard-demo-banking-bundle` and `standard-demo-customer-bundle` microservices are especially time-consuming.
     3. Exit out of the pop-up box
     4. Repeat steps 1-3 for each bundle

     ![sd-local-hub2.png](./sd-images/sd-local-hub2.png) 

     >Note: The Entando CLI deploys the Standard Banking Demo bundles to the Local Hub without thumbnails.

     ::: tip
     Conflicts during the initial installation will generate an Installation Plan like the one shown below. After making your selections, click `Update All` in the upper right.
     ![InstallPlan.png](./images/InstallPlan.png)
     :::

## Access the Standard Banking Demo

Access the Standard Banking Demo via one of the following options:

**Option 1: Make the Standard Banking Demo your default home page, then click on the home icon**
   1. Go to `App Builder` → `Pages` → `Settings` 
   2. In the drop-down menu for Home Page, select `Home / Home SD`
   3. Click `Save`
   ![HomepageSelect.png](./images/HomepageSelect.png)
   4. Click the home icon in the upper right of the App Builder


**Option 2: Navigate to the Standard Banking Demo home page from the App Builder page tree**
   1. Go to `App Builder` → `Pages` → `Management` 
   2. Find `Home SD` in the page tree
   3. From the `Actions` pull-down menu, go to `View Published Page`
   ![Standard Banking Demo Homepage](./images/Homepage.png)


## Application Details

The Entando Standard Banking Demo application demonstrates a number of the major features of the Entando Platform:

* Keycloak integration for role based access controls
* React and Angular micro frontends that coexist on the same dashboard
* Micro frontend communication techniques
* Spring Boot Microservices
* Entando Content Management

### Micro Frontends

The application includes six micro frontends (MFEs) showcasing complementary features and custom functionality. The key features of each are listed below.

#### 1. Card MFE

![SeedCard.png](./images/SeedCard.png)

- The Card MFE is a React micro frontend located on the My Dashboard page.
- It makes an API call to the banking microservice to fetch a numeric result dependent on the current card selection. The displayed value updates with changes to the card configuration.
- It is authorization-aware and passes the bearer token to the microservice. If an unauthenticated user renders the dashboard page, the widget displays an error message.
- This MFE emits events that are consumed by the Transaction Table widget.

#### 2. Card NG MFE

![SeedCardNG.png](./images/SeedCardNG.png)

- The Card NG MFE is an Angular widget that is similar to the Card widget above, except for the choice of frontend technology.
- It communicates with the Transaction Table widget, which is built with React.

#### 3. Manage Users MFE

- The Manage Users MFE makes an API call to Keycloak to fetch user information. 
- It is visible from the username drop-down menu when the user is logged in to the app.
- By default, application users are not granted Keycloak user management privileges. 
   - To use Keycloak to apply role based access controls to an MFE:
      1. Enable the Manage Users widget.
      2. Log in to Keycloak and assign the realm-management `view-users` and `manage-users` client roles to the desired user. 
   - See the [Entando Identity Management System](../../docs/consume/identity-management.md) page for details.

Authorized View
![ManageUsersAuth.png](./images/ManageUsersAuth.png)

Unauthorized View
![ManageUsersNoAuth.png](./images/ManageUsersNoAuth.png)

#### 4. Transaction Table MFE

- The Transaction Table MFE is a React micro frontend that consumes events from the Card MFEs.
- It makes an API call to the banking microservice to fetch transaction data.

![TransactionTable.png](./images/TransactionTable.png)

#### 5. Sign Up MFE

- The Sign Up MFE is a form widget located on the sign up page.
- It makes an API call to the customer microservice to create a new user.
- Unauthenticated users can access this widget from any page.

![SignUp.png](./images/SignUp.png)

#### 6. Alert Icon MFE

- The Alert Icon MFE displays an icon on the dashboard page. 
- It includes a configuration MFE for the user to select the icon's appearance and datatype.
- By default, it makes an API call to the banking microservice to fetch data.

![AlertIcons.png](./images/AlertIcons.png)

### Configuration Micro Frontends

When placed on a page, many of the Standard Banking Demo MFEs include configuration screens. These are visible in the App Builder at `Components` → `Micro frontends & Widgets`. To view a rendered configuration screen, place the MFE on a new page.

### Microservices

Two microservices (service paths: `/banking` and `/customer`) generate the data displayed by the Standard Banking Demo MFEs. Both implementations leverage the Entando Operator to automate the deployment and linking of a microservice to an Entando Application.

The data for the microservices demonstrate how to use the Entando Operator, Liquibase, and Spring Boot to automatically provision data. The demo data is available in the microservice [source code](https://github.com/entando-samples/standard-demo).

### Static Widgets

The Standard Banking Demo uses static HTML, FreeMarker, and JavaScript widgets to display content, e.g. headers, footers, and images. To view the static widgets, log in to the App Builder and select `Components` → `Micro frontends & Widgets`.

### Static CMS Content

The Standard Banking Demo relies on the Entando CMS to create content templates, content types, content, etc. To learn more about the Entando CMS, log in to the App Builder and go to `Content` →  `Templates`, `Content` → `Management`, or `Content` → `Types`.

## Source Code

The source code for the Entando Standard Banking Demo can be found on GitHub [here](https://github.com/entando-samples/standard-demo) along with our other open source examples and tutorials.
