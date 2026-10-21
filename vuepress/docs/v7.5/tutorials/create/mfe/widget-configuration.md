
# Add a Configuration MFE in App Builder

Entando MFEs can be customized through an App Builder feature that uses a specialized micro frontend. This tutorial splits the process into 4 steps:

1. Modify an existing MFE (the target MFE) to take a configuration option
2. Create a new MFE (the config MFE) to provide a user interface for the configuration option
3. Set up the target MFE to use the configuration provided by the config MFE
4. Publish and test the configurable MFE

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- [An existing React MFE](./react.md)

## Step 1: Add a Configuration Option to a Target MFE
Start by adding a configuration option to an existing MFE. If you don't already have one, you can create it via the [React MFE tutorial](./react.md).

### Add an Attribute to the Custom Element

1. Replace the contents of `src/custom-elements/WidgetElement.jsx` with the following code to add attribute handling to the custom element and re-render the app when an attribute changes. This enables the Entando-provided `config` to be passed as a property to the React root component (`App`).
   
``` javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../App';

const ATTRIBUTES = {
    config: 'config'
};

class WidgetElement extends HTMLElement {

    static get observedAttributes() {
        return Object.values(ATTRIBUTES);
    }

    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);

        this.root = createRoot(this.mountPoint);
        this.render();
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (!WidgetElement.observedAttributes.includes(attribute)) {
            throw new Error(`Untracked changed attributes: ${attribute}`)
        }
        if (this.mountPoint && newValue !== oldValue) {
            this.render();
        }
    }

    render() {
        const attributeConfig = this.getAttribute(ATTRIBUTES.config);
        const config = attributeConfig && JSON.parse(attributeConfig);

        this.root.render(
            <App config={config} />
        );
    }
}

customElements.define('simple-mfe', WidgetElement);
```

2. Replace the contents of `src/App.jsx` with the following. This component now receives the `config` property and displays the `name` parameter it contains. This turns the static component from the [React MFE tutorial](./react.md) into a more dynamic component. 

``` javascript
import './App.css';

function App({config}) {
  const { params } = config || {};
  const { name } = params || {};

  return (
      <div className="simple-mfe">
        <p>
          Hello, {name}!
        </p>
      </div>
  );
}

export default App;
```

3. For test purposes, add a configuration file `public/mfe-config.json` with the following content:
``` javascript
{
    "params": {
        "name": "Jane Smith"
    }
}
```

4. In `index.html`, at the root of `simple-mfe`, replace the `<body>` with the following. This allows you to set the MFE `config` attribute and test locally with the same configuration structure provided by Entando. Keep the `/src/main.jsx` script: Vite loads the app through it.
``` html 
<body>
  <simple-mfe></simple-mfe>
  <script type="module" src="/src/main.jsx"></script>
  <script>
     function injectConfigIntoMfe() {
       fetch('/mfe-config.json').then(async response => {
         const config = await response.text()
         const mfeEl = document.getElementsByTagName('simple-mfe')[0]
         mfeEl.setAttribute('config', config)
       })
     }

     injectConfigIntoMfe()
  </script>
</body>
```

5. Start the app and confirm that "Hello, Jane Smith!" is displayed. Use Ctrl+C to close the app.

``` shell
ent bundle run simple-mfe
```

## Step 2: Create a Config MFE
Next, create a new MFE for managing the configuration option. These steps are very similar to the [React MFE tutorial](./react.md). 

1. Add a new microfrontend to your bundle project:
``` shell
ent bundle mfe add simple-mfe-config --type=widget-config
```

