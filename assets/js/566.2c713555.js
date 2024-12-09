(window.webpackJsonp=window.webpackJsonp||[]).push([[566],{1767:function(e,t,a){"use strict";a.r(t);var o=a(36),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"installation-on-azure-kubernetes-service-aks"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation-on-azure-kubernetes-service-aks"}},[e._v("#")]),e._v(" Installation on Azure Kubernetes Service (AKS)")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("ul",[a("li",[e._v("Azure account\n"),a("ul",[a("li",[e._v("Note: If you're using an Azure free account, you may need to upgrade your account first to enable pay-as-you-go billing. The Azure free account default quota includes just 1-4 vCPU which is not sufficient for this tutorial. There may be a delay before the quotas are updated when you upgrade your account.")])])]),e._v(" "),a("li",[e._v("If you're not using Azure Cloud Shell, you'll also need:\n"),a("ul",[a("li",[e._v("Azure command line tool")]),e._v(" "),a("li",[e._v("Helm3 client")])])])]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("The steps below walk you through installing the Entando platform in an Azure Kubernetes Services (AKS) cluster. These are the basic steps:")]),e._v(" "),a("ul",[a("li",[e._v("Create a single cluster with up to 5 nodes")]),e._v(" "),a("li",[e._v("Install NGINX as an ingress controller")]),e._v(" "),a("li",[e._v("Install Entando")])]),e._v(" "),a("p",[e._v("If you're already comfortable setting up an AKS cluster and installing NGINX, then you may be able to skip to "),a("a",{attrs:{href:"#install-the-entando-custom-resource-definitions"}},[e._v("setting up Entando")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"cluster-setup"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cluster-setup"}},[e._v("#")]),e._v(" Cluster Setup")]),e._v(" "),a("h3",{attrs:{id:"setup-and-connect-to-the-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setup-and-connect-to-the-cluster"}},[e._v("#")]),e._v(" Setup and Connect to the Cluster")]),e._v(" "),a("ol",[a("li",[e._v("Login to Azure: "),a("a",{attrs:{href:"https://portal.azure.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://portal.azure.com/"),a("OutboundLink")],1)]),e._v(" "),a("li",[e._v("Select the "),a("code",[e._v("Kubernetes services")]),e._v(" icon\n"),a("ul",[a("li",[e._v("If the icon isn't visible, click "),a("code",[e._v("More services")]),e._v(" on the right and search for Kubernetes")])])]),e._v(" "),a("li",[e._v("Click "),a("code",[e._v("Create")]),e._v(" in the upper left corner")]),e._v(" "),a("li",[e._v("Select "),a("code",[e._v("Create a Kubernetes cluster")]),e._v(". You'll start with the "),a("code",[e._v("Basics")]),e._v(" tab.")]),e._v(" "),a("li",[e._v("Select a "),a("code",[e._v("Resource group")]),e._v(" or create one with the "),a("code",[e._v("Create new")]),e._v(" link if it you don’t have one, e.g. "),a("code",[e._v("resource-group-1")])]),e._v(" "),a("li",[e._v("Enter a name of your choice for the Kubernetes cluster name, e.g. "),a("code",[e._v("cluster-1")])]),e._v(" "),a("li",[e._v("Pick your "),a("code",[e._v("Region")]),e._v(" if it wasn't automatically selected for you.")]),e._v(" "),a("li",[e._v("In the "),a("code",[e._v("Availability zones")]),e._v(" dropdown pick "),a("strong",[e._v("one and only one")]),e._v(" availability zone\n"),a("ul",[a("li",[e._v("Generally, you could pick more than one but it will result in a failure in a quickstart environment. If you chose more than one availability zone you will have to provision storage, manage node affinity, and provide the correct network configuration to ensure your application deploys. We recommend only doing this for production clusters.")])])]),e._v(" "),a("li",[e._v("Select an "),a("a",{attrs:{href:"https://www.entando.com/page/en/compatibility-guide",target:"_blank",rel:"noopener noreferrer"}},[e._v("Entando-compatible Kubernetes version"),a("OutboundLink")],1),e._v(", e.g. "),a("code",[e._v("1.20.x")])]),e._v(" "),a("li",[e._v("Keep the default "),a("code",[e._v("Node size")]),e._v(", e.g. "),a("code",[e._v("Standard DS2 v2")])]),e._v(" "),a("li",[e._v("Keep the "),a("code",[e._v("Scale Method")]),e._v(" set to "),a("code",[e._v("Autoscale")]),e._v(" and the "),a("code",[e._v("Node count range")]),e._v(" set from "),a("code",[e._v("1")]),e._v(" to "),a("code",[e._v("5")])]),e._v(" "),a("li",[e._v("Click "),a("code",[e._v("Next: Node Pools")]),e._v(" to move to the next tab")]),e._v(" "),a("li",[e._v("Keep the default values here\n"),a("ul",[a("li",[e._v("If you're familiar with AKS you can change these settings as desired")])])]),e._v(" "),a("li",[e._v("Click "),a("code",[e._v("Next: Authentication")])]),e._v(" "),a("li",[e._v("For "),a("code",[e._v("Authentication method")]),e._v(" select "),a("code",[e._v("System-assigned managed identity")]),e._v(" "),a("ul",[a("li",[e._v("You can also select "),a("code",[e._v("Service principal")]),e._v(" to have Azure automatically generate one for you. If you use an existing principal, it is up to you to configure it and ensure you have the access you need.")])])]),e._v(" "),a("li",[e._v("Click "),a("code",[e._v("Next: Networking")])]),e._v(" "),a("li",[e._v("Enter a value for DNS name prefix, e.g. "),a("code",[e._v("cluster-1-dns")])]),e._v(" "),a("li",[e._v("Click "),a("code",[e._v("Review + Create")]),e._v(" "),a("ul",[a("li",[e._v("Note: There are many other configuration options available for an AKS cluster. Generally, you can change these based on your experience and comfort level with the AKS platform. Entando uses base Kubernetes APIs so as long as you follow the Entando configuration instructions below you can tune your cluster infrastructure to meet your goals.")])])]),e._v(" "),a("li",[e._v("Select "),a("code",[e._v("Create")])]),e._v(" "),a("li",[e._v("Wait for your cluster to initialize. This may take a few minutes.")])]),e._v(" "),a("p",[e._v("Note: A different storage class can be configured by following "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/getting-started/gke-install.html#appendix-a-configuring-clustered-storage"}},[e._v("these instructions")]),e._v(".")],1),e._v(" "),a("h3",{attrs:{id:"deploy-nginx-ingress-controller"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-nginx-ingress-controller"}},[e._v("#")]),e._v(" Deploy NGINX Ingress Controller")]),e._v(" "),a("ol",[a("li",[e._v("Navigate to your cluster by clicking "),a("code",[e._v("Go to Resource")]),e._v(" from the results page or by the top navigation "),a("code",[e._v("Home - Kubernetes service")]),e._v(" and clicking on your cluster.")]),e._v(" "),a("li",[e._v("Select "),a("code",[e._v("Connect")])]),e._v(" "),a("li",[e._v("Select "),a("code",[e._v("Open Cloud Shell")]),e._v(" "),a("ul",[a("li",[e._v("With a new Azure account you may see a warning: "),a("code",[e._v("You have no storage mounted")]),e._v(". Follow the instructions to create a new storage account.")])])]),e._v(" "),a("li",[e._v("Run the first two commands (e.g. "),a("code",[e._v("az account set...")]),e._v(" and "),a("code",[e._v("az aks get-credentials...")]),e._v(") to connect to your cluster. This should only be needed the first time you run the Azure Cloud Shell.\n"),a("ul",[a("li",[e._v("The following instructions assume you'll use the Azure Cloud Shell but you can also run the commands in a local environment via "),a("code",[e._v("kubectl")])])])]),e._v(" "),a("li",[e._v("Add the NGINX controller to enable access to the cluster")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.5/deploy/static/provider/cloud/deploy.yaml \n")])])]),a("p",[e._v("See "),a("a",{attrs:{href:"https://kubernetes.github.io/ingress-nginx/deploy/#azure",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://kubernetes.github.io/ingress-nginx/deploy/#azure"),a("OutboundLink")],1),e._v(" for more information.")]),e._v(" "),a("ol",{attrs:{start:"6"}},[a("li",[e._v("Get the external IP address for your ingress controller")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl get services -n ingress-nginx\n")])])]),a("p",[e._v("The output should be similar to this:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                      TYPE          CLUSTER-IP    EXTERNAL-IP                        \ningress-nginx-controller  LoadBalancer  10.0.28.197   20.120.54.243\n")])])]),a("p",[e._v("Record the value of the EXTERNAL-IP.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("NGINX is working correctly if a "),a("code",[e._v("404 Not Found")]),e._v(" error page is generated when accessing the EXTERNAL-IP from your browser. Alternatively, you can "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/devops/manage-nginx.html#verify-the-nginx-ingress-install"}},[e._v("set up a simple test application")]),e._v(" using either Azure Cloud Shell or your local "),a("code",[e._v("kubectl")]),e._v(". You can also "),a("RouterLink",{attrs:{to:"/v6.3.2/tutorials/devops/manage-nginx.html#customize-the-nginx-configuration"}},[e._v("customize the NGINX ingress")]),e._v(" to optimize the configuration for Entando.")],1)]),e._v(" "),a("h3",{attrs:{id:"install-the-entando-custom-resource-definitions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-the-entando-custom-resource-definitions"}},[e._v("#")]),e._v(" Install the Entando Custom Resource Definitions")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Download the Custom Resource Definitions and, once per cluster, deploy the cluster scoped resources\n"),a("EntandoCode",[e._v("kubectl apply -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/cluster-resources.yaml")])],1)]),e._v(" "),a("li",[a("p",[e._v("Create the Entando namespace")])])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl create namespace entando\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Now install the namespace scoped resources\n"),a("EntandoCode",[e._v("kubectl apply -n entando -f https://raw.githubusercontent.com/entando/entando-releases/"+e._s(e.$site.themeConfig.entando.fixpack.v632)+"/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml")])],1)]),e._v(" "),a("h2",{attrs:{id:"deploy-your-entando-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-your-entando-application"}},[e._v("#")]),e._v(" Deploy Your Entando Application")]),e._v(" "),a("p",[e._v("You can now deploy your application to Azure Kubernetes Service.")]),e._v(" "),a("ol",[a("li",[e._v("Download and unpack the entando-helm-quickstart files")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -sfL https://github.com/entando-k8s/entando-helm-quickstart/archive/v6.3.2.tar.gz "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("tar")]),e._v(" xvz\n")])])]),a("p",[e._v("See the included README file for more information on subsequent steps.")]),e._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Change into the new directory")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("cd")]),e._v(" entando-helm-quickstart-6.3.2\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Edit "),a("code",[e._v("sample-configmaps/entando-operator-config.yaml")]),e._v(" and add the following settings in the data section")])]),e._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[e._v("  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("entando.requires.filesystem.group.override")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"true"')]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("entando.ingress.class")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"nginx"')]),e._v("\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Now create the ConfigMap for the operator")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl apply -f sample-configmaps/entando-operator-config.yaml -n entando\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[e._v("Next, in "),a("code",[e._v("values.yaml")]),e._v(" in the root directory, set the following value:\n"),a("ul",[a("li",[e._v("Set "),a("code",[e._v("singleHostName")]),e._v(" to the value of the "),a("code",[e._v("EXTERNAL-IP")]),e._v(" of your "),a("code",[e._v("ingress-nginx-controller")]),e._v(" and add nip.io to the end:\n"),a("ul",[a("li",[e._v("For example: "),a("code",[e._v("singleHostName: 20.120.54.243.nip.io ")])])])])])]),e._v(" "),a("li",[e._v("Run helm to generate the template file")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("helm template quickstart -n entando ./ "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" quickstart.yaml\n")])])]),a("ol",{attrs:{start:"7"}},[a("li",[e._v("Deploy Entando via this command")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl apply -n entando -f quickstart.yaml \n")])])]),a("ol",{attrs:{start:"8"}},[a("li",[e._v("Watch Entando startup. It can take around 10 minutes before the application is fully deployed and ready. The application will be available when the "),a("code",[e._v("quickstart-composite-app-deployer-*")]),e._v(" pod has a status of "),a("code",[e._v("Completed")]),e._v(".")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl get pods -n entando --watch\n")])])]),a("ol",{attrs:{start:"9"}},[a("li",[e._v("Check for the Entando ingresses using")])]),e._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("kubectl describe ingress -n entando\n")])])]),a("ol",{attrs:{start:"10"}},[a("li",[e._v("Access your application using the URL for the corresponding ingress, e.g. "),a("code",[e._v("http://EXTERNAL-IP.nip.io/entando-de-app/")])])]),e._v(" "),a("p",[e._v("See the "),a("RouterLink",{attrs:{to:"/v6.3.2/docs/getting-started/#log-in-to-entando"}},[e._v("Getting Started guide")]),e._v(" for helpful login instructions and next steps.")],1),e._v(" "),a("h2",{attrs:{id:"appendix-a-troubleshooting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#appendix-a-troubleshooting"}},[e._v("#")]),e._v(" Appendix A - Troubleshooting")]),e._v(" "),a("p",[e._v("If you get an error like: "),a("code",[e._v("0/5 nodes are available: 5 node(s) had volume node affinity conflict.")]),e._v(" or if your deployment hangs in a situation like this from "),a("code",[e._v("kubectl get pods -n entando")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("NAME                                                 READY   STATUS      RESTARTS   AGE\nmy-aks-app-operator-644697776f-sxtq2                 1/1     Running     0          13m\nquickstart-composite-app-deployer-2guz0n42pc         1/1     Running     0          13m\nquickstart-deployer-jj4njqk4bg                       1/1     Running     0          10m\nquickstart-eci-deployer-t0xktqsonk                   0/1     Completed   0          11m\nquickstart-eci-k8s-svc-deployment-78f64c8d89-7c578   1/1     Running     0          11m\nquickstart-kc-deployer-16gzv3clsj                    0/1     Completed   0          13m\nquickstart-kc-server-deployment-7c9bc65744-g52nx     1/1     Running     0          13m\nquickstart-server-deployment-55fcfc6b68-szvkl        0/3     Pending     0          10m\n")])])]),a("p",[e._v("Double check your availability zones. By default an Azure cluster will include nodes from multiple zones, but Azure may not automatically provision their storage.")]),e._v(" "),a("p",[e._v("You can confirm this error in the AKS console as well:")]),e._v(" "),a("ol",[a("li",[e._v("In your cluster select "),a("code",[e._v("Workloads")]),e._v(" in the left nav")]),e._v(" "),a("li",[e._v("Click on the deployment for your server application. This is "),a("code",[e._v("quickstart-server-deployment")]),e._v(" by default")]),e._v(" "),a("li",[e._v("Click on the deployment name inside that application. There will be one")]),e._v(" "),a("li",[e._v("Click on the tab labeled "),a("code",[e._v("Conditions")])]),e._v(" "),a("li",[e._v("If you see an error that says "),a("code",[e._v("0/5 nodes are available: 5 node(s) had volume node affinity conflict.")]),e._v(" Then you need to reconfigure\nyour cluster to have nodes in one zone or work with your Azure operations team to provision storage to match node affinity.")])])])}),[],!1,null,null,null);t.default=n.exports}}]);