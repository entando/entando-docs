(window.webpackJsonp=window.webpackJsonp||[]).push([[525],{1704:function(e,t,a){"use strict";a.r(t);var o=a(36),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"accessing-entando-apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#accessing-entando-apis"}},[e._v("#")]),e._v(" Accessing Entando APIs")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("Entando includes the Swagger UI in a quickstart environment and is reachable at "),a("code",[e._v("/entando-de-app/api/swagger-ui.html")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("http://[your-host-name]/entando-de-app/api/swagger-ui.html\n")])])]),a("h3",{attrs:{id:"enable-or-disable-the-swagger-ui-in-a-running-container"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-or-disable-the-swagger-ui-in-a-running-container"}},[e._v("#")]),e._v(" Enable or disable the Swagger UI in a running container")]),e._v(" "),a("p",[e._v("The Swagger UI can be enabled or disabled in a running container by modifying the SPRING_PROFILES_ACTIVE environment variable for the entando-de-app container.")]),e._v(" "),a("ol",[a("li",[e._v("Edit the deployment. The name may be different outside of a quickstart environment.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("sudo kubectl -n entando edit deployment/quickstart-server-deployment\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[e._v("(Optional) Scale the deployment "),a("code",[e._v("spec.replicas")]),e._v(" to 0 before updating the deployment. This is necessary if you're using an in-memory database, e.g. the default quickstart configuration, and will prevent database errors that can happen on an immediate restart after the profile is changed. Save the deployment to apply the change.")])]),e._v(" "),a("li",[a("p",[e._v("Find the entando-de-app env variables section under "),a("code",[e._v("spec.template.spec.containers.env[image: entando-de-app]")])])])]),e._v(" "),a("p",[e._v("4a. To enable the swagger UI, add the SPRING_PROFILES_ACTIVE environment variable, if it's missing, or add "),a("code",[e._v("swagger")]),e._v(" to its comma-delimited list.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("        - name: SPRING_PROFILES_ACTIVE\n          value: default,swagger\n")])])]),a("p",[e._v("4b. To disable the swagger UI, remove "),a("code",[e._v("swagger")]),e._v(" from the value.")]),e._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[a("p",[e._v("(Optional) Reset the deployment "),a("code",[e._v("spec.replicas")]),e._v(" back to 1.")])]),e._v(" "),a("li",[a("p",[e._v("Save the deployment to apply the change.")])])]),e._v(" "),a("h2",{attrs:{id:"how-to-find-your-client-secret"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-to-find-your-client-secret"}},[e._v("#")]),e._v(" How to find your client secret")]),e._v(" "),a("p",[e._v("You'll need your client credentials to execute the Entando APIs.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Login into your Keycloak instance")])]),e._v(" "),a("li",[a("p",[e._v("Go to "),a("code",[e._v("Administration → Clients")])])]),e._v(" "),a("li",[a("p",[e._v("Select the desired client (e.g. in a quickstart environment this is "),a("code",[e._v("quickstart-server")]),e._v(")")])]),e._v(" "),a("li",[a("p",[e._v("Click on the "),a("code",[e._v("Credentials")]),e._v(" tab to get the secret")])])]),e._v(" "),a("h2",{attrs:{id:"setup-in-local-environment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setup-in-local-environment"}},[e._v("#")]),e._v(" Setup in local environment")]),e._v(" "),a("p",[e._v("You may prefer to run a local standalone Entando application for some tasks. You'll need Java 11, maven, and Keycloak for authentication. See "),a("a",{attrs:{href:"https://github.com/entando/app-builder/blob/master/with-keycloak.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("these instructions"),a("OutboundLink")],1),e._v(" to setup a standalone Keycloak.")]),e._v(" "),a("h3",{attrs:{id:"configure-keycloak"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-keycloak"}},[e._v("#")]),e._v(" Configure Keycloak")]),e._v(" "),a("p",[e._v("Configure your Keycloak client in order to support Swagger UI. A quickstart environment has this pre-configured.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Login to your Keycloak instance")])]),e._v(" "),a("li",[a("p",[e._v("Access the Administration console")])]),e._v(" "),a("li",[a("p",[e._v("Click on "),a("code",[e._v("Clients")]),e._v(" on the left bar and select your client (e.g. "),a("code",[e._v("quickstart-server")]),e._v(")")])]),e._v(" "),a("li",[a("p",[e._v("Update the following values under "),a("code",[e._v("Settings")]),e._v(":")]),e._v(" "),a("ul",[a("li",[e._v("Set "),a("code",[e._v("Valid Redirect URIs")]),e._v(" to "),a("code",[e._v("http://localhost:[your port]/entando-de-app/*")]),e._v(" or "),a("code",[e._v("*")]),e._v(" to allow all redirect URIs.")]),e._v(" "),a("li",[e._v("Set "),a("code",[e._v("Web Origins")]),e._v(" to "),a("code",[e._v("http://localhost:[your port]")]),e._v(" or "),a("code",[e._v("*")]),e._v(" to accept all origins.")])])])]),e._v(" "),a("h3",{attrs:{id:"start-the-entando-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#start-the-entando-application"}},[e._v("#")]),e._v(" Start the Entando Application")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Clone the Entando reference application:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("git clone https://github.com/entando/entando-de-app\n")])])])]),e._v(" "),a("li",[a("p",[e._v("Start the application with the following options:")]),e._v(" "),a("ul",[a("li",[e._v("Enable the Swagger profile via "),a("code",[e._v("-Dspring.profiles.active=swagger")])]),e._v(" "),a("li",[e._v("Enable the Keycloak profile via "),a("code",[e._v("-Pkeycloak")])]),e._v(" "),a("li",[e._v("Configure the application connection to Keycloak itself. For simplicity this uses the same client credentials you'll use to try out the APIs.\n"),a("ul",[a("li",[e._v("Set "),a("code",[e._v("-Dkeycloak.auth.url")]),e._v(" to your Keycloak endpoint (including "),a("code",[e._v("/auth")]),e._v("), e.g. "),a("code",[e._v("-Dkeycloak.auth.url=http://my-keycloak-server/auth")])]),e._v(" "),a("li",[e._v("Set "),a("code",[e._v("-Dkeycloak.client.id")]),e._v(" to your client id, e.g. "),a("code",[e._v("-Dkeycloak.client.id=quickstart-server")])]),e._v(" "),a("li",[e._v("Set "),a("code",[e._v("-Dkeycloak.client.secret")]),e._v(" to your client secret, e.g. "),a("code",[e._v("-Dkeycloak.client.secret=my-secret")]),e._v(". See "),a("a",{attrs:{href:"#how-to-find-your-client-secret"}},[e._v("How to find your client secret")]),e._v(" above.")])])]),e._v(" "),a("li",[e._v("(Optional) Set"),a("code",[e._v("-Djetty.port=8085")]),e._v(" if the default port 8080 is already in use.")]),e._v(" "),a("li",[e._v("(Optional) To skip the docker steps (or if you don't have docker installed/running), add "),a("code",[e._v("-DskipDocker=true")])])]),e._v(" "),a("p",[e._v("Here's a full example:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("mvn clean package jetty:run-war -Pjetty-local -Pderby -Pkeycloak -Dspring.profiles.active=swagger -Djetty.port=8085 -Dorg.slf4j.simpleLogger.log.org.eclipse.jetty.annotations.AnnotationParser=error -Dkeycloak.auth.url=http://my-keycloak-host/auth -Dkeycloak.client.id=quickstart-server -Dkeycloak.client.secret=my-client-secret -DskipDocker=true\n")])])])]),e._v(" "),a("li",[a("p",[e._v("Wait for the application to start.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("[INFO] Started ServerConnector@1355c8be{HTTP/1.1, (http/1.1)}{0.0.0.0:8085}\n[INFO] Started @66257ms\n[INFO] Started Jetty Server\n")])])])]),e._v(" "),a("li",[a("p",[e._v("Navigate to the Swagger UI in a browser at "),a("code",[e._v("/entando-de-app/api/swagger-ui.html")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v(" http://localhost:[your port]/entando-de-app/api/swagger-ui.html\n")])])])])]),e._v(" "),a("h2",{attrs:{id:"apis-overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#apis-overview"}},[e._v("#")]),e._v(" APIs Overview")]),e._v(" "),a("p",[e._v("The Entando core exposes REST APIs for every action that can be taken in\nthe App Builder environment. For example, you can use\nthese APIs to create pages, create page templates or to add widgets to\npages. The APIs can be used to support automation, testing, or\nintegrations with external systems.")]),e._v(" "),a("h3",{attrs:{id:"api-structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-structure"}},[e._v("#")]),e._v(" API structure")]),e._v(" "),a("p",[e._v("All of the APIs share a common top level structure. Each response will\ncontain a top level entry for "),a("code",[e._v("errors")]),e._v(", "),a("code",[e._v("metadata")]),e._v(", and "),a("code",[e._v("payload")]),e._v(".")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("errors")]),e._v(" will always contain code and a message string indicating an\nerror condition in the request. The "),a("code",[e._v("metadata")]),e._v(" section is used for\npaging, sorting, filtering and data that is distinct from the body. The\nbody of each response is included in the "),a("code",[e._v("payload")]),e._v(" section of the\nresponse and varies according to each API.")]),e._v(" "),a("h3",{attrs:{id:"models"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#models"}},[e._v("#")]),e._v(" Models")]),e._v(" "),a("p",[e._v("All of the model classes returned by the Entando core are annotated so that the model definition is included in the Swagger documentation. At the bottom of the Swagger page all of the model classes returned by the API endpoints can be found.")]),e._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Access your application Swagger UI as discussed above")])]),e._v(" "),a("li",[a("p",[e._v("Click on the "),a("code",[e._v("Authorize")]),e._v(" button in the upper right corner")])]),e._v(" "),a("li",[a("p",[e._v("Enter the client id and client secret in the open window and click "),a("code",[e._v("Authorize")])])]),e._v(" "),a("li",[a("p",[e._v("If you are redirected to the Entando login page, log in with your credentials (default are "),a("code",[e._v("admin")]),e._v("/"),a("code",[e._v("adminadmin")]),e._v(")")])]),e._v(" "),a("li",[a("p",[e._v("You will be redirected to the Swagger UI page, now authenticated")])]),e._v(" "),a("li",[a("p",[e._v("Use the "),a("strong",[e._v("Try it out")]),e._v(" button on the APIs")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("Scroll to "),a("code",[e._v("widget-controller")])])]),e._v(" "),a("li",[a("p",[e._v("Select the blue GET row")])]),e._v(" "),a("li",[a("p",[e._v("Select "),a("strong",[e._v("Try it out")])])]),e._v(" "),a("li",[a("p",[e._v("Look at the results in the window. You should see a Server response with Code 200 and full response body.")])])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);