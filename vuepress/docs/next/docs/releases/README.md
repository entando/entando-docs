
# Entando 7.0.0 Release Notes

## General

The version 7.0 is a major release with major changes on the K8S infrastructure provisioning mechanism that lead to better security, better reliability and a simplified deployment process. It also brings the new feature "Entando Hub", a rehauled compatibility matrix, development stack upgrades (e.g. JHipster 7.2) and several security fixes and consolidation changes.

## Supported Kubernetes Versions

Explicitly supported versions:

* GKE (k8s 1.20 - 1.21)
* OKD4.8/OCP4.8 (k8s 1.21)
* Vanilla k8s 1.21
* k3s (k8s 1.21)

## Security Updates

* In the CMS fixed a missing escaping of the resourceTypeCode that could have lead to XSS, if the attack was also capable to evade CSP

* Fixed in several modules the following vulnerable dependencies:

    * common-io, velocity, spring, guava, hibernate, struts2, taglibs, tika, apache-cxf, jackson, netty dependencies to non vulnerable versions.

    * This is the related list of CVEs: CVE-2021-22696, CVE-2021-27807, CVE-2021-27906, CVE-2021-28657,, CVE-2017-6888, CVE-2021-20291, CVE-2020-17530, CVE-2020-10693, CVE-2015-5211, CVE-2020-25649, CVE-2018-1000873

* Updated the ECG so that it generates projects with no vulnerable dependencies, with the exception of the swagger-ui which is activated in development mode; at the moment there is in fact no suitable patch for it. Please note that the swagger-ui is not enabled in the production maven profile.

* Most of the existing ECG (blueprint) vulnerabilities have been fixed, but anyway the user is strongly suggested to rerun vulnerabilities scans every time they generate a new bundle. The only remaining vulnerabilities will be fixed with the next minor version of Entando but anyway they are nor exploitable in production. They are in fact only exposed during the internal development process, in particular they concern:

    * the dev webserver, used when developing the app

    * the jest test files, used when running tests with jest

    * general webpack configuration

    * dev utilities, used in the dev environment

    * the postcss utility, used to import the css when building the final artifact


## New Features and Major Fixes

### Entando Hub

The Entando Hub is a new ECR feature that allows sharing bundles between different EntandoApps.

It is composed by:

* Hub Server: Allows creators to publish bundles that users can browse and clients can download.

* Hub Client: Allow curators to browse, pull and install bundles from the Hub Server

### Entando Application

