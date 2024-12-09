(window.webpackJsonp=window.webpackJsonp||[]).push([[887],{2266:function(e,t,n){"use strict";n.r(t);var o=n(36),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"generate-microservices-and-micro-frontends"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#generate-microservices-and-micro-frontends"}},[e._v("#")]),e._v(" Generate Microservices and Micro Frontends")]),e._v(" "),n("h2",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("This tutorial describes how to use the Entando Component Generator (ECG) to create microservices and micro frontends for deployment to the "),n("RouterLink",{attrs:{to:"/v7.3/docs/compose/local-hub-overview.html"}},[e._v("Local Hub")]),e._v(" of an Entando Application or a shared "),n("RouterLink",{attrs:{to:"/v7.3/tutorials/solution/entando-hub.html"}},[e._v("Entando Hub")]),e._v(". The ECG is powered by "),n("a",{attrs:{href:"https://www.jhipster.tech/",target:"_blank",rel:"noopener noreferrer"}},[e._v("JHipster"),n("OutboundLink")],1),e._v(" and leverages the Entando Blueprint.")],1),e._v(" "),n("p",[e._v("The output of this tutorial is "),n("RouterLink",{attrs:{to:"/v7.3/docs/curate/bundle-details.html#bundle-development-process"}},[e._v("a new bundle project")]),e._v(" with several components:")],1),e._v(" "),n("ul",[n("li",[e._v("A Spring Boot microservice with CRUD operations for a single database entity")]),e._v(" "),n("li",[e._v("Three React micro frontends for displaying and managing the entity")])]),e._v(" "),n("h2",{attrs:{id:"prerequisites"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),n("ul",[n("li",[n("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/"}},[e._v("A working instance of Entando")])],1),e._v(" "),n("li",[e._v("Verify dependencies with the "),n("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/entando-cli.html#check-the-environment"}},[e._v("Entando CLI")]),e._v(": "),n("code",[e._v("ent check-env develop")])],1)]),e._v(" "),n("h2",{attrs:{id:"set-up-a-new-bundle-project"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#set-up-a-new-bundle-project"}},[e._v("#")]),e._v(" Set Up a New Bundle Project")]),e._v(" "),n("ol",[n("li",[e._v("Create a new bundle project directory. This will add a simple "),n("code",[e._v("entando.json")]),e._v(" descriptor as a starting point.")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent bundle init YOUR-PROJECT-NAME\n")])])]),n("h2",{attrs:{id:"generate-the-components"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#generate-the-components"}},[e._v("#")]),e._v(" Generate the Components")]),e._v(" "),n("ol",[n("li",[e._v("From the project directory, use the Entando CLI to add a basic microservice configuration to the project:")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" YOUR-PROJECT-NAME\nent bundle ms "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-ms --stack"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("spring-boot\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[e._v("From the "),n("code",[e._v("conference-ms")]),e._v(" directory, use the Entando Blueprint (powered by JHipster) to generate the "),n("code",[e._v("conference-ms")]),e._v(" microservice:")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" microservices/conference-ms\nent jhipster --blueprints entando\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[n("p",[e._v("You'll be presented with a series of prompts pertaining to service generation. These are echoed below, with the base values for this tutorial in parentheses. Insert the corresponding entry as identified below. Note that the "),n("code",[e._v("Enter")]),e._v(" key will select the default option.")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("Please provide the project name:")]),e._v(" (Up to you)")]),e._v(" "),n("li",[n("code",[e._v("What is the base name of your application?")]),e._v(" (Up to you)\n- The base name cannot contain special characters or a blank space")]),e._v(" "),n("li",[n("code",[e._v("As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.")]),e._v(" (8081)")]),e._v(" "),n("li",[n("code",[e._v("What is your default Java package name?")]),e._v(" (Up to you)")]),e._v(" "),n("li",[n("code",[e._v("Which *type* of database would you like to use?")]),e._v(" (SQL)\n- If no database is selected you'll be building a stateless microservice, which is a valid choice, but the rest of this tutorial won't work.")]),e._v(" "),n("li",[n("code",[e._v("Which *production* database would you like to use?")]),e._v(" (PostgreSQL)")]),e._v(" "),n("li",[n("code",[e._v("Which *development* database would you like to use?")]),e._v(" (H2 with disk-based persistence)")]),e._v(" "),n("li",[n("code",[e._v("Which cache do you want to use? (Spring cache abstraction)")]),e._v(" (Caffeine (local cache, for a single node))")]),e._v(" "),n("li",[n("code",[e._v("Do you want to use Hibernate 2nd level cache?")]),e._v(" (Yes)")]),e._v(" "),n("li",[n("code",[e._v("Which other technologies would you like to use?")]),e._v(" (Don't select any other technologies)")]),e._v(" "),n("li",[n("code",[e._v("Which BE dependencies do you want to use?")]),e._v(" (Dependencies maintained by Entando (entando/entando-bundle-bom))")]),e._v(" "),n("li",[n("code",[e._v("Would you like to generate micro frontends when creating entities?")]),e._v(" (Always)")]),e._v(" "),n("li",[n("code",[e._v("Would you like to enable internationalization support")]),e._v(" (Up to you)")]),e._v(" "),n("li",[n("code",[e._v("Please choose the native language of the application")]),e._v(" (Up to you)")]),e._v(" "),n("li",[n("code",[e._v("Besides JUnit and Jest, which testing frameworks would you like to use?")]),e._v(" (Up to you)")]),e._v(" "),n("li",[n("code",[e._v("Would you like to install other generators from the JHipster Marketplace?")]),e._v(" (No)")])])]),e._v(" "),n("li",[n("p",[e._v('Enter "Yes" when prompted with the following overwrite to resolve the conflict:')])])]),e._v(" "),n("p",[n("code",[e._v("Overwrite .gitignore?")])]),e._v(" "),n("ol",{attrs:{start:"5"}},[n("li",[e._v("Add an Entity to your microservice and create the corresponding micro frontends. In this tutorial, "),n("code",[e._v("Conference")]),e._v(" is the name of the entity that will be added to the application.")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent jhipster entity Conference\n")])])]),n("ol",{attrs:{start:"6"}},[n("li",[n("p",[e._v("You'll be presented with a series of prompts to add fields to your entity. These are echoed below, with the base values for this tutorial in parentheses. Input your preferences, and note that the "),n("code",[e._v("Enter")]),e._v(" key will select the default option.")]),e._v(" "),n("ul",[n("li",[n("p",[n("code",[e._v("Do you want to add a field to your entity?")]),e._v(" (Yes)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("What is the name of your field?")]),e._v(" (name)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("What is the type of your field?")]),e._v(" (String)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add validation rules to your field?")]),e._v(" (No)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add a field to your entity?")]),e._v(" (Yes)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("What is the name of your field?")]),e._v(" (location)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("What is the type of your field?")]),e._v(" (String)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add validation rules to your field?")]),e._v(" (No)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add a field to your entity?")]),e._v(" (No)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add a relationship to another entity?")]),e._v(" (No)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to use separate service class for your business logic?")]),e._v(" (Up to you)")]),e._v(" "),n("ul",[n("li",[n("p",[e._v('If "yes":')])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to use a Data Transfer Object (DTO)?")]),e._v(" (Up to you)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want to add filtering?")]),e._v(" (Up to you)")])])])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Is this entity read-only?")]),e._v(" (Up to you)")])]),e._v(" "),n("li",[n("p",[n("code",[e._v("Do you want pagination and sorting on your entity?")]),e._v(" (Yes, with infinite scroll)")])]),e._v(" "),n("li",[n("p",[e._v("(If you chose to be prompted to generate micro frontends) "),n("code",[e._v("Do you want to generate micro frontends?")]),e._v(" (Up to you)")])])])]),e._v(" "),n("li",[n("p",[e._v("Affirm each overwrite prompt to resolve conflicts as the Blueprint generates controllers, repositories, services and micro frontends for your entity. "),n("strong",[e._v('Note: Enter "a" to the initial prompt to authorize changes to all the updated files.')])]),e._v(" "),n("ul",[n("li",[n("code",[e._v("Overwrite package.json?")])])])])]),e._v(" "),n("p",[e._v("You have now generated a Spring Boot microservice with database integration and React-based micro frontends.")]),e._v(" "),n("h3",{attrs:{id:"output"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#output"}},[e._v("#")]),e._v(" Output")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("/src/main/java")]),e._v(" and "),n("code",[e._v("src/main/resources")]),e._v(" contain the microservice codebase and configuration.")]),e._v(" "),n("li",[n("code",[e._v("/ui")]),e._v(" holds the React-based micro frontends. By default, JHipster generates 3 MFEs per entity to contain the details, form, and table.")]),e._v(" "),n("li",[n("code",[e._v("/src/main/docker")]),e._v(" contains Docker files to help with local development environments.")])]),e._v(" "),n("h2",{attrs:{id:"configure-the-components"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-components"}},[e._v("#")]),e._v(" Configure the Components")]),e._v(" "),n("ol",[n("li",[e._v("From the root directory of the project, edit the "),n("code",[e._v("entando.json")]),e._v(" file and update "),n("code",[e._v("microservices/conference-ms")]),e._v(" to set the "),n("code",[e._v("healthCheckPath")]),e._v(",  "),n("code",[e._v("dbms")]),e._v(", and configure the pack command to select the "),n("code",[e._v("prod")]),e._v(" profile:")])]),e._v(" "),n("div",{staticClass:"language-json extra-class"},[n("pre",{pre:!0,attrs:{class:"language-json"}},[n("code",[e._v("   "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"healthCheckPath"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/management/health"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n   "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"dbms"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"postgresql"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n   "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"commands"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n       "),n("span",{pre:!0,attrs:{class:"token property"}},[e._v('"pack"')]),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[e._v('"mvn clean package -DskipTests -Pprod"')]),e._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[e._v("Move the generated "),n("code",[e._v("conference-table")]),e._v(" MFE into the "),n("code",[e._v("microfrontends")]),e._v(" directory in the bundle project. If you chose a different entity name, you'll need to adjust these commands accordingly.")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent bundle mfe "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-table\n"),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("mv")]),e._v(" microservices/conference-ms/ui/widgets/conference/tableWidget/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(".,"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("* microfrontends/conference-table\n")])])]),n("blockquote",[n("p",[e._v('Note: In some shells (e.g. zsh), you may receive an "invalid argument" warning that can be ignored as long as the folders are relocated correctly.')])]),e._v(" "),n("ol",{attrs:{start:"3"}},[n("li",[e._v("Now add an API claim to connect the "),n("code",[e._v("conference-table")]),e._v(" MFE to the "),n("code",[e._v("conference-ms")]),e._v(" microservice. The connection information is stored in "),n("code",[e._v("entando.json")]),e._v(".")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent bundle api "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-table conference-api --serviceName"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("conference-ms --serviceUrl"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("http://localhost:8081\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[n("p",[e._v("Repeat the previous steps for the "),n("code",[e._v("conference-details")]),e._v(" and "),n("code",[e._v("conference-form")]),e._v(" MFEs:")]),e._v(" "),n("p",[e._v("a. Add the MFEs:")]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent bundle mfe "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-details\nent bundle mfe "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-form\n")])])]),n("p",[e._v("b. Relocate the folders:")]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[e._v("mv")]),e._v(" microservices/conference-ms/ui/widgets/conference/detailsWidget/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(".,"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("* microfrontends/conference-details\n"),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("mv")]),e._v(" microservices/conference-ms/ui/widgets/conference/formWidget/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(".,"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("* microfrontends/conference-form\n")])])]),n("p",[e._v("c. Add the API claims:")]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[e._v("ent bundle api "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-details conference-api --serviceName"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("conference-ms --serviceUrl"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("http://localhost:8081\nent bundle api "),n("span",{pre:!0,attrs:{class:"token function"}},[e._v("add")]),e._v(" conference-form conference-api --serviceName"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("conference-ms --serviceUrl"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("http://localhost:8081\n")])])])]),e._v(" "),n("li",[n("p",[e._v("For local development and testing, a custom command is needed in the "),n("code",[e._v("entando.json")]),e._v(" to use a different port for each MFE as shown below:")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('    "microfrontends": [\n        {\n            "name": "conference-table",\n            "customElement": "conference-table",\n            "stack": "react",\n            "type": "widget",\n            "group": "free",\n            "publicFolder": "public",\n            "titles": {\n                "en": "conference-table",\n                "it": "conference-table"\n            },\n            "commands": {\n                "run": "npm install && PORT=3000 npm start"\n            },\n            "apiClaims": [\n                {\n                    "name": "conference-api",\n                    "type": "internal",\n                    "serviceName": "conference-ms"\n                }\n            ]\n        },\n        {\n            "name": "conference-details",\n            "customElement": "conference-details",\n            "stack": "react",\n            "type": "widget",\n            "group": "free",\n            "publicFolder": "public",\n            "titles": {\n                "en": "conference-details",\n                "it": "conference-details"\n            },\n            "commands": {\n                "run": "npm install && PORT=3001 npm start"\n            },\n            "apiClaims": [\n                {\n                    "name": "conference-api",\n                    "type": "internal",\n                    "serviceName": "conference-ms"\n                }\n            ]\n        },\n        {\n            "name": "conference-form",\n            "customElement": "conference-form",\n            "stack": "react",\n            "type": "widget",\n            "group": "free",\n            "publicFolder": "public",\n            "titles": {\n                "en": "conference-form",\n                "it": "conference-form"\n            },\n            "commands": {\n                "run": "npm install && PORT=3002 npm start"\n            },\n            "apiClaims": [\n                {\n                    "name": "conference-api",\n                    "type": "internal",\n                    "serviceName": "conference-ms"\n                }\n            ]\n        }\n    ],\n')])])]),n("ol",{attrs:{start:"6"}},[n("li",[e._v("Finally, move the Blueprint-provided auxiliary service definitions into the "),n("code",[e._v("svc")]),e._v(" directory in the bundle project and enable the "),n("code",[e._v("keycloak")]),e._v(" service for local testing:")])]),e._v(" "),n("div",{staticClass:"language-shell extra-class"},[n("pre",{pre:!0,attrs:{class:"language-shell"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[e._v("mv")]),e._v(" microservices/conference-ms/src/main/docker/* svc/\nent bundle svc "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("enable")]),e._v(" keycloak\n")])])]),n("h2",{attrs:{id:"next-steps"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#next-steps"}},[e._v("#")]),e._v(" Next Steps")]),e._v(" "),n("p",[e._v("Follow one of the links below to run the bundle components locally, or build and publish the bundle into an Entando Application:")]),e._v(" "),n("ul",[n("li",[n("RouterLink",{attrs:{to:"/v7.3/tutorials/create/ms/run-local.html"}},[e._v("Run Blueprint-generated components locally in dev mode")])],1),e._v(" "),n("li",[n("RouterLink",{attrs:{to:"/v7.3/tutorials/create/pb/publish-project-bundle.html"}},[e._v("Build and publish a project bundle")]),e._v(" to deploy your microservice and micro frontends to Entando")],1),e._v(" "),n("li",[e._v("Explore the benefits and features of "),n("RouterLink",{attrs:{to:"/v7.3/docs/create/blueprint-features.html"}},[e._v("the Entando Blueprint")])],1),e._v(" "),n("li",[n("RouterLink",{attrs:{to:"/v7.3/tutorials/create/ms/update-data-model.html"}},[e._v("Iterate on your data model")]),e._v(" using the JHipster Domain Language (JDL)")],1)])])}),[],!1,null,null,null);t.default=a.exports}}]);