2. Generate a new React app with Vite, then prepare it as in the [React MFE tutorial](./react.md#create-a-react-app-with-vite), using `simple-mfe-config` wherever that tutorial says `simple-mfe`: install the dependencies, add the `start` script, set `"buildFolder": "dist"` on `simple-mfe-config` in `entando.json`, and configure library mode as described in [Build a Single File for Entando](./react.md#build-a-single-file-for-entando).
``` shell
npm create vite@latest microfrontends/simple-mfe-config -- --template react
```

3. Start the app:
``` shell
ent bundle run simple-mfe-config
```

4. Create a `microfrontends/simple-mfe-config/src/WidgetElement.jsx` component with the following content to set up the custom element for the config MFE.
```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

class WidgetElement extends HTMLElement {
   constructor() {
      super();
      this.params = {};
      this.mountPoint = null;
      this.root = null;
   }

   // Read by the App Builder when the user saves the form.
   get config() {
      return this.params;
   }

   // Written by the App Builder when the form opens on an already configured widget.
   set config(value) {
      this.params = value || {};
      this.render();
   }

   connectedCallback() {
      this.mountPoint = document.createElement('div');
      this.appendChild(this.mountPoint);
      this.root = createRoot(this.mountPoint);
      this.render();
   }

   render() {
      if (!this.root) {
         return;
      }
      this.root.render(
         <App
            params={this.params}
            onChange={params => {
               this.params = params;
               this.render();
            }}
         />
      );
   }
}

customElements.define('simple-mfe-config', WidgetElement);
```

::: tip App Builder integration
* A config MFE must retain its state in a `config` property
* The App Builder supplies the `config` property when the config MFE is rendered
* When a user saves the form, the App Builder automatically persists the configuration through Entando APIs
:::

::: warning Why the custom element owns the values
The App Builder **reads `config` back** from the element when the user saves, so `config` has to
return the current state of the form. `createRoot().render()` returns nothing, so there is
no component instance to read a `state` from — the custom element keeps the values and passes them
to React as props, and React reports edits back through `onChange`.

This is also why a config MFE cannot be wrapped with a generic React-to-web-component helper: those
expose `config` as a write-only prop, so on save the App Builder would read back the values the form
started with and every edit would be lost.
:::

5. Replace the contents of `src/App.jsx` with the following to add a simple form for managing a single `name` field

```javascript
import React from 'react';

function App({ params, onChange }) {
   const handleChange = e => {
      const input = e.target;
      onChange({ ...params, [input.name]: input.value });
   };

   return (
     <div>
        <h1>Simple MFE Configuration</h1>
        <div>
           <label htmlFor="name">Name </label>
           <input id="name" name="name" value={params.name || ''} type="text" onChange={handleChange} />
        </div>
     </div>
   );
}

export default App;
```

::: tip
* When the config MFE is displayed within the App Builder, the App Builder styles will be applied. 
:::
  
6. Replace the contents of `src/main.jsx` with the following:
```javascript
import './WidgetElement';
```
Don't import `src/index.css` here. A config MFE renders inside the App Builder, so the template's global rules for `body`, `h1`, `p` and so on would restyle the App Builder itself.

7. For test purposes, add a configuration file `microfrontends/simple-mfe-config/public/mfe-config.json` with the following content. Note: the JSON for a config MFE contains just parameters so it is simpler than the JSON for a target MFE. 
``` javascript
{
  "name": "John Brown"
}
```

8. In `index.html`, at the root of `simple-mfe-config`, replace the `<body>` with the following. This allows you to set the config MFE parameters and test locally. Keep the `/src/main.jsx` script: Vite loads the app through it.
``` html 
<body>
  <simple-mfe-config></simple-mfe-config>
  <script type="module" src="/src/main.jsx"></script>
  <script>
     function injectConfigIntoMfe() {
       fetch('/mfe-config.json').then(async response => {
         const config = await response.json()
         const mfeEl = document.getElementsByTagName('simple-mfe-config')[0]
         mfeEl.config = config
       })
     }

     injectConfigIntoMfe()
  </script>
</body>
```

## Step 3: Configure the Target MFE to Use the Config MFE

1. Edit the `entando.json` and add these properties to the `simple-mfe` in order to connect the config MFE to this target MFE and specify the available params.
``` javascript
"configMfe": "simple-mfe-config",
"params": [
    {
        "name": "name",
        "description": "The name for Hello World"
    }
]
```

## Step 4: Publish and Test the Configurable MFE

1. Build and install the bundle with the following commands. For more details, see the [Build and Publish tutorial](../pb/publish-project-bundle.md).
   <EntandoInstallBundle/>

2. Test the full setup by adding the widget into an existing page. The config MFE should be displayed when the widget is first added to the page.
    
3. Fill out the `name` field and click `Save`. You can update the widget configuration at any point by clicking `Settings` from the widget actions in the Page Designer.

4. Publish the page and confirm the target MFE is configured and displays correctly.
