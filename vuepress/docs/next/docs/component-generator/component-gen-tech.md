# Component Generation Technologies

## Technology in the Generated Components

When generating a microserivce using the Entando Component Generator there are a number of technical choices that need to be made

* Microservice code
  * the Component Generator currently only supports the generation of Spring Boot microservices but will support the generation of Quarkus based services soon. 
  * If you're interested in using Quarkus in your Entando app contact us on the [Forum](https://forum.entando.org/) or [Community Slack](https://join.slack.com/t/entandocommunity/shared_invite/zt-g609owdv-2K~YRh8zrI6lqlWo4aFWUw) and we'll help you get started.
* Database type
  * Entando recommends standardizing your choice of database to simplify operational maintenance but you do have the ability to use different databases for different microservices if you choose.
  * Supported choices are none, MySQL, and Postgres. Enterprise customers can choose Oracle but should contact Entando support for details.
* Development databases
  * You can choose to utilize a full RDBMS or developers can utilize lightweight in memory or on disk databases with h2.
* Caching implementation
  * When generating a microservice you will be presented with the type of cache to inject into the services. It is recommended that this is a standard choice for all of the microservices in your application but can be customized on a per service basis if desired.
* Build system
  * Determines the java build tool to use when building your services
  * Supports maven or gradle
* Other technologies
  * Users of the component generator can also decide to use other technologies from JHipster or from the JHipster marketplace.
  * There are many powerful technologies in the marketplace but it is up to the developer to integrate any choices from the marketplace into their Entando application. Entando doesn't provide any direct support for marketplace tech choices.
* Micro frontends
  * Users can optionally choose to generate micro frontends for entities generated via the blueprint.
  * The Entando Component Generator only provides micro frontends in React from the generation flow but developers can create and bundle micro frontends in other technologies as well.

If you want to try out these choices follow the tutorial on [creating Entando microservices and micro frontends using the component generator](../../tutorials/backend-developers/generate-microservices-and-micro-frontends.md)

## Blueprint Technology

JHipster and the Entando Blueprint are built using EJS which is a Javascript based templating language that provides powerful constructs for large scale file generation. Learn more about EJS here at <https://ejs.co/> or checkout the core [Jhipster Generator](https://github.com/jhipster/generator-jhipster) or [Entando Blueprint](https://github.com/entando/entando-blueprint) for examples of EJS in action.
