# Deprecated: Creating an Entando Component Repository (ECR) bundle using npm registry

::: warning Important
This method is deprecated in favor of git. Support for npm registry will be discontinued in the future.
:::

## Purpose

Generate a simple Entando Component Repository (ECR) bundle shareable in an Entando 6 environment using npm registry

## Requirements

You can create the bundle using you favorite text/code editor. To share the bundle you will need:
1. Node / NPM
1. An NPM registry where to upload the bundle
1. A K8S cluster where to upload the bundle (e.g. minikube, microk8s, minishift) configured correctly for Entando 6
1. A namespace in the cluster reachable from the operator and entando-k8s-service
1. The `entando-bundle-cli` command-line tool to generate the necessary metadata to share the bundle in a Kubernetes cluster

## Steps

### 1. Create a bundle folder

To start, let’s create a new folder to host your bundle.

    mkdir example-bundle && cd example-bundle

### 2. Add a descriptor.yaml file

For a bundle to be readable by the ECR it will need at least a `descriptor.yaml` file in the folder. Let’s create it with some minimal information.

    vim descriptor.yaml

Here is some content for your base descriptor.

    code: example-bundle
    description: This is an example of an Entando 6 bundle

    components:

### 3. Add a simple component to the bundle

This bundle will contains only a simple widget.

Let’s first create the widget metadata in a dedicated folder.

    mkdir widgets

    vim widgets/example-widget.yaml

Now let’s populate the `example-widget.yaml` metadata with some content:

    code: example-widget
    titles:
      en: Example Widget
      it: Widget d'esempio
    group: free
    customUi: <h2>Hi from Example Widget</h2>

Finally, add a reference to this widget in the bundle `descriptor.yaml` file.

    code: example-bundle
    description: This is an example of a Entando 6 bundle

    components:
        widgets:
            - widgets/example-widget.yaml

### 4. Make the bundle an NPM module to be hostable on an NPM registry.

From the bundle root, initialize a `package.json` file

    npm init

Follow the instructions on screen. Here is an example of a possible `package.json` file:

    {
      "name": "example-bundle",
      "version": "1.0.0",
      "description": "An example of an Entando6 bundle",
      "license": "LGPL-2.1",
      "main": "descriptor.yaml",
      "keywords": [
        "entando6",
        "digital-exchange",
        "entando-de-bundle"
      ]
    }

> **Note**
>
> Try to keep the name of the published bundle the same as the bundle code in the descriptor.yaml file to avoid confusion.

### 5. Publish the bundle on an NPM registry

Now your bundle is ready to be published on an NPM registry.

From the root of the bundle (where the package.json and descriptor.yaml files are) you can issue an `npm publish` command.

> **Important**
>
> It would be ideal to have a private npm registry to upload this into.
> Check the [resources section](#resources) for more details;

    npm publish --registry=<your-registry>

### 6. Create the EntandoDeBundle custom resource for Kubernetes

Assuming the "entando-bundle-cli" command-line utility is already installed and available globally on your system, you can now convert the module into an EntandoDeBundle K8S custom resource. We assume you have a namespace in a Kubernetes cluster which is readable from the Entando Operator and you have the permissions to create resources there. Let’s call this namespace `accessible-ns`

You can also provide a thumbnail for your bundle. Let’s use an image available in the [entando-sample-bundle](https://github.com/entando-k8s/entando-sample-bundle) repository.

    entando-bundle from-npm @entando/example-bundle --name=example-bundle --namespace=accessible-ns --thumbnail-url=https://raw.githubusercontent.com/entando-k8s/entando-sample-bundle/master/example/survey-bundle/example-bundle.jpg --dry-run > example-bundle.yaml

### 7. Upload the bundle to Kubernetes

Now you simply need to upload the bundle into Kubernetes.

    kubectl create -f example-bundle.yaml

## Conclusion

You should now have the bundle available in your cluster and accessible from the App Builder.

## Resources

-   [Setup a local npm registry for testing
    purposes](../how-to-create-local-npm-registry)

-   [Entando Bundle CLI
    project](https://github.com/entando-k8s/entando-bundle-cli)


