---
sidebarDepth: 2
---

# Entando Hub Features and Definitions
## Overview
The Entando Hub is the central catalog where components are published, organized and shared. When building composable applications, building blocks called bundles or bundle groups are chosen from this catalog and placed onto a page. The Hub UI provides publishing and versioning capabilites for these reusable components and the following describes the details of how this process works.

**Entando Hub Features:**

- Centralize components and packaged business capabilities (PBCs) for use across teams, projects, or clients
- Publish and manage components, and communicate component features, versions and metadata
- Perform business-level assessments of component readiness

The Entando Platform provides three variations of the catalog. They are all directly accessible from the App Builder to make it easy to find and select the components to build your applications. 

* The **Local Hub**, included in the Entando App Builder, displays a collection of ready-to-use components. They can be used to compose an application or as a starting point to create your own.	

* **Entando Marketplace** is the public catalog presenting the packaged business capabilities and components developed by Entando and its partners throughout the world.

* The **Enterprise Entando Hub** can be added to your Entando instance for your organization to share components, privately within teams, with clients, or with the public. 

The remainder of this document explores the parameters of the Enterprise Hub, and to see how it is installed, here is the [Installation and User Guide](../../tutorials/solution/entando-hub.md).

## Bundle Group Definitions
The key entities in a Hub are as follows:

- `Bundle`: An Entando Bundle is the basic deployment unit within an Entando Application. A bundle can contain one or more component such as micro frontends, microservices, or any of the [component types](../../docs/curate/bundle-component-details.md) allowed on Entando.
- `Bundle Group`: A bundle group is a Hub entry, a single unit containing one or more Entando Bundle. 
- `Bundle Group Version`: A bundle group can have one or more versions, each with a particular status.
- `Category`: Each bundle group belongs to a specific category. The default categories are solution template, packaged business capability (PBC), and component collection. Additional categories can be customized for any Enterprise Hub.
- `Organization`: Bundle groups belong to a single organization. Authors and managers can only update entries within their own organization. A single instance of the Hub can have multiple organizations.
- `User`: User identity is managed within Keycloak, where users are granted roles within a Hub instance. Users must be created in Keycloak, then added in the Hub and assigned to a specific organization.

> A private repository can be the source of a bundle, but this requires [an additional Kubernetes Secret](../../tutorials/curate/private-git-repo.md) before deployment in the App Builder.

## Roles

Three roles are available for the Enterprise Hub UI to manage its catalog. All roles are tied to an organization and are defined as follows:

- `eh-author`: An author can create and edit bundle groups and submit them for publication. They can also generate an API key for private Hubs.
- `eh-manager`: A manager has all the capabilities of an author, but also has the job of approving bundle groups for publication.
- `eh-admin`: An admin has full access to create, update, approve, and delete bundle groups, and manage users for the entire Hub instance. An admin can create categories, organizations and private catalogs, assign users to organizations, and generate API keys for private catalogs. 
- `guest`: Any user without one of the preceding roles is considered a guest in the Enterprise Hub and is given a read-only view of a public catalog. This is also true for unauthenticated users.
To assign roles to a new Hub user, see the [Entando Hub Installation and User Guide](../../tutorials/solution/entando-hub.md#using-the-enterprise-hub)

## Bundle Group Versions
Available bundle group versions can be viewed or edited from the kebab-dropdown menu of an entry as seen here:

![hub-actions.png](./img/hub-actions.png)

The following versioning rules apply to bundle groups:
- Once the first version of a group is published, the organization, name, and category can no longer be changed.
- A new version of a bundle group can be created only after the first version has been published. 
- There can be at most two active versions: one draft or publication requested version, and one published version. 
- When a new version is published, the previous version is set to `Archived`. 
- Archived versions are only visible in the versions view and are not shown elsewhere in the user interface.

![hub-versions.png](./img/hub-versions.png)

## Bundle Group Status

The possible statuses for each version of a bundle group are as follows:

- `Draft`: This is the default status for a newly created bundle group. 
- `Publication Request`: An `eh-author` sets a version to this status to request the `eh-manager` or `eh-admin` to review and approve it for publication. The manager or admin may edit versions with this status.
- `Published`: Versions with this status are visible in the Hub's catalog of available bundle groups, and are also available in the App Builder-facing API. An `eh-manager` or `eh-admin` may edit published versions.
- `Archived`: Previously published versions are assigned this status. No edits can be made to an archived version.
- `Deletion Request`: An `eh-manager` or `eh-admin` can delete versions once a group has been assigned this status.

Notes:
- An `eh-author` can change any field except organization while a version is in `Draft` status.
- There is no automated notification process when a publication request is made for a bundle group version.

## Entando Hub Application Details

An Enterprise Entando Hub includes the following key components:

#### Micro Frontends / Widgets
- `Entando Hub App`: This is the main micro frontend which contains the management UI for the catalog noted above.
- `Entando Hub Login`: This is an optional login component which can be used in a page’s top navigation.

#### Microservices
A single Spring Boot microservice provides two REST endpoints:
- The first is a backend-for-a-frontend (BFF) service for the Hub UI and contains various entity APIs.
- The second provides methods that support the Entando App Builder integration (7.0+).

#### Content
The content bundle (`entando-hub`) includes a custom template and a page preconfigured with the main Hub micro frontends.

## Next Steps
Install an [enterprise Entando Hub](../../tutorials/solution/entando-hub.md).