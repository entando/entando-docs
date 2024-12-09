(window.webpackJsonp=window.webpackJsonp||[]).push([[273],{1863:function(e,t,n){"use strict";n.r(t);var a=n(36),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"entando-component-repository"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-component-repository"}},[e._v("#")]),e._v(" Entando Component Repository")]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("The Entando Component Repository (ECR) is a repository where\nreusable components can be shared across applications and enterprises.")]),e._v(" "),a("p",[e._v("The following examines some of the nuts and bolts of the ECR.")]),e._v(" "),a("h3",{attrs:{id:"component"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#component"}},[e._v("#")]),e._v(" Component")]),e._v(" "),a("p",[e._v("An Entando component - simply referred to as component - is an identifiable resource or block of\ncode that can be used in an Entando widget, page or\napplication. Examples of components are widgets, micro frontends,\ncontent types, labels, plugins, and static resources.")]),e._v(" "),a("h3",{attrs:{id:"ecr-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ecr-bundle"}},[e._v("#")]),e._v(" ECR Bundle")]),e._v(" "),a("p",[e._v("An ECR bundle is a package containing one or more components and a\ndescriptor.yaml file providing information about the bundle. The\nbundle is published in a Git registry and shared with an Entando\nApplication using the EntandoDeBundle custom resource.")]),e._v(" "),a("h3",{attrs:{id:"entandodebundle-custom-resource"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entandodebundle-custom-resource"}},[e._v("#")]),e._v(" EntandoDeBundle Custom Resource")]),e._v(" "),a("p",[e._v("The EntandoDeBundle custom resource is a Kubernetes resource\nreadable by the Entando Operator. It provides information\nabout an ECR bundle and makes the bundle available in Kubernetes for the\nEntando Component Manager.")]),e._v(" "),a("h3",{attrs:{id:"entando-component-manager-ecm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-component-manager-ecm"}},[e._v("#")]),e._v(" Entando Component Manager (ECM)")]),e._v(" "),a("p",[e._v("The Entando Component Manager is part of the\nEntandoApp and communicates with both the "),a("code",[e._v("entando-core")]),e._v(" and Kubernetes cluster via the "),a("code",[e._v("entando-k8s-service")]),e._v(". The ECM reads the bundles from the cluster and exposes them with an API accessible from the App Builder. It is\nalso responsible for the installation and removal of components from the "),a("code",[e._v("entando-core")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"entando-k8s-service"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#entando-k8s-service"}},[e._v("#")]),e._v(" Entando-K8s-Service")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("entando-k8S-service")]),e._v(" is part of the platform infrastructure and is\nresponsible for the low-level communication with the K8s cluster API.")]),e._v(" "),a("h2",{attrs:{id:"architecture"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#architecture"}},[e._v("#")]),e._v(" Architecture")]),e._v(" "),a("p",[a("img",{attrs:{src:n(916),alt:"ECR Architecture"}})]),e._v(" "),a("p",[e._v("From an architectural point of view, the ECR is composed of:")]),e._v(" "),a("ol",[a("li",[e._v("The "),a("code",[e._v("EntandoDeBundles")]),e._v(" which contain the metadata associated with a bundle")]),e._v(" "),a("li",[e._v("The "),a("code",[e._v("entando-k8s-service")]),e._v(" which reads the bundles from the\ncluster/namspace(s) and serves them via a consumable API")]),e._v(" "),a("li",[e._v("The ECM which creates the connection between the EntandoApp\nand the K8s service.")])]),e._v(" "),a("h3",{attrs:{id:"example-flow"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-flow"}},[e._v("#")]),e._v(" Example Flow")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("From the Repository page in the App Builder, the user finds the\nlist of bundles shared in that EntandoApp")])]),e._v(" "),a("li",[a("p",[e._v("App Builder requests a list of available bundles from the ECM")])]),e._v(" "),a("li",[a("p",[e._v("ECM queries the K8s service to retrieve a list of\nbundles")])]),e._v(" "),a("li",[a("p",[e._v("The "),a("code",[e._v("entando-k8s-service")]),e._v(" queries the cluster/namespace(s)\nfor available bundles and returns the list to the ECM")])]),e._v(" "),a("li",[a("p",[e._v("ECM sends the list to App Builder")])]),e._v(" "),a("li",[a("p",[e._v("The user is able to see and install the available bundles")])])])])}),[],!1,null,null,null);t.default=o.exports},916:function(e,t,n){e.exports=n.p+"assets/img/ecr-architecture.1101d571.png"}}]);