---
sidebarDepth: 2
---

# Invoking Entando Core APIs

This tutorial describes how to invoke Entando Core APIs using Postman. Entando uses Swagger to automatically generate OpenAPI documentation that describes the available APIs.

Entando core APIs are accessible from a base URL such as localhost:8080/entando-de-app/api. For example, the page controller is available under /pages at the URL localhost:8080/entando-de-app/api/pages. The page template controller is available at localhost:8080/entando-de-app/api/pageModels.

For Postman assets, environment configuration, and token setup, refer to [API Documentation](../../docs/api/#postman-collections). That section provides the downloadable Postman collection and environment files, along with guidance for obtaining an access token and authenticating requests.
    
> Refer to [User Management Roles](../../docs/consume/identity-management.md#authorization) for more details.

## Prerequisites

* Basic knowledge of Postman. You can download the Postman application or use Postman on the web. The latter requires changes to the Keycloak configuration.
* A local running copy of the Entando App Engine. For more details, refer to the [Entando App Engine GitHub Readme](https://github.com/entando/app-engine/blob/v7.5.1/README.md).
* An enabled Swagger UI
    
## Set Up Postman

1. Open the [API Documentation](../../docs/api/#postman-collections) page and download the Postman collection and environment files.
2. Import those files into Postman.
3. Update the environment values for your target Entando and Keycloak instance, as described in the API documentation.
4. Complete the authentication flow described in the API documentation to obtain an access token for your requests.

## Prepare a Generic API Request

1. Create a new request with the following parameters:

     * `Authorization` section \
         `Type`: "Inherit auth from parent"

     * `Headers` section \
         Create the following Key-Value pairs:
         * `Key`: "Authorization", `Value`: "Bearer"
         * `Key`: "Content-Type", `Value`: "application/json"
 
2. Select the appropriate method (GET, DELETE, POST, etc.) for your request and enter the URL with appropriate values, (i.e. localhost:8080/entando-de-app/api/pages). 
3. Add the relevant payload in JSON format to the Body section. Remember to select raw and JSON (application/json).
4. Submit your test to check for the appropriate response. 

* For more information on comprehensive testing, the [Collection Runner on Postman](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/) enables you to run the API requests in a collection in a specified sequence. 
* For more information on creating a collection for testing with Postman, go to [Testing an API](https://learning.postman.com/docs/designing-and-developing-your-api/testing-an-api/).
