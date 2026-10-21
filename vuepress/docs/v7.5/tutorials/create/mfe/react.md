# Create a React Micro Frontend

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env base-develop`

## Create a React App in an Entando Bundle

### Create the Bundle Project

1. Initialize a new bundle project with the default files and folders:
   ``` sh
   ent bundle init simple-bundle
   ```

2. From the root bundle folder, add an MFE to the bundle project:
   ``` sh
   cd simple-bundle
   ent bundle mfe add simple-mfe
   ```
### Create a React App with Vite

[Vite](https://vite.dev/) generates a React app in seconds, and can build it into the single file a micro frontend needs.

1. Create a React app in `simple-bundle/microfrontends/`. Use the same name you gave the MFE, so the app fills the empty `simple-mfe` folder:
   ``` bash
   npm create vite@latest microfrontends/simple-mfe -- --template react
   ```

2. Install the dependencies:
   ``` bash
   cd microfrontends/simple-mfe
   npm install
   ```

3. In `package.json`, add a `start` script. `ent bundle run` starts a React micro frontend with `npm install && npm start`, and the Vite template only defines `dev`, so without it the command fails with `Missing script: "start"`:
   ``` json
   "scripts": {
     "start": "vite",
     "dev": "vite",
     "build": "vite build",
     "lint": "oxlint",
     "preview": "vite preview"
   }
   ```

   ::: tip Alternative
   To leave `package.json` as Vite generated it, override the command in the `simple-mfe` entry of `entando.json` instead. A `commands.run` value takes precedence over the default:
   ``` json
   "commands": {
     "run": "npm install && npm run dev"
   }
   ```
   :::

4. In the bundle's `entando.json`, add `buildFolder` to the `simple-mfe` entry:
   ``` json
   "buildFolder": "dist"
   ```

   ::: warning
   Unless told otherwise, the Entando CLI looks for the build output in `build/`, the folder Create React App used. Vite writes to `dist/`, so without this setting `ent bundle pack` fails: the Vite build succeeds, but the bundle image can't find `microfrontends/simple-mfe/build` and the CLI reports only `Docker build failed with exit code 1`.
   :::

5. From the root bundle folder, start the app:
   ``` bash
   ent bundle run simple-mfe
   ```
   The React app opens in your browser at `http://localhost:5173`.

### Configure the Custom Element

The steps below wrap the app component with an HTML custom element. The `connectedCallback` method renders the React app when the custom element is added to the DOM, and `disconnectedCallback` cleans it up when the element is removed.

1. In `simple-mfe/src`, create a directory named `custom-elements`

2. In `custom-elements`, create `WidgetElement.jsx` with this code:
   ``` jsx
   import { createRoot } from 'react-dom/client';
   import App from '../App';

   class WidgetElement extends HTMLElement {
       connectedCallback() {
           this.mountPoint = document.createElement('div');
           this.appendChild(this.mountPoint);
           this.root = createRoot(this.mountPoint);
           this.root.render(<App />);
       }

       disconnectedCallback() {
           this.root?.unmount();
       }
   }

   customElements.define('simple-mfe', WidgetElement);
   ```

   ::: tip Use `.jsx` for files that contain JSX
   Vite compiles JSX only in `.jsx` and `.tsx` files. Create React App also accepted JSX in `.js` files; Vite does not, and the build fails.
   :::

   ::: tip Custom Element Names

   - [Must contain a hyphen `-` in the name](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name)
   - Cannot be a single word
   - Should follow `kebab-case` naming convention
   :::

### Replace the Template App

The demo page in the Vite template is not suited to a micro frontend. Its stylesheet styles `body`, `h1`, `p` and other elements globally, so it would restyle the whole Entando page around your widget, and it loads icons from absolute paths such as `/icons.svg`, which don't exist once Entando serves the widget.

