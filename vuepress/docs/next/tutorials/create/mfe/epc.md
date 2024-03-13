---
sidebarDepth: 2
---

# Create an Entando Platform Capability 

An Entando Platform Capability, or EPC, is a packaged component bundle that adds functionality and UX controls to the Platform. An EPC simplifies the addition of menu options, an API management page, or WCMS integration like Strapi, all from the App Builder. This tutorial demonstrates how to build a simple EPC from a React micro frontend (MFE) bundle.

## Prerequisites
* A working instance of Entando
* An existing [React MFE](react.md)

## Create a Simple EPC
Working with the [React MFE Tutorial](react.md), the following steps convert the React bundle into an EPC by modifying the bundle descriptor and customizing the public path to serve static assets. 

### Configure the Bundle Descriptor
Edit the `simple-mfe` micro frontend in the bundle descriptor `entando.json` in the root bundle directory. 
1. Change the `type` to `app-builder`:
``` json
  "type": "app-builder" 
```
2) Remove the `titles` attribute

3) Add the following attributes:

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
]    
```
* `type`: EPCs require `app-builder` type MFE
* `slot`: Placement of the EPC on a page
* `paths`: The URL path to the EPC in the App Builder. An external URL can be entered 
* `nav`: The visible label for the navigation name in the App Builder Menu
4) Save the entando.json

For more details on attributes, see the [Bundle Details](../../../docs/curate/bundle-details.md#micro-frontends-specifications) page.  

### Optional: Configure the Custom Element Paths
If you have static assets such as images or style sheets in your MFE, modify `microfrontends/YOUR-MFE-NAME/src/custom-elements/public-path.js`.
1. Retrieve the bundle ID using your bundle name and Docker information:
     ``` sh
     ent ecr get-bundle-id https://registry.hub.docker.com/YOUR-DOCKER-ORGANIZATION/YOUR-BUNDLE-NAME
     ```
     `YOUR-BUNDLE-ID` will be an 8-digit string of numbers and letters.  
  
2. Determine the bundle and widget codes. The CODE is simply the concatenation of the bundle name, a dash, and `YOUR-BUNDLE-ID`. 
 
     YOUR-BUNDLE-CODE: `YOUR-BUNDLE-NAME`-`YOUR-BUNDLE-ID`  
     YOUR-WIDGET-CODE: `YOUR-WIDGET-NAME`-`YOUR-BUNDLE-ID`
  
     e.g. With a bundle named `bundleOne`, a widget named `mfeTwo`, and a bundle ID of `4986eb9c`:
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
1. From the bundle root directory, [build and install](../pb/publish-project-bundle.md) the bundle:
   <EntandoInstallBundle/>

2. Log in to your App Builder to see the new EPC:
     * Go to `EPC` from the left menu and choose `Uncategorized` 
     * Click on your EPC `label`   
     You should see the spinning React logo inside the App Builder. 

::: tip Congratulations!
You now have an EPC running on Entando!
:::
 
**Next Steps**

* Learn how to utilize [Entando MFE Context Parameters](context-params.md) to extend your micro frontends.
* [Use Plugin Environment Variables to Customize Microservices](../../devops/plugin-environment-variables.md)
