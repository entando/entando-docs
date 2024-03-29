# Use Blueprint generated plugin and microfrontend without a bundle

## Purpose

In this tutorial you will learn how to use the plugin and microfrontend generated using the Entando Blueprint
in a running cluster without the need to include the components in a bundle

## Requirements

-   A microservice built with the Entando Component Generator

-   Node and NPM are installed on your machine (use LTS version)

-   Docker is installed on your machine and you are able to upload images to docker-hub or an image repository of your
    choice

-   An Entando Cluster where to deploy the Entando Plugin with a working instance of Entando App Builder
    and Entando App Engine

## Steps

## 1. Generate an entity using the Blueprint

In order to include auto-generated micro frontends to your bundle you
will need to use the `jhispter entity` generator. Let’s assume we want
to generate a simple *Conference* entity.

    jhipster entity Conference

Let’s use these options:

-   One field of type `String` called `name` with no validation

-   No relationships with other entities

-   REST controller should use the repository directly

-   No pagination for the entity

## 2. Populate the bundle with the micro frontends
<span id="section2"></span>

To populate the bundle with the generated micro frontends, run the
`./buildBundle.sh` script or use the npm.

    npm run populate-bundle

> **Important**
>
> The bundle population with the micro frontends requires some time to
> be processed. You should be able to follow the progress of the
> operation on screen.

## 3. Generate a docker image for your microservice

JHipster uses the JIB Maven plugin to generate a docker image for your
microservice.

