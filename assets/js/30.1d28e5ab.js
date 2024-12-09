(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1e3:function(e,t,a){e.exports=a.p+"assets/img/AlertIcons.a6dc0e3d.png"},1943:function(e,t,a){"use strict";a.r(t);var n=a(36),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"entando-standard-banking-demo"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#entando-standard-banking-demo"}},[e._v("#")]),e._v(" Entando Standard Banking Demo")]),e._v(" "),n("p",[e._v("This tutorial will guide you through installing a demo application using the Entando Component Repository (ECR) and a set of Entando\nbundles. This solution template includes:")]),e._v(" "),n("ul",[n("li",[e._v("microservices")]),e._v(" "),n("li",[e._v("micro frontends")]),e._v(" "),n("li",[e._v("multiple pages")]),e._v(" "),n("li",[e._v("CMS content")])]),e._v(" "),n("p",[e._v("The goal of this exercise is to demonstrate how Entando bundles can be used to:")]),e._v(" "),n("ul",[n("li",[e._v("quickly install and create functionality in an Entando Application")]),e._v(" "),n("li",[e._v("enable packaged business capabilities")]),e._v(" "),n("li",[e._v("allow developers to reuse full stack operations via bundles")])]),e._v(" "),n("p",[e._v("Some of the key elements of the template are reviewed in the "),n("a",{attrs:{href:"#application-details"}},[e._v("Application Details section")]),e._v(" below.")]),e._v(" "),n("h2",{attrs:{id:"installation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),n("p",[e._v("There are numerous assets installed as part of the Standard Banking Demo. Entando Bundles can include more or less components, depending on objectives. It is recommended that organizations develop guidelines for bundle sizing that fit the goals of their applications and teams.")]),e._v(" "),n("h3",{attrs:{id:"prerequisites"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),n("ul",[n("li",[e._v("A working instance of Entando running on Kubernetes. "),n("RouterLink",{attrs:{to:"/v7.0/tutorials/#operations"}},[e._v("Install Entando on any Kubernetes provider")]),e._v(" or see "),n("RouterLink",{attrs:{to:"/v7.0/docs/getting-started/"}},[e._v("Getting Started")]),e._v(" for more information.")],1),e._v(" "),n("li",[e._v("The ent command line tool, installed and connected to your Kubernetes instance.")])]),e._v(" "),n("h3",{attrs:{id:"automatic-install-via-the-entando-hub"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#automatic-install-via-the-entando-hub"}},[e._v("#")]),e._v(" Automatic Install via the Entando Hub")]),e._v(" "),n("p",[e._v("Install the Standard Banking Demo by integrating the Entando Hub into your App Builder.")]),e._v(" "),n("ol",[n("li",[n("p",[e._v("Log into your "),n("code",[e._v("App Builder")]),e._v(" → "),n("code",[e._v("Repository")]),e._v(" → "),n("code",[e._v("Select Registry")]),e._v(" → choose "),n("code",[e._v("Entando Hub")]),e._v(" if it has been configured.")]),e._v(" "),n("ol",[n("li",[e._v("If not, choose "),n("code",[e._v("New Registry")])]),e._v(" "),n("li",[e._v("In the pop-up window, enter "),n("code",[e._v("Entando Hub")]),e._v(" and https://entando.com/entando-hub-api/appbuilder/api for the URL, then "),n("code",[e._v("Save")])]),e._v(" "),n("li",[e._v("Click on the Hub in the Registry")])])]),e._v(" "),n("li",[n("p",[e._v("From the Hub Catalog, "),n("code",[e._v("Deploy")]),e._v(" and "),n("code",[e._v("Install")]),e._v(" the four Standard Banking Demo bundles, where order of installation is important. The "),n("code",[e._v("standard-demo-content-bundle")]),e._v(" will need to be installed last, as it relies on MFEs from the other bundles to set up each of the pages.")]),e._v(" "),n("ol",[n("li",[n("code",[e._v("standard-demo-banking-bundle")])]),e._v(" "),n("li",[n("code",[e._v("standard-demo-customer-bundle")])]),e._v(" "),n("li",[n("code",[e._v("standard-demo-manage-users-bundle")])]),e._v(" "),n("li",[n("code",[e._v("standard-demo-content-bundle")])])])]),e._v(" "),n("li",[n("p",[e._v("To navigate to the Standard Demo:")]),e._v(" "),n("ul",[n("li",[e._v("From the sidebar →  "),n("code",[e._v("Page")]),e._v(" → "),n("code",[e._v("Management")])]),e._v(" "),n("li",[e._v("Find "),n("code",[e._v("Home SD")]),e._v(" in the page tree")]),e._v(" "),n("li",[e._v("From the "),n("code",[e._v("Actions")]),e._v(" pull-down menu →  "),n("code",[e._v("View Published Page")])])])])]),e._v(" "),n("h3",{attrs:{id:"manual-install"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#manual-install"}},[e._v("#")]),e._v(" Manual Install")]),e._v(" "),n("ol",[n("li",[e._v("Apply the definitions for the four bundles that comprise the Standard Banking Demo.")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-banking-bundle.git"\n')])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-customer-bundle.git"\n')])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-manage-users-bundle.git"\n')])])]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('ent ecr deploy --repo="https://github.com/entando-samples/standard-demo-content-bundle.git"\n')])])]),n("ol",{attrs:{start:"2"}},[n("li",[n("p",[e._v("Log into your App Builder instance.")])]),e._v(" "),n("li",[n("p",[e._v("Select "),n("code",[e._v("Repository")]),e._v(" from the menu on the left. Your bundles will be visible in the repository as shown in the screenshot below.\n"),n("img",{attrs:{src:a(989),alt:"Repository.png"}})])]),e._v(" "),n("li",[n("p",[e._v("Select "),n("code",[e._v("Install")]),e._v(" for each bundle, where order of installation is important. The "),n("code",[e._v("standard-demo-content-bundle")]),e._v(" will need to be installed last, as it relies on MFEs from the other bundles to set up each of the pages.\n"),n("img",{attrs:{src:a(990),alt:"Installed.png"}})])])]),e._v(" "),n("p",[e._v("Each installation can take several minutes while the application downloads the Linux images for the microservices and installs the related assets. The "),n("code",[e._v("standard-demo-banking-bundle")]),e._v(" and "),n("code",[e._v("standard-demo-customer-bundle")]),e._v(" include microservices that require the initialization of containers and will take longer to install.")]),e._v(" "),n("p",[e._v("In the unlikely event you encounter conflicts during an initial installation, you will be presented with an Installation Plan like the one shown below. Select "),n("code",[e._v("Update All")]),e._v(" in the upper right after making your selections.\n"),n("img",{attrs:{src:a(991),alt:"InstallPlan.png"}})]),e._v(" "),n("ol",{attrs:{start:"5"}},[n("li",[e._v("Access the Standard Banking Demo via one of the following options:")])]),e._v(" "),n("p",[n("strong",[e._v("Option 1")]),e._v(" If you'd like to make the Standard Banking Demo your default home page, go to "),n("code",[e._v("App Builder → Pages → Settings")]),e._v(". In\nthe dropdown for Home Page, select "),n("code",[e._v("Home / Home SD")]),e._v(" and click "),n("code",[e._v("Save")]),e._v(".\n"),n("img",{attrs:{src:a(992),alt:"HomepageSelect.png"}})]),e._v(" "),n("p",[e._v("You can now navigate to your application's home page using the home icon in the upper right of the App Builder.")]),e._v(" "),n("p",[n("strong",[e._v("Option 2")]),e._v(" Alternatively, you can view the Standard Banking Demo home page by going to "),n("code",[e._v("Pages → Management")]),e._v(", finding "),n("code",[e._v("Home SD")]),e._v(" in the page tree, and clicking "),n("code",[e._v("View Published Page")]),e._v(" from its actions.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(993),alt:"Standard Banking Demo Homepage"}})]),e._v(" "),n("h2",{attrs:{id:"application-details"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#application-details"}},[e._v("#")]),e._v(" Application Details")]),e._v(" "),n("p",[e._v("The Entando Standard Banking Demo application demonstrates a number of the major features of the Entando platform, including:")]),e._v(" "),n("ul",[n("li",[e._v("Keycloak integration for role based access controls")]),e._v(" "),n("li",[e._v("Micro frontends implemented using React and Angular and co-existing on the same dashboard page")]),e._v(" "),n("li",[e._v("Micro frontend communication techniques")]),e._v(" "),n("li",[e._v("Microservices via Spring Boot")]),e._v(" "),n("li",[e._v("Entando Content Management")])]),e._v(" "),n("h3",{attrs:{id:"micro-frontends-mfe"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#micro-frontends-mfe"}},[e._v("#")]),e._v(" Micro Frontends (MFE)")]),e._v(" "),n("p",[e._v("The application includes six MFEs in which the above features complement one another to achieve custom functionality. These are described below.")]),e._v(" "),n("h4",{attrs:{id:"_1-card"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-card"}},[e._v("#")]),e._v(" 1. Card")]),e._v(" "),n("p",[n("img",{attrs:{src:a(994),alt:"SeedCard.png"}})]),e._v(" "),n("ul",[n("li",[e._v("The Card MFE is a React micro frontend that is visible on the My Dashboard page. The MFE makes an API call to the banking microservice to fetch a numeric result depending on the configured card type. The displayed value will change as the configuration is changed.")]),e._v(" "),n("li",[e._v("The MFE is authorization-aware and will pass the bearer token to the microservice for authorization and authentication. If you render the dashboard page and you aren't authenticated, the widget displays an error message.")]),e._v(" "),n("li",[e._v("This MFE emits events that are consumed by the Transaction Table widget.")])]),e._v(" "),n("h4",{attrs:{id:"_2-card-ng"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-card-ng"}},[e._v("#")]),e._v(" 2. Card NG")]),e._v(" "),n("p",[n("img",{attrs:{src:a(995),alt:"SeedCardNG.png"}})]),e._v(" "),n("ul",[n("li",[e._v("The Card NG MFE is an Angular widget that is similar to the Card widget above, except for the choice of frontend technology.")]),e._v(" "),n("li",[e._v("This MFE communicates with the Transaction Table widget, which is implemented in React.")])]),e._v(" "),n("h4",{attrs:{id:"_3-manage-users"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3-manage-users"}},[e._v("#")]),e._v(" 3. Manage Users")]),e._v(" "),n("ul",[n("li",[e._v("The Manage Users MFE makes an API call to Keycloak to fetch user information. When the user is logged into the app, the MFE is visible from the dropdown under the username.")]),e._v(" "),n("li",[e._v("By default, application users are not granted Keycloak authorization to manage users. This demonstrates role based access control for an MFE using Keycloak. To enable the Manage Users widget, login to Keycloak and assign the realm-management client's "),n("code",[e._v("view-users")]),e._v(" and "),n("code",[e._v("manage-users")]),e._v(" roles to the desired user.")])]),e._v(" "),n("p",[e._v("Authorized View\n"),n("img",{attrs:{src:a(996),alt:"ManageUsersAuth.png"}})]),e._v(" "),n("p",[e._v("Not Authorized View\n"),n("img",{attrs:{src:a(997),alt:"ManageUsersNoAuth.png"}})]),e._v(" "),n("h4",{attrs:{id:"_4-transaction-table"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4-transaction-table"}},[e._v("#")]),e._v(" 4. Transaction Table")]),e._v(" "),n("ul",[n("li",[e._v("This MFE is a React micro frontend that consumes events from the Card MFEs detailed above.")]),e._v(" "),n("li",[e._v("The Transaction Table widget makes an API call to the banking microservice to fetch transaction data for the user.")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(998),alt:"TransactionTable.png"}})]),e._v(" "),n("h4",{attrs:{id:"_5-sign-up"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5-sign-up"}},[e._v("#")]),e._v(" 5. Sign Up")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("The Sign Up MFE is a form widget that makes an API call to the customer microservice to create a new user. The Sign Up MFE is visible on the sign up page, and can be accessed from any page when a user is not authenticated.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(999),alt:"SignUp.png"}})])])]),e._v(" "),n("h4",{attrs:{id:"_6-alert-icon"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_6-alert-icon"}},[e._v("#")]),e._v(" 6. Alert Icon")]),e._v(" "),n("ul",[n("li",[e._v("The Alert Icon MFE displays an icon on the dashboard page. It includes a configuration MFE to allow the user to select the appropriate icon and datatype to display.")]),e._v(" "),n("li",[e._v("In the default deployment, the Alert Icon MFE makes an API call to the banking microservice to fetch data.")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1e3),alt:"AlertIcons.png"}})]),e._v(" "),n("h3",{attrs:{id:"configuration-micro-frontends"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configuration-micro-frontends"}},[e._v("#")]),e._v(" Configuration Micro Frontends")]),e._v(" "),n("p",[e._v("When placed on a page, many of the MFEs detailed above include configuration screens visible in the App Builder at "),n("code",[e._v("Components → Micro frontends & Widgets")]),e._v(". To see the rendered config screen, place the MFE on a new page.")]),e._v(" "),n("h3",{attrs:{id:"microservices"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#microservices"}},[e._v("#")]),e._v(" Microservices")]),e._v(" "),n("p",[e._v("The application includes two microservices (service paths: "),n("code",[e._v("/banking")]),e._v(" and "),n("code",[e._v("/customer")]),e._v(") to support the data visible in the MFEs detailed above. Both microservices demonstrate the automated deployment and linking of a microservice to an Entando Application via the Entando Operator.")]),e._v(" "),n("p",[e._v("The data for the microservices are created with Liquibase, demonstrating the use of the Operator and Liquibase + Spring Boot to automatically provision data into an environment. The demo data is available in the source code for the microservices on GitHub.")]),e._v(" "),n("h3",{attrs:{id:"static-widgets"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#static-widgets"}},[e._v("#")]),e._v(" Static Widgets")]),e._v(" "),n("p",[e._v("The application uses static HTML, FreeMarker, and JavaScript widgets to display content, e.g. headers, footers, images, etc. To view the static widgets, log into the App builder and select "),n("code",[e._v("Components → Micro frontends & Widgets")]),e._v(".")]),e._v(" "),n("h3",{attrs:{id:"static-cms-content"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#static-cms-content"}},[e._v("#")]),e._v(" Static CMS Content")]),e._v(" "),n("p",[e._v("The application makes extensive use of the Entando CMS. This includes the creation of content templates, content types, and content. If you want to learn more about the Entando CMS in the application, log into the App Builder and select "),n("code",[e._v("Content →  Templates")]),e._v(", "),n("code",[e._v("Content → Management")]),e._v(", or "),n("code",[e._v("Content → Types")]),e._v(".")]),e._v(" "),n("h2",{attrs:{id:"source-code"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#source-code"}},[e._v("#")]),e._v(" Source Code")]),e._v(" "),n("p",[e._v("The source code for the Entando Standard Banking Demo can be found on GitHub "),n("a",{attrs:{href:"https://github.com/entando-samples/standard-demo",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),n("OutboundLink")],1),e._v(", along with our other open source examples and tutorials.")])])}),[],!1,null,null,null);t.default=o.exports},989:function(e,t,a){e.exports=a.p+"assets/img/Repository.b74bf23c.png"},990:function(e,t,a){e.exports=a.p+"assets/img/Installed.922f893a.png"},991:function(e,t,a){e.exports=a.p+"assets/img/InstallPlan.4bd2ecaf.png"},992:function(e,t,a){e.exports=a.p+"assets/img/HomepageSelect.2795ca74.png"},993:function(e,t,a){e.exports=a.p+"assets/img/Homepage.135c4311.png"},994:function(e,t,a){e.exports=a.p+"assets/img/SeedCard.5cb847f6.png"},995:function(e,t,a){e.exports=a.p+"assets/img/SeedCardNG.9c86213f.png"},996:function(e,t,a){e.exports=a.p+"assets/img/ManageUsersAuth.2b62383f.png"},997:function(e,t,a){e.exports=a.p+"assets/img/ManageUsersNoAuth.f3f3f9a2.png"},998:function(e,t,a){e.exports=a.p+"assets/img/TransactionTable.8a42324a.png"},999:function(e,t,a){e.exports=a.p+"assets/img/SignUp.e3bc2ae9.png"}}]);