---
sidebarDepth: 2
---

# Content Delivery Server for Multitenancy
To create a content delivery server (CDS), use descriptors or a custom script to set up the configuration. A CDS is required for a multitenant application. Then the Entando App Engine deployment is edited to integrate the service. This tutorial describes the steps required to create and apply the CDS descriptors to support a multitenant application.

## Prerequisites
* [A working instance of Entando.](../../../docs/getting-started/README.md) with the default Tomcat server image.

* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Create the CDS Descriptors
Descriptors for Keycloak access, ingress, service/deployment, and persistent volume claim are required for the CDS.

Here is a list of placeholders that will need to be replaced in the descriptor files. Use names that describe your primary tenant and the service it pertains to. 
| Placeholder | Descriptions 
|:--|:--
| YOUR-APPNAME | Your app name, or the name of the entando-de-app deployment
| YOUR-HOSTNAME | Host name (e.g., k8s-entando.org)
| YOUR-NAMESPACE | Namespace used for the multitenancy application
| YOUR-PRIMARY-KC-SECRET | Name of Keycloak secret for the primary tenant
| YOUR-PRIMARY-CDS-DEPLOYMENT | CDS deployment for the primary tenant
| YOUR-PRIMARY-PVC | Name of PVC claim of the primary tenant
| YOUR-PRIMARY-CDS-SERVICE | The CDS service for the primary tenant
| YOUR-PRIMARY-CDS-DEPLOYMENT | The CDS deployment of the primary tenant
| YOUR-PRIMARY-CDS-INGRESS | The CDS ingress for the primary tenant
| YOUR-PRIMARY-TENANT | Name of the primary tenant and primary tenant code 
| YOUR-PUBLIC-KEY | Keycloak RSA generated string for your realm

### Keycloak Descriptor YAML
1. Go to Keycloak admin console and log in
2. From the left sidebar, `Realm Settings` → `Keys`. Click on `Public Key` for `rsa-generated` provider and copy the content.

3. Create a descriptor using this example. Replace `YOUR-PUBLIC-KEY` with the result from the previous step, following the `---BEGIN ... END---\n` format shown below:

``` yaml
apiVersion: v1
kind: Secret
metadata:
  name: YOUR-PRIMARY-KC-SECRET
  namespace: YOUR-NAMESPACE
type: Opaque
stringData:
  KC_PUBLIC_KEY: "-----BEGIN PUBLIC KEY-----\nYOUR-PUBLIC-KEY\n-----END PUBLIC KEY-----\n"
```

### Persistent Volume Claim Descriptor
This descriptor should provide specifications for the persistent volume claim, including accessModes and resources storage limits. 

``` yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  labels:
    deployment: YOUR-PRIMARY-CDS-DEPLOYMENT
  name: YOUR-PRIMARY-PVC
  namespace: YOUR-NAMESPACE
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    limits:
      storage: 1Gi
    requests:
      storage: 1Gi
```

### Service and Deployment Descriptor
Create the service and deployment descriptor YAML with the specifications required for your environment in a K3s implementation. For convenience, the service and deployment has been combined into a single descriptor `YOUR-PRIMARY-CDS-DEPLOYMENT.yaml`, but this is a matter of preference.

