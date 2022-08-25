# Role Based Access Controls

## Overview
Experts recommend following a practice known as Defense in Depth where security controls are placed in each layer of an architecture. This tutorial guides you through adding access controls to your existing Entando project, in both the frontend and backend of your Entando Application. 

The simple Conference application found in the [Generate Microservices and Micro Frontends tutorial](./generate-microservices-and-micro-frontends.md) is used as a starting point. We recommend working through that tutorial for background and context. 

The basic security setup for a blueprint-generated application allows any authenticated user to access the functionality contained in the MFEs and/or microservices. This tutorial defines two user roles for our application:

- `conference-user`: Permitted to view the Conferences in the tableWidget
- `conference-admin`: Permitted to view Conferences in the tableWidget, and also to delete Conferences from the tableWidget 


## Apply and Verify Access Controls

### Step 1: Secure the Conference list

The list of Conferences must be visible to only the `conference-user` and `conference-admin` user roles. 

1. Go to the `src/main/java/com/YOUR-ORG/YOUR-NAME/web/rest` directory
2. Open `ConferenceResource.java` 
3. Add the following to the list of imports:
```java
    import org.springframework.security.access.prepost.PreAuthorize;
```
4. Modify the REST API `Conference:getAllConferences` method by preceding it with the @PreAuthorize annotation. Your method signature may be different depending on your blueprint selections.
```java{1}
    @PreAuthorize("hasAnyAuthority('conference-user','conference-admin')")
    public List<Conference> getAllConferences()
```
This confines use of the `getAllConferences` method to users who are assigned either the `conference-user` or the `conference-admin` role on the Keycloak client configured for the microservice. 

