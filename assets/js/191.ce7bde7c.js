(window.webpackJsonp=window.webpackJsonp||[]).push([[191],{1038:function(e,t,n){e.exports=n.p+"assets/img/entando-architecture.ea58a9e1.png"},1039:function(e,t,n){e.exports=n.p+"assets/img/entando-architecture-v1.5.7f487366.svg"},1975:function(e,t,n){"use strict";n.r(t);var a=n(36),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"entando-architecture-concepts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-architecture-concepts"}},[e._v("#")]),e._v(" Entando Architecture Concepts")]),e._v(" "),a("p",[e._v("Entando is an application composition platform that simplifies and accelerates enterprise modernization across on-prem and cloud infrastructures. It offers native support for Javascript app development, a micro frontend and microservice architecture, scalable app deployment, and automated container orchestration via Kubernetes.")]),e._v(" "),a("p",[e._v("This document explores the architecture of the Entando Platform and some notable runtime characteristics.")]),e._v(" "),a("p",[a("img",{attrs:{src:n(1038),alt:"entando-architecture"}})]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#key-entando-concepts"}},[e._v("Key Entando Concepts")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#entando-cluster-elements"}},[e._v("Entando Cluster Elements")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#entando-ingresses"}},[e._v("Entando Ingresses")])])]),e._v(" "),a("blockquote",[a("p",[e._v("Note: A portal, website, web app, or mobile app built with Entando is called an Entando Application.\nAn Entando Application is an assembly of out-of-the-box and/or custom-built components running on the\nEntando Platform. Entando components can be widgets, micro frontends, microservices, page templates, WCMS content or WCMS content types.")])]),e._v(" "),a("h2",{attrs:{id:"key-entando-concepts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#key-entando-concepts"}},[e._v("#")]),e._v(" Key Entando Concepts")]),e._v(" "),a("h3",{attrs:{id:"entando-app-builder"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-app-builder"}},[e._v("#")]),e._v(" Entando App Builder")]),e._v(" "),a("p",[e._v("The "),a("RouterLink",{attrs:{to:"/v7.1/docs/compose/app-builder.html"}},[e._v("Entando App Builder")]),e._v(" is the frontend of the Entando Platform with which an Entando Application is created and customized. It hosts the Entando WCMS and provides a feature-rich, low-code user interface to configure and interact with components, design and create pages, manage content, and build modular applications.")],1),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/tutorials/compose/widgets-fragments.html"}},[e._v("Widget Tutorial")])],1),e._v(" "),a("h3",{attrs:{id:"entando-app-engine"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-app-engine"}},[e._v("#")]),e._v(" Entando App Engine")]),e._v(" "),a("p",[e._v("The Entando App Engine is the core runtime engine responsible for the primary out-of-the-box services required to develop Entando Applications. It exposes the backend APIs used to deliver the page and content management interface of an Entando Application, assembles and coordinates components within the Entando App Builder, and provides the data access layer to persist pages and application design.")]),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/docs/consume/entando-apis.html"}},[e._v("APIs tutorial")])],1),e._v(" "),a("h3",{attrs:{id:"entando-component-generator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-component-generator"}},[e._v("#")]),e._v(" Entando Component Generator")]),e._v(" "),a("p",[e._v("The Entando Component Generator implements a "),a("a",{attrs:{href:"https://www.jhipster.tech/",target:"_blank",rel:"noopener noreferrer"}},[e._v("JHipster"),a("OutboundLink")],1),e._v(" blueprint to quickly and efficiently generate the skeleton of an Entando project using automation and templating. The generator provides advanced data modeling capabilities, including object relational mapping, and the autogeneration of micro frontends and microservices. The "),a("RouterLink",{attrs:{to:"/v7.1/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("Entando Blueprint")]),e._v(" fast-tracks development by creating the folders, files and infrastructure required by a project.")],1),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/docs/create/component-gen-tech.html"}},[e._v("Component Generation Technologies")])],1),e._v(" "),a("h3",{attrs:{id:"entando-identity-management-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-identity-management-system"}},[e._v("#")]),e._v(" Entando Identity Management System")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/v7.1/docs/consume/identity-management.html"}},[e._v("Entando Identity Management System")]),e._v(" is Entando's "),a("a",{attrs:{href:"https://www.keycloak.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Keycloak"),a("OutboundLink")],1),e._v("-based user management and authentication system. It applies Single Sign On capabilities across multiple domains to connect service providers with identity providers.")],1),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/tutorials/create/mfe/authentication.html"}},[e._v("Entando Authentication")])],1),e._v(" "),a("h3",{attrs:{id:"entando-local-hub"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-local-hub"}},[e._v("#")]),e._v(" Entando Local Hub")]),e._v(" "),a("p",[e._v("The "),a("RouterLink",{attrs:{to:"/v7.1/docs/compose/local-hub-overview.html"}},[e._v("Entando Local Hub")]),e._v(" is the component repository of an Entando App Builder. The Entando Bundles available to the Entando Application are represented and can be deployed, installed, updated or versioned using the App Builder UI.")],1),e._v(" "),a("h3",{attrs:{id:"entando-wcms"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-wcms"}},[e._v("#")]),e._v(" Entando WCMS")]),e._v(" "),a("p",[e._v("The Entando Web Content Management System (WCMS) is a lightweight content and digital asset management system. It manages widgets, HTML fragments, and other content types used in an Entando Application.")]),e._v(" "),a("p",[e._v("See also: "),a("a",{attrs:{href:"../../tutorials/compose/content-types-tutorial"}},[e._v("Content Types")]),e._v(", "),a("a",{attrs:{href:"../../tutorials/compose/content-templates-tutorial"}},[e._v("Content Templates")]),e._v(" and "),a("RouterLink",{attrs:{to:"/v7.1/tutorials/compose/digital-assets-tutorial.html"}},[e._v("Digital Assets")])],1),e._v(" "),a("h2",{attrs:{id:"entando-cluster-elements"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-cluster-elements"}},[e._v("#")]),e._v(" Entando Cluster Elements")]),e._v(" "),a("p",[e._v("The following is an overview of the elements comprising an Entando Cluster.")]),e._v(" "),a("h3",{attrs:{id:"architecture-members-of-the-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#architecture-members-of-the-cluster"}},[e._v("#")]),e._v(" Architecture - Members of the Cluster")]),e._v(" "),a("p",[e._v("Below is a diagram of an Entando Cluster and depicts how the various elements interact with one another. Entando deploys this infrastructure on Kubernetes using the Entando Operator and controllers. Each element is associated with a custom resource definition (CRD) file, if applicable.")]),e._v(" "),a("p",[a("img",{attrs:{src:n(1039),alt:"Entando Cluster Architecture Diagram"}})]),e._v(" "),a("h4",{attrs:{id:"entandoapp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entandoapp"}},[e._v("#")]),e._v(" EntandoApp")]),e._v(" "),a("p",[e._v("The EntandoApp is comprised of the Entando App Builder, the Entando App Engine and the Entando Component Manager. Keycloak-based authorization and authentication enable these to interact with each other and other cluster elements.")]),e._v(" "),a("h4",{attrs:{id:"entando-component-manager"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-component-manager"}},[e._v("#")]),e._v(" Entando Component Manager")]),e._v(" "),a("p",[e._v("The purpose of the "),a("RouterLink",{attrs:{to:"/v7.1/docs/compose/ecm-overview.html"}},[e._v("Entando Component Manager")]),e._v(" is to:")],1),e._v(" "),a("ul",[a("li",[e._v("Provide the functionality to deploy and install micro frontends and widgets")]),e._v(" "),a("li",[e._v("Manage the connections between an application and the installed microservices")])]),e._v(" "),a("p",[e._v("It integrates the Local Hub into the App Builder to list the Entando Bundles accessible from the EntandoApp, provisioning bundle management services such as install, uninstall, upgrade, downgrade and versioning. The Entando Kubernetes integration service communicates with the cluster to supply these bundle services and is the only service, other than the Entando Operator, that can interact with the cluster and custom resources.")]),e._v(" "),a("h4",{attrs:{id:"entando-kubernetes-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-kubernetes-service"}},[e._v("#")]),e._v(" Entando Kubernetes Service")]),e._v(" "),a("p",[e._v("The Entando Kubernetes integration service ("),a("code",[e._v("entando-k8s-service")]),e._v(") is a function of the Entando Cluster infrastructure custom resource, providing an abstraction layer between Entando microservices and the APIs exposed by Kubernetes. It supplies access points to several custom resources defined by Entando, in particular Entando Applications, Entando Plugins, Entando Bundles and Entando links.")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("entando-k8s-service")]),e._v(" is used to:")]),e._v(" "),a("ul",[a("li",[e._v("Provide a list of the available Entando Bundles to the Entando Component Manager")]),e._v(" "),a("li",[e._v("Deploy a microservice, or expose an already available microservice, during the installation of a bundle")]),e._v(" "),a("li",[e._v("Create a link between an EntandoApp and an EntandoPlugin to expose microservice APIs to the EntandoApp and micro frontends")])]),e._v(" "),a("h4",{attrs:{id:"entando-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-bundle"}},[e._v("#")]),e._v(" Entando Bundle")]),e._v(" "),a("p",[e._v("An Entando Bundle is a packaged set of components and resources created for the Entando Platform. The Entando Component Manager identifies the bundles and can install their components to extend the functionality of an Entando Application.")]),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/docs/compose/local-hub-overview.html"}},[e._v("Local Hub Overview")])],1),e._v(" "),a("h4",{attrs:{id:"entando-plugin"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-plugin"}},[e._v("#")]),e._v(" Entando Plugin")]),e._v(" "),a("p",[e._v("An Entando Plugin is a microservice that exposes APIs reusable by one or more Entando Applications. Plugin services are commonly accessible from micro frontends and can be quickly generated with the "),a("RouterLink",{attrs:{to:"/v7.1/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("Entando Blueprint")]),e._v(". A blueprint-generated project can be used as-is in an Entando environment and provides Keycloak integration, a set of default micro frontends, and microservices exposed by the bundle.")],1),e._v(" "),a("h4",{attrs:{id:"keycloak"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keycloak"}},[e._v("#")]),e._v(" Keycloak")]),e._v(" "),a("p",[e._v("Keycloak is responsible for authorization and authentication on Entando. All members of an Entando Cluster interact with Keycloak to verify user and service authorization.")]),e._v(" "),a("h2",{attrs:{id:"entando-ingresses"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-ingresses"}},[e._v("#")]),e._v(" Entando Ingresses")]),e._v(" "),a("p",[e._v("An ingress is a Kubernetes resource that exposes HTTP and HTTPS paths from outside an Entando Cluster to services within it. Traffic routing is controlled by rules defined on the ingress resource.")]),e._v(" "),a("p",[e._v("When deploying a cluster, ingresses are generated for the resources that must be exposed to external services. The Entando Operator and custom resource controllers create the ingresses and set the correct paths and certificates. Entando implements Keycloak and EntandoApp ingresses.")]),e._v(" "),a("h4",{attrs:{id:"keycloak-ingress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keycloak-ingress"}},[e._v("#")]),e._v(" Keycloak Ingress")]),e._v(" "),a("p",[e._v("A dedicated ingress is created for Keycloak to expose authentication and authorization functionalities. This is required to guarantee that both token issuing and validation work correctly, even when the services using the Keycloak instance are in different namespaces.")]),e._v(" "),a("h4",{attrs:{id:"entandoapp-ingress"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entandoapp-ingress"}},[e._v("#")]),e._v(" EntandoApp Ingress")]),e._v(" "),a("p",[e._v("The EntandoApp ingress is automatically created to expose the App Builder, App Engine and Component Manager. The three containers are served under the same domain, which allows them to interact without cross-origin issues.")]),e._v(" "),a("p",[e._v("The EntandoApp ingress is also used to link a microservice with an EntandoApp when a bundle containing the microservice is installed via the Local Hub.")]),e._v(" "),a("h3",{attrs:{id:"default-ingress-http-paths"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#default-ingress-http-paths"}},[e._v("#")]),e._v(" Default Ingress HTTP Paths")]),e._v(" "),a("p",[e._v("The table below lists the default paths exposed for each ingress.\n"),a("table",[a("colgroup",[a("col",{attrs:{width:"50%"}}),e._v(" "),a("col",{attrs:{width:"50%"}})]),e._v(" "),a("thead",[a("tr",{staticClass:"header"},[a("th",{attrs:{align:"left"}},[e._v("Ingress")]),e._v(" "),a("th",{attrs:{align:"left"}},[e._v("Ingress Http route")]),e._v(" "),a("th",{attrs:{align:"left"}},[e._v("Application")])])]),e._v(" "),a("tbody",[a("tr",{staticClass:"odd"},[a("td",{attrs:{align:"left"}},[a("p",[e._v("Keycloak ingress")])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[a("code",[e._v("/auth")])])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[e._v("Keycloak")])])]),e._v(" "),a("tr",{staticClass:"odd"},[a("td",{attrs:{align:"left",rowspan:"4"}},[a("p",[e._v("EntandoApp ingress")])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[a("code",[e._v("/entando-de-app")])])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[e._v("App Engine")])])]),e._v(" "),a("tr",{staticClass:"even"},[a("td",{attrs:{align:"left"}},[a("p",[a("code",[e._v("/app-builder/")])])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[e._v("App Builder")])])]),e._v(" "),a("tr",{staticClass:"odd"},[a("td",{attrs:{align:"left"}},[a("p",[a("code",[e._v("/digital-exchange")])])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[e._v("Entando Component Manager")])])]),e._v(" "),a("tr",{staticClass:"even"},[a("td",{attrs:{align:"left"}},[a("p",[a("code",[e._v("/plugin-ingressPath")])])]),e._v(" "),a("td",{attrs:{align:"left"}},[a("p",[e._v("Entando Plugin linked to the application")])])])])])]),e._v(" "),a("blockquote",[a("p",[e._v("Note: The Entando Plugin variable "),a("code",[e._v("ingressPath")]),e._v(" is defined in the plugin custom resource under the "),a("code",[e._v("spec")]),e._v(" element and used to expose the plugin within the EntandoApp domain. See also: "),a("RouterLink",{attrs:{to:"/v7.1/docs/curate/bundle-details.html#microservices-specifications"}},[e._v("Microservice Specifications")]),e._v(".")],1)]),e._v(" "),a("h3",{attrs:{id:"exposing-microservices-in-the-entandoapp-domain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#exposing-microservices-in-the-entandoapp-domain"}},[e._v("#")]),e._v(" Exposing Microservices in the EntandoApp Domain")]),e._v(" "),a("p",[e._v("A microservice under the same domain (ingress) as the EntandoApp is exposed using the "),a("code",[e._v("EntandoAppPluginLink")]),e._v(" custom resource and the corresponding controller.")]),e._v(" "),a("p",[e._v("Once the link between the EntandoApp and the microservice is created, the controller reads the link specification. It then automatically creates HTTP paths in the EntandoApp to expose the microservice in the same domain as the App Builder, App Engine and Component Manager. This allows micro frontend developers to reference the microservice using relative URLs.")]),e._v(" "),a("p",[e._v("See also: "),a("RouterLink",{attrs:{to:"/v7.1/docs/reference/deployment-structure.html"}},[e._v("Entando Deployment Structure")]),e._v(" and "),a("RouterLink",{attrs:{to:"/v7.1/docs/reference/check-ingress.html"}},[e._v("Check Ingresses")])],1)])}),[],!1,null,null,null);t.default=o.exports}}]);