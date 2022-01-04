# PDA Plugin Technical Guide

This page explores PDA plugin structure and functionality in greater detail. The sample code and linked resources instruct the user in the versatility and usability of: 
 
- Task Forms
- Widgets
- Code Style 
- Sonar
 
## Task Forms
 
Widgets employ JSON schema to dynamically create any forms they contain. The JSON schemas are converted into React components using the `react-jsonshema-form` library. Entando's initial implementation utilizes Material UI components derived from the Material UI theme library (`rjsf-material-ui`) as a baseline, and includes templates, widgets and fields (`react-jsonshema-form` terms for forms components) that are specific to Entando.
 
This section will introduce the basic form configuration, but if you would like to learn more, please refer to the `react-jsonshema-form` documentation.
 
The themed JSON Form is created using the `withTheme()` method from the `react-jsonschema-form` package:
 
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
 
To set up the UI schema, you need to use field IDs to define each field you want to customize. For example, to add options to the `Name` field, create an object tree beginning at the root: `Application` —\> `Applicant` —\> `Name` (equivalent to `Application.Applicant.Name`). The UI schema for the table layout defined above looks like this:
 
    {
      Application: {
        'ui:options': {
          size: 12, // <-- this value is not mandatory; size is 12  columns wide by default
        },
        mortgageamount: {
          'ui:disabled': true, // <-- user can define fields disabled at UI schema level
          'ui:options': {
            size: 6, // <-- Mortgage Amount field should take up half of the row
          },
        },
        downpayment: {
          'ui:options': {
             size: 4, // <-- Down Payment field should take up the other half of the row
           },
        },
        applicant: {
          'ui:options': {
             size: 8, // <-- Applicant subform should take up 8 out of 12 columns
          },
          name: {
            'ui:options': {
              size: 8, // <-- Applicant Name field should take up 8 of the 8 columns that Applicant subform occupies
            },
          },
          annualincome: {
            'ui:options': {
               size: 4, // <-- Annual Income field should take up the remaining 4 columns
            },
          },
        },
         property: {
          'ui:options': {
            size: 4, // <-- Property subform should take up the remaining 4 out of 12 columns
          },
          // note that Property field occupancy is not specified, defaulting to use all 12 of the columns available
        },
      },
    };
 
As Material UI components are used for field templates, there might be a need to pass some Material UI options into the field. This can be done by adding the `muiProps` object to `ui:options`.
 
For example, if you would like to make the down payment field resizable, you can add `multiline: true` to the `muiProps` option. If you want the field to take up multiple rows by default, add the fields `rows` and `rowsMax`. The latter limits how many rows can be added until the scroll bar is shown.
 
   
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
## Code Style
 
Refer to: <https://github.com/entando/entando-code-style>
 
## Sonar
 
Refer to: <https://sonarcloud.io/organizations/entando/projects>
