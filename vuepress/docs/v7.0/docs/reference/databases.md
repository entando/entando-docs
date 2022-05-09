---
sidebarDepth: 2
---
# Manage Entando Databases

Entando currently supports PostgreSQL, MySQL and Oracle database systems. With
PostgreSQL and MySQL, Entando automatically creates a
Kubernetes deployment hosting the DBMS. 
For Oracle and others, Entando
supports connectivity to [External Databases](../../tutorials/devops/external-db.md). 

This document provides information about how Entando manages database connectivity.

## PostgreSQL and MySQL

#### Lightweight & Low-Config 
When deploying Entando Custom Resources that require databases to a new
namespace, the default behavior for Entando is to create a Kubernetes
deployment. It uses standard OpenShift compliant images.

This is a relatively low-configuration approach, as Entando creates and
initializes the databases transparently. Persistent data is stored on any
persistent volume that meets the PersistentVolumeClaim requirements.

When an Entando Custom Resource is redeployed, the persistent volumes
remain in tact. Since the subsequent data initialization is idempotent,
the supporting deployments will scale up and behave as expected.

#### Isolated DB
Generally Entando services encapsulate the database they use entirely, 
providing facilities to import and export data without 
knowledge of the internal workings of the data store. For simpler applications, where database size remains manageable, Entando keeps the DB isolated, without the need for deployment pipelines.

These database deployments are not clustered.
It is therefore recommended that redundancy and clustering, in the form of clustered storage, be utilized in this type of applications. 

These database deployments specify a restartPolicy of `Always`. In the event of a
non-corrupting failure, the database pod should restart automatically. But this does not replace the features of a full database cluster.

#### Advanced Use Cases
In more advanced use cases, as with the use of our CMS
functionality, this approach may not scale. And where there
is a centralized database admin team or a strict organizational governance for databases, this
approach can result in a multitude of databases that may become difficult
to manage.

## Existing External Databases

For complex use cases, Entando can be configured to use an existing
DBMS provided by the customer. In these situations, lower level database
operations such as tablespace creation, permissions and clustering must be carried out by the customer. 

Entando can then create and populate the tables, indices and foreign keys. It creates these in the appropriate table 'container' for the DBMS, such
as a schema or database. A dedicated custom resource definition in
Kubernetes called `EntandoDatabaseService` is used to configure them.

The `EntandoDatabaseService` custom resource is created in
the same namespace as the EntandoApps and EntandoPlugin that uses them. It is usually created along with a secret that carries admin credentials to the database in question.

### Structure

`EntandoDatabaseService` custom resource example:

     EntandoDatabaseService
    metadata:
      name: string, any K8S compliant name
      namespace: string, the namespace this DB is created in
    spec:
      dbms: string, one of oracle, postgresql or mysql
      host: string, either an ip address or hostname where the database service is hosted
      port: integer, the port on which the database service is hosted
      databaseName: string, the name of the database, only required for PostgreSQL and Oracle
      secretName: the name of the Secret in the same namespace carrying admin credentials to the database service
      tablespace: (Oracle only)  the tablespace to use to create the required schemas in
      jdbcParameters: a map containing name-value pairs for any additional parameters required for the JDBC driver to connect to the database.

An example of the Secret that provides the admin credentials, identified as
`secretName` above:

    Secret:
      name: string, any K8S compliant name
      namespace: string, the namespace the DB is created in
      stringData:
        username: string, name of an admin user that can create schemas and other users
        password: string, password of the above user

### How It Works
#### Database Custom Resource
In order for the EntandoApp and Plugin deployer to choose the
correct database service, the `EntandoDatabaseService` custom resource needs to be created
**BEFORE** the app and plugins are created. There can be
multiple `EntandoDatabaseServices` in the namespace, but they need to
point to DBMS of different vendors, i.e. PostgreSQL, Oracle
and MySQL. 

Entando currently does not enforce any validation but if there
are two `EntandoDatabaseServices` that have the same DBMS vendor, it will
simply pick the first one and continue. Please ensure that only one
`EntandoDatabaseService` exists for each DBMS vendor used.

