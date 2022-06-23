# Troubleshooting ECR

## 1. How do I access the logs? 
**A bundle installation or removal has failed. How do I access the logs?**

Currently the Entando Component Manager logs are available in Kubernetes via Openshift dashboards or CLI tools like k9s or kubectl.


### Solution
If your Entando cluster has more than one Entando App custom resource, find the component manager in question using the Entando App name and namespace where the app has been deployed. Assuming you have only one Entando App named `quickstart` and your cluster has one namespace called `YOUR-NAMESPACE`, 
retrieve the component manager logs using this command:
```
kubectl logs -f deployment/quickstart-server-deployment --namespace YOUR-NAMESPACE -c de-container
```
Note the `-f` flag is optional and is used to follow the logs for debugging purposes.

## 2. How do I publish a new version? 
**My bundle has an issue. How do I publish a new version of the bundle?** 

Sometimes a bundle could have issues: typos in the descriptor.yaml, faulty references for components, or unavailable Docker images are just some of the possibilities. After making the corrections, your bundle will need to be updated.

### Solution

1. If the bundle is shared in a git repository, you can make the required changes to your project, publish the new version to git, and generate a new tag for it. 
2. Once the new tag is published, update the bundle custom resource in the cluster by adding the new tag to the `tags` object and replacing the latest `dist-tags` to point to the new version.
3. Then proceed with the new installation.

Note: If you're actively working on your bundle and simply want to verify that things are working correctly, you can override a specific tag using the git command `git tag -f` instead of generating a new tag for each release of the bundle. You should follow this practice only during development, never in production.

## 3. ERROR - File not found in bundle
**Installation fails because a file has not been found in the bundle**

When a component that is referenced in the `descriptor.yaml` is missing in the bundle or not properly called, the bundle installation will fail and the error reported in the logs.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

Verify that the component named in the descriptor file is actually present in the bundle, in the location specified, and that the reference is properly formatted.

Publish a new version of your bundle as described in the 
["How do I publish a new version"](#how-do-i-publish-a-new-bundle-version) section.

## 4. My plugin Docker image is unreachable 
**Bundle installation fails due to plugin(s) images that are not reachable**

A bundle installation does not complete successfully because a plugin in a bundle, defined by a Docker image, in not available. 

### Solution
This may happen if the Docker image for the plugin was not yet published or located in a private registry. Verify that the Docker image you are referencing is published, correctly formatted, and publicly available.

Then 
[publish a new bundle version](#how-do-i-publish-a-new-bundle-version) as explained above.

## 5. How do I uninstall a bundle? 
**I can't uninstall a bundle because some components are in use**

When uninstalling an installed bundle, the Entando component manager verfies that the bundle components are not in use by any other component. An error message warns you and does not allow the removal. 

### Solution

A bundle cannot be uninstalled if any of its components are in use elsewhere. To uninstall the bundle, the user must manually remove all references to it and all its components.
Once the references are removed or deleted, the original content where it was removed from must be republished for the decoupling process to complete.