Entando implements the SQL versioning tool Liquibase to track, manage and deploy updates to databases. Refer to [Liquibase Migration](../reference/databases.md#liquibase-migration) to learn how the App Engine automates database schema management and modifications.

### Application Engine

* From version 7.0 AppEngine will be more easily upgradable thanks to a new set of liquibase scripts.
Migration from 6.3.2 to 7.0 will be supported via external script.

* Support for Oracle 18c as external DBMS

* Support for latest Mysql 8.x and Postgres 14.x versions

* Infinispan is now used only for EAP session sharing, object cache is implemented in Redis

* Logging infrastructure moved to Logback

* CMS content API performance optimizations

### App Builder

* Added dash (-) support for fragment code validation

* Improved UI performances affected by instances with a lot of contents and assets

* Performance improvements in page management

* resolved several extended bugs hindering performance and user experience

* reduced size of the application state and started phasing out of obsolete technologies

### Entando Component Generator (ECG)

* Upgrade of JHipster to version 7.2

* ECG now allows the users to use a BOM curated by Entando's and containing more recent dependencies than the standard, for the specific version of jhipster.

* Removing generated .map files from blueprint generated code

* Bug fixes and Error Handling improvement

* Switched to bundle plugin descriptor version 3

### Entando Component Repository (ECR)

* Added support for bundle upgrade, downgrade and update

* Improved the Bundle and in particular Bundle Plugins security and reliability by signing the names

* It's now possible to specify standard and secret environment variables for a Bundle plugin (micro services)

* First experimental support for configuration profiles for bundle plugins

* Better support for bundles and bundle plugins with very long names

* Better management of certain error conditions during installation and update

* Introduction of system-level bundles, which allow to install global static resources

* ECR client now explicitly marks bundles installed with an amended installation plan and allows to recall the plan

* Added support for Oracle 18c

* fixed bug that caused the ECR to indefinitely stay in "busy-state", due to particular failure conditions

* Fixed bug that in some condition prevented the bundle plugin pod to properly restart when scaled down and up again

* Now the ECR properly deletes the plugin pod when the bundle is uninstalled, however the deployment and the volumes are kept

### ENT (entando-cli)

* Reworked the `ent diag` command which now also exports CRs, ingresses, deployments, pod "previous" logs, namespace events etc..

* Ent is now able to sync the kubectl version of your current profile with the server version (ent auto-align-kubectl)

* Added helper to fetch logs from Bundle plugins (ent prj be-log)

* Ent now, in order to run node-based entando tools, installs and uses a private copy of node at user level.

* jq internal dependency now installed at user level, privately to ent

* added command `ent pkg` (management of packages installed at user-level) with the initial support of jq and k9s

* added helpers `get bundle id` and `get plugin id` to `ent ecr` and `ent prj` in order to determine the name of the resources related to a bundle

* added command `ent gen-secret`  to `ent ecr` and `ent prj` in order to help generating secrets for the plugins

* added `ent ecr cr` and `ent ecr deploy` sub commands

* Ent now installs the entando-releases dependencies at release level, allowing multiple profiles to share them.

* Fixed bug that caused ent to git-ignore the "bundle" subdirs from the MFEs branches

* `ent pbs-init` now accepts ssh/git URLs

* `ent check-env` now consider docker and java mandatory dependencies (still skippable with "--lenient")

* Several minor fixes

### ENT Quickstart

Update to support release 7.0.0

Note that the default k3s version used by the entando-cli's ("ent") quickstart has been updated to v1.21

### Identity Provider (IdP)

* Updated Keycloak to version 15

### Infrastructure

* Massive rework of the internal dependency management system over the concept of ProvidedCapability

* Added support for OKD4.8 and kube 1.21

* ComponentManager and Keycloak hardening

* Security:

    * Addressed Vulnerabilities (CVE-2021-44228; CVE-2022-21724; CVE-2021-22569; CVE-2022-23437; CVE-2022-23596; CVE-2021-25738; CWE-20; CWE-400; CWE-451; CVE-2022-21363)

    * Visibility of secrets for bundle microservices has been restricted to their own secrets (README: should we leave this?)

* Tuning of Entando platform timeouts and memory limits

* Moved from a HELM based deployment process to a pure CustomResource based deployment and installation process.

* Installation parameters considered by the operator all moved to the entando-operator-config ConfigMap

* Better support for cloud DBMS

* Updated libraries (Jetty, Keycloak, Spring) and the entire compatibility matrix

* Dropped support for suffix-mode installation, only single-hostname is supported now

* Temporary dropped support for cluster-level operator installation

* Removed EntandoClusterInfrastructure and EntandoCompositeApp CR

* k8s-service now part of the base entando infrastructure and therefore installed alongside the operator

* ComponentManager now speaks with k8s-service using service-to-service authentication and strictly within the cluster network

* entando operator deployment is now simply called "entando-operator"

* k8s-service deployment dropped the application qualifier and is now simply called "entando-k8s-service"

* Fixed intermittent issue on the operator that prevented installing new bundles until the operator was restarted.

* Updated all the entando base images for reliability and security

* Replaced the centos images to rocky images and rebased the derived images

* Updated auto-provisioned postgres image to version 14

* mysql and postgres now served by customized and updated entando-mysql and entando-postgres images

### Entando Bundler

* It’s now possible to extract protected assets

* Fixes several bugs in extraction of pages and widgets

* Added support for categories

* Error handling has been improved

* Able to generate the so called system-level bundles (see ECR)

* Optimizations to only extract/download the relevant resources

* Libraries updates for reliability and security

### EOL Kubernetes Versions

Entando7 drops official support for for OS3.11 and version of kubernetes before the 1.20

### Google Kubernetes Engine (GKE)

* Postponed support to 7.0.1

### Azure Kubernetes Service (AKS)

* Postponed support to 7.0.1

## Certifications

### RedHat Certification

* Certification for Redhat has been postponed to a future release, but OKD4.8 remains one of Entando's main platforms

### Tanzu Kubernetes Grid (TKG) Certification

* Certification for TANZU has been postponed as well

## Breaking Changes

* Internal Postgres version updated to version 14: Bundles that rely on the auto provisioning of postgres may (or may not) be affected.

## Known Issues

### ECG

* The default "detail" widget  generated for the entities doesn't work out of the box.

* Local keycloak loses state across restarts when using --no-recreate option

### ECR

* An in-place upgrade from version 6.3.X to version 7 of the ECR is not possible, while there will be no problem with the future versions.
A simple migration script will be provided.

### GKE

* There is still a known issue with the current nginx ingress that can be worked around this way.
The issue will be solved in the next minor or patch release (6.4.0 or 6.3.3). 

## Deprecation Warnings

* support for version 1 and 2 of the plugin descriptor are deprecated and will be removed in the future

## Previous Releases
Please see the `Versions` list in the main navigation menu above to access documentation and release notes for previous versions of Entando.















