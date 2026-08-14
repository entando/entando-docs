---
sidebarDepth: 2
---

# Content Attributes

On Entando, content type is defined by a collection of attributes. These attributes can be further broken down into their types, each with a list of parameters that carry the information inside the content. In other words, Attributes make it easier to categorize and find content and content types.  

This section describes the different attribute types supported by Entando.

## Attribute Types

Attribute types can be organized into two categories: simple and composed. A simple attribute type consists of a single piece of information, e.g., an image. A composed attribute type is a collection of simple attribute types, e.g., a set of images.

### Simple Attribute Types

**Attach**

- Represents a file attached to the content
- Consists of the URL of the file in the system’s resources and a text entry containing the file name or description
- Rendered as a ***button*** called `Add`. Clicking `Add` prompts the user to select a file from the system's digital assets attachment list.

**Boolean**

- Represents a boolean value which can be either true or false
- Rendered as a ***radio button*** with options labeled `Yes` and `No`
- Alternative to the **check box** attribute type

**Check box**

- Represents a boolean value which can be either true or false
- Rendered as a ***check box*** labeled `Yes` or `No`
- Alternative to the **boolean** attribute

**Date**

- Represents a date
- Provides time tracking capabilities
- Often used to filter content by publication date
- Rendered as a ***datepicker***

**Timestamp**

- A specialized instance of the **date** attribute
- The hour, minute and second can be specified
- Rendered as ***datepicker*** for the date and ***select*** for hours, minutes and seconds

**Enumerator**

- Represents textual information using a predefined set of options
- Defined by:
  - Mandatory elements declaring the set of available options
  - An optional separator declaring the character to separate the enumerator arguments. The default is a comma.
  - An ExtractorBean parameter naming the Spring bean that processes the enumerator. The value of ExtractorBean must exactly match the bean ID as defined in the Spring configuration file.
- Rendered as a ***select list***

**Enumerator Map**

- Represents textual information using a predefined set of options
- Defined by:
  - Elements comprising a separated list of key-value pairs
  - An optional separator declaring the character to separate the key-value pairs. The default separator is a comma.
  - Rendered as a ***select list***

**Hypertext**

- Holds HTML-tagged text
- Retains a single value for all languages
- Rendered as a ***text area*** on the page to edit content

> Note: It is best practice to only enter meaningful HTML tags. Avoid those which add graphics or are decorative. If the CKEditor is active, additional functionalities are accessible from a dedicated editor’s toolbar (e.g., table insertion, table manipulation, special character insertion, string formatting, & links creation).

**Image**

- Binds an image resource to the content
- The user must specify a description to accompany the image
- Images are rarely indexed or used to filter content
- Rendered as a ***button*** called `Add`. Clicking `Add` prompts the user to select an image from the digital assets image list.
- Selecting an image presents the user with a thumbnail preview and these parameters:
  - Text (required) defaults to the name of the selected image
  - Legend (optional)
  - Alt tag (optional but recommended)
  - Description (optional)
  - Title (optional)

**Link**

- Represents a hypertext link
- Normally used to include a link within content
- It is possible to define up to three different types of links:
  1. External link: Points to a location external to the Entando instance
  2. Page link: Points to a page within the Entando instance
  3. Content link: Points to other content within the Entando instance
- Rendered as a ***button*** called `Add`. Clicking `Add` opens a modal window from which the user can select the link type.

**Longtext**

- Represents simple unformatted text
- Supports several languages and the optional parameters of minimum and maximum length and regular expressions
- Normally used for a brief description when a short string is insufficient
- Rendered as a ***text area***

**Monotext**

- Represents information in textual form
- Supports only one language and the optional parameters of minimum and maximum length and regular expressions
- Used for fields that do not require localization
- Rendered as a ***text field***

**Number**

- Holds an integer number
- Retains a single value for all languages
- Supports the optional parameters `From`, `To` and `Equal to`
- Rendered as a ***text field***

**Text**

- Holds a string
- Retains a single value for all languages
- Supports minimum and maximum length and regular expressions as optional parameters
- Rendered as a ***text field***

**ThreeState**

- Conceptually similar to the **boolean** attribute, with `Both` as a third status option
- Rendered as a ***radio button*** with options labeled `Yes`, `No` and `Both`
### Composed Attribute Types

Simple attributes can only retain a single type of information, whereas composed attributes retain
many different types of information in one attribute.

Though it is functionally acceptable to build composed attributes with back-to-back types, it is not recommended as the parameters would appear unrelated and their relationship to one another could not be defined.

Entando offers three types of composed attributes: List, Monolist, and Composite.

**List**

- Represents a set of independent and homogeneous elementary attribute types.
- Each attribute type is associated with only one of the languages defined in the system, limiting the **list** attribute to mono-language attributes.
- Rendered as a ***button*** called `Add`. Clicking `Add` prompts the user to select or define the single elements which compose the list.

**Monolist**

- Represents a list that is common to all of the languages defined in the system, allowing the **monolist** attribute to handle both mono-language and multi-language attributes.
- Rendered as a ***button*** called `Add`. Clicking `Add` prompts the user to select or define the single elements which compose the monolist.

**Composite**

- Represents an aggregate of different, non-homogeneous, simple attribute types.
- The aggregation of different types is treated as a single unit.
- Rendered as a combination of the elementary attribute types, where each attribute type presents the proper rendering.

