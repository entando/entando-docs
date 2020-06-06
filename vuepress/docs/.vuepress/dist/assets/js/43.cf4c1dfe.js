(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{428:function(e,a,t){"use strict";t.r(a);var o=t(41),r=Object(o.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"building-a-docker-image-for-the-entando-core"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#building-a-docker-image-for-the-entando-core"}},[e._v("#")]),e._v(" Building a Docker Image for the Entando Core")]),e._v(" "),t("h2",{attrs:{id:"prerequisites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Java 8")])]),e._v(" "),t("li",[t("p",[e._v("Docker installed locally\n("),t("a",{attrs:{href:"https://docs.docker.com/docker-for-windows/install/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.docker.com/docker-for-windows/install/"),t("OutboundLink")],1),e._v(")")])]),e._v(" "),t("li",[t("p",[e._v("maven")])]),e._v(" "),t("li",[t("p",[e._v("Access to a docker repository (docker.io or other)")])])]),e._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("p",[e._v("This tutorial will take you through the basic steps to create a docker\nimage from an Entando core application. A more detailed guide with\nadditional commands and configuration can be found here:")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/entando-k8s/entando-sample-app",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-sample-app"),t("OutboundLink")],1)]),e._v(" "),t("h2",{attrs:{id:"setup"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#setup"}},[e._v("#")]),e._v(" Setup")]),e._v(" "),t("ol",[t("li",[t("p",[e._v("Clone the application at:\n"),t("a",{attrs:{href:"https://github.com/entando-k8s/entando-sample-app",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-sample-app"),t("OutboundLink")],1),e._v(" using")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("git clone https://github.com/entando-k8s/entando-sample-app\n")])])])]),e._v(" "),t("li",[t("p",[e._v("On a command line, cd into the entando-sample-app you just cloned:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("cd entando-sample-app\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Build a docker image from the core app")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("mvn clean package -Pwildfly -Pderby docker:build\n")])])])]),e._v(" "),t("li",[t("p",[e._v("View the images installed on your local docker instance")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("docker images\n")])])]),t("p",[e._v("Look for")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("entando/entando-sample-app:latest\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Create a repository on your docker repository to house your new\napplication")])]),e._v(" "),t("li",[t("p",[e._v("Re-tag the image you just built with your repo")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v(" docker tag entando/entando-sample-app:latest [your-user]/[your-repo-name]:latest\n")])])])]),e._v(" "),t("li",[t("p",[e._v("Push the Image to your Repository")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("docker push [your-user]/[your-repo-name]:latest\n")])])])])])])}),[],!1,null,null,null);a.default=r.exports}}]);