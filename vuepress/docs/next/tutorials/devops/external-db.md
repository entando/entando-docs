---
sidebarDepth: 2
---
# Connecting to an External Database

This document provides a guide to connecting an application to an external database auto-provisioned by the Entando Operator. In many production configurations, it is recommended to use a DBMS
outside of the cluster where your Entando Application is running to
simplify maintenance, minimize duplication of resources, and establish a
backup workflow to scale with your application.

For more information about how Entando manages external databases, see [Existing External DB](../../docs/reference/databases.md#existing-external-databases).

## Prerequisites

-   An environment to install your Entando Application

-   A running PostgreSQL, MySQL, or Oracle environment

-   Administrator access to the database

-   Network access from your Kubernetes cluster to your database

## Tutorial

1. Edit the [EntandoApp](../../docs/reference/entandoapp-cr.md) custom resource definition (CRD). 
    * Set the value for `dbms` to `none`.
    * Under `environmentVariables`, provide the database connection information for two Entando server databases and one connection for the Entando Component Repository (ECR). Sample connection information for each of the databases is provided [below](#ecr).
    * Note that Kubernetes Secrets are auto-provisioned when specified in the `environmentVariables` section, to pass on the DB credentials. Secrets can also be create manually.

This is an `EntandoApp` CRD example for a PostgreSQL DBMS:
``` yaml
apiVersion: entando.org/v1
kind: EntandoApp
metadata:
  namespace: YOUR-NAMESPACE
  name: YOUR-APP-NAME
spec:
  dbms: none
  ingressHostName: YOUR-APP-NAME.k8s-entando.org
  standardServerImage: tomcat
  environmentVariables:
    - name: MAX_RAM_PERCENTAGE
      value: "75"
    - name: PORTDB_URL
      value: jdbc:postgresql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
    - name: PORTDB_USERNAME
      valueFrom:
        secretKeyRef:
         key: username
         name: YOUR-PORTDB-SECRET
    - name: PORTDB_PASSWORD
      valueFrom:
        secretKeyRef:
         key: password
         name: YOUR-PORTDB-SECRET
    - name: PORTDB_CONNECTION_CHECKER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
    - name: PORTDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
    - name: SERVDB_URL
      value: jdbc:postgresql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
    - name: SERVDB_USERNAME
      valueFrom:
        secretKeyRef:
         key: username
         name: YOUR-SERVDB-SECRET
    - name: SERVDB_PASSWORD
      valueFrom:
        secretKeyRef:
         key: password
         name: YOUR-SERVDB-SECRET
    - name: SERVDB_CONNECTION_CHECKER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
    - name: SERVDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
    - name: SPRING_DATASOURCE_URL
      value: jdbc:postgresql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
    - name: SPRING_DATASOURCE_USERNAME
      valueFrom:
        secretKeyRef:
         key: username
         name: YOUR-DEDB-SECRET
    - name: SPRING_DATASOURCE_PASSWORD
      valueFrom:
        secretKeyRef:
         key: password
         name: YOUR-DEDB-SECRET
    - name: SPRING_JPA_DATABASE_PLATFORM
      value: org.hibernate.dialect.PostgreSQLDialect
    - name: SERVDB_CONNECTION_CHECKER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
    - name: SERVDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
  replicas: 1
```
2. Create the YOUR-POSTGRESQL-SECRET with the admin credentials for the DB. You can skip this step if you include the credentials as an environmentVariable under the spec section.
3. Edit the [EntandoDatabaseService CRD](../../docs/reference/database-cr.md) for your namespace and external DB requirements. 
    
``` yaml
apiVersion: entando.org/v1
kind: EntandoDatabaseService
metadata:
  name: YOUR-DB-NAME
  annotations:
    entando.org/controller-image: entando-k8s-database-service-controller
    entando.org/supported-capabilities: mysql.dbms,oracle.dbms,postgresql.dbms,dbms
  labels:
    entando.org/crd-of-interest: EntandoDatabaseService
spec:
  dbms: none
  provisioningStrategy: UseExternal
  host: YOUR-DBMS-HOSTURL
  port: [] # optional
  databaseName: YOUR-DB-NAME
  secretName: YOUR-POSTGRESQL-SECRET
  providedCapabilityScope: YOUR-NAMESPACE
  replicas: 1
```
### Required Database Samples
#### ECR
``` yaml
- name: SPRING_DATASOURCE_URL
  value: {ECRDB_URL}
- name: SPRING_DATASOURCE_USERNAM
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
  value: {ECRDB_DIALECT}
```

#### Portal DB

``` yaml
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
``` yaml
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

Set the values for placeholders in the templates above, based on your database configuration. 

### Connection Samples by Vendor Type

#### Postgresql

```
XXX_URL:                      jdbc:postgresql://{DBMS_ADDRESS}:{DBMS_PORT}/{DBMS_DBNAME}
XXX_CONNECTION_CHECKER:        org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
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
SPRING_JPA_DATABASE_PLATFORM: org.hibernate.dialect.OracleDialect 
```
>See additional details about an [Oracle implementation](../../docs/reference/databases.md#oracle).

## Options 
### Customize with the `ProvidedCapability` CRD 
The `ProvidedCapability` custom resource definition can be utilized to automate the deployment of the DBMS and provide more controls. This approach can be used for PostgreSQL or MySQL DBMS. 
#### Steps: 
1. Customize the templates with your namespace, preferred DB name, and schema. Also add your FQDN in the SSO template.
2. Apply the templates before starting the Entando installation.
3. Install Entando the usual way.

#### ProvidedCapability Templates for DBMS and SSO
* Main DB ProvidedCapability Template
``` yaml
apiVersion: entando.org/v1
kind: ProvidedCapability
metadata:
  name: [YOUR-DB-NAME]
  namespace: [YOUR-NAMESPACE]
spec:
  capability: dbms
  implementation: postgresql
  resolutionScopePreference:
  - Namespace
  - Dedicated
  - Cluster

```
* SSO ProvidedCapability Template
```yaml
apiVersion: entando.org/v1
kind: ProvidedCapability
metadata:
  name: [YOUR-SSO-SCHEMA-NAME]
  namespace: [YOUR-NAMESPACE]
spec:
  capability: sso
  capabilityParameters:
    preferredDbms: postgresql
    preferredIngressHostName: [YOUR-FQDN]
  resolutionScopePreference:
  - Namespace
  - Cluster
```
