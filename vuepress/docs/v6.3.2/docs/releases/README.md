# Entando 6.3.2 Release Notes

## Supported Kubernetes Versions
  - GKE (k8s 1.18 - 1.21)
  - OpenShift 3.11 (k8s 1.11)
  - OpenShift 4.7 (k8s 1.21)
  - Tanzu Kubernetes Grid 1.2.1
  - Vanilla k8s (1.18 - 1.21)
  - k3s (k8s 1.18 - 1.21)

## Security Updates

- In the CMS fixed a missed escaping of the resourceTypeCode that could have lead to XSS, if the attack was also capable
  to evade CSP
- Fixed in several modules the following vulnerable dependencies:
  common-io, velocity, spring, guava, hibernate, struts2, taglibs, tika, apache-cxf, jackson, netty dependencies to
  non-vulnerable versions. This is the related list of CVEs: CVE-2021-22696, CVE-2021-27807, CVE-2021-27906,
  CVE-2021-28657, CVE-2017-6888, CVE-2021-20291, CVE-2020-17530, CVE-2020-10693, CVE-2015-5211, CVE-2020-25649,
  CVE-2018-1000873
- Several existing Entando Component Generator vulnerabilities have been addressed. The user is strongly suggested to
  run a vulnerability scan every time a bundle is generated. The remaining vulnerabilities will be fixed with the next
  minor version of Entando but do affect tools that are only present during the development process. These include:
    - general webpack configuration
    - the dev webserver, used when developing the app
    - the jest test files, used when running tests with jest
    - dev utilities, used in the dev environment
    - the postcss utility, used to import the css when building the final artifact

## New Features and Major Fixes

### Bundler

  - Now able to extract also the categories
  - Optimized to download only the resources actually required by the extraction
  - Now able to properly export the entire EntandoApp thanks to the "system level bundles" (see the ECR related note)

### Infrastructure
  - The deployment structure for an Entando application has been changed. In deployments prior to 6.3.2 an EntandoCompositeApp was deployed using a multi-container pod that contained the App Builder, App Engine, and Component Manager. Now each of these pods is deployed independently.

### Entando Component Repository

  - Implemented bundle plugin descriptor version 3, which by default implies routes without the plugin version in the url, so just organization + bundle name.
    -  Note that the Component Generator doesn't support this descriptor version yet, but plugins can be easily adapted manually
  - Introduced the concept of "System Level Bundles", which allows the installation of root level resources.
  - Added  support the CMS categories
  - Initial implementation of the bundle Installation plan.
      - The Installation plan allows to inspect the content of a bundle and to resolve conflicts with the components already present in the destination EntandoApp
  - Fixed support for bundles based on mysql
  - Fixed bug that in some condition prevented the bundle plugin pod to properly restart when scaled down and up again
  - Fixed intermittent issue on the operator that prevented installing new bundles until the operator was restarted

### Entando Component Generator

  - Fixed support for the plugin descriptor ingressPath
  - Fixed native builds in the Quarkus blueprint

### App Builder
  - Fixed a couple of permission issues related to page editing.
  - We started a process of optimization to improve the performance of AppBuilder on scenarios with a high number of
    pages and contents.
  - The process will likely be completed for the next patch or minor version release (6.3.3 or 6.4.0)
  - Added support for user Avatars
  - Fixed the CONTENT SEARCH QUERY WIDGET which in some condition returned no results
  - Several fixes in assets, content, page and user management

### Entando CLI "ent"

 - Ent prj to support profiles in backend build
 - Ent prj to force semver on bundle versions (X.Y.Z or vX.Y.Z), in accordance with the rest of the installation process
 - Ent prj now allows direct deployment of a bundle via `ent prj deploy`
 - Implemented support for connection profiles and related connection to clusters via Kubernetes configuration files and/or context
 - Implemented a set of ECR operations for
    - Reading the list of bundles
    - Installing a bundle in standard mode
    - Installing a bundle in override mode (override the components already present)
    - Uninstalling a bundle
    - Purging a bundle (completely removes the bundle pods and related data)

### Google Kubernetes Engine (GKE)
  - Tested and validated GKE deployment under new database scenariosImproved the support for GKE that has been tested under several DB and scenarios.
  - Added documentation for using Google Cloud File for clustered storage
  - Added documentation and testing for TLS scenarios in Google

## Certifications

### RedHat Certification
  - Entando 6.3.2 operator is now RedHat certified . The operator is available in the OperatorHub in OpenShift 4.X.

### Tanzu Kubernetes Grid (TKG) Certification

  - Entando 6.3.2 operator is now certified Tanzu Kubernetes Grid and can be accessed in the [VMWare Marketplace](https://marketplace.cloud.vmware.com/services/details/entando11?slug=true)

## Known Issues

### Apple M1
  - Entando does not currently support ARM64 architecture and cannot be installed on newer Macs built with the Apple M1 processor. Solutions are under investigation.

### Docker Hub Account Names
  - The microservice deployment of an Entando plugin will fail if the associated Docker Hub account name is purely numeric (as opposed to alphanumeric).

### Entando Component Generator
  - The default "detail" widget generated for the entities doesn't work out of the box.
  - Local keycloak loses state across restarts when using --no-recreate option

### GKE
  - There is  a known issue with the current nginx ingress that can be worked around by using the `singleHost` option for the configuration of your Entando Applications and binding TLS to that single host path
    - The issue will be solved in the next minor or patch release (6.4.0 or 6.3.3)

### Custom Resources
  - The EntandoDatabaseService CRD definition needs to be updated for some configurations - `spec.database` needs to be renamed to `spec.databaseName` to support external databases.      

## Deprecation Warnings
  - Support for version 1 and 2 of the plugin descriptor are deprecated and will be removed in the future