``` yaml
apiVersion: v1
kind: Service
metadata:
  name: YOUR-PRIMARY-CDS-SERVICE
  namespace: YOUR-NAMESPACE
  labels:
    app: YOUR-PRIMARY-CDS-SERVICE
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
    app: YOUR-PRIMARY-CDS-DEPLOYMENT
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: YOUR-PRIMARY-CDS-DEPLOYMENT
  namespace: YOUR-NAMESPACE
  labels:
    app: YOUR-PRIMARY-CDS-DEPLOYMENT
spec:
  selector:
    matchLabels:
      app: YOUR-PRIMARY-CDS-DEPLOYMENT
  template:
    metadata:
      labels:
        app: YOUR-PRIMARY-CDS-DEPLOYMENT
    spec:
      initContainers:
	        - name: init-cds-data
	           image: busybox
	           imagePullPolicy: IfNotPresent
	           command: ['sh', '-c', 'wget --no-check-certificate https://raw.github.com/entando-ps/cds/pr-it-317/entando-data/entando720.tar.gz; tar -xf entando720.tar.gz; rm entando720.tar.gz ']
	           volumeMounts:
	             - mountPath: /entando-data
	               name: cds-data-volume
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
                  name: YOUR-PRIMARY-KC-SECRET
            - name: CORS_ALLOWED_ORIGIN # # use for external CDS service
              value: All # enter your Entando app domain name
            - name: CORS_ALLOWED_ORIGIN_END_WITH # use for wildcard domain name
              value: "YOUR-CORS-BASEURL" # enter wildcard domain name for your Entando app, e.g. "nip.io"
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
            claimName: YOUR-PRIMARY-PVC
            readOnly: false
  replicas: 1
```

### Ingress Descriptor
``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: YOUR-PRIMARY-CDS-INGRESS
  namespace: YOUR-NAMESPACE
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |
      proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
      proxy_set_header X-Scheme \$scheme;
      proxy_set_header X-Forwarded-Proto \$scheme;
      add_header Content-Security-Policy upgrade-insecure-requests;
    nginx.ingress.kubernetes.io/proxy-body-size: "150m" # edit according to the file size you require

    nginx.org/client-max-body-size: "150m" # edit according to the file size you require
spec:
  ingressClassName: nginx
  rules:
    - host: cds-YOUR-APP-NAME.YOUR-HOSTNAME
      http:
        paths:
          - backend:
              service:
                name: YOUR-PRIMARY-CDS-SERVICE
                port:
                  number: 8081
            pathType: Prefix
            path: /YOUR-PRIMARY-CDS-SERVICE ** is this correct?? **
          - backend:
              service:
                name: YOUR-PRIMARY-CDS-SERVICE
                port:
                  number: 8080
            pathType: Prefix
            path: /api/v1/
#  tls: # Optional; the user needs to customize the Entando operator ConfigMap to also use TLS is used here
#    - hosts:
#        - cds-YOUR-APP-NAME.YOUR-HOSTNAME 
#      secretName: cds-tls ** should this be YOUR-TLS-SECRET **
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
Install the CDS descriptors in the order listed below:
``` bash
kubectl apply -f YOUR-PRIMARY-PVC.yaml -n YOUR-NAMESPACE
kubectl apply -f YOUR-PRIMARY-KC-SECRET.yaml -n YOUR-NAMESPACE
kubectl apply -f YOUR-PRIMARY-CDS-DEPLOYMENT.yaml -n YOUR-NAMESPACE
kubectl apply -f YOUR-PRIMARY-CDS-INGRESS.yaml -n YOUR-NAMESPACE
```

## Configure the Entando App Engine
1. Scale to 0 the de-app deployment
2. Open `entando-de-app` and add these environment variables:
``` yaml
spec:
   env:
     - name: CDS_ENABLED
       value: "true"
     - name: CDS_PUBLIC_URL
       value: http://cds-YOUR-APP-NAME.YOUR-HOSTNAME/YOUR-PRIMARY-TENANT 
     - name: CDS_PRIVATE_URL
       value: http://cds:8080
     - name: CDS_PATH
       value: /api/v1
```
3. Delete the following two volume specifications related to the original `entando-de-app` deployment:
``` yaml
 volumeMounts:
        - mountPath: /entando-data
          name: YOUR-APPNAME-server-volume
```
``` yaml
 volumes:
      - name: YOUR-APPNAME-server-volume
        persistentVolumeClaim:
          claimName: YOUR-APPNAME-server-pvc
```

4. Scale the deployment back to 1 and check the system. The assets and resources provided by the portal UI should be served by the CDS service.

## Create the Assets Archive 
Create an archive of the resources and assets for your application.  Within it, the resources folder must be named `public` and sensitive information should be stored in the `private` folder.

## APIs
