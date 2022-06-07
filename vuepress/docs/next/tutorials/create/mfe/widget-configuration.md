
# Add a Configuration Screen in App Builder

Entando widgets can be customized through an App Builder configuration screen that is itself a micro frontend. This tutorial splits the process into 3 steps:

1. Modify an existing MFE (the target MFE) to take a configuration option
2. Create a new MFE (the config MFE) to provide a user interface for the configuration option
3. Set up the target MFE to use the configuration provided by the config MFE

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- [An existing React MFE](./react.md)

## Step 1: Add a configuration option to your target MFE
Start by adding a configuration option to an existing MFE. If you don't already have one, you can create it via the [React MFE tutorial](./react.md).

### Add an Attribute to the Custom Element

1. Replace the contents of `src/WidgetElement.js` with the following to add attribute handling to the custom element and re-render the app when an attribute changes. This enables the `name` attribute of the custom element to be passed as a property to the React root component (`App`).
   
``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const ATTRIBUTES = {
  name: 'name',
};

class WidgetElement extends HTMLElement {

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!Object.values(ATTRIBUTES).includes(name)) {
      throw new Error(`Untracked changed attribute: ${name}`);
    }
    if (this.mountPoint && newValue !== oldValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.render();
  }
    
  render() {
    const name = this.getAttribute(ATTRIBUTES.name);
    ReactDOM.render(<App name={name} />, this.mountPoint);
  }
}

customElements.define('my-widget', WidgetElement);

export default WidgetElement;
```

2. Replace the contents of `src/App.js` with the following. This component now displays the `name` property, turning the static component from the [React MFE tutorial](./react.md) into a more dynamic component.

``` javascript
    import React from 'react';
    import './App.css';

    function App({name}) {
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

3. For test purposes, replace the contents of `public/index.html` with the following. This allows you to set a value for the `name` attribute of the custom element.

``` html 
<my-widget name="Jane" />
```

4. Start the app and confirm that "Hello, Jane!" is displayed

``` bash
cd my-widget
npm start
```
5. Build the app

```bash
npm run build
```

6. Load the updated `my-widget` files into Entando as was done for the [React MFE tutorial](./react.md#upload-the-react-files)

> Note: If you followed the React MFE tutorial, only `js/main.GENERATED-ID.js` needs to be added or updated.
## Step 2: Create a config MFE
Next, create a new MFE for managing the configuration option. These steps are very similar to the [React MFE tutorial](./react.md). 

::: tip
This tutorial sets up a separate, standalone config MFE since that allows reuse across multiple target MFEs. You could also choose to include the config custom element in the target MFE, in which case the **configUI** will also reference the target MFE files.
:::

1. Generate a new React app
```shell
npx create-react-app my-widget-config --use-npm
```
2. Start the app
```shell
cd my-widget-config
npm start
```
3. Replace the contents of `src/App.js` with the following to add a simple form for managing a single `name` field

```javascript
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: ''};
  }

  handleNameChange(value) {
    this.setState(prevState => ({
      ...prevState,
      name: value,
    }));
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h1>Sample Entando Widget Configuration</h1>
        <label htmlFor="name">Name </label>
        <input id="name" onChange={e => this.handleNameChange(e.target.value)} value={name} />
      </div>
    );
  }
}

export default App;
```

::: tip
* Use your preferred form handling library, e.g.[Formik](https://jaredpalmer.com/formik)
* This MFE will be displayed within the App Builder, which currently uses [PatternFly
v3](https://www.patternfly.org/v3/) (`patternfly` and `patternfly-react`
packages) for styling
:::
  
4. Add a `src/WidgetElement.js` component with the following content to set up the custom element for the config MFE
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
        ReactDOM.render(<App ref={this.reactRootRef} />, this.mountPoint);
    }
}

customElements.define('my-widget-config', WidgetElement);

export default WidgetElement;
```

::: tip App Builder integration
* A config MFE must retain its state in a `config` property
* The App Builder supplies the `config` property when the MFE is rendered
* When a user saves the form, the App Builder automatically persists the configuration through Entando APIs
:::
  
5. Replace the contents of `src/index.js` with the following:
```javascript
    import './index.css';
    import './WidgetElement';
```

6. For test purposes, replace the body tag of `public/index.html` with the following and confirm the form renders correctly
```html
<body>
<my-widget-config />
</body>
```
## Step 3: Build and configure the config MFE

1. Build the app from the `my-widget-config` directory
```bash
npm run build
```

2. In the App Builder, go to `Administration` → `File browser` → `public`

3. Click `Create folder` and name it "my-widget-config"

4. Click `Save`

5. Click `my-widget-config`

6. Create a folder structure similar to your generated build directory:

   - `my-widget-config/static/css`
   - `my-widget-config/static/js`

7. Upload the css and js files from the corresponding directories under `my-widget-config/build/static`

   - `my-widget-config/build/static/css/main.073c9b0a.css`
   - `my-widget-config/build/static/js/main.b9eb8fa4.js`

> Note: The generated ID of each file name (e.g. '073c9b0a') may change after every build. These folders may also contain LICENSE.txt or .map files, but they are not applicable to this tutorial.
 
8. Go to `Components` → `MFE & Widgets` and edit your target widget 

   - Set **`Config UI`** to select the config custom element and its corresponding files. Note that the paths here reference "my-widget-config".
   ```javascript
   {
     "customElement": "my-widget-config",
     "resources": [
       "my-widget-config/static/js/main.e6c13ad2.js"
     ]
   }
   ```
   
   - Set **`Custom UI`** to accept the `name` config parameter 
   ```ftl
       <#assign wp=JspTaglibs[ "/aps-core"]>
       <link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.073c9b0a.css">
       <script nonce="<@wp.cspNonce />" async src="<@wp.resourceURL />my-widget/static/js/main.e6296e83.js" ></script>
       <@wp.currentWidget param="config" configParam="name" var="configName" />
      <my-widget name="${configName}" />
   ```
::: tip
Multiple `<@wp.currentWidget param` tags can be used when a config MFE supports more than one parameter.
::: 

9. Test the full setup by adding the widget into an existing page
    
10. Fill out the `name` field and click `Save`. You can update the widget configuration at any point by clicking `Settings` from the widget actions in the Page Designer.

11. Publish the page and confirm the target MFE is configured and displays correctly
