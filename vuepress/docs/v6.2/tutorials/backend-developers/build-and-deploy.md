---
sidebarDepth: 2
---
# Build and Deploy an Entando Bundle
This page will walk you through building a docker image from your microservice, creating your Entando bundle, checking your bundle into git, and deploying it to the Entando Component Repository.

If you haven't run the generator yet head to the tutorial on running the [Entando Component Generator](./generate-microservices-and-micro-frontends.md) first and you'll be at the starting point for this one.

You'll need:
  - Docker
  - A running Entando instance (see [Getting Started](../../docs/getting-started) for steps if needed)
  - A bash shell
  - git
  - An empty git repository

## Build Docker Image for Microservices
1. In your microservice project on a command line run `./mvnw -Pprod clean package jib:dockerBuild`

> **Note**
>
> By default the organization used to generate the docker image is `entando`, but you can provide a custom value during project initialization, as well as by changing the `pom.xml` file or by providing the `-Djib.to.image=<org>/<name>:<version>` to the `jib:dockerBuild` command.

> **Note**
>
> Output image name is generated using the organization value defined during project initialization. You can override the provided values by altering the `pom.xml` file or by customizing the `-Djib.to.image` parameter used in the `./mvnw` command

> **Warning**
>
> If you manually override the target image of the docker build, remember to update the plugin metadata in the bundle accordingly in the bundle steps.

2. View your image and tag with `docker images`
```
docker images
REPOSITORY               TAG                 IMAGE ID            CREATED             SIZE
myusername/example-app   0.0.1-SNAPSHOT      4ec7f05b2b27        33 seconds ago      213MB
```

3. Publish the Docker image to Docker repository (DockerHub or equivalent) `docker push <name-of-the-image:tag>`, e.g. `docker push myusername/example-app:0.0.1-SNAPSHOT`. You may need to first login via `docker login`.
  > **Note**
  >
  > The first time your run this command it will have to push all of the layers. Subsequent runs will be much faster

  ```
 docker push myusername/example-app:0.0.1-SNAPSHOT
The push refers to repository [docker.io/myusername/example-app]
545361404af4: Pushed
...
f1b5933fe4b5: Pushed
0.0.1-SNAPSHOT: digest: sha256:804b3b91b83094c45020b4748b344f7199e3a0b027f4f6f54109cbb3b8a1f867 size: 2626
```

## Build your Bundle and publish to git
1. In your microservice project populate the bundle with the generated micro frontends, run the `./buildBundle.sh` script or use `npm run populate-bundle`

> **Important**
> The bundle population with the micro frontends requires some time to be processed. You should be able to follow the progress of the operation on screen.

2. The output of your bundle will be in the top level `bundle` folder in your microservice

3. Create a new git repository and name it `my-bundle` (or a name of your choice). You'll need the URL for this repo in the next step

7. Add the /bundle/ folder to the .gitignore file of your microservice project and initialize a new and different git repository for the bundle itself. From the top of your microservices project run these commands.
```
echo bundle >> .gitignore
cd bundle/
git init
git add .
git commit -m "Init Git repository"
git remote add origin https://your/remote/repository.git
git push -u origin master

```

> **Important**
> The file descriptor.yaml should be at the top of your repository

6. `cd` into your bundle folder (you should already be there from the step above)

6. Add the files to git `git add .`

7. Commit the files to git `git commit -a -m "Your commit message here"`

8. Push the files to git `git push`

9. Tag your bundle `git tag -a "v0.0.1" -m "My first tag"`

10. Push the tags `git push --tags`

11. Install the `entando-bundle-cli` using `npm install -g  @entando/entando-bundle-cli@6.2.0`

12. Generate your bundle

```
    entando-bundle from-git --name=<bundle-name> --namespace=<your namespace> --thumbnail-url=<thumbnail-url> --repository=<your-repository-url> --dry-run > example-bundle.yaml
```
```
    - In the command above you must set:
       - <bundle-name> - A name of your choice
       - <your-namespace> - The namespace where you are going to install your bundle
       - <thumbnail-url> - Optionally add a URL to a publicly availble image to use for your bundle in the ECR
       - <your-repository-url> - The git url of your bundle repository
```

13. Install your bundle in Kubernetes `kubectl create -f example-bundle.yaml`

14. Log into the `App Builder`

15. Select `Component Repository` in the upper right

16. See your bundle and select install

At this point the Entando platform will download and install your docker image and install the micro frontends into the Entando app. You can add those micro frontends to the page
