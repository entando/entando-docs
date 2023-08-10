
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

1. Replace the contents of `src/custom-elements/WidgetElement.js` with the following code to add attribute handling to the custom element and re-render the app when an attribute changes. This enables the Entando-provided `config` to be passed as a property to the React root component (`App`).
   
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

2. Replace the contents of `src/App.js` with the following. This component now receives the `config` property and displays the `name` parameter it contains. This turns the static component from the [React MFE tutorial](./react.md) into a more dynamic component. 

``` javascript
import './App.css';

function App({config}) {
  const { params } = config || {};
  const { name } = params || {};

  return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello, {name}!
          </p>
        </header>
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

4. Replace the `body` of `public/index.html` with the following. This allows you to set the MFE `config` attribute and test locally with the same configuration structure provided by Entando.
``` html 
<simple-mfe/>
<script>
   function injectConfigIntoMfe() {
     fetch('%PUBLIC_URL%/mfe-config.json').then(async response => {
       const config = await response.text()
       const mfeEl = document.getElementsByTagName('simple-mfe')[0]
       mfeEl.setAttribute('config', config)
     })
   }
   
   injectConfigIntoMfe()
</script>
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

2. Generate a new React app:
``` shell
npx create-react-app microfrontends/simple-mfe-config --use-npm
```

3. Start the app:
``` shell
ent bundle run simple-mfe-config
```

4. Create a `microfrontends/simple-mfe-config/src/WidgetElement.js` component with the following content to set up the custom element for the config MFE.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class WidgetElement extends HTMLElement {
   constructor() {
      super();
      this.reactRootRef = React.createRef();
      this.mountPoint = null;
   }

   get config() {
      return this.reactRootRef.current ? this.reactRootRef.current.state : {};
   }

   set config(value) {
      return this.reactRootRef.current.setState(value);
   }

   connectedCallback() {
      this.mountPoint = document.createElement('div');
      this.appendChild(this.mountPoint);
      this.render();
   }

   render() {
      ReactDOM.render(<App ref={this.reactRootRef} />, this.mountPoint);
   }
}

customElements.define('simple-mfe-config', WidgetElement);
```

::: tip App Builder integration
* A config MFE must retain its state in a `config` property
* The App Builder supplies the `config` property when the config MFE is rendered
* When a user saves the form, the App Builder automatically persists the configuration through Entando APIs
:::

5. Replace the contents of `src/App.js` with the following to add a simple form for managing a single `name` field

```javascript
import React, {Component} from 'react';

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: props.name
      };
   }

   handleChange = e => {
      const input = e.target;
      this.setState({
         [input.name]: input.value,
      });
   };

   render() {
      const { name } = this.state;
      return (
        <div>
           <h1>Simple MFE Configuration</h1>
           <div>
              <label htmlFor="name">Name </label>
              <input id="name" name="name" defaultValue={name} type="text" onChange={this.handleChange}  />
           </div>
        </div>
      );
   }
}

export default App;
```

::: tip
* When the config MFE is displayed within the App Builder, the App Builder styles will be applied. 
:::
  
6. Replace the contents of `src/index.js` with the following:
```javascript
import './index.css';
import './WidgetElement';
```

7. For test purposes, add a configuration file `public/mfe-config.json` with the following content. Note: the JSON for a config MFE contains just parameters so it is simpler than the JSON for a target MFE. 
``` javascript
{
  "name": "John Brown"
}
```

8. Replace the `body` of `public/index.html` with the following. This allows you to set the config MFE parameters and test locally.
``` html 
<simple-mfe-config/>
<script>
   function injectConfigIntoMfe() {
     fetch('%PUBLIC_URL%/mfe-config.json').then(async response => {
       const config = await response.json()
       const mfeEl = document.getElementsByTagName('simple-mfe-config')[0]
       mfeEl.config = config
     })
   }
   
   injectConfigIntoMfe()
</script>
```

## Step 3: Configure the Target MFE to Use the Config MFE

1. Edit the `entando.json` and add these properties to the target MFE in order to connect the config MFE to the target MFE and specify the available params.
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
