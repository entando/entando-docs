---
sidebarDepth: 2
---

# Angular and React Communication

::: warning Prerequisites
Tutorial: [Communicate Between Micro Frontends](communication.md)
:::

::: warning Recommended Learning
Tutorial: [Create an Angular Micro Frontend](angular.md)
:::

Entando supports communication between different JavaScript frameworks using [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), an established web standard.

In this next example, we’ll create an Angular micro frontend to publish an event, and we'll use the React micro frontend we created in the previous tutorial to receive the event.

## Angular Publisher

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

### Convert to Custom Element

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

### Create Custom Event

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

### Add HTML Form

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

### View Micro Frontend

Open `angular-publisher-widget/src/index.html`.

In the `<body>`, replace `<app-root></app-root>` with your custom element `<angular-publisher-widget />`.

``` html
<body>
  <angular-publisher-widget />
</body>
```

You can check to see if your micro frontend is working in your browser (e.g., localhost:4200)

## Host Micro Frontend

Now we're ready to host our micro frontend in Entando.

### Build It

From the project root, type:

``` bash
ng build --prod --outputHashing=none
```

This will generate a `dist` directory.

### Create Public Folder

1. Navigate to `Entando App Builder` in your browser.

2. Click `Configuration` →  `File Browser`  → `public`.

3. Create a folder named `angular-publisher-widget`.

3. Click 'Upload Files`.

4. From your generated `dist` folder, upload:

- `main-es2015.js`
- `polyfills-es2015.js`
- `runtime-es2015.js`

### Add Widget

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

### View on Homepage

1. Click `Page Designer` → `Page Tree` at the top nav.

2. Next to the `Home` page `(folder icon)`, in the `Actions` column, click the `⋮` icon

3. In the Search field in right-hand sidebar, enter `Angular Publisher Widget`.

4. Drag and drop `Angular Publisher Widget` and `Subscriber Widget` into the `Sample Frame` in the main body of the page.

3. Click `Publish`.

4. In the top navigation, on the right, click `Go to Homepage`.

5. Enter a greeting in the input field. Press the submit button. The subscriber widget will update with the greeting. Done!

- Note: If you don't see an input field, refresh the page.

::: tip Congratulations!
You've now created an Angular micro frontend that can communicate with a React micro frontend.
:::
