---
sidebarDepth: 2
---

# Multitenancy on Entando

This tutorial is the starting point to add multitenancy infrastructure to your application. Following the integration of a few tools for the primary tenant, create your first secondary tenant.  

For more information on multitenancy on Entando, see []()

## Prerequisites
* [A working instance of Entando 7.2 or higher.](../../../docs/getting-started/README.md)

* Verify dependencies with the [Entando CLI](../../../docs/getting-started/entando-cli.md#check-the-environment): `ent check-env develop`

## Configure the Services

1. Configure a Redis cache management service for all the tenants. Redis integration tutorial

2. Add Solr integration for external search engine. Solr integration tutorial

3. Add CDS integration to manage static resources. CDS integration tutorial

4. Install first Tenant
	a. Import new realm for Keycloak by reconfiguring the realm from the Primary 
	b. Create SOLR core for tenant1 (different for standalone or cloud)
	c. Configure CDS (very involved)
	d. Databases: create a new schema for all tables for portdb & servdb
	e. Create and apply new ingress yaml
	f. Create & Apply new ConfigMap and edit de-app deployment to point to new ConfigMap
