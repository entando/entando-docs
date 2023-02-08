---
sidebarDepth: 2
---

# Preinstalled Widgets


The Entando Platform includes a number of useful components to accelerate application development. These consist of widgets, page templates, content templates and content types. This page introduces the CMS, navigation, page, SEO and system widgets that are available out of the box. 

## Widget Attributes

All widgets are required to have the following attributes. These are mandatory regardless of whether a widget is preinstalled, user-created, or inside a bundle.

- `Name`: Specifies the name of the widget
- `Code`: Satisfies the REGEX `/^[0-9a-zA-Z_.]+$/`
- `Group`: A group for which the user has "create" permissions
- `Icon`: Visually represents the widget via either an uploaded icon (SVG file) or one chosen from the icon library
- `Custom UI`: HTML code that constructs the visual layout of the widget
- `Config UI`: A JSON structure that informs the widget's configuration. It requires two properties:
   - `customElement`: The custom element name of the widget config component
   - `resources`: An array listing the source location of the custom element files for the widget configuration
## Widget Descriptions

The following tables list the notable preinstalled widgets of an Entando instance. They can be accessed from the left menu of the App Builder by selecting `Components` → `MFE & Widgets`.


| Name | Type | Description |
| :- | :- | :- |
| Content Search Query | CMS | Publishes a list of contents based on different settings. It would be nice to have a brief explanation on how to modify its fragment. |
| Content List | CMS | Renders a list of contents, each one displaying information from a template |
| Search Form | CMS |  |
| Search Results | CMS |  |
| Legacy Navigation Menu | Navigation |  |
| Navigation Menu | Navigation | The basic menu interface in which a user can choose where to visit |
| Logo | Page | The default Entando logo | 
| Content SEO Meta-description | SEO |  |
| APIs | System |  |
| Internal Servlet | System |  |
| Login | System | The Keycloak-powered log in / log out component for the web app |
| Legacy Login Form | System | A non-Keycloak form component for log in |

### Widget Details