# Publish a Content in your Application Page\_Tutorial

## Objective

The activity goal is to create a new Content Type, the related Content
Model and Content and publish it in a page of your application. The
expected outcome is the new Content is published in the “*Conference
Home*” Page of your application.

**WorkFlow**

**STEP 1**

We are going to create a new Content Type in theApp Builder
installation, by using the WEB CMS capabilities.

-   **Create the new “Conference “ Content Type**

    -   Go inside App Builder → CMS → Content Types and click on the ADD
        button.

    -   Fill out the fields with these values:

### Info

-   In the field **Code** insert the desired unique ID for the new
    Content Type: e.g. “CNF”

-   In the field **Name** insert the desired name for the new Content
    Type: e.g. “*Conference* ”

### Metadata

-   In the dropdown menu **Page for on-the-fly-publishing** select the
    Page you want to use to publish automatically Contents, that are not
    associated to a specific Page. If there are no Pages available go to
    the next phase

### Attributes

-   In the dropdown **Type** select the following Attributes and then
    click on the ADD button.

1.  Text (Title)

2.  Text (Subtitle)

3.  Hypertext (Abstract)

4.  Date (Date)

5.  Image (Picture)

You will access the page for the configuration of the new Content
Attribute

### Add Text Attribute (Title)

### Info

-   In the field **Code** insert the desired unique identifier for the
    new Content Attribute: e.g. *“Title*”

-   In the field **Name** insert the desired name for the new Content
    Attribute: e.g. *“Title”*

-   Toggle the checkboxes for whatever feature you want to activate
    among **Mandatory**, **Searchable** and **Can be used as a filter in
    lists**

-   In the Roles section, select the following role “j*acms:title – The
    main title of a Content*” from the dropdown

-   on the **CONTINUE** button and you will be brought back to previous
    page, for the configuration of the Content Type

### Add Text Attribute (Subtitle)

### Info

-   In the field **Code** insert the desired unique ID for the new
    Content Attribute: e.g. “*Subtitle*”

-   In the field **Name** insert the desired name for the new Content
    Attribute: e.g. “*Subtitle*”

-   Toggle the checkboxes for whatever feature you want to activate
    among **Mandatory**, **Searchable** and **Can be used as a filter in
    lists**

-   Click on the **CONTINUE** button and you will be brought back to
    previous page, for the configuration of a new Content Type

### Add Hypertext Attribute (Abstract)

### Info

-   In the field **Code** insert the desired unique ID for the new
    Content Attribute: e.g. “*Abstract*”

-   In the field **Name** insert the desired name for the new Content
    Attribute: e.g. A*bstract*”

-   Toggle the checkboxes for whatever feature you want to activate
    among **Mandatory**, **Searchable** and **Can be used as a filter in
    lists**

-   Click on the **CONTINUE** button and you will be brought back to
    previous page, for the configuration of a new Content Type

### Add Date Attribute (Date)

### Info

-   In the field **Code** insert the desired unique ID for the new
    Content Date: e.g. “*Date*”

-   In the field **Name** insert the desired name for the new Content
    Date: e.g. “*Date*”

-   Toggle the checkboxes for whatever feature you want to activate
    among **Mandatory**, **Searchable** and **Can be used as a filter in
    lists**

-   Click on the **CONTINUE** button and you will be brought back to
    previous page, for the configuration of a new Content Type

### Add Image Attribute (Picture)

### Info

-   In the field **Code** insert the desired unique ID for the new
    Content Image: e.g. “*Picture*”

-   In the field **Name** insert the desired name for the new Content
    Date: e.g. “*Picture*”

-   Toggle the checkboxes for whatever feature you want to activate
    among **Mandatory**, **Searchable**.

-   Click on the **CONTINUE** button and you will be brought back to
    previous page, for the configuration of a new Content Type

**Save**

-   Click on the **SAVE** button to end the process and save the Content
    Type on the database. You will be brought back to Content Type list
    page and you can see the “*Conference* ” in the list

**STEP 2**

We are going to create a new Content Model for the Content Type just
created in your App Builder application.

