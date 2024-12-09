(window.webpackJsonp=window.webpackJsonp||[]).push([[600],{1832:function(t,e,a){"use strict";a.r(e);var n=a(36),o=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"tutorial-connecting-to-an-external-database"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial-connecting-to-an-external-database"}},[t._v("#")]),t._v(" Tutorial: Connecting to an External Database")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("This document provides a guide to connecting to an external database. In\nmany (not all) production configurations it is recommended to use a DBMS\noutside of the cluster where your Entando applicaiton is running to\nsimplify maintenance, duplication of resources, and to establish a\nbackup workflow that will scale with your application.")]),t._v(" "),a("p",[t._v("See "),a("RouterLink",{attrs:{to:"/v6.3/docs/reference/databases.html"}},[t._v("Databases")]),t._v(" for other details on Entando databases.")],1),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("An environment to install your Entando applicaiton")])]),t._v(" "),a("li",[a("p",[t._v("A running PostgreSQL, MySQL, or Oracle environment")])]),t._v(" "),a("li",[a("p",[t._v("Administrator access to the database")])]),t._v(" "),a("li",[a("p",[t._v("Network access from your Kubernetes cluster to your database")])])]),t._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[t._v("#")]),t._v(" Tutorial")]),t._v(" "),a("ol",[a("li",[t._v("In the helm quickstart define a db for your deployment that includes\nthe admin credentials for your database")])]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("db:\n  vendor: postgresql | mysql | oracle\n  host: <yourhost>\n  port: <yourport>\n  adminUser: <youradmin>\n  adminPassword: <youradminpassword>\n  name: <yourdbname>\n")])])]),a("ol",[a("li",[a("p",[t._v("Run the helm quickstart or create a deployment for your Entando\nenvironment manually")]),t._v(" "),a("ol",[a("li",[t._v("Note: The quickstart creates a default configuration for the\ndeployment. This isn’t to suggest that it is the only\nconfiguration or that it matches with every use case. It is\nrecommended to think about your desired deployment Architecture\nand to configure for that environment using the CRDs as building\nblocks. This also isn’t to suggest that if it isn’t directly\nsupported by the quickstart template that you can’t change it.\nThe deployment is editable. Treat the helm template as a\nbootstrapping environment and edit your deployments to match\nyour needs and requirements.")])])]),t._v(" "),a("li",[a("p",[t._v("Open the yaml file generated from the deployment and review the\nsettings for the deployment")]),t._v(" "),a("ol",[a("li",[t._v("The Entando Operator will create a secret for the database\nautomatically and use the DB initializers to create the DB for\nthe Entando app and any services that use it")])])]),t._v(" "),a("li",[a("p",[t._v("Deploy your app")])])])])}),[],!1,null,null,null);e.default=o.exports}}]);