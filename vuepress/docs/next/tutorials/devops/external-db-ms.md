---
sidebarDepth: 2
---

# External DBSM for Microservices in a Bundle
The Entando ACP provides an option for microservices to utilize an external DBSM based on [Spring Dynamic DataSource Routing](https://spring.io/blog/2007/01/23/dynamic-datasource-routing). The routing DataSource acts as an intermediary while the actual DataSource is determined dynamically at runtime with a lookup key.

This tutorial covers the process to configure the external database for a Bundle.

## Prerequisites

- An environment to install your Entando Application
- A running PostgreSQL, MySQL, or Oracle environment
- Administrator access to the database
- Network access from your Kubernetes cluster to your database
- An [Entando Bundle](../../docs/curate/bundle-details.md) project

## Tutorial

1. In the Bundle descriptor `entando.json` microservice section, set `dbms`: `none` to prevent the operator from configuring the internal DB.
2. For each microservice that is using an external DB, add an `env` section with the username, password, URL, and connection driver as required for the connection.
3. Pack, publish and deploy your Bundle. 
<EntandoInstallBundle/>
4. Once installed, provide admin access to the microservice to interact with it as needed from the Keycloak Administration Console. 
     1. Go to the specific realm of the tenant where the bundle was installed. 
     2. Go to `User` from the left navigation menu, click `View all users`
     3. Select the `admin` user 
     4. Select the `Role Mapping` tab and add the microservice role under the `Client Roles` drop-down list to the `Assigned Roles`

## Sample Descriptor

The following entando.json shows the data required for a sample microservice named YOUR-MS-SQL.

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