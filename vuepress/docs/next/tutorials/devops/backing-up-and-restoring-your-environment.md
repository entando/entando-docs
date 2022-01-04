---
redirectFrom: /next/tutorials/customize-the-platform/app-engine/building-prepackaged-image.html
---

# Backing Up and Restoring an Entando Application

## Overview

This tutorial demonstrates how to use an existing Entando application as a launching point for creating new applications. An alternative is to [use the Entando Bundler](../ecr/export-bundle-from-application.md) to extract specific content and functionality from an existing application. Entando Bundles are more flexible and portable so their use is recommended when a full copy of an application is not required.

## Prerequisites
* Java 11
* Docker
* Maven
* Access to a Docker repository (docker.io or other)

## Create a Backup
This step requires using a running Entando environment to take an application backup.
The output of this step is a local directory with the files (database and static assets) needed to restore the application later.

1. Log into the _App Builder_

2. Go to _Administration → Database_

3. Click on _Create A Backup_ and wait for the process to complete. The static assets and database backup will be saved to a persistent volume on the server pod under _/entando-data_.

4. Transfer the files from the _server-deployment_. The exact command will depend on your Kubernetes environment.

| kubectl | OpenShift |
| ------- | --------- |
| `kubectl cp <pod>:<path> <local-path>` | `oc rsync <pod>:<path> <localPath>` |
| e.g. `kubectl cp quickstart-server-deployment-7b8c699599-f84zq:/entando-data backup` | e.g.`oc rsync app-entando-server-deployment-67fd5b9954-s72mb:/entando-data`|

5. You should see 3 directories - _databases_, _protected_, and _resources_.
The _protected_ directory contains the timestamped backup you triggered from the _App Builder_. The _resources_ directory contains the static assets. 

## Restore a Backup
Restoring a backup requires creating and then deploying a custom version of an Entando application with the
backup files included. 

1.  Clone the application at:
    <https://github.com/entando/entando-de-app> using:
```
git clone https://github.com/entando/entando-de-app
```

2.  On a command line, cd into the _entando-de-app_ directory:
```
cd entando-de-app
```

3. (Optional) Checkout a branch for your desired Entando version. You can review <https://github.com/entando/entando-de-app/releases> to determine the correct tag to use. Note: if you don't perform this step, you'll be creating an Entando application based on the latest _entando-de-app_ code which may not yet be released. 
```
git checkout -b my-test v6.3.68-fix-1
```

4.  Move the _resources_ and _protected_ folders from your Entando backup into your
    `entando-de-app` application under `src/main/webapp`. You should override any content that is
    already there.

5.  Build the application
```
mvn clean package
```
6.  Create a repository named _entando-de-app-wildfly_ in Docker for the new application. The Entando Operator will expect this name when performing the initial install.

7. Create a Docker image for the application. You'll need to provide your account and version.
```
docker build . -f Dockerfile.wildfly -t <YOUR-USER>/entando-de-app-wildfly:<YOUR-VERSION>
```

8.  Push the image to Docker
```
docker push <YOUR-USER>/entando-de-app-wildfly:<YOUR-VERSION>
```

9. Now we need to create the new Entando application. Use the standard [Manual Install steps](../../docs/getting-started.md#manual-install) put please note the following adjustment required to use your specific _entando-de-app_ image. When you get to the _Install namespace scoped resources step_, you'll need to modify the yaml instead of installing it directly. First get a local copy:
```
 curl -sfL https://raw.githubusercontent.com/entando/entando-releases/v6.3.2/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml > namespace-resources.yaml
```

10. Edit _namespace-resources.yaml_ and replace the _entando-de-app-wildfly_ line
```yaml
entando-de-app-wildfly: >-
    {"version":"6.3.68","executable-type":"jvm","registry":"docker.io","organization":"entando"}
```
with your information
```yaml
entando-de-app-wildfly: >-
    {"version":"<YOUR-VERSION>","executable-type":"jvm","registry":"docker.io","organization":"<YOUR-USER>"}
``` 
11. Now apply the namespace resources.
```yaml
sudo kubectl apply -n entando -f namespace-resources.yaml
```

12. You can now continue with the rest of the usual install instructions

13. Once deployed, go to the _App Builder_ or _Application_ to confirm the backup was restored correctly. You can check the _server-deployment_ logs for possible errors.
