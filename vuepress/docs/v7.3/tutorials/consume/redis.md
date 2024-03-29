---
sidebarDepth: 2
---

# Redis Integration
Redis database server can be used on Entando for cache management in high availability applications. It is a requirement for Entando Applications serving multiple tenants. This tutorial describes the steps to integrate Redis for both high availability and multitenancy.

See [Entando Multitenancy](./multitenancy.md) for more information.

## Prerequisites
* [A working instance of Entando](../../../docs/getting-started/README.md) based on the default Tomcat server image

* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

* Helm 3 installed in your local environment

## Install [Redis Sentinel](https://github.com/entando-ps/redis-sentinel)
1. Clone the project:
``` bash
git clone https://github.com/entando-ps/redis-sentinel.git
```

> Notes: 
> * The number of Redis replica is 3; it can be adjusted by modifying the `replica.replicaCount` in the `values.yaml` file.
> * By default, the Redis Sentinel configuration does not use a password. For an external Redis installation where a password is required, you can define a value for the parameter `global.redis.password` in `values.yaml` so that Helm creates a secret for it.

2. Set your Kubernetes context to the proper namespace:
``` bash
kubectl config set-context --current --namespace=YOUR-NAMESPACE
```

3. Run the custom script:
``` bash
./install.sh
```

## Configure the EntandoApp 

1. Scale down the EntandoApp deployment to 0:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=0 -n YOUR-NAMESPACE
```

2. Edit the deployment YAML and add the environment variables listed below.  
**Note:** For `REDIS_ADDRESSES`, note the Sentinel node's logs that list the domain names of the Redis cluster instances. List the master first, then the replicas as shown in this example. 

``` yaml
spec:
  containers:
    - env:
      - name: REDIS_ACTIVE
        value: "true"
      - name: REDIS_ADDRESSES
        value: redis-node-0.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379,redis-node-1.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379,redis-node-2.redis-headless.YOUR-NAMESPACE.svc.cluster.local:26379
      - name: REDIS_SESSION_ACTIVE 
        value: "true"
```

3. Scale the deployment back up to 1 or more replicas:
``` bash
kubectl scale deploy/YOUR-APP-NAME-deployment --replicas=1 -n YOUR-NAMESPACE
```

4. To check that your Redis is running as expected, shell into the `redis-node-0` pod, then execute `redis-cli`. Run `KEYS *` to list all current keys present in the cache. 

## Additional Settings
1. Use a password for Redis  
If a password was used in your Redis `values.yaml` file, an additional environment variable is required in the EntandoApp deployment image. 

``` yaml
spec:
  containers:
    - env:
      - name: REDIS_PASSWORD
        valueFrom:
          secretKeyRef:
            key: YOUR_REDIS_PASSWORD_KEY
            name: YOUR-REDIS-SECRET-NAME
            optional: false
```

2. Monitor Redis  
When Redis Sentinel is active, Sentinel monitoring can be utilized to trigger an automatic failover process by using an additional environment variable in the EntandoApp deployment image. 

``` yaml
spec:
  containers:
    - env:
      - name: REDIS_USE_SENTINEL_EVENTS
        value: "true" 
```
If this env variable is set to `true`, the Sentinel failover process for electing a new master will be used when a master node becomes unreachable. 

When the variable is set to `false`, the application doesn't subscribe to the events but uses a scheduler to periodically check the master IP to detect if the master has changed. This can be useful as a fallback method in case of a problem with events detections.
