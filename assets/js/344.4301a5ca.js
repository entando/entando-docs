(window.webpackJsonp=window.webpackJsonp||[]).push([[344],{1443:function(e,t,a){"use strict";a.r(t);var o=a(36),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"the-entando-operator"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-entando-operator"}},[e._v("#")]),e._v(" The Entando Operator")]),e._v(" "),a("p",[e._v("The Entando Operator processes the custom resources in Kubernetes that represent the different "),a("RouterLink",{attrs:{to:"/next/docs/"}},[e._v("components of an Entando application")]),e._v(".\nThe goal of the Operator is to provide automation and a set of default configuration options to simplify and accelerate the deployment of an Entando application.")],1),e._v(" "),a("p",[e._v("The sections below provide details regarding the Operator when Entando Custom Resources are deployed. If you're using OpenShift, these sections provide details on how to configure your deployment via the Operator Hub.")]),e._v(" "),a("p",[e._v("For details on the individual custom resource definitions (CRD), check out the "),a("RouterLink",{attrs:{to:"/next/docs/reference/custom-resources.html"}},[e._v("custom resources document")]),e._v(". "),a("RouterLink",{attrs:{to:"/next/tutorials/getting-started/openshift-install-by-operator.html"}},[e._v("See the instructions on deploying via the Entando Operator")]),e._v(".")],1),e._v(" "),a("h2",{attrs:{id:"tls-secret-creation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tls-secret-creation"}},[e._v("#")]),e._v(" TLS Secret Creation")]),e._v(" "),a("p",[e._v("When configuring and deploying Entando via the Operator, you will be asked to provide a secret for some of the components in the architecture. A few things to be aware of when creating and configuring a Secret:")]),e._v(" "),a("ul",[a("li",[e._v("The Secret is assumed to be in the same namespace as the component being created.")]),e._v(" "),a("li",[e._v("This Secret is expected to have a private key, and a certificate for the hostname (or a wildcard certificate) that the service will be exposed on.")]),e._v(" "),a("li",[e._v("Refer to the "),a("code",[e._v("ingressHostName")]),e._v(" property in the custom resource for more information on how the hostname is determined.")]),e._v(" "),a("li",[e._v("If a Secret isn't provided, the Entando Operator will evaluate the value of the "),a("code",[e._v("ENTANDO_PATH_TO_TLS_KEYPAIR")]),e._v(", which is expected to contain two files: tls.key and tls.crt.\n"),a("ul",[a("li",[e._v("If a key pair is found in the folder specified, the Operator will use that key pair.")]),e._v(" "),a("li",[e._v("If a key pair is not found, the Entando Operator will evaluate the value of the "),a("code",[e._v("ENTANDO_USE_AUTO_CERT_GENERATION")]),e._v(". If that property is set to "),a("code",[e._v("true")]),e._v(", the Operator will assume that the cluster has been configured with a valid Certificate Authority (CA) and leave it to the Ingress controller to generate its own certificates.")])])])]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/next/tutorials/getting-started/openshift-install-by-operator.html"}},[e._v("Click here for instructions on setting up TLS for the EntandoApp")]),e._v(".")],1),e._v(" "),a("h2",{attrs:{id:"database-deployment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-deployment"}},[e._v("#")]),e._v(" Database Deployment")]),e._v(" "),a("p",[e._v("Some Entando components include the option to select a database management system (DBMS):")]),e._v(" "),a("ul",[a("li",[a("p",[e._v("The value of the DBMS field in the CRD can be "),a("code",[e._v("mysql")]),e._v(", "),a("code",[e._v("oracle")]),e._v(", "),a("code",[e._v("postgresql")]),e._v(", or embedded.")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("IMPORTANT!")]),e._v(" -- If embedded is selected for a component, only one replica for the component can be created. This is not recommended for production use.")]),e._v(" "),a("li",[a("strong",[e._v("IMPORTANT!")]),e._v(" -- Oracle instances are not supported for automatic deployment in a container. You must create your own Oracle instance or reuse an existing instance and then configure the "),a("RouterLink",{attrs:{to:"/next/tutorials/devops/external-db.html"}},[e._v("external database")]),e._v(" for your EntandoApp.")],1)])]),e._v(" "),a("li",[a("p",[e._v("If an "),a("code",[e._v("EntandoDatabaseService")]),e._v(" has been deployed in the component's namespace and the DBMS specified for this is the same as the DBMS specified for the EntandoApp, then the Operator will create dedicated schemas (in the case of PostgreSQL or Oracle), or databases (in the case of MySQL).")]),e._v(" "),a("ul",[a("li",[e._v("If a matching "),a("code",[e._v("EntandoDatabaseService")]),e._v(" does not exist in this namespace, the Operator\nwill automatically deploy the appropriate container to host the DBMS specified. This last option is not yet supported for Oracle.")])])]),e._v(" "),a("li",[a("p",[e._v("For an EntandoApp, three schemas/databases will be created: the Entando Port DB, Entando Serv DB and a database for the Entando Component Manager.")]),e._v(" "),a("ul",[a("li",[e._v("If the Port and Serv schemas/databases are empty, the Operator will use the underlying EntandoApp to populate these databases with the data backup available in the standard backup path in the WAR deployment.")]),e._v(" "),a("li",[e._v("In cases where the EntandoApp needs to connect to an existing database that is fully managed\nby the customer, it is best to setup the standard database connection variables using the\n"),a("code",[e._v("spec.environmentVariables")]),e._v(" property, set to 'none'. This will skip any database\npreparation steps in the deployment.")])])])]),e._v(" "),a("p",[e._v("When deploying a component, the Operator will evaluate the spec, and if it supports the standard "),a("code",[e._v("spec.dbms")]),e._v("\nproperty, the value of this property will be given to the component's "),a("code",[e._v("spec.dbms")]),e._v(". Please consult\nthe documentation for each component's CRD to determine how the Entando resource uses the DBMS (if any).")]),e._v(" "),a("h2",{attrs:{id:"ingress-path-generation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ingress-path-generation"}},[e._v("#")]),e._v(" Ingress Path Generation")]),e._v(" "),a("p",[e._v("When deploying an Entando Custom Resource that uses an Ingress path:")]),e._v(" "),a("ul",[a("li",[e._v("The "),a("code",[e._v("ingressHostName")]),e._v(" property defines the host path that will be used to access this\nservice from outside the cluster. The Entando Operator will create an ingress with this hostname and expose the resource at its default path.")])])])}),[],!1,null,null,null);t.default=n.exports}}]);