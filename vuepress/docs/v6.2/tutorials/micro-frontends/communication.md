---
sidebarDepth: 2
---

# Communicate Between Micro Frontends

::: warning Recommended Learning
- Tutorial: [Create a React Micro Frontend](react.md)
- Tutorial: [Create an Angular Micro Frontend](angular.md)
:::

Entando supports communication between micro frontends using [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), an established web standard. In this tutorial, we'll build:

- A React micro frontend that publishes an event
- A React micro frontend that listens to an event
- An Angular micro frontend that publishes an event to a React micro frontend

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

#### Import Custom Element

Update `publisher-widget/src/index.js`.

``` js
import './index.css';
import './PublisherWidgetElement';
```

#### Test Custom Element

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

#### Import Custom Element

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

Now let's add the publisher and subscriber micro frontends in Entando.

> Note: These are the same steps as the `Create a React Micro Frontend` tutorial.

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

### Add Page Template

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

- `Page Template: Two Widget`

5. Click `Save and Configure`.

6. In the `WIDGETS` sidebar on the right:

- Drag `Publisher Widget` and `Subscriber Widget` into `Sample Frame` and `Sample Frame Two`.

7. Click `Publish`.

8. To view the home page, scroll to the top of the page, and click `Go to Homepage`.

9. Enter a greeting in the input field. Press the submit button. The subscriber widget will update with the greeting. Done!

::: tip Congratulations!
You can now communicate between micro frontends with `Custom Events`.
:::

## Angular to React

We can also communicate between micro frontends using different JavaScript frameworks.

In this next example, we’ll create an Angular micro frontend to publish an event, and we'll use the React micro frontend we created in the previous section to receive the event.

### Create Angular Publisher

``` bash
ng new angular-publisher-widget
```

Choose the following options:

``` bash
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
```

Serve the application.

``` bash
cd angular-publisher-widget
```

``` bash
ng serve
```

#### Convert to Custom Element

Next, let's convert our Angular app into a custom element. We'll use [Angular elements](https://angular.io/guide/elements) to transform components into custom elements.

``` bash
ng add @angular/elements
```

Replace the contents of `angular-widget/src/app/app.module.ts`.

- In this file, we bootstrap the custom element using the `ngDoBootstrap` method.

``` js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('angular-publisher-widget', el);
  }
}
```

#### Create Custom Event

Replace the contents of `angular-widget/src/app/app.component.ts`.

- Here, we're adding code to dispatch the custom event.

``` js
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

const EVENTS = {
  greeting: 'greeting',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  greetingForm = new FormGroup({
    name: new FormControl(''),
  });

  publishWidgetEvent(eventId, detail) {
    const widgetEvent = new CustomEvent(eventId, { detail });
    window.dispatchEvent(widgetEvent);
  }

  onSubmit() {
    const name = this.greetingForm.get('name').value;
    this.publishWidgetEvent(EVENTS.greeting, { name });
  }
}
```

#### Add HTML Form

Replace the contents of `angular-widget/src/app/app.component.html`.

- In the app component html, we're adding a simple form to call our component class `app.component.ts`.

``` html
<h1>Send a greeting</h1>
<form [formGroup]="greetingForm" (ngSubmit)="onSubmit()">
  <label>
    Name
    <input type="text" formControlName="name">
  </label>
  <button type="submit">Say hello!</button>
</form>
```

#### View Micro Frontend

Open `angular-publisher-widget/src/index.html`.

In the `<body>`, replace `<app-root></app-root>` with your custom element `<angular-publisher-widget />`.

``` html
<body>
  <angular-publisher-widget />
</body>
```

You can check to see if your micro frontend is working in your browser (e.g., localhost:4200)

### Add to App Builder

Now we're ready to host our micro frontend in Entando.

#### Build It

From the project root, type:

``` bash
ng build --prod --outputHashing=none
```

This will generate a `dist` directory.

#### Create Public Folder

1. Navigate to `Entando App Builder` in your browser.

2. Click `Configuration` →  `File Browser`  → `public`.

3. Create a folder named `angular-publisher-widget`.

3. Click 'Upload Files`.

4. From your generated `dist` folder, upload:

- `main-es2015.js`
- `polyfills-es2015.js`
- `runtime-es2015.js`

#### Add Widget

1. Click `UX Patterns` → `Widgets` at the top nav.

2. Click `Add` at the upper right.

3. Enter the following:

- `Title: Angular Publisher Widget` → for both English and Italian languages
- `Code: angular_publisher_widget` → note: dashes are not allowed
- `Group: Free Access`
- `Custom UI:`

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<script async src="<@wp.resourceURL />angular-widget/main-es2015.js"></script>
<script async src="<@wp.resourceURL />angular-widget/polyfills-es2015.js"></script>
<script async src="<@wp.resourceURL />angular-widget/runtime-es2015.js"></script>

<angular-publisher-widget />
```

4. Click `Save`.

#### View on Homepage

1. Click `Page Designer` → `Page Tree` at the top nav.

2. Next to the `Home` page `(folder icon)`, in the `Actions` column, click the `⋮` icon

3. In the Search field in right-hand sidebar, enter `Angular Publisher Widget`.

4. Drag and drop `Angular Publisher Widget` into the `Sample Frame` in the main body of the page.

> Replace `Publisher Widget`.

3. Click `Publish`.

4. In the top navigation, on the right, click `Go to Homepage`.

5. Enter a greeting in the input field. Press the submit button. The subscriber widget will update with the greeting. Done!

- Note: If you don't see an input field, refresh the page.

::: tip Congratulations!
You've now created an Angular micro frontend that can communicate with a React micro frontend.
:::
