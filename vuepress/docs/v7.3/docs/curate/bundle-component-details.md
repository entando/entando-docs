---
sidebarDepth: 2
---

# Bundle Component Descriptors 


Elements such as pages, content, simple widgets, fragments, and static resources that belong to a bundle are classified as platform components on Entando. The following paragraphs describe each of these types and how they can be used in a bundle, with an example.

Currently, Entando supports the following component types: 

![component-types.png](./img/component-types.png)

Each is defined by a descriptor YAML placed in the corresponding folder inside the bundle `platform` directory. During the pack phase of building an Entando bundle, the descriptors are included in the resulting Docker image following this pattern. 

Here is an example structure of the `platform` directory in an Entando Bundle project:

```
bundle-project/
...
  platform/
    assets/
    categories/
    contentTemplates/
    contentTypes/
    contents/
    fragments/
    groups/
    labels/
    pageTemplates/
      my-page-template.yaml
    pages/
      my-page.yaml
    widgets/
      my-widget.yaml
    resources/
      css/
        my-css-format.css
  ...
  entando.json		<= Bundle project descriptor
```
>Note: Older names `pageModels` and `contentModels`, for `pageTemplates` and `contentTemplates` respectively, are still supported on Entando 7 but may be phased out in future releases. 

## Assets
The CMS asset descriptor contains the metadata required for uploading and updating bundle assets.

**assets-descriptor.yaml**

    correlationCode: 'my-reference-code'
    type: image

    # This file should be placed in the same folder as the descriptor.yaml
    name: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    description: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    group: free
    categories: []

## Categories
This descriptor contains a list of categories. 

**categories-descriptor.yaml**

    - code: my-category # Category name
      parentCode: home # The parent category; home is the base category
      titles:
        it: "Una nuova categoria" # Category name in Italian
        en: "New category" # Category name in English

## Contents
This descriptor enables content to be created and published via a bundle, according to the `status` property. The content ID is optional and enables linking from other components, like content widgets. It can be auto-generated or explicitly declared.

Groups in a content descriptor are configured by the owner group `mainGroup` and the join group, `groups`. The owner group consists of users who can manage the content within the App Builder, while the join group consists of users who can view the content.

See an example of [how content is created and managed](../../tutorials/compose/content-tutorial.md).

**contents-descriptor.yaml**

    id: NWS650
    typeCode: NWS
    description: Dealing with a financial emergency
    mainGroup: free
    groups:
      - free
    status: PUBLIC
    attributes:
      - code: date
        value: '2020-04-23 00:00:00' # the date should be in ISO-8601 format
      - code: title
        values:
          en: Dealing with a financial emergency
      - code: subtitle
        values:
          en: |
            <p>How to tackle financial stress</p>
      - code: body
        values:
          en: |
            <p>For many people, financial concerns are their number one stress point. 
            Here are 6 ways to help reduce your money stress and get motivated 
            to take control of your finances.</p>
      - code: img
        values:
          en:
            correlationCode: '651'
            name: bank_750xx684385064_d0.jpg
      - code: links^
        elements:
          - code: links
            value:
              symbolicDestination: '#!U;http://www.yoursite.com/!#'
              destType: 1
              urlDest: 'http://www.yoursite.com/'
              pageDest: null
              contentDest: null
              resourceDest: null
            values:
              en: vostro sito
          - code: links
            value:
              symbolicDestination: '#!U;http://www.yoursite.com/!#'
              destType: 1
              urlDest: 'http://www.yoursite.com/'
            values:
              en: vostro sito 2
      - code: attaches
        elements:
          - code: attaches
            values:
              en:
                correlationCode: '205'
                name: Entando_Admin_Console_Overview_4.3.3_EN.pdf

**^ Code: Links**
* Content descriptors are loaded in alphabetical order during the bundle creation process. If content X references content Y, content Y must already exist in the bundle for the reference to work. To guarantee referential integrity in a bundle, we recommend that the descriptor name for Y appear earlier in the alphabetical order then content X.
* Content in bundles cannot make circular references to each other through the link attribute. A circular link is when content A links to content B and B links back to A. Due to the descriptor's alphabetical order of installation, the circular link will cause an error, but the links can be added manually after the installation of the bundle.

## Content Templates
For some additional details, see the [Content Templates Tutorial](../../tutorials/compose/content-templates-tutorial.md).

