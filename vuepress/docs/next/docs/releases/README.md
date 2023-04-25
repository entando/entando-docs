# Entando 7.2 Release Notes

Entando 7.2 is an important feature release that introduces [Multitenancy] to the Entando Platform. It allows multiple tenants to share infrastructure while ensuring separation of information. Other updates include the Hub 3.1, the Entando Blueprint and ...

## Summary
- Multitenancy 
- [Hub 3.1](../../tutorials/solution/entando-hub.md) update with private catalogs and improved user management
- Solr search capability
- Added support Tomcast servlet and for generic Java agent for Tomcat image
- Security fixes

### Compatibility

* [Entando 7.2 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.2_Compatibility.pdf)
* [Guides for previous versions of Entando](https://entando.com/page/en/compatibility-guide)

## Breaking Changes
* Major new feature for [Multitenancy on Entando](#multitenancy) including support for Redis, Solr, and CDS
* Hub 3.1 introduces private catalogs and upgraded UI 
* The [Entando Blueprint](../create/blueprint-features.md) has been upgraded to JHipster 7.9.3, including the BOM and support for Keycloak 18.0.2

## New Features and Improvements

### Multitenancy
- A single instance of Entando runs on a server and serves multiple tenants, under the same namespace but with many subdomain names
- Each tenant is designed with a dedicated share of the resources on the server but with isolated data and configuration
- Each tenant has its own security domain, hosted on different realms of the same or different Keycloak instances
- [Redis] is used for cache management, [Solr] for external search engine, and [CDS] for content management
- Each tenant can be defined with a list of authorized FQDNs; otherwise, a user defined tenant code is used as a subdomain name. 
- Optional Liquibase management for configuration and migration of databases 
- Implementation of logging Mapped Diagnostic Context for HTTP requests, to log and display the name of a tenant and the user related to specific requests, and the ability to filter against these variables
- APIs (api/currentTenant and api/tenants) that expose current tenant information including tenant name and resource URL and path 
- The App Builder menu adapts to MT instances for secondary tenants and to include Solr configuration *** should this be included??

### Hub 3.1
- [Entando Hub](../../tutorials/solution/entando-hub.md) is now updated with docker-based bundles
- Every organization can be provisioned with a private catalog in the Hub UI 
- An API key is required, instead of user credentials, for access to private catalogs in the App Builder 
- Users can now generate API keys in the Hub UI, required for private catalogs

### App Builder
- With added support for Solr external search capability, its configuration can now be accessed from the main left naviagation bar, under `Content`, when enabled  
- App Builder supports the use of an API key for creating or updating registries in the Local Hub. This can replace the need for user identification in private catalogs.
- Improved validation for page code and SEO-friendly code fields
- The App Builder will query the component manager to be able to fetch bundles from local, remote, and private catalogs/registries 
- Addition of a new custom `Category` for bundle type `widgets` for micro frontends to be organized separately in the App Builder Page Designer.
- Fixed bug with Welcome Wizard's Add New Page form 
- Minor improvements to Dashboard CMS table header names
- The App Builder menu changes in Multitenant applications for Secondary Tenants *** ????

### AppEngine
- The default the entando-de-app image is now Tomcat. The standard images for EAP and Wildfly still remain options.
- Added support for generic Java agent for Tomcat
- Added support to employ Solr search engine plugin through existing env variables. 
- Improved upload file size management with new feature to set limits for application server and application file upload maximum sizes
- Fixed issue with Keycloak login redirects using env variables to guide the protocol
- Addressed the problem when the secondary language is missing a proper label 
- Fixed the null reponse in the payload when the App Builder makes an API call on a specific widget 
- Fixed bug with misconfigured Lucene root directory index path on Entando 6.3.2
- Fixed security vulnerability by updating commons-fileupload from 1.4 to 1.5 used by Apache Struts
- Improved Tomcat logs and changed formats and implementations to use Logback and the Simple Logging Facade for Java (SLF4J), that provides a logging API 
- Fixed a Remote Code Execution vulnerability from the upgrade of Apache Struts version 

### Entando CLI (ent)
- Added new custom `widget` `category` validation process 
- Fixed `ent bundle pack` issue regarding space in bundle names
- Implemented a new strategy for choosing tags when generating bundle custom resources with the ent bundle generate-cr command. (-t flag: dev prod ) The default is production.

### Portal UI
- Enabled link type attribute localization so links can be modified according to language 
- Added functionality for an attribute roles registry (for entity manager services) into the database and allowed users to modify roles for a more dynamic content management (ENG-4656)
- Fixed issue with internal links following links of default language even when the language is changed

### Entando CMS
- Fixed issue with residual user information after deletion in Keycloak
- New procedure allows FE developers to include social media tags into the header of a page
- Removed default value from date field during new content creation 
- Improved handling of email attributes when adding to JSP modules 

### Infrastructure / Local Hub
- The App Engine now has the added option to use a Tomcat image, alongside EAP and Wildfly. The default is Tomcat but the standard EAP or Wildfly images are still valid.
- Upgraded Entando support to SSO 7.6 and Keycloak 18.0.2
- Improved diagnostics by monitoring endpoints with a Spring Boot actuator (https://entando.myjetbrains.com/youtrack/issue/ENG-4456)

Component Manager
- Improved usage of workernode memory
- Added capability to choose version of bundles according to tags for prod, dev when generating custom resources

### Security Updates
- Fixed CVE-2023-24998 (apache-struts, DoS)
- Fixed CVE-2021-31805 (struts2, RCE)
- Fixed CVE-2022-42889 (Apache Commons Text, RCR)
- Fixed CVE-2022-31197 (spring-boot-parent, sql injection )

The following were not listed in Sara's list of engr ticket but were found on YouTrack for 7.2.0
4 from ENG-4490 
- Fixed CVE-2022-42252 (tomcat-embed-core, HTTP Request Smuggling)
- Fixed CVE-2021-43980 (tomcat-embed-core, Information exposure)
- Fixed CVE-2022-45143 (tomcat-embed-core, Improper Input Validation)
- Fixed CVE-2022-23181 (tomcat-embed-core, Privilege Escalation)

2 from ENG-4494 from org.apache.cfx in app-engine
- Fixed CVE-2022-46363 (apache.cfx, SSRF)
- Fixed CVE-2022-46364 (apache.cfx, information exposure) 

2 from ENG-4460 in app-engine (develop)
- Fixed CVE-2022-3509 (protobuf-java, DoS)
- Fixed CVE-2022-3510 (protobuf-java, DoS) 
- Fixed CVE-2022-3171 (protobuf-java, DoS)

2 from ENG-4368  in develop for app-engine
- Fixed CVE-2022-24613 (metadata-extractor, allocation of resources without limits or throttling)
- Fixed CVE-2022-24614 (metadata-extractor, allocation of resources without limits or throttling)


## Deprecation Warnings


## Previous Releases

Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando.