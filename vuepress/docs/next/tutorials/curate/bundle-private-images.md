---
sidebarDepth: 2
---

# Install Bundle from a Private Image Repository

This tutorial provides to way to utilize bundles from a private image repository in your Entando projects. Private repositories require user authentication and the steps below use environment variables to pass the Secret for authentication.

**New or Existing Bundle**
* If you have an existing bundle in a private image repository, start at Step 1: Create the Registry Credentials. 
* If you are starting a new project, start at [Step 2: Create and Apply the Secret](#step-2-create-and-apply-the-secret).

## Prerequisites

* [A working instance of Entando](../../../docs/getting-started/)
* Verify dependencies with the [Entando CLI](../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

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

2. Convert the JSON configuration into a base64 string  

### Step 2: Create and Apply the Secret
1. Create a `container-registry-secret.yaml` in your namespace with the following snippet. Make sure to replace the registryCredential value with your own. 
``` yaml
kind: Secret
apiVersion: v1
metadata:
   name: container-registry-secret
type: Opaque
data:
   registryCredentials: "ewrCoMKgImF1dGhzIjogewrCoMKgwqDCoCJyZWdpc3RyeS5odWIuZG9ja2VyLmNvbS9qeXVubWl0Y2hlbGwvOjgwODUiOiB7CsKgwqDCoMKgwqDCoMKgwqAidXNlcm5hbWUiOiAianl1bm1pdGNoZWxsIiwKwqDCoMKgwqDCoMKgwqDCoCJwYXNzd29yZCI6ICJKeW0xMTIyMzM9IgrCoMKgwqDCoH0KwqDCoH0KfQ=="
```

2. Apply the registry Secret YAML to your Entando instance.
``` sh
kubectl apply -f container-registry-secret.yaml -n YOUR-NAMESPACE
```

### Step 3: Add the Environment Variable and Deploy 
1. Add the environment variable, ENTANDO_CONTAINER_REGISTRY_CREDENTIALS, to your EntandoApp CR. To edit the EntandoApp:
``` sh
kubectl get EntandoApp -n YOUR-NAMESPACE
kubectl edit EntandoApp/quickstart -n YOUR-NAMESPACE
```
2. Add the environmentVariables under the spec property as shown here:
``` yaml
kind: EntandoApp
spec:
     environmentVariables:
       - name: ENTANDO_CONTAINER_REGISTRY_CREDENTIALS
         valueFrom:
            secretKeyRef:
               name: container-registry-secret
               key: registryCredentials

```
3. Add the following to the Entando Component Manager deployment to set the HOME variable:
``` yaml
kind: Deployment
spec:
   environmentVariables:
     - name: HOME
       value: /deployment
```

4. Deploy and install the bundle into Entando
```
ent bundle deploy
ent bundle install
```
**Next Steps**
* Learn to [create a page](../compose/page-management.md) in the Entando App Builder.
* Learn to [Add REST APIs](../devops/add-rest-api.md) on Entando.