(window.webpackJsonp=window.webpackJsonp||[]).push([[825],{2157:function(t,e,a){"use strict";a.r(e);var s=a(36),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"manage-tls-certificates-using-cert-manager"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manage-tls-certificates-using-cert-manager"}},[t._v("#")]),t._v(" Manage TLS Certificates using cert-manager")]),t._v(" "),a("p",[t._v("Management of TLS certificates in an Entando instance can be easily managed using the powerful certificate controller "),a("a",{attrs:{href:"https://cert-manager.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("cert-manager"),a("OutboundLink")],1),t._v(". This tutorial shows the configuration steps necessary for this setup.")]),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[t._v("An existing deployment of an Entando App")]),t._v(" "),a("li",[t._v("Use of the "),a("a",{attrs:{href:"https://docs.nginx.com/nginx-ingress-controller/",target:"_blank",rel:"noopener noreferrer"}},[t._v("NGINX ingress controller"),a("OutboundLink")],1),t._v(". See the  "),a("a",{attrs:{href:"https://cert-manager.io/docs/installation/",target:"_blank",rel:"noopener noreferrer"}},[t._v("cert-manager documentation"),a("OutboundLink")],1),t._v(" for other install options.")])]),t._v(" "),a("h2",{attrs:{id:"install-cert-manager"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-cert-manager"}},[t._v("#")]),t._v(" Install cert-manager")]),t._v(" "),a("ol",[a("li",[t._v("Create a namespace for "),a("code",[t._v("cert-manager")]),t._v(":")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl create namespace cert-manager\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Follow the install instructions to create the "),a("code",[t._v("cert-manager")]),t._v(" resources in this namespace. The install can be as simple as the following command if the default configuration is acceptable:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml -n cert-manager\n")])])]),a("h2",{attrs:{id:"prepare-an-issuer"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prepare-an-issuer"}},[t._v("#")]),t._v(" Prepare an Issuer")]),t._v(" "),a("p",[t._v("An "),a("a",{attrs:{href:"https://cert-manager.io/docs/concepts/issuer",target:"_blank",rel:"noopener noreferrer"}},[t._v("Issuer"),a("OutboundLink")],1),t._v(" defines "),a("strong",[t._v("how")]),t._v(" "),a("code",[t._v("cert-manager")]),t._v(" will request TLS certificates. Issuers can be either specific to a single namespace or provided as a cluster-wide "),a("code",[t._v("ClusterIssuer")]),t._v(". The following steps are for a cluster-wide configuration using the "),a("a",{attrs:{href:"https://letsencrypt.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Let's Encrypt"),a("OutboundLink")],1),t._v(" automated certificate authority.")]),t._v(" "),a("ol",[a("li",[t._v("Create a file "),a("code",[t._v("letsencrypt-prod-cluster.yaml")]),t._v(" with the following content:")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("manager.io/v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ClusterIssuer\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("prod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cluster\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("acme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# The ACME server URL")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("server")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//acme"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("v02.api.letsencrypt.org/directory\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Email address used for ACME registration")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("email")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("EMAIL"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ADDRESS\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Name of a secret used to store the ACME account private key")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("privateKeySecretRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("prod\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Enable the HTTP-01 challenge provider")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("solvers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("http01")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ingress")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ingressClassName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" nginx\n")])])]),a("blockquote",[a("p",[t._v("ACME stands for Automatic Certificate Management Environment which is the protocol used by "),a("code",[t._v("Let's Encrypt")]),t._v(" and "),a("code",[t._v("cert-manager")]),t._v(".")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("p",[t._v("Replace "),a("code",[t._v("YOUR-EMAIL-ADDRESS")]),t._v(" with your own email. This will be used by "),a("code",[t._v("Let's Encrypt")]),t._v(" for certification expiration and update notifications.")])]),t._v(" "),a("li",[a("p",[t._v("(Optional) Change the issuer name from "),a("code",[t._v("letsencrypt-prod-cluster")]),t._v(" to your preferred name. The name is needed when creating the "),a("code",[t._v("Certificate")]),t._v(" resource below.")])]),t._v(" "),a("li",[a("p",[t._v("Create the "),a("code",[t._v("ClusterIssuer")]),t._v(":")])])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl apply -f letsencrypt-prod-cluster.yaml \n")])])]),a("blockquote",[a("p",[t._v("If a namespace-level Issuer is used then include the namespace parameter in the command. The preceding resource definition and following command should also be changed from "),a("code",[t._v("clusterissuer")]),t._v(" to "),a("code",[t._v("issuer")]),t._v(".")])]),t._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[t._v("Confirm the status of the "),a("code",[t._v("ClusterIssuer")]),t._v(":")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl describe clusterissuer letsencrypt-prod-cluster\n")])])]),a("p",[t._v("If the account and configuration is correct, you should see this message in the Status section:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("The ACME account was registered with the ACME server\n")])])]),a("h2",{attrs:{id:"enable-cert-manager-to-generate-certificates"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-cert-manager-to-generate-certificates"}},[t._v("#")]),t._v(" Enable cert-manager to generate certificates")]),t._v(" "),a("p",[t._v("The simplest way to have "),a("code",[t._v("cert-manager")]),t._v(" generate certificates is by creating a "),a("code",[t._v("Certificate")]),t._v(" resource.")]),t._v(" "),a("ol",[a("li",[t._v("Create "),a("code",[t._v("certificate.yaml")]),t._v(" with the following content:")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("manager.io/v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Certificate\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("secretName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("issuerRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("group")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("manager.io\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ClusterIssuer\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" letsencrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("prod"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cluster\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("dnsNames")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("HOSTNAME\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("usages")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" digital signature\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" key encipherment\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Set "),a("code",[t._v("YOUR-HOSTNAME")]),t._v(" to match your environment. Update "),a("code",[t._v("issuerRef:name")]),t._v(" to use the issuer name from above.")]),t._v(" "),a("li",[t._v("Create the certificate:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl apply -f certificate.yaml -n YOUR-NAMESPACE\n")])])]),a("blockquote",[a("p",[t._v("It may take a few minutes for "),a("code",[t._v("cert-manager")]),t._v(" to generate the certificate and configure the new secret.")])]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[t._v("Confirm the secret was created:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl describe secret/entando-tls-secret -n YOUR-NAMESPACE\n")])])]),a("h2",{attrs:{id:"activate-tls-in-the-entando-app"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#activate-tls-in-the-entando-app"}},[t._v("#")]),t._v(" Activate TLS in the Entando App")]),t._v(" "),a("p",[t._v("Configure the Entando Application to use TLS now that the new secret is available.")]),t._v(" "),a("ol",[a("li",[t._v("Edit the "),a("code",[t._v("entando-operator-config")]),t._v(" ConfigMap and set the following property:")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.tls.secret.name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n")])])]),a("blockquote",[a("p",[a("em",[t._v("Tip:")]),t._v(" For a new Entando installation, the following steps (steps 2+) can be skipped. The operator will apply the TLS changes as part of the regular install process.")])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Two environment variables need to be updated when switching from a non-TLS configuration to a TLS configuration. Edit the "),a("code",[t._v("EntandoApp")]),t._v(" custom resource and add the following environment variables with the correct values:")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environmentVariables")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" KEYCLOAK_AUTH_URL\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("HOST"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAME/auth\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" https"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("//YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("HOST"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAME/auth/realms/entando\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Also add the following annotation:")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("annotations")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" \n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.org/processing-instruction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" force\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[a("p",[t._v("Save the changes to the "),a("code",[t._v("EntandoApp")]),t._v(" resource. The "),a("code",[t._v("EntandoApp")]),t._v(" phase should change to "),a("code",[t._v("requested")]),t._v(" then "),a("code",[t._v("started")]),t._v(" as the Entando Operator proceeds to update the application.")])]),t._v(" "),a("li",[a("p",[t._v("Confirm the application is using TLS once the EntandoApp is updated and the deployments have restarted.")])])]),t._v(" "),a("h2",{attrs:{id:"cert-manager-references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cert-manager-references"}},[t._v("#")]),t._v(" "),a("code",[t._v("cert-manager")]),t._v(" References")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://cert-manager.io/docs/installation/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Installation"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://cert-manager.io/docs/installation/supported-releases/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Supported releases"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=n.exports}}]);