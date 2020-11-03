# Creating Protected Content

In the Entando Web Content Management System (WCMS) you have the ability to protect content, pages, and digital assets (images and files) by assigning
groups that have the authorization to view those assets. If users without the correct authorization attempt to view those assets
the platform will return an error. You can handle those errors as required for your application with dedicated error pages or by
adding logic to your widgets or freemarker templates.

## Groups
Protected pages, content, and digital assets in the WCMS are protected by assigning groups to the resource that is being created. You can add new groups in the app builder by:

1. Select `Users -> Groups` from the left navigation
2. Select `Add`
3. Enter a `Name` and a `Code` for your group

The groups you create here can be utilized to protect pages, content, images, and attachments in the CMS. Groups can be assigned to individual users in the `Users` section of the app builder or as part of a customization of your entando-core-app using APIs or custom code.

## Protected pages

1. Create a new page. Assign values as you see fit. (see here if you need steps to create a page TODO).
2. Assign the Owner Group to any group other than `Free Access`
    - You can also add `Join Groups`. Any group selected as a `Join Group` will also have access to the page
4. Finish configuring the page and select `Save`

At this point only users assigned to that group will have the ability to view that page.

If you would like to test this navigate to the page URL in a private or incognito browser window and you will be redirected to the `Sign in to Proceed Further` page of your application.
The `Sign in to Proceed Further` page can be changed by going to `Pages --> Settings` and picking the page you would like to render to users who need to sign in.

## Protected Content

1. Select `Content -> Management` from the left navigation in the App Builder
2. Select the `Add Content` button and pick the content type that you want to create
3. Select the `Owner Group`  that should have access to the content

The content you are creating will only be available to users assigned to that group. The default WCMS widgets will only return content authorized for a given user. See the [freemarker tags](#freemarker-tags-and-consuming-protected-resources) section below for information on creating custom widgets that utilize protected content.

::: tip Images and Attachments and Groups

When creating content the owner group of the content and the group assigned to the digital asset must match. For example, when creating content with an owner group of `Administrators` the content creator will be unable to select images and attachments that are assigned a different group. The exception to this is assets with a group of `Free Access`. Assets with `Free Access` can be added to protected content.
:::

## Protected Images and Attachments

Images and attachments uploaded to the CMS can be protected by assigning groups.

1. Select `Content -> Assets` from the left navigation menu
2. Upload your file(s)
3. In the provided modal window select the `Group` that you would like to own the asset
4. Only users with the assigned group will have the ability to view the asset you've created
   - And the assets will only be available to content with the same group unless the attachment or image has been given a group of `Free Access`


## Freemarker Tags and Consuming Protected Resources

The WCMS provides a set of freemarker tags to assist in consuming protected assets in widgets and pages. The [if-authorized](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-ifauthorized) and [tag-nav](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-nav) tags can help in rendering page lists and fetching assets.

The [content](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-content) and [content-list](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-contentlist) tags also provide the ability to fetch and render protected content and protected lists of content.


Additionally, the  [REST APIs](../../docs/reference/entando-apis.md) allow clients to fetch protected pages and assets by group via query parameters. The content REST APIs also include the ability to filter by group and access level.
