---
sidebarDepth: 2
redirectFrom: /v6.3.2/docs/ecr/ecr-bundle-details.html
---

# Bundle and Component Descriptors 

## Overview
The Entando Component Manager reads the `descriptor.yaml` file from the root of the bundle package and uses it to install any components and resources included in the bundle. 

The different component types are shown below:

![component-types.png](./img/component-types.png)

Here is the basic bundle structure:

    .
    ├ descriptor.yaml
    ├ resources/
    │ └ ...
    └ ... (folders reported in descriptor.yaml file)

### Bundle Conventions

1.  The bundle descriptor file must be named `descriptor.yaml` or the bundle will not be recognized.

2.  Static resources should be placed in a `resources` folder. They are not explicitly referenced in the `descriptor.yaml` file itself.

### Bundle Descriptor

The bundle descriptor YAML file aggregates all included components and has the structure shown below. Note that the Page Template feature is pageModels and the Content Template is contentModels. 

> **Warning**
>
> Remember, the file must be named `descriptor.yaml`.

**descriptor.yaml.**

    code: survey_bundle # The bundle ID
    description: This is the survey bundle # The description of the bundle

    components: # All components are listed here.

      # Optional. Use if the component requires deployment
      plugins:
        - folder/you/want/my_plugin_descriptor.yaml
        - folder/you/want/another_plugin_descriptor.yaml

      # To create Widgets, add references to the descriptor files 
      widgets:
        - widgets/my_widget_descriptor.yaml
        - widgets/another_widget_descriptor.yaml

      # To create Fragments, add references to the descriptor files 
      fragments:
        - fragments/my_fragment.yaml

      # To create Page Templates, add references to the descriptor files 
      pageModels:
        - pageModels/my_page_model_descriptor.yaml
        - pageModels/another_page_model_descriptor.yaml

      # To create and publish Pages, add references to the descriptor files 
      pages:
        - page/my_page_descriptor.yaml
        - page/another_page_descriptor.yaml

      # To create a CMS Asset, add a reference to the descriptor file in the same location as the image or file you want to upload.
      assets:
        - assets/my-asset/my_asset_descriptor.yaml
        - assets/my-asset/my_image.jpg

      # To create Content Types, add references to the descriptor files
      contentTypes:
        - contentTypes/my_content_type_descriptor.yaml

      # To create Content Templates, add references to the descriptor files
      contentModels:
        - contentModels/my_content_model_descriptor.yaml
        - contentModels/another_content_model_descriptor.yaml

      # To create and publish Contents, add references to the descriptor files
      contents:
        - contents/my_content_descriptor.yaml
        - contents/another_content_descriptor.yaml
        
      # To create Categories, add references to the descriptor files
      categories:
        - categories/my_categories.yaml
        
      # To create Groups, add references to the descriptor files
      groups:
        - groups/my_groups.yaml
        
      # To create Labels, add references to the descriptor files
      labels:
        - labels/my_labels.yaml
      
      # To enable Languages, add references to the descriptor files
      languages:
        - languages/languages.yaml

## Plugin

Here is an example of a plugin descriptor:

**Plugin descriptor.yaml**

    image: "entando/my-image:1.0.0" # The Docker image used to create the plugin
    deploymentBaseName: "myplugin" # The base name to assign to the pods that have to be created in Kubernetes
    dbms: "postgresql" # The DBMS the plugin will use
    roles: # The roles the plugin will expose in Keycloak
      - "task-list"
      - "task-get"
      - "connection-list"
      - "connection-get"
      - "connection-create"
      - "connection-delete"
      - "connection-edit"
    healthCheckPath: "/actuator/health" # The health check path that Kubernetes will use to check the status of the plugin deployment
    ingressPath: "/myhostname.io/entando-plugin" # the ingress path to assign to the plugin deployment
    permissions: # a list of Keycloak clientIds / roles to bind to one another
      - clientId: realm-management
        role: manage-users
      - clientId: realm-management
        role: view-users
        
