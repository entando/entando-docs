## Aps Core Tag Library

### Version: 2.3

### Short Name: wp

### URI: /aps-core

<table border="1">

<tbody>

<tr>

<td>

### action

</td>

</tr>

<tr>

<td>Description: Build the URL to call a jsp or a functionality of a servlet defined within the system. This tag can use the ParameterTag sub-tag to add url parameters.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: path</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: The relative path of jsp or servlet to invoke, relative to the context of web-application (es.: /do/myAction or /WEB-INF/jsp/myJSP.jsp).</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page-scoped variable where to place the URL.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ActionURLTag

</td>

</tr>

<tr>

<td>

### categories

</td>

</tr>

<tr>

<td>Description: Return the list of the system categories on SelectItem objects.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: titleStyle</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The style of the single select item. Currently it can be 'default' (single title node), 'full' (title with all parents) or 'prettyFull' (title with all parents in form of '..'). The default when none is given is 'default'.</td>

</tr>

<tr>

<td>Attribute: fullTitleSeparator</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: the separator beetwen the titles when 'titleStyle' is 'full' or 'prettyFull'.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page-scoped variable where to place the list of categories.</td>

</tr>

<tr>

<td>Attribute: root</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The root of the categories to show. The default is the system root categories</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CategoriesTag

</td>

</tr>

<tr>

<td>

### checkHeadInfoOuputter

</td>

</tr>

<tr>

<td>Description: This sub-tag verifies the availability of the information to display. This sub-tag can be used <b>only</b> in a page model, in conjunction with 'outputHeadInfo'.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: type</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Specifies the type of information to analyse.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CheckHeadInfoOutputterTag

</td>

</tr>

<tr>

<td>

### contentNegotiation

</td>

</tr>

<tr>

<td>Description: <b>DEPRECATED</b>; Since Entando 4.1.0, moved function into executor service. DO NOTHING.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: mimeType</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: The wanted Mime-Type.</td>

</tr>

<tr>

<td>Attribute: charset</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: The wanted charset.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ContentNegotiationTag

</td>

</tr>

<tr>

<td>

### cssURL

</td>

</tr>

<tr>

<td>Description: Extension of the ResourceURL tag. It returns the URL of the css files.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CssURLTag

</td>

</tr>

<tr>

<td>

### currentPage

</td>

</tr>

<tr>

<td>Description: Returns the requested information held by the current page bean.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: param</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: The wanted parameter: actually can be either "title", "owner" (group), "code", "hasChild" or "childOf" (with attribute "targetPage"). The default when none is given is "title".</td>

</tr>

<tr>

<td>Attribute: langCode</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Code of the language to use for the page information being returned.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page context variable where the informations are placed. Please note that the in this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: targetPage</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Target page when "param" is "childOf".</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true|false), the default is true.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CurrentPageTag

</td>

</tr>

<tr>

<td>

### currentWidget

</td>

</tr>

<tr>

<td>Description: Returns informations about the widget where the tag resides. To obtain information about a widget placed in a frame other than the current, use the "frame" attribute.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: param</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: The requested parameter. It can assume one of the following values: - "code" returns the code of the associated widget type (empty if none associated) - "title" returns the name of the associated widget type (empty if none associated) - "config" returns the value of the configuration parameter declared in the "configParam" attribute The default is "title".</td>

</tr>

<tr>

<td>Attribute: configParam</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the configuration parameter request. This attribute is mandatory when the attribute "param" is set to "config".</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page context variable where the requested information is pushed. In this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: frame</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Id of the frame hosting the widget with the desired informations.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Toggles the escape of the special characters. Admitted value are (true|false), the default is "true".</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CurrentWidgetTag

</td>

</tr>

<tr>

<td>

### currentShowlet

</td>

</tr>

<tr>

<td>Description: <b>DEPRECATED</b>; Since Entando 4.0.0, use "currentWidget" instead.<br />Returns informations about the widget where the tag resides. To obtain information about a widget placed in a frame other than the current, use the "frame" attribute.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: param</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: The requested parameter. It can assume one of the following values: - "code" returns the code of the associated widget type (empty if none associated) - "title" returns the name of the associated widget type (empty if none associated) - "config" returns the value of the configuration parameter declared in the "configParam" attribute The default is "title".</td>

</tr>

<tr>

