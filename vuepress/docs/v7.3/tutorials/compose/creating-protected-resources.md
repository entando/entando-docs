# Page and Content Protection

On Entando's Web Content Management System (WCMS), you can protect pages, content, and other digital assets by assigning groups that have the authority to view those assets. If users without the correct authorization attempt to view them, the platform will return an error. You can manage these errors for your application with dedicated error pages or by adding logic to your widgets or FreeMarker templates.

For content with no restrictions, the default setting is `Free Access` for group ownership.

## Create a Group
Pages, content, and digital assets (images and files) are protected with group assignments. You can add new groups in the Entando App Builder as follows:

1. Go to `Users` → `Groups` from the left navigation
1. Select `Add`
1. Enter a `Name` and a `Code` for your group`
1. Go to `Users`→`Management` in the left navigation menu to create `Users` and assign them to the new group.

An `Owner Group` is assigned when pages, content, and assets are created. The `Owner Group` indicates the team who owns the item and can make modifications. Additional groups can be given viewing access to the item via the `Join Group` field. 

>Note: The `Owner Group` can not be changed after an item is created.

## Protect a Page
1. Select `Pages` → `Management` from the left navigation.
1. Create a new page. Assign values as needed.
1. Assign an `Owner Group`.  
1. (Optional) Add groups via `Join Group` to allow viewing access.
1. Complete configuring the page and select `Save`.

Now only users assigned to the `Owner Group` or `Join Group` will have the ability to view the page. They can manage and edit the Page if they have the appropriate role within the App Builder and are part of the `Owner Group`.

>To test this, navigate to the new page URL from a private or incognito browser window, and you will be redirected to the default `Sign in to Proceed Further` page of your application. 
The `Sign in to Proceed Further` page can be changed by going to `Pages` → `Settings` and picking the page to render for users who need to sign in.

## Protect Content

1. Select `Content` → `Management`
1. Click the `Add` button and choose the type to create from the drop-down list
1. Assign an `Owner Group`. 
1. (Optional) Add groups via `Join Group` to allow viewing access.

1. Finish configuring the page and select `Save`

Only users within the `Owner Group` can view and edit the content. Users assigned to groups listed under the `Join Group` field can view it. See the [FreeMarker tags](#freemarker-tags-and-consuming-protected-resources) section below for information on creating custom widgets that utilize protected content.

::: tip Access to Images and Attachments 

An item with the `Free Access` assignment offers viewing access to everyone. Items with `Free Access` can be added to protected pages.
:::

## Protect Images and Attachments

Images and attachments uploaded to the CMS can be protected by assigning groups.

1. Select `Content` → `Assets` from the left navigation
2. Click `Add` to select and upload your file(s)
3. For the `Group` field, select the owner group to grant viewing and editing privileges
4. Only users within the assigned `Group` will have the ability to view and edit the asset you've created
   - The asset is available to content such as pages with the same `Group` assignment unless it has been assigned `Free Access`.

## FreeMarker Tags and Consuming Protected Resources

Entando supports a set of FreeMarker tags to assist in accessing and using protected assets in widgets and pages. The [if-authorized](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-ifauthorized) and [tag-nav](../../docs/reference/freemarker-tags/freemarker-core-tags.md#tag-nav) tags can help in rendering page lists and fetching assets.

The [content](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-content) and [content-list](../../docs/reference/freemarker-tags/freemarker-JACMS-tags.md#tag-contentlist) tags also provide the ability to fetch and render protected content and lists of content.

Additionally, [REST APIs](../../docs/consume/entando-apis.md) allow clients to fetch protected pages and assets by group via query parameters. The content REST APIs also include the ability to filter by group and access level.
