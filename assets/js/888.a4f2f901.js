(window.webpackJsonp=window.webpackJsonp||[]).push([[888],{2253:function(e,t,a){"use strict";a.r(t);var n=a(36),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"run-blueprint-generated-microservices-and-micro-frontends-in-dev-mode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-blueprint-generated-microservices-and-micro-frontends-in-dev-mode"}},[e._v("#")]),e._v(" Run Blueprint-generated Microservices and Micro Frontends in Dev Mode")]),e._v(" "),a("p",[e._v("This tutorial guides you through running an Entando project with microservices and micro frontends in a local development environment. It is specific to a project generated with the Entando JHipster Blueprint, converted to a docker-based bundle.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/v7.3/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("Generate Microservices and Micro Frontends")]),e._v(" tutorial")],1),e._v(" "),a("li",[e._v("Verify dependencies with the Entando CLI: "),a("code",[e._v("ent check-env develop")])])]),e._v(" "),a("h2",{attrs:{id:"start-keycloak-and-microservice"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#start-keycloak-and-microservice"}},[e._v("#")]),e._v(" Start Keycloak and Microservice")]),e._v(" "),a("p",[e._v("The following steps utilize the ent bundle CLI.")]),e._v(" "),a("ol",[a("li",[e._v("From the project root directory, start up Keycloak. This uses Docker Compose to run Keycloak in the background until you end the process with "),a("code",[e._v("ent bundle svc stop keycloak")]),e._v(". You can view the logs with "),a("code",[e._v("ent bundle svc logs keycloak")]),e._v(".")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent bundle svc start keycloak\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Start up the Spring Boot application "),a("code",[e._v("conference-ms")]),e._v(". The logs will display in the console and you can stop the application with "),a("code",[e._v("Ctrl+C")]),e._v(". Keep the microservice running while the MFEs are run.")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent bundle run conference-ms\n")])])]),a("p",[e._v("To check that the MS is working, go to "),a("code",[e._v("http://localhost:8081/")]),e._v(". In local development, the run command can be used to modify the port number so multiple microservices can run parallel on different ports, but in production, microservices must run on port 8081.")]),e._v(" "),a("blockquote",[a("ol",[a("li",[e._v('If you want to reset the conference-ms data, and you selected "H2 with disk-based persistence" during microservice generation, you can delete the target folder, restart the microservice, and the data will be regenerated.')]),e._v(" "),a("li",[e._v("The "),a("code",[e._v("serviceUrl")]),e._v(" variable is the microservice API URL.")])])]),e._v(" "),a("h2",{attrs:{id:"start-the-micro-frontends"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#start-the-micro-frontends"}},[e._v("#")]),e._v(" Start the Micro Frontends")]),e._v(" "),a("h3",{attrs:{id:"run-the-conference-table-mfe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-the-conference-table-mfe"}},[e._v("#")]),e._v(" Run the conference-table MFE")]),e._v(" "),a("ol",[a("li",[e._v("From another shell, start the conference-table micro frontend from the project root directory. This command runs React in development mode, so any changes you make to the source files should be immediately seen in the browser.")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent bundle run conference-table\n")])])]),a("p",[e._v("If you are not logged in, you'll be redirected to do so. Log in using the following credentials.")]),e._v(" "),a("ul",[a("li",[e._v("Username: user")]),e._v(" "),a("li",[e._v("Password: user"),a("br"),e._v("\nOnce logged in, you will see the table widget with a sampling of generated data.")])]),e._v(" "),a("h3",{attrs:{id:"run-the-conference-form-mfe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-the-conference-form-mfe"}},[e._v("#")]),e._v(" Run the conference-form MFE")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("If you are still running the previous micro frontend, click "),a("code",[e._v("Ctrl+C")]),e._v(" to end the process")])]),e._v(" "),a("li",[a("p",[e._v("Start up the conference-form MFE")])])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent bundle run conference-form\n")])])]),a("p",[e._v("The form to enter the name and location for conferences should open in your browser. You may enter and save new data to see it in the other MFEs.")]),e._v(" "),a("blockquote",[a("p",[e._v("If you want to modify a different row in the database, edit the "),a("code",[e._v("microfrontends/conference-form/public/index.html")]),e._v(" file. Change the "),a("code",[e._v("id")]),e._v(" attribute in this line:")])]),e._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[e._v("   "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("conference-form")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("/>")])]),e._v("\n")])])]),a("h3",{attrs:{id:"run-the-conference-details-mfe"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-the-conference-details-mfe"}},[e._v("#")]),e._v(" Run the conference-details MFE")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("If you are running the previous micro frontend, click "),a("code",[e._v("Ctrl+C")]),e._v(" to end the process")])]),e._v(" "),a("li",[a("p",[e._v("Start the conference-details MFE")])])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("ent bundle run conference-details\n")])])]),a("p",[e._v("When the run is complete, you should see the details MFE showing the information for the Conference with ID 1.")]),e._v(" "),a("blockquote",[a("p",[e._v("If you want to modify a different row in the database, edit "),a("code",[e._v("microfrontends/conference-details/public/index.html")]),e._v(" file. Change the "),a("code",[e._v("id")]),e._v(" attribute in this line:")])]),e._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[e._v("    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("conference-details")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[e._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')]),e._v("1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v('"')])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("/>")])]),e._v("\n")])])]),a("h3",{attrs:{id:"keycloak-settings-and-issues"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keycloak-settings-and-issues"}},[e._v("#")]),e._v(" Keycloak Settings and Issues")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Change Development Settings")]),e._v(" "),a("p",[e._v("If you want to use another Keycloak installation, modify the reference in the Keycloak YAML file located in the "),a("code",[e._v("svc/")]),e._v(" folder.")])]),e._v(" "),a("li",[a("p",[e._v("In this blueprint-generated project, Docker Compose persists Keycloak data across restarts by default. If you want your data to reset on restarts:")]),e._v(" "),a("ul",[a("li",[e._v("Edit the "),a("code",[e._v("svc/keycloak.yml")]),e._v(" file."),a("br"),e._v("\nReplace "),a("code",[e._v("'-Dkeycloak.migration.strategy=IGNORE_EXISTING',")]),e._v(" with the following:")])]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[e._v("'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("Dkeycloak.migration.strategy=OVERWRITE_EXISTING'"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n")])])]),a("ul",[a("li",[e._v("In the same file, remove this persistent volume statement under "),a("code",[e._v("volumes")]),e._v(":")])]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" ./keycloak"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("/opt/jboss/keycloak/standalone/data\n")])])]),a("ul",[a("li",[e._v("Keycloak should now reset every time you restart.")])])]),e._v(" "),a("li",[a("p",[e._v("Error "),a("code",[e._v("User is not authenticated")]),e._v(" : If you see this message after starting the MFEs, it is likely that your Keycloak application is not running or the "),a("code",[e._v(".env.local")]),e._v(" file is not configured properly. Check if Keycloak is running; otherwise, update the configuration in "),a("code",[e._v("microservice/conference-x/.env.local")]),e._v(".")])])])])}),[],!1,null,null,null);t.default=s.exports}}]);