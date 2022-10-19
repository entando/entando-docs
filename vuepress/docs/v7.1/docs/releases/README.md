# Entando 7.1 Release Notes

Entando 7.1.0 is an important feature release that introduces major changes to the bundle subsystem. It supports a brand new create phase, bundle service discovery and App Builder extensibility via Entando Packaged Capabilities (EPCs).

## Summary
- [New docker-based bundles](../curate/bundle-comparison.md) with composable project structures (bundles entirely distributed via Docker/OCI images) 
- Node-based CLI module to manage bundle projects
- Decoupled MFE ⇒ MS communication via service discovery ([API claims](../getting-started/ent-api.md))
- App Builder is now extensible through bundles (supports override of core App Builder components and the addition of EPC extensions)
- App Builder main menu is converted to an overridable bundle containing an MFE and BFF service
- Widgets, pages and bundle assets are now created within the scope of a specific bundle
- Performance optimizations
- Security fixes

### Compatibility

* [Entando 7.1 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.1_Compatibility.pdf)
* [Guides for previous versions of Entando](https://entando.com/page/en/compatibility-guide)

## Breaking Changes
* Improvements to the AppBuilder MFE framework in Entando 7.1 rely on loading MFEs as [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts). Older widget configuration MFEs may need to be upgraded to avoid the use of SPA-style runtime files which will prevent this from working. 
  * The latest [Create React App](https://create-react-app.dev/) defaults to this mode, so upgrading (e.g. `npx install react-scripts@latest`) may be all that is required.
  * Older React apps can be rewired via webpack config overrides using a tool such as [react-app-wired](https://github.com/timarney/react-app-rewired)
  * This console error can indicate the lack of module support in an MFE: `Uncaught TypeError: Cannot read properties of undefined (reading 'webpackJsonpreactchart')`
* [New bundle project structure](../curate/bundle-comparison.md) supported by the [ent bundle CLI](../getting-started/ent-bundle.md) module, with self-contained directories for components and services
* The [Entando Blueprint](../create/blueprint-features.md) has been updated to support the new docker-based bundle structure 

## New Features and Improvements

### App Builder

- Improved handling of special chars in page titles
- App Builder is now extensible via MFEs loaded from bundles:
   - Provides App Builder with alternative core components
   - Introduces new screens accessible from a menu dedicated to EPCs
- The same SEO-friendly code can be used for different languages on the same page
- CSS/text files can be viewed or edited in the App Builder file browser
- Renamed Entando Component Repository (ECR) to Local Hub
- Improved error handling when uninstalling a bundle
- Fixed the clone function for UX fragments
- Minor adjustments to support docker-based bundles 
- Minor fixes related to pagination and usability
- Invoking APIs now sends the authentication header (instead of explicitly sending authentication cookies)
- Added a global object `window.entando` to expose global information (e.g. lang, userPermissions, router) used by MFEs to interact with App Builder

### AppEngine

- Enabled Keycloak authentication for additional core APIs
- Optimized startup procedure in cases where an automatic backup restore is implied
- All APIs now authenticate exclusively through HTTP headers and do not require cookies
- Fixed session invalidation issues

### Entando CLI (ent)

- Dropped support for Entando ≤ 6.3.0 and Kubernetes ≤ 1.18
- [Entando Bundle CLI](#entando-bundle-cli) (`ent bundle` tool) added to ent
- `check-env` updated to automatically install additional dependencies from GitHub packages
- `get-plugin-id` deprecated in favor of `get-plugin-code`
- Minor `ent pkg` fixes
- Added [crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md) as an external package
- Added shortcuts for running internal k9s, crane, jq and fzf (e.g. `ent crane`)
- `ent attach-kubectx` now supports `--current` to attach the current kubectl context (e.g. following an `oc login`)
- Modified `get-bundle-id` to support docker-based bundles
- Fixes to `ent help` and logging
- `ent check-env` now shows a spinner (can be disabled with `--verbose`) instead of printing the full installation output of npm dependencies 
- `ent prj` now supports `--from-hub` initialization
- New variables with overridable defaults: `ENTANDO_CLI_DEFAULT_DOCKER_REGISTRY` and `ENTANDO_CLI_DEFAULT_HUB`
- Implemented `ent config --effective` to show the effective configuration (composition of hard defaults, distribution defaults and profile configuration)
- Now jq is always required by `check-env` (both runtime and develop)
- Experimental support for an enhanced selection menu based on fzf (`ent pkg get fzf`, `ent config --set FZF_SELECT true`)
- Workarounds to mitigate npm bugs in the update process
- `ent-diag` now extracts additional details

### Entando Bundle CLI

- New CLI module "ent bundle" to manage docker-based bundles
- Support for the following workflows:
   - From scratch: User can create a new bundle project and then add components from existing projects or using external tools
   - From template: User can create a bundle project by downloading a template from an Entando Hub
- Complete redesign of the bundle project structure to improve clarity and better separate concerns
- Clear separation of components (MS, MFE, platform-specific)
- Clear separation of bundle sources and packaged artifacts
- A single project file "entando.json" to describe the entire bundle structure, customizations and parameters
- Support for App Builder EPC extensions
- Support for all properties of git-based bundle YAML descriptors
- Support for all properties of docker-based bundles
- Support for service discovery via the [API claims mechanism](../getting-started/ent-api.md)
- Source-level support for bundle thumbnails
- Capability to customize the build, run and packaging commands
- Custom resource descriptor generation for the current bundle and external Docker repositories
- Improved log management during parallel builds
- Improved local testing capabilities and auxiliary services management based on docker-compose
- Support for custom FTL descriptors (override default automatic generation)

### Entando CMS

- Fixed performance issues caused by unnecessary reprocessing of all Content Types

### Infrastructure / Local Hub

- Entando Component Repository renamed to Local Hub
- Support for docker-based bundles
- File structure deployed to AppEngine is redesigned with improved scoping
- Added new MFE widget capabilities:
   - Support for service discovery driven by the [API claims mechanism](../getting-started/ent-api.md)
   - Automatic generation of the widget `configUi` integration code
   - Widgets can receive environmental and system information through a config object
   - Widgets can now access their own static assets
   - Support for explicitly parameterized widgets
   - Asset URLs are now properly scoped
- Improvements to EntandoPlugin ingress management:
   - Canonical ingress path: Determined by the infrastructure and used extensively, from internal communication to service discovery
   - Customized ingress path: An alternative path that can be used by 3rd parties
- Backward compatibility changes to the EntandoPlugin CRD to store both the customized and canonical paths
- Configuration widgets are now independent widgets distinguished by the property "type"
- New bundle descriptor:
   - Support for top-level (unrelated to a widget) EPC menu
   - Changed the identifier field from "code" to "name"
- EntandoDeBundle CR: Related CRD is unchanged, but the CR can store the EntandoGroup information as metadata (annotation)
- Bundles, widgets, plugins and pages installed using docker-based bundle descriptors are now scoped, where scope is defined by the bundle publication URL (no schema)
- Bundles can run after the initialization of the Entando Application, which is currently used to enable the EPC menu in the App Builder

### Security Updates
- Fixed CVE-2022-22969 (spring-security, DoS)
- Fixed CVE-2021-31805 (struts2, RCE)
- Fixed CVE-2022-22965 (spring-beans, RCE)
- Fixed CVE-2022-22950 (spring-expression, DoS)
- Fixed CVE-2022-22968 (spring-context)
- Fixed CVE-2022-26336 (apache poi-scratchpad, DoS)
- Fixed CVE-2022-30126 (apache tika, DoS)
- Fixed CVE-2022-30973 (apache tika, DoS)
- Fixed CVE-2022-22976 (spring-security)
- Fixed CVE-2022-22978 (spring-security-web, Authorization Bypass)
- Fixed CVE-2022-33879 (apache tika, DoS)
- Fixed CVE-2022-24823 (apache netty, Information Exposure)

## Deprecation Warnings
- [git-based bundles](../curate/bundle-comparison.md) and the corresponding `ent prj` commands are now deprecated. Migrating bundles to the new docker-based format is recommended. 
- The runtime option to disable the App Builder (`APPBUILDERINTEGRATIONENABLED: "false"`) and use the Admin Console to manage an Entando Application is now deprecated

## Previous Releases

Refer to the drop-down list of versions in the left navigation menu to access documentation and release notes for previous versions of Entando.