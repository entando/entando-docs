# Troubleshooting ECR

## How do I access the logs? 
**A bundle installation or removal has failed. How do I access the logs?**

Currently the Entando Component Manager (CM) logs are only available in Kubernetes through Openshift dashboards or CLI tools like K9s and kubectl.

### Solution
1. To view the component manager logs, find the CM pod name in your instance:
```
ent k get pods
```
It will be something like this: `quickstart-cm-deployment-7f74757f97-xnlbn`

2. Using your CM pod name and namespace, use this command to view the logs:
```
ent k logs -f YOUR-PODNAME-7f74757f97-xnlbn -n YOUR-NAMESPACE
```
Note the `-f` flag is optional and used to follow the logs for debugging purposes. The -n flag is also optional if ent has a profile configured.  

## ERROR - File not found in bundle
**Installation fails because a file has not been found in the bundle**

When a component referenced in the entando.json is missing or not properly called, the bundle installation fails and the error is reported in the logs.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

Verify that the component named in the descriptor file is actually at the specified location and the reference is properly formatted. Then, publish the updated bundle with `ent bundle publish`.

## My plugin Docker image is unreachable 
**Bundle installation fails due to plugin images that are not reachable**

A bundle installation does not complete successfully because a plugin in a bundle, defined by a Docker image, is not available. 

### Solution
This may happen if the Docker image for the plugin is located in a private registry or not yet published. Verify that the Docker image you are referencing is published, correctly formatted, and publicly available. Then, publish the updated bundle with `ent bundle publish`

## How do I uninstall a bundle 
**I can't uninstall a bundle because some components are in use**

When uninstalling an installed bundle, the Entando Component Manager verfies that the bundle components are not in use by any other component. An error message informs you and does not allow the removal. 

### Solution

A bundle cannot be uninstalled if any of its components are in use. To uninstall the bundle, the user must manually remove all references to it and all its component.