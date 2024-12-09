(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{1738:function(t,a,s){"use strict";s.r(a);var e=s(36),n=Object(e.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"page-management"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#page-management"}},[t._v("#")]),t._v(" Page Management")]),t._v(" "),e("p",[t._v("The App Builder provides the capability to publish application pages containing content as well as other Entando components. Page Templates are used to layout the available frames on a page.")]),t._v(" "),e("h2",{attrs:{id:"create-a-page"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-page"}},[t._v("#")]),t._v(" Create a Page")]),t._v(" "),e("ul",[e("li",[t._v("Go to "),e("code",[t._v("Pages → Management")])]),t._v(" "),e("li",[t._v("Click "),e("strong",[t._v("Add")])])]),t._v(" "),e("p",[e("img",{attrs:{src:s(791),alt:"image"}})]),t._v(" "),e("p",[t._v("You will need to supply at least the following fields:")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Title")]),t._v(": used for SEO")]),t._v(" "),e("li",[e("code",[t._v("Code")]),t._v(": must be unique")]),t._v(" "),e("li",[e("code",[t._v("Page placement")]),t._v(": the location of the Page in the Page Tree")]),t._v(" "),e("li",[e("code",[t._v("Owner Group")]),t._v(": the Group that has access to the Page")]),t._v(" "),e("li",[e("code",[t._v("Page Template")]),t._v(": the structure and presentation of the Page")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(792),alt:"image"}})]),t._v(" "),e("ul",[e("li",[t._v("Click the green "),e("strong",[t._v("Save and Design")]),t._v(" button. This brings you to the Designer section which lets you place widgets into the Page Template frames.")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(793),alt:"image"}})]),t._v(" "),e("ul",[e("li",[t._v("Add widgets by dragging them from the right column into the desired frame.")]),t._v(" "),e("li",[t._v("If you select the "),e("strong",[t._v("Content")]),t._v(" widget, its corresponding settings page will be shown.")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(794),alt:"image"}})]),t._v(" "),e("ul",[e("li",[t._v("Click "),e("strong",[t._v("Add existing content")]),t._v(" to bring up the Content selection view.")])]),t._v(" "),e("p",[e("img",{attrs:{src:s(795),alt:"image"}})]),t._v(" "),e("ul",[e("li",[e("p",[t._v("In the Search field, you can type the name of the content that you\nwould like to publish. Remember\nthat in order to publish the content on your page, it must first be saved\nand approved.")])]),t._v(" "),e("li",[e("p",[t._v("Select the appropriate content item from the list.")])]),t._v(" "),e("li",[e("p",[t._v("Press the "),e("strong",[t._v("Save")]),t._v(" button.")])])]),t._v(" "),e("p",[e("img",{attrs:{src:s(796),alt:"image"}})]),t._v(" "),e("ul",[e("li",[e("p",[t._v("The title of the selected content item will now be displayed in the widget settings.")])]),t._v(" "),e("li",[e("p",[t._v("Press the "),e("strong",[t._v("Save")]),t._v(" button.")])]),t._v(" "),e("li",[e("p",[t._v("Click on the "),e("strong",[t._v("Preview")]),t._v(" button to show the page preview with the updated settings.")])]),t._v(" "),e("li",[e("p",[t._v("Click on the "),e("strong",[t._v("Publish")]),t._v(" button to publish the page.")])]),t._v(" "),e("li",[e("p",[t._v("Click on the "),e("strong",[t._v("View published page")]),t._v(" button to view the published page in your application.")])])]),t._v(" "),e("h2",{attrs:{id:"create-a-page-template"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#create-a-page-template"}},[t._v("#")]),t._v(" Create a Page Template")]),t._v(" "),e("p",[t._v("Page Templates provide the scaffolding of a Page and are constructed using two main elements:")]),t._v(" "),e("ol",[e("li",[t._v("A "),e("code",[t._v("JSON configuration")]),t._v(" field which lists the set of frames that can be used on a page.\n"),e("ul",[e("li",[t._v("Each item in the frames array represents a frame or slot in the page, characterized by the following values:\n"),e("ul",[e("li",[e("code",[t._v("pos")]),t._v(" - a zero-based position index (starts from zero). This value is used in\nAPIs to address a specific widget on the page.")]),t._v(" "),e("li",[e("code",[t._v("descr")]),t._v(" - the frame description displayed on Page Design view")]),t._v(" "),e("li",[e("code",[t._v("mainFrame")]),t._v(" - designates the primary frame in the Page Template")]),t._v(" "),e("li",[e("code",[t._v("defaultWidget")]),t._v(" - widget code for a default widget to use in this frame. Page Template developers can use this field to provide suggestions on common widgets, e.g. header and footer widgets.")]),t._v(" "),e("li",[e("code",[t._v("sketch")]),t._v(" - an object with 4 coordinates (x1,x2,y1,y2) to allow the developer to place the widgets in the Page preview. Sketch’s x and y values go from 0 to 11 (similar to columns in Bootstrap), so if you want to place a 2x2 frame at the top left corner of the page, the values would be "),e("code",[t._v("x1: 0, x2: 1 y1: 0 y2: 1")]),t._v(".")])])])])]),t._v(" "),e("li",[t._v("A "),e("code",[t._v("Template")]),t._v(" field which uses Freemarker code to setup the HTML page itself.\n"),e("ul",[e("li",[t._v("To add a frame in a specific place of the page, add "),e("code",[t._v("<@wp.show frame=0 />")]),t._v(", where frame is the pos variable from the "),e("code",[t._v("JSON configuration")]),t._v(". "),e("code",[t._v('<#assign wp=JspTaglibs["/aps-core"]>')]),t._v(" is required at the top of the template to setup the "),e("code",[t._v("wp")]),t._v(" variable.")]),t._v(" "),e("li",[t._v("Common code can be shared across pages by using "),e("RouterLink",{attrs:{to:"/v6.3.2/tutorials/compose/widgets-fragments.html#create-a-ux-fragment"}},[t._v("UX Fragments")]),t._v(" and "),e("code",[t._v('<@wp.fragment code="\\<FRAGMENT\\_CODE\\>" escapeXml=false /\\>')]),t._v(".")],1)])])]),t._v(" "),e("p",[t._v("This tutorial prepares a Page Template with two frames on it.")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("Go to "),e("code",[t._v("Pages → Templates → Add")])])]),t._v(" "),e("li",[e("p",[t._v("Enter the following:")])])]),t._v(" "),e("ul",[e("li",[e("code",[t._v("Code: double_frame")]),t._v(" "),e("ul",[e("li",[t._v("Note: dashes are not allowed")])])]),t._v(" "),e("li",[e("code",[t._v("Name: Double Frame")])]),t._v(" "),e("li",[e("code",[t._v("JSON Configuration:")])])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"frames"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pos"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"descr"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Frame 1"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"mainFrame"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"defaultWidget"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sketch"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"pos"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"descr"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Frame 2"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"mainFrame"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"defaultWidget"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"sketch"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y1"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"x2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"y2"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ul",[e("li",[e("code",[t._v("Template:")])])]),t._v(" "),e("div",{staticClass:"language-ftl extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ftl"}},[e("code",[e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("#assign")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[t._v(" wp"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("JspTaglibs"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/aps-core"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")])]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token doctype"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<!")]),e("span",{pre:!0,attrs:{class:"token doctype-tag"}},[t._v("DOCTYPE")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[t._v("HTML")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token name"}},[t._v("PUBLIC")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-//W3C//DTD HTML 4.0 Transitional//EN"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("title")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentPage param"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title"')]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("title")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("h1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentPage param"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"title"')]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("h1")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show frame"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("show frame"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token tag"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("html")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),e("p",[t._v("Include the following fragment in the "),e("code",[t._v("head")]),t._v(" section if you want to make use of the user's identity information from Keycloak.")]),t._v(" "),e("div",{staticClass:"language-ftl extra-class"},[e("pre",{pre:!0,attrs:{class:"language-ftl"}},[e("code",[e("span",{pre:!0,attrs:{class:"token ftl language-ftl"}},[e("span",{pre:!0,attrs:{class:"token ftl-directive"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),e("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("@wp")]),e("span",{pre:!0,attrs:{class:"token content ftl"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("fragment code"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"keycloak_auth"')]),t._v(" escapeXml"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),e("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" ")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])])]),t._v("\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("You should see the "),e("code",[t._v("Template preview")]),t._v(" reflecting the desired two frame layout.")]),t._v(" "),e("li",[t._v("Click "),e("code",[t._v("Save")]),t._v(" to save your template.")])])])}),[],!1,null,null,null);a.default=n.exports},791:function(t,a,s){t.exports=s.p+"assets/img/Publish1.f8e40b3d.png"},792:function(t,a,s){t.exports=s.p+"assets/img/Publish2.412f7ce0.png"},793:function(t,a,s){t.exports=s.p+"assets/img/Publish3.ddd391c0.png"},794:function(t,a,s){t.exports=s.p+"assets/img/Publish4.2ebeb5df.png"},795:function(t,a,s){t.exports=s.p+"assets/img/Publish5.63565680.png"},796:function(t,a,s){t.exports=s.p+"assets/img/Publish5b.290725d4.png"}}]);