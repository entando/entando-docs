# Create a React Micro Frontend

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Create a React App in an Entando Bundle

### Create the Bundle Project

1. Initialize a new bundle project with the default files and folders:
   ``` sh
   ent bundle init simple-bundle
   ```

2. From the root bundle folder, add an MFE to the bundle project:
   ``` sh
   cd simple-bundle
   ent bundle mfe add simple-mfe
   ```
### Create a Simple React App

[Create React App](https://create-react-app.dev/) allows you to generate a simple app in seconds. 

1. Create a React app in `/simple-bundle/microfrontends/`: 
   ``` bash
   npx create-react-app microfrontends/simple-mfe --use-npm
   ```
   Assign the same bundle name you chose when adding an MFE to overwrite the empty "simple-mfe" folder.

2. From the root bundle folder, start the new app :
   ``` bash
   ent bundle run simple-mfe
   ```
   The React app should open in your browser at `http://localhost:3000`.

### Configure the Custom Element

The steps below wrap the app component with an HTML custom element. The `connectedCallback` method renders the React app when the custom element is added to the DOM.

1. In `simple-mfe/src`, create a directory named `custom-elements`

2. In `custom-elements`, create a new file named `public-path.js` with the following code. This will enable your React MFE to serve static assets when deployed in Entando. If you use a different name for your custom element, you should change it on the second line.
   ``` js
   if (process.env.NODE_ENV === 'production') {
       let publicpath = window.entando?.widgets['simple-mfe']?.basePath;
       if (publicpath && publicpath.slice(-1) !== '/') {
           publicpath = `${publicpath}/`;
       }
       // eslint-disable-next-line no-undef
       __webpack_public_path__ = publicpath || './';
   }
   ```

3. In the same directory, create `WidgetElement.js` with this code:
   ``` js
   import './public-path.js';
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from '../App';
   
   class WidgetElement extends HTMLElement {
       connectedCallback() {
           this.mountPoint = document.createElement('div');
           this.appendChild(this.mountPoint);
           const root = ReactDOM.createRoot(this.mountPoint);
           root.render(<App />);
      }
   }
   
   customElements.define('simple-mfe', WidgetElement);
   ```

   ::: tip Custom Element Names

   - [Must contain a hyphen `-` in the name](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name)
   - Cannot be a single word
   - Should follow `kebab-case` naming convention
   :::

### Display the Custom Element

1. Replace the entire contents of `src/index.js` with these two lines: 
   ``` js
   import './index.css';
   import './custom-elements/WidgetElement';
   ```

2. In `public/index.html`, replace `<div id="root"></div>` with the following:
   ``` html
   <simple-mfe />
   ```

3. Observe your browser automatically redisplay the React app.

::: tip Congratulations!
You’re now using a custom element to display a React app.
:::

## Display the React MFE in Entando

1. [Publish the bundle project](../pb/publish-project-bundle.md)

### View the Widget

Place the React micro frontend onto a page to see it in action.

1. In the `Entando App Builder`, go to `Pages` → `Management` 

2. Choose an existing page (or [create a new one](../../compose/page-management.md#create-a-page)) and select `Design` from its Actions

3. Find your widget in the `Widgets` sidebar and drag it onto the page

4. Click `Publish`

5. Click on `View Published Page`

::: tip Congratulations!
You now have a React micro frontend running in Entando!
:::

**Next Steps**
* [Add a Configuration MFE in App Builder](widget-configuration.md)
* [Create an Entando Platform Capability](epc.md) with your React bundle