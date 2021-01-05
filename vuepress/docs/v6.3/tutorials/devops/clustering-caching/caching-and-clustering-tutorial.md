# Caching and Clustering

The tutorials below cover the basic steps to setup and validate a clustered instance of the Entando App Engine.

> **NOTE**
>
> When building your deployment architecture it is importatnt to review your goals, hardware, networking, and application specific setup and to optimize your   App Engine deployment for your environment. None of the configurations or deployments below will address every type of application or every type of deployment  but the configuration and testing should be used as building blocks to create a deployment architecture that works for your application.

## Clustering

This tutorial reviews setting up a clustered Entando App Engine using the default Infinispan Library Mode deployment that ships with the quickstart App Engine in the `entando-de-app`. The goal of the tutorial is to deploy a clustered instance of the App Engine and verify that we have a high availability and scalable deployment of the application

### Prerequisites
- An existing deployment of an Entando App or the ability to create a new one
    - If you haven't created a deployment yet or don't have a yaml file for an Entando deployment follow the quickstart here.
- The Entando deployment must use an RDBMS. Clustered instances will not work correctly with in memory databases and a `dbms: none` configuration.

### Creating a Clustered App Instance
1. Create an Entando deployment via the helm template or edit an existing deployment yaml file.
2. Edit the deployment and find the `EntandoApp` in the yaml file (towards the bottom).
    - If you're editing an existing deployment you can use `kubectl edit <deployment>` or you can edit the deployment prior to kicking off the installation.

```
- kind: "EntandoApp"
      metadata:
        annotations: {}
        labels: {}
        name: "quickstart"
      spec:
        dbms: postgresql
        replicas: 1
        standardServerImage: wildfly
        ingressPath: /entando-de-app
```

3. In the `EntandoApp` change the number of replicas to 2 (or more as desired)
4. Save the file
5. Deploy the application or wait for the application to update if editing an existing deployment
6. Run `kubectl get pods -n <your namespace>` to view the pods in your deployment
7. You should have two `server-deployment` instances in your namespace with three pods each. See the screenshot below

![Deployment](./multiple-deployment.png)

8. Finally, you can look in the logs of the `server-container` in either pod and you will see logging related to different instance joining the cluster and balancing the data between the instances. See the screenshot for an example. Your actual logs will vary:

![Clustered Logs](./clustered-logs.png)

The tutorials below will take you through validating and testing the clustered and cached instances.

> **NOTE**
>If you are on Openshift you can use the Scale Up arrows and other settings available in the OpenShift console if you prefer

TODO - CRC screenshot

### Validating the Clustered Instances
This is an advanced tutorial and is not required or recommended for most deployment scenarios or users.

This tutorial will walk you through steps to validate that the clustered instances are working in your environment and that you have created a high availability deployment. There are many ways to validate your clustering.

