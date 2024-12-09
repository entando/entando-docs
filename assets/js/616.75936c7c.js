(window.webpackJsonp=window.webpackJsonp||[]).push([[616],{1841:function(e,t,a){"use strict";a.r(t);var s=a(36),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"install-bundle-plugins-from-a-private-image-repository"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-bundle-plugins-from-a-private-image-repository"}},[e._v("#")]),e._v(" Install Bundle Plugins from a Private Image Repository")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("The standard deployment of the Entando Component Repository assumes that plugin images are pulled from public repositories. Public repositores do not require user authentication in order to pull an image. The following tutorial will show you how to add secrets to your Kubernetes environment so you can successfully pull images from private repositories.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("A running Entando application")]),e._v(" "),a("li",[e._v("A bundle containing a microservice plugin based on an image from a private repository. You can set this up by "),a("RouterLink",{attrs:{to:"/v6.3/tutorials/backend-developers/generate-microservices-and-micro-frontends.html"}},[e._v("creating a microservice bundle")]),e._v(" and making the corresponding Docker Hub repository private.")],1)]),e._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),a("p",[e._v("The first step demontrates how to create a secret for Docker Hub but please see the "),a("a",{attrs:{href:"https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry",target:"_blank",rel:"noopener noreferrer"}},[e._v("corresponding Kubernetes documentation"),a("OutboundLink")],1),e._v(" for other options. Once you have the created the secret you can either apply it to a deployed Entando application or add it to the Helm template for a new deployment.")]),e._v(" "),a("p",[a("strong",[e._v("1. Create the secret")]),e._v("\nSupply the following parameters:")]),e._v(" "),a("ul",[a("li",[e._v("the name of the new secret, e.g. "),a("code",[e._v("my-docker-secret")]),e._v(".")]),e._v(" "),a("li",[e._v("the URL to your registry server. For Docker Hub this is currently "),a("a",{attrs:{href:"https://index.docker.io/v1/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://index.docker.io/v1/"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("your Docker Hub username, password, and email.")]),e._v(" "),a("li",[e._v("the Entando namespace, e.g. "),a("code",[e._v("entando")]),e._v(" for a quickstart environment.")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl create secret docker-registry "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your-secret-name"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" --docker-server"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your-registry-server"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" --docker-username"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your-name"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" --docker-password"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your-pword"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" --docker-email"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("your-email"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" -n entando\n")])])]),a("p",[a("strong",[e._v("2a. Update a deployed Entando application")])]),e._v(" "),a("p",[e._v("If you're updating a deployed Entando application(for example a quickstart environment), you can add the new secret to the "),a("code",[e._v("entando-plugin")]),e._v(" account. You'll need to supply your own namespace.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl edit serviceaccount entando-plugin -n entando\n")])])]),a("p",[e._v("Add the secret to the serviceaccount. You can either add a new section if it's the first secret or add another secret to the list.")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("imagePullSecrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" your"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("secret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("name\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" ServiceAccount\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" \n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("plugin\n")])])]),a("p",[e._v("If you describe the serviceaccount, it should list the secret.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl describe serviceaccount entando-plugin -n entando\n")])])]),a("p",[a("em",[e._v("Output:")])]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("                entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("plugin\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Namespace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("           entando\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Image pull secrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("  your"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("secret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("name\n")])])]),a("p",[e._v("If "),a("code",[e._v("(not found)")]),e._v(" is listed next to the secret name, then you may have added the secret to the wrong namespace.")]),e._v(" "),a("p",[a("strong",[e._v("2b. Deploy a new Entando application")])]),e._v(" "),a("p",[e._v("If you're setting up a new Entando deployment by using an Entando Helm template (e.g. from the entando-helm-quickstart project), you can add the secret to the "),a("code",[e._v("values.yaml")]),e._v(" file under the property "),a("code",[e._v("operator.imagePullSecrets")]),e._v(". This is just a list containing the names of Docker secrets in the operator's namespace.")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[e._v("<snip"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("operator")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" \n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("imagePullSecrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" your"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("secret"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("name\n<snip"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n")])])]),a("p",[e._v("You can now generate the deployment yaml and deploy it to Kubernetes as usual.")]),e._v(" "),a("p",[a("strong",[e._v("3. Install the Entando Bundle")])]),e._v(" "),a("p",[e._v("You can now install the Entando Bundle from the "),a("code",[e._v("Entando App Builder")]),e._v(" → "),a("code",[e._v("Entando Component Repository")]),e._v(". The microservice plugin should now be able to successfully pull the image.")]),e._v(" "),a("h2",{attrs:{id:"troubleshooting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[e._v("#")]),e._v(" Troubleshooting")]),e._v(" "),a("p",[e._v("This is the kind of error you'll see from "),a("code",[e._v("kubectl get pods")]),e._v(" if a plugin is based on an image from a private repository and if there are any issues with the image URL or credentials, including a missing or incorrect secret.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("NAME                                                            READY   STATUS         \nMYUSERNAME-MYPLUGIN-0-0-2-server-deployment-657688c5x8tfb       "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("/2     ErrImagePull \n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);