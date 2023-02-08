---
sidebarDepth: 2
---

# Preinstalled Widgets


The Entando Platform includes a number of useful components to accelerate application development. These consist of widgets, page templates, content templates and content types. This page introduces the CMS, navigation, page, SEO and system widgets that are available out of the box. 

## Widget Attributes

All widgets are required to have the following attributes. These are mandatory regardless of whether a widget is preinstalled, user-created, or inside a bundle.

- **Name**: Specifies the name of the widget
- **Code**: Satisfies the REGEX `/^[0-9a-zA-Z_.]+$/`
- **Group**: A group for which the user has "create" permissions

## Widget Descriptions

The following tables list the preinstalled widgets of an Entando instance. They can be accessed from the left menu of the App Builder by selecting `Components` → `MFE & Widgets`.

### CMS Widgets
| Name | Code | Description |
| :- | :- | :- |
| `News Archive` | NWS_Archive |  |
| `News Latest` | NWS_Latest |  |
| `Content` | content_viewer |  |
| `Content Search Query` | content_viewer_list |  |
| `Content List` | row_content_viewer_list | Renders a list of contents, each one displaying information from a template |
| `Search Form` | search_form |  |
| `Search Results` | search_result |  |

### Navigation Widgets
| Name | Code | Description |
| :- | :- | :- |
| `Breadcrumbs` | breadcrumb | The textual representation of a user’s location within the web app |
| `Legacy Navigation Menu` | legacy-navigation-menu |  |
| `Navigation Menu` | navigation-menu | The basic menu interface in which a user can choose where to visit |
| `Sitemap` | sitemap | The hierarchical representation of the pages comprising the web app |

### Page Widgets
| Name | Code | Description |
| :- | :- | :- |
| `Language` | language | The toggle switch for the user to select the language shown in the web app |
| `Logo` | logo | The default Entando logo | 

### SEO Widgets
| Name | Code | Description |
| :- | :- | :- |
| `Content SEO Meta-description` | jpseo_content_viewer |  |

### System Widgets
| Name | Code | Description |
| :- | :- | :- |
| `APIs` | entando_apis |  |
| `Internal Servlet` | formAction |  |
| `Login` | keycloak-login | The Keycloak-powered log in / log out component for the web app |
| `Legacy Login Form` | login_form | A non-Keycloak form component for log in |
| `System Messages` | messages_system | Technical system messages generated in the web app |


The most commonly used default widgets are further documented below.