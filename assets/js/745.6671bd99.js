(window.webpackJsonp=window.webpackJsonp||[]).push([[745],{2041:function(e,t,s){"use strict";s.r(t);var a=s(36),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"manage-nginx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manage-nginx"}},[e._v("#")]),e._v(" Manage NGINX")]),e._v(" "),s("p",[e._v("There are environments where it's useful to use NGINX rather than the default ingress controller. This page shows how to verify and refine your NGINX configuration.")]),e._v(" "),s("p",[e._v("See the following install guides if needed:")]),e._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/v7.1/tutorials/getting-started/eks-install.html"}},[e._v("Amazon Elastic Kubernetes Service (EKS)")])],1),e._v(" "),s("li",[s("RouterLink",{attrs:{to:"/v7.1/tutorials/getting-started/azure-install.html"}},[e._v("Azure Kubernetes Service (AKS)")])],1),e._v(" "),s("li",[s("RouterLink",{attrs:{to:"/v7.1/tutorials/getting-started/gke-install.html"}},[e._v("Google Kubernetes Engine (GKE)")])],1)]),e._v(" "),s("h2",{attrs:{id:"verify-the-nginx-ingress-install"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#verify-the-nginx-ingress-install"}},[e._v("#")]),e._v(" Verify the NGINX Ingress Install")]),e._v(" "),s("p",[e._v("To verify that the ingress is working properly you can set up a test application.")]),e._v(" "),s("ol",[s("li",[e._v("Create a simple application:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl create deployment hello-server --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("Expose the "),s("code",[e._v("hello-app")]),e._v(" deployment as a Service:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl expose deployment hello-server --type LoadBalancer --port 80 --target-port 8080\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("Create this "),s("code",[e._v("ingress-resource.yaml")]),e._v(" file:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ingress-resource\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    nginx.ingress.kubernetes.io/ssl-redirect: "false"\nspec:\n  rules:\n  - http:\n      paths:\n      - path: /hello\n        pathType: Prefix\n        backend:\n          service:\n            name: hello-server\n            port: \n              number: 80\n')])])]),s("ol",{attrs:{start:"4"}},[s("li",[e._v("Create the Ingress Resource:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl apply -f ingress-resource.yaml\n")])])]),s("ol",{attrs:{start:"5"}},[s("li",[e._v("Verify that the Ingress Resource has been created:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl get ingress ingress-resource\n")])])]),s("p",[e._v("It may take several minutes to populate the "),s("code",[e._v("Address")]),e._v(".")]),e._v(" "),s("ol",{attrs:{start:"6"}},[s("li",[e._v("Verify access to the web application using the "),s("code",[e._v("EXTERNAL-IP/hello")]),e._v(" address of the "),s("code",[e._v("nginx-ingress-controller")]),e._v(". You should see the following:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("Hello, world!\nVersion: 1.0.0\nHostname: hello-app\n")])])]),s("p",[e._v("Note that you will need the EXTERNAL-IP address of your ingress controller to configure the application.")]),e._v(" "),s("ol",{attrs:{start:"7"}},[s("li",[e._v("Verify that you configured the ingress class in the Operator "),s("code",[e._v("ConfigMap")]),e._v(" so Entando knows which ingress controller should be used:")])]),e._v(" "),s("p",[s("code",[e._v('entando.ingress.class: "nginx"')])]),e._v(" "),s("ol",{attrs:{start:"8"}},[s("li",[e._v("To reduce costs, remove the test deployment, service, and ingress:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl delete deploy/hello-server service/hello-server ing/ingress-resource\n")])])]),s("h2",{attrs:{id:"customize-the-nginx-configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#customize-the-nginx-configuration"}},[e._v("#")]),e._v(" Customize the NGINX Configuration")]),e._v(" "),s("p",[e._v("There are situations where the default NGINX ingress configuration isn't optimized for Entando, e.g. JWT tokens can be too large or "),s("code",[e._v("proxy-buffer-size")]),e._v(" can be too small. A "),s("code",[e._v("502 Bad Gateway")]),e._v(" error may indicate that the config needs to be modified.")]),e._v(" "),s("p",[e._v("The NGINX controller can be configured for the entire cluster by editing the default NGINX "),s("code",[e._v("ConfigMap")]),e._v(", called "),s("code",[e._v("ingress-nginx-controller")]),e._v(" in the "),s("code",[e._v("ingress-nginx")]),e._v(" namespace. Add the following to the data parameter:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('apiVersion: v1\ndata:\n  allow-snippet-annotations: "true"\n  proxy-buffer-size: 24k\nkind: ConfigMap\n')])])]),s("p",[e._v("Production environments may require additional common annotations:")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('nginx.ingress.kubernetes.io/client-max-body-size: 200m # the maximum allowed size of the client request body (default is 1m)\nnginx.ingress.kubernetes.io/proxy-body-size: 200m # to upload large files (default is 10m)\nnginx.ingress.kubernetes.io/proxy-buffer-size: 64k # for the Keycloak auth-token (default is 4k)\nnginx.ingress.kubernetes.io/proxy-read-timeout: "600" # to increase the timeout (in seconds) when uploading large files\n')])])]),s("p",[e._v("Sticky sessions may be useful for "),s("code",[e._v("entando-de-app")]),e._v(" deployments with multiple replicas. If you "),s("RouterLink",{attrs:{to:"/v7.1/tutorials/consume/high-avail-tutorial.html#clustering"}},[e._v("set up clustering")]),e._v(", the following options enable sticky sessions in NGINX:")],1),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('nginx.ingress.kubernetes.io/affinity: cookie\nnginx.ingress.kubernetes.io/affinity-mode: persistent\nnginx.ingress.kubernetes.io/session-cookie-name: ROUTE\nnginx.ingress.kubernetes.io/session-cookie-secure: "true"\n')])])]),s("h2",{attrs:{id:"add-the-cert-manager-for-tls-support"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#add-the-cert-manager-for-tls-support"}},[e._v("#")]),e._v(" Add the "),s("code",[e._v("cert-manager")]),e._v(" for TLS Support")]),e._v(" "),s("p",[e._v("Follow the instructions below to install and configure "),s("code",[e._v("cert-manager")]),e._v(" in Kubernetes environments.\n​")]),e._v(" "),s("h3",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),s("p",[e._v("​\nCreate a namespace dedicated to "),s("code",[e._v("cert-manager")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl create ns cert-manager\n")])])]),s("p",[e._v("​\nComplete the installation:")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[e._v("kubectl apply "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("f https"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//github.com/jetstack/cert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager/releases/download/v1.7.0/cert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.yaml\n")])])]),s("h3",{attrs:{id:"configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),s("p",[e._v("​\nTo enable "),s("code",[e._v("cert-manager")]),e._v(" to generate certificates, add these annotations to the ingress:\n​")]),e._v(" "),s("ul",[s("li",[s("code",[e._v('cert-manager.io/issuer: "[name of the issuer]"')]),e._v(" for namespace-based issuers")]),e._v(" "),s("li",[s("code",[e._v('cert-manager.io/cluster-issuer: "[name of cluster issuer]"')]),e._v(" for cluster-wide issuers")])]),e._v(" "),s("p",[e._v("and modify "),s("code",[e._v("spec")]),e._v(":")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("tls")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("hosts")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" example.example.com\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("secretName")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" quickstart"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("example"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("tls "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# this Secret will be autogenereted by cert-manager.")]),e._v("\n")])])]),s("h4",{attrs:{id:"namespace-level-issuer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#namespace-level-issuer"}},[e._v("#")]),e._v(" Namespace Level Issuer")]),e._v(" "),s("p",[e._v("​\nUse the following configuration when deploying an issuer per namespace. This is useful for higher levels of customization.\n​")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.io/v1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Issuer\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("acme")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The ACME server URL")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("server")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" https"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//acme"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("v02.api.letsencrypt.org/directory\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("preferredChain")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ISRG Root X1"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Email address used for ACME registration")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <your email"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Name of a secret used to store the ACME account privare key")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("privateKeySecretRef")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Enable the http-01 challenge provider")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("solvers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("http01")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("ingress")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" nginx\n​\n")])])]),s("h4",{attrs:{id:"cluster-level-issuer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cluster-level-issuer"}},[e._v("#")]),e._v(" Cluster Level Issuer")]),e._v(" "),s("p",[e._v("Use the following configuration when deploying an issuer per cluster:")]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.io/v1\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" ClusterIssuer\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("cluster\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("namespace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("acme")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The ACME server URL")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("server")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" https"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//acme"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("v02.api.letsencrypt.org/directory\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("preferredChain")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ISRG Root X1"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Email address used for ACME registration")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("email")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <your email"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Name of a secret used to store the ACME account privare key")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("privateKeySecretRef")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("cluster"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Enable the http-01 challenge provider")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("solvers")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("http01")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("ingress")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("class")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" nginx\n​\n")])])]),s("h3",{attrs:{id:"cert-manager-references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cert-manager-references"}},[e._v("#")]),e._v(" "),s("code",[e._v("cert-manager")]),e._v(" References")]),e._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"https://cert-manager.io/docs/installation/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Installation"),s("OutboundLink")],1)]),e._v(" "),s("li",[s("a",{attrs:{href:"https://cert-manager.io/docs/installation/supported-releases/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Supported releases"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=n.exports}}]);