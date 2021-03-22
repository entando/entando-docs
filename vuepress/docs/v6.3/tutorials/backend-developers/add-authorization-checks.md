---
sidebarDepth: 2
---
# Add Authorization Checks

## Overview
This tutorial guides you through adding authorization checks to your existing Entando project. Security experts recommend following a practice known as `Defense in Depth` where security controls are placed in each layer of an architecture. This tutorial will help you setup such controls in both the frontend and backend of your Entando application. 

For the purpose of this tutorial we'll use the simple Conference application from [this tutorial](./generate-microservices-and-micro-frontends.md) as a starting point. Please work through that tutorial if you have not already. 

The basic security setup for a blueprint-generated application allows any authenticated user to access the functionality contained in the MFEs and/or microservices. Our business requirement for this tutorial is to define two kinds of users in our application - `Conference Users` who can view the Conferences in the tableWidget, and `Conference Admins` who can view and also delete Conferences from the tableWidget. 

## Tutorial
Let's start by securing the list of Conferences so only our two user roles can view the list.

1. Edit `ConferenceResource.java` located in the `src/main/java/com/<ORG>/<NAME>.web.rest` directory. Modify the REST API `Conference:getAllConferences` method by adding the following annotation. 
```
    @PreAuthorize("hasAnyAuthority('conference-user','conference-admin')")
    public List<Conference> getAllConferences() {
```
See the Spring Security documentation for more details but this restricts use of the `getConference` method to users who have been assigned either the `conference-user` or the `conference-admin` role on the Keycloak client configured for the microservice. In local testing this defaults to the `internal` client but see notes below on how that works in production.

Next we want to verify that this security check is working.

2. Start up your Keycloak, tableWidget MFE, and microservice. See [these instructions](./run-local.md) if you need a refresher but these are the basic commands using the ent CLI and Docker (for keycloak):
```
ent prj ext-keycloak start
ent prj be-test-run
```
Using a separate cmdline:
```
ent prj fe-test-run
```

3. Access the tableWidget MFE, typically on <http://localhost:3000>. 

If you weren't already authenticated, you should be challenged to authenticate. For simplicity we'll use the existing admin user account for this tutorial. Once authenticated, you'll get the message "No conferences are available" and, if you check your browser console, you should see a `403 (Forbidden)` error for the request made to `localhost:8080/services/conference/api/conferences`. This is expected because we have not yet granted the new role to the admin user. 

Next let's give the admin user the correct role. 

4. Login to keycloak on <http://localhost:9080> using the `admin/admin` credentials. 

First we need to create the two roles per our requirements. We're going to add the roles to the `internal` client because it's the one configured by default in the Spring Boot application.yml.
          
5. Go to `Clients → Internal → Roles` and click `Add Role`
6. Fill in the `Role Name` with `conference-admin` and click `Save`
7. Repeat steps 5-6 to create the `conference-user` role. 

Now we need to map this role to our user.

8. Go to `Users → View all users → admin → Role Mappings`
9. Select `internal` for the `Client Roles` and then move `conference-user` from `Available Roles` to `Assigned Roles`
10. Go back to the MFE and you should now see the full list of Conferences.

However, the admin user was granted the `conference-user` role and still has access to delete Conferences. We need to lock that down.

11. Go back into the `ConferenceResource.java` file and add this annotation to the `deleteConference` method:

```
    @PreAuthorize("hasAuthority('conference-admin')")
    public ResponseEntity<Void> deleteConference(@PathVariable Long id) {
```
Here we're restricting the delete method to only the `conference-admin` role.

12. Restart the microservice. By default this will include rebuilding any changed source files.
13. Once the microservice is available, go back to the MFE and try deleting one of the Conferences in the list. You should be able to attempt the delete but you'll get a 403 error in the browser console and an error like this in the service logs:
```
2021-03-22 15:56:16.205  WARN 3208 --- [  XNIO-1 task-3] o.z.problem.spring.common.AdviceTraits   : Forbidden: Access is denied
```
That's exactly what we wanted! This demonstrates that a user without `conference-admin` is unable to call the delete API.

Next, let's update the MFE so a user without the `conference-admin` authority cannot even see the delete button in the UI.

14. Edit the `ConferenceTableContainer.js` under `ui/widgets/conference/tableWidget/src/components`. Replace the onDelete logic with an additional check on the user's authorities.
```
    const isAdmin = (keycloak && keycloak.authenticate) ? keycloak.hasResourceRole("conference-admin", "internal"): false;
    const showDelete = onDelete && isAdmin;

    const Actions = ({ item }) =>
      showDelete ? (
```

The key logic there is the hasResourceRole which checks whether the `internal` client role `conference-admin` was mapped to the current user.

15. View the MFE (whch should have automatically reloaded) and you should see that the delete icon is no longer visible, matching your current permissions.  We've now verified that a user with just `conference-user` can neither see the delete action in the UI nor call its corresponding API.

Next, let's promote the admin user to a full `conference-admin`.

16. Go back into Keycloak at <http://localhost:9080>, then go to `Users → View all users → admin → Role Mappings`, and also give the user the `conference-admin` role.

17. Reload the MFE. The delete icons should now be visible and you should be able to successfully delete a Conference from the list. This satisfies our original business requirement. 

## Notes
### Realm Roles versus Client Authorities
The above tutorial makes use of authorities which in Keycloak are roles mapped to a user via a Role Mapping on a specific client. You could also make use of higher-level Realm Roles assigned directly to users,e.g. for `ROLE_ADMIN` That's technically doable but can result in collisions between applications.

At the microservice level you could then use the following annotations: `@Secured('ROLE_ADMIN)` or `@PreAuthorize(hasRole('ROLE_ADMIN'))`. In the frontend you would then check `keycloak.hasRealmRole` instead of `keycloak.hasResourceRole`. See the [Spring Security page](https://www.baeldung.com/spring-security-check-user-role) for more examples.

### Local versus Kubernetes Testing
The above tutorial makes uses of the `internal` client configured in the microservice via the application.yml and then roles are manually created and assigned in Keycloak. In Kubernetes, Entando will automatically create roles per the bundle plugin definition (see the plugin definition [here](../../docs/ecr/ecr-bundle-details.md) for more information). They will be created for the client specific to the microservice itself, e.g. `<docker username>-conference-server`. This client name will be injected as an environment variable into the plugin container itself so the annotations noted above will work both for local testing and also for a Kubernetes environment.

The MFE authorization checks above explicitly note the client id `internal` which isn't appropriate in production. There are a couple options here:
1) Change the application.yml clientId under `security.oauth2.client.registration.oidc` to match the production clientId. That's the most secure and allows the MFE checks to work the same in local dev and production. It just may not be possible in all development scenarios.
2) The second option is to broaden the authorization check to check for the appropriate role on any client. This could result in collisions with other applications but with appropriately named roles (e.g. prefixed by feature area) this could be the most flexible option. This could be provided via a helper function, e.g. in `api/helpers.js`
```
//Check if the authenticated user has the clientRole for any keycloak clients
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
```
This would result in a simpler role check:
```
    const isAdmin = hasKeycloakClientRole('conference-admin');
```
  
### Debugging
In both local and Kubernetes modes, the blueprint javascript will set a global variable with the keycloak token, e.g. `window.entando.keycloak`. This is highly useful for diagnosing issues with assigned roles and authorities. In some cases you may need to logout of Entando and re-authenticate in order to get the latest role assignments.