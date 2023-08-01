---
sidebarDepth: 2
---

# Communicate Between Micro Frontends

::: tip Recommended Learning
- Tutorial: [Create a React Micro Frontend](react.md)
:::

Entando supports communication between micro frontends (MFEs) using [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) and the [entando-mfecommunication](https://github.com/entando/frontend-libraries/tree/master/packages/entando-mfecommunication) library. The MFEs can use either the same or different JavaScript frameworks. 

In this tutorial, we build:
- A React MFE that publishes an event
- A React MFE that listens to an event

## Prerequisites

- Two Entando Bundles based on the [simple React tutorial](react.md), named `publisher-mfe` and `subscriber-mfe` as templates.

## Modify the Publisher MFE

### Create the Custom Event

1. Add the `mfecommunication`` library to the `publisher-mfe` by running this command within the `microfrontends/publisher-mfe` directory:
``` bash
  npm install @entando/mfecommunication --save
```
> *Note:* Direct CustomEvents could also be used, but this library requires less code and provides additional diagnostics when troubleshooting issues with MFE communications.

2. To publish a custom event, modify the file `publisher-mfe/src/custom-elements/WidgetElement.js`:

``` js
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mediatorInstance } from '@entando/mfecommunication';

const EVENTS = {
  greeting: 'greeting',
};

class WidgetElement extends HTMLElement {

  constructor() {
    super();
    this.onGreet = name => this.publishWidgetEvent(EVENTS.greeting, { name });
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.render();
  }

  publishWidgetEvent(eventId, detail) {
    mediatorInstance.publish(eventId, detail);
  }

  render() {
    ReactDOM.render(<App onGreet={this.onGreet} />, this.mountPoint);
  }
}

customElements.define('publisher-mfe', WidgetElement);

export default WidgetElement;
```

3. Confirm the app renders in the browser: 
``` bash
ent bundle run publisher-mfe
```

### Dispatch the Custom Event

1. Replace the contents of `publisher-mfe/src/App.js` to add an input field for use in the CustomEvent:

``` js
import React from 'react';
import './App.css';
   
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
    const { onGreet } = this.props;
    return (
      <div>
        <h1>Send a greeting</h1>
        <label htmlFor="name">Name</label>
        <input id="name" onChange={e => this.handleNameChange(e.target.value)} value={name} />
        <button onClick={() => onGreet(name)}>Say hello!</button>
      </div>
    );
  }
}

export default App;
```

2. In the JavaScript console of your browser, enter the following:

``` js
  window.entando.globals.mediator.subscribe("greeting", {
      callerId: "subscriberA",
      callback: (data) => console.log('Subscriber A received:', data),
  });
```

3. To test the event dispatcher, write something in the text field and click the "Say hello!" button

4. Confirm that the event message appears in the JS console

::: tip Congratulations!
You’ve now published a custom event.
:::

## Modify the Subscriber MFE

### Create the Event Listener

1. Add the `mfecommunication` library to the `subscriber-mfe` by running this command within the `microfrontends/subscriber-mfe` directory:
``` bash
  npm install @entando/mfecommunication --save
```

2. To add an event listener, create the file `subscriber-mfe/src/custom-elements/WidgetElement.js`:

``` js
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { mediatorInstance } from '@entando/mfecommunication';

const EVENTS = {
  greeting: 'greeting',
};

class WidgetElement extends HTMLElement {

  constructor() {
    super();
    this.name = null;

    this.subscribeToWidgetEvent(EVENTS.greeting, (evt) => this.onGreeting(evt.name));
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.render();
  }

  subscribeToWidgetEvent(eventType, eventHandler) {
    mediatorInstance.subscribe(eventType, {
        callerId: "subscriber-mfe",
        callback: eventHandler
    });
  }

  onGreeting(name) {
    this.name = name;
    this.render();
  }

  render() {
    ReactDOM.render(<App name={this.name} />, this.mountPoint);
  }
}

customElements.define('subscriber-mfe', WidgetElement);

export default WidgetElement;
```

3. Confirm the app renders in the browser by using `ent bundle run subscriber-mfe`

### Display the Custom Event

1. Replace the contents of `subscriber-mfe/src/App.js`:

``` js
import React from 'react';
import './App.css';

function App({ name }) {
  return name ? (<h2>Just got a greeting from {name}</h2>)
    : (<h2>Waiting for a greeting...</h2>);
}

export default App;
```

2. To test the event listener, enter the following code in the JavaScript console of your browser:

``` js
window.entando.globals.mediator.publish('greeting', {name:'Pippo'});
```

3. Confirm the custom event is displayed in the `subscriber-mfe`

::: tip Congratulations!
You’ve now created a micro frontend that listens to custom events.
:::

## Add Widgets to App Builder

To add the publisher and subscriber MFEs to Entando, run the following commands from the root folder of each:

<EntandoInstallBundle/> 

Refer to the tutorial on how to [publish a bundle project](../pb/publish-project-bundle.md#create-and-deploy-a-bundle-project) for more detailed instructions.

### View on a Page

Place the widgets on an existing page or [create your own page](../../compose/page-management.md). The following steps use the `Home` page simply as an example.

1. Go to `Pages` → `Management`

2. On the line item for the `Home` page, in the `Actions` column, click the `⋮` icon

3. Select `Edit`

4. In the `Settings` section, select a Page Template with more than one frame

5. Click `Save and Design`

6. From the `Widgets` tab in the right sidebar, drag your publisher and subscriber widgets into `Frame 1` and `Frame 2`

7. Click `Publish`

8. To view the `Home` page, click `View Published Page` at the top of the page

9. Enter a name in the input field and click the "Say hello!" button

10. Confirm that the subscriber widget updates to display the name

::: tip Congratulations!
You can now communicate between micro frontends using custom events!
:::


