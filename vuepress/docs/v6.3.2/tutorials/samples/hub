---
sidebarDepth: 2
---

# Entando Hub

## Overview

The Entando Hub enables a team to share components across Entando Applications. It can be installed in Entando 6.3.2 or higher and includes API-level integration with the Entando 7.0 App Builder.

Currently, the Hub catalog allows users to:

- Centralize components and business capabilities for use across teams, groups, clients
- Publish, manage and share component content, versioning and metadata
- Perform business-level assessment of component readiness 

In the future, users will be able to:

- Add automatic quality and security gates before catalog entries are published
- Monetize use of components

To guide you through the setup and benefits of the Hub, this tutorial covers:

1. Installation
2. Configuration
3. Using the Hub
4. Application Details
5. Resources
## Installation

The Hub is installed using the Entando Component Repository (ECR) and two Entando Bundles.

### Prerequisites

- An Entando Application on any Kubernetes provider. Follow one of the [tutorials](../#operations) appropriate to your environment to install the Entando platform.
- The ent command line tool, installed and connected to your Kubernetes instance.

### Installation Steps

1. Apply the definitions for the bundle that assembles the Hub components. You'll need to adjust the `-n entando` option in each command to match your namespace or project.
```
ent bundler from-git -r https://github.com/entando-samples/entando-hub-application-bundle.git -d | ent kubectl apply -n entando -f -
```
```
ent bundler from-git -r https://github.com/entando-samples/entando-hub-content-bundle.git -d | ent kubectl apply -n entando -f -
```

2. Log into your App Builder instance.

3. Select `Repository` from the menu on the left. Your bundles will be visible in the repository as shown in the screenshot below.

4. Select `Install` for each bundle, where order of installation is important. The `entando-hub-content-bundle` will need to be installed last, as it relies on MFEs from the `entando-hub-application-bundle` to set up each of the pages. An installation can take several minutes while the application downloads the Linux images for the microservices and installs the related assets.

:::warning
(Entando 6.3.2) There is a cache issue when deploying the PDA plugin bundle which means not all widgets or MFEs initially appear on some pages, particularly the Dashboard page. Restarting the quickstart-server pod (which holds the Entando App Engine) will clear the cache. This is only necessary on the initial install.
:::

5. The Hub can be accessed from the App Builder by navigating to `Pages → Management`, finding `xxxx` in the page tree, and clicking `View Published Page` from its actions.

## Configuration

TODO

:::Tip
(New with Entando 7.0.0) You can also point the Entando App Builder in another Entando Application to any Hub instance by configuring the App Builder with the URL for the Hub API - <YOUR-BASE-URL>/entando-hub-api/appbuilder/api.  For example, the public Entando Hub has this API: http://hubdev.okd-entando.org/entando-hub-api/appbuilder/api. 
:::

## Using the Hub

### Roles

There are currently three roles available to the Hub:

- `eh-author`
- `eh-manager`
- `eh-admin`

The definitions of these roles are as follows:

- `eh-author`: The role assigned to an Entando Hub author. An author is provided with restricted permissions to edit the fields of new or subsequent Hub bundle versions.

- `eh-manager`: The role assigned to an Entando Hub manager. A manager is provided with limited permissions to edit the fields of new or subsequent Hub bundle versions.

- `eh-admin`: The role assigned to an Entando Hub admin. With several exceptions, an admin is provided with full permissions to edit the fields of new or subsequent Hub bundle versions.

### Hub Versions

Actions to create, view, edit and delete a Hub bundle version are detailed below.

#### Create a New Version

Before it is published, a new bundle version is in "Draft" status. Only one "Draft" version can exist at a time. Once the version is published a new draft can be created.

At any given time, only one version of the Hub bundle can be in "Published" status. When a new version is published, the previous version is set to "Archived." 

To create a new version of the Hub bundle:

1. Login to the Entando Hub.
2. Click on the actions for the Hub bundle. The "New Version" option will be visible if the bundle is in "Published" status.
3. Click on "New Version" to generate the pop up window of editable version details. Note that an `eh-author` is only able to create a new bundle version for their own organization.
4. Edit the prefilled values of the existing bundle. Note that the unique version identifier must follow the format of vx.x.x or x.x.x. The user may not edit `Name`, `Category`, or `Organization`.
5. Click "Submit" to create a new version of the bundle.

#### View Versions

To view all versions of the Hub bundle click on its actions. All available versions, including those in "Archived" status, will be shown in descending chronological order.

With the exception of archived bundles, all bundle versions are also displayed on the home page.

#### Edit Versions

When creating a bundle group for the first time, a user may edit the `Name` and `Category` fields. `Organization` may not be edited by an `eh-author` or `eh-manager`. An `eh-admin` may edit the `Organization` field while the bundle is in "Draft" or "Publication Request" status.

An admin or manager may edit a bundle version in "Published," "Publication Request" or "Deletion Request" status. All user roles may edit a bundle group in "Draft" status. Note that starting with the second version of the Hub bundle, the following fields may not be edited by any user role:

- `Name`
- `Category`
- `Organization`

#### Delete Versions

An `eh-author` is not permitted to delete a bundle version. Both an `eh-admin` and `eh-manager` are able to delete a bundle version in "Deletion Request" status. 


## Application Details

### Development

The frontend code only can be run locally by changing certain settings as described in this [README](https://github.com/entando-samples/entando-hub/tree/main/application/ui/widgets/eh-widgets-dir/eh-widgets).

Running the full stack locally requires Docker. This allows the developer to locally run the frontend, backend and Keycloak. The Keycloak realm configuration includes four roles:

- `eh-admin`: administrator
- `eh-manager`: manager
- `eh-author`: author
- `user`: regular user

Alternatively, the microservice can be run locally in a Docker container. In this mode, environment variables must be provided to enable Keycloak integration.

Settings and instructions to run the full stack or microservice locally can be found in the Hub application [README](https://github.com/entando-samples/entando-hub/tree/main/application).

## Resources

### Source Code

The source code for the Entando Hub can be found on GitHub, along with our other open source examples and tutorials. Reference the component projects for instructions to build from source code:

- <https://github.com/entando-samples/entando-hub>