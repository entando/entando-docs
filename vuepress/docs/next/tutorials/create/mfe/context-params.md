# Entando MFE Context Parameters

Entando MFEs can be made more powerful using one or more configuration techniques:
1. Provide a [configuration MFE](./widget-configuration.md) 
2. Access context parameters from the Entando Application
3. Set up API claims so MFEs are automatically connected to microservices in the same bundle or namespace
  
This tutorial will demonstrate the second technique by making use of the most commonly used context parameters:
* `page_code`: the code of the current page, e.g. `home` or `my-page`
* `info_currentLang`: the current language, e.g. `en` or `it`
* `systemParam_applicationBaseURL`: the full base URL of the Entando Application

::: tip
Context params are provided on the server side via the `@wp.page` and `wp.info` custom tags. Note that the `wp.info` tag retrieves values by key for the info context as well as system parameters when the key is `systemParam`. See the [Core Tag Library](../../../docs/reference/freemarker-tags/freemarker-core-tags.md) for more information. 
:::

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- [A configurable React MFE](./widget-configuration.md)

## Configure the MFE to Display Context Parameters
This tutorial starts where the [configurable React MFE tutorial](./widget-configuration.md) ends since many of the changes required to enable context parameters are also required when preparing a config MFE. Those changes include modifying the custom element to accept the `config` JSON from Entando, enabling a local test setup using `mfe-config.json`, and configuring the bundle descriptor `entando.json`. 

1. Edit the `simple-mfe/src/App.js`. Start by updating the existing `config` mapping:
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
3. Provide sample data in the `simple-mfe/public/mfe-config.json` so you can test this locally:
```js
"contextParams": {
    "page_code": "my-page",
    "info_currentLang": "it",
    "systemParam_applicationBaseURL": "https://my-production-url/entando-de-app"
}
```
4. Start up the MFE and confirm it can display the context parameters:
```shell
ent bundle run simple-mfe
```

## Configure and Publish the Bundle

1. Edit `entando.json` and add the following block to the `simple-mfe` micro frontend definition:
```js
    "contextParams": [
        "page_code",
        "info_currentLang",
        "systemParam_applicationBaseURL"
    ]
```
2. You can now [build and install the bundle](../pb/publish-project-bundle.md):  
```
ent bundle pack
ent bundle publish
ent bundle deploy
ent bundle install
```
3. Add the widget to a page in your Entando Application to confirm the context parameters display correctly. If you modify a page URL to select a different language (e.g. change `YOUR-BASE-URL/entando-de-app/en/demo.page` to `YOUR-BASE-URL/entando-de-app/it/demo.page`), the current language parameter (`info_currentLang`) should change from `en` to `it`.
