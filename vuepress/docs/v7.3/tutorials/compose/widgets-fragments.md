---
sidebarDepth:2
---
# Widgets and Fragments

This tutorial covers the basics of how to create an Entando widget and place it on a page. It also incorporates fragments, adding it to templates to make it easy to reuse.

## Create and Publish a Widget

For this example, you will use the App Builder to build and display a simple widget on a page. This is a quick introduction to one of the building blocks that make up composable applications.

For a more advanced example, check out how to [generate microservices and micro frontends (MFEs)](../create/ms/generate-microservices-and-micro-frontends), which includes how to build and deploy a micro frontend as a widget in Entando.

### 1. Create a widget
  
  1. From the left navigation menu of the App Builder, go to `Components` → `MFE & Widgets`
  2. To create a new widget, click `Add` 
  3. Enter the following values: 
        -   en Title: `Hello World`
        -   it Title: `Ciao Mondo`
        -   Code: `MyHelloWorld`
        -   Group: either `Administrators` or `Free Access`
        -   Icon: upload or select an icon of your choice
        -   Custom UI: `<h2>Hello World</h2>`
      > Note: the Custom UI Field is a FreeMarker template where you can enter raw HTML and include FreeMarker logic. This allows you to import JavaScript, CSS or basic HTML.
  4. Click `Save`
  
### 2. Place the widget on a page
    
1. Go to `Pages` →  `Management` from the left navigation menu. 
1. Create a [new page](page-management.md#create-a-page) or select an existing page to add the widget to.
1. Click the corresponding Actions icon and choose `Design` from the drop-down.
1. From the Widgets tab in the right pane, under the User list of widgets, drag and drop your new widget into an open frame on the page.
1. Click the `Preview` button at the top to display your page.
1. Confirm that your page displays "Hello World".
    
### 3. Publish the updated page

1. Navigate back to the Page Designer 
2. Below your application page, click `Publish`. Note that the Status icon for your page, the circle next to the page title, has changed from yellow to green to show its completed status.

## Create and Update a UX Fragment

A UX fragment is a way to reuse snippets of frontend code across multiple pages or widgets. Common elements such as basic HTML, JavaScript or FreeMarker logic can be stored as fragments and referenced via the `<@wp.fragment …` tag.

The [create and publish a widget](#create-and-publish-a-widget) in the previous steps is a prerequisite for the next part of the tutorial.

### 1. Create a new fragment

1. Go to `Components` → `UX Fragments`
2. At the bottom of the page, click `Add` 
3. Enter the following field values: 
    -   Code: `test`
    -   Gui Code: `<h2>Hello World</h2>`
4. Click `Save`

### 2. Identify the widget's page template

1. Now go to `Pages` →  `Management`
2. From the Actions drop-down menu for your desired page, select `Details`
3. Click the `Info` button to expand the page details
4. Note the Page Template used for your page, e.g., "single_frame_page"

### 3. Place the fragment in the template

1. Go to `Pages` →  `Templates` from the left nav
2. In the Actions drop-down menu for the noted Template, select `Edit`
3. In the `Template` text box, add the following line within the `<body></body>` tags:
``` html
<@wp.fragment code="test"/>
```
4. At the bottom of the page, click `Save`

### 4. View the page with the new fragment
    
1. Now go to `Pages` →  `Management`
2. From the Actions drop-down menu for your page, select `Preview`

> Note: The page will display the fragment `<h2> This is a fragment. </h2>` with the HTML tags. By default, HTML tags embedded within a fragment are ignored, or 'escaped', so it renders like a string, exactly as it appears. You need to reverse this when you call the fragment to render it properly.

### 5. Update the fragment

1. Back in the App Builder, go to `Pages` →  `Templates`
2. From the Actions drop-down menu for the Template, select `Edit`
3. Replace the inserted tag in Step 3 with this to render the html properly:
 ```html
 <@wp.fragment code="test" escapeXml=false/>
 ```
    
### 6. View the page with the updated fragment

1. Return to `Pages` →  `Management`
2. Click on the Actions icon and select `Preview` for your test page
3. Confirm the fragment is rendered correctly

## FreeMarker Basics in Entando

FreeMarker is a powerful templating language that provides flexibility in how pages are rendered. It allows you to include conditional logic, inject information from the backend, check for query parameters and route to different pages. For example:

- To check for a query parameter:
`<#if RequestParameters.myParam?exists > …`
- To check the current username:
`<#if (Session.currentUser.username != "guest") >`

Consider using [FreeMarker](https://freemarker.apache.org) for widgets that need to support dynamic behavior.
