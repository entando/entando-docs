---
sidebarDepth: 1
---


# Overview

An API claim informs the Entando Platform that a microfrontend (MFE) or microservice (MS) intends to use the API of another microservice. This request can be sent within a single bundle or across bundles. The abstraction of an API claim eliminates the need to define and manage API endpoints, both in local development and within a running instance.

## Internal vs. External API Claim

An MFE can initiate both internal and external API claims. An internal API claim specifies an MS API existing in the same bundle as the MFE, while an external API claim specifies the MS API of another bundle.

The structure of internal and external API claims are as follows:

**Internal API claim**
``` json
{
    "name": "int-api",
    "type": "internal",
    "serviceName": "int-ms"
}
```
**External API claim**
``` json
{
    "name": "ext-api",
    "type": "external",
    "serviceName": "ext-ms",
    "bundle": "registry.hub.docker.com/my-org/my-entando-bundle"
}
```

## API Claim Commands

Common operations associated with API claims are detailed below.

The `ent profile` command is available to manage and switch between the configurations of different Entando instances. Refer to `ent profile first-use-readme` for additional information.

| Command | Description
| :- | :-
| `api add [mfe-name] [claim-name]` | Add an internal API claim to an MFE
| `api add-ext [mfe-name] [claim-name]` | Add an external API claim to an MFE
| `api rm [mfe-name] [claim-name]` | Remove an API claim from an MFE

**Command details:**
- `api add` supports the following options:
   - `service-name`: The name of a microservice in the same bundle as the micro frontend
   - `service-url`: The URL of a microservice deployed in the local environment

- `api add-ext` supports the following options:
   - `bundle`: The external bundle URL
   - `service-name`: The name of a microservice in the external bundle. If `service-name` is not set, `api add-ext` will initiate an interactive mode where the user can select from available bundles and microservices.

## API Claim YAML Descriptor Mapping

When the YAML descriptor of a micro frontend is generated (i.e. via the `pack` command), the API claim mapping is similar to the following:

``` yaml
apiClaims:
	- name: int-api
		type: internal
		serviceName: int-ms
	- name: ext-api
		type: external
		bundle: registry.hub.docker.com/cecchisandrone/entando-simple-bundle
		serviceName: ext-ms
```

- `name` and `type` correspond to the same fields in the API claim source descriptor
- `pluginName` corresponds to `serviceName`
- `bundleId` is a generated ID derived from the bundle