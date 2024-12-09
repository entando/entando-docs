(window.webpackJsonp=window.webpackJsonp||[]).push([[362],{1475:function(e,t,r){"use strict";r.r(t);var s=r(36),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"entando-custom-resources-for-kubernetes"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entando-custom-resources-for-kubernetes"}},[e._v("#")]),e._v(" Entando Custom Resources for Kubernetes")]),e._v(" "),r("p",[e._v("Custom resources (CRs) extend the capabilities of the Kubernetes API to customize  your Entando Application. The resources use Kubernetes API conventions, leveraging CRUD support, event subscriptions and RBAC out of the box.")]),e._v(" "),r("p",[e._v("A custom resource is introduced by registering a custom resource definition (CRD). This is a YAML or JSON resource that defines the structure with an OpenAPI JSON schema format. It is important to distinguish between CRDs and custom resources. CRDs are static definitions provided by Entando. CRDs are like class definitions for those familiar with programming languages, whereas custom resources are actual instances of those definitions.")]),e._v(" "),r("p",[e._v("The Entando core custom resource is required to run Entando whereas the other resources serve as metadata for Entando components such as the database service. Following are the descriptions of some of the main CRDs.")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#entando-core-custom-resources"}},[e._v("Entando Core Custom Resources")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#general-resourcerequirements-specifications"}},[e._v("General ResourceRequirements")])]),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/next/docs/reference/entandoapp-cr.html"}},[e._v("EntandoApp Custom Resource")])],1),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/next/docs/reference/keycloak-cr.html"}},[e._v("EntandoKeycloakServer Custom Resource")])],1),e._v(" "),r("li",[r("RouterLink",{attrs:{to:"/next/docs/reference/database-cr.html"}},[e._v("EntandoDatabaseService Custom Resource")])],1),e._v(" "),r("li",[r("a",{attrs:{href:"#other-custom-resources"}},[e._v("Other Custom Resources")])])]),e._v(" "),r("blockquote",[r("p",[e._v("See  "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes custom resources"),r("OutboundLink")],1),e._v(" for more details.")])]),e._v(" "),r("h2",{attrs:{id:"entando-core-custom-resources"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entando-core-custom-resources"}},[e._v("#")]),e._v(" Entando Core Custom Resources")]),e._v(" "),r("p",[e._v("A core set of resources are required for the basic installation of Entando in a Kubernetes cluster. The Entando Operator observes these resources in the namespace. If any of the core custom resources is created, updated or deleted, the operator will trigger a new run-to-completion pod that implements the state change in the cluster. Typically, this results in the deployment of Docker images, services, and sometimes an ingress. Docker images that implement these run-to-completion pods are referred to as Entando Kubernetes Controllers.")]),e._v(" "),r("h2",{attrs:{id:"general-resourcerequirements-specifications"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#general-resourcerequirements-specifications"}},[e._v("#")]),e._v(" General ResourceRequirements Specifications")]),e._v(" "),r("p",[e._v("All the custom resources that result in Kubernetes Deployments can be configured with specific resource requirements. These settings can be provided under the "),r("code",[e._v("spec")]),e._v(" object of the custom resource. It supports the following attributes:")]),e._v(" "),r("table",[r("thead",[r("tr",[r("th",{staticStyle:{"text-align":"left"}},[e._v("Spec Name")]),e._v(" "),r("th",{staticStyle:{"text-align":"left"}},[e._v("Description")])])]),e._v(" "),r("tbody",[r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.cpuLimit")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The maximum CPU allocation for the deployment's primary container.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.cpuRequest")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The initial CPU allocation from the node the deployment's primary container is running on.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.fileUploadLimit")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The maximum upload file size supported by the deployment.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.memoryLimit")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The maximum memory the deployment's primary container will use. If it exceeds this amount, the container may be terminated by Kubernetes.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.memoryRequest")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The initial memory requested from the node the deployment's primary container is running on.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.storageLimit")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The maximum amount of storage required by the deployment.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[r("code",[e._v("spec.resourceRequirements.storageRequest")])]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v("The initial storage requested from the persistence provider. Resizable storage is not supported by all storage providers and this may be the final size of the allocation.")])]),e._v(" "),r("tr",[r("td",{staticStyle:{"text-align":"left"}},[e._v("Units")]),e._v(" "),r("td",{staticStyle:{"text-align":"left"}},[e._v('These specs require a number and a unit of measurement, e.g. "64Mi".')])])])]),e._v(" "),r("p",[e._v("Consult the "),r("a",{attrs:{href:"https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-requests-and-limits-of-pod-and-container",target:"_blank",rel:"noopener noreferrer"}},[e._v("official Kubernetes documentation"),r("OutboundLink")],1),e._v(" for more information on configuring these attributes.")]),e._v(" "),r("h2",{attrs:{id:"other-custom-resources"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#other-custom-resources"}},[e._v("#")]),e._v(" Other Custom Resources")]),e._v(" "),r("h4",{attrs:{id:"entandoplugin-cr"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entandoplugin-cr"}},[e._v("#")]),e._v(" EntandoPlugin CR")]),e._v(" "),r("p",[e._v("An EntandoPlugin CR is a microservice that can be made available to one or more EntandoApp in the cluster. Follow the instructions for using the Entando Blueprint to "),r("RouterLink",{attrs:{to:"/next/tutorials/create/ms/generate-microservices-and-micro-frontends.html"}},[e._v("build your own EntandoPlugin")]),e._v(" as an example. The deployment resulting from an EntandoPlugin is a single-container pod with the plugin Docker image specified.")],1),e._v(" "),r("h4",{attrs:{id:"entandoapppluginlink-cr"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#entandoapppluginlink-cr"}},[e._v("#")]),e._v(" EntandoAppPluginLink CR")]),e._v(" "),r("p",[e._v("The EntandoAppPluginLink custom resource is created when an AppBuilder user links an EntandoPlugin or a plugin is deployed to the current EntandoApp. The Entando Operator processes the resulting EntandoAppPluginLink and creates a path for the plugin on the ingress that exposes the EntandoApp in question. This path is determined by the "),r("code",[e._v("spec.ingressPath")]),e._v(" property in the EntandoPlugin CRD. If the plugin resides in a namespace other than that of the EntandoApp, the operator creates a K8s service in the EntandoApp namespace to delegate the service in the plugin's namespace.")]),e._v(" "),r("h4",{attrs:{id:"provided-capability-cr"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#provided-capability-cr"}},[e._v("#")]),e._v(" Provided Capability CR")]),e._v(" "),r("p",[e._v("The ProvidedCapability custom resource is used to specify a requirement for a capability (e.g. DBMS, SSO) at a specific level or scope such as namespace, cluster, or labeled. This custom resource is used primarily to allow decoupling of the different controllers that the Entando Operator is made of.")]),e._v(" "),r("h4",{attrs:{id:"learn-more"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#learn-more"}},[e._v("#")]),e._v(" Learn More")]),e._v(" "),r("ul",[r("li",[e._v("Learn more about "),r("RouterLink",{attrs:{to:"/next/tutorials/consume/entando-operator.html"}},[e._v("Configuring the Operator")]),e._v(".")],1),e._v(" "),r("li",[e._v("Detailed instructions on how to install Entando are available in our\n"),r("a",{attrs:{href:"../getting-started"}},[e._v("Getting Started tutorial")]),e._v(".")])])])}),[],!1,null,null,null);t.default=o.exports}}]);