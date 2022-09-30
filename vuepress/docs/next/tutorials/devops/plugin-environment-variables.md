---
sidebarDepth: 2
---

# Use Environment Variables to Customize Microservices

This tutorial describes how to use environment variables to customize the behavior of microservices. Using environment variables as a configuration mechanism allows the same Linux image to run in development and production environments. This is especially useful when managing sensitive information via Kubernetes Secrets.

The `entando.json` file makes environment variables available to a microservice in a docker-based bundle. There are two options:
1. Inject the variables using a key-value pair
2. Inject a reference to an existing Kubernetes Secret 

This tutorial will demonstrate both of these options. The microservice will receive one environment value directly as plain text in the pod YAML and the other indirectly through a referenced Secret.

## Prerequisites
* [A bundle project using the latest Entando Blueprint](../create/ms/generate-microservices-and-micro-frontends.md) 

## Add Environment Variables to the Microservice
1. To determine YOUR-BUNDLE-ID, run the following command from the root project directory. Supply the full bundle URL (including the .git suffix).
```sh
ent ecr get-bundle-id https://github.com/YOUR-ACCOUNT/YOUR-PLUGIN-BUNDLE.git
```

2. Create a Secret named `YOUR-BUNDLE-ID-my-secret` with key-value pair `mySecretKey=mySecretValue`. Replace YOUR-BUNDLE-ID with the output of the previous step. 
```sh
kubectl create secret generic YOUR-BUNDLE-ID-my-secret --from-literal=mySecretKey=mySecretValue -n entando
```

3. Insert the following `env` section into the microservice in `entando.json`, remembering to replace `YOUR-BUNDLE-ID`. By convention, environment variables are all caps and K8s resource names are hyphenated.
```json
"env": [
  {"name": "SIMPLE_VAR",
    "value":"mySimpleValue" 
  },
  { "name":"SECRET_VAR",
    "secretKeyRef":{
      "name":"YOUR-BUNDLE-ID-my-secret", 
      "key":"mySecretKey"
    }
  }
]
```
4. [Build and deploy](../create/pb/publish-project-bundle.md) the updated bundle

## Verify the Environment Variables

1. When the installation is complete, shell into the pod created by the plugin, where `YOUR-PLUGIN-POD-NAME` begins with the prefix `pn-` followed by `YOUR-BUNDLE-ID`:
```sh
kubectl exec -it YOUR-PLUGIN-POD-NAME -- /bin/bash
```

2. Confirm the environment variables are present:
```sh
echo SIMPLE_VAR=$SIMPLE_VAR, SECRET_VAR=$SECRET_VAR
```
Expected output:
```text
SIMPLE_VAR=mySimpleValue, SECRET_VAR=mySecretValue
```

::: tip Congratulations!
You have learned how to use environment variables with microsevices on the Entando Platform!
:::


