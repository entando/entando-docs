# Tutorial: Connecting to an External Database

## Overview

This document provides a guide to connecting an Entando Application to an external database. In
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

1. Create and install a secret or secrets for your database credentials
2. Edit the deployment template generated from running the helm command or the helm template you used to deploy your Entando application
3. Find the entry for the `EntandoCompositeApp`
4. Set the value for `dbms` to `none`
5. Under `environmentVariables` you will need to provide database connection information for two Entando Server databases and one connection for the Entando Component Repository. Example connection information for each of those databases is provided below:

#### ECR
```
- name: SPRING_DATASOURCE_URL
  value: {ECRDB_URL}
- name: SPRING_DATASOURCE_USERNAME
  valueFrom:
    secretKeyRef:
      name: {ECRDB_DBMS_SECRET_NAME}
      key: username
      optional: false
- name: SPRING_DATASOURCE_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {ECRDB_DBMS_SECRET_NAME}
      key: password
      optional: false
- name: SPRING_JPA_DATABASE_PLATFORM
  value: org.hibernate.dialect.PostgreSQLDialect
```

#### Portal DB

```
- name: PORTDB_URL
  value: {PORTDB_URL}
- name: PORTDB_USERNAME
  valueFrom:
    secretKeyRef:
      name: {PORTDB_DBMS_SECRET_NAME}
      key: username
      optional: false
- name: PORTDB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {PORTDB_DBMS_SECRET_NAME}
      key: password
      optional: false
- name: PORTDB_CONNECTION_CHECKER
  value: {PORTDB_CONNECTION_CHECKER}
- name: PORTDB_EXCEPTION_SORTER
  value: {PORTDB_EXCEPTION_SORTER}
```

#### Server DB
```
- name: SERVDB_URL
  value: {SERVDB_URL}
- name: SERVDB_USERNAME
  valueFrom:
    secretKeyRef:
      name: {SERVDB_DBMS_SECRET_NAME}
      key: username
      optional: false
- name: SERVDB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {SERVDB_DBMS_SECRET_NAME}
      key: password
      optional: false
- name: SERVDB_CONNECTION_CHECKER
  value: {SERVDB_CONNECTION_CHECKER}
- name: SERVDB_EXCEPTION_SORTER
  value: {SERVDB_EXCEPTION_SORTER}
  ```

Set the values for placeholders in the templates above based on your database configuration. Here are examples:

#### Postgresql

```
XXX_URL:                      jdbc:postgresql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
XXX_CONNECTON_CHECKER:        org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
XXX_EXCEPTION_SORTER:         org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
SPRING_JPA_DATABASE_PLATFORM: org.hibernate.dialect.PostgreSQLDialect
```

#### MySql
```
XXX_URL:                      jdbc:mysql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
XXX_CONNECTON_CHECKER:        org.jboss.jca.adapters.jdbc.extensions.mysql.MySQLValidConnectionChecker
XXX_EXCEPTION_SORTER:         org.jboss.jca.adapters.jdbc.extensions.mysql.MySQLExceptionSorter
SPRING_JPA_DATABASE_PLATFORM: org.hibernate.dialect.MySQLDialect
```

#### Oracle
```
XXX_URL:                      jdbc:oracle:{driver_type}:@//{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_SERVICE_NAME}
XXX_CONNECTON_CHECKER:        org.jboss.jca.adapters.jdbc.extensions.oracle.OracleValidConnectionChecker
XXX_EXCEPTION_SORTER:         org.jboss.jca.adapters.jdbc.extensions.oracle.OracleExceptionSorter
SPRING_JPA_DATABASE_PLATFORM: org.hibernate.dialect.Oracle
```
