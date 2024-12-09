(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{1279:function(e,t,a){e.exports=a.p+"assets/img/keycloak-arch-high-level.47cccaab.png"},1280:function(e,t,a){e.exports=a.p+"assets/img/find-admin.8eebfd52.png"},1281:function(e,t,a){e.exports=a.p+"assets/img/find-roles.3164de7d.png"},1282:function(e,t,a){e.exports=a.p+"assets/img/assign-roles.c8f52211.png"},2185:function(e,t,a){"use strict";a.r(t);var n=a(36),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"entando-identity-management-system"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#entando-identity-management-system"}},[e._v("#")]),e._v(" Entando Identity Management System")]),e._v(" "),n("p",[e._v("The Entando Identity Management System is based on the open source Keycloak identity and access management system. Entando Applications rely on a Keycloak instance that is either "),n("RouterLink",{attrs:{to:"/v7.3/tutorials/consume/external-id-management.html"}},[e._v("externally installed")]),e._v(" or specific to an application. The architecture and requirements to customize your Keycloak instance are described below.")],1),e._v(" "),n("h2",{attrs:{id:"logging-into-your-keycloak-instance"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#logging-into-your-keycloak-instance"}},[e._v("#")]),e._v(" Logging into your Keycloak Instance")]),e._v(" "),n("p",[e._v("Keycloak is protected by a Secret deployed to your Entando Kubernetes instance. You can query Kubernetes for the Secret's default admin credentials via the following, modifying this command to use your environment's namespace and Secret name.")]),e._v(" "),n("blockquote",[n("p",[e._v("Note: Use the "),n("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/entando-cli.html"}},[e._v("ent CLI")]),e._v(" to send commands to Kubernetes from the host machine.")],1)]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('kubectl get secret default-sso-in-namespace-admin-secret -n entando -o go-template="{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"\n')])])]),n("p",[e._v("To find the Secret name, run the command below and search for the Secret that ends in "),n("code",[e._v("namespace-admin-secret")]),e._v(".")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("kubectl get secrets -n entando\n")])])]),n("h2",{attrs:{id:"authentication"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#authentication"}},[e._v("#")]),e._v(" Authentication")]),e._v(" "),n("p",[e._v("All authentication is powered by Keycloak on Entando. This ensures that a micro frontend can call a microservice with a token available to the client.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(1279),alt:"Entando cluster & Keycloak architecture diagram with JWT tokens"}})]),e._v(" "),n("p",[e._v("Entando implements Keycloak as a central point of authentication to provide a single unified view of identity. This infrastructure increases portability. Keycloak acts as an abstraction layer to the underlying Identity Provider (IDP), allowing Entando to integrate into other IDPs without modifying the source.")]),e._v(" "),n("h2",{attrs:{id:"authorization"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#authorization"}},[e._v("#")]),e._v(" Authorization")]),e._v(" "),n("h3",{attrs:{id:"role-assignment-for-plugins-microservices"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#role-assignment-for-plugins-microservices"}},[e._v("#")]),e._v(" Role Assignment for Plugins/Microservices")]),e._v(" "),n("p",[e._v("Keycloak authorizes microservices using clients and roles. Authorizations are stored in a JSON Web Token and available to services when invoked.")]),e._v(" "),n("p",[e._v("Below are the steps to grant a user one or more roles for a specific client. This controls permissions when configuring the microservice. Note, when a microservice is installed in Entando, a corresponding client (and set of roles) is created within its plugin definition.")]),e._v(" "),n("ol",[n("li",[n("a",{attrs:{href:"#logging-into-your-keycloak-instance"}},[e._v("Log in to Keycloak")])])]),e._v(" "),n("blockquote",[n("p",[e._v("For non-external Keycloak instances, it is "),n("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/#configure-access-to-your-cluster"}},[e._v("the base URL of your running Entando application")]),e._v(" followed by "),n("code",[e._v("/auth/")]),e._v(", e.g. http://YOUR-HOST-NAME/auth. In a standard Entando installation, the base URL can be verified with "),n("code",[e._v("kubectl get ingress/default-sso-in-namespace-ingress")]),e._v(".")],1)]),e._v(" "),n("ol",{attrs:{start:"2"}},[n("li",[e._v("Select "),n("code",[e._v("Users")]),e._v(" from the left menu")]),e._v(" "),n("li",[e._v('Use the search box to find the appropriate user, e.g. "admin"')]),e._v(" "),n("li",[e._v("Click on the user ID")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1280),alt:"Screenshot-AppBuilder Users Lookup for admin"}})]),e._v(" "),n("ol",{attrs:{start:"5"}},[n("li",[e._v("Click the "),n("code",[e._v("Role Mappings")]),e._v(" tab")]),e._v(" "),n("li",[e._v("Use the "),n("code",[e._v("Client Roles")]),e._v(" drop-down menu to specify the microservice client")]),e._v(" "),n("li",[e._v("Select from the client's "),n("code",[e._v("Available Roles")])])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1281),alt:"Screenshot-Client Roles Dropdown of Available Roles"}})]),e._v(" "),n("ol",{attrs:{start:"8"}},[n("li",[e._v("Use the "),n("code",[e._v("Add Selected")]),e._v(" button to move the desired roles to "),n("code",[e._v("Assigned Roles")]),e._v(". These will subsequently appear under "),n("code",[e._v("Effective Roles")]),e._v(".")])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1282),alt:"Screenshot-Roles added to Effective Roles"}})]),e._v(" "),n("h3",{attrs:{id:"core"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#core"}},[e._v("#")]),e._v(" Core")]),e._v(" "),n("p",[e._v("When a user is authenticated to the "),n("code",[e._v("entando-core")]),e._v(" via Keycloak, a copy of that user is added to the "),n("code",[e._v("entando-core")]),e._v(" user management database to enable WCMS functionality. Within the App Builder, WCMS roles and groups can be assigned to a user for access to App Builder functions or "),n("code",[e._v("portal-ui")]),e._v(" content in the runtime application.")]),e._v(" "),n("p",[e._v("The code that copies the user into the "),n("code",[e._v("entando-core")]),e._v(" can be customized per implementation to automatically create groups and roles. See the "),n("a",{attrs:{href:"https://github.com/entando/entando-keycloak-plugin",target:"_blank",rel:"noopener noreferrer"}},[e._v("entando-keycloak-plugin"),n("OutboundLink")],1),e._v(" for details of the code that copies users and data to the WCMS database. The README in that project includes properties that are available to your Entando Application.")]),e._v(" "),n("p",[e._v("See "),n("a",{attrs:{href:"https://github.com/entando/entando-keycloak-plugin/blob/master/src/main/java/org/entando/entando/keycloak/services/KeycloakAuthorizationManager.java",target:"_blank",rel:"noopener noreferrer"}},[e._v("KeycloakAuthorizationManager.java"),n("OutboundLink")],1),e._v(" for an example of adding attributes programatically. In particular, refer to the "),n("a",{attrs:{href:"https://github.com/entando/entando-keycloak-plugin/blob/master/src/main/java/org/entando/entando/keycloak/services/KeycloakAuthorizationManager.java#L43",target:"_blank",rel:"noopener noreferrer"}},[e._v("processNewUser"),n("OutboundLink")],1),e._v(" method.")]),e._v(" "),n("h2",{attrs:{id:"social-login"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#social-login"}},[e._v("#")]),e._v(" Social Login")]),e._v(" "),n("p",[e._v("Keycloak allows Entando to provide social login as an out-of-the-box capability. "),n("a",{attrs:{href:"https://www.keycloak.org/docs/21.0.2/server_admin/index.html#_identity_broker",target:"_blank",rel:"noopener noreferrer"}},[e._v("Keycloak Social Identity Providers"),n("OutboundLink")],1),e._v(" documents how to enable and configure social logins in your Entando Applications.")]),e._v(" "),n("h2",{attrs:{id:"one-time-passwords"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#one-time-passwords"}},[e._v("#")]),e._v(" One Time Passwords")]),e._v(" "),n("p",[e._v("Keycloak enables One Time Password (OTP) login to Entando Applications. See "),n("a",{attrs:{href:"https://www.keycloak.org/docs/21.0.2/server_admin/index.html#one-time-password-otp-policies",target:"_blank",rel:"noopener noreferrer"}},[e._v("Keycloak OTP Policies"),n("OutboundLink")],1),e._v(" to configure and enable it.")]),e._v(" "),n("h2",{attrs:{id:"themes-look-and-feel"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#themes-look-and-feel"}},[e._v("#")]),e._v(" Themes, Look and Feel")]),e._v(" "),n("p",[e._v("Developers can customize the look and feel of the login page, as well as the identity management system that comes with Entando. The "),n("a",{attrs:{href:"https://www.keycloak.org/docs/21.0.2/server_development/index.html#_themes",target:"_blank",rel:"noopener noreferrer"}},[e._v("Keycloak Theme Documentation"),n("OutboundLink")],1),e._v(" provides instructions for creating your own theme. Alternatively, you can modify the "),n("a",{attrs:{href:"https://github.com/entando/entando-keycloak/tree/master/themes/entando",target:"_blank",rel:"noopener noreferrer"}},[e._v("Entando Theme"),n("OutboundLink")],1),e._v(".")])])}),[],!1,null,null,null);t.default=o.exports}}]);