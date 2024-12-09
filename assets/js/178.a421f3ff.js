(window.webpackJsonp=window.webpackJsonp||[]).push([[178],{1855:function(t,a,s){"use strict";s.r(a);var n=s(36),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"create-an-angular-micro-frontend"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-an-angular-micro-frontend"}},[t._v("#")]),t._v(" Create an Angular Micro Frontend")]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Prerequisites")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"../../docs/getting-started"}},[t._v("A working instance of Entando.")])])])]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Tested Versions")]),t._v(" "),n("p",[t._v("node v13.8.0 → We suggest using "),n("a",{attrs:{href:"https://github.com/nvm-sh/nvm",target:"_blank",rel:"noopener noreferrer"}},[t._v("nvm"),n("OutboundLink")],1),t._v(" to handle node installations.")])]),t._v(" "),n("h2",{attrs:{id:"create-angular-app"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-angular-app"}},[t._v("#")]),t._v(" Create Angular App")]),t._v(" "),n("p",[t._v("Install Angular CLI.")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" -g @angular/cli\n")])])]),n("p",[t._v("Generate a new angular application.")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ng new angular-widget\n")])])]),n("p",[t._v("Choose the following options:")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("? Would you like to "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" Angular routing? No\n? Which stylesheet "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("format")]),t._v(" would you like to use? CSS\n")])])]),n("p",[t._v("Serve the application.")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" angular-widget\n")])])]),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ng serve\n")])])]),n("p",[t._v("This is the expected output:")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[t._v("angular-widget\n├── e2e\n│   └── src\n│       ├── app.e2e-spec.ts\n│       └── app.po.ts\n│\n├── node_modules\n├── src\n│   ├── app\n│   │   ├── app.component.css\n│   │   ├── app.component.html\n│   │   ├── app.component.spec.ts\n│   │   ├── app.component.ts\n│   │   └── app.module.ts\n│   │\n│   ├── assets\n│   │   └── .gitkeep\n│   │\n│   ├── environment\n│   │   ├── environment.prod.ts\n│   │   └── environment.ts\n│   │\n│   ├── favicon.ico\n│   ├── index.html\n│   ├── main.ts\n│   ├── polyfills.ts\n│   ├── styles.css\n│   └── test.ts\n│\n├── .editorconfig\n├── .gitignore\n├── angular.json\n├── browserlist\n├── karma.conf.js\n├── package.json\n├── README.md\n├── tsconfig.app.json\n├── tsconfig.json\n├── tsconfig.spec.json\n└── tslint.json\n")])])]),n("h3",{attrs:{id:"convert-to-custom-element"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#convert-to-custom-element"}},[t._v("#")]),t._v(" Convert to Custom Element")]),t._v(" "),n("p",[t._v("Next, let's convert our Angular app into a custom element. We'll use "),n("a",{attrs:{href:"https://angular.io/guide/elements",target:"_blank",rel:"noopener noreferrer"}},[t._v("Angular elements"),n("OutboundLink")],1),t._v(" to transform components into custom elements.")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ng "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @angular/elements\n")])])]),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),n("p",[t._v("Install the Angular elements package using "),n("code",[t._v("ng add")]),t._v(", not with "),n("code",[t._v("npm install")]),t._v(" as it runs additional steps behind the scenes like adding the "),n("code",[t._v("document-register-element")]),t._v(" polyfill.")])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://angular.io/guide/elements",target:"_blank",rel:"noopener noreferrer"}},[t._v("Angular elements are Angular components packaged as custom elements (also called Web Components), a web standard for defining new HTML elements in a framework-agnostic way."),n("OutboundLink")],1)])]),t._v(" "),n("p",[t._v("Open "),n("code",[t._v("angular-widget/src/app/app.module.ts")]),t._v(".")]),t._v(" "),n("ul",[n("li",[t._v("Here's what the initial file looks like:")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" BrowserModule "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@angular/platform-browser'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" NgModule "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@angular/core'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" AppComponent "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./app.component'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n@"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NgModule")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("declarations")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    AppComponent\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("imports")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    BrowserModule\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("providers")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("bootstrap")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("AppComponent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppModule")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("Replace the entire file with:")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" BrowserModule "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@angular/platform-browser'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" NgModule"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Injector "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@angular/core'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createCustomElement "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@angular/elements'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" AppComponent "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./app.component'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n@"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("NgModule")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("declarations")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    AppComponent\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("imports")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    BrowserModule\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("providers")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("entryComponents")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("AppComponent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("AppModule")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("injector")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" Injector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ngDoBootstrap")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" el "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createCustomElement")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("AppComponent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("injector")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("injector "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    customElements"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'angular-widget'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" el"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",[n("li",[t._v("In the initial file, "),n("code",[t._v("AppModule")]),t._v(" is bootstrapped directly during application launch.")]),t._v(" "),n("li",[t._v("In the updated file, we booststrap our custom element using the "),n("a",{attrs:{href:"https://angular.io/guide/entry-components",target:"_blank",rel:"noopener noreferrer"}},[n("code",[t._v("ngDoBootstrap()")]),t._v(" method"),n("OutboundLink")],1),t._v(".")])]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Custom Elements")]),t._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name",target:"_blank",rel:"noopener noreferrer"}},[t._v("Must contain a hyphen "),n("code",[t._v("-")]),t._v(" in the name."),n("OutboundLink")],1),t._v(":")]),t._v(" "),n("li",[t._v("Cannot be a single word.")]),t._v(" "),n("li",[t._v("Should follow "),n("code",[t._v("kebab-case")]),t._v(" for naming convention.")])])]),t._v(" "),n("h3",{attrs:{id:"test-micro-frontend"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#test-micro-frontend"}},[t._v("#")]),t._v(" Test Micro Frontend")]),t._v(" "),n("p",[t._v("Now, let's check our custom element to see if it's working.")]),t._v(" "),n("p",[t._v("Open "),n("code",[t._v("angular-widget/src/index.html")]),t._v(".")]),t._v(" "),n("p",[t._v("In the "),n("code",[t._v("<body>")]),t._v(", replace "),n("code",[t._v("<app-root></app-root>")]),t._v(" with your custom element "),n("code",[t._v("<angular-widget />")]),t._v(".")]),t._v(" "),n("div",{staticClass:"language-html extra-class"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token doctype"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),n("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("doctype")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token name"}},[t._v("html")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("en"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("charset")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("utf-8"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("AngularWidget"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("base")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("meta")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("name")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("viewport"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("content")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("width=device-width, initial-scale=1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("icon"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("image/x-icon"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("favicon.ico"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("angular-widget")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("Congratulations!")]),t._v(" "),n("p",[t._v("You’re now running "),n("code",[t._v("Angular")]),t._v(" in a micro frontend.")])]),t._v(" "),n("h2",{attrs:{id:"build-it"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#build-it"}},[t._v("#")]),t._v(" Build It")]),t._v(" "),n("p",[t._v("From the project root, type:")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ng build --prod --outputHashing"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("none\n")])])]),n("p",[t._v("This will generate an "),n("code",[t._v("angular-widget/dist")]),t._v(" directory.")]),t._v(" "),n("p",[t._v("If we assume browser support for "),n("a",{attrs:{href:"https://www.w3schools.com/js/js_versions.asp",target:"_blank",rel:"noopener noreferrer"}},[t._v("ES6 (ECMAScript 2015)"),n("OutboundLink")],1),t._v(", we can focus on the following JavaScript files to publish our app:")]),t._v(" "),n("ul",[n("li",[n("code",[t._v("main-es2015.js")])]),t._v(" "),n("li",[n("code",[t._v("polyfills-es2015.js")])]),t._v(" "),n("li",[n("code",[t._v("runtime-es2015.js")])])]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Generated Build Files")]),t._v(" "),n("p",[n("code",[t._v("--outputHashing=none")]),t._v(" generates files without hashes so we can deploy new versions of the micro frontend without having to reconfigure our widget in Entando to point to the newly built files.")])]),t._v(" "),n("p",[t._v("If you want to use file names with content hashes to avoid potential caching issues in your browser, you can update the "),n("code",[t._v("Custom UI")]),t._v(" field of your widget after building new versions of your micro frontend. Widget configuration is covered in the next section.")]),t._v(" "),n("h2",{attrs:{id:"host-micro-frontend"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#host-micro-frontend"}},[t._v("#")]),t._v(" Host Micro Frontend")]),t._v(" "),n("p",[t._v("Now we're ready to host our micro frontend in Entando.")]),t._v(" "),n("h3",{attrs:{id:"create-public-folder"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-public-folder"}},[t._v("#")]),t._v(" Create Public Folder")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("Navigate to "),n("code",[t._v("Entando App Builder")]),t._v(" in your browser.")])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("Administration")]),t._v(" at the lower left hand side of the screen.")])]),t._v(" "),n("li",[n("p",[t._v("Click the "),n("code",[t._v("File Browser")]),t._v(" tab.")])]),t._v(" "),n("li",[n("p",[t._v("Click the "),n("code",[t._v("public")]),t._v(" folder.")])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("Create Folder")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Enter "),n("code",[t._v("angular-widget")])])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("Save")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("angular-widget")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Click 'Upload Files`.")])]),t._v(" "),n("li",[n("p",[t._v("Upload the following files from "),n("code",[t._v("angular-widget/dist/angular-widget")]),t._v(":")])])]),t._v(" "),n("ul",[n("li",[n("code",[t._v("main-es2015.js")])]),t._v(" "),n("li",[n("code",[t._v("polyfills-es2015.js")])]),t._v(" "),n("li",[n("code",[t._v("runtime-es2015.js")])])]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Additional Deployment Options")]),t._v(" "),n("ol",[n("li",[t._v("Install the micro frontend from a bundle in the "),n("code",[t._v("Entando Component Repository")]),t._v(".")]),t._v(" "),n("li",[t._v("Add the micro frontend to "),n("code",[t._v("Entando App Builder")]),t._v(".")]),t._v(" "),n("li",[t._v("Load the micro frontend from an API.")])])]),t._v(" "),n("h3",{attrs:{id:"add-widget"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#add-widget"}},[t._v("#")]),t._v(" Add Widget")]),t._v(" "),n("ol",[n("li",[t._v("Go to "),n("code",[t._v("Components > Micro frontends & Widgets")]),t._v(" in the Entando App Builder.")]),t._v(" "),n("li",[t._v("Click "),n("code",[t._v("Add")]),t._v(" at the lower right.")])]),t._v(" "),n("p",[n("img",{attrs:{src:s(451),alt:"New widget screen"}})]),t._v(" "),n("ol",{attrs:{start:"3"}},[n("li",[t._v("Enter the following:")])]),t._v(" "),n("ul",[n("li",[n("code",[t._v("Code: angular_widget")]),t._v(" → note: dashes are not allowed")]),t._v(" "),n("li",[n("code",[t._v("Title: Angular Widget")]),t._v(" → for both English and Italian languages")]),t._v(" "),n("li",[n("code",[t._v("Group: Free Access")])]),t._v(" "),n("li",[n("code",[t._v("Custom UI:")])])]),t._v(" "),n("div",{staticClass:"language-ftl extra-class"},[n("pre",{pre:!0,attrs:{class:"language-ftl"}},[n("code",[n("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[n("span",{pre:!0,attrs:{class:"token ftl-directive"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("#assign")]),n("span",{pre:!0,attrs:{class:"token content ftl"}},[t._v(" wp"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("JspTaglibs"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/aps-core"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("async")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),n("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[n("span",{pre:!0,attrs:{class:"token ftl-directive"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),n("span",{pre:!0,attrs:{class:"token content ftl"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("angular-widget/main-es2015.js"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token script"}}),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("async")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),n("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[n("span",{pre:!0,attrs:{class:"token ftl-directive"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),n("span",{pre:!0,attrs:{class:"token content ftl"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("angular-widget/polyfills-es2015.js"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token script"}}),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("async")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),n("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[n("span",{pre:!0,attrs:{class:"token ftl-directive"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),n("span",{pre:!0,attrs:{class:"token content ftl"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("angular-widget/runtime-es2015.js"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token script"}}),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("angular-widget")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[t._v("Click "),n("code",[t._v("Save")]),t._v(".")])]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[n("code",[t._v('<#assign wp=JspTaglibs[ "/aps-core"]>')]),t._v(" gives you access to the "),n("code",[t._v("@wp")]),t._v(" object where you can use environment variables like "),n("code",[t._v("resourceURL")]),t._v(".")])]),t._v(" "),n("h3",{attrs:{id:"see-it-in-action"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#see-it-in-action"}},[t._v("#")]),t._v(" See It in Action")]),t._v(" "),n("p",[t._v("Let's see the Angular micro frontend in action on our page.")]),t._v(" "),n("h4",{attrs:{id:"add-page"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#add-page"}},[t._v("#")]),t._v(" Add Page")]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),n("p",[t._v("If you've already configured your home page:")]),t._v(" "),n("ol",{attrs:{type:"i"}},[n("li",[t._v("Next to the "),n("b",[t._v("Home")]),t._v(" folder, under "),n("b",[t._v("Actions")]),t._v(", click "),n("b",[t._v("Configure")]),t._v(".")]),t._v(" "),n("li",[t._v("Skip to the "),n("b",[t._v("Add Widget")]),t._v(" section.")])])]),t._v(" "),n("p",[t._v("Let's add our widget to the "),n("code",[t._v("Home")]),t._v(" page.")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("Go to "),n("code",[t._v("Pages")]),t._v(" → "),n("code",[t._v("Management")])])]),t._v(" "),n("li",[n("p",[t._v("Next to the "),n("code",[t._v("Home")]),t._v(" folder, under "),n("code",[t._v("Actions")]),t._v(", click "),n("code",[t._v("Edit")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Next to "),n("code",[t._v("Page Template")]),t._v(" select "),n("code",[t._v("Service Page")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("Save and Configure")]),t._v(".")])])]),t._v(" "),n("h4",{attrs:{id:"add-widget-2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#add-widget-2"}},[t._v("#")]),t._v(" Add Widget")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("In the Search field in right-hand sidebar, enter "),n("code",[t._v("Angular Widget")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("Drag and drop "),n("code",[t._v("Angular Widget")]),t._v(" into the "),n("code",[t._v("Sample Frame")]),t._v(" in the main body of the page.")])]),t._v(" "),n("li",[n("p",[t._v("Click "),n("code",[t._v("Publish")]),t._v(".")])]),t._v(" "),n("li",[n("p",[t._v("At the upper right, click "),n("code",[t._v("Go to Homepage")]),t._v(".")])])]),t._v(" "),n("p",[n("img",{attrs:{src:s(910),alt:"Angular Micro Frontend"}})]),t._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("Congratulations!")]),t._v(" "),n("p",[t._v("You now have an Angular micro frontend running in Entando.")])])])}),[],!1,null,null,null);a.default=e.exports},451:function(t,a,s){t.exports=s.p+"assets/img/new-widget-screen.cd5a1175.png"},910:function(t,a,s){t.exports=s.p+"assets/img/angular-micro-frontend.04c2a9d5.png"}}]);