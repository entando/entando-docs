# Business Objective

The Entando Process Driven Applications plugin is built to provide a
rich and full featured user experience to allow for the management and
completion of business processes and automation. The UX is delivered a
general purpose UX layer built using micro frontends that can be
utilized for any business process or task engine. Customers drive the UX
layer by utilizing a pre-developed Entando integration or by
implementing a set of interfaces on the server side. The backend is a
Spring Boot microservice that provides a pluggable interface allowing
for the injection of any underlying process or automation toolkit. The
interfaces and steps for creating a new PDA backend implementation are
provided below. This document provides an overview of the Entando
Process Driven Apps (PDA) plugin. The initial section covers the
business functionality and user facing micro frontends. The second
section covers the architecture and the points of extension for the PDA
plugin. The third provides a detailed technical overview for developers
to add new functionality to a PDA implementation.

# Terminology

## Micro Frontend

A Micro frontend architecture is an approach to developing web
application as a composition of small frontend apps. Instead of writing
a large monolith frontend application, the application is broken down
into domain specific micro frontends, which are self-contained and can
be developed and deployed independently. Process Driven Application

## Process Automation Manager (PAM)

A business process automation engine built and maintained by Red Hat

## Business Process Modeling Notation (bpmn)

Business Process Model and Notation (BPMN) is a graphical representation
for specifying business processes in a business process model.

## Decision Model and Notation (dmn)

Decision Model and Notation is a standard published by the Object
Management Group. It is a standard approach for describing and modeling
repeatable decisions within organizations to ensure that decision models
are interchangeable across organizations.

## Back End for Front End (BFF)

A microservice architecture allows teams to iterate quickly and to
develop technology to scale rapidly. The Backend for Frontend (BFF)
architecture is a type of pattern built with microservices. The key
component of this pattern is an application that connects the front-end
of your application with the backend. This BFF Code Pattern will help
you build that component according to IBM’s best practices.

# PDA Micro Frontends

This section provides an overview of each of the micro frontends (MFE)
that are available as part of the Entando PDA plugin. In cases below
where there are details specific to the PAM implementation they are
provided for that MFE. When extending the integration layer to other
engines or custom implementations it will be up to the integrating team
to define behavior and datasource for each MFE.

## Task List

The task list MFE provides a user with a list of visible tasks that are
either assigned to that user or that are potentially ownable by that
user. In the default implementation the visible tasks are limited to a
single process instance. At configuration time the application designer
is given the option to select a set of columns that will be visible in
the task list for that page.

### PAM Implementation

The default PAM implementation makes the top level task fields available
in the task list for selection. It is possible to fetch task and process
variables for rendering in the task list but these values are excluded
by default due to the additional API call overhead required.

## Task Details

The task details MFE renders detailed information about a given task.
The task details widget is intended to give the final user processing a
task the information necessary to complete the task at hand. The task
details are rendered in a read only grid. See the styling section below
for changing and customizing the layout.

### PAM Implementation

The PAM integration renders task variables in the task details widget.

## Task Comments

The task comments MFE gives the user the ability to view notes attached
to a given task and to add new notes to a task.

### PAM Implementation

The PAM implementation reads and publishes notes to the comments
endpoint

## Task Forms

The task form implementation renders a form specific to a task and gives
the user the ability to complete that form. The form implementation is a
wrapper around a JSON schema that describes the layout, style and
content of the form. It is up to the backend implementation to transform
to the schema and default ux layout needed to render the form. See the
technical documentation below for more on the JSON schema based
implementation.

### PAM Implementation

The PAM implementation of forms depends on the presence of a form
definition being present on the PAM task. The Entando PAM engine
implementation transforms from the PAM format to the JSON schema to
render the form. And it transforms the API format back to the PAM format
based on the form definition in PAM. There are some limitations on form
customization due to the format required to return data to PAM. See the
forms section in the technical documentation for more information.

## Attachments

The attachments MFE gives the user to view documents attached to a
task/case/process and to add new documents to a task/case/process.

### PAM Implementation

The PAM implementation posts the documents to the PAM endpoints for
storage. Future features will include using Entando document storage for
storing documents and a pluggable document management interface.

## New Process Form