**contentTemplates-descriptor.yaml**

    id: 8880003
    contentType: CNG
    description: Demo Content Template

    # Optional. Define the content template shape in a separate file or inside 
    # the descriptor file with `contentShape`
    contentShapePath:

    # Optional. Define the content template shape as shown below or in a separate file 
    # with `contentShapePath`
    contentShape: >-
      <article>
        <h1>$content.Title.text</h1>
        <h2>Demo content template</h2>
        #if ( $content.MainBody.text != "" )
        $content.MainBody.text
        #end
      </article>

    widgets:
      - code: Brand-Logo
        config: null
        pos: 0
      - code: Login_buttons
        config: null
        pos: 2
      - code: seeds_card
        config:
          cardname: creditcard
        pos: 6
      - code: list_item
        config:
          icon: managealerts
          count: '0'
          title: Alerts
        pos: 7
      - code: list_item
        config:
          icon: viewstatements
          count: '0'
          title: View Statements
        pos: 11
      - code: seedscard-transaction-table
        config: null
        pos: 13

## Content Types
For some more details, refer to the [Content Types Tutorial](../../tutorials/compose/content-types-tutorial.md).

**contentTypes.yaml**

    code: CNG
    name: Demo
    status: 0

    attributes:
      - code: title
        type: Text
        name: Title
        roles:
          - code: jacms:title
            descr: The main title of a Content
        disablingCodes: []
        mandatory: true
        listFilter: false
        indexable: false

        enumeratorStaticItems: string
        enumeratorStaticItemsSeparator: string
        enumeratorExtractorBean: string

        validationRules:
          minLength: 0
          maxLength: 100
          regex: string
          rangeStartString: string
          rangeEndString: string
          rangeStartStringAttribute: string
          rangeEndStringAttribute: string
          equalString: string
          equalStringAttribute: string
          rangeStartDate: string
          rangeEndDate: string
          rangeStartDateAttribute: string
          rangeEndDateAttribute: string
          equalDate: string
          equalDateAttribute: string
          rangeStartNumber: 0
          rangeStartNumberAttribute: string
          rangeEndNumber: 0
          rangeEndNumberAttribute: string
          equalNumber: 0
          equalNumberAttribute:
          ognlValidation:
            applyOnlyToFilledAttr: false
            errorMessage: Something
            keyForErrorMessage: some
            keyForHelpMessage: thing
            ognlExpression: string

