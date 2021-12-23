# Entando Blueprint Features

The Entando Blueprint makes it easier and faster to customize your application by generating controllers, repositories, services, and micro frontends for your entity. It means generating those project files in minutes, simply by answering questions that define the parameters of your application. 

The Entando Blueprint uses JHipster technology based on Embedded JavaScript (EJS), a templating language that provides powerful constructs for large scale file generation. 

## The Features:
* Backend with Spring Boot 
  * Data modeling
  * JHipster Design Language (JDL) support 
  * Keycloak integration 
  * Liquibase integration for schema upgrade
  * Preconfigured Cross-Origin Resource Sharing (CORS) settings
  * Profiles (dev, prod)
  * Swagger/OpenAPI frontend
* Frontend with React
  * .env profiles
  * Localization
  * Keycloak integration
  
For more information:
* Install [JHipster Entando Blueprint](https://github.com/entando/generator-jhipster-entando/blob/master/README.md)
* Try implementing an Entando Blueprint-- [Create microservices and micro frontents](../../tutorials/micro-frontends/react.md)

## Premade Widgets
When you create an entity using the Entando Blueprint, it generates a few
premade widgets. Each will be reviewed below.
* [Authentication](#authentication)
* [Custom events](#custom-events)
* [Tests and mocks](#tests-and-mocks)
* [PropTypes](#proptypes)
* [Fetching data](#fetching-data)
* [Form widget](#form-widget)

We will be using `Conference` as an entity name for the example below.

What the widgets have in **common**:
* Each widget contains a README file that helps with the setup.

* All generated widgets are web components created using Custom Elements
API.

* Each widget is displayed using the custom element tag. For example, inside the
details widget folder `conference/detailsWidget/public/index.html`, you
can find
`conference-details id="1" override-edit-handler hide-edit-button />`.
The element `<conference-details />` is defined in the component entry
point at
`conference/detailsWidget/src/custom-elements/ConferenceDetailsElement.js`.

> **Note**
>
> Custom element names require a hyphen like `conference-details` (kebab-case)--they cannot be single words.

For more information about web components, custom elements and micro
frontends, refer to [Create a React micro frontend widget](../../tutorials/micro-frontends/react.md).


### Authentication

If a widget requires authentication, the component is wrapped in
`KeycloakContext.Provider` and the Keycloak object is fetched from the
`window.entando.keycloak` variable. Entando uses Keycloak as the
authentication provider, but you can add any provider as needed.

    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <ThemeProvider theme={this.muiTheme}>{FormContainer}</ThemeProvider>
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );

For more information about the authentication process, please refer
to the [Authentication section](../reference/identity-management.md#authentication).

### Custom events

All widgets rely on custom events for communication.  That is why each widget contains custom event creation and removal, along with the event listener creation.  Note that when an event listener is created, it should be when
the element is no longer needed. It should be created in the custom
element’s `disconnectedCallback()` function.

To add more event listeners, add the event types to
`INPUT_EVENT_TYPES` object at
`detailsWidget/src/custom-elements/widgetEventTypes.js`, which adds
it to the listener list. To remove the event, simply remove the element from the list.

For more information about custom events and widget communication,
please refer to the section on [Widget communication](../../tutorials/micro-frontends/communication.md).

### Tests and mocks

Each widget has tests written for it. Entando uses
`react-testing-library`, but developers are free to upgrade and use any
tool desired. Tests and mocks are at `detailsWidget/src/components/`.

### PropTypes

PropTypes for data used across several components are shared. You can
see and modify them at `detailsWidget/src/components/`. This way you can
avoid repeating the same propTypes in each component by importing them.

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

### Fetching data

For data fetching from widgets, use Fetch API. You can find the functions for
fetching data at `detailsWidget/src/api`, in different files for
different contexts.

## Form widget

For displaying forms within a widget, use
[Formik](https://jaredpalmer.com/formik) which helps with form state
management. For data validation, use
[Yup](https://github.com/jquense/yup).

