---
sidebarDepth: 1
---

# Bundle Versions and Updates - FAQ

## Support

### 1. Does the Entando Platform support bundle versioning?
A bundle is an independent package containing one or more components. 
As in other packaging systems, the [Entando Component Registry](../compose/local-hub-overview.md)(ECR) supports bundle versioning, allowing developers to create and release updates of their package over time.

## How-Tos
### 1. How do I create a new version of a bundle?
To release new versions of your bundle after changes have been made, edit the `entando.json` with the new version number for the bundle, then pack and publish your images to Docker. Docker will provide tags to update the bundle version. Once you deploy and install the bundle, the new version number will appear in the App Builder. 

Micro frontends and microservices can have their own version numbers, independent of the bundle version, and can be updated in the same way.

### 2. My bundle contains a microservice generated with the Entando Component Generator; does the version of the microservice have to be the same as the bundle version?

The version of the microservice - or the Docker image associated with the microservice - isn't bound to the version of the bundle containing the microservice itself. 

This gives the developer control over the bundle release process, especially in situations where the bundle may contain many components.


## Conventions 
 
### 1. How is a bundle version defined?

Bundle versions are defined by the creator and set in the bundle descriptor `entando.json`. You can have multiple versions of a bundle as long as they are defined and tagged as such.
 
```json
{
  "name": "my-bundle",
  "description": "This is a description of my-bundle",
  "type" : "bundle",
  "version": "1.0.0",
  "svc": [...]
  ...

}
```
### 2. What format should I use to version my bundle?

Follow the recommended [semantic versioning 2.0.0](https://semver.org/#semantic-versioning-200), with the option to prepend a `v` to the number. Some valid bundle versions are:

- 1.0.0
- v0.1.0

### 3. Can I publish all versions of any bundle to my Local Hub for development?

To make all versions for all bundles available in the Local Hub, edit the environment variable `ENTANDO_BUNDLE_TAGS_TYPES` in the component manager (CM) deployment to have the value, `dev,prod`. Tag types can also be set to `dev` or `prod`.

For individual bundles, see the [Bundle Management page](../getting-started/ent-bundle.md#generate-cr) for details about how to utilize the ent CLI's bundle commands to select development, production, or both types of bundles.








