---
sidebarDepth: 2
---

# External DBMS for Multitenant Microservices
This tutorial describes how to configure external databases for microservices in a bundle to be used in a multitenant application.  

## Prerequisites

- A [multitenant environment](./multitenancy.md)
- A working PostgreSQL, MySQL, or Oracle datasource
- Administrator access to the database
- Network access from your Kubernetes cluster to your database
- An [Entando Bundle](../../docs/curate/bundle-details.md) project

## Tutorial
Environment variables can be used in the bundle descriptor, `entando.json`, to define the behavior of a microservice and/or provide default values for the shared external datasource. This tutorial uses the Spring framework for datasource routing, but if you are using a different framework, implement the environment variables required for that setup. 

If microservice data needs to be differentiated between tenants, a plugin configuration Secret must be used with the specifications to establish the connections to the DBs. In all cases, the plugin configuration Secret will override the values defined in the bundle descriptor. 

### Adapt the Bundle for Multitenancy

1. In your bundle descriptor `entando.json` microservice section, set `dbms`: `none` to prevent the operator from configuring the internal DB.
2. For each microservice using an external DB, add an `env` section with the Spring username, password, URL, and driver as required for the connection.

The following `entando.json` shows the specifications required for a sample microservice named YOUR-MS-SQL: 

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
Prior to installing a bundle, a plugin configuration Secret should be created to provide a different datasource for each tenant. Create a Secret for each microservice in the bundle to provide a series of values required by the Spring framework (or for the framework you are using) for every tenant as needed.  

1. Retrieve the plugin code:
 ```
 ent ecr get-plugin-code YOUR-ORG/YOUR-MS-NAME --repo=docker://registry.hub.docker.com/YOUR-ORG/YOUR-BUNDLE-NAME
 ```

2. Create the JSON plugin configuration Secret for the microservice plugin, with a name that reflects the plugin-code as Kubernetes is not tenant aware.

   The name should be the concatenation of the plugin-code, microservice name, plus "conf", connected by dashes.

   E.g.  
   plugin-code = `pn-hasldk12-8dsjahj2`, microservice name = YOUR-MS-NAME  
   Your Plugin Configuration Secret= `pn-hasldk12-8dsjahj2-YOUR-MS-NAME-conf`

3. Add the following env vars per tenant. The key for your primary tenant must be 'primary' regardless of what the actual tenant name is. Secondary tenant keys should use YOUR-TENANT-NAME, or the unique part of the domain given to the tenant. Add the key-value pairs for the Spring Datasource username, password, URL, and connection driver, in a base 64 encoded format.

This is a decrypted example of a plugin configuration Secret:
``` json
apiVersion: v1
kind: Secret
metadata:
  name: pn-hasldk12-8dsjahj2-YOUR-MS-NAME-conf
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
          "name": "pn-hasldk12-8dsjahj2-YOUR-SECRET-PRIMARY",
          "key": "username"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_PASSWORD",
      "valueFrom": {
        "secretKeyRef": {
          "name": "pn-hasldk12-8dsjahj2-YOUR-SECRET-PRIMARY",
          "key": "password"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_URL",
      "valueFrom": {
        "secretKeyRef": {
          "name": "pn-hasldk12-8dsjahj2-aYOUR-SECRET-PRIMARY",
          "key": "url"
        }
      }
    },
    {
      "name": "SPRING_JPA_DATABASE_PLATFORM",
      "value": "org.hibernate.dialect.PostgreSQLDialect"
    }
  ]
}
  YOUR-TENANT1-NAME: >-
    {
  "environment_variables": [
    {
      "name": "SPRING_DATASOURCE_USERNAME",
      "valueFrom": {
        "secretKeyRef": {
          "name": "pn-hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "username"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_PASSWORD",
      "valueFrom": {
        "secretKeyRef": {
          "name": "pn-hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "password"
        }
      }
    },
    {
      "name": "SPRING_DATASOURCE_URL",
      "valueFrom": {
        "secretKeyRef": {
          "name": "pn-hasldk12-8dsjahj2-YOUR-SECRET-TENANT1",
          "key": "url"
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
The `secretKeyRef` `name` must also follow a similar convention as the plugin configuration Secret name, with the plugin code concatenated to primary or the tenant name with dashes. Additional terms may be added in between to better identify the reference name.  
`secretKeyRef` `name` = `Plugin Code`-SECRET-YOUR-TENANT1-NAME

For more details, see [Managing Secrets Using Configuration Files](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-config-file/).

5. Apply the Secret in the current namespace:
```
kubectl apply -f pn-hasldk12-8dsjahj2-YOUR-MS-NAME-conf -n YOUR-NAMESPACE
```

6.  Add the bundle to an [enterprise Entando Hub](../solution/entando-hub.md) to share and access from any tenant. You will have to [add the registry](../solution/entando-hub.md#add-a-catalog-as-a-registry-in-your-app-builder) to the Local Hub of the tenant to install the bundle. 
