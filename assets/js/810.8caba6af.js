(window.webpackJsonp=window.webpackJsonp||[]).push([[810],{2136:function(t,a,e){"use strict";e.r(a);var s=e(36),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"create-a-spring-boot-microservice"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-spring-boot-microservice"}},[t._v("#")]),t._v(" Create a Spring Boot Microservice")]),t._v(" "),e("p",[t._v("This tutorial uses the Spring Initializr to create a simple microservice to quickly generate an Entando bundle project.")]),t._v(" "),e("h2",{attrs:{id:"prerequisites"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/v7.2/docs/getting-started/"}},[t._v("A working instance of Entando")])],1),t._v(" "),e("li",[t._v("Verify dependencies with the "),e("RouterLink",{attrs:{to:"/v7.2/docs/getting-started/entando-cli.html#check-the-environment"}},[t._v("Entando CLI")]),t._v(": "),e("code",[t._v("ent check-env develop")])],1)]),t._v(" "),e("h2",{attrs:{id:"step-1-initialize-the-bundle-with-a-microservice"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-1-initialize-the-bundle-with-a-microservice"}},[t._v("#")]),t._v(" Step 1: Initialize the Bundle with a Microservice")]),t._v(" "),e("ol",[e("li",[t._v("Initialize a new bundle:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ent bundle init your-spring-project\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("From the bundle project root directory, create a new microservice:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("cd your-spring-project\nent bundle ms add spring-ms\n")])])]),e("h2",{attrs:{id:"step-2-create-the-microservice"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-2-create-the-microservice"}},[t._v("#")]),t._v(" Step 2: Create the Microservice")]),t._v(" "),e("ol",[e("li",[t._v("At the Spring Initializr page, "),e("a",{attrs:{href:"http://start.spring.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("start.spring.io"),e("OutboundLink")],1),t._v(", create a project with the following configuration:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("\tProject=Maven\n\tLanguage=Java\n\tSpring Boot version=2.7.14\n\tGroup=com.entando.example\n\tArtifact=spring-ms \n\tName=spring-ms \n\tDescription=Demo project for Spring Boot\n\tPackage name=com.entando.example.spring-ms\n\tPackaging=Jar\n\tJava=11\n\tDependencies:\n\t             #under WEB: Spring Web \n\t             #under OPS: Spring Boot Actuator\n")])])]),e("p",[t._v("Click generate.")]),t._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[e("p",[t._v("Unzip the package and move the unzipped files and "),e("code",[t._v("src")]),t._v(" directory to the "),e("code",[t._v("microservices/spring-ms/")]),t._v(" directory.")])]),t._v(" "),e("li",[e("p",[t._v("Create a new directory for the controller:")])])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("mkdir microservices/spring-ms/src/main/java/com/entando/example/springms/controller\n")])])]),e("ol",{attrs:{start:"4"}},[e("li",[t._v("In the controller directory, create "),e("code",[t._v("TemplateController.java")]),t._v(" with the following code:")])]),t._v(" "),e("div",{staticClass:"language-java extra-class"},[e("pre",{pre:!0,attrs:{class:"language-java"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("com"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("entando"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("example"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("springms"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("controller")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token namespace"}},[t._v("org"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("springframework"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("web"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("bind"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotation"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")])]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@RestController")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TemplateController")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n         "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@CrossOrigin")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api/example"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n         "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyResponse")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getExample")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyResponse")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test Data"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n         "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyResponse")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n                 "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("final")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n                 "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyResponse")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("payload "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n                 "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("getPayload")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" payload"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n         "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ol",{attrs:{start:"5"}},[e("li",[t._v("To make the microservice compatible with Entando, add the following snippet to the "),e("code",[t._v("microservices/spring-ms/src/main/resources/application.properties")]),t._v(" file:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("server.port=8081\nmanagement.endpoints.web.base-path=/api\n")])])]),e("ol",{attrs:{start:"6"}},[e("li",[t._v("Run the microservice from the bundle project root directory to test that it works:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ent bundle run spring-ms\n")])])]),e("ul",[e("li",[t._v("In your browser, access "),e("a",{attrs:{href:"http://localhost:8081/api/example",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:8081/api/example"),e("OutboundLink")],1),t._v(" to see "),e("code",[t._v('{"payload":"test Data"}')]),t._v(".")]),t._v(" "),e("li",[t._v("Then, access "),e("a",{attrs:{href:"http://localhost:8081/api/health",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://localhost:8081/api/health"),e("OutboundLink")],1),t._v(" to see "),e("code",[t._v('{"status":"UP"}')]),t._v(".\nIn local development, the run command can be used to modify the ports to run multiple microservices, but in production, microservices must run on port 8081.")])]),t._v(" "),e("ol",{attrs:{start:"7"}},[e("li",[t._v("Create "),e("code",[t._v("microservices/spring-ms/Dockerfile")]),t._v(" so ent knows how to assemble the Docker image for the service:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('FROM openjdk:11\nWORKDIR /app\nCOPY target/*.jar /app/app.jar\nCMD ["java", "-jar", "app.jar"]\nEXPOSE 8081\n')])])]),e("h2",{attrs:{id:"step-3-build-and-install-the-bundle"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-3-build-and-install-the-bundle"}},[t._v("#")]),t._v(" Step 3: Build and Install the Bundle")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("Optionally, add an image file in PNG or JPG format named "),e("code",[t._v("thumbnail")]),t._v(" for the project.")])]),t._v(" "),e("li",[e("p",[t._v("To install your bundle, execute the following commands:")])])]),t._v(" "),e("EntandoInstallBundle"),t._v(" "),e("ol",{attrs:{start:"3"}},[e("li",[t._v("Test your Spring Boot microservice:")])]),t._v(" "),e("ul",[e("li",[t._v("Retrieve "),e("code",[t._v("YOUR-HOST-NAME")]),t._v(" and "),e("code",[t._v("YOUR-MS-PATH")]),t._v(" with this command:")])]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("ent kubectl describe ingress\n")])])]),e("p",[e("code",[t._v("YOUR-MS-PATH")]),t._v(" is listed under "),e("code",[t._v("path")]),t._v(" and should be similar to this:")]),t._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[t._v("/your-spring-project-83fbf4bf/spring-ms\n")])])]),e("ul",[e("li",[t._v("Using your values, go to\n"),e("code",[t._v("YOUR-HOST-NAME")]),t._v("/"),e("code",[t._v("YOUR-MS-PATH")]),t._v("/api/example/ in your browser. It should return "),e("code",[t._v('{"payload":"test Data"}')]),t._v(".")])]),t._v(" "),e("p",[t._v("E.g., for a quickstart project,"),e("br"),t._v("\nURL=\nhttp://quickstart.192.168.64.34.nip.io/your-spring-project-83fbf4bf/spring-ms/api/example/")]),t._v(" "),e("p",[e("strong",[t._v("Next Steps")])]),t._v(" "),e("ul",[e("li",[t._v("Learn to connect micro frontends to microservices by "),e("RouterLink",{attrs:{to:"/v7.2/tutorials/create/ms/add-api-claim.html"}},[t._v("adding an API Claim")]),t._v(".")],1),t._v(" "),e("li",[t._v("Add a "),e("RouterLink",{attrs:{to:"/v7.2/tutorials/create/mfe/widget-configuration.html"}},[t._v("configuration micro frontend")]),t._v(" to your bundle project.")],1)])],1)}),[],!1,null,null,null);a.default=n.exports}}]);