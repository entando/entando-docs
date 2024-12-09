(window.webpackJsonp=window.webpackJsonp||[]).push([[386],{1502:function(t,e,a){"use strict";a.r(e);var s=a(36),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"entando-mfe-context-parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-mfe-context-parameters"}},[t._v("#")]),t._v(" Entando MFE Context Parameters")]),t._v(" "),a("p",[t._v("Entando MFEs can be made more powerful using one or more configuration techniques:")]),t._v(" "),a("ol",[a("li",[t._v("Provide a "),a("RouterLink",{attrs:{to:"/next/tutorials/create/mfe/widget-configuration.html"}},[t._v("configuration MFE")])],1),t._v(" "),a("li",[t._v("Access context parameters from the Entando Application")]),t._v(" "),a("li",[t._v("Set up API claims so MFEs are automatically connected to microservices in the same bundle or namespace")])]),t._v(" "),a("p",[t._v("This tutorial will demonstrate the second technique by making use of the most commonly used context parameters:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("page_code")]),t._v(": the code of the current page, e.g. "),a("code",[t._v("home")]),t._v(" or "),a("code",[t._v("my-page")])]),t._v(" "),a("li",[a("code",[t._v("info_currentLang")]),t._v(": the current language, e.g. "),a("code",[t._v("en")]),t._v(" or "),a("code",[t._v("it")])]),t._v(" "),a("li",[a("code",[t._v("systemParam_applicationBaseURL")]),t._v(": the full base URL of the Entando Application")])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Context params are provided on the server side via the "),a("code",[t._v("@wp.page")]),t._v(" and "),a("code",[t._v("wp.info")]),t._v(" custom tags. Note that the "),a("code",[t._v("wp.info")]),t._v(" tag retrieves values by key for the info context as well as system parameters when the key is "),a("code",[t._v("systemParam")]),t._v(". See the "),a("RouterLink",{attrs:{to:"/next/docs/reference/freemarker-tags/freemarker-core-tags.html"}},[t._v("Core Tag Library")]),t._v(" for more information.")],1)]),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/next/docs/getting-started/"}},[t._v("A working instance of Entando")])],1),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/next/tutorials/create/mfe/widget-configuration.html"}},[t._v("A configurable React MFE")])],1)]),t._v(" "),a("h2",{attrs:{id:"configure-the-mfe-to-display-context-parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-mfe-to-display-context-parameters"}},[t._v("#")]),t._v(" Configure the MFE to Display Context Parameters")]),t._v(" "),a("p",[t._v("This tutorial starts where the "),a("RouterLink",{attrs:{to:"/next/tutorials/create/mfe/widget-configuration.html"}},[t._v("configurable React MFE tutorial")]),t._v(" ends since many of the changes required to enable context parameters are also required when preparing a config MFE. Those changes include modifying the custom element to accept the "),a("code",[t._v("config")]),t._v(" JSON from Entando, enabling a local test setup using "),a("code",[t._v("mfe-config.json")]),t._v(", and configuring the bundle descriptor "),a("code",[t._v("entando.json")]),t._v(".")],1),t._v(" "),a("ol",[a("li",[t._v("Edit the "),a("code",[t._v("simple-mfe/src/App.js")]),t._v(". Start by updating the existing "),a("code",[t._v("config")]),t._v(" mapping:")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" contextParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" config "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Edit "),a("code",[t._v("App.js")]),t._v(" to show the values of the "),a("code",[t._v("contextParams")]),t._v(". Add this code inside the "),a("code",[t._v("<header>")]),t._v(" element:")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" contextParams "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Page Code"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("contextParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("page_code"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Current Language"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("contextParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("info_currentLang"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Application Base "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("URL")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("contextParams"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("systemParam_applicationBaseURL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Provide sample data in the "),a("code",[t._v("simple-mfe/public/mfe-config.json")]),t._v(" so you can test this locally:")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"contextParams"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"page_code"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"my-page"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"info_currentLang"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"it"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"systemParam_applicationBaseURL"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://my-production-url/entando-de-app"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("Start up the MFE and confirm it can display the context parameters:")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("ent bundle run simple-mfe\n")])])]),a("h2",{attrs:{id:"configure-and-publish-the-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-and-publish-the-bundle"}},[t._v("#")]),t._v(" Configure and Publish the Bundle")]),t._v(" "),a("ol",[a("li",[t._v("Edit "),a("code",[t._v("entando.json")]),t._v(" and add the following block to the "),a("code",[t._v("simple-mfe")]),t._v(" micro frontend definition:")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("    "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v('"contextParams"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"page_code"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"info_currentLang"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"systemParam_applicationBaseURL"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("You can now "),a("RouterLink",{attrs:{to:"/next/tutorials/create/pb/publish-project-bundle.html"}},[t._v("build and install the bundle")]),t._v(":")],1)]),t._v(" "),a("EntandoInstallBundle"),t._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Add the widget to a page in your Entando Application to confirm the context parameters display correctly. If you modify a page URL to select a different language (e.g. change "),a("code",[t._v("YOUR-BASE-URL/entando-de-app/en/demo.page")]),t._v(" to "),a("code",[t._v("YOUR-BASE-URL/entando-de-app/it/demo.page")]),t._v("), the current language parameter ("),a("code",[t._v("info_currentLang")]),t._v(") should change from "),a("code",[t._v("en")]),t._v(" to "),a("code",[t._v("it")]),t._v(".")])])],1)}),[],!1,null,null,null);e.default=n.exports}}]);