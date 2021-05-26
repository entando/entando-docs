---
sidebarDepth: 2
---
# Entando CLI

## Overview

The Entando Command Line Interface (CLI) provides a set of commands that accelerate the developer experience by assisting the developer with common tasks such as quickly installing a new copy of Entando, generating an Entando project via JHipster, deploying an Entando Bundle, etc.

## Installation

### Prerequisites

The basic requirements for the CLI vary depending on the category of developer tasks. The Entando CLI is able to install secondary dependencies using the `ent check-env` command as described [here](#check-environment).

| Category | Prerequisite
| :-: | :-:
|Basic Development| git or [git for windows](https://gitforwindows.org)
| | nvm or [nvm for windows](https://github.com/coreybutler/nvm-windows)
| Install Entando in a local VM | [multipass](https://multipass.run/#install)
| Build and publish Entando Bundles | docker and docker-compose
| | a git repository for the bundle artifacts
| | a Docker Hub account (or organization) for microservice Docker images
| Deploy an Entando Bundle | a Kubernetes cluster with admin access. This could be a local cluster (created via the CLI or manually) or a shared remote cluster.

::: tip
 If you follow the automated option in [Getting Started](../getting-started/), then the CLI will be  installed for you along with an Ubuntu VM containing k3s Kubernetes and a quickstart Entando application.
:::

### Install the CLI
Install the current offical release of the CLI via the following command.
``` bash
curl -L https://get.entando.org/cli | bash
```

### Check Environment

Use the `check-env` command to prepare your environment for development. This will verify the presence of additional dependencies (such as git, curl, java, JHipster, etc.) as well as the appropriate versions for your specific Entando instance. In most cases `check-env` will automatically install those dependencies and will prompt the developer for guidance or approval as needed.
``` bash
ent check-env develop
```

### Update the CLI
The CLI can be updated to the latest version (corresponding to your Entando version) using the following command. You should run `ent check-env develop` after updating the CLI in case any dependency versions have changed.

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
```

## Available Commands
Use `ent help` to review the list of available commands.

```
~~~~~~~~~~~~~~~~~~~
 Entando CLI
~~~~~~~~~~~~~~~~~~~

> Essentials:
  - Activate using:  /Users/josephwhite/.entando/ent/v6.3.2/cli/v6.3.2/activate
  - Dectivate using: /Users/josephwhite/.entando/ent/v6.3.2/cli/v6.3.2/deactivate

> Available commands:
  - app                  => Helps managing an EntandoApp
  - app-info             => Displays information about an entando app
  - bundler              => Wrapper for the ENT private installation of the entando bundle tool.
  - check-env            => Checks the environment for required dependencies and settings
  - diag                 => Runs some diagnostic and collects the related info in a tgz file
  - ecr                  => Helps managing an the Entando ECR
  - ent                  => Helps managing an the local ents
  - help                 => Helps in having help
  - host                 => Helps managing the system that hosts the quickstart VM
  - jhipster             => Wrapper for the ENT private installation of jhipster.
  - kubectl              => Helper for using kubectl in ent managed scenarios
  - npm                  => Wrapper for the ENT private installation of npm. This is mostly for internal use
  - pod                  => Displays information related to a set of pods
  - prj                  => Helps managing Entando bundle projects
  - profile              => Helps managing an EntandoApp
  - quickstart           => Helps locally installing entando instances
  - run-tests            => Run the internal tests

> Further info about entando:
  - ~/.entando/ent/v6.3.2/cli/v6.3.2/README.md
  - https://www.entando.com/
  - https://dev.entando.org/

> ⚠ RECOMMENDED FIRST STEP ⚠ :
  - Check the dependencies (ent check-env --help)
```
Check the help text (`--help`) for any command to see its specific options, e.g. `ent check-env --help`.

## Project Management
These are common sequences for an Entando project.

### Project Setup
1. Setup a project directory
``` sh
mkdir testProject && cd testProject
```
2. Generate the project skeleton using the JHipster-based Entando Blueprint.
``` sh
ent jhipster --blueprints entando
```
3. Generate an entity and MFEs.
``` sh
ent jhipster entity Conference
```
4. Build the new project. Using the `ent-prj` wrapper saves having to build each part of the project individually. The first run can be slower due to node downloads for any MFEs.
``` sh
ent prj build
```

See [this tutorial](../../tutorials/backend-developers/generate-microservices-and-micro-frontends.md) for more details.

### Prepare and Publish a Bundle
Use the publication system (pbs) to assemble your Entando project into a bundle that can be loaded into Kubernetes. You'll need your github credentials, a github repository to hold your bundle artifacts, and a Docker Hub account or organization.
1. Initialize the bundle directory
``` sh
ent prj pbs-init
```
2. Publish the build artifacts to github and Docker Hub
``` sh
ent prj pbs-publish
```
3. Create a Kubernetes Custom Resource and apply it to your Entando instance. You can modify the target namespace parameter (`-n`) if you changed it from the default.
``` sh
ent prj generate-cr | ent kubectl apply -n entando -f -
```
See [this tutorial](../../tutorials/ecr/publish-project-bundle.md) for more details.

### Run a Project locally
1. Startup Keycloak. This uses docker-compose under the hood.
``` sh
ent prj ext-keycloak start
```
2. Startup the backend microservices
``` sh
ent prj be-test-run
```
3. Startup one or more of the frontend widgets, each from its own shell.
``` sh
ent prj fe-test-run
```

See [this tutorial](../../tutorials/backend-developers/run-local.md) for more details.

Alternatively, you can perform a completely clean install of the CLI by removing your `~/.entando` directory and then reinstalling the CLI per the instructions above. This will also remove the private copies of JHipster, Entando Blueprint, etc.
``` sh
rm -rf ~/.entando.
```

## Bundle Commands
Use the `ent bundler` command to prepare a bundle for publication or extract a bundle from an application.
1. Prepare a bundle custom resource from a Git repository. The project command (`ent prj generate-cr`) provides a wrapped version of this command. See the help for options including the bundle name, description, repository, etc. The output of this command is a yaml file which can be piped to a file or directly to `ent kubectl` for application to Kubernetes.
``` sh
  ent bundler from-git
```   
See [this tutorial](../../tutorials/ecr/publish-simple-bundle.md) for an example using this command.

2. Point the bundler to an existing Entando application and extract its components (pages, content, etc.) and static assets into a custom bundle. You can use this bundle to migrate Entando components from one environment to another (e.g. Dev to QA), to provide a template for building a new Entando application, or as the skeleton of an Entando solution. The bundler provides an interactive mode which allows you to identify the components to be exported from the application. The output of this command is the same bundle folder structure created by an Entando project including a top-level descriptor file.
``` sh
  ent bundler from-env  
```

You will need to provide an `env.json` file in the same directory where the bundler is run. This is used to configure the application URLs and client credentials.
``` json
{
   "coreBaseApi": "http://<YOUR-DOMAIN-OR-IP>/entando-de-app",
   "k8ssvcApi": "http://<YOUR-DOMAIN-OR-IP>/k8s",
   "clientId": "<YOUR-CLIENT-ID>",
   "clientSecret": "<YOUR-CLIENT-SECRET>"
}
```

See [this tutorial](../../tutorials/ecr/export-bundle-from-application.md) for more instructions on exporting a bundle including how to setup your `env.json`.

## Diagnostic Commands
The following commands can be useful to more quickly understand what is happening with an Entando Application. If you followed the Getting Started steps to setup Entando then the CLI was automatically installed in the Multipass VM and you can run these commands from there.

1. `ent app-info` display basic information about Kubernetes and the Entando resources (e.g. namespace, pods, ingresses)
``` sh
ent app-info
```

2. `ent pod-info` display the `kubectl describe` and `kubectl logs` for each of the major Entando pods in a given namespace.
``` sh
ent pod-info
```

3. `ent diag` list the current pods in a given Entando namespace and prepare a diagnostic tar.gz containing `kubectl describe` and `kubectl logs` for each of the major Entando pods. This can be highly useful when working with Entando Support.
``` sh
ent diag
```
Output:
```
ubuntu@entando:~$ ent diag
Please provide the namespace (entando):
## DNS rebinding protection TEST
## LOCAL INFO
## K8S INFO
> POD: quickstart-kc-deployer-pbyjdp1dom
>       CONTAINER: deployer
> POD: quickstart-eci-deployer-smectg3hxy
>       CONTAINER: deployer
> POD: quickstart-deployer-9ul8cyjtiq
>       CONTAINER: deployer
> POD: quickstart-composite-app-deployer-nlz9lxc6do
>       CONTAINER: deployer
> POD: quickstart-eci-k8s-svc-deployment-79c4894767-5p85d
>       CONTAINER: k8s-svc-container
> POD: quickstart-kc-server-deployment-85987fc84c-flrlw
>       CONTAINER: server-container
> POD: quickstart-operator-7bfd7fc8cd-gd774
>       CONTAINER: operator
> POD: quickstart-server-deployment-f69f84798-g6lx5
>       CONTAINER: server-container
>       CONTAINER: de-container
>       CONTAINER: appbuilder-container
> Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
> Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
```


## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>
