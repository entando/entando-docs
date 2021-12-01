---
sidebarDepth: 2
---

# Bundle and Component Descriptors 

## Overview
The Entando Component Manager reads the `descriptor.yaml` file from the root of the bundle package and uses it to install any components and resources included in the bundle. Here is the basic bundle structure:

    .
    ├ descriptor.yaml
    ├ resources/
    │ └ ...
    └ ... (folders reported in descriptor.yaml file)

### Bundle Conventions

1.  The bundle descriptor file needs to be named `descriptor.yaml` or the bundle will not be recognized.

2.  Static resources should be placed in a `resources` folder. They are not explicitly referenced in the `descriptor.yaml` file itself.

### Bundle Descriptor

The bundle descriptor file aggregates all included components and has the following structure:

> **Warning**
>
> Remember the file needs to be named `descriptor.yaml`.

**descriptor.yaml.**

    code: survey_bundle # The bundle ID
    description: This is the survey bundle # The description of the bundle

    components: # All components will be here

      # Optional. Use if the component requires a deployment
      plugins:
        - folder/you/want/my_plugin_descriptor.yaml
        - folder/you/want/another_plugin_descriptor.yaml

      # To create widgets you will need to add references to the descriptor file's
      widgets:
        - widgets/my_widget_descriptor.yaml
        - widgets/another_widget_descriptor.yaml

      # To create fragments, you will need to add references to the descriptor file's
      fragments:
        - fragments/my_fragment.yaml

      # To create Page Templates you will need to add references to the descriptor file's
      pageModels:
        - pageModels/my_page_model_descriptor.yaml
        - pageModels/another_page_model_descriptor.yaml

      # To create and publish pages you will need to add references to the descriptor file's
      pages:
        - page/my_page_descriptor.yaml
        - page/another_page_descriptor.yaml

      # To create a CMS Asset you will need to add a reference to the descriptor file and put on the same location the image or file you want to upload.
      assets:
        - assets/my-asset/my_asset_descriptor.yaml
        - assets/my-asset/my_image.jpg

      # To create Content Types you will need to add references to the descriptor file's
      contentTypes:
        - contentTypes/my_content_type_descriptor.yaml

      # To create Content Templates you will need to add references to the descriptor file's
      contentModels:
        - contentModels/my_content_model_descriptor.yaml
        - contentModels/another_content_model_descriptor.yaml

      # To create and publish Contents you will need to add references to the descriptor file's
      contents:
        - contents/my_content_descriptor.yaml
        - contents/another_content_descriptor.yaml
        
      # To create categories you will need to add references to the descriptor file's
      categories:
        - categories/my_categories.yaml
        
      # To create groups you will need to add references to the descriptor file's
      groups:
        - groups/my_groups.yaml
        
      # To create labels you will need to add references to the descriptor file's
      labels:
        - labels/my_labels.yaml
      
      # To enable labels you will need to add references to the descriptor file's
      languages:
        - languages/languages.yaml

## Plugin

Here is an example of a plugin descriptor:

**Plugin descriptor.yaml**

    image: "entando/my-image:1.0.0" # The docker image used to create the plugin
    deploymentBaseName: "myplugin" # The base name to assign to the pods that have to be created in Kubernetes
    dbms: "postgresql" # The DBMS the plugin will use
    roles: # The roles the plugin will expose in keycloak
      - "task-list"
      - "task-get"
      - "connection-list"
      - "connection-get"
      - "connection-create"
      - "connection-delete"
      - "connection-edit"
    healthCheckPath: "/actuator/health" # The health check path that kubernetes will use to check status of the plugin deployment
    ingressPath: "/myhostname.io/entando-plugin" # the ingress path to assign to the plugin deployment
    permissions: # a list of keycloak clientId / role to bind each to the other
      - clientId: realm-management
        role: manage-users
      - clientId: realm-management
        role: view-users
        
