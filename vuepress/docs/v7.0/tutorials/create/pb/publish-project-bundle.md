---
sidebarDepth: 2
---
# Build and Publish a Project Bundle
## Overview
This tutorial demonstrates how to deploy an existing Entando project directory into the [Entando Component Repository](../../../docs/getting-started/concepts-overview.md#entando-component-repository) (ECR). This involves building a Docker image from your microservice, creating an Entando Bundle, checking your Bundle artifacts into Git, and deploying the Bundle into Kubernetes.

The Entando CLI (ent) automates many of the tasks involved in deploying an Entando Bundle, but you can also choose to perform these tasks manually.

## Prerequisites
* Use the [Entando CLI](../../../docs/reference/entando-cli.md#check-the-environment) to verify you have the prerequisites in place (e.g. Java, npm, git)
``` sh
ent check-env develop
```
* Your Git credentials
* A Git repository
* An Entando instance
* An Entando project directory, either [developed by hand](./publish-simple-bundle.md) or [generated by the Entando Component Generator](../ms/generate-microservices-and-micro-frontends.md)

## CLI Steps
The following steps make use of the Entando `ent prj` command and its publication system (pbs) convenience methods. See the [Manual Steps](#manual-steps) section below for a more detailed description of the underlying tasks.

1. Build the project using the `ent prj` command. This saves you from having to build each part of the project individually. If you are using a project directory with just a bundle child directory (e.g. a bundle with hand-built components or exported from another environment), then there is nothing to build and you should skip this step.
``` sh
ent prj build
```
::: tip
The first run can take longer due to node downloads for any MFE widgets. You can use `ent prj fe-build` or `ent prj be-build` for subsequent runs to independently build just the frontend or backend components.

:::

2. Initialize the bundle directory
``` sh
ent prj pbs-init
```

3. Publish the build artifacts to GitHub and Docker Hub  
``` sh
ent prj pbs-publish
```

4. Deploy the bundle into the ECR
``` sh
ent prj deploy
```
Jump to [Install the Bundle into an Application](#install-the-bundle-into-an-application) below to finish installing your bundle.

## Manual Steps

### Build a Docker Image for Microservices
1. Build the project from the project directory
 ```sh
 ./mvnw -Pprod clean package jib:dockerBuild
````

> **Note**
>
> By default, the organization used to generate the Docker image is `entando`. You can customize this value during project initialization by either changing the `pom.xml` file or providing the `-Djib.to.image=<org>/<name>:<version>` to the `jib:dockerBuild` command.

> **Note**
>
> The output image name is generated using the organization value defined during project initialization. You can override the provided values by altering the `pom.xml` file or by customizing the `-Djib.to.image` parameter used by the `./mvnw` command.

> **Warning**
>
> If you manually override the target image of the Docker build, remember to update the plugin metadata accordingly.

2. View your image and tag
``` sh
docker images
```
Output:
```
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
myusername/example-app   0.0.1-SNAPSHOT      4ec7f05b2b27        33 seconds ago      213MB
```

3. Publish the Docker image to Docker repository (Docker Hub or equivalent). You may need to first login via `docker login`.
```sh
docker push <name-of-the-image:tag>
```
For example: `docker push myusername/example-app:0.0.1-SNAPSHOT`

  > **Note**
  >
  > All of the layers are pushed the first time you run this command, which takes time. Subsequent runs are much faster.

Output:
```
docker push myusername/example-app:0.0.1-SNAPSHOT
The push refers to repository [docker.io/myusername/example-app]
545361404af4: Pushed
...
f1b5933fe4b5: Pushed
0.0.1-SNAPSHOT: digest: sha256:804b3b91b83094c45020b4748b344f7199e3a0b027f4f6f54109cbb3b8a1f867 size: 2626
```

### Build Your Bundle and Publish to Git
1. Populate the bundle with the generated micro frontends using `./buildBundle.sh` or `npm run populate-bundle`
```sh
./buildBundle.sh
```

> **Important**
> It takes time to populate the bundle with micro frontends. You can watch the progress of this process on the console.

2. The output of your bundle is in the top-level `bundle` directory of your microservice

3. Commit your bundle files to Git, separate from the top-level project files
``` sh
echo bundle >> .gitignore
cd bundle/
git init
git add .
git commit -m "Init Git repository"
```

4. Create a new Git repository, e.g. `my-bundle`

5. Add your remote repository as origin and push the bundle
``` sh
git remote add origin https://your/remote/repository.git
git push -u origin master
```

6. Publish a Git tag
```
git tag -a "v0.0.1" -m "My first tag"
git push --tags
```

7. Generate a custom resource for your bundle. Update the following command with your bundle name, namespace and repository URL.

``` sh
ent bundler from-git --name=<bundle-name> --namespace=entando --repository=<your-repository-url> --dry-run > example-bundle.yaml
```

8. Make your bundle available in Kubernetes
```
kubectl apply -f example-bundle.yaml -n entando
```

## Install the Bundle into an Application
You can either install the bundle through the ent CLI or the `App Builder`.
## Use the Entando CLI
1. In your project folder, run the following command
``` sh
ent prj install
```
2. If you have already installed the bundle, you can use `--conflict-strategy` to adopt a strategy for existing components (CREATE, SKIP, OVERRIDE)
``` sh
ent prj install --conflict-strategy=OVERRIDE
```

  > **Note**
  >
  > In the event of a timeout or pod failure, refer to the errors captured by the quickstart-cm-deployment and plugin deployer logs. 

## Use the App Builder
1. Log into your App Builder and select `Repository` in the lower left

2. Find your bundle and select `Install`

The Entando Platform downloads and installs the Docker image for your microservice and installs your micro frontends into the Entando Application. You can add these micro frontend widgets to the page(s) of your choice. You can either leverage a page provided by Entando or follow our [Page Management tutorial](../../compose/page-management.md) to create your own page or page template. Note that your page template must include the UX fragment `keycloak_auth` because an application based on the Entando Blueprint expects a user to be authenticated.
