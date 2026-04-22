# Component Generation Technologies

When generating a microservice or micro frontend using the Entando Component Generator (ECG), there are a number of technical choices that need to be considered:

* Microservice code
  * If you're considering microservices that are not Java-based, here are the [specifications of an Entando microservice](../curate/bundle-details.md#microservices-specifications), including information on the runtime contract required to use them. 
  * For a JavaScript example, see the Node.js microservice in the [API claim tutorial](../../tutorials/create/ms/add-api-claim.md).
* Database type
  * Entando recommends standardizing your database choice to simplify operational maintenance, but you still have the option to use different databases for different microservices.
  * Supported choices are none, embedded, MySQL, and Postgres. Enterprise customers can choose Oracle but should contact Entando Support for details.
* Development databases
  * You can choose to utilize a full RDBMS, lightweight in-memory, or on-disk databases with H2.
* Caching implementation
  * When generating a microservice, you will be presented with the types of cache to inject into the services. It is recommended that the type be uniform for all microservices in your application, but it can be customized on a per-service basis, if desired.
* Build system
  * Determines the Java build tool to use when building your services
  * Supports Maven or Gradle
* Other technologies
  * Users of the ECG can also decide to use other technologies from JHipster or the JHipster marketplace.
  * There are many powerful technologies in the marketplace but it is up to the developer to integrate the chosen technology into their Entando Application. Entando doesn't provide direct support for marketplace tech choices.
* Micro frontends
  * Optionally, users can choose to generate micro frontends for entities generated via the blueprint.
  * The Entando Component Generator only provides micro frontends in React from the generation flow but developers can create and bundle frontend components using other technologies as well. 

## Next Steps

- [Create microservices and micro frontends using the Entando Component Generator](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md)
- [Create a React micro frontend](../../tutorials/create/mfe/react.md)
- [Create an Angular micro frontend](../../tutorials/create/mfe/angular.md)
- [Create a microservice, then an API claim with which a micro frontend can call it](../../tutorials/create/ms/add-api-claim.md)



