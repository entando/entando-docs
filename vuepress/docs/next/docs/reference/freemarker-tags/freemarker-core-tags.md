# Aps Core Tag Library

-   Version: 2.3

-   Short Name: wp

-   URI: /aps-core

## Tag `action`

### Description

Build the URL to call a jsp or a functionality of a servlet defined
within the system. This tag can use the ParameterTag sub-tag to add url
parameters.

### Example

`(<@wp.action path="/do/my.action" var="myaction" />)` or
`(<@wp.action path="/JSP/my.jsp" var="my.jsp"/>)`

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
<td align="left"><p>path</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The relative path of jsp or servlet to invoke, relative to the context of web-application</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the page-scoped variable where to place the URL.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.ActionURLTag`

## Tag `categories`

### Description

Return the list of the system categories on SelectItem objects.

### Example

`<@wp.categories var="systemCategories" titleStyle="prettyFull" root="$\{userFilterOptionVar.userFilterCategoryCode}" />`

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
<td align="left"><p>titleStyle</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The style of the single select item. Currently it can be 'default' (single title node), 'full' (title with all parents) or 'prettyFull' (title with all parents in form of '..'). The default when none is given is 'default'.</p></td>
</tr>
<tr class="even">
<td align="left"><p>fullTitleSeparator</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The separator beetwen the titles when 'titleStyle' is 'full' or 'prettyFull'.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the page-scoped variable where to place the list of categories.</p></td>
</tr>
<tr class="even">
<td align="left"><p>root</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The root of the categories to show. The default is the system root categories</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CategoriesTag`

## Tag `checkHeadInfoOuputter`

### Description

This sub-tag verifies the availability of the information to display.
This sub-tag can be used only in a page template, in conjunction with
'outputHeadInfo'.

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
<td align="left"><p>type</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Specifies the type of information to analyse.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CheckHeadInfoOutputterTag`

## Tag `cssURL`

### Description

Extension of the ResourceURL tag. It returns the URL of the css files.

### Example

`<@wp.cssURL />href="<@wp.cssURL />myportal.css" />`

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
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CssURLTag`

## Tag `currentPage`

### Description

Returns the requested information held by the current page bean.

### Example

`<@wp.currentPage param="code" var="currentViewCode" />`

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
<td align="left"><p>param</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>The wanted parameter: actually can be either &quot;title&quot;, &quot;owner&quot; (group), &quot;code&quot;, &quot;hasChild&quot; or &quot;childOf&quot; (with attribute &quot;targetPage&quot;). The default when none is given is &quot;title&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>langCode</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Code of the language to use for the page information being returned.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the page context variable where the information are placed. Please note that the in this case the special characters will not be escaped.</p></td>
</tr>
<tr class="even">
<td align="left"><p>targetPage</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Target page when &quot;param&quot; is &quot;childOf&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CurrentPageTag`

## Tag `currentWidget`

### Description

Returns information about the widget where the tag resides. To obtain
information about a widget placed in a frame other than the current, use
the "frame" attribute.

### Example

`<@wp.currentWidget param="config" configParam="name" var="configName" />`

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
<td align="left"><p>param</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>The requested parameter. It can assume one of the following values: - &quot;code&quot; returns the code of the associated widget type (empty if none associated) - &quot;title&quot; returns the name of the associated widget type (empty if none associated) - &quot;config&quot; returns the value of the configuration parameter declared in the &quot;configParam&quot; attribute. The default is &quot;title&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>configParam</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the configuration parameter request. This attribute is mandatory when the attribute &quot;param&quot; is set to &quot;config&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the page context variable where the requested information is pushed. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="even">
<td align="left"><p>frame</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Id of the frame hosting the widget with the desired information.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Toggles the escape of the special characters. Admitted value are (true, false), the default is &quot;true&quot;.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CurrentWidgetTag`

## Tag `fragment`

### Description

Print a gui fragment by the given code.

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
<td align="left"><p>code</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>The code of the fragment to return.</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Name of the page context variable where the requested information is pushed. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Toggles the escape of the special characters. Admitted value are (true, false), the default is &quot;true&quot;.</p></td>
</tr>
</tbody>
</table>

### Tag class

