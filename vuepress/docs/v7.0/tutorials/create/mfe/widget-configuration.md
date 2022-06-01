
# Add a Configuration Screen in App Builder

Entando widgets can be customized through an App Builder configuration screen that is itself a micro frontend.

There are 3 steps to this tutorial
1. Modify an existing MFE (the target MFE) to take a configuration option
2. Create a new MFE (the config MFE) to provide a user interface for the configuration option
3. Set up the target MFE to use the configuration provided by the config MFE

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- [An existing React MFE](./react.md)

## Add a configuration option to your target MFE
Start by adding a configuration option to an existing MFE. If you don't already have one, you can create it via the [React MFE tutorial](./react.md).

### Add an Attribute to the Custom Element

1. Edit `src/WidgetElement.js` to add attribute handling to the custom element and to re-render the App when an attribute changes. This enables the *name* attribute on the custom element to be passed as a prop to
the React root component (*App*).
   
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

2. Edit the `src/App.js` component to make it display the `name` prop. This turns the static component from the previous tutorial into a more dynamic component.
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

3. For test purposes, edit `public/index.html` and set a value for the *name* attribute of the
custom element.
``` html 
<my-widget name="Jane" />
```
4. Start the app and confirm that "Hello, Jane!" is displayed.
``` bash
cd my-widget
npm start
```
5. Build the app and load the updated files into Entando. If you followed the previous tutorial, only `js/main.GENERATED-ID.js` needs to be added or updated.
```bash
npm run build
```

## Create a config MFE
Next create a new MFE for managing the configuration option. These steps are very similar to the [previous tutorial](./react.md). 

::: tip
This tutorial sets up a separate, standalone config MFE since that allows reuse across multiple target MFEs. You could also choose to add the config custom element into the target MFE in which case the configUI will also reference the target MFE files.
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
3. Modify `src/App.js` to add a simple form for managing a single `name` field.
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
* Use your favorite form handling library, e.g.[Formik](https://jaredpalmer.com/formik)
* This MFE will be displayed within the App Builder which currently uses [PatternFly
v3](https://www.patternfly.org/v3/) (`patternfly` and `patternfly-react`
packages) for styling.
:::
  
4. Add `src/WidgetElement.js` to setup the custom element for the config MFE.
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
  
5. Replace `src/index.js` with this
```javascript
    import './index.css';
    import './WidgetElement';
```

6. For test purposes, modify `public/index.html` and confirm the form renders correctly. Replace the body tag with this:
```html
<body>
<my-widget-config />
</body>
```

## Build and configure the config MFE

1. Build the app from the 'my-widget-config' directory
```bash
npm run build
```

2. In the App Builder, go to `Administration` → `File browser` → `public`

3. Click `Create folder` and name it "my-widget-config".

4. Click `Save`

5. Click `my-widget-config`

6. Create a folder structure similar to your generated build directory:

- `my-widget-config/static/css`
- `my-widget-config/static/js`

6. Upload the css and js files from the corresponding directories under 'my-widget-config/build/static'. The generated id in each file name (e.g. '073c9b0a') may be different after each build. There may also be LICENSE.txt or .map files but they are not necessary for this tutorial.

- `my-widget-config/build/static/css/main.073c9b0a.css`
- `my-widget-config/build/static/js/main.b9eb8fa4.js`
 
7. Go to `Components` → `MFE & Widgets` and edit your target widget. 

8. Set **`Config UI`** to select the config custom element and its corresponding files. Note that the paths here reference "my-widget-config".
```javascript
{
  "customElement": "my-widget-config",
  "resources": [
    "my-widget-config/static/js/main.b9eb8fa4.js"
  ]
}
```
   
9. Set the **`Custom UI`** so it accepts the "name" config parameter. 
```javascript
{
    <#assign wp=JspTaglibs[ "/aps-core"]>
    <link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.073c9b0a.css">
    <script nonce="<@wp.cspNonce />" async src="<@wp.resourceURL />my-widget/static/js/main.e6296e83.js" ></script>
    <@wp.currentWidget param="config" configParam="name" var="configName" />
    <my-widget name="${configName}" />
}
```
::: tip
Multiple `<@wp.currentWidget param` tags can be used when a config MFE supports more than one parameter.
::: 

10. Test the full setup by adding the widget into an existing page. 
    
11. Fill out the "name" field and click `Save`. You can update the widget configuration at any point by clicking `Settings` from the widget actions in the Page Designer.

12. Publish the page and confirm the target MFE is configured and displays correctly.



