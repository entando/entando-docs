---
sidebarDepth: 2
---

# EntandoDatabaseService Custom Resource Definition 
 
The EntandoDatabaseService CRD instructs Entando to an external, internal, or auto-provisioned database service. Currently, PostgresSQL, MySQL, and Oracle are accepted. 
 
### Example EntandoDatabaseService CR

```yaml 
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
```
 

### Specifications

| Spec Name | Description |
| :- | :- |
|`spec.databaseName`| The name of the database that the Entando Operator should be creating schemas in. This property is not used with MySQL DBMS.|
|`spec.dbms`| Valid values are `oracle`, `postgresql` and `mysql`. With Oracle, the `createDeployment` attribute must be set to `false`, allowing it to be set up as an external DB.|
|`spec.environmentVariables`| A list of environment variables following the standard structure of Kubernetes environment variables.|
|`spec.host`| IP address or hostname of the external database.|
|`spec.jdbcParameters`| Standard JDBC connection parameters.|
|`spec.port`| The port that the external database service is running on. This value is optional.|
|`spec.secretName`| Secret containing DB credentials capable of creating users and databases. |
|`spec.tablespace`| Only required for Oracle so schemas can be created in different tablespaces.|



 
 <!--for secretName, link to credentials secret format-->
