# Release notes Entando 6.2.0

## BUG FIXES AND NEW FEATURES

### Infrastructure

* Initial support for GKE/AKS/EKS deployments

* k3s 1.8.X is now the official choice for development installations

* The only fully supported and tested production database is PostgreSQL at the moment

* Entando now fully relies on Keycloak for identity management. Old native authentication is no longer supported.

### Security

* Fixed CSRF vulnerability discovered in 6.1

### Quickstart:

* Support for embedded databases (derby)

* Now capable to reuse existing external databases created by a previous installation

* Reduced the memory footprint and Improved the startup times

* Experimented and documented 2 further workarounds for the IP change issue (An Entando quickstart installation fails to restart when the IP of the OS changes). A more structured solution will come with the next release.

### Entando Component Repository (ECR)

* ECR now relies only on GIT repositories for the distribution of bundles

* Completed the support for bundles with multiple versions

* Reliability improvements in the installation/uninstallation process (ability to install/uninstall a specific bundle version)

* Fixes and improvements to the web interface

* Updated documentation
(common use cases, uninstall flow, CRDs, ingresses and a troubleshooting guide)

* Temporary disabled support for Pages in bundles (introduced with 6.1) due to problems during uninstallation

* Full support for composite CMS attributes

### AppBuilder:

* Fixed the role-based UX (now the UX properly react to the current user role)

* UX improvements and nomenclature updates

* Reliability improvements and rationalization in several areas (user management, page design, content management, asset management, error messaging)

* Essential plugins now part of the base distribution (SEO, Content Versioning, Content Workflow, Content Scheduler, EMail)

* Among these, SEO and Content Versioning earn an new UX rewritten in react

* Included a set of additional default widgets, content types, content templates, page templates

### Entando Component Generator

* Microsoft Windows Support (Win 10 pro)

* Support for the Italian Locale

* Added ability to skip MFE generation

* Completed support for all the possible field types of an entity

* Added support for entity deletion

* Added support for the missing attribute types

* Fixed support for complex attribute configurations

* Several fixes in code generation and build

## KEY OPEN ISSUES

### Keycloak RCE

The keycloak version used by Entando is vulnerable ([https://github.com/keycloak/keycloak/pull/7138](https://github.com/keycloak/keycloak/pull/7138)).

A fixed version of keycloak has not yet been released. [update: a fixed keycloak has been released and will be included in the next version of Entando]

The vulnerability can be exploited only if you have a way to obtain valid token (so a valid username/password)

An update is underway and will be soon released.

## OTHER OPEN ISSUES

* In AppBuilder the user is unable to set its personal profile data from the MyProfile screen

* In the contents widgets some built-In content types misbehave if Content Template = Default. Users need to explicitly select the Content Template.

* In AppBuilder, assets management , deleting a duplicate image causes the deletion of the original image

* AppBuilder UX/UI is still sometimes not consistent

* The Entando Component Generator still doesn’t support generation of microservices with no backend

* Support of old versions of Oracle not complete yet

* Documentation has been improved but needs further work



