# Entando Glossary

## Entando Terms

| Term |  Description
|:--|:--
| Entando Application | An application built with the Entando Platform |
| Entando App Builder | The frontend of the Entando Platform that hosts the Entando WCMS and provides a feature-rich user interface to configure and interact with components, design and create pages, manage content, and build applications |
| Entando App Engine | The core runtime engine responsible for the primary out-of-the-box services required to develop Entando Applications; it exposes the Entando App Builder APIs, assembles and coordinates components within the Entando App Builder, and provides the data access layer to persist the page and application design |
| Entando Bundle | A packaged set of components and resources created for the Entando Platform |
| Entando CLI (ent CLI) | Entando's command line interface |
| Entando Cloud Hub | A SaaS instance of an Entando Hub that contains a public and private collection of components |
| Entando Cluster | The infrastructure Entando deploys on Kubernetes via the Entando Operator and controllers; each element is associated with a custom resource definition, if applicable |
| Entando Component Generator (ECG) | Entando's implementation of a JHipster blueprint that generates the components used to build an Entando Application via automation and templating |
| Entando Component Manager (ECM) | Provides functionality to deploy and install micro frontends and widgets using the App Builder and manages the connections between an application and the installed microservices |
| Entando Content | A structured element representing a set of information built using Entando Content Attributes and added to an Entando Application via the Entando App Builder |
| Entando Content Type | The structure of specific content, defined by a set of content attributes |
| Entando Content Attribute | The basic data that define a content type |
| Entando Content Template | The style or layout of a content type where a single content type can have multiple content models defining different ways to render the same content |
| Entando Digital Asset | An image, document, or other media file that is uniquely identifiable and stored digitally in a format supported by the Entando Platform |
| Entando Hub |  A repository (local, remote, public, or private) containing components built with the Entando Platform; A single Entando App Builder can connect to 1 or more Entando Hubs |
| Entando Identity Management System | Entando's Keycloak-based user management and authentication system |
| Entando Kubernetes integration service (entando-k8s-service) | A function of the Entando Cluster infrastructure custom resource that provides an abstraction layer between Entando microservices and the APIs exposed by Kubernetes |
| Entando Local Hub | The local component repository in an Entando App Builder representing the Entando Bundles deployed or installed in the Entando Application |
| Entando Operator | Provides installation and application lifecycle automation for Entando Applications, microservices and required infrastructure services, e.g. databases and Keycloak |
| Entando Page | A web page in an Entando Application that was created using Entando |
| Entando Page Template | The template of fields, definitions and page element organization required to render an Entando Page |
| Entando Platform | The leading open source application composition platform for development with a Kubernetes architecture |
| Entando Platform Capability (EPC) | A packaged capability that adds functionality to the platform and/or additional UX controls to the App Builder |
| Entando Plugin | A microservice that exposes APIs reusable by one or more Entando Applications |
| Entando UX Fragment | An HTML block containing Freemarker tags that allows content to be rendered dynamically according to context |
| Entando Web Content Management System (WCMS) | Entando's lightweight content and digital asset management system |
| Entando Widget | A UI element that can be dragged and dropped onto an Entando Page, e.g. a snippet of HTML code added from the browser or a micro frontend, which is a specialized widget |


## General Technical Terms

| Term |  Description
|:--|:--
| application composition platform (ACP) | Any development platform that supports the cataloging and management of composable and packaged components, where new components can be added through custom development or imported from existing assets; it governs the life cycles of both the components and the applications built from their modular assembly and deployment |
| backend for frontend (BFF) | A type of microservice dedicated to a frontend that may also act as a facade to other enterprise microservices |
| component | An application building block such as a page template, content template, UX Fragment, widget, micro frontend, microservice, etc. |
| component collection | A packaged set of single components |
| low-code | An application development platform that leverages visual interfaces equipped with basic logic and drag-and-drop capabilities to build products and processes |
| micro frontend (MFE) | A web development approach that implements an architecture characterized by a composition of compact frontend applications |
| microservice (MS) | A software development technique characterized by an architecture of loosely coupled, granular services that employ lightweight protocols |
| module | A basic element partitioned into a system of building blocks (e.g. PBCs, components, bundles, templates) that are independent, reusable, and can easily be configured into complex and useful structures |
| no-code | An application development platform that exclusively uses a visual development interface to drag and drop software components |
| pro-code | An application development platform that relies on complex programming languages to build products such as websites and software |






