(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{1257:function(e,t,a){e.exports=a.p+"assets/img/install-bundles.55776493.png"},1258:function(e,t,a){e.exports=a.p+"assets/img/hub-ui.08fadaef.png"},1259:function(e,t,a){e.exports=a.p+"assets/img/hub-add.0012e6dc.png"},1260:function(e,t,a){e.exports=a.p+"assets/img/hub-actions.682c93ee.png"},1261:function(e,t,a){e.exports=a.p+"assets/img/hub-versions.b9ec23b1.png"},2170:function(e,t,a){"use strict";a.r(t);var n=a(36),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"entando-hub"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#entando-hub"}},[e._v("#")]),e._v(" Entando Hub")]),e._v(" "),n("p",[e._v("An Entando Hub enables teams to share components across their organization and between Entando Applications. It can be installed in any Entando 7+ instance and includes API-level integration with the App Builder.")]),e._v(" "),n("p",[e._v("Hub Features:")]),e._v(" "),n("ul",[n("li",[e._v("Centralize components and business capabilities for use across teams, groups, or clients")]),e._v(" "),n("li",[e._v("Publish, manage and communicate component features, versions and metadata")]),e._v(" "),n("li",[e._v("Perform business-level assessment of component readiness")])]),e._v(" "),n("p",[e._v("An Entando Application can make use of an Entando Hub in several ways:")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("The "),n("strong",[e._v("Local Hub")]),e._v(", included in the Entando App Builder, displays a collection of components ready to use. They can be used to compose an application or as a starting point to create new components.")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Entando Cloud Hub")]),e._v(" is the public catalog containing packaged business capabilities and components provided by Entando and its partners throughout the world.")])]),e._v(" "),n("li",[n("p",[e._v("An "),n("strong",[e._v("enterprise Entando Hub")]),e._v(", developed and curated by Entando clients and partners, can be used to share components within their respective organizations or made available for public use.")])])]),e._v(" "),n("p",[e._v("This tutorial details the steps to create and utilize an enterprise Hub, including:")]),e._v(" "),n("ol",[n("li",[n("a",{attrs:{href:"#installation"}},[e._v("Installation")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#configuration"}},[e._v("Configuration")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#using-an-enterprise-hub"}},[e._v("Using an Enterprise Hub")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#hub-concepts-and-definitions"}},[e._v("Hub Concepts and Definitions")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#application-details"}},[e._v("Application Details")])]),e._v(" "),n("li",[n("a",{attrs:{href:"#resources"}},[e._v("Resources")])])]),e._v(" "),n("h2",{attrs:{id:"installation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),n("p",[e._v("An enterprise Entando Hub is installed using the Local Hub and two Entando Bundles. One bundle contains the micro frontends and microservices while the other sets up the initial content and pages for the hub UI.")]),e._v(" "),n("h3",{attrs:{id:"prerequisites"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),n("ul",[n("li",[e._v("An Entando Application on any Kubernetes provider. Follow the "),n("RouterLink",{attrs:{to:"/v7.2/tutorials/#operations"}},[e._v("tutorials")]),e._v(" appropriate to your environment to install the Entando Platform.")],1),e._v(" "),n("li",[e._v("The "),n("RouterLink",{attrs:{to:"/v7.2/docs/getting-started/entando-cli.html"}},[e._v("ent command line tool")]),e._v(", installed and connected to your Kubernetes instance.")],1)]),e._v(" "),n("h3",{attrs:{id:"automatically-access-the-entando-cloud-hub-from-the-app-builder"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#automatically-access-the-entando-cloud-hub-from-the-app-builder"}},[e._v("#")]),e._v(" Automatically Access the Entando Cloud Hub from the App Builder")]),e._v(" "),n("ol",[n("li",[e._v("Log in to your App Builder")]),e._v(" "),n("li",[e._v("Go to "),n("code",[e._v("Hub")]),e._v(" → "),n("code",[e._v("Select Registry")])]),e._v(" "),n("li",[e._v("Choose "),n("code",[e._v("New Registry")])]),e._v(" "),n("li",[e._v("In the pop-up window, enter "),n("code",[e._v("Entando Cloud Hub")]),e._v(" and "),n("code",[e._v("https://entando.com/entando-hub-api/appbuilder/api")]),e._v(" for the URL, then click "),n("code",[e._v("Save")])]),e._v(" "),n("li",[e._v("Click on the Cloud Hub in the Registry and continue with the tutorial at Step 4 below")])]),e._v(" "),n("h3",{attrs:{id:"manual-installation-steps"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#manual-installation-steps"}},[e._v("#")]),e._v(" Manual Installation Steps")]),e._v(" "),n("ol",[n("li",[e._v("Apply the custom resource definitions for the Hub component bundles:")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("ent ecr deploy --repo=docker://registry.hub.docker.com/entando/entando-hub-application\n")])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("ent ecr deploy --repo=docker://registry.hub.docker.com/entando/entando-hub-content\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[e._v("Log into your App Builder instance.")])]),e._v(" "),n("li",[n("p",[e._v("Select "),n("code",[e._v("Hub")]),e._v(" from the menu on the left. Your bundles will be visible in the Local Hub as shown in the screenshot below.")])])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1257),alt:"install-bundles.png"}})]),e._v(" "),n("ol",{attrs:{start:"4"}},[n("li",[e._v("Click each bundle icon and "),n("code",[e._v("Install")]),e._v(" the bundle, where order of installation is important. The "),n("code",[e._v("entando-hub-application-bundle")]),e._v(" must be installed first because it provides the "),n("code",[e._v("entando-hub-content-bundle")]),e._v(" with MFEs. It may take several minutes to download the Docker images for the microservices and install the related assets.")])]),e._v(" "),n("h2",{attrs:{id:"configuration"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),n("ol",[n("li",[n("p",[e._v("Set up permissions to configure the service for the Hub administrator:")]),e._v(" "),n("ul",[n("li",[n("RouterLink",{attrs:{to:"/v7.2/docs/consume/identity-management.html#logging-into-your-keycloak-instance"}},[e._v("Log in to your Keycloak instance")]),e._v(" as an admin.")],1),e._v(" "),n("li",[e._v("Give at least one user the ability to manage the hub by granting the "),n("code",[e._v("eh-admin")]),e._v(" role. Assign the "),n("code",[e._v("eh-admin")]),e._v(" role for the "),n("code",[e._v("pn-152edaba-0a2ba8fb-entando-entando-hub-catalog-ms-server")]),e._v(" client. See "),n("RouterLink",{attrs:{to:"/v7.2/docs/consume/identity-management.html#authorization"}},[e._v("Role Assignment in ID Management")]),e._v(" for more details.")],1),e._v(" "),n("li",[e._v("Give the generated plugin client permission to manage users.\n"),n("ol",[n("li",[e._v("From the left sidebar, go to "),n("code",[e._v("Clients")]),e._v(" and select client ID "),n("code",[e._v("pn-152edaba-0a2ba8fb-entando-entando-hub-catalog-ms-server")]),e._v(".")]),e._v(" "),n("li",[e._v("Click the "),n("code",[e._v("Service Account Roles")]),e._v(" tab at the top of the page and select "),n("code",[e._v("realm-management")]),e._v(" from the "),n("code",[e._v("Client Roles")]),e._v(" field.")]),e._v(" "),n("li",[e._v("Choose "),n("code",[e._v("realm-admin")]),e._v(" from "),n("code",[e._v("Available Roles")]),e._v(" and click "),n("code",[e._v("Add selected")]),e._v(". It should now appear as an "),n("code",[e._v("Assigned Role")]),e._v(".")])])])])]),e._v(" "),n("li",[n("p",[e._v("Access your enterprise hub from the App Builder by navigating to "),n("code",[e._v("Pages → Management")]),e._v(". Find "),n("code",[e._v("Entando Hub")]),e._v(" in the page tree, and click "),n("code",[e._v("View Published Page")]),e._v(" from its Actions.")])])]),e._v(" "),n("h2",{attrs:{id:"using-an-enterprise-hub"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#using-an-enterprise-hub"}},[e._v("#")]),e._v(" Using an Enterprise Hub")]),e._v(" "),n("h3",{attrs:{id:"the-hub-ui"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#the-hub-ui"}},[e._v("#")]),e._v(" The Hub UI")]),e._v(" "),n("p",[e._v("The enterprise Entando Hub is equipped with a user interface where users, entries, and catalogs are managed. Private and public catalogs can also be configured here.")]),e._v(" "),n("ul",[n("li",[e._v("Administrator can create and manage users, categories, and organizations.")]),e._v(" "),n("li",[e._v("Authors and managers have varying "),n("a",{attrs:{href:"#roles"}},[e._v("levels of access")]),e._v(" to create and manage entries, otherwise called bundle groups.")]),e._v(" "),n("li",[e._v("Each catalog can be "),n("a",{attrs:{href:"#add-a-catalog-as-a-registry-in-your-app-builder"}},[e._v("connected directly to an App Builder")]),e._v(" instance for easy access.")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1258),alt:"Hub UI"}})]),e._v(" "),n("h3",{attrs:{id:"user-management"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#user-management"}},[e._v("#")]),e._v(" User Management")]),e._v(" "),n("p",[e._v("Only a Hub administrator has the authorization to create and manage users.")]),e._v(" "),n("ol",[n("li",[e._v("Log into your Keycloak admin console")]),e._v(" "),n("li",[e._v("Go to the "),n("code",[e._v("Users")]),e._v(" section from the left navigation bar and add a new user. Enter the relevant identity information.")]),e._v(" "),n("li",[e._v("Once saved, go to the "),n("code",[e._v("Role Mapping")]),e._v(" tab and assign the correct role under "),n("code",[e._v("Client Role")]),e._v(" "),n("code",[e._v("pn-152edaba-0a2ba8fb-entando-entando-hub-catalog-ms-server")]),e._v(" "),n("ul",[n("li",[e._v("for an author, assign "),n("code",[e._v("eh-author")])]),e._v(" "),n("li",[e._v("for a manager, assign "),n("code",[e._v("eh-manager")])])])]),e._v(" "),n("li",[e._v("Log in to the Hub UI as an admin")]),e._v(" "),n("li",[e._v("Go to "),n("code",[e._v("User Management")]),e._v(" and click "),n("code",[e._v("Add User")])]),e._v(" "),n("li",[e._v("Choose the desired user and select an organization from the drop-down list. If the organization is not available, go to Organization Management to add it.")]),e._v(" "),n("li",[e._v("Note that an admin user needs to belong to an organization as well, especially for private catalogs that require an API key.")])]),e._v(" "),n("h3",{attrs:{id:"create-new-entries-bundle-groups"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-new-entries-bundle-groups"}},[e._v("#")]),e._v(" Create New Entries/Bundle Groups")]),e._v(" "),n("p",[e._v("Click the "),n("code",[e._v("Add +")]),e._v(" button at the top of the Hub UI home page to create a new bundle group. In the pop-up window, enter the details for the entry.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(1259),alt:"hub-add.png"}})]),e._v(" "),n("ol",[n("li",[e._v("Upload a file of the thumbnail for the bundle group.")]),e._v(" "),n("li",[e._v("Add one or more bundles for the entry using the "),n("code",[e._v("Add +")]),e._v(" button next to the "),n("code",[e._v("Add Bundle URI")]),e._v(" field.")]),e._v(" "),n("li",[e._v("Check "),n("code",[e._v("Display Contact Us button")]),e._v(" and enter the URL under "),n("code",[e._v("Contact URL")]),e._v(" to gather more information from the viewer/visitor and manage access to the entry. Typically, the contact URL points to a web form on the owner's web site with a request for access to the entry.")])]),e._v(" "),n("h3",{attrs:{id:"create-a-private-catalog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-a-private-catalog"}},[e._v("#")]),e._v(" Create a Private Catalog")]),e._v(" "),n("p",[e._v("A private catalog can be configured in the Hub UI when creating a new organization. There can be many organizations in a single Hub instance, but each organization is allowed one private catalog. Only the Hub admin can create an organization and provide a private catalog for it.")]),e._v(" "),n("ol",[n("li",[e._v("Go to Organization Management from the top menu")]),e._v(" "),n("li",[e._v("Click "),n("code",[e._v("Add Organization +")]),e._v(", enter the relevant information in the pop-up window, and click "),n("code",[e._v("Save")])]),e._v(" "),n("li",[e._v("The new organization will appear in the current list. Click on the kebab menu to the right of the organization and select "),n("code",[e._v("Create Private Catalog")]),e._v(".\nA key icon will appear next to the private catalog. To go directly to this catalog, there is a link under the same kebab menu.")])]),e._v(" "),n("h3",{attrs:{id:"generate-an-api-key"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#generate-an-api-key"}},[e._v("#")]),e._v(" Generate an API Key")]),e._v(" "),n("p",[e._v("API access to private catalogs requires the use of an API key instead of user credentials. When connecting a registry from the App Builder, the API key is required to configure a private catalog.")]),e._v(" "),n("ol",[n("li",[e._v("API Keys are attached to a specific user account so login as a user assigned to the organization of the private catalog.")]),e._v(" "),n("li",[e._v("From the Hub UI homepage, click on the gear icon right of the "),n("code",[e._v("Add +")]),e._v(" button and select "),n("code",[e._v("API Key Management")]),e._v(".")]),e._v(" "),n("li",[e._v("Click "),n("code",[e._v("Generate API Key")]),e._v(", enter a name, and confirm with the blue generate button. Save the key for future reference.")])]),e._v(" "),n("h3",{attrs:{id:"add-a-catalog-as-a-registry-in-your-app-builder"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#add-a-catalog-as-a-registry-in-your-app-builder"}},[e._v("#")]),e._v(" Add a Catalog as a Registry in your App Builder")]),e._v(" "),n("p",[e._v("Any enterprise Hub instance can be accessed from the Entando App Builder of another Entando Application.")]),e._v(" "),n("ol",[n("li",[e._v("Go to the Hub from the left navigation bar in the App Builder and click "),n("code",[e._v("Select Registry")])]),e._v(" "),n("li",[e._v("Choose "),n("code",[e._v("New Registry")]),e._v(" from the drop-down menu")]),e._v(" "),n("li",[e._v("Enter the registry name and the API endpoint for the catalog:")])]),e._v(" "),n("ul",[n("li",[n("p",[e._v("The API endpoint is "),n("code",[e._v("https://YOUR-BASEURL/entando-hub-application-152edaba/entando-hub-catalog-ms/appbuilder/api")]),e._v(" where "),n("code",[e._v("YOUR-BASEURL")]),e._v(" is the hostname of your Entando Application")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Private Catalog")]),n("br"),e._v("\nFor a private catalog, the URL has an added catalog ID number from the catalog's HTTP address. Go to the published catalog page from the App Builder and find the address in the browser. The number after "),n("code",[e._v("/catalog/")]),e._v(" is YOUR-CATALOG-ID#.")]),e._v(" "),n("ul",[n("li",[e._v("The endpoint to access the catalog is "),n("code",[e._v("https://YOUR-BASEURL/entando-hub-application-152edaba/entando-hub-catalog-ms/appbuilder/api/?catalogId=YOUR-CATALOG-ID#")])])]),e._v(" "),n("p",[n("strong",[e._v("E.g.")]),e._v(",  The catalog address: "),n("code",[e._v("https://quickstart.k8s-entando.org/entando-de-app/en/entando_hub.page#/catalog/1/")]),e._v(" → "),n("code",[e._v("1")]),e._v(" is YOUR-CATALOG-ID#")]),e._v(" "),n("p",[e._v("The URL to enter: "),n("code",[e._v("https://quickstart.k8s-entando.org/entando-hub-application-152edaba/entando-hub-catalog-ms/appbuilder/api?catalogId=1")])])])]),e._v(" "),n("ol",{attrs:{start:"4"}},[n("li",[e._v("If an API key is required, ask your Hub administrator or "),n("a",{attrs:{href:"#generate-an-api-key"}},[e._v("generate a key")]),e._v(" if you have a Hub user account.")])]),e._v(" "),n("h2",{attrs:{id:"hub-concepts-and-definitions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hub-concepts-and-definitions"}},[e._v("#")]),e._v(" Hub Concepts and Definitions")]),e._v(" "),n("h3",{attrs:{id:"entry-bundle-group-definitions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#entry-bundle-group-definitions"}},[e._v("#")]),e._v(" Entry/Bundle Group definitions")]),e._v(" "),n("p",[e._v("The key entities in an enterprise Hub are:")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("Bundle Group")]),e._v(": A bundle group is a group of one or more Entando Bundles.")]),e._v(" "),n("li",[n("code",[e._v("Bundle Group Version")]),e._v(": A bundle group can have one or more versions, each with a particular status.")]),e._v(" "),n("li",[n("code",[e._v("Bundle")]),e._v(": An Entando Bundle is the deployment unit within an Entando Application. A bundle can contain one or more components such as micro frontends, microservices, or any of the "),n("RouterLink",{attrs:{to:"/v7.2/docs/curate/bundle-details.html"}},[e._v("component types")]),e._v(" available in Entando.")],1),e._v(" "),n("li",[n("code",[e._v("Category")]),e._v(": Each bundle group belongs to a specific category. The initial possible categories are solution template, packaged business capability (PBC), and component collection. An admin of an enterprise hub can create and refine the categories as desired.")]),e._v(" "),n("li",[n("code",[e._v("Organization")]),e._v(": Bundle groups belong to a single organization. Authors and managers can only update bundle groups for their own organization.")]),e._v(" "),n("li",[n("code",[e._v("User")]),e._v(": User identity is managed within Keycloak, where users are granted roles within a hub instance. Users must be assigned to a specific organization.")])]),e._v(" "),n("p",[e._v("Note:")]),e._v(" "),n("ul",[n("li",[e._v("A private repository can be used for a bundle, but this requires "),n("RouterLink",{attrs:{to:"/v7.2/tutorials/curate/private-git-repo.html#overview"}},[e._v("an additional Kubernetes Secret")]),e._v(" before deployment via the App Builder.")],1)]),e._v(" "),n("h3",{attrs:{id:"roles"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#roles"}},[e._v("#")]),e._v(" Roles")]),e._v(" "),n("p",[e._v("Three roles are defined to provide access to the enterprise Hub features:")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("eh-author")]),e._v(": An author can create and edit bundle groups for their organization and submit them for publication. They can generate an API key.")]),e._v(" "),n("li",[n("code",[e._v("eh-manager")]),e._v(": A manager has the permissions of an author, but can also approve a publication request for their organization. They can generate an API key.")]),e._v(" "),n("li",[n("code",[e._v("eh-admin")]),e._v(": An admin has full access to create, update, and delete bundle groups and users for the entire hub instance. An admin can also create categories and organizations, assign users to an organization, and generate API keys.")]),e._v(" "),n("li",[n("code",[e._v("guest")]),e._v(": Any user without one of the preceding roles is considered a guest in the enterprise hub and is given a read-only view of the public catalog. This is also true for unauthenticated users.")])]),e._v(" "),n("h3",{attrs:{id:"bundle-group-status"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#bundle-group-status"}},[e._v("#")]),e._v(" Bundle Group Status")]),e._v(" "),n("p",[e._v("The possible statuses for the versions of a bundle group are:")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("Draft")]),e._v(": This is the default status for the first version of a bundle group.")]),e._v(" "),n("li",[n("code",[e._v("Publication Request")]),e._v(": An "),n("code",[e._v("eh-author")]),e._v(" sets a version to this status to request an "),n("code",[e._v("eh-manager")]),e._v(" or "),n("code",[e._v("eh-admin")]),e._v(" to review the version and mark it for publication. An "),n("code",[e._v("eh-manager")]),e._v(" or "),n("code",[e._v("eh-admin")]),e._v(" may edit versions with this status.")]),e._v(" "),n("li",[n("code",[e._v("Published")]),e._v(": Versions with this status are visible in the home page list of available bundle groups and also available in the App Builder-facing API. An "),n("code",[e._v("eh-manager")]),e._v(" or "),n("code",[e._v("eh-admin")]),e._v(" may edit published versions.")]),e._v(" "),n("li",[n("code",[e._v("Archived")]),e._v(": Previously published versions are assigned this status. No edits can be made to an archived version.")]),e._v(" "),n("li",[n("code",[e._v("Deletion Request")]),e._v(": An "),n("code",[e._v("eh-manager")]),e._v(" or "),n("code",[e._v("eh-admin")]),e._v(" can delete versions once this status has been set.")])]),e._v(" "),n("p",[e._v("Notes:")]),e._v(" "),n("ul",[n("li",[e._v("An eh-author can change any field except organization while a version is in draft.")]),e._v(" "),n("li",[e._v("There is no automated notification process when a publication request is made for a bundle group version.")])]),e._v(" "),n("h3",{attrs:{id:"bundle-group-versions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#bundle-group-versions"}},[e._v("#")]),e._v(" Bundle Group Versions")]),e._v(" "),n("p",[e._v("The list of bundle group versions can be seen by clicking "),n("code",[e._v("View Versions")]),e._v(" on any entry in the catalog:")]),e._v(" "),n("p",[n("img",{attrs:{src:a(1260),alt:"hub-actions.png"}})]),e._v(" "),n("p",[e._v("The following rules apply to bundle group versions:")]),e._v(" "),n("ul",[n("li",[e._v("Once the first version of a group is published, the organization, name, and category can no longer be changed.")]),e._v(" "),n("li",[e._v("A new version of a bundle group can be created (via the "),n("code",[e._v("New Version")]),e._v(" option) after the first version has been published.")]),e._v(" "),n("li",[e._v("There can be at most two active versions: one draft or publication requested version and one published version.")]),e._v(" "),n("li",[e._v("When a new version is published, the previous version is set to archived.")]),e._v(" "),n("li",[e._v("Archived versions are only visible in the versions view and are not shown elsewhere in the user interface.")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1261),alt:"hub-versions.png"}})]),e._v(" "),n("h2",{attrs:{id:"application-details"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#application-details"}},[e._v("#")]),e._v(" Application Details")]),e._v(" "),n("p",[e._v("An Entando Hub includes the following key components:")]),e._v(" "),n("h3",{attrs:{id:"micro-frontends-widgets"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#micro-frontends-widgets"}},[e._v("#")]),e._v(" Micro Frontends / Widgets")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("Entando Hub App")]),e._v(": This is the main micro frontend which contains the management UI for the hub entities noted above.")]),e._v(" "),n("li",[n("code",[e._v("Entando Hub Login")]),e._v(": This is an optional login component which can be used in a page’s top navigation.")])]),e._v(" "),n("h3",{attrs:{id:"microservices"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#microservices"}},[e._v("#")]),e._v(" Microservices")]),e._v(" "),n("p",[e._v("A single Spring Boot microservice provides two REST endpoints:")]),e._v(" "),n("ul",[n("li",[e._v("The first is a backend-for-a-frontend (BFF) service for the hub UI and contains the various entity APIs.")]),e._v(" "),n("li",[e._v("The second provides methods that support the Entando App Builder integration (7.0+).")])]),e._v(" "),n("h3",{attrs:{id:"content"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#content"}},[e._v("#")]),e._v(" Content")]),e._v(" "),n("p",[e._v("The content bundle ("),n("code",[e._v("entando-hub")]),e._v(") includes a custom template and a page preconfigured with the main hub micro frontends.")]),e._v(" "),n("h2",{attrs:{id:"resources"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#resources"}},[e._v("#")]),e._v(" Resources")]),e._v(" "),n("h3",{attrs:{id:"source-code"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#source-code"}},[e._v("#")]),e._v(" Source Code")]),e._v(" "),n("p",[e._v("Entando open source examples and tutorials are available on GitHub. Reference the Hub sample project for instructions to build the project from source code:")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/entando-samples/entando-hub",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-samples/entando-hub"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=o.exports}}]);