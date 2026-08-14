# jACMS Aps Core Tag Library

- Version: 2.3

- Short Name: jacmsaps

- URI: /jacms-aps-core

## Tag `content`

### Tag Class `com.agiletec.plugins.jacms.aps.tags.ContentTag`

### Description

Displays the content given its ID.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td align="left"><p>contentId</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>ID of the content to display. It can accept &quot;expression language&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>modelId</p></td>

<td align="left"><p>false</p></td>
<td align="left"><p>Id of the model to use to display the content. The model ID can be either specified explicitly (the model must match the content to serve) or the type name (&quot;list&quot; or &quot;default&quot;); in the latter case the model specified in the configuration will be used. The model must adhere to the content being returned. &quot;Expression language&quot; is accepted.</p></td>
<tr class="even">
<td align="left"><p>publishExtraTitle</p></td>

<td align="left"><p>false</p></td>
<td align="left"><p>Toggles the insertion of the values of the titles in the Request Context. The title values are extracted from the attribute marked with the role &quot;jacms:title&quot;. Admitted values are (true, false), default 'false'.</p></td>
</tr>

<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the rendered content in a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>attributeValuesByRoleVar</p></td>

<td align="left"><p>false</p></td>

<td align="left"><p>Inserts the map of the attribute values indexed by the attribute role, in a variable of the page context with the name provided.</p></td>
</tr>
</tbody>
</table>

## Tag `contentInfo`
### Tag Class `com.agiletec.plugins.jacms.aps.tags.ContentInfoTag`

### Description

Return information of a specified content. The content can will be extracted by id from widget parameters or from request parameter. The tag extract any specific parameter (by &quot;param&quot; attribute) or entire ContentAuthorizationInfo object (setting &quot;var&quot; attribute and anything on &quot;param&quot; attribute).

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left"><p>contentId</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>ID of the content</p></td>
</tr>
<tr class="even">
<td align="left"><p>param</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Admitted values for &quot;param&quot; attribute are: 'contentId' (returns the code of content id), 'mainGroup' (returns the code of owner group), 'authToEdit' (returns true if the current user can edit the content, else false).</p></td>
</tr>

<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the required parameter (or the entire authorization info object) in a variable of the page context with the name provided.</p></td>
</tr>
</tbody>
</table>

## Tag `contentList`
### Tag Class `com.agiletec.plugins.jacms.aps.tags.ContentListTag`

### Description

Loads a list of contents IDs by applying the filters (if any). Only the IDs of the contents accessible in the portal can be loaded.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td align="left"><p>listName</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Name of the variable in the page context that holds the search result.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>contentType</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Sets the code of the content types to search. The name must match the configured one, respecting capital letters and spaces.</p></td>
</tr>
<tr class="even">
<td align="left"><p>category</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Identifier string of the category of the content to search.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>cacheable</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Toggles the system caching usage when retrieving the list. Admitted values (true, false), default &quot;true&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>titleVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the title on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>pageLinkVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the code of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>pageLinkDescriptionVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the description of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>userFilterOptionsVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Name of the variable in the page context that holds the user filter options</p></td>
</tr>
</tbody>
</table>


## Tag `contentListFilter`

### Tag Class `Tag class: com.agiletec.plugins.jacms.aps.tags.ContentListFilterTag`



### Description
&quot;ContentListTag&quot; sub-tag, it creates a filter to restrict the result of the content search. Please note that the filters will be applied in the same order they are declared and the result of the search will reflect this fact.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>

<tr class="even">
<td align="left"><p>key</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>String used to filter and sort the contents. This string can be: - the name of a content attribute compatible with the type declared in the &quot;contentListTag&quot; (it requires the &quot;attributeFilter&quot; attribute to be &quot;true&quot;) - the ID of one of the content metadata (the &quot;attributeFilter&quot; must be false) The allowed filter key that can be applied to content metadata are: - &quot;created&quot; allows sorting by date of creation of content - &quot;modified&quot; allows sorting by date of modification of content.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>attributeFilter</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Decides whether the filter must be applied to an attribute or to a content metadata, admitted values are (true, false). The &quot;key&quot; attribute will be checked for validity if the filter is going to be applied to a metadata</p></td>
</tr>
<tr class="even">
<td align="left"><p>value</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>The filtering value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>start</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Filters the contents by attribute type or by the field specified with the key (respect the following matches): Text field -→ start Text Text attribute type -→ start Text Numeric attribute type -→ start Numeric date attribute type -→ start data If the data filter is used: - today, oggi or odierna will select all the contents with a date greater or equal to the system date - using date with the pattern &quot;dd/MM/yyyy&quot; will select all the contents with a date greater or equal to the one inserted.</p></td>
</tr>
<tr class="even">
<td align="left"><p>end</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Similar the the &quot;start&quot; attribute but with the opposite behavior.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>order</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Specifies the sorting behavior of the IDs found: &quot;ASC&quot;ending or &quot;DESC&quot;ending. By default no ordering is performed.</p></td>
</tr>
<tr class="even">
<td align="left"><p>likeOption</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Toggles the 'like' functionality. Admitted values: (true, false). Default: false. The option is available for metadata and on Text Content attributes.</p></td>
</tr>
</tbody>
</table>


## Tag `contentListUserFilterOption`

### Tag Class `Tag class: com.agiletec.plugins.jacms.aps.tags.ContentListUserFilterOptionTag`=

### Description
&quot;ContentListTag&quot; sub-tag, it creates a custom user filter to restrict the result of the content search by front-end user.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>

<tr class="odd">
<td align="left"><p>key</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>The key of the filter. This string can be: - the name of a content attribute compatible with the type declared in the &quot;contentListTag&quot; (it requires the &quot;attributeFilter&quot; attribute to be &quot;true&quot;) - the ID of one of the content metadata (the &quot;attributeFilter&quot; must be false) The allowed filter key that can be applied to content metadata are: - &quot;fulltext&quot; allows filter by full-text search&lt;br /&gt; - &quot;category&quot; allows filter by a system category.</p></td>
</tr>
<tr class="even">
<td align="left"><p>attributeFilter</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Decides whether the filter must be applied to an attribute or to a content metadata, admitted values are (true, false). The &quot;key&quot; attribute will be checked for validity if the filter is going to be applied to a metadata.</p></td>
</tr>
</tbody>
</table>

## Tag `searcher`
### Tag Class `com.agiletec.plugins.jacms.aps.tags.SearcherTag`

### Description
Generates a list of content IDs, restricting them to the key word contained in the &quot;search&quot; parameter of the http request.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>

<tr class="odd">
<td align="left"><p>listName</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Name of the variable, stored in the page context, containing the list of content IDs.</p></td>
</tr>
</tbody>
</table>

## Tag `rowContentList`
## Tag Class `Tag class: com.agiletec.plugins.jacms.aps.tags.RowContentListTag`

### Description
Publish a list of contents.

### Attributes

<table>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Attribute</th>
<th align="left">Required</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>

<tr class="even">
<td align="left"><p>listName</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Name of the variable in the page context that holds the contents (list of properties of key &quot;contentId&quot; and &quot;modelId&quot;).</p></td>
</tr>
<tr class="odd">
<td align="left"><p>titleVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the title on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="even">
<td align="left"><p>pageLinkVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the code of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>pageLinkDescriptionVar</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Inserts the description of the page to link on a variable of the page context with the name provided.</p></td>
</tr>
</tbody>
</table>
