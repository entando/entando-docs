---
sidebarDepth: 2
---

# Preinstalled Widgets


The Entando Platform includes a number of useful components to accelerate application development. These consist of widgets, page templates, content templates, and content types. 

This page introduces the widgets that are available out of the box with an Entando 7 installation. These widgets are categorized by type, implementing CMS, navigation, page, SEO or system functionality.

## Widget Attributes

All widgets are required to have the following attributes. These are mandatory regardless of whether a widget is preinstalled, user-created, or inside a bundle.

- `Name`: A string that specifies the name of the widget
- `Code`: A string that satisfies the REGEX `/^[0-9a-zA-Z_.]+$/`
- `Group`: A group for which the user has "create" permissions
- `Icon`: A graphic that visually represents the widget via an uploaded icon (SVG file) or one chosen from the icon library
- `Custom UI`: HTML code that constructs the visual layout of the widget
- `Config UI`: A JSON structure that informs the widget's configuration. It requires two properties:
   - `customElement`: The custom element name of the widget config component
   - `resources`: An array listing the source location of the custom element files for the widget configuration
## Widget Descriptions

The following table lists the notable preinstalled widgets of an Entando instance. They can be accessed from the left menu of the App Builder by selecting `Components` → `MFE & Widgets`.


| Name | Type | Description |
| :- | :- | :- |
| APIs | System | The only mechanism with which developers can communicate with the Entando core |
| Content List | CMS | A widget that renders a list of contents, each one displaying information from a template |
| Content Search Query | CMS | A widget that publishes a list of contents based on different settings |
| Content SEO Meta-description | SEO | A component listing the SEO parameters specified when pages are created or modified |
| Internal Servlet | System | A legacy implementation to create server-side widgets using Struts 2. Available for backwards compatibility with older projects. |
| Legacy Login Form | System | A non-Keycloak form component for logging in |
| Legacy Navigation Menu | Navigation | An interface that is configurable via expression list parameters. A user with admin privileges can easily change its layout. |
| Login | System | The Keycloak-powered login/logout component for the web app |
| Logo | Page | The default Entando logo. It can be used in other projects by changing its fragment reference. | 
| Navigation Menu | Navigation | An OOTB widget configurable via expression list parameters |
| Search Form | CMS | A basic search form |
| Search Results | CMS | A component that shows the results of the query entered into the Search Form |


