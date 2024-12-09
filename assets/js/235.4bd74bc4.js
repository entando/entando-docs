(window.webpackJsonp=window.webpackJsonp||[]).push([[235],{1609:function(e,t,n){"use strict";n.r(t);var o=n(36),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"tutorial-create-an-angular-microfrontend-widget"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#tutorial-create-an-angular-microfrontend-widget"}},[e._v("#")]),e._v(" Tutorial: create an angular microfrontend widget")]),e._v(" "),o("h2",{attrs:{id:"pre-requisites"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pre-requisites"}},[e._v("#")]),e._v(" Pre-requisites")]),e._v(" "),o("p",[e._v("Use last stable node version (at the time of writing "),o("strong",[e._v("v13.8.0")]),e._v("). We\nsuggest using "),o("a",{attrs:{href:"https://github.com/nvm-sh/nvm",target:"_blank",rel:"noopener noreferrer"}},[e._v("nvm"),o("OutboundLink")],1),e._v(" to handle node\ninstallations.")]),e._v(" "),o("h2",{attrs:{id:"bootstrap-an-angular-app"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#bootstrap-an-angular-app"}},[e._v("#")]),e._v(" Bootstrap an angular app")]),e._v(" "),o("p",[e._v("Install Angular CLI globally, then generate a new angular application.\nWhen the CLI will ask you about routing and styling, go with no routing\nand with CSS.")]),e._v(" "),o("p",[o("code",[e._v("npm install -g @angular/cli")])]),e._v(" "),o("p",[o("code",[e._v("ng new my-widget")])]),e._v(" "),o("p",[e._v("This is the expected output:")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v("my-widget\n├── e2e\n│   └── src\n│       ├── app.e2e-spec.ts\n│       └── app.po.ts\n│\n├── node_modules\n├── src\n│   ├── app\n│   │   ├── app.component.css\n│   │   ├── app.component.html\n│   │   ├── app.component.spec.ts\n│   │   ├── app.component.ts\n│   │   └── app.module.ts\n│   │\n│   ├── assets\n│   │   └── .gitkeep\n│   │\n│   ├── environment\n│   │   ├── environment.prod.ts\n│   │   └── environment.ts\n│   │\n│   ├── favicon.ico\n│   ├── index.html\n│   ├── main.ts\n│   ├── polyfills.ts\n│   ├── styles.css\n│   └── test.ts\n│\n├── .editorconfig\n├── .gitignore\n├── angular.json\n├── browserlist\n├── karma.conf.js\n├── package.json\n├── README.md\n├── tsconfig.app.json\n├── tsconfig.json\n├── tsconfig.spec.json\n└── tslint.json\n")])])]),o("h2",{attrs:{id:"wrap-the-angular-app-in-custom-element"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#wrap-the-angular-app-in-custom-element"}},[e._v("#")]),e._v(" Wrap the angular app in custom element")]),e._v(" "),o("p",[e._v("Easiest way is using "),o("strong",[e._v("angular elements")]),e._v(", the official angular custom\nelement solution.")]),e._v(" "),o("p",[o("code",[e._v("ng add @angular/elements")])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("p",[e._v("install the angular elements package through CLI ("),o("code",[e._v("ng add")]),e._v(") and not\nthrough "),o("code",[e._v("npm install")]),e._v(", as it does something more under the hood, like\nadding "),o("code",[e._v("document-register-element")]),e._v(" polyfill.")])]),e._v(" "),o("p",[e._v("Now, edit the "),o("code",[e._v("AppModule")]),e._v(" class, from")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v("import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule } from '@angular/core';\n\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule\n  ],\n  providers: [],\n  bootstrap: [AppComponent]\n})\nexport class AppModule { }\n")])])]),o("p",[e._v("to")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v("import { BrowserModule } from '@angular/platform-browser';\nimport { NgModule, Injector } from '@angular/core';\nimport { createCustomElement } from '@angular/elements';\nimport { AppComponent } from './app.component';\n\n@NgModule({\n  declarations: [\n    AppComponent\n  ],\n  imports: [\n    BrowserModule\n  ],\n  providers: [],\n  entryComponents: [AppComponent]\n})\nexport class AppModule {\n  constructor(private injector: Injector) {}\n\n  ngDoBootstrap() {\n    const el = createCustomElement(AppComponent, { injector: this.injector });\n    customElements.define('my-widget', el);\n  }\n}\n")])])]),o("p",[e._v("Please pay attention to "),o("code",[e._v("AppComponent")]),e._v(" in the module declaration: it’s\nno more in the "),o("code",[e._v("bootstrap")]),e._v(" property but in the "),o("code",[e._v("entryComponents")]),e._v(" one.")]),e._v(" "),o("p",[e._v("Now, to ensure our custom element is working fine we have to edit\n"),o("code",[e._v("index.html")]),e._v(". In the "),o("code",[e._v("body")]),e._v(", replace "),o("code",[e._v("<app-root></app-root>")]),e._v(" with\n"),o("code",[e._v("<my-widget />")]),e._v(".")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v('<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>MyWidget</title>\n  <base href="/">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <link rel="icon" type="image/x-icon" href="favicon.ico">\n</head>\n<body>\n  <my-widget />\n</body>\n</html>\n')])])]),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("ul",[o("li",[o("p",[e._v("the custom element name ("),o("code",[e._v("my-widget")]),e._v(" in this tutorial) "),o("em",[e._v("must")]),e._v("\nmatch the first parameter of "),o("code",[e._v("customElements.define")]),e._v(" method")])]),e._v(" "),o("li",[o("p",[e._v("custom element names "),o("a",{attrs:{href:"https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name",target:"_blank",rel:"noopener noreferrer"}},[e._v("require a dash to be used in\nthem"),o("OutboundLink")],1),e._v("\n(kebab-case) - they can’t be single words")])])])]),e._v(" "),o("p",[e._v("Page should auto reload and…​ congrats! You’re running a barebones\nEntando 6 widget in isolation.")]),e._v(" "),o("h2",{attrs:{id:"build-the-widget"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#build-the-widget"}},[e._v("#")]),e._v(" Build the widget")]),e._v(" "),o("p",[e._v("From the angular project root, type")]),e._v(" "),o("p",[o("code",[e._v("ng build --prod --output-hashing none")])]),e._v(" "),o("p",[e._v("and a "),o("code",[e._v("dist/my-widget")]),e._v(" dir will be generated. Assuming ES2015 is enough\nas minimum JS version, we can ignore ES5 stuff and pay only attention\nto:")]),e._v(" "),o("ul",[o("li",[o("p",[o("code",[e._v("main-es2015.js")])])]),e._v(" "),o("li",[o("p",[o("code",[e._v("polyfills-es2015.js")])])]),e._v(" "),o("li",[o("p",[o("code",[e._v("runtime-es2015.js")])])]),e._v(" "),o("li",[o("p",[o("code",[e._v("styles.css")])])])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("p",[e._v("omitting the "),o("code",[e._v("--output-hashing none")]),e._v(" options you could keep the\noriginal names in order to avoid potential caching issues, but then\nyou will have to update the "),o("em",[e._v("Custom UI")]),e._v(" field in the App Builder\nwidget screen every time a new version of the widget is deployed. DE\nbundles can help with this and are covered in another lab.")])]),e._v(" "),o("h2",{attrs:{id:"create-the-entando-6-widget-in-app-builder"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#create-the-entando-6-widget-in-app-builder"}},[e._v("#")]),e._v(" Create the Entando 6 widget in App Builder")]),e._v(" "),o("p",[e._v("For the purposes of this tutorial we are going to load the widget to the\nApp builder manually. In a live system you would include this in an\nEntando app, load via API, or via a Digital Exchange bundle.")]),e._v(" "),o("p",[e._v("Open the Entando App Builder.")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("Go to Configuration → File Browser")])]),e._v(" "),o("li",[o("p",[e._v("Click public")])]),e._v(" "),o("li",[o("p",[e._v("Click Create Folder")])]),e._v(" "),o("li",[o("p",[e._v("Enter "),o("code",[e._v("my-widget")])])]),e._v(" "),o("li",[o("p",[e._v("Click save")])]),e._v(" "),o("li",[o("p",[e._v("Click "),o("code",[e._v("my-widget")]),e._v(" folder")])]),e._v(" "),o("li",[o("p",[e._v("Click upload and load the js (main, polyfills and runtime) and css\nfor your widget")])])]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("p",[e._v("You can also embed the widget directly in a local copy of an Entando\napp. Copy it into the Entando 6 instance under\n"),o("code",[e._v("src\\main\\webapp\\resources\\my-widget")])])]),e._v(" "),o("p",[e._v("Now create the widget in the App Builder. go to UX Patterns → Widgets\nand click on the "),o("em",[e._v("New")]),e._v(" button.")]),e._v(" "),o("p",[e._v("You’ll see a screen like this one")]),e._v(" "),o("p",[o("img",{attrs:{src:n(447),alt:"New widget screen"}})]),e._v(" "),o("p",[e._v("Fill the form, e.g.:")]),e._v(" "),o("ul",[o("li",[o("p",[o("em",[e._v("my_widget")]),e._v(" as widget code (dashes are not allowed in a widget\ncode)")])]),e._v(" "),o("li",[o("p",[o("em",[e._v("My Widget")]),e._v(" as title for all the languages")])]),e._v(" "),o("li",[o("p",[o("em",[e._v("Free access")]),e._v(" as group")])]),e._v(" "),o("li",[o("p",[e._v("the following code as "),o("em",[e._v("Custom UI")])])])]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v('<#assign wp=JspTaglibs[ "/aps-core"]>\n<link rel="stylesheet" type="text/css" href="<@wp.resourceURL />my-widget/styles.css">\n<script async src="<@wp.resourceURL />my-widget/main-es2015.js"><\/script>\n<script async src="<@wp.resourceURL />my-widget/polyfills-es2015.js"><\/script>\n<script async src="<@wp.resourceURL />my-widget/runtime-es2015.js"><\/script>\n\n<my-widget />\n')])])]),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("p",[e._v("let’s assume we don’t need ES5 polyfills that angular generated with\nthe build.")])]),e._v(" "),o("p",[e._v("Update the paths to match what you loaded to the app builder in the\nsteps above. And save the widget.")]),e._v(" "),o("blockquote",[o("p",[o("strong",[e._v("Note")])]),e._v(" "),o("p",[o("code",[e._v('<#assign wp=JspTaglibs[ "/aps-core"]>')]),e._v(" is needed for your widget code\nto have access to "),o("code",[e._v("@wp")]),e._v(" object which provides access to a environment\nvariables.")])]),e._v(" "),o("p",[e._v("Then, configure a page (let’s assume it’s called "),o("em",[e._v("mypage")]),e._v(") and drag the\nwidget "),o("em",[e._v("mywidget")]),e._v(" in the page model. Publish, load the page (its url\nshould be ``) and "),o("em",[e._v("voilà")]),e._v(", here’s our angular app embedded as a widget.\nDone!")])])}),[],!1,null,null,null);t.default=a.exports},447:function(e,t,n){e.exports=n.p+"assets/img/new-widget-screen.983cd1f9.png"}}]);