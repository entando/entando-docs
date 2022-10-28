# Troubleshooting ECR

## How do I access the logs? 
**A bundle installation or removal has failed. How do I access the logs?**

Currently the Entando Component Manager logs are only available in Kubernetes through Openshift dashboards or CLI tools like K9s and kubectl.

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
Note the `-f` flag is optional and used to follow the logs for debugging purposes.

## How do I publish a new version 
**My bundle has an issue. How do I publish a new version of the bundle?** 

Sometimes a bundle could have issues such as typos in the descriptor.yaml, faulty references for components, or unavailable Docker images. After making the corrections, your bundle will need to be updated.

### Solution

1. If the bundle is shared in a Git repository, you can make the required changes to your project, publish the new version to Git, and generate a new tag for it. 
2. Once the new tag is published, update the bundle custom resource in the cluster by adding the new tag to the `tags` object and replacing the latest `dist-tags` to point to the new version.
3. Then proceed with the new installation.

Note: If you're actively working on your bundle and simply want to verify that things are working correctly, you can override a specific tag using the Git command `git tag -f` instead of generating a new tag for each release of the bundle. You should follow this practice only during development, never in production.

## ERROR - File not found in bundle
**Installation fails because a file has not been found in the bundle**

When a component that is referenced in the descriptor.yaml is missing in the bundle or not properly called, the bundle installation will fail and the error reported in the logs.

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