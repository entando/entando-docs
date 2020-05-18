# Tutuorial: how to configure custom datasources and connections for Entando Apps on EAP and Wildfly

## Purpose

This tutorial explains how to customize our EAP and Wildfly base Docker images, and then configure the EntandoApp
custom resource to use these customizations

## Requirements

-   The Entando Operator is running in the target names

-   Keycloak and the Entando Cluster Infrastructure have been deployed

-   The required external databases and other services are up and running.

-   Your own custom project as described in [the tutorial](../../app-engine/building-prepackaged-image.md) 

## Steps

### 1. Create a Docker project for your own base image to Entando's standard base image(s)
Create a project, ideally in Git repository, and put the following files in the folder
#### 1.1. The standalone.xml/standalone-openshift.xml file of choice 
It is essential for your custom Docker image to use a file from one of the official Entando Docker base images.

If you intend to use provide your own EAP based image, please use this 
[standalone-openshift.xml](https://github.com/entando/entando-docker-base-images/blob/master/entando-eap71-clustered-base/standalone-openshift.xml)
file. 

If you intend to use provide your own Wildfly based image, please use this 
[standalone.xml](https://github.com/entando/entando-docker-base-images/blob/master/entando-wildfly12-base/contrib/wildfly-configuration/standalone.xml)
file.

Please note that if you create your own base image with a different version of EAP or Wildfly, using these files 
may have unintended consequences.

#### 1.2. Any modules that may be required for your datasource or other connection resource
If the resource you need to connect to requires some custom classes, such as JDBC drivers, please add these as  
a module to Wildfly/EAP. As an example, you can look at our 
[Derby database module](https://github.com/entando/entando-docker-base-images/tree/master/entando-base-common/wfmodules/org/apache/derby/jdbc/main)
that Entando uses for embedded databases. Please ensure that the path of the folder containing the jar files reflects
the fully qualified name of the module in the module.xml file. 

#### 1.3 Dockerfile
In your Dockerfile, please be sure to extend the correct base image, and add the correct configuration file to
the correct location in the target image. 

For EAP, a most basic Dockerfile would look like this:

```
FROM entando/entando-eap71-clustered-base:6.1.2
COPY --chown=185:0 ./standalone-openshift.xml /opt/eap/standalone/configuration
```  
 
For Wildfly, a most basic Dockerfile would look like this:

```
FROM entando/entando-eap71-clustered-base:6.1.2
COPY --chown=1001:0 ./standalone.xml /wildfly/standalone/configuration
```  
Please take note of the user ownership in these different Dockerfiles. This is quite important as Openshift will
expect the user/group ownership to be respected.

### 2. Customize the standalone.xml/standalone-openshift.xml file using environment variables.

You can now modify your Wildfly/EAP configuration to meet your requirements. Where the configuration could differ
from one environment to a next, we strongly advise using environment variable expressions (`${env.VAR_NAME}`). The most likely change
that would be required in this file is the addition of a datasource. Here is an example of how to add a datasource
to the datasources subsystem. All the environment variables starting with 'YOURDB' can be specified from the Docker 
container.

```
   ...
    <subsystem xmlns="urn:jboss:domain:datasources:5.0">
      <datasources>
        <datasource jndi-name="${env.YOURDB_JNDI}" enabled="true" use-java-context="true" pool-name="yourDbDataSource" use-ccm="true">
          <connection-url>${env.YOURDB_URL}</connection-url>
          <driver>${env.YOURDB_DRIVER}</driver>
          <security>
            <user-name>${env.YOURDB_USERNAME}</user-name>
            <password>${env.YOURDB_PASSWORD}</password>
          </security>
        </datasource>
```
Please take extra care not to remove any lines from these files. This is of particular importance in the case of the 
EAP image as, on startup, scripts in the official EAP look for certain placeholders in this file and populates them
from other environment variables.  

### 3. Build your own Docker base image
You can now build your Docker base image. It is highly recommended that you consider using a dedicated CI/CD build 
tool such as Jenkins X to build the base image and maintain traceability between your source code and the resulting 
Docker image. One possible build command could look like this:

`docker build . -t your-docker-registry.com/your-org/your-base-image:1.0.0`

### 4. Modify your Entando App project to use the new Docker base image

You can now modify your Entando App project that you have forked as described in the 
[relevant tutorial](../../app-engine/build-core-image.md). You would require two changes to the pom.xml file
of the sample project. 

* Firstly, you would need to change the variable `server.base.image` to reflect the fully
qualified URI of your Docker image for EAP and/or Wildfly. For example, if you decided to extend the Wildfly image,
go to the Maven profile with the id `wildfly` and change the  `server.base.image` to look like this:

`<server.base.image>your-docker-registry.com/your-org/your-base-image:1.0.0</server.base.image>`

* Then you need to change the `<from>` element in the Fabric8 Maven Docker Plugin to reflect this variable.
Navigate to the first `<image>` element in the pom.xml file. You have found the correct one
if it contains the following xml:

`<from>entando/${server.base.image}:${entando.version}</from>`

Delete the `entando/` prefix and the `:${entando.version}` suffix:

`<from>${server.base.image}</from>`

Please note that, should you still require support for both Wildfly and EAP in your Maven pom, you may need to 
repeat this exercise for both the `eap` and `wildfly` profiles. 

### 5. Build and push your custom Docker image

Before building your Docker image, it would be a good idea to change the name of the image you want to build. Navigate
to the previously modified `<image>` element in the Fabric8 Maven Docker Plugin.You can change the `<name>` element
to reflect your preferred name, e.g.

`<name>your-docker-registry.com/your-org/your-entando-app:1.0.0</name>`

Run:

`mvn clean package -Pwildfly -Pderby`

A new Docker image should now be available named `your-docker-registry.com/your-org/your-entando-app:1.0.0`

Log into the Docker registry in question and then push the image:

`docker push your-docker-registry.com/your-org/your-entando-app:1.0.0`

You are now ready to deploy this image.

### 6. Deploy your EntandoApp with the correct environment variables
 
The final step is to configure your EntandoApp deployment with the correct environment variables. As is the case with
all the Entando Custom Resources that result in actual deployments, the property `spec.parameters` will be translated
into environment variables on each of the Containers in the Deployment's Pod. For an EntandoApp named 'my-app',
the new state of the EntandoApp would could be placed in a file named `my-app.yaml` that would look something like this: 
```
      kind: "EntandoApp"
      metadata:
        name: "my-app"
      spec:
        dbms: postgresql
        replicas: 1
        customServerImage: your-docker-registry.com/your-org/your-entando-app:1.0.0
        ingressPath: /your-entando-app
        parameters:
          YOURDB_JNDI: java/your-ds
          YOURDB_URL: jdbc:postgresql://somehost.com:5432/mydb
          YOURDB_DRIVER: postgresql
          YOURDB_USERNAME: my_user
          YOURDB_PASSWORD: mypassword
      entandoStatus:
        entandoDeploymentPhase: requested

```
Notice how this Custom Resource specifies a `parameter` for each environment variable that was referenced from the
`standalone.xml` file referenced earlier. 

To apply the changes to your deployment, change the `entandoStatus.entandoDeploymentPhase` property to requested and
apply the file:   
```
kubectl apply -f my-app.yaml
```