# Content Types

A Content Type represents or models a Content. Alternatively, a Content is an instance or specialization of a Content Type. 

Content Types are characterized by [Attribute Types](./content-attributes.md). Each Attribute Type consists of one or more properties, known as Attributes. An Attribute is defined by its Attribute Type.

## Create a Content Type

Content Types are managed via the Web CMS, through a user interface provided by the Entando App Builder. Follow the steps below to create and configure a Content Type.

**1. From the left menu of the App Builder, go to `Content` → `Types`.**

**2. Click the `Add` button in the upper right corner.**

![addContentType](./img/content_types1.png)

**3. Configure the Content Type.**

When adding a Content Type it is mandatory to enter `Code` and `Name` values consistent with the following parameter definitions:

- `Code`: A unique identifier of the Content Type that must be 3 uppercase letters (e.g. CNN).

- `Name`: A string value (50 characters max) consisting of uppercase and lowercase letters, numbers and/or special characters (e.g. Conference\_News).

Field selections in the Metadata and Attributes sections are not mandatory, but to specify a meaningful Content Type you must choose the appropriate `Type` from the Attributes drop-down (e.g. 'Text'). The available Attribute Types define Attributes to characterize the Content.

![configureContentType](./img/content_types2.png)

**4. Click the `Add` button.**

This initializes the configuration of the selected Attribute Type. Each Attribute Type requires its own configuration. 

### Attribute Configuration

Adding an Attribute Type will load the "Add attribute" page, where `Type` is pre-filled with your selection. Follow the steps below to configure the Attribute.

**1. Define the characteristics of the Attribute:**

![configureAttributeType](./img/content_types3.png) 

- `Code`: It is mandatory to enter a unique name for the Attribute key (both Attributes of a 'Composite' Attribute Type may share a `Code` name). This field supports a string value (10 characters max) of uppercase and lowercase letters, numbers and/or special characters (e.g. title).

- `Name`: Enter a description of the Attribute. This field supports a string value (50 characters max) of uppercase and lowercase letters, numbers and/or special characters (e.g. Title).

- You may have the option to declare that the Attribute is `Mandatory`, `Searchable` and/or `Can be used as a filter in lists` via toggle buttons.

- You may have the option to choose an Attribute `Role`. Be sure to click the `Add` button after making your selection.  

- The remaining fields are not mandatory and may be left empty.

:::tip
Certain Attribute Types allow you to assign the `Role` of `jacms:title - The main title of a Content`. This informs other plugins or services that the Attribute is a title, regardless of its key, or `Code`. Entering "title" for the `Code` avoids confusion when this `Role` is selected.
:::

**2. Click the `Continue` button.**

This adds the configured Attribute to the Attribute Type.

![modifyContentType](./img/content_types4.png)

- (Optional) Complete the additional configuration steps required by your Attribute Type, if applicable (the 'Text' Attribute Type requires no additional configuration). 

- (Optional) Add other Attribute Types to your Attribute, subject to the above configuration process.


**3. Click the `Save` button.**

The new Content Type is now displayed in the table.

![listedContentType](./img/content_types5.png)