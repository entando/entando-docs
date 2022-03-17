---
sidebarDepth: 2
---

# Customize Deployment with Plugin Configuration Profiles

This tutorial describes three methods to utilize configuration profiles to specify resource allocation for Entando plugins. This provides a simple way to customize  plugin deployment parameters for improved efficiency.


The three methods to insert configuration profiles are: 
1. [Inline Profile](#method-1-inline-profile)
2. [Mapped Profile](#method-2-mapped-profile)
3. [Default Profile](#method-3-default-profile)

Currently, the following resources for memory and CPU can be specified. When you specify a `limit` on a resource, it is the maximum allowed for the container. The `request` is the basic amount required of each resource for a container in a pod. These determine which node a pod is assigned to.

```yaml
resources.limits.cpu:       integer, millicpus
resources.limits.memory:    integer, mebibytes
resources.requests.cpu:     integer, millicpus
resources.requests.memory:  integer, mebibytes
```

## Configuration
A profile is a set of configurations encoded as YAML but embedded in the `OperatorConfigMap` as a string, as ConfigMaps can't be multilevel. The examples below use `[your-plugin-id]` and `[your-profile]` as placeholders for your names. Also note `|-` in the sample codes to specify each new line is read as such.

### Retrieve the Plugin ID
First you will need to retrieve the Plugin ID which is calculated during installation and written to the EntandoPlugin Custom Resource as part of the deployment of the plugin micro-service. Use the following command:
```
ent prj get-plugin-id
```

### Method 1: Inline Profile
Add the parameters to the `OperatorConfigMap` as an inline profile at `data/entando.profile.plugins.[your-plugin-id]`. 

Example:

```yaml
data:
  entando.profile.plugins.your-plugin-id: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500"
```
### Method 2: Mapped Profile
1. Create the parameter profile in the `OperatorConfigMap` of the data profile at `data/entando.profile.[your-profile]`.

Example:
```yaml
data:
  entando.profile.your-profile: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500"
```
2. Add a reference in the `profileMapping` file at `data/entando.plugins.profileMapping`:

```yaml
data:
  entando.plugins.profileMapping: |-
    your-plugin-id: your-profile
```

### Method 3: Default Profile
1. Create the parameter profile in the `OperatorConfigMap` in the data profile file at `data/entando.profile.[your-profile]`.

```yaml
data:
  entando.profile.your-profile: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500"
```

2. Add a reference to the profile at data/entando.plugins.defaultProfile:

```yaml
data:
  entando.plugins.defaultProfile: your-profile
```

Please refer to the [Kubernetes documentation on Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more details.




