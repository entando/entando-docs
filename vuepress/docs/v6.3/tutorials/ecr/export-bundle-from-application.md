---
sidebarDepth: 2
---
# Export and Publish a Bundle

## Overview
Use the Entando bundler command to export a bundle of Entando components from an existing Entando application. An Entando bundle can be used to do the initial install of Entando components into an Entando application, migrate Entando components from one environment to another (e.g. Dev to QA), to provide a template for building a new Entando application, or as the skeleton of an Entando solution. The output of this command is the same bundle directory structure created by an Entando project including a bundle descriptor file.

### Prerequisites
* Use the [Entando CLI](../../docs/reference/entando-cli.md#check-environment) to verify you have the prerequisites in place for this tutorial (e.g. git, entando-bundler). 
``` sh
ent check-env develop 
```
* You'll also need a running Entando application.
* You'll need admin access to Keycloak or admin access to Kubernetes to set it up.

The tutorial assumes you're using an Entando quickstart application. You may need to adjust the specific URLs, credentials, namespaces, etc. for a custom application.

## Export an Entando Bundle

### Setup the Keycloak client
You'll need to setup a Keycloak client with the appropriate permissions for the bundler to access all of the necessary Entando APIs.

1. Find the secret for the Keycloak admin account. If you already have the admin credentials, then you can skip to step 3. 
``` sh
kubectl get secrets -n entando 
```
In a quickstart application, the secret is named `quickstart-kc-admin-secret`

2. Determine the admin password using the secret name.
``` sh
kubectl get secret quickstart-kc-admin-secret -n entando -o go-template="{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

Example output:
``` sh
Username: entando_keycloak_admin
Password: 1pTZev82Ee
```

3. Login to Keycloak using the admin credentials. The URL will be something like  `http://<YOUR-DOMAIN-OR-IP>/auth`. You can use this command to verify the URL.
``` sh
kubectl describe ingress/quickstart-kc-ingress
```

4. Go to `Clients` → `Create`
5. Enter a `Client ID` of your choice, e.g. `entando-bundler`, and click `Save`.
6. The `Settings` tab should be shown. Edit the following values:
* `Access Type:` confidential
* `Service Accounts Enabled:` On
* `Valid Redirect URLs:` *
* `Web Origins:` *

7. Click `Save`
8. Go to the `Service Account Roles` tab
9. Select `Client Roles` → `quickstart-server`
10. Select `Available Roles` → `superuser`. 
11. Click `Add Selected` to add `superuser` to the `Assigned Roles`
12. Click `Save`
13. Go to the `Credentials` tab and copy the `Secret` shown there. You'll need this in the next section.
 
### Create env.json
1. Create a directory where you'll run the bundler and change to that directory.
```sh
mkdir testBundle; cd testBundle
```
2. Create an `env.json` file with the environment URLs and client credentials. The `clientId` and `clientSecret` are from steps 5 and 13 above.

``` json
{
   "coreBaseApi": "http://<YOUR-DOMAIN-OR-IP>/entando-de-app",
   "k8ssvcApi": "http://<YOUR-DOMAIN-OR-IP>/k8s",
   "clientId": "<YOUR-CLIENT-ID>",
   "clientSecret": "<YOUR-CLIENT-SECRET>"
}
```

### Run the Bundler
1. Create a child directory to hold the bundler output. Using the name `bundle` allows you to easily use the `ent prj` command in the following section 
``` sh
mkdir bundle
```
2. Run the bundler command with your preferred settings. 
``` sh
ent bundler from-env --location bundle --code my-test-bundle --description “My Test Bundle”
```
The bundler will inspect the application using the Entando APIs, collect information about the individual components, construct the appropriate descriptor files, and finally assemble the top-level descriptor file.

``` 
$ ls bundle
assets      contentModels  contents         fragments  labels     pageModels  resources
categories  contentTypes   descriptor.yaml  groups     languages  pages       widgets
```

At this point you have a full Entando project structure. You can inspect the output to edit the exported components or you could [deploy it to another Entando application](./publish-simple-bundle.md#publish-the-bundle).
