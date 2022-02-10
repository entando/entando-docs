---
redirectFrom: /v6.3.2/docs/ecr/ecr-troubleshooting-guide.html
---

# Troubleshooting ECR

## A bundle installation/removal has failed, how to access the logs?

### Overview 

Currently the Entando component manager logs are available in kubernetes via dashboard (openshift) or cli tools (k9s or kubectl).
If in you Entando cluster you have more than one Entando App custom resource, you will need to know what's the correct component-manager to check using the corresponding Entando App name and namespace where the app has been deployed.

### Solution

Using `kubectl` and assuming for simplicity that you have only one Entando App named `quickstart` and your Entando cluster is only composed of one namespace, also named `quickstart`,
you can get the component-manager logs using the command
```
kubectl logs -f deployment/quickstart-server-deployment --namespace quickstart -c de-container
```
**Note**: the `-f` flag is optional and could be used to follow the logs for debugging purposes

## My bundle has an issue, how should I publish a new version of the bundle?

### Overview
Sometimes a bundle could have some issues: typos in the `descriptor.yaml` file, wrong references of components or to not available docker images are just a few of the possible errors.

### Solution

1. If the bundle is shared using a git repository, you can make the required changes to your project and publish the new version to git and generate a new tag for it. 
2. Once the new tag is published, update the bundle costum-resource avaialble in you Entando Cluster by adding the new tag to the `tags` objects  and replacing the latest `dist-tags` to point to this new version.
3. Proceed with the new installation

If you're actively working on your bundle and you simply want to verify things are working correctly, instead of generating a new tag for each release of the bundle you can try to keep overriding a specific tag using the git command `git tag -f`. We suggest you to follow this practice only during development and not in production.

## Bundle installation fails because a file has not been found in the bundle

### Overview
When a component that is referenced in the `descriptor.yaml` is missing in the bundle or not correctly referenced, the bundle installation fails and in the logs is reported which file has not been found.

```
ERROR - File with name {filename} not found in the bundle
```

### Solution

When such a problem happens, verify that the component referenced in the descriptor file are actually present in the bundle and that the reference is properly typed.

Publish a new version of your bundle as described in the 
["My bundle has an issue"](#my-bundle-has-an-issue-how-should-i-publish-a-new-version-of-the-bundle) section

## Bundle installation failed due to plugin(s) images not reachable

### Overview
Plugin included in a bundle are referenced using their docker image. Sometime the image is not available - maybe has not yet be published or is in a private docker registry - and plugin installation can't happen and the entire bundle installation process can't finish successfully

### Solution

Verify that the docker image you are referencing is correct and publicly available.

["My bundle has an issue"](#my-bundle-has-an-issue-how-should-i-publish-a-new-version-of-the-bundle) section

## I can't uninstall a bundle because some components are in use

### Overview 

When removing an installed bundle, the Entando component manager verfies that the bundle components
are not in use by any other component. Removing such components would cause an error during removal
as in certain case the deleting a component in use is not permitted. 

### Solution

In order to prevent such errors, the user is alerted and required to manually decouple the bundle
components before beign able to completely remove the bundle from the system.
