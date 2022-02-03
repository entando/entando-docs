# Tutorial: Selecting the default databases

## Overview

This document provides a guide to changing an Entando environment by selecting the default databases used.
See [External Database](./external-db.md) to connect to a database outside of the cluster.

## Prerequisites

-   An environment to install your Entando applicaiton
-   Network access from your Kubernetes cluster to your database

## Tutorial

If needed you can set the desired component to use a specific DBMS by updating the Helm-generated yaml file (from [Getting Started](../../docs/getting-started) as follows:

1. open the chosen file and search for `EntandoApp` custom resource
2. identify the component to update in the related list
3. update the `spec.dbms` property with the desired value (you can specify different DBMS for different components)

Repeat previous steps for all components you need to change used DBMS on.

Valid values for `spec.dbms` property are: `none`, `embedded`, `postgresql`, `mysql`, `oracle`.

`embedded` value will result in using an embedded database with in-file persistence strategy.

Please note that using embedded databases into distributed systems forces to have only 1 replica per pod.
This happens because the volume claimed by each replica points to the same files,
so the first container locking the files will prevent next replicas to obtain access to the DB files.
Note that this affects also deployments rolling updates

If you need to update your deployment, there is a known workaround consisting in setting the replicas number to 0, waiting for pod shutdown completion, update the deployment yaml file, then updating again to 1 the replicas value. In this way, the newly created containers will be able to startup correctly and access the embedded database files on the filesystem.

These considerations lead us to discourage embedded database use into production environments.
