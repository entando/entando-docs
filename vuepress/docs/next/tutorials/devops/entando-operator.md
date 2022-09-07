---
sidebarDepth: 2
---

# Configure the Entando Operator
This tutorial demonstrates how to provide the Entando Operator with a ConfigMap to customize its behavior. See the template file below for possible settings related to image timeouts, TLS/SSL configuration, and the default image repository. Some specific tutorials (e.g. [Plugin Configuration Profiles](./plugin-configuration.md)) also require updates to the Entando Operator configuration.

## Prerequisites
The Entando Operator makes use of an optional ConfigMap named `entando-operator-config`. The ConfigMap must be present in the same namespace as the operator. In a quickstart environment, you can check for its presence with this command:
```sh
kubectl get configmap -n entando
```

## Add a new ConfigMap
If the ConfigMap doesn't already exist, you can use a template as a starting point.

<EntandoCode>curl -sfL "https://raw.githubusercontent.com/entando/entando-releases/{{$site.themeConfig.entando.fixpack.v71}}/dist/ge-1-1-6/samples/entando-operator-config.yaml"</EntandoCode>

Edit `entando-operator-config.yaml` to adjust existing settings or add new ones. You can then apply it to Kubernetes.

```sh
kubectl apply -f entando-operator-config.yaml -n entando
```

The Entando Operator automatically reloads settings from the ConfigMap when the ConfigMap is created. You can verify the reload by checking the logs in the operator pod.

## Update an existing ConfigMap
You can edit an existing ConfigMap to add or update settings.
```sh 
kubectl edit configmap/entando-operator-config -n entando
```

The Entando Operator automatically reloads settings from the ConfigMap whenever it is modified. You can verify the reload by checking the logs in the operator pod. Some settings may only take effect when a deployment is first created, e.g. timeout settings or CPU limits.


