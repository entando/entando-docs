(window.webpackJsonp=window.webpackJsonp||[]).push([[280],{1886:function(e,t,n){"use strict";n.r(t);var o=n(36),r=Object(o.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"entando-deployment-structure"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-deployment-structure"}},[e._v("#")]),e._v(" Entando Deployment Structure")]),e._v(" "),o("p",[e._v("This page provides an overview of the key Entando GitHub repositories with brief descriptions\nof how these repositories are realized in a running Entando deployment. It also explores the architecture behind the Entando Platform and how its functions are structured.")]),e._v(" "),o("h2",{attrs:{id:"entando-operator"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-operator"}},[e._v("#")]),e._v(" entando-operator")]),e._v(" "),o("p",[e._v("The Entando Operator coordinates the installation and configuration of all the components in an Entando\ncluster. The operator can be installed once per cluster and is used to coordinate the plugin lifecycle for multiple Entando Applications across many namespaces.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-controller-coordinator/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-controller-coordinator/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-controller-coordinator",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-controller-coordinator"),o("OutboundLink")],1)])]),e._v(" "),o("h4",{attrs:{id:"customization"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("Use existing "),o("RouterLink",{attrs:{to:"/v7.0/docs/consume/custom-resources.html"}},[e._v("Entando Custom Resources")]),e._v(" to extend the Entando Platform.")],1),e._v(" "),o("h2",{attrs:{id:"database-init-containers"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#database-init-containers"}},[e._v("#")]),e._v(" Database Init Containers")]),e._v(" "),o("p",[e._v("During installation, an Entando Application needs to create and initialize several databases when deploying from a backup of your images.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-dbjob",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-dbjob"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-dbjob",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-dbjob"),o("OutboundLink")],1)])]),e._v(" "),o("p",[e._v("The screenshot below highlights the init containers for the Entando Application schema creation, DB initialization, and component repository database.")]),e._v(" "),o("p",[o("img",{attrs:{src:n(933),alt:"Init Containers Screenshot"}})]),e._v(" "),o("p",[e._v("Many managed Kubernetes instances like OpenShift don’t display init containers on their dashboards. If you’re troubleshooting, the logs may provide some useful information. To fetch logs for an init container using kubectl, you must\npass the container name as an argument.")]),e._v(" "),o("p",[e._v("For example:")]),e._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",[o("code",[e._v("    kubectl logs YOUR-POD -c YOUR-CONTAINER-NAME -n YOUR-NAMESPACE        \n    kubectl logs default-sso-in-namespace-deployment-db-preparation-job-ddbdbddb-a  -c default-sso-in-namespace-deployment-db-schema-creation-job -n sprint1-rc\n")])])]),o("h4",{attrs:{id:"customization-2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-2"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("The init containers automatically restore a backup included in your application so that you can create custom images with your application setup.\nSee "),o("RouterLink",{attrs:{to:"/v7.0/tutorials/devops/backing-up-and-restoring-your-environment.html"}},[e._v("Backing Up and Restoring Your Environment")]),e._v(" for more details.")],1),e._v(" "),o("h2",{attrs:{id:"entando-de-app"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-de-app"}},[e._v("#")]),e._v(" entando-de-app")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-de-app")]),e._v(" is a J2EE application and an instance of the "),o("a",{attrs:{href:"#entando-core"}},[o("strong",[e._v("entando-core")])]),e._v(". It provides pathways for other Entando Components and the server image the Entando Operator requires to manage the deployment. The pom.xml for the application reveals its dependencies.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando/entando-de-app/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando/entando-de-app/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-de-app-eap",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-de-app-eap"),o("OutboundLink")],1),e._v(","),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-de-app-wildfly",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-de-app-wildfly"),o("OutboundLink")],1)])]),e._v(" "),o("h4",{attrs:{id:"customization-3"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-3"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-de-app")]),e._v(" is very likely to be customized as part of an Entando implementation.\nA customized image can include:")]),e._v(" "),o("ul",[o("li",[e._v("New APIs")]),e._v(" "),o("li",[e._v("Legacy Entando plugins")]),e._v(" "),o("li",[e._v("New database tables")]),e._v(" "),o("li",[e._v("Other extensions to the "),o("strong",[e._v("entando-core")])])]),e._v(" "),o("p",[e._v("It is recommended that most extensions to the Entando Platform occur in microservices. However, legacy\nintegrations, extensions to the CMS, and migrations from earlier Entando versions may require changes to the "),o("strong",[e._v("entando-de-app")]),e._v(".")]),e._v(" "),o("h2",{attrs:{id:"app-builder"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#app-builder"}},[e._v("#")]),e._v(" App Builder")]),e._v(" "),o("p",[e._v("The App Builder is the user-friendly frontend UI for the "),o("strong",[e._v("entando-de-app")]),e._v(". A ReactJS application, it is served via node in the default deployment. In a quickstart deployment, the App Builder container is deployed in the "),o("strong",[e._v("entando-app")]),e._v(" multi-container pod. It communicates with the "),o("strong",[e._v("entando-de-app")]),e._v(" and the Entando Component Manager (ECM) via "),o("RouterLink",{attrs:{to:"/v7.0/docs/consume/entando-apis.html"}},[e._v("REST\nAPIs")]),e._v(".  The ECM provides information about bundles deployed to the Entando Component Repository (ECR).")],1),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando/app-builder/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando/app-builder/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/app-builder/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/app-builder/"),o("OutboundLink")],1)])]),e._v(" "),o("h4",{attrs:{id:"customization-4"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-4"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("The App Builder is customized as part of many Entando implementations.\nIt can be customized at runtime via micro frontends\n"),o("RouterLink",{attrs:{to:"/v7.0/tutorials/create/mfe/widget-configuration.html"}},[e._v("widget configuration")]),e._v(".")],1),e._v(" "),o("h2",{attrs:{id:"entando-component-manager-ecm"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-component-manager-ecm"}},[e._v("#")]),e._v(" Entando Component Manager (ECM)")]),e._v(" "),o("p",[e._v("The ECM provides the link between the "),o("strong",[e._v("entando-de-app")]),e._v(", or your custom core instance, and the ECR. The ECM queries the Entando Kubernetes service to fetch available\nbundles that have been deployed as custom resources inside the cluster.")]),e._v(" "),o("p",[e._v("The ECM also manages relationships between an Entando Application and the\ninstalled plugins. This can be seen in the plugin link custom resource in Kubernetes.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando-k8s/entando-component-manager/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-component-manager/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-component-manager/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-component-manager/"),o("OutboundLink")],1)])]),e._v(" "),o("h2",{attrs:{id:"entando-k8s-service"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-k8s-service"}},[e._v("#")]),e._v(" entando-k8s-service")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-k8s-service")]),e._v(" acts as an abstraction layer to fetch data from Kubernetes APIs. Its primary\nfunction is to discover and make available Entando plugins for installation. The\n"),o("strong",[e._v("entando-k8s-service")]),e._v(" is invoked by the ECM.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-service/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-service/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-service/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-service/"),o("OutboundLink")],1)])]),e._v(" "),o("h2",{attrs:{id:"keycloak"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#keycloak"}},[e._v("#")]),e._v(" Keycloak")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-keycloak")]),e._v(" project is an extension of the base Keycloak images. It provides default themes for Entando, a customized realm and clients, and Oracle JDBC JARs for connecting to Oracle databases.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando/entando-keycloak/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando/entando-keycloak/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: "),o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-keycloak/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-keycloak/"),o("OutboundLink")],1)])]),e._v(" "),o("h4",{attrs:{id:"customization-5"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-5"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("The Keycloak image can be customized as part of an Entando implementation. Some common extensions are:")]),e._v(" "),o("ul",[o("li",[e._v("Change the theme")]),e._v(" "),o("li",[e._v("Add default connections")]),e._v(" "),o("li",[e._v("Add default social logins")]),e._v(" "),o("li",[e._v("Add default clients")])]),e._v(" "),o("h2",{attrs:{id:"other-key-repositories"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#other-key-repositories"}},[e._v("#")]),e._v(" Other Key Repositories")]),e._v(" "),o("h3",{attrs:{id:"entando-core"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-core"}},[e._v("#")]),e._v(" entando-core")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-core")]),e._v(" project is a J2EE application that exposes APIs for the Entando CMS, including the admin console and the portal UI project that performs the server side composition for pages rendered via an Entando Application. Note that only the composition is performed server side. JavaScript code is rendered client-side. The "),o("strong",[e._v("entando-core")]),e._v(" is realized via an instance that includes the\nWAR files generated from a core build as dependencies. In a default deployment, this is the "),o("strong",[e._v("entando-de-app")]),e._v(".")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando/entando-core/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando/entando-core/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: None (deployed to maven central)")])]),e._v(" "),o("h4",{attrs:{id:"customization-6"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-6"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("For users familiar with versions prior to Entando 6, there will be cases where the "),o("strong",[e._v("entando-core")]),e._v(" is customized.\nOften, these customizations will be delivered via a WAR overlay in the instance project.\nUsing a WAR overlay is a functional approach for users already familiar with the process, but it is highly\nrecommended to extend the platform using microservices for new projects.")]),e._v(" "),o("h3",{attrs:{id:"entando-cms"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-cms"}},[e._v("#")]),e._v(" entando-cms")]),e._v(" "),o("p",[e._v("The "),o("strong",[e._v("entando-cms")]),e._v(" project is the App Builder (ReactJS) side of the Entando WCMS. It is bundled into the\nApp Builder at build time and is included in the default deployment of the App Builder in most cases.")]),e._v(" "),o("ul",[o("li",[e._v("GitHub: "),o("a",{attrs:{href:"https://github.com/entando/entando-cms/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando/entando-cms/"),o("OutboundLink")],1)]),e._v(" "),o("li",[e._v("DockerHub: None (deployed to npm)")])]),e._v(" "),o("h4",{attrs:{id:"customization-7"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-7"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("In some cases, the "),o("strong",[e._v("entando-cms")]),e._v(" may be customized if new custom features are added to CMS-specific\nfunctionality. However, most cases will use the more general App Builder extension points noted above. The "),o("strong",[e._v("entando-cms")]),e._v(" does not expose any dedicated extension interfaces outside of those already provided by the App Builder.")]),e._v(" "),o("h3",{attrs:{id:"entando-kubernetes-controllers"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#entando-kubernetes-controllers"}},[e._v("#")]),e._v(" Entando Kubernetes Controllers")]),e._v(" "),o("p",[e._v("There are a number of controllers that are available to the Entando Operator to manage installations and\ncomponents in an Entando cluster. These are small and lightweight images that execute as\nrun-to-completion pods, managing the installation flow for different parts of the infrastructure. The\ncontrollers are implemented using Quarkus. For more information on the controllers, Entando custom\nresources, and configuring your Entando deployment, see also:\n"),o("RouterLink",{attrs:{to:"/v7.0/docs/consume/custom-resources.html"}},[e._v("Custom Resources")]),e._v(".")],1),e._v(" "),o("p",[e._v("GitHub:")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-composite-app-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-composite-app-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-plugin-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-plugin-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-cluster-infrastructure-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-cluster-infrastructure-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-app-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-app-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/entando-k8s/entando-k8s-app-plugin-link-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-k8s-app-plugin-link-controller/"),o("OutboundLink")],1)])]),e._v(" "),o("p",[e._v("DockerHub:")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-composite-app-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-composite-app-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-plugin-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-plugin-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-cluster-infrastructure-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-cluster-infrastructure-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-app-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-app-controller/"),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://hub.docker.com/repository/docker/entando/entando-k8s-app-plugin-link-controller/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://hub.docker.com/repository/docker/entando/entando-k8s-app-plugin-link-controller/"),o("OutboundLink")],1)])]),e._v(" "),o("h4",{attrs:{id:"customization-8"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#customization-8"}},[e._v("#")]),e._v(" Customization")]),e._v(" "),o("p",[e._v("It is unlikely that the controllers will be customized as part of an Entando implementation.")])])}),[],!1,null,null,null);t.default=r.exports},933:function(e,t,n){e.exports=n.p+"assets/img/init-containers-screenshot.d39576a8.png"}}]);