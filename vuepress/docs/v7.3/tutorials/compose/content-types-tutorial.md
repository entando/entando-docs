---
sidebarDepth: 2
---

# Content Types

On Entando, content refers to a specific instance of a content type. A content type provides the template to specify and represent content. 

Content types are characterized by [attributes](./content-attributes.md). Each attribute is a specialized instance of an attribute type and defined by the parameters available to that attribute type. 

## Create a Content Type

Content types are managed by the Entando Web Content Management System (WCMS) in the [App Builder](../../docs/getting-started/concepts-overview.md#entando-app-builder). Follow the steps below to create and configure a content type.

**1.** From the left menu of the App Builder, go to `Content` → `Types`

**2.** Click the `Add` button in the upper right corner

![addContentType](./img/content_types1.png)

**3.** Configure the content type

- Enter these required fields:

  - `Code`: A unique identifier of the content type consisting of 3 uppercase letters

  - `Name`: A string of 50 characters or less consisting of uppercase and lowercase letters, numbers, and/or special characters

- To specify a meaningful content type, you must choose the appropriate attribute `Type` from the drop-down menu

![configureContentType](./img/content_types2.png)

**4.** Click `Add`to configure the details of the selected attribute type 

### Configure the Attribute

When the configuration form loads, the `Type` field should be auto-filled with what was selected.

**1.** Define the parameters of the attribute:

![configureAttributeType](./img/content_types3.png) 

- `Code`: A unique name mandatory for the attribute. This field supports a string value of 10 characters or less, and should consist of one or more of the following: uppercase & lowercase letters, numbers, and/or special characters.

- `Name`: Enter a description of the attribute. This field supports a string of 50 characters or less, and should consist of one or more of the following: uppercase & lowercase letters, numbers, and/or special characters.

- Certain attribute types allow you to declare the attribute as `Mandatory`, `Searchable` and/or `Can be used as a filter in lists` via toggle buttons.

- Certain attribute types allow you to choose an attribute `Role`. Be sure to click the `Add` button after making your selection.  

> Note: Certain attribute types support the `Role` of `jacms:title - The main title of a Content` to inform plugins or services that the attribute is a title, regardless of the value entered for `Code`. A `Code` value of "title" avoids confusion if `jacms:title - The main title of a Content` is selected.

- The remaining fields are not required and may be left empty.

**2.** Click `Continue`

This adds the configured attribute to the content type. Complete the additional configuration steps required by your attribute type, as needed.

![modifyContentType](./img/content_types4.png)

**3.** (Optional) Add other attributes to your content type, if desired

Each attribute requires its own configurations. 

**4.** Click the `Save` button

The content type you created is now displayed in the table.

![listedContentType](./img/content_types5.png)