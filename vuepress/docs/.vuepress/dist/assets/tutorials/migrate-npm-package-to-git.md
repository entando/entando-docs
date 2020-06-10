# Migrating bundle from npm registry to git repository

## Purpose

Migrate npm package bundle to git repository

## Requirements

1. Node / NPM and git
2. Published npm package in a registry
3. Git repository to migrate to

## Steps

### 1. Create a bundle folder

To start, let’s create a new folder to host your bundle.

    mkdir example-git-bundle && cd example-git-bundle

### 2. Install bundle package

Install the bundle package from your registry.

Let's say the package is `example-npm-bundle` and the registry is `http://nexus.example.registry.org/repository/npm-example-repository/`.

    npm install example-npm-bundle@latest --registry=http://nexus.example.registry.org/repository/npm-example-repository/
    rm -fr package-lock.json

This will add the bundle code into `node_modules/` folder and remove the package_lock.json

### 3. Move bundle code and clean up

Move the package code to root folder and remove the `node_modules/` folder.

    mv -v node_modules/example-npm-bundle/* .
    rm -fr node_modules/

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

## Conclusion

You should now have the bundle available in git repository which you can use to [create an Entando Component Repository (ECR) bundle](./create-ecr-bundle-from-git).

## Resources

-   [Creating an Entando Component Repository (ECR) bundle using git repository](./create-ecr-bundle-from-git)

-   [Entando blueprint](https://github.com/entando/entando-blueprint)


