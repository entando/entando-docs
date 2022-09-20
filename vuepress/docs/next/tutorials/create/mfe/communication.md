---
sidebarDepth: 2
---

# Communicate Between Micro Frontends

::: tip Recommended Learning
- Tutorial: [Create a React Micro Frontend](react.md)
:::

Entando supports communication between micro frontends (MFEs) using [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), an established web standard. The MFEs can use either the same or different JavaScript frameworks. In this tutorial, we build:

- A React MFE that publishes an event
- A React MFE that listens to an event
## Prerequisites

- 2 simple React apps: One will be modified to publish an event while the other will be modified to subscribe to an event. Refer to the [simple React app tutorial](react.md#create-a-react-app-in-an-entando-bundle) to create an MFE and import and test the custom element.

## Modify the Publisher MFE

1. To add a custom event, create the file `publisher-widget/src/PublisherWidgetElement.js`:

   ``` js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   const EVENTS = {
     greeting: 'greeting',
   };

   class PublisherWidgetElement extends HTMLElement {

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
       const widgetEvent = new CustomEvent(eventId, { detail });
       window.dispatchEvent(widgetEvent);
     }

     render() {
       ReactDOM.render(<App onGreet={this.onGreet} />, this.mountPoint);
     }
   }

   customElements.define('publisher-widget', PublisherWidgetElement);

   export default PublisherWidgetElement;
   ```

   In the `CustomEvent` constructor, `detail` denotes the specific name to use in the event payload per the [DOM specification](https://dom.spec.whatwg.org/#interface-customevent).

2. Update `publisher-widget/src/App.js` to dispatch an event:

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

3. Enter the following in the JavaScript console of your browser:

   ``` js
   window.addEventListener('greeting', (evt) => console.log('Hello', evt.detail.name))
   ```

4. To test the event dispatcher, write something in the text field and click the "Say hello!" button

5. Confirm the event message appears in the JS console

::: tip Congratulations!
You’ve now published a custom event
:::

## Modify the Subscriber MFE

1. To add an event listener, create the file `subscriber-widget/src/SubscriberWidgetElement.js`:

   ``` js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';

   const EVENTS = {
     greeting: 'greeting',
   };

   class SubscriberWidgetElement extends HTMLElement {

     constructor() {
       super();
       this.name = null;
       this.subscribeToWidgetEvent(EVENTS.greeting, (evt) => this.onGreeting(evt.detail.name));
     }

     connectedCallback() {
       this.mountPoint = document.createElement('div');
       this.appendChild(this.mountPoint);
       this.render();
     }

     subscribeToWidgetEvent(eventType, eventHandler) {
       window.addEventListener(eventType, eventHandler);
     }

     onGreeting(name) {
       this.name = name;
       this.render();
     }

     render() {
       ReactDOM.render(<App name={this.name} />, this.mountPoint);
     }
   }

   customElements.define('subscriber-widget', SubscriberWidgetElement);

   export default SubscriberWidgetElement;
   ```
2. Update `subscriber-widget/src/App.js` to display the custom event:

   ``` js
   import React from 'react';
   import './App.css';

   function App({ name }) {
     return name ? (<h2>Just got a greeting from {name}</h2>)
       : (<h2>Waiting for a greeting...</h2>);
   }

   export default App;
   ```

3. To test the event listener, enter the following in the JavaScript console of your browser:

   ``` js
   const widgetEvent = new CustomEvent('greeting', {
     detail: {
       name: 'Pippo'
     },
   });
   window.dispatchEvent(widgetEvent);
   ```

4. Confirm the custom event is displayed in the `subscriber-widget`

::: tip Congratulations!
You’ve now created a micro frontend that listens to custom events
:::

## Add Widgets to App Builder

To add the publisher and subscriber MFEs to Entando, run the following commands from the root folder of each:

``` sh
ent bundle pack
ent bundle publish
ent bundle deploy
ent bundle install
```

Refer to the tutorial on how to [publish a bundle project](../pb/publish-project-bundle.md#create-and-deploy-a-bundle-project) for more detailed instructions.

### View on a Page

Set up the widgets on an existing page or [create your own page](../../compose/page-management.md). The following steps assume you'll use the `Home` page.

1. Go to `Pages` → `Management`

2. For the `Home` page `(folder icon)`, in the `Actions` column, click the `⋮` icon

3. Click `Edit`

4. In the `Settings` section, select a Page Template with more than one frame

5. Click `Save and Configure`

6. From the `WIDGETS` sidebar on the right, drag `Publisher Widget` and `Subscriber Widget` into `Frame 1` and `Frame 2`

7. Click `Publish`

8. To view the `Home` page, scroll up and click `Go to Homepage`

9. Enter a greeting in the input field and click the submit button

10. Confirm that the subscriber widget updates to display the greeting

::: tip Congratulations!
You can now communicate between micro frontends with `Custom Events`
:::