`org.entando.entando.aps.tags.GuiFragmentTag`

## Tag `freemarkerTemplateParameter`

### Description

Add a parameter into the Freemarker’s TemplateModel Map.

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
<td align="left"><p>var</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Name of the variable where the requested information is pushed.</p></td>
</tr>
<tr class="even">
<td align="left"><p>valueName</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Name of the variable of the page context where extract the information.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>removeOnEndTag</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Whether to remove the parameter on end of Tag. Possible entries (true, false). Default value: false.</p></td>
</tr>
</tbody>
</table>

### Tag class

`org.entando.entando.aps.tags.FreemarkerTemplateParameterTag`

## Tag `headInfo`

### Description

Declares the information to insert in the header of the HTML page. The
information can be passed as an attribute or, in an indirect manner,
through a variable of the page context. It is mandatory to specify the
type of the information.

### Example

`<@wp.headInfo type="JS" info="entando-misc-bootstrap/bootstrap.min.js" />`

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
<td align="left"><p>type</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Declaration of the information type. Currently only &quot;CSS&quot; is currently supported.</p></td>
</tr>
<tr class="even">
<td align="left"><p>info</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Information to declare. This is an alternative of the &quot;var&quot; attribute.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the variable holding the information to declare. This attribute is the alternative of the &quot;info&quot; one. This variable can be used for those types of information that cannot be held by an attribute.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.HeadInfoTag`

## Tag `i18n`

### Description

Return the string associated to the given key in the specified language.
This string is either returned (and rendered) or can be optionally
placed in a page context variable. This tag can use the ParameterTag
sub-tag to add label parameters.

### Example

`<@wp.i18n key="COPYRIGHT" escapeXml="false" />`

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
<td align="left"><p>yes</p></td>
<td align="left"><p>Key of the label to return.</p></td>
</tr>
<tr class="even">
<td align="left"><p>lang</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Code of the language requested for the lable.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the variable (page scope) where to store the wanted information. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="even">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Toggles the escape of the special characters of the returned label. Admitted values (true, false), the default is true.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.I18nTag`

## Tag `ifauthorized`

### Description

Toggles the visibility of the elements contained in its body, depending
on user permissions.

### Example

`<@wp.ifauthorized permission="enterBackend">`

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
<td align="left"><p>permission</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The code of the permission required.</p></td>
</tr>
<tr class="even">
<td align="left"><p>groupName</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The name of the group membership required.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The name of the (boolean) page context parameter where the result of the authorization check is placed.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.CheckPermissionTag`

## Tag `imgURL`

### Description

Extension of the ResourceURL tag. It returns the URL of the images to
display as static content outside the cms.

### Example

`<@wp.imgURL />entando-logo.png" alt="Entando - Access. Build. Connect." />`

### Attributes

### Tag class

`com.agiletec.aps.tags.ImgURLTag`

## Tag `info`

### Description

Returns the information of the desired system parameter.

### Example

`<@wp.info key="systemParam" paramName="applicationBaseURL" />`

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
<td align="left"><p>yes</p></td>
<td align="left"><p>Key of the desired system parameter, admitted values are: &quot;startLang&quot; returns the code of start language of web browsing &quot;defaultLang&quot; returns the code of default language &quot;currentLang&quot; returns the code of current language &quot;langs&quot; returns the list of the languages defined in the system &quot;systemParam&quot; returns the value of the system param specified in the &quot;paramName&quot; attribute.</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the variable where to store the retrieved information (page scope). In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>paramName</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the wanted system parameter; it is mandatory if the &quot;key&quot; attribute is &quot;systemParam&quot;, otherwise it is ignored.</p></td>
</tr>
<tr class="even">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Toggles the escape of the special characters in the information returned. Admitted values are (true,false), the former being the default value.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.InfoTag`

## Tag `internalServlet`

### Description

Tag for the "Internal Servlet" functionality. Publishes a function
served by an internal Servlet; the servlet is invoked from a path
specified in the attribute "actionPath" or by the widget parameter
sharing the same name. This tag can be used only in a widgets.

### Example

`<@wp.internalServlet actionPath="/ExtStr2/do/jpuserreg/UserReg/initRegistration" />`

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
<td align="left"><p>actionPath</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>The init action path.</p></td>
</tr>
<tr class="even">
<td align="left"><p>staticAction</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Whether to execute only the given action path. Possible entries (true, false). Default value: false.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.InternalServletTag`

