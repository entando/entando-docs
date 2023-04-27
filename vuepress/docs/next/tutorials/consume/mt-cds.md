---
sidebarDepth: 2
---

# Content Delivery Server for Multitenancy
You can create a content delivery server (CDS) using descriptors or a custom script to set up the configuration. Then adapt the Entando App Engine to integrate the service for your multitenant application. This tutorial applies descriptors to build the CDS.

## Prerequisites
* [A working instance of Entando.](../../../docs/getting-started/README.md) with the default Tomcat server image.

## Create the CDS Descriptors
Descriptors for Keycloak access, ingress, service/deployment, and persistent volume claim are required for the CDS.

### Keycloak Descriptor YAML
1. Go to Keycloak admin console and log in
2. From the left sidebar, `Realm Settings` → `Keys`. Click on `Public Key` for `rsa-generated` provider and copy the content.

<details><summary><b>Alternate Method to find the Public Key</b></summary>

1. Retrieve you ingress:
```
kubectl get ing | grep default-sso | awk '{print $3} 
```
The result of this query will be YOUR-INGRESS

2. Retrieve your public key:

```
curl "http://YOUR-INGRESS/auth/realms/YOUR-NAMESPACE" | jq '.public_key'
```

</details>

3. Add the public key to your descriptor file, following the example shown here: 

``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: YOUR-KC-SECRET
  namespace: YOUR-NAMESPACE
type: Opaque
stringData:
  KC_PUBLIC_KEY: "YOUR-PUBLIC-KEY"
```

### Persistent Volume Claim Descriptor
This descriptor should provide specifications for the persistent volume claim, including accessModes and resources storage limits. 

``` yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    deployment: YOUR-CDS-DEPLOYMENT
  name: YOUR-PVC-CLAIM
  namespace: YOUR-NAMESPACE
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    limits:
      storage: PVC-SIZE
    requests:
      storage: PVC-SIZE
```

### Service and Deployment Descriptor
Create the service and deployment descriptor YAML with the specifications required for your environment in a K3s implementation.

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: YOUR-CDS-DEPLOYMENT
  namespace: YOUR-NAMESPACE
  labels:
    app: YOUR-CDS-DEPLOYMENT
spec:
  ports:
    - port: 8080
      name: internal-port
      protocol: TCP
      targetPort: 8080
    - port: 8081
      name: public-port
      protocol: TCP
      targetPort: 8081
  selector:
    app: YOUR-CDS-DEPLOYMENT
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: YOUR-CDS-DEPLOYMENT
  namespace: YOUR-NAMESPACE
  labels:
    app: YOUR-CDS-DEPLOYMENT
spec:
  selector:
    matchLabels:
      app: YOUR-CDS-DEPLOYMENT
  template:
    metadata:
      labels:
        app: YOUR-CDS-DEPLOYMENT
    spec:
      containers:
        - readinessProbe:
            httpGet:
              port: 8081
              path: /health/health_check
              scheme: HTTP
            failureThreshold: 1
            initialDelaySeconds: 5
            periodSeconds: 5
            successThreshold: 1
            timeoutSeconds: 5
          env:
            - name: RUST_LOG
              value: actix_web=info,actix_server=info,actix_web_middleware_keycloak_auth=trace
            - name: KEYCLOAK_PUBLIC_KEY
              valueFrom:
                secretKeyRef:
                  key: KC_PUBLIC_KEY
                  name: YOUR-PUBLIC-KEY
            - name: CORS_ALLOWED_ORIGIN # use for external CDS service
              value: All # enter your Entando app domain name
            - name: CORS_ALLOWED_ORIGIN_END_WITH # use for wildcard domain name
              value: "$CORS" # enter wildcard domain name for your Entando app, e.g. *domain.com
          name: cds
          image: docker.io/entando/cds:1.0.4
          imagePullPolicy: IfNotPresent
          livenessProbe:
            httpGet:
              scheme: HTTP
              port: 8081
              path: /health/health_check
            timeoutSeconds: 5
            successThreshold: 1
            periodSeconds: 30
            initialDelaySeconds: 5
            failureThreshold: 1
          ports:
            - containerPort: 8080
              name: internal-port
            - containerPort: 8081
              name: public-port
          resources:
            limits:
              cpu: 500m
              memory: 500Mi
            requests:
              cpu: 500m
              memory: 500Mi
          volumeMounts:
            - mountPath: /entando-data
              name: cds-data-volume
      volumes:
        - name: cds-data-volume
          persistentVolumeClaim:
            claimName: YOUR-PVC-CLAIM
            readOnly: false
  replicas: 1
```

