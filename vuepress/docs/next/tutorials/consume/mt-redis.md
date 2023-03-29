---
sidebarDepth: 2
---

# Redis Integration for Multitenancy

This tutorial describes the configuration process to add Redis for cache management in a multitenant application. 

For more information, see [Entando Multitenancy].

## Prerequisites
* [A working instance of Entando 7.2.](../../docs/getting-started/README.md)

(../../../docs/getting-started/README.md)

* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Steps

1. Install a [Redis Standalone server](https://redis.io/docs/getting-started/installation/) or see our tutorial on creating a [Redis deployment with kubectl](https://developer.entando.com/v7.1/tutorials/consume/high-avail-tutorial.html#clustering)

2. Scale down the Entando App Engine deployment, typically named `quickstart-deployment`, to 0

3. Edit the `entando-de-app` image of the deployment to add these environment variables:  
```
  - name: REDIS_ACTIVE
    value: "true"
  - name: REDIS_SESSION_ACTIVE
    value: "true"
```
>Both REDIS_ACTIVE and REDIS_SESSION_ACTIVE need to be set to "true" to enable the storage of HTTP sessions. If only REDIS_ACTIVE is set to "true", Redis is used just for the cache.  
  
4A. For a single node implementation, also add the variable and value for your Redis host address: 

```
  - name: REDIS_ADDRESS
    value: YOUR-REDIS-HOSTNAME
```
4B. For Redis in high availability with Sentinel, insert the comma separated list of nodes like in this example:
```   
  - name: REDIS_ADDRESSES
    value: redis-node-0.redis-headless.test-mt-720.svc.cluster.local:26379,redis-node-1.redis-headless.test-mt-720.svc.cluster.local:26379,redis-node-2.redis-headless.test-mt-720.svc.cluster.local:26379
```

5. Scale the `entando-de-app` deployment back up to 1 and check the system for any issues.