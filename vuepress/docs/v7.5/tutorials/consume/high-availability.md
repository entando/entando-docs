---
sidebarDepth: 2
---

# High Availability on Entando

To build applications on Entando for high availability (HA), it is best practice to examine your goals, hardware, networking, and application-specific setup as well as optimize the App Engine deployment for that environment. The configurations and tests below can be used as building blocks to create a deployment architecture that promotes HA for your application in most situations. They include steps to set up and validate a clustered instance of the Entando App Engine, along with the configuration for Redis to support that instance.

Checkout this alternate project with [Redis deployed as a Sentinel configuration](https://github.com/entando-ps/redis-sentinel) for an Entando cache.

::: tip
To scale an Entando Application without the use of clustered storage assumes all instances are scheduled to a single node and requires a ReadWriteOnce (RWO) policy in conjunction with taints on other nodes. Be aware of the pros and cons of scheduling instances to the same node so you can maximize utilization of node resources and recover from an unreachable application instance. If the node terminates or is shutdown, your application will be down while Kubernetes reschedules the pods to a different node.
:::

## Clustering
This section describes how to set up a clustered Entando App Engine in the `entando-de-app` image. The goal is to deploy a clustered instance of the App Engine and verify the scalable deployment and HA of the application.

To set up **Redis** for cache management, refer to the [Redis Integration tutorial](./redis.md).

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

3. To view the pods in your deployment:
``` bash
kubectl get pods -n YOUR-NAMESPACE
```
4. You should have two `quickstart-deployment` pods in your namespace.

5. Look in the logs of the `quickstart-deployment` in either pod to see logging information related to different instances joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary.


![Clustered Logs](./img/clustered-logs.png)

### Validating Clustered Instances
This is an advanced exercise and not required or recommended for most deployment scenarios. The steps below validate that the clustered instances are working in your environment and that you have created a high availability deployment.

1. Complete the [creating a clustered instance tutorial](#creating-a-clustered-app-instance) above or have an existing clustered Entando App instance available for testing.
2. Retrieve the URL for your `entando-de-app`:
```
kubectl get ingress -n YOUR-NAMESPACE
```
3. Open the URL in a browser and ensure that the application is working.
4. Open a new browser window in incognito or private browsing mode to ensure that no data is cached and you're receiving a copy of the running application. **Do not navigate to the app.**
5. Delete one of the server deployment pods in your clustered instance:
```
kubectl delete YOUR-POD-NAME -n YOUR-NAMESPACE
```
  - There are other ways to do this. You could also shell into the server-container and manually kill the running app process with `kill -9 357`.
  - If you want to test at the hardware level, you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes).
6. In your private/incognito browser window, open the URL to your `entando-de-app`.
7. Check that the application continues to render while the pod you deleted is no longer present.
8. Wait for Kubernetes to restore your deleted pod.
9. Check that the application continues to render after the pod is restored.

### Caching Validation
Validating the shared cache can be done in a process similar to the clustered instance validation. The high-level steps are:

1. Deploy a clustered instance (see [creating a clustered instance tutorial](#creating-a-clustered-app-instance)).
2. Create data with the App Builder (pages, page templates, content etc.), using the external route for the application.
3. Refer to the logs to note which instance processed the request.
4. Terminate that instance.
5. Fetch the recently created data and verify that the data are returned.


