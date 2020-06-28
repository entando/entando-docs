# Add a New Datasource in EAP Server

With EAP should be enough to add a set of parameters the EntandoApp
custom resource.

-   Set the standardServerImage to eap

-   Add a `parameters` object

<table>
<caption>Parameters environment variables reference</caption>
<colgroup>
<col width="33%" />
<col width="33%" />
<col width="33%" />
</colgroup>
<thead>
<tr class="header">
<th align="left">Env variable</th>
<th align="left">Value</th>
<th align="left">Example with PortDB</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td align="left"><p>DATASOURCES</p></td>
<td align="left"><p>&quot;PORTDB,SERVDB, &lt;YOUR-DS-PREFIX&gt;&quot;</p></td>
<td align="left"></td>
</tr>
<tr class="even">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_NONXA</p></td>
<td align="left"><p>Defines the datasource as a non-XA datasource. Defaults to <code>false</code></p></td>
<td align="left"><p><code>PORTDB_NONXA=&quot;true&quot;</code></p></td>
</tr>
<tr class="odd">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_JTA</p></td>
<td align="left"><p>Defines Java Transaction API (JTA) option for the non-XA datasource. The XA datasources are already JTA capable by default Defaults to <code>true</code></p></td>
<td align="left"><p><code>PORTDB_JTA=&quot;false&quot;</code></p></td>
</tr>
<tr class="even">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_URL</p></td>
<td align="left"><p>Defines connection URL for the datasource.</p></td>
<td align="left"><p><code>PORTDB_URL=&quot;jdbc:derby:/entando-data/databases/entandoPort;create=true&quot;</code></p></td>
</tr>
<tr class="odd">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_JNDI</p></td>
<td align="left"><p>Defines the JNDI name for the datasource. This setting is useful if you want to override the default generated JNDI name</p></td>
<td align="left"><p><code>PORTDB_JNDI=&quot;java:jboss/datasources/entandoPortDataSource&quot;</code></p></td>
</tr>
<tr class="even">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_DRIVER</p></td>
<td align="left"><p>Defines Java database driver for the datasource</p></td>
<td align="left"><p><code>PORTDB_DRIVER=&quot;derby&quot;</code></p></td>
</tr>
<tr class="odd">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_USERNAME</p></td>
<td align="left"><p>Defines the username for the datasource</p></td>
<td align="left"><p><code>PORTDB_USERNAME=&quot;agile&quot;</code></p></td>
</tr>
<tr class="even">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_PASSWORD</p></td>
<td align="left"><p>Defines the password for the datasource</p></td>
<td align="left"><p><code>PORTDB_PASSWORD=&quot;agile&quot;</code></p></td>
</tr>
<tr class="odd">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_SERVICE_HOST</p></td>
<td align="left"><p>Defines the database server’s host name or IP address to be used in the datasource’s connection-url property.</p></td>
<td align="left"><p><code>PORTDB_SERVICE_HOST=&quot;dummy&quot;</code></p></td>
</tr>
<tr class="even">
<td align="left"><p>&lt;YOUR-DS-PREFIX&gt;_SERVICE_PORT</p></td>
<td align="left"><p>Defines the database server’s port for the datasource.</p></td>
<td align="left"><p><code>PORTDB_SERVICE_PORT=&quot;1527&quot;</code></p></td>
</tr>
</tbody>
</table>

> **Note**
>
> For more details on other standard variables check the [EAP
> documentation](https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.1/html/red_hat_jboss_enterprise_application_platform_for_openshift/reference_information#db_service_prefix_mapping)

Here a potential example

    apiVersion: entando.org/v1
    kind: "EntandoApp"
    metadata:
      annotations: {}
      labels: {}
      name: "quickstart"
    spec:
      dbms: #tbd
      replicas: 1
      standardServerImage: eap
      ingressPath: /entando-de-app
      parameters:
        DATASOURCES: "PORTDB,SERVDB,MYDATASOURCE"
        MYDATASOURCE_NONXA: "true"
        MYDATASOURCE_JTA: "false"
        ...

## Other resources

-   [EAP Official Documentation: Runtime
    Artifacts/Datasources](https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.1/html/red_hat_jboss_enterprise_application_platform_for_openshift/configuring_eap_openshift_image#Runtime-Artifacts)