<td>Attribute: configParam</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the configuration parameter request. This attribute is mandatory when the attribute "param" is set to "config".</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page context variable where the requested information is pushed. In this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: frame</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Id of the frame hosting the widget with the desired informations.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Toggles the escape of the special characters. Admitted value are (true|false), the default is "true".</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CurrentWidgetTag

</td>

</tr>

<tr>

<td>

### fragment

</td>

</tr>

<tr>

<td>Description: Print a gui fragment by the given code.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: code</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: The code of the fragment to return.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Name of the page context variable where the requested information is pushed. In this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Toggles the escape of the special characters. Admitted value are (true|false), the default is "true".</td>

</tr>

<tr>

<td>

#### Tag class: org.entando.entando.aps.tags.GuiFragmentTag

</td>

</tr>

<tr>

<td>

### freemarkerTemplateParameter

</td>

</tr>

<tr>

<td>Description: Add a parameter into the Freemarker's TemplateModel Map.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: Name of the variable where the requested information is pushed.</td>

</tr>

<tr>

<td>Attribute: valueName</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: Name of the variable of the page context where extract the information.</td>

</tr>

<tr>

<td>Attribute: removeOnEndTag</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Whether to remove the parameter on end of Tag. Possible entries (true|false). Default value: false.</td>

</tr>

<tr>

<td>

#### Tag class: org.entando.entando.aps.tags.FreemarkerTemplateParameterTag

</td>

</tr>

<tr>

<td>

### headInfo

</td>

</tr>

<tr>

<td>Description: Declares the information to insert in the header of the HTML page. The information can be passed as an attribute or, in an indirect manner, through a variable of the page context. It is mandatory to specify the type of the information.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: type</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Declaration of the information type. Currently only "CSS" is currently supported.</td>

</tr>

<tr>

<td>Attribute: info</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Information to declare. This is an alternative of the "var" attribute.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the variable holding the information to declare. This attribute is the alternative of the "info" one. This variable can be used for those types of information that cannot be held by an attribute.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.HeadInfoTag

</td>

</tr>

<tr>

<td>

### i18n

</td>

</tr>

<tr>

<td>Description: Return the string associated to the given key in the specified language. This string is either returned (and rendered) or can be optionally placed in a page context variable.<br /> This tag can use the ParameterTag sub-tag to add label parameters.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: key</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Key of the label to return.</td>

</tr>

<tr>

<td>Attribute: lang</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Code of the language requested for the lable.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the variable (page scope) where to store the wanted information. In this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Toggles the escape of the special characters of the returned label. Admitted values (true|false), the default is true.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.I18nTag

</td>

</tr>

<tr>

<td>

### ifauthorized

</td>

</tr>

<tr>

<td>Description: Toggles the visibility of the elements contained in its body, depending on user permissions.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: permission</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The code of the permission required.</td>

</tr>

<tr>

<td>Attribute: groupName</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The name of the group membership required.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The name of the (boolean) page context parameter where the result of the authorization check is placed.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.CheckPermissionTag

</td>

</tr>

<tr>

<td>

### imgURL

</td>

</tr>

<tr>

<td>Description: Extension of the ResourceURL tag. It returns the URL of the images to display as static content outside the cms.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ImgURLTag

</td>

</tr>

<tr>

<td>

### info

</td>

</tr>

<tr>

<td>Description: Returns the information of the desired system parameter.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: key</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Key of the desired system parameter, admitted values are: "startLang" returns the code of start language of web browsing "defaultLang" returns the code of default language "currentLang" returns the code of current language "langs" returns the list of the languages defined in the system "systemParam" returns the value of the system param specified in the "paramName" attribute.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the variable where to store the retrieved information (page scope). In this case the special characters <b>will not</b> be escaped.</td>

</tr>

<tr>

<td>Attribute: paramName</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the wanted system parameter; it is mandatory if the "key" attribute is "systemParam", otherwise it is ignored.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Toggles the escape of the special characters in the information returned. Admitted values are (true|false), the former being the default value.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.InfoTag

</td>

</tr>

<tr>

<td>

### internalServlet

</td>

</tr>

<tr>

<td>Description: Tag for the "Internal Servlet" functionality. Publishes a function served by an internal Servlet; the servlet is invoked from a path specified in the attribute "actionPath" or by the widget parameter sharing the same name. This tag can be used <b>only</b> in a widgets.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: actionPath</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: The init action path.</td>

</tr>

<tr>

<td>Attribute: staticAction</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Whether to execute only the given action path. Possible entries (true|false). Default value: false.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.InternalServletTag

</td>

