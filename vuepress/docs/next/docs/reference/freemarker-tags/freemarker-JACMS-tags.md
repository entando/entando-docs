# jACMS Aps Core Tag Library

## Version: 2.3

## Short Name: jacmsaps

## URI: /jacms-aps-core

<table>
<colgroup>
<col width="100%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left"><h3>content</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Displays the content given its ID.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: contentId</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: ID of the content to display. It can accept &quot;expression language&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: modelId</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Id of the model to use to display the content. The model ID can be either specified explicitly (the model must match the content to serve) or the type name (&quot;list&quot; or &quot;default&quot;); in the latter case the model specified in the configuration will be used. The model must adhere to the content being returned. &quot;Expression language&quot; is accepted.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: publishExtraTitle</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Toggles the insertion of the values of the titles in the Request Context. The title values are extracted from the attribute marked with the role &quot;jacms:title&quot;. Admitted values are (true, false), default 'false'.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Inserts the rendered content in a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: attributeValuesByRoleVar</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Inserts the map of the attribute values indexed by the attribute role, in a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.ContentTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>contentInfo</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Return information of a specified content. The content can will be extracted by id from widget parameters or from request parameter. The tag extract any specific parameter (by &quot;param&quot; attribute) or entire ContentAuthorizationInfo object (setting &quot;var&quot; attribute and anything on &quot;param&quot; attribute).</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: contentId</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: ID of the content</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: param</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Admitted values for &quot;param&quot; attribute are: 'contentId' (returns the code of content id), 'mainGroup' (returns the code of owner group), 'authToEdit' (returns true if the current user can edit the content, else false).</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Inserts the required parameter (or the entire authorization info object) in a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.ContentInfoTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>contentList</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Loads a list of contents IDs by applying the filters (if any). Only the IDs of the contents accessible in the portal can be loaded.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: listName</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the variable in the page context that holds the search result.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: contentType</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Sets the code of the content types to search. The name must match the configured one, respecting capital letters and spaces.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: category</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Identifier string of the category of the content to search.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: cacheable</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Toggles the system caching usage when retrieving the list. Admitted values (true, false), default &quot;true&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: titleVar</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Inserts the title on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: pageLinkVar</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Inserts the code of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: pageLinkDescriptionVar</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Inserts the description of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: userFilterOptionsVar</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the variable in the page context that holds the user filter options</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.ContentListTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>contentListFilter</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: &quot;ContentListTag&quot; sub-tag, it creates a filter to restrict the result of the content search. Please note that the filters will be applied in the same order they are declared and the result of the search will reflect this fact.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: key</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: String used to filter and sort the contents. This string can be: - the name of a content attribute compatible with the type declared in the &quot;contentListTag&quot; (it requires the &quot;attributeFilter&quot; attribute to be &quot;true&quot;) - the ID of one of the content metadata (the &quot;attributeFilter&quot; must be false) The allowed filter key that can be applied to content metadata are: - &quot;created&quot; allows sorting by date of creation of content - &quot;modified&quot; allows sorting by date of modification of content.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: attributeFilter</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Decides whether the filter must be applied to an attribute or to a content metadata, admitted values are (true, false). The &quot;key&quot; attribute will be checked for validity if the filter is going to be applied to a metadata</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: value</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The filtering value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: start</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Filters the contents by attribute type or by the field specified with the key (respect the following matches): Text field -→ start Text Text attribute type -→ start Text Numeric attribute type -→ start Numeric date attribute type -→ start data If the data filter is used: - today, oggi or odierna will select all the contents with a date greater or equal to the system date - using date with the pattern &quot;dd/MM/yyyy&quot; will select all the contents with a date greater or equal to the one inserted.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: end</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Similar the the &quot;start&quot; attribute but with the opposite behavior.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: order</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Specifies the sorting behavior of the IDs found: &quot;ASC&quot;ending or &quot;DESC&quot;ending. By default no ordering is performed.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: likeOption</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Toggles the 'like' functionality. Admitted values: (true, false). Default: false. The option is available for metadata and on Text Content attributes.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.ContentListFilterTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>contentListUserFilterOption</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: &quot;ContentListTag&quot; sub-tag, it creates a custom user filter to restrict the result of the content search by front-end user.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: key</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The key of the filter. This string can be: - the name of a content attribute compatible with the type declared in the &quot;contentListTag&quot; (it requires the &quot;attributeFilter&quot; attribute to be &quot;true&quot;) - the ID of one of the content metadata (the &quot;attributeFilter&quot; must be false) The allowed filter key that can be applied to content metadata are: - &quot;fulltext&quot; allows filter by full-text search&lt;br /&gt; - &quot;category&quot; allows filter by a system category.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: attributeFilter</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Decides whether the filter must be applied to an attribute or to a content metadata, admitted values are (true, false). The &quot;key&quot; attribute will be checked for validity if the filter is going to be applied to a metadata.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.ContentListUserFilterOptionTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>searcher</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Generates a list of content IDs, restricting them to the key word contained in the &quot;search&quot; parameter of the http request.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: listName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the variable, stored in the page context, containing the list of content IDs.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.plugins.jacms.aps.tags.SearcherTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>rowContentList</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Publish a list of contents.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: listName</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the variable in the page context that holds the contents (list of properties of key &quot;contentId&quot; and &quot;modelId&quot;).</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: titleVar</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Inserts the title on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: pageLinkVar</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Inserts the code of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: pageLinkDescriptionVar</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Inserts the description of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: org.entando.entando.plugins.jacms.aps.tags.RowContentListTag</h3></td>
</tr>
</tbody>
</table>


