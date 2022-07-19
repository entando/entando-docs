---
sidebarDepth: 1
---

# Entando CLI

The Entando Command Line Interface (CLI) tool--ent--provides a set of commands that accelerate common tasks such as installing a new instance of Entando, building projects, creating and deploying bundles, and composing Entando Applications. This overview covers the basic install, set-up, and command list for the ent tool.

For specific topics, follow these links:
1. [ent bundle: Project Management](ent-bundle.md)
2. [ent api: API Management](ent-api.md)
3. [ent svc: Keycloak and Database Management](ent-svc.md)
4. [ent profile: User Profile Management](ent-profile.md)
5. [ent diag: Diagnostics and Troubleshooting](ent-diag.md)

### Prerequisites

The basic requirements for the CLI vary depending on the type of developer tasks as shown here. Ent is able to install secondary dependencies using the `ent check-env` command as described [here](#check-the-environment).

| Category | Prerequisite
| :- | :-
|Basic Development| Git or [Git for Windows](https://gitforwindows.org)
| Install Entando in a local VM | [Multipass](https://multipass.run/#install)
| Build, Package and Publish Entando Bundles | Docker and Docker Compose
| | a Docker Hub account (or organization) Docker images
| Deploy an Entando Bundle | a Kubernetes cluster with admin access or a shared remote cluster

>TIP
>The automatic option in [Getting Started](../getting-started/) will install the CLI along with an Ubuntu VM containing K3s Kubernetes and a quickstart Entando Application.


## Install the CLI
Install the current offical release of the CLI with the following command:
``` bash
curl -L https://get.entando.org/cli | bash
```

## Commands Overview
Use `ent help` to review the list of available commands.

```
~~~~~~~~~~~~~~~~~~~
 Entando CLI
~~~~~~~~~~~~~~~~~~~

> Essentials:
  - Activate using:  ~/.entando/ent/v7.0.0/cli/v7.0.0/activate
  - Deactivate using: ~/.entando/ent/v7.0.0/cli/v7.0.0/deactivate
> Syntax:
ent [command] [subcommand] [name] [flags]

> ent Commands:
  - app                  => Helper for managing an Entando App
  - app-info             => Displays information about an Entando App
  - bundle               => Helper for managing bundle functions. See below for more details
  - check-env            => Checks the environment for required dependencies and settings
  - diag                 => Runs diagnostics and aggregates the related info in a .tgz file
  - ent                  => Helper for managing the local ent installations
  - ecr                  => Helper for managing the ECR
  - help                 => Help information
  - host                 => Helper for managing the system that hosts the quickstart VM
  - jhipster           (not there)
  - kubectl              => Helper for using kubectl in ent managed scenarios
  - node-cmd-wrapper    => wrapper of node commands
  - pod                  => Displays information related to a set of pods
  - prj                 => Helper for managing Entando bundle projects
  - profile              => Helper for managing an Entando App
  - quickstart           => Helper for installing Entando instances locally
  - run-tests            => Runs the internal tests
> Further info about entando:
  - ~/.entando/ent/v7.0.0/cli/v7.0.0/README.md
  - https://www.entando.com/
  - https://developer.entando.com/

> ⚠ RECOMMENDED FIRST STEP ⚠ :
  - Check the dependencies (ent check-env --help)
```
```
~~~~~~~~~~~~~~~~~~~
 ent bundle CLI
~~~~~~~~~~~~~~~~~~~
VERSION
  @entando/entando-bundle-cli/0.0.1-ENG-3939-PR-101 darwin-x64 node-v14.19.0

USAGE
  $ ent bundle [COMMAND]

TOPICS
  api  Manage API claims
  mfe  Micro Frontend operations
  ms   Microservice operations
  svc  Manage auxiliary services

COMMANDS
  build        Build bundle components
  generate-cr  Generate the Entando Custom Resource (CR) for a bundle project
  help         Display help for ent bundle.
  info         Show status information for the bundle project
  init         Perform the scaffolding of a bundle project
  list         List the available components in the bundle
  pack         Generate the bundle Docker images
  publish      Publish bundle Docker images
  run          Run bundle components

```

 
### Check the Environment

Use the `check-env` command to prepare your environment for development. This will verify the presence of required dependencies as well as the appropriate versions for your specific Entando instance. Typically, it will automatically install dependencies and prompt the developer for guidance or approval as needed. 
``` bash
ent check-env develop
```
>Check a command's help text (`--help`) to view specific options and subcommands, e.g. `ent check-env --help`.

### Update the CLI
To update ent to the latest version:

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
```

Run `ent check-env develop` after updating to determine if dependency versions have changed.

Alternatively, deleting the `~/.entando` directory with `rm -rf ~/.entando` and then reinstalling the CLI, per the instructions above, will perform a clean install. This will also remove the private copies of JHipster, Entando Blueprint, etc.

### Customize Quickstart
The `ent quickstart` command supports parameters to customize your quickstart environment. These options allow you to modify specific properties of your VM, installation versions and databases.

For example, to reuse an existing VM:
``` sh
ent quickstart --vm-reuse=YOUR-EXISTING-VM
```
For additional information, check the output of
``` sh
ent quickstart --help
```
<!--
  - api               => Add or remove an internal API claim on the given component
  - build             => Build components (mfe, ms) with a selector
  - generate-cr       => Generate Entando Custom Resource from a bundle project or from the Docker registry
  - init              => Initialize project folder structure and descriptor
  - list              => List project components (ms, mfe, epc)
  - mfe               => Add, initialize, or remove mfe project components
  - ms                => Add, initialize, or remove ms project components
  - pack              => Create distribution artifacts (Docker images)
  - publish           => Publish distribution artifacts to a Docker registry
  - run               => Run bundle components
  - svc               => Enable, disable, list, start, stop, restart, or show logs for a service for the bundle project
-->


### Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>