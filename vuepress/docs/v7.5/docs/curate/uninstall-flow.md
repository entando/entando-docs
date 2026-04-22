---
sidebarDepth: 2
---
# Bundle Upgrade, Downgrade, and Uninstall
An application bundle that has been installed in the Entando App Builder can be removed, upgraded to a new version, or downgraded to a previous version at any time. You can update the bundle group or just a component within that bundle. 

## Upgrade or Downgrade Bundle Version

1. Log in to your App Builder instance and select `Hub` from the left navigation bar to go to your Local Hub.
2. Click the `Installed` button to open a pop-up window with the options to update or uninstall the bundle. 
3. Click the `Update` button to see the list of available versions. Choose one and a warning will appear regarding the possible loss of features or data with the update. You may wish to review the bundle's release notes before confirming the upgrade or rollback. 
4. Once you confirm, a page listing all the components in the bundle appears. You can `Update All` or select each component to be updated or skipped. 
5. Click `Ok` to finish. 

## Uninstall a Bundle
1. Log in to your App Builder instance and select `Hub` from the left navigation menu to enter your Local Hub.
2. Click the `Installed` button to open a pop-up window with the available options.
3. Click `Uninstall`.
4. An initial check is done to verify that components are not in use outside of the bundle. A pop-up window will list the components with external references that must be cleared manually, and then the uninstall process may resume.
5. When the `Uninstall` is confirmed, a progress bar shows the following removal process:
    - Bundle resources are deleted from the Entando App Engine
    - Components included in the bundle are removed from the Entando App Engine
    - Microservices are unlinked
6. To remove the bundle from the Local Hub catalog, click the `Undeploy` button.

::: tip Uninstall Order
When unistalling a PBC or a Bundle Group with multiple bundles, it is important to remove the bundles in the reverse order of installation due to dependencies. 
:::

## Troubleshooting
If an error occurs during the uninstall process, check out the [Troubleshooting guide](./troubleshooting-guide.md) or the [Entando Forum](https://forum.entando.com).



