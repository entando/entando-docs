(window.webpackJsonp=window.webpackJsonp||[]).push([[257],{1748:function(e,t,a){"use strict";a.r(t);var n=a(36),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"update-the-project-data-model"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#update-the-project-data-model"}},[e._v("#")]),e._v(" Update the Project Data Model")]),e._v(" "),n("h2",{attrs:{id:"overview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),n("p",[e._v("This tutorial shows how you can use the Entando Component Generator powered by "),n("a",{attrs:{href:"https://www.jhipster.tech/",target:"_blank",rel:"noopener noreferrer"}},[e._v("JHipster"),n("OutboundLink")],1),e._v(" to quickly update the data model for your Entando project.")]),e._v(" "),n("h2",{attrs:{id:"prerequisites"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),n("p",[e._v("The steps below assume you already have an existing project and are working in the top-level project directory. If you don't have a project yet, please see "),n("RouterLink",{attrs:{to:"/v6.3.2/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("this tutorial")]),e._v(".")],1),e._v(" "),n("h2",{attrs:{id:"tutorial"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),n("ol",[n("li",[e._v("Start by extracting the current application description using JHipster. The resulting JHIpster Domain Language (JDL) file includes the entity definitions that will be used as a starting point for your design work.")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("ent jhipster export-jdl export.jdl\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[e._v("This file contains the application configuration as well as entity definitions for your project. For simplicity, we'll create a new file containing just the elements describing the entities. If you followed the tutorial above, that section could be as simple as this:")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("entity Conference {\n  name String\n}\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[e._v("You can now take this definition and enhance it by adding fields, additional entities, mappings between tables, field validation, etc. The easiest way to do this is by using the online JDL-Studio or corresponding JHipster IDE plugins/extensions. See "),n("a",{attrs:{href:"https://www.jhipster.tech/jdl/",target:"_blank",rel:"noopener noreferrer"}},[e._v("the JHipster docs"),n("OutboundLink")],1),e._v(" for more information on those options. Once you're done enhancing your data model, you should create a new file containing it, e.g. "),n("code",[e._v("conference.jdl.")])])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("entity Conference {\n  name String required\n  location String\n  date ZonedDateTime\n}\n\nentity Session {\n  name String required\n  track Track required\n}\n\nenum Track {\n  BUSINESS, TECHNICAL\n}\n\nrelationship OneToMany {\n   Conference to Session\n}\n")])])]),n("p",[e._v("In this case we've added two fields to the Conference entity, introduced the Session entity plus an enum, and added a mapping between the two entities. This is the view you'll get in JDL-Studio for the updated data model.")]),e._v(" "),n("p",[n("img",{attrs:{src:a(800),alt:"conference.jdl"}})]),e._v(" "),n("ol",{attrs:{start:"4"}},[n("li",[e._v("Now import the jdl file into your application. You may be asked if you want to generate MFEs depended on your options when first generating the project.")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("ent jhipster import-jdl conference.jdl\n")])])]),n("p",[e._v("If you kept the original project structure, this step will update your data model, add entries to Liquibase so the database schema can be upgraded at deploy time, add new service methods to your microservice, add fields to your MFEs, etc.")]),e._v(" "),n("ol",{attrs:{start:"5"}},[n("li",[e._v("You can now build your updated project and "),n("RouterLink",{attrs:{to:"/v6.3.2/tutorials/create/ms/run-local.html"}},[e._v("run it locally")]),e._v(" or "),n("RouterLink",{attrs:{to:"/v6.3.2/tutorials/create/pb/publish-project-bundle.html"}},[e._v("deploy it to Entando")]),e._v(". For a full local test you can use the following commands to build the project, then start Keycloak, the microservices, and one of the MFEs.")],1)]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("ent prj build\nent prj xk start\nent prj be-test-run\nent prj fe-test-run\n")])])]),n("p",[e._v("You can repeat steps 3-5 as many times as needed throughout the life of your project.")])])}),[],!1,null,null,null);t.default=r.exports},800:function(e,t,a){e.exports=a.p+"assets/img/jhipster-jdl.613b27ea.png"}}]);