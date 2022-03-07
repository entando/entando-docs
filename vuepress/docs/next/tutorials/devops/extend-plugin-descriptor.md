---
sidebarDepth: 2
---

# Leverage Plugin Environment Variables 

This tutorial describes how to use environment variables and secrets in the plugin descriptor  of an Entando Component Generator built project to customize microservices behavior. You can use the same docker image to run during development as in production by using the environment variables as a configuration mechanism for your pods or for passing sensitive information. A new validation step is embedded in the Entando process to manage possible incompatible properties.


## Entando Bundle Plugin Descriptor
Currently, environment variables or secrets are not required for the container plugin descriptor file. The plugin descriptor v4 on the Entando Platform adds support for inserting environment variables as allowed by the descriptor.yaml file in k8s. There are two ways to accomplish this. You can deploy a plugin and inject the variables by using a key-value or by reading the value with an existing secret. The bundle is able to receive the configuration values exposed as plain text on the resources/yamls or hidden in the secret. Secrets can be referenced by using a special syntax. This process does not work with Entando plugin descriptor v3 or lower.

### Deploy an EntandoApp with a new secret constraints: ??? not sure what this step is

`name: env-2-secret`\
`key: env-2secret-key`\
`value: env2value`

### Add Environment Variables to the Plugin Descriptor file

1. [Create a project bundle](../create/ms/generate-microservices-and-micro-frontends.md) using the latest Entando Blueprint.
2. Ensure that a Jhipster 7.2 project was created with the command `ent check-env develop`. 
3. Check that the generated plugin file `bundle/plugins/[your_plugin.yaml]` is present and that it specifies `descriptorVersion: v4`.
4. Insert the following environment variables data into your `[your_plugin.yaml]` as a comment section.
```yaml
# entando-needle-descriptor-add-roles - Entando blueprint will add roles here
#
### uncomment lines below to enable the injection of environment variables in your plugin
### ENV_1_NAME directly injects a value
### ENV_2_NAME leverages a cluster secret value
# environmentVariables:
#  - name: ENV_1_NAME
#    value: env1value
#  - name: ENV_2_NAME
#    secretKeyRef:
#      name: env-2-secret
#      key: env-2-secret-key
```
5. Edit the descriptor.yaml file inside the `bundle/` directory by adding the same environmentVariables section:
```yaml
environmentVariables:
  - name: ENV_1_NAME
    value: env1value
  - name: ENV_2_NAME
    secretKeyRef:
      name: env-2-secret
      key: env-2secret-key
```
6. Install the updated bundle with `ent proj build`.
7. When the installation is successful, open a terminal into the pod created by the plugin. 
8. Print the injected env vars values as a test with these 2 commands:

    1. `echo $ENV_1_NAME`
    2. `echo $ENV_2_NAME`

     It should return these 2 values respectively:

    1. `env1value`
    2. `env2value` ??? since this is related to env-2-secret, where does this value come from? is this correct?

Now you have learned to extend the plugin descriptor through the use of the environment variables on the Entando Platform and Kubernetes.

For More Information:
* Here is an [example of an Entando Bundle plugin](../../docs/curate/ecr-bundle-details.md#plugin).

????? Information that maybe should be included?????  
Re:DeApp
-you may customize the DeApp in order to expose a simple key-value-based configuration service interface.<<< is this just referring to the descriptor file for EntandoDeApp?
- the CM version to use is 6.4.0-ENG-2268-PR-143
