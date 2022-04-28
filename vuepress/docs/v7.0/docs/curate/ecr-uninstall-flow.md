# Bundle Upgrade, Downgrade, and Uninstall
An application bundle that is installed in the Entando App Builder, or from the Entando Hub, has the ability to be upgraded, downgraded or uninstalled at any time. You can upgrade the bundle or just a component within that bundle, all within the App Builder.

## Upgrade or Downgrade Bundle Version
From Entando App Builder's **Component Repository**, you can upgrade or downgrade the version of a bundle. 

![Uninstall flow](./img/uninstall-bundle.png)

1. Click the `Installed` button next to the bundle and a pop-up window opens with the options to update or uninstall the bundle. 
2. Click the `Update` button to see a list of versions available. Choose a version. A warning will appear regarding the possible loss of features or data with the update. You may wish to review the bundle's release notes before confirming the upgrade or rollback. 
3. Once you confirm, a page listing all the components in the bundle appears. You can `Update All` or select each component to be updated or skipped. 
4. Click `Ok` to finish. 

## Uninstall a Bundle
1. From Entando App Builder Repository, click on the `Installed` button next to the bundle you want to uninstall. A pop-up window will open with the option to `Uninstall`.

2. An initial check is made to verify that none of the bundle components are in use. 
If they are in use, a pop-up shows a warning and you must unpublish the content and remove the components. You can't force the removal of a bundle if any component is in use or linked. Each component needs to be uninstalled, and references to it removed, in order for the bundle uninstall to complete.

3. When the `Uninstall` is confirmed, the following removal process starts.

- Bundle resources are deleted from the Entando App Engine
- Components included in the bundle are removed from the Entando App Engine
- Plugins are unlinked
4. To remove the bundle from the Repository catalog, click the `Undeploy` button.


## Troubleshooting
If an error occurs during the uninstall process, 
check out the [Troubleshooting guide](./ecr-troubleshooting-guide.md) or the [Entando Forum](https://forum.entando.org).



