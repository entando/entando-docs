---
sidebarDepth: 2
---
# Entando CLI

## Overview

The Entando Command Line Interface (CLI) is a set of scripts that accelerate the developer experience by automating or guiding a developer through common tasks such as quickly installing a new copy of Entando, generating an Entando project via JHipster, deploying an Entando Bundle, etc.

## Installation

### Prerequisites

The basic requirements for the CLI include the following. The CLI scripts will verify the presence of essential tools, make sure the appropriate versions are used for a particular Entando instance, and install additional tools as needed.

| Category | Prerequisite
| :-: | :-: 
|Basic Development| git or [git for windows](https://gitforwindows.org)
| | nvm or [nvm for windows](https://github.com/coreybutler/nvm-windows)
| Install Entando in a local VM | [multipass](https://multipass.run/#install)
| Build and publish Entando Bundles and microservices | docker and docker-compose
| | a git repository for the bundle artifacts
| | a Docker Hub account (or organization) for the microservice images
| Deploy an Entando Bundle | a Kubernetes instance with admin access. Note: the CLI can do this via multipass. 

::: tip 
 If you used the automated option in the [Getting Started](../getting-started/) process, then you've already installed a copy of the Entando CLI and setup an Entando instance in multipass.
:::

### Install the CLI
Install the current offical release of the CLI via the following command. 
``` bash
curl -L https://get.entando.org/cli | bash
```

Typically the next script to run is `ent-check-env develop` which will install additional dependencies and prompt the developer for guidance or approval as appropriate.

## Available Scripts
You can use `ent-help` to review the list of available scripts.
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
These are common sequences for an Entando Project. See `ent-prj -h` for more options in

### Project Setup
1. Setup a project directory
```mkdir testProject && cd testProject```
2. Use the ent-jhipster wrapper script to generate the project skeleton using the JHipster-based Entando blueprint. The wrapper will ensure the correct version of JHipster is used, and installed if needed.
```ent-jhipster --blueprints entando``` 
3. Use the ent-jhipster wrapper script to generate entities and MFEs.
```ent-jhipster entity Conference```
4. Build the new project. Using the ent-prj wrapper saves having to build each part of the project individually. The first run can be slower due to node downloades for any MFEs.
```ent-prj build```

### Run a Project locally
1. Startup Keycloak. This uses docker-compose under the hood.
```ent-prj ext-keycloak start```
2. Startup the backend microservices
```ent-prj be-test-run```
3. Startup one or more of the frontend widgets, each from its own shell.
```ent-prj fe-test-run```

### Prepare and Publish a Bundle
Use the publication system (pbs) to assemble your Entando project into a bundle that can be loaded into Kubernetes. You'll need your github credentials, a github repository to hold your bundle artifacts, and Docker Hub account or organization here.
1. Initialize the bundle directory
```ent-prj pbs-init```
2. Publish the build artifacts to github and Docker Hub
```ent-prj pbs-publish```
3. Create a Kubernetes Custom Resource so this project can be added or updated to your Entando instance.
```ent-prj generate-cr > testProject.yaml```
4. You can now apply the yaml file to Kubernetes via kubectl or use a wrapper script to do so in one step
```ent-prj generate-cr | ent-kubectl create```

## Bundler
TODO:


## Reference
* Source repository: <https://github.com/entando/entando-cli/tree/develop>


 





