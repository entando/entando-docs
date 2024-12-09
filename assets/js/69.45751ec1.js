(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{1854:function(a,t,e){"use strict";e.r(t);var s=e(36),n=Object(s.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"entando-standard-demo-application"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#entando-standard-demo-application"}},[a._v("#")]),a._v(" Entando Standard Demo Application")]),a._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#application-details"}},[a._v("Application Details")]),s("ul",[s("li",[s("a",{attrs:{href:"#micro-frontends-mfe"}},[a._v("Micro Frontends (MFE)")])]),s("li",[s("a",{attrs:{href:"#configuration-micro-frontends"}},[a._v("Configuration Micro Frontends")])]),s("li",[s("a",{attrs:{href:"#microservices"}},[a._v("Microservices")])]),s("li",[s("a",{attrs:{href:"#static-widgets"}},[a._v("Static Widgets")])]),s("li",[s("a",{attrs:{href:"#static-cms-content"}},[a._v("Static CMS Content")])])])]),s("li",[s("a",{attrs:{href:"#installation"}},[a._v("Installation")]),s("ul",[s("li",[s("a",{attrs:{href:"#installation-in-openshift"}},[a._v("Installation in OpenShift")])]),s("li",[s("a",{attrs:{href:"#installation-in-public-cloud-aks-eks-gke"}},[a._v("Installation in Public Cloud (AKS, EKS, GKE)")])]),s("li",[s("a",{attrs:{href:"#installation-in-local-environment"}},[a._v("Installation in Local Environment")])])])]),s("li",[s("a",{attrs:{href:"#source-code"}},[a._v("Source Code")])])])]),s("p"),a._v(" "),s("h2",{attrs:{id:"application-details"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#application-details"}},[a._v("#")]),a._v(" Application Details")]),a._v(" "),s("p",[a._v("The Entando Standard Demo application demonstrates a number of the major features in the Entando platform including:")]),a._v(" "),s("ul",[s("li",[a._v("Keycloak integration for role based access controls")]),a._v(" "),s("li",[a._v("Micro frontends implemented using React and Angular and co-existing on the same dashboard page")]),a._v(" "),s("li",[a._v("Micro front communication techniques")]),a._v(" "),s("li",[a._v("Microservices run via Spring Boot")]),a._v(" "),s("li",[a._v("Entando Content Management")])]),a._v(" "),s("h3",{attrs:{id:"micro-frontends-mfe"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#micro-frontends-mfe"}},[a._v("#")]),a._v(" Micro Frontends (MFE)")]),a._v(" "),s("p",[a._v("The application includes six custom micro frontends which are described below.")]),a._v(" "),s("h4",{attrs:{id:"_1-seeds-card"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-seeds-card"}},[a._v("#")]),a._v(" 1. Seeds Card")]),a._v(" "),s("p",[s("img",{attrs:{src:e(903),alt:"SeedCard.png"}})]),a._v(" "),s("ul",[s("li",[a._v("The Seeds Card MFE is a React micro frontend that is visible on the My Dashboard page. The MFE makes an API call to the banking microservice to fetch a numeric result depending on the configured card type. The value displayed will change as the configuration is changed.")]),a._v(" "),s("li",[a._v("The MFE is authorization-aware and will pass the bearer token to the microservice for authorization and authentication. If you render the dashboard page and you aren't authenticated the widget shows an error message.")]),a._v(" "),s("li",[a._v("This widget emits events that are consumed by the Seedscard Transaction Table widget")])]),a._v(" "),s("h4",{attrs:{id:"_2-seeds-card-ng"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-seeds-card-ng"}},[a._v("#")]),a._v(" 2. Seeds Card NG")]),a._v(" "),s("p",[s("img",{attrs:{src:e(904),alt:"SeedCardNG.png"}})]),a._v(" "),s("ul",[s("li",[a._v("The Seeds Card NG MFE is an Angular widget that is identical to the Seeds Card widget above except for the choice of front end technology.")]),a._v(" "),s("li",[a._v("This MFE communicates with Seedscard Transaction Table widget which is implemented in React.")])]),a._v(" "),s("h4",{attrs:{id:"_3-manage-users"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-manage-users"}},[a._v("#")]),a._v(" 3. Manage Users")]),a._v(" "),s("p",[a._v("Authorized View\n"),s("img",{attrs:{src:e(905),alt:"ManageUsersAuth.png"}})]),a._v(" "),s("p",[a._v("Not Authorized View\n"),s("img",{attrs:{src:e(906),alt:"ManageUsersNoAuth.png"}})]),a._v(" "),s("ul",[s("li",[a._v("The Manage Users MFE makes an API call to Entando Identity Management to fetch user information. The MFE is visible under the dropdown under the username when the user is logged into the app.")]),a._v(" "),s("li",[a._v("By default the users provisioned in the application do not include the authorization required to manage users in Entando Identity Management. This is used to demonstrate role based access control for an MFE using Keycloak. To enable the Manage Users widget login to Keycloak and assign the "),s("code",[a._v("view-users")]),a._v(" and "),s("code",[a._v("manage-users")]),a._v(" roles from the realm-management client to the desired user.")])]),a._v(" "),s("h4",{attrs:{id:"_4-seedscard-transaction-table"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-seedscard-transaction-table"}},[a._v("#")]),a._v(" 4. Seedscard Transaction Table")]),a._v(" "),s("p",[s("img",{attrs:{src:e(907),alt:"TransactionTable.png"}})]),a._v(" "),s("ul",[s("li",[a._v("This MFE is a React micro frontend that consumes events from the Card MFEs detailed above.")]),a._v(" "),s("li",[a._v("The Transaction Table widget makes an API call to the banking microservice to fetch transaction data for the logged in user.")])]),a._v(" "),s("h4",{attrs:{id:"_5-signup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-signup"}},[a._v("#")]),a._v(" 5. Signup")]),a._v(" "),s("p",[s("img",{attrs:{src:e(908),alt:"SignUp.png"}})]),a._v(" "),s("ul",[s("li",[a._v("The Sign Up MFE is a form widget that makes an API call to the customer microservice to create a new user. The Signup MFE is visible on the sign up page and can be accessed from any page when a user is not authenticated.")])]),a._v(" "),s("h4",{attrs:{id:"_6-alert-icons"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-alert-icons"}},[a._v("#")]),a._v(" 6. Alert Icons")]),a._v(" "),s("p",[s("img",{attrs:{src:e(909),alt:"AlertIcons.png"}})]),a._v(" "),s("ul",[s("li",[a._v("The Alert Icon MFE displays an icon on the dashboard page and includes a configuration MFE to allow the user to select the appropriate icon and datatype to display.")]),a._v(" "),s("li",[a._v("The Alert Icon MFE makes an API call to the banking microservice to fetch data in the default deployment.")])]),a._v(" "),s("h3",{attrs:{id:"configuration-micro-frontends"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration-micro-frontends"}},[a._v("#")]),a._v(" Configuration Micro Frontends")]),a._v(" "),s("p",[a._v("Many of the MFEs detailed above include configuration screens visible in the App Builder when the MFE is placed on a page. In the App Builder navigate to "),s("code",[a._v("Components -> Micro frontends & Widgets")]),a._v(" to see the configured MFEs. To see the rendered config screen place the MFEs above on a new page.")]),a._v(" "),s("h3",{attrs:{id:"microservices"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#microservices"}},[a._v("#")]),a._v(" Microservices")]),a._v(" "),s("p",[a._v("The application includes two microservices (service paths: "),s("code",[a._v("/banking")]),a._v(" and "),s("code",[a._v("/customer")]),a._v(") to support the data visible in the MFEs detailed above. Both microservices demonstrate the automated deployment and linking of a microservice to an Entando application via the Entando operator.")]),a._v(" "),s("p",[a._v("The data for the microservices is created using Liquibase and demonstrates using the operator and Liquibase + Spring Boot to automatically provision data into an environment. The demo data is available in the source code for the microservices on GitHub.")]),a._v(" "),s("h3",{attrs:{id:"static-widgets"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#static-widgets"}},[a._v("#")]),a._v(" Static Widgets")]),a._v(" "),s("p",[a._v("The application uses static HTML, FreeMarker, and JavaScript widgets to display content including headers, footers, images and other content in the application. To view the static widgets log into the App builder and select "),s("code",[a._v("Components -> Micro frontends & Widgets")])]),a._v(" "),s("h3",{attrs:{id:"static-cms-content"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#static-cms-content"}},[a._v("#")]),a._v(" Static CMS Content")]),a._v(" "),s("p",[a._v("The application makes extensive use of the Entando CMS. This includes the creation of content templates, content types, and content. If you want to learn more about the Entando CMS in the application log into the App Builder and select "),s("code",[a._v("Content ->  Templates")]),a._v(", "),s("code",[a._v("Content -> Management")]),a._v(", or "),s("code",[a._v("Content -> Types")]),a._v(" as good starting points to view the content and static assets.")]),a._v(" "),s("h2",{attrs:{id:"installation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[a._v("#")]),a._v(" Installation")]),a._v(" "),s("h3",{attrs:{id:"installation-in-openshift"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation-in-openshift"}},[a._v("#")]),a._v(" Installation in OpenShift")]),a._v(" "),s("ol",[s("li",[a._v("Prepare OpenShift")])]),a._v(" "),s("p",[a._v("Create a namespace")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("oc new-project entando\n")])])]),s("p",[a._v("Deploy the Entando custom resources")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" -xz\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("oc create -f dist/crd/\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("Deploy the sample application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - -O https://raw.githubusercontent.com/entando-samples/standard-demo/v6.3.0/deployment/sd-demo-openshift.yaml\n")])])]),s("p",[a._v("Get the base URL of your OpenShift instance (if running in CRC or minishift this will be the IP of your local cluster). If you are using an IP based public URL add "),s("code",[a._v(".nip.io")]),a._v(" to the end. In the command below replace "),s("code",[a._v("<YOUR_CLUSTER_URL>")]),a._v(" with the value of the ingress for your cluster.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sed")]),a._v(" -i "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"s/apps.rd.entando.org/<YOUR_CLUSTER_URL>/"')]),a._v(" sd-demo-openshift.yaml\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("oc create -f sd-demo-openshift.yaml\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("Watch the application start")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("watch")]),a._v(" oc get pods -n entando\n")])])]),s("p",[a._v("Watch the installation until the cluster is ready for use, indicated by a pod named quickstart-server-* with 3/3 in the READY column and RUNNING in the STATUS column. Use CTRL-C to stop watching the deployment")]),a._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[a._v("Get the ingress path to your application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("oc get ingress -n entando\n")])])]),s("p",[a._v("Copy the value that starts with "),s("code",[a._v("quickstart-entando")]),a._v(" under hosts. Then in your browser open the app-builder by appending "),s("code",[a._v("/app-builder/")]),a._v(" (trailing slash is important) and the end user application at "),s("code",[a._v("/entando-de-app")]),a._v(".")]),a._v(" "),s("p",[a._v("For example:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("quickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/entando-de-app/\nquickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/app-builder/\n")])])]),s("h3",{attrs:{id:"installation-in-public-cloud-aks-eks-gke"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation-in-public-cloud-aks-eks-gke"}},[a._v("#")]),a._v(" Installation in Public Cloud (AKS, EKS, GKE)")]),a._v(" "),s("p",[a._v("Follow the cluster setup instructions for your public cloud instance for "),s("RouterLink",{attrs:{to:"/v6.3/tutorials/devops/installation/azure-kubernetes-service/azure-install.html"}},[a._v("Azure AKS")]),a._v(", "),s("RouterLink",{attrs:{to:"/v6.3/tutorials/devops/installation/elastic-kubernetes-service/eks-install.html"}},[a._v("Amazon EKS")]),a._v(" or "),s("RouterLink",{attrs:{to:"/v6.3/tutorials/devops/installation/google-cloud-platform/"}},[a._v("Google GKE")]),a._v(". Then follow the deployment instructions below instead of deploying the default Entando application.")],1),a._v(" "),s("ol",[s("li",[a._v("Prepare Kubernetes")])]),a._v(" "),s("p",[a._v("Create a namespace")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl create namespace entando\n")])])]),s("p",[a._v("Deploy the Entando custom resources")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" -xz\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl create -f dist/crd/\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("Deploy the sample application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - -O https://raw.githubusercontent.com/entando-samples/standard-demo/v6.3.0/deployment/sd-demo-cloud.yaml\n")])])]),s("p",[a._v("In the command below replace "),s("code",[a._v("<YOUR_NGINX_INGRESS_IP>")]),a._v(" with the value of the IP you retrieved for nginx in setting up your public cloud cluster.")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sed")]),a._v(" -i "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"s/apps.rd.entando.org/<YOUR_NGINX_INGRESS_IP>.nip.io/"')]),a._v(" sd-demo-cloud.yaml\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl create -f sd-demo-cloud.yaml\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("Watch the application start")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("watch")]),a._v(" kubectl get pods -n entando\n")])])]),s("p",[a._v("Watch the installation until the cluster is ready for use, indicated by a pod named quickstart-server-* with 3/3 in the READY column and RUNNING in the STATUS column. Use CTRL-C to stop watching the deployment")]),a._v(" "),s("ol",{attrs:{start:"4"}},[s("li",[a._v("Get the ingress path to your application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("kubectl get ingress -n entando\n")])])]),s("p",[a._v("Copy the value that starts with "),s("code",[a._v("quickstart-entando")]),a._v(" under hosts. Then in your browser open the app-builder by appending "),s("code",[a._v("/app-builder/")]),a._v(" (trailing slash is important) and the end user application at "),s("code",[a._v("/entando-de-app")]),a._v(".")]),a._v(" "),s("p",[a._v("For example:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("quickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/entando-de-app/\nquickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/app-builder/\n")])])]),s("h3",{attrs:{id:"installation-in-local-environment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#installation-in-local-environment"}},[a._v("#")]),a._v(" Installation in Local Environment")]),a._v(" "),s("p",[a._v("The instructions below include setting up a local Kubernetes instance using multipass and K3s.")]),a._v(" "),s("ol",[s("li",[a._v("Install Kubernetes\nInstall "),s("a",{attrs:{href:"https://multipass.run/#install",target:"_blank",rel:"noopener noreferrer"}},[a._v("Multipass"),s("OutboundLink")],1)])]),a._v(" "),s("p",[a._v("Launch VM")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("multipass launch --name ubuntu-lts --cpus "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("4")]),a._v(" --mem 8G --disk 20G\n")])])]),s("p",[a._v("Open Ubuntu shell")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("multipass shell ubuntu-lts\n")])])]),s("p",[a._v("Install k3s")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -sfL https://get.k3s.io "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sh")]),a._v(" -\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("Prepare Kubernetes")])]),a._v(" "),s("p",[a._v("Create a namespace")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" kubectl create namespace entando\n")])])]),s("p",[a._v("Deploy the Entando custom resources")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - https://raw.githubusercontent.com/entando/entando-releases/v6.3.0/dist/qs/custom-resources.tar.gz "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("tar")]),a._v(" -xz\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" kubectl create -f dist/crd/\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("Deploy the sample application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("curl")]),a._v(" -L -C - -O https://raw.githubusercontent.com/entando-samples/standard-demo/v6.3.0/deployment/sd-demo-kubernetes.yaml\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ROUTING_SUFFIX")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("hostname")]),a._v(" -I "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v("'{print $1}'")]),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v(")")])]),a._v(".nip.io\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sed")]),a._v(" -i "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"s/apps.rd.entando.org/'),s("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$ROUTING_SUFFIX")]),a._v('/"')]),a._v(" sd-demo-kubernetes.yaml\n")])])]),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" kubectl create -f sd-demo-kubernetes.yaml\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[a._v("Watch the application start")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("watch")]),a._v(" kubectl get pods -n entando\n")])])]),s("p",[a._v("Watch the installation until the cluster is ready for use, indicated by a pod named quickstart-server-* with 3/3 in the READY column and RUNNING in the STATUS column. Use CTRL-C to stop watching the deployment")]),a._v(" "),s("ol",{attrs:{start:"5"}},[s("li",[a._v("Get the ingress path to your application")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" kubectl get ingress -n entando\n")])])]),s("p",[a._v("Copy the value that starts with "),s("code",[a._v("quickstart-entando")]),a._v(" under hosts. Then in your browser open the app-builder by appending "),s("code",[a._v("/app-builder/")]),a._v(" (trailing slash is important) and the end user application at "),s("code",[a._v("/entando-de-app")]),a._v(".")]),a._v(" "),s("p",[a._v("For example:")]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("quickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/entando-de-app/\nquickstart-entando."),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("YOUR_IP_HERE"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(".nip.io/app-builder/\n")])])]),s("h2",{attrs:{id:"source-code"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#source-code"}},[a._v("#")]),a._v(" Source Code")]),a._v(" "),s("p",[a._v("The source the Entando sample application is open source and can be found with our other open source examples and tutorials on GitHub at:")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://github.com/entando-samples/standard-demo",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://github.com/entando-samples/standard-demo"),s("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports},903:function(a,t,e){a.exports=e.p+"assets/img/SeedCard.5cb847f6.png"},904:function(a,t,e){a.exports=e.p+"assets/img/SeedCardNG.9c86213f.png"},905:function(a,t,e){a.exports=e.p+"assets/img/ManageUsersAuth.2b62383f.png"},906:function(a,t,e){a.exports=e.p+"assets/img/ManageUsersNoAuth.f3f3f9a2.png"},907:function(a,t,e){a.exports=e.p+"assets/img/TransactionTable.8a42324a.png"},908:function(a,t,e){a.exports=e.p+"assets/img/SignUp.e3bc2ae9.png"},909:function(a,t,e){a.exports=e.p+"assets/img/AlertIcons.a6dc0e3d.png"}}]);