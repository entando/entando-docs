---
sidebarDepth: 2
---

# Entando 7.3 Release Notes

Entando 7.3 is an essential feature release with significant advances for Multitenancy and design and performance upgrades for the App Builder.

## Summary
- [Multitenancy 2.0](#multitenancy-20) adds full bundle functionality and access to registries independently across tenants.
- Cloud ARM systems and ARM64-based architecture is now supported, including MacBooks with an M1 or M2 chip.
- App Builder introduces a distributed editorial system with RBAC controls and page tree redesign.
- New bundle features were added to automate the upgrade process to docker-based bundles and request basic resources for microservices. The bundle uninstall process was also improved with internal references to minimize technical debt. 
- APISIX is now supported on Entando, including authentication, authorization, rate-limiting, and improved security features out of the box.
- A mediator library has been added to improve communications between micro frontends in the portal UI via a broadcast event.
- Additional Performance, security, and dependency improvements

### Compatibility
* [Entando 7.3 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.3_Compatibility.pdf)
* [Guides for previous versions of Entando](https://entando.com/page/en/compatibility-guide)

## Breaking Changes
- 
- 

## New Features and Improvements

### Multitenancy 2.0
- In a multitenant environment, primary and secondary tenants are now able to add registries independently in the Local Hub of the App Builder. Each tenant can access catalogs without interfering with other tenants.
- Each tenant can deploy, install and uninstall a bundle or EPC individually, with data segregated and tied to the tenant with a tenant code. 
- Bundles with microservices can be configured with external DBMSs and the corresponding tenant Keycloak realm

### App Builder
- Improved bundle install and uninstall process with individuated processes for each component type to strengthen resilience in error handling and maintain the consistent state of an application. The uninstall process now includes a progress bar and a list of dependencies to clear.
- With Formik and Yup replacing Redux, many sections, including user profile, password and account forms, search windows, and configuration pages, were rebuilt with improved data management and error responses. 
- User roles and groups can be configured so that specific pages and/or sections, and the associated page tree, can be viewed and edited by users with the proper access.
- A new [mediator library](https://github.com/entando/frontend-libraries/tree/master/packages/entando-mfecommunication) was integrated to improve communications between micro frontends
- Fixed bug with bundle installation involving circular links in content types and disabled EPC menu
- Fixed bug related to activity stream notifications appearing when the home button is clicked
- Fixed bugs in the Page Manager with disabled page tree actions for child pages, when a folder is relocated within the page tree, and removed the expand caret icon in page tree when the folder is empty 
- Fixed bug and improved error messaging when a bundle install is initiated while another is already in progress 
- Resolved issue with editing and saving a new user Profile Type based in part on an email attribute
- Fixed bug with Welcome Wizard navigation that gets blocked after several back steps
- Fixed issue with persisting error message on My Profile page when editing the password
- Removed residual traces of cloned widgets after deletion in Page Designer 
- Fixed issue with a User Profile that uses a date or timestamp attribute not rendering a date picker properly
- Fixed bugs in Page Designer under Page Settings tab that should remain read only and with consistency in propagating changes 
- Improved meta tag validation and error handling when new pages are created

### AppEngine
- Resource requirements for microservices can now be specified in the v6 bundle descriptor, including storage, memory and CPU
- Upgraded Spring frameworks and libraries to minimize security vulnerabilities
- Improved refactoring and unit tests to integrate Solr and increase coverage
- Fixed bug with index reloading and improved error messaging when content type is different but the content name is the same
- Fixed bug in the bundle uninstall process when a MySQL DBMS is configured for the AppEngine
- Fixed security vulnerability with upload file size limit validation and upload process
- Fixed bug on startup when AppEngine is configured with Derby RDBMS
- Fixed bug in session management related to activity stream
- Fixed bug that sometimes prevented the creation of database backups 
- Fixed issue with ESAPI warnings about `validation.properties` when widgets have been configured on a published page

### Entando CLI (ent) 
- Improved the semantic version verification process for bundle installation to select the most recent version
- Added capability to initialize bundles from private Entando Hubs with an API key
- The ent CLI can now be used to automate the upgrade process from v1 bundles to the v5 docker-based bundles 
- Increased the default memory to 6 GB for the automatic installation of Entando
- Improved the bundle name validation in the bundle management process
- Fixed a bug with the `ent bundler` command which generated duplicate fragments associated with micro frontends with uppercase letters or hyphens
- Improved error logs for ent bundle commands related to Docker, to print to the console and be more explicit in [debug mode](../getting-started/ent-diag.md)
- Fixed issue with error messages persistently recommending the debug mode 
- Fixed a bug related to the caching plugin on MySQL-based bundles for authentication

### Portal UI
- Improved the strategy for communication between micro frontends with a mechanism using CustomEvent objects, enabling MFEs to broadcast events and respond in a decoupled and flexible way. This will eliminate conflicts between bundles and with other non-Entando entities on pages. [Communicate between MFEs tutorial](../../tutorials/create/mfe/communication.md)
- Fixed bug with a redirect page functionality associated with an error in a widget 

### Entando CMS
- Fixed bug with the access URL for a micro frontend's static assets in production
- Improved error messaging and resolved issues with uploading attribute image files that were the wrong formats
- Improved error messaging for invalid codes in a content template
- Fixed bug with the autocomplete dropdown list for additional attributes in configuring content links
- Resolved issues with retention for the image crop options in the edit mode of Content Settings
- Fixed issue with content attribute fields that would not propagate for content type Monolist 

### Entando Component Generator/Blueprint
- The Entando Blueprint now supports duration and UUID field types for automatically generated entities 

### Entando Component Manager
- Upgraded bundle functionality in multitenant applications by injecting a tenant ID in all microservices in the bundle installation process to assign tenant ownership
- Extended support for custom Freemarker templates in v5 bundles with a customUiPath
- Improved the deletion and confirmation process of bundle components 
- Updated the post init EPC Bootstrap bundle
- Fixed bug in bundle install process when using a NullPointerException and the child micro frontend’s name alphabetically comes before the parent’s

### Infrastructure
- Upgraded Entando integration with support for Kubernetes 1.26 on Entando 6.5, 7.1, 7.2, and 7.3
- Added support for MacBook with an M1 or M2 chip and is now compatible with the ARM64-based architecture
- Upgraded OLM support for Tomcat web server
- Integrated and auto-provisioned APISIX gateway to better manage microservices, security, and scalability
- Added ARM support for GKE, AKS, EKS, OpenShift and K3s installations
- Oracle DB can now be configured for Keycloak and auto-provisioned for all databases by the Entando Operator
- Fixed an issue with the K8s service API that prevented the initial installation of a microservice because it searched for the configuration from the instance itself, which cannot exist yet, forcing the user to repeat the installation

### Security Updates
- CVE-2023-34149 (apache struts: DoS via OOM)
- CVE-2023-34396 (apache struts: DoS via OOM)
- CVE-2023-20863 (springframework:spring-expression)
- CVE-2023-20861 (springframework:spring-expression)
- CVE-2022-28366 (htmlunit:neko-htmlunit)
- CVE-2022-29546 (htmlunit:neko-htmlunit)
- CVE-2023-20860 (debian: libspring-java)
- CVE-2023-34149 (apache.struts:Allocation of Resources Without Limits or Throttling)
- CVE-2023-34396 (Apache Struts: DoS via OOM)
- CVE-2023-34036 (Forwarded header exploit with Spring HATEOAS on WebFlux)

## Known Issues
- In a multitenant application, errors occur when several database backups are created for the primary and its tenants. The temporary workaround is to Refresh the page.

## Deprecation Warnings
- Support for Kubernetes 1.23 is deprecated on Entando 6.5, 7.1, 7.2, and 7.3

## Previous Releases
Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando.