## Fragments
See an example of [how to use a fragment](../../tutorials/compose/widgets-fragments.md#create-and-update-a-ux-fragment).

**fragments-descriptor.yaml**

    code: my_fragment # Fragment name

    # Optional. The fragment content
    guiCode: >-
      "<div>Here is the content</div>"

    # Optional. A path to a FreeMarker file containing the fragment content
    guiCodePath: my_fragment.ftl  


## Groups
This descriptor contains a list of groups.

**groups-descriptor.yaml**

    - code: my_group # Identifies the group
      name: "My group" # The name of the group

## Labels
This descriptor contains a list of labels.

**labels-descriptor.yaml**

    - key: my-first-label # Identifies the label
      titles: # The titles for the label
        it: Vostro Titolo # The title in Italian
        en: Your Title # The title in English

## Languages
This descriptor contains a list of languages to enable during the installation process.

**languages-descriptor.yaml**

    - code: en
      description: English
    - code: it
      description: Italian

## Pages
This descriptor creates a page for a bundle. The page layout can be fully configured with a configuration widget. Page status can be `published` or `draft`.

Groups in a page descriptor are configured by `ownerGroup` and `joinGroups`. The `ownerGroup` property specifies the group of users who can manage the page in the App Builder. The `joinGroups` property specifies those who can view or access the page. For example, setting `ownerGroup` to "free" means anyone with access to the App Builder can manage the page, whereas setting `joinGroup` to "free" means any end user can view the page in the application. 

See an example of [how a page is created and managed](../../tutorials/compose/page-management.md) in the App Builder.

**pages-descriptor.yaml**

    code: my-dashboard
    parentCode: homepage
    titles:
      en: my dashboard
      it: La mia Dashboard
    pageModel: dashboard
    ownerGroup: free
    joinGroups: []
    displayedInMenu: true
    seo: false
    charset: utf-8

    # ECR will publish the page according to this property
    status: published|draft

    # Page Configuration
    widgets:
      - code: Brand-Logo
        config: null
        pos: 0
      - code: Login_buttons
        config: null
        pos: 2
      - code: seeds_card
        config:
          cardname: creditcard
        pos: 6
      - code: list_item
        config:
          icon: managealerts
          count: '0'
          title: Alerts
        pos: 7
      - code: list_item
        config:
          icon: viewstatements
          count: '0'
          title: View Statements
        pos: 11
      - code: seedscard-transaction-table
        config: null
        pos: 13

## Page Templates
Here's some more details about [how page templates work on Entando](../../tutorials/compose/page-management.md#create-a-page-template).

**pageTemplate-descriptor.yaml**

    code: my_page_template # The page template identification
    description:  Basic page template # The page template description

    titles: # my_page_template's titles
      en: my_page_template # Title in English
      it: il_mio_modello # Title in Italian

    # The page template configuration
    configuration:
      frames: # All frames
        - pos: 0 # Frame position
          description: Header # Frame description
          sketch: # Frame sketch configuration
            x1: 0
            y1: 0
            x2: 11
            y2: 1
          defaultWidget:
            code: my-widget # The widget code to apply when using the button 
                            # "apply default widgets" in the page configuration UI

        # A simplified way to define frames
        - pos: 1
          description: Breadcrumb
          sketch: { x1: 0, y1: 0, x2: 11, y2: 1 }

    # Optional. Define the page template in a separate file or inside the descriptor file 
    # with `template`
    templatePath: page.ftl

    # Optional. Define the page template as below or in a separate file with `templatePath`
    template: >-
      <#assign wp=JspTaglibs[\"/aps-core\"]>
      <!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\">
      <html>
          <head>
              <title><@wp.currentPage param=\"title\" /></title>
          </head>
          <body>
              <h1><@wp.currentPage param=\"title\" /></h1>
              <a href=\"<@wp.url page=\"homepage\"/>\">Home</a><br>
              <div>
                  <h1>Bundle 1 Page Template</h1>
                  <@wp.show frame=0 />
              </div>
          </body>
      </html>

## Static Resources
The `resources` folder in the `platform` directory contains all static resources. Once the bundle is installed, they can be found inside the App Builder File Browser, with the same file structure.

See which [digital formats are supported on Entando](../../tutorials/compose/digital-assets-tutorial.md).
```
platform/ 
   ...
   resources/  
       css/  
         styles.css  
       js/  
         script.js  
       images/  
         favicon.ico  
         logo.png  
       page.html
```

### Accessing Static Resources

To use static files in a Widget or Page Template, use the FTL tag `<@wp.resourceURL />` with YOUR-BUNDLE-CODE. This code is a unique identifier that provides access to each bundle's resources. 

#### Determine YOUR-BUNDLE-CODE
1. Use the ent CLI to fetch YOUR-BUNDLE-ID to formulate the code:
```
ent ecr get-bundle-id repo=url
```
It should return an 8 digit string of numbers and letters, e.g. BUNDLE-ID=8785d979.

2. YOUR-BUNDLE-CODE is YOUR-BUNDLE-NAME appended with YOUR-BUNDLE-ID: 
    
    If YOUR-BUNDLE-NAME=first-bundle and YOUR-BUNDLE-ID=8785d979, then 
    YOUR-BUNDLE-CODE=first-bundle-8785d979

#### Samples
Here are example tags to access static resources in a typical bundle: 
```
  <img src="<@wp.resourceURL />bundles/YOUR-BUNDLE-CODE/images/logo.png">
  <link rel="stylesheet" href="<@wp.resourceURL />bundles/YOUR-BUNDLE-CODE/resources/css/styles.css">
  <link rel="shortcut icon" href="<@wp.resourceURL />bundles/YOUR-BUNDLE-CODE/images/favicon.ico" type="image/x-icon"/>
  <script type="application/javascript" src="<@wp.resourceURL />bundles/YOUR-BUNDLE-CODE/js/script.js"></script>
 ```  
## Widgets 

**widgets-descriptor.yaml**

    code: my-widget # Name of widget

    titles: # Widget's titles
      en: Example Widget # Title in English
      it: Widget d'esempio # Title in Italian

    group: free # The owner group of my-widget

    # Optional. The UI path, where the widget.ftl file will have the customUi content
    customUiPath: widget.ftl

    # Optional. The Custom UI
    customUi: >-
        <h1>Hi from my_widget- Custom Widget UI</h1>

    # Optional. The configUI
    configUi:
      customElement: my-widget-config # The name of the custom element used to render 
                                      # the configUi
      resources:
        - <bundleid>/static/js/main.js # The resources necessary for the custom element to 
                                       # render the configUi, i.e., the code  

**Note**: To configure micro frontends to access static assets, Entando provides a path with the following snippet: 
``` js
window.entando?.widgets['simple-mfe']?.basePath;
```
[See the instructions for setting the path in a React MFE](../../tutorials/create/mfe/react.md#configure-the-custom-element). 

For information on widgets that Entando provides out of the box, see [Default Widgets](../compose/preinstalled-widgets.md).