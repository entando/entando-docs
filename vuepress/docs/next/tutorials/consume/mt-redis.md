---
sidebarDepth: 2
---

# Redis Integration
Redis, the in-memory data structure store, can be used on Entando for cache management for high availability applications. It is particularly useful for Entando's multitenancy application. This tutorial describes the configuration process to use Redis, then moves on to apply it to multitenancy on Entando. 

For more information, see [Entando Multitenancy](multitenancy-tutorial.md).

## Prerequisites
* [A working instance of Entando.](../../../docs/getting-started/README.md) with the default Tomcat server image.

* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Redis for Single Node application
Set up your own [Redis Standalone server](https://redis.io/docs/getting-started/installation/) or follow the steps below for a local single node instance.

### Install Redis
1. Create the Redis deployment
```
kubectl create deployment redis --image=redis:6
```
2. Expose the endpoints:
```
kubectl expose deployment redis --port=6379 --target-port=6379 -n YOUR-NAMESPACE
```
3. Get the IP for your Redis deployment:
```
kubectl get service -n YOUR-NAMESPACE
```

### Modify the App Engine
1. Scale down the Entando App Engine deployment, typically named `quickstart-deployment`, to 0

2. Add these environment variables to the deployment, using your values:  
```
 spec:
  environmentVariables:
    - name: REDIS_ACTIVE
      value: "true"
    - name: REDIS_ADDRESS
      value: YOUR-REDIS-HOSTNAME 
    - name: REDIS_SESSION_ACTIVE 
      value: "true"
    - name: REDIS_PASSWORD
      valueFrom:
        secretKeyRef:
          key: password
          name: YOUR-REDIS-SECRET-NAME
          optional: false 

```
>Both `REDIS_ACTIVE` and `REDIS_SESSION_ACTIVE` need to be set to "true" to enable the storage of HTTP sessions. If only `REDIS_ACTIVE` is set to "true", Redis is used just for the cache.  

>This sample uses a `Secret` for the `REDIS_PASSWORD`. You can also hardcode the password in the YAML for testing purposes, but the use of clear text passwords in deployment files is not recommended. Create and use a Secret for the password as a best practice.

3. Scale the `entando-de-app` deployment back up to 1 and check the system for any issues.

## Redis Integration for Multitenancy

### Install Redis Sentinel
Follow the steps in the [Redis Sentinel](https://github.com/entando-ps/redis-sentinel) project to install.

### Modify the App Engine 

1. Scale down the Entando App Engine deployment, typically named `quickstart-deployment`, to 0

2. Edit the `entando-de-app` image of the deployment to add the environment variables for Redis as in [Step 2](#modify-the-app-engine) above, but replace `REDIS_ADDRESS` with `REDIS_ADDRESSES`. For the value, list the master first, then the replicas as shown in this example. 

```
spec:
  environmentVariables:
    - name: REDIS_ADDRESSES
      value: redis-node-0.redis-headless.test-mt-720.svc.cluster.local:26379,redis-node-1.redis-headless.test-mt-720.svc.cluster.local:26379,redis-node-2.redis-headless.test-mt-720.svc.cluster.local:26379
```
  
3. Scale the `entando-de-app` deployment back up to 1 and check the system for any issues.

### Optional
When Redis Sentinel is active, Sentinel monitoring can be utilized to trigger an automatic failover process by using an additional environment variable in the entando-de-app deployment image. 

```
spec:
environmentVariables:
    - name: REDIS_USE_SENTINEL_EVENTS
      value: "true" 
```
If this env variable is set to `true`, the Sentinel failover process for electing a new master will be used when a master node becomes unreachable. 

When the variable is set to `false`, the application doesn't subscribe to the events but uses a scheduler to periodically check the master IP to detect if the master has changed. This can be useful as a fallback method in case of problem with events detections.
