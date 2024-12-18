---
sidebarDepth: 2
---
# Entando Blueprint Features

The Entando Blueprint leverages JHipster technology to quickly and easily create components for an Entando Application, including a Spring Boot microservice and React micro frontends. Through a series of questions, the user specifies parameters to autogenerate the project files via Embedded JavaScript (EJS), a templating language that provides powerful constructs for large-scale file generation. The following examines the details of the Entando Blueprint.

[Follow the Entando Blueprint tutorial](../../tutorials/create/ms/generate-microservices-and-micro-frontends.md).

## Feature List
* Backend with Spring Boot:
  * Data modeling
  * JHipster Design Language (JDL) support 
  * Keycloak integration 
  * Liquibase integration for schema upgrade
  * Preconfigured Cross-Origin Resource Sharing (CORS) settings
  * Profiles (dev, prod)
  * Swagger/OpenAPI frontend
* Frontend with React:
  * .env profiles
  * Localization
  * Keycloak integration

## Preconfigured Micro Frontends
The creation of an entity using the Entando Blueprint generates the following preconfigured micro frontends. Additional specifications follow. 
* [Authentication](#authentication)
* [Custom Events](#custom-events)
* [Tests and Mocks](#tests-and-mocks)
* [PropTypes](#proptypes)
* [Fetching Data](#fetching-data)
* [Form Widget](#form-widget)

::: tip 
- The sample code and file paths on this page use `Conference` as the entity name.
- Custom element names require a hyphen, e.g. `conference-details` (kebab-case).
:::


**What the micro frontends have in common:**
* Each micro frontend (MFE) contains a README file to assist with its setup.
* All generated micro frontends are web components created with the custom elements
API.
* Each MFE is displayed using the custom element tag, e.g.:
   - The details widget file `microfrontends/conference-details/public/index.html` contains `conference-details id="1" override-edit-handler hide-edit-button />`. 
   - The element `<conference-details />` is defined as a component entry in `microfrontends/conference-details/src/custom-elements/ConferenceDetailsElement.js`.

For more information about web components, custom elements and MFEs, refer to [Create a React Micro Frontend](../../tutorials/create/mfe/react.md).

### Authentication

- If a widget requires authentication, the component is wrapped in `KeycloakContext.Provider` and the Keycloak object is fetched from the `window.entando.keycloak` variable. 
- Entando allows Keycloak to be replaced with another authentication provider as needed.
    ``` js
    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <ThemeProvider theme={this.muiTheme}>{FormContainer}</ThemeProvider>
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );
    ```

For more information on Keycloak and authentication with Entando, refer to the [Entando Identity Management System](../consume/identity-management.md#authentication).

### Custom Events

- All MFEs rely on custom events for communication. Consequently, each MFE is able to create or remove custom events and event listeners.  
- An event listener should be added in the custom element’s `disconnectedCallback()` function when it is no longer needed.
- To add an event to the listener list, add the event type to the `INPUT_EVENT_TYPES` object at
`microfrontends/conference-details/src/custom-elements/widgetEventTypes.js`. To remove an event listener, remove the type from the list as well.

Refer to [Communicate Between Micro Frontends](../../tutorials/create/mfe/communication.md) for more information about custom events and MFE communication.

### Tests and Mocks

- Tests have been written for each preconfigured MFE using `react-testing-library`. These can be updated via your preferred developer tool.
- The tests and mocks for each micro frontend are located in their `/src/components/` directories. 

### PropTypes

- PropTypes for data used across several components are available to view or modify at `microfrontends/conference-details/src/components/`. 
- These are shared resources and can be imported into components to avoid repeated definitions, e.g.:
    ``` shell
    import React from 'react';
    import conferenceType from 'components/__types__/conference';

    const ConferenceDetails = props => {
      // ...
    };

    ConferenceDetails.propTypes = {
      conference: conferenceType,
      t: PropTypes.func.isRequired,
    };

    export default ConferenceDetails;
    ```

### Fetching Data

- To fetch data from widgets, use [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). 
- Data fetching functions are organized by context in the files found at `microfrontends/conference-details/src/api`.

### Form Widget

- To display forms within a widget, use [Formik](https://jaredpalmer.com/formik), an open source React library that assists with form state management. 
- For runtime data parsing and validation, use the schema builder [Yup](https://github.com/jquense/yup). 



