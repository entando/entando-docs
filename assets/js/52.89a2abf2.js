(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{1215:function(t,e,n){t.exports=n.p+"assets/img/content_config-page.f8a6ca72.png"},1216:function(t,e,n){t.exports=n.p+"assets/img/content_collection-type.be942daf.png"},1217:function(t,e,n){t.exports=n.p+"assets/img/content_type-populated.1d879960.png"},1218:function(t,e,n){t.exports=n.p+"assets/img/content_select-template.a5da2998.png"},1219:function(t,e,n){t.exports=n.p+"assets/img/content-list_config-page.7e33a519.png"},1220:function(t,e,n){t.exports=n.p+"assets/img/content-list_query.75c9ccda.png"},1221:function(t,e,n){t.exports=n.p+"assets/img/content-list_type-populated.78c809b7.png"},1222:function(t,e,n){t.exports=n.p+"assets/img/content-list_select-template.e90a855d.png"},2145:function(t,e,n){"use strict";n.r(e);var o=n(36),a=Object(o.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"strapi-content-management"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#strapi-content-management"}},[t._v("#")]),t._v(" Strapi Content Management")]),t._v(" "),o("h2",{attrs:{id:"overview"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),o("p",[t._v("This tutorial demonstrates how to create and manage the content in your Strapi instance from the App Builder user interface.")]),t._v(" "),o("p",[t._v("The Strapi Content Widget and Strapi Content List Widget enable the user to add or edit content and content lists, respectively. Note that it is mandatory to assign templates to selected content. The Strapi Content List Widget also allows content to be saved as a search. The following table compares widget capabilities.")]),t._v(" "),o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[t._v("Strapi Content Widget")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Strapi Content List Widget")])])]),t._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[t._v("User can select only one content")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("User can select more than one content")])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[t._v("User can select only one template per selected content")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("User can select different templates for different content")])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[t._v("There is no "),o("code",[t._v("Save as Query")]),t._v(" feature")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("The "),o("code",[t._v("Save as Query")]),t._v(" feature allows the user to save multiple contents")])])])]),t._v(" "),o("h2",{attrs:{id:"prerequisites"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/docs/getting-started/"}},[t._v("A working instance of Entando")])],1),t._v(" "),o("li",[t._v("Verify dependencies with the "),o("RouterLink",{attrs:{to:"/v7.2/docs/getting-started/entando-cli.html#check-the-environment"}},[t._v("Entando CLI")]),t._v(": "),o("code",[t._v("ent check-env develop")])],1),t._v(" "),o("li",[o("RouterLink",{attrs:{to:"/v7.2/tutorials/solution/strapi.html"}},[t._v("A configured Strapi instance running on Entando")])],1)]),t._v(" "),o("h2",{attrs:{id:"strapi-content-widget"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#strapi-content-widget"}},[t._v("#")]),t._v(" Strapi Content Widget")]),t._v(" "),o("ol",[o("li",[t._v("Select a page or "),o("RouterLink",{attrs:{to:"/v7.2/tutorials/compose/page-management.html#create-a-page"}},[t._v("create a page")]),t._v(" in your Entando Application on which to place the Strapi Content Widget")],1),t._v(" "),o("li",[t._v("Go to  "),o("code",[t._v("App Builder")]),t._v(" → "),o("code",[t._v("Pages")]),t._v(" → "),o("code",[t._v("Management")])]),t._v(" "),o("li",[t._v("Find the Strapi content page in the page tree and click on the three dots representing the "),o("code",[t._v("Actions")]),t._v(" icon")]),t._v(" "),o("li",[t._v("Select "),o("code",[t._v("Design")]),t._v(" from the drop-down")]),t._v(" "),o("li",[t._v("Click on the "),o("code",[t._v("Widgets")]),t._v(" tab in the right panel and expand the "),o("code",[t._v("User")]),t._v(" section")]),t._v(" "),o("li",[t._v("Drag and drop the Strapi Content Widget into an empty frame in the Page Designer to load the configuration page")]),t._v(" "),o("li",[t._v("From the configuration page that loads from the Page Designer, click "),o("code",[t._v("Add existing content")])])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1215),alt:"content_config-page.png"}})]),t._v(" "),o("blockquote",[o("p",[t._v("Note: If you have not yet created the content you wish to place in your Entando Application, click "),o("code",[t._v("Add new content")]),t._v(" to be directed to the login for your Strapi dashboard. After creating the desired content, click "),o("code",[t._v("Add existing content")]),t._v(" to resume content management.")])]),t._v(" "),o("ol",{attrs:{start:"8"}},[o("li",[t._v("On the resultant page, select a collection type from the drop-down menu. These are returned by the Strapi API. Only one collection type can be selected.")])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1216),alt:"content_collection-type.png"}})]),t._v(" "),o("ol",{attrs:{start:"9"}},[o("li",[t._v("Select from the content related to this collection type, which can be filtered by keyword using the "),o("code",[t._v("Search")]),t._v(" field. Only one content can be selected.")])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1217),alt:"content_type-populated.png"}})]),t._v(" "),o("ol",{attrs:{start:"10"}},[o("li",[t._v("Click "),o("code",[t._v("Save")]),t._v(", which will redirect you back to the configuration page")]),t._v(" "),o("li",[t._v("Select a template from the drop-down menu, which calls the Strapi API to display only templates associated with the current content. Template selection is mandatory.")])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1218),alt:"content_select-template.png"}})]),t._v(" "),o("ol",{attrs:{start:"12"}},[o("li",[t._v("Click "),o("code",[t._v("Save")]),t._v(", which will redirect you back to the Page Designer for the content page")]),t._v(" "),o("li",[t._v("Click "),o("code",[t._v("Publish")])]),t._v(" "),o("li",[t._v("Click "),o("code",[t._v("View Published Page")]),t._v(" to see the data rendered on the content page")])]),t._v(" "),o("h2",{attrs:{id:"strapi-content-list-widget"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#strapi-content-list-widget"}},[t._v("#")]),t._v(" Strapi Content List Widget")]),t._v(" "),o("ol",[o("li",[t._v("Select a page or "),o("RouterLink",{attrs:{to:"/v7.2/tutorials/compose/page-management.html#create-a-page"}},[t._v("create a page")]),t._v(" in your Entando Application on which to place the Strapi Content List Widget")],1),t._v(" "),o("li",[t._v("Go to  "),o("code",[t._v("App Builder")]),t._v(" → "),o("code",[t._v("Pages")]),t._v(" → "),o("code",[t._v("Management")])]),t._v(" "),o("li",[t._v("Find the Strapi content list page in the page tree and click on the three dots representing the "),o("code",[t._v("Actions")]),t._v(" icon")]),t._v(" "),o("li",[t._v("Select "),o("code",[t._v("Design")]),t._v(" from the drop-down")]),t._v(" "),o("li",[t._v("Click on the "),o("code",[t._v("Widgets")]),t._v(" tab in the right panel and expand the "),o("code",[t._v("User")]),t._v(" section")]),t._v(" "),o("li",[t._v("Drag and drop the Strapi Content List Widget into an empty frame in the Page Designer")]),t._v(" "),o("li",[t._v("From the configuration page that loads from the Page Designer, click "),o("code",[t._v("Add existing content")])])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1219),alt:"content-list_config-page.png"}})]),t._v(" "),o("blockquote",[o("p",[t._v("Note: If you have not yet created the content you wish to place in your Entando Application, click "),o("code",[t._v("Add new content")]),t._v(" to be directed to the login for your Strapi dashboard. After creating the desired content, click "),o("code",[t._v("Add existing content")]),t._v(" to resume content management.")])]),t._v(" "),o("ol",{attrs:{start:"8"}},[o("li",[t._v("On the resultant page, select a collection type from the drop-down menu. These are returned by the Strapi API. Only one collection type can be selected.")])]),t._v(" "),o("ul",[o("li",[o("p",[t._v("To save all content related to this collection type as a query:")]),t._v(" "),o("ol",[o("li",[t._v("Leaving the checkboxes unchecked, click "),o("code",[t._v("Save as Query")])])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1220),alt:"content-list_query.png"}})])]),t._v(" "),o("li",[o("p",[t._v("To save a list of one or more contents:")]),t._v(" "),o("ol",[o("li",[t._v("Select from the content related to this collection type, which can be filtered by keyword using the "),o("code",[t._v("Search")]),t._v(" field. Multiple contents can be selected via the checkboxes.")])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1221),alt:"content-list_type-populated.png"}})]),t._v(" "),o("ol",{attrs:{start:"2"}},[o("li",[t._v("Click "),o("code",[t._v("Save as list of Contents")]),t._v(", which will redirect you back to the configuration page")]),t._v(" "),o("li",[t._v("For each content, select a template from the drop-down menu. Expanding the drop-down menu calls the Strapi API and displays only templates associated with the current content. Different templates can be selected for different content. Template selection is mandatory.")])]),t._v(" "),o("p",[o("img",{attrs:{src:n(1222),alt:"content-list_select-template.png"}})])])]),t._v(" "),o("ol",{attrs:{start:"9"}},[o("li",[t._v("Click "),o("code",[t._v("Save")]),t._v(", which will redirect you back to the Page Designer for the content list page")]),t._v(" "),o("li",[t._v("Click "),o("code",[t._v("Publish")])]),t._v(" "),o("li",[t._v("Click "),o("code",[t._v("View Published Page")]),t._v(" to see the data rendered on the content list page")])])])}),[],!1,null,null,null);e.default=a.exports}}]);