-   **Create the new “*Conference*“ Content Model for the Content Type
    just created in step 1**

    -   Go inside App Builder → CMS → Content Models and click on the
        ADD button

Fill the fields with these values:

-   In the dropdown Type select the “*Conference* ” Content Type, just
    created in step 1. Then click on the SET button. Keep in mind that
    in order for the content assist to work properly user must always
    select the Content Type

-   In the field **Code** insert the desired unique ID for the new
    Content Model: e.g. “*11112*”

-   In the field **Name** insert the desired name for the new Content
    Model: e.g. “*Conference”.*

In the text-area **Model** add the markup for the new Content Model to
get the model shown in the next picture as a final result. If you have
previously set the Content Type, press **ALT+TAB button** to activate
the content assist that will help you while writing the code. You can
enter the specific CSS code directly here, under the Velocity code.

As example, you could copy and paste the content model of the Appendix A
of the present document. If you have not already entered the specific
CSS code in the field **Model**, you can create a CSS file for the new
Content Model in Configuration→ File browser→static→css. Inside the css
folder, create your folder “contentmoldes” where you create your custom
.css file.

Finally add the path and the name of the custom CSS file in the field
**Style Sheet** (e.g. *contentmodels/CNF\_Conference.css*). Please pay
attention to the folder location of the custom CSS. See Appendix B.

Be sure that in your page model temaple, before to close the header, the
following inclusion:

    <@c.import url="/WEB-INF/aps/jsp/models/inc/models-common-utils.jsp" />

### Save

-   Click on the **SAVE** button to end the process and save the new
    Content Model on the database. You will be brought back to the
    Content Model list page and you can see the “Conference” in the
    list.

**STEP 3**

We are going to create a new Content in your App Builder application.

-   **Create a new Content based on “*Conference*” Content Type just
    created in step 1**

    -   Go inside App Builder → CMS → Contents. You will access the page
        with the list of available Contents. Click on the ADD button and
        you will see a list of available Content Types.

    -   Select the “*Conference*” Content Type just created in step 1.
        You will access the page for the creation of the new Content

Fill the fields with these values:

**Groups**

-   In the field **Owner Group:** simply set “*Free Access*” to let your
    content be available for every user created on Entando platform

-   In the field **Join Group:** select “*Free Access*”

**Content attributes**

-   Below you will find the list of Attributes defined in the
    “*Conference*” Content Type (Title, Subtitle, Abstract)

1. In the field **Title** insert simple text: e.g. “*Conference News*”

2. In the field **Subtitle** insert simple text: e.g. “*Entando Training
and Development*”

3. In the field **Abstract** insert simple text: “*Entando Training and
Development will start soon*”

**Save**

-   Click on the SAVE AND APPROVE button to end the process and save the
    new Content on the database. You will be brought back to Content
    list page and you can see the “*Conference News*” Content in the
    list

**STEP 4**

We are going to publish the Content just created in the App Builder
application.

-   **Publish the “*Conference News”* Content just created in step 3 in
    the “*Conference* *Home*” Page of the App Builder application.**

    -   Go inside Page Designer → Page Tree. Now select the
        “*Conference* *Home*” Page and click on the **Configure** button
        in the **Actions** kebab menu. You will access the Page
        configuration section

    -   From the right-side bar select the “*Contents - Publish a
        content*” CMS Widget and drag & drop it on the Page in the
        position that contains the “*Frame E*” frame. After dropping it
        you will access to the Widget configuration page

    -   In the Search field, you can type the name of the content
        “*Conference News*” ”then hit the plus **(+)** button. Remember
        that, in order to publish the content on your page, it must be
        saved and approved.

    -   Choose the “Conference” from the Content Model drop-down list

    -   Press the blue **Save** button.

    -   Click on the PUBLISH and then the PREVIEW button to see the
        modified “*Conference Home*”Page. You will see:

![image](images/extracted-media/media/Image1.png)

**Appendix A**

