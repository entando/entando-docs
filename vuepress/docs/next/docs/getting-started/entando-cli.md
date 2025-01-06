---
sidebarDepth: 1
---

# Entando CLI

The Entando command line interface, **ent**, provides a set of commands that accelerate common tasks such as installing Entando, building projects, creating and deploying bundles, and composing Entando Applications. This document covers some basic commands to start using the ent tool.

For specific topics, follow these links:
1. [Bundle Management](ent-bundle.md): `ent bundle`
2. [API Management](ent-api.md): `ent bundle api`
3. [Services Management](ent-svc.md): `ent bundle svc`
4. [Profile Management](ent-profile.md): `ent profile`
5. [Diagnostics and Troubleshooting](ent-diag.md): `ent diag`

### Prerequisites

The requirements for ent functionality vary with each use case, shown in the table below. 

| Category | Prerequisite
| :- | :-
| Basic Development| Git or [Git for Windows](https://gitforwindows.org)
| Install Entando in a local VM | [Multipass](https://multipass.run/#install)
| Build, Package and Publish Entando Bundles | Docker and Docker Compose
| | A Docker Hub account for Docker images
| Deploy an Entando Bundle | A Kubernetes cluster with admin access or a shared remote cluster


## Install the CLI
Install the current official release of the CLI:

<EntandoCode> bash <(curl -L "https://get.entando.org/cli") --update --release="{{ $site.themeConfig.entando.fixpack.v73 }}" </EntandoCode>

>The automatic option in [Getting Started](../getting-started/) will also install the CLI along with a quickstart Entando ACP.

## Command List
Use `ent help` to review the list of available commands.\
Use `ent [command] --help` for command details.
```
> Available commands:
  - app-info             => Displays information about an entando app
  - bundle               => Management of entando bundles (v5 or higher)
  - bundler              => Export of resources from a running instance and older-generation bundle management 
  - check-env            => Checks the environment for required dependencies and settings
  - diag                 => Runs diagnostics and aggregates the related info in a .tgz file
  - ecr                  => Helper for managing the ECR
  - ent                  => Helper for managing the local ent installations
  - help                 => Help information
  - jhipster             => Wrapper of the ent-internal installation of jhipster
  - kubectl              => Helper for using kubectl in ent managed scenarios
  - pod                  => Displays information related to a set of pods
  - prj                  => Helper for managing the first generation of Entando bundle projects
  - profile              => Helps manage the EntandoApp
  - quickstart           => Helper for installing Entando instances locally
  - run-tests            => Runs the internal tests

> Global options:
  --profile|-p {profile}   forces the use of the given profile
  --no-profile|-P          forces the use of no profile       
  --debug|-d               enables the debug mode for some command
  --color                  disables the explicit suppression of the colors for some command
```
Use `ent bundle --help` for details on the bundle command.

```
~~~~~~~~~~~~~~~~~~~
 ent bundle CLI
~~~~~~~~~~~~~~~~~~~

USAGE
  $ ent bundle COMMAND

TOPICS
  api  Manage API claims
  mfe  Micro Frontend operations
  ms   Microservice operations
  svc  Manage auxiliary services

COMMANDS
  build        Build the bundle components
  deploy       Generate the CR and deploy it to the currently attached EntandoApp
  generate-cr  Generate the Entando Custom Resource (CR) for a bundle project
  help         Display help for ent bundle
  images       List the Docker images and their corresponding tags that are
               included in the bundle
  info         Show status information for the bundle project
  init         Perform the scaffolding of a bundle project
  install      Install a bundle in the current directory to the currently attached EntandoApp 
  list         List the available components in the bundle
  pack         Generate the bundle Docker images
  publish      Publish the bundle Docker images
  run          Run bundle components

DEBUG MODE
--debug        To enable debug mode for bundle operations    

```
### Check the Environment

Verify the dependencies required by your Entando installation:
``` bash
ent check-env develop
```

### Update the CLI
To update ent to the latest version and check for dependencies:

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
ent check-env develop
```
>Alternatively, to perform a clean install, delete the `~/.entando` directory with the flags `rm -rf ~/.entando`. Then reinstall the CLI using the instructions above. This will also remove the private copies of JHipster, Entando Blueprint, etc.

### Enable Debug Mode
To utilize the debug helper for ent bundle commands:
``` sh
 ent --debug bundle <command>
```

### Customize Quickstart
The `ent quickstart` command accepts parameters to customize your quickstart environment. These options allow you to modify specific properties of the VM, installation versions, and databases.

|Operation |Syntax|Description|
|:--|:--|:--|
|ent quickstart| ent quickstart --vm-reuse=YOUR-EXISTING-VM| Reuse an existing VM
||ent quickstart --release="{{ $site.themeConfig.entando.fixpack.v73 }}" | Use a specific release version for the install


## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>