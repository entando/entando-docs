# Caching and Clustering the Entando App Engine


# Clustering and High Availability


# Caching

## Data Management

At startup time the App Engine will load all database data into the shared cache. When a page is rendered or content is fetched that content will be served from the cache. In the event of a write to the cache the cache and database will both be updated.  

The following objects are cached in the base App Engine implementation

- Pages
- Page templates
- Categories
- Widgets
- Configuration (application level configuration)
- Roles
- Groups
- Languages
- Labels (i18n)
- User profiles
- API Catalog (legacy API metadata separate from swagger)
- Data models and data types (legacy and deprecated)

## Infinispan Implementation (Default)

The default implementation, included in the quickstart and base images of the release, of the cache for the App Engine utilizes Infinispan in Library Mode and it is managed via configuration in the app server hosting the engine.

To utilize this implementation you can add replicas of the app engine (entando-de-app) to your deployment. New pods will automatically join the cluster. Ensuring a high availability deployment distributed across nodes depends on the underlying Kubernetes implementation and goals of the deployment. It is up to the implementor of the cluster and the application to ensure that the applications are  

As you design your Entando App Engine cluster a couple of things to keep in mind:

- In a read only implementation, or an implementation with infrequent writes to the cached objects listed above, the network latency between pods on different nodes will not be a major driver of performance. Each pod will have a fully replicated copy of the cache
- In write heavy implementations network latency between nodes can be a factor in performance
  - The overall performance impact of network latency will vary depending on the implementation. The performance depends on the types of objects being written, the size of those objects, and whether the writes invalidate single objects or entire lists of objects in the cache. 

In general, it is recommended that performance testing on clustered instances is performed that matches the expected runtime traffic pattern of a live application.

## Redis Implementation
