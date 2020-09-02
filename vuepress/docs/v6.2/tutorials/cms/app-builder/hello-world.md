# Hello World  Widget in the App builder

This tutorial will take you through the basics of creating an Entando
widget and placing it on a page. This document will also review the
basics of fragments which are re-usable pieces of a user interface.

## Basic Widget Tutorial

For this example you will use the Entando App Builder to build and
assign your widget on a page. In a production system or a larger
development environment you would build and deploy widgets differently,
however this example provides a quick idea of the building blocks.

1. In the App Builder menu, go to: `Components → Micro frontends & Widgets`
    -   At bottom of the page, select ADD 
    
2. Now create a widget with the sample HTML code.  Enter into the following fields: 
    -   Code: MyHelloWorld
    -   en Title: Hello World
    -   it Title: Ciao Mondo
    -   Custom UI field: `<h2>Hello World</h2>`
    -   Select SAVE
    -   Note: the Custom UI Field is a freemarker template where you can put raw html and include freemarker logic. This allows you to import javascript, css, or any normal HTML.
    
3. Select a new Home Page
    -   Go To: `Pages → Settings`
    -   From the “Home Page” dropdown menu, select “Home / Service” and select SAVE
    
4. Place the widget on the page
    -   Go To: `Pages → Management`
    -   On the row that says "Service", on the far right side, select the Kebab button and select CONFIGURE
    -   From the right hand column, drag and drop the new widget into an open frame in the page
    -   From the top of the page, select PREVIEW 
    -   You should see "Hello World" on the page
    
5. Publish the updated page
    -   Go To: `Pages → Management`
    -   Note for the row showing the Services page, the Status is now yellow
    -   Select the Kebab button and select PUBLISH


## Simple Fragment tutorial

A fragment is a way to take a common piece of front end code and reuse
it across multiple pages or widgets. Common elements such as basic html,
javascript, or freemarker logic can be stored as fragments and
referenced via the `<@wp.fragment …` tag.

Starting from the simple widget tutorial above:
1. Create a new fragment:
    -   In the App Builder Go To: `Components → UX Fragments`
    -   At bottom of page, select ADD, and enter the following fields
    -   Code: test
    -   Gui Code: `<h2>Hello World</h2>`
    -   Select SAVE
        
2. Place the fragment in a template:
    -   Go To: `Pages → Page Templates`
    -   On the row for service, select EDIT
    -   In the `Template` text box, add  `<@wp.fragment code="test"/>` on a new line between the <body> and  </body> tags
    -   SAVE the page template
    
3. View the page with the new fragment:
    -   Go To: `Pages → Management`
    -   On the row that says "Service", on the far right side, select the Kebab button and select CONFIGURE
    -   From the top of the page, select PREVIEW 
    -   Note: You will see the fragment `<h2> This is a fragment. </h2>` which includes the HTML tags. By default html embedded via a fragment tag is escaped so you get it rendered exactly as you enter it. You’ll need to un-escape it to get it to render correctly.

4. Update the Fragment:
    -   Go To: `Pages → Page Templates`
    -   On the row for service, select EDIT
    -   Change the tag to: `<@wp.fragment code="test" escapeXml=false/>`
    
5. View the page with the updated fragment:
    -   Go To: `Pages → Management`
    -   On the row that says "Service", on the far right side, select the Kebab button and select CONFIGURE
    -   From the top of the page, select PREVIEW 
    -   See correctly rendered fragment


## Freemarker Basics in Entando

The freemarker templating language gives you a lot of flexibility and
power in how pages are rendered. You can include conditional logic,
inject information from the backend, check for query parameters and
route to different pages.

For example, to check for a query parameter you can use:
`<#if RequestParameters.myParam?exists > …`

To check the current username, use:
`<#if (Session.currentUser.username != "guest") >`

When you need dynamic behavior in your widgets consider using the power
of freemarker.

## Useful Links

<https://freemarker.apache.org>
