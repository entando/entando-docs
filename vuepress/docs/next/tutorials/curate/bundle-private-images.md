---
sidebarDepth: 2
---

# Install Bundle from a Private Image Registry

This tutorial provides to way to utilize bundles from a private image registry in your Entando projects. The steps below use environment variables to pass the Secret for authentication required by private registries.

For microservices in a private image registry, follow the [install guide here](ms-private-images.md).

## Prerequisites

* [A working instance of Entando](../../../docs/getting-started/)
* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Tutorial
### Step 1: Create the Registry Credentials
1. Create the registry JSON configuration using your registry and credentials on the port of your choice: 
``` 
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
``` sh
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
**Next Steps**
* [Install Microservices from a Private Image Registry](ms-private-images.md).
* Learn how to [create a page](../compose/page-management.md) in the Entando App Builder.

