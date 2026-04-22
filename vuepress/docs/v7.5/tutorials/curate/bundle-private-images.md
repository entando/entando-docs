---
sidebarDepth: 2
---

# Install Bundle from a Private Image Registry

This tutorial provides to way to utilize bundles from a private image registry in your Entando projects. The steps below use environment variables to pass the Secret for the authentication required by private registries.

For microservices in a private image registry, follow the [install guide here](ms-private-images.md).

## Prerequisites

* [A working instance of Entando](../../../docs/getting-started/)
* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Tutorial
### Step 1: Create the Registry Credentials
1. Create the registry JSON configuration using your registry and credentials on the port of your choice: 
``` json
{
  "auths": {
    "YOUR-REGISTRY.com": {
       "username": "YOUR-USERNAME",
       "password": "YOUR-PASSWORD"
    }
  }
}
```
2. [Convert the JSON configuration into a base64 string](https://www.base64encode.org/)  

### Step 2: Create and Apply the Secret
1. Create `container-registry-secret.yaml` in your namespace with the following snippet. Replace the registryCredentials value with your own.
``` yaml
kind: Secret
apiVersion: v1
metadata:
   name: container-registry-secret
type: Opaque
data:
   registryCredentials: "ewogICJhdXRocyI6IHsKICAgICJyZWdpc3RyeS5odWIuZG9ja2VyLmNvbSI6IHsKICAgICAgICAidXNlcm5hbWUiOiAidGVzdG5hbWV4eHgiLAogICAgICAgICJwYXNzd29yZCI6ICJUZXN0bmFtZXBhc3N3ZCIKfQp9Cn0="
```

2. Apply the registry Secret YAML to your Entando instance, replacing the namespace with your own as needed:
```sh
ent kubectl apply -f container-registry-secret.yaml -n entando
```

### Step 3: Add the Environment Variable and Deploy 
1. Add the environment variable, ENTANDO_CONTAINER_REGISTRY_CREDENTIALS, to your EntandoApp custom resource. To edit the EntandoApp using your namespace:
``` sh
ent kubectl get EntandoApp -n entando
ent kubectl edit EntandoApp/quickstart -n entando
```
2. Add the `environmentVariables` under the spec property as shown here:
```yaml
kind: EntandoApp
spec:
     environmentVariables:
       - name: ENTANDO_CONTAINER_REGISTRY_CREDENTIALS
         valueFrom:
            secretKeyRef:
               name: container-registry-secret
               key: registryCredentials

```
3. (Entando 7.1.0-7.1.1 only) The Component Manager (CM) deployment requires modification due to an open issue. Scale the deployment down to 0, add the following spec for the HOME variable, and then restart the CM.
``` yaml
spec:
  containers:
  - env:
    - name: HOME
      value: /deployments
```

4. Deploy and install the bundle into Entando:
```
ent bundle deploy
ent bundle install
```

## Troubleshooting
### Self-signed Certificate
If your private registry is secured via a self-signed certificate, you need to configure a CA certificate to validate the registry to download the bundle.

1. Create an opaque Secret containing the base64 encoded value of the certificate, with `-----BEGIN CERTIFICATE-----` prefix and `-----END CERTIFICATE-----` suffix, shown in the following example.

``` yaml 
apiVersion: v1
data:
  registry.eng-entando.com.crt: >-
    # your base64 root certificate
kind: Secret
metadata:
  name: YOUR-CA-CERT-SECRET
```
2. Apply the certificate Secret:

``` sh
kubectl apply -f YOUR-CA-CERT-SECRET.yaml -n entando
```

3. Edit `entando-operator-config` to add the certificate secret to the ConfigMap. 
```
kubectl get ConfigMap -n entandokubectl edit ConfigMap/entando-operator-config -n entando
```
  Add the `YOUR-CA-CERT-SECRET` under the data property to refer to your secret, as shown here:

``` yaml
  apiVersion: v1
  data:
    entando.ca.secret.name: YOUR-CA-CERT-SECRET
    entando.ingress.class: nginx
    entando.k8s.operator.image.pull.secrets: container-registry-secret
    entando.k8s.operator.impose.limits: "true"
    entando.requires.filesystem.group.override: "true"
    entando.tls.secret.name: test-fire-tls-secret
  kind: ConfigMap
  metadata:
    name: entando-operator-config
    namespace: entando
```

**Next Steps**
* [Install Microservices from a Private Image Registry](ms-private-images.md).
* Learn how to [create a page](../compose/page-management.md) in the Entando App Builder.

