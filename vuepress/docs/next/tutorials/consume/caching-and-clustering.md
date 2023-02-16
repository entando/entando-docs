# Caching and Clustering

The tutorial below covers the basic steps to setup and validate a clustered instance of the Entando App Engine.

::: tip NOTE
When building your deployment architecture, it is important to review your goals, hardware, networking and application-specific setup. You must also optimize App Engine deployment for your environment. The configurations and tests below do not address every type of application or deployment, but they can be used as building blocks to create a deployment architecture that works for your application.
:::

## Storage Requirements for Clustered Entando Apps

In order to scale an Entando Application across multiple nodes, you must provide a storage class that supports
a `ReadWriteMany` access policy. There are many ways to accomplish this, including using dedicated storage providers like GlusterFS. Cloud Kubernetes providers also offer clustered storage options specific to their implementation, such as Google Cloud File in GKE or Azure Files in AKS.


You can use two different storage classes for your clustered vs. non-clustered storage if your default class doesn't support `ReadWriteMany`. Add the following properties to your ConfigMap for the operator:

```
entando.k8s.operator.default.clustered.storage.class: [your clustered RWX storage class]
entando.k8s.operator.default.non.clustered.storage.class: [your RWO storage class]
```

Set both values to the appropriate storage class for your configuration.

::: tip
A `ReadWriteOnce (RWO)` policy that ensures instances are all scheduled to the same node will scale an Entando Application without clustered storage and is accomplished via taints on other nodes. Be aware of the pros and cons of scheduling instances to the same node so you can maximize utilization of node resources and recover from an unreachable application instance. If the node terminates or is shutdown, your application will be down while Kubernetes reschedules the pods to a different node.
:::

## Clustering

This tutorial reviews setting up a clustered Entando App Engine in `entando-de-app`. The goal is to deploy a clustered instance of the App Engine and verify the high availability and scalable deployment of the application.

### Prerequisites
- An existing deployment of an Entando App or the ability to create one.
    - If you haven't created a deployment or don't have a YAML file for an Entando deployment, follow the [Quickstart instructions](../../../docs/getting-started/).
- The Entando deployment must use a Relational Database Management System (RDBMS) to organize data in a table structure. Clustered instances will not work correctly with in-memory databases.
- Sticky sessions are recommended when enabling a clustered Entando Application. For example, see [Manage NGINX](../devops/manage-nginx.md) for related affinity settings.

### Creating a Clustered App Instance
1. Create an Entando deployment via the operator config file or edit an existing deployment YAML file.
2. Scale your Entando server application:

``` bash
kubectl scale deployment quickstart-deployment -n entando --replicas=2
```


3. Run `kubectl get pods -n YOUR-NAMESPACE` to view the pods in your deployment.
4. You should have two `quickstart-deployment` pods in your namespace.

5. Look in the logs of the `quickstart-deployment` in either pod to see logging information related to different instances joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary.


![Clustered Logs](./img/clustered-logs.png)

### Validating Clustered Instances
This is an advanced exercise and not required or recommended for most deployment scenarios. The steps below validate that the clustered instances are working in your environment and that you have created a high availability deployment.

1. Complete the [creating a clustered instance tutorial](#creating-a-clustered-app-instance) above or have an existing clustered Entando App instance available for testing.
2. Get the URL for your `entando-de-app` with `kubectl get ingress -n YOUR-NAMESPACE`.
3. Open the URL in the browser of your choice and ensure that the application is working.
4. Open a new browser window in incognito or private browsing mode to ensure that no data is cached and you're receiving a copy of the running application. **Do not navigate to the app.**
5. Delete one of the server deployment pods in your clustered instance with `kubectl delete YOUR-POD-NAME -n YOUR-NAMESPACE`.
    - There are other ways to do this. You could also shell into the server-container and manually kill the running app process with `kill -9 357`.
    - If you want to test at the hardware level, you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes).
6. In your private/incognito browser window, open the URL to your `entando-de-app`.
7. Check that the application continues to render while the pod you deleted is no longer present.
8. Wait for Kubernetes to restore your deleted pod.
9. Check that the application continues to render after the pod is restored.

### Caching Validation
Validating the shared cache can be done in a similar process to the clustered instance validation. The high level steps are:

1. Deploy a clustered instance (see [creating a clustered instance tutorial](#creating-a-clustered-app-instance)).
2. Create data with the App Builder (pages, page templates, content etc.), using the external route for the application.
3. Refer to the logs to note which instance processed the request.
4. Terminate that instance.
5. Fetch the recently created data and verify that the data are returned.


## Configuring and Deploying with Redis

In this section, an Entando App Engine instance is deployed using Redis as a cache for data served by the App Engine. For more information on the cache configuration for the App Engine, see the [Caching and Clustering documentation](../../docs/consume/caching-and-clustering.md).


### Deploy Redis to Kubernetes

1. Create the Redis deployment and expose the endpoints:

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

2. Fetch the tags, checkout the release tag and create a branch for your customization:

```sh
git fetch --tags
```
```sh
git checkout tags/v7.1.0 -b YOUR-7.1.0-redis
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
6. Build and push a custom image for the `entando-de-app` with [Building a Docker Image Tutorial](../devops/build-core-image.md).
7. Download the operator configuration deployment file:

<EntandoCode>curl -L -C - -O https://raw.githubusercontent.com/entando/entando-releases/{{$site.themeConfig.entando.fixpack.v71}}/dist/ge-1-1-6/namespace-scoped-deployment/orig/namespace-resources.yaml > namespace-resources.yaml</EntandoCode>

8. Update the image for `entando-de-app-wildfly` in the `namespace-resources.yaml` file to point to your custom `entando-de-app` image with Redis. The line to change is in the ConfigMap named `entando-docker-image-info`.

9. Deploy your edited file with `kubectl`.

```sh
kubectl apply -f namespace-resources.yaml
```

10. Download the `entando-app.yaml` template

<EntandoCode>curl -sLO "https://raw.githubusercontent.com/entando/entando-releases/{{$site.themeConfig.entando.fixpack.v71}}/dist/ge-1-1-6/samples/entando-app.yaml"</EntandoCode>

11. Add environment variables to the `EntandoApp` definition to match your Redis instance. The variables to create are REDIS_ACTIVE, REDIS_ADDRESS (e.g. _redis://localhost:6379_), and REDIS_PASSWORD.

>NOTE: This example uses a Secret for the `REDIS_PASSWORD`, which is recommended. You can also hardcode the password in the YAML for testing purposes, but the use of clear text passwords in deployment files is not recommended. **Create and use a Secret for the password as a best practice.**

```yaml
data:
  environmentVariables:
    - name: REDIS_ACTIVE
      value: "true"
    - name: REDIS_ADDRESS
      value: YOUR-REDIS-URL
    - name: REDIS_PASSWORD
      valueFrom:
        secretKeyRef:
          key: password
          name: YOUR-REDIS-SECRET-NAME
          optional: false 
```

12. Deploy your file
```sh
kubectl apply -f entando-app.yaml
```