::: tip  
 Entando uses the `healthCheckPath` to monitor the health of the plugin. A plugin in an Entando Bundle can use any technology, as long as it provides a health check service and configures it via the `healthCheckPath`. This path needs to be specified in the descriptor file and return an HTTP 200 or success status. This can be implemented by a Java service included with the Entando Blueprint in the Spring Boot application. You can also [use a Node.js service as shown here](https://github.com/entando-samples/ent-project-template-node-ms/blob/main/src/main/node/controller/health-controller.js). 
:::

### Kubernetes Pod Names

Each plugin is deployed into Kubernetes using composite names. The first string is created by reading the descriptor file. The second string is appended autonomously by Kubernetes and 31 characters long. Each Kubernetes pod name length must not exceed 63 characters or the deployment will fail.

**DeploymentBaseName**

Previously, the first segment of the pod name was generated by concatenating and manipulating the `image` field value. However, this approach could result in a pod name longer than 63 characters.
To solve this problem, another (optional) property is available: `deploymentBaseName`, which accepts a string of up to 32 characters. If present, its value will be used as the first part of the pod name instead of the variant of the `image` value.

If the `deploymentBaseName` property is not present in the previous descriptor example, a possible pod name is `entando-my-image-1-0-0-server-deployment-6f86f459wj9k`. If the `deploymentBaseName` property is present, a possible pod name is `myplugin-server-deployment-6f86f459wj9k`.

If you are using the `deploymentBaseName` property and want to install more versions of the same plugin at the same time, you need to specify different values for `deploymentBaseName` (perhaps including the plugin version).

### Permissions

The `permissions` property specifies a list of coupled clientIds and roles that will be bound in Keycloak. To find them, open the Keycloak console and navigate to _clients_ → _awesomeplugin-server_ → _Service Account Roles_.
## Widget

Here is an example of a widget descriptor:

**Widget descriptor.yaml.**

    code: another_todomvc_widget # The widget identification

    titles: # Widget's Titles
      en: TODO MVC Widget # Title in English
      it: TODO MVC Widget # Title in Italian

    group: free # The owner group of the widget

    # Optional. The UI Path, where the widget.ftl file will have the customUi content
    customUiPath: widget.ftl

    # Optional. The Custom UI
    customUi: >-
        <h1>My custom widget UI</h1>

    # Optional. The ConfigUI
    configUi:
      customElement: todomvc-config # The name of the custom-element used to render the configUI
      resources:
        - <bundleid>/static/js/main.js # The resources necessary to the custom element to render the configUI, like the code

## Fragment

Here is an example of a fragment descriptor:

**Fragment descriptor.yaml.**

    code: my_fragment # The unique ID

    # Optional. The fragment content
    guiCode: >-
      "<div>Here the content</div>"

    # Optional. A path to a FreeMarker file containing the fragment content.
    guiCodePath: fragment.ftl

## Page Template

Here is an example of a Page Template descriptor:

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
            code: my-widget # the widget code to apply when using the button "apply default widgets" in the page configuration UI

        # A simplified way to define a Frame
        - pos: 1
          description: Breadcrumb
          sketch: { x1: 0, y1: 0, x2: 11, y2: 1 }

    # Optional. Define the Page Template in a separate file or inside the descriptor file with `template`
    templatePath: page.ftl

    # Optional. Define the Page Template as below or in a separate file with `templatePath`
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
This descriptor enables a page to be created and published via a bundle. Page status can be `published` or `draft`. The widget section can be used to fully configure a page layout.

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
    # This file should be placed in the same folder as the descriptor.yaml
    name: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    description: 113f4437cac3b3f3d4db7229f12287a4_d3.png
    group: free
    categories: []

## Content Template

Here is an example of a Content Template descriptor:

**Content-template descriptor.yaml.**

    id: 8880003
    contentType: CNG
    description: Demo Content Template

    # Optional. Define the Content Template Shape in a separate file or inside the descriptor file with `contentShape`
    contentShapePath:

    # Optional. Define the Content Template Shape as below or in a separate file with `contentShapePath`
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

For more details on Content Type properties, refer to the [Content Type documentation](../../tutorials/compose/content-types-tutorial.md).

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
This descriptor enables content to be created and optionally published via a bundle, according to the `status` property. The content ID is optional and enables linking from other components, like Content Widget. It can be autogenerated or explicitly declared.

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

This descriptor contains a list of Categories:

**Category descriptor.yaml.**

    - code: new-category # Identifies the Category
      parentCode: home # The parent Category; home is the base category
      titles:
        it: "Una nuova categoria" # Category name in Italian
        en: "New category" # Category name in English

## Groups
This descriptor contains a list of Groups:

**Group descriptor.yaml.**

    - code: my_group # Identifies the Group
      name: "My group" # The name of the Group

## Labels
This descriptor contains a list of Labels:

**Label descriptor.yaml.**

    - key: MY-FIRST-LABEL # Identifies the Label
      titles: # The titles on the Label
        it: Mio Titolo # The title in Italian
        en: My Title # The title in English

## Languages
This descriptor contains a list of Languages to enable during the installation process:

**Language descriptor.yaml.**

    - code: en
      description: English
    - code: it
      description: Italian


## Static Resources

In order to upload static files, you will need to create a folder called `resources`. All files inside this folder will be uploaded into Entando using the same folder structure.

    resources/
    ├ css/
    │ └ styles.css
    ├ js/
    │ └ script.js
    ├ images/
    │ ├ favicon.ico
    │ └ logo.png
    └ page.html

Using the structure above, the resultant files in the Entando architecture will be:

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
> The `code` property `yourbundleid` is inside `descriptor.yaml`.

To use static files in a widget or Page Template, use the FTL tag `<@wp.resourceURL />`:

    <img src="<@wp.resourceURL />yourbundleid/images/logo.png">
    <link rel="stylesheet" href="<@wp.resourceURL />yourbundleid/css/styles.css">
    <link rel="shortcut icon" href="<@wp.resourceURL />yourbundleid/images/favicon.ico" type="image/x-icon"/>
    <script type="application/javascript" src="<@wp.resourceURL />yourbundleid/js/script.js"></script>
