
# Entando 7.0 Release Notes

## General

Entando version 7.0 is a major release. It includes significant changes to the K8s infrastructure provisioning mechanism that provide better security, improved reliability, a simplified deployment process and an extensibility mechanism based on the new capabilities workflow. Entando 7 also introduces the [Entando Hub](../getting-started/landing-page.md#entando-hub), an updated compatibility matrix (e.g. Keycloak 15, PostgreSQL 14), development stack upgrades (e.g. JHipster 7.2) and several consolidation changes.

## Supported Kubernetes Versions

* Kubernetes (1.19-1.21)
* Red Hat Openshift 4.x (K8s 1.20-1.21)
* Rancher k3s (K8s 1.19-1.21)

## Security Updates

* Fixed a missing escape in the CMS that could have led to XSS.

* The visibility of bundle microservices has been restricted; bundle microservices can now only view their own Secrets.

* Changed the vulnerable dependencies found in several modules to non-vulnerable versions: Commons IO, Velocity, Spring, Guava, Hibernate, Struts 2, TagLib, Tika, Apache CXF, Jackson, Netty.

    * Related list of CVEs: CVE-2021-22696, CVE-2021-27807, CVE-2021-27906, CVE-2021-28657, CVE-2017-6888, CVE-2021-20291, CVE-2020-17530, CVE-2020-10693, CVE-2015-5211, CVE-2020-25649, CVE-2018-1000873.

* Addressed vulnerabilities: CVE-2021-44228, CVE-2022-21724, CVE-2021-22569, CVE-2022-23437, CVE-2022-23596, CVE-2021-25738, CWE-20, CWE-400, CWE-451, CVE-2022-21363.

* Updated the ECG to address vulnerable dependencies. One exception is Swagger UI, which is activated only in development mode and not recommended for production use.

* Most of the existing ECG (Blueprint) vulnerabilities have been fixed; regardless, the user is strongly advised to rerun vulnerability scans every time a new bundle is generated. The remaining vulnerabilities will be fixed in the next minor version of Entando; these are not exploitable in production and only exposed during the internal development process. In particular, they concern:

    * The dev webserver, used when developing the app
    * The Jest test files, used when running tests with Jest
    * General webpack configuration
    * Dev utilities, used in the dev environment
    * The PostCSS utility, used to import the CSS when building the final artifact

## New Features and Major Fixes

### Entando Hub

The [Entando Hub](../getting-started/landing-page.md#entando-hub) is a new [Entando Component Repository](../../docs/getting-started/concepts-overview.md#entando-component-repository) feature that allows different EntandoApps to share bundles. The [Entando App Builder](../../docs/getting-started/concepts-overview.md#entando-app-builder) now allows curators to [browse, deploy, install and upgrade bundles from one or more Entando Hub instances](../../tutorials/solution/entando-hub.md#automatically-access-the-hub-from-the-app-builder). 
### Application Engine

* Entando has implemented the SQL versioning tool Liquibase to track, manage and deploy updates to databases. Refer to [Liquibase Migration](../reference/databases.md#liquibase-migration) to learn how the App Engine automates database schema management and modifications.
* The latest MySql 8.x and PostgreSQL 14 versions are now supported.
* Oracle 18c as an external DBMS is now supported.
* Infinispan is now used only for EAP session sharing. 
* [Object cache](../../tutorials/devops/caching-and-clustering.md) has been implemented in Redis.
* Logging infrastructure has been moved to Logback.
* The performance of CMS Content APIs has been optimized

### App Builder

* Added dash (-) support for fragment code validation.
* Improved UI performance affected by instances containing significant content and assets.
* Implemented performance improvements in page management.
* Resolved several extended bugs hindering performance and user experience.
* Reduced the size of the application state and started phasing out obsolete technologies.

### Entando Component Generator (ECG)

* The ECG has been upgraded to use JHipster 7.2.
* The ECG now allows the use of a BOM curated by Entando. This BOM contains more recent dependencies than standard for a specific version of JHipster.
* Removed the .map files generated from Blueprint-generated code.
* Implemented bug fixes and improved error handling.
* Switched to bundle plugin descriptor version 4. Support has been added for environment variables and the default ingressPath no longer includes the image version.

### Entando Component Repository (ECR)

* Added support for bundle upgrade, downgrade and update.
* Implemented bundle improvements; in particular, bundle plugin security and reliability via name signing.
* It is now possible to specify standard and secret [environment variables](../../tutorials/devops/plugin-environment-variables.md) for a bundle plugin (microservice).
* Basic support now provided for [bundle plugin configuration profiles](../../tutorials/devops/plugin-configuration.md).
* Better support now provided for bundles and bundle plugins with very long names. 
* ENTANDO_PLUGIN_NAME has been renamed to ENTANDO_RESOURCE_NAME.
* Implemented better management of certain error conditions during installation and updates.
* Introduced system-level bundles, which allow the installation of global static resources.
* The ECR client now explicitly marks bundles that are installed with an amended installation plan and allows the plan to be recalled.
* Added support for Oracle 18c.
* Fixed a bug that caused the ECR to indefinitely stay in busy-state due to particular failure conditions.
* Fixed a bug that (under certain conditions) prevented the bundle plugin pod from properly restarting when scaled down, then back up again.
* The ECR now correctly deletes the plugin pod when the bundle is uninstalled; the deployment and volumes are retained.
* The EntandoPlugin controller will rollback in the event of a timeout. A failing pod triggers the deployment to scale to 0 and error logging.

### ent (entando-cli)

* Reworked the `ent diag` command to also export CRs, ingresses, deployments, "previous" pod logs, namespace events, etc.
* ent is now able to sync the kubectl version of the current profile with the server version via `ent auto-align-kubectl`.
* Added the helper `be-log` to `ent prj` to fetch logs from bundle plugins.
* In order to run node-based Entando tools, ent now installs and uses a private copy of node at user-level.
* A jq internal dependency is now installed at user-level, privately to ENT.
* Added the command `ent pkg` to manage packages installed at user-level, with initial support for jq and K9s.
* Added the helpers `get-bundle-id` and `get-plugin-id` to `ent ecr` and `ent prj` to determine the plugin and bundle names of custom resources.
* Added the helper `gen-secret` to `ent ecr` and `ent prj` to generate Secrets for the plugins.
* Added the subcommands `ent ecr cr` and `ent ecr deploy`.
* ent now installs the entando-releases dependencies at release level, allowing multiple profiles to share them.
* Fixed a bug that caused ent to git-ignore the "bundle" subdirs in the MFE branches.
* `ent prj pbs-init` now accepts SSH/HTTPS URLs.
* `ent check-env` now considers Docker and Java mandatory dependencies (still skippable with "--lenient").
* The default K3s version used by the ent quickstart has been updated to v1.21.

### Identity Provider (IdP)

* Keycloak integration has been updated to version 15.
  * Note: Older versions of some OAuth libraries (e.g. spring-boot-starter-oauth2-client, oauth-oidc-sdk) which worked with Keycloak 11 may need to be updated.

### Infrastructure

* Implemented a massive rework of the internal dependency management system with respect to the concept of ProvidedCapability.
* Added support for OpenShift 4.8 and Kubernetes 1.21.
* Added ComponentManager and Keycloak hardening.
* Tuned Entando Platform timeouts and memory limits.
* Moved from a HELM-based deployment process to a pure CustomResource-based deployment and installation process.
* Installation parameters used by the operator have all been moved to the entando-operator-config ConfigMap.
* Implemented better support for cloud DBMS.
* Updated libraries (Jetty, Keycloak, Spring) and the entire compatibility matrix.
* Dropped support for suffix-mode installation. Only single-hostname is supported now.
* Dropped support for cluster-level operator installation.
* Removed EntandoClusterInfrastructure and EntandoCompositeApp CR.
* k8s-service is now part of the base Entando infrastructure and therefore installed alongside the operator.
* ComponentManager now communicates with k8s-service using service-to-service authentication, and strictly within the cluster network.
* Entando Operator deployment is now simply called entando-operator.
* k8s-service deployment dropped the application qualifier and is now simply called entando-k8s-service.
* Fixed an intermittent issue with the operator that prevented installing new bundles until the operator was restarted.
* Updated all the Entando base images for reliability and security.
* Replaced the CentOS images with Rocky images and rebased the derived images.
* Updated the auto provisioned PostgreSQL image to version 14.
* MySQL and PostgreSQL are now served by customized and updated entando-mysql and entando-postgres images.

### Entando Bundler

* It’s now possible to extract protected assets.
* Fixed several bugs in the extraction of pages and widgets.
* Added support for categories.
* Error handling has been improved.
* It's now possible to generate system-level bundles (see [ECR](#entando-component-repository-ecr)).
* Extract/download have been optimized to only touch the relevant resources.
* Libraries have been updated for reliability and security.
* Installed plugins are now extracted via the component manager API. The k8s-service API has been deprecated but is preserved for backwards compatibility.

### EOL Kubernetes Versions

* Dropped official support for OpenShift 3.11

## Breaking Changes

* The internal PostgreSQL version has been updated to version 14. The default version for a plugin database relying on auto provisioning is also now PostgreSQL 14.

## Known Issues

### Apple M1
* Entando does not currently support ARM64 architecture; it cannot be installed on newer Macs built with the Apple M1 processor.

### ECR

* See the [Upgrade Steps](#upgrades) below to upgrade a 6.3.2 ECR to 7.0. As of Entando 7.0, Liquibase support is now in place to enable automatic database upgrades.

## Upgrades

* SQL scripts to upgrade Entando 6.3.x databases to version 7.0 have been provided for all supported vendors (MySQL, PostgreSQL, Oracle). Upgrade scripts are available at the following locations:

  * entando-de-app: https://github.com/entando/entando-de-app/tree/develop/upgrade/6.3.2-to-7.0.0
  * component-manager: https://github.com/entando-k8s/entando-component-manager/tree/develop/upgrade/6.3.2-to-7.0.0

* Entando 7.0 custom resource definitions are backwards compatible with version 6.3.2, allowing an Entando 7.0 application to live in the same cluster as an Entando 6.3.2 application.

## Previous Releases
Refer to the `Versions` list in the left navigation menu to access documentation and release notes for previous versions of Entando.















