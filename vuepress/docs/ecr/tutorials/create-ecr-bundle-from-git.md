# Creating an Entando Component Repository (ECR) bundle using git repository

## Purpose

Generate a simple Entando Component Repository (ECR) bundle shareable in an Entando 6 environment using git repository

## Requirements

You can create the bundle using you favorite code editor. To share the bundle you will need:
1. NodeJS, `npm`, and `git`
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

### 4. Initialize git and add remote repository

From the bundle root, run

    git init

This will initialize an empty Git repository.

Add remote repository as origin and push the bundle.

    git remote add origin https://your/remote/repository.git
    git push -u origin master

> **Important**
>
> `descriptor.yaml` file has to be at the root of repository.

### 5. Publish a git tag

Your bundle has to have a tag. To add it, run

    git tag -a "v0.0.1" -m "My first tag"
    git push --tags

### 6. Create the EntandoDeBundle custom resource for Kubernetes

Assuming the "entando-bundle-cli" command-line utility is already installed and available globally on your system, you can now convert the module into an EntandoDeBundle K8S custom resource. We assume you have a namespace in a Kubernetes cluster which is readable from the Entando Operator and you have the permissions to create resources there. Let’s call this namespace `accessible-ns`

You can also provide a thumbnail for your bundle. Let’s use an image available in the [entando-sample-bundle](https://github.com/entando-k8s/entando-sample-bundle) repository.

Run the `entando-bundle from-git` command providing your remote git repository link (created in step 4) as `--repository` option:

    entando-bundle from-git --name=example-bundle --namespace=accessible-ns --thumbnail-url=https://raw.githubusercontent.com/entando-k8s/entando-sample-bundle/master/example/survey-bundle/example-bundle.jpg --repository=https://your/remote/repository.git --dry-run > example-bundle.yaml

### 7. Upload the bundle to Kubernetes.

Now you simply need to upload the bundle into Kubernetes.

    kubectl create -f example-bundle.yaml

## Conclusion

You should now have the bundle available in your cluster and accessible from the App Builder.

## Resources

-   [Entando Bundle CLI
    project](https://github.com/entando-k8s/entando-bundle-cli)