### Ingress Descriptor
``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: YOUR-INGRESS-NAME
  namespace: YOUR-NAMSPACE
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header X-Scheme \$scheme;
      proxy_set_header X-Forwarded-Proto \$scheme;
      add_header Content-Security-Policy upgrade-insecure-requests;
    nginx.ingress.kubernetes.io/proxy-body-size: "150m" # edit according to the file size you require

    nginx.org/client-max-body-size: "150m" # edit according to the file size you require
spec:
  $INGRESS_CLASS_FIELD
  rules:
    - host: cds-YOUR-APP-NAME.YOUR-HOST-ADDRESS
      http:
        paths:
          - backend:
              service:
                name: YOUR-APP-NAME-cds-YOUR-TENANT-CODE-service
                port:
                  number: 8081
            pathType: Prefix
            path: /$TN
          - backend:
              service:
                name: $APP-cds-$TN-service
                port:
                  number: 8080
            pathType: Prefix
            path: /api/v1/
#  tls: # Optional; if used, the user needs to customize the Entando operator ConfigMap to also use TLS
#    - hosts:
#        - cds-$APP.$HOST
#      secretName: cds-tls
```

<details><summary><b>Alternate ConfigMap for TLS</b></summary>

This example ConfigMap is suggested for direct integration on Kubernetes.
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: entando-operator-config
data:
  entando.pod.completion.timeout.seconds: "2000"
  entando.pod.readiness.timeout.seconds: "2000"
  entando.requires.filesystem.group.override: "true"
  entando.ingress.class: "nginx"
  entando.tls.secret.name: YOUR-TLS-SECRET

# More..
#  entando.k8s.operator.image.pull.secrets: sample-pull-secret
#  entando.docker.registry.override: "docker.io"
#  entando.ca.secret.name: sample-ca-cert-secret
#  entando.assume.external.https.provider: "true"
#  entando.k8s.operator.impose.limits: "true"
```

</details>

## Apply the Descriptors
Install the CDS descriptors in the order listed below.
``` bash
kubectl apply -f YOUR-CDS-PVC.yaml
kubectl apply -f YOUR-CDS-KEYCLOAK-SECRET.yaml
kubectl apply -f YOUR-CDS-DEPLOYMENT.yaml
kubectl apply -f YOUR-CDS-INGRESS.yaml
```
**can these be done at once**

## Create the Assets Archive 
Create an archive of the resources and assets for your application.  Within it, the resources folder must be named `public` and sensitive information should be stored in the `private` folder.

## APIs
Create API requests to include these fields:
 * `CDS_PATH` : # the base path of the new CDS
 * `KC_URI` : # the url of token service of the tenant1 realm
 * `KC_CLIENT_ID` : # the clientId of the reserved client used by the entando-de-app in tenant1 realm
 **what is the reserved client???**
 * `KC_CLIENT_SECRET` : # the secret of that client

## Configure the Entando App Engine
1. Scale to 0 the de-app deployment
2. Open `entando-de-app` and add these environment variables using the :
``` yaml
spec:
   env:
     - name: CDS_ENABLED
       value: "true"
     - name: CDS_PUBLIC_URL
       value: http://cds.YOUR-HOSTNAME/primary
     - name: CDS_PRIVATE_URL
       value: http://cds:8080
     - name: CDS_PATH
       value: /api/v1
```
3. Delete the following two volume specifications related to the quickstart deployment:
``` yaml
 volumeMounts:
        - mountPath: /entando-data
          name: quickstart-server-volume
```
``` yaml
 volumes:
      - name: quickstart-server-volume
        persistentVolumeClaim:
          claimName: quickstart-server-pvc
```

4. Scale the `entando-de-app` deployment back to 1 and check the system. The assets and resources provided by the portal UI should be served by the CDS service.


