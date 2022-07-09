# Widgets and Fragments

This tutorial covers the basics of how to create an Entando widget and place it on a page. It also reviews the
basics of fragments, which are reusable components of a user interface.

## Create and Publish a Widget

For this example, you will use the Entando App Builder to build and display a simple widget on a page. You would create and deploy widgets differently in a production system or larger development environment, but this gives a quick introduction to the building blocks. 

For a more advanced example, check out how to [generate microservices and micro frontends](../create/ms/generate-microservices-and-micro-frontends), which includes how to build and deploy a micro frontend as a widget in Entando.

### Create a widget

1. In the left pane of the App Builder, go to `Components` → `MFE & Widgets`
2. At bottom of the page, click `Add` 
3. Create a widget with some sample HTML code.  Enter or select the following: 
    -   en Title: `Hello World`
    -   it Title: `Ciao Mondo`
    -   Code: `MyHelloWorld`
    -   Group: either `Administrators` or `Free Access`
    -   Icon: upload or select an icon of your choice
    -   Custom UI: `<h2>Hello World</h2>`
    > Note: the Custom UI Field is a FreeMarker template where you can enter raw HTML and include FreeMarker logic. This allows you to import JavaScript, CSS or basic HTML.
4. Click `Save`

### Place the widget on a page
    
1. From the left pane of the App Builder, go to `Pages` → `Settings`
2. Select a page, e.g. "Home / Service" from the “Home Page” dropdown menu
3. Click `Save`  
4. From the left pane of the App Builder, go to `Pages` →  `Management`
5. On the row with the folder named for your page (e.g. "Service"), click on the Actions icon and select "Design"
6. From the Widgets tab in the right pane, drag and drop your new widget into an open frame on the page
7. At the top of the middle pane, click `Preview` 
8. Confirm that your page displays "Hello World"
    
### Publish the updated page

1. Navigate back to "Design" for your page
2. At the bottom of the middle pane, click `Publish`. Note that the Status icon for your page, represented by a colored dot, has changed from yellow to green.


## Create and Update a UX Fragment

A UX fragment is a way to reuse snippets of frontend code across multiple pages or widgets. Common elements such as basic HTML, JavaScript or FreeMarker logic can be stored as fragments and referenced via the `<@wp.fragment …` tag.

To create and update a basic UX fragment per the steps below, first [create and publish a widget](#create-and-publish-a-widget) as the basis for this exercise.

### Create a new fragment

1. In the left pane of the App Builder, go to `Components` → `UX Fragments`
2. At bottom of the page, click `Add` 
3. Enter the following field information: 
    -   Code: `test`
    -   Gui Code: `<h2>Hello World</h2>`
4. Click `Save`

### Identify the widget's page template

1. From the left pane of the App Builder, go to `Pages` →  `Management`
2. On the row with the folder named for your page (e.g. "Service"), click on the Actions icon and select "Details"
3. Click on the `Info` button to expand the page information
4. Note the Page Template used for your page, e.g. "single_frame_page"
### Place the fragment in the template

1. From the left pane of the App Builder, go to `Pages` →  `Templates`
2. On the row with the page template used for your page (e.g. "single_frame_page"), click on the Actions icon and select "Edit"
3. In the `Template` text box, add  `<@wp.fragment code="test"/>` on a new line between the `<body>` and `</body>` tags
4. At the bottom of the page, click `Save`

### View the page with the new fragment
    
1. From the left pane of the App Builder, go to `Pages` →  `Management`
2. On the row with the folder named for your page (e.g. "Service"), click on the Actions icon and select "Design"
3. At the top of the middle pane, click `Preview` 
> Note: The page will display the fragment `<h2> This is a fragment. </h2>`, which includes the HTML tags. By default, HTML embedded via a fragment tag is escaped, so it renders exactly as you enter it. You’ll need to un-escape the fragment to render it correctly.

### Update the fragment

1. From the left pane of the App Builder, go to `Pages` →  `Templates`
2. On the row with the page template used for your page (e.g. "single_frame_page"), click on the Actions icon and select "Edit"
3. Change the tag to `<@wp.fragment code="test" escapeXml=false/>`
    
### View the page with the updated fragment

1. From the left pane of the App Builder, go to `Pages` →  `Management`
2. On the row with the folder named for your page (e.g. "Service"), click on the Actions icon and select "Design"
3. At the top of the middle pane, click `Preview` 
4. Confirm the fragment is rendered correctly

## FreeMarker Basics in Entando

FreeMarker is a powerful templating language that provides flexibility in how pages are rendered. It allows you to include conditional logic, inject information from the backend, check for query parameters and route to different pages. For example:

- To check for a query parameter, use:
`<#if RequestParameters.myParam?exists > …`
- To check the current username, use:
`<#if (Session.currentUser.username != "guest") >`

Consider using [FreeMarker](https://freemarker.apache.org) for widgets that need to support dynamic behavior.
