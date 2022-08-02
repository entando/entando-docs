---
sidebarDepth: 1
---


# Overview

An API claim informs the Entando Platform that a micro frontend (MFE) intends to use the API of a microservice (MS). This request can be sent within a single bundle or across bundles. The abstraction of an API claim eliminates the need to define and manage API endpoints, both in local development and within a running instance.

## Internal vs. External API Claim

An MFE can initiate both internal and external API claims. An internal claim specifies an MS API in the same bundle as the MFE, while an external claim specifies the MS API of another bundle in the same Kubernetes namespace. 

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

Common operations associated with API claims are detailed below. To execute `ent bundle api` subcommands, the user must be connected to a running Entando instance (via `ent attach-*`) or the CLI will generate an authentication error.

| Command | Description
| :- | :-
| `ent bundle api add [mfe-name] [claim-name]` | Add an internal API claim to an MFE
| `ent bundle api add-ext [mfe-name] [claim-name]` | Add an external API claim to an MFE
| `ent bundle api rm [mfe-name] [claim-name]` | Remove an API claim from an MFE

**Command details:**
- `api add` supports the following options:
   - `service-name`: The name of a microservice in the same bundle as the micro frontend
   - `service-url`: The URL of a microservice deployed in the local environment

- `api add-ext` supports the following options:
   - `bundle`: The external bundle URL
   - `service-name`: The name of a microservice in the external bundle. If `service-name` is not set, `api add-ext` will initiate an interactive mode where the user can select from available bundles and microservices.

- `api add-ext` requirements:
   - Connection to an Entando instance
   - The cluster contains the service specified in the API claim
   - The external service has already been deployed

- Executing `api add-ext` without flags:
   - Returns the current instance
   - Displays the instance's available services for interactive selection

## Microservice URL Retrieval

To render an MFE installed from a bundle, Entando injects a JSON object containing configuration details inside the "config" attribute of a custom HTML element, e.g. `<my-mfe config="{ ... }" />`.

**Installed Bundles**

To retrieve the URL of an MS declared through an API claim, add `systemParams.api[claimName].url` to the MFE JavaScript code so it can access that element of the config object. The `claimName` was chosen by the user when the API claim was defined.

Refer to the Entando demo bundles for alternative retrieval methods that are more robust and consider cases where the parent object is not defined.

**Local Bundles**

When testing an MFE locally, the MS URL can be retrieved from the `mfe-config.json` file in the "public" MFE folder, e.g:
```
{
    "systemParams": {
        "api": {
            "my-api-claim": {
                "url": "http://localhost:8082"
            }
        }
    }
}
```

This file is not used outside of local testing. The configuration data of installed bundles are provided by the Entando instance.

The commands that add and remove API claims update `mfe-config.json` automatically.