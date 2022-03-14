---
sidebarDepth: 2
---

# Use Plugin Environment Variables to Customize Microservices

This tutorial describes how to use environment variables and secrets in the plugin descriptor to customize microservices behavior. Using environment variables as a configuration mechanism for pods or to pass sensitive information allows the same Docker image to run during development as in production. A new validation step is embedded in the Entando process to manage potential incompatibilities.


## Entando Bundle Plugin Descriptor
Currently, environment variables or Secrets are not required for the container plugin descriptor file. The plugin descriptor v4 on the Entando Platform adds support for inserting environment variables as allowed by the `descriptor.yaml` file in k8s. There are two ways to accomplish this. You can deploy a plugin and inject the variables by using a key-value pair or by reading the value with an existing secret. The bundle is able to receive the configuration values exposed as plain text on the resources/yamls or hidden in the secret. Secrets can be referenced by using a special syntax. This process does not work with Entando plugin descriptor v3 or lower.

### Prerequisites
* [A project bundle](../create/ms/generate-microservices-and-micro-frontends.md) using the latest Entando Blueprint. 



### Add Environment Variables to the Plugin Descriptor File

1. From your project directory, shell into your Entando Instance.
2. create a secret for these name value pairs with the following command.\
`name: env-2-secret`\
`key: env-2secret-key`\
`value: env2value`

```yaml
kubectl create secret generic env-2-secret --from-literal=env-2-secret-key=env2value -n entando
```

3. Check that the generated plugin file `bundle/plugins/[your_plugin.yaml]` is present and that it specifies `descriptorVersion: v4`.
4. Insert the following `environmentVariables` section into `[your_plugin.yaml]` :
```yaml
environmentVariables:
  - name: ENV_1_NAME
    value: env1value
  - name: ENV_2_NAME
    secretKeyRef:
      name: env-2-secret
      key: env-2secret-key
```
5. [Build and deploy](../create/pb/publish-project-bundle.html) the updated bundle.
6. When the installation is successful, open a terminal into the pod created by the plugin. 
`kubectl exec -it [yourproject-pod-name] -- /bin/bash` where the pod name begins with ...

7. Print the injected env vars values as a test with these 2 commands:

    1. `echo $ENV_1_NAME`
    2. `echo $ENV_2_NAME`

     It should return these 2 values respectively:

    1. `env1value`
    2. `env2value` 

Now you have learned to extend the plugin descriptor through the use of the environment variables on the Entando Platform and Kubernetes.


