---
sidebarDepth: 2
---

# Create a React Micro Frontend

::: warning Tested Versions
node v13.8.0
- Note: We suggest using [nvm](https://github.com/nvm-sh/nvm) to handle node installations.
:::

## Create React App

We'll use [Create React App](https://create-react-app.dev/) to create a simple app in seconds.

``` bash
npx create-react-app my-widget --use-npm
```

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

Start the app.

``` bash
cd my-widget
npm start
```

## Custom Element

Add a new file `src/WidgetElement.js` with the custom element that will wrap the entire React app.

``` js
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
```

- `connectedCallback` is a lifecycle hook method of Custom Elements, which is part of the Web Components specification.
- The React `root` is programatically generated in the `connectedCallback` method of `WidgetElement`.

::: warning Note
[Custom Elements](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name):
- Must contain a hyphen `-` in the name.
- Cannot be a single word.
- Should follow `kebab-case` for naming convention.
:::

### Import Custom Element

Open `src/index.js`.

``` js
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
```

Replace the entire file with these two lines.

``` js
import './index.css';
import './WidgetElement';
```

- Note: We won’t need a service worker so we can delete `serviceWorker.js`.

### Test Micro Frontend

1. Open `public/index.html`.

2. Replace `<div id="root"></div>` with the custom element `<my-widget />`.

``` html
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <my-widget />
    ...
  </body>
```

::: tip Congratulations!
The page should auto reload, and you’re now running a containerized micro frontend.
:::

## Host Micro Frontend

Host the React micro frontend in Entando, and display it on a page with a custom widget.

### Add Widget

1. Navigate to `Entando App Builder`.

1. Click `UX Patterns` → `Widgets`.

2. Click `Add`.

![New widget screen](./new-widget-screen.png)

3. Complete the form.

`Title: My Widget` → for both English and Italian languages

`Code: my_widget` → note: dashes are not allowed

`Group: Free Access`

`Custom UI:`

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.css">
<script async src="<@wp.resourceURL />my-widget/static/js/runtime.js"></script>
<script async src="<@wp.resourceURL />my-widget/static/js/vendor.js"></script>
<script async src="<@wp.resourceURL />my-widget/static/js/main.js"></script>
<my-widget />
```

4. Click `Save`.

::: warning Note
`<#assign wp=JspTaglibs[ "/aps-core"]>` is needed for your widget to have access to the `@wp` object which provides access to environment variables.
:::

::: warning Deployment Options
In a live system, you can:
1. Include the micro frontend in the Entando app
2. Load the micro frontend using API
3. Install the micro frontend from a bundle in the `Entando Component Repository`.
:::

## Build Project

1. Create an `.env` file in the project root `/my-widget` that points to your App Builder instance.

Example:

```
PUBLIC_URL=http://quickstart-entando.192.168.64.34.nip.io/entando-de-app/cmsresources/my-widget
```

2. Replace `quickstart-entando.192.168.64.34.nip.io/app-builder` with the URL for your Entando App Builder instance.

- [*Click here to find your Entando App Builder URL.*](../../getting-started/#log-in-to-entando)

::: warning Notes
1. The `Create React App` project will be built assuming it's hosted at `PUBLIC_URL`.
2. /entando/resources/static/**my-widget** is a public folder that we'll create in Entando App Builder in the next steps.
3. After creating the public folder in Entando App Builder, we'll be able to reference it via the URL **.../entando/resources/static/**.
:::

### npm build

Open a command line, and navigate to the project root `my-widget`:

``` bash
npm run build
```

In the generated `build` directory, rename:

- build/static/js/2.********.chunk.js to `static/js/vendor.js` (third-party libraries)
- build/static/js/runtime-main.********.js to `static/js/runtime.js` (bootstrapping logic)
- build/static/js/main.********.chunk.js to `static/js/main.js` (app)
- build/static/css/main.********.chunk.css to `static/css/main.css` (stylesheet)

::: warning Note
We rename the JavaScript and CSS files so we can deploy new versions of the micro frontend without having to update the configuration in App Builder.
:::

- *If you'd like to keep the original file names to avoid potential caching issues, you can update the `Custom UI` field in App Builder when you deploy a new version of your micro frontend. (See: [Add Widget in Entando](#add-widget-in-entando))*
- *Entando bundles help streamline this process and are covered in the Entando Component Repository tutorial.*

### Create Public Folder

1. Navigate to App Builder in your browser.

2. Click `Configuration` at the upper right hand side of the screen

3. Click the `File Browser` tab

2. Click the `public` folder

3. Click `Create Folder`

4. Enter `my-widget`

5. Click `Save`

6. Click `public` → `my-widget`

7. Create the same folder structure as your generated build directory

- `my-widget/static/css`
- `my-widget/static/js`

8. Upload the files we renamed in the corresponding `js` and `css` folders.

- `my-widget/static/css/main.css`
- `my-widget/static/js/main.js`
- `my-widget/static/js/runtime.js`
- `my-widget/static/js/vendor.js`

Note: You can drag and drop the files in your browser.

::: warning Deployment
You can also embed the widget directly in a local copy of an Entando app under `src\main\webapp\resources\my-widget`.
:::

### Add Widget

1. Click `UX Patterns` → `Widgets`.

2. Click `Add`.

![New widget screen](./new-widget-screen.png)

3. Complete the form.

`Title: My Widget` → for both English and Italian languages

`Code: my_widget` → note: dashes are not allowed

`Group: Free Access`

`Custom UI:`

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.css">
<script async src="<@wp.resourceURL />my-widget/static/js/runtime.js"></script>
<script async src="<@wp.resourceURL />my-widget/static/js/vendor.js"></script>
<script async src="<@wp.resourceURL />my-widget/static/js/main.js"></script>
<my-widget />
```

4. Click `Save`.

::: warning Note
`<#assign wp=JspTaglibs[ "/aps-core"]>` is needed for your widget to have access to the `@wp` object which provides access to environment variables.
:::

### Add to Home Page

Then, configure a page (let’s assume it’s called *mypage*) and drag the widget *mywidget* in the page model. Publish, load the page (its url should be ``) and *voilà*, here’s our react app embedded as a widget. Done!
