(window.webpackJsonp=window.webpackJsonp||[]).push([[909],{2279:function(t,e,a){"use strict";a.r(e);var s=a(36),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"installation-on-red-hat-openshift-using-the-operator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation-on-red-hat-openshift-using-the-operator"}},[t._v("#")]),t._v(" Installation on Red Hat OpenShift using the Operator")]),t._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[t._v("#")]),t._v(" Overview")]),t._v(" "),a("p",[t._v("The following tutorial shows how to install an Entando Application using the Entando Operator and covers a few common enterprise configurations. You may also find the alternative "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/getting-started/openshift-install.html"}},[t._v("manual instructions")]),t._v(" useful.")],1),t._v(" "),a("p",[t._v("Scenario 1 is similar to the Entando quickstart style of deployment which can be applied in many environments, including on developer laptops. The subsequent scenarios build on that initial setup but can also be performed independently. Unless otherwise noted, you have the freedom to keep or modify the default options when installing the Entando Operator and other resources.")]),t._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[t._v("#")]),t._v(" Prerequisites")]),t._v(" "),a("ul",[a("li",[t._v("OpenShift 4.x")]),t._v(" "),a("li",[t._v("Cluster-admin access to OpenShift for initial installation of the Entando Operator")]),t._v(" "),a("li",[t._v("Familiarity with the OpenShift console and operation")])]),t._v(" "),a("h2",{attrs:{id:"add-the-entando-operator-to-the-operatorhub"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-the-entando-operator-to-the-operatorhub"}},[t._v("#")]),t._v(" Add the Entando Operator to the OperatorHub")]),t._v(" "),a("p",[t._v("A cluster admin can add the current version of the Entando Operator into the local OperatorHub using the following command.")]),t._v(" "),a("EntandoCode",[t._v("oc apply -f https://raw.githubusercontent.com/entando/entando-releases/"+t._s(t.$site.themeConfig.entando.fixpack.v73)+"/dist/ge-1-1-6/samples/openshift-catalog-source.yaml")]),t._v(" "),a("h2",{attrs:{id:"scenario-1-embedded-database"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scenario-1-embedded-database"}},[t._v("#")]),t._v(" Scenario 1 - Embedded Database")]),t._v(" "),a("p",[t._v("The initial scenario deploys the operator and Entando Application into a single namespace. We start with the smallest application footprint by using an embedded database, although this is not recommended for production use cases.")]),t._v(" "),a("ol",[a("li",[t._v("Locate the Entando Operator in the "),a("code",[t._v("Operators")]),t._v(" → "),a("code",[t._v("OperatorHub")]),t._v(". Make sure to select the appropriate version.")]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Install")]),t._v(" to view the Entando Operator install options")]),t._v(" "),a("li",[t._v("Select "),a("code",[t._v("A specific namespace on the cluster")]),t._v(" for the "),a("code",[t._v("Installation mode")])]),t._v(" "),a("li",[t._v("Choose an empty namespace for "),a("code",[t._v("Installed Namespace")]),t._v(". You can create one from "),a("code",[t._v("Home")]),t._v(" → "),a("code",[t._v("Projects")]),t._v(" first, if needed, e.g. "),a("code",[t._v("entando-one")]),t._v(".")]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Install")]),t._v(" to install the operator into your target namespace")]),t._v(" "),a("li",[t._v("The install may take a few minutes to complete, after which you can click "),a("code",[t._v("View Operator")]),t._v(" to see the operator in your namespace. You can also go to "),a("code",[t._v("Operators")]),t._v(" → "),a("code",[t._v("Installed Operators")]),t._v(" at any time and select it from there.")]),t._v(" "),a("li",[t._v("Now go to "),a("code",[t._v("EntandoApp")]),t._v(" and click "),a("code",[t._v("Create EntandoApp")]),t._v(" "),a("ul",[a("li",[t._v("Keep the default "),a("code",[t._v("my-app")]),t._v(" as your application name or select your own")]),t._v(" "),a("li",[t._v("Select the EntandoApp version: "),a("code",[t._v("7.3")])])])]),t._v(" "),a("li",[t._v("Provide an "),a("code",[t._v("Ingress Host Name")]),t._v(" specific to your namespace, e.g. "),a("code",[t._v("my-app.YOUR-BASE-OPENSHIFT-URL")]),t._v(". In CRC you can keep the default "),a("code",[t._v("entando.apps-crc.testing")]),t._v(" for your first project.")]),t._v(" "),a("li",[t._v("Change the "),a("code",[t._v("DBMS")]),t._v(" value to "),a("code",[t._v("embedded")]),t._v(". This is the lightest and quickest way to test a full Entando Application. However, a non-embedded relational database is strongly recommended for production use.")]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Create")]),t._v(". The Entando Operator proceeds to deploy the appropriate resources.")]),t._v(" "),a("li",[t._v("Go to "),a("code",[t._v("EntandoApp")]),t._v(" → "),a("code",[t._v("my-app")]),t._v(" to check the status of the deploy")])]),t._v(" "),a("p",[t._v("See the "),a("a",{attrs:{href:"#next-steps"}},[t._v("Next Steps")]),t._v(" below to continue your work with Entando.")]),t._v(" "),a("h2",{attrs:{id:"scenario-2-postgresql"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scenario-2-postgresql"}},[t._v("#")]),t._v(" Scenario 2 - PostgreSQL")]),t._v(" "),a("p",[t._v("For this scenario we prepare a more production-like configuration. Here we switch from an embedded on-disk database to a dedicated PostgreSQL database. This scenario starts where step 6 ends in the previous scenario. If you already ran Scenario 1, you can either go to that project and remove the EntandoApp and ProvidedCapabilities via "),a("code",[t._v("Installed Operators")]),t._v(" → "),a("code",[t._v("Entando Operator")]),t._v(" or prepare a new project using steps 1-5 above.")]),t._v(" "),a("p",[t._v("Now create a new application, this time using PostgreSQL.")]),t._v(" "),a("ol",[a("li",[t._v("Go to "),a("code",[t._v("EntandoApp")]),t._v(" and click "),a("code",[t._v("Create instance")]),t._v(" "),a("ul",[a("li",[t._v("Keep the default "),a("code",[t._v("my-app")]),t._v(" as your application name or select your own")]),t._v(" "),a("li",[t._v("Select the EntandoApp version: "),a("code",[t._v("7.3")])])])]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Ingress Host Name")]),t._v(" as in Scenario 1 above")]),t._v(" "),a("li",[t._v("Keep the default "),a("code",[t._v("DBMS")]),t._v(" value of "),a("code",[t._v("postgresql")])]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Create")]),t._v(". The Entando Operator now deploys the appropriate resources as in Scenario 1 but with the addition of a PostgreSQL database deployment.")])]),t._v(" "),a("p",[t._v("See the "),a("a",{attrs:{href:"#next-steps"}},[t._v("Next Steps")]),t._v(" below to continue your work with Entando.")]),t._v(" "),a("h2",{attrs:{id:"scenario-3-postgresql-plus-openshift-ssl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scenario-3-postgresql-plus-openshift-ssl"}},[t._v("#")]),t._v(" Scenario 3 - PostgreSQL plus OpenShift SSL")]),t._v(" "),a("p",[t._v("This scenario sets up PostgreSQL, like Scenario 2, but also enables SSL using OpenShift's internal Certificate Authority (CA). As a starting point, you can either remove the EntandoApp and ProvidedCapabilities using the Entando Operator or you can prepare a new project per steps 1-5 in Scenario 1.")]),t._v(" "),a("ol",[a("li",[t._v("Go to "),a("code",[t._v("EntandoApp")]),t._v(" and click "),a("code",[t._v("Create instance")]),t._v(" "),a("ul",[a("li",[t._v("Keep the default "),a("code",[t._v("my-app")]),t._v(" as your application name or select your own")]),t._v(" "),a("li",[t._v("Select the EntandoApp version: "),a("code",[t._v("7.3")])]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Ingress Host Name")]),t._v(" as in Scenario 1 above")]),t._v(" "),a("li",[t._v("Keep the default "),a("code",[t._v("DBMS")]),t._v(" value of "),a("code",[t._v("postgresql")])])])]),t._v(" "),a("li",[t._v("Expand the "),a("code",[t._v("Advanced Configuration")]),t._v(" section")]),t._v(" "),a("li",[t._v("For TLS Secret, select the "),a("code",[t._v("entando-empty-tls-secret")]),t._v(" so the operator will enable SSL/TLS using the OpenShift-configured certificate authority.")]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Create")]),t._v(". The Entando Operator proceeds to deploy the appropriate resources.")])]),t._v(" "),a("p",[t._v("Once the deployment is complete, you can confirm that all routes use HTTPS with OpenShift's CA. You may still see security warnings in the browser.")]),t._v(" "),a("p",[t._v("See the "),a("a",{attrs:{href:"#next-steps"}},[t._v("Next Steps")]),t._v(" below to continue your work with Entando.")]),t._v(" "),a("h2",{attrs:{id:"scenario-4-postgresql-plus-self-signed-ssl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scenario-4-postgresql-plus-self-signed-ssl"}},[t._v("#")]),t._v(" Scenario 4 - PostgreSQL plus Self-Signed SSL")]),t._v(" "),a("p",[t._v("This scenario is similar to Scenario 3, but here you'll use a self-signed certificate instead of a certificate provided by OpenShift's internal Certificate Authority. As a starting point, you can either remove the EntandoApp and Provided Capabilities from the previous scenarios or prepare a new project per steps 1-5 in Scenario 1.")]),t._v(" "),a("p",[t._v("Start by creating a self-signed certificate and then prepare the Secrets and ConfigMap to match. There are various ways to create an X.509 self-signed certificate, so you can use your preferred mechanism.")]),t._v(" "),a("ol",[a("li",[t._v("Using "),a("a",{attrs:{href:"https://www.openssl.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("OpenSSL"),a("OutboundLink")],1),t._v(", create a certificate for your application. You'll need to adjust the Common Name (CN) value to match the "),a("code",[t._v("Ingress Host Name")]),t._v(" for your project.")])]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("365")]),t._v(" -subj "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/CN=entando.apps-crc.testing"')]),t._v("\n")])])]),a("p",[t._v("You should see output similar to this:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("Generating a RSA private key\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".++++\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v("++++\nwriting new private key to "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'tls.key'")]),t._v("\n-----\n")])])]),a("p",[t._v("Now you can create a TLS Secret using the generated files.")]),t._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[t._v("Go to "),a("code",[t._v("Workloads")]),t._v(" → "),a("code",[t._v("Secrets")]),t._v(" → "),a("code",[t._v("Create")]),t._v(" and select "),a("code",[t._v("From YAML")]),t._v(". Use the following YAML as a starting point and then click "),a("code",[t._v("Create")]),t._v(".")])]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("kind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Secret\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apiVersion")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" v1\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("metadata")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tls.key")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tls.crt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" kubernetes.io/tls\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("Click on "),a("code",[t._v("Actions")]),t._v(" → "),a("code",[t._v("Edit Secret")]),t._v(" and use the "),a("code",[t._v("Browse...")]),t._v(" buttons to upload the key and cert files.")])]),t._v(" "),a("p",[t._v("Now create the "),a("code",[t._v("entando-ca-cert-secret")]),t._v(" Secret, similar to what was done in Scenario 3, but this time using the self-signed certificate.")]),t._v(" "),a("ol",{attrs:{start:"4"}},[a("li",[t._v("Go to "),a("code",[t._v("Workloads")]),t._v(" → "),a("code",[t._v("Secrets")]),t._v(" → "),a("code",[t._v("Create")]),t._v(" and select "),a("code",[t._v("Key/value secret")]),t._v("\nFor multiple certificates, see note below on "),a("a",{attrs:{href:"#note-certificate-chains"}},[t._v("Certificate Chains")]),t._v(".")]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Secret Name")]),t._v(", e.g. "),a("code",[t._v("entando-ca-cert-secret")])]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Key")]),t._v(", e.g. "),a("code",[t._v("tls.crt")])]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Value")]),t._v(" by clicking "),a("code",[t._v("Browse...")]),t._v(" and loading the cert file from Step 1, e.g. "),a("code",[t._v("tls.crt")])]),t._v(" "),a("li",[t._v("Click "),a("code",[t._v("Create")])]),t._v(" "),a("li",[t._v("Next, go to "),a("code",[t._v("Workloads")]),t._v(" → "),a("code",[t._v("ConfigMaps")]),t._v(" and update or create a ConfigMap named "),a("code",[t._v("entando-operator-config")]),t._v(". This is the ConfigMap used by the operator to configure the deployments. You can "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/consume/entando-operator.html#add-a-new-configmap"}},[t._v("download the Entando Operator template")]),t._v(' as a starting point. Set the "data/entando.ca.secret.name" and "data/entando.tls.secret.name" to match the names from above.')],1)]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.ca.secret.name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("ca"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("entando.tls.secret.name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" entando"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("tls"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("secret\n")])])]),a("ol",{attrs:{start:"10"}},[a("li",[t._v("Click "),a("code",[t._v("Create")])])]),t._v(" "),a("p",[t._v("Now let's create a new application similar to Scenario 3, but with the self-signed SSL certificate.")]),t._v(" "),a("ol",{attrs:{start:"11"}},[a("li",[t._v("Go to "),a("code",[t._v("EntandoApp")]),t._v(" and click "),a("code",[t._v("Create instance")])])]),t._v(" "),a("ul",[a("li",[t._v("Keep the default "),a("code",[t._v("my-app")]),t._v(" as your application name or select your own")]),t._v(" "),a("li",[t._v("Select the EntandoApp version: "),a("code",[t._v("7.3")])]),t._v(" "),a("li",[t._v("Set the "),a("code",[t._v("Ingress Host Name")]),t._v(" as in Scenario 1 above. It should match the CN used to generate the certificate in step 1.")]),t._v(" "),a("li",[t._v("Keep the default "),a("code",[t._v("DBMS")]),t._v(" value as "),a("code",[t._v("postgresql")])])]),t._v(" "),a("ol",{attrs:{start:"12"}},[a("li",[t._v("Click "),a("code",[t._v("Create")]),t._v(". The Entando Operator now proceeds to deploy the appropriate resources.")])]),t._v(" "),a("p",[t._v("Once the deployment is complete, you can confirm that all routes use HTTPS with the self-signed certificate. You may still see security warnings in the browser.")]),t._v(" "),a("h4",{attrs:{id:"note-certificate-chains"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#note-certificate-chains"}},[t._v("#")]),t._v(" Note: Certificate Chains")]),t._v(" "),a("p",[t._v("If you have multiple certificates to load into OpenShift, you must pass each with its own identifier.")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("ca0.crt: → a single CA certificate\nca1.crt: → another CA certificate\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),t._v(".\nca5.crt → last CA certificate\n")])])]),a("p",[t._v("See the "),a("a",{attrs:{href:"#next-steps"}},[t._v("Next Steps")]),t._v(" below to continue your work with Entando.")]),t._v(" "),a("h2",{attrs:{id:"next-steps"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#next-steps"}},[t._v("#")]),t._v(" Next Steps")]),t._v(" "),a("p",[t._v("Once you've completed any of the scenarios above, you have several options.")]),t._v(" "),a("ul",[a("li",[t._v("Check out "),a("code",[t._v("Networking")]),t._v(" → "),a("code",[t._v("Routes")]),t._v(" to see the URLs for the running services. Common starting points include the Entando App Builder (e.g. "),a("code",[t._v("http://entando.apps-crc.testing/app-builder/")]),t._v(") or the Entando Application itself (e.g. "),a("code",[t._v("http://entando.apps-crc.testing/entando-de-app/")]),t._v(").")]),t._v(" "),a("li",[t._v("See the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/consume/entando-operator.html"}},[t._v("Entando Operator Configuration")]),t._v(" for options related to timeout settings and the default image registry.")],1),t._v(" "),a("li",[t._v("This suggested "),a("RouterLink",{attrs:{to:"/v7.3/docs/getting-started/#next-steps"}},[t._v("list of next steps")]),t._v(" could also be useful.")],1)])],1)}),[],!1,null,null,null);e.default=n.exports}}]);