---
sidebarDepth: 1
---


# Profile and Configuration Management

The [Entando CLI](entando-cli.md) can define a collection of configuration variables to fully describe an Entando instance. One or more profiles can be created to store configuration settings for a particular instance. A profile with this information is automatically generated for a quickstart application.

At minimum, a profile configuration must consist of the key-value pairs specifying the application name and namespace. To run the application, the Kubernetes connection must also be provided. Cloud Kubernetes tools typically create a Kube context, which can be linked to an Entando profile.

## Profile Management

Common operations associated with profile management are detailed below.

Note: The `ent profile` command is available to manage and switch between the configurations of different Entando instances. Refer to `ent profile first-use-readme` for additional information.

| Command | Description
| :- | :-
| `ent attach-kubeconfig [kubeconfig-file]` | Attach to a kubeconfig
| `ent attach-vm [vm-name]` | Attach to a managed virtual machine
| `ent list-kubectx` | Return a list of Kubernetes contexts
| `ent pro delete [profileName]` | Delete a profile
| `ent pro link [contextName]` | Link the current profile to a Kubernetes context
| `ent pro list` | Print a list of the available profiles
| `ent pro new [profileName] [EntandoAppName] [namespace]` | Create and switch to a new profile
| `ent pro use [profileName]` | Activate the default profile
| `ent set-kubectl-cmd "[command]" [--kubeconfig=[config]]` | Provide a custom command 
| `ent status` | Return current connection and profile information
| `source ent pro use [profileName]` | Activate the current profile

**Command details:**

- `ent pro link`: Provides ent with instructions to connect to the Kubernetes containing the Entando Application. Alias of `ent attach-kubectx`.

- `ent pro new`: Sets the minimal profile data and outputs next steps.

- `ent pro use`: Initializes the global profile ent should use across shells.

- `source ent pro use`: Initializes the local profile ent should use within the current shell. Allows ent instances in different shells to simultaneously use different Kube contexts, kubeconfigs or custom commands. The quickstart script creates a profile named "qs--{vmname}" that is associated with the Entando Application it generates.

## Configuration Management

The output of `ent config` is a key-value archive of configuration settings related to the current profile. The following commands and definitions are especially useful.

### Commands

| Command | Description
| :- | :-
| `ent config --edit` | Interactively edit a config archive 
| `ent config --get {key}` | Return the value of a config key 
| `ent config --print` | Print the current config archive 
| `ent config --set {key}` | Delete a config key
| `ent config --set {key} {value}` | Set the value of a config key 
 

### Keys

| Key  | Description  
|---|---
| ENTANDO_NAMESPACE  |  Stores the fallback namespace used by explicit or implicit runs of `ent kubectl` 
| ENTANDO_APPNAME | Stores the Entando Application name related to the current profile 
| DESIGNATED_JAVA_HOME | Stores the path of the Java version used internally by ent 
