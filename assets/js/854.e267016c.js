(window.webpackJsonp=window.webpackJsonp||[]).push([[854],{2211:function(e,t,a){"use strict";a.r(t);var n=a(36),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"backup-and-restore-an-entando-application"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backup-and-restore-an-entando-application"}},[e._v("#")]),e._v(" Backup and Restore an Entando Application")]),e._v(" "),a("p",[e._v("This guide provides general instructions on how to backup and restore an existing Entando Application. The process entails the migration of databases, filesystem data, Keycloak instance, and bundles, plus the reconfiguration of the service address.")]),e._v(" "),a("h3",{attrs:{id:"initial-considerations-to-note"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#initial-considerations-to-note"}},[e._v("#")]),e._v(" Initial Considerations to Note")]),e._v(" "),a("ul",[a("li",[e._v("The restored instance can be on another cluster or a different namespace of the same cluster hosting the original Entando instance.")]),e._v(" "),a("li",[e._v("The source and restored instances cannot be executed simultaneously if they use the same domain name.")]),e._v(" "),a("li",[e._v("Data cannot be shared between the old and new instances.")]),e._v(" "),a("li",[e._v("Bundles are deployed via Kubernetes to a specific Entando Application and therefore must be reinstalled after the new instance is built. More details are below.")])]),e._v(" "),a("h2",{attrs:{id:"copy-and-migrate-databases"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#copy-and-migrate-databases"}},[e._v("#")]),e._v(" Copy and Migrate Databases")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Make a copy of the source databases or schemas using the native DBMS tools. Some standard Entando database schemas to back up are "),a("code",[e._v("prod_dedb")]),e._v(", "),a("code",[e._v("prod_kc_db")]),e._v(", "),a("code",[e._v("prod_portdb")]),e._v(", and "),a("code",[e._v("prod_servdb")]),e._v(", in addition to any that were created for your microservices. Those will follow a similar naming convention, with the microservice name followed by the suffix "),a("code",[e._v("_plugindb")]),e._v(".")]),e._v(" "),a("ul",[a("li",[e._v("If the original database setup used a "),a("strong",[e._v("custom resource")]),e._v(", refer to the "),a("RouterLink",{attrs:{to:"/v7.3/docs/reference/database-cr.html"}},[e._v("Database Custom Resource")]),e._v(" document.")],1),e._v(" "),a("li",[e._v("If it was provisioned using "),a("strong",[e._v("environment variables")]),e._v(" (PORTDB_"),a("em",[e._v(", SERVDB_")]),e._v(" variables) in the EntandoApp custom resource, see the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/devops/external-db.html"}},[e._v("External DB")]),e._v(" document for more information.")],1)])]),e._v(" "),a("li",[a("p",[e._v("Restore the backups to the target DBMS.")])])]),e._v(" "),a("h2",{attrs:{id:"backup-and-extract-the-appengine-filesystem-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backup-and-extract-the-appengine-filesystem-data"}},[e._v("#")]),e._v(" Backup and Extract the AppEngine Filesystem Data")]),e._v(" "),a("p",[e._v("Use tar commands to archive and extract the files, with kubectl providing support.")]),e._v(" "),a("ol",[a("li",[e._v("Shell in to the "),a("code",[e._v("quickstart-deployment")]),e._v(" pod, as the tar commands need to run from inside the pod.")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl exec -it quickstart-deployment-57f97b4589-5rpqt -- /bin/bash\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Use a temporary directory to store the tarball of the data files for the AppEngine pod "),a("code",[e._v("quickstart-deployment")]),e._v(":")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("cd /tmp\ntar -czvp -f entando-data.tar.gz /entando-data/protected /entando-data/resources\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[e._v("Copy the generated tarball file from the original instance:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl cp quickstart-deployment:/tmp/entando-data.tar.gz entando-data.tar.gz\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[e._v("Push it to the restored instance:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("kubectl cp entando-data.tar.gz quickstart-deployment:/RESTORED-TEMP/entando-data.tar.gz\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[e._v("Extract the archive to the restored environment:")])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("cd /entando-data\ntar xfvz /RESTORED-TEMP/entando-data.tar.gz --strip-components=1\n")])])]),a("h2",{attrs:{id:"backup-and-restore-keycloak"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#backup-and-restore-keycloak"}},[e._v("#")]),e._v(" Backup and Restore Keycloak")]),e._v(" "),a("p",[e._v("Entando can auto-create a new Keycloak instance, but previous Secrets, clients, and permissions will be replaced and recreated from scratch. A less disruptive path is to backup and restore the EntandoApp’s realm to the new Keycloak instance so there is no data loss. For detailed instructions, follow the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/devops/backing-restoring-keycloak.html"}},[e._v("Backing Up and Restoring Keycloak")]),e._v(" tutorial. If only the EntandoApp is restored and the original Keycloak instance is used, it does not need to be reconfigured.")],1),e._v(" "),a("h2",{attrs:{id:"general-guidelines-for-bundles"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#general-guidelines-for-bundles"}},[e._v("#")]),e._v(" General Guidelines for Bundles")]),e._v(" "),a("p",[e._v("When restoring from a backup, a bundle should be reinstalled using the strategy provided by the bundle creator: below are some suggested guidelines.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Export all the EntandoDeBundle custom resources from the source instance and restore them to the new instance,\nthen manually install each bundle. The reinstallation will create the proper client credentials and permissions required by the bundle.")])]),e._v(" "),a("li",[a("p",[e._v("If custom roles and permissions were applied in the original instance, manually transfer these as well. Note, if a different Keycloak is used for the restored instance, then the client and permissions for the bundle may need to be exported/imported to the new instance. See the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/devops/backing-restoring-keycloak.html"}},[e._v("Backing Up and Restoring Keycloak")]),e._v(" tutorial for details.")],1)]),e._v(" "),a("li",[a("p",[e._v("For bundle DB schemas, different methods are required for auto-provisioned and external databases.")]),e._v(" "),a("p",[e._v("A. For auto-provisiond DBMS schemas:"),a("br"),e._v("\n1. When the provisioning is complete, scale down the plugin deployment to 0. Restore the source data with the database-native backup/restore tools and then scale up the deployment."),a("br"),e._v("\n2. In case of Entando Blueprint-generated Spring Boot plugins, the plugin's application will autonomously apply the Liquibase data migration scripts."),a("br"),e._v("\n3. In order to connect to an internal auto-provisioned DBMS, use kubectl port-forward against the bundle DB.")]),e._v(" "),a("p",[e._v("B. For external DBMS schemas:"),a("br"),e._v("\n1. Export all the EntandoDeBundle CRs from the source instance and restore them to the target instance."),a("br"),e._v("\n2. Then create the restored instance DB/schema by making a copy of the source instance DB/schema with the DB-native backup and restore tools."),a("br"),e._v("\n3. Copy DB credential Secrets from the original instance into the restored instance."),a("br"),e._v("\n4. Reinstall the bundles.")])])]),e._v(" "),a("h3",{attrs:{id:"private-repository-bundles"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#private-repository-bundles"}},[e._v("#")]),e._v(" Private Repository Bundles")]),e._v(" "),a("p",[e._v("If a bundle originated from a private repository in the source instance, the Secrets and configurations will need to be replicated in the new instance.")]),e._v(" "),a("ul",[a("li",[e._v("For private Docker registry bundles, see the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/curate/bundle-private-images.html"}},[e._v("Install Bundle from a Private Image Registry")]),e._v(" tutorial.")],1),e._v(" "),a("li",[e._v("For bundles from a private Git repository, see the "),a("RouterLink",{attrs:{to:"/v7.3/tutorials/curate/private-git-repo.html"}},[e._v("Install Bundles from a Private Git Repository")]),e._v(" tutorial.")],1)]),e._v(" "),a("h2",{attrs:{id:"configure-the-service-address"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configure-the-service-address"}},[e._v("#")]),e._v(" Configure the Service Address")]),e._v(" "),a("p",[e._v("If the restored instance is deployed into the same cluster with a domain name identical to the original, the ingresses can collide and result in failure for the restored instance.")]),e._v(" "),a("p",[e._v("There are different ways to resolve this issue, but the simplest method is to edit the ingress host name in the Entando App Engine custom resource, "),a("code",[e._v("EntandoApp")]),e._v(", using kubectl or the container orchestration tool of your choice. You will need to be the super admin or root user to make this change.")]),e._v(" "),a("p",[e._v("Change the "),a("code",[e._v("ingressHostName")]),e._v(" subdomain of the source instance before starting up the new instance. This will update the address wherever it is required, allowing the restored instance to keep the domain name.\nThe edited URL is automatically added to the list of each client's valid URLs in the Keycloak Admin Console, unless the  Keycloak instance was external. The source and restored URLs are included in the list so users will have access to both.")])])}),[],!1,null,null,null);t.default=s.exports}}]);