#### Spec.dbms
Any application or plugin that is created, now has to specify the
appropriate DBMS vendor in their `spec.dbms` property. If the
Entando Operator detects an `EntandoDatabaseService` with a matching DBMS
vendor, it will continue to create the necessary schemas on the specific
database. 

If the Operator does not detect an
`EntandoDatabaseService` with a matching DBMS vendor, it will fall back
to its default behaviour--creating a matching deployment and
spinning up a database service from the same namespace. 

If the `spec.dbms` property is not specified on an EntandoApp, the Operator will
default to PostgreSQL. If the `spec.dbms` is not specified on
a plugin, the operator will assume that it
does not require a database, bypassing any database
and schema creation.

When the Entando Operator processes the app or plugin with
an appropriate `spec.dbms` specification, it will create a schema/user pair
for each datasource required. A typical app deployment requires 3
datasources: portdb, servdb, and dedb. Plugins generally require one
datasource: plugindb.

#### DB Schema and User name
The DB schema and user pair will have the same name. The name
is derived from the plugin or app name, replacing
all characters that are not ANSI-SQL compliant with an underscore. 

The datasource name is then suffixed to the schema name. When naming
your app or plugin, keep in mind that some DBMS 
do not support long schema names. Future versions of Entando will allow
you to override the schema prefix for an app or plugin.

### Credentials

The Entando Operator generates a Kubernetes Secret for each schema/user
combination it creates. This Secret is the concatenation of
the app or plugin name, plus the datasource qualifier,
and the suffix "secret", with dashes in between. 

For instance: \
EntandoApp called `my-app` and datasource `portdb`  \
Kubernetes Secret → `my-app-portdb-secret` 

#### Passwords and Secrets
The Entando Operator will never overwrite or update an existing database secret. It generates a random string for the password, which is generally considered the safest
approach. If you wish to change the password for the user, remember to update the password in the Kubernetes
Secret. Such an operation can sometimes create an error, resulting in deployment failures.


The Entando Operator’s schema creation logic is idempotent. If the generated schema/user combination in the
associated Kuberentes Secret already exists, there will be no side effects.
But if the log in fails, it will
attempt to create the user. If the user already exists, with a
different password than the one in the Kubernetes Secret, all subsequent
deployment operations will fail.

## Vendor Specific Notes

### Oracle

#### Example

      EntandoDatabaseService
        metadata:
          name:oracle-service
        spec:
          dbms: oracle
          host: 10.0.0.13
          port: 1521
          databaseName: ORCLPDB1.localdomain
          secretName: oracle-secret
          tablespace: entando_ts
          jdbcParameters: {}
      Secret:
        metadata:
          name: oracle-secret
        stringData:
          username: admin
          password: admin123

#### Resulting connection string:

jdbc:oracle:thin:@//10.0.0.13:1521/ORCLPDB1.localdomain

#### Notes

* Oracle has some rather complicated rules in building the correct
connection string. For the sake of portability and
lightweight image, the DB is limited to the thin driver. 

* The `databaseName` could also be an Oracle service as opposed to the `SID`. 
Coordinate with your Oracle DB Admin to determine exactly what value to
use. We strongly recommend testing your settings with code or
a tool that constructs a JDBC connection.

* You can specify which tablespace Entando should use to create the
schemas by using the `spec.tablespace` property.

* When the Operator prepares the schemas for your EntandoApp or
EntandoPlugin, it creates a user for every datasource required. 
As standard for Oracle, that user will have their own schema
with the same name. Permissions are set up to ensure that one user
cannot access tables from another user’s schema. 

>Oracle limits schema names to 30 characters. If you intend to use Oracle,
please keep the name of your apps and plugins short. The suffixes added to the app or plugin name, to ensure the resulting schema
name is unique, are usually shorter than 8 characters, so names of about
20 characters should be safe.


#### ORA-01704: string literal too long

