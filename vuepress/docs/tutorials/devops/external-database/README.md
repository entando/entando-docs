# Tutorial: Connecting to an External Database

## Overview

This document provides a guide to connecting to an external database. In
many (not all) production configurations it is recommended to use a DBMS
outside of the cluster where your Entando application is running to
simplify maintenance, duplication of resources, and to establish a
backup workflow that will scale with your application.

## Prerequisites

-   An environment to install your Entando applicaiton

-   A running PostgreSQL, MySQL, or Oracle environment

-   Administrator access to the database

-   Network access from your Kubernetes cluster to your database

## Tutorial

1.  In the helm quickstart define a db for your deployment that includes
    the admin credentials for your database

<!-- -->

    db:
      vendor: postgresql | mysql | oracle
      host: <yourhost>
      port: <yourport>
      adminUser: <youradmin>
      adminPassword: <youradminpassword>
      name: <yourdbname>

1.  Run the helm quickstart or create a deployment for your Entando
    environment manually

    1.  Note: The quickstart creates a default configuration for the
        deployment. This isn’t to suggest that it is the only
        configuration or that it matches with every use case. It is
        recommended to think about your desired deployment Architecture
        and to configure for that environment using the CRDs as building
        blocks. This also isn’t to suggest that if it isn’t directly
        supported by the quickstart template that you can’t change it.
        The deployment is editable. Treat the helm template as a
        bootstrapping environment and edit your deployments to match
        your needs and requirements.

2.  Open the yaml file generated from the deployment and review the
    settings for the deployment

    1.  The Entando Operator will create a secret for the database
        automatically and use the DB initializers to create the DB for
        the Entando app and any services that use it

3.  Deploy your app


