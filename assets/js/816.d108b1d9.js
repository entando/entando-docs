(window.webpackJsonp=window.webpackJsonp||[]).push([[816],{2147:function(e,t,a){"use strict";a.r(t);var s=a(36),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"install-microservices-from-a-private-image-registry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-microservices-from-a-private-image-registry"}},[e._v("#")]),e._v(" Install Microservices from a Private Image Registry")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("The standard deployment of Entando assumes that microservice images are pulled from public repositories. Private repositores require user authentication to pull an image. The following tutorial describes how to add Secrets to your Kubernetes environment to successfully pull images from private repositories.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("A running Entando Application")]),e._v(" "),a("li",[e._v("A bundle containing a microservice plugin based on an image from a private repository. You can set this up by "),a("RouterLink",{attrs:{to:"/v7.2/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("creating a microservice bundle")]),e._v(" and making the corresponding Docker Hub repository private.")],1)]),e._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),a("p",[e._v("The first step demonstrates how to create a Secret for Docker Hub. See the "),a("a",{attrs:{href:"https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry",target:"_blank",rel:"noopener noreferrer"}},[e._v("corresponding Kubernetes documentation"),a("OutboundLink")],1),e._v(" for other options.")]),e._v(" "),a("blockquote",[a("p",[e._v("Note: Use the "),a("RouterLink",{attrs:{to:"/v7.2/docs/getting-started/entando-cli.html"}},[e._v("ent CLI")]),e._v(" to send commands to Kubernetes from the host machine.")],1)]),e._v(" "),a("p",[a("strong",[e._v("1. Create the secret")]),e._v("\nSupply the following parameters:")]),e._v(" "),a("ul",[a("li",[e._v("The name of the new Secret, e.g. "),a("code",[e._v("my-docker-secret")])]),e._v(" "),a("li",[e._v("The URL to your registry server. For Docker Hub, this is currently "),a("code",[e._v("https://registry.hub.docker.com/")]),e._v(".")]),e._v(" "),a("li",[e._v("Your Docker Hub username, password, and email")]),e._v(" "),a("li",[e._v("The Entando namespace, e.g. "),a("code",[e._v("entando")]),e._v(" for a quickstart environment")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl create secret docker-registry YOUR-SECRET-NAME --docker-server"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("YOUR-REGISTRY-SERVER --docker-username"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("YOUR-USERNAME --docker-password"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("YOUR-PASSWORD --docker-email"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("YOUR-EMAIL -n entando\n")])])]),a("p",[a("strong",[e._v("2a. Deploy a new Entando Application")])]),e._v(" "),a("p",[e._v("If you're setting up a new Entando Application, you can "),a("RouterLink",{attrs:{to:"/v7.2/tutorials/consume/entando-operator.html"}},[e._v("add the Secret to the Entando Operator ConfigMap")]),e._v(" under the property "),a("code",[e._v("entando.k8s.operator.image.pull.secrets")]),e._v(". This is just a list containing the names of Docker Secrets in the operator's namespace.")],1),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" \n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("entando.k8s.operator.image.pull.secrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("SECRET"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("NAME"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n")])])]),a("p",[a("strong",[e._v("2b. Update an existing Entando Application")])]),e._v(" "),a("p",[e._v("If you're updating an existing Entando Application, you can add the new Secret to the "),a("code",[e._v("entando-plugin")]),e._v(" serviceaccount.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl edit serviceaccount entando-plugin -n entando\n")])])]),a("p",[e._v("Add the Secret to the serviceaccount. You can either add a new section if it's the first Secret or add another Secret to the list.")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("imagePullSecrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("SECRET"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("NAME\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" ServiceAccount\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("plugin\n")])])]),a("p",[e._v("If you describe the serviceaccount, it should list the Secret.")]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl describe serviceaccount entando-plugin -n entando\n")])])]),a("p",[a("em",[e._v("Output:")])]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("                entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("plugin\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Namespace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("           entando\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("Image pull secrets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("  YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("SECRET"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("NAME\n")])])]),a("p",[e._v("If "),a("code",[e._v("(not found)")]),e._v(" is listed next to the Secret name, then you may have added the Secret to the wrong namespace.")]),e._v(" "),a("p",[a("strong",[e._v("3. Install the Entando Bundle")])]),e._v(" "),a("p",[e._v("You can now install Entando Bundles from the "),a("code",[e._v("Entando App Builder")]),e._v(" → "),a("code",[e._v("Hub")]),e._v(". The microservice plugin should be able to successfully pull the image.")]),e._v(" "),a("h2",{attrs:{id:"troubleshooting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[e._v("#")]),e._v(" Troubleshooting")]),e._v(" "),a("p",[e._v("You may see an "),a("code",[e._v("ErrImagePull")]),e._v(" status in "),a("code",[e._v("kubectl get pods")]),e._v(" if a plugin is based on an image from a private repository and there are issues with the image URL or credentials, including a missing or incorrect Secret.")])])}),[],!1,null,null,null);t.default=r.exports}}]);