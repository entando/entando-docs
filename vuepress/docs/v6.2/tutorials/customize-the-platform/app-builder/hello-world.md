# Hello World for a Widget Using the App builder

This tutorial will take you through the basics of creating an Entando
widget and placing it on a page. This document will also review the
basics of fragments which are re-usable pieces of a user interface.

## Basic Widget Tutorial

For this example you will use the Entando App Builder to build and
assign your widget on a page. In a production system or a larger
development environment you would build and deploy widgets differently,
however this example provides a quick idea of the building blocks.

1.  In the App Builder menu, at the top, Go To: UX Patterns -→ Widgets

2.  Select NEW

3.  The Custom UI Field is a freemarker template where you can put raw
    html and include freemarker logic,

    -   It allows you to import javascript, css, or any normal HTML

    -   Example, put \<h2\>Hello World\</h2\> into your widget, give it
        a name and save it

4.  Go To: Page Designer -→ Page Settings

5.  In the Home Page dropdown select Home / Service and select SAVE

6.  Now place the widget on the page

7.  Go To: Page Designer -→ Page Tree

8.  On the row that says "Service", on the far right side, select the
    Kebab button and select CONFIGURE

9.  Find the widget created in step 5 on the right hand side

10. Drag and drop the widget onto the open frame of the page

11. Select PUBLISH at the bottom of the screen

12. Then select GO TO HOME PAGE in the upper right

13. You should see "Hello World" on the page

## Simple Fragment tutorial

A fragment is a way to take a common piece of front end code and reuse
it across multiple pages or widgets. Common elements such as basic html,
javascript, or freemarker logic can be stored as fragments and
referenced via the `<@wp.fragment …​` tag.

Starting from the simple widget tutorial above:

1.  In the app builder Go To: UX Patterns -→ Fragments

2.  Enter the code for the fragment as `test`

3.  In the `Gui Code` enter `<h2>This is a fragment</h2>`

4.  Next place the fragment on a page

5.  Go To: Ux Patterns -→ Page Models

6.  On the row for `service`, select EDIT

7.  Use the fragment tag to place the fragment on the page
    `<@wp.fragment code="test"/>`

8.  SAVE the page model

9.  Go To: homepage (assuming you’ve set the service page to the
    homepage)

10. Note that the fragment is printed including the HTML tags. By
    default html embedded via a fragment tag is escaped so you get it
    rendered exactly as you enter it. You’ll need to un-escape it to get
    it to render correctly.

11. Go back to your page model (UX Patterns -→ Page Models) select
    SERVICE and EDIT

12. Change the tag to: `<@wp.fragment code="test" escapeXml=false/>`

13. Go back to the homepage

14. See correctly rendered fragment

## Freemarker Basics in Entando

The freemarker templating language gives you a lot of flexibility and
power in how pages are rendered. You can include conditional logic,
inject information from the backend, check for query parameters and
route to different pages.

For example, to check for a query parameter you can use:
`<#if RequestParameters.myParam?exists > …​`

To check the current username, use:
`<#if (Session.currentUser.username != "guest") >`

When you need dynamic behavior in your widgets consider using the power
of freemarker.

## Useful Links

<https://freemarker.apache.org>

