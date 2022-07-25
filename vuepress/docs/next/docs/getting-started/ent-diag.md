---
sidebarDepth: 1
---

# Diagnostics and Troubleshooting

Diagnostic information is critical to analysis and troubleshooting, and the Entando CLI (ent) is a useful tool for debugging issues with an Entando instance. The [Getting Started](../../docs/getting-started/README.md) guide includes steps to install ent in a Multipass VM. The following commands can be run from this VM for insight into an Entando Application.

| Command | Description
| :- | :-
| `ent app-info` | Display basic information about Kubernetes and Entando resources
| `ent pod-info` | Display `kubectl describe` and `kubectl logs` for each Entando pod in a namespace
| `ent diag` | Run diagnostics on the pods currently in an Entando namespace and prepare a diagnostic tar.gz
| `ent pod grep --all "error\|fail"` | Locate error messages within EntandoApp pods 

The command `ent diag` is a superset of operations to analyze, organize and output detailed pod information. In addition to calling `ent pod-info`, `ent diag` exports custom resources, ingresses, deployments, "previous" pod logs, namespace events, etc. It also generates diagnostics and returns log paths similar to the following:
```
> Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
> Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
```

::: tip
To resolve the error "Unable to extract the application client secret":

- Verify that the current profile namespace and application name are correct and match the output of `ent status`
- Assign the appropriate namespace and application name via `ent appname YOUR-APPNAME` and `ent namespace YOUR-NAMESPACE`
:::