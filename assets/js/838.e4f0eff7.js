(window.webpackJsonp=window.webpackJsonp||[]).push([[838],{2182:function(e,t,a){"use strict";a.r(t);var n=a(36),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"accessing-entando-apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#accessing-entando-apis"}},[e._v("#")]),e._v(" Accessing Entando APIs")]),e._v(" "),a("p",[e._v("Entando includes the Swagger UI for API access in a quickstart environment. This document presents an overview, and instructions on how to enable and utilize the interface.")]),e._v(" "),a("h2",{attrs:{id:"apis-overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#apis-overview"}},[e._v("#")]),e._v(" APIs Overview")]),e._v(" "),a("p",[e._v("The Entando App Engine uses REST APIs to enact all the functionality inside the App Builder. For example, APIs are used to add widgets to a page or create components like pages and page templates. APIs can also be used to support automation, testing, and integration with external systems.")]),e._v(" "),a("h2",{attrs:{id:"api-structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-structure"}},[e._v("#")]),e._v(" API Structure")]),e._v(" "),a("p",[e._v("All the APIs share a common top-level structure. Each response contains a top level entry for "),a("code",[e._v("errors")]),e._v(", "),a("code",[e._v("metadata")]),e._v(", and "),a("code",[e._v("payload")]),e._v(".")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("errors")]),e._v(" contain code and a message string indicating the error condition of the request. The "),a("code",[e._v("metadata")]),e._v(" section is used for paging, sorting, and filtering data not included in the body. The body of each response is included in the payload section and varies according to each API.")]),e._v(" "),a("h2",{attrs:{id:"models"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#models"}},[e._v("#")]),e._v(" Models")]),e._v(" "),a("p",[e._v("All of the model classes returned by the Entando App Engine are annotated with definitions included in the Swagger documentation. They are listed at the bottom of the Swagger page.")]),e._v(" "),a("h2",{attrs:{id:"enable-the-swagger-ui"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-the-swagger-ui"}},[e._v("#")]),e._v(" Enable the Swagger UI")]),e._v(" "),a("p",[e._v("The Swagger UI can be enabled or disabled in a running Entando instance by modifying the environment variable "),a("code",[e._v("SPRING_PROFILES_ACTIVE")]),e._v(" in the "),a("code",[e._v("entando-de-app")]),e._v(" container.")]),e._v(" "),a("ol",[a("li",[e._v("(Optional) Scale the deployment "),a("code",[e._v("spec.replicas")]),e._v(" to 0.")])]),e._v(" "),a("blockquote",[a("p",[e._v("This is necessary if you're using an in-memory database as in the default quickstart configuration.  This will prevent database errors on immediate restarts when the deployment is changed.")])]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Edit the "),a("code",[e._v("entando-de-app")]),e._v(" deployment. If you have different names for namespace and deployment, adjust the command accordingingly.")])]),e._v(" "),a("blockquote",[a("p",[e._v("Use the "),a("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/entando-cli.html"}},[e._v("ent CLI")]),e._v(" to send commands to Kubernetes from the host machine.")],1)]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl -n entando edit deployment/quickstart-deployment\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[a("p",[e._v("Find the "),a("code",[e._v("env")]),e._v(" variables section under "),a("code",[e._v("spec.template.spec.containers.env[image: entando-de-app]")])])]),e._v(" "),a("li",[a("p",[e._v('To enable the Swagger UI, add the "SPRING_PROFILES_ACTIVE" variable. If it is already present, add '),a("code",[e._v("swagger")]),e._v(" to its comma-delimited value list:")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("        - name: SPRING_PROFILES_ACTIVE\n          value: default,swagger\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[e._v("(Optional) Reset the deployment "),a("code",[e._v("spec.replicas")]),e._v(" back to 1 if it was changed in a previous step. Save the deployment to update.")])]),e._v(" "),a("h3",{attrs:{id:"disable-swagger-ui"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#disable-swagger-ui"}},[e._v("#")]),e._v(" Disable Swagger UI")]),e._v(" "),a("p",[e._v("Repeat the steps above, but in step 4, remove "),a("code",[e._v("swagger")]),e._v(" from the value list.")]),e._v(" "),a("h2",{attrs:{id:"retrieve-your-client-secret"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#retrieve-your-client-secret"}},[e._v("#")]),e._v(" Retrieve Your Client Secret")]),e._v(" "),a("p",[e._v("You'll need your client credentials to execute Entando APIs.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Log in to your Keycloak Administration Console at "),a("code",[e._v("http://[YOUR-HOST-NAME]/auth")]),e._v(". To find the Keycloak admin credentials, see the "),a("RouterLink",{attrs:{to:"/v7.3/docs/consume/identity-management.html"}},[e._v("Entando Identity Management System")]),e._v(" page.")],1)]),e._v(" "),a("li",[a("p",[e._v("From the left navigation panel, go to "),a("code",[e._v("Clients")])])]),e._v(" "),a("li",[a("p",[e._v("Select the desired client (e.g. in a quickstart environment, this is "),a("code",[e._v("quickstart")]),e._v(")")])]),e._v(" "),a("li",[a("p",[e._v("Click on the "),a("code",[e._v("Credentials")]),e._v(" tab to find the Secret. Save the "),a("code",[e._v("Client Id")]),e._v(" and "),a("code",[e._v("Secret")]),e._v(" for the steps below.")])])]),e._v(" "),a("h2",{attrs:{id:"access-the-apis-on-swagger"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#access-the-apis-on-swagger"}},[e._v("#")]),e._v(" Access the APIs on Swagger")]),e._v(" "),a("ol",[a("li",[e._v("To see the APIs, go to:")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("http://"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("YOUR-HOST-NAME"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("/entando-de-app/api/swagger-ui.html\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[e._v("Click on the Authorize button in the upper right corner.")])]),e._v(" "),a("li",[a("p",[e._v("Enter the "),a("code",[e._v("Client ID")]),e._v(" and "),a("code",[e._v("Secret")]),e._v(" from above. Click "),a("code",[e._v("Authorize")]),e._v(".")])]),e._v(" "),a("li",[a("p",[e._v("You will be prompted to log in to your Keycloak instance as an Entando admin user if you have not already done so. The default credentials are admin/adminadmin.")])]),e._v(" "),a("li",[a("p",[e._v("You will be redirected to the authenticated Swagger UI page. Select an API to see the methods in the drop-down list and click the "),a("code",[e._v("Try it out")]),e._v(" button."),a("br"),e._v("\nExample:")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Scroll down to "),a("code",[e._v("widget-controller")]),e._v(" and click anywhere on the row")])]),e._v(" "),a("li",[a("p",[e._v("Select the "),a("code",[e._v("GET")]),e._v(" method")])]),e._v(" "),a("li",[a("p",[e._v("Click "),a("code",[e._v("Try it out")])])]),e._v(" "),a("li",[a("p",[e._v("See the results in the window below showing Code 200 and a full response body")])])])])])])}),[],!1,null,null,null);t.default=s.exports}}]);