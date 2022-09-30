---
sidebarDepth: 2
---

# Create an Entando Platform Capability 

An Entando Platform Capability, or EPC, is a packaged capability in the form of a bundle that adds functionality to the platform such as additional UX controls in the App Builder. With an EPC, adding menu options, an API management page, or integrating a WCMS like Strapi from the App Builder is simplified. This tutorial demonstrates how to build an EPC from a simple React micro frontend bundle.

## Prerequisites
* A working instance of Entando
* An existing [React MFE](react.md)


## Convert the React Bundle into an EPC
Working with the [React MFE Tutorial](react.md), the following steps convert the React bundle into an EPC by modifying the bundle descriptor and customizing the public path to serve static assets. 

### Configure the Bundle discriptor
Edit the bundle descriptor `entando.json` in the root bundle directory. Remove the `type` and `titles` attributes and add the code snippet below, replacing the `paths`, `label` and `url` with your values.

``` json
"type": "app-builder",
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
* `paths`, `url`: The address where the user will land. An external URL can be entered. Otherwise, this string will become part of the URL in the App Builder. 
* `label`: What appears in the App Builder menu
* `target`: Use `internal` for inside the App Builder, `external` for all others.

**Note**: If you plan to continue with the same React bundle name, update the version number in the bundle descriptor. Otherwise, change the bundle name to avoid name conflicts in your Local Hub.

For more details on attributes, see the [Bundle Details](../../../docs/curate/bundle-details.md#micro-frontends-specifications) page.  

### Configure the Custom Element Paths
1. Modify `public-path.js` file in the `microfrontends/YOUR-MFE-NAME/src/custom-elements`.

  * Retrieve the `BUNDLE-ID`:
     ``` sh
     ent ecr get-bundle-id https://registry.hub.docker.com/YOUR-DOCKER-ORGANIZATION/YOUR-BUNDLE-NAME
     ```
     The BUNDLE-ID will be an 8-digit string of numbers and letters.  
  
2. Assemble the bundle and widget codes. The CODE is simply the name followed by a dash and `BUNDLE-ID`. 

     YOUR-BUNDLE-CODE: `YOUR-BUNDLE-NAME`-`YOUR-BUNDLE-ID`  
     YOUR-WIDGET-CODE: `YOUR-WIDGET-NAME`-`YOUR-BUNDLE-ID`
  
     e.g. With a bundle named bundleOne, a widget named mfeTwo, and `BUNDLE-ID` of 4986eb9c:
     YOUR-BUNDLE-CODE: bundleOne-4986eb9c  
     YOUR-WIDGET-CODE: mfeTwo-4986eb9c
   
3. Using your CODEs, replace the contents of `public-path.js` with the following:

``` js
if (process.env.NODE_ENV === 'production') {
    let publicpath = '/entando-de-app/cmsresources/bundles/YOUR-BUNDLE-CODE/widgets/YOUR-WIDGET-CODE/'
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = publicpath || './';
}
```
e.g. for the example from Step 2:
publicpath = '/entando-de-app/cmsresources/bundles/bundleOne-4986eb9c/widgets/mfeTwo-4986eb9c/'

### Build and Install the EPC
1. From the bundle root directory, build and deploy the bundle:
```
ent bundle pack
ent bundle publish
ent bundle deploy
```
2. Log in to your App Builder. Go to the Hub from the left menu. Click on the `Deployed` button for your EPC and choose `Install`. 

3. To see the new EPC, go to `EPC` from the left menu and choose `Uncategorized`. Click on your EPC `label`. You should see the spinning React logo inside the App Builder. 
::: tip Congratulations!
You now have an EPC running on Entando!
:::
 
**Next Steps**

* See how to utilize [Entando MFE Context Parameters](context-params.md) to extend your micro frontends.
* [Use Plugin Environment Variables to Customize Microservices](../../devops/plugin-environment-variables.md)
