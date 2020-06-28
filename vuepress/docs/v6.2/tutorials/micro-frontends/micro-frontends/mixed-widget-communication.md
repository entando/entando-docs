# Tutorial: using custom event for widget communication

Entando 6 widgets can communicate through [Custom
Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent),
an established web standard.

In this tutorial we’re going to build two widgets: the angular one will
fire an event, the react one will intercept it.

## Fire an event from a widget

`ng new pub-widget-ng`

then follow the same steps or our [previous
tutorial](./create-angular-microfrontend-widget)

This time we need to add some form and custom event firing logic

### app.module.ts

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
        customElements.define('pub-widget-ng', el);
      }
    }

### app.component.js

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

> **Note**
>
> in the `CustomEvent` constructor, `detail` is the exact name to use in
> the event payload, as for the
> [specs](https://dom.spec.whatwg.org/#interface-customevent).

### app.template.html

    <h1>Send a greeting</h1>
    <form [formGroup]="greetingForm" (ngSubmit)="onSubmit()">
      <label>
        Name
        <input type="text" formControlName="name">
      </label>
      <button type="submit">Say hello!</button>
    </form>

To quickly test the event publishing we can execute from the JS console
this line of code

    window.addEventListener('greeting', (evt) => console.log('Hello', evt.detail.name))

Then write something in the text field, click the "Say hello!" button
and have a look ath the JS console: it will show the expected hello
message.

## Consume an event in another widget

Now, let’s create the react subscriber widget.

`npx create-react-app sub-widget-react --use-npm`

then follow the same steps or our [previous
tutorial](./create-react-microfrontend-widget).

Be careful to

-   rename `WidgetElement.js` to `SubscriberWidgetElement.js`

-   edit `index.js`: now you should import `SubscriberWidgetElement`

-   edit `index.html` updating the reference to the custom element: now
    it’s `<sub-widget-react>`

-   edit `SubscriberWidgetElement.js` and `App.js`

### SubscriberWidgetElement.js

(we’re renaming `WidgetElement` to `SubscriberWidgetElement` and update
the import in `index.js` accordingly)

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

    customElements.define('sub-widget-react', SubscriberWidgetElement);

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

And then the widget will update the text.

## Make both widgets work in Entando

To properly test widgets in an entando instance, follow those steps (you
can use the [basic microfrontend
tutorial](./create-react-microfrontend-widget) as reference)

-   build both widgets

-   copy widget files

-   create widgets from App Builder

-   create a page model from App Builder

-   create a page and assign the just created page model

-   configure the page dragging both widget

If you need a simple page model, you can use this one

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

