---
sidebarDepth: 1
---

# Entando CLI

The Entando Command Line Interface, **ent**, provides a set of commands that accelerate common tasks such as installing a new instance of Entando, building projects, creating and deploying bundles, and composing Entando Applications. This document covers the install, command list, and a few operations to start using the ent tool.

For specific topics, follow these links:
1. [Bundle Management](ent-bundle.md): `ent bundle`
2. [API Management](ent-api.md): `ent bundle api`
3. [Services Management](ent-svc.md): `ent bundle svc`
4. [Profile Management](ent-profile.md): `ent profile`
5. [Diagnostics and Troubleshooting](ent-diag.md): `ent diag`

### Prerequisites

The basic requirements for the CLI vary with use case, as shown in the table below. 

| Category | Prerequisite
| :- | :-
| Basic Development| Git or [Git for Windows](https://gitforwindows.org)
| Install Entando in a local VM | [Multipass](https://multipass.run/#install)
| Build, Package and Publish Entando Bundles | Docker and Docker Compose
| | A Docker Hub account for Docker images
| Deploy an Entando Bundle | A Kubernetes cluster with admin access or a shared remote cluster


## Install the CLI
Install the current official release of the CLI:

<EntandoCode> bash <(curl -L "https://get.entando.org/cli") --update --release="{{ $site.themeConfig.entando.fixpack.v71 }}" </EntandoCode>

>The automatic option in [Getting Started](../getting-started/) will install the CLI along with a quickstart Entando Application.

## Command List
Use `ent help` to review the list of available commands.\
Use `ent [command] --help` for command details.
```
~~~~~~~~~~~~~~~~~~~
 Entando CLI
~~~~~~~~~~~~~~~~~~~

> Essentials:
  - Activate using:  ~/.entando/ent/v7.1.0/cli/v7.1.0/activate
  - Deactivate using: ~/.entando/ent/v7.1.0/cli/v7.1.0/deactivate

> ent Commands:
  - app                  => Helper for managing an Entando App
  - app-info             => Displays information about an Entando App
  - bundle               => Helper module for managing Docker-based (v5) bundles. (See below for more details)
  - bundler              => Export resources from a running instance as a git-based (v1) bundle
  - check-env            => Checks the environment for required dependencies and settings
  - diag                 => Runs diagnostics and aggregates the related info in a .tgz file
  - ent                  => Helper for managing the local ent installations
  - ecr                  => Helper for managing the ECR
  - help                 => Help information
  - jhipster             => wrapper for the ent installation of JHipster
  - kubectl              => Helper for using kubectl in ent managed scenarios
  - pod                  => Displays information related to a set of pods 
  - prj                  => Helper for managing Entando git-based (v1) bundle projects (deprecated)
  - profile              => Helper for managing an Entando App
  - quickstart           => Helper for installing Entando instances locally
  - run-tests            => Runs the internal tests
> Further info about entando:
  - ~/.entando/ent/v7.1.0/cli/v7.1.0/README.md
  - https://www.entando.com/
  - https://developer.entando.com/

> ⚠ RECOMMENDED FIRST STEP ⚠ :
  - Check the dependencies (ent check-env --help)
```
**New for Entando 7.1**

```
~~~~~~~~~~~~~~~~~~~
 ent bundle CLI
~~~~~~~~~~~~~~~~~~~
VERSION
  @entando/entando-bundle-cli/1.0.1 darwin-x64 node-v14.19.0

USAGE
  $ ent bundle COMMAND

TOPICS
  api  Manage API claims
  mfe  Micro Frontend operations
  ms   Microservice operations
  svc  Manage auxiliary services

COMMANDS
  build        Build bundle components
  deploy       Deploy a bundle to the Local Hub of an Entando Application
  generate-cr  Generate the Entando Custom Resource (CR) for a bundle project
  help         Display help for ent bundle.
  info         Show status information for the bundle project
  init         Perform the scaffolding of a bundle project
  install      Install a bundle in the Local Hub of an Entando Application
  list         List the available components in the bundle
  pack         Generate the bundle Docker images
  publish      Publish bundle Docker images
  run          Run bundle components

DEBUG MODE
--debug        To enable debug mode for bundle operations    

```
### Check the Environment

Verify dependencies required by your Entando installation:
``` bash
ent check-env develop
```

### Update the CLI
To update ent to the latest version and check for dependencies:

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
ent check-env develop
```
>Alternatively, to perform a clean install, delete the `~/.entando` directory via `rm -rf ~/.entando`. Then reinstall the CLI using the instructions above. This will also remove the private copies of JHipster, Entando Blueprint, etc.

### Enable Debug Mode
To utilize the debug mode for ent bundle commands:
``` sh
 ent --debug bundle <command>
```

### Customize Quickstart
The `ent quickstart` command accepts parameters to customize your quickstart environment. These options allow you to modify specific properties of your VM, installation versions and databases.

|Operation |Syntax|Description|
|:--|:--|:--|
|ent quickstart| ent quickstart --vm-reuse=YOUR-EXISTING-VM| Reuse an existing VM
||ent quickstart --release="v7.1.0" | Use a specific release version for the install


## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>