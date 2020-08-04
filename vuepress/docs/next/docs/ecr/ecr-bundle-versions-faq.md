# Bundle versions and updates - FAQ

## Does the ECR support versioning?
A bundle, as already discussed in the [overview](./ecr-overview.md), is a package containing one or more components.
As in many other packaging systems, the ECR support bundle versioning, allowing the developer to create and release improvements of his package over time.

## How is a bundle version defined?

In the ECR, the bundle custom resource comes with a set of `tags`, each one representing a version of the bundle.
Here an example for a CMS quickstart bundle
```
apiVersion: entando.org/v1
kind: EntandoDeBundle
metadata:
    name: cms-quickstart-bundle
spec:
  details:
    name: Entando Example CMS Bundle
    description: Example Bundle containing CMS components for the Quickstart experience
  tags:
    - integrity: ''
      shasum: ''
      tarball: 'https://github.com/entando/entando-cms-quickstart-bundle.git'
      version: v0.0.1
    - integrity: ''
      shasum: ''
      tarball: 'https://github.com/entando/entando-cms-quickstart-bundle.git'
      version: v0.0.2
```

As you can see from the code above, the bundle `cms-quickstart-bundle` has 2 versions available.
To each version in the `tags` object must correspond a tag in the git repository provided in the `tarball` field.

## What format should I use to version my bundle?

The ECR support the [semantic versioning 2.0.0](https://semver.org/#semantic-versioning-200), with the possibility to prepend a `v` to the version itself. Some valid bundle versions are:

- 1.0
- v0.1.0-alpha
- 1.0.1-SNAPSHOT
- 22.109.10234-RC.1


## As a bundle developer, how should I create a new version of a bundle?
If you're a bundle developer and you want to release a new version of your bundle, you can simply update the content of your bundle and commit the changes to the bundle git repository. 
Once all the required changes are committed, you can create a new tag in the git repository using the `git tag` command and publish it to the remote repository using the `git push --tags` command

For example, let's assume my bundle already has a version `1.0.0` and I want to publish the version `2.0.0` of my bundle, here the commands I need to use to create and publish the new tag:

```
    git tag -a "2.0.0" -m "My new version"
    git push --tags
```

## How to prevent a particular bundle version from being visible in the ECR?

If, for some reasons, you don't want a particular version to be available for the installation, you can proceed like follows:

1. remove the undesired version from the tag list in your bundle Kubernetes file (`integrity`, `shasum`, `tarball` and `version`)
2. delete your bundle from your cluster using a command like this `kubectl delete -f your-bundle-file.yml [-n your-cluster-namespace]`
3. upload again your bundle to Kubernetes using a command like this `kubectl create -f your-bundle-file.yml [-n your-cluster-namespace]`

## My bundle contains a microservice generated with the Entando Component Generator, does the version of the microservice have to be the same as the bundle version?

The version of the microservice - or to be more precise the docker image associated with the microservice - isn't bound to the version of the bundle containing the microservice itself. 

This gives the bundle developer complete control on the bundle release process, especially in those situations where the bundle contains more components and even more microservices.

## How bundle versions are installed from the ECR

When the user decides to install a version of the bundle, the ECR check the provided tag in the git repository and clones locally just the content of the repository for that tag. 

For this reason it's important that for each provided tag in the custom-resource a corresponding tag is available in the git repository, otherwise the ECR will not be able to donwload the bundle and will throw an error. Note that the ECR can only see published tags, so make sure that all the time you create a new tag in your git repository you publish it to the remote repository too.