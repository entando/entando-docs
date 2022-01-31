# Tutorial: Blueprint generated widgets' overview

When you [create an entity using Entando blueprint](../../../create/ms/generate-microservices-and-micro-frontends.md), it generates a few
premade widgets. In this section we will review them.

We will be using `Conference` as an entity name for the examples below.

## Common parts

Each widget contains a README file that should help you with the setup.

All generated widgets are web components created using Custom Elements
API.

Each widget is displayed using the custom element tag - e.g., inside the
Details widget folder `conference/detailsWidget/public/index.html` you
can find
`conference-details id="1" override-edit-handler hide-edit-button />`.
This element `<conference-details />` is defined in the component entry
point at
`conference/detailsWidget/src/custom-elements/ConferenceDetailsElement.js`.

> **Note**
>
> custom element names (`conference-details`) require a dash in them to
> be used, e.g., (kebab-case) - they can not be single words.

For more information about web components, custom elements and micro
frontends, please refer to "Create a react micro frontend widget"
section.

### Authentication

If widget requires authentication, component is wrapped in
`KeycloakContext.Provider` and Keycloak object is fetched from
`window.entando.keycloak` variable. Entando is using Keycloak as our
authentication provider, but you can add any providers you like.

    ReactDOM.render(
      <KeycloakContext.Provider value={this.keycloak}>
        <StylesProvider jss={this.jss}>
          <ThemeProvider theme={this.muiTheme}>{FormContainer}</ThemeProvider>
        </StylesProvider>
      </KeycloakContext.Provider>,
      this.mountPoint
    );

For more information about authentication implementation, please refer
to the "Authentication" section.

### Custom events

All widgets rely on custom events for communication which is why custom
event creation and removal is in each widget, as well as event listener
creation. Note that when an event listener is created, it should be when
the element is no longer needed. It should be created in the custom
element’s `disconnectedCallback()` function.

To add more events to listen to the widgets, add the event types to
`INPUT_EVENT_TYPES` object at
`detailsWidget/src/custom-elements/widgetEventTypes.js` which will add
it to the listener list (or remove the event by removing the element).

For more information about custom events and widget communication,
please refer to the section on "Widget communication".

### Tests and mocks

Each widget has tests written for it. Entando uses
`react-testing-library`, but developers are free to upgrade and use any
tool. Tests are kept at `detailsWidget/src/components/` and mocks for
them are at `detailsWidget/src/components/`.

### PropTypes

PropTypes for data used across several components are shared - you can
see and modify them at `detailsWidget/src/components/`. This way you can
avoid repeating same propTypes in each component and just import shared
ones

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

For data fetching from widgets use Fetch API. You can find functions for
fetching data at `detailsWidget/src/api` in different files for
different contexts.

## Form widget

For displaying forms within a widget use
[Formik](https://jaredpalmer.com/formik) which helps with form state
management. For data validation use
[Yup](https://github.com/jquense/yup).

