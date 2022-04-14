# Caching and Clustering

The tutorials below cover the basic steps to setup and validate a clustered instance of the Entando App Engine.

> **NOTE**
>
> When building your deployment architecture it is important to review your goals, hardware, networking, and application specific setup and optimize your App Engine deployment for your environment. None of the configurations or deployments below will address every type of application or deployment. The configuration and testing examples below can be used as building blocks to create a deployment architecture that works for your application.

## Storage Requirements for Clustered Entando Apps

In order to scale an Entando Application across multiple nodes, you must provide a storage class that supports
a `ReadWriteMany` access policy. There are many ways to accomplish this, including using dedicated storage providers
like GlusterFS or others. Cloud Kubernetes providers also have clustered storage options specific to their implementation like Google Cloud File in GKE or Azure Files in AKS.

You can use two different storage classes for your clustered vs non-clustered storage if your default class doesn't support `ReadWriteMany`. To do this, add the following properties to your ConfigMap for the operator:

```
entando.k8s.operator.default.clustered.storage.class: [your clustered RWX storage class]
entando.k8s.operator.default.non.clustered.storage.class: [your RWO storage class]
```

Set the values of both to the appropriate storage class for your configuration.

::: tip
You can also scale an Entando Application without clustered storage using a `ReadWriteOnce (RWO)` policy by ensuring that the
instances are all scheduled to the same node. This can be accomplished using taints on other nodes. Be aware of the pros and cons of scheduling
instances to the same node. This will give you protection if the application instance itself dies or becomes unreachable, and will help
you get the most utilization of node resources. However, if the node dies or is shutdown, you will have to wait for Kubernetes to reschedule the pods to a different node and your application will be down.
:::

## Clustering

This tutorial reviews setting up a clustered Entando App Engine in the `entando-de-app`. The goal is to deploy a clustered instance of the App Engine and verify that we have a high availability and scalable deployment of the application.

### Prerequisites
- An existing deployment of an Entando App or the ability to create a new one.
    - If you haven't created a deployment yet or don't have a yaml file for an Entando deployment, follow the [Quickstart instructions](../../../docs/getting-started/).
- The Entando deployment must use an RDBMS, a relational database system in which data is organized in a table structure. Clustered instances will not work correctly with in-memory databases.

### Creating a Clustered App Instance
1. Create an Entando deployment via the operator config file or edit an existing deployment YAML file.
2. Scale your Entando server application:

``` bash
kubectl scale deployment quickstart-deployment -n entando --replicas=2
```

3. Run `kubectl get pods -n YOUR-NAMESPACE` to view the pods in your deployment.
4. You should have two `quickstart-deployment` pods in your namespace.

5. Look in the logs of the `quickstart-deployment` in either pod and you will see logging information related to different instances joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary.

![Clustered Logs](./img/clustered-logs.png)

The tutorials below will take you through validating and testing the clustered and cached instances.

> **NOTE**
>
>If you are on OpenShift, you can use the Scale Up arrows and other settings available in the OpenShift console if you prefer.

### Validating the Clustered Instances
This is an advanced tutorial and is not required or recommended for most deployment scenarios or users.

This tutorial will walk you through steps to validate that the clustered instances are working in your environment and that you have created a high availability deployment. There are many ways to validate your clustering.

1. Complete the [creating a clustered instance tutorial](#creating-a-clustered-app-instance) above or have an existing clustered Entando App instance available for testing.
2. Get the URL for your `entando-de-app` with `kubectl get ingress -n YOUR-NAMESPACE`.
3. Open the URL in the browser of your choice and ensure that the application is working.
4. Open a new browser window in an incognito or private browsing mode.  Do not navigate to the app.
    - The reason for private mode is to ensure that no data is cached and that you're receiving a copy of the running application.
5. In the next steps, you'll delete a pod in your cluster and verify that your application is still getting served. Kubernetes will automatically restore the desired number of replicas so you'll need to perform the validation test before the new replica is launched. In most environments this will be around one minute but it will vary.
6. Delete one of the server deployment pods in your clustered instance with `kubectl delete YOUR-POD-NAME -n YOUR-NAMESPACE`.
    - There are other ways to do this. You could also shell into the server-container and manually kill the running app process with `kill -9 357`.
    - If you want to test it at the hardware level, you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes).
7. In your private/incognito browser window, open the URL to your `entando-de-app`.
8. Check that the application continues to render while the pod you deleted is no longer present.
9. Wait for Kubernetes to restore your deleted pod.
10. Check that the application continues to render after the pod is restored.