1. Replace the contents of `src/App.jsx`:
   ``` jsx
   import { useState } from 'react';
   import './App.css';

   function App() {
       const [count, setCount] = useState(0);

       return (
           <div className="simple-mfe">
               <h2>Hello from a React micro frontend</h2>
               <button type="button" onClick={() => setCount(count => count + 1)}>
                   Count is {count}
               </button>
           </div>
       );
   }

   export default App;
   ```

2. Replace the contents of `src/App.css`. Every rule is scoped under the widget's own class, so nothing leaks onto the page:
   ``` css
   .simple-mfe {
       padding: 16px;
       font-family: system-ui, sans-serif;
   }

   .simple-mfe button {
       padding: 6px 12px;
       cursor: pointer;
   }
   ```

### Display the Custom Element

1. Replace the entire contents of `src/main.jsx` with this single line:
   ``` js
   import './custom-elements/WidgetElement';
   ```
   `src/index.css` is deliberately no longer imported: its rules are global and would apply to the whole page.

2. In `index.html` — at the root of `simple-mfe`, not in `public/` — replace `<div id="root"></div>` with:
   ``` html
   <simple-mfe></simple-mfe>
   ```
   Custom elements always need an explicit closing tag in HTML: `<simple-mfe />` is read as an opening tag.

3. Observe your browser automatically redisplay the React app.

::: tip Congratulations!
You’re now using a custom element to display a React app.
:::

### Build a Single File for Entando

By default Vite builds a complete web application, with an `index.html` and content-hashed file names. Library mode produces one JavaScript file and one stylesheet with fixed names instead, which is what Entando loads for a micro frontend.

1. Replace the contents of `vite.config.js`:
   ``` js
   import react from '@vitejs/plugin-react'
   import { defineConfig } from 'vite'

   export default defineConfig({
     plugins: [react()],
     define: {
       'process.env.NODE_ENV': JSON.stringify('production'),
     },
     build: {
       lib: {
         entry: 'src/main.jsx',
         name: 'simple-mfe',
         formats: ['umd'],
         fileName: () => 'simple-mfe.js',
         cssFileName: 'simple-mfe',
       },
     },
   })
   ```

   ::: warning Keep the `define`
   In library mode Vite does not replace `process.env.NODE_ENV`, and React reads it. Without this line the bundle references `process`, which doesn't exist in the browser, and the widget fails with `process is not defined`. It also makes the bundle use React's production build, roughly a third of the size.
   :::

2. Build the micro frontend:
   ``` bash
   npm run build
   ```
   `dist/` now contains `simple-mfe.js` and `simple-mfe.css`.

### Optional: Serve Static Assets

Images and other files imported from `src/` — for example `import logo from './logo.svg'` — need no extra work: library mode inlines them into the bundle.

Files in `public/` are copied to `dist/` as they are. Don't reference them with an absolute path such as `/logo.svg`, because in Entando that resolves against the site root rather than your widget. Build the URL from the base path Entando publishes for the widget instead:

``` js
const basePath = window.entando?.widgets?.['simple-mfe']?.basePath ?? '';
const logoUrl = `${basePath.replace(/\/$/, '')}/logo.svg`;
```

For an EPC the base path is published under a different key; see [Create an Entando Platform Capability](epc.md).

## Display the React MFE in Entando

1. [Publish the bundle project](../pb/publish-project-bundle.md)

### View the Widget

Place the React micro frontend onto a page to see it in action.

1. In the `Entando App Builder`, go to `Pages` → `Management` 

2. Choose an existing page (or [create a new one](../../compose/page-management.md#create-a-page)) and select `Design` from its Actions

3. Find your widget in the `Widgets` sidebar and drag it onto the page

4. Click `Publish`

5. Click on `View Published Page`

::: tip Congratulations!
You now have a React micro frontend running in Entando!
:::

**Next Steps**
* [Add a Configuration MFE in App Builder](widget-configuration.md)
* [Create an Entando Platform Capability](epc.md) with your React bundle
