# Troubleshooting ECR

## How do I access the logs? 
**A bundle installation or removal has failed. How do I access the logs?**

Currently the Entando Component Manager logs are only available in Kubernetes through Openshift dashboards or CLI tools like K9s and kubectl.


### Solution
If your Entando cluster has more than one Entando App custom resource, find the component manager in question using the Entando App name and namespace where the app has been deployed. Assuming you have a single Entando App named `quickstart` and your cluster namespace is called `YOUR-NAMESPACE`, 
retrieve the component manager logs using this command:
```
kubectl logs -f deployment/quickstart-server-deployment --namespace YOUR-NAMESPACE -c de-container
```
Note the `-f` flag is optional and used to follow the logs for debugging purposes.

## ERROR - File not found in bundle
**Installation fails because a file has not been found in the bundle**

When a component that is referenced in the entando.json is missing in the bundle or not properly called, the bundle installation will fail and the error reported in the logs.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

Verify that the component named in the descriptor file is actually present in the bundle, in the location specified, and that the reference is properly formatted.

Then 
[publish a new bundle version](#how-do-i-publish-a-new-version) as explained above.

## My plugin Docker image is unreachable 
**Bundle installation fails due to plugin images that are not reachable**

A bundle installation does not complete successfully because a plugin in a bundle, defined by a Docker image, is not available. 

### Solution
This may happen if the Docker image for the plugin is located in a private registry or not yet published. Verify that the Docker image you are referencing is published, correctly formatted, and publicly available.

Then 
[publish a new bundle version](#how-do-i-publish-a-new-version) as explained above.

## How do I uninstall a bundle 
**I can't uninstall a bundle because some components are in use**

When uninstalling an installed bundle, the Entando Component Manager verfies that the bundle components are not in use by any other component. An error message informs you and does not allow the removal. 

### Solution

A bundle cannot be uninstalled if any of its components are in use. To uninstall the bundle, the user must manually remove all references to it and all its component.