The new process form renders a form that allows the final user to
provide the information necessary to instantiate a new business process
instance. The technology for generating the process form is the same as
the JSON schema definition used for task forms. === PAM Implementation
The PAM implementation depends on a form definition being attached to
the process definition. Entando transforms the PAM representation into a
JSON schema form that can be rendered to the final user.

## Summary Card

The summary card MFE provides a view into aggregate data for the process
implementation. The rendered information includes a total value, a trend
value, and a selector for timeframe. The summary card allows the
application developer to select a request for rendering the requested
information which maps to a call in the underlying engine to provide the
summarized data.

### PAM Implementation

The PAM implementation of the summary card widget relies on the PAM
custom query functionality. The PAM PDA engine exposes configuration
that allows users/developers to define a custom query in a config file
that will be executed to render the summary card. This implementation
allows the data rendered on the summary cards to be changed via
configuration. In the application there is a properties file that allows
the implementer to provide a custom query for each of the cards.

## Totals Over Time

The totals over time MFE provides a dual axis line/bar graph providing
trend information about the process environment. The MFE also provides
three summary values for comparison over the same time period.

### PAM Implementation

The PAM implementation of the totals over time MFE utilizes custom
queries to fetch the summary data rendered in the chart. The queries
used in the implementation are defined in configuration files in the MFE
and can be updated to render data specific to a given implementation.

# Customizing the Process Driven Application

## Styling

The Entando PDA MFEs are styled via a material UI theme. That theme can
be downloaded and updated here:
<https://github.com/entando/frontend-libraries/tree/master/packages/entando-ui>

## Implementing a New Engine or Integrating a New Task Source

Implementing a new Engine for Process Driven Applications means to
create a new Java Project and implement the interfaces defined in the
pda-core-engine project. So, the new project should include the
pda-core-engine as a dependency. To see an implementation in action,
take a look at the pda-redhatpam-engine project, which implements the
Red Hat PAM engine integration. After the engine is implemented, the JAR
file resulting from the implementation should be available in the
classpath for entando-process-driven-plugin, which is the project that
is ultimately executed and exposes the Rest APIs for the frontend
application. One way to do that is by publishing the engine
implementation to a Maven repository and adding it as a dependency to
the entando-process-driven-plugin project. Below are the descriptions of
the key classes and interfaces in the pda-core-engine project that need
to be inherited or implemented when creating a new engine
implementation:

-   Engine: This class represents a BPM engine and exposes the services
    that are available for that specific implementation. It is intended
    to be inherited and the subclass should provide the real
    implementation for each service by calling the superclass
    constructor with the service implementations as arguments. If any
    service is not supported, a null value should be passed to the
    corresponding constructor argument. The engine can provide
    implementations for the the following service interfaces:

    -   TaskService: defines service methods for task retrieval from the
        BPM engine.

    -   TaskDefinitionService: defines service methods related to task
        definition. A task definition specifies which fields or columns
        are available for all task instances.

    -   TaskCommentService: defines service methods related to task
        comment manipulation. It should be implemented if the task
        comment is supported by the engine.

    -   TaskAttachmentService: defines service methods to operate on
        task attachments. It should be implemented if the engine
        supports file attachment on the task.

    -   TaskFormService: defines service methods for task form
        operations, like retrieving the form definition and submitting a
        form. The Form object can be used to render a form dynamically.

    -   TaskLifecycleService: defines service methods related to the
        task lifecycle. The lifecycle operations move the task from one
        state to another.

    -   TaskLifecycleBulkService: defines methods for bulk lifecycle
        operations. Like the TaskLifecycleService, methods here move the
        task from one state to another, but this interface works with
        multiple tasks at a time.

    -   ProcessService: defines service methods for process definitions
        operations.

    -   ProcessFormService: defines service methods for process form
        operations, like retrieving the form definition and submitting a
        form. The Form object can be used to render a form dynamically.

    -   GroupService: define service methods related to groups from the
        BPM engine.

## Page Templates and Layout

