(window.webpackJsonp=window.webpackJsonp||[]).push([[186],{1909:function(t,a,e){"use strict";e.r(a);var s=e(36),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"create-a-react-micro-frontend"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-a-react-micro-frontend"}},[t._v("#")]),t._v(" Create a React Micro Frontend")]),t._v(" "),s("h2",{attrs:{id:"prerequisites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/v7.0/docs/getting-started/"}},[t._v("A working instance of Entando")])],1),t._v(" "),s("li",[t._v("Use the "),s("RouterLink",{attrs:{to:"/v7.0/docs/reference/entando-cli.html"}},[t._v("Entando CLI")]),t._v(" to verify all dependencies are installed:")],1)]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("ent check-env develop\n")])])]),s("h2",{attrs:{id:"create-a-react-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-a-react-app"}},[t._v("#")]),t._v(" Create a React App")]),t._v(" "),s("p",[s("a",{attrs:{href:"https://create-react-app.dev/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Create React App"),s("OutboundLink")],1),t._v(" allows you to generate a simple app in seconds.")]),t._v(" "),s("ol",[s("li",[t._v("Create a React app:")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("npx create-react-app my-widget --use-npm\n")])])]),s("p",[t._v("This tutorial updates the following files:")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[t._v("my-widget\n├── README.md\n├── public\n│   └── index.html\n└── src\n    ├── App.js\n    └── index.js\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("Start the app:")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" my-widget\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" start\n")])])]),s("p",[t._v("The React app should open in your browser at "),s("code",[t._v("http://localhost:3000")]),t._v(".")]),t._v(" "),s("h3",{attrs:{id:"configure-the-custom-element"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-custom-element"}},[t._v("#")]),t._v(" Configure the Custom Element")]),t._v(" "),s("p",[t._v("The steps below wrap the app component with an HTML custom element. The "),s("code",[t._v("connectedCallback")]),t._v(" method renders the React app when the custom element is added to the DOM.")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("In "),s("code",[t._v("my-widget/src")]),t._v(", create a file named "),s("code",[t._v("WidgetElement.js")])])]),t._v(" "),s("li",[s("p",[t._v("Add the following code to "),s("code",[t._v("WidgetElement.js")]),t._v(":")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" ReactDOM "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'react-dom/client'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" App "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./App'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WidgetElement")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HTMLElement")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("connectedCallback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mountPoint "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'div'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mountPoint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" root "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ReactDOM"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createRoot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("mountPoint"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        root"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("App "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\ncustomElements"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("define")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'my-widget'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" WidgetElement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" WidgetElement"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Custom Element Names")]),t._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://stackoverflow.com/questions/22545621/do-custom-elements-require-a-dash-in-their-name",target:"_blank",rel:"noopener noreferrer"}},[t._v("Must contain a hyphen "),s("code",[t._v("-")]),t._v(" in the name"),s("OutboundLink")],1)]),t._v(" "),s("li",[t._v("Cannot be a single word")]),t._v(" "),s("li",[t._v("Should follow "),s("code",[t._v("kebab-case")]),t._v(" naming convention")])])]),t._v(" "),s("h3",{attrs:{id:"display-the-custom-element"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#display-the-custom-element"}},[t._v("#")]),t._v(" Display the Custom Element")]),t._v(" "),s("ol",[s("li",[t._v("Replace the entire contents of "),s("code",[t._v("src/index.js")]),t._v(" with these two lines:")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./index.css'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./WidgetElement'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[t._v("In "),s("code",[t._v("public/index.html")]),t._v(", replace "),s("code",[t._v('<div id="root"></div>')]),t._v(" with this:")])]),t._v(" "),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("my-widget")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[t._v("Observe your browser automatically redisplay the React app")])]),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Congratulations!")]),t._v(" "),s("p",[t._v("You’re now using a custom element to display a React app.")])]),t._v(" "),s("h2",{attrs:{id:"display-the-micro-frontend-in-entando"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#display-the-micro-frontend-in-entando"}},[t._v("#")]),t._v(" Display the Micro Frontend in Entando")]),t._v(" "),s("h3",{attrs:{id:"build-the-react-app"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#build-the-react-app"}},[t._v("#")]),t._v(" Build the React App")]),t._v(" "),s("p",[t._v("To deploy the custom element into Entando as a micro frontend, you must perform a production build of the React app.")]),t._v(" "),s("ol",[s("li",[t._v("In the "),s("code",[t._v("my-widget")]),t._v(" directory, create an "),s("code",[t._v(".env.production")]),t._v(" file that consists of one line:")])]),t._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("PUBLIC_URL=/entando-de-app/cmsresources/my-widget\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[t._v("Notes")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("/entando-de-app/cmsresources/")]),t._v(" is the Resource URL for your Entando Application, which matches nearly all development environments. Consult your Entando admin or use the following fragment to discover the Resource URL.")])]),t._v(" "),s("div",{staticClass:"language-ftl extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ftl"}},[s("code",[t._v("  "),s("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[s("span",{pre:!0,attrs:{class:"token ftl-directive"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("#assign")]),s("span",{pre:!0,attrs:{class:"token content ftl"}},[t._v(" wp"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("JspTaglibs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/aps-core"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[s("span",{pre:!0,attrs:{class:"token ftl-directive"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),s("span",{pre:!0,attrs:{class:"token content ftl"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("/my-widget")]),t._v(" is the public folder that hosts the JavaScript and CSS files for the React app")])])]),t._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[t._v("Build the app:")])]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" run build\n")])])]),s("h3",{attrs:{id:"upload-the-react-files"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#upload-the-react-files"}},[t._v("#")]),t._v(" Upload the React files")]),t._v(" "),s("p",[t._v("To set up the micro frontend to use in Entando:")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("In your App Builder, go to "),s("code",[t._v("Administration")]),t._v(" → "),s("code",[t._v("File browser")]),t._v(" → "),s("code",[t._v("public")])])]),t._v(" "),s("li",[s("p",[t._v("Click "),s("code",[t._v("Create folder")]),t._v(' and name it "my-widget" to match the '),s("code",[t._v(".env.production")]),t._v(" path above")])]),t._v(" "),s("li",[s("p",[t._v("Click "),s("code",[t._v("Save")])])]),t._v(" "),s("li",[s("p",[t._v("Click "),s("code",[t._v("my-widget")])])]),t._v(" "),s("li",[s("p",[t._v("Create a folder structure similar to your generated build directory:")])])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("my-widget/static/css")])]),t._v(" "),s("li",[s("code",[t._v("my-widget/static/js")])]),t._v(" "),s("li",[s("code",[t._v("my-widget/static/media")])])]),t._v(" "),s("ol",{attrs:{start:"6"}},[s("li",[t._v("Upload the css, js, and logo files from the corresponding directories under "),s("code",[t._v("my-widget/build/static")]),t._v(", for example:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("my-widget/build/static/css/main.073c9b0a.css")])]),t._v(" "),s("li",[s("code",[t._v("my-widget/build/static/js/main.b9eb8fa4.js")])]),t._v(" "),s("li",[s("code",[t._v("my-widget/build/static/media/logo.6ce2458023.svg")])])]),t._v(" "),s("blockquote",[s("p",[t._v("Note: The generated ID of each file name (e.g. '073c9b0a') may change after every build. These folders may also contain LICENSE.txt or .map files, but they are not applicable to this tutorial.")])]),t._v(" "),s("h3",{attrs:{id:"create-the-widget"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#create-the-widget"}},[t._v("#")]),t._v(" Create the Widget")]),t._v(" "),s("p",[t._v("Add a widget for your MFE.")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("In your App Builder, go to "),s("code",[t._v("Components")]),t._v(" → "),s("code",[t._v("MFE & Widgets")])])]),t._v(" "),s("li",[s("p",[t._v("Click "),s("code",[t._v("Add")]),t._v(" in the lower right corner")])])]),t._v(" "),s("p",[s("img",{attrs:{src:e(452),alt:"New widget screen"}})]),t._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[t._v("Edit the fields below:")])]),t._v(" "),s("ul",[s("li",[s("code",[t._v("Title")]),t._v(': "My Widget" → enter this in both the English and Italian language fields')]),t._v(" "),s("li",[s("code",[t._v("Code")]),t._v(': "my_widget" → dashes are not allowed')]),t._v(" "),s("li",[s("code",[t._v("Group")]),t._v(': "Free Access"')]),t._v(" "),s("li",[s("code",[t._v("Icon")]),t._v(": upload or select an icon of your choice")]),t._v(" "),s("li",[t._v("In the center panel under "),s("code",[t._v("Custom UI")]),t._v(", enter the following. Make sure to use the actual file names from your build.")])]),t._v(" "),s("div",{staticClass:"language-ftl extra-class"},[s("pre",{pre:!0,attrs:{class:"language-ftl"}},[s("code",[s("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[s("span",{pre:!0,attrs:{class:"token ftl-directive"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("#assign")]),s("span",{pre:!0,attrs:{class:"token content ftl"}},[t._v(" wp"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("JspTaglibs"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/aps-core"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("rel")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("stylesheet"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("text/css"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("href")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[s("span",{pre:!0,attrs:{class:"token ftl-directive"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),s("span",{pre:!0,attrs:{class:"token content ftl"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("my-widget/static/css/main.073c9b0a.css"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),s("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[s("span",{pre:!0,attrs:{class:"token ftl-directive"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),s("span",{pre:!0,attrs:{class:"token content ftl"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("resourceURL ")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("my-widget/static/js/main.b9eb8fa4.js"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token script"}}),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("my-widget")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[t._v("Click "),s("code",[t._v("Save")])])]),t._v(" "),s("h3",{attrs:{id:"view-the-widget"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#view-the-widget"}},[t._v("#")]),t._v(" View the Widget")]),t._v(" "),s("p",[t._v("Place the React micro frontend onto a page to see it in action.")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("In the "),s("code",[t._v("Entando App Builder")]),t._v(", go to "),s("code",[t._v("Pages")]),t._v(" → "),s("code",[t._v("Management")])])]),t._v(" "),s("li",[s("p",[t._v("Choose an existing page (or "),s("RouterLink",{attrs:{to:"/v7.0/tutorials/compose/page-management.html#create-a-page"}},[t._v("create a new one")]),t._v(") and select "),s("code",[t._v("Design")]),t._v(" from its Actions")],1)]),t._v(" "),s("li",[s("p",[t._v("Find your widget in the "),s("code",[t._v("Widgets")]),t._v(" sidebar and drag it onto the page")])]),t._v(" "),s("li",[s("p",[t._v("Click "),s("code",[t._v("Publish")])])]),t._v(" "),s("li",[s("p",[t._v("Click on "),s("code",[t._v("View Published Page")])])])]),t._v(" "),s("img",{attrs:{src:e(968),width:"406.44",height:"569.52"}}),t._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("Congratulations!")]),t._v(" "),s("p",[t._v("You now have a React micro frontend running in Entando.")])])])}),[],!1,null,null,null);a.default=n.exports},452:function(t,a,e){t.exports=e.p+"assets/img/new-widget-screen.5f22e2a2.png"},968:function(t,a,e){t.exports=e.p+"assets/img/react-micro-frontend.e1fb6118.png"}}]);