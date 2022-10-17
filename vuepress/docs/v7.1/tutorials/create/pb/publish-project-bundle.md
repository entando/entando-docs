---
sidebarDepth: 2
---
# Build and Publish a Bundle Project
## Overview
This tutorial describes how to deploy an existing Entando project directory into the [Local Hub](../../../docs/getting-started/concepts-overview.md#local-hub). Following the steps below will:

- Build Docker images for the bundle and any microservices
- Push the Docker images to a Docker registry
- Apply the bundle custom resource to Kubernetes
- Install the bundle into an Entando Application

The Entando Bundle CLI tool (**ent bundle**) automates many of the tasks involved in deploying an Entando project bundle.

## Prerequisites
* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`
* Authenticated Docker credentials
* A Docker repository
* A running Entando instance
* An Entando project directory. You can create this [from scratch](./publish-simple-bundle.md) or [with the Entando Component Generator](../ms/generate-microservices-and-micro-frontends.md).

## Create and Deploy a Bundle Project

The following steps leverage the Entando `ent bundle` command and its convenience methods.

1. From the root bundle directory, generate the Docker image:
   ``` sh
   ent bundle pack
   ```
   This builds the bundle components and Docker images.

2. Publish the Docker image to a Docker registry:
   ``` sh
   ent bundle publish
   ```

3. Deploy the bundle to your Entando Application:
   ``` sh
   ent bundle deploy
   ```
   Your bundle will appear in the Local Hub of your Entando instance, accessible from `App Builder` → `Hub`, and show a status of DEPLOYED.

4. Install the bundle in your Entando Application from `App Builder` → `Hub` or with the following command:
   ``` sh
   ent bundle install
   ```
   Your bundle will now show a status of INSTALLED. 

## Notes

The Entando Platform downloads and installs the Docker images for microservices and installs the micro frontends into the Entando Application. You can add micro frontend widgets to a page or page template provided by Entando, or to one you create yourself following the [Page Management tutorial](../../compose/page-management.md). 

An application based on the Entando Blueprint expects a user to be authenticated. If your project bundle was generated using the Entando Component Generator, your widget can only be added to a page template that includes the UX fragment `keycloak_auth`.

