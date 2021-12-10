# Business Objective

The Entando Process Driven Applications plugin is built to provide a
rich and full-featured user experience, facilitating the management and
completion of business processes and automation. 

The general purpose UX layer is created from micro frontends that can be
utilized for any business process or task engine. Customers drive the UX
layer via pre-developed Entando integration, or by
implementing a set of interfaces on the server side. 

The backend is a Spring Boot microservice that provides a pluggable interface to allow the injection of underlying processes or automation toolkits. The
interfaces and steps for creating a new PDA backend implementation are
provided below. 

This document presents an overview of the Entando
Process Driven Apps (PDA) plugin. The initial section addresses the
business functionality and user-facing micro frontends. The second
section covers the architecture and points of extension for the PDA
plugin. The third section supplies a detailed technical overview of how to
to add new functionality to a PDA implementation.

# Terminology

## Micro Frontend

A micro frontend architecture uses a composition of small frontend apps to develop a web application. Instead of writing
a large monolith frontend application, the application is broken down
into domain specific micro frontends, which are self-contained and can
be developed and deployed independently.

## Process Automation Manager (PAM)

Process Automation Manager (PAM) is a business process automation engine built and maintained by Red Hat.

## Business Process Modeling Notation (BPMN)

Business Process Model and Notation (BPMN) is a graphical representation
for specifying business processes in a business process model.

## Decision Model and Notation (DMN)

Decision Model and Notation (DMN) is a standard published by the Object
Management Group. It dictates a standardized approach for describing and modeling repeatable decisions within organizations to ensure that decision models are interchangeable across organizations.

## Backend for Frontend (BFF)

A microservice architecture allows teams to iterate quickly and to
develop technology to scale rapidly. Backend for Frontend (BFF)
is an architecture pattern built with microservices. The key
component of this pattern is an application connecting the frontend
of an application with the backend. The BFF Code Pattern helps to build that component according to IBM’s best practices.

# PDA Micro Frontends

This section provides an overview of each micro frontend (MFE) that is available as part of the Entando PDA plugin. Details specific to the PAM implementation of an MFE are provided where appropriate. MFE behavior and datasources must be defined if the integration layer is extended to other
engines or custom implementations.

## Task List

The Task List MFE provides the user with a list of visible tasks that are
either assigned to or potentially ownable by that user. In the default implementation, the visible tasks are limited to a
single process instance. At configuration time, the application designer
is given the option to select a set of columns that will be visible in
the task list for that page.

### PAM Implementation

The default PAM implementation exposes the top level task fields in the task list for selection. It is possible to fetch task and process variables from the task list for rendering, but this is disabled by default to optimize performance.

## Task Details

The Task Details MFE renders detailed information about a given task in a read only grid. The task details widget is intended to give the end user processing a
task the information necessary to complete the task. See the Styling section below to customize the layout.

### PAM Implementation

The PAM implementation renders task variables in the task details widget.

## Task Comments

The Task Comments MFE enables the user to view and add the notes attached
to a task.

### PAM Implementation

The PAM implementation reads and publishes notes to the comments
endpoint.

## Task Forms

The Task Form implementation renders a form specific to a task and enables
the user to complete that form. The Task Form implementation is a
wrapper around a JSON schema that describes the layout, style and
content of the form. The backend implementation provides the mapping
to the schema and default UX layout needed to render the form. See the
technical documentation below for more on the JSON schema
implementation.

### PAM Implementation

The PAM implementation of forms depends on the presence of a form
definition for the PAM task. The Entando PAM engine implementation transforms the PAM format to the JSON schema to render the form. It also transforms the API format back to the PAM format. There are some limitations on form customization due to the format required to return data to PAM. See the Task Forms section in the technical documentation for more information.

## Attachments

The Attachments MFE enables the user to view and add documents attached to a
task, case or process.

### PAM Implementation

The PAM implementation posts the documents to the PAM endpoints for
storage. Future features will include the use of Entando document storage and a pluggable document management interface.

## New Process Form

The New Process Form renders a form enabling the end user to instantiate a new business process instance. The same technology is used to generate a New Process Form and the JSON schema definition for a Task Form. 

### PAM Implementation
The PAM implementation relies on a form definition attached to
the process definition. Entando transforms the PAM representation into a
JSON schema form that can be rendered to the end user.

## Summary Card

The Summary Card MFE provides a view into aggregate data for the process
implementation. The rendered information includes a total value, a trend
value, and a timeframe selector. The Summary Card allows the
application developer to select a request for rendering information. This request maps to a call in the underlying engine and provides the summarized data.

