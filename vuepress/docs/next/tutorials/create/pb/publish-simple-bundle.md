---
sidebarDepth: 2
---
# Build and Publish a Simple Bundle

## Overview

This tutorial describes how to create a simple Entando Bundle and deploy it into the [Entando Component Repository](../../../docs/getting-started/concepts-overview.md#entando-component-repository) (ECR). This process consists of 4 essential steps:

1. Define the bundle component(s)
2. Check the bundle artifacts into a Docker repository
3. Apply the bundle custom resource to Kubernetes
4. Install the bundle into an application

## Prerequisites
* Verify dependencies with the [Entando CLI](../../../docs/reference/entando-cli.md#check-the-environment): `ent check-env develop`
* Authenticated Docker credentials
* A running Entando instance

Bundles are generated using the `ent bundle` command and its convenience methods.

## Initialize a Bundle Project

1. Create the bundle structure by scaffolding default files and folders:
   ``` sh
   ent bundle init YOUR-BUNDLE-NAME
   ```
## Add a Simple Widget

1. From the bundle root folder, create and enter a widget directory:
   ``` sh
   mkdir -p platform/widgets
   ```
   Descriptor files are organized by component type, with all micro frontends, microservices and platform-specific components located under their respective parent folders. 
   
   The parent folder "platform" contains the child folder "widgets" in which to store the widget descriptor file.
   OR
   Widgets are a specific type of platform component, so the "platform" directory includes a child directory dedicated to widget files. 

2. Create a widget descriptor file within the widget directory:
   ``` sh
   touch platform/widgets/example-widget.yaml
   ```
   A corresponding top-level bundle descriptor file is not necessary.

   Platform-specific components use descriptor file names and locations (e.g. `platform/widgets/example-widget.yaml`) which are arbitrarily and explicitly defined within the bundle descriptor (`entando.json`). Convention is to group components by type with all widgets in one directory, all page templates in another, etc.


3. Populate the widget descriptor file `example-widget.yaml` with a simple definition. Retain correct YAML indentation of 2 or 4 spaces. To avoid potential processing conflicts, the `code` entry must not contain the hyphen character.
   ``` yaml
   code: example_widget
   titles:
      en: Example Widget
      it: Widget d'esempio
   group: free
   customUi: <h2>Hi from Example Widget</h2>
   ```

## Publish the Bundle

1. From the root bundle directory, generate the Docker image(s):
   ``` sh
   ent bundle pack
   ```
   The `pack` command builds the bundle components, then constructs a Docker image for each microservice and one for the bundle itself.

2. Publish the Docker image(s) to a Docker registry:
   ``` sh
   ent bundle publish
   ```
   When prompted, input the organization of your choice, e.g. the user ID of your Docker account.

3. Deploy the bundle to the ECR of your Entando instance. Specify the Docker organization where the widget is published and the bundle name.
   ``` sh
   ent ecr deploy --repo=docker://registry.hub.docker.com/YOUR-DOCKER-ORG/YOUR-BUNDLE-NAME
   ```
## Install the Bundle into an Application

1. In your Entando instance, go to `App Builder` → `Component Repository` 

2. Click `Install`. A bundle with multiple iterations allows version selection.

3. Verify the `Install` button changes to `Uninstall` to indicate that the installation completed successfully

4. Go to `App Builder` → `Components` → `Micro Frontends & Widgets` to confirm that your bundle appears in the "User" section