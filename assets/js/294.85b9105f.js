(window.webpackJsonp=window.webpackJsonp||[]).push([[294],{1075:function(e,t,a){e.exports=a.p+"assets/img/clustered-logs.56f7b97d.png"},2011:function(e,t,a){"use strict";a.r(t);var s=a(36),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"high-availability-on-entando"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#high-availability-on-entando"}},[e._v("#")]),e._v(" High Availability on Entando")]),e._v(" "),s("p",[e._v("To build applications on Entando for high availability (HA), it is best practice to examine your goals, hardware, networking, and application-specific setup as well as optimize the App Engine deployment for that environment. The configurations and tests below can be used as building blocks to create a deployment architecture that promotes HA for your application in most situations. They include steps to set up and validate a clustered instance of the Entando App Engine, along with the configuration for Redis to support that instance.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),s("p",[e._v("To scale an Entando Application without the use of clustered storage assumes all instances are scheduled to a single node and requires a ReadWriteOnce (RWO) policy in conjunction with taints on other nodes. Be aware of the pros and cons of scheduling instances to the same node so you can maximize utilization of node resources and recover from an unreachable application instance. If the node terminates or is shutdown, your application will be down while Kubernetes reschedules the pods to a different node.")])]),e._v(" "),s("h2",{attrs:{id:"clustering"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#clustering"}},[e._v("#")]),e._v(" Clustering")]),e._v(" "),s("p",[e._v("This section describes how to set up a clustered Entando App Engine in the "),s("code",[e._v("entando-de-app")]),e._v(" image. The goal is to deploy a clustered instance of the App Engine and verify the scalable deployment and HA of the application.")]),e._v(" "),s("h3",{attrs:{id:"prerequisites"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),s("ul",[s("li",[e._v("An existing deployment of an Entando App or the ability to create one.\n"),s("ul",[s("li",[e._v("If you haven't created a deployment or don't have a YAML file for an Entando deployment, follow the "),s("RouterLink",{attrs:{to:"/docs/getting-started/"}},[e._v("Quickstart instructions")]),e._v(".")],1)])]),e._v(" "),s("li",[e._v("The Entando deployment must use a Relational Database Management System (RDBMS) to organize data in a table structure. Clustered instances will not work correctly with in-memory databases.")]),e._v(" "),s("li",[e._v("Sticky sessions are recommended when enabling a clustered Entando Application. For example, see "),s("RouterLink",{attrs:{to:"/v7.1/tutorials/devops/manage-nginx.html"}},[e._v("Manage NGINX")]),e._v(" for related affinity settings.")],1)]),e._v(" "),s("h3",{attrs:{id:"creating-a-clustered-app-instance"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("#")]),e._v(" Creating a Clustered App Instance")]),e._v(" "),s("ol",[s("li",[e._v("Create an Entando deployment via the operator config file or edit an existing deployment YAML file.")]),e._v(" "),s("li",[e._v("Scale your Entando server application:")])]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("kubectl scale deployment quickstart-deployment -n entando --replicas"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("2")]),e._v("\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("To view the pods in your deployment:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("`kubectl get pods -n YOUR-NAMESPACE`\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[s("p",[e._v("You should have two "),s("code",[e._v("quickstart-deployment")]),e._v(" pods in your namespace.")])]),e._v(" "),s("li",[s("p",[e._v("Look in the logs of the "),s("code",[e._v("quickstart-deployment")]),e._v(" in either pod to see logging information related to different instances joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary.")])])]),e._v(" "),s("p",[s("img",{attrs:{src:a(1075),alt:"Clustered Logs"}})]),e._v(" "),s("h3",{attrs:{id:"validating-clustered-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#validating-clustered-instances"}},[e._v("#")]),e._v(" Validating Clustered Instances")]),e._v(" "),s("p",[e._v("This is an advanced exercise and not required or recommended for most deployment scenarios. The steps below validate that the clustered instances are working in your environment and that you have created a high availability deployment.")]),e._v(" "),s("ol",[s("li",[e._v("Complete the "),s("a",{attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("creating a clustered instance tutorial")]),e._v(" above or have an existing clustered Entando App instance available for testing.")]),e._v(" "),s("li",[e._v("Retrieve the URL for your "),s("code",[e._v("entando-de-app")]),e._v(":")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl get ingress -n YOUR-NAMESPACE\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("Open the URL in a browser and ensure that the application is working.")]),e._v(" "),s("li",[e._v("Open a new browser window in incognito or private browsing mode to ensure that no data is cached and you're receiving a copy of the running application. "),s("strong",[e._v("Do not navigate to the app.")])]),e._v(" "),s("li",[e._v("Delete one of the server deployment pods in your clustered instance:")])]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("kubectl delete YOUR-POD-NAME -n YOUR-NAMESPACE\n")])])]),s("ul",[s("li",[e._v("There are other ways to do this. You could also shell into the server-container and manually kill the running app process with "),s("code",[e._v("kill -9 357")]),e._v(".")]),e._v(" "),s("li",[e._v("If you want to test at the hardware level, you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes).")])]),e._v(" "),s("ol",{attrs:{start:"6"}},[s("li",[e._v("In your private/incognito browser window, open the URL to your "),s("code",[e._v("entando-de-app")]),e._v(".")]),e._v(" "),s("li",[e._v("Check that the application continues to render while the pod you deleted is no longer present.")]),e._v(" "),s("li",[e._v("Wait for Kubernetes to restore your deleted pod.")]),e._v(" "),s("li",[e._v("Check that the application continues to render after the pod is restored.")])]),e._v(" "),s("h3",{attrs:{id:"caching-validation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#caching-validation"}},[e._v("#")]),e._v(" Caching Validation")]),e._v(" "),s("p",[e._v("Validating the shared cache can be done in a process similar to the clustered instance validation. The high-level steps are:")]),e._v(" "),s("ol",[s("li",[e._v("Deploy a clustered instance (see "),s("a",{attrs:{href:"#creating-a-clustered-app-instance"}},[e._v("creating a clustered instance tutorial")]),e._v(").")]),e._v(" "),s("li",[e._v("Create data with the App Builder (pages, page templates, content etc.), using the external route for the application.")]),e._v(" "),s("li",[e._v("Refer to the logs to note which instance processed the request.")]),e._v(" "),s("li",[e._v("Terminate that instance.")]),e._v(" "),s("li",[e._v("Fetch the recently created data and verify that the data are returned.")])]),e._v(" "),s("h2",{attrs:{id:"configuring-and-deploying-with-redis"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuring-and-deploying-with-redis"}},[e._v("#")]),e._v(" Configuring and Deploying with Redis")]),e._v(" "),s("p",[e._v("In this section, an Entando App Engine instance is deployed using Redis as a cache for data served by the App Engine. For more information on the cache configuration for the App Engine, see "),s("RouterLink",{attrs:{to:"/v7.1/docs/consume/high-avail-application.html"}},[e._v("high availability in an Entando Application")]),e._v(".")],1),e._v(" "),s("h3",{attrs:{id:"deploy-redis-to-kubernetes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deploy-redis-to-kubernetes"}},[e._v("#")]),e._v(" Deploy Redis to Kubernetes")]),e._v(" "),s("ol",[s("li",[e._v("Create the Redis deployment and expose the endpoints:")])]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("kubectl create deployment redis --image"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v("redis:6\n")])])]),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("kubectl expose deployment redis --port"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("6379")]),e._v(" --target-port"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("6379")]),e._v(" -n YOUR-NAMESPACE\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("Install the Redis CLI for your environment per "),s("a",{attrs:{href:"https://redis.io/topics/rediscli",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://redis.io/topics/rediscli"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("li",[e._v("Get the IP for your Redis deployment:")])]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("kubectl get "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("service")]),e._v(" -n YOUR-NAMESPACE\n")])])]),s("ol",{attrs:{start:"4"}},[s("li",[e._v("Validate your deployment:")])]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("redis-cli -h "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10.43")]),e._v(".99.198 -p "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("6379")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("ping")]),e._v("\n")])])]),s("ul",[s("li",[e._v("Should respond PONG.")])]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("redis-cli -h "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("10.43")]),e._v(".99.198 -p "),s("span",{pre:!0,attrs:{class:"token number"}},[e._v("6379")]),e._v(" incr mycounter\n")])])]),s("ul",[s("li",[e._v("Should increment each time.")])]),e._v(" "),s("h2",{attrs:{id:"configure-the-implementation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-implementation"}},[e._v("#")]),e._v(" Configure the Implementation")]),e._v(" "),s("ol",[s("li",[e._v("Download the "),s("code",[e._v("entando-app.yaml")]),e._v(" template:")])]),e._v(" "),s("EntandoCode",[e._v('curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/'+e._s(e.$site.themeConfig.entando.fixpack.v71)+'/dist/ge-1-1-6/samples/entando-app.yaml"')]),e._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[e._v("Add these environment variables to the "),s("code",[e._v("EntandoApp")]),e._v(" YAML to enable Redis for cache management. The variables to create are "),s("code",[e._v("REDIS_ACTIVE")]),e._v(", "),s("code",[e._v("REDIS_ADDRESS")]),e._v(" (e.g. "),s("em",[e._v("redis://localhost:6379")]),e._v("), and "),s("code",[e._v("REDIS_PASSWORD")]),e._v(".")])]),e._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("data")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("environmentVariables")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" REDIS_ACTIVE\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"true"')]),e._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" REDIS_ADDRESS\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" YOUR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("REDIS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("URL \n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" REDIS_PASSWORD\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("valueFrom")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("secretKeyRef")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("key")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" password\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" YOUR"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("REDIS"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("SECRET"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("NAME\n          "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("optional")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token boolean important"}},[e._v("false")]),e._v(" \n")])])]),s("blockquote",[s("p",[e._v("NOTE: This example uses a Secret for the "),s("code",[e._v("REDIS_PASSWORD")]),e._v(", which is recommended. You can also hardcode the password in the YAML for testing purposes, but the use of clear text passwords in deployment files is not recommended. "),s("strong",[e._v("Create and use a Secret for the password as a best practice.")])])]),e._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[e._v("Deploy your file")])]),e._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("kubectl apply -f entando-app.yaml\n")])])]),s("p",[e._v("You now have a high availability cluster of Entando with Redis implementation.")])],1)}),[],!1,null,null,null);t.default=n.exports}}]);