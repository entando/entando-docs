---
sidebarDepth: 2
---

# Change Default Datasources and Connections

This tutorial explains how to customize the Tomcat-based Docker images to modify the datasources, and then configure the EntandoApp custom resource to use these customizations.

## Prerequisites

- A running instance of Entando with the required external databases. [Install Entando on any Kubernetes provider](../#operations) or see [Getting Started](../../docs/getting-started/) for more information. 

- Your own custom project as described in [Building a Docker Image for the Entando Core](./build-core-image.md). 

## Customize the Docker Image
Create a Docker project for your base image using Entando's standard base image. Add the following files to the project folder, typically to a repository like GitHub.  

1. Using the following Entando template for the Docker image, create the Docker file. 
 
   * If you intend to provide your own Tomcat-based image, please use this [Doc kerfile](https://github.com/entando/app-engine/blob/release/7.2/Dockerfile.tomcat) as a template.  

   * Please note that creating your own base image with a different version of Tomcat may have unintended consequences.

2. Add any modules that may be required for your datasource or other connection resources. If the resource you need to connect to requires custom classes such as JDBC drivers, please add these as  
a module to the Tomcat image. 

3. In your **Dockerfile** for the new project, be sure to extend the correct base image and add the correct configuration file to the correct location. 

   For Tomcat, a basic Dockerfile would look like this:
 
   ```
    FROM registry.hub.docker.com/entando/entando-tomcat-base:7.2.0
    COPY --chown=185:0 webapp/target/*.war /usr/local/tomcat/webapps/
   ``` 
   
Note the user ownership of this Dockerfiles as Openshift expects the user/group ownership to be respected.

## Customize the Tomcat Configuration 

Now modify your Tomcat configuration to meet your requirements using environment variables. Depending on your environment, it is recommended that environment variable expressions follow this naming convention `${env.VAR_NAME}`. Add the new datasource and make any other changes as needed.

Here is an example of how to add a datasource to the datasources subsystem. Replace the variables with 'YOURDB' in the name with your values specified from the Docker container.

``` xml
    <subsystem xmlns="urn:jboss:domain:datasources:5.0">
      <datasources>
        <datasource jndi-name="${env.YOURDB_JNDI}" enabled="true" use-java-context="true" pool-name="YOURDB-DataSource" use-ccm="true">
          <connection-url>${env.YOURDB_URL}</connection-url>
          <driver>${env.YOURDB_DRIVER}</driver>
          <security>
            <user-name>${env.YOURDB_USERNAME}</user-name>
            <password>${env.YOURDB_PASSWORD}</password>
          </security>
        </datasource>
```
**Does this apply to Tomcat**   
Take care not to remove any lines from these files. This is of particular importance in the case of the 
Tomcat image as, on startup, scripts in the official Tomcat look for certain placeholders in this file and populate them
from other environment variables.  

## Build Your Docker Base Image
It is recommended that you consider using a dedicated CI/CD build tool such as Tekton to build the base image and maintain traceability between your source code and the resulting Docker image. One possible build command could look like this:
``` bash
docker build . -t YOUR-DOCKER-REGISTRY.com/YOUR-ORG/YOUR-BASE-IMAGE:1.0.0
```

## Modify your EntandoApp 

Modify your EntandoApp project as described in the [Building a Docker Image for the Entando Core tutorial](./build-core-image.md). It will require two changes to the pom.xml file of the sample project. 

1. First, change the variable `server.base.image` to reflect the fully qualified URI of your Docker image for Tomcat. For example, if you decided to extend the Tomcat image, go to the Maven profile with the id `tomcat` and change the `server.base.image` to this:
``` bash
<server.base.image>YOUR-DOCKER-REGISTRY.com/YOUR-ORG/YOUR-BASE-IMAGE:1.0.0</server.base.image>
```

2. Then, change the `<from>` element in the Fabric8 Maven Docker Plugin to reflect this variable.
Navigate to the first `<image>` element in the pom.xml file. You have found the correct one
if it contains the following xml:
```
<from>entando/${server.base.image}:${entando.version}</from>
```

3. Delete the `entando/` prefix and the `:${entando.version}` suffix:

`<from>${server.base.image}</from>`

### Build and push your custom Docker image

1. Before building your Docker image, it is a good idea to change the name of the image you want to build. Navigate
to the previously modified `<image>` element in the Fabric8 Maven Docker Plugin. You can change the `<name>` element
to reflect your preferred name:
e.g.,  
``` bash
<name>YOUR-DOCKER-REGISTRY.com/YOUR-ORG/YOUR-ENTANDO-APP:1.0.0</name>
```
**Does this work for the tomcat version?**
2. Run:
``` bash
mvn clean package -Ptomcat -Pderby
```

A new Docker image should now be available at your Docker registry.

3. Log into the Docker registry in question and then push the image:

``` bash
docker push YOUR-DOCKER-REGISTRY.com/YOUR-ORG/YOUR-ENTANDO-APP:1.0.0`
```
You are now ready to deploy this image.

**Should we change the following steps with list of recommended env variables instead?**
### Deploy your EntandoApp with the correct environment variables
 
The final step is to configure your EntandoApp deployment with the correct environment variables. As is the case with
all the Entando Custom Resources that result in actual deployments, the property `spec.environmentVariables` will be translated into environment variables on each of the containers in the deployment's pod. 

e.g., for an EntandoApp named `quickstart`: 
```
      kind: "EntandoApp"
      metadata:
        name: "quickstart"
      spec:
        dbms: postgresql
        replicas: 1
        customServerImage: YOUR-DOCKER-REGISTRY.com/YOUR-ORG/YOUR-ENTANDO-APP:1.0.0
        ingressPath: /YOUR-ENTANDO-APP
        environmentVariables:
          - name: YOURDB_JNDI
            value: java/your-ds
          - name: YOURDB_URL
            value: "jdbc:postgresql://somehost.com:5432/mydb"
          - name: YOURDB_DRIVER
            value: postgresql
          - name: YOURDB_USERNAME
            value: my_user
          - name: YOURDB_PASSWORD
            value: mypassword
      entandoStatus:
        entandoDeploymentPhase: requested

```

To apply the changes to your deployment, change the `entandoStatus.entandoDeploymentPhase` property to requested and
apply the file:   
```
kubectl apply -f YOUR-entando-de-app.yaml
```