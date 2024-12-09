(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{1558:function(e,t,s){"use strict";s.r(t);var a=s(36),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"get-started-with-entando-in-3-easy-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get-started-with-entando-in-3-easy-steps"}},[e._v("#")]),e._v(" Get Started with Entando in 3 Easy Steps")]),e._v(" "),a("p",[e._v("New to Kubernetes, hypervisors, and Helm charts?")]),e._v(" "),a("p",[e._v("This in-depth guide takes a learn-as-you-go approach, and will give you a working knowledge of Kubernetes as you get Entando up and running in a local environment.")]),e._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#install-kubernetes"}},[e._v("Install Kubernetes")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#prepare-kubernetes-environment"}},[e._v("Prepare Kubernetes Environment")])]),e._v(" "),a("li",[a("a",{attrs:{href:"#deploy-entando"}},[e._v("Deploy Entando")])])]),e._v(" "),a("p",[e._v("Note: For advanced or long-time Entando users, check out our "),a("a",{attrs:{href:"quick-reference"}},[e._v("Quick Reference")]),e._v(" install guide with just the steps.")]),e._v(" "),a("h2",{attrs:{id:"install-kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-kubernetes"}},[e._v("#")]),e._v(" Install Kubernetes")]),e._v(" "),a("p",[e._v("Since Entando is designed to run on Kubernetes, let's get started by installing our own instance of Kubernetes locally.")]),e._v(" "),a("p",[e._v("We've tested a variety of Kubernetes implementations including Minikube, Minishift, CodeReady Containers, K3s, and Microk8s to find the best combination of low cpu/memory usage, fast startup times, and minimal configuration so we can get started quickly. After downloading the necessary files, we'll have our own instance of Kubernetes up and running in < 60 seconds.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("What's Needed to Run Kubernetes")]),e._v(" "),a("p",[e._v("Kubernetes is a container orchestrator designed to manage a server cluster. It requires at least one master node running a Linux OS. We'll be using Multipass to create a lightweight Ubuntu VM in seconds that runs on a bare metal hypervisor for speed and performance.")])]),e._v(" "),a("h3",{attrs:{id:"enable-hypervisor"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#enable-hypervisor"}},[e._v("#")]),e._v(" Enable Hypervisor")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Hypervisors allow you to create and run virtual machines. Virtualization software that run on top of your operating system like VirtualBox or VMWare Workstation are Type 2 hypervisors. Type 1 hypervisors run on bare metal.")])]),e._v(" "),a("p",[e._v("Let's install a bare metal hypervisor for optimal performance.")]),e._v(" "),a("p",[a("strong",[e._v("Mac:")]),e._v(" Install "),a("code",[e._v("hyperkit")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" hyperkit\n")])])]),a("p",[a("strong",[e._v("Windows:")]),e._v(" "),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v?redirectedfrom=MSDN",target:"_blank",rel:"noopener noreferrer"}},[e._v("Install Hyper-V"),a("OutboundLink")],1)]),e._v(" "),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What if my machine doesn't support hyperkit or Hyper-V?")]),e._v(" "),a("p",[e._v("Use a Type 2 hypervisor that runs on top of your operating system:")]),e._v(" "),a("ul",[a("li",[e._v("Install Virtual Box:\n"),a("a",{attrs:{href:"https://multipass.run/docs/installing-on-macos",target:"_blank",rel:"noopener noreferrer"}},[e._v("Mac"),a("OutboundLink")],1),e._v(" "),a("a",{attrs:{href:"https://multipass.run/docs/installing-on-windows",target:"_blank",rel:"noopener noreferrer"}},[e._v("Windows"),a("OutboundLink")],1)])])]),e._v(" "),a("hr"),e._v(" "),a("br"),e._v(" "),a("h3",{attrs:{id:"launch-ubuntu-vm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#launch-ubuntu-vm"}},[e._v("#")]),e._v(" Launch Ubuntu VM")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Multipass is a tool developed by the publishers of Ubuntu to create lightweight Ubuntu VMs in seconds.")])]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Install "),a("a",{attrs:{href:"https://multipass.run/#install",target:"_blank",rel:"noopener noreferrer"}},[e._v("Multipass"),a("OutboundLink")],1)])]),e._v(" "),a("li",[a("p",[e._v("Launch VM")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("multipass launch --name ubuntu-lts --cpus "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("4")]),e._v(" --mem 8G --disk 20G\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Open a shell")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("multipass shell ubuntu-lts\n")])])]),a("h3",{attrs:{id:"run-kubernetes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#run-kubernetes"}},[e._v("#")]),e._v(" Run Kubernetes")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("K3s is a certified Kubernetes distribution designed for production workloads in resource-constrained environments.")]),e._v(" "),a("p",[e._v("It's packaged as a single <40MB binary that reduces the dependencies and steps needed to install, run and auto-update a production Kubernetes cluster.")])]),e._v(" "),a("ol",[a("li",[e._v("Install "),a("code",[e._v("k3s")])])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -sfL https://get.k3s.io "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sh")]),e._v(" -\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Check for "),a("code",[e._v("Ready")]),e._v(" "),a("code",[e._v("STATUS")]),e._v(".")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("node")]),e._v("\n")])])]),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What's running out of the box?")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -A\n")])])])]),e._v(" "),a("hr"),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Congratulations!")]),e._v(" "),a("p",[e._v("You now have a local instance of Kubernetes up and running.")])]),e._v(" "),a("h2",{attrs:{id:"prepare-kubernetes-environment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prepare-kubernetes-environment"}},[e._v("#")]),e._v(" Prepare Kubernetes Environment")]),e._v(" "),a("p",[e._v("To install Entando, we'll add "),a("code",[e._v("Custom Resources")]),e._v(", create a "),a("code",[e._v("Namespace")]),e._v(", download a "),a("code",[e._v("Helm")]),e._v(" chart, and configure external access to our cluster.")]),e._v(" "),a("h3",{attrs:{id:"add-custom-resources"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-custom-resources"}},[e._v("#")]),e._v(" Add Custom Resources")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Standard resources in Kubernetes include things like "),a("code",[e._v("Pods")]),e._v(", which are a group of one or more containers, "),a("code",[e._v("Services")]),e._v(", the way to call or access your pods, and "),a("code",[e._v("Ingresses")]),e._v(", for managing external access to your cluster.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Custom resources let you store and retrieve structured data."),a("OutboundLink")],1),e._v(" Combining a custom resource with a custom controller allows you to define a desired state to automate the running of your applications or services in a Kubernetes cluster.")])]),e._v(" "),a("p",[e._v("Examples of custom resources in Entando are:")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("Entando App Engine")])]),e._v(" "),a("li",[a("code",[e._v("Entando Identity Management System")])])]),e._v(" "),a("p",[e._v("From your Ubuntu shell:")]),e._v(" "),a("ol",[a("li",[e._v("Download custom resource definitions.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("wget")]),e._v(" -c https://developer.entando.com/assets/yaml/custom-resources.tar.gz -O - "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("tar")]),e._v(" -xz\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Create custom resources")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl create -f custom-resources\n")])])]),a("h3",{attrs:{id:"create-namespace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#create-namespace"}},[e._v("#")]),e._v(" Create Namespace")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Kubernetes supports multiple virtual clusters backed by the same physical cluster. These virtual clusters are called namespaces."),a("OutboundLink")],1)]),e._v(" "),a("p",[e._v("You can use namespaces to allocate resources and set cpu/memory limits for individual projects or teams. They can also encapsulate projects from one another.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl create namespace entando\n")])])]),a("h3",{attrs:{id:"download-helm-chart"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#download-helm-chart"}},[e._v("#")]),e._v(" Download Helm Chart")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Helm is a package manager for Kubernetes that helps you define, install, and upgrade Kubernetes applications.")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -L -C - -O https://developer.entando.com/assets/yaml/entando.yaml\n")])])]),a("h3",{attrs:{id:"configure-access-to-your-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-access-to-your-cluster"}},[e._v("#")]),e._v(" Configure Access to Your Cluster")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Entando sets up "),a("code",[e._v("Ingresses")]),e._v(" in Kubernetes to access services from outside your server cluster. We'll use this to access Entando from a local browser.")])]),e._v(" "),a("p",[e._v("To set up external access to your cluster, you'll need to replace the value of "),a("code",[e._v("ENTANDO_DEFAULT_ROUTING_SUFFIX")]),e._v(" with your Ubuntu IP. You can look up your Ubuntu IP, and edit the YAML file manaully, but running the below commands will automatically update the IP address for you.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("IP")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("hostname")]),e._v(" -I "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("awk")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'{print $1}'")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v("\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sed")]),e._v(" -i "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"s/192.168.64.25/'),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$IP")]),e._v('/"')]),e._v(" entando.yaml\n")])])]),a("h2",{attrs:{id:"deploy-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-entando"}},[e._v("#")]),e._v(" Deploy Entando")]),e._v(" "),a("p",[e._v("Deploying the Helm chart will deploy all of the Kubernetes resources required for Entando to run.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl create -f entando.yaml\n")])])]),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -n entando --watch\n")])])]),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What does a successful startup look like?")]),e._v(" "),a("ul",[a("li",[e._v("First, you'll see the Entando operator: "),a("code",[e._v("ContainerCreating")]),e._v(" > "),a("code",[e._v("Running")])]),e._v(" "),a("li",[e._v("Next, the Entando composite app deployer: "),a("code",[e._v("Pending")]),e._v(" > "),a("code",[e._v("ContainerCreating")]),e._v(" > "),a("code",[e._v("Running")])]),e._v(" "),a("li",[e._v("Then, Keycloak: "),a("code",[e._v("kc-deployer")]),e._v(" > "),a("code",[e._v("kc-db-deployment")])])]),e._v(" "),a("p",[a("strong",[e._v("Jobs / Deployments")])]),e._v(" "),a("ul",[a("li",[e._v("Jobs, like "),a("code",[e._v("kc-db-preparation-job")]),e._v(" run once, and are "),a("code",[e._v("Completed")]),e._v(": "),a("code",[e._v("0/1")])]),e._v(" "),a("li",[e._v("Database deployments, like "),a("code",[e._v("kc-db-deployment")]),e._v(", should end up as "),a("code",[e._v("Running")]),e._v(": "),a("code",[e._v("1/1")])]),e._v(" "),a("li",[e._v("The Keycloak server deployment "),a("code",[e._v("kc-server-deployment")]),e._v(", should end up as "),a("code",[e._v("Running")]),e._v(": "),a("code",[e._v("1/1")])]),e._v(" "),a("li",[e._v("The "),a("code",[e._v("quickstart-server-deployment")]),e._v(" should end up as "),a("code",[e._v("3/3")])])]),e._v(" "),a("p",[a("strong",[e._v("Lifecycle Events")])]),e._v(" "),a("ul",[a("li",[e._v("Each line represents an event: "),a("code",[e._v("Pending")]),e._v(", "),a("code",[e._v("ContainerCreating")]),e._v(", "),a("code",[e._v("Running")]),e._v(" or "),a("code",[e._v("Completed")])]),e._v(" "),a("li",[e._v("Restarts should ideally be "),a("code",[e._v("0")]),e._v("; otherwise, there was a problem with your cluster, and Kubernetes is trying to self-heal")])]),e._v(" "),a("div",{staticClass:"language-shell-session extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell-session"}},[a("code",[a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token info punctuation"}},[a("span",{pre:!0,attrs:{class:"token user"}},[e._v("ubuntu@test-vm")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),a("span",{pre:!0,attrs:{class:"token path"}},[e._v("~")])]),a("span",{pre:!0,attrs:{class:"token shell-symbol important"}},[e._v("$")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token bash language-bash"}},[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -n entando --watch")])]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token output"}},[e._v("NAME                                   READY   STATUS              RESTARTS   AGE\nquickstart-operator-8556c9c6f8-9ghwg   0/1     ContainerCreating   0          3s\nquickstart-operator-8556c9c6f8-9ghwg   0/1     Running             0          49s\nquickstart-composite-app-deployer-picaju7bf0   0/1     Pending             0          0s\nquickstart-composite-app-deployer-picaju7bf0   0/1     Pending             0          0s\nquickstart-composite-app-deployer-picaju7bf0   0/1     ContainerCreating   0          0s\nquickstart-composite-app-deployer-picaju7bf0   1/1     Running             0          20s\nquickstart-kc-deployer-mx7ms3sc2l              0/1     Pending             0          0s\nquickstart-kc-deployer-mx7ms3sc2l              0/1     Pending             0          0s\nquickstart-kc-deployer-mx7ms3sc2l              0/1     ContainerCreating   0          0s\nquickstart-operator-8556c9c6f8-9ghwg           1/1     Running             0          88s\nquickstart-kc-deployer-mx7ms3sc2l              1/1     Running             0          19s\nquickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Pending             0          0s\nquickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Pending             0          7s\nquickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     ContainerCreating   0          7s\nquickstart-kc-db-deployment-c57f75d7f-wxmqr    0/1     Running             0          77s\nquickstart-kc-db-deployment-c57f75d7f-wxmqr    1/1     Running             0          87s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Pending             0          0s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Pending             0          0s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Init:0/1            0          0s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Init:0/1            0          13s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     PodInitializing     0          15s\nquickstart-kc-db-preparation-job-1d6ab9b6-7    0/1     Completed           0          17s\nquickstart-kc-server-deployment-66484d596d-qr78q   0/1     Pending             0          0s\nquickstart-kc-server-deployment-66484d596d-qr78q   0/1     Pending             0          0s\nquickstart-kc-server-deployment-66484d596d-qr78q   0/1     ContainerCreating   0          0s\nquickstart-kc-server-deployment-66484d596d-qr78q   0/1     Running             0          3m\nquickstart-kc-server-deployment-66484d596d-qr78q   1/1     Running             0          4m36s\nquickstart-kc-deployer-mx7ms3sc2l                  0/1     Completed           0          6m50s\nquickstart-eci-deployer-kx9nhop22g                 0/1     Pending             0          0s\nquickstart-eci-deployer-kx9nhop22g                 0/1     Pending             0          0s\nquickstart-eci-deployer-kx9nhop22g                 0/1     ContainerCreating   0          0s\nquickstart-eci-deployer-kx9nhop22g                 1/1     Running             0          5s\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Pending             0          0s\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Pending             0          0s\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     ContainerCreating   0          0s\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   0/1     Running             0          97s\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   1/1     Running             0          2m7s\nquickstart-eci-deployer-kx9nhop22g                   0/1     Completed           0          2m15s\nquickstart-deployer-os19rw3eto                       0/1     Pending             0          0s\nquickstart-deployer-os19rw3eto                       0/1     Pending             0          0s\nquickstart-deployer-os19rw3eto                       0/1     ContainerCreating   0          1s\nquickstart-deployer-os19rw3eto                       1/1     Running             0          6s\nquickstart-db-deployment-7fff4c8479-qf469            0/1     Pending             0          0s\nquickstart-db-deployment-7fff4c8479-qf469            0/1     Pending             0          4s\nquickstart-db-deployment-7fff4c8479-qf469            0/1     ContainerCreating   0          4s\nquickstart-db-deployment-7fff4c8479-qf469            0/1     Running             0          7s\nquickstart-db-deployment-7fff4c8479-qf469            1/1     Running             0          19s\nquickstart-db-preparation-job-5a55b267-6             0/1     Pending             0          0s\nquickstart-db-preparation-job-5a55b267-6             0/1     Pending             0          0s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:0/4            0          0s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:0/4            0          4s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:1/4            0          5s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:1/4            0          8s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:2/4            0          9s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:2/4            0          6m42s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:3/4            0          7m20s\nquickstart-db-preparation-job-5a55b267-6             0/1     Init:3/4            0          7m22s\nquickstart-db-preparation-job-5a55b267-6             0/1     PodInitializing     0          7m23s\nquickstart-db-preparation-job-5a55b267-6             0/1     Completed           0          7m25s\nquickstart-server-deployment-5597597575-gtptz        0/3     Pending             0          0s\nquickstart-server-deployment-5597597575-gtptz        0/3     Pending             0          4s\nquickstart-server-deployment-5597597575-gtptz        0/3     ContainerCreating   0          4s\nquickstart-server-deployment-5597597575-gtptz        0/3     Running             0          2m35s\nquickstart-server-deployment-5597597575-gtptz        1/3     Running             0          2m37s\nquickstart-server-deployment-5597597575-gtptz        2/3     Running             0          2m38s\nquickstart-server-deployment-5597597575-gtptz        3/3     Running             0          3m5s\nquickstart-deployer-os19rw3eto                       0/1     Completed           0          11m\nquickstart-composite-app-deployer-picaju7bf0         0/1     Completed           0          20m\n")])])])])]),e._v(" "),a("hr"),e._v(" "),a("p",[e._v("Press "),a("code",[e._v("Ctrl-C")]),e._v(" to exit the watch command once everything is up and running.")]),e._v(" "),a("hr"),e._v(" "),a("details",[a("summary",[e._v("What pods come out of the box?")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get pods -n entando\n")])])]),a("div",{staticClass:"language-shell-session extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell-session"}},[a("code",[a("span",{pre:!0,attrs:{class:"token output"}},[e._v("NAME                                                 READY   STATUS      RESTARTS   AGE\nquickstart-operator-8556c9c6f8-9ghwg                 1/1     Running     0          132m\nquickstart-kc-db-deployment-c57f75d7f-wxmqr          1/1     Running     0          130m\nquickstart-kc-db-preparation-job-1d6ab9b6-7          0/1     Completed   0          129m\nquickstart-kc-server-deployment-66484d596d-qr78q     1/1     Running     0          128m\nquickstart-kc-deployer-mx7ms3sc2l                    0/1     Completed   0          130m\nquickstart-eci-k8s-svc-deployment-7c58c78b55-z52xj   1/1     Running     0          123m\nquickstart-eci-deployer-kx9nhop22g                   0/1     Completed   0          124m\nquickstart-db-deployment-7fff4c8479-qf469            1/1     Running     0          121m\nquickstart-db-preparation-job-5a55b267-6             0/1     Completed   0          121m\nquickstart-server-deployment-5597597575-gtptz        3/3     Running     0          113m\nquickstart-deployer-os19rw3eto                       0/1     Completed   0          121m\nquickstart-composite-app-deployer-picaju7bf0         0/1     Completed   0          131m\n")])])])])]),e._v(" "),a("hr"),e._v(" "),a("h4",{attrs:{id:"log-in-to-entando"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#log-in-to-entando"}},[e._v("#")]),e._v(" Log in to Entando")]),e._v(" "),a("p",[e._v("Now that we've installed Entando, let's log in to "),a("code",[e._v("Entando App Builder")]),e._v(".")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://kubernetes.io/docs/concepts/services-networking/ingress/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ingress exposes HTTP routes from outside the cluster to services within the cluster."),a("OutboundLink")],1)])]),e._v(" "),a("p",[e._v("Get the URL to access Entando from your local browser.")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kubectl get ingress -n entando -o "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("jsonpath")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'{.items[2].spec.rules[*].host}{.items[2].spec.rules[*].http.paths[2].path}{\"\\n\"}'")]),e._v("\n")])])]),a("ul",[a("li",[e._v("Example URL:")])]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("quickstart-entando.192.168.64.33.nip.io/app-builder/\n")])])]),a("hr"),e._v(" "),a("p",[a("img",{attrs:{src:s(640),alt:"entando-login.png"}})]),e._v(" "),a("ul",[a("li",[e._v("Username: admin")]),e._v(" "),a("li",[e._v("Password: adminadmin")])]),e._v(" "),a("p",[e._v("After login, change your password to activate your account.")]),e._v(" "),a("ul",[a("li",[e._v("Note: If the login process hangs for more than 5 seconds, refresh the browser.")])]),e._v(" "),a("p",[a("img",{attrs:{src:s(641),alt:"entando-app-builder.png"}})]),e._v(" "),a("p",[e._v("The App Builder is where we'll compose our micro frontends alongside CMS pages and content.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Congratulations!")]),e._v(" "),a("p",[e._v("We now have Entando up and running on Kubernetes in our local environment.")])]),e._v(" "),a("hr")])}),[],!1,null,null,null);t.default=n.exports},640:function(e,t,s){e.exports=s.p+"assets/img/entando-login.f45454ea.png"},641:function(e,t,s){e.exports=s.p+"assets/img/entando-app-builder.12987ba6.png"}}]);