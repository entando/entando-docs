---
sidebarDepth: 1
---

# API Documentation

This page provides Postman assets and a short guide for testing Entando CMS REST APIs.

## Postman Collections

- <a href="./postman/CMS_postman_collection.json" download="CMS_postman_collection.json">Download CMS Postman Collection</a>
- <a href="./postman/CMS_postman-environment.json" download="CMS_postman-environment.json">Download CMS Postman Environment</a>

## What This Is

This guide shows how to interact with the CMS through REST APIs using Postman. It is intended for developers and DevOps.

Note: while the examples focus on `GET` requests, the Postman collection may include additional endpoints for completeness.

## CMS REST API Overview

When moving from Entando 5.x (cloud-ready) to 6.x+ (cloud-native), the REST stack changed and some CMS endpoints were renamed. Legacy endpoints can still exist, but new development should rely on the REST APIs provided in the Postman collection associated with this page.

Responses are JSON, and the payload format may differ from legacy APIs even when the information is equivalent.

## Authentication

By default, Entando allows access to content in the `free` group without authentication. To access protected content or assets (non-`free` groups) or to perform create/update/delete operations, an authorization token is required.

Starting with Entando 6, authentication is delegated to Keycloak (OAuth 2). To test the CMS REST APIs, configure Postman to use the same Keycloak instance as your Entando environment.

### Postman Setup (Environment)

The environment file contains variables used by the collection. Update them for your target system, for example:

- `base_url`: FQDN + context of the Entando App Engine (de-app)
- `kc_base_url`: Keycloak base URL
- `realm`: Keycloak realm used by the de-app
- `client_id`: Keycloak client ID used for authentication
- `client_secret`: client secret (if applicable)

### Getting an Access Token

In Postman, open the collection authorization settings and use "Get New Access Token" to negotiate an access token with Keycloak. Once applied, requests in the collection will inherit the negotiated token.

If configuration is wrong, common causes include:

- Incorrect `kc_base_url`
- Incorrect callback/redirect URL configuration on the Keycloak client
- Wrong `realm`
- Wrong `client_id` / `client_secret`

### Refreshing the Access Token

When the access token expires, refresh it in Postman. If refresh is not possible, repeat the authentication flow to obtain a new token.

## CMS Contents Endpoint

The main CMS contents endpoint is:

<code v-pre>{{base_url}}/api/plugins/cms/contents</code>

Content search is performed via query-string parameters and filters. The collection includes examples for metadata filters and attribute filters.

### Attribute Filters

CMS attribute filters use a structure like:

```
filters[0].entityAttr:data_iniz
filters[0].type:date
filters[0].operator:gt
filters[0].value:2005-02-13 01:00:00
```

Supported `type` values include: `date`, `string`, `boolean`, `number`.

### Metadata Filters

Metadata filters use `attribute` (instead of `entityAttr`), for example:

```
filters[0].operator:eq
filters[0].attribute:typeCode
filters[0].value:EVN
```

Typical `attribute` values include: `lastmodified`, `typeCode`, `description`, `id`.

### Combining Filters

You can combine multiple filters by using sequential indexes starting at 0, without gaps (e.g. `filters[0]`, `filters[1]`, `filters[2]`, ...).

Supported operators include: `gt`, `lt`, `eq`, `not`, `like`.

To filter by an interval (e.g. date range), use two filters: one for the lower bound and one for the upper bound.

## Publication Status

By default, Entando searches content in `DRAFT` state. To restrict results to published content, use the `status` parameter, typically:

- `draft`
- `published`

## Escaping

Depending on the servlet container (for example, Tomcat), you may need to URL-encode square brackets in filter parameters:

```
filters%5B0%5D.entityAttr:hypertxt
filters%5B0%5D.type:string
filters%5B0%5D.operator:like
filters%5B0%5D.value:Italiano
```
