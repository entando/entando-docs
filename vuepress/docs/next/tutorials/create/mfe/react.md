---
sidebarDepth: 2
---

# Create a React Micro Frontend

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Use the [Entando CLI](../../../docs/getting-started/entando-cli.md) to verify all dependencies are installed: 
```
ent check-env develop
```

## Create a React App
[Create React App](https://create-react-app.dev/) allows you to generate a simple app in seconds.

1. Create a React app: 
``` bash
npx create-react-app my-widget --use-npm
```
This tutorial updates the following files:

    my-widget
    ├── README.md
    ├── public
    │   └── index.html
    └── src
        ├── App.js
        └── index.js


2. Start the app:
``` bash
cd my-widget
npm start
```

The React app should open in your browser at `http://localhost:3000`.

### Configure the Custom Element

The steps below wrap the app component with an HTML custom element. The `connectedCallback` method renders the React app when the custom element is added to the DOM.

1. In `my-widget/src`, create a file named `WidgetElement.js` 

2. Add the following code to `WidgetElement.js`:

``` js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class WidgetElement extends HTMLElement {
    connectedCallback() {
        this.mountPoint = document.createElement('div');
        this.appendChild(this.mountPoint);
        const root = ReactDOM.createRoot(this.mountPoint);
        root.render(<App />);
    }
}

customElements.define('my-widget', WidgetElement);

export default WidgetElement;
```

::: tip Custom Element Names
- [Must contain a hyphen `-` in the name](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name)
- Cannot be a single word
- Should follow `kebab-case` naming convention
:::

### Display the Custom Element

1. Replace the entire contents of `src/index.js` with these two lines: 

``` js
import './index.css';
import './WidgetElement';
```

2. In `public/index.html`, replace `<div id="root"></div>` with this:

``` html
    <my-widget />
```

3. Observe your browser automatically redisplay the React app

::: tip Congratulations!
You’re now using a custom element to display a React app.
:::

## Display the Micro Frontend in Entando

### Build the React App

To deploy the custom element into Entando as a micro frontend, you must perform a production build of the React app.

1. In the `my-widget` directory, create an `.env.production` file that consists of one line:
``` text
PUBLIC_URL=/entando-de-app/cmsresources/my-widget
```

::: warning Notes
- `/entando-de-app/cmsresources/` is the Resource URL for your Entando Application, which matches nearly all development environments. Consult your Entando admin or use the following fragment to discover the Resource URL.
``` ftl 
  <#assign wp=JspTaglibs[ "/aps-core"]>
  <@wp.resourceURL />
``` 
- `/my-widget` is the public folder that hosts the JavaScript and CSS files for the React app
:::


2. Build the app:
``` bash
npm run build
```

### Upload the React files
To set up the micro frontend to use in Entando:

1. In your App Builder, go to `Administration` → `File browser` → `public`

2. Click `Create folder` and name it "my-widget" to match the `.env.production` path above

3. Click `Save`

4. Click `my-widget`

5. Create a folder structure similar to your generated build directory:

- `my-widget/static/css`
- `my-widget/static/js`
- `my-widget/static/media`

6. Upload the css, js, and logo files from the corresponding directories under `my-widget/build/static`, for example:

- `my-widget/build/static/css/main.073c9b0a.css`
- `my-widget/build/static/js/main.b9eb8fa4.js`
- `my-widget/build/static/media/logo.6ce2458023.svg`

> Note: The generated ID of each file name (e.g. '073c9b0a') may change after every build. These folders may also contain LICENSE.txt or .map files, but they are not applicable to this tutorial.
### Create the Widget

Add a widget for your MFE.

1. In your App Builder, go to `Components` → `MFE & Widgets` 

2. Click `Add` in the lower right corner

![New widget screen](./img/new-widget-screen.png)

3. Edit the fields below:
- `Title`: "My Widget" → enter this in both the English and Italian language fields
- `Code`: "my_widget" → dashes are not allowed
- `Group`: "Free Access"
- `Icon`: upload or select an icon of your choice
- In the center panel under `Custom UI`, enter the following. Make sure to use the actual file names from your build.

``` ftl
<#assign wp=JspTaglibs[ "/aps-core"]>
<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/static/css/main.073c9b0a.css">
<script async src="<@wp.resourceURL />my-widget/static/js/main.b9eb8fa4.js"></script>
<my-widget />
```

4. Click `Save`

### View the Widget

Place the React micro frontend onto a page to see it in action.

1. In the `Entando App Builder`, go to `Pages` → `Management` 

2. Choose an existing page (or [create a new one](../../compose/page-management.md#create-a-page)) and select `Design` from its Actions

3. Find your widget in the `Widgets` sidebar and drag it onto the page

4. Click `Publish`

3. Click on `View Published Page`

<img src="./img/react-micro-frontend.png" width="406.44" height="569.52">

::: tip Congratulations!
You now have a React micro frontend running in Entando.
:::