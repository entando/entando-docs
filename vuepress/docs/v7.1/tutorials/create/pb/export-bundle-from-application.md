---
sidebarDepth: 2
---
# Export and Publish a Bundle

The ent bundler command exports a bundle from an existing Entando Application to: 
- Perform the initial install of components into an Entando Application
- Migrate bundles from one environment to another (e.g. Dev to QA)
- Provide a template for building a new application

This tutorial describes how to export a git-based Entando Bundle using the ent CLI. This package can be deployed to Entando or changed to a docker-based bundle to take advantage of Entando's latest composable methods. The procedure assumes you're using an Entando quickstart application. Otherwise, you may need to adjust specific URLs, credentials, namespaces, etc., for a custom application.

## Prerequisites
* [A running instance of Entando](../../../docs/getting-started/)
* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

* [Admin access to Keycloak](../../../docs/consume/identity-management.md#logging-into-your-keycloak-instance)


## Export an Entando Bundle

### Set Up the Keycloak Client
Configure a Keycloak client to grant the ent CLI access to the required Entando APIs.

1. Log in to Keycloak using the admin credentials. The URL will be similar to `http://YOUR-HOST-NAME/auth/` and can be verified with the following command:
``` sh
ent kubectl describe ingress/default-sso-in-namespace-ingress -n entando
```

2. Go to `Clients` → `Create`
3. Enter a `Client ID` of your choice, e.g. `entando-bundler`
4. Click `Save`
5. The `Settings` tab should be shown. Edit the values as follows:
    * `Access Type`: confidential
    * `Service Accounts Enabled`: On
    * `Valid Redirect URLs`: *
    * `Web Origins`: *

6. Click `Save`
7. Go to the `Service Account Roles` tab
8. Select `Client Roles` → `quickstart`
9. Select `Available Roles` → `superuser`
10. Click `Add Selected` to add `superuser` to the `Assigned Roles`. This change will be saved automatically. 
11. Go to the `Credentials` tab and copy the `Secret` shown there for use in the next section
 
### Create the `env.json` Configuration File
1. Create a directory where you'll run the bundler and switch to that directory:
```sh
mkdir testBundle; cd testBundle
```
2. Create an `env.json` file using your environment URLs and client credentials. Refer to the [client configuration](#set-up-the-keycloak-client) for the `clientId` and `clientSecret` values.

``` json
{
   "coreBaseApi": "http://YOUR-HOST-NAME/entando-de-app",
   "componentManagerApi": "http://YOUR-HOST-NAME/digital-exchange",
   "clientId": "YOUR-CLIENT-ID",
   "clientSecret": "YOUR-CLIENT-SECRET"
}
```

### Run the Bundler
1. Create a child directory to store the bundler output. Choosing the name `bundle` allows you to easily use the `ent prj` command with this bundle.
``` sh
mkdir bundle
```
2. Run the bundler:
``` sh
ent bundler from-env --location bundle --code YOUR-BUNDLE-NAME --description “Your Exported Bundle”
```
The bundler will inspect the application using Entando APIs, collect information about individual components, construct appropriate descriptor files, and assemble the top-level descriptor file.

``` 
$ ls bundle
assets      contentModels  contents         fragments  labels     pageModels  resources
categories  contentTypes   descriptor.yaml  groups     languages  pages       widgets
```

You now have a complete Entando project structure for a git-based bundle! You can inspect the output to edit the exported components or [deploy](publish-project-bundle.md) it to another Entando Application. 
::: tip Note:
To convert this project to a docker-based bundle, continue with the steps below. 
:::

### Construct the Docker-based Bundle Structure

1. Initialize a new bundle and switch to that directory:
``` 
ent bundle init YOUR-BUNDLE-NAME
cd YOUR-BUNDLE-NAME
```
2. Copy the resources from the `testBundle/bundle` directory to the `YOUR-BUNDLE-NAME/platform` directory, with the exception of microservices (/plugins) and micro frontends (/widgets). 

For micro frontends and microservices, migrate the source code manually to the corresponding folders inside your bundle directory. Note that non-MFE widgets are considered platform entities on Entando and should be placed in the `platform/widgets` directory.

Use the [ent bundle CLI tool](../../../docs/getting-started/ent-bundle.md) to assist in the process of adding micro frontends and microservices. To define their specific attributes in the bundle descriptor, `entando.json`, also check out the [Entando Bundle details](../../../docs/curate/bundle-details.md) page.

3. With the project structure in place, [build, publish and install](publish-project-bundle.md) your bundle.
```
ent bundle pack
ent bundle publish
ent bundle deploy
ent bundle install
```
**Next Steps**
* [Manage APIs](../../../docs/getting-started/ent-api.md) for your bundle.
* Learn about [Selecting Default Databases](../../devops/default-database.md).
 