---
sidebarDepth: 2
---

# Use Plugin Environment Variables to Customize Microservices

This tutorial describes how to use environment variables to customize the behavior of plugin microservices. Using environment variables as a configuration mechanism allows the same Linux image to run in development and production environments. This is especially useful when managing sensitive information via Kubernetes Secrets.

Version 4 of the Entando plugin descriptor adds the ability to make environment variables available to a microservice via the plugin `descriptor.yaml` file. There are two options.
1. Inject the variables using a key-value pair
2. Inject a reference to an existing Kubernetes Secret 

This tutorial will demonstrate both of these options. The Entando Plugin will receive one environment value directly as plain text in the Pod YAML and the other indirectly via a referenced Secret.

## Prerequisites
* [A project bundle](../create/ms/generate-microservices-and-micro-frontends.md) using the latest Entando Blueprint. 

## Add Environment Variables to the Plugin Descriptor File
1. Determine YOUR-BUNDLE-ID. You can do this from your project directory using this command:
```sh
ent prj get-bundle-id
```
Alternatively, supply the full bundle URL (including the .git suffix):
```sh
ent ecr get-bundle-id https://github.com/YOUR-ACCOUNT/YOUR-PLUGIN-BUNDLE.git
```
For example, here's the bundle ID for the first [Standard Banking Demo bundle](../solution/install-standard-demo.md):
```
$ent ecr https://github.com/entando-samples/standard-demo-banking-bundle.git
343826ca
```

2. Now create a Secret named `YOUR-BUNDLE-ID-my-secret` with a key-value pair `mySecretKey=mySecretValue`. Make sure to replace YOUR-BUNDLE-ID with the value from the previous step. 
```sh
kubectl create secret generic YOUR-BUNDLE-ID-my-secret --from-literal=mySecretKey=mySecretValue -n entando
```
3. Verify that the plugin file `bundle/plugins/YOUR-PLUGIN.yaml` specifies `descriptorVersion: v4` or add it if you're upgrading an existing bundle.
4. Insert the following `environmentVariables` section into `YOUR-PLUGIN.yaml` after replacing `YOUR-BUNDLE-ID` with the correct value. By convention, environment variables are all caps and K8s resource names are hyphenated.
```yaml
environmentVariables:
  - name: SIMPLE_VAR
    value: mySimpleValue
  - name: SECRET_VAR
    valueFrom:
      secretKeyRef:
        name: YOUR-BUNDLE-ID-my-secret
        key: mySecretKey
```
4. [Build and deploy](../create/pb/publish-project-bundle.md) the updated bundle.

## Verify the Environment Variables

1. Retrieve your microservice pod name. Use `ent kubectl get pods` or your cluster management tool to find the name. 

    The pod name begins with 'pn', followed by two generated alpha-numeric strings, your docker organization name, microservice name, etc.   
    E.g. YOUR-MICROSERVICE-POD-NAME = `pn-ccfcefa6-615bc3ba-dockerorg-conference-ms-deploymentvpsgj`

2. Shell into the pod, using the name from above: 
```sh
ent kubectl exec -it YOUR-MICROSERVICE-POD-NAME -- /bin/bash
```

3. Check for the environment variables using the command `env` or this command:
```sh
echo SIMPLE_VAR=$SIMPLE_VAR, SECRET_VAR=$SECRET_VAR
```
Expected output:
```text
SIMPLE_VAR=mySimpleValue, SECRET_VAR=mySecretValue
```

You have now learned to use environment variables with plugin microsevices on the Entando Platform.