**Sample of a Content Model**

    <div class="date-training"><time class="label"
    datetime="$content.Date.shortDate">$content.Date.getFormattedDate("EEEE dd MMMM
    yyyy")</time></div>
    <div class="lightbar"></div>
    <div class="col-md-6">
    <p class="title-training">$content.Title.text</p>
    <p class="subtitle-training">$content.Subtitle.text</p>
    <p class="abstract-training">$content.Abstract.text</p>
    </div>
    <div figure class="image-training">
    <img src="$content.Picture.getImagePath("0")"/>
    </div>
    <div class="lightbar"></div>

**Appendix B**

**Sample of a file .css**

    Path: contentmodels/Conference.css

    .date-training{
    font-family: Arial, Helvetica, sans-serif;
    font-size:12px;
    line-height:22px;
    text-align: left;
    }

    .title-training{
    font-family: Arial, Helvetica, sans-serif;
    font-size:28px;
    width:300px;
    line-height:30px;
    text-align: left;
    }

    .subtitle-training{
    font-family: "Times New Roman", Times, serif;
    font-size:16px;
    }

    .abstract-training{
    font-family: "Times New Roman", Times, serif;
    font-size:16px;
    line-height:22px;
    }

    .lightbar{
    border: 1px solid #337ab7;
    width: 620px;
    margin:18px 0 0 0;
    }

**Appendix C**

**Sample of a Page Model**

**Json Config**

    {
    "frames": [
    {
    "pos": 0,
    "descr": "Frame A",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 0,
    "y1": 0,
    "x1": 0,
    "x2": 11
    }
    },
    {
    "pos": 1,
    "descr": "Frame B",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch":{
    "y2": 1,
    "y1": 1,
    "x1": 0,
    "x2": 11
    }
    },

    {
    "pos": 2,
    "descr": "Frame C",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 2,
    "y1": 2,
    "x1": 0,
    "x2": 11
    }
    },

    {
    "pos": 3,
    "descr": "Frame D",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 6,
    "y1": 3,
    "x1": 0,
    "x2": 5
    }

    },

    {
    "pos": 4,
    "descr": "Frame E",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 6,
    "y1": 3,
    "x1": 6,
    "x2": 11
    }
    },

    {

    "pos": 5,
    "descr": "Frame F",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 10,
    "y1": 7,
    "x1": 0,
    "x2": 11
    }
    },

    {
    "pos": 6,
    "descr": "Frame G",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 14,
    "y1": 11,
    "x1": 0,
    "x2": 5
    }
    },

    {
    "pos": 7,
    "descr": "Frame H",
    "mainFrame": false,
    "defaultWidget": null,
    "sketch": {
    "y2": 14,
    "y1": 11,
    "x1": 6,
    "x2": 11
    }

    }
    ]
    }

**Template**

    <#assign wp=JspTaglibs["/aps-core"]>
    <#assign c=JspTaglibs["http://java.sun.com/jsp/jstl/core"]>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8" />
    <title>
    <@wp.currentPage param="title" /> - <@wp.i18n key="PORTAL_TITLE" />
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <@c.import url="/WEB-INF/aps/jsp/models/inc/models-common-utils.jsp" />
    </head>

    <body class="training-inspinia">
    <div class="pace pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
    <div class="pace-progress-inner"></div>

    </div>
    <div class="pace-activity"></div>
    </div>

    <div class="container-training" style="margin:10px;">

    <div class="row ">
    <div class="col-md-12">
    <@wp.show frame=0 />
    </div>
    </div>

    <div class="row white-bg">
    <div class="col-md-12">
    <@wp.show frame=1 />
    </div>
    </div>

    <div class="row white-bg">
    <div class="col-md-12">
    <@wp.show frame=2 />
    </div>
    </div>

    <div class="row white-bg">
    <div class="col-md-6">
    <@wp.show frame=3 />
    </div>

    <div class="row white-bg">
    <div class="col-md-6">
    <@wp.show frame=4 />
    </div>
    </div>

    <div class="row white-bg">
    <div class="col-md-12">
    <@wp.show frame=5 />
    </div>

    <div class="row white-bg">
    <div class="col-md-6">
    <@wp.show frame=6 />
    </div>

    <div class="col-md-6">
    <@wp.show frame=7 />
    </div>

    </div>
    </div>
    </body>
    </html>
