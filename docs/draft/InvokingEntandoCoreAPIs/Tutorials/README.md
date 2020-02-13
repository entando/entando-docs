
# Tutorial: Invoking Entando Core APIs

## General Overview

Entando supports Swagger and it is accessible, if activated, from its web
interface from the base application URL at /api/swagger-ui.html.
A complete list of all available Core APIs can be obtained from Swagger.

Core APIs can be invoked directly from Swagger or from any other suitable tool
ie. curl or Postman just to name the most common ones.
Postman has been extensively used in API testing and automated API testing because of the
possibilities it offers and it is the suggested tool.

All Entando Core APIs are accessible from the Base URL, for example:
localhost:8080/entando-de-app/api.
So for example the Page Controller will be available under /pages from the Base URL (i.e. localhost:8080/entando-de-app/api/pages), or the Page Model Controller
will available under /pageModels (i.e. localhost:8080/entando-de-app/api/pageModels)
and so on.

Before being able to perform any API request, first we need to obtain an `authorization token`, that is achieved with a specific POST request sent to the oauth/token endpoint, which after successful authentication, will return an access token which grants access to all API's endpoints and actions to which the authenticated user has defined privileges for.

(Refer to User Management Roles for details).

The best way to proceed in case of extensive testing with APIs with Postman is to set up an environment and define a variable that will keep the access token saved from the POST request to /oauth/token.

## Purpose
Set up an environment ready to invoke Entando6 Core APIs

## Requirements

To complete this tutorial you will need:
1. Postman
2. A running Entando6 instance

## Steps

### 1. Set up a Postman environment
Create a new Postman environment and define in that the following variables:
```
access_token: (no value)
refresh_token: (no value)
url: URL of your application (i.e. http://localhost:8080/entando-de-app)
```

Be careful with the URL variable and make sure you do not have a trailing slash.

Set Postman to use this environment.


### 2. Get an access token

Getting an access token is a prerequisite to be able to invoke any API. So lets go through the required activities.

* create a Postman collection, name it for example "Access Token"
* create a new POST request with the following parameters:

```
URL field
{{url}}/api/oauth/token
```
Note that we are calling the "url" environmental variable for convenience.

```
Autorization section
   Type: Basic Auth
   Username: (a valid Entando consumer must be defined in Entando) (Refer to appropriate documentation on how to do that) (i.e. appbuilder)
   Password: (password of the defined consumer) (i.e. appbuilder_secret)
```

```
Headers section
	Content-Type: application/x-www-form-urlencoded
```

```
Body section
Select from the radio button the option: x-www-form-urlencoded
	username: (valid Entando user (i.e. admin))
	password: (password of the valid user)
	grant_type: password
```

The tests section is convenient as we can then set any new API request in such a way to make use of that access token.
The first line of code defines a variable called "data", which hosts the JSON parsed responseBody from the POST request just sent to /oauth/token;
The second line sets the environment variable "access_token" to the value returned by the POST request.

```
Tests section
	var data = JSON.parse(responseBody);
	postman.setEnvironmentVariable("access_token", data.access_token);
```

Launch the POST request to test it and if successful, you should get a response like this one:

```
{
    "access_token": "b96096493a40b1a7364bd54a6ffb609b",
    "token_type": "bearer",
    "refresh_token": "79ff84062b5dc13663961a833b0788f9",
    "expires_in": 3599
}
```
also if you open in edit the Postman environment, you should see that the access_token and the refresh_token variables values have been updated.

### 2. Prepare a generic API request

Create a new request with the following parameters:

```
Authorization section: Inherit auth from parent
```

```
Headers section:
 create the key Authorization with Value: Bearer{{access_token}}
 create the key Content-Type with Value: application/json
```


Select the appropriate method (GET, DELETE, POST etc.) for your request
and fill up the URL with appropriate values i.e. (localhost:8080/entando-de-app/api/pages) then add to the Body section, if needed, the appropriate payload in JSON format,
remember to select raw and JSON (application/json).

## QE ready APIs
QE has developed a set of collection requests to automate APIs testing, examples of that are available on github at https://github.com/entando/entando-QE/tree/master/postman_API.

To use them first git clone the project and use the built-in Postman importing features.

Import first the Postman Environment file which can be found under the environment folder.
When imported, from Postman, open in edit that environment and change the "url" variable to the appropriate value for your specific installation, i.e http://localhost:8080/entando-de-app/ and save it.

Import from Postman the collections you would like to use and they will become available in the Postman collections Panel ready to be run.


## Notes on QE requests collections structure
Each collection is so designed to test a particular use case i.e. "Delete an existent page", "Delete a page which has children" etc.

By design each QE Postman collection is:
* indipendent (does not require others collections)
* general (does not make any assumption on the specific Entando application)
* can be run automatically, with newman, please refer to https://github.com/entando/entando-QE for details.


Following those requirements, each collection will need to "prepare" the environment for the actual test, that is achieved by using specific requests, called "helpers" and their only purpose is to create/delete all the needed objects.

Another class of helpers is used to check the persistence of the actions performed by the APIs, i.e. check that after a DELETE, something has been really deleted.

The request that implements the use case, we can call it main request, does not contain the word "HELPER" in its name, and it is only one inside a given collection.

Because collections are designed primarily to run automatically, we have done extensive use of collection variables, so variables like the API URL, object names, object codes or payloads are usually defined as a collection variable and can be accessed by all requests inside the collection.


## Conclusion

This guide let you start invoking Entando6 APIs
