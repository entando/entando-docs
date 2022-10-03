---
sidebarDepth: 2
---

# Create an Entando Platform Capability 

An Entando Platform Capability, or EPC, is a packaged capability in the form of a bundle that adds functionality to the platform such as additional UX controls. An EPC simplifies the addition of menu options, an API management page, or WCMS integration like Strapi, all from the App Builder. This tutorial demonstrates how to build a simple EPC from a React micro frontend bundle.

## Prerequisites
* A working instance of Entando
* An existing [React MFE](react.md)


## Create a Simple EPC
Working with the [React MFE Tutorial](react.md), the following steps convert the React bundle into an EPC by modifying the bundle descriptor and customizing the public path to serve static assets. 

### Configure the Bundle Descriptor
Edit the bundle descriptor `entando.json` in the root bundle directory. 
1. Change the `type` to `app-builder`:
```
  "type": "app-builder" 
```
2) Remove the `titles` attribute


3) Add the fields in the code snippet below:

``` json
"slot": "content",
"paths": ["/YOUR-MFE-NAME"],
"nav": [
    {
        "label": {
          "en": "YOUR EPC LABEL IN ENGLISH",
          "it": "YOUR EPC LABEL IN ITALIAN"
        },
        "target": "internal", 
        "url": "/YOUR-MFE-NAME"
    }
],    
```
* `type`: Use `app-builder` for an EPC
* `slot`: Placement of the EPC on a page
* `paths`: The URL path to the EPC in the App Builder. An external URL can be entered 
* `nav`: The visible label for the navigation item in the App Builder Menu

For more details on attributes, see the [Bundle Details](../../../docs/curate/bundle-details.md#micro-frontends-specifications) page.  

**Note**: To continue with the same name as the React bundle, update the version number in the bundle descriptor `entando.json`. Otherwise, change the bundle name to avoid name conflicts in your Local Hub.

### Optional: Configure the Custom Element Paths
If you have static assets such as images or PDFs in your MFE, modify the `public-path.js` file in the `microfrontends/YOUR-MFE-NAME/src/custom-elements` directory.
1. Retrieve the bundle ID using your information for the fields in all-caps:
     ``` sh
     ent ecr get-bundle-id https://registry.hub.docker.com/YOUR-DOCKER-ORGANIZATION/YOUR-BUNDLE-NAME
     ```
     `YOUR-BUNDLE-ID` will be an 8-digit string of numbers and letters.  
  
2. Determine the bundle and widget codes. The CODE is simply the name followed by a dash and `YOUR-BUNDLE-ID`. 

     YOUR-BUNDLE-CODE: `YOUR-BUNDLE-NAME`-`YOUR-BUNDLE-ID`  
     YOUR-WIDGET-CODE: `YOUR-WIDGET-NAME`-`YOUR-BUNDLE-ID`
  
     e.g. With a bundle named `bundleOne`, a widget named `mfeTwo`, and bundle ID of `4986eb9c`:
     YOUR-BUNDLE-CODE: `bundleOne-4986eb9c`  
     YOUR-WIDGET-CODE: `mfeTwo-4986eb9c`
   
3. Using your CODEs, replace the contents of `public-path.js` with the following:

``` js
if (process.env.NODE_ENV === 'production') {
    let publicpath = '/entando-de-app/cmsresources/bundles/YOUR-BUNDLE-CODE/widgets/YOUR-WIDGET-CODE/'
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = publicpath || './';
}
```
e.g. for the example from Step 2:  
`publicpath = '/entando-de-app/cmsresources/bundles/bundleOne-4986eb9c/widgets/mfeTwo-4986eb9c/'`

### Build and Install the EPC
1. From the bundle root directory, [build and deploy](../pb/publish-project-bundle.md) the bundle:
```
ent bundle pack
ent bundle publish
ent bundle deploy
```
2. Log in to your App Builder. 
     * Go to `Hub` from the left menu 
     * Click on the `Deployed` button for your EPC and choose `Install` 

3. To see the new EPC:
     * Go to `EPC` from the left menu and choose `Uncategorized` 
     * Click on your EPC `label`   
     You should see the spinning React logo inside the App Builder. 

::: tip Congratulations!
You now have an EPC running on Entando!
:::
 
**Next Steps**

* Learn how to utilize [Entando MFE Context Parameters](context-params.md) to extend your micro frontends.
* [Use Plugin Environment Variables to Customize Microservices](../../devops/plugin-environment-variables.md)
