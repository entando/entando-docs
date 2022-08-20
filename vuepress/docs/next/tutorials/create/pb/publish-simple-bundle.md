---
sidebarDepth: 2
---
# Build and Publish a Simple Widget

## Overview

This tutorial describes how to build and publish a single-component Entando Bundle consisting of a simple widget. The step sequence below performs the following functions:

1. Define the bundle component
2. Check the bundle artifacts into a Docker repository
3. Apply the bundle custom resource to Kubernetes
4. Install the bundle into an Entando Application

## Prerequisites
* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`
* Authenticated Docker credentials
* A running Entando instance

Bundles are generated using the `ent bundle` command and its convenience methods.

## Create a Simple Widget

1. Initialize a bundle project:
   ``` sh
   ent bundle init YOUR-BUNDLE-NAME
   ```
   This generates the required bundle structure by scaffolding default files and folders.

2. Create a widget folder inside the `platform` folder of your bundle's root folder:
   ``` sh
   mkdir -p platform/widgets
   ```
   Descriptor files are organized by component type, with all micro frontends, microservices and platform-specific components located under their respective parent folders. The parent folder `platform` and child folder `widgets` complete the path to the widget descriptor file.
   
3. Create a widget descriptor file inside the widget directory:
   ``` sh
   touch platform/widgets/example-widget.yaml
   ```
   Platform-specific components are assigned descriptor file names and locations by the user (e.g. `widgets/example-widget.yaml`). These must be defined at the `platform` level, where convention is to group components by type, in subfolders of the same name (e.g. `platform/widgets`).


4. Add the following simple definition to the widget descriptor file, which is currently empty:
   >Note: Retain correct YAML indentation of 2 or 4 spaces. To avoid potential processing conflicts, the `code` field value must not contain the hyphen character.
   ``` yaml
   code: example_widget
   titles:
      en: Example Widget
      it: Widget d'esempio
   group: free
   customUi: <h2>Hi from Example Widget</h2>
   ```

5. From the root bundle directory, generate the Docker image:
   ``` sh
   ent bundle pack
   ```
   The `pack` command builds the widget, then constructs a Docker image for the bundle.

6. Publish the Docker image to a Docker registry:
   ``` sh
   ent bundle publish
   ```

7. Deploy the bundle to your Entando Application:
   ``` sh
   ent bundle deploy
   ```
   Your bundle will appear in the Local Hub of your Entando instance, accessible from `App Builder` → `Hub`, and show a status of DEPLOYED.

8. Install the bundle in your Entando Application:
   ``` sh
   ent bundle install
   ```
   Your bundle will now show a status of INSTALLED.