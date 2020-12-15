# Entando 6.3 Release Notes 

::: danger
These release notes have not yet been updated for Entando 6.3 
:::

## New Features and Major Fixes

### Infrastructure

* Initial support for deployment on Google GKE, Azure AKS, and Amazon EKS.

* k3s 1.8.X is now the official choice for developer installations

* The only fully supported and tested production database is PostgreSQL at the moment

* Entando now fully relies on Keycloak for identity management. The previous native authentication is no longer supported.

### Security

* Fixed CSRF vulnerability discovered in 6.1

### Quickstart:

* Support for embedded databases (derby)

* Now capable to reuse existing external databases created by a previous installation

* Reduced the memory footprint and improved the startup times

* Documented [two workarounds](../../tutorials/devops/local-tips-and-tricks.md#hyper-v-ip-changes) for the IP change issue, e.g. an Entando quickstart installation fails to restart when the IP of the VM changes. A more structured solution will come with the next release.

### Entando Component Repository (ECR)

* ECR now relies only on GIT repositories for the distribution of bundles

* Enabled support for bundles with multiple versions

* Reliability improvements in the installation/uninstallation process, e.g. ability to install/uninstall a specific bundle version

* Fixes and improvements to the web interface

* Updated documentation, e.g. common use cases, uninstall flow, CRDs, ingresses and a troubleshooting guide

* Temporarily disabled support for Pages in bundles (introduced with 6.1) due to problems during uninstallation

* Added full support for composite CMS attributes

### Entando App Builder

* Fixed the role-based UX so the UI properly accounts for the current user role.

* UX improvements and nomenclature updates

* Reliability improvements and rationalization in several areas, e.g. user management, page design, content management, asset management, error messaging

* Essential plugins are now part of the base distribution, e.g. SEO, Content Versioning, Content Workflow, Content Scheduler, email. 

* A new React-based UX was implemented for SEO and Content Versioning

* Included a set of additional default widgets, content types, content templates, and page templates

### Entando Component Generator

* Improved Microsoft Windows Support (specifically Windows 10 Professional)

* Support for the Italian Locale

* Added ability to skip MFE generation

* Completed support for all possible field types of an entity

* Added support for entity deletion

* Added support for missing attribute types

* Fixed support for complex attribute configurations

* Several fixes in code generation and build

## Key Open Issues

### Keycloak RCE

  * The keycloak version used by Entando has a security vulnerability - [https://github.com/keycloak/keycloak/pull/7138](https://github.com/keycloak/keycloak/pull/7138). This issue has been fixed in the latest version of keycloak and will be included in the next version of Entando. This vulnerability can only be exploited if you have a way to obtain a valid token, e.g. via a valid username/password.

## Other Open Issues

**General**
  * Support for older versions of Oracle is not yet complete
  * `Documentation` and `Tutorials` have been updated to reflect 6.2 but some work remains

**Entando App Builder**
  * There are a few visual issues with the redesigned UX/UI
  * The user is unable to set their personal profile data from the `My profile` screen
  * In `Content → Assets`, deleting a duplicate image results in the removal of the original image
  * In `Content → Management`, some built-in content types will not function correctly if `Content Template = Default`. Users will need to explicitly select the Content Template.

**Entando Component Generator**
  * Lack of support for generation of microservices with no backend
  * Support of old versions of Oracle not complete yet
  
## Previous Releases
Please see the `Versions` list in the main navigation menu above to access documentation and release notes for previous versions of Entando.