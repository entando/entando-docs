# Manage Entando Databases

## Overview

Entando’s Docker images currently support three different relational
database management systems: PostgreSQL, MySQL and Oracle. With
PostgreSQL and MySQL, by default, Entando’s will automatically create a
Kubernetes Deployment hosting the database management systems. However,
for Oracle, and also for other scenarios that may require it, Entando
supports connectivity to existing external databases. This document
provides the user with the necessary information to decide how to manage
Entando’s databases.

## Lightweight, low-config Databases with PostgreSQL and MySQL

When deploying Entando Custom Resources that require databases to a new
Namespace, the default behavior for Entando is to create a Kubernetes
Deployment. It uses the standard Openshift compliant images:

-   centos/mysql-57-centos7 and

-   centos/postgresql-96-centos7)

This is a fairly low-configuration approach, as Entando will create and
initialize the databases transparently. Persistent data is stored on any
Persistent Volume that meets our Persistent Volume Claim requirements.
When an Entando Custom Resource is redeployed, the Persistent Volumes
remain in tact. Since the subsequent data initialization is idempotent,
the supporting Deployments will scale up and behave as expected.

Generally our services encapsulate the database they use entirely, and
provide facilities to import and export the data without needing any
knowledge of the internal workings of the underlying data store. For
most simple Entando Apps the database doesn’t grow too large and is
fairly easy to manage. This state of affairs allowed us to keep our
databases isolated from each other, thus allowing for isolated
deployments without needing complex coordination of database migration
for the different deployment pipelines.

It is worth noting that these database Deployments are not clustered.
The customer is therefore strongly advised to provide redundancy and
clustering in the form of clustered storage. These database deployments
do specify a restartPolicy of 'Always', so in the event of a
non-corrupting failure, the database Pod should therefore restart in
about 30 seconds. This by no means offers the features of a full
database cluster, but may suffice for many scenarios.

However, in more advanced use cases, such as the use of our CMS
functionality, this simplistic approach may not scale. And where there
is a a centralized database admin team, or where there is a requirement
to comply to strict organizational governance w.r.t. databases, this
approach does result in a multitude of databases that may be difficult
for the database admin team to manage.

## Existing External Databases

For this reason, Entando can also be configured to use an existing
database service provided by the customer. In these scenarios, the
customer is expected to take responbility for the lower level database
operations such as tablespace creation, permissions and clustering.
Entando will however still be responsible for creating and populating
the tables, indices and foreing keys. Entando will also create all of
these in the appropriate table 'container' for the DBMS in question such
as a schema (Oracle/PostgreSQL) or a database (MySQL). In order to
achieve this, Entando installs a dedicated CustomResourceDefinition in
Kubernetes, called an 'EntandoDatabaseService'

The idea is for EntandoDatabaseService custom resources to be created in
the namespace the EntandoApps and EntandoPlugin that should use them
will be created. The EntandoDatabaseService is usually created along
with a secret that carries admin credentials to the database in
question.

### Structure

The EntandoDatabaseService custom resource looks like this:

     EntandoDatabaseService
    metadata:
      name: string, any K8S compliant name
      namespace: string, the namespace this will be created in
    spec:
      dbms: string, one of oracle, postgresql or mysql
      host: string, either an ip address or hostname where the database service is hosted
      port: integer, the port on which the database service is hosted
      databaseName: string, the name of the database, only required for PostgreSQL and Oracle
      secretName: the name of the Secret in the same namespace carrying admin credentials to the database service
      tablespace: (Oracle only)  the tablespace to use to create the required schemas in
      jdbcParameters: a map containing name-value pairs for any additional parameters required for the JDBC driver to connect to the database.

The Secret that will provide the admin credentials, identified by the
above `secretName` should look like this:

    Secret:
      name: string, any K8S compliant name
      namespace: string, the namespace this will be created in
      stringData:
        username: string, name of an admin user that can create schemas and other users
        password: string, password of the above user

### How it works

In order for the EntandoApp and EntandoPlugin deployer to pick up the
correct database service, the EntandoDatabaseService needs to be created
BEFORE the EntandoApps and EntandoPlugins are created. There can be
multiple EntandoDatabaseServices in the namespace, but they need to
point to database services of different vendors, i.e. PostgreSQL, Oracle
and MySQL. Entando currently cannot enforce any validation but if there
are two EntandoDatabaseServices that have the same DBMS vendor, it will
simply pick the first one and continue. Please ensure that only one
EntandoDatabaseService exists for each DBMS vendor you need to use.

Once the appropriate EntandoDatabaseServices have been created, any
EntandoApp or EntandoPlugin that is created will have to specify the
appropriate DBMS vendor in their `spec.dbms` property. If the
EntandoOperator detects an EntandoDatabaseService with a matching DBMS
vendor, it will continue to create the necessary schemas on the specific
database. If the EntandoOperator does not detect an
EntandoDatabaseService with a matching DBMS vendor, it will fall back
onto its default behaviour which is to create a matching Deployment and
spin up a database service from the same namespace. If the `spec.dbms`
property is not specified on an EntandoApp, the EntandoOperator will
default to PostgreSQL. If the `spec.dbms` property is not specified on
an EntandoPlugin, the EntandoOperator will assume that the EntandoPlugin
in question does not require a database and hence bypass any database
and schema creation.

