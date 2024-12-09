(window.webpackJsonp=window.webpackJsonp||[]).push([[565],{1768:function(e,t,a){"use strict";a.r(t);var s=a(36),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"manage-nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manage-nginx"}},[e._v("#")]),e._v(" Manage NGINX")]),e._v(" "),a("p",[e._v("There are environments where it's useful to use NGINX rather than the default ingress controller. This page shows how to verify and refine your NGINX configuration.")]),e._v(" "),a("p",[e._v("See the following install guides if needed:")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/getting-started/eks-install.html"}},[e._v("Amazon Elastic Kubernetes Service (EKS)")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/getting-started/azure-install.html"}},[e._v("Azure Kubernetes Service (AKS)")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/getting-started/gke-install.html"}},[e._v("Google Kubernetes Engine (GKE)")])],1)]),e._v(" "),a("h2",{attrs:{id:"verify-the-nginx-ingress-install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#verify-the-nginx-ingress-install"}},[e._v("#")]),e._v(" Verify the NGINX Ingress Install")]),e._v(" "),a("p",[e._v("To verify that the ingress is working properly you can set up a test application.")]),e._v(" "),a("ol",[a("li",[e._v("Create a simple application:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl create deployment hello-server --image=us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Expose the "),a("code",[e._v("hello-app")]),e._v(" deployment as a Service:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl expose deployment hello-server --type LoadBalancer --port 80 --target-port 8080\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Create this "),a("code",[e._v("ingress-resource.yaml")]),e._v(" file:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ingress-resource\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    nginx.ingress.kubernetes.io/ssl-redirect: "false"\nspec:\n  rules:\n  - http:\n      paths:\n      - path: /hello\n        pathType: Prefix\n        backend:\n          service:\n            name: hello-server\n            port: \n              number: 80\n')])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Create the Ingress Resource:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl apply -f ingress-resource.yaml\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[e._v("Verify that the Ingress Resource has been created:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl get ingress ingress-resource\n")])])]),a("p",[e._v("It may take several minutes to populate the "),a("code",[e._v("Address")]),e._v(".")]),e._v(" "),a("ol",{attrs:{start:"6"}},[a("li",[e._v("Verify access to the web application using the "),a("code",[e._v("EXTERNAL-IP/hello")]),e._v(" address of the "),a("code",[e._v("nginx-ingress-controller")]),e._v(". You should see the following:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Hello, world!\nVersion: 1.0.0\nHostname: hello-app\n")])])]),a("p",[e._v("Note that you will need the EXTERNAL-IP address of your ingress controller to configure the application.")]),e._v(" "),a("ol",{attrs:{start:"7"}},[a("li",[e._v("Verify that you configured the ingress class in the Operator "),a("code",[e._v("ConfigMap")]),e._v(" so Entando knows which ingress controller should be used:")])]),e._v(" "),a("p",[a("code",[e._v('entando.ingress.class: "nginx"')])]),e._v(" "),a("ol",{attrs:{start:"8"}},[a("li",[e._v("To reduce costs, remove the test deployment, service, and ingress:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl delete deploy/hello-server service/hello-server ing/ingress-resource\n")])])]),a("h2",{attrs:{id:"customize-the-nginx-configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#customize-the-nginx-configuration"}},[e._v("#")]),e._v(" Customize the NGINX Configuration")]),e._v(" "),a("p",[e._v("There are situations where the default NGINX ingress configuration isn't optimized for Entando, e.g. JWT tokens can be too large or "),a("code",[e._v("proxy-buffer-size")]),e._v(" can be too small. A "),a("code",[e._v("502 Bad Gateway")]),e._v(" error may indicate that the config needs to be modified.")]),e._v(" "),a("p",[e._v("The NGINX controller can be configured for the entire cluster by editing the default NGINX "),a("code",[e._v("ConfigMap")]),e._v(", called "),a("code",[e._v("ingress-nginx-controller")]),e._v(" in the "),a("code",[e._v("ingress-nginx")]),e._v(" namespace. Add the following to the data parameter:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('apiVersion: v1\ndata:\n  allow-snippet-annotations: "true"\n  proxy-buffer-size: 24k\nkind: ConfigMap\n')])])]),a("p",[e._v("Production environments may require additional common annotations:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('nginx.ingress.kubernetes.io/proxy-body-size: 200m # to upload large files (default is 10M)\nnginx.ingress.kubernetes.io/proxy-buffer-size: 64k # for the Keycloak auth-token (default is 16K)\nnginx.ingress.kubernetes.io/proxy-read-timeout: "600" # to increase the timeout when uploading large files\n')])])]),a("p",[e._v("Sticky sessions may be useful for "),a("code",[e._v("entando-de-app")]),e._v(" deployments with multiple replicas. If you "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/devops/caching-and-clustering.html#clustering"}},[e._v("set up clustering")]),e._v(", the following options will enable sticky sessions in NGINX:")],1),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("nginx.ingress.kubernetes.io/affinity: cookie\nnginx.ingress.kubernetes.io/affinity-mode: balanced\n")])])]),a("h2",{attrs:{id:"add-the-cert-manager-for-tls-support"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-the-cert-manager-for-tls-support"}},[e._v("#")]),e._v(" Add the "),a("code",[e._v("cert-manager")]),e._v(" for TLS Support")]),e._v(" "),a("p",[e._v("Follow the instructions below to install and configure "),a("code",[e._v("cert-manager")]),e._v(" in Kubernetes environments.\n​")]),e._v(" "),a("h3",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),a("p",[e._v("​\nCreate a namespace dedicated to "),a("code",[e._v("cert-manager")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl create ns cert-manager\n")])])]),a("p",[e._v("​\nComplete the installation:")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[e._v("kubectl apply "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("f https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//github.com/jetstack/cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager/releases/download/v1.7.0/cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.yaml\n")])])]),a("h3",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),a("p",[e._v("​\nTo enable "),a("code",[e._v("cert-manager")]),e._v(" to generate certificates, add these annotations to the ingress:\n​")]),e._v(" "),a("ul",[a("li",[a("code",[e._v('cert-manager.io/issuer: "[name of the issuer]"')]),e._v(" for namespace-based issuers")]),e._v(" "),a("li",[a("code",[e._v('cert-manager.io/cluster-issuer: "[name of cluster issuer]"')]),e._v(" for cluster-wide issuers")])]),e._v(" "),a("p",[e._v("and modify "),a("code",[e._v("spec")]),e._v(":")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("tls")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("hosts")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" example.example.com\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("secretName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" quickstart"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("example"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("tls "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# this Secret will be autogenereted by cert-manager.")]),e._v("\n")])])]),a("h4",{attrs:{id:"namespace-level-issuer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#namespace-level-issuer"}},[e._v("#")]),e._v(" Namespace Level Issuer")]),e._v(" "),a("p",[e._v("​\nUse the following configuration when deploying an issuer per namespace. This is useful for higher levels of customization.\n​")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.io/v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" Issuer\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("acme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The ACME server URL")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("server")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//acme"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("v02.api.letsencrypt.org/directory\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("preferredChain")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ISRG Root X1"')]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Email address used for ACME registration")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("email")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <your email"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Name of a secret used to store the ACME account privare key")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("privateKeySecretRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Enable the http-01 challenge provider")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("solvers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("http01")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("ingress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" nginx\n​\n")])])]),a("h4",{attrs:{id:"cluster-level-issuer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cluster-level-issuer"}},[e._v("#")]),e._v(" Cluster Level Issuer")]),e._v(" "),a("p",[e._v("Use the following configuration when deploying an issuer per cluster:")]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager.io/v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" ClusterIssuer\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("cluster\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("namespace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("manager\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("acme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# The ACME server URL")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("server")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("//acme"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("v02.api.letsencrypt.org/directory\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("preferredChain")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"ISRG Root X1"')]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Email address used for ACME registration")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("email")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" <your email"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Name of a secret used to store the ACME account privare key")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("privateKeySecretRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("cluster"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("prod\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Enable the http-01 challenge provider")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("solvers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("http01")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("ingress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" nginx\n​\n")])])]),a("h3",{attrs:{id:"cert-manager-references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cert-manager-references"}},[e._v("#")]),e._v(" "),a("code",[e._v("cert-manager")]),e._v(" References")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://cert-manager.io/docs/installation/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Installation"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://cert-manager.io/docs/installation/supported-releases/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Supported releases"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=n.exports}}]);