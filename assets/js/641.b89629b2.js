(window.webpackJsonp=window.webpackJsonp||[]).push([[641],{1890:function(e,a,t){"use strict";t.r(a);var s=t(36),n=Object(s.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"manage-entando-databases"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#manage-entando-databases"}},[e._v("#")]),e._v(" Manage Entando Databases")]),e._v(" "),t("p",[e._v("Entando currently supports PostgreSQL, MySQL and Oracle database systems. With\nPostgreSQL and MySQL, Entando automatically creates a\nKubernetes deployment to host the DBMS.\nFor Oracle and others, Entando\nsupports connectivity to "),t("RouterLink",{attrs:{to:"/v7.0/tutorials/devops/external-db.html"}},[e._v("External Databases")]),e._v(".")],1),e._v(" "),t("p",[e._v("This document describes how Entando manages databases and their connectivity.")]),e._v(" "),t("h2",{attrs:{id:"postgresql-and-mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#postgresql-and-mysql"}},[e._v("#")]),e._v(" PostgreSQL and MySQL")]),e._v(" "),t("h4",{attrs:{id:"lightweight-low-config"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#lightweight-low-config"}},[e._v("#")]),e._v(" Lightweight & Low-Config")]),e._v(" "),t("p",[e._v("When deploying Entando Custom Resources that require databases to a new\nnamespace, Entando creates a Kubernetes deployment by default. It uses standard OpenShift compliant images.")]),e._v(" "),t("p",[e._v("A relatively low-configuration approach, Entando creates and\ninitializes the databases transparently. Persistent data is stored on any\npersistent volume that meets the PersistentVolumeClaim requirements.")]),e._v(" "),t("p",[e._v("When an Entando Custom Resource is redeployed, the persistent volumes\nremain intact. Since the subsequent data initialization is idempotent,\nthe supporting deployments will scale up and behave as expected.")]),e._v(" "),t("h4",{attrs:{id:"isolated-db"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#isolated-db"}},[e._v("#")]),e._v(" Isolated DB")]),e._v(" "),t("p",[e._v("Generally, Entando services encapsulate the database they use,\nproviding mechanisms to import and export data without\nknowledge of the internal workings of the data store. For simpler applications, where database size remains manageable, Entando isolates the DB without the need for deployment pipelines.")]),e._v(" "),t("p",[e._v("These database deployments are not clustered.\nIt is therefore recommended that redundancy and clustering, in the form of clustered storage, be utilized in this type of application.")]),e._v(" "),t("p",[e._v("These deployments specify a restartPolicy of "),t("code",[e._v("Always")]),e._v(". In the event of a\nnon-corrupting failure, the database pod should restart automatically. But this does not replace the features of a full database cluster.")]),e._v(" "),t("h4",{attrs:{id:"advanced-use-cases"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#advanced-use-cases"}},[e._v("#")]),e._v(" Advanced Use Cases")]),e._v(" "),t("p",[e._v("In more advanced cases, as with the use of our CMS\nfunctionality, this approach may not scale. And where there\nis a centralized database admin team or a strict organizational governance for databases, this\napproach can result in a multitude of databases that may become difficult\nto manage.")]),e._v(" "),t("h2",{attrs:{id:"existing-external-databases"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#existing-external-databases"}},[e._v("#")]),e._v(" Existing External Databases")]),e._v(" "),t("p",[e._v("Entando can also be configured to use an existing\nDBMS provided by the customer. In these situations, lower level database\noperations such as tablespace creation, permissions and clustering must be carried out by the customer.")]),e._v(" "),t("p",[e._v("Entando then creates and populates the tables, indices and foreign keys. It creates these in the appropriate table 'container' for the DBMS, such\nas a schema or database. A dedicated custom resource definition in\nKubernetes called "),t("code",[e._v("EntandoDatabaseService")]),e._v(" is used to configure them.")]),e._v(" "),t("p",[e._v("The "),t("code",[e._v("EntandoDatabaseService")]),e._v(" custom resource is created in\nthe same namespace as the EntandoApp and EntandoPlugin that use them. It is usually created along with a Secret that carries admin credentials to the database.")]),e._v(" "),t("h3",{attrs:{id:"structure"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#structure"}},[e._v("#")]),e._v(" Structure")]),e._v(" "),t("p",[t("code",[e._v("EntandoDatabaseService")]),e._v(" custom resource example:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v(" EntandoDatabaseService\nmetadata:\n  name: string, any K8s compliant name\n  namespace: string, the namespace this DB is created in\nspec:\n  dbms: string, one of Oracle, PostgreSQL or MySQL\n  host: string, either an IP address or hostname where the database service is hosted\n  port: integer, the port on which the database service is hosted\n  databaseName: string, the name of the database, only required for PostgreSQL and Oracle\n  secretName: the name of the Secret in the same namespace carrying admin credentials to the database service\n  tablespace: (Oracle only)  the tablespace to use for required schemas \n  jdbcParameters: a map containing name-value pairs for any additional parameters required for the JDBC driver to connect to the database\n")])])]),t("p",[e._v("An example of the Secret that provides the admin credentials, identified as\n"),t("code",[e._v("secretName")]),e._v(" above:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("Secret:\n  name: string, any K8s compliant name\n  namespace: string, the namespace the DB is created in\n  stringData:\n    username: string, name of an admin user that can create schemas and other users\n    password: string, password of the above user\n")])])]),t("h3",{attrs:{id:"how-it-works"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works"}},[e._v("#")]),e._v(" How It Works")]),e._v(" "),t("h4",{attrs:{id:"database-custom-resource"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#database-custom-resource"}},[e._v("#")]),e._v(" Database Custom Resource")]),e._v(" "),t("p",[e._v("In order for the EntandoApp and plugin deployer to choose the\ncorrect database service, the "),t("code",[e._v("EntandoDatabaseService")]),e._v(" custom resource needs to be created\n"),t("strong",[e._v("BEFORE")]),e._v(" the app and plugins are created. There can be\nmultiple "),t("code",[e._v("EntandoDatabaseServices")]),e._v(" in the namespace, but they need to\npoint to DBMS of different vendors, i.e. PostgreSQL, Oracle\nand MySQL.")]),e._v(" "),t("p",[e._v("Entando currently does not enforce any validation, but if there\nare two "),t("code",[e._v("EntandoDatabaseServices")]),e._v(" that have the same DBMS vendor, it will\nsimply pick the first one and continue. Please ensure that only one\n"),t("code",[e._v("EntandoDatabaseService")]),e._v(" exists for each DBMS vendor used.")]),e._v(" "),t("h4",{attrs:{id:"spec-dbms"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#spec-dbms"}},[e._v("#")]),e._v(" Spec.dbms")]),e._v(" "),t("p",[e._v("Any application or plugin that is created has to specify the\nappropriate DBMS vendor in their "),t("code",[e._v("spec.dbms")]),e._v(" property. If the\nEntando Operator detects an "),t("code",[e._v("EntandoDatabaseService")]),e._v(" with a matching DBMS\nvendor, it will continue to create the necessary schemas for that specific\ndatabase.")]),e._v(" "),t("p",[e._v("If the operator does not detect an\n"),t("code",[e._v("EntandoDatabaseService")]),e._v(" with a matching DBMS vendor, it will fall back\nto its default behaviour--creating a matching deployment and\nspinning up a database service from the same namespace.")]),e._v(" "),t("p",[e._v("If the "),t("code",[e._v("spec.dbms")]),e._v(" property is not specified on an EntandoApp, the operator will\ndefault to PostgreSQL. If the "),t("code",[e._v("spec.dbms")]),e._v(" is not specified for\na plugin, the operator will assume that it\ndoes not require a database, bypassing any database\nand schema creation.")]),e._v(" "),t("p",[e._v("When the Entando Operator processes the app or plugin with\nan appropriate "),t("code",[e._v("spec.dbms")]),e._v(" specification, it will create a schema/user pair\nfor each datasource required. A typical app deployment requires 3\ndatasources: portdb, servdb, and dedb. Plugins generally require 1\ndatasource: plugindb.")]),e._v(" "),t("h4",{attrs:{id:"db-schema-and-user-name"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#db-schema-and-user-name"}},[e._v("#")]),e._v(" DB Schema and User Name")]),e._v(" "),t("p",[e._v("The DB schema and user pair will have the same name. The name\nis derived from the plugin or app name, replacing\nall characters that are not ANSI-SQL compliant with an underscore.")]),e._v(" "),t("p",[e._v("The datasource name is then suffixed to the schema name. When naming\nyour app or plugin, keep in mind that some DBMS\ndo not support long schema names. Future versions of Entando will allow\nyou to override the schema prefix for an app or plugin.")]),e._v(" "),t("h3",{attrs:{id:"credentials"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#credentials"}},[e._v("#")]),e._v(" Credentials")]),e._v(" "),t("p",[e._v('The Entando Operator generates a Kubernetes Secret for each schema/user\ncombination it creates. This Secret is the concatenation of\nthe app or plugin name, the datasource qualifier,\nplus the suffix "secret", with dashes in between.')]),e._v(" "),t("p",[e._v("For instance: "),t("br"),e._v("\nEntandoApp called "),t("code",[e._v("your-app")]),e._v(" and datasource "),t("code",[e._v("portdb")]),e._v(" "),t("br"),e._v("\nKubernetes Secret → "),t("code",[e._v("your-app-portdb-secret")])]),e._v(" "),t("h4",{attrs:{id:"passwords-and-secrets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#passwords-and-secrets"}},[e._v("#")]),e._v(" Passwords and Secrets")]),e._v(" "),t("p",[e._v("The Entando Operator will never overwrite or update an existing database Secret. It generates a random string for the password, which is generally considered the safest\napproach. If you wish to change the password for the user, remember to update the password in the Kubernetes\nSecret. Such an operation can sometimes create an error, resulting in deployment failures.")]),e._v(" "),t("p",[e._v("The Entando Operator’s schema creation logic is idempotent. If the generated schema/user combination in the\nassociated Kuberentes Secret already exists, there will be no side effects.\nBut if the login fails, it will\nattempt to create the user. If the user already exists, with a\ndifferent password than the one in the Kubernetes Secret, all subsequent\ndeployment operations will fail.")]),e._v(" "),t("h2",{attrs:{id:"vendor-specific-notes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#vendor-specific-notes"}},[e._v("#")]),e._v(" Vendor Specific Notes")]),e._v(" "),t("h3",{attrs:{id:"oracle"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#oracle"}},[e._v("#")]),e._v(" Oracle")]),e._v(" "),t("h4",{attrs:{id:"example"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[e._v("#")]),e._v(" Example")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("  EntandoDatabaseService\n    metadata:\n      name:oracle-service\n    spec:\n      dbms: oracle\n      host: 10.0.0.13\n      port: 1521\n      databaseName: ORCLPDB1.localdomain\n      secretName: oracle-secret\n      tablespace: entando_ts\n      jdbcParameters: {}\n  Secret:\n    metadata:\n      name: oracle-secret\n    stringData:\n      username: admin\n      password: admin123\n")])])]),t("h4",{attrs:{id:"resulting-connection-string"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resulting-connection-string"}},[e._v("#")]),e._v(" Resulting connection string:")]),e._v(" "),t("p",[e._v("jdbc:oracle:thin:@//10.0.0.13:1521/ORCLPDB1.localdomain")]),e._v(" "),t("h4",{attrs:{id:"notes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Oracle follows a few complicated rules when building the correct\nconnection string. For the sake of portability and\na lightweight image, the DB is limited to the thin driver.")])]),e._v(" "),t("li",[t("p",[e._v("The "),t("code",[e._v("databaseName")]),e._v(" could also be an Oracle service as opposed to the "),t("code",[e._v("SID")]),e._v(".\nCoordinate with your Oracle DB admin to determine exactly what value to\nuse. We strongly recommend testing your settings with code or\na tool that constructs a JDBC connection.")])]),e._v(" "),t("li",[t("p",[e._v("You can specify which tablespace Entando should use to create the\nschemas by using the "),t("code",[e._v("spec.tablespace")]),e._v(" property.")])]),e._v(" "),t("li",[t("p",[e._v("When the operator prepares the schemas for your EntandoApp or\nEntando plugin, it creates a user for every datasource required.\nAs standard for Oracle, that user will have their own schema\nwith the same name. Permissions are set up to ensure that one user\ncannot access tables from another user’s schema.")])])]),e._v(" "),t("blockquote",[t("p",[e._v("Oracle limits schema names to 30 characters. If you intend to use Oracle,\nplease keep the name of your apps and plugins short. The suffixes added to the app or plugin name are usually shorter than 8 characters. Names of about\n20 characters should be safe to ensure the resulting schema\nname is unique.")])]),e._v(" "),t("h4",{attrs:{id:"ora-01704-string-literal-too-long"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ora-01704-string-literal-too-long"}},[e._v("#")]),e._v(" ORA-01704: string literal too long")]),e._v(" "),t("p",[e._v("Entando requires extended datatypes to be activated in Oracle 12c and\nhigher.\n("),t("a",{attrs:{href:"https://oracle-base.com/articles/12c/extended-data-types-12cR1",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://oracle-base.com/articles/12c/extended-data-types-12cR1"),t("OutboundLink")],1),e._v(")")]),e._v(" "),t("h3",{attrs:{id:"mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql"}},[e._v("#")]),e._v(" MySQL")]),e._v(" "),t("h4",{attrs:{id:"example-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#example-2"}},[e._v("#")]),e._v(" Example")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v('EntandoDatabaseService\n  metadata:\n    name:mysql-service\n  spec:\n    dbms: mysql\n    host: 10.0.0.13\n    port: 3306\n    databaseName:\n    secretName: mysql-secret\n    jdbcParameters:\n       useSSL: "true"\nSecret:\n  metadata:\n    name: mysql-secret\n  stringData:\n    username: admin\n    password: admin123\n')])])]),t("h4",{attrs:{id:"resulting-connection-string-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resulting-connection-string-2"}},[e._v("#")]),e._v(" Resulting Connection String")]),e._v(" "),t("p",[e._v("jdbc:mysql://10.0.0.13:3306")]),e._v(" "),t("h4",{attrs:{id:"notes-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#notes-2"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),t("ul",[t("li",[e._v("MySQL doesn’t distinguish between schemas and databases. For this reason, no\n"),t("code",[e._v("databaseName")]),e._v(" is required. The Entando Operator will therefore create an\nentirely new database for each datasource your app or plugin requires. It also creates a user with the same name as\nthe database with permissions to ensure one user cannot access the\ndatabase of another user.")])]),e._v(" "),t("blockquote",[t("p",[e._v("MySQL limits database names\nto 63 characters. Keep this in mind when naming your\nEntando Applications and plugins.")])]),e._v(" "),t("h3",{attrs:{id:"postgresql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#postgresql"}},[e._v("#")]),e._v(" PostgreSQL")]),e._v(" "),t("h4",{attrs:{id:"example-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#example-3"}},[e._v("#")]),e._v(" Example")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("  EntandoDatabaseService\n    metadata:\n      name:postgresql-service\n    spec:\n      dbms: postgresql\n      host: 10.0.0.13\n      port: 5432\n      databaseName: my_db\n      secretName: postgresql-secret\n      jdbcParameters: {}\n\n  Secret:\n    metadata:\n      name: postgresql-secret\n    stringData:\n      username: admin\n      password: admin123\n")])])]),t("h4",{attrs:{id:"resulting-connection-string-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resulting-connection-string-3"}},[e._v("#")]),e._v(" Resulting Connection String")]),e._v(" "),t("p",[e._v("jdbc:postgresql://10.0.0.13:5432/my_db")]),e._v(" "),t("h4",{attrs:{id:"notes-3"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#notes-3"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),t("ul",[t("li",[e._v("PostgreSQL behaves like Oracle when it comes to user and schema association. The current username is applied as a\ndefault schema/prefix to resolve tables. Entando ensures\nthat two users don’t have access to the other’s schemas.")])]),e._v(" "),t("h2",{attrs:{id:"skipping-database-preparation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#skipping-database-preparation"}},[e._v("#")]),e._v(" Skipping Database Preparation")]),e._v(" "),t("p",[e._v("When an Entando Application is deployed, an operator is responsible for the entire process, including DB creation and preparation.\nIf you already have a prepared DB (schemas, tables, etc.), you could skip the schema creation and DB preparation to speed up the deployment process.")]),e._v(" "),t("p",[e._v("To achieve this, specify the pertinent properties for the EntandoApp component in the "),t("code",[e._v("entandoapp.yaml")]),e._v(" file.")]),e._v(" "),t("p",[e._v("For the "),t("code",[e._v("spec.dbms")]),e._v(" property, choose "),t("code",[e._v("none")]),e._v(". Then add the necessary DB connection parameters.\nHere is an example of the "),t("code",[e._v("entandoapp.yaml")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language-yaml extra-class"},[t("pre",{pre:!0,attrs:{class:"language-yaml"}},[t("code",[e._v("    "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("kind")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"EntandoApp"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("metadata")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("annotations")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("labels")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"example-qs"')]),e._v("\n      "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("spec")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("dbms")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"none"')]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("replicas")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("standardServerImage")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" wildfly\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("ingressPath")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" /entando"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("de"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v("app\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("environmentVariables")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v("\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SPRING_DATASOURCE_USERNAME\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" admin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SPRING_DATASOURCE_PASSWORD\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" adminadmin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SPRING_DATASOURCE_URL\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_dedb"')]),e._v("\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SPRING_JPA_DATABASE_PLATFORM\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" org.hibernate.dialect.PostgreSQLDialect\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" PORTDB_URL\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_portdb"')]),e._v("\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" PORTDB_USERNAME\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" admin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" PORTDB_PASSWORD\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" adminadmin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" PORTDB_CONNECTION_CHECKER\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" PORTDB_EXCEPTION_SORTER\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SERVDB_URL\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v('"jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_servdb"')]),e._v("\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SERVDB_USERNAME\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" admin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SERVDB_PASSWORD\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" adminadmin\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SERVDB_CONNECTION_CHECKER\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("-")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("name")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" SERVDB_EXCEPTION_SORTER\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[e._v("value")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(":")]),e._v(" org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter\n")])])]),t("h3",{attrs:{id:"how-it-works-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#how-it-works-2"}},[e._v("#")]),e._v(" How It Works")]),e._v(" "),t("ul",[t("li",[e._v("Using "),t("code",[e._v('spec.dbms: "none"')]),e._v(" directs the operator to skip the initial schema/user creation step.")]),e._v(" "),t("li",[e._v("Adding variables under the "),t("code",[e._v("spec.environmentVariables")]),e._v(" section will supply connection parameters that will be used by the EntandoApp.")]),e._v(" "),t("li",[e._v("Keep in mind that all these parameters will be applied to each of the containers in the EntandoApp pod, overriding existing values.")])]),e._v(" "),t("h2",{attrs:{id:"liquibase-migration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#liquibase-migration"}},[e._v("#")]),e._v(" Liquibase Migration")]),e._v(" "),t("p",[e._v("Beginning with Entando 7.0, the EntandoApp Engine modules will implement automatic Liquibase migrations to manage structural changes to databases running on MySQL or PostgreSQL.")]),e._v(" "),t("h4",{attrs:{id:"db-migration-modes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#db-migration-modes"}},[e._v("#")]),e._v(" DB Migration Modes")]),e._v(" "),t("p",[e._v("The parameter provided to the environment variable "),t("code",[e._v("DB_MIGRATION_STRATEGY")]),e._v(" determines how required updates are applied to components of an existing database. Three database migration modes are supported and govern upgrade behavior:")]),e._v(" "),t("ul",[t("li",[t("code",[e._v("auto")]),e._v(" (default setting): The application starts and databases are updated. Changes are applied to each component introduced in Entando versions 7.0 and later.")]),e._v(" "),t("li",[t("code",[e._v("disabled")]),e._v(": The application does not start. Database changes are detected but not implemented. The application indicates which components require updates.")]),e._v(" "),t("li",[t("code",[e._v("generate_sql")]),e._v(": The application does not start but generates the SQL scripts to upgrade databases manually.")])])])}),[],!1,null,null,null);a.default=n.exports}}]);