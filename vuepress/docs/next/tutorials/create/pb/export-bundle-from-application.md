---
sidebarDepth: 2
---
# Export and Publish a Bundle

## Overview
Use the bundler command to export a bundle of components from an existing Entando Application. An Entando Bundle can be used 
- For the initial install of Entando components into an Entando Application
- To migrate Entando components from one environment to another (e.g. Dev to QA)
- To provide a template for building a new Entando Application
- As the skeleton of an Entando solution

This command generates the same bundle directory structure as an Entando project, including a bundle descriptor file.

### Prerequisites
* Use the [Entando CLI](../../../docs/reference/entando-cli.md#check-the-environment) to verify prerequisites (e.g. git, entando-bundler): 
``` sh
ent check-env develop 
```
* A running Entando Application
* Admin access to Keycloak or admin access to Kubernetes to set it up

This tutorial assumes you're using an Entando quickstart application. You may need to adjust specific URLs, credentials, namespaces, etc., for a custom application.

## Export an Entando Bundle

### Set Up the Keycloak Client
Configure a Keycloak client to grant the bundler access to the required Entando APIs.

1. Find the Secret for the Keycloak admin account: 
``` sh
kubectl get secrets -n entando 
```
In a quickstart application, the Secret is named `default-sso-in-namespace-admin-secret`. If you already have the admin credentials, skip to Step 3.

2. Determine the admin password using the Secret name:
``` sh
kubectl get secret default-sso-in-namespace-admin-secret -n entando -o go-template="{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

Example output:
``` sh
Username: entando_keycloak_admin
Password: 1pTZev82Ee
```

3. Log in to Keycloak using the admin credentials. The URL will be similar to `http://YOUR-HOST-NAME/auth/` and can be verified with the following command:
``` sh
kubectl describe ingress/default-sso-in-namespace
```

4. Go to `Clients` → `Create`
5. Enter a `Client ID` of your choice, e.g. `entando-bundler`
6. Click `Save`
7. The `Settings` tab should be shown. Edit the values as follows:
* `Access Type`: confidential
* `Service Accounts Enabled`: On
* `Valid Redirect URLs`: *
* `Web Origins`: *

8. Click `Save`
9. Go to the `Service Account Roles` tab
10. Select `Client Roles` → `quickstart-server`
11. Select `Available Roles` → `superuser`
12. Click `Add Selected` to add `superuser` to the `Assigned Roles`. This change will be saved automatically. 
13. Go to the `Credentials` tab and copy the `Secret` shown there for use in the next section
 
### Create env.json
1. Create a directory where you'll run the bundler and go to that directory:
```sh
mkdir testBundle; cd testBundle
```
2. Create an `env.json` file with the environment URLs and client credentials. Refer to the [client configuration](#set-up-the-keycloak-client) for the `clientId` and `clientSecret` values.

``` json
{
   "coreBaseApi": "http://YOUR-HOST-NAME/entando-de-app",
   "k8ssvcApi": "http://YOUR-HOST-NAME/k8s",
   "clientId": "YOUR-CLIENT-ID",
   "clientSecret": "YOUR-CLIENT-SECRET"
}
```

### Run the Bundler
1. Create a child directory to store the bundler output. Choosing the name `bundle` allows you to easily use the `ent prj` command with this bundle.
``` sh
mkdir bundle
```
2. Run the bundler command with your preferred settings:
``` sh
ent bundler from-env --location bundle --code YOUR-TEST-BUNDLE --description “Your Test Bundle”
```
The bundler will inspect the application using Entando APIs, collect information about individual components, construct appropriate descriptor files and assemble the top-level descriptor file.

``` 
$ ls bundle
assets      contentModels  contents         fragments  labels     pageModels  resources
categories  contentTypes   descriptor.yaml  groups     languages  pages       widgets
```

You now have a complete Entando project structure! You can inspect the output to edit the exported components or [deploy it to another Entando Application](./publish-simple-bundle.md#publish-the-bundle).
