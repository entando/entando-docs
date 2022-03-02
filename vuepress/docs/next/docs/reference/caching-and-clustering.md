# Caching and Clustering in an Entando Application

## App Engine Clustering and High Availability

The Entando App Engine can be deployed as a clustered set of instances using the clustering and replication ability of Kubernetes. It is backed by a shared cache with two default choices for implementation.

This guide demonstrates how to configure and test a clustered instance of the Entando App Engine.

Microservices clustering that adds functionality to an Entando Application is different from clustering used by the Entando App Engine. Microservices rely on a custom clustering configuration and setup based on implementation and selections made during their creation. Refer to documentation addressing [clustered microservices and caching implementation](../../tutorials/devops/caching-and-clustering.md) for configuration and deployment details.

## Storage Requirements for Clustered Entando Applications

To scale an Entando Application across multiple nodes, a storage class that supports a `ReadWriteMany` access policy must be created. There are a number of ways to accomplish this, inclusive of dedicated storage providers such as GlusterFS. Cloud Kubernetes providers also offer clustered storage options specific to their implementation, such as Google Cloud File in GKE or Azure Files in AKS.

Two different storage classes can be used for clustered vs non-clustered storage if the default class doesn't support `ReadWriteMany`. To achieve this, add the following properties to the operator config map in the Helm templates:

```
entando.k8s.operator.default.clustered.storage.class: "[clustered RWX storage class]"
entando.k8s.operator.default.non.clustered.storage.class: "[RWO storage class]"
```

Set both values to the storage class appropriate to the configuration.

::: tip
To scale an Entando Application without the use of clustered storage assumes all instances are scheduled to a single node and requires a `ReadWriteOnce (RWO)` policy in conjunction with taints on other nodes. Understanding the pros and cons of same-node scheduling is critical for node resource optimization and application recovery should the instance become unreachable. Note that if the node quits or is shut down, the application will be unavailable until Kubernetes reschedules the pods to an alternate node.
:::

## Caching

### Data Management

At startup the Entando App Engine will load all database data into the shared cache. Applicable content will be served from the cache when a page is rendered or content is fetched. In the event of a write to the cache, both the cache and database will be updated.  

The following objects are cached in the base implementation of the Entando App Engine:

- Pages
- Page templates
- Categories
- Widgets
- Configuration (Application level configuration)
- Roles
- Groups
- Languages
- Labels (i18n)
- User profiles
- API Catalog (legacy API metadata separate from swagger)
- Data models and data types (deprecated)

## Redis Implementation

An Entando Application can be configured to utilize an external [Redis](https://redis.io/) cache. In a Redis implementation of an Entando Application, the cache is deployed independently of the Entando App Engine and the Entando App Engine is configured to connect to the deployed instance.

![Redis Caching](./img/redis-caching.png)

The Redis cache is not deployed by the Entando Operator and must be managed by a DevOps team member or Kubernetes cluster administrator.

[Check out the Caching and Clustering tutorial](../../tutorials/devops/caching-and-clustering.md#configuring-and-deploying-with-redis) for more information and step-by-step instructions to use a Redis cache in an Entando Application.

## Performance

Consider the following when designing an Entando App Engine cluster:

- In a read only implementation, or an implementation with infrequent writes to the cached objects listed above, the network latency between pods on different nodes will not be a major driver of runtime performance. Each pod will have a fully replicated copy of the cache.
- In write heavy implementations, network latency between nodes can factor into performance.
- The overall performance impact of network latency will vary depending upon implementation. Performance is impacted by the types of objects written, the size of those objects, and whether the writes invalidate single or entire lists of objects in the cache.

It is generally recommended that performance testing on clustered instances correlates to the expected runtime traffic pattern of a live application. Every application will have a unique performance profile.

### Cache Management

When a new replica of an Entando Application joins a cluster of applications, the cache is replicated to that node. If the cache is relatively large or the network is slow, this may add to the total startup time of the new instance. Existing instances will continue to function.