## Tag `nav`

### Description

Generates through successive iterations the so called "navigation" list.
For every target/page being iterated (inserted in the page context) are
made available the page code, the title (in the current language) and
the link. Is it also possible to check whether the target page is empty
-that is, with no configured positions- or not.

### Example

`<@wp.nav var="page">`

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
<td align="left"><p>spec</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Declares the set of the pages to generate.</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Name of the page context variable where the data of target being iterated are made available.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.NavigatorTag`

## Tag `outputHeadInfo`

### Description

Iterates over various information in HTML header displaying them; this
tag works in conjunction with other specific sub-tags. Please note that
the body can contain only a sub-tag, or information, at once. This tag
must be used only in a page template. E.g (\<@wp.outputHeadInfo
type="CSS"\>)

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
<td align="left"><p>type</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Specifies the type of information to return, in accordance with the sub-tag to use.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.HeadInfoOutputterTag`

## Tag `pageInfo`

### Description

Returns the information of the specified page. This tag can use the
sub-tag "ParameterTag" to add url parameters if the info attribute is
set to 'url'.

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
<td align="left"><p>pageCode</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>The code of the page.</p></td>
</tr>
<tr class="even">
<td align="left"><p>info</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Code of required page parameter. Possible entries: &quot;code&quot; (default value) , &quot;title&quot;, &quot;owner&quot; (group), &quot;url&quot;, &quot;hasChild&quot; or &quot;childOf&quot; (with attribute &quot;targetPage&quot;).</p></td>
</tr>
<tr class="odd">
<td align="left"><p>langCode</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Code of the language to use for the returned information.</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Name used to reference the value pushed into the pageContext. In this case, the system will not escape the special characters in the value entered in pageContext.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>targetPage</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Target page when &quot;param&quot; is &quot;childOf&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Whether to escape HTML. Possible entries (true, false). Default value: true.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.PageInfoTag`

## Tag `pager`

### Description

List pager.

### Example

`<@wp.pager listName="result" objectName="groupContent" max="10" pagerIdFromFrame="true" advanced="true" offset="5">`

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
<td align="left"><p>max</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>The maximum value for each object group.</p></td>
</tr>
<tr class="even">
<td align="left"><p>listName</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Name of the list as found in the request.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>objectName</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>Name of the object currently iterated. The following methods are exposed:  getMax, getPrevItem, getNextItem, getCurrItem, getSize, getBegin, getEnd, getMaxItem, getPagerId.</p></td>
</tr>
<tr class="even">
<td align="left"><p>pagerId</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Sets the ID of the pager itself, it has to be used when two or more pagers exist in the same page. This attributes overrides &quot;pagerIdFromFrame&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>pagerIdFromFrame</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Sets the ID of the pager (mandatory when two or more pagers share the same page) based upon the frame where the tag is placed. Admitted values are (true, false), the latter being the default. Please note that the &quot;pagerId&quot; attribute takes precedence over this one.</p></td>
</tr>
<tr class="even">
<td align="left"><p>advanced</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Toggles the pager in advanced mode. Admitted values are (true, false). the advanced mode of the tag is used when the list to iterate over is huge.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>offset</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>This attribute is considered only when the pager is in advanced mode. This is the numeric value of the single step increment (or decrement) when iterating over the list</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.PagerTag`

## Tag `parameter`

## Tag `pager`

### Description

This tag can be used to parameterise other tags. The parameter value can
be added through the 'value' attribute or the body tag. When you declare
the param tag, the value can be defined in either a value attribute or
as text between the start and the ending of the tag.

### Example

