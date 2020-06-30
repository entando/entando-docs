# Tutorial: create a react micro frontend widget

## Prerequisites

Use last stable node version (at the time of writing **v13.8.0**). We
suggest using [nvm](https://github.com/nvm-sh/nvm) to handle node
installations.

## Bootstrap a react app

In this tutorial we use [Create React
App](https://create-react-app.dev/), but feel free to adopt whatever
boilerplate you like.

`npx create-react-app my-widget --use-npm`

This is the expected output:

    my-widget
    ├── README.md
    ├── node_modules
    ├── package.json
    ├── .gitignore
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── serviceWorker.js
        └── setupTests.js

Now, type `cd my-widget` and `npm start` to start the app.

## Wrap the react app in a custom element

Let’s add a new file `WidgetElement.js`, containing the custom element
that will wrap the entire React app under the `src` folder.

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    class WidgetElement extends HTMLElement {
      connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        ReactDOM.render(<App />, this.mountPoint);
      }
    }

    customElements.define('my-widget', WidgetElement);

    export default WidgetElement;

> **Note**
>
> `connectedCallback` is a lifecycle hook method of custom elements,
> part of the web components spec.

Then, the `index.js` file should be updated. Starting from this:

    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';

    ReactDOM.render(<App />, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();

replace the whole file with these two lines

    import './index.css';
    import './WidgetElement';

You only have to import `WidgetElement` plus the css, if needed.

We assume we don’t need a service worker for the widget, so we can
delete serviceWorker.js.

Now, to ensure our custom element is working we have to edit
`public/index.html`. Remove `<div id="root"></div>` from the `body` (we
programmatically generated the react root in the `connectedCallback`
method of `WidgetElement`) and add our custom element `<my-widget />`.

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>React App</title>
      </head>
      <body>
        <my-widget />
      </body>
    </html>

> **Note**
>
> -   the custom element name (`my-widget` in this tutorial) *must*
>     match the first parameter of `customElements.define` method
>
> -   custom element names [require a dash to be used in
>     them](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name)
>     (kebab-case) - they can’t be single words.
>
Page should auto reload and…​ congrats! You’re running a barebones
Entando 6 widget in isolation.

## Build the widget

In order to avoid path issues, we should set up a one line `.env` file
in the CRA project root:

    PUBLIC_URL=http://localhost:8080/entando/resources/static/my-widget

Where `` is the path of the Entando 6 instance containing the widget.

Ready to build now! From the react project root, type

`npm run build`

and a `build` dir will be generated. Now rename

-   a file like `static/js/runtime~main.c7dcdf0b.js` to
    `static/js/runtime.js` (bootstrapping logic)

-   a file like `static/js/2.230b21ef.chunk.js` to `static/js/vendor.js`
    (third-party libraries)

-   a file like `static/js/main.1fd3965a.chunk.js` to
    `static/js/main.js` (app)

-   a file like `static/css/main.d1b05096.chunk.js` to
    `static/css/main.css` (stylesheet)

> **Note**
>
> you could keep the original names in order to avoid potential caching
> issues, but then you will have to update the *Custom UI* field in the
> App Builder widget screen every time a new version of the widget is
> deployed. DE bundles can help with this and are covered in another
> lab.

## Create the Entando 6 widget in App Builder

For the purposes of this tutorial we are going to load the widget to the
App builder manually. In a live system you would include this in an
Entando app, load via API, or via a Component Repository bundle.

Open the Entando App Builder

1.  Go to Configuration → File Browser

2.  Click public

3.  Click Create Folder

4.  Enter `my-widget`

5.  Click save

6.  Click `my-widget` folder

7.  Recreate the same folder structure (my-widget/static/js,
    my-widget/static/css)

8.  Upload files from js and css folders in the corresponding folders in
    file browser

> **Note**
>
> You can also embed the widget directly in a local copy of an Entando
> app. Copy it into the Entando 6 instance under
> `src\main\webapp\resources\my-widget`

Now create the widget in the App Builder

go to UX Patterns → Widgets and click on the *New* button.

You’ll see a screen like this one

![New widget screen](./new-widget-screen.png)

Fill the form, e.g.:

-   *my\_widget* as widget code (dashes are not allowed in a widget
    code)

-   *My Widget* as title for all the languages

-   *Free access* as group

-   the following code as *Custom UI*

<!-- -->

    <#assign wp=JspTaglibs[ "/aps-core"]>
    <link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.css">
    <script async src="<@wp.resourceURL />my-widget/static/js/runtime.js"></script>
    <script async src="<@wp.resourceURL />my-widget/static/js/vendor.js"></script>
    <script async src="<@wp.resourceURL />my-widget/static/js/main.js"></script>
    <my-widget />

Update the paths to match what you loaded to the app builder in the
steps above. And save the widget.

> **Note**
>
> `<#assign wp=JspTaglibs[ "/aps-core"]>` is needed for your widget code
> to have access to `@wp` object which provides access to environment
> variables.

Then, configure a page (let’s assume it’s called *mypage*) and drag the
widget *mywidget* in the page model. Publish, load the page (its url
should be ``) and *voilà*, here’s our react app embedded as a widget.
Done!

