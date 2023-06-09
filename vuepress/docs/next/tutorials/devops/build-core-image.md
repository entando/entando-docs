
# Building a Docker Image for the Entando Core

## Prerequisites

-   Java 11

-   Docker installed locally
    (<https://docs.docker.com/docker-for-windows/install/>)

-   maven

-   Access to a Docker repository (docker.io or other)

## Introduction

This tutorial will take you through the basic steps to create a docker
image from an Entando core application. A more detailed guide with
additional commands and configuration can be found here:

<https://github.com/entando/app-engine>

## Setup

1.  Clone the application at:
    <https://github.com/entando/app-engine> using

        git clone https://github.com/entando/app-engine

2.  On a command line, cd into the app-engine repository you just cloned:

        cd entando-de-app

3.  Build a docker image from the core app replacing the value of the tag in the `-t`  with the tag you want to use for your image.

        mvn clean package
        docker build . -f Dockerfile.tomcat -t <YOUR-USER>/<YOUR-REPO-NAME>:<YOUR-VERSION>


4.  Create a repository on your Docker repository to store your new
    application

5.  Push the Image to your Repository

        docker push <YOUR-USER>/<YOUR-REPO-NAME>:<YOUR-VERSION>
