---
sidebarDepth: 2
---

# Customize Deployment with Plugin Configuration Profiles

This tutorial describes three methods to utilize configuration profiles in the OperatorConfigMap to specify resource allocation. This provides a simple way to customize the deployment parameters of Entando bundle plugins for improved efficiency.

The three methods to insert Configuration profiles are: 
1. As [Inline Profile](#method-1-inline-profile),
2. [Mapped Profile](#method-2-mapped-profile), or 
3. [Default Profile](#method-3-default-profile)

Currently, the following parameters for the memory and CPU resources are supported for specifying. When you specify a `limit` on a resource, that is the maximum allowed for the container. The `request` for containers in a pod determines which node the pods are placed on, dependent on the availability of that resource. 

```yaml
resources.limits.cpu:       integer, millicpus
resources.limits.memory:    integer, mebibytes
resources.requests.cpu:     integer, millicpus
resources.requests.memory:  integer, mebibytes
```

## Configuration
A profile is a set of configurations encoded as yaml but embedded in the OperatorConfigMap as a string, since Config-Maps can't be multilevel. All the examples below use the name `[your-plugin]` and `[your-profile]` as a placeholder for your file names. Also note the sequence `|-` in the sample codes.

### Method 1: Inline Profile
Add the parameters to the OperatorConfigMap as an inline profile at `data/entando.profile.plugins.[your-plugin]`. 

Example:

```yaml
data:
  entando.profile.plugins.your-plugin: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500"
```
### Method 2: Mapped Profile
1. Create the parameter profile in the OperatorConfigMap of the data profile at `data/entando.profile.[your-profile]`.

Example:
```yaml
data:
  entando.profile.your-profile: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500”
```
2. Add a reference in the profileMapping file at path data/entando.plugins.profileMapping:

```yaml
data:
  entando.plugins.profileMapping: |-
    your-plugin: your-profile
```

### Method 3: Default Profile
1. Create the parameter profile in the OperatorConfigMap in the data profile file at `data/entando.profile.[your-profile]`.

```yaml
data:
  entando.profile.your-profile: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
    resources.requests.cpu: "500"
    resources.requests.memory: "500"
```

2. Add a reference to the key at data/entando.plugins.defaultProfile:

```yaml
data:
  entando.plugins.defaultProfile: your-profile
```

Please refer to the [Kubernetes documentation on Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more details.




