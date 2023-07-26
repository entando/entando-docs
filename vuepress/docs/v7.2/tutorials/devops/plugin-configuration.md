---
sidebarDepth: 2
---

# Microservice Configuration Profiles

This tutorial describes three methods to utilize configuration profiles to specify resource allocation for Entando microservices. These provide a simple way to customize microservice deployment parameters for improved efficiency.

## Prerequisites
- [A working instance of Entando](../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Profile Options

The three methods to insert configuration profiles are: 
1. [Inline Profile](#method-1-inline-profile)
2. [Mapped Profile](#method-2-mapped-profile)
3. [Default Profile](#method-3-default-profile)

Currently, the following resources for memory and CPU can be specified. When you specify a `limit` on a resource, it is the maximum allowed for the container. Resource settings help Kubernetes determine in which node a pod should be created.

```yaml
resources.limits.cpu:       integer, millicpus
resources.limits.memory:    integer, mebibytes
```

## Configuration
A profile is a set of configurations encoded as YAML but embedded in the `OperatorConfigMap` as a string, since ConfigMaps cannot be multilevel. The examples below use `YOUR-PLUGIN`, `YOUR-PLUGIN-CODE`, `YOUR-ORG`, `YOUR-BUNDLE` and `YOUR-PROFILE-NAME` as placeholders. Also note the use of `|-` to designate a new line in the code.

### Retrieve the Plugin Code
You will need to [retrieve the plugin code](../../docs/getting-started/entando-cli.md), which is calculated during installation and written to the EntandoPlugin custom resource as part of the deployment of the microservice. 

Use the following command from the root bundle project directory, where `YOUR-ORG` is your Docker organization and `YOUR-BUNDLE` contains the microservice:
```sh
ent ecr get-plugin-code YOUR-ORG/YOUR-PLUGIN-NAME --repo=docker://registry.hub.docker.com/YOUR-ORG/YOUR-BUNDLE
```

### Method 1: Inline Profile
Add the resource parameters to the `OperatorConfigMap` as an inline profile at `data/entando.profile.plugins.YOUR-PLUGIN-CODE`:

```yaml
data:
  entando.profile.plugins.YOUR-PLUGIN-CODE: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
```
### Method 2: Mapped Profile
1. Create the resource parameter profile in the `OperatorConfigMap` of the data profile at `data/entando.profile.YOUR-PROFILE-NAME`:

```yaml
data:
  entando.profile.YOUR-PROFILE-NAME: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
```
2. Add a reference in the `profileMapping` file at `data/entando.plugins.profileMapping`:

```yaml
data:
  entando.plugins.profileMapping: |-
    YOUR-PLUGIN-CODE: YOUR-PROFILE-NAME
```

### Method 3: Default Profile
1. Add the resource parameter profile to the `OperatorConfigMap` in the data section at `data/entando.profile.YOUR-PROFILE-NAME`:

```yaml
data:
  entando.profile.YOUR-PROFILE-NAME: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
```

2. Add a reference to the profile at ```data/entando.plugins.defaultProfile```:

```yaml
data:
  entando.plugins.defaultProfile: YOUR-PROFILE-NAME
```
>Note: If a resouceReguirement was specified in the plugin custom resource, that will override a profile. 

## References
Please refer to the [Kubernetes documentation on Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more details.




