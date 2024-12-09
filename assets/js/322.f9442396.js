(window.webpackJsonp=window.webpackJsonp||[]).push([[322],{1328:function(e,t,a){e.exports=a.p+"assets/img/clustered-logs.56f7b97d.png"},2235:function(e,t,a){"use strict";a.r(t);var n=a(36),i=Object(n.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"high-availability-on-entando"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#high-availability-on-entando"}},[e._v("#")]),e._v(" High Availability on Entando")]),e._v(" "),n("p",[e._v("To build applications on Entando for high availability (HA), it is best practice to examine your goals, hardware, networking, and application-specific setup as well as optimize the App Engine deployment for that environment. The configurations and tests below can be used as building blocks to create a deployment architecture that promotes HA for your application in most situations. They include steps to set up and validate a clustered instance of the Entando App Engine, along with the configuration for Redis to support that instance.")]),e._v(" "),n("p",[e._v("Checkout this alternate project with "),n("a",{attrs:{href:"https://github.com/entando-ps/redis-sentinel",target:"_blank",rel:"noopener noreferrer"}},[e._v("Redis deployed as a Sentinel configuration"),n("OutboundLink")],1),e._v(" for an Entando cache.")]),e._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),n("p",[e._v("To scale an Entando Application without the use of clustered storage assumes all instances are scheduled to a single node and requires a ReadWriteOnce (RWO) policy in conjunction with taints on other nodes. Be aware of the pros and cons of scheduling instances to the same node so you can maximize utilization of node resources and recover from an unreachable application instance. If the node terminates or is shutdown, your application will be down while Kubernetes reschedules the pods to a different node.")])]),e._v(" "),n("h2",{attrs:{id:"clustering"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#clustering"}},[e._v("#")]),e._v(" Clustering")]),e._v(" "),n("p",[e._v("This section describes how to set up a clustered Entando App Engine in the "),n("code",[e._v("entando-de-app")]),e._v(" image. The goal is to deploy a clustered instance of the App Engine and verify the scalable deployment and HA of the application.")]),e._v(" "),n("p",[e._v("To set up "),n("strong",[e._v("Redis")]),e._v(" for cache management, refer to the "),n("RouterLink",{attrs:{to:"/v7.3/tutorials/consume/redis.html"}},[e._v("Redis Integration tutorial")]),e._v(".")],1),e._v(" "),n("h3",{attrs:{id:"prerequisites"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),n("ul",[n("li",[e._v("An existing deployment of an Entando App or the ability to create one.\n"),n("ul",[n("li",[e._v("If you haven't created a deployment or don't have a YAML file for an Entando deployment, follow the "),n("RouterLink",{attrs:{to:"/docs/getting-started/"}},[e._v("Quickstart instructions")]),e._v(".")],1)])]),e._v(" "),n("li",[e._v("The Entando deployment must use a Relational Database Management System (RDBMS) to organize data in a table structure. Clustered instances will not work correctly with in-memory databases.")]),e._v(" "),n("li",[e._v("Sticky sessions are recommended when enabling a clustered Entando Application. For example, see "),n("RouterLink",{attrs:{to:"/v7.3/tutorials/devops/manage-nginx.html"}},[e._v("Manage NGINX")]),e._v(" for related affinity settings.")],1)]),e._v(" "),n("h3",{attrs:{id:"creating-a-clustered-app-instance"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("#")]),e._v(" Creating a Clustered App Instance")]),e._v(" "),n("ol",[n("li",[e._v("Create an Entando deployment via the operator config file or edit an existing deployment YAML file.")]),e._v(" "),n("li",[e._v("Scale your Entando server application:")])]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[e._v("kubectl scale deployment quickstart-deployment -n entando --replicas"),n("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),n("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),e._v("\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[e._v("To view the pods in your deployment:")])]),e._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[e._v("kubectl get pods -n YOUR-NAMESPACE\n")])])]),n("ol",{attrs:{start:"4"}},[n("li",[n("p",[e._v("You should have two "),n("code",[e._v("quickstart-deployment")]),e._v(" pods in your namespace.")])]),e._v(" "),n("li",[n("p",[e._v("Look in the logs of the "),n("code",[e._v("quickstart-deployment")]),e._v(" in either pod to see logging information related to different instances joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary.")])])]),e._v(" "),n("p",[n("img",{attrs:{src:a(1328),alt:"Clustered Logs"}})]),e._v(" "),n("h3",{attrs:{id:"validating-clustered-instances"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#validating-clustered-instances"}},[e._v("#")]),e._v(" Validating Clustered Instances")]),e._v(" "),n("p",[e._v("This is an advanced exercise and not required or recommended for most deployment scenarios. The steps below validate that the clustered instances are working in your environment and that you have created a high availability deployment.")]),e._v(" "),n("ol",[n("li",[e._v("Complete the "),n("a",{attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("creating a clustered instance tutorial")]),e._v(" above or have an existing clustered Entando App instance available for testing.")]),e._v(" "),n("li",[e._v("Retrieve the URL for your "),n("code",[e._v("entando-de-app")]),e._v(":")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("kubectl get ingress -n YOUR-NAMESPACE\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[e._v("Open the URL in a browser and ensure that the application is working.")]),e._v(" "),n("li",[e._v("Open a new browser window in incognito or private browsing mode to ensure that no data is cached and you're receiving a copy of the running application. "),n("strong",[e._v("Do not navigate to the app.")])]),e._v(" "),n("li",[e._v("Delete one of the server deployment pods in your clustered instance:")])]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("kubectl delete YOUR-POD-NAME -n YOUR-NAMESPACE\n")])])]),n("ul",[n("li",[e._v("There are other ways to do this. You could also shell into the server-container and manually kill the running app process with "),n("code",[e._v("kill -9 357")]),e._v(".")]),e._v(" "),n("li",[e._v("If you want to test at the hardware level, you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes).")])]),e._v(" "),n("ol",{attrs:{start:"6"}},[n("li",[e._v("In your private/incognito browser window, open the URL to your "),n("code",[e._v("entando-de-app")]),e._v(".")]),e._v(" "),n("li",[e._v("Check that the application continues to render while the pod you deleted is no longer present.")]),e._v(" "),n("li",[e._v("Wait for Kubernetes to restore your deleted pod.")]),e._v(" "),n("li",[e._v("Check that the application continues to render after the pod is restored.")])]),e._v(" "),n("h3",{attrs:{id:"caching-validation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#caching-validation"}},[e._v("#")]),e._v(" Caching Validation")]),e._v(" "),n("p",[e._v("Validating the shared cache can be done in a process similar to the clustered instance validation. The high-level steps are:")]),e._v(" "),n("ol",[n("li",[e._v("Deploy a clustered instance (see "),n("a",{attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("creating a clustered instance tutorial")]),e._v(").")]),e._v(" "),n("li",[e._v("Create data with the App Builder (pages, page templates, content etc.), using the external route for the application.")]),e._v(" "),n("li",[e._v("Refer to the logs to note which instance processed the request.")]),e._v(" "),n("li",[e._v("Terminate that instance.")]),e._v(" "),n("li",[e._v("Fetch the recently created data and verify that the data are returned.")])])])}),[],!1,null,null,null);t.default=i.exports}}]);