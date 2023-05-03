# Entando 7.2 Release Notes

Entando 7.2 is an important feature release that introduces a number of new features and performance improvements.

## Summary
- [Multitenancy](#multitenancy) adds support for multiple tenants in a single Entando Application
- [Hub 3.1](../../tutorials/solution/entando-hub.md) delivers the option to create private catalogs for each organization in an Entando Hub
- [Entando Blueprint](../create/blueprint-features.md) has been upgraded to JHipster 7.9.3, including updates to the Entando Bill of Materials (BOM) and support for Keycloak 18+
- Numerous performance, security, and dependency improvements 

### Compatibility
* [Entando 7.2 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.2_Compatibility.pdf)
* [Guides for previous versions of Entando](https://entando.com/page/en/compatibility-guide)

## Breaking Changes
* The default Keycloak integration and installation is now based on Keycloak 18 with its updated architecture. See [Keycloak Migration Changes](https://www.keycloak.org/docs/latest/upgrading/index.html#migration-changes) for steps on updating an existing Keycloak or RedHat SSO instance. Any Entando PBCs or microservices with direct Keycloak integrations may need to be updated with the corresponding Keycloak libraries.
* The Entando AppEngine is now based on an Apache Tomcat image. Custom configuration for Wildfly/EAP may need to be migrated.
* Hub 3.1 now uses the Entando docker-based bundle specification. The upgrade path from Hub 2.x to Hub 3.x requires adjusting Keycloak client identifiers and Secrets to use the new bundleId-based naming conventions.


## New Features and Improvements

### Multitenancy
- A single instance of Entando can now support multiple tenants, each identified by its own subdomain or domain
- Full isolation is provided for the data and content associated with a tenant
- Each tenant has its own identity domain, managed via distinct realms of the same or different Keycloak instances
- [Redis](../tutorials/consume/redis.md) is used for cache management, [Apache Solr](../../tutorials/consume/solr.md) for enterprise search, and Entando's Content Delivery Server or [CDS](../../tutorials/consume/mt-cds.md) for static asset and content delivery
- Each tenant can be defined with a list of authorized FQDNs; otherwise, a user defined tenant code is used as a subdomain name. 
- Liquibase implementation for configuration and updates of databases 
- Implementation of logging Mapped Diagnostic Context for HTTP requests, to log and display the name of a tenant and the user related to specific requests, and the ability to filter against these variables
- APIs (api/currentTenant and api/tenants) to expose current tenant information including tenant name and resource URL and path
- **Note**: access to the Local Hub and installation of bundles from a Hub catalog is restricted to the primary tenant in the application

### Hub 3.1
- [Entando Hub](../../tutorials/solution/entando-hub.md) is now built with docker-based bundles
- Users can now generate API keys in the Hub UI 
- Each Hub organization can be provisioned with a private catalog in the Hub UI 
  - Use of an API key is required, instead of user credentials, for connecting an Entando App Builder to a private catalog

### App Builder
- Addition of a new custom `Category` for bundle type `widgets` for micro frontends that is organized separately in the App Builder Page Designer
- Solr configuration is now accessible in the App Builder navigation, when Solr is enabled in the application
- App Builder supports the use of an API key for connecting to a private catalog
- Improved validation for page code and SEO-friendly code fields
- Fixed bug with Welcome Wizard's `Add New Page` form 
- Minor improvements to Dashboard CMS table header names

### AppEngine
- Added support for generic Java agent for Tomcat
- Added the ability to configure the Solr search engine plugin through environment variables
- Improved upload file size management to enable limits for application server and application file uploads
- Fixed issue with Keycloak login redirects using env variables to guide the protocol
- Fixed localization bug when secondary language is missing a proper label 
- Fixed the null reponse in the payload when the App Builder makes an API call on a specific widget 
- Fixed bug with misconfigured Lucene root directory index path
- Fixed security vulnerability by updating commons-fileupload from 1.4 to 1.5 used by Apache Struts
- Improved Tomcat logs and changed formats and implementations to use logback and the Simple Logging Facade for Java (SLF4J)
- Upgraded Apache Struts library

### Entando CLI (ent)
- Added new custom `widget` `category` validation process 
- Fixed `ent bundle pack` issue regarding space in bundle names
- Implemented a new strategy for choosing tags when generating bundle custom resources with the `ent bundle generate-cr` command. (`-t flag: dev prod`) The default is prod.

### Portal UI
- Enabled link type attribute localization so links can be modified according to language 
- Added functionality for an attribute roles registry (for entity manager services) to allow users to modify roles for a more dynamic content management
- Fixed issue with internal links using default language even when the language is changed
- Fixed bug when deleting labels

### Entando CMS
- Removed default value from date field during new content creation 
- Fixed issue with residual user information after deletion in Keycloak
- New procedure allows FE developers to include social media tags into the header of a page
- Improved handling of email attributes when adding to JSP modules 

### Infrastructure
- Upgraded Entando integration to support Keycloak 18.0/Red Hat SSO 7.6
- Improved diagnostics by monitoring endpoints with a Spring Boot actuator

### Component Manager
- Improved usage of workernode memory
- Added capability to choose version of bundles with tags, for `prod` and `dev`, when generating custom resources

### Security Updates
- Fixed CVE-2023-24998 (apache-struts, DoS)
- Fixed CVE-2021-31805 (struts2, RCE)
- Fixed CVE-2022-42889 (Apache Commons Text, RCR)
- Fixed CVE-2022-31197 (spring-boot-parent, sql injection )
- Fixed CVE-2022-42252 (tomcat-embed-core, HTTP Request Smuggling)
- Fixed CVE-2021-43980 (tomcat-embed-core, Information exposure)
- Fixed CVE-2022-45143 (tomcat-embed-core, Improper Input Validation)
- Fixed CVE-2022-23181 (tomcat-embed-core, Privilege Escalation)
- Fixed CVE-2022-46363 (apache.cfx, SSRF)
- Fixed CVE-2022-46364 (apache.cfx, information exposure) 
- Fixed CVE-2022-3509 (protobuf-java, DoS)
- Fixed CVE-2022-3510 (protobuf-java, DoS) 
- Fixed CVE-2022-3171 (protobuf-java, DoS)
- Fixed CVE-2022-24613 (metadata-extractor, allocation of resources without limits or throttling)
- Fixed CVE-2022-24614 (metadata-extractor, allocation of resources without limits or throttling)


## Deprecation Warnings
* The AppEngine now defaults to an Apache Tomcat-based image. Wildfly and EAP images are also available with 7.2 but are now deprecated.
* As previously noted in the [7.0 Release Notes](../../../v7.1/docs/releases/README.md):
  *  [git-based bundles](../reference/bundle-comparison.md) and the corresponding `ent prj` commands are deprecated. Migrating bundles to the new docker-based format is strongly recommended. 
  * The runtime option to disable the App Builder (`APPBUILDERINTEGRATIONENABLED: "false"`) and use the Admin Console to manage an Entando Application is now deprecated.

## Previous Releases

Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando.