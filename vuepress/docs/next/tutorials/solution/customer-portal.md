---
sidebarDepth: 2
---

# Entando Customer Portal 
## Overview
The Entando Customer Portal enables an organization to quickly provide a modern, self-service customer-facing application for managing subscriptions. It includes a lightweight integration to Jira Service Management for access to service tickets and a role based access control (RBAC) design for granting users varying levels of access.

Key Features:

* Customizable service ticket tracking system with Jira Service Management
* Role based access control with Entando Identity Management System
* Integrated user, customer, project, and subscription management 

This tutorial covers: 
1. [Installation](#installation)
2. [Configuration](#configuration)
4. [Managing the Customer Portal](#managing-the-customer-portal)
5. [Using the Customer Portal](#using-the-customer-portal)
6. [Resources](#resources)

## Installation
### Prerequisites
* A working instance of Entando running on Kubernetes. See [Getting Started](../../docs/getting-started/) for more information or [install Entando on any Kubernetes provider](../#operations). 
* Use the [Entando CLI](../../docs/getting-started/entando-cli.md) command `ent check-env develop` to verify all dependencies.
* A Jira Service Management account.
* A [Keycloak server](https://www.keycloak.org/docs/15.0/server_admin/#_email) configured with the SMTP server settings to enable email verification for users. 

### Automatic Install via the Entando Hub
Install the Customer Portal in two steps by integrating the Entando Hub into your App Builder. 
1. Log into your `App Builder` → `Hub` → `Select Registry` → choose `Entando Hub` if it has been configured. 
     1. If not, choose `New Registry`
     2. In the pop-up window, enter `Entando Hub` and `https://entando.com/entando-hub-api/appbuilder/api` for the URL, then `Save`
     3. Click on the Hub in the Registry 

2. From the Hub Catalog, `Deploy` and `Install` the Customer Portal application first, then the content bundle.

3. Set up permissions to configure the service:
   - [Login to your Keycloak instance](../../docs/consume/identity-management.md#logging-into-your-keycloak-instance) as an admin.
   - Give at least one user the ability to manage the Customer Portal by granting the `cp-admin` role. Assign the `cp-admin` role for the `pn-a71d68dd-166dc0f4-entandodemo-customerportal-server` client. See [Role Assignment in ID Management](../../docs/consume/identity-management.md#authorization) for more details.
   - Give the generated plugin client permission to manage users. 
       1. From the left sidebar, go to `Clients` and select client ID `pn-a71d68dd-166dc0f4-entandodemo-customerportal-server`. 
       2. Click the `Service Account` tab at the top of the page and select `realm-management` from the `Client Roles` field. 
       3. Choose `realm-admin` from `Available Roles`. Click `Add selected`. It should appear as an `Assigned Role`.

4. To navigate to your CP: 
   * From the sidebar →  `Page` → `Management` 
   * Find the `Customer Portal` folder
   * From the `Actions` pull-down menu →  `View Published Page`

![Customer Portal Landing Page](./images/cp-public-landing-page.png)

### Manual Install 
1. To install the Customer Portal manually, run the following commands.

``` bash
ent ecr deploy --repo="https://github.com/entando-samples/customerportal-application-bundle.git"
```

``` bash
ent ecr deploy --repo="https://github.com/entando-samples/customerportal-content-bundle.git"
```
2. Log into the App Builder. 

3. Go to the `Hub` from the left sidebar. Two Customer Portal bundles will be visible there. `Install` the `customerportal-application-bundle` first, then the `customerportal-content-bundle`.

4. To navigate to your CP: 
   * From the sidebar → `Page` → `Management` 
   * Find the `Customer Portal` folder
   * From the `Actions` pull-down menu → `View Published Page`

## Configuration
### Administrators
In order to configure the Customer Portal and its users, the administrator will need Jira Service Management and Entando Identity Management System credentials. In this step, the admin connects the CP to Jira and customizes its features. 

::: tip Note:
* The built-in mapper for email must be enabled on the server client so that user accounts can be retrieved from Jira and new tickets can use that account information.
::: 

### Jira Service Management 

The administrator utilizes Jira Service Management to create users and projects, define the organization, and configure the service ticket system.

Users who need access to the Customer Portal, beyond subscription and project information, must have a Jira Service Management account. 

1. Go to Customers to add organizations and projects. Once added, click on the name of the organization to get the ID, needed later, from the URL. \
 e.g. example.com/jira/servicedesk/projects/ECS/organization/3 → the Organization ID is “3”

### Configure the Customer Portal 

The Customer Portal must be configured to accommodate a specific Jira Service Management instance. The `CP Admin Config` page is where you will establish the Jira connection, manage product versions, define subscription levels, and customize ticket types.

To access the `CP Admin Config` page, you must be given the `cp-admin` role in the [Entando Identity Management System](#entando-identity-management-system) as outlined below. 

Go to the `CP Admin Config` page:
1. In the App Builder, go to `Pages` and select `Management`.
2. Open the Customer Portal folder and find `CP Admin Config`. 
3. From the `Action` drop-down menu on the right, go to `View Published Page`.

![Customer Portal Admin Config page](./images/cp-admin.png)
Once the Ticketing System Connection is set up with Jira and the correct URL, default parameters such as product versions and ticket types will be displayed. Open each section with the down arrow to add and edit the fields as needed. Note that the password for the Ticketing System Connection must be an [API token generated by Jira](https://id.atlassian.com/manage-profile/security/api-tokens) by the CP administrator. For more information, go to [Manange API tokens at Atlassian Support](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

### Entando Identity Management System 
Logging into the Entando Identity Management System, you will see the landing page shown here. Like the App Builder, the left navigation bar is your guide for managing users, groups, and most importantly, roles. Using the RBAC model, define what access users have by the roles and groups they are assigned. Some important guidelines are noted below. 

![Entando Identity Management System](./images/cp-idmanagement-main.png)

* **Define the Realm Setting**. \
The `Realm` is a set of users, credentials, roles, and groups. A user belongs to and logs into a `Realm`. 

* **Create Roles**\
You can use the default roles by clicking on `Client Roles` and choosing `entandodemo-customerportal-server`. Access for each role is defined as follows:
    * `cp-customer` -  assigned directly to specific projects for a single customer
    * `cp-partner` - assigned directly to specific projects for multiple customers
    * `cp-support` -  read only view of all customer projects
    * `cp-admin` - admin access for the Customer Portal

* **Create New Users**: 
 1. From the sidebar, go to `Users`. Click `Add User` at right.
 2. Complete the form as needed but note the requirements for these fields:\
  `Username`: a unique name\
  `Email`: must use the same address used in Jira\
  `User Enabled` → On\
  `Save`

 3. Send an email to the user to activate their account and set a new password: \
   Go to the `Credentials` header \
   Under `Credential Reset`, in the `Reset Actions` → `Update Password`  \
   Click `Send Email` 

 4. Go to Role Mapping: 
    * Select the appropriate roles from `Available Roles` and click `Add Selected` to assign. 
    * Choose `entandodemo-customerportal-server` from the `Client Roles` pull-down options to assign default roles. 
    * A full administrative user will need the `realm-admin` role under `Client Roles` → `realm-management` in order to manage users in the Portal. 
    * Check the `Effective Roles` column on the right to ensure the correct roles have been assigned.

![Entando ID Management Role Mapping](./images/cp-identity-userrole.png)

 5. Under `Groups`, assign roles to groups as needed. Roles are additive.

## Managing the Customer Portal

As administrator for the Customer Portal, you can create and manage users, customers, projects, and subscriptions. You can assign projects to users who have activated their account on Jira and have been assigned roles in the Entando Identity Management System. 

![Customer Portal Landing Page](./images/cp-landing-page.png)

* **Create a Customer or Partner**\
Creating a `Customer` and `Partner` is a similar process. Below are the steps for adding a `Customer`. Follow the same procedure for adding a `Partner`.
1. Click `Add a Customer`
2. Fill in the details. Note the following:
     * The `Customer Number` must be unique 
     * The `Notes` field is visible only to `support` and `admin` users 

 ![Customer Portal Add Customer](./images/cp-add-customer.png)   

* **Create and Assign Projects**
1. From the CP landing page, click on any customer to see the associated project list.
2. To create a new project: 
   * Click `Add a Project`.
   * Enter the `Project` information.
   * Provide the Organization ID from Jira. Each project must have a unique Organization ID.
   * Click `Save`.
3. To assign `Projects`:
	 * From the `Action` drop-down menu →  `Manage Users`.
    * Select the user for the `Project`. 
    * Click `Submit`.
    
* **Manage Partners and Subscriptions** \
Use the `Action` drop-down menu to manage Partners, and request and manage subscriptions. 

## Using the Customer Portal

To access the Customer Portal, your organization administrator needs to provide you with the proper user credentials. You can then create and track service tickets as well as request subscriptions.

Once you login to the Customer Portal, you will see a list of customers. Click on a customer to view details and track their projects.

1. To create a `Service Ticket` for a project: \
from the `Action` pull-down menu → `Open Ticket`.

![Customer Portal Open Ticket](./images/cp-open-ticket.png)

2. To request a Subscription or track Tickets: \
use the `Action` pull-down menu and select the corresponding option.

## Resources
* Go to [Jira Service Management](https://www.atlassian.com/software/jira/service-management) for more information.
 

* The **source code** for the Entando Customer Portal can be found with our other open source examples and tutorials on GitHub at: [https://github.com/entando-samples/customer-portal/](https://github.com/entando-samples/customer-portal/)


