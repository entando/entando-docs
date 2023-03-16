---
sidebarDepth: 2
---

# Entando Multitenancy

## Overview

Entando 7.2 introduces multitenancy to the Entando Platform. An Entando Application can be customized to enable a multitenant architecture where tenants share an infrastructure but are securely informationally isolated. This document provides an overview of multitenancy and its Entando implementation.

## Core Concepts

Software multitenacy describes an architecture in which a single software instance runs on a server and serves multiple tenants. Each tenant constitutes a group of users who share specific access privileges to the software instance. A multitenant software application is designed to provide a common architecture while ensuring the segregation of information.

Entando Multitenancy imposes a shared architecture (e.g. the versions of Entando, K8s and Keycloak) while distributing resources (e.g. CPU, memory) across the primary and secondary tenants. The primary tenant is the user group with full access to the default features and functionalities of an Entando instance. Secondary tenants are user groups who share the privileges and capabilities of the primary tenant. 

>Note: In the initial implementation of Entando Multitenancy, an active Component Manager is not available to secondary tenants.

Tenants are informationally isolated from one another with unique data, configuration settings, and user management.
## Architecture

All tenants rely on a single Entando Application instance for core functionality such as the App Builder, App Engine, and Keycloak. Although not a core feature or installed by default, Redis is necessary for cache management and high availability, which Entando strongly recommends for a multitenant configuration. See **TODO - add tutorial link** to add Redis to your Entando Application.

To isolate its data and configurations, each tenant is identified by its own domain name and allocated its own database schema, Entando Content Deliver Server (CDS) instance, Solr core, and Keycloak client realm. Entando CDS is required to manage static resources external to the Entando App Engine, Solr establishes an external search engine, and the Keycloak realm grants user access.

![multitenancy.png](./img/multitenancy.png)

Entando Multitenancy requires a tenant to configure Solr, Entando CDS, and Keycloak per the linked tutorials **TODO - Solr/CDS/Keycloak in this sentence will link to those**. 

## Implementation

A single installation of Entando 7.2 can manage more than one independent and isolated static site. The following are key concepts of Entando Multitenancy:

- The current tenant is only reflected in the domain name of the instance URL
- Each tenant's data is physically isolated via different databases (or schema) and filesystems
- Each tenant's activity is independent via different security domains (users, keys) hosted on different realms of a single Keycloak instance
- Per multitenant environment there is a single Kubernetes namespace, Entando App Engine and Entando App Builder
- The App Builder UI of the primary tenant is indistinguishable from that of a standalone Entando installation

>Key multitenancy concepts specific to Entando 7.2: 
> - The Entando Component Manager is currently active for the primary tenant only, which prohibits bundle installation on secondary tenants 
> - Aside from Local Hub functionality, the App Builder UI of a secondary tenant is indistinguishable from that of a standalone Entando installation
## Next Steps

To install and configure a multitenant Entando instance, see **TODO**