Entando requires extended datatypes to be activated in Oracle 12c and
higher.
(<https://oracle-base.com/articles/12c/extended-data-types-12cR1>)

### MySQL

#### Example

    EntandoDatabaseService
      metadata:
        name:mysql-service
      spec:
        dbms: mysql
        host: 10.0.0.13
        port: 3306
        databaseName:
        secretName: mysql-secret
        jdbcParameters:
           useSSL: "true"
    Secret:
      metadata:
        name: mysql-secret
      stringData:
        username: admin
        password: admin123

#### Resulting Connection String

jdbc:mysql://10.0.0.13:3306

#### Notes

* MySQL doesn’t distinguish between schemas and databases. For this reason, no
`databaseName` is required. The Entando Operator will therefore create an
entirely new database for each datasource your app or plugin requires. It will also create a user with the same name as
the database with permission set up to ensure one user cannot access the
database of another user. 
>MySQL limits database names
to 63 characters. Keep this in mind when naming your
Entando Applications and Plugins.

### PostgreSQL

#### Example

      EntandoDatabaseService
        metadata:
          name:postgresql-service
        spec:
          dbms: postgresql
          host: 10.0.0.13
          port: 5432
          databaseName: my_db
          secretName: postgresql-secret
          jdbcParameters: {}

      Secret:
        metadata:
          name: postgresql-secret
        stringData:
          username: admin
          password: admin123

#### Resulting Connection String

jdbc:postgresql://10.0.0.13:5432/my\_db

#### Notes

* PostgreSQL behaves like Oracle when it comes to user and schema association. The current username is used as a
default schema/prefix to resolve tables. Entando ensures
that two users don’t have access to the other’s schemas.

## Skipping Database Preparation

When an Entando Application is deployed, an operator is responsible for the entire process, including DB creation and preparation.
If you already have a prepared DB (schemas, tables, etc.), you could skip the schema creation and DB preparation to speed up the deployment process.

To achieve this, specify the pertinent properties for the EntandoApp component in the `entandoapp.yaml` file.

For `spec.dbms` property, choose `none`. Then add the necessary DB connection parameters.
Here is an example of the resulting entandoapp.yaml:
```yaml
    - kind: "EntandoApp"
      metadata:
        annotations: {}
        labels: {}
        name: "example-qs"
      spec:
        dbms: "none"
        replicas: 1
        standardServerImage: wildfly
        ingressPath: /entando-de-app
        environmentVariables:
          - name: SPRING_DATASOURCE_USERNAME
            value: admin
          - name: SPRING_DATASOURCE_PASSWORD
            value: adminadmin
          - name: SPRING_DATASOURCE_URL
            value: "jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_dedb"
          - name: SPRING_JPA_DATABASE_PLATFORM
            value: org.hibernate.dialect.PostgreSQLDialect
          - name: PORTDB_URL
            value: "jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_portdb"
          - name: PORTDB_USERNAME
            value: admin
          - name: PORTDB_PASSWORD
            value: adminadmin
          - name: PORTDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: PORTDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
          - name: SERVDB_URL
            value: "jdbc:postgresql://192.168.1.82:5432/testdb?currentSchema=admin_qs_servdb"
          - name: SERVDB_USERNAME
            value: admin
          - name: SERVDB_PASSWORD
            value: adminadmin
          - name: SERVDB_CONNECTION_CHECKER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLValidConnectionChecker
          - name: SERVDB_EXCEPTION_SORTER
            value: org.jboss.jca.adapters.jdbc.extensions.postgres.PostgreSQLExceptionSorter
```

### How It Works

* Using `spec.dbms: "none"` directs the operator to skip the initial schema/user creation step.
* Adding the variables under the `spec.environmentVariables` section will supply connection parameters that will be used by EntandoApp.
* Keep in mind that all these parameters will be applied to each of the containers in the EntandoApp pod, overriding existing values.

## Liquibase Migration

Beginning with Entando 7.0, the Entando App Engine modules will implement automatic Liquibase migrations to manage structural changes to databases running on MySQL or PostgreSQL.

#### DB Migration Modes
The parameter provided to the environment variable `DB_MIGRATION_STRATEGY` determines how required updates are applied to components of an existing database. Three database migration modes are supported and govern upgrade behavior:

- `auto` (default setting): The application starts and databases are updated. Changes are applied to each component introduced in Entando versions 7.0 and later.
- `disabled`: The application does not start. Database changes are detected but not implemented. The application indicates which components require updates.
- `generate_sql`: The application does not start but generates the SQL scripts to upgrade databases manually.
