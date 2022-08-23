# Entando 7.1 Release Notes

Entando 7.1.0 is an important feature release that introduces major changes to the bundle subsystem. It supports a brand new create phase, bundle service discovery and AppBuilder extensibility via Entando Packaged Capabilities (EPCs).

## ABSTRACT

- Security fixes
- Node-based CLI module to manage bundle projects
- Decoupled MFE ⇒ MS communication via service discovery (**api-claims**)
- New **eci-bundles** (bundles entirely distributed via Docker/ECI images)
- **Post-initialization** phase
- AppBuilder now extensible through bundles (override of core AppBuilder components and addition of EPC extensions)
- AppBuilder main menu converted to a overridable bundle with **menu MFE and BFF**
- Bundles, widgets and pages now created within the scope of a specific bundle (identified **by** using the **bundle-id**)
- Performance optimizations

### Compatibility

**check**
* [Entando 7.1 Compatibility](https://entando.com/entando-de-app/cmsresources/cms/documents/Entando_7.0_Compatibility.pdf)
* [Guides for other versions of Entando](https://entando.com/page/en/compatibility-guide)

## BUG FIXES AND NEW FEATURES

### Security Updates

#### Dependencies

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

### **AdminConsole:**

- Improved handling of special chars in page titles
- Improved visual and functional integration with new AppBuilder EPC menu

### AppBuilder

- **AppBuilder** is now extensible via MFEs loaded from bundles to provide AppBuilder with alternative core components and/or add new screens reachable through a menu dedicated to EPCs
- Used **"core extensibility"** to rewrite **reprogram?** the AppBuilder main menu as an MFE-BFF pair stored in a bundle. The bundle is automatically installed by the infrastructure.
- The same SEO friendly-code can be used for different languages on the same page
- Fixed ability to show or edit CSS/text files **from/in** the file browser **files are from the file browser? fixed in the browser?**
- Language/nomenclature updates in support of renaming Entando Component Repository (ECR) to **"Local HUB"**
- Bundle uninstall now properly handles **error statuses** originating at the Local Hub
- Fixed clone function for UX fragments
- Minor adjustments to support new generation bundles **in** recent versions of the **HUB**
- Minor fixes related to pagination and graphical glitches
- **Minor fixes to the pagination in different pages**
- Fixed cases in which invoking APIs explicitly sent authentication cookies to send the authentication header only
- Added **waiting installation** screen when core bundles (e.g. the main menu) are not ready in infrastructure. This screen prevents a UI crash during AppBuilder loading.
- Added a global object **in the window called entando**. This object exposes global information (e.g. lang, userPermissions, router) used by MFEs to interact with AppBuilder.

### AppEngine

**EntandoEngine:**

- Restored **Legacy** API by adding proper Keycloak authentication
- Optimized startup procedure in cases where an automatic restore for backup is implied
- All APIs now authenticate exclusively through **the?** header and do not require cookies
- Fixed session invalidation issues caused by **the above confusion**

### Entando CLI (ent)

- Dropped support for Entando <= 6.3.0 and Kubernetes <= 1.18
- Entando CLI gained the [new subcommand](#entando-bundle-cli) `ent bundle` 
- `check-env` updated to automatically install **the new module** from GitHub packages
- Subcommand `get-plugin-id` deprecated in favor of `get-plugin-code`
- Minor `ent pkg` fixes **single or multiple?**
- Added new external package (`ent pkg`) [crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md)
- Added shortcuts for running the internal k9s, crane, jq and fzf (e.g. `ent crane`)
- `ent attach-kubectx` now supports `--current` to attach the current kubectl context (e.g. just after an `oc login`)
- Extended subcommand `get-bundle-id` to support **eci-bundles**
- Fixes to `ent help` and logging
- `ent check-env` now avoids printing the full installation output of npm dependencies and instead shows a spinner (can be disabled with `--verbose`)
- Introduced **"global options"**, which are options to specify immediately after the `ent` command (see `ent help` for details)
- `ent prj` now supports `--from-hub` initialization
- New vars with overridable defaults: `ENTANDO_CLI_DEFAULT_DOCKER_REGISTRY` and `ENTANDO_CLI_DEFAULT_HUB`
- Implemented `ent config --effective` to show the effective configuration (composition of hard defaults, distribution defaults and profile configuration)
- Now jq is always required by `check-env` (both runtime and develop)
- Experimental support for an enhanced selection menu based on fzf (`ent pkg get fzf`, `ent config --set FZF_SELECT true`)
- Workarounds to mitigate npm bugs in the update process
- `ent-diag` now extracts additional details

### Entando Bundle CLI

- New CLI module "ent bundle" to manage new generation bundles
- Support for the following workflows:
   - From scratch: User can create a new bundle project and then add components from existing projects or generate components with external tools
   - From template: User can create a bundle project by downloading a template from an **Entando Hub**
- Complete redesign of the bundle project structure for clarity and **separation of concerns**
- Clear separation of components (MS, MFE, platform-specific)
- Clear separation of bundle sources and packaged artifacts
- A single project file "entando.json" to describe the entire bundle structure, customizations and parameters
- Support for **eci-bundles**
- Support **for** EPC extensions in the project file **for or no for**
- Support for all properties of git-based bundle YAML descriptors
- Support for all new properties of new generation (docker-based) bundles
- Support for **service-discovery** via the **apiClaim** mechanism **backtick or quote?**
- Bundle thumbnail source-level support
- Capability to customize the build, run and packaging commands
- Custom resource descriptor generation for the current bundle and external Docker repositories
- Better log management during parallel builds
- Better local testing capabilities with improved auxiliary services management based on docker-compose
- Support for custom FTL descriptors, overriding default automatic generation

### EntandoCMS
- Fixed performance issues caused by unnecessaryreprocessing of all **content-types**

### Infrastructure / Local Hub

- Entando Component Repository renamed to Local Hub
- Support for **eci-bundles**
- File structure deployed to AppEngine redesigned for better scoping
- Support for new generation (docker-based) MFE widgets, with the following new features:
   - Support for service discovery driven by the **apiClaim mechanism**
   - Automatic generation of the **Widget ConfigUi** **formatting?**
   - Widgets can receive environmental and system information via **config object** **"a"? any in particular? name?**
   - Widgets can now access static assets stored **by? in?** the packaged widget filesystem
   - Support for explicitly parameterized widgets
   - Assets URLs are now properly scoped
- Support for new generation (docker-based) bundles and **AppBuilder-widgets** **`app-builder` widgets?** used by AppBuilder EPC extensibility
- EntandoPlugin **slightly changed -- changes something or is changed?** ingress management logic modified to handle:
   - Canonical ingress path: Determined by the infrastructure and used extensively, from internal communication to service discovery
   - Customized ingress path: An alternative path that can be used by 3rd parties
- Retrocompatible changes to the EntandoPlugin CRD to store both the customized and the canonical path
- Configuration widgets are now independent widgets distinguished by the property "type"
- Support for the EntandoGroup information coming from the HUB **support is coming or info is coming?** to allow AppBuilder to properly build the EPC menu
- New bundle descriptor:
   - Support for top-level (unrelated to a widget) EPC menu
   - Changed the identifier field from "code" to "name"
- EntandoDeBundle CR: Related CRD did not change but the CR can store the EntandoGroup information as metadata (annotation)
- Bundles, widgets, plugins and pages installed using new generation descriptors are now scoped, with scope defined by the bundle publication URL (no schema)
- **Postinit** phase: The infrastructure is now able to automatically install one or more "post-init bundles". This capability is currently used to install the **AppBuilder Menu** EPC, but can be easily customized.


## Previous Releases
Refer to the `Versions` list in the left navigation menu to access documentation and release notes for previous versions of Entando.