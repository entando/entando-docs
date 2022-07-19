---
sidebarDepth: 1
---


# Diagnostics and Debug

### Diagnostic Commands

Diagnostic information can be highly useful when analyzing and troubleshooting behavior. The Getting Started guide includes steps to [automatically install](../../docs/getting-started/README.md#automatic-install) the CLI in a Multipass VM. The following commands can be run from this VM for insight into an Entando Application.

#### Basic Information

Display basic information about Kubernetes and Entando resources (e.g. namespace, pods, ingresses):
``` sh
ent app-info
```

#### Pod Logs

Display `kubectl describe` and `kubectl logs` for each of the major Entando pods in a namespace:
``` sh
ent pod-info
```

#### Diagnostic Files

List the current pods in an Entando namespace and prepare a diagnostic tar.gz:
``` sh
ent diag
```
This outputs `kubectl describe` and `kubectl logs` for each of the fundamental Entando pods. It also exports custom resources, ingresses, deployments, "previous" pod logs, namespace events, etc.  

The directory paths of the diagnostic logs are listed, similar to the following:

```
> Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
> Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
```
### Troubleshooting
The CLI is a useful tool for debugging issues with an Entando instance. 
#### Error Location
Locate error messages in the EntandoApp pods:
``` bash
ent pod grep --all "error|fail"
```
or
``` bash
ent pod grep ".*" "error|fail"
```
#### Extraction Error
To resolve the error "Unable to extract the application client secret":

1. Verify that the current profile namespace and application name are correct and match the output of the following command
``` sh
ent status
```
2. Assign the appropriate namespace and application name
``` sh
ent appname YOUR-APPNAME
ent namespace YOUR-NAMESPACE
```