# Content Creation

This tutorial describes how to create, edit and publish content in an application with the Entando Web Content Management System from within the App Builder.

## Creating Content

1. Log into your App Builder.

2. From the left sidebar, go to `Content` → `Management`. All existing 
    content is displayed in a table.

![image](./img/content-management.png)

3. To create a new `Content` item, click the `Add` button on the right side of page. A drop-down menu will open from where you select the type. New types can be added to the list in the [Content Type](./content-types-tutorial.md) section.

![image](./img/content-add.png)

4. You will be asked to provide the following information.
    * `Info` 

         * `Content Type`: This is a pre-defined list of the `Types` available.

         * `Description`: The specific content's name or description. This field is required.

    *   `Groups`

         * `Owner Group`: Choose the available user group to manage the content from the drop-down list. Click the `+` button to select. This field is required and predefined in the [Entando Identity Management System](../../docs/consume/identity-management.md).

         * `View Only Groups`: Add groups to provide viewing access to the content.


   <!-- -   **Join Group.** Use the drop-down list to choose the
        available user group to share the content with and select +. The group
        selected will only be able to share and can not
        administrate this content. This field is not mandatory.-->

    *   `Categories`: Use `+` under `Join` to add to the applicable category tree for use in searching and sorting.  This field is not mandatory.

    *  `Content Attributes`: Define each required `Attributes` field and any optional fields for the `Content Type` of this item. Only the `Date` and `Title` are required.

    * `Content Info - History`: This displays all the saved iterations for the item where you can view details or revert to a previous version. 

![Add Content Information](./img/content-addinfo.png)

## Saving and Approving Content 
1. For new or edited content, determine which `Status` it belongs to:  
`Status`:
 * `Draft`: The content is in the development stage and not ready for approval or publication. The `Save` or `Save and Continue` buttons establish this status for all content.

 * `Ready`: The content is ready for review and has not yet been approved nor published.  Items with this status can be saved and approved later or published directly.

2. Saving options:

-   **Save**: The content will be saved in a draft version.

-   **Save and Continue**: The content will be saved as a draft version and the editable form will be displayed.

-   **Save and Approve**: The content will be saved, approved, and ready for use in an application.


## Finding Content

Using the `Advanced Filters` feature, you can search for Content by name, type, category, group and status. \
![Content Filters](./img/content-filters.png)

In the resulting table, contents are listed with these parameters: `Name`, `Author`
`Code`, `Created by`, `Last Edited`, `Type`, `Status`, `Visibility`, `Group`, `Creation` Date, `Last Modified`, and executable `Actions`. Many of the fields can be deleted from view by unchecking them in the `Additions to the Table of Results` drop-down menu.

![Content Table List View](./img/content-table-view.png)

## Content Actions

For all items in the `Content` table, the `Actions` drop-down menu provides these executable options:

* `Copy/Paste`: replicate the content

* `Draft Version`: edit the unpublished draft version

*  `Published Version`: edit or revert to a previous published version of the content

*  `Edit`: update the data fields in the content definition



![Content Actions](./img/content-actions.png)

<!-- All Content in the list can be saved to your local file system by clicking the
**Download** button and selecting either CSV or XLS format.

![image](./img/Content8.png) -->

## Publish, Unpublish, or Delete Content

To `Publish`, `Unpublish`, or `Delete` content, apply the buttons above the table for checked items. This will take you to a confirmation page where a summary page displays the usage of the item in your application. 

![Content Publish or Delete](./img/content-publish.png)

   