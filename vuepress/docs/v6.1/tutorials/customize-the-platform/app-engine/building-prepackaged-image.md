# Building a Docker Image and Deploying a Pre-Packaged App

## Prerequisites

-   Java 8

-   Docker installed locally
    (<https://docs.docker.com/docker-for-windows/install/>)

-   maven

-   Access to a docker repository (docker.io or other)

## Introduction

This tutorial will show you how you can use an Entando application that
you have built as a launching point for creating new applications.

In this lab you’ll take a demo application previously built, install the
backups in a blank application, build an image from the updated app, and
deploy it as a new application.

## Setup

1.  Clone the application at:
    <https://github.com/entando/entando-de-app> using

        git clone https://github.com/entando/entando-de-app

2.  On a command line, cd into the entando-de-app you just cloned:

        cd entando-de-app

3.  Take the provide zip file and unzip it in a location of your choice.

    -   This zip contains all of the assets, content, and metadata
        needed to launch an Entando application. We are going to package
        them the assets and DB an image and

    -   Entando will automatically instantiate and populate the app from
        the most recent backup

4.  Move the resources and protected folders from the zip file into your
    `entando-de-app` in `src/main/webapp` replacing any content that is
    already there

5.  Build a docker image from the app

        mvn clean package -Pwildfly -Pderby docker:build

    -   Note that the "derby" option here is only for the initialization
        phase of the DB when deploying. It isn’t the final database
        choice

6.  View the images installed on your local docker instance

        docker images

    Look for

        entando/entando-de-app:latest

7.  Create a repository on your docker repository to house your new
    application

8.  Re-tag the image you just built with your repo

         docker tag entando/entando-de-app:latest <YOUR-USER>/<YOUR-REPO_NAME>:latest

9.  Push the Image to your Repository

        docker push <YOUR-USER>/<YOUR-REPO_NAME>:latest

10. Now we need to generate a new application for deployment to
    Kubernetes using the helm chart

    -   If you have an output from helm from before you can re-use it
        and just apply the changes to the config map.

    -   Or you can re-run helm and change the output

11. Re-run the helm command for your environment (check with your
    instructor if you don’t know what this is)

12. Open the output yaml file from the helm command in the text editor
    of your choice

    -   For example: `vi training-alpha.yaml`

13. In that file look for the `ConfigMap`

    -   The config map defines all of the images that are available as
        part of the deployment. They aren’t all used concurrently.

    -   You can also view this config map in kubernetes/OpenShift

14. Now you need to update the deployment to use your customized Wildfly
    image. Find `entando-de-app-wildfly` in the config map

    -   Note that we are changing the de-app but you could create a
        custom version of any of the included images

15. Change the version to match the version you used for your image

16. Change the "organization" to the name of your main image repository
    organization and if you aren’t using docker.io (DockerHub) then
    change the registry as well.

17. Save the file

18. Follow the deployment steps you went through when you originally
    deployed your Entando application to your Kubernetes instance

19. Once deployed go to the app builder in your app

20. Click Go To Homepage
