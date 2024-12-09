(window.webpackJsonp=window.webpackJsonp||[]).push([[894],{2261:function(t,a,e){"use strict";e.r(a);var s=e(36),n=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"install-bundle-from-a-private-image-registry"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install-bundle-from-a-private-image-registry"}},[t._v("#")]),t._v(" Install Bundle from a Private Image Registry")]),t._v(" "),e("p",[t._v("This tutorial provides to way to utilize bundles from a private image registry in your Entando projects. The steps below use environment variables to pass the Secret for the authentication required by private registries.")]),t._v(" "),e("p",[t._v("For microservices in a private image registry, follow the "),e("RouterLink",{attrs:{to:"/v7.3/tutorials/curate/ms-private-images.html"}},[t._v("install guide here")]),t._v(".")],1),t._v(" "),e("h2",{attrs:{id:"prerequisites"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/docs/getting-started/"}},[t._v("A working instance of Entando")])],1),t._v(" "),e("li",[t._v("Verify dependencies with the "),e("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/entando-cli.html#check-the-environment"}},[t._v("Entando CLI")]),t._v(": "),e("code",[t._v("ent check-env develop")])],1)]),t._v(" "),e("h2",{attrs:{id:"tutorial"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[t._v("#")]),t._v(" Tutorial")]),t._v(" "),e("h3",{attrs:{id:"step-1-create-the-registry-credentials"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-1-create-the-registry-credentials"}},[t._v("#")]),t._v(" Step 1: Create the Registry Credentials")]),t._v(" "),e("ol",[e("li",[t._v("Create the registry JSON configuration using your registry and credentials on the port of your choice:")])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"auths"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"YOUR-REGISTRY.com"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"username"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"YOUR-USERNAME"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"password"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"YOUR-PASSWORD"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[e("a",{attrs:{href:"https://www.base64encode.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Convert the JSON configuration into a base64 string"),e("OutboundLink")],1)])]),t._v(" "),e("h3",{attrs:{id:"step-2-create-and-apply-the-secret"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-2-create-and-apply-the-secret"}},[t._v("#")]),t._v(" Step 2: Create and Apply the Secret")]),t._v(" "),e("ol",[e("li",[t._v("Create "),e("code",[t._v("container-registry-secret.yaml")]),t._v(" in your namespace with the following snippet. Replace the registryCredentials value with your own.")])]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Secret\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" container"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("registry"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Opaque\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n   "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("registryCredentials")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"ewogICJhdXRocyI6IHsKICAgICJyZWdpc3RyeS5odWIuZG9ja2VyLmNvbSI6IHsKICAgICAgICAidXNlcm5hbWUiOiAidGVzdG5hbWV4eHgiLAogICAgICAgICJwYXNzd29yZCI6ICJUZXN0bmFtZXBhc3N3ZCIKfQp9Cn0="')]),t._v("\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("Apply the registry Secret YAML to your Entando instance, replacing the namespace with your own as needed:")])]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("ent kubectl apply -f container-registry-secret.yaml -n entando\n")])])]),e("h3",{attrs:{id:"step-3-add-the-environment-variable-and-deploy"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#step-3-add-the-environment-variable-and-deploy"}},[t._v("#")]),t._v(" Step 3: Add the Environment Variable and Deploy")]),t._v(" "),e("ol",[e("li",[t._v("Add the environment variable, ENTANDO_CONTAINER_REGISTRY_CREDENTIALS, to your EntandoApp custom resource. To edit the EntandoApp using your namespace:")])]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("ent kubectl get EntandoApp -n entando\nent kubectl edit EntandoApp/quickstart -n entando\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("Add the "),e("code",[t._v("environmentVariables")]),t._v(" under the spec property as shown here:")])]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" EntandoApp\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n     "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environmentVariables")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n       "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ENTANDO_CONTAINER_REGISTRY_CREDENTIALS\n         "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("valueFrom")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("secretKeyRef")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n               "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" container"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("registry"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n               "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("key")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" registryCredentials\n\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("(Entando 7.1.0-7.1.1 only) The Component Manager (CM) deployment requires modification due to an open issue. Scale the deployment down to 0, add the following spec for the HOME variable, and then restart the CM.")])]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" HOME\n      "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" /deployments\n")])])]),e("ol",{attrs:{start:"4"}},[e("li",[t._v("Deploy and install the bundle into Entando:")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("ent bundle deploy\nent bundle install\n")])])]),e("h2",{attrs:{id:"troubleshooting"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[t._v("#")]),t._v(" Troubleshooting")]),t._v(" "),e("h3",{attrs:{id:"self-signed-certificate"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#self-signed-certificate"}},[t._v("#")]),t._v(" Self-signed Certificate")]),t._v(" "),e("p",[t._v("If your private registry is secured via a self-signed certificate, you need to configure a CA certificate to validate the registry to download the bundle.")]),t._v(" "),e("ol",[e("li",[t._v("Create an opaque Secret containing the base64 encoded value of the certificate, with "),e("code",[t._v("-----BEGIN CERTIFICATE-----")]),t._v(" prefix and "),e("code",[t._v("-----END CERTIFICATE-----")]),t._v(" suffix, shown in the following example.")])]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("registry.eng-entando.com.crt")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# your base64 root certificate")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Secret\n"),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" YOUR"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("CA"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("CERT"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("SECRET\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("Apply the certificate Secret:")])]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[t._v("kubectl apply -f YOUR-CA-CERT-SECRET.yaml -n entando\n")])])]),e("ol",{attrs:{start:"3"}},[e("li",[t._v("Edit "),e("code",[t._v("entando-operator-config")]),t._v(" to add the certificate secret to the ConfigMap.")])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("kubectl get ConfigMap -n entandokubectl edit ConfigMap/entando-operator-config -n entando\n")])])]),e("p",[t._v("Add the "),e("code",[t._v("YOUR-CA-CERT-SECRET")]),t._v(" under the data property to refer to your secret, as shown here:")]),t._v(" "),e("div",{staticClass:"language-yaml extra-class"},[e("pre",{pre:!0,attrs:{class:"language-yaml"}},[e("code",[t._v("  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.ca.secret.name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" YOUR"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("CA"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("CERT"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("SECRET\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.ingress.class")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" nginx\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.k8s.operator.image.pull.secrets")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" container"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("registry"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.k8s.operator.impose.limits")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.requires.filesystem.group.override")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.tls.secret.name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" test"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("fire"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ConfigMap\n  "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("operator"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("config\n    "),e("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("namespace")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando\n")])])]),e("p",[e("strong",[t._v("Next Steps")])]),t._v(" "),e("ul",[e("li",[e("RouterLink",{attrs:{to:"/v7.3/tutorials/curate/ms-private-images.html"}},[t._v("Install Microservices from a Private Image Registry")]),t._v(".")],1),t._v(" "),e("li",[t._v("Learn how to "),e("RouterLink",{attrs:{to:"/v7.3/tutorials/compose/page-management.html"}},[t._v("create a page")]),t._v(" in the Entando App Builder.")],1)])])}),[],!1,null,null,null);a.default=n.exports}}]);