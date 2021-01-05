# Caching and Clustering

This tutorial covers deploying an Entando App Engine instance using Redis as a cache for data served by the app engine. For more information on the cache
configuration for the App Engine checkout the [reference documentation]()

## Deploy Redis to Kubernetes

1. Create the redis deployment and expose the endpoints

```sh
kubectl create deployment redis –-image=redis:6
```
```sh
kubectl expose replicaset.apps/redis-687488bdd4 --port=6379 --target-port=6379 -n <your namespace>
```

2. Install the Redis CLI for your environment: https://redis.io/topics/rediscli
3. Get the IP for your Redis deployment
```sh
kubectl get service -n <your namespace>
```
4. Validate your deployment

Should respond PONG
```sh
redis-cli -h 10.43.99.198 -p 6379 ping
```

Should increment each time
```sh
redis-cli -h 10.43.99.198 -p 6379 incr mycounter
```

## Configure implementation

1. Use git to clone the `entando-de-app` repository

```sh
git clone https://github.com/entando-k8s/entando-de-app
```

2. Fetch the tags and checkout the release tag and create a branch for your customization

```sh
git fetch --tags
```
```sh
git checkout tags/v6.3.22 -b 6.3-redis
```

3. Open the pom.xml file of the `entando-de-app`
4. Remove the Infinispan dependencies from the pom

```
<!-- infinispan -->
 <dependency>
     <groupId>org.infinispan</groupId>
     <artifactId>infinispan-core</artifactId>
     <version>9.4.8.Final</version>
 </dependency>
 <dependency>
     <groupId>org.infinispan</groupId>
     <artifactId>infinispan-commons</artifactId>
     <version>9.4.8.Final</version>
 </dependency>
```

5. Add the Redis caching plugin to the pom

```
<dependency>
    <groupId>org.entando.entando.plugins</groupId>
    <artifactId>entando-plugin-jpredis</artifactId>
    <type>war</type>
</dependency>
```

6. Save the pom
7. Build and push a custom image for the `entando-de-app` following [these steps]( https://entando.github.io/entando-docs/next/tutorials/devops/build-core-image.html#introduction)
8. Create or download a deployment file. For example, use the `entando.yaml` file from here TODO - reference helm or does CLI generate this?
9. Update the image in the deployment yaml file to point to your custom `entando-de-app` image with Redis. The line to change is in the ConfigMap and is noted below

```
entando-de-app-wildfly: >-
    {"version":"6.3.10","executable-type":"jvm","registry":"docker.io","organization":"entando"}
```

10. Add environment variables to the `EntandoApp` in the deployment yaml file for the Redis address and Redis password for your deployed Redis instance. The variables to create are:

```
REDIS_ADDRESS
```
```
REDIS_PASSWORD
```

For example,

>**NOTE**
> This example uses a secret for the `REDIS_PASSWORD` which is recommended. You can also hardcode the password in the yaml for testing, however, it is not > recommended for production. Create and use a secret for the password as best practice,

```
kind: "EntandoCompositeApp"
apiVersion: "entando.org/v1"
metadata:
  name: "quickstart-apps"
  namespace: test
entandoStatus:
  serverStatuses: {}
  entandoDeploymentPhase: "requested"
spec:
  components:
    - kind: "EntandoApp"
      metadata:
        annotations: {}
        labels: {}
        name: "quickstart1"
      spec:
        dbms: none
        replicas: 1
        standardServerImage: wildfly
        ingressPath: /entando-de-app
        ingressHostName: quickstart1.test.dynu.net
        environmentVariables:
          - name: REDIS_ADDRESS
            value: <your redis URI. For example redis://localhost:6379)
          - name: REDIS_PASSWORD
            valueFrom:
              secretKeyRef:
                key: password
                name: quickstart1-redis-secret
                optional: false
        ....
```
