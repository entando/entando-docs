---
sidebarDepth: 2
---
# Troubleshooting the Entando Local Hub

## 1. How do I access the logs? 
**A bundle installation or removal has failed. How do I access the logs?**

The Entando Component Manager (ECM) logs can be viewed using CLI tools like kubectl or oc, or visualization dashboards like OpenShift or K9s.

### Solution
1. To view the Component Manager logs, find the ECM pod name in your instance:
```
ent kubectl get pods
```
It should be something like this: `quickstart-cm-deployment-7f74757f97-xnlbn`

2. Using the ECM pod name and your namespace, use this command to view the logs:
```
ent kubectl logs -f YOUR-ECM-PODNAME -n YOUR-NAMESPACE
```
>Notes: 
>1. Use the [ent CLI](../getting-started/entando-cli.md) to send commands directly to Kubernetes from the host machine. 
>2. The `-f` flag is optional and used to follow the logs for debugging purposes. The namespace (-n) is also optional if ent has a profile configured.  


## 2. ERROR - File not found in bundle
**Installation fails because a file has not been found in the bundle**

When a component referenced in the `entando.json` is missing or not properly called, the bundle installation fails and the error is reported in the logs.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

Verify that the component named in the descriptor file is actually at the specified location and the reference is properly formatted. Then, publish the updated bundle with `ent bundle publish`.

## 3. My microservice's Docker image is unreachable 
**Bundle installation fails due to plugin images that are not reachable**

A bundle installation does not complete successfully because a microservice in a bundle, defined by a Docker image, is not available. 

### Solution
This may happen if the Docker image for the microservice is located in a private registry or not yet published. Verify that the Docker image you are referencing is published, correctly formatted, and publicly available. 

## 4. How do I uninstall a bundle 
**I can't uninstall a bundle because some components are in use**

When uninstalling a previously installed bundle, the Entando Component Manager verifies that the bundle components are not in use elsewhere. If any part of the bundle is in use, an error message informs you and does not allow the removal. 

### Solution

A bundle cannot be uninstalled if any of its components are in use. To uninstall the bundle, the user must manually remove all references to it and its component parts.