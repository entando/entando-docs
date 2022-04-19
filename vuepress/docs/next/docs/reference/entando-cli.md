---
sidebarDepth: 2
---
# Entando CLI

## Overview

The Entando Command Line Interface (CLI) provides a set of commands that accelerate common tasks such as installing a new instance of Entando, generating an Entando project via JHipster, deploying an Entando Bundle, creating an Entando Application, etc.

## Installation

### Prerequisites

The basic requirements for the CLI vary depending on the category of developer tasks. The CLI is able to install secondary dependencies using the `ent check-env` command as described [here](#check-the-environment).

| Category | Prerequisite
| :-: | :-:
|Basic Development| Git or [Git for Windows](https://gitforwindows.org)
| | nvm or [NVM for Windows](https://github.com/coreybutler/nvm-windows)
| Install Entando in a local VM | [Multipass](https://multipass.run/#install)
| Build and publish Entando Bundles | Docker and Docker Compose
| | a Git repository for the bundle artifacts
| | a Docker Hub account (or organization) for microservice Docker images
| Deploy an Entando Bundle | a Kubernetes cluster with admin access, which can be a local cluster (created via the Entando CLI or manually) or a shared remote cluster

::: tip
 The automated option in [Getting Started](../getting-started/) will install the CLI along with an Ubuntu VM containing K3s Kubernetes and a quickstart Entando Application.
:::

### Install the CLI
Install the current offical release of the CLI via the following command
``` bash
curl -L https://get.entando.org/cli | bash
```

### Check the Environment

Use the `check-env` command to prepare your environment for development. This will verify the presence of required dependencies as well as the appropriate versions for your specific Entando instance. Certain configurations allow `check-env` to automatically install dependencies and prompt the developer for guidance or approval as needed. 
``` bash
ent check-env develop
```

### Update the CLI
The CLI can be updated to the latest version (corresponding to the current Entando version) using 

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
```

Run `ent check-env develop` after updating the CLI to determine if dependency versions have changed.

Alternatively, deleting the `~/.entando` directory with `rm -rf ~/.entando` and then reinstalling the CLI, per the instructions above, will perform a clean install. This will also remove the private copies of JHipster, Entando Blueprint, etc.


## Available Commands
Use `ent help` to review the list of available commands

```
~~~~~~~~~~~~~~~~~~~
 Entando CLI
~~~~~~~~~~~~~~~~~~~

> Essentials:
  - Activate using:  ~/.entando/ent/v7.0.0/cli/v7.0.0/activate
  - Deactivate using: ~/.entando/ent/v7.0.0/cli/v7.0.0/deactivate

> Available commands:
  - app                  => Helper for managing an Entando App
  - app-info             => Displays information about an Entando App
  - bundler              => Wrapper for the ent private installation of the Entando bundle tool
  - check-env            => Checks the environment for required dependencies and settings
  - diag                 => Runs diagnostics and aggregates the related info in a .tgz file
  - ecr                  => Helper for managing the ECR
  - ent                  => Helper for managing the local ents
  - help                 => Help information
  - host                 => Helper for managing the system that hosts the quickstart VM
  - jhipster             => Wrapper for the ent private installation of jhipster
  - kubectl              => Helper for using kubectl in ent managed scenarios
  - npm                  => Wrapper for the ent private installation of npm (mostly for internal use)
  - pod                  => Displays information related to a set of pods
  - prj                  => Helper for managing Entando bundle projects
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
Check a command's help text (`--help`) to view specific options and subcommands, e.g. `ent check-env --help`. For general configuration options related to ent itself, see `ent --help`.

## Project Management
Sequences commonly used with Entando projects are detailed below. 

### Project Setup
1. Create a project directory
``` sh
mkdir testProject && cd testProject
```
2. Generate the project skeleton using the JHipster-based Entando Blueprint
``` sh
ent jhipster --blueprints entando
```
3. Generate an entity and MFEs
``` sh
ent jhipster entity Conference
```
4. Build the new project

``` sh
ent prj build
```

> Note: Using the `ent prj` wrapper avoids having to build each part of the project individually. The first run using `ent prj` can be slower due to MFE node downloads. See [the BLueprint tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md) for more details.

### Prepare and Publish a Bundle
Use the publication system (pbs) to assemble your Entando project into a bundle that can be loaded into Kubernetes. You'll need your GitHub credentials, an empty GitHub repository to hold your bundle artifacts, and a Docker Hub account or organization.
1. Initialize the bundle directory. This method accepts SSH and HTTPS URLs.
``` sh
ent prj pbs-init
``` 
2. Publish the build artifacts to GitHub and Docker Hub
``` sh
ent prj pbs-publish
```
3. Deploy the bundle into the Entando Component Repository
``` sh
ent prj deploy
```
See [Build and Publish a Project Bundle](../../tutorials/create/pb/publish-project-bundle.md) for more details.

### Install the Bundle into an Application
The CLI allows you to install a bundle without accessing the Entando App Builder.

> Note: A bundle must be deployed before it can be installed.

1. Run the following command from the project folder
``` sh
ent prj install
```
2. If a bundle has already been installed, use `--conflict-strategy` to adopt a strategy for existing components (CREATE, SKIP, OVERRIDE)
``` sh
ent prj install --conflict-strategy=OVERRIDE
```

### Run a Project Locally
1. Initialize Keycloak, which leverages Docker Compose
``` sh
ent prj ext-keycloak start
```
2. Initialize backend microservices
``` sh
ent prj be-test-run
```
To fetch logs from bundle plugins, use the command
```
ent prj be-log
```

3. Initialize one or more frontend widgets, each from its own shell
``` sh
ent prj fe-test-run
```
Check out [Run Blueprint-generated Microservices and Micro Frontends in Dev Mode](../../tutorials/create/ms/run-local.md) for more details.

### Bundle and Custom Resource Management
Entando supports a series of `ent ecr` commands to manage bundles and custom resources. The following commands are particularly useful.

Display the list of bundles associated with the current profile
```
ent ecr list
```

Generate a custom resource and deploy it to the current profile
```
ent ecr deploy
``` 

The helpers `get-bundle-id` and `get-plugin-id` have been added to `ent ecr` to calculate and display unique identifiers related to custom resources. This provides additional security controls around bundle-specific and microservice plugin resources.

Determine the bundle identifier
```
ent ecr get-bundle-id YOUR-BUNDLE-REPOSITORY-URL
```

Determine the plugin identifier
```
ent ecr get-plugin-id --auto YOUR-BUNDLE-REPOSITORY-URL
```

### Get the Bundle ID and Plugin ID
Entando uses a unique identifier for your bundle as a way to provide additional security controls around bundle-specific resources. You can determine this identifier with the command 
```sh
ent prj get-bundle-id --auto
```

A unique identifier will also be calculated for each microservice plugin in your project. You can determine this identifier with the command 
```sh
ent prj get-plugin-id --auto --repo=<BUNDLE-REPO-URL>
```

## Bundle Commands
Use the `ent bundler` command to prepare a bundle for publication or extract a bundle from an application.

### Prepare a Bundle for Publication

The project command `ent prj generate-cr` provides a wrapped version of `ent bundler` and prepares a bundle custom resource from a Git repository. Reference the help text for options (e.g. bundle name, description, repository). The output of `ent prj generate-cr` is a YAML file which can be piped to `ent kubectl` for direct application to Kubernetes.

``` sh
  ent bundler from-git
```   
See the [Build and Publish a Simple Bundle tutorial](../../tutorials/create/pb/publish-simple-bundle.md) for an example of how to use `ent prj generate-cr`.

### Extract a Bundle from an Application

Point the bundler to an existing Entando Application to extract its components (pages, content, etc.) and static assets into a custom bundle. This bundle can be used to migrate Entando components from one environment to another (e.g. Dev to QA), as a template for building a new Entando Application, or as the skeleton of an Entando solution. 

The bundler provides an interactive mode to identify the components to export from the application. The bundle folder structure created by an Entando project, including a top-level descriptor file, is generated with the following command.
``` sh
  ent bundler from-env  
```

An `env.json` file to configure the application URLs and client credentials must live in the directory from which the bundler is run.
``` json
{
   "coreBaseApi": "http://<YOUR-DOMAIN-OR-IP>/entando-de-app",
   "k8ssvcApi": "http://<YOUR-DOMAIN-OR-IP>/k8s",
   "clientId": "<YOUR-CLIENT-ID>",
   "clientSecret": "<YOUR-CLIENT-SECRET>"
}
```

Instructions to export a bundle, including how to configure `env.json`, can be found in the [Export and Publish a Bundle tutorial](../../tutorials/create/pb/export-bundle-from-application.md).

## Profile Management
To manage and switch between different ent configurations, use `ent profile`. 

To switch between different Entando Applications, even if they are in different clusters, `ent profile` uses Kubernetes contexts, kubeconfig files, and/or custom commands (refer to `ent profile first-use-readme`).

It is common practice for the vendor tool that connects to a cloud Kubernetes to create a Kubernetes context that must be linked to the profile.

An overview of the current connection and profile information is provided via `ent status`.

1. Create and switch to a new profile
```
ent pro new [profileName] [EntandoAppName] [namespace]

This sets the minimal profile data and explains next steps.
```

2. Link the current profile to a Kubernetes context (alias of `ent attach-kubectx`)
```
ent pro link [contextName]
```
This instructs ent how to connect to the Kubernetes containing the Entando Application.

3. Activate the profile that ent should use across shells
```
ent pro use [profileName]
```

This attempts to fully restore a profile type by considering the login and related Entando Applications.

4. Activate the profile that ent should use within the current shell
```
source ent pro use [profileName]
```

This allows ent instances in different shells to simultaneously use different Kube contexts, kubeconfigs or custom commands. The quickstart script creates a profile named "qs--{vmname}" that is associated with the Entando Application it generates. 

5. Print a list of the available profiles
```
ent pro list
```

6. Delete a profile
```
ent pro delete [profileName]
```

## Configuration Management
The output of `ent config` is a key-value archive of configurations related to the current profile.
It can serve several purposes, but a few "good to know" keys and commands are below.

### Commands
1. Print the current config archive
```
ent config --print
```
3. Interactively edit a config archive
```
ent config --edit
```
4. Return the value of a config key
```
ent config --get {key}
```
5. Set the value of a config key
```
ent config --set {key} {value}
```
6. Delete a config key
```
ent config --set {key}
```
### Keys
| Key  | Definition  |
|---|---|
| ENTANDO_NAMESPACE  |  stores the fallback namespace used by explicit or implicit runs of `ent kubectl` |
|  ENTANDO_APPNAME | stores the Entando Application name related to the current profile |
|  DESIGNATED_JAVA_HOME | stores the path of the Java version used internally by ent |

## Diagnostic Commands
Performing the [Automatic Install](../../docs/getting-started/README.md#automatic-install) found in the Getting Started guide installs the CLI in a Multipass VM. The following commands can be run from this VM for insight into an Entando Application.

1. Display basic information about Kubernetes and Entando resources (e.g. namespace, pods, ingresses)
``` sh
ent app-info
```

2. Display `kubectl describe` and `kubectl logs` for each of the major Entando pods in a namespace
``` sh
ent pod-info
```

3. List the current pods in an Entando namespace and prepare a diagnostic tar.gz 
``` sh
ent diag
```
This outputs `kubectl describe` and `kubectl logs` for each of the fundamental Entando pods. It also exports custom resources, ingresses, deployments, "previous" pod logs, namespace events, etc. Diagnostic information can be highly useful when analyzing and troubleshooting behavior. The command `ent diag` outputs the directory paths of the diagnostic logs, similar to the following

```
> Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
> Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
```

## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>
