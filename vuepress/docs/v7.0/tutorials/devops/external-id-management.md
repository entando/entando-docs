# Connect to an External Keycloak Instance

## Purpose

This tutorial details how Entando can be connected to an existing Keycloak instance.

## Prerequisites

-   A Keycloak instance
-   A realm named "entando" in that instance
-   Admin user credentials for the "entando" realm. These are the credentials (username/password) for the service account that has the correct level of admin permissions.

## Steps

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

Via the named Secret, Entando supplies the Keycloak APIs with the admin credentials they require to provision the "entando" realm.

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

## Conclusion

This should result in a working Entando instance that is connected to an external Keycloak server.


