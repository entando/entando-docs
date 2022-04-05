
# Entando 7.0 Release Notes

## General

Entando version 7.0 is a major release. It includes significant changes to the K8s infrastructure provisioning mechanism that provide better security, improved reliability, a simplified deployment process and an extensibility mechanism based on the new capability provisioning workflow. Entando 7 introduces the [Entando Hub](../getting-started/landing-page.md#entando-hub), an updated compatibility matrix (e.g. Keycloak 15, PostgreSQL 14), development stack upgrades (e.g. JHipster 7.2) and several consolidation changes.

## Supported Kubernetes Versions

* GKE (K8s 1.20 - 1.21)
* OpenShift 4.8 (K8s 1.21)
* Vanilla K8s 1.21
* K3s (K8s 1.21)

## Security Updates

* Fixed a missing escape in the CMS that could have led to XSS.

* The visibility of bundle microservices has been restricted to only view their own Secrets.

* Changed the vulnerable dependencies found in several modules to non-vulnerable versions: commons-io, Velocity, Spring, Guava, Hibernate, Struts 2, TagLib, Tika, Apache CXF, Jackson, Netty.

    * Related list of CVEs: CVE-2021-22696, CVE-2021-27807, CVE-2021-27906, CVE-2021-28657, CVE-2017-6888, CVE-2021-20291, CVE-2020-17530, CVE-2020-10693, CVE-2015-5211, CVE-2020-25649, CVE-2018-1000873.

* Addressed vulnerabilities: CVE-2021-44228, CVE-2022-21724, CVE-2021-22569, CVE-2022-23437, CVE-2022-23596, CVE-2021-25738, CWE-20, CWE-400, CWE-451, CVE-2022-21363.

* Updated the ECG to generate projects with no vulnerable dependencies, with the exception of swagger-ui; a suitable patch for swagger-ui is not currently available. swagger-ui is activated in development mode and not enabled in the production maven profile.

* Most of the existing ECG (Blueprint) vulnerabilities have been fixed; regardless, the user is strongly advised to rerun vulnerability scans every time a new bundle is generated. The remaining vulnerabilities will be fixed in the next minor version of Entando. These are not exploitable in production and only exposed during the internal development process. In particular, they concern:

    * The dev webserver, used when developing the app
    * The Jest test files, used when running tests with jest
    * General webpack configuration
    * Dev utilities, used in the dev environment
    * The PostCSS utility, used to import the CSS when building the final artifact

## New Features and Major Fixes

### Entando Hub

The Entando Hub is a new ECR feature that allows different EntandoApps to share bundles.
* Hub Server: Allows creators to publish bundles that users can browse and clients can download.
* Hub Client: Allows curators to browse, pull and install bundles from the Hub Server.

### Application Engine

* Entando has implemented the SQL versioning tool Liquibase to track, manage and deploy updates to databases. Refer to [Liquibase Migration](../reference/databases.md#liquibase-migration) to learn how the App Engine automates database schema management and modifications.
* The latest MySql 8.x and PostgreSQL 14 versions are supported.
* Oracle 18c as an external DBMS is supported.
* Infinispan is now used only for EAP session sharing. 
* [Object cache](../../tutorials/devops/caching-and-clustering.md) is implemented in Redis.
* Logging infrastructure has been moved to Logback.
* CMS content API performance optimizations have been implemented.

### App Builder

* Added dash (-) support for fragment code validation.
* Improved UI performance affected by instances containing significant content and assets.
* Implemented performance improvements in page management.
* Resolved several extended bugs hindering performance and user experience.
* Reduced the size of the application state and started phasing out obsolete technologies.

### Entando Component Generator (ECG)

* Upgraded JHipster to version 7.2.
* ECG now allows the use of a BOM curated by Entando and containing more recent dependencies than is standard for a specific version of JHipster.
* Removed the .map files generated from Blueprint-generated code.
* Implemented bug fixes and error handling improvement.
* Switched to bundle plugin descriptor version 4.

### Entando Component Repository (ECR)

* Added support for bundle upgrade, downgrade and update.
* Bundle improvements; in particular, bundle plugin security and reliability via name signing.
* It's now possible to specify standard and secret [environment variables](../../tutorials/devops/plugin-environment-variables.md) for a bundle plugin (microservice).
* Now offers experimental support for [bundle plugin configuration profiles](../../tutorials/devops/plugin-configuration.md).
* Now offers better support for bundles and bundle plugins with very long names. 
* ENTANDO_PLUGIN_NAME has been renamed to ENTANDO_RESOURCE_NAME.
* Implemented better management of certain error conditions during installation and updates.
* Introduced system-level bundles, which allow the installation of global static resources.
* The ECR client now explicitly marks bundles that are installed with an amended installation plan and allows the plan to be recalled.
* Added support for Oracle 18c.
* Fixed a bug that caused the ECR to indefinitely stay in busy-state due to particular failure conditions.
* Fixed a bug that (under certain conditions) prevented the bundle plugin pod from properly restarting when scaled down, then back up again.
* The ECR now correctly deletes the plugin pod when the bundle is uninstalled, but the deployment and volumes are retained.
* The EntandoPlugin controller will rollback in the event of a timeout. A failing pod in an OpenShift 4.8 installation triggers error logging and the deployment scales to 0.

### ent (entando-cli)

* Reworked the `ent diag` command to also export CRs, ingresses, deployments, pod "previous" logs, namespace events, etc.
* ent is now able to sync the kubectl version of the current profile with the server version (`ent auto-align-kubectl`).
* Added helper to fetch logs from bundle plugins (`ent prj be-log`).
* In order to run node-based Entando tools, ent now installs and uses a private copy of node at user-level.
* A jq internal dependency is now installed at user-level, privately to ENT.
* Added the command `ent pkg` to manage packages installed at user-level, with initial support for jq and K9s.
* Added the helpers `get bundle id` and `get plugin id` to `ent ecr` and `ent prj` to determine the names of the resources related to a bundle.
* Added the command `ent gen-secret`  to `ent ecr` and `ent prj` to help generate Secrets for the plugins.
* Added the `ent ecr cr` and `ent ecr deploy` subcommands.
* ent now installs the entando-releases dependencies at release level, allowing multiple profiles to share them.
* Fixed a bug that caused ent to git-ignore the "bundle" subdirs in the MFE branches.
* `ent pbs-init` now accepts SSH/git URLs.
* `ent check-env` now considers Docker and Java mandatory dependencies (still skippable with "--lenient").

### ent Quickstart

* Updated to support release 7.0.0.
* Note that the default K3s version used by the entando-cli (ent) quickstart has been updated to v1.21.

### Identity Provider (IdP)

* Updated Keycloak to version 15.

### Infrastructure

* Includes a massive rework of the internal dependency management system with respect to the concept of ProvidedCapability.
* Added support for OpenShift 4.8 and Kubernetes 1.21.
* Added ComponentManager and Keycloak hardening.
* Tuned Entando Platform timeouts and memory limits.
* Moved from a HELM based deployment process to a pure CustomResource based deployment and installation process.
* Installation parameters considered by the operator all moved to the entando-operator-config ConfigMap.
* Better support for cloud DBMS.
* Updated libraries (Jetty, Keycloak, Spring) and the entire compatibility matrix.
* Dropped support for suffix-mode installation. Only single-hostname is supported now.
* Temporarily dropped support for cluster-level operator installation.
* Removed EntandoClusterInfrastructure and EntandoCompositeApp CR.
* k8s-service is now part of the base Entando infrastructure and therefore installed alongside the operator.
* ComponentManager now communicates with k8s-service using service-to-service authentication, and strictly within the cluster network.
* Entando Operator deployment is now simply called entando-operator.
* k8s-service deployment dropped the application qualifier and is now simply called entando-k8s-service.
* Fixed an intermittent issue with the operator that prevented installing new bundles until the operator was restarted.
* Updated all the Entando base images for reliability and security.
* Replaced the centos images to rocky images and rebased the derived images.
* Updated the auto provisioned PostgreSQL image to version 14.
* MySQL and PostgreSQL are now served by customized and updated entando-mysql and entando-postgres images.

### Entando Bundler

* It’s now possible to extract protected assets.
* Fixed several bugs in the extraction of pages and widgets.
* Added support for categories.
* Error handling has been improved.
* It's now possible to generate the so-called system-level bundles (see ECR).
* Extract/download optimized to only touch the relevant resources.
* Libraries updated for reliability and security.

### EOL Kubernetes Versions

Entando7 drops official support for for OS3.11 and Kubernetes versions prior to 1.20.

### Google Kubernetes Engine (GKE)

* Postponed support to 7.0.1.

### Azure Kubernetes Service (AKS)

* Postponed support to 7.0.1.

## Breaking Changes

* The internal PostgreSQL version has been updated to version 14. Bundles that rely on the auto provisioning of PostgreSQL may (or may not) be affected.

## Known Issues

### Apple M1
* Entando does not currently support ARM64 architecture and cannot be installed on newer Macs built with the Apple M1 processor.
### ECG

* The default "details" widget generated for an entity doesn't work out of the box.

### ECR

* An in-place upgrade from version 6.3.X to version 7 of the ECR is not possible, but a simple upgrade script will be provided. In-place upgrades from version 7 to future versions will be possible.

### GKE

* There is still a known issue with the current NGINX ingress that can be worked around.  

## Deprecation Warnings

* Support for versions 1 and 2 of the plugin descriptor are deprecated and will be removed in the future.

## Previous Releases
Please see the `Versions` list in the main navigation menu to access documentation and release notes for previous versions of Entando.















