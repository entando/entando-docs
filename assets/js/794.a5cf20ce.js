(window.webpackJsonp=window.webpackJsonp||[]).push([[794],{2120:function(e,t,a){"use strict";a.r(t);var n=a(36),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"connect-to-an-external-keycloak-instance"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#connect-to-an-external-keycloak-instance"}},[e._v("#")]),e._v(" Connect to an External Keycloak Instance")]),e._v(" "),a("h2",{attrs:{id:"purpose"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#purpose"}},[e._v("#")]),e._v(" Purpose")]),e._v(" "),a("p",[e._v("This tutorial details how Entando can be connected to an existing Keycloak instance.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("A Keycloak instance")]),e._v(" "),a("li",[e._v('A realm named "entando" in that instance')]),e._v(" "),a("li",[e._v('Admin user credentials for the "entando" realm. These are the credentials (username/password) for the service account that has the correct level of admin permissions.')])]),e._v(" "),a("h2",{attrs:{id:"steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#steps"}},[e._v("#")]),e._v(" Steps")]),e._v(" "),a("h3",{attrs:{id:"_1-get-keycloak-information"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-get-keycloak-information"}},[e._v("#")]),e._v(" 1. Get Keycloak information")]),e._v(" "),a("p",[e._v("Retrieve the following information from the existing Keycloak instance:")]),e._v(" "),a("ul",[a("li",[e._v('The username of the admin user with rights to the "entando" realm, e.g entando-keycloak-admin')]),e._v(" "),a("li",[e._v("The admin user password, e.g. password123")]),e._v(" "),a("li",[e._v("The base URL for the Keycloak server, including the auth value, e.g. https://YOUR-KEYCLOAK-INSTANCE.com/auth")])]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("Note")]),e._v(" When connecting an external Keycloak instance to Entando, it is a good practice to provide the admin credentials for a dedicated service account.")])]),e._v(" "),a("h3",{attrs:{id:"_2-generate-the-secret"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-generate-the-secret"}},[e._v("#")]),e._v(" 2. Generate the Secret")]),e._v(" "),a("p",[e._v("Generate a Secret named "),a("em",[e._v("keycloak-admin-secret")]),e._v(" with the information retrieved in Step 1. For example:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v('---\napiVersion: v1\nstringData:\n    username: #the username of the Keycloak admin user for the "entando" realm\n    password: #the password of the Keycloak admin user\n    url: #the base URL of the Keycloak service, typically ending with the path /auth\nkind: Secret\nmetadata\n    name: keycloak-admin-secret\n    namespace: entando \ntype: Opaque\n')])])]),a("p",[e._v('Via the named Secret, Entando supplies the Keycloak APIs with the admin credentials they require to provision the "entando" realm.')]),e._v(" "),a("blockquote",[a("p",[a("strong",[e._v("Note")]),e._v(" To encode a value in bash, use "),a("code",[e._v("echo YOUR-SECRET-VALUE | base64")])])]),e._v(" "),a("h3",{attrs:{id:"_3-create-the-secret"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-create-the-secret"}},[e._v("#")]),e._v(" 3. Create the Secret")]),e._v(" "),a("p",[e._v("Apply the Secret to the namespace where you want to deploy your Entando instance:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("kubectl apply -f keycloak-admin-secret.yaml -n entando\n")])])]),a("h3",{attrs:{id:"_4-create-a-yaml-configuration-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-create-a-yaml-configuration-file"}},[e._v("#")]),e._v(" 4. Create a YAML configuration file")]),e._v(" "),a("p",[e._v("Create a YAML file to configure Keycloak, based on the following template:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("apiVersion: entando.org/v1\nkind: EntandoKeycloakServer\nmetadata:\n  name: external-keycloak\n  namespace: entando\nspec:\n  environmentVariables: []\n  provisioningStrategy: UseExternal\n  adminSecretName: keycloak-admin-secret\n  frontEndUrl: >-\n    http://KEYCLOAK-URL/auth\n")])])]),a("h3",{attrs:{id:"_5-apply-the-yaml-configuration-file"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-apply-the-yaml-configuration-file"}},[e._v("#")]),e._v(" 5. Apply the YAML configuration file")]),e._v(" "),a("p",[e._v("Apply the YAML configuration file to the namespace where you want to deploy your Entando instance:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl apply -f YOUR-YAML-FILE.yaml -n entando\n\n")])])]),a("h3",{attrs:{id:"_6-deploy-the-entando-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-deploy-the-entando-application"}},[e._v("#")]),e._v(" 6. Deploy the Entando Application")]),e._v(" "),a("p",[e._v("You are now ready to deploy your Entando Application. Entando will use the "),a("em",[e._v("keycloak-admin-secret")]),e._v(" to populate the environment correctly.")]),e._v(" "),a("p",[e._v("Refer to the "),a("RouterLink",{attrs:{to:"/v7.2/tutorials/#operations"}},[e._v("learning path tutorials")]),e._v(" to install, configure and customize your Entando instance.")],1),e._v(" "),a("h2",{attrs:{id:"conclusion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conclusion"}},[e._v("#")]),e._v(" Conclusion")]),e._v(" "),a("p",[e._v("This should result in a working Entando instance that is connected to an external Keycloak server.")])])}),[],!1,null,null,null);t.default=r.exports}}]);