# Connect to an External Keycloak Instance

## Purpose

This tutorial details how an Entando instance can be connected to an existing Keycloak instance by an admin user of the Keycloak instance.

## Prerequisites

-   A Keycloak instance
-   A realm named "entando" in that instance
-   Admin user credentials for the "entando" realm

## Steps

### 1. Get Keycloak information

Retrieve the following information from the existing Keycloak instance:

-   The username of the Keycloak admin with rights to the "entando" realm, e.g entando-keycloak-admin
-   The Keycloak admin password, e.g. password123
-   The base URL for the Keycloak server, including the auth value, e.g. https://YOUR-KEYCLOAK-INSTANCE.com/auth

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
        namespace: YOUR-APP-NAMESPACE
    type: Opaque

The client for the admin user will automatically detect this Secret by name and use it to log in to the Keycloak server at the specified URL.

> **Note**
> To encode a value in bash, use `echo YOUR-SECRET-VALUE | base64`

### 3. Upload the Secret

Upload the Secret to the namespace where you want to deploy your Entando instance:

    oc create -f YOUR-SECRET.yaml -n YOUR-NAMESPACE

### 4. Create a YAML configuration file

Create a YAML file to configure Keycloak, based on the following template:

```
apiVersion: entando.org/v1
kind: EntandoKeycloakServer
metadata:
  name: external-keycloak
  namespace: {{ namespace }}
spec:
  environmentVariables: []
  provisioningStrategy: UseExternal
  adminSecretName: keycloak-admin-secret
  frontEndUrl: >-
    http://<keycloak_url>/auth
```

### 5. Apply the YAML configuration file

Apply the YAML configuration file to the namespace where you want to deploy your Entando instance:

```
kubectl apply -f YOUR-YAML-FILE.yaml -n YOUR-NAMESPACE

```

### 6. Deploy the Entando Application

You are now ready to deploy your Entando Application. The admin user clien will reuse *keycloak-admin-secret* to populate the environment correctly.

## Conclusion

You should now have a working Entando instance connected to an external Keycloak server.

