# Entando MFE Context Parameters

Entando MFEs can be made more powerful using one or more configuration techniques.
1. Provide a configuration MFE. See the [Widget configuration tutorial](./widget-configuration.md).
2. Access context parameters from the Entando Application.
3. Setup API Claims so MFEs are automatically connected to microservices in the same bundle or namespace.
  
This tutorial will demonstrate the second technique by making use of context parameters drawn from the Entando Application. 

::: tip
Context params are provided via the `@wp.page` and `wp.info` custom tags on the server side. `wp.info` provides values by key for the info context, and also provides system parameters where the key is `systemParam`. See the [Core Tag Library](../../../docs/reference/freemarker-tags/freemarker-core-tags.md) for more information on these tags. 
:::

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- [A configurable React MFE](./widget-configuration.md)

## Configure the MFE to accept and display context parameters
This tutorial starts where the [configurable React MFE tutorial](./widget-configuration.md) ends since many of the changes required to enable context parameters are also required when preparing a config MFE. Those changes include modifying the custom element to accept the `config` json from Entando, enabling a local test setup using `mfe-config.json`, and configuring the bundle `entando.json`. 

This tutorial enables a few of the most commonly used context parameters:
* the code of the current page, e.g. `home` or `my-page`
* the current language, e.g. `en` or `it`
* the full base URL of the Entando Application

1. Edit the `simple-mfe/src/App.js`. Start by mapping the `contextParams` from the `config` structure.
```js
const { contextParams, params} = config || {};
```
2. Edit `App.js` to show the values of the `contextParams`. Add this code inside the `<header>` element:
```js
{ contextParams && (
    <>
      <div>Page Code: {contextParams.page_code}</div>
      <div>Current Language: {contextParams.info_currentLang}</div>
      <div>Application Base URL: {contextParams.systemParam_applicationBaseURL}</div>
    </>
)}
```
3. Provide sample data in the `simple-mfe/public/mfe-config.json` so you can test this locally.
```js
"contextParams": {
    "page_code": "my-page",
    "info_currentLang": "it",
    "systemParam_applicationBaseURL": "https://my-production-url/entando-de-app"
}
```
4. Startup your MFE and you should see the values displayed.
```shell
ent bundle run simple-mfe
```

## Configure and publish the bundle

1. Edit the `entando.json` and add the following block to the `simple-mfe` microfrontend definition:
```js
    "contextParams": [
        "page_code",
        "info_currentLang",
        "systemParam_applicationBaseURL"
    ]
```
2. You can now build and install the bundle. See [the Build and Publish tutorial](../pb/publish-project-bundle.md) for more details on these steps.  
```
ent bundle pack
ent bundle publish
ent bundle deploy
ent bundle install
```
3. Add the widget to a page in your Entando Application to confirm the live context parameters are shown as expected. For example, if you modify a page URL to select a different language (e.g. change `YOUR-BASE-URL/entando-de-app/en/demo.page` to `YOUR-BASE-URL/entando-de-app/it/demo.page`, the current language parameter (`info_currentLang`) should change from `en` to `it`.




