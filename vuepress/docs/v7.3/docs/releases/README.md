---
sidebarDepth: 2
---

# Entando 7.3 Release Notes

Entando 7.3 is an important release with major advances and performance improvements, especially for the App Builder, content management UX and Multitenancy features.

## Summary
- [Multitenancy 2.0](#multitenancy) adds independent bundle functionality and access to registries for each tenant
- App Builder introduces RBAC distributed editorial system 
- Significant improvements to the performance and UX of the App Builder and its CMS
- Additional performance, security, and dependency improvements

### Compatibility
* [Entando 7.3 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.3_Compatibility.pdf)
* [Guides for previous versions of Entando](https://entando.com/page/en/compatibility-guide)

## Breaking Changes


## New Features and Improvements

### Multitenancy 2.0
- In a multitenant environment, any primary and secondary tenant is now able to add registries independently in the Local Hub of the App Builder. Each tenant can access the catalogs without interfering with other tenants.
- Each tenant is now able to deploy, install and uninstall a bundle or EPC individually with data segregated and tied to the tenant with a tenant code. 
- Bundles with microservices can be configured to access an external DBMS and the corresponding tenant Keycloak realm

### App Builder
- Improved bundle install and uninstall process with individuated processes for each component type to strengthen resilience in error handling and maintain the consistent state of an application. The uninstall process now includes a progress bar and a list of dependencies to clear.
- With Formik and Yup replacing Redux, many pages, including user profile, password and account forms, search windows, and configuration pages, were rebuilt with improved data management and error response. 
Roles and groups can be configured so that specific pages and/or sections, and the associated page tree, can be viewed and edited by only those with the permission to do so
Fixed bugs with bundle installation involving circular links in content types and disabled EPC menu
- Fixed bug related to activity stream notifications appearing when the home button is clicked
Fixed bug in Page Manager with disabled page tree actions for child pages
- Added a new mediator library to improve communications between micro frontends 
- Fixed bug and improved error messaging when a bundle install is initiated while another is already in progress resolved issue with editing and saving a new user Profile Type based in part on an email attribute
- Fixed bug with Welcome Wizard navigation that gets blocked after too many back steps
- Fixed issue with persisting error message on My Profile page when editing the password
- Removed residual traces of cloned widgets after deletion in Page Designer
- Fixed bug in Page Manager when a folder is relocated within the page tree 
- Removed the expand caret icon in Page Manager page tree when the folder is empty
- Fixed issue with a User Profile that uses a date or timestamp attribute to properly render a data picker with today’s date
- Fixed bug in Page Designer with Page Settings tab that should remain read only 
- Fixed issue with Page Designer consistency in propagating changes from the Page Setting tab 
- Improved meta tag validation and error handling when new pages are created

### AppEngine
- Resource requirements for microservices can now be specified in the v6 bundle descriptor, including storage, memory and CPU.
- Fixed security vulnerability with upload file size limit validation and process 
- Fixed bug with index reloading and improved error messaging when content type is different but the content name is the same
- Improved refactoring and unit tests to integrate Solr and increase coverage
- Upgraded Spring frameworks and libraries to improve security vulnerabilities
- Fixed bug with the bundle uninstall process when a MySQL DBMS is configured for the AppEngine
- Fixed bug on startup when AppEngine is configured with Derby RDBMS
- Fixed bug in session management related to activity stream
- Fixed bug that sometimes prevented the creation of database backups 
- Fixed issue with ESAPI warnings about validation.properties when widgets have been configured on a published page

### Entando CLI (ent)
- Resource requirement for microservices can be specified in the v6 bundle descriptor entando.json 
- Improved the semantic version verification process for bundle installation to select the correct most recent version
- Added capability to initialize bundles from private Entando Hubs with an API key
- Entando bundles (v1) can now be automatically upgraded to the v5 docker-based version using the ent CLI
- Increased the default memory to 6 GB for the automatic CLI installation of Entando
- Improved bundle name validation in the bundle management process
- Fixed a bug with the `ent bundler` command which generated duplicate fragments associated with micro frontends with uppercase letters or hyphens
- Improved error logs for ent bundle commands related to Docker, to print to the console and be more explicit in [debug mode](../getting-started/ent-diag.html)
- Fixed issue with error messages persistently recommending the debug mode 
- Fixed a bug related to the caching plugin on MySql-based bundles for authentication

### Portal UI
- Improved the strategy for communication between micro frontends with a mechanism using CustomEvent objects, enabling MFEs to broadcast events and respond in a decoupled and flexible way. This will eliminate conflicts between bundles and with other non-Entando entities on pages. [Communicate between MFEs tutorial](../../).
- Fixed bug with a redirect page associated with an error in a widget 

### Entando CMS
- Fixed bug with the access URL for micro frontend static assets in production
- Improved error messaging and resolved issues with uploading attribute image files that were the wrong formats
- Improved error messaging for invalid codes in a content template
- Fixed bug with the autocomplete dropdown list for additional attributes in configuring content link
- Resolved issues with retention for the image crop options in the edit mode of Content Settings
- Fixed issue with content attribute fields that would not propagate for content type Monolist 

### Entando Component Generator/Blueprint
- The Entando Blueprint now supports duration and UUID field types for automatically generated entities 

### Entando Component Manager
- Improved the deletion and confirmation process of bundle components 
- Extended support for custom Freemarker templates in v5 bundles with a customUiPath
- Fixed bug during bundle installation when using a NullPointerException and the child micro frontend’s name alphabetically precedes the parent’s
- Updated the post init EPC Bootstrap bundle

### Infrastructure
- Upgraded Entando integration to support for Kubernetes 1.26 on Entando 6.5, 7.1, 7.2, and 7.3
- Added support for MacBook with an M1 or M2 chip and is now compatible with the ARM64-based architecture
- Upgraded OLM support for Tomcat web server
- Integrated and auto-provisioned APISIX gateway to better manage microservices, security, and scalability
- Added ARM support for GKE, AKS, EKS, OpenShift and k3s installations
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


