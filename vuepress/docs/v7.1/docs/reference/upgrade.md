# Upgrade Guide E7.1.2 ⇒ E7.1.3 - OLM

Follow the steps below to upgrade your Entando OpenShift installation from 7.1.2 to 7.1.3.

1. Open the console Web app of your OpenShift cluster
2. Under your EntandoApp’s namespace, click on the sidebar `Installed Operators`
3. Click on `Entando Operator`
4. Click on `YAML`. A text editor containing YAML data should open.
  a. For every element of the array `.spec.relatedImages`, update the `sha256` of the property `image` according to [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml)
  b. Under the array `.spec.install.spec.deployments`, find the first item with `name` set to `"entando-operator"`
    - Under this key, go to the `.spec.template.spec.containers[0].env` array
    - For every item `name` starting with “`RELATED_IMAGE_`", update the `sha256` of every `value` property according to [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/develop/values.yaml)
    
    <aside>
    💡 **Note that** the mentioned `name` property has no **exact** match on the images table, but the matching is still straightforward because the `name` terminates with the uppercase version of the keys of the images table. For instance `RELATED_IMAGE_RHEL8_MYSQL_80` is referred to `rhel8_mysql_80`
    
    </aside>
    
- Press `**[SAVE]**`

## Then:

<aside>
💡 note that in the next steps we will be referring to the application name you used for the installation with the placeholder `{{appname}}`

</aside>

for every `deployment` in the namespace update the image version this way:

- given the deployment name **determine** the related **image key** using this map (deployment name ⇒ image key):
    - `entando-k8s-service` ⇒ `entando_k8s_service`
    - `default-sso-in-namespace-deployment` ⇒ `entando_keycloak`
    - `{{appname}}-ab-deployment` ⇒ `app_builder_6_4`
    - `{{appname}}-cm-deployment` ⇒ `entando_component_manager_6_4`
    - `{{appname}}-deployment` ⇒ `entando_de_app_wildfly_6_4` if you originally installed EntandoApp with wildfly
    - `{{appname}}-deployment` ⇒ `entando_de_app_eap_6_4` if you originally installed EntandoApp with EAP
- lookup for the obtained image key in the [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml) and then **extract** the related **`sha256`**
- scale down the deployment to 0 replicas
- modify the deployment’s yaml definition this way:
    - under `spec.template.spec.containers[0].image` replace the version tag with the **extracted** **`sha256`**
- scale up the deployment to the original number of replicas