# Backing Up and Restoring an Entando Application

## Prerequisites

-   Java 8

-   Docker installed locally
    (<https://docs.docker.com/docker-for-windows/install/>)

-   maven

-   Access to a docker repository (docker.io or other)

This tutorial will show you how you can use an Entando application that
you have built as a launching point for creating new applications.

## Create a Backup
This step requires using a running Entando environment to take an application backup.
The output of this step is a local directory with the files (database and static assets) you can use to restore the application later. 

1. Log into _App Builder_

2. Go to _Configuration -> Database_

3. Click on _Create A Backup_ and wait for the process to complete. All of the static assets and database backups are persisted to a PVC in /entando-data on the server pod.

4. Transfer the files from the server-container. The details will vary depending on your kubernetes environment.

| kubectl | OpenShift |
| ------- | --------- |
| `kubectl cp <pod>:<path> <local-path>` | `oc rsync <pod>:<path> <localPath>` |
| e.g.`kubectl cp quickstart-server-deployment-7b8c699599-f84zq:/entando-data backup` | e.g.`oc rsync app-entando-server-deployment-67fd5b9954-s72mb:/entando-data`|


5. You should see 3 directories - _databases_, _protected_, and _resources_. 
The _protected_ directory contains the timestamped backup you triggered from the _App Builder_.

## Restore a Backup
In this lab you’ll take a previously built demo application, install the
backup files, build a Docker image from the updated app, and deploy it as a new application.

1.  Clone the application at:
    <https://github.com/entando/entando-de-app> using

        git clone https://github.com/entando/entando-de-app

2.  On a command line, cd into the _entando-de-app_ you just cloned:

        cd entando-de-app

3.  Take the backup file and unzip it in a location of your choice.

    -   This zip contains all of the assets, content, and metadata
        needed to launch an Entando application. We are going to package
        the static assets and database backup into a Docker image.

    -   Entando will automatically instantiate and populate the app from
        the most recent backup

4.  Move the resources and protected folders from your Entando backup (see #TODO) into your
    `entando-de-app` application under `src/main/webapp` replacing any content that is
    already there.

5.  Build a docker image from the app

        mvn clean package -Pwildfly -Pderby docker:build

    -   Note that the "derby" option here is only for the initialization
        phase of the DB when deploying. It isn’t the final database
        choice

6.  View the images installed on your local docker instance

        docker images

    Look for the following:

        entando/entando-de-app:latest

7.  Create a repository on your docker account to house your new
    application

8.  Re-tag the image you just built with your repo

         docker tag entando/entando-de-app:latest [your-user]/[your-repo-name]:latest

9.  Push the Image to your Repository

        docker push [your-user]/[your-repo-name]:latest

10. Now we need to generate a new application for deployment to
    Kubernetes using the helm chart

    -   If you have an output from helm from before you can re-use it
        and just apply the changes to the config map. In this case skip to step 12.

    -   Or you can re-run helm and change the output

11. Re-run the helm command for your environment

12. Open the output yaml file from the helm command in the text editor
    of your choice

    -   For example: `vi training-alpha.yaml`

13. In that file look for the `ConfigMap`

    -   The config map defines all of the images that are available as
        part of the deployment. They aren’t all used concurrently.

    -   You can also view this config map in `kubernetes/OpenShift`

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

19. Once deployed go to the _App Builder_ in your app

20. Click _Go To Homepage_ and you should see your restored application.