> Note: In local testing, the default client is `internal`. Refer to the [Spring Security documentation](https://spring.io/projects/spring-security) for more information.

We also need to modify the blueprint JWT handling to deal with a recent change to the Spring libraries.

5. Edit `src/main/java/com/mycompany/myapp/config/SecurityConfiguration.java` and make two changes.
  * Add this code after the other @Value fields
``` java 
@Value("${spring.security.oauth2.client.registration.oidc.client-id}")
private String clientId;
``` 
  * Modify the following call in the `authenticationConverter` method to provide the clientId field
``` java
jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new JwtGrantedAuthorityConverter(clientId));
 ```
6. Now modify  
   `src/main/java/com/mycompany/myapp/security/oauth2/JwtGrantedAuthorityConverter.java` to accept the clientId. Three changes are required.
  * Remove the @Component annotation on the class definition
 ```java{1}
 @Component
public class JwtGrantedAuthorityConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
 ```
  * Remove the @Value annotation on the clientId field
```java{1}
@Value("${spring.security.oauth2.client.registration.oidc.client-id}")
private String clientId;
```
  * Modify the constructor to accept the clientId
```java
    public JwtGrantedAuthorityConverter(String clientId) {
        this.clientId = clientId;
    }
```

### Step 2: Run your project in a local developer environment
The following commands must be run from your project directory. They leverage the [ent CLI](../../../docs/reference/entando-cli.md).

> Note: Refer to the [Run Blueprint-generated Microservices and Micro Frontends in Dev Mode tutorial](./run-local.md) for details.

1. Start up your Keycloak instance
``` sh
ent prj ext-keycloak start
```
2. Start the microservice in another shell
``` sh
ent prj be-test-run
```
3. Start the tableWidget MFE in a third shell
``` sh
ent prj fe-test-run
```
4. When prompted to select a widget to run, choose the option corresponding to the tableWidget, e.g. `ui/widgets/conference/tableWidget`

### Step 3: Access the tableWidget MFE

1. In your browser, go to <http://localhost:3000>. This is typically the location of the tableWidget MFE.
2. Access the tableWidget MFE with the default credentials of `username: admin`, `password: admin` 

> Note: Once authenticated, the message "No conferences are available" is generated. If you check your browser
console, you should see a `403 (Forbidden)` error for the request made to `localhost:8080/services/conference/api/conferences`. This is expected because the admin user has not yet been granted the new role. 

### Step 4: Login to Keycloak

1. Go to <http://localhost:9080> 
2. Login using the the default credentials of `username: admin`, `password: admin`

### Step 5: Create the `conference-user` and `conference-admin` roles 

Add the `conference-user` and `conference-admin` roles to the `internal` client. 
          
1. Go to `Clients` → `internal` → `Roles`
2. Click `Add Role`
3. Fill in the `Role Name` with `conference-admin`
4. Click `Save`
5. Repeat these steps to create the `conference-user` role

> Note: The `internal` client is configured by default in the Spring Boot `application.yml`.

### Step 6: Map the `conference-user` role to the admin user

To grant access to the `getAllConferences` API:

1. Go to `Users` → `View all users` → `admin` → `Role Mappings`
2. Select `internal` for the `Client Roles` 
3. Move `conference-user` from `Available Roles` to `Assigned Roles`
4. Return to the MFE to confirm you see the full list of Conferences

### Step 7: Restrict the ability to delete Conferences

The `conference-admin` role should grant a user permission to delete Conferences. To restrict the delete method to the `conference-admin` role:

1. Go to the `src/main/java/com/YOUR-ORG/YOUR-NAME/web/rest` directory
2. Open `ConferenceResource.java` 
3. Modify the `deleteConference` method by preceding it with the following annotation:
```java{1}
    @PreAuthorize("hasAuthority('conference-admin')")
    public ResponseEntity<Void> deleteConference(@PathVariable Long id)
```

To verify that a user without the `conference-admin` role is unable to call the delete API:

1. Restart the microservice. By default this includes rebuilding any changed source files.
2. Once the microservice is available, return to the MFE and try deleting one of the Conferences in the list 
3. Verify that attempting to delete via the UI generates a `403 error` in the browser console and an error in the service logs similar to the following:
```
WARN 3208 --- [  XNIO-1 task-3] o.z.problem.spring.common.AdviceTraits   : Forbidden: Access is denied
```

### Step 8: Hide the delete button

The MFE UI can be updated to hide the delete button from a user without the `conference-admin` authority. The key logic checks whether the `internal` client role `conference-admin` is mapped to the current user via the hasResourceRole call.

1. Go to the `ui/widgets/conference/tableWidget/src/components` directory
2. Open `ConferenceTableContainer.js` 
3. Replace the `onDelete` logic with an additional user permission:
```javascript
    const isAdmin = (keycloak && keycloak.authenticated) ? keycloak.hasResourceRole("conference-admin", "internal"): false;
    const showDelete = onDelete && isAdmin;

    const Actions = ({ item }) =>
      showDelete ? (
```
4. Confirm that the delete icon is no longer visible in the MFE. The MFE should have automatically reloaded to reflect the code changes.

### Step 9: Grant and verify delete permissions

Promote the admin user to a full `conference-admin` to reinstate the ability to delete Conferences.

1. Return to Keycloak at <http://localhost:9080>
2. Go to `Users` → `View all users` → `admin` → `Role Mappings`
3. Give the user the `conference-admin` role
4. Reload the MFE 
5. Confirm the delete icon is visible 
6. Confirm a Conference can be successfully deleted from the list

## Notes
### Realm Roles versus Client Authorities
This tutorial utilizes authorities. In Keycloak, authorities are roles mapped to a user for a specific client. It is possible to assign higher-level Realm Roles directly to users, e.g. `ROLE_ADMIN`, but this can result in collisions between applications using the same roles.

To implement Realm-assigned roles, the code above must be modified:
- In the backend, use the annotation `@Secured('ROLE_ADMIN)` or `@PreAuthorize(hasRole('ROLE_ADMIN'))`
- In the frontend, use `keycloak.hasRealmRole` instead of `keycloak.hasResourceRole` 

See the [Spring Security page](https://www.baeldung.com/spring-security-check-user-role) for more examples.

### Local vs. Kubernetes Testing
This tutorial leverages the `internal` client, which is configured in the microservice via the `application.yml`. Client roles are manually created and assigned in Keycloak. 

In Kubernetes, Entando will automatically create client roles per the bundle plugin definition (see the [plugin definition](../../../docs/curate/ecr-bundle-details.md) for more information). These roles are created for the client specific to the microservice, e.g. `<docker username>-conference-server`. The client name is injected as an environment variable into the plugin container, so the annotations noted above will work in both local and Kubernetes environments.

#### Modify Security Checks for Kubernetes

In this tutorial, the MFE authorization checks explicitly note the client ID,  e.g. `internal`. The following options modify the checks to work in Kubernetes:

1) Change the `application.yml` client ID under `security.oauth2.client.registration.oidc` to match the Kubernetes client ID. 

   This is the most secure option and allows the MFE checks to work identically in both local and Kubernetes environments. However, you may not be be able to use the same clientId, depending on how the microservice is deployed.

2) Broaden the MFE authorization check to look for a named role on any client. 

   This could result in overlap with other clients, but this is the most flexible option when using appropriately named roles (e.g. with a bundle or feature prefix like `conference-` in `conference-admin`). It can be achieved via a helper function, e.g. `api/helpers.js`, and results in a simpler role check:
```javascript
// Add helper function
// Check if the authenticated user has the clientRole for any Keycloak clients
export const hasKeycloakClientRole = clientRole => {
  if (getKeycloakToken()) {
    const { resourceAccess } = window.entando.keycloak;
    if (resourceAccess) {
      for (const client in resourceAccess) {
        // eslint-disable-line no-unused-vars
        const roles = resourceAccess[client].roles;
        if (roles && roles.includes(clientRole)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Perform role check
const isAdmin = hasKeycloakClientRole('conference-admin');
```
  
### Troubleshooting
In both local and Kubernetes environments, the default Blueprint Javascript provides a global variable in the browser, e.g. `window.entando.keycloak`. Examining this variable can help diagnose issues with assigned roles and authorities. In some cases, you may need to logout of Entando and reauthenticate for the latest role assignments to be applied.