The name of the output image generated with JIB will be composed by:
- The organization you chose during the setup wizard (by default that's set to `entando`)
- The name of the application
- Version `0.0.1-SNAPSHOT`

You can build the docker image with this command

    ./mvnw -Pprod clean package jib:dockerBuild

If for example during setup wizard you chose a custom organization `myorg` and the set the application name to `jhipster` the resulting docker image is going to be `myorg/jhipster:0.0.1-SNAPSHOT`

> **Note**
>
> Output image name can be changed in the `pom.xml` file by providing the
> by providing a different value in the `plugins.plugin.jib-maven-plugin.configuration.to.image` tag

```
 <plugin>
   <groupId>com.google.cloud.tools</groupId>
   <artifactId>jib-maven-plugin</artifactId>
   <configuration>
     <!-- ... -->
     <to>
       <image><!-- use a custom value here --></image>
     </to>
     <!-- ... -->
   </configuration>
 </plugin>
```

> **Note**
>
> Output image name can also be changed temporarely
> by customizing in the `./mvnw` command using the `-Djib.to.image`
> parameter. For example, if you want to build an image with organization `myneworg`, name `myapp` and version `latest` you can do
> ```
> ./mvnw -Pprod clean package jib:dockerBuild -Djib.to.image=myneworg/myapp:latest
> ```

> **Warning**
>
> If you change the target image of the docker build, remember to update
> the plugin metadata in the bundle accordingly.

## 4. Publish the Docker image to Docker registry (DockerHub or equivalent)

Let’s now publish the docker image for the microservice to make it
available later during bundle installation in the cluster.

    docker push <name-of-the-image:tag>

## 5. Deploy the plugin in your Entando Cluster

 Assuming you have an Entando Cluster available in an `entando` namespace, you can now take
 the plugin custom resource generated by the Entando Blueprint in the `bundle/plugins` folder and deploy it
 in your `entando` namespace.

> **Warning**
>
> As stated at step 4, if you changed the target image of your docker build, the plugin custom resource
> in the `bundle/plugins` folder needs to be updated to point to the correct image

 From the jhipster project root

``` bash
cd bundle/plugins

kubectl create -f <plugin-file.yaml> -n entando
```

## 6. Wait for your plugin to be in `Running` state and link the plugin with the app using an `EntandoAppPluginLink` custom resource

Once the plugin server deployment will be up and running, you can create an [EntandoAppPluginLink custom resource](../../../docs/concepts/custom-resources.md)
to make the plugin API available from the EntandoApp domain.
Here an example of a EntandoAppPluginLink custom resource. Some assumptions with this custom resource:
- The EntandoPlugin generated with the blueprint has name `my-demo-plugin`
- The EntandoApp where I want to expose the `my-demo-plugin` apis is named `my-entando-app`
- Both are deployed on the `entando` namespace.
- As a name for the link, I'll use `my-entando-app-to-my-demo-plugin-link`

> **Warning**
> Remember to change the fields to match your setup.

```
> cat <<EOF > /tmp/mylink.yaml
apiVersion: entando.org/v1
kind: EntandoAppPluginLink
metadata:
  name: my-entando-app-to-my-demo-plugin-link
  namespace: entando
spec:
  entandoAppName: my-entando-app
  entandoAppNamespace: entando
  entandoPluginName: my-demo-plugin
  entandoPluginNamespace: entando
EOF
```

Now add this link to your environment
```
kubectl create -f /tmp/my-link.yaml -n entando
```

A new link deployer will start and will work behind the scenes to add your plugin `ingressPath` (this is part of the
plugin `spec`) to the EntandoApp ingress

## 7. Upload the Microfrontend to your EntandoApp

Now that the the plugin and the app are linked together, you can proceed to generate the Micro Frontend from the App Builder
and upload the static resources like `js` and `css` files.

1. From AppBuilder access the File browser and create a new folder in the `public` folder and name like the name of the bundle (is the `code` field available
in the `/bundle/descriptor.yaml` file of the blueprint project) or using a custom name, e.g. `demo-widget`
> **Warning**
> If you choose to use a custom folder, remember to update the references in the customUI of the widget later

2. Upload all the resources generated in <a href="#section2">step 2 of this guide</a> and available in the `/bundle/resources` folder
of the blueprint project into the `demo-widget` folder of Entando App Builder file browser.
> **Warning**
> You can decide to recreate the folder structure as the one in `/bundle/resources` or not, but you need to update the
> references in the customUi / configUI of the widget later

3. Create the widget component from the `UX Patterns > Widgets` page. You can use whatever title you want, but for
the customUI copy the one generated in <a href="#section2">step 2 of this guide</a> for one of the widgets you generated.
As an example, the customUI for the `detailWidget` of the conference entity is available in
`/bundle/ui/widgets/conference/detailsWidget/conference-details-widget.ftl`


> **Warning**
> Remember to update all the references in the customUI to use the custom folder structure you defined in steps 7.1 and 7.2

4. You will need to update the service-url of your widgets to reflect the ingress path to your microservice created above. This path can be set on your customer element if you set it up during blueprint generation. For example,

```
Create the widget on app-builder, you can see the right custom element to use into public/index.html

	Update the service-url value with the relative path of your service if you're deploying a bundle
		Ex. <car-table service-url="/newBp/api"  />
	Or use the full path if you're deploying the BE and FE individually
		Ex. <car-table service-url="http://newbp-plugin-entando.192.168.64.7.nip.io/newBp/api"/>
```

## 8. Create a fragment for keycloak

1. In the App Builder go to `UX Patterns --> Fragments`.
2. Select Add
3. For the code enter `keycloak.`
4. Place the freemarker template below into the Gui Code field.

```
<script src="http://ROUTE_TO_KEYCLOAK/auth/js/keycloak.js"></script>
	<script>
	  const keycloak = Keycloak('/entando-de-app/keycloak.json');
	  function createKcDispatcher(payload) {
	    return () =>
	      window.dispatchEvent(
	        new CustomEvent("keycloak", { detail: payload })
	      );
	  }
	  keycloak.onReady = createKcDispatcher({ eventType: "onReady" });
	  keycloak.onAuthSuccess = createKcDispatcher({
	    eventType: "onAuthSuccess"
	  });
	  keycloak.onAuthError = createKcDispatcher({
	    eventType: "onAuthError"
	  });
	  keycloak.onAuthRefreshSuccess = createKcDispatcher({
	    eventType: "onAuthRefreshSuccess"
	  });
	  keycloak.onAuthRefreshError = createKcDispatcher({
	    eventType: "onAuthRefreshError"
	  });
	  keycloak.onAuthLogout = createKcDispatcher({
	    eventType: "onAuthLogout"
	  });
	  keycloak.onTokenExpired = createKcDispatcher({
	    eventType: "onTokenExpired"
	  });
	  const onInit = createKcDispatcher({ eventType: "onInit" });
	  window.entando = {
	    ...(window.entando || {}),
	    keycloak
	  };
	  window.entando.keycloak.init({ onLoad: "check-sso" }).success(onInit);
	</script>
```


## 9. Import the fragment into the head section of the used page template
Add the following freemarker snippet to the page template you are using for your pages.

```
<@wp.fragment code="keycloak" escapeXml=false />
```

## 10. Use the microfrontend and microservice

You can now use your micro frontend and your microservice in your Entando App.
