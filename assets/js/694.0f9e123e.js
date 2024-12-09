(window.webpackJsonp=window.webpackJsonp||[]).push([[694],{1973:function(e,t,a){"use strict";a.r(t);var n=a(36),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"troubleshooting-ecr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting-ecr"}},[e._v("#")]),e._v(" Troubleshooting ECR")]),e._v(" "),a("h2",{attrs:{id:"how-do-i-access-the-logs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-access-the-logs"}},[e._v("#")]),e._v(" How do I access the logs?")]),e._v(" "),a("p",[a("strong",[e._v("A bundle installation or removal has failed. How do I access the logs?")])]),e._v(" "),a("p",[e._v("The Entando Component Manager (CM) logs can be viewed using CLI tools like kubectl or oc, or visualization dashboards like OpenShift or K9s.")]),e._v(" "),a("h3",{attrs:{id:"solution"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solution"}},[e._v("#")]),e._v(" Solution")]),e._v(" "),a("ol",[a("li",[e._v("To view the Component Manager logs, find the CM pod name in your instance:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ent kubectl get pods\n")])])]),a("p",[e._v("It will be something like this: "),a("code",[e._v("quickstart-cm-deployment-7f74757f97-xnlbn")])]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Using your CM pod name and namespace, use this command to view the logs:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ent kubectl logs -f YOUR-PODNAME-7f74757f97-xnlbn -n YOUR-NAMESPACE\n")])])]),a("blockquote",[a("p",[e._v("Notes:")]),e._v(" "),a("ol",[a("li",[e._v("Use the "),a("RouterLink",{attrs:{to:"/v7.1/docs/getting-started/entando-cli.html"}},[e._v("ent CLI")]),e._v(" to send commands directly to Kubernetes from the host machine.")],1),e._v(" "),a("li",[e._v("The "),a("code",[e._v("-f")]),e._v(" flag is optional and used to follow the logs for debugging purposes. The namespace (-n) is also optional if ent has a profile configured.")])])]),e._v(" "),a("h2",{attrs:{id:"error-file-not-found-in-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#error-file-not-found-in-bundle"}},[e._v("#")]),e._v(" ERROR - File not found in bundle")]),e._v(" "),a("p",[a("strong",[e._v("Installation fails because a file has not been found in the bundle")])]),e._v(" "),a("p",[e._v("When a component referenced in the entando.json is missing or not properly called, the bundle installation fails and the error is reported in the logs.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ERROR - File with name {filename} not found in the bundle\n")])])]),a("h3",{attrs:{id:"solution-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solution-2"}},[e._v("#")]),e._v(" Solution")]),e._v(" "),a("p",[e._v("Verify that the component named in the descriptor file is actually at the specified location and the reference is properly formatted. Then, publish the updated bundle with "),a("code",[e._v("ent bundle publish")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"my-plugin-docker-image-is-unreachable"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#my-plugin-docker-image-is-unreachable"}},[e._v("#")]),e._v(" My plugin Docker image is unreachable")]),e._v(" "),a("p",[a("strong",[e._v("Bundle installation fails due to plugin images that are not reachable")])]),e._v(" "),a("p",[e._v("A bundle installation does not complete successfully because a plugin in a bundle, defined by a Docker image, is not available.")]),e._v(" "),a("h3",{attrs:{id:"solution-3"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solution-3"}},[e._v("#")]),e._v(" Solution")]),e._v(" "),a("p",[e._v("This may happen if the Docker image for the plugin is located in a private registry or not yet published. Verify that the Docker image you are referencing is published, correctly formatted, and publicly available. Then, publish the updated bundle with "),a("code",[e._v("ent bundle publish")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"how-do-i-uninstall-a-bundle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-i-uninstall-a-bundle"}},[e._v("#")]),e._v(" How do I uninstall a bundle")]),e._v(" "),a("p",[a("strong",[e._v("I can't uninstall a bundle because some components are in use")])]),e._v(" "),a("p",[e._v("When uninstalling an installed bundle, the Entando Component Manager verfies that the bundle components are not in use by any other component. An error message informs you and does not allow the removal.")]),e._v(" "),a("h3",{attrs:{id:"solution-4"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#solution-4"}},[e._v("#")]),e._v(" Solution")]),e._v(" "),a("p",[e._v("A bundle cannot be uninstalled if any of its components are in use. To uninstall the bundle, the user must manually remove all references to it and all its component.")])])}),[],!1,null,null,null);t.default=o.exports}}]);