(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{1721:function(e,t,s){"use strict";s.r(t);var a=s(36),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"getting-started-with-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-started-with-entando"}},[e._v("#")]),e._v(" Getting Started with Entando")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),a("p",[a("strong",[e._v("Mac:")]),e._v(" Entando 6 is not currently compatible with the Apple M1 ARM64 architecture found in some newer Macs.")])]),e._v(" "),a("h2",{attrs:{id:"try-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#try-entando"}},[e._v("#")]),e._v(" Try Entando")]),e._v(" "),a("p",[e._v("Set up Entando using two simple steps or install manually for your specific needs. Then try the platform with a simple widget or walk through the "),a("strong",[e._v("Welcome Wizard")]),e._v(" in our App Builder. For a more in-depth experience, check out our "),a("strong",[e._v("Standard Banking Demo")]),e._v(".")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#automatic-install"}},[e._v("Automatic Install")]),e._v(": The fastest way to locally install and start up Entando in Kubernetes.")]),e._v(" "),a("li",[a("a",{attrs:{href:"#manual-install"}},[e._v("Manual Install")]),e._v(": Useful if you want a shared cluster or a custom local instance.")])]),e._v(" "),a("p",[e._v("Once you're setup, check out:")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/create/pb/publish-simple-bundle.html"}},[e._v("Build a simple Bundle and create an App")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/docs/compose/welcome-wizard.html"}},[e._v("Welcome Wizard")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/solution/install-standard-demo.html"}},[e._v("Install our Standard Banking Demo")])],1)]),e._v(" "),a("h2",{attrs:{id:"learn-about-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#learn-about-entando"}},[e._v("#")]),e._v(" Learn about Entando")]),e._v(" "),a("p",[e._v("Learn about what Entando can do top down or explore the elements that make developing applications on Kubernetes faster and easier.")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/docs/"}},[e._v("Introduction to Entando ")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/#learning-paths"}},[e._v("Learning Paths")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/docs/getting-started/concepts-overview.html"}},[e._v("Concepts Overview")])],1)]),e._v(" "),a("h2",{attrs:{id:"automatic-install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#automatic-install"}},[e._v("#")]),e._v(" Automatic Install")]),e._v(" "),a("p",[e._v("Automatically install Entando via the Entando command-line interface (CLI) and prepare a local developer environment with default settings.\nThe following steps launch an Ubuntu VM via Multipass, install Kubernetes, then deploy Entando to it.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Install "),a("a",{attrs:{href:"https://multipass.run/#install",target:"_blank",rel:"noopener noreferrer"}},[e._v("Multipass"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Install Entando into Kubernetes on Ubuntu using the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/reference/entando-cli.html"}},[e._v("Entando CLI")])],1)])]),e._v(" "),a("EntandoCode",[e._v(' curl -sL "https://get.entando.org" | ENTANDO_RELEASE="'+e._s(e.$site.themeConfig.entando.fixpack.v632)+'" bash\n')]),e._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[e._v("The progress of the install will be displayed on the console. Installation can take 10+ minutes depending on how long the Docker images take to download. The sequence of steps performed by the CLI is identical to the manual steps below; to understand what the CLI does, review the manual steps.")]),e._v(" "),a("li",[e._v("The URL to access the "),a("code",[e._v("Entando App Builder")]),e._v(" will print to the console once the install completes.")]),e._v(" "),a("li",[e._v("Login with username:"),a("code",[e._v("admin")]),e._v(" and password: "),a("code",[e._v("adminadmin")]),e._v(". Refer to "),a("a",{attrs:{href:"#log-in-to-entando"}},[e._v("Log in to Entando")]),e._v(" for more information and next steps.")])]),e._v(" "),a("h2",{attrs:{id:"manual-install"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#manual-install"}},[e._v("#")]),e._v(" Manual Install")]),e._v(" "),a("p",[e._v("Configure a shared cluster or customize a local developer environment. This is a learn-as-you-go approach. It will give you a working knowledge of Kubernetes as you get Entando up and running in a local environment. The process is as follows:")]),e._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#install-kubernetes"}},[e._v("Install Kubernetes")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#prepare-kubernetes"}},[e._v("Prepare Kubernetes Environment")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#deploy-entando"}},[e._v("Deploy Entando")])])]),e._v(" "),a("p",[e._v("Note: For advanced or long-time Entando users, check out our "),a("a",{attrs:{href:"quick-reference"}},[e._v("Quick Reference")]),e._v(" install guide for just the steps.")]),e._v(" "),a("p",[e._v("We've tested a variety of Kubernetes implementations, including Minikube, Minishift, CodeReady Containers, K3s, and Microk8s, to find the optimal combination of low cpu/memory usage, fast startup times, and minimal configuration. After downloading the necessary files, you'll have your own instance of Kubernetes up and running in <60 seconds.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("What's Needed to Run Kubernetes?")]),e._v(" "),a("p",[e._v("Kubernetes is a container orchestrator designed to manage a server cluster. It requires at least one master node running a Linux OS. A lightweight ubuntu VM can be created in seconds with Multipass. Choosing a Type 1 hypervisor eliminates a guest OS, maximizing speed and performance.")])]),e._v(" "),a("h3",{attrs:{id:"install-kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-kubernetes"}},[e._v("#")]),e._v(" Install Kubernetes")]),e._v(" "),a("h4",{attrs:{id:"enable-hypervisor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-hypervisor"}},[e._v("#")]),e._v(" Enable Hypervisor")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Why a Hypervisor?")]),e._v(" "),a("p",[e._v("Hypervisors allow you to create and run virtual machines. Virtualization software that run on top of your operating system like VirtualBox or VMWare Workstation are Type 2 hypervisors. Type 1 hypervisors run on bare metal.")])]),e._v(" "),a("p",[e._v("Let's install a Type 1 hypervisor for optimal performance.")]),e._v(" "),a("p",[a("strong",[e._v("Mac:")]),e._v(" Install "),a("code",[e._v("hyperkit")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" hyperkit\n")])])]),a("p",[a("strong",[e._v("Windows:")]),e._v(" "),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v?redirectedfrom=MSDN",target:"_blank",rel:"noopener noreferrer"}},[e._v("Install Hyper-V"),a("OutboundLink")],1)]),e._v(" "),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What if my machine doesn't support hyperkit or Hyper-V?")]),e._v(" "),a("p",[e._v("Use a Type 2 hypervisor that runs on top of your operating system")]),e._v(" "),a("ul",[a("li",[e._v("Install Virtual Box:\n"),a("a",{attrs:{href:"https://multipass.run/docs/installing-on-macos",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mac"),a("OutboundLink")],1),e._v(" "),a("a",{attrs:{href:"https://multipass.run/docs/installing-on-windows",target:"_blank",rel:"noopener noreferrer"}},[e._v("Windows"),a("OutboundLink")],1)])])]),e._v(" "),a("hr"),e._v(" "),a("br"),e._v(" "),a("h4",{attrs:{id:"launch-ubuntu-vm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#launch-ubuntu-vm"}},[e._v("#")]),e._v(" Launch Ubuntu VM")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Why Multipass?")]),e._v(" "),a("p",[e._v("Multipass is a cross-platform tool developed by the publishers of Ubuntu to create lightweight Ubuntu VMs in seconds.")])]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Install "),a("a",{attrs:{href:"https://multipass.run/#install",target:"_blank",rel:"noopener noreferrer"}},[e._v("Multipass"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Launch VM")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("multipass launch --name ubuntu-lts --cpus "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("4")]),e._v(" --mem 8G --disk 20G\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Open VM shell")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("multipass shell ubuntu-lts\n")])])]),a("h4",{attrs:{id:"run-kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-kubernetes"}},[e._v("#")]),e._v(" Run Kubernetes")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Why K3s?")]),e._v(" "),a("p",[e._v("K3s is a certified Kubernetes distribution designed for production workloads in resource-constrained environments.")]),e._v(" "),a("p",[e._v("It's packaged as a single <50MB binary that reduces the dependencies and steps needed to install, run, and auto-update a production Kubernetes cluster.")])]),e._v(" "),a("ol",[a("li",[e._v("Install "),a("code",[e._v("K3s")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -sfL https://get.k3s.io "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sh")]),e._v(" -\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Check for "),a("code",[e._v("Ready")]),e._v(" "),a("code",[e._v("STATUS")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("node")]),e._v("\n")])])]),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What's running out of the box?")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -A\n")])])])]),e._v(" "),a("hr"),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Congratulations!")]),e._v(" "),a("p",[e._v("You now have a local instance of Kubernetes up and running.")])]),e._v(" "),a("p",[e._v("Now that Kubernetes is running, you can set up kubectl to send commands directly to K3s from the host machine, rather than from within the VM. See the instructions "),a("a",{attrs:{href:"https://rancher.com/docs/k3s/latest/en/cluster-access/",target:"_blank",rel:"noopener noreferrer"}},[e._v("here"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"prepare-kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prepare-kubernetes"}},[e._v("#")]),e._v(" Prepare Kubernetes")]),e._v(" "),a("p",[e._v("To install Entando, we'll add "),a("code",[e._v("Custom Resources")]),e._v(", create a "),a("code",[e._v("Namespace")]),e._v(", download a "),a("code",[e._v("Helm")]),e._v(" chart, and configure external access to our cluster.")]),e._v(" "),a("h4",{attrs:{id:"create-namespace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-namespace"}},[e._v("#")]),e._v(" Create Namespace")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("What are Namespaces?")]),e._v(" "),a("p",[e._v("Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called "),a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",target:"_blank",rel:"noopener noreferrer"}},[e._v("namespaces"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("You can use namespaces to allocate resources and set cpu/memory limits for individual projects or teams. They can also encapsulate projects from one another.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl create namespace entando\n")])])]),a("h4",{attrs:{id:"add-custom-resources"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-custom-resources"}},[e._v("#")]),e._v(" Add Custom Resources")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Why Custom Resources?")]),e._v(" "),a("p",[e._v("Standard resources in Kubernetes include things like "),a("code",[e._v("Pods")]),e._v(", which are groups of one or more containers, "),a("code",[e._v("Services")]),e._v(", the way to call or access pods, and "),a("code",[e._v("Ingresses")]),e._v(", to enable external access to Services.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Custom resources"),a("OutboundLink")],1),e._v(" let you store and retrieve structured data. Combining a custom resource with a custom controller allows you to define a desired state to automate the running of your applications or services in a Kubernetes cluster.")])]),e._v(" "),a("p",[e._v("Examples of custom resources in Entando are:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("Entando App Engine")])]),e._v(" "),a("li",[a("code",[e._v("Entando Identity Management System")])])]),e._v(" "),a("p",[e._v("From your Ubuntu shell")]),e._v(" "),a("ol",[a("li",[e._v("Download and install custom resource definitions")])]),e._v(" "),a("EntandoCode",[e._v(" sudo kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml ")]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Install namespace scoped resources")])]),e._v(" "),a("EntandoCode",[e._v(" sudo kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml ")]),e._v(" "),a("h4",{attrs:{id:"download-helm-chart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#download-helm-chart"}},[e._v("#")]),e._v(" Download Helm Chart")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("What is Helm?")]),e._v(" "),a("p",[e._v("Helm is a package manager for Kubernetes that helps you define, install, and upgrade Kubernetes applications.\nThis "),a("em",[e._v("Getting Started")]),e._v(" guide uses a Helm-generated file with a number of default values to help get you started faster,\ne.g. use embedded databases, exclude OpenShift support, etc. If you want to change any of those defaults, please see "),a("a",{attrs:{href:"https://github.com/entando-k8s/entando-helm-quickstart",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://github.com/entando-k8s/entando-helm-quickstart"),a("OutboundLink")],1),e._v(".")])]),e._v(" "),a("ol",[a("li",[e._v("Install Helm")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" snap "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" helm --classic\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Download the Entando Helm template")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("tar")]),e._v(" xvz\n")])])]),a("h4",{attrs:{id:"configure-access-to-your-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-access-to-your-cluster"}},[e._v("#")]),e._v(" Configure Access to Your Cluster")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("What about Networking?")]),e._v(" "),a("p",[e._v("Entando sets up "),a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/services-networking/ingress/",target:"_blank",rel:"noopener noreferrer"}},[a("code",[e._v("Ingresses")]),a("OutboundLink")],1),e._v(" in Kubernetes to expose HTTP routes from outside the cluster to services within the cluster. We'll use this to access Entando from a local browser.")]),e._v(" "),a("p",[e._v("If you run into network issues during startup, or if you are using Windows for your local development instance, please see "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/reference/local-tips-and-tricks.html#network-issues"}},[e._v("the tips")]),e._v(". Symptoms can include Entando failing to completely start the first time or a working Entando instance failing to restart later.")],1)]),e._v(" "),a("p",[e._v("To set up external access to your cluster, you'll need to replace the value of\n"),a("code",[e._v("entando.default.routing.suffix")]),e._v(" with your Ubuntu IP.")]),e._v(" "),a("ol",[a("li",[e._v("Get the IP address of your Ubuntu VM")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("hostname")]),e._v(" -I "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("awk")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'{print $1}'")]),e._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Save that value for the deployment steps below")])]),e._v(" "),a("h3",{attrs:{id:"deploy-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-entando"}},[e._v("#")]),e._v(" Deploy Entando")]),e._v(" "),a("p",[e._v("To speed up the "),a("em",[e._v("Getting Started")]),e._v(" environment, embedded databases are used by default for these components.\nSee "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/devops/default-database.html"}},[e._v("this tutorial")]),e._v(" for more information on how to change your\ndatabase connection.")],1),e._v(" "),a("ol",[a("li",[e._v("Enter the Helm quickstart directory")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" entando-helm-quickstart-6.3.2\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Edit the file in "),a("code",[e._v("sample-configmaps/entando-operator-config.yaml")]),e._v(" by uncommenting the value for "),a("code",[e._v("entando.default.routing.suffix:")]),e._v(" and setting the value to the IP address of your Ubuntu VM plus "),a("code",[e._v(".nip.io")]),e._v(". For example, "),a("code",[e._v("entando.default.routing.suffix: 192.168.64.21.nip.io")]),e._v(". Pay attention to yaml spacing.")])]),e._v(" "),a("p",[e._v("Reduced network speed or Docker Hub traffic controls may cause the Entando install to timeout. Use the ConfigMap settings below to increase the thresholds for image downloads.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("entando.pod.completion.timeout.seconds: "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"1200"')]),e._v("\nentando.pod.readiness.timeout.seconds: "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"1200"')]),e._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Deploy your config map")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl apply -f sample-configmaps/entando-operator-config.yaml  -n entando\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Run Helm and deploy your Entando application")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" helm template quickstart ./ "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl apply -n entando -f -\n")])])]),a("hr"),e._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[e._v("Use the "),a("code",[e._v("get pods --watch")]),e._v(" command to observe Entando starting up")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl -n entando get pods --watch\n")])])]),a("details",[a("summary",[e._v("What does a successful startup look like?")]),e._v(" "),a("ul",[a("li",[e._v("First, you'll see the Entando operator: "),a("code",[e._v("ContainerCreating")]),e._v(" > "),a("code",[e._v("Running")])]),e._v(" "),a("li",[e._v("Next, the Entando composite app deployer: "),a("code",[e._v("Pending")]),e._v(" > "),a("code",[e._v("ContainerCreating")]),e._v(" > "),a("code",[e._v("Running")])]),e._v(" "),a("li",[e._v("Then, Keycloak: "),a("code",[e._v("kc-deployer")]),e._v(" > "),a("code",[e._v("kc-db-deployment")])])]),e._v(" "),a("p",[a("strong",[e._v("Jobs / Deployments")])]),e._v(" "),a("ul",[a("li",[e._v("Jobs, like "),a("code",[e._v("kc-db-preparation-job")]),e._v(", run once and are "),a("code",[e._v("Completed")]),e._v(": "),a("code",[e._v("0/1")])]),e._v(" "),a("li",[e._v("Database deployments, like "),a("code",[e._v("kc-db-deployment")]),e._v(", should end up as "),a("code",[e._v("Running")]),e._v(": "),a("code",[e._v("1/1")])]),e._v(" "),a("li",[e._v("The Keycloak server deployment, "),a("code",[e._v("kc-server-deployment")]),e._v(", should end up as "),a("code",[e._v("Running")]),e._v(": "),a("code",[e._v("1/1")])]),e._v(" "),a("li",[e._v("The deployment is done when the "),a("code",[e._v("quickstart-composite-app-deployer")]),e._v(" pod has a status of "),a("code",[e._v("Completed")])])]),e._v(" "),a("p",[a("strong",[e._v("Lifecycle Events")])]),e._v(" "),a("ul",[a("li",[e._v("Each line represents an event: "),a("code",[e._v("Pending")]),e._v(", "),a("code",[e._v("ContainerCreating")]),e._v(", "),a("code",[e._v("Running")]),e._v(" or "),a("code",[e._v("Completed")])]),e._v(" "),a("li",[e._v("Restarts should ideally be "),a("code",[e._v("0")]),e._v("; otherwise, there was a problem with your cluster, and Kubernetes is trying to self-heal")])]),e._v(" "),a("div",{staticClass:"language-shell-session extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell-session"}},[a("code",[a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token info punctuation"}},[a("span",{pre:!0,attrs:{class:"token user"}},[e._v("ubuntu@test-vm")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),a("span",{pre:!0,attrs:{class:"token path"}},[e._v("~")])]),a("span",{pre:!0,attrs:{class:"token shell-symbol important"}},[e._v("$")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token bash language-bash"}},[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -n entando --watch")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token output"}},[e._v("NAME                                   READY   STATUS              RESTARTS   AGE\nNAME                                     READY   STATUS              RESTARTS   AGE\nentando-operator-5cdf787869-t5xrg        1/1     Running             0          65s\nquickstart-composite-app-deployer-0547   1/1     Running             0          8s\nquickstart-kc-deployer-7879              0/1     ContainerCreating   0          2s\nquickstart-kc-deployer-7879              1/1     Running             0          2s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   0/1     Pending             0          0s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   0/1     Pending             0          3s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   0/1     ContainerCreating   0          3s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   0/1     Running             0          5s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   0/1     Running             0          99s\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5   1/1     Running             0          107s\nquickstart-kc-deployer-7879                        0/1     Completed           0          2m16s\nquickstart-kc-deployer-7879                        0/1     Terminating         0          2m16s\nquickstart-kc-deployer-7879                        0/1     Terminating         0          2m16s\nquickstart-eci-deployer-7439                       0/1     Pending             0          0s\nquickstart-eci-deployer-7439                       0/1     Pending             0          0s\nquickstart-eci-deployer-7439                       0/1     ContainerCreating   0          0s\nquickstart-eci-deployer-7439                       1/1     Running             0          2s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   0/1     Pending             0          0s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   0/1     Pending             0          0s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   0/1     ContainerCreating   0          0s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   0/1     Running             0          2s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   0/1     Running             0          35s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   1/1     Running             0          43s\nquickstart-eci-deployer-7439                         0/1     Completed           0          51s\nquickstart-eci-deployer-7439                         0/1     Terminating         0          52s\nquickstart-eci-deployer-7439                         0/1     Terminating         0          52s\nquickstart-deployer-2922                             0/1     Pending             0          0s\nquickstart-deployer-2922                             0/1     Pending             0          0s\nquickstart-deployer-2922                             0/1     ContainerCreating   0          0s\nquickstart-deployer-2922                             1/1     Running             0          1s\nquickstart-server-deployment-75bb794647-bt6xk        0/1     Pending             0          0s\nquickstart-server-deployment-75bb794647-bt6xk        0/1     Pending             0          3s\nquickstart-server-deployment-75bb794647-bt6xk        0/1     ContainerCreating   0          3s\nquickstart-server-deployment-75bb794647-bt6xk        0/1     Running             0          4s\nquickstart-server-deployment-75bb794647-bt6xk        0/1     Running             0          2m19s\nquickstart-server-deployment-75bb794647-bt6xk        1/1     Running             0          2m21s\nquickstart-ab-deployment-7d78b79c-q7r6z              0/1     Pending             0          0s\nquickstart-ab-deployment-7d78b79c-q7r6z              0/1     Pending             0          0s\nquickstart-ab-deployment-7d78b79c-q7r6z              0/1     ContainerCreating   0          0s\nquickstart-ab-deployment-7d78b79c-q7r6z              0/1     Running             0          1s\nquickstart-ab-deployment-7d78b79c-q7r6z              0/1     Running             0          12s\nquickstart-ab-deployment-7d78b79c-q7r6z              1/1     Running             0          15s\nquickstart-cm-deployment-86bc545b6f-vtg2c            0/1     Pending             0          0s\nquickstart-cm-deployment-86bc545b6f-vtg2c            0/1     Pending             0          3s\nquickstart-cm-deployment-86bc545b6f-vtg2c            0/1     ContainerCreating   0          3s\nquickstart-cm-deployment-86bc545b6f-vtg2c            0/1     Running             0          5s\nquickstart-cm-deployment-86bc545b6f-vtg2c            0/1     Running             0          98s\nquickstart-cm-deployment-86bc545b6f-vtg2c            1/1     Running             0          99s\nquickstart-deployer-2922                             0/1     Completed           0          4m28s\nquickstart-deployer-2922                             0/1     Terminating         0          4m29s\nquickstart-deployer-2922                             0/1     Terminating         0          4m29s\nquickstart-composite-app-deployer-0547               0/1     Completed           0          7m44s\nquickstart-composite-app-deployer-0547               0/1     Terminating         0          8m13s\nquickstart-composite-app-deployer-0547               0/1     Terminating         0          8m13s\n")])])])])]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("Press "),a("code",[e._v("Ctrl-C")]),e._v(" to exit the watch command once everything is up and running.")]),e._v(" "),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What pods come out of the box?")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -n entando\n")])])]),a("div",{staticClass:"language-shell-session extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell-session"}},[a("code",[a("span",{pre:!0,attrs:{class:"token output"}},[e._v("NAME                                                 READY   STATUS    RESTARTS   AGE\nentando-operator-5cdf787869-t5xrg                    1/1     Running   0          10m\nquickstart-kc-server-deployment-5f9d7897c6-7jnq5     1/1     Running   0          9m20s\nquickstart-eci-k8s-svc-deployment-699b47595d-wxmmb   1/1     Running   0          7m2s\nquickstart-server-deployment-75bb794647-bt6xk        1/1     Running   0          6m10s\nquickstart-ab-deployment-7d78b79c-q7r6z              1/1     Running   0          3m48s\nquickstart-cm-deployment-86bc545b6f-vtg2c            1/1     Running   0          3m30s\n\n")])])])])]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("Get the URL to access Entando from your local browser")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get ingress -n entando -o "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("jsonpath")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[1].path}{\"\\n\"}'")]),e._v("\n")])])]),a("ul",[a("li",[e._v("Example URL")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("quickstart-entando.192.168.64.33.nip.io/app-builder/\n")])])]),a("hr"),e._v(" "),a("h2",{attrs:{id:"log-in-to-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#log-in-to-entando"}},[e._v("#")]),e._v(" Log in to Entando")]),e._v(" "),a("p",[e._v("Now that we've installed Entando, let's log in to the "),a("code",[e._v("Entando App Builder")])]),e._v(" "),a("p",[a("img",{attrs:{src:s(763),alt:"entando-login.png"}})]),e._v(" "),a("ul",[a("li",[e._v("Username: "),a("code",[e._v("admin")])]),e._v(" "),a("li",[e._v("Password: "),a("code",[e._v("adminadmin")])])]),e._v(" "),a("p",[e._v("After login, change your password to activate your account.")]),e._v(" "),a("ul",[a("li",[e._v("Note: If the login process hangs for more than 5 seconds, refresh the browser.")])]),e._v(" "),a("p",[a("img",{attrs:{src:s(764),alt:"entando-app-builder.png"}})]),e._v(" "),a("p",[e._v("The App Builder is where we'll compose our micro frontends alongside CMS pages and content.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Congratulations!")]),e._v(" "),a("p",[e._v("We now have Entando up and running on Kubernetes in our local environment.")])]),e._v(" "),a("hr"),e._v(" "),a("h2",{attrs:{id:"next-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next-steps"}},[e._v("#")]),e._v(" Next Steps")]),e._v(" "),a("p",[e._v("Choose one of the following actions to continue your journey with Entando!")]),e._v(" "),a("ul",[a("li",[a("p",[a("strong",[e._v("Build Your First Application:")]),e._v(" Use the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/compose/welcome-wizard.html"}},[e._v("Welcome Wizard")]),e._v(" to build your first application via guided prompts.")],1)]),e._v(" "),a("li",[a("p",[a("strong",[e._v("Try a Tutorial:")]),e._v(" Take advantage of the "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/#learning-paths"}},[e._v("Learning Paths")]),e._v(", which organize a few of the most popular tutorials by user type.")],1)]),e._v(" "),a("li",[a("p",[a("strong",[e._v("Dig Deeper into Entando Concepts:")]),e._v(" Review the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/"}},[e._v("Docs")]),e._v(" sections to more deeply understand the Entando building blocks.")],1)]),e._v(" "),a("li",[a("p",[a("strong",[e._v("Learn about the Quickstart Environment:")]),e._v(" See the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/reference/local-tips-and-tricks.html"}},[e._v("Quickstart Tips")]),e._v(" for more information on how to manage your Getting Started or quickstart environment.")],1)])]),e._v(" "),a("hr")],1)}),[],!1,null,null,null);t.default=n.exports},763:function(e,t,s){e.exports=s.p+"assets/img/entando-login.0d7dcc2a.png"},764:function(e,t,s){e.exports=s.p+"assets/img/entando-app-builder.129380b5.png"}}]);