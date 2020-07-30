# Objective



## Prerequisites

-   Java 1.8
-   Maven 3.0.5+
-   npm 6+
-   git
-   Docker
-   node 12+ (or LTS)
-   A Docker Hub account or access to a docker registry

## Installation

1. Install JHipster `npm install -g generator-jhipster@6.9.1`

2. Install the Entando Blueprint `npm install -g generator-jhipster-entando@6.2.0`

3. Create an empty directory to hold your project (this will hold your microservice and micro frontends)

4. On a command line `cd` into your directory and create an Entando plugin using the blueprint `jhipster --blueprints entando`

5. You'll be presented with a series of prompts to configure your application. The list below provides a set of choices. **You can select the defaults in every step of the tutorial if you want to go fast through this. Just hit Enter at each step**
  - If you want to go through the choices follow this guide. Except where noted below in bold you can choose what works best for you. Base values for the tutorial are in parentheses.
     - `What is the base name of your application?` (my-app or a name of your choice)
     - `As you are running in a microservice architecture, on which port would like your server to run? It should be unique to avoid port conflicts.` (8081)
     - `What is your default Java package name? `(org.entando)
     - `Which *type* of database would you like to use?` (SQL)
         - If you pick no database here you'll be building a stateless microservice which is a valid choice but the rest of this tutorial won't work)
     - `Which *production* database would you like to use?` (PostgreSQL or MySQL)
     - `Which *development* database would you like to use?` (H2 with disk-based persistence )
     - `Do you want to use the Spring cache abstraction?` (Yes, with the Ehcache implementation)
     - ` Do you want to use Hibernate 2nd level cache?` (Yes)
     - `Would you like to use Maven or Gradle for building the backend?` **Maven** <-- this is required for Entando and is the default
     - `Which other technologies would you like to use?` (Don't select any other technologies)
     - `What name would you give to the bundle to share on an Entando digital-exchange?` Enter a name for your Entando Bundle or accept the default
     - `Which is the organization name to use when publishing the docker image?` **At this point enter the name of the organization where you are going to push your docker image. If you're using your own docker hub account you should enter your username here.** (this can be changed later as needed)
     - `Would you like to generate micro frontends when creating entities?` (Always)
     - `Would you like to enable internationalization support` (up to you)
     - `Please choose the native language of the application` (up to you)
     - `Please choose additional languages to install` (if you picked internationalization)
     - `Besides JUnit and Jest, which testing frameworks would you like to use?` (up to you)
     -  `Would you like to install other generators from the JHipster Marketplace?` (select no)

 6. Next you will add an Entity to your microservice and create Micro Frontends. In your project run `jhipster entity Conference` where Conference is the name of the entity you want to generate
   - **Add Fields**
     - `Do you want to add a field to your entity?` (Yes)
     - `What is the name of your field?` (Enter `name`)
     - `What is the type of your field?` (Select `String`)
     - `Do you want to add validation rules to your field?` (No)
     - `Do you want to add a field to your entity?` (Yes)
     - `What is the name of your field?` (Enter `location`)
     - `What is the type of your field?` (Select `String`)
     - `Do you want to add validation rules to your field?` (No)
     - `Do you want to add a field to your entity?` (No)
     - `Do you want to add a relationship to another entity?` (No)
     - `Do you want to use separate service class for your business logic?` (Up to you)
     - `Do you want pagination on your entity?` (Yes, with infinite scroll)
     - At this point the blueprint will generate controllers, repositories, services, and micro frontends for your entity generation.
     - `Overwrite src/main/resources/config/liquibase/master.xml?` When prompted with a conflict at this stage enter `a` for All. This will override existing files with the configuration changes needed for your new entity.

At this point you have a choice. Continue to follow this tutorial to move forward to build your Entando bundle and deploy your microservice and micro frontends to the Entando Component Repository. Or go to the [Running Locally](./run-local.md) tutorial to run your micro frontends and microservice in your local dev environment.

## Build and Deploy
This section will walk you through building a docker image from your microservice, creating your Entando bundle, checking your bundle into git, and deploying it to the Entando Component Repository.

You'll need:
  - Docker
  - A running Entando instance (see [Getting Started](../../docs/getting-started) for steps if needed)
  - A bash shell
  - git
  - An empty git repository

### Build Docker Image for Microservices
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


### Build your Bundle and publish to git
1. In your microservice project populate the bundle with the generated micro frontends, run the `./buildBundle.sh` script or use `npm run populate-bundle`

> **Important**
> The bundle population with the micro frontends requires some time to be processed. You should be able to follow the progress of the operation on screen.

2. The output of your bundle will be in the top level `bundle` folder in your microservice

3. Create a new git repository and name it `my-bundle` (or a name of your choice)

4. Clone the repository created in the prior step to a location of your choice (not inside your microservice) `git clone <url of your repo>`

5. Copy the contents of the `bundle/` folder from your microservice into your repository

> **Important**
> The file descriptor.yaml should be at the top of your repository

6. `cd` into your cloned bundle repository on the command line

6. Add the files to git `git add .`

7. Commit the files to git `git commit -a -m "Your commit message here"`

8. Push the files to git `git push`

9. Tag your bundle `git tag -a "v0.0.1" -m "My first tag"`

10. Push the tags `git push --tags`

11. Install the `entando-bundle-cli` using `npm install -g entando-bundle-cli@6.2.0`

12. Generate your bundle

```
    entando-bundle from-git --name=<bundle-name> --namespace=<your namespace> --thumbnail-url=<thumbnail-url> --repository=<your-repository-url> --dry-run > example-bundle.yaml
```

```
    In the command above you must set:
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
