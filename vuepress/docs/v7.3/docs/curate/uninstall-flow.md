# Bundle Upgrade, Downgrade, and Uninstall
An application bundle that has been installed in the Entando App Builder can be upgraded to a new version, reverted to a previous version or uninstalled at any time. You can update the bundle or just a component within that bundle, all within the App Builder. 

## Upgrade or Downgrade Bundle Version

1. Log in to your App Builder instance and select `Hub` from the navigation on the left to enter your Local Hub.
2. Click the `Installed` button to open a pop-up window with the options to update or uninstall the bundle. 
3. Click the `Update` button to see a list of versions available. Choose a version. A warning will appear regarding the possible loss of features or data with the update. You may wish to review the bundle's release notes before confirming the upgrade or rollback. 
4. Once you confirm, a page listing all the components in the bundle appears. You can `Update All` or select each component to be updated or skipped. 
5. Click `Ok` to finish. 

## Uninstall a Bundle
1. Log in to your App Builder instance and select `Hub` from the navigation on the left to enter your Local Hub.
2. Click the `Installed` button to open a pop-up window with the options to update or uninstall the bundle.
3. Click the `Uninstall` button.
4. An initial check is made to verify that components are not in use outside of the bundle. A pop-up window will list the components with external references that must be removed manually and then the uninstall process may be resumed.
5. When the `Uninstall` is confirmed, the following removal process starts:
    - Bundle resources are deleted from the Entando App Engine
    - Components included in the bundle are removed from the Entando App Engine
    - Plugins are unlinked
6. To remove the bundle from the Local Hub catalog, click the `Undeploy` button.

## Troubleshooting
If an error occurs during the uninstall process, check out the [Troubleshooting guide](./troubleshooting-guide.md) or the [Entando Forum](https://forum.entando.com).



