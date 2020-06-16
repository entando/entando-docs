---
sidebarDepth: 2
---

::: warning Prerequisites
- [A working instance of Entando.](/docs/getting-started)
:::

# Create an Angular Micro Frontend

::: warning Tested Versions
node v13.8.0 → We suggest using [nvm](https://github.com/nvm-sh/nvm) to handle node installations.
:::

## Create Angular App

Install Angular CLI.

``` bash
npm install -g @angular/cli
```

Generate a new angular application.

``` bash
ng new angular-widget
```

Choose the following options:

``` bash
? Would you like to add Angular routing? No
? Which stylesheet format would you like to use? CSS
```

Serve the application

``` bash
cd angular-widget
```

``` bash
ng serve
```

This is the expected output:

    angular-widget
    ├── e2e
    │   └── src
    │       ├── app.e2e-spec.ts
    │       └── app.po.ts
    │
    ├── node_modules
    ├── src
    │   ├── app
    │   │   ├── app.component.css
    │   │   ├── app.component.html
    │   │   ├── app.component.spec.ts
    │   │   ├── app.component.ts
    │   │   └── app.module.ts
    │   │
    │   ├── assets
    │   │   └── .gitkeep
    │   │
    │   ├── environment
    │   │   ├── environment.prod.ts
    │   │   └── environment.ts
    │   │
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── main.ts
    │   ├── polyfills.ts
    │   ├── styles.css
    │   └── test.ts
    │
    ├── .editorconfig
    ├── .gitignore
    ├── angular.json
    ├── browserlist
    ├── karma.conf.js
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.spec.json
    └── tslint.json

### Convert to Custom Element

Next, let's convert our Angular app into a custom element. We'll use [Angular elements](https://angular.io/guide/elements) to transform components into custom elements.

``` bash
ng add @angular/elements
```

::: warning
Install the Angular elements package using `ng add`, not with `npm install` as it runs additional steps behind the scenes like adding the `document-register-element` polyfill.
:::

::: tip
[Angular elements are Angular components packaged as custom elements (also called Web Components), a web standard for defining new HTML elements in a framework-agnostic way.](https://angular.io/guide/elements)
:::

Edit `angular-widget/src/app/app.component.ts`. Here's what the initial file looks like:

``` js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Replace the entire file with this:

``` js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('angular-widget', el);
  }
}
```

Instead of bootstrapping `AppComponent` directly during application launch, [we imperatively booststrap our custom element with the module's `ngDoBootstrap()` method](https://angular.io/guide/entry-components).

::: warning Custom Elements
- [Must contain a hyphen `-` in the name.](https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name):
- Cannot be a single word.
- Should follow `kebab-case` for naming convention.
:::

### Test Micro Frontend

Now, let's check our custom element to see if it's working.

Open `angular-widget/src/index.html`.

In the `<body>`, replace `<app-root></app-root>` with your custom element `<angular-widget />`.

``` html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularWidget</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <angular-widget />
</body>
</html>
```

::: tip Congratulations!
You’re now running `Angular` in a containerized micro frontend.
:::

## Build It

From the project root, type:

``` bash
ng build --prod --output-hashing none
```

This will generate a `dist` directory. Assuming ES2015 as the minimum JavaScript version, we can focus on:
to:

- `main-es2015.js`
- `polyfills-es2015.js`
- `runtime-es2015.js`
- `styles.css`

::: warning Generated Build Files
`--output-hashing none` generates files without so we can deploy new versions of the micro frontend without having to update the `Custom UI` field of our widget to reference the new files.
:::

> **Note**
>
> omitting the `--output-hashing none` options you could keep the
> original names in order to avoid potential caching issues, but then
> you will have to update the *Custom UI* field in the App Builder
> widget screen every time a new version of the widget is deployed. DE
> bundles can help with this and are covered in another lab.

## Add Widget in App Builder

For the purposes of this tutorial we are going to load the widget to the
App builder manually. In a live system you would include this in an
Entando app, load via API, or via a Digital Exchange bundle.

Open the Entando App Builder.

1.  Go to Configuration → File Browser

2.  Click public

3.  Click Create Folder

4.  Enter `angular-widget`

5.  Click save

6.  Click `angular-widget` folder

7.  Click upload and load the js (main, polyfills and runtime) and css
    for your widget

> **Note**
>
> You can also embed the widget directly in a local copy of an Entando
> app. Copy it into the Entando 6 instance under
> `src\main\webapp\resources\angular-widget`

Now create the widget in the App Builder. go to UX Patterns → Widgets
and click on the *New* button.

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
    <link rel="stylesheet" type="text/css" href="<@wp.resourceURL />angular-widget/styles.css">
    <script async src="<@wp.resourceURL />angular-widget/main-es2015.js"></script>
    <script async src="<@wp.resourceURL />angular-widget/polyfills-es2015.js"></script>
    <script async src="<@wp.resourceURL />angular-widget/runtime-es2015.js"></script>

    <angular-widget />

> **Note**
>
> let’s assume we don’t need ES5 polyfills that angular generated with
> the build.

Update the paths to match what you loaded to the app builder in the
steps above. And save the widget.

> **Note**
>
> `<#assign wp=JspTaglibs[ "/aps-core"]>` is needed for your widget code
> to have access to `@wp` object which provides access to a environment
> variables.

Then, configure a page (let’s assume it’s called *mypage*) and drag the
widget *mywidget* in the page model. Publish, load the page (its url
should be ``) and *voilà*, here’s our angular app embedded as a widget.
Done!

