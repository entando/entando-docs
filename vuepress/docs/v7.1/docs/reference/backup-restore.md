---
sidebarDepth: 2
---

# Backup and Restore an Entando Application

This guide provides general instructions on how to backup and restore an existing Entando Application. The process entails the migration of databases, filesystem data, Keycloak instance, and bundles, plus the reconfiguration of the service address. 

### Initial Considerations to Note
* The restored instance can be on another cluster or a different namespace of the same cluster hosting the original Entando instance. 
* The source and restored instances cannot be executed simultaneously if they use the same domain name. 
* Data cannot be shared between the old and new instances.
* Bundles are deployed via Kubernetes to a specific Entando Application and therefore must be reinstalled after the new instance is built. More details are below.

## Copy and Migrate Databases

1. Make a copy of the source databases or schemas using the native DBMS tools. Some standard Entando database schemas to back up are `prod_dedb`, `prod_kc_db`, `prod_portdb`, and `prod_servdb`, in addition to any that were created for your microservices. Those will follow a similar naming convention, with the microservice name followed by the suffix `_plugindb`.
      * If the original database setup used a **custom resource**, refer to the [Database Custom Resource](https://developer.entando.com/v7.1/docs/reference/database-cr.html) document. 
      * If it was provisioned using **environment variables** (PORTDB_*, SERVDB_* variables) in the EntandoApp custom resource, see the [External DB](https://developer.entando.com/v7.1/tutorials/devops/external-db.html) document for more information.  
 
2. Restore the backups to the target DBMS.


## Backup and Extract the AppEngine Filesystem Data
Use tar commands to archive and extract the files, with kubectl providing support.
1. Shell in to the `quickstart-deployment` pod as the tar commands need to run from inside of the pod.
```
kubectl exec -it quickstart-deployment-57f97b4589-5rpqt -- /bin/bash
```

2. Use a temporary directory to store the tarball of the data files for the AppEngine pod `quickstart-deployment`:

```
cd /tmp
tar -czvp -f entando-data.tar.gz /entando-data/protected /entando-data/resources
```

2. Copy the generated tarball file from the original instance:

```
kubectl cp quickstart-deployment:/tmp/entando-data.tar.gz entando-data.tar.gz
```

3. Push it to the restored instance:

```
kubectl cp entando-data.tar.gz quickstart-deployment:/RESTORED-TEMP/entando-data.tar.gz
```

4. Extract the archive to the restored environment:
```
cd /entando-data
tar xfvz /RESTORED-TEMP/entando-data.tar.gz --strip-components=1
```

## Backup and Restore Keycloak
Entando can auto-create a new Keycloak instance, but previous Secrets, clients, and permissions will be replaced and recreated from scratch. A less disruptive path is to backup and restore the EntandoApp’s realm to the new Keycloak instance so there is no data loss. For detailed instructions, follow the [Backing Up and Restoring Keycloak](../../tutorials/devops/backing-restoring-keycloak.md) tutorial. If only the EntandoApp is restored and the original Keycloak instance is used, it does not need to be reconfigured.

## General Guidelines for Bundles
When restoring from a backup, a bundle should be reinstalled using the strategy provided by the bundle creator: below are some suggested guidelines. 

1. Export all the EntandoDeBundle custom resources from the source instance and restore them to the new instance, 
then manually install each bundle. The reinstallation will create the proper client credentials and permissions required by the bundle.
2. If custom roles and permissions were applied in the original instance, manually transfer these as well. Note, if a different Keycloak is used for the restored instance, then the client and permissions for the bundle may need to be exported/imported to the new instance. See the [Backing Up and Restoring Keycloak](../../tutorials/devops/backing-restoring-keycloak.md) tutorial for details.
3. For bundle DB schemas, different methods are required for auto-provisioned and external databases.

    A. For auto-provisiond DBMS schemas:  
             1. When the provisioning is complete, scale down the plugin deployment to 0. Restore the source data with the database-native backup/restore tools and then scale up the deployment.  
             2. In case of Entando Blueprint-generated Spring Boot plugins, the plugin's application will autonomously apply the Liquibase data migration scripts.   
             3. In order to connect to an internal auto-provisioned DBMS, use kubectl port-forward against the bundle DB.   

    B. For external DBMS schemas:  
       1. Export all the EntandoDeBundle CRs from the source instance and restore them to the target instance.  
       2. Then create the restored instance DB/schema by making a copy of the source instance DB/schema with the DB-native backup and restore tools.  
       3. Copy DB credential Secrets from the original instance into the restored instance.  
       4. Reinstall the bundles.   


### Private Repository Bundles
If a bundle originated from a private repository in the source instance, the Secrets and configurations will need to be replicated in the new instance. 
* For private Docker registry bundles, see the [Install Bundle from a Private Image Registry](https://developer.entando.com/v7.1/tutorials/curate/bundle-private-images.html) tutorial. 
* For bundles from a private Git repository, see the [Install Bundles from a Private Git Repository](https://developer.entando.com/v7.1/tutorials/curate/private-git-repo.html) tutorial.

## Configure the Service Address
If the restored instance is deployed into the same cluster with a domain name identical to the original, the ingresses can collide and result in failure for the restored instance.

There are different ways to resolve this issue, but the simplest method is to edit the ingress host name in the Entando App Engine custom resource, `EntandoApp`, using kubectl or the container orchestration tool of your choice. You will need to be the super admin or root user to make this change.

Change the `ingressHostName` subdomain of the source instance before starting up the new instance. This will update the address wherever it is required, allowing the restored instance to keep the domain name. 
The edited URL is automatically added to the list of each client's valid URLs in the Keycloak Admin Console, unless the  Keycloak instance was external. The source and restored URLs are included in the list so users will have access to both.


