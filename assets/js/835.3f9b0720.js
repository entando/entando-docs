(window.webpackJsonp=window.webpackJsonp||[]).push([[835],{2177:function(t,e,i){"use strict";i.r(e);var a=i(36),l=Object(a.a)({},(function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[i("h1",{attrs:{id:"preinstalled-widgets"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#preinstalled-widgets"}},[t._v("#")]),t._v(" Preinstalled Widgets")]),t._v(" "),i("p",[t._v("The Entando Platform includes a number of useful components to accelerate application development. These consist of widgets, page templates, content templates, and content types.")]),t._v(" "),i("p",[t._v("This page introduces the widgets that are available out of the box with Entando. The widgets are categorized by type, each with its own CMS, navigation, pages, SEO and/or system functionality.")]),t._v(" "),i("h2",{attrs:{id:"widget-attributes"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#widget-attributes"}},[t._v("#")]),t._v(" Widget Attributes")]),t._v(" "),i("p",[t._v("All widgets are required to have the following attributes. These are mandatory regardless of whether a widget is preinstalled, user-created, or inside a bundle.")]),t._v(" "),i("ul",[i("li",[i("code",[t._v("Name")]),t._v(": A string that specifies the name of the widget")]),t._v(" "),i("li",[i("code",[t._v("Code")]),t._v(": A string that satisfies the REGEX "),i("code",[t._v("/^[0-9a-zA-Z_.]+$/")])]),t._v(" "),i("li",[i("code",[t._v("Group")]),t._v(': A group for which the user has "create" permissions')]),t._v(" "),i("li",[i("code",[t._v("Icon")]),t._v(": A graphic that visually represents the widget via an uploaded icon (SVG file) or one chosen from the icon library")]),t._v(" "),i("li",[i("code",[t._v("Custom UI")]),t._v(": HTML code that constructs the visual layout of the widget")]),t._v(" "),i("li",[i("code",[t._v("Config UI")]),t._v(": A JSON structure that defines the widget's configuration. It requires two properties:\n"),i("ul",[i("li",[i("code",[t._v("customElement")]),t._v(": The custom element name of the widget config component")]),t._v(" "),i("li",[i("code",[t._v("resources")]),t._v(": An array listing the source location of the custom element files for the widget configuration")])])])]),t._v(" "),i("h2",{attrs:{id:"widget-descriptions"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#widget-descriptions"}},[t._v("#")]),t._v(" Widget Descriptions")]),t._v(" "),i("p",[t._v("The following table lists the notable preinstalled widgets of an Entando instance. They are accessible from the left menu of the App Builder by selecting "),i("code",[t._v("Components")]),t._v(" → "),i("code",[t._v("MFE & Widgets")]),t._v(".")]),t._v(" "),i("table",[i("thead",[i("tr",[i("th",{staticStyle:{"text-align":"left"}},[t._v("Name")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),i("th",{staticStyle:{"text-align":"left"}},[t._v("Description")])])]),t._v(" "),i("tbody",[i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("APIs")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("System")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("The only mechanism with which developers can communicate with the Entando core")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Content List")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("CMS")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A widget that renders a list of contents, each one displaying information from a template")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Content Search Query")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("CMS")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A widget that publishes a list of contents based on different settings")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Content SEO Meta-description")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("SEO")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A component listing the SEO parameters specified when pages are created or modified")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Internal Servlet")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("System")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A legacy implementation to create server-side widgets using Struts 2. Available for backwards compatibility.")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Legacy Login Form")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("System")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A non-Keycloak form component for logging in")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Legacy Navigation Menu")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("Navigation")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("An interface that is configurable via expression list parameters. A user with admin privileges can easily change its layout.")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Login")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("System")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("The Keycloak-powered login/logout component for the web app")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Logo")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("Page")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("The default Entando logo. It can be used in other projects by changing its fragment reference.")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Navigation Menu")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("Navigation")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A widget configurable via expression list parameters")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Search Form")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("CMS")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A basic search form")])]),t._v(" "),i("tr",[i("td",{staticStyle:{"text-align":"left"}},[t._v("Search Results")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("CMS")]),t._v(" "),i("td",{staticStyle:{"text-align":"left"}},[t._v("A component that shows the results of the query entered into the Search Form")])])])])])}),[],!1,null,null,null);e.default=l.exports}}]);