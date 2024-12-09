(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{1188:function(t,a,s){t.exports=s.p+"assets/img/publish_page1.5ef01569.png"},1189:function(t,a,s){t.exports=s.p+"assets/img/publish_page2.d5deb6cc.png"},1190:function(t,a,s){t.exports=s.p+"assets/img/publish_page3.e2e39aa5.png"},1191:function(t,a,s){t.exports=s.p+"assets/img/publish_page4.1ba5c176.png"},1192:function(t,a,s){t.exports=s.p+"assets/img/publish_page5.91cd8e67.png"},1193:function(t,a,s){t.exports=s.p+"assets/img/publish_page5b.4586a059.png"},1194:function(t,a,s){t.exports=s.p+"assets/img/publish_page6.6df7181c.png"},2115:function(t,a,s){"use strict";s.r(a);var e=s(36),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"page-management"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#page-management"}},[t._v("#")]),t._v(" Page Management")]),t._v(" "),e("p",[t._v("The "),e("RouterLink",{attrs:{to:"/v7.2/docs/compose/app-builder.html"}},[t._v("Entando App Builder")]),t._v(" provides the capability to publish application pages containing content as well as other Entando components. Page Templates are used to define the layout of available frames on a page.")],1),t._v(" "),e("h2",{attrs:{id:"create-a-page"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-page"}},[t._v("#")]),t._v(" Create a Page")]),t._v(" "),e("p",[t._v("Follow the steps below to create a Page with a Content widget.")]),t._v(" "),e("p",[e("strong",[t._v("1. Go to "),e("code",[t._v("Pages")]),t._v(" → "),e("code",[t._v("Management")]),t._v(".")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(1188),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("2. Click the "),e("code",[t._v("Add")]),t._v(" button.")])]),t._v(" "),e("p",[t._v("This generates a form where the following fields are mandatory:")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Title")]),t._v(": used for SEO")]),t._v(" "),e("li",[e("code",[t._v("Code")]),t._v(": must be unique")]),t._v(" "),e("li",[e("code",[t._v("Page placement")]),t._v(": the location of the Page in the Page Tree")]),t._v(" "),e("li",[e("code",[t._v("Owner Group")]),t._v(": the Group that has access to the Page")]),t._v(" "),e("li",[e("code",[t._v("Page Template")]),t._v(": the structure and presentation of the Page")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(1189),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("3. Click the "),e("code",[t._v("Save and Design")]),t._v(" button.")])]),t._v(" "),e("p",[t._v("This loads the Designer UI, which lets you place widgets into the Page Template frames.")]),t._v(" "),e("p",[e("img",{attrs:{src:s(1190),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("4. Add a widget.")])]),t._v(" "),e("p",[t._v("This is done by dragging a widget from the right panel into the desired frame. Adding the Content widget will load the configuration page shown below.")]),t._v(" "),e("p",[e("img",{attrs:{src:s(1191),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("5. Click "),e("code",[t._v("Add existing content")]),t._v(".")])]),t._v(" "),e("p",[t._v("This generates the content selection pop-up.")]),t._v(" "),e("p",[e("img",{attrs:{src:s(1192),alt:"image"}})]),t._v(" "),e("p",[t._v("You can search for the name of the content that you would like to publish. Remember that content must be saved and approved before it can be published to a page.")]),t._v(" "),e("p",[e("strong",[t._v("6. Select the desired content item(s) from the list.")])]),t._v(" "),e("p",[e("strong",[t._v("7. Click the "),e("code",[t._v("Continue")]),t._v(" button.")])]),t._v(" "),e("p",[t._v("The selected "),e("code",[t._v("Content")]),t._v(" item will now be displayed.")]),t._v(" "),e("p",[e("img",{attrs:{src:s(1193),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("8. Click the "),e("code",[t._v("Save")]),t._v(" button.")])]),t._v(" "),e("p",[t._v("The following actions are now available:")]),t._v(" "),e("ul",[e("li",[t._v("Click on the "),e("code",[t._v("Preview")]),t._v(" button to show the page preview with the updated settings.")]),t._v(" "),e("li",[t._v("Click on the "),e("code",[t._v("Publish")]),t._v(" button to publish the page.")]),t._v(" "),e("li",[t._v("Click on the "),e("code",[t._v("View published page")]),t._v(" button to view the published page in your application.")])]),t._v(" "),e("h2",{attrs:{id:"page-templates"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#page-templates"}},[t._v("#")]),t._v(" Page Templates")]),t._v(" "),e("p",[t._v("Page Templates provide the scaffolding of a Page and are constructed using two main elements:")]),t._v(" "),e("ul",[e("li",[t._v("A "),e("code",[t._v("JSON configuration")]),t._v(" field which lists the set of frames that can be used on a page.")]),t._v(" "),e("li",[t._v("A "),e("code",[t._v("Template")]),t._v(" field which uses Freemarker code to setup the HTML page itself.")])]),t._v(" "),e("h3",{attrs:{id:"json-configuration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#json-configuration"}},[t._v("#")]),t._v(" JSON Configuration")]),t._v(" "),e("p",[t._v("Each item in the "),e("code",[t._v("frames")]),t._v(" array of the JSON configuration represents a frame or slot in the page, characterized by the following values:")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("pos")]),t._v(": A zero-based position index (starts from zero). This value is used by APIs to address a specific widget on the page.")]),t._v(" "),e("li",[e("code",[t._v("descr")]),t._v(": The frame description displayed in the Page Design view.")]),t._v(" "),e("li",[e("code",[t._v("mainFrame")]),t._v(": This designates the primary frame in the Page Template.")]),t._v(" "),e("li",[e("code",[t._v("defaultWidget")]),t._v(": The code for a default widget to use in this frame. Page Template developers can use this field to provide suggestions for common widgets, e.g. header and footer widgets.")]),t._v(" "),e("li",[e("code",[t._v("sketch")]),t._v(": An object with 4 coordinates (x1,x2,y1,y2) to allow the developer to place the widgets in the Page preview. The x and y values go from 0 to 11 (similar to columns in Bootstrap), so if you want to place a 2x2 frame at the top left corner of the page, the values would be "),e("code",[t._v("x1: 0")]),t._v(", "),e("code",[t._v("x2: 1")]),t._v(", "),e("code",[t._v("y1: 0")]),t._v(" and "),e("code",[t._v("y2: 1")]),t._v(".")])]),t._v(" "),e("h3",{attrs:{id:"template"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#template"}},[t._v("#")]),t._v(" Template")]),t._v(" "),e("p",[t._v("To add a frame in a specific place of the page, input "),e("code",[t._v("<@wp.show frame=0 />")]),t._v(", where "),e("code",[t._v("frame")]),t._v(" is the "),e("code",[t._v("pos")]),t._v(" variable from the "),e("code",[t._v("JSON configuration")]),t._v(". To setup the "),e("code",[t._v("wp")]),t._v(" variable, "),e("code",[t._v('<#assign wp=JspTaglibs["/aps-core"]>')]),t._v(" is required at the top of the template.")]),t._v(" "),e("p",[t._v("Common code can be shared across Pages by using "),e("RouterLink",{attrs:{to:"/v7.2/tutorials/compose/widgets-fragments.html#create-and-update-a-ux-fragment"}},[t._v("UX Fragments")]),t._v(" and "),e("code",[t._v('<@wp.fragment code="\\<FRAGMENT\\_CODE\\>" escapeXml=false /\\>')]),t._v(".")],1),t._v(" "),e("h3",{attrs:{id:"create-a-page-template"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-page-template"}},[t._v("#")]),t._v(" Create a Page Template")]),t._v(" "),e("p",[t._v("Follow the steps below to prepare a Page Template with two frames on it.")]),t._v(" "),e("p",[e("strong",[t._v("1. Go to "),e("code",[t._v("Pages")]),t._v(" → "),e("code",[t._v("Templates")]),t._v(" → "),e("code",[t._v("Add")])])]),t._v(" "),e("p",[e("img",{attrs:{src:s(1194),alt:"image"}})]),t._v(" "),e("p",[e("strong",[t._v("2. Enter the field information below:")])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Code")]),t._v(": double_frame (Note: Dashes are not allowed)")]),t._v(" "),e("li",[e("code",[t._v("Name")]),t._v(": Double Frame")]),t._v(" "),e("li",[e("code",[t._v("JSON Configuration:")])])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"frames"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pos"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"descr"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Frame 1"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"mainFrame"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"defaultWidget"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sketch"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pos"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"descr"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Frame 2"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"mainFrame"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"defaultWidget"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sketch"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ul",[e("li",[e("code",[t._v("Template:")])])]),t._v(" "),e("div",{staticClass:"language-ftl extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ftl"}},[e("code",[e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("#assign")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[t._v(" wp"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("JspTaglibs"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/aps-core"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token doctype"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),e("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[t._v("HTML")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[t._v("PUBLIC")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-//W3C//DTD HTML 4.0 Transitional//EN"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentPage param"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title"')]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentPage param"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title"')]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show frame"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show frame"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("Include the following fragment in the "),e("code",[t._v("head")]),t._v(" section to make use of the user's Keycloak identity information.")]),t._v(" "),e("div",{staticClass:"language-ftl extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ftl"}},[e("code",[e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fragment code"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"keycloak_auth"')]),t._v(" escapeXml"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("\n")])])]),e("p",[e("strong",[t._v("3. Verify that the "),e("code",[t._v("Template preview")]),t._v(" is reflecting the desired two frame layout.")])]),t._v(" "),e("p",[e("strong",[t._v("4. Click the "),e("code",[t._v("Save")]),t._v(" button.")])])])}),[],!1,null,null,null);a.default=n.exports}}]);