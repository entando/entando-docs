---
sidebarDepth: 2
---
# Entando 6.3.0 Release Notes

## New Features and Major Fixes

### Infrastructure

* Enhanced the Entando Operator so it can run on a dedicated namespace and support multiple Entando Applications in different namespaces.

    * This enables a separation of privileges so the operator can be managed by Kubernetes administrators and an Entando Application can be managed by users with access to a specific namespace.

* Upgraded to Java 11 for all core Entando docker images

* Improved support for Google GKE, Azure AKS, and Amazon EKS cloud deployments

* Added support for OpenShift 4.X via quickstart templates

* Added configuration options so the Entando Component Repository can deploy bundles based on private registries and repositories

* Improved support for more complex topologies of TLS enabled ingresses

* Added support for single domain configurations

    * In previous versions Entando used subdomains to expose subsystems and bundle microservices. Entando 6.3 can now operate under a single domain using the url path for routing. This can simplify infrastructure and certificate management.

* Enabled tuning the resource requirements of the core service pods

* Made Jboss EAP and Wildfly cache configuration available on the default docker images for the core services

* Added support for using Kubernetes secrets for external database

* Added options to preserve persistent volumes when a related Entando custom resource is deleted

* Simplified propagation of environment parameters

* Supported clustered caching based on Redis, including using the Redis client frontend for node-local caching

### New Use Cases

* Added capability to integrate with an external OIDC identity provider

* Added integration with Azure WAF

* Supported GKE installation in development configurations

### Security Fixes

* XSS: Added a default, mandatory Content Security Policy (CSP) to cover cases outside the scope of input sanitization

    * This policy increases the security of all modules deployed within Entando, whether developed by Entando, clients, or 3rd parties.

    * The CSP can be customized via Entando system parameters.

    * The authorization data required by CSP (the "nonce") is automatically applied to elements developed within AppBuilder or installed via Entando Bundles.

    * Developers should be aware of the constraints imposed by CSP, in particular with regard to code dynamic evaluation and event management. See Google’s CSP guide for more details: <https://developers.google.com/web/fundamentals/security/csp>

* Applied fixes for sanitization/path traversal indicated by static code analysis

* Updated encryption algorithms (to AES and SHA256) for two cases of token generation

    * These changes are not compatible with older versions of Java 8.

* Fixed XXE cases by updating and configuring the XML object factories 

    * These fixes are not compatible with older versions of Java 8.

* Removed support for weak encryption algorithms, including MD5, Argon, 3DES

* Updated to recent and more secure versions of spring-boot, Apache CXF, Keycloak engine and client libraries

* Improved log sanitization

### Entando Component Repository (ECR)

* Upgraded to Java 11 for all Entando Bundles

* Renamed *entando-bundle-cli* repository and tool to *entando-bundler* (or just *bundler*) to avoid confusion with the new *entando-cli* command line tool

* Added the ability to export all content in an Entando Application via the *entando-bundler*

    * This does not include users but does include groups and permissions.

    * In some cases, an exported bundle may need to be manually updated before importing it into another Entando application (e.g. if the css for a widget is pointing to a root resource) 

* Added a *forced overwrite* installation strategy for Entando Bundles that creates new objects or updates existing objects in order to allow business cases like:

    * 1) continuous deployment in development scenarios

    * 2) continuous deployment of staging to production

    * 3) migration of Entando Applications. The developer/admin will still be responsible for the update of data structures, as appropriate.

    * 4) develop a component, export as a bundle, import to a QA or test instance, then import into a production instance

* Improved the bundle plugin descriptor to provide new capabilities. New properties:

    * 1) *deploymentBaseName*: The base name to assign to the Kubernetes pods. If not present the base name will be generated from the docker organization, image name and image version. If the generated name is too long it will be truncated in order to respect Kubernetes constraints.

    * 2) *ingressPath*: the ingress path to assign to the plugin deployment

    * 3) *permissions*: a list of Keycloak clientId / role mappings

### Developer Experience

* Entando 6.3 now includes a Command Line Interface, *entando-cli* or simply *ent*, intended to accelerate Entando development by automating common development tasks. The CLI can been used to do the following:

    * Simplify the quickstart install process via a one line script leveraging a multipass VM for direct install via *ent quickstart*

    * Prepare a developer environment via *ent check-env* which installs tools such as npm, git, jhipster. The correct version of each dependency is installed based on the Entando version configured in the developer environment and uses private installs of npm-based tools to avoid conflicts across projects.

    * Create, build, and publish bundles via project-level commands such as *ent jhipster* and *ent prj*.

    * Use the *ent bundler* command to help prepare bundle custom resources or to export a complete bundle from an existing Entando Application.

    * Use helper commands such as *ent app-info*, *ent pod-info*, and *ent diag* to collect diagnostic information related to an Entando application and which can be shared with Entando Support.

    * (experimental) Use helper commands such as *ent attach-vm* and *ent kubectl* to interact with an Entando application.

    * For more information on the CLI see [this page](../reference/entando-cli.md).

* Added compatibility fixes when running Entando tools on Linux, MacOS, and Windows 10.

### Quickstart Installs

* Enabled the one step HTTP installer for use on Linux, MacOS, and Windows 10 to set up a fully functional Entando Application in Kubernetes.

* Added support for Windows 10 mshome.net-based addresses when installing a quickstart via the Entando CLI.

* Provided a new template for deploying the Entando operator into a dedicated namespace

* Enhanced the quickstart so base docker images can be specified. This is required for scenarios where only private registries are allowed.

### AppBuilder

* Streamlined and simplified the Page and Content creation workflow

* Improved the Page Management and Page Designer UX to ease page design and configuration

* Added Welcome Wizard guided tutorial to help new users create a fully functional page in a new Application and introduce them to the main features of the App Builder interface

* Added Profile → Preferences options to allow users to customize their App Builder experience. Current settings include the Welcome Wizard, Missing Translation Warning, and Load on Page Select.

## Deprecation Warnings

* ECR: The format of the Bundle Plugin descriptor has been updated. The format used in Entando 6.2 has been deprecated.

## Open Issues

* ECR: The *forced overwrite* scenario when installing an Entando Bundle can only be utilized via API calls. A user interface will be provided in a future release.

* MySQL support will be restored in a patch release

## Previous Releases
Please see the `Versions` list in the main navigation menu above to access documentation and release notes for previous versions of Entando.