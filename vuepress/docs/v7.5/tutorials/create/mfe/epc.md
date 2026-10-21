---
sidebarDepth: 2
---

# Create an Entando Platform Capability 

An Entando Platform Capability, or EPC, is a packaged component bundle that adds functionality and UX controls to the Platform. An EPC simplifies the addition of menu options, an API management page, or WCMS integration like Strapi, all from the App Builder. This tutorial demonstrates how to build a simple EPC from a React micro frontend (MFE) bundle.

## Prerequisites
* A working instance of Entando
* An existing [React MFE](react.md)

## Create a Simple EPC
Working with the [React MFE Tutorial](react.md), the following steps convert the React bundle into an EPC by modifying the bundle descriptor and, optionally, loading static assets. 

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

### Optional: Load Static Assets
Images and other files imported from `src/` need no extra work: the [Vite library build](react.md#build-a-single-file-for-entando) inlines them into the bundle.

Files you put in `public/` are copied next to the bundle. For every EPC the App Builder publishes their base path at `window.entando.epc[<MFE name>].basePath`, so you can build their URLs at runtime:

``` js
const basePath = window.entando?.epc?.['YOUR-MFE-NAME']?.basePath;
const logoUrl = basePath ? `${basePath.replace(/\/$/, '')}/logo.svg` : '/logo.svg';
```

* Use the micro frontend's `name` from `entando.json` as the key.
* The fallback keeps the image working with `ent bundle run`, where Vite serves `public/` from the root.
* Don't use an absolute path such as `/logo.svg` on its own: inside the App Builder it resolves against the site root, not against your EPC.

::: tip No bundle ID needed
Earlier versions of this tutorial hard-coded the asset path from the bundle ID returned by `ent ecr get-bundle-id`. Reading `basePath` needs no bundle ID, keeps working if the Docker organization or bundle name changes, and follows the App Builder's own resolution of resource URLs, including in multi-tenant installations.
:::

### Build and Install the EPC
1. From the bundle root directory, [build and install](../pb/publish-project-bundle.md) the bundle:
   <EntandoInstallBundle/>

2. Log in to your App Builder to see the new EPC:
     * Go to `EPC` from the left menu and choose `Uncategorized` 
     * Click on your EPC `label`   
     You should see "Hello from a React micro frontend" and its counter button inside the App Builder.

::: tip Congratulations!
You now have an EPC running on Entando!
:::
 
**Next Steps**

* Learn how to utilize [Entando MFE Context Parameters](context-params.md) to extend your micro frontends.
* [Use Plugin Environment Variables to Customize Microservices](../../devops/plugin-environment-variables.md)