### PAM Implementation

The PAM implementation of the Summary Card widget relies on the PAM
custom query functionality. The PAM PDA engine exposes a configuration file
where the custom query can be defined. This allows user customization of the data rendered on the summary cards. The application contains a "properties" file where the implementer can submit a custom query for each of the cards.

## Totals Over Time

The Totals Over Time MFE provides a dual axis line/bar graph displaying
trend information about the process environment. Three summary values can be compared over a single time period.

### PAM Implementation

The PAM implementation of the Totals Over Time MFE utilizes custom
queries to fetch the summary data rendered in the chart. The queries
used in the implementation are defined in configuration files in the MFE
and can be updated to render implementation specific data.

# Customizing the Process Driven Application

## Styling

The Entando PDA MFEs are styled via a Material UI theme. That theme can
be downloaded and updated [here](<https://github.com/entando/frontend-libraries/tree/master/packages/entando-ui>).

## Implementing a New Engine or Integrating a New Task Source

Implementing a new engine for Process Driven Applications means
creating a new Java project and implementing the interfaces defined in the
`pda-core-engine` project. The new project should therefore include the
`pda-core-engine` as a dependency. 

To see an implementation in action, consider the `pda-redhatpam-engine` project, which implements the Red Hat PAM engine integration. The resultant JAR file should be available in the classpath for the `entando-process-driven-plugin`, which is the project that
is ultimately executed and exposes the Rest APIs for the frontend
application. 

One way to achieve this is by publishing the engine
implementation to a Maven repository and adding it as a dependency to
the `entando-process-driven-plugin` project. Below are the descriptions of
the engine class and key interfaces in the `pda-core-engine` project that must be inherited or implemented when creating a new engine
implementation:

### Classes

`Engine`: represents a BPM engine and exposes the services that are available for that specific implementation. It is intended to be inherited, and the subclass should provide the implementation for each service by calling the superclass constructor with the service implementations as arguments. If any service is not supported, a null value should be passed to the corresponding constructor argument. The engine can provide implementations for service interfaces.

### Interfaces

`TaskService`: defines service methods for task retrieval from the BPM engine.

`TaskDefinitionService`: defines service methods related to task definition. A task definition specifies which fields or columns are available for all task instances.

`TaskCommentService`: defines service methods related to task comment manipulation. It should be implemented if the task comment is supported by the engine.

`TaskAttachmentService`: defines service methods to operate on task attachments. It should be implemented if the engine supports file attachment on the task.

`TaskFormService`: defines service methods for task form operations, like retrieving the form definition and submitting a form. The Form object can be used to render a form dynamically.

`TaskLifecycleService`: defines service methods related to the task lifecycle. The lifecycle operations move the task from one state to another.

`TaskLifecycleBulkService`: defines methods for bulk lifecycle operations. Like the TaskLifecycleService, methods here move the task from one state to another, but this interface works with multiple tasks at a time.

`ProcessService`: defines service methods for process definitions operations.

`ProcessFormService`: defines service methods for process form operations, like retrieving the form definition and submitting a form. The Form object can be used to render a form dynamically.

`GroupService`: defines service methods related to groups in the BPM engine.

## Creating a New PDA MFE

There are no limitations on the stack that can be used to create PDA
MFEs. Custom Elements are a great way to hide implementation details
while providing a neutral interface. 

To create a simple PDA MFE:
1. Implement your solution using technologies you are familiar with
and wrap it in a custom element. 
2. Upload the build files (Settings \> File Browser) in the /public/ folder. 
3. Go to the `UX Pattern > Widget` section of the admin panel
and click “Add” to add a new widget. 
4. Enter the widget code and titles.
5. Select group type (for free access to everybody, select “Free Access”).
6. Populate the Custom Element UI:
```sh
<#assign wp=JspTaglibs["/aps-core"]>
<script src="<@wp.resourceURL />path/from/static/bundle.js"></script>
<your-custom-element parameter=”value” />
```
The variable assignment `<#assign wp=JspTaglibs["/aps-core"]>` provides access to the FreeMarker variable `wp` (web portal) that is used to get resource URL. 

After you add the widget:
1. Go to the page tree and select a page where you would like to use the widget.
2. Configure the widget.
3. Drag and drop the widget into a frame and publish the page.

## Communication between MFEs

Communication between MFEs can be achieved using Custom Events. Each
widget can define events that it will emit and events that
are important to it:

    const createWidgetEvent = eventType => {
      return payload => {
        const widgetEvent = new CustomEvent(eventType, { payload });
        window.dispatchEvent(widgetEvent);
      };
    };


    const subscribeToWidgetEvent = (eventType, eventHandler) => {
      window.addEventListener(eventType, eventHandler);
      return () => {
        window.removeEventListener(eventType, eventHandler);
      };
    };

The Custom element then creates the events it emits and registers to the
events that it wants to react to:

    constructor(props) {
      super(props);

      // other code

      this.onClickSubmit = createWidgetEvent(‘myWidget.onSubmit’);
    }

    connectedCallback() {

      // other code

      this.unsubscribeFromWidgetEvents = subscribeToWidgetEvent(
        ‘otherWidget.onClickClear’,
        () => {
          // callback function when otherWidget fires the onClickClear custom event
        }
      }
    }

# Technical Documentation

## Micro Frontend Overview

### Task Forms

Widgets employ JSON schema to dynamically create any forms they contain. The JSON schemas are converted into React components using the `react-jsonshema-form` library. Entando's initial implementation utilizes Material UI components derived from the Material UI theme library (`rjsf-material-ui`) as a baseline, and includes templates, widgets and fields (`react-jsonshema-form` terms for forms components) that are specific to Entando. 

This section will introduce the basic form configuration, but if you would like to learn more, please refer to the `react-jsonshema-form` documentation. 

The themed `JSOform` is created using the `withTheme()` method from the `react-jsonschema-form` package:

    import { withTheme } from 'react-jsonschema-form';
    import { Theme as MuiRJSForm } from 'rjsf-material-ui';

    const JSONForm = props => {

      const ThemedForm = withTheme(MuiRJSForm);

      // ...

      return (
        <ThemedForm
        schema={formSchema}
        uiSchema={uiSchema}
        {...customTemplates}
        widgets={customWidgets}
        formData={formData}
        onSubmit={e => onSubmitForm(e)}
        >
      );
    };

    export default JSONForm;

A form schema is mandatory for a JSON Form to function because it provides the JSON definition of the form’s structure. Users can also supply form data via the
`formData` variable, which should follow the structure of JSON schema, and
UI schema via the `uiSchema` variable, which allows users to customize the
form’s UI (e.g. components, rules, types).

You can test the JSON schema, UI schema and form data in the `react-jsonschema-form` sandbox environment. Entando templates, widgets, and fields allow customization of form layout using Grid components. The size parameter in the UI schema’s `ui:options` object specifies the fill area of a field or subform. 

Size refers to the Material UI’s grid column widths (see the Material UI documentation), where the area the form can occupy is divided into 12 columns. A value of 12 (the default value if size is not provided) means the field or subform should take up all 12 columns. If two adjacent fields have size values of 8 and 4, respectively, they will share one row and the first field will be twice as wide as the second. 

In addition, the user can provide an innerSize parameter to scale the input fields inside the columns. This helps with formatting when a user wants to make nonuniform adjustments to sizing. 

Multicolumn layout can also be achieved via `generateColumnedOFT` (`columnSize`) functionality, which assigns the default `columnSize` to the created form. The function `generateColumnedOFT` returns an `ObjectFieldTemplate` that is used as a template for all object fields (fields that contain properties). 

To explain the mapping between JSON schema and UI schema let's define an example
schema:

    {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://entando.org/schemas/pda-form.json",
      "title": "Mortgage Application Form",
      "type": "object",
      "properties": {
        "Application": {
          "title": "Application",
        "type": "object",
        "required": [],
        "properties": {
            "mortgageamount": {
              "type": "integer",
              "title": "Mortgage amount",
              "description": "Mortgage amount"
            },
            "downpayment": {
              "type": "integer",
              "title": "Down Payment",
              "description": "Down Payment"
            },
            "applicant": {
              "title": "Applicant",
              "type": "object",
              "required": [],
              "properties": {
                "name": {
                  "type": "string",
                  "title": "Name",
                  "description": "Name",
                  "maxLength": 100
                },
                "annualincome": {
                  "type": "integer",
                  "title": "Annual Income",
                  "description": "Annual Income"
                }
              }
            },
            "property": {
              "title": "Property",
              "type": "object",
              "required": [],
              "properties": {
                "age": {
                  "type": "integer",
                  "title": "Age of property",
                  "description": "Age of property"
                },
                "address": {
                  "type": "string",
                  "title": "Address of property",
                  "description": "Address of property",
                  "maxLength": 100
                   }
              }
            }
          }
        },
        "inlimit": {
          "type": "boolean",
        "title": "Is mortgage application in limit?"
        }
      }
    }

From this JSON (you can copy & paste it into the `react-jsonschema-form`
sandbox) we can see that there is a main form with a title “Mortgage
Application Form." The root form `Mortgage Application Form` has two
properties: one is a subform called `Application` and the other is a
checkbox field (field ID is `inlimit`). 

The `Application` subform contains two fields (`Mortgage Amount` with field ID `mortgageamount` and `Down Payment` with field ID `downpayment`) and two subforms (`Applicant` with field ID `applicant` and `Property` with field ID `property`). 

The `Applicant` subform contains two fields (`Name` with field ID `name` and `Annual Income` with field ID `annualincome`). The `Property` subform also contains two fields (`Age of property` with field ID `age` and `Address of property` with field ID `address`).

By default (without providing UI schema), these are listed as one field per row. To use Entando’s implementation of Grid layout, users have to
provide UI schema with details about each field. For example, if we
would like to have a layout that looks like this (fields are marked
`[ field name ]`):

    +----------------------------------------------------------------------------+
    | Mortgage Application Form                                                  |
    +----------------------------------------------------------------------------+
    | Application                                                                |
    +----------------------------------+-----------------------------------------+
    | [Mortgage amount]                | [Down Payment]                          |
    +----------------------------------+-----------------+-----------------------+
    | Applicant                                          | Property              |
    +----------------------------------+-----------------+-----------------------+
    | [Name]                           | [Annual Income] | [Age of property]     |
    +----------------------------------+-----------------+-----------------------+
    |                                                    | [Address of property] |
    +----------------------------------------------------+-----------------------+

To set up the UI schema, you need to use field IDs to define each field you want to customize. For example, to add options to the `Name` field, create an object tree beginning at the root: `Application` —\> `Applicant` —\> `Name` (equivalent to `Application`.`Applicant`.`Name`). The UI schema for the table layout defined above looks like this:

    {
      Application: {
        'ui:options': {
          size: 12, // <-- this value is not mandatory as size is 12 columns-wide by default
        },
        mortgageamount: {
          'ui:disabled': true, // <-- user can define fields disabled at UI schema level
          'ui:options': {
            size: 6, // <-- Mortgage amount field should take up half of the row
          },
        },
        downpayment: {
          'ui:options': {
            size: 4, // <-- Down payment field should take up the other half of the row
          },
        },
        applicant: {
          'ui:options': {
            size: 8, // <-- Applicant subform should take up 8 out of 12 columns
          },
          name: {
            'ui:options': {
              size: 8, // <-- Applicant name field should take up 8 columns in the 8 columns that Applicant subform occupies
            },
          },
          annualincome: {
            'ui:options': {
              size: 4, // <-- Annual Income field taking up the remaining 4 columns
            },
          },
        },
        property: {
          'ui:options': {
            size: 4, // <-- Property subform should take up the remaining 4 out of 12 columns
          },
          // note that property's fields are not mentioned - defaulting them to 12 columns in are that is available to them
        },
      },
    }

As Material UI components are used for field templates, there might be a need to pass some Material UI options into the field. This can be done by adding the `muiProps` object to `ui:options`.

For example, if you would like to make the down payment field resizable, you can add `multiline: true` to the `muiProps` option. If you want to make the field to take up multiple rows by default, add the fields `rows` and `rowsMax`. The latter limits how many rows can be added until the scroll bar is shown.

    {
      downpayment: {
        'ui:options': {
          size: 4,
          muiProps: {
            multiline: true,
            rows: 2,
            rowsMax: 4
          }
        }
      }

## Widgets

Different types of widgets can be applied by passing the type via
`ui:widget`. This property specifies the widget to use when the form
renders a UI field. See the documentation to learn about widgets supported by the `react-jsonschema-form`.

## Building from Source

Reference the component projects for instructions to build from source code:
<https://github.com/entando/entando-process-driven-plugin>
<https://github.com/entando/entando-process-driven-plugin/tree/master/widgets>
<https://github.com/entando/pda-redhatpam-engine>
<https://github.com/entando/pda-core-engine>

## Code Style

See: <https://github.com/entando/entando-code-style>

## Sonar

<https://sonarcloud.io/organizations/entando/projects>

