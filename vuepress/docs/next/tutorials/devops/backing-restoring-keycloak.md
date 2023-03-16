---
sidebarDepth: 2
---

# Backing Up and Restoring Keycloak


This tutorial describes how to backup an active Entando Identity Management Keycloak instance and restore it in another environment.

## Prerequisites:
A Keycloak instance running on Entando with a database management system (DBMS) in the backend. This procedure will not work with an embedded database. 

## Create a Backup of Keycloak Realm
1. From the command line, get the pod name of the Keycloak server you wish to back up. In a quickstart environment, the pod name will begin with `default-sso-in-namespace-deployment`.

2. Use kubectl to start a bash shell in the pod:
```
 kubectl exec -it YOUR-KEYCLOAK-POD-NAME -- /bin/bash
 ```
3. Create a new directory in /tmp with:
```
mkdir -p /tmp/export 
 ```

4. Run the following script to retrieve the data for the Entando realm and save it to a JSON file in the `export` directory. A new Keycloak server will run on a different port (offset=200) to avoid conflicts with the original Entando Keycloak instance.
```
/opt/jboss/keycloak/bin/standalone.sh -Djboss.socket.binding.port-offset=200 -Dkeycloak.migration.action=export  -Dkeycloak.migration.provider=singleFile  -Dkeycloak.migration.realmName=entando -Dkeycloak.migration.usersExportStrategy=DIFFERENT_FILES -Dkeycloak.migration.file=/tmp/export/entando-prod-realm.json
```
5. If there are no errors, press Ctrl+C to stop the process.
6. Type `exit` to close the bash shell in the pod.
7. Execute this command to copy the realm data file to the proper location:  
```
kubectl cp YOUR-KEYCLOAK-POD-NAME:/tmp/export/ keycloak-backup
```
## Import the Keycloak Realm
1. Login to the new Entando Keycloak server where the realm is to be restored.

2. From the left sidebar, go to `Import`.
 
3. Click `Select file` button and `upload` the JSON file from the `keycloak-backup` directory. You will see the following page:

![Entando ID Management UI](./img/import-keycloak.png)

4. You have now successfully imported the Keycloak realm to a new environment.

::: tip Note
If you are using a different environment, with a different hostname, you should import only users or set the flag for `If a resource exists` to `Skip`.
:::
