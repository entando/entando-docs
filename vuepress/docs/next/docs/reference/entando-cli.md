---
sidebarDepth: 2
---
# Entando CLI

## Overview

The Entando Command Line Interface (CLI) is a set of scripts that accelerate the developer experience by assisting the developer with common tasks such as quickly installing a new copy of Entando, generating an Entando project via JHipster, deploying an Entando Bundle, etc.

## Installation

### Prerequisites

The basic requirements for the CLI vary depending on the category of developer tasks. The Entando CLI is able to install secondary dependencies using the `ent-check-env` tool as described [here](#check-environment). 

| Category | Prerequisite
| :-: | :-: 
|Basic Development| git or [git for windows](https://gitforwindows.org)
| | nvm or [nvm for windows](https://github.com/coreybutler/nvm-windows)
| Install Entando in a local VM | [multipass](https://multipass.run/#install)
| Build and publish Entando Bundles and microservices | docker and docker-compose
| | a git repository for the bundle artifacts
| | a Docker Hub account (or organization) for the microservice images
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

Use the `check-env` script to prepare your environment for development. This will verify the presence of additional dependencies (such as git, curl, java, JHipster, etc.) as well as the appropriate versions for your specific Entando instance. In most cases `check-env` will automatically install those dependencies and will prompt the developer for guidance or approval as needed.
``` bash
ent check-env develop
```

## Available Tools
You can use `ent help` to review the list of available tools. Check the help text (`-h`) for any tool to see its specific options, e.g. `ent check-env -h`.

```
~~~~~~~~~~~~~~~~~~~
 Entando CLI tools
~~~~~~~~~~~~~~~~~~~

> Available tools:
  - ent-app-info         => Displays information about an entando app | Syntax: ent-app-info [namespace]
  - ent-bundler          => Wrapper for the ENT private installation of the entando bundle tool.
  - ent-check-env        => Checks the environment for required dependencies and settings | Syntax: ent-check-env [--lenient] <env-type>
  - ent-diag             => Runs some diagnostic and collects the related info in a tgz file | Syntax: ent-diag namespace
  - ent-help             => Helps in having help | Syntax: ent-help
  - ent-host             => Helps managing the system that hosts the quickstart VM | Syntax: ent-host update-hosts-file ...
  - ent-jhipster         => Wrapper for the ENT private installation of jhipster.
  - ent-kubectl          => Helper for using kubectl in ent managed scenarios | Syntax: (run ent-kubectl -h)
  - ent-npm              => Wrapper for the ENT private installation of npm. This is mostly for internal use
  - ent-pod-info         => Displays infomations related to a set of pods | Syntax: ent-pod-info namespace pod-name-pattern
  - ent-prj              => Helps managing Entando bundle projects | Syntax: (run ent-prj -h)
  - ent-quickstart       => Automatically execute the quickstart deployment | Syntax: ent-quickstart options
  - ent-run-tests        => Run the internal tests | Syntax: ent-run-tests update-hosts-file ...

> Further info about entando:
  - https://www.entando.com/
  - https://dev.entando.org/

> ⚠ RECOMMENDED FIRST STEP ⚠ :
  - Check the dependencies (ent-check-env -h)
```

## Project Management
These are common sequences for an Entando Project.

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
4. Build the new project. Using the ent-prj wrapper saves having to build each part of the project individually. The first run can be slower due to node downloads for any MFEs.
``` sh
ent prj build
```

See [this tutorial](../../tutorials/backend-developers/generate-microservices-and-micro-frontends.md) for more details.

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


### Prepare and Publish a Bundle
Use the publication system (pbs) to assemble your Entando project into a bundle that can be loaded into Kubernetes. You'll need your github credentials, a github repository to hold your bundle artifacts, and Docker Hub account or organization.
1. Initialize the bundle directory
``` sh
ent prj pbs-init
```
2. Publish the build artifacts to github and Docker Hub
``` sh
ent prj pbs-publish
```
3. Create a Kubernetes Custom Resource so this project can be added or updated to your Entando instance.
``` sh
ent prj generate-cr > testProject.yaml
```
4. You can now apply the yaml file to Kubernetes via kubectl or use a wrapper script to do so in one step
``` sh
ent prj generate-cr | ent-kubectl create
```

See [this tutorial](../../tutorials/backend-developers/run-local.md) for more details.

## Updating the CLI
The CLI can be updated to the latest version using the following command. You should run `ent check-env develop` after updating the CLI in case any dependency versions have changed.

``` sh
bash <(curl -L "https://get.entando.org/cli") --update
```

Alternatively, you can perform a completely clean install of the CLI by removing your `~/.entando` directory and then reinstalling the CLI per the instructions above. This will also remove the private copies of JHipster, Entando Blueprint, etc. 
``` sh
rm -rf ~/.entando.
```

## Diagnostic Scripts
The following scripts can be useful to more quickly understand what is happening with an Entando Application. These scripts should be run on the machine If you're using Multipass the CLI has automatically been installed in the VM.
1. `ent app-info` - display basic information about Kubernetes and the Entando resources (e.g. namespace, pods, ingresses)
``` sh
ent app-info
```

2. `ent pod-info` - display the `kubectl describe` and `kubectl logs` for each of the major Entando pods in a given namespace.
``` sh
ent pod-info
```

3. `ent diag` - list the current pods in a given Entando namespace and prepare a diagnostic tar.gz containing `kubectl describe` and `kubectl logs` for each of the major Entando pods. This can be highly useful when working with Entando Support. 
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
> Collected diagdata available under "/home/ubuntu/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
> Collected diagdata available in archive "/home/ubuntu/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
```


## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>


 