</tr>

<tr>

<td>

### externalFramework

</td>

</tr>

<tr>

<td>Description: Tag for the "External Framework" widget. <b>DEPRECATED</b>; use "internalServlet" instead.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ExternalFrameworkTag

</td>

</tr>

<tr>

<td>

### nav

</td>

</tr>

<tr>

<td>Description: Generates through successive iterations the so called "navigation" list. For every target/page being iterated (inserted in the page context) are made available the page code, the title (in the current language) and the link. Is it also possible to check whether the target page is empty -that is, with no configured positions- or not.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: spec</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Declares the set of the pages to generate.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Name of the page context variable where the data of target being iterated are made available.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.NavigatorTag

</td>

</tr>

<tr>

<td>

### outputHeadInfo

</td>

</tr>

<tr>

<td>Description: Iterates over various information in HTML header displaying them; this tag works in conjunction with other specific sub-tags. Please note that the body can contain <b>only</b> a sub-tag, or information, at once. This tag must be used <b>only</b> in a page model.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: type</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Specifies the type of information to return, in accordance with the sub-tag to use.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.HeadInfoOutputterTag

</td>

</tr>

<tr>

<td>

### pageInfo

</td>

</tr>

<tr>

<td>Description: Returns the information of the specified page. This tag can use the sub-tag "ParameterTag" to add url parameters if the info attribute is set to 'url'.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: pageCode</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: The code of the page.</td>

</tr>

<tr>

<td>Attribute: info</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Code of required page parameter. Possible entries: "code" (default value) , "title", "owner" (group), "url", "hasChild" or "childOf" (with attribute "targetPage").</td>

</tr>

<tr>

<td>Attribute: langCode</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Code of the language to use for the returned information.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Name used to reference the value pushed into the pageContext. In this case, the system <b>will not</b> escape the special characters in the value entered in pageContext.</td>

</tr>

<tr>

<td>Attribute: targetPage</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Target page when "param" is "childOf".</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Whether to escape HTML. Possible entries (true|false). Default value: true.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.PageInfoTag

</td>

</tr>

<tr>

<td>

### pager

</td>

</tr>

<tr>

<td>Description: List pager.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: max</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: The maximum value for each object group.</td>

</tr>

<tr>

<td>Attribute: listName</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Name of the list as found in the request.</td>

</tr>

<tr>

<td>Attribute: objectName</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: Name of the object currently iterated. The following methods are exposed:&nbsp; getMax, getPrevItem, getNextItem, getCurrItem, getSize, getBegin, getEnd, getMaxItem, getPagerId.</td>

</tr>

<tr>

<td>Attribute: pagerId</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Sets the ID of the pager itself, it has to be used when two or more pagers exist in the same page. This attributes overrides "pagerIdFromFrame".</td>

</tr>

<tr>

<td>Attribute: pagerIdFromFrame</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Sets the ID of the pager (mandatory when two or more pagers share the same page) based upon the frame where the tag is placed. Admitted values are (true|false), the latter being the default. Please note that the "pagerId" attribute takes precedence over this one.</td>

</tr>

<tr>

<td>Attribute: advanced</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Toggles the pager in advanced mode. Admitted values are (true|false). the advanced mode of the tag is used when the list to iterate over is huge.</td>

</tr>

<tr>

<td>Attribute: offset</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: This attribute is considered <b>only</b> when the pager is in advanced mode. This is the numeric value of the single step increment (or decrement) when iterating over the list</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.PagerTag

</td>

</tr>

<tr>

<td>

### parameter

</td>

</tr>

<tr>

<td>Description: This tag can be used to parameterise other tags. The parameter value can be added through the 'value' attribute or the body tag. When you declare the param tag, the value can be defined in either a value attribute or as text between the start and the ending of the tag.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: name</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: The name of the parameter.</td>

</tr>

<tr>

<td>Attribute: value</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: The value of the parameter.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ParameterTag

</td>

</tr>

<tr>

<td>

### printHeadInfo

</td>

</tr>

<tr>

<td>Description: Returns the information to display. This sub-tag must be used <b>only</b> in a page model, in conjunction with 'outputHeadInfo'.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.HeadInfoPrinterTag

</td>

</tr>

<tr>

<td>

### resourceURL

</td>

</tr>

<tr>

<td>Description: Returns URL of the resources.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: root</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Declares the resource root. If not otherwise specified, the value of SystemConstants.PAR_RESOURCES_ROOT_URL is used.</td>

