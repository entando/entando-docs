---
sidebarDepth: 2
---

# Content Delivery Server (CDS) Integration


You can use a client software or a custom script to set up the content deliver service for your application.


## Setting up the CDS

### Descriptors
Typically, four descriptors are required for the CDS, as described below. 

#### Keycloak Descriptor YAML
1. Go to Keycloak admin console and log in
2. From the left sidebar, `Realm Settings` → `Keys`. Click on `public Key for `rsa-generated` provider and copy the content.
3. Copy this public key to the descriptor file as shown in the sample below. 

---

<details><summary><b>Sample Keycloak Descriptor</b></summary>
 

``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: YOUR-KC-SECRET
  namespace: YOUR-NAMESPACE
type: Opaque
stringData:
  KC_PUBLIC_KEY: "YOUR-PUBLIC-KEY"
  // YOUR-PUBLIC-KEY will be a base64 encoded string
```
</details>

---


#### Persistent Volume Descriptor
The cds-pvc.yaml should provide specificationS for the persistent volume claim including accessModes and resources storage limits. 

```
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
  #storageClassName: standard
```

#### Deployment Descriptor
Create the deployment descriptor YAML with the specifications required for your environment in a K3s implementation.

```
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
            - name: CORS_ALLOWED_ORIGIN
              value: All
            - name: CORS_ALLOWED_ORIGIN_END_WITH
              value: "$CORS"
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
              cpu: 1000m
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

#### Ingress Descriptor
```
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
    nginx.ingress.kubernetes.io/proxy-body-size: "150m"
    nginx.org/client-max-body-size: "150m"
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
#  tls:
#    - hosts:
#        - cds-$APP.$HOST
#      secretName: cds-tls
```

### Resource and Assets Archive 
You will need an archive of the resources and assets required by your application.  
In the archive, the resources folder must be named `public` and a confidential information must be provided in the `private` folder.

### APIs or Postman example steps???

## Configure the Entando App Engine
1. scale to 0 the de-app deployment
2. open deployment of de-app and add these variables (check the right value of CDS_PUBLIC_URL):
```
    - name: CDS_ENABLED
      value: "true"
    - name: CDS_PUBLIC_URL
      value: http://cds.10-219-168-241.nip.io/primary
    - name: CDS_PRIVATE_URL
      value: http://cds:8080
    - name: CDS_PATH
      value: /api/v1

3. scale to 1 the de-app deployment and check the system, that the assets/resources provided by portal-ui are served by their CDS service
