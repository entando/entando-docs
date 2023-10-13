---
sidebarDepth: 2
---

# Plugin Configuration Profiles

This tutorial describes three methods to utilize configuration profiles to specify resource allocation for Entando plugins. This provides a simple way to customize plugin deployment parameters for improved efficiency.

## Prerequisites
* [Add an Entando Operator ConfigMap](./entando-operator.md) if needed
* Enable this property under the `data` section so that the Entando Operator can manage resource settings.
```yaml
 entando.k8s.operator.impose.limits: "true"
```

## Profile Options
A profile is a set of configurations encoded as YAML embedded in the `OperatorConfigMap` as a string, since ConfigMaps cannot be multilevel. 

The three methods to insert configuration profiles are: 
1. [Inline Profile](#method-1-inline-profile)
2. [Mapped Profile](#method-2-mapped-profile)
3. [Default Profile](#method-3-default-profile)

## Configuration
Currently, the resources for memory and CPU can be specified. When you specify a `limit` on a resource, it is the upper limit allowed for the container. The units for the resources are listed below but should not be included in the specification. Resource settings help Kubernetes determine in which node a pod should be created.

```yaml
resources.limits.cpu:       integer, millicpus
resources.limits.memory:    integer, mebibytes
```

The examples below use `YOUR-PLUGIN`, `YOUR-PLUGIN-CODE`, `YOUR-ORG`, `YOUR-BUNDLE` and `YOUR-PROFILE-NAME` as placeholders. Also note the use of `|-` to designate a new line in the code.

### Retrieve the Plugin ID
You will need to [retrieve the Plugin ID](../../docs/reference/entando-cli.md) which is calculated during installation and written to the EntandoPlugin Custom Resource as part of the deployment of the plugin microservice. Use the following command from the project directory
```sh
ent prj get-plugin-id --auto
```

If you just have a bundle, use this command with the appropriate parameters
```sh
ent ecr get-plugin-id --autho --repo=YOUR-BUNDLE-REPO-URL
```
Example:
```sh
$ ent ecr get-plugin-id --auto --repo=https://github.com/entando-samples/entando-hub-application-bundle.git
pn-cee95efc-77ff566e-entandopsdh-entando-hub-catalog-ms
```

### Method 1: Inline Profile
Add the parameters to the `OperatorConfigMap` as an inline profile at `data/entando.profile.plugins.YOUR-PLUGIN-ID`. 

Example:

```yaml
data:
  entando.profile.plugins.YOUR-PLUGIN-ID: |-
    resources.limits.cpu: "1000"
    resources.limits.memory: "2000"
```
### Method 2: Mapped Profile
1. Create the parameter profile in the `OperatorConfigMap` of the data profile at `data/entando.profile.YOUR-PROFILE-NAME`.

Example:
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
    your-plugin-id: YOUR-PROFILE-NAME
```

### Method 3: Default Profile
1. Add the profile to the `OperatorConfigMap` in the data section at `data/entando.profile.YOUR-PROFILE-NAME`.

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

## References
Please refer to the [Kubernetes documentation on Resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more details.