::: tip  
Entando uses the `healthCheckPath` to monitor the health of the plugin. A **non-Java based plugin** can be used in an Entando bundle as long as it receives the correct `healthCheckPath`. This path needs to be specified in the descriptor file and return an HTTP 200 or success status. This can be implemented by a Java service included with the Entando Blueprint in the SpringBoot application. You can also use a Node.js service as shown [here](https://github.com/entando-samples/ent-project-template-node-ms/blob/main/src/main/node/controller/health-controller.js). 
:::

### Kubernetes pod names

Each plugin is deployed onto Kubernetes using composite names. The first part is created reading the descriptor file, the second one is appended autonomously by Kubernetes.
This second part is 31 char long and each Kubernetes pod name length must be at most 63: longer name will result in the fail of the deployment.

**deploymentBaseName**

Initially, the first part of the pod name was generated concatenating and manipulating the `image` field value, however sometimes this approach could lead to a pod name longer than 63.
To solve this problem, another (optional) property is available: `deploymentBaseName`.

It accepts a string not longer than 32 and, if present, its value will be used as the first part for the pod's names, instead of the `image` one.

In the previous example of the descriptor a possible resulting pod name will be this one in case the `deploymentBaseName` property is not present:

`entando-my-image-1-0-0-server-deployment-6f86f459wj9k`

and this one if the `deploymentBaseName` property is present:

`myplugin-server-deployment-6f86f459wj9k`

Please note that if you are using the `deploymentBaseName` property and you want to install more versions of the same plugin at the same time, you need to specify different values for `deploymentBaseName`, maybe including the plugin version.

### Permissions

The `permissions` property specifies a list of coupled clientId and roles that will be bound in Keycloak.

To find them you can open the Keycloak console and then navigate to _clients_ → _awesomeplugin-server_ → _Service Account Roles_.

Currently using a non-existing clientId or role will be ignored and the plugin deployment will succeed without errors.


::: tip
The more verbose CRD plugin descriptor format is deprecated as of Entando 6.3 but is documented [here](../../../v6.2/docs/ecr/ecr-bundle-details.md). 
::: 

## Widget

Here is an example of a widget descriptor:

**Widget descriptor.yaml.**

    code: another_todomvc_widget # The Widget identification

    titles: # Widget's Titles
      en: TODO MVC Widget # Title in English
      it: TODO MVC Widget # Title in Italian

    group: free # The owner group of the widget

    # Optional. The UI Path, the widget.ftl file will have the customUi content
    customUiPath: widget.ftl

    # Optional. The Custom UI
    customUi: >-
        <h1>My custom widget UI</h1>

    # Optional. ConfigUI
    configUi:
      customElement: todomvc-config # The name of the custom-element used to render the configUI
      resources:
        - <bundleid>/static/js/main.js # The resources necessary to the custom element to render the configUI, like the code

## Fragment

**Fragment descriptor.yaml.**

    code: my_fragment # The unique id

    # Optional. The fragment content
    guiCode: >-
      "<div>Here the content</div>"

    # Optional. A path to a FreeMarker file containing the fragment content.
    guiCodePath: fragment.ftl

## Page Template

**Page Template descriptor.yaml.**

    code: todomvc_page_template # The Page Template identification
    description: TODO MVC basic page template # The Page Template description

    titles: # Page Template's Titles
      en: TODO MVC PageTemplate # Title in English
      it: TODO MVC PageTemplate # Title in Italian

    # The Page Template configuration
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
            code: my-widget # the code of the widget to apply when using the button "apply default widgets" in the page configuration UI

        # A simplified way to define a Frame
        - pos: 1
          description: Breadcrumb
          sketch: { x1: 0, y1: 0, x2: 11, y2: 1 }

    # Optional. Define the Page Template in a separate file or inside the descriptor file with `template`
    templatePath: page.ftl

    # Optional. Define the Page Template this way or in a separate file with `templatePath`
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

## Page
This descriptor enables a page to be created and published via a bundle. Status can be `published` or `draft`. The widgets section can be used to fully configure a page layout.

**Page descriptor.yaml.**

    code: dashboard
    parentCode: homepage
    titles:
      en: My dashboard
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

## CMS Asset

This descriptor contains the metadata required for uploading and updating a CMS Asset.

**Asset descriptor.yaml.**

    correlationCode: 'my-reference-code'
    type: image
    # This file should be placed on same folder as the descriptor.yaml
    name: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    description: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    group: free
    categories: []

## Content Template

**Content-template descriptor.yaml.**

    id: 8880003
    contentType: CNG
    description: Demo Content Template

    # Optional. Define the Content Template Shape in a separate file or inside descriptor file with `contentShape`
    contentShapePath:

    # Optional. Define the Content Template Shape this way or in a separate file with `contentShapePath`
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


## Content Type

For more details on the Content Type properties, refer to the [Content Type
documentation](../../tutorials/cms/content-types-tutorial.md).

**Content-type descriptor.yaml.**

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

## Content
This descriptor enables a content to be created and optionally published via a bundle, according to the `status` property. The content id is optional and can be auto generated or explicitly declared for linking from other components, like Content Widget.

**Content descriptor.yaml.**

    id: NWS650
    typeCode: NWS
    description: Dealing with a financial emergency
    mainGroup: free
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
            <p>For many Americans, financial concerns are their number-one stress point. Here are 6 ways to help reduce your money stress and get motivated to take control of your finances.</p>
      - code: img
        values:
          en:
            correlationCode: '651'
            name: bank_750xx684385064_d0.jpg
      - code: links
        elements:
          - code: links
            value:
              symbolicDestination: '#!U;http://www.mysite.com/!#'
              destType: 1
              urlDest: 'http://www.mysite.com/'
              pageDest: null
              contentDest: null
              resourceDest: null
            values:
              en: mio sito
          - code: links
            value:
              symbolicDestination: '#!U;http://www.mysite.com/!#'
              destType: 1
              urlDest: 'http://www.mysite.com/'
            values:
              en: mio sito 2
      - code: attaches
        elements:
          - code: attaches
            values:
              en:
                correlationCode: '205'
                name: Entando_Admin_Console_Overview_4.3.3_EN.pdf


      
## Categories
This descriptor contains a *list* of Categories.

**Category descriptor.yaml.**

    - code: new-category # Identifies the category
      parentCode: home # The parent category, home is the base category
      titles:
        it: "Una nuova categoria" # Category name in Italian
        en: "New category" # Category name in English

## Groups
This descriptor contains a *list* of Groups.

**Group descriptor.yaml.**

    - code: my_group # Identifies the group
      name: "My group" # The name of the group

## Labels
This descriptor contains a *list* of Labels.

**Label descriptor.yaml.**

    - key: MY-FIRST-LABEL # Identifies the label
      titles: # The titles on the label
        it: Mio Titolo # The title in Italian
        en: My Title # The title in English

## Languages
This descriptor contains a *list* of Languages to enable during the installation process.

**Language descriptor.yaml.**

    - code: en
      description: English
    - code: it
      description: Italian


## Static Resources

In order to upload static files, you will need to create a folder called
`resources`. All files inside this folder will be uploaded into Entando using the same
folder structure.

    resources/
    ├ css/
    │ └ styles.css
    ├ js/
    │ └ script.js
    ├ images/
    │ ├ favicon.ico
    │ └ logo.png
    └ page.html

On the structure mentioned above, the resulting files in the Entando
architecture will be:

    yourbundleid/
    ├ css/
    │ └ styles.css
    ├ js/
    │ └ script.js
    ├ images/
    │ ├ favicon.ico
    │ └ logo.png
    └ page.html

> **Important**
>
> `yourbundleid` is the `code` property inside `descriptor.yaml`

If you need to use one of these static files in a widget or page template, use this FTL
tag `<@wp.resourceURL />`:

    <img src="<@wp.resourceURL />yourbundleid/images/logo.png">
    <link rel="stylesheet" href="<@wp.resourceURL />yourbundleid/css/styles.css">
    <link rel="shortcut icon" href="<@wp.resourceURL />yourbundleid/images/favicon.ico" type="image/x-icon"/>
    <script type="application/javascript" src="<@wp.resourceURL />yourbundleid/js/script.js"></script>
