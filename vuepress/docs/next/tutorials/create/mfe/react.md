# Create a React Micro Frontend

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Create a React App in an Entando Bundle

### Create the Bundle Project

1. Initialize a new bundle project by scaffolding the default files and folders:
   ``` sh
   ent bundle init simple-bundle
   ```

2. Add an MFE to the bundle project structure:
   ``` sh
   ent bundle mfe add simple-mfe
   ```
### Create a Simple React App

[Create React App](https://create-react-app.dev/) allows you to generate a simple app in seconds. 

1. From the bundle root folder, create a React app in `/simple-bundle/microfrontends/`: 
   ``` bash
   npx create-react-app simple-mfe --use-npm
   ```
   Use the bundle name you chose when adding an MFE to overwrite the empty bundle folder created in the previous step. 

2. From the MFE folder, start the app:
   ``` bash
   cd microfrontends/simple-mfe
   npm start
   ```
   The React app should open in your browser at `http://localhost:3000`.

### Configure the Custom Element

The steps below wrap the app component with an HTML custom element. The `connectedCallback` method renders the React app when the custom element is added to the DOM.

1. In `simple-mfe/src`, create a file named `WidgetElement.js` 

2. Add the following code to `WidgetElement.js`:
   ``` js
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';

   class WidgetElement extends HTMLElement {
       connectedCallback() {
           this.mountPoint = document.createElement('div');
           this.appendChild(this.mountPoint);
           const root = ReactDOM.createRoot(this.mountPoint);
           root.render(<App />);
      }
   }

   customElements.define('simple-mfe', WidgetElement);

   export default WidgetElement;
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
   import './WidgetElement';
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

1. From the root bundle directory, generate the Docker image:
   ``` sh
   ent bundle pack
   ```
   This builds the widget and constructs a Docker image for the bundle.

2. Publish the Docker image to a Docker registry:
   ``` sh
   ent bundle publish
   ```

3. Deploy the bundle to your Entando Application:
   ``` sh
   ent bundle deploy
   ```
   Your bundle will appear in the Local Hub of your Entando instance, accessible from `App Builder` → `Hub`, and show a status of DEPLOYED.

4. Install the bundle in your Entando Application from `App Builder` → `Hub` or with the following command:
   ``` sh
   ent bundle install
   ```
   Your bundle will now show a status of INSTALLED. 

### Edit the Widget

1. In your App Builder, go to `Components` → `MFE & Widgets` 

2. Scroll down to the "User" section and click on "simple-mfe"

3. Edit the "Title" fields as desired and upload or select an icon of your choice

4. Click `Save`

### View the Widget

Place the React micro frontend onto a page to see it in action.

1. In the `Entando App Builder`, go to `Pages` → `Management` 

2. Choose an existing page (or [create a new one](../../compose/page-management.md#create-a-page)) and select `Design` from its Actions

3. Find your widget in the `Widgets` sidebar and drag it onto the page

4. Click `Publish`

5. Click on `View Published Page`

::: tip Congratulations!
You now have a React micro frontend running in Entando.
:::