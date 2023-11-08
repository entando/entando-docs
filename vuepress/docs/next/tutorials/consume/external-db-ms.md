---
sidebarDepth: 2
---

# External DBMS for Multitenant Microservices
In a multitenant environment, microservices can be configured with an external DBMS with [Spring Dynamic DataSource Routing](https://spring.io/blog/2007/01/23/dynamic-datasource-routing) to simplify the complexity of providing datasources for the same bundle across different tenants. The routing datasource acts as an intermediary while the actual one is determined dynamically at runtime with a lookup key.

This tutorial describes how to configure external databases for a microservice when a bundle is used in a multitenant environment.

## Prerequisites

- A [multitenant environment](./multitenancy.md)
- A running PostgreSQL, MySQL, or Oracle datasource
- Administrator access to the database
- Network access from your Kubernetes cluster to your database
- An [Entando Bundle](../../docs/curate/bundle-details.md) project

## Tutorial
Environment variables can be used in the bundle descriptor, `entando.json`, to define the behavior of a microservice and/or provide default values for the Spring DataSource Routing. If data needs to be differentiated between tenants, a plugin configuration Secret must be used with the Spring specifications to automatically establish the connections to the DBs. In all cases, the plugin configuration Secret will override the values defined in the bundle descriptor if one exists.

### Adapt the Bundle for Multitenancy

1. In your bundle descriptor `entando.json` microservice section, set `dbms`: `none` to prevent the operator from configuring the internal DB.
2. For each microservice that is using an external DB, add an `env` section with the Spring username, password, URL, and driver as required for the connection.

The following `entando.json` shows the specs required for a sample microservice named YOUR-MS-SQL: 

```json
{
  "microservices": [
        {
            "name": "YOUR-MS-SQL",
            "dbms": "none",
            "env": [
                {
                    "name":"SPRING_DATASOURCE_USERNAME",
                    "valueFrom": {
                        "secretKeyRef": {
                            "name": "ed1d60fc-285a480f-external-books-service-mysql-secret",
                            "key": "SPRING_DATASOURCE_USERNAME"
                        }
                    }
                },
                {
                    "name":"SPRING_DATASOURCE_PASSWORD",
                    "valueFrom": {
                        "secretKeyRef": {
                            "name": "ed1d60fc-285a480f-external-books-service-mysql-secret",
                            "key": "SPRING_DATASOURCE_PASSWORD"
                        }
                    }
                },
                {
                    "name":"SPRING_DATASOURCE_URL",
                    "valueFrom": {
                        "secretKeyRef": {
                            "name": "ed1d60fc-285a480f-external-books-service-mysql-secret",
                            "key": "SPRING_DATASOURCE_URL"
                        }
                    }
                },
                {
                    "name":"SPRING_JPA_DATABASE_PLATFORM",
                    "value": "org.hibernate.dialect.MySQL8Dialect"
                }
            ]
        }
    ]
    ...
    "name": "YOUR-BUNDLE-NAME",
    "version": "1.0.0",
    "description": "a description",
    "type": "bundle"
}
```
3. Pack and publish your bundle:
```
  ent bundle pack
  ent bundle publish
```

### Create and Apply a Plugin Configuration Secret
Prior to installing a bundle, a plugin configuration Secret must be created to provide a different datasource for each tenant. Create a Secret for each microservice in the bundle to provide a series of values required by the Spring Dynamic Datasource Routing for every tenant as needed.  

1. Retrieve the bundle ID and the plugin code:
 ```
 ent ecr get-bundle-id docker://registry.hub.docker.com/YOUR-ORG/YOUR-BUNDLE
 ```
 ```
 ent ecr get-plugin-code YOUR-ORG/YOUR-MS-NAME --repo=docker://registry.hub.docker.com/YOUR-ORG/YOUR-BUNDLE
 ```
 
2. Create the JSON plugin configuration Secret for the microservice plugin with a name that reflects the bundle ID and plugin code as Kuternetes is not tenant aware.

   The name should begin with "pn" plus the concatenation of the bundle ID, plugin code, and microservice name, connected by dashes. The name can be appended with suffixes such as "SECRET" for better identification.  

   E.g.  
   Bundle ID = `hasldk12`, Plugin Code = `8dsjahj2`, Microservice name = YOUR-MS-NAME  
   Your Configuration Secret= `pn-hasldk12-8dsjahj2-YOUR-MS-NAME-SECRET`

3. Add the following env vars per tenant. The key for your primary tenant must be 'primary' regardless of what the actual tenant ID is. Secondary tenant keys should refer to their tenant IDs. Add the key-value pairs for the Spring Datasource Username, password, URL, and connection driver, in a base 64 encoded format.

This is a decrypted example of a plugin configuration Secret:
``` json
apiVersion: v1
kind: Secret
metadata:
  name: pn-hasldk12-8dsjahj2-YOUR-MS-NAME-SECRET
  namespace: YOUR-NAMESPACE
type: Opaque
data:
  primary: >-
    {
  "environment_variables": [
    {
      "name": "SPRING_DATASOURCE_USERNAME",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-YOUR-SECRET-PRIMARY",
          "key": "YOUR-USERNAME"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_PASSWORD",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-YOUR-SECRET-PRIMARY",
          "key": "YOUR-PASSWORD"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_URL",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-aYOUR-SECRET-PRIMARY",
          "key": "YOUR-URL"
        }
      }
    },
    {
      "name": "SPRING_JPA_DATABASE_PLATFORM",
      "value": "org.hibernate.dialect.PostgreSQLDialect"
    }
  ]
}
  tenant1: >-
    {
  "environment_variables": [
    {
      "name": "SPRING_DATASOURCE_USERNAME",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "YOUR-USERNAME"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_PASSWORD",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "YOUR-PASSWORD"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_URL",
      "valueFrom": {
        "secretKeyRef": {
          "name": "hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "YOUR-URL"
        }
      }
    },
    {
      "name": "SPRING_JPA_DATABASE_PLATFORM",
      "value": "org.hibernate.dialect.PostgreSQLDialect"
    }
  ]
}
```
The `secretKeyRef` `name` must also follow the same convention as the plugin configuration Secret, with the bundle ID and plugin code concatenated to the tenant reference name with dashes.
`secretKeyRef` `name` = `Bundle ID`-`plugin Code`-YOUR-SECRET-PRIMARY

For more details, see [Managing Secrets Using Configuration Files](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-config-file/).

5. Apply the Secret in the current namespace:
```
kubectl apply -f pn-hasldk12-8dsjahj2-YOUR-MS-NAME-SECRET -n YOUR-NAMESPACE
```

6. Deploy and install your bundle:
```
ent bundle deploy 
ent bundle install
```
7. Confirm that the environment variables were propagated to the microservice in the container with the echo command to check its values.



