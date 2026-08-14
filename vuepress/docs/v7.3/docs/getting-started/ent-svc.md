---
sidebarDepth: 1
---

# Auxiliary Services

Auxiliary services add capabilities to a local environment for application development. This is in contrast to developing on Kubernetes, where the equivalent services are either provisioned by the Entando Platform or are externally managed and pointed to by the application.

To run auxiliary operations, a service must be enabled. When the Entando CLI enables a service for a bundle, a default auxiliary configuration is generated and formatted as a Docker Compose YAML file in the bundle's "svc" folder. Enabled services are listed under the `svc` attribute of the bundle descriptor `entando.json`.

The following sections describe how Entando supports and implements auxiliary services.

## Default Services

Three services are available out of the box: `mysql`, `postgresql` and `keycloak`. 

- `mysql` and `postgresql` obey the same naming convention
   - The username and password are derived from the bundle name, e.g. YOUR-BUNDLE has the username YOUR-BUNDLE-USER and the password YOUR-BUNDLE-PASSWORD
   - A database is automatically created and given the name, e.g. YOUR-BUNDLE

- `keycloak` manages authentication for Entando
   - The `keycloak` realm name is `entando-dev`
   - The console is accessible at *http://localhost:9080* with username: *admin*, password: *admin*
   - All roles and permissions are preset, based on the Keycloak realm-config file
   - The `keycloak.yaml`, realm-config, and user config files are located in the "keycloak" folder inside "svc"

## Custom Services

A custom service can be added to a bundle's "svc" folder as a Docker Compose YAML file. The file and service must have the same name, e.g. if the service filename is `mysql.yml`, then the service name must be `mysql`:

``` yaml
version: '3.7'

services:
	# since filename is mysql.yml, service name is 'mysql' as declared below:
	mysql: 
		image: mysql
    ...
```

## Commands

The subcommands of `ent bundle svc` are used to manage services.  

| Command | Description
| :- | :-
| `ent bundle svc enable <service_name>` | Adds the service(s) to the bundle’s auxiliary services
| `ent bundle svc disable <service_name>` | Removes the service(s) from the bundle’s auxiliary services
| `ent bundle svc start <service_name>` | Starts the enabled service(s) 
| `ent bundle svc stop <service_name>` | Stops the enabled service(s)
| `ent bundle svc restart <service_name>` | Restarts the enabled service(s)
| `ent bundle svc logs <service_name>` | Prints the enabled service log(s)
| `ent bundle svc list` | Lists all enabled services

**Command details:**

- `svc logs`: The log of a running service will continue to update until exited via `Ctrl+C`.

- `svc list`: Include the option `--available` to list all services located in the "svc" bundle folder.

- Auxiliary commands can operate on multiple services by listing each service name as an argument, e.g. `ent bundle svc start service_1 service_2`. The option `--all` applies the command to all enabled bundle services.