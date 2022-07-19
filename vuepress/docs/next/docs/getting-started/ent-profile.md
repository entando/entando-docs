---
sidebarDepth: 1
---


# Profile Management


Manage and switch between different Entando configurations with `ent profile`, which uses Kubernetes contexts, kubeconfig files, and/or custom commands (refer to `ent profile first-use-readme`).

Cloud Kubernetes tools typically create a Kubernetes context which can be linked to an Entando profile. An overview of the current connection and profile information is provided via `ent status`.

The following commands perform common operations associated with profile management.

## New Profile

Create and switch to a new profile:
```
ent pro new [profileName] [EntandoAppName] [namespace]
```
This sets the minimal profile data and explains next steps.

## Link Profile

Link the current profile to a Kubernetes context (alias of `ent attach-kubectx`):
```
ent pro link [contextName]
```
This provides the instructions for ent to connect to the Kubernetes containing the Entando Application.

## Global Profile

Activate the profile that ent should use across shells:
```
ent pro use [profileName]
```
This attempts to fully restore a profile type by considering the login and related Entando Applications.

## Local Profile

Activate the profile that ent should use within the current shell:
```
source ent pro use [profileName]
```

This allows ent instances in different shells to simultaneously use different Kube contexts, kubeconfigs or custom commands. The quickstart script creates a profile named "qs--{vmname}" that is associated with the Entando Application it generates. 
## Print

Print a list of the available profiles:
```
ent pro list
```

## Delete

Delete a profile:
```
ent pro delete [profileName]
```

### Configuration Management
The output of `ent config` is a key-value archive of configurations related to the current profile.
It can serve several purposes, but a few "good to know" keys and commands are below.

#### Commands
Print the current config archive:
```
ent config --print
```
Interactively edit a config archive:
```
ent config --edit
```
Return the value of a config key:
```
ent config --get {key}
```
Set the value of a config key:
```
ent config --set {key} {value}
```
Delete a config key:
```
ent config --set {key}
```
#### Keys
| Key  | Definition  |
|---|---|
| ENTANDO_NAMESPACE  |  stores the fallback namespace used by explicit or implicit runs of `ent kubectl` |
|  ENTANDO_APPNAME | stores the Entando Application name related to the current profile |
|  DESIGNATED_JAVA_HOME | stores the path of the Java version used internally by ent |

