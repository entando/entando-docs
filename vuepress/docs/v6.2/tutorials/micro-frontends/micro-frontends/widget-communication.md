# Tutorial: Using a custom event for widget communication

Entando 6 widgets can communicate through [Custom
Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent),
an established web standard.

In this tutorial we’re going to build two widgets: the first one will
fire an event, the second one will intercept it.

## Fire an event from a widget

`npx create-react-app publisher-widget --use-npm`

then follow the same steps from our [previous
tutorial](create-react-microfrontend-widget).

Be careful to:

-   rename `WidgetElement.js` to `PublisherWidgetElement.js`

-   edit `index.js`: now you should import `PublisherWidgetElement`

-   edit `index.html` updating the reference to the custom element: now
    it’s `<publisher-widget>`

-   edit `PublisherWidgetElement.js` and `App.js`

We need to add some event firing logic

### PublisherWidgetElement.js

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

> **Note**
>
> in the `CustomEvent` constructor, `detail` is the specific name to use
> in the event payload, as for the
> [specs](https://dom.spec.whatwg.org/#interface-customevent).

### App.js

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

To quickly test the event publishing we can execute from the JS console
this line of code

    window.addEventListener('greeting', (evt) => console.log('Hello', evt.detail.name))

then write something in the text field, click the "Say hello!" button
and have a look at the JS console, it will show the expected hello
message.

## Consume an event in another widget

Now, let’s create the subscriber widget.

`npx create-react-app subscriber-widget --use-npm`

then follow the same steps from our [previous
tutorial](create-react-microfrontend-widget).

Be careful to

-   rename `WidgetElement.js` to `SubscriberWidgetElement.js`

-   edit `index.js`: now you should import `SubscriberWidgetElement`

-   edit `index.html` updating the reference to the custom element: now
    it’s `<subscriber-widget>`

-   edit `SubscriberWidgetElement.js` and `App.js`

### SubscriberWidgetElement.js

(Rename `WidgetElement` to `SubscriberWidgetElement` and update the
import in `index.js` accordingly)

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

### App.js

    import React from 'react';
    import './App.css';

    function App({ name }) {
      return name ? (<h2>Just got a greeting from {name}</h2>)
        : (<h2>Waiting for a greeting...</h2>);
    }

    export default App;

To quickly test the event publishing we can execute from the JS console
these lines of code

    const widgetEvent = new CustomEvent('greeting', {
      detail: {
        name: 'Pippo'
      },
    });
    window.dispatchEvent(widgetEvent);

and then the widget will update the text.

## Make both widgets work in Entando

To properly test widgets in an Entando instance, follow these steps (you
can use the [basic microfrontend
tutorial](create-react-microfrontend-widget) as reference)

-   build both widgets

-   copy widget files

-   create widgets from App Builder

-   create a page template from App Builder

-   create a page and assign the just created page template

-   configure the page dragging both widgets to the page

For a sample page template, use this one

**JSON Configuration**

    {
      "frames": [
        {
          "pos": 0,
          "descr": "Sample Frame",
          "mainFrame": false,
          "defaultWidget": null,
          "sketch": null
        },
        {
          "pos": 1,
          "descr": "Sample Frame Two",
          "mainFrame": false,
          "defaultWidget": null,
          "sketch": null
        }
      ]
    }

**Template**

    <#assign wp=JspTaglibs["/aps-core"]>
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html>
    <head>
        <title><@wp.currentPage param="title" /></title>
    </head>
    <body>
    <h1><@wp.currentPage param="title" /></h1>
    <div><@wp.show frame=0 /></div>
    <div><@wp.show frame=1 /></div>
    </body>
    </html>

Now, go to the page you just created and you will find both widgets.
Write something in the publisher widget input, press the button and the
subscriber widget will update. Done!