</tr>

<tr>

<td>Attribute: folder</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Declares a specific directory for the desired resources. Unless specified, the value "" (empty string) is used in the generation of the URL.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.ResourceURLTag

</td>

</tr>

<tr>

<td>

### show

</td>

</tr>

<tr>

<td>Description: Defines the position of inclusion of a widget. This tag can be used <b>only</b> in a page model.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: frame</td>

</tr>

<tr>

<td>Required: yes</td>

</tr>

<tr>

<td>Attribute description: The positional number of the frame, starting from 0.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.WidgetTag

</td>

</tr>

<tr>

<td>

### url

</td>

</tr>

<tr>

<td>Description: Generates the complete URL of a portal page. The URL returned is either returned (and rendered) or placed in the given variable. To insert parameters in the query string the sub-tag "ParameterTag" is provided.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: page</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Code of the destination page. The default is the current page.</td>

</tr>

<tr>

<td>Attribute: lang</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Code of the language to use in the destination page.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Name of the page-scoped variable where to place the URL.</td>

</tr>

<tr>

<td>Attribute: paramRepeat</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Repeats in the URL all the parameters of the actual request.</td>

</tr>

<tr>

<td>Attribute: excludeParameters</td>

</tr>

<tr>

<td>Required: no</td>

</tr>

<tr>

<td>Attribute description: Sets the list of parameter names (comma separated) to exclude from repeating. By default, this attribute excludes only the password parameter of the login form. Used only when paramRepeat="true".</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.URLTag

</td>

</tr>

<tr>

<td>

### urlPar

</td>

</tr>

<tr>

<td>Description: This is the sub-tag of the "url" tag. Adds a parameter in the URL query string generated. <b>DEPRECATED</b>; use ParameterTag instead .</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: name</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: Name of the parameter.</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.URLParTag

</td>

</tr>

<tr>

<td>

### pageWithWidget

</td>

</tr>

<tr>

<td>Description: Search and return the page (or the list of pages) with the given widget type. When "filterParamName" and "filterParamValue" attributes are present, the returned list will be filtered by a specific widget configuration.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description:</td>

</tr>

<tr>

<td>Attribute: widgetTypeCode</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: The code of the widget to search</td>

</tr>

<tr>

<td>Attribute: filterParamName</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Optional widget config param name</td>

</tr>

<tr>

<td>Attribute: filterParamValue</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Optional widget config param value</td>

</tr>

<tr>

<td>Attribute: listResult</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Optional, dafault false. When true the result is a list of pages, when false the returned page is the first occurence</td>

</tr>

<tr>

<td>

#### Tag class: com.agiletec.aps.tags.PageWithWidgetTag

</td>

</tr>

<tr>

<td>

### currentUserProfileAttribute

</td>

</tr>

<tr>

<td>Description: Current User Profile tag. Return a attribute value of the current user profile.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: attributeName</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: the name of the attribute from which extract the value.</td>

</tr>

<tr>

<td>Attribute: attributeRoleName</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: the name of the attribute role from which extract the value.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Name used to reference the value pushed into the pageContext.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true|false), the default is true.</td>

</tr>

<tr>

<td>

#### Tag class: org.entando.entando.aps.tags.CurrentUserProfileAttributeTag

</td>

</tr>

<tr>

<td>

### userProfileAttribute

</td>

</tr>

<tr>

<td>Description: User Profile tag. Return a attribute value from the profile givea an username.</td>

</tr>

<tr>

<td>

#### Attributes

</td>

</tr>

<tr>

<td>Attribute: username</td>

</tr>

<tr>

<td>Required: true</td>

</tr>

<tr>

<td>Attribute description: the username</td>

</tr>

<tr>

<td>Attribute: attributeName</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: the name of the attribute from which extract the value.</td>

</tr>

<tr>

<td>Attribute: attributeRoleName</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: the name of the attribute role from which extract the value.</td>

</tr>

<tr>

<td>Attribute: var</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Name used to reference the value pushed into the pageContext.</td>

</tr>

<tr>

<td>Attribute: escapeXml</td>

</tr>

<tr>

<td>Required: false</td>

</tr>

<tr>

<td>Attribute description: Decides whether to escape the special characters in the information retrieved or not. Value admitted (true|false), the default is true.</td>

</tr>

<tr>

<td>

#### Tag class: org.entando.entando.aps.tags.UserProfileAttributeTag

</td>

</tr>

</tbody>

</table>
