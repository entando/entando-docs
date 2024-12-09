(window.webpackJsonp=window.webpackJsonp||[]).push([[584],{1799:function(s,a,t){"use strict";t.r(a);var e=t(36),n=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"quick-reference"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#quick-reference"}},[s._v("#")]),s._v(" Quick Reference")]),s._v(" "),t("p",[s._v("Just the steps, for advanced users.")]),s._v(" "),t("hr"),s._v(" "),t("p",[s._v("Install "),t("a",{attrs:{href:"https://multipass.run/#install",target:"_blank",rel:"noopener noreferrer"}},[s._v("Multipass"),t("OutboundLink")],1)]),s._v(" "),t("p",[s._v("Launch VM")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("multipass launch --name ubuntu-lts --cpus "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v(" --mem 8G --disk 20G\n")])])]),t("p",[s._v("Open Ubuntu shell")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("multipass shell ubuntu-lts\n")])])]),t("p",[s._v("Install k3s")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -sfL https://get.k3s.io "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" -\n")])])]),t("p",[s._v("Check for node ready")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl get "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v("\n")])])]),t("p",[s._v("Download custom resource definitions")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" -xz\n")])])]),t("p",[s._v("Create custom resources")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl create -f dist/crd\n")])])]),t("p",[s._v("Create namespace")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl create namespace entando\n")])])]),t("p",[s._v("Download Helm chart (or "),t("a",{attrs:{href:"https://github.com/entando-k8s/entando-helm-quickstart",target:"_blank",rel:"noopener noreferrer"}},[s._v("generate your own"),t("OutboundLink")],1),s._v(")")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/entando.yaml\n")])])]),t("p",[s._v("Configure external access to your cluster with your VM IP")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("IP")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$(")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("hostname")]),s._v(" -I "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("awk")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{print $1}'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v(")")])]),s._v("\n")])])]),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sed")]),s._v(" -i "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"s/192.168.64.25/'),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$IP")]),s._v('/"')]),s._v(" entando.yaml\n")])])]),t("p",[s._v("Deploy Entando")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl create -f entando.yaml\n")])])]),t("p",[s._v("Check for quickstart-composite-app-deployer "),t("code",[s._v("Completed")])]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl get pods -n entando --watch\n")])])]),t("p",[s._v("Get URL to access Entando App Builder from your browser")]),s._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" kubectl get ingress -n entando -o "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("jsonpath")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{\"\\n\"}'")]),s._v("\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);