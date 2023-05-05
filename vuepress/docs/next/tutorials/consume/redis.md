---
sidebarDepth: 2
---

# Redis Integration
Redis, the in-memory data structure store, can be used on Entando for cache management for high availability applications. It is particularly useful for Entando's multitenancy application. This tutorial describes the steps to integrate Redis for high availability and then for multitenancy.

For more information, see [Entando Multitenancy](multitenancy-tutorial.md).

## Prerequisites
* [A working instance of Entando.](../../../docs/getting-started/README.md) with the default Tomcat server image

* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

* For a multitenant application, the [Content Delivery Server](./mt-cds.md) is required

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
3. Retrieve the IP address for your Redis deployment:
```
kubectl get service -n YOUR-NAMESPACE
```

### Modify the App Engine
1. Scale down the `entando-de-app` deployment to 0

2. Add these environment variables to the deployment, using your values:  
```
 spec:
  environmentVariables:
    - name: REDIS_ACTIVE
      value: "true"
    - name: REDIS_ADDRESS
      value: redis://redis:6379 
    - name: REDIS_SESSION_ACTIVE 
      value: "true"
    - name: REDIS_PASSWORD # Optional
      valueFrom:
        secretKeyRef:
          key: password
          name: YOUR-REDIS-SECRET-NAME
          optional: false 
```
>Both `REDIS_ACTIVE` and `REDIS_SESSION_ACTIVE` need to be set to "true" to enable the storage of HTTP sessions. If only `REDIS_ACTIVE` is set to "true", Redis is used just for the cache.  

>Using a password for Redis is optional. This example uses a `Secret` for the `REDIS_PASSWORD`. You can also hardcode it in the YAML for testing purposes, but the use of clear text passwords in deployment files is not recommended. Create and use a Secret for the password as a best practice.

3. Scale the `entando-de-app` deployment back up to 1 and check the system for any issues.

## Redis Integration for Multitenancy

### Install Redis Sentinel
For multitenancy, the steps to install Redis Sentinel using Helm are listed below. Helm 3 is a prerequisite. For more information, see the [Redis Sentinel](https://github.com/entando-ps/redis-sentinel) project. 

1. Clone the project:
```
git clone https://github.com/entando-ps/redis-sentinel.git
```
2. Set your Kubernetes context to the proper namespace:
```
kubectl config set-context --current --namespace=YOUR-NAMESPACE
```
3. Run the custom script:
```
./install.sh
```

### Modify the App Engine 

1. Scale down the `entando-de-app` deployment to 0

2. Edit the `entando-de-app` image of the deployment and add the environment variables listed below. For
`REDIS_ADDRESSES`, note the Sentinel node's logs that lists the domain names of the Redis cluster instances. List the master first, then the replicas as shown in this example. 

```
spec:
  environmentVariables:
    - name: REDIS_ACTIVE
      value: "true"
    - name: REDIS_ADDRESSES
      value: redis-node-0.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379,redis-node-1.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379,redis-node-2.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379
    - name: REDIS_SESSION_ACTIVE 
      value: "true"
    - name: REDIS_PASSWORD # Optional
      valueFrom:
        secretKeyRef:
          key: password
          name: YOUR-REDIS-SECRET-NAME
          optional: false    
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

When the variable is set to `false`, the application doesn't subscribe to the events but uses a scheduler to periodically check the master IP to detect if the master has changed. This can be useful as a fallback method in case of a problem with events detections.