When the EntandoOperator processes your Entandoapp or EntandoPlugin with
an appropriate `spec.dbms` specified, it will create a Schema/User pair
for each datasource required. A typical EntandoApp deployment requires 3
datasources (portdb,servdb and dedb). Plugins generally only require one
datasource (plugindb).

The database schema and user created will have the same name. The name
is derived from the name of the EntandoPlugin or EntandoApp by replacing
all characters that are not ANSI-SQL compliant with an underscore. The
datasource name is then suffixed to the schema name. When defining the
name of your app or plugin, please keep in mind that some DBMS vendors
do not support long schema names. Future versions of Entando will allow
you to override the schema prefix for an app or plugin, but for now this
is a limitation one has to keep in mind.

### Keeping track of credentials

The EntandoOperator generates a Kubernetes Secret for each schema/user
combination it creates. The name of this secret is the concatenation of
the name of the EntandoApp or EntandoPlugin, the datasource qualifier
and then the suffix "-secret". For instance, for an EntandoApp called
"my-app" the "portdb" datasource will have a corresponding Kubernetes
Secret called "my-app-portdb-secret". The EntandoOperator will never
overwrite or update an existing database secret. We generate a random
string for the password which is generally considered the safest
approach. If you do however wish to change the password in for the
resulting user, please remember to update the password on the Kubernetes
Secret too. Such an operation is however error prone and could result in
subsequent deployments failing.

The EntandoOperator’s schema creation logic is idempotent. If it
therefore finds that the generated schema/user combination found in the
associated Kuberentes Secret already exists, it won’t do anything.
However, it will attempt to log in, and if it fails to log in, it will
attempt to create the user. If the user already exists, but with a
different password than the one in the Kubernetes Secret, all subsequent
deployment operations will fail.

## Vendor specific notes

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

### Notes

Oracle has some rather complicated rules in building the correct
connection string. Please note that for the sake of portability and
lightweight image we are limited to the thin driver. The `databaseName`
could also be an Oracle service as opposed to an Oracle `SID`. Please
coordinate with your Oracle DB Admin to determine exactly what value to
use here. We strongly recommend testing your settings with some code or
a tool that constructs JDBC connection.

When the EntandoOperator prepares the schemas for your EntandoApp or
EntandoPlugin, it will create a user for every datasource required, and
as is standard behaviour for Oracle, that user will have its own schema
with the same name. Permissions are set up to ensure that one user
cannot access tables from another user’s schema. Please note that Oracle
limits schema names to 30 characters. If you intend to use Oracle,
please keep the name of your apps and plugins short enough. The suffixes
that we append to the app or plugin name to ensure the resulting schema
name is unique are usually shorter than 8 characters, so names of about
20 characters should be safe.

You can specify which tablespace Entando should use to create the
schemas in using the `spec.tablespace` property

#### ORA-01704: string literal too long

Entando requires extended datatypes to be activated in Oracle 12c and
higher
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

### Resulting Connection String

jdbc:mysql://10.0.0.13:3306

### Notes

MySQL doesn’t really support schemas, or more accurately, it doesn’t
distinguish between schemas and databases. For this reason, no
databaseName is required. The EntandoOperator will therefore create an
entirely new database for each datasource your EntandoApp or
EntandoPlugin requires. It will also create a user with the same name as
the database with permission set up to ensure one user cannot access the
database of another user. Please note that MySQL limits database names
to 63 characters. Keep this in mind when defining the names of your
EntandoApps and EntandoPlugins

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

PostgreSQL behaves very similar to Oracle when it comes to how it
associates a user with its own schema. The current username is used as a
default schema/prefix to resolve tables. As with Oracle, Entando ensures
that two users don’t have access to each other’s schemas.

## Skipping database preparation

When an Entando App is being deployed, there is an operator responsible for the entire deployment process. It takes care also of DB creation and preparation.
If you have an already prepared DB (schemas, tables, and all other stuff), you could skip schemas creation and DB preparation of the EntandoApp in order to speed up the deploy process.

You can achieve this by specifying some properties for the EntandoApp component present in the helm generated file. Look at [this](https://github.com/entando-k8s/entando-helm-quickstart) for more info.

For `spec.dbms` property you should choose `none`, then you should add all needed DB connection parameters.
After updating parameters with the one you need, you should end with a yaml like this:

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

### How it works

Using `spec.dbms: "none"` will cause the operator to skip that initial schema/user creation step entirely.
Then adding those variables under the `spec.environmentVariables` section will supply connection parameters that will be used by EntandoApp.
Keep in mind that all these parameters will be applied to each of the containers in the EntandoApp pod and that they will also override existing values.

## Liquibase Migration

Beginning with Entando 7.0, the Entando App Engine modules will implement automatic Liquibase migrations to manage structural changes to databases running on MySQL or PostgreSQL.

The parameter provided to the environment variable `DB_MIGRATION_STRATEGY` determines how required updates are applied to components of an existing database. Three database migration modes are supported and govern upgrade behavior:

- `auto` (default setting): The application will start and the database will update. Changes will be applied to each component introduced in Entando 7.0 and beyond.
- `disabled`: Database changes will be detected but not implemented. The application will not start and indicate which components require updates.
- `generate_sql`: The application will not start, but will generate all SQL scripts necessary to manually upgrade the database.