Page templates are page templates that facilitate rapid development of
pages and allow adding pre-made components - widgets - just by drag &
dropping. Templating language used in page models is parsed by Apache
FreeMarker template engine. To create a new page model, go to the Admin
panel and select UX Pattern \> Page Models. Press “Add” and you will be
redirected to the page model creation screen. Add the page model code
and page model name. Depending on the version you are using you will
need to provide a XML or JSON schema. This schema is used to generate
the page layout in page configuration screen - it’s used to drag & drop
widgets on the page and helps users visualize where each widget will be
placed on the page. Basic schema could look like this

    {
      "frames": [
        {
          "pos": 0,
          "descr": "Widget description",
          "mainFrame": false,
          "defaultWidget": null,
          "sketch": {
            "x2": 1,
            "y2": 0,
            "x1": 0,
            "y1": 0
          }
        }
      ]
    }

Each item in the frames array represents a widget frame (slot).

-   pos - a position index (starts from zero); this value is used in
    APIs to address specific widget on the page

-   descr - widget frame description that is displayed in page
    configuration screen

-   mainFrame - The primary frame on the page model

-   defaultWidget - widget code for a default widget to use in this
    frame; page model developer can help out users and suggest the
    default widgets to use (e.g., header and footer widgets)

-   sketch - an object with 4 coordinates on x and y axises; this allows
    the developer to place the widgets on the visual representation of
    the page model’s frames.

Sketch’s x and y values go from 0 to 11 (similar to columns in
Bootstrap), so if you want to place a 2x2 frame at the top left corner
of the page, the values would be x1: 0, x2: 1 y1: 0 y2: 1.

After you create the JSON/XML schema for the widgets, you can start
working on the page template itself. It’s a HTML template that contains
references to the frames you have added in schema. To add a frame in a
specific place of the page, just add `<@wp.show frame=0 />`, where frame
is the pos variable from the schema. Do not forget to add
`<#assign wp=JspTaglibs["/aps-core"]>` at the top of your template, it
will provide access to wp variable.

After you are done with your page model, go to Page designer \> Page
tree and create a new page by pressing “Add”. Fill the needed
information and under Settings \> Page Model select your newly created
page model. Press “Save and Configure” and you will be redirected to the
page configuration screen where you will be able to drag & drop the
available widgets onto the free frames. Set up your widgets (not all
frames need to be filled) and publish the page. To see your page you can
press “Preview” or go to
`` `<YOUR_ENVIRONMENT_URL>/<LOCALE>/<PAGE_CODE>.page ``. If your pages
share common parts such as GTM scripts, consider using fragments.
Fragments are like shared code snippets - just add \<@wp.fragment
code="\<FRAGMENT\_CODE\>" escapeXml=false /\> to your page template and
the code inside the fragment will be added to your page.

## Creating a new PDA MFE

There are no limitations on the stack that could be used to create PDA
MFEs. Custom Elements are a great way to hide implementation details
while providing a neutral interface to others. To create a simple PDA
MFE, implement your solution using technologies you are familiar with
and wrap it in a custom element. Build your solution with a custom
element and upload the built files (Settings \> File Browser) in
/public/ folder. Go to `UX Pattern > Widget` section of the admin panel
and press “Add” to add a new widget. Enter widget code, titles, select
group (for free access to everybody, select “Free Access”), and fill the
Custom UI:

    <#assign wp=JspTaglibs["/aps-core"]>
    <script src="<@wp.resourceURL />path/from/static/bundle.js"></script>
    <your-custom-element parameter=”value” />

`<#assign wp=JspTaglibs["/aps-core"]>` - provides access to wp variable
that is used to get resource URL. After you add the widget, go to the
page tree, select a page where you would like to use the widget and
configure it. Drag and drop the widget into a frame and publish the
page.

## Communication between MFEs

Communication between MFEs can be achieved using Custom Events. Each
widget can define events that it will emit and register to events that
are important to it.

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

Custom element then creates the events it emits and registers to the
events that it wants to react to

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

### Task forms

Widgets containing form (e.g., task completion form widget) use JSON
schema to dynamically create forms. Widget implementation uses
react-jsonshema-form library that converts forms’ JSON schemas into
React components. Our initial implementation uses Material UI components
via Material UI theme library rjsf-material-ui as baseline and has
Entando specific templates, widgets and fields (which are
react-jsonshema-form terms for parts of forms). In this section you will
learn about basic setup of the form, but if you would like to learn
more, please refer to react-jsonshema-form documentation. Themed JSON
form is created using the withTheme() method from the
react-jsonschema-form package

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

