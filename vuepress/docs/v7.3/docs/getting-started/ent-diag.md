---
sidebarDepth: 1
---

# Diagnostics and Troubleshooting

Diagnostic information is critical for troubleshooting and analysis, and the Entando CLI (ent) provides several methods. 

| Command | Description
| :- | :---------------------------- |
|`ent app-info`| Display basic information about Kubernetes and Entando resources
|`ent bundle info`|Show status information for the bundle project|
|`ent --debug bundle "command"`|Enable debug mode|
|`ent diag`| Run diagnostics on the pods in the current Entando namespace and prepare a diagnostic tar.gz
|`ent pod "command"`| Display information related to a set of pods
|`ent pod grep --all "error\|fail"`| Locate error messages within EntandoApp pods 

### Command Details
* `ent diag`: Executes operations to analyze, organize and output detailed pod information. It exports custom resources, ingresses, deployments, "previous" pod logs, namespace events, etc. The command generates this diagnostics data and returns log paths like the following:
   ```
   > Collected diagdata available under "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000" for consultation
   > Collected diagdata available in archive "~/.entando/reports/entando-diagdata-2020-11-19T02:58:47+0000.tgz"
   ```
* `ent pod "command"`: Administer pods in a cluster with subcommands like `describe`, `logs`, `shell`, `force-reload`, `port-forward`, and others.  

### Log Files
Log files for the `ent bundle build` and `pack` commands are generated for each component inside the .entando/logs directory. For single components and other processes, they are printed to the standard outputs.