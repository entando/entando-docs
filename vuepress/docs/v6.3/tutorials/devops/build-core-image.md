# Building a Docker Image for the Entando Core

## Prerequisites

-   Java 11

-   Docker installed locally
    (<https://docs.docker.com/docker-for-windows/install/>)

-   maven

-   Access to a docker repository (docker.io or other)

## Introduction

This tutorial will take you through the basic steps to create a docker
image from an Entando core application. A more detailed guide with
additional commands and configuration can be found here:

<https://github.com/entando-k8s/entando-de-app>

## Setup

1.  Clone the application at:
    <https://github.com/entando-k8s/entando-de-app> using

        git clone https://github.com/entando-k8s/entando-de-app

2.  On a command line, cd into the entando-de-app you just cloned:

        cd entando-de-app

3.  Build a docker image from the core app replacing the value of the tag in the `-t`  with the tag you want to use for your image.

        mvn clean package
        docker build . -f Dockerfile.wildfly -t <YOUR-USER>/<YOUR-REPO-NAME>:<YOUR-VERSION>

4.  View the images installed on your local docker instance

        docker images

    Look for

        entando/entando-de-app:latest

5.  Create a repository on your docker repository to house your new
    application

6.  Re-tag the image you just built with your repo

         docker tag entando/entando-de-app:latest <YOUR-USER>/<YOUR-REPO-NAME>:latest

7.  Push the Image to your Repository

        docker push <YOUR-USER>/<YOUR-REPO-NAME>:latest
