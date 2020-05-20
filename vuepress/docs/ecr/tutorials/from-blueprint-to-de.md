# Creating an Entando Component Repository (ECR) bundle from Blueprint

## Purpose

In this tutorial you will learn how to generate an ECR bundle from a microservice generated using the JHipster’s Entando Blueprint.

## Requirements

-   A microservice built with the Entando Blueprint

-   Node and NPM are installed on your machine

-   An NPM registry where to upload the bundle (must be logged in)

-   Docker installed on your machine and you are able to upload images
    to docker-hub

## Steps

> **Note**
>
> In this tutorial we will assume you have generated at least an entity for your microservice.

### 1. Generate an entity

In order to include auto-generated micro frontends to your bundle you will need to use the `jhispter entity` generator. Let’s assume we want to generate a simple *Conference* entity.

    jhipster entity Conference

Let’s use these options:

-   One field of type `String` called `name` with no validation

-   No relationships with other entities

-   REST controller should use the repository directly

-   No pagination for the entity

### 2. Populate the bundle with the micro frontends

To populate the bundle with the generated micro frontends, run the `./buildBundle.sh` script or use the npm.

    npm run populate-bundle

> **Important**
> The bundle population with the micro frontends requires some time to be processed. You should be able to follow the progress of the operation on screen.

### 3. Generate a docker image for your microservice

JHipster uses the JIB Maven plugin to generate a docker image for your microservice.

By default the output image will use the name of your application and the `0.0.1-SNAPSHOT` tag, eg. `entando/jhipster@0.0.1-SNAPSHOT`.

    ./mvnw -Pprod clean package jib:dockerBuild [-Djib.to.image=<your-image-name]

> **Note**
>
> By default, the organization used for the image is `entando` but you can simply change it in the `pom.xml` file or by providing the `-Djib.to.image=<org>/<name>:<version>` to the jib:dockerBuild command.

> **Note**
>
> Output image name is controlled in the `pom.xml` file but could also be customized in the `./mvnw` command using the `-Djib.to.image` parameter.

> **Warning**
>
> If you change the target image of the docker build, remember to update the plugin metadata in the bundle accordingly.

### 4. Publish the Docker image to Docker registry (DockerHub or equivalent)

Let’s now publish the docker image for the microservice to make it available later during bundle installation in the cluster.

    docker push <name-of-the-image:tag>

### 5. Publish the bundle to an Npm registry

Now let’s publish the bundle to your private NPM registry.

    cd bundle/

    npm publish . --registry=<your-private-registry-url>

### 6. Generate the EntandoDeBundle Kubernetes custom resource

You should now be able to generate an EntandoDeBundle custom resource using the `entando-bundle` command-line tool.

> **Warning**
>
> Make sure both the NPM registry where you published the bundle and the Docker registry where you published the docker image are accessible in read mode without restrictions.

    entando-bundle from-npm <your-bundle-name> --dry-run --registry=<your-private-registry> [--name=<custom-name>] [--namespace=<namespace-to-deploy>] > jhipster-bundle.yaml

### 7. Deploy the EntandoDeBundle custom resource on the cluster

Finally, let’s deploy the previously generated custom resource on the Kubernetes/OpenShift cluster

    kubectl create -f jhipster-bundle.yaml

## Conclusion

You should now have the bundle available in your cluster and accessible from App Builder.

## Resources

-   [Setup a local npm registry for testing
    purposes](../how-to-create-local-npm-registry)

-   [Entando Bundle CLI
    project](https://github.com/entando-k8s/entando-bundle-cli)

-   [Entando blueprint](https://github.com/entando/entando-blueprint)


