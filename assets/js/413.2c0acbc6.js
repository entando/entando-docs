(window.webpackJsonp=window.webpackJsonp||[]).push([[413],{1533:function(e,t,r){"use strict";r.r(t);var a=r(36),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"installation-on-kubernetes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#installation-on-kubernetes"}},[e._v("#")]),e._v(" Installation on Kubernetes")]),e._v(" "),r("h2",{attrs:{id:"infrastructure-requirements"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#infrastructure-requirements"}},[e._v("#")]),e._v(" Infrastructure Requirements")]),e._v(" "),r("p",[e._v("Below are the minimum infrastructure requirements to install Entando directly on a Kubernetes (K8s) cluster:")]),e._v(" "),r("ul",[r("li",[e._v("A working DNS server configured to resolve internal and external names. To configure K8s with a global wildcard domain name for the entire cluster, be sure it points to the public IP address of the external load balancer for the worker nodes.")]),e._v(" "),r("li",[e._v("A default "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/storage/storage-classes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("storage class"),r("OutboundLink")],1),e._v(" is needed for the Entando Operator to create the correct persistent volume claims (PVCs) for each pod.")]),e._v(" "),r("li",[e._v("NGINX "),r("a",{attrs:{href:"https://kubernetes.github.io/ingress-nginx/deploy/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ingress controller"),r("OutboundLink")],1),e._v(" is needed to expose the Entando Application.")]),e._v(" "),r("li",[e._v("To install bundles, the cluster containing the Entando Application must have access to the bundle repository (either public or private, often on GitHub) as well as the Docker image repository (e.g. Docker Hub) for any microservices.")]),e._v(" "),r("li",[e._v("Kubernetes Secrets are required to "),r("RouterLink",{attrs:{to:"/next/tutorials/curate/bundle-private-images.html"}},[e._v("install bundles from a private image repository")]),e._v(", such as Docker Hub.")],1)]),e._v(" "),r("p",[e._v("The baseline resource requirements for Entando are specified below. Actual requirements depend on utilization and increase with features, bundles and capabilities. In addition, Kubernetes has its own resource requirements, which vary depending on the distribution. At a minimum, configure a single worker node with the resources listed below. Alternatively, begin with 3 worker nodes, each with at least 2 vCPUs and 4 GB of RAM.")]),e._v(" "),r("h2",{attrs:{id:"minimum-hardware-requirements"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#minimum-hardware-requirements"}},[e._v("#")]),e._v(" Minimum Hardware Requirements")]),e._v(" "),r("h3",{attrs:{id:"entando-application-only"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entando-application-only"}},[e._v("#")]),e._v(" Entando Application Only")]),e._v(" "),r("ul",[r("li",[e._v("4 vCPUs (4000 millicores)")]),e._v(" "),r("li",[e._v("8 GB of RAM")]),e._v(" "),r("li",[e._v("5 GB of allocated storage distributed over many PVCs")])]),e._v(" "),r("h3",{attrs:{id:"entando-microservices"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entando-microservices"}},[e._v("#")]),e._v(" Entando + Microservices")]),e._v(" "),r("ul",[r("li",[e._v("500 millicores per microservice, or")]),e._v(" "),r("li",[e._v("1000 millicores per microservice containing a database")])]),e._v(" "),r("p",[e._v("The microservices tested with the CPU specs above were generated using the JHipster Entando Blueprint.")]),e._v(" "),r("h3",{attrs:{id:"entando-cms"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entando-cms"}},[e._v("#")]),e._v(" Entando + CMS")]),e._v(" "),r("p",[e._v("Complexity, content and number of pages determine the hardware requirements of an Entando install that includes the CMS. The minimum requirements are:")]),e._v(" "),r("ul",[r("li",[e._v("6 vCPUs for a single CMS instance. To scale up, allocate 4 vCPUs per replica.")]),e._v(" "),r("li",[e._v("10 GB of RAM for a single CMS instance. To scale up, allocate 4 GB of RAM per replica.")]),e._v(" "),r("li",[e._v("A minimum of 50 GB of storage for the static resources generated by the use of the Entando CMS.")])]),e._v(" "),r("h2",{attrs:{id:"backup-strategies"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#backup-strategies"}},[e._v("#")]),e._v(" Backup Strategies")]),e._v(" "),r("p",[e._v("It is recommended to secure content via database services that automate backups and restore on a Kubernetes cluster such as Azure, Red Hat OpenShift, Google K8s Service or Amazon Elastic. If this is not an option, content can be managed with tools like "),r("a",{attrs:{href:"https://velero.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Velero"),r("OutboundLink")],1),e._v(" or "),r("a",{attrs:{href:"https://cloudcasa.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Cloudcase"),r("OutboundLink")],1),e._v(".")]),e._v(" "),r("blockquote",[r("p",[e._v("Note: Some DevOps teams recommend against running production databases inside pods since it makes database management more challenging.")])]),e._v(" "),r("p",[e._v("If you are using the Entando CMS, be sure to protect related schemas ("),r("code",[e._v("port")]),e._v(" and "),r("code",[e._v("serv")]),e._v(") with a valid disaster recovery plan. Protect all volumes containing your static resources with daily snapshots.")]),e._v(" "),r("h2",{attrs:{id:"references"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),r("p",[e._v("See the "),r("a",{attrs:{href:"https://www.entando.com/page/en/compatibility-guide",target:"_blank",rel:"noopener noreferrer"}},[e._v("Entando compatibility guide"),r("OutboundLink")],1),e._v(" for viable Kubernetes versions.")])])}),[],!1,null,null,null);t.default=n.exports}}]);