# Aps Core Tag Library

## Version: 2.3

## Short Name: wp

## URI: /aps-core

<table>
<colgroup>
<col width="100%" />
</colgroup>
<tbody>
<tr class="odd">
<td align="left"><h3>action</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Build the URL to call a jsp or a functionality of a servlet defined within the system. This tag can use the ParameterTag sub-tag to add url parameters.</p>
<p>E.g. (&lt;@wp.action path=&quot;/do/my.action&quot; var=&quot;myaction&quot; /&gt;) or (&lt;@wp.action path=&quot;/JSP/my.jsp&quot; var=&quot;my.jsp&quot;/&gt;).</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: path</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The relative path of jsp or servlet to invoke, relative to the context of web-application.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the page-scoped variable where to place the URL.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.ActionURLTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>categories</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Return the list of the system categories on SelectItem objects.</p>
<p>E.g. (&lt;@wp.categories var=&quot;systemCategories&quot; titleStyle=&quot;prettyFull&quot; root=&quot;$\{userFilterOptionVar.userFilterCategoryCode}&quot; /&gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: titleStyle</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The style of the single select item. Currently it can be 'default' (single title node), 'full' (title with all parents) or 'prettyFull' (title with all parents in form of '..'). The default when none is given is 'default'.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: fullTitleSeparator</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: the separator beetwen the titles when 'titleStyle' is 'full' or 'prettyFull'.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the page-scoped variable where to place the list of categories.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: root</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The root of the categories to show. The default is the system root categories</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CategoriesTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>checkHeadInfoOuputter</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: This sub-tag verifies the availability of the information to display. This sub-tag can be used only in a page model, in conjunction with 'outputHeadInfo'.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: type</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Specifies the type of information to analyse.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CheckHeadInfoOutputterTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>cssURL</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Extension of the ResourceURL tag. It returns the URL of the css files.</p>
<p>E.g. (&lt;@wp.cssURL /&gt;href=&quot;&lt;@wp.cssURL /&gt;myportal.css&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CssURLTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>currentPage</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Returns the requested information held by the current page bean.</p>
<p>E.g. (&lt;@wp.currentPage param=&quot;code&quot; var=&quot;currentViewCode&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: param</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The wanted parameter: actually can be either &quot;title&quot;, &quot;owner&quot; (group), &quot;code&quot;, &quot;hasChild&quot; or &quot;childOf&quot; (with attribute &quot;targetPage&quot;). The default when none is given is &quot;title&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: langCode</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Code of the language to use for the page information being returned.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the page context variable where the information is placed. Please note that in this case the special characters will not be escaped.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: targetPage</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Target page when &quot;param&quot; is &quot;childOf&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CurrentPageTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>currentWidget</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Returns information about the widget where the tag resides. To obtain information about a widget placed in a frame other than the current, use the &quot;frame&quot; attribute.</p>
<p>E.g. (&lt;@wp.currentWidget param=&quot;config&quot; configParam=&quot;name&quot; var=&quot;configName&quot; /&gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: param</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The requested parameter. It can assume one of the following values: - &quot;code&quot; returns the code of the associated widget type (empty if none associated) - &quot;title&quot; returns the name of the associated widget type (empty if none associated) - &quot;config&quot; returns the value of the configuration parameter declared in the &quot;configParam&quot; attribute. The default is &quot;title&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: configParam</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the configuration parameter request. This attribute is mandatory when the attribute &quot;param&quot; is set to &quot;config&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the page context variable where the requested information is pushed. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: frame</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Id of the frame hosting the widget with the desired information.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Toggles the escape of the special characters. Admitted value are (true, false), the default is &quot;true&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CurrentWidgetTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>fragment</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Print a gui fragment by the given code.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: code</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The code of the fragment to return.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the page context variable where the requested information is pushed. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Toggles the escape of the special characters. Admitted value are (true, false), the default is &quot;true&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: org.entando.entando.aps.tags.GuiFragmentTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>freemarkerTemplateParameter</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Add a parameter into the Freemarker’s TemplateModel Map.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the variable where the requested information is pushed.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: valueName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the variable of the page context where the information is extracted.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: removeOnEndTag</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Whether to remove the parameter on end of Tag. Possible entries (true, false). Default value: false.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: org.entando.entando.aps.tags.FreemarkerTemplateParameterTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>headInfo</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Declares the information to insert in the header of the HTML page. The information can be passed as an attribute or, in an indirect manner, through a variable of the page context. It is mandatory to specify the type of the information.</p>
<p>E.g. (&lt;@wp.headInfo type=&quot;JS&quot; info=&quot;entando-misc-bootstrap/bootstrap.min.js&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: type</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Declaration of the information type. Currently only &quot;CSS&quot; is currently supported.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: info</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Information to declare. This is an alternative of the &quot;var&quot; attribute.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the variable holding the information to declare. This attribute is the alternative of the &quot;info&quot; one. This variable can be used for those types of information that cannot be held by an attribute.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.HeadInfoTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>i18n</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Return the string associated to the given key in the specified language. This string is either returned (and rendered) or can be optionally placed in a page context variable. This tag can use the ParameterTag sub-tag to add label parameters.</p>
<p>E.g. (&lt;@wp.i18n key=&quot;COPYRIGHT&quot; escapeXml=&quot;false&quot; /&gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: key</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Key of the label to return.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: lang</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Code of the language requested for the lable.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the variable (page scope) where to store the wanted information. In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Toggles the escape of the special characters of the returned label. Admitted values (true, false), the default is true.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.I18nTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>ifauthorized</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Toggles the visibility of the elements contained in its body, depending on user permissions.</p>
<p>E.g. (&lt;@wp.ifauthorized permission=&quot;enterBackend&quot;&gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: permission</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The code of the permission required.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: groupName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The name of the group membership required.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The name of the (boolean) page context parameter where the result of the authorization check is placed.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.CheckPermissionTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>imgURL</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Extension of the ResourceURL tag. It returns the URL of the images to display as static content outside the cms.</p>
<p>E.g. (&lt;@wp.imgURL /&gt;entando-logo.png&quot; alt=&quot;Entando - Access. Build. Connect.&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.ImgURLTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>info</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Returns the information of the desired system parameter.</p>
<p>E.g. (&lt;@wp.info key=&quot;systemParam&quot; paramName=&quot;applicationBaseURL&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: key</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Key of the desired system parameter, admitted values are: &quot;startLang&quot; returns the code of start language of web browsing &quot;defaultLang&quot; returns the code of default language &quot;currentLang&quot; returns the code of current language &quot;langs&quot; returns the list of the languages defined in the system &quot;systemParam&quot; returns the value of the system param specified in the &quot;paramName&quot; attribute.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the variable where to store the retrieved information (page scope). In this case the special characters will not be escaped.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: paramName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the wanted system parameter; it is mandatory if the &quot;key&quot; attribute is &quot;systemParam&quot;, otherwise it is ignored.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Toggles the escape of the special characters in the information returned. Admitted values are (true,false), the former being the default value.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.InfoTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>internalServlet</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Tag for the &quot;Internal Servlet&quot; functionality. Publishes a function served by an internal Servlet; the servlet is invoked from a path specified in the attribute &quot;actionPath&quot; or by the widget parameter sharing the same name. This tag can be used only in widgets.</p>
<p>E.g. (&lt;@wp.internalServlet actionPath=&quot;/ExtStr2/do/jpuserreg/UserReg/initRegistration&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: actionPath</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The init action path.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: staticAction</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Whether to execute only the given action path or not. Possible entries (true, false). Default value: false.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.InternalServletTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>nav</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Generates through successive iterations the &quot;navigation&quot; list. For every target/page being iterated (inserted in the page context) the page code, the title (in the current language) and the link are made available. It is also possible to check whether the target page is empty or not i.e., with no configured positions.</p>
<p>E.g. (&lt;@wp.nav var=&quot;page&quot;&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: spec</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Declares the set of pages to generate.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the page context variable where the data of target being iterated is made available.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.NavigatorTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>outputHeadInfo</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Iterates over various information in HTML header displaying them; this tag works in conjunction with other specific sub-tags. Please note that the body can contain only a sub-tag, or information, at once. This tag must be used only in a page model. E.g (&lt;@wp.outputHeadInfo type=&quot;CSS&quot;&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: type</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Specifies the type of information to return, in accordance with the sub-tag to use.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.HeadInfoOutputterTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>pageInfo</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Returns the information of the specified page. This tag can use the sub-tag &quot;ParameterTag&quot; to add url parameters if the info attribute is set to 'url'.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: pageCode</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The code of the page.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: info</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Code of required page parameter. Possible entries: &quot;code&quot; (default value) , &quot;title&quot;, &quot;owner&quot; (group), &quot;url&quot;, &quot;hasChild&quot; or &quot;childOf&quot; (with attribute &quot;targetPage&quot;).</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: langCode</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Code of the language to use for the returned information.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name used to reference the value pushed into the pageContext. In this case, the system will not escape the special characters in the value entered in pageContext.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: targetPage</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Target page when &quot;param&quot; is &quot;childOf&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Whether to escape HTML. Possible entries (true, false). Default value: true.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.PageInfoTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>pager</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: List pager.</p>
<p>E.g. (&lt;@wp.pager listName=&quot;result&quot; objectName=&quot;groupContent&quot; max=&quot;10&quot; pagerIdFromFrame=&quot;true&quot; advanced=&quot;true&quot; offset=&quot;5&quot;&gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: max</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The maximum value for each object group.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: listName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name of the list as found in the request.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: objectName</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the object currently iterated. The following methods are exposed:  getMax, getPrevItem, getNextItem, getCurrItem, getSize, getBegin, getEnd, getMaxItem, getPagerId.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: pagerId</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Sets the ID of the pager itself, it has to be used when two or more pagers exist in the same page. This attributes overrides &quot;pagerIdFromFrame&quot;.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: pagerIdFromFrame</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Sets the ID of the pager (mandatory when two or more pagers share the same page) based upon the frame where the tag is placed. Admitted values are (true, false), the latter being the default. Please note that the &quot;pagerId&quot; attribute takes precedence over this one.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: advanced</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Toggles the pager in advanced mode. Admitted values are (true, false). the advanced mode of the tag is used when the list to iterate over is very large.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: offset</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: This attribute is considered only when the pager is in advanced mode. This is the numeric value of the single step increment (or decrement) when iterating over the list.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.PagerTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>parameter</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: This tag can be used to parameterise other tags. The parameter value can be added through the 'value' attribute or the body tag. When you declare the param tag, the value can be defined in either a value attribute or as text between the start and the ending of the tag.</p>
<p>E.g. (&lt;@wp.parameter name=&quot;resourceName&quot;&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: name</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The name of the parameter.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: value</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The value of the parameter.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.ParameterTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>printHeadInfo</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Returns the information to display. This sub-tag must be used only in a page model, in conjunction with 'outputHeadInfo'.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.HeadInfoPrinterTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>resourceURL</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Returns URL of the resources.</p>
<p>E.g. (&lt;@wp.resourceURL /&gt;static/js/entando-misc-html5-essentials/html5shiv.js&quot;&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: root</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Declares the resource root. If not otherwise specified, the value of SystemConstants.PAR_RESOURCES_ROOT_URL is used.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: folder</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Declares a specific directory for the desired resources. Unless specified, the value &quot;&quot; (empty string) is used in the generation of the URL.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.ResourceURLTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>show</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Defines the position of inclusion of a widget. This tag can be used only in a page model.</p>
<p>E.g. (&lt;@wp.show frame=&quot;0&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: frame</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: yes</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The positional number of the frame, starting from 0.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.WidgetTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>url</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Generates the complete URL of a page. The URL returned is either returned (and rendered) or placed in the given variable. To insert parameters in the query string the sub-tag &quot;ParameterTag&quot; is provided.</p>
<p>E.g. (&lt;@wp.url paramRepeat=&quot;true&quot; &gt;)</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: page</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Code of the destination page. The default is the current page.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: lang</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Code of the language to use in the destination page.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name of the page-scoped variable where to place the URL.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: paramRepeat</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Repeats in the URL all the parameters of the actual request.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: excludeParameters</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: no</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Sets the list of parameter names (comma separated) to exclude from repeating. By default, this attribute excludes only the password parameter of the login form. Used only when paramRepeat=&quot;true&quot;.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.URLTag</h3></td>
</tr>
<tr class="even">
<td align="left"><h3>pageWithWidget</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Description: Search and return the page (or the list of pages) with the given widget type. When &quot;filterParamName&quot; and &quot;filterParamValue&quot; attributes are present, the returned list will be filtered by a specific widget configuration.</p>
<p>E.g. (&lt;@wp.pageWithWidget widgetTypeCode=&quot;userprofile_editCurrentUser&quot; var=&quot;userprofileEditingPageVar&quot; listResult=&quot;false&quot; /&gt;)</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description:</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: widgetTypeCode</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The code of the widget to search.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: filterParamName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Optional widget config param name.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: filterParamValue</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Optional widget config param value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: listResult</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Optional, dafault false. When true the result is a list of pages, when false the returned page is the first occurence.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: com.agiletec.aps.tags.PageWithWidgetTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>currentUserProfileAttribute</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: Current User Profile tag. Return an attribute value of the current user profile.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: attributeName</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The name of the attribute from which to extract the value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: attributeRoleName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The name of the attribute role from which to extract the value.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Name used to reference the value pushed into the pageContext.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
<tr class="even">
<td align="left"><h3>Tag class: org.entando.entando.aps.tags.CurrentUserProfileAttributeTag</h3></td>
</tr>
<tr class="odd">
<td align="left"><h3>userProfileAttribute</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Description: User Profile tag. Return an attribute value from the profile given username.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Attributes</h3></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: username</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: true</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: the username</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: attributeName</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: The name of the attribute from which to extract the value.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: attributeRoleName</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: The name of the attribute role from which to extract the value.</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute: var</p></td>
</tr>
<tr class="even">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Attribute description: Name used to reference the value pushed into the pageContext.</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute: escapeXml</p></td>
</tr>
<tr class="odd">
<td align="left"><p>Required: false</p></td>
</tr>
<tr class="even">
<td align="left"><p>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true, false), the default is true.</p></td>
</tr>
<tr class="odd">
<td align="left"><h3>Tag class: org.entando.entando.aps.tags.UserProfileAttributeTag</h3></td>
</tr>
</tbody>
</table>


