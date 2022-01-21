---
redirectFrom: /next/tutorials/customize-the-platform/app-engine/building-prepackaged-image.html
sidebarDepth: 2
---
# Backing Up and Restoring an Entando Application

## Overview

This tutorial demonstrates how to use an existing Entando Application as a launching point for creating new applications. An alternative is to [use the Entando Bundler](../ecr/export-bundle-from-application.md) to extract specific content and functionality from an existing application. Entando Bundles are recommended as a more flexible option when a full copy of an application is not required.

## Prerequisites
* Java 11
* Docker
* Maven
* Access to a Docker repository (docker.io or other)

## Create a Backup
This step requires using a running Entando environment to take an application backup.
The output of this step is a local directory with the files (database and static assets) needed to restore the application later.

1. Log into the App Builder

2. Go to `Administration → Database`

3. Click on `Create A Backup` and wait for the process to complete. The static assets and database backup will be saved to a persistent volume on the server pod under `/entando-data`.

4. Transfer the files from the `server-deployment`. The exact command will depend on your Kubernetes environment.

| kubectl | OpenShift |
| ------- | --------- |
| `kubectl cp <pod>:<path> <local-path>` | `oc rsync <pod>:<path> <localPath>` |
| e.g. `kubectl cp quickstart-server-deployment-7b8c699599-f84zq:/entando-data backup` | e.g.`oc rsync app-entando-server-deployment-67fd5b9954-s72mb:/entando-data`|

5. You should see 3 directories - `databases`, `protected`, and `resources`.
The `protected` directory contains the timestamped backup you triggered from the App Builder. The `resources` directory contains the static assets. 

## Restore a Backup
Restoring a backup requires creating and then deploying a custom image of an Entando Application with the
backup files included. 

### Build the Custom Image
1.  Clone the Entando Application repository
```sh
git clone https://github.com/entando/entando-de-app
```

2.  Change into the `entando-de-app` directory:
```sh
cd entando-de-app
```

3. (Optional) Checkout a branch for your desired Entando version. You can review <https://github.com/entando/entando-de-app/releases> to determine the correct tag to use. 
   
```sh
git checkout -b my-test v6.3.68-fix.1
```
:::warning
If you don't perform this step, you'll be creating an Entando Application based on the latest `entando-de-app` code, which may not yet be released.
:::


4.  Move the `resources` and `protected` directory from your Entando backup into `src/main/webapp`. You should override any existing content.

5.  Build the application
```sh
mvn clean package
```
6.  Create a repository named `entando-de-app-wildfly` in Docker for the new application. The Entando Operator will expect this name when performing the initial install.

7. Create a Docker image for the application. You'll need to provide your user name and version.
```sh
docker build . -f Dockerfile.wildfly -t <YOUR-USER>/entando-de-app-wildfly:<YOUR-VERSION>
```

8.  Push the image to Docker
```sh
docker push <YOUR-USER>/entando-de-app-wildfly:<YOUR-VERSION>
```

### Install the Application
You can use your typical install steps (or the standard [Manual Install steps](../../docs/getting-started/#manual-install)) with one adjustment. When you get to the `Install namespace scoped resources` step, you'll need to configure the `namespace-resources.yaml` to use your image. 

1. Retrieve a copy of the `namespace-resources.yaml` for your Entando version
```sh
 curl -sfL https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml > namespace-resources.yaml
```

2. Edit `namespace-resources.yaml` and update the `entando-de-app-wildfly` configuration with your user name and version
```yaml
entando-de-app-wildfly: >-
    {"version":"<YOUR-VERSION>","executable-type":"jvm","registry":"docker.io","organization":"<YOUR-USER>"}
``` 
3. Now apply the namespace resources to K8s
```sh
sudo kubectl apply -n entando -f namespace-resources.yaml
```

4. You can now continue with the rest of the install instructions

5. Once deployed, review the App Builder or running application to confirm the backup was restored correctly. You can check the `server-deployment` logs for possible errors.