`<@wp.parameter name="resourceName">`

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
<td align="left"><p>name</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>The name of the parameter.</p></td>
</tr>
<tr class="even">
<td align="left"><p>value</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>The value of the parameter.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.ParameterTag`

## Tag `printHeadInfo`

### Description

Returns the information to display. This sub-tag must be used only in a
page template, in conjunction with 'outputHeadInfo'.

### Attributes

### Tag class

`com.agiletec.aps.tags.HeadInfoPrinterTag`

## Tag `resourceURL`

### Description

Returns URL of the resources.

### Example

`<@wp.resourceURL />static/js/entando-misc-html5-essentials/html5shiv.js">`

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
<td align="left"><p>root</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Declares the resource root. If not otherwise specified, the value of SystemConstants.PAR_RESOURCES_ROOT_URL is used.</p></td>
</tr>
<tr class="even">
<td align="left"><p>folder</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Declares a specific directory for the desired resources. Unless specified, the value &quot;&quot; (empty string) is used in the generation of the URL.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.ResourceURLTag`

## Tag `show`

### Description

Defines the position of inclusion of a widget. This tag can be used only
in a page template.

### Example

`<@wp.show frame="0" />`

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
<td align="left"><p>frame</p></td>
<td align="left"><p>yes</p></td>
<td align="left"><p>The positional number of the frame, starting from 0.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.WidgetTag`

## Tag `url`

### Description

Generates the complete URL of a portal page. The URL returned is either
returned (and rendered) or placed in the given variable. To insert
parameters in the query string the sub-tag "ParameterTag" is provided.

### Example

`<@wp.url paramRepeat="true" >`

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
<td align="left"><p>page</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Code of the destination page. The default is the current page.</p></td>
</tr>
<tr class="even">
<td align="left"><p>lang</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Code of the language to use in the destination page.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Name of the page-scoped variable where to place the URL.</p></td>
</tr>
<tr class="even">
<td align="left"><p>paramRepeat</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Repeats in the URL all the parameters of the actual request.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>excludeParameters</p></td>
<td align="left"><p>no</p></td>
<td align="left"><p>Sets the list of parameter names (comma separated) to exclude from repeating. By default, this attribute excludes only the password parameter of the login form. Used only when paramRepeat=&quot;true&quot;.</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.URLTag`

## Tag `pageWithWidget`

### Description

Search and return the page (or the list of pages) with the given widget
type. When "filterParamName" and "filterParamValue" attributes are
present, the returned list will be filtered by a specific widget
configuration.

### Example

`<@wp.pageWithWidget widgetTypeCode="userprofile_editCurrentUser" var="userprofileEditingPageVar" listResult="false" />`

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
<td align="left"><p>var</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>Attribute_description:</p></td>
</tr>
<tr class="even">
<td align="left"><p>widgetTypeCode</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>The code of the widget to search</p></td>
</tr>
<tr class="odd">
<td align="left"><p>filterParamName</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Optional widget config param name</p></td>
</tr>
<tr class="even">
<td align="left"><p>filterParamValue</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Optional widget config param value</p></td>
</tr>
<tr class="odd">
<td align="left"><p>listResult</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Optional, dafault false. When true the result is a list of pages, when false the returned page is the first occurence</p></td>
</tr>
</tbody>
</table>

### Tag class

`com.agiletec.aps.tags.PageWithWidgetTag`

## Tag `currentUserProfileAttribute`

### Description

Current User Profile tag. Return a attribute value of the current user
profile.

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
<td align="left"><p>attributeName</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>the name of the attribute from which extract the value.</p></td>
</tr>
<tr class="even">
<td align="left"><p>attributeRoleName</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>the name of the attribute role from which extract the value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Name used to reference the value pushed into the pageContext.</p></td>
</tr>
<tr class="even">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
</tbody>
</table>

### Tag class

`org.entando.entando.aps.tags.CurrentUserProfileAttributeTag`

## Tag `userProfileAttribute`

### Description

User Profile tag. Return a attribute value from the profile givea an
username.

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
<td align="left"><p>username</p></td>
<td align="left"><p>true</p></td>
<td align="left"><p>the username</p></td>
</tr>
<tr class="even">
<td align="left"><p>attributeName</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>the name of the attribute from which extract the value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>attributeRoleName</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>the name of the attribute role from which extract the value.</p></td>
</tr>
<tr class="even">
<td align="left"><p>var</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Name used to reference the value pushed into the pageContext.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>escapeXml</p></td>
<td align="left"><p>false</p></td>
<td align="left"><p>Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
</tbody>
</table>

### Tag class

`org.entando.entando.aps.tags.UserProfileAttributeTag`

