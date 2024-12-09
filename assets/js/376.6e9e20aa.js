(window.webpackJsonp=window.webpackJsonp||[]).push([[376],{1492:function(e,t,a){"use strict";a.r(t);var n=a(36),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"configure-the-entando-operator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-entando-operator"}},[e._v("#")]),e._v(" Configure the Entando Operator")]),e._v(" "),a("p",[e._v("This tutorial demonstrates how to provide the Entando Operator with a ConfigMap to customize its behavior. See the template file below for possible settings related to image timeouts, TLS/SSL configuration, and the default image repository. Some specific tutorials (e.g. "),a("RouterLink",{attrs:{to:"/next/tutorials/devops/plugin-configuration.html"}},[e._v("Plugin Configuration Profiles")]),e._v(") also require updates to the Entando Operator configuration.")],1),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("The Entando Operator makes use of an optional ConfigMap named "),a("code",[e._v("entando-operator-config")]),e._v(". The ConfigMap must be present in the same namespace as the operator. In a quickstart environment, you can check for its presence with this command:")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl get configmap -n entando\n")])])]),a("h2",{attrs:{id:"add-a-new-configmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-a-new-configmap"}},[e._v("#")]),e._v(" Add a new ConfigMap")]),e._v(" "),a("p",[e._v("If the ConfigMap doesn't already exist, you can use a template as a starting point.")]),e._v(" "),a("EntandoCode",[e._v('curl -sfL "https://raw.githubusercontent.com/entando/entando-releases/'+e._s(e.$site.themeConfig.entando.fixpack.v73)+'/dist/ge-1-1-6/samples/entando-operator-config.yaml"')]),e._v(" "),a("p",[e._v("Edit "),a("code",[e._v("entando-operator-config.yaml")]),e._v(" to adjust existing settings or add new ones. You can then apply it to Kubernetes.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl apply -f entando-operator-config.yaml -n entando\n")])])]),a("p",[e._v("The Entando Operator automatically reloads settings from the ConfigMap when the ConfigMap is created. You can verify the reload by checking the logs in the operator pod.")]),e._v(" "),a("h2",{attrs:{id:"update-an-existing-configmap"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#update-an-existing-configmap"}},[e._v("#")]),e._v(" Update an existing ConfigMap")]),e._v(" "),a("p",[e._v("You can edit an existing ConfigMap to add or update settings.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl edit configmap/entando-operator-config -n entando\n")])])]),a("p",[e._v("The Entando Operator automatically reloads settings from the ConfigMap whenever it is modified. You can verify the reload by checking the logs in the operator pod. Some settings may only take effect when a deployment is first created, e.g. timeout settings or CPU limits.")])],1)}),[],!1,null,null,null);t.default=o.exports}}]);