# Troubleshooting ECR

## A bundle installation/removal has failed, what should I do?

### Overview 

When a bundle installation or removal fails, the best thing to do is checking the logs for the component-manager service.
Currently logs are available via dashboard (openshift) or cli tools (k9s or kubectl).
If in you Entando cluster you have more than one Entando App custom resource, you will need to know what's the correct component-manager to check.

### Solution

Using `kubectl` and assuming for simplicity that you have only one Entando App named `quickstart` and your Entando cluster is only composed of one namespace, also named `quickstart`,
you can get the component-manager logs using the command
```
kubectl logs -f deployment/quickstart-server-deployment --namespace quickstart -c de-container
```
**Note**: the `-f` flag is optional and could be used to follow the logs for debugging purposes

## I can't uninstall a bundle because some components are in use

### Overview 

When removing an installed bundle, the Entando component manager verfies that the bundle components
are not in use by any other component. Removing such components would cause an error during removal
as in certain case the deleting a component in use is not permitted. 

### Solution

In order to prevent such errors, the user is alerted and required to manually decouple the bundle
components before beign able to completely remove the bundle from the system.

## Bundle installation fails because a file has not been found in the bundle

### Overview
When a component that is referenced in the `descriptor.yaml` is missing in the bundle or not correctly referenced, the bundle installation fails and in the logs is reported which file has not been found.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

1. When such a problem happens, verify that the component referenced in the descriptor file are actually present in the bundle and that the reference is properly typed.
2. Once everything is in place, publish a new version of the bundle - or overwrite the old version if you can - and update the bundle custom resource in your Entando cluster
3. Retry installation