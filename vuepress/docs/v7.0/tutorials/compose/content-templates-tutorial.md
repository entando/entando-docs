# Content Templates

Content templates define how information is displayed when content is published. They provide the styling and layout for content types and enable different representations of the same content.

## Create a Content Template

Content templates are managed by the Entando Web Content Management System (WCMS), through a user interface accessible from the [App Builder](../../docs/getting-started/concepts-overview.md#entando-app-builder). Follow the steps below to create and configure a content template.

**1. From the left menu of the App Builder, go to `Content` → `Templates`**

**2. Click the `Add` button above the list of existing templates**  

![createContentTemplate](./img/content_template1.png)

**3. Define the characteristics of the content template**

![defineContentTemplate](./img/content_template2.png)

- `Type`: Choose a content type from the drop-down list. Click the `Set` button to input your selection.

- `Code`: Enter a sequence of up to 10 numbers to uniquely identify the content template. This field is mandatory.

- `Name`: Enter a name or description for the content template. This field is mandatory and supports a string of 50 characters or less and should consist of one or more of the following: uppercase letters, lowercase letters, numbers and/or special characters.

- `Model`: Enter HTML to model the content template with Velocity language. This field is mandatory.

- `Style Sheet`: (Optional) Enter the CSS to be applied to the HTML `Model`.

**4. Click the `Save` button**

This adds the content template to the content type.

