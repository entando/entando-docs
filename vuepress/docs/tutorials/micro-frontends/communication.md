---
sidebarDepth: 2
---

::: warning Recommended Learning Path
1. [Create a React Micro Frontend](react)
:::

# Communicate Between Micro Frontends

Entando supports communication between micro frontends using [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), an established web standard.

In this tutorial, we’ll build two micro frontends.
- The first one will fire an event.
- The second one will intercept it.

## Publisher

Create a simple app to publish an event.

``` bash
npx create-react-app publisher-widget --use-npm
```

Start the app.

``` bash
cd publisher-widget
```

``` bash
npm start
```

Enter "Y" to run the subscriber-widget on another port.

```
? Something is already running on port 3000. Probably:
  publisher-widget (pid 16968)
  in /Users/ed/dev/publisher-widget

Would you like to run the app on another port instead? (Y/n) 
```

### Create Custom Event

Next, add event firing logic.

Add a new file `publisher-widget/src/PublisherWidgetElement.js`.

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

- In the `CustomEvent` constructor, `detail` is the specific name to use in the event payload, as per the [DOM specification](https://dom.spec.whatwg.org/#interface-customevent).

### Import Custom Element

Update `publisher-widget/src/index.js`.

``` js
import './index.css';
import './PublisherWidgetElement';
```

### Test Custom Element

Update `publisher-widget/public/index.html`, and view it in the browser.

``` html
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <publisher-widget />
    ...
  </body>
```

### Update React App to Dispatch Event

Update `publisher-widget/src/App.js`.

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

### Test Event Dispatcher

In the JavaScript console of your browser, enter:

``` js
window.addEventListener('greeting', (evt) => console.log('Hello', evt.detail.name))
```

Write something in the text field. Click the "Say hello!" button and take a look at the JS console. It will show the event message.

::: tip Congratulations!
You’ve now published a custom event.
:::

## Subscriber

Next, let’s create the subscriber.

``` bash
npx create-react-app subscriber-widget --use-npm
```

Start the app.

``` bash
cd subscriber-widget
```

``` bash
npm start
```

### Add Event Listener

Add a new file `subscriber-widget/src/SubscriberWidgetElement.js`.

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

### Import Custom Element

Update `subscriber-widget/src/index.js`.

``` js
import './index.css';
import './SubscriberWidgetElement';
```

#### Test Micro Frontend

Update `subscriber-widget/public/index.html`, and view it in the browser.

``` html
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <subscriber-widget>
    ...
  </body>
```

### Display Custom Event

Update `subscriber-widget/src/App.js`.

``` js
import React from 'react';
import './App.css';

function App({ name }) {
  return name ? (<h2>Just got a greeting from {name}</h2>)
    : (<h2>Waiting for a greeting...</h2>);
}

export default App;
```

### Test Event Listener

In the JavaScript console of your browser, enter:

``` js
const widgetEvent = new CustomEvent('greeting', {
  detail: {
    name: 'Pippo'
  },
});
window.dispatchEvent(widgetEvent);
```

The custom event should now display in the `subscriber-widget`.

::: tip Congratulations!
You’ve now created a micro frontend that listens to custom events.
:::

## Add Widgets to App Builder

Now let's test the publisher and subscriber micro frontends in Entando.

> Note: These are the same step as the `Create a React Micro Frontend` tutorial.

### Create Environment File

#### Publisher Widget

1. Create an `.env` file in the project root for the `publisher-widget`.

2. Open the `.env` file, and enter the `PUBLIC_URL` where the micro frontend will be hosted.

Example:

```
PUBLIC_URL=http://quickstart-entando.192.168.64.34.nip.io/entando-de-app/cmsresources/publisher-widget
```

::: warning Notes
- Replace `quickstart-entando.192.168.64.34.nip.io` with the ingress you use to access Entando from your local browser.
- `/entando-de-app/cmsresources/` is your Resource URL.
- `publisher-widget` is the public folder we'll create to host the publisher micro frontend.
:::

#### Subscriber Widget

1.  Create an `.env` file in the project root for the `subscriber-widget`.

2.  Open the `.env` file, and enter the `PUBLIC_URL` where the micro frontend will be hosted.

- Use `subscriber-widget` for the name of the public folder we'll create to host the subscriber micro frontend.

Example:

```
PUBLIC_URL=http://quickstart-entando.192.168.64.34.nip.io/entando-de-app/cmsresources/subscriber-widget
```

### Run npm build

#### Publisher Widget

1. Open a command line, and navigate to the project root of the `publisher-widget`.

2. Run build.

``` bash
npm run build
```

3. Rename the following generated files in the `build` directory.

| Example of Generated Build File           | Rename to                 | Function
| :---                                      | :---                      | :---
| build/static/js/2.f14073bd.chunk.js       | `static/js/vendor.js`     | Third-party libraries
| build/static/js/runtime-main.8a835b7b.js  | `static/js/runtime.js`    | Bootstrapping logic
| build/static/js/main.4a514a6d.chunk.js    | `static/js/main.js`       | App
| build/static/css/main.5f361e03.chunk.css  | `static/css/main.css`     | Stylesheet

#### Subscriber Widget

- Repeat steps 1-3 for the `subscriber-widget`.

### Create Public Folder

#### Publisher Widget

1. Navigate to `Entando App Builder` in your browser.

2. Click `Configuration` at the upper right hand side of the screen.

3. Click the `File Browser` tab.

4. Click the `public` folder.

5. Click `Create Folder`.

6. Enter `publisher-widget`.

7. Click `Save`.

8. Click `public` → `publisher-widget`.

9. Create the same folder structure as your generated build directory

- `publisher-widget/static/css`
- `publisher-widget/static/js`

10. Upload the files we renamed in the corresponding `js` and `css` folders.

- `publisher-widget/static/css/main.css`
- `publisher-widget/static/js/main.js`
- `publisher-widget/static/js/runtime.js`
- `publisher-widget/static/js/vendor.js`

#### Subscriber Widget

- Repeat steps 1-10 for the `subscriber-widget`.

### Add Widgets

#### Publisher Widget

1. Go to `Entando App Builder` in your browser.

2. Click `UX Patterns` → `Widgets` at the top nav.

3. Click `Add` at the upper right.

4. Enter the following:

- `Title: Publisher Widget` → for both English and Italian languages
- `Code: publisher_widget` → note: dashes are not allowed
- `Group: Free Access`
- `Custom UI:`

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />publisher-widget/static/css/main.css">
<script async src="<@wp.resourceURL />publisher-widget/static/js/runtime.js"></script>
<script async src="<@wp.resourceURL />publisher-widget/static/js/vendor.js"></script>
<script async src="<@wp.resourceURL />publisher-widget/static/js/main.js"></script>
<publisher-widget />
```

5. Click `Save`.

#### Subscriber Widget

Repeat steps 1-5 for the subscriber widget.

- `Title: Subscriber Widget` → for both English and Italian languages
- `Code: subscriber_widget` → note: dashes are not allowed
- `Group: Free Access`
- `Custom UI:`

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />subscriber-widget/static/css/main.css">
<script async src="<@wp.resourceURL />subscriber-widget/static/js/runtime.js"></script>
<script async src="<@wp.resourceURL />subscriber-widget/static/js/vendor.js"></script>
<script async src="<@wp.resourceURL />subscriber-widget/static/js/main.js"></script>
<subscriber-widget />
```

### Add Page Model

1. Click `UX Patterns` → `Page Templates` → `Add`.

2. Enter the following:

- `Code: two_widget` → note: dashes are not allowed
- `Name: Two Widget`
- `JSON Configuration:`

``` json
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
```

- `Template:`

``` ftl
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
```

2. Click `Save`.

### View on Homepage

1. Click `Page Designer` → `Page Tree`.

2. For the `Home` page `(folder icon)`, in the `Actions` column, click the `⋮` icon

3. Click `Edit`.

4. In the `Settings` section, select:

- `Page Model: Two Widget`

5. Click `Save and Configure`.

6. In the `WIDGETS` sidebar on the right:

- Drag `Publisher Widget` and `Subscriber Widget` into `Sample Frame` and `Sample Frame Two`.

7. Click `Publish`.

8. To view the home page, scroll to the top of the page, and click `Go to Homepage`.

9. Enter a greeting in the input field. Press the submit button. And the subscriber widget will update with the greeting. Done!

::: tip Congratulations!
You can now communicate between micro frontends with `Custom Events`.
:::