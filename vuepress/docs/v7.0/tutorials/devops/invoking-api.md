---
sidebarDepth: 2
---

# Invoking Entando Core APIs

Entando Core APIs can be called directly with Swagger or tools like curl and Postman. Entando uses Swagger to automatically generate OpenAPI documentation that allow such interactions. This tutorial describes how to set up an environment ready to invoke the APIs using Postman.

All Entando core APIs are accessible from a base URL such as localhost:8080/entando-de-app/api. For example, the page controller is available under /pages at the URL localhost:8080/entando-de-app/api/pages. The page template controller is available at localhost:8080/entando-de-app/api/pageModels.

To perform extensive testing with APIs on Postman, set up an environment and define a variable to host the access token saved with a POST request to /oauth/token. This should provide access to all API endpoints and actions for the user's defined privileges. 
    
> Refer to [User Management Roles](https://developer.entando.com/v7.0/docs/consume/identity-management.html#authorization) for more details.

## Prerequisites

* Basic knowledge of Postman. You can download the Postman Application or use Postman on the web. If you are using the latter, you will need to change the Keycloak configuration.
* A running Entando instance
* A running Jhipster application 
    
## Set Up a Postman Environment 

1. Create a new Postman environment and define the following variables:
```
access_token: #no value
refresh_token: #no value
url: #URL of your application (i.e. http://localhost:8080/entando-de-app)`
```
> Be careful with the URL variable and make sure you do not have a trailing slash.
2. Set Postman to use this environment.

## Get an Access Token

1. Create a new collection. Give it an appropriate name like "Access Token." 
2. Create a new POST request with the following parameters. Note we are calling the "URL" environment variable for convenience.
     
     * `URL` →  "/api/oauth/token"

     * `Auth` section
         1. `Type` → Basic Auth\
         2. Enter `Username` and `password`. Valid Entando credentials are required. It will be the same as used in the App Builder. 
   
     * `Headers` section \
         Create a new `KEY`: `VALUE` pair as shown: \
         "Content-Type" : "application/x-www-form-urlencoded"

     * `Body` section 
         1. Select from the drop-down arrow → "x-www-form-urlencoded" \
         2. Create key/value pairs for username and password.\
              "username" : #valid entando username such as `admin` \
              "password": #password of the valid user\
               grant_type: password`


     * `Tests` section\
       Enter the following code so new requests can make use of the access token. 
         ```
         var data = JSON.parse(responseBody);
         postman.setEnvironmentVariable("access_token", data.access_token);
         ```
          <details><summary>Details about the code</summary>The first line of code defines a variable called "data", which hosts the JSON parsed responseBody from the POST request sent to /oauth/token. The second line sets the environment variable "access_token" to the value returned by the POST request.</details>

3. Send the POST request.  If successful, you should get a response like this:\

     `{
      "access_token": "b96096493a40b1a7364bd54a6ffb609b",
      "token_type": "bearer",
      "refresh_token": "79ff84062b5dc13663961a833b0788f9",
      "expires_in": 3599
       }`

>If you go to edit the Postman environment you created, you should see that the access_token and the refresh_token variables values have been updated.

## Prepare a Generic API Request

1. Create a new request with the following parameters:

     * `Authorization` section: Inherit auth from parent

     * `Headers` section:
         * Create the key Authorization with Value: Bearer
         * Create the key Content-Type with Value: application/json`
 
2. Select the appropriate method (GET, DELETE, POST etc.) for your request and enter the URL with appropriate values, (i.e. localhost:8080/entando-de-app/api/pages). 
3. Add the relevant payload in JSON format to the Body section. Remember to select raw and JSON (application/json).
4. Submit your test to check for the appropriate response. 

* For more information on testing, the [Collection Runner on Postman](https://learning.postman.com/docs/running-collections/intro-to-collection-runs/) enables you to run the API requests in a collection in a specified sequence. 
* For more information on creating a collection for testing with Postman, go to [Testing an API](https://learning.postman.com/docs/designing-and-developing-your-api/testing-an-api/).





