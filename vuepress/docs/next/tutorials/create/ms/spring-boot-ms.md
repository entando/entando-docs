---
sidebarDepth: 2
---

# Create a Spring Boot Microservice

This tutorial uses the Spring Initializr to create a simple microservice to quickly generate an Entando bundle project. 

## Prerequisites
- [A working instance of Entando](../../../docs/getting-started/)
- Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Step 1: Initialize the Bundle with a Microservice

1. Initialize a new bundle: 
```
ent bundle init your-spring-project
```
2. From the bundle project root directory, create a new microservice:
```
cd your-spring-project
ent bundle ms add spring-ms
```

## Step 2: Create the Microservice
1. At the Spring Initialyzr page, [start.spring.io](http://start.spring.io/), create a project with the following configuration:
```
	Project=Maven
	Language=Java
	Spring Boot version=2.7.6
	Group=com.entando.example
	Artifact=spring-ms 
	Name=spring-ms 
	Description=Demo project for Spring Boot
	Package name=com.entando.example.spring-ms
	Packaging=Jar
	Java=11
	Dependencies:
	             #under WEB: Spring Web 
	             #under OPS: Spring Boot Actuator
```
  Click generate.

2. Unzip the package and move the unzipped files and `src` directory to the `microservices/spring-ms/` directory.

3. Create a new directory for the controller:
```
mkdir microservices/spring-ms/src/main/java/com/entando/example/springms/controller
```
4. In the controller directory, create `TemplateController.java` with the following code:
``` java
package com.entando.example.springms.controller;
import org.springframework.web.bind.annotation.*;
@RestController
public class TemplateController {
         @CrossOrigin @GetMapping("/api/example")
         public MyResponse getExample() { return new MyResponse("test Data"); }
         public static class MyResponse{
                 private final String payload;
                 public MyResponse(String payload) { this.payload = payload; }
                 public String getPayload() { return payload; }
         }
}
```

5. To make the microservice compatible with Entando, add the following snippet to the `microservices/spring-ms/src/main/resources/application.properties` file:

```
server.port=8081
management.endpoints.web.base-path=/api
```
6. Run the microservice from the bundle project root directory to test that it works: 
```
ent bundle run spring-ms
```

- In your browser, access [http://localhost:8081/api/example](http://localhost:8081/api/example) to see `{"payload":"test Data"}`.
- Then, access [http://localhost:8081/api/health](http://localhost:8081/api/health) to see `{"status":"UP"}`.
In local development, the run command can be used to modify the ports to run multiple microservices, but in production, microservices must run on port 8081.

7. Create `microservices/spring-ms/Dockerfile` so ent knows how to assemble the Docker image for the service:

```
FROM openjdk:11
WORKDIR /app
COPY target/*.jar /app/app.jar
CMD ["java", "-jar", "app.jar"]
EXPOSE 8081
```
## Step 3: Build and Install the Bundle

1. Optionally, add an image file in PNG or JPG format named `thumbnail` for the project.

2. To install your bundle, execute the following commands:
```
ent bundle pack
```
```
ent bundle publish
```
```
ent bundle deploy
```
```
ent bundle install 
```
3. To test the installed microservice, fetch your host name and microservice path with this command:
``` 
ent kubectl describe ingress 
```
- The URL where your microservice can be accessed follows this pattern:   
`YOUR-HOST-NAME/YOUR-BUNDLE-NAME/YOUR-MS-NAME/`

     In a quickstart environment, the URL for this tutorial will look something like this:    
`quickstart.192.168.64.34.nip.io/e71-spring-project-f5bb760b/spring-ms/`

- Using this URL in your browser, go to  
[http://quickstart.192.168.64.34.nip.io/e71-spring-project-f5bb760b/spring-ms/api/example/](http://quickstart.192.168.64.34.nip.io/e71-spring-project-f5bb760b/spring-ms/api/example/). It should return `{"payload":"test Data"}`.


**Next Steps**

- Learn to connect micro frontends to microservices by [adding an API Claim](add-api-claim.md).
- Add a [configuration micro frontend](../mfe/widget-configuration.md) to your bundle project. 

