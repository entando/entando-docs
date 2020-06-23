### Cluster Resource Limits
Entando needs a well-defined amount of resources in order to start and Kubernetes takes care of using only the needed amount of them.
However, you can choose to impose boundaries on the minimum and maximum used/allocated resources by updating the downloaded `entando.yaml` file and setting the `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS` property to true.
In this way, Entando will allocate a predefined amount of resources and Kubernetes will act more strictly checking for resource availability. See [Kubernetes resources](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/) for more information.

By not imposing limits you can minimize initial needed resources and startup time, leaving Kubernetes free to manage its resources as he wants.
By imposing limits you can obtain a better-balanced system.

It's important to note that, accordingly to the Kubernetes documentation, in order to deploy on a namespace with a 
[ResourceQuotas](https://kubernetes.io/docs/tasks/administer-cluster/manage-resources/quota-memory-cpu-namespace/#create-a-resourcequota) on memory and cpu, 

> *every Container must have a memory request, memory limit, cpu request, and cpu limit*

so, in that case, you will need to set `ENTANDO_K8S_OPERATOR_IMPOSE_DEFAULT_LIMITS` to true, otherwise your deploy will fail.

Here you can see the detailed resource requests/limits per container:

| Component                               | Mem requests | CPU requests | Mem limits  | CPU limits |
|-----------------------------------------|--------------|--------------|-------------|------------|
| AppBuilderDeployableContainer           |        128Mi |         125m |       512Mi |       500m |
| EntandoAppDeployableContainer           |        448Mi |         375m |      1792Mi |      1500m |
| ComponentManagerDeployableContainer     |        192Mi |         188m |       768Mi |       750m |  
| EntandoPluginSidecarDeployableContainer |        192Mi |         188m |       768Mi |       750m |
| EntandoPluginDeployableContainer        |        256Mi |         250m |      1024Mi |      1000m |
| EntandoK8SServiceDeployableContainer    |        192Mi |         250m |       768Mi |      1000m |
| KeycloakDeployableContainer             |        192Mi |         250m |       768Mi |      1000m |

### Bundle size limitations

Entando supports bundles without size limitations, you can install as many bundles as you want and bundles as big as you desire.

The only thing you have to check is the `[your-app-name]-de-pvc` volume size. Each bundle is installed in that volume, so when it reaches its maximum capacity you will not be able to install bundles anymore.

You can find `quickstart-de-pvc` volume inside de-container container, that is part of the pod named `[your-app-name]-server-deployment-***`, where asterisks should assume values based on your instance.
Feel free to set its size accordingly to your needs.