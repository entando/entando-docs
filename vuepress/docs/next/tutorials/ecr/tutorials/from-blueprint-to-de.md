# Creating an Entando Component Repository (ECR) bundle from Blueprint

## Purpose

In this tutorial you will learn how to generate an ECR bundle from a microservice generated using 
JHipster’s Entando Blueprint.

## Requirements

-   A microservice built with the Entando Blueprint

-   NodeJS, `npm`, and `git` are installed on your machine

-   Docker installed on your machine and you are able to upload images
    to docker-hub

## Steps

> **Note**
>
> In this tutorial we will assume you have generated at least an entity for your microservice.

### 1. Generate an entity

In order to include auto-generated micro frontends to your bundle you will need to use the 
`JHipster entity` generator. Let’s assume we want to generate a simple *Conference* entity.

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
> By default the organization used to generate the docker image is `entando`, but you can provide a custom value during project initialization, as well as by changing the `pom.xml` file or by providing the `-Djib.to.image=<org>/<name>:<version>` to the `jib:dockerBuild` command.

> **Note**
>
> Output image name is generated using the organization value defined during project initialization. You can override the provided values by altering the `pom.xml` file or by customizing the `-Djib.to.image` parameter used in the `./mvnw` command

> **Warning**
>
> If you manually override the target image of the docker build, remember to update the plugin metadata in the bundle accordingly.

### 4. Publish the Docker image to Docker registry (DockerHub or equivalent)

Let’s now publish the docker image for the microservice to make it available later during bundle installation in the cluster.

    docker push <name-of-the-image:tag>

### 5. Publish the bundle to a git repository and generate the EntandoDeBundle Kubernetes custom resource

You should follow the latest instructions on how to [create a bundle from git repository](./create-ecr-bundle-from-git). Relevant part is from Initialize git and add remote repository step.

To start you should either:

- Add the `/bundle/` folder to the `.gitignore` file of your microservice project and initialize a new and different git repository for the bundle itself:

        echo bundle >> .gitignore 
        
        cd bundle/
        git init
        
- or copy bundle to a temporary folder and work on that:

        cp -r bundle/ /tmp/bundle
        cd /tmp/bundle
        git init

### 7. Deploy the EntandoDeBundle custom resource on the cluster

Finally, let’s deploy the previously generated custom resource on the Kubernetes/OpenShift cluster

    kubectl create -f jhipster-bundle.yaml

## Conclusion

You should now have the bundle available in your cluster and accessible from App Builder.

## Resources

-   [Creating an Entando Component Repository (ECR) bundle using git repository](./create-ecr-bundle-from-git)

-   [Entando Bundle CLI
    project](https://github.com/entando-k8s/entando-bundle-cli)

-   [Entando blueprint](https://github.com/entando/entando-blueprint)


