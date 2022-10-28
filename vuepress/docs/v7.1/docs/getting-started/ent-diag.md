---
sidebarDepth: 1
---

# Diagnostics and Troubleshooting

Diagnostic information is critical to analysis and troubleshooting, and the Entando CLI (ent) is a useful tool for debugging issues with an Entando instance. 

| Command | Description
| :- | :-
| `ent app-info` | Display basic information about Kubernetes and Entando resources
| `ent bundle info` |Show status information for the bundle project|
| `ent --debug bundle "command"` |Enable debug mode|
| `ent diag` | Run diagnostics on the pods currently in an Entando namespace and prepare a diagnostic tar.gz
| `ent pod "command"` | Displays information related to a set of pods
| `ent pod grep --all "error\|fail"` | Locate error messages within EntandoApp pods 

### Command Details
* * `ent diag`: Executes operations to analyze, organize and output detailed pod information. It exports custom resources, ingresses, deployments, "previous" pod logs, namespace events, etc. The command also generates diagnostics and returns log paths like the following:
   ```
   > Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
   > Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
   ```
* `ent pod "command"`: Analyzes pods in a cluster with commands like `describe`, `logs`, `shell`, `force-reload`, `port-forward`, and others. 

### Log Files
Log files for the `ent bundle build` and `pack` commands are generated for each component inside the .entando/logs directory. For single components and other processes, they are printed to the standard outputs.