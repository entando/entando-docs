# Page and Content Protection

In the Entando Web Content Management System (WCMS) you have the ability to protect pages, content, and digital assets (images and files) by assigning groups that have the authorization to view those assets. If users without the correct authorization attempt to view those assets the platform will return an error. You can handle those errors as required for your application with dedicated error pages or by adding logic to your widgets or freemarker templates.

## Create a Group
Protected pages, content, and digital assets in the WCMS are protected by assigning groups to the resource that is being created. You can add new groups in the Entando App Builder as follows:

1. Go to `Users → Groups` from the left navigation
1. Select `Add`
1. Enter a `Name` and a `Code` for your group`

The groups you create here can be utilized to protect pages, content, images, and attachments in the CMS. Groups can be assigned to individual users in the `Users` section of the app builder or as part of a customization of your entando-core-app using APIs or custom code.

Pages and Content have settings for an `Owner Group` as well as a set of optional `Join Groups`. The `Owner Group` indicates the team within the `App Builder` who owns and can modify the page. Additional groups can be given access to the item via the `Join Group` setting. Note: the default App Builder configuration prevents the `Owner Group` from being changed after the item is created.

## Protect a Page
1. Select `Pages → Management` from the left navigation
1. Create a new page. Assign values as you see fit
1. To protect a page, assign the `Owner Group` to any group other than `Free Access`
1. (Optional) Add groups via `Join Group`
1. Finish configuring the page and select `Save`

At this point only users assigned to either the `Owner Group` or `Join Group` will have the ability to view that page. They can also manage the Page if they have the appropriate App Builder role.

If you would like to test this, navigate to the page URL in a private or incognito browser window and you will be redirected to the `Sign in to Proceed Further` page of your application.
The `Sign in to Proceed Further` page can be changed by going to `Pages → Settings` and picking the page you would like to render to users who need to sign in.

## Protect Content

1. Select `Content → Management` from the left navigation
1. Select the `Add Content` button and pick the content type to be created
1. To protect a content item, assign the `Owner Group` to any group other than `Free Access`
1. (Optional) Add groups via `Join Group`
1. Finish configuring the page and select `Save`

The content you are creating will only be available to users assigned to the `Owner Group` of `Join Group`. The default WCMS widgets will only return content authorized for a given user. See the [freemarker tags](#freemarker-tags-and-consuming-protected-resources) section below for information on creating custom widgets that utilize protected content.

::: tip Images and Attachments and Groups

When creating content the `Owner Group` of the content and the `Group` assigned to the digital asset must match. For example, when creating content with an `Owner Group` of `Administrators` the content creator will be unable to select images and attachments that are assigned a different group. The exception to this is assets with a group of `Free Access`. Assets with `Free Access` can be added to protected content.
:::

## Protect Images and Attachments

Images and attachments uploaded to the CMS can be protected by assigning groups.

1. Select `Content → Assets` from the left navigation
2. Upload your file(s)
3. In the provided modal window select the `Group` that you would like to own the asset
4. Only users with the assigned `Group` will have the ability to view the asset you've created
   - The asset will only be available to content with the same `Group` unless the attachment or image has been given a group of `Free Access`


## Freemarker Tags and Consuming Protected Resources

The WCMS provides a set of freemarker tags to assist in consuming protected assets in widgets and pages. The [if-authorized](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-ifauthorized) and [tag-nav](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-nav) tags can help in rendering page lists and fetching assets.

The [content](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-content) and [content-list](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-contentlist) tags also provide the ability to fetch and render protected content and protected lists of content.


Additionally, the  [REST APIs](../../docs/consume/entando-apis.md) allow clients to fetch protected pages and assets by group via query parameters. The content REST APIs also include the ability to filter by group and access level.
