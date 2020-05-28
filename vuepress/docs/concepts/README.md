# Overview
A portal, website, web app, or mobile app built with Entando is called an Entando application. 
An Entando application is an assembly of out of the box and/or custom built components running on the 
Entando Platform. Components can be widgets, micro frontends, microservices, page templates, 
WCMS content or WCMS content types. 

## Entando App Engine
The Entando App Engine is the heart of the Entando Platform by providing the primary out-of-the-box services for 
developing applications. Key features:
* Expose the APIs the Entando App Builder uses to provide the page and content management interface for your application.
* Handle the work of assembling micro frontends and microservices and combining them on specific pages as defined by the Entando App Builder. 
* Provide the data access layer to persist the page and application design.
* Manage the cluster infrastructure.
  
See also: [APIs tutorial](/reference/core-swagger)

## Entando App Builder
The Entando App Builder is the feature-rich management interface used to design and build pages for Entando applications.

See also: [Widget Tutorial](/app-builder/hello-world)

## Entando Component Generator
The Entando Component Generator is Entando's implementation of [JHipster](https://www.jhipster.tech/) that allows users to 
quickly and efficiently generate the skeleton of an Entando Component. The Entando Component Generator provides advanced 
data modeling capabilities including object relational mapping and automatic generation of micro frontends and microservices. 
The generated skeleton serves as a starting point to help a development team swiftly meet the needs of the business. 

See also: [Entando JHipster Blueprint](/tutorials/backend-developers/generate-microservices-and-micro-frontends.html)
    
## Entando Component Repository
The Entando Component Repository (ECR) is used to store and retrieve shareable components so they can be used in multiple 
Entando applications across the enterprise.

See also: [ECR Overview](/ecr/ecr-overview.html)

## Entando Identity Management
Entando Identity Management is the [Keycloak](https://www.keycloak.org/)-based token-based authentication mechanism used by the 
Entando platform. It provides the ability to add Single Sign On capabilities across multiple domains and to connect service 
providers with identity providers.

See also: [Entando Authentication](/tutorials/micro-frontends/authentication/)

## Entando Web Content Management System
The Entando Web Content Management System (WCMS) is a lightweight content and digital asset management system with support
for headless operation. It allows management of widgets and html fragments so they can be placed within an Entando application.

See also: [Content Types](/cms/content-types-tutorial) or [Content Templates](/cms/content-models-tutorial) 
