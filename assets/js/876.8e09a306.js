(window.webpackJsonp=window.webpackJsonp||[]).push([[876],{2238:function(t,e,a){"use strict";a.r(e);var s=a(36),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"redis-integration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redis-integration"}},[t._v("#")]),t._v(" Redis Integration")]),t._v(" "),a("p",[t._v("Redis database server can be used on Entando for cache management in high availability applications. It is a requirement for Entando Applications serving multiple tenants. This tutorial describes the steps to integrate Redis for both high availability and multitenancy.")]),t._v(" "),a("p",[t._v("See "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/consume/multitenancy.html"}},[t._v("Entando Multitenancy")]),t._v(" for more information.")],1),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[a("p",[a("RouterLink",{attrs:{to:"/docs/getting-started/"}},[t._v("A working instance of Entando")]),t._v(" based on the default Tomcat server image")],1)]),t._v(" "),a("li",[a("p",[t._v("Verify dependencies with the "),a("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/entando-cli.html#check-the-environment"}},[t._v("Entando CLI")]),t._v(": "),a("code",[t._v("ent check-env develop")])],1)]),t._v(" "),a("li",[a("p",[t._v("Helm 3 installed in your local environment")])])]),t._v(" "),a("h2",{attrs:{id:"install-redis-sentinel"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-redis-sentinel"}},[t._v("#")]),t._v(" Install "),a("a",{attrs:{href:"https://github.com/entando-ps/redis-sentinel",target:"_blank",rel:"noopener noreferrer"}},[t._v("Redis Sentinel"),a("OutboundLink")],1)]),t._v(" "),a("ol",[a("li",[t._v("Clone the project:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/entando-ps/redis-sentinel.git\n")])])]),a("blockquote",[a("p",[t._v("Notes:")]),t._v(" "),a("ul",[a("li",[t._v("The number of Redis replica is 3; it can be adjusted by modifying the "),a("code",[t._v("replica.replicaCount")]),t._v(" in the "),a("code",[t._v("values.yaml")]),t._v(" file.")]),t._v(" "),a("li",[t._v("By default, the Redis Sentinel configuration does not use a password. For an external Redis installation where a password is required, you can define a value for the parameter "),a("code",[t._v("global.redis.password")]),t._v(" in "),a("code",[t._v("values.yaml")]),t._v(" so that Helm creates a secret for it.")])])]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Set your Kubernetes context to the proper namespace:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl config set-context --current --namespace"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("YOUR-NAMESPACE\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Run the custom script:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("./install.sh\n")])])]),a("h2",{attrs:{id:"configure-the-entandoapp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-entandoapp"}},[t._v("#")]),t._v(" Configure the EntandoApp")]),t._v(" "),a("ol",[a("li",[t._v("Scale down the EntandoApp deployment to 0:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl scale deploy/YOUR-APP-NAME-deployment --replicas"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v(" -n YOUR-NAMESPACE\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Edit the deployment YAML and add the environment variables listed below."),a("br"),t._v(" "),a("strong",[t._v("Note:")]),t._v(" For "),a("code",[t._v("REDIS_ADDRESSES")]),t._v(", note the Sentinel node's logs that list the domain names of the Redis cluster instances. List the master first, then the replicas as shown in this example.")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" REDIS_ACTIVE\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" REDIS_ADDRESSES\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("0.redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("headless.YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAMESPACE.svc.cluster.local"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("26379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("1.redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("headless.YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAMESPACE.svc.cluster.local"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("26379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("node"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("2.redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("headless.YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAMESPACE.svc.cluster.local"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("26379")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" REDIS_SESSION_ACTIVE \n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Scale the deployment back up to 1 or more replicas:")])]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("kubectl scale deploy/YOUR-APP-NAME-deployment --replicas"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" -n YOUR-NAMESPACE\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[t._v("To check that your Redis is running as expected, shell into the "),a("code",[t._v("redis-node-0")]),t._v(" pod, then execute "),a("code",[t._v("redis-cli")]),t._v(". Run "),a("code",[t._v("KEYS *")]),t._v(" to list all current keys present in the cache.")])]),t._v(" "),a("h2",{attrs:{id:"additional-settings"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#additional-settings"}},[t._v("#")]),t._v(" Additional Settings")]),t._v(" "),a("ol",[a("li",[t._v("Use a password for Redis"),a("br"),t._v("\nIf a password was used in your Redis "),a("code",[t._v("values.yaml")]),t._v(" file, an additional environment variable is required in the EntandoApp deployment image.")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" REDIS_PASSWORD\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("valueFrom")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("secretKeyRef")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" YOUR_REDIS_PASSWORD_KEY\n            "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" YOUR"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("REDIS"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("SECRET"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("NAME\n            "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("optional")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Monitor Redis"),a("br"),t._v("\nWhen Redis Sentinel is active, Sentinel monitoring can be utilized to trigger an automatic failover process by using an additional environment variable in the EntandoApp deployment image.")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("spec")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("containers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("env")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" REDIS_USE_SENTINEL_EVENTS\n        "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"true"')]),t._v(" \n")])])]),a("p",[t._v("If this env variable is set to "),a("code",[t._v("true")]),t._v(", the Sentinel failover process for electing a new master will be used when a master node becomes unreachable.")]),t._v(" "),a("p",[t._v("When the variable is set to "),a("code",[t._v("false")]),t._v(", the application doesn't subscribe to the events but uses a scheduler to periodically check the master IP to detect if the master has changed. This can be useful as a fallback method in case of a problem with events detections.")])])}),[],!1,null,null,null);e.default=n.exports}}]);