For JSON Form to work, the form schema is mandatory. It’s a JSON
definition of the form’s structure. Users can also provide form data via
formData variable, which should follow the structure of JSON schema; and
UI schema using uiSchema variable, which allows users to customise the
form’s UI (components, rules, types, etc.) To test JSON schema, UI
schema and form data, you can use react-jsonschema-form sandbox
environment. Custom Entando templates, widgets, and fields provide a
possibility to customise the layout of the form using Grid components.
To specify what area a field or subform should fill, users can provide
size parameter in UI schema’s ui:options object. Size refers to Material
UI’s grid column widths (Material UI documentation) where the area the
from can take up is divided into 12 columns and value 12 (a default
value if size is not provided) means the field or subform should take up
all 12 columns. That means that size should be a value from 1 to 12. If
two fields that are next to each other have size values 8 and 4
respectively - they will fit into one row, first field being 2 times
wider than the second field. User can also provide innerSize parameter
to size the input inside the field. This helps with formatting - if user
wants a two column layout and have smaller input fields inside these
columns. Multicolumn layout can also be achieved using
generateColumnedOFT(columnSize) functionality, basically providing the
default columnSize to the created form. generateColumnedOFT returns an
ObjectFieldTemplate that is used as a template for all object fields
(fields that contain properties inside of them). To help us understand
the mapping between JSON schema and UI schema lets define an example
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

From this JSON (you can copy & paste it into the react-jsonschema-form
sandbox) we can see that there is a main form with a title “Mortgage
Application Form”. Root “Mortgage Application Form” form has two
properties - one is a subform `Application` and the second one is just a
checkbox field (field ID is inlimit). Application subform contains 2
fields: Mortgage amount (field ID is mortgageamount) and Down Payment
(field ID is downpayment); and two subforms - Applicant (field ID is
applicant) and Property (field ID is property). Applicant subform
contains 2 fields - Name (field ID is name) and Annual Income (field ID
is annualincome). Property subform contains 2 fields - Age of property
(field ID is age) and Address of property (field ID is address) By
default (without providing UI schema) they are all listed one field per
row. To use Entando’s implementation of Grid layout, users have to
provide UI schema with details about each field. For example, if we
would like to have a layout that looks like this (fields are marked
`[ field name ]`):

    +----------------------------------------------------------------------------+
    | Mortgage Application Form                                                   |
    +----------------------------------------------------------------------------+
    | Application                                                                 |
    +----------------------------------+-----------------------------------------+
    | [Mortgage amount]                | [Down Payment]                          |
    +----------------------------------+-----------------+-----------------------+
    | Applicant                                          | Property              |
    +----------------------------------+-----------------+-----------------------+
    | [Name]                           | [Annual Income] | [Age of property]     |
    +----------------------------------+-----------------+-----------------------+
    |                                                    | [Address of property] |
    +----------------------------------------------------+-----------------------+

To set up the UI schema you have to define each field you want to
customise by addressing using the field IDs - to add options to
Applicant’s Name field, you will have to create an object tree going
from root object through Application —\> Applicant —\> Name (using IDs
it’s Application.applicant.name). UI schema for the table layout defined
above would look like this:

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
    };

    As Material UI components are used for field templates, there might be a need to pass some Material UI options into the field. You can do that by adding muiProps object to the ui:options.
    For example, if you would like to make the Down payment field resizable, you can add multiline: true to muiProps option. If you want to make the field take up multiple rows by default, add rows and rowsMax fields. The latter limits how many rows should be added until the scroll bar is shown.
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
"ui:widget". Property tells the form which UI widget should be used to
render a field. You can read about react-jsonschema-form supported
widgets here.

## Building From source

Reference the component projects for instructions to build from source.
<https://github.com/entando/entando-process-driven-plugin>
<https://github.com/entando/entando-process-driven-plugin/tree/master/widgets>
<https://github.com/entando/pda-redhatpam-engine>
<https://github.com/entando/pda-core-engine>

## Code Style

See: <https://github.com/entando/entando-code-style>

## Sonar

<https://sonarcloud.io/organizations/entando/projects>

