---
sidebarDepth: 2
---

# Connect to an External Keycloak Instance

This tutorial details how Entando can be connected to an existing Keycloak instance.

## Prerequisites

-   A Keycloak instance
-   A realm named "entando" in that instance
-   Admin user credentials for the "entando" realm. These are the credentials (username/password) for the service account that has the correct level of admin access.

## Tutorial

### 1. Get Keycloak information

Retrieve the following information from the existing Keycloak instance:

-   The username of the admin user with rights to the "entando" realm, e.g entando-keycloak-admin
-   The admin user password, e.g. password123
-   The base URL for the Keycloak server, including the auth value, e.g. https://YOUR-KEYCLOAK-INSTANCE.com/auth

> **Note** When connecting an external Keycloak instance to Entando, it is a good practice to provide the admin credentials for a dedicated service account.
### 2. Generate the Secret

Generate a Secret named *keycloak-admin-secret* with the information retrieved in Step 1. For example:

    ---
    apiVersion: v1
    stringData:
        username: #the username of the Keycloak admin user for the "entando" realm
        password: #the password of the Keycloak admin user
        url: #the base URL of the Keycloak service, typically ending with the path /auth
    kind: Secret
    metadata
        name: keycloak-admin-secret
        namespace: entando 
    type: Opaque

Entando supplies the Keycloak APIs with the admin credentials they require to provision the "entando" realm via the named Secret.

> **Note** To encode a value in bash, use `echo YOUR-SECRET-VALUE | base64`

### 3. Create the Secret

Apply the Secret to the namespace where you want to deploy your Entando instance:

    kubectl apply -f keycloak-admin-secret.yaml -n entando

### 4. Create a YAML configuration file

Create a YAML file to configure Keycloak, based on the following template:

```
apiVersion: entando.org/v1
kind: EntandoKeycloakServer
metadata:
  name: external-keycloak
  namespace: entando
spec:
  environmentVariables: []
  provisioningStrategy: UseExternal
  adminSecretName: keycloak-admin-secret
  frontEndUrl: >-
    http://KEYCLOAK-URL/auth
```

### 5. Apply the YAML configuration file

Apply the YAML configuration file to the namespace where you want to deploy your Entando instance:

```
kubectl apply -f YOUR-YAML-FILE.yaml -n entando

```

### 6. Deploy the Entando Application

You are now ready to deploy your Entando Application. Entando will use the *keycloak-admin-secret* to populate the environment correctly. 

This should result in a working Entando instance that is connected to an external Keycloak server.

### Next Steps
Refer to the [learning path tutorials](../README.md#operations) to install, configure and customize your Entando instance.

## Option: Configure Keycloak with an External Oracle DBMS

This example shows the method to enable the Entando Operator to auto-provision external Oracle databases for all of its needs, including Keycloak, PORTDB, SERVDB, and DEDB. See the [Entando databases management page](../../docs/reference/databases.md) for more information.

The process requires the reformulation of the custom resources for the App Engine, Keycloak server and database service. Replace the variables below as required by your application, paying special attention to variables with the prefix `YOUR-`.

1. Update the EntandoApp custom resource definition, using your namespace and application name: 
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
      value: jdbc:oracle:thin:@//*****************************:1521/*******
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
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleValidConnectionChecker
    - name: PORTDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleExceptionSorter
    - name: SERVDB_URL
      value: jdbc:oracle:thin:@//*********************************:1521/******
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
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleValidConnectionChecker
    - name: SERVDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleExceptionSorter
    - name: SPRING_DATASOURCE_URL
      value: jdbc:oracle:thin:@//*************:1521/********
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
      value: org.hibernate.dialect.OracleDialect
    - name: SERVDB_CONNECTION_CHECKER
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleValidConnectionChecker
    - name: SERVDB_EXCEPTION_SORTER
      value: org.jboss.jca.adapters.jdbc.extensions.oracle.OracleExceptionSorter
  replicas: 1
```

[EntandoApp Custom Resource definitions](../../docs/reference/entandoapp-cr.md)

2. Update the EntandoDatabaseService custom resource definition:

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
  dbms: oracle
  provisioningStrategy: UseExternal
  host: *********
  port: 1521
  databaseName: ******
  secretName: postgresql-secret
  providedCapabilityScope: YOUR-NAMESPACE
  replicas: 1
```
[EntandoDatabaseService Custom Resource definitions](../../docs/reference/database-cr.md)

3. Update the EntandoKeycloakServer custom resource definition:

``` yaml
kind: EntandoKeycloakServer
apiVersion: entando.org/v1
metadata:
  labels:
    entando.org/capability: Sso
    entando.org/capability-provision-scope: Namespace
  name: YOUR-KEYCLOAK-NAME
  namespace: YOUR-NAMESPACE
spec:
  dbms: none
  environmentVariables:
    - name: DB_VENDOR
      value: oracle
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          key: password
          name: YOUR-POSTGRESQL-SECRET
    - name: DB_USER
      valueFrom:
        secretKeyRef:
          key: username
          name: YOUR-POSTGRESQL-SECRET
#    - name: KC_DB_URL
#      value: jdbc:oracle:thin:@//**********:1521/*****
    - name: DB_DATABASE
      value: *********
    - name: DB_ADDR
      value: **************
    - name: DB_PORT
      value: "1521"
  ingressHostName: YOUR-APP-NAME.k8s-entando.org
  isDefault: false
  provisioningStrategy: DeployDirectly
  replicas: 1
  standardImage: keycloak
```
  [EntandoKeycloakServer custom resource definitions](../../docs/reference/keycloak-cr.md)

