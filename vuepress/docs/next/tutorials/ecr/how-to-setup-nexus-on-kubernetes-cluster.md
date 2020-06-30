# How to setup a Nexus instance on a Kubernetes cluster

## Requirements

-   A kubernetes cluster (that could be minikube, minishift, microk8s,
    etc.)

-   A dedicated namespace for nexus (we are going to use `nexus` as
    target namespace)

## Steps

### 1. Create a namespace for nexus

We are going to deploy our nexus instance on a namespace called `nexus`

    kubectl create namespace nexus

### 2. Create the deployment file.

Let’s create a **Deployment.yaml** file to describe our nexus
deployment.

Here things get a little bit different between nexus 2.x and nexus 3.x.
In both cases though we are going to use a volume mount for nexus-data,
remember that this is going to be removed when the pod is removed. In
production you should probably use some kind of persistent data.

#### Nexus 2.x

Here we are passing a few customizable ENV variable and adding a volume
mount for nexus data.

**Deployment.yaml.**

        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: nexus
          namespace: nexus
        spec:
          replicas: 1
          template:
            metadata:
              labels:
                app: nexus-server
            spec:
              containers:
                - name: nexus
                  image: sonatype/nexus:latest
                  env:
                  - name: MAX_HEAP
                    value: "800m"
                  - name: MIN_HEAP
                    value: "300m"
                  resources:
                    limits:
                      memory: "4Gi"
                      cpu: "1000m"
                    requests:
                      memory: "2Gi"
                      cpu: "500m"
                  ports:
                    - containerPort: 8081
                  volumeMounts:
                    - name: nexus-data
                      mountPath: /sonatype-work
              volumes:
                - name: nexus-data
                  emptyDir: {}

#### Nexus 3.x

For Nexus 3.x we dont use any custom env variables. You can check the
official docker repo for the supported env variables.

**Deployment.yaml.**

        apiVersion: extensions/v1beta1
        kind: Deployment
        metadata:
          name: nexus
          namespace: nexus
        spec:
          replicas: 1
          selector:
            matchLabels:
                app: nexus-server
          template:
            metadata:
              labels:
                app: nexus-server
            spec:
              containers:
                - name: nexus
                  image: sonatype/nexus3:latest
                  resources:
                    limits:
                      memory: "4Gi"
                      cpu: "1000m"
                    requests:
                      memory: "2Gi"
                      cpu: "500m"
                  ports:
                    - containerPort: 8081
                  volumeMounts:
                    - name: nexus-data
                      mountPath: /nexus-data
              volumes:
                - name: nexus-data
                  emptyDir: {}

### 3. Create the deployment

Now let’s create the deployment

    kubectl create -f Deployment.yaml

You can check the deployment pod status with

    kubectl get pod -n nexus

### 4. Create a service for nexus

Now you need to create a **Service.yaml** file that will to expose the
nexus endpoint using NodePort.

> **Note**
>
> If you are on a cloud, you can expose the service using a load
> balancer using the service type Loadbalancer. Also, the Prometheus
> annotations will help in service endpoint monitoring by Prometheus.

**Service.yaml.**

    apiVersion: v1
    kind: Service
    metadata:
      name: nexus-service
      namespace: devops-tools
      annotations:
          prometheus.io/scrape: 'true'
          prometheus.io/path:   /
          prometheus.io/port:   '8081'
    spec:
      selector:
        app: nexus-server
      type: NodePort
      ports:
        - port: 8081
          targetPort: 8081
          nodePort: 32000

Now you can create the service

    kubectl create -f Service.yaml

Check the service configuration using kubectl.

    kubectl describe service nexus-service -n devops-tools

### 5. Access nexus

Now you will be able to access nexus on any of the Kubernetes node IP on
port 32000/nexus as we have exposed the node port. For example,

<table>
<colgroup>
<col width="50%" />
<col width="50%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left"><p>Service</p></td>
<td align="left"><p>Url</p></td>
</tr>
<tr class="even">
<td align="left"><p>Nexus 2</p></td>
<td align="left"><p><a href="http://35.144.130.153:32000/nexus">http://35.144.130.153:32000/nexus</a></p></td>
</tr>
<tr class="odd">
<td align="left"><p>Nexus 3</p></td>
<td align="left"><p><a href="http://35.144.130.153:32000">http://35.144.130.153:32000</a></p></td>
</tr>
</tbody>
</table>

> **Note**
>
> For Nexus 2.x and Nexus 3 \< 3.17 the default username and password
> will be admin & admin123, while for Nexus 3 \>= 3.17 you need to get
> the password from within the container with
> `cat /nexus-data/admin.password`