### Caching Validation
Validating the shared cache can be done in a similar process to the clustered instance validation. The high level steps are:

1. Deploy a clustered instance (see [creating a clustered instance tutorial](#creating-a-clustered-app-instance)).
2. Create data using the app builder (pages, page templates, content etc.), using the external route for the application.
3. Take note in the logs of which instance processed the request.
4. Terminate that instance.
5. Fetch the data created and check that the recently created data is returned.


## Configuring and Deploying with Redis

This tutorial covers deploying an Entando App Engine instance using Redis as a cache for data served by the app engine. For more information on the cache
configuration for the App Engine, checkout the [Caching and Clustering documentation](../../docs/reference/caching-and-clustering.md).

### Deploy Redis to Kubernetes

1. Create the redis deployment and expose the endpoints:

```sh
kubectl create deployment redis --image=redis:6
```
```sh
kubectl expose deployment redis --port=6379 --target-port=6379 -n YOUR-NAMESPACE
```

2. Install the Redis CLI for your environment per <https://redis.io/topics/rediscli>.
3. Get the IP for your Redis deployment:
```sh
kubectl get service -n YOUR-NAMESPACE
```
4. Validate your deployment:

```sh
redis-cli -h 10.43.99.198 -p 6379 ping
```
   * Should respond PONG.


```sh
redis-cli -h 10.43.99.198 -p 6379 incr mycounter
```
   * Should increment each time. 

### Configure implementation

1. Use git to clone the `entando-de-app` repository:

```sh
git clone https://github.com/entando/entando-de-app
```

2. Fetch the tags and checkout the release tag and create a branch for your customization:

```sh
git fetch --tags
```
```sh
git checkout tags/v6.3.68 -b 6.3.2-redis ****Check
```

3. Open the pom.xml file of the `entando-de-app`.

4. Add the Redis caching plugin to the pom.xml:

```
<dependency>
    <groupId>org.entando.entando.plugins</groupId>
    <artifactId>entando-plugin-jpredis</artifactId>
    <type>war</type>
</dependency>
```

5. Save the pom.
6. Build and push a custom image for the `entando-de-app` with [Building a Docker Image Tutorial](./build-core-image.md).
7. Download the operator configuration deployment file:

``` bash
curl -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/v7.0.0/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml > namespace-resources.yaml
```


8. Update the image in the deployment YAML file to point to your custom `entando-de-app` image with Redis. The line to change is in the `ConfigMap` and is noted below:

```
entando-de-app-wildfly: >-
    {"version":"6.3.10","executable-type":"jvm","registry":"docker.io","organization":"entando"}
```

9. Deploy your edited file with `kubectl`. For example,

```
kubectl apply -f namespace-resources.yaml
```
<!-- 
10. Run the Helm template to generate an application configuration:
```
helm template quickstart ./ > my-clustered-app.yaml
```

11. Add environment variables to the `EntandoApp` in the outcome of the Helm template command generated above (`my-clustered-app.yaml`) for the Redis address and Redis password for your deployed Redis instance. The variables to create are: -->

10. Add environment variables to the `EntandoApp` in `your-clustered-app.yaml` for the Redis address and Redis password for your deployed Redis instance. The variables to create are:

```
REDIS_ADDRESS
```
```
REDIS_PASSWORD
```

Here is an example. **This is only an example for the EntandoApp and not a complete deployment.** Utilize this as a reference to create your configuration in a complete deployment.

>**NOTE**
>
> This example uses a secret for the `REDIS_PASSWORD` which is recommended. You can also hardcode the password in the YAML for testing. However, creating passwords in clear text in your deployment files is not recommended. Create and use a secret for the password as a best practice.

```
apiVersion: "entando.org/v1"
kind: "EntandoApp"
metadata:
  name: "quickstart"
  annotations:
    entando.org/processing-instruction: defer
spec:
  dbms: embedded
  replicas: 1
  standardServerImage: wildfly
  ingressPath: /entando-de-app
  environmentVariables:
    - name: REDIS_ADDRESS
      value: YOUR redis URI. For example redis://localhost:6379
    - name: REDIS_PASSWORD
      valueFrom:
        secretKeyRef:
          key: password
          name: quickstart1-redis-secret
          optional: false  
```

12. Deploy your file:

```
kubectl apply -f [your-clustered-app.yaml]
```
