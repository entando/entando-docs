# Bundle and components details

In order for the entando-component-manager to read the content of a
bundle and install components, a `descriptor.yaml` file is required at
the root of the bundle package.

Here is a generic bundle structure

    .
    ├ descriptor.yaml
    ├ resources/
    │ └ ...
    └ ... (folders reported in descriptor.yaml file)

## Bundle conventions

1.  The bundle descriptor file needs to be named `descriptor.yaml`
    otherwise the bundle will not be recognized.

2.  Static resources are not defined in the `descriptor.yaml` file as
    they are by default read from a `resources` folder. If you need to
    install static resources, please follow the following convention.

## Descriptor File

The descriptor file will aggregate all components inside and has the
following structure.

> **Warning**
>
> Remember the file needs to be named `descriptor.yaml`.

**Descriptor.yaml.**

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
        - pagemodels/my_page_model_descriptor.yaml
        - pagemodels/another_page_model_descriptor.yaml

      # To create Content Types you will need to add references to the descriptor file's
      contentTypes:
        - contenttypes/my_content_type_descriptor.yaml

      # To create Content Templates you will need to add references to the descriptor file's
      contentModels:
        - contentmodels/my_content_model_descriptor.yaml
        - contentmodels/another_content_model_descriptor.yaml

      # Labels on the system
      labels:
        - key: HELLO # This is the label identifier
          titles: # The titles on the label
            it: Mio Titolo # The title in Italian
            en: My Title # The title in English

## Plugin Descriptor

Here is an example of a plugin descriptor.

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

#### Kubernetes pods names

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

#### Permissions

The `permissions` property specifies a list of coupled clientId and roles that will be bound in Keycloak.

To find them you can open the Keyclock console and then navigate to _clients_ → _awesomeplugin-server_ → _Service Account Roles_.

Currently using a non-existing clientId or role will be ignored and the plugin deployment will succeed without errors.


::: tip
The more verbose CRD plugin descriptor format is deprecated as of Entando 6.3 but is documented [here](../../../v6.2/docs/ecr/ecr-bundle-details.md). 
::: 

## Widget Descriptor

Here is an example of a widget descriptor

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

## Fragment Descriptor

**Fragment descriptor.yaml.**

    code: my-fragment # The fragment identification

    # Optional. The fragment content
    guiCode: >-
      "<div>Here the content</div>"

    # Optional. The GuiCode Path, the fragment.ftl file will have the guiCde conent in it
    guiCodePath: fragment.ftl

## Page Template Descriptor

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
            y2: 0
          defaultWidget:
            code: my-widget # the code of the widget to apply when using the button "apply default widgets" in the page configuration UI

        # A simplified way to define a Frame
        - pos: 1
          description: Breadcrumb
          sketch: { x1: 0, y1: 1, x2: 11, y2: 1 }

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

## Content Type Descriptor

For more details on the properties, refer to the Content Type
documentation.

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

## Content Template Descriptor

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

## Static Files

In order to upload static files, you will need to create a folder called
`resources/`, all files inside this folder will be uploaded in the same
folder structure that is inside.

    resources/
    ├ css/
    │ └ styles.css
    ├ js/
    │ └ script.css
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

So if you need to use the file in a widget or page template, use this FTL
tag `<@wp.resourceURL />`:

    <img src="<@wp.resourceURL />yourbundleid/images/logo.png">
    <link rel="stylesheet" href="<@wp.resourceURL />yourbundleid/css/styles.css">
    <link rel="shortcut icon" href="<@wp.resourceURL />yourbundleid/images/favicon.ico" type="image/x-icon"/>
    <script type="application/javascript" src="<@wp.resourceURL />yourbundleid/js/script.js"></script>