1. Complete the [creating a clustered instance tutorial](#creating-a-clustered-app-instance) above or have an existing clustered Entando App instance available for testing
2. Get the URL for your `entando-de-app` with `kubectl get ingress -n <your namespace>`
3. Open the URL in a browser of your choice and ensure that the application is working
4. Open a new browser window in an incognito or private browsing mode.  do not navigate to the app
    - The only reason for private mode is to ensure that no data is cached and you're receiving a copy of the running application
5. In the next steps you'll delete a pod in your cluster and verify that your application is still getting served. Kubernetes will automatically restore the desired number of replicas so you'll need to perform the validation test before the new replica is launched. In most environments this will be around one minute but it will vary.
6. Delete one of the server deployment pods in your clustered instances with `kubectl delete <pod-name> -n <your namespace>`
    - There are other ways to do this. You could also shell into the server-container and manually kill the running app process with `kill -9 357`.
    - If you wanted to test at the hardware level you could manually terminate a node in your cluster (ensuring that the pods are scheduled to different nodes)
7. In your private/incognito browser window open the URL to your `entando-de-app`
8. See that the application continues to render while the pod you deleted is no longer present
9. Wait for Kubernetes to restore your deleted pod
10. Check that the application continues to render after the pods are restored

### Caching Validation
Validating the shared cache can be done in a similar fashion to the clustered instance validation. The high level steps are:

1. Deploy a clustered instances (see [creating a clustered instance tutorial](#creating-a-clustered-app-instance))
2. Create data using the app builder (pages, page templates, content etc.) using the external route for the application
3. Take note in the logs of which instance processed the request
4. Terminate that instance
5. Fetch the data created and ensure that the recently created data is returned

Another option for validating the shared cache involves creating a custom deployment with two distinct Entando App instances. In this scenario you would not use the `replicas` option in the deployment. This has the benefit of keeping all of the instances running and validating the configuration by creating distinct pods for the Entando App Engine so that each instance can be exposed on endpoints separately.

The high level steps for this setup are:

1. Create two different instances of the `EntandoApp` component inside of the `EntandoCompositeApp` in your deployment
2. Configure both EntandoApp instances to use the same database and JGroups configuration (if using Infinispan)
3. Deploy the application
4. Expose the separately deployed `EntandoApp` instances with distinct endpoints
5. Create data in one instance via the App Builder or via API
6. Validate that the App Builder returns the same data in the other instance

A partial example of that deployment:

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
          - name: PORTDB_URL
            value: jdbc:postgresql://quickstart-postgresql-db-service.test.svc.cluster.local:5432/quickstart_postgresql_db
          - name: PORTDB_USERNAME
            valueFrom:
              secretKeyRef:
                key: username
                name: quickstart1-portdb-secret
                optional: false
          - name: PORTDB_PASSWORD
            valueFrom:
              secretKeyRef:
                key: password
                name: quickstart1-portdb-secret
                optional: false
          - name: PORTDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: PORTDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
          - name: SERVDB_URL
            value: jdbc:postgresql://quickstart-postgresql-db-service.test.svc.cluster.local:5432/quickstart_postgresql_db
          - name: SERVDB_USERNAME
            valueFrom:
              secretKeyRef:
                key: username
                name: quickstart1-servdb-secret
                optional: false
          - name: SERVDB_PASSWORD
            valueFrom:
              secretKeyRef:
                key: password
                name: quickstart1-servdb-secret
                optional: false
          - name: SERVDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: SERVDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
          - name: JGROUPS_CLUSTER_PASSWORD
            value: xxxxxxxx
          - name: OPENSHIFT_KUBE_PING_LABELS
            value: EntandoResourceKind=EntandoApp
          - name: KUBERNETES_LABELS
            value: EntandoResourceKind=EntandoApp
          - name: POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
    - kind: "EntandoApp"
      metadata:
        annotations: {}
        labels: {}
        name: "quickstart2"
      spec:
        dbms: none
        replicas: 1
        standardServerImage: wildfly
        ingressPath: /entando-de-app
        ingressHostName: my.host.name
        environmentVariables:
          - name: SPRING_PROFILES_ACTIVE
            value: "default,swagger"
          - name: PORTDB_URL
            value: jdbc:postgresql://quickstart-postgresql-db-service.test.svc.cluster.local:5432/quickstart_postgresql_db
          - name: PORTDB_USERNAME
            valueFrom:
              secretKeyRef:
                key: username
                name: quickstart1-portdb-secret
                optional: false
          - name: PORTDB_PASSWORD
            valueFrom:
              secretKeyRef:
                key: password
                name: quickstart1-portdb-secret
                optional: false
          - name: PORTDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: PORTDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
          - name: SERVDB_URL
            value: jdbc:postgresql://quickstart-postgresql-db-service.test.svc.cluster.local:5432/quickstart_postgresql_db
          - name: SERVDB_USERNAME
            valueFrom:
              secretKeyRef:
                key: username
                name: quickstart1-servdb-secret
                optional: false
          - name: SERVDB_PASSWORD
            valueFrom:
              secretKeyRef:
                key: password
                name: quickstart1-servdb-secret
                optional: false
          - name: SERVDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: SERVDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
          - name: JGROUPS_CLUSTER_PASSWORD
            value: xxxxxxxx
          - name: OPENSHIFT_KUBE_PING_LABELS
            value: EntandoResourceKind=EntandoApp
          - name: POD_IP
            valueFrom:
              fieldRef:
                fieldPath: status.podIP
```

### Configuring and Deploying with Redis
