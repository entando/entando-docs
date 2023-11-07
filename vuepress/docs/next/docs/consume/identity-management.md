---
sidebarDepth: 2
---

# Entando Identity Management System

The Entando Identity Management System is based on open source Keycloak. Entando Applications rely on a Keycloak instance that is either [externally installed](../../tutorials/consume/external-id-management.md) or specific to an application. The architecture and requirements to customize your Keycloak instance are described below.

## Logging into your Keycloak Instance

Keycloak is protected by a Secret deployed to your Entando Kubernetes instance. You can query Kubernetes for the Secret's default admin credentials via the following, modifying this command to use your environment's namespace and Secret name. 

>Note: Use the [ent CLI](../getting-started/entando-cli.md) to send commands to Kubernetes from the host machine.

```
kubectl get secret default-sso-in-namespace-admin-secret -n entando -o go-template="{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

To find the Secret name, run the command below and search for the Secret that ends in `namespace-admin-secret`.
```
kubectl get secrets -n entando
```

## Authentication
All authentication is powered by Keycloak on Entando. This ensures that a micro frontend can call a microservice with a token available to the client.

![Init Containers Screenshot](./img/keycloak-arch-high-level.png)

Entando implements Keycloak as a central point of authentication to provide a single, unified view of identity. This architecture increases portability. Keycloak acts as an abstraction layer to the underlying Identity Provider (IDP), allowing Entando to integrate into other IDPs without modifying the source.

## Authorization

### Role Assignment for Plugins/Microservices
Keycloak authorizes microservices using clients and roles. Authorizations are stored in a JSON Web Token and available to services when invoked.

Below are the steps to grant a user one or more roles for a specific client. This controls permissions when configuring the microservice. Note: when a microservice is installed in Entando, a corresponding client (and set of roles) is created per its plugin definition.

1. [Login to Keycloak](#logging-into-your-keycloak-instance), which for non-external Keycloak instances is [the base URL of your running Entando application](../getting-started/README.md#configure-access-to-your-cluster) followed by `/auth/`, e.g. http://YOUR-HOST-NAME/auth. In a standard Entando installation, the base URL can be verified with `kubectl get ingress/default-sso-in-namespace-ingress`.
2. Select `Users` from the menu on the left
3. Use the search box to find the appropriate user, e.g. "admin"
4. Click on the user ID

![find-admin.png](./img/find-admin.png)

5. Click on the `Role Mappings` tab
6. Use the `Client Roles` drop-down menu to specify the microservice client
7. Select from the client's `Available Roles`

![find-roles.png](./img/find-roles.png)

8. Use the `Add Selected` button to move the desired roles to `Assigned Roles`. These will subsequently appear under `Effective Roles`.

![assign-roles.png](./img/assign-roles.png)
### Core
When a user is authenticated to the `entando-core` via Keycloak, a copy of that user is added to the `entando-core` user management database to enable WCMS functionality. Within the App Builder, WCMS roles and groups can be assigned to a user for access to App Builder functions or `portal-ui` content in the runtime application.

The code that copies the user into the `entando-core` can be customized per implementation to automatically create groups and roles. See the [entando-keycloak-plugin](https://github.com/entando/entando-keycloak-plugin) for details of the code that copies users and data to the WCMS database. The README in that project includes properties that are available to your Entando Application.

See [KeycloakAuthorizationManager.java](https://github.com/entando/entando-keycloak-plugin/blob/master/src/main/java/org/entando/entando/keycloak/services/KeycloakAuthorizationManager.java) for an example of adding attributes programatically. In particular, refer to the [processNewUser](https://github.com/entando/entando-keycloak-plugin/blob/master/src/main/java/org/entando/entando/keycloak/services/KeycloakAuthorizationManager.java#L43) method.

## Social Login

Keycloak allows Entando to provide social login as an out-of-the-box capability. [Keycloak Social Identity Providers](https://www.keycloak.org/docs/18.0/server_admin/index.html#social-identity-providers) documents how to enable and configure social logins in your Entando Applications.

## One Time Passwords

Keycloak enables One Time Passwords (OTP) login to Entando Applications. See [Keycloak OTP Policies](https://www.keycloak.org/docs/18.0/server_admin/index.html#one-time-password-otp-policies) to configure and enable OTP in your application.

## Themes, Look and Feel

Developers can customize the look and feel of the login page, as well as the identity management system that ships with Entando. The [Keycloak Theme Documentation](https://www.keycloak.org/docs/18.0/server_development/#_themes) provides instructions for creating your own theme. Alternatively, you can modify the [Entando Theme](https://github.com/entando/entando-keycloak/tree/master/themes/entando).

## Options
### Configuring Keycloak with an External Oracle DBSM

This example shows the method to enable the Entando Operator to auto-provision external Oracle databases for all of its needs, including Keycloak, PORTDB, SERVDB, and DEDB. 

The process requires the reformulation of the custom resources for the App Engine, Keycloak server and database service. Replace the variables as required by your application, paying special attention to variables with the prefix `YOUR-`.

1. Update the EntandoApp custom resource, using your namespace and application name. 
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

[EntandoApp Custom Resource definitions](../reference/entandoapp-cr.md)

2. Update the EntandoKeycloakServer custom resource

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
  [EntandoKeycloakServer custom resource definitions](../reference/keycloak-cr.md)

3. Update the EntandoDatabaseService custom resource

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
[EntandoDatabaseService Custom Resource definitions](../reference/database-cr.md)

