# Upgrade Guide E7.1.2 ⇒ E7.1.3

## OLM

Follow the steps below to upgrade your Entando OpenShift installation from 7.1.2 to 7.1.3.

1. Open the console Web app of your OpenShift cluster

2. In your EntandoApp namespace, click on the sidebar `Installed Operators`

3. Click on `Entando Operator`

4. Click on `YAML`. A text editor containing YAML arrays should open. Modify the YAML as described below:
   
   - For each element of the array `.spec.relatedImages`, update the `sha256` of the `image` property according to [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml)

   - In the array `.spec.install.spec.deployments`:

     a. Find the first item with `name` set to "entando-operator"

     b. Go to the `.spec.template.spec.containers[0].env` array

     c. For each `name` element starting with “RELATED_IMAGE_," update the `sha256` of all `value` properties according to [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/develop/values.yaml)

     >Note: The `name` property has no **exact** match in the image table, but the matching is still straightforward because every `name` terminates with the uppercase version of the image table key, e.g. `rhel8_mysql_80` maps to `RELATED_IMAGE_RHEL8_MYSQL_80`
    
5. Click `[SAVE]`

6. Update the version of every `deployment` image in the namespace. For each deployment:

   a. Determine the deployment's image key based on the following (deployment name ⇒ image key), where YOUR-APP-NAME is the placeholder for your application name
    - `entando-k8s-service` ⇒ `entando_k8s_service`
    - `default-sso-in-namespace-deployment` ⇒ `entando_keycloak`
    - `YOUR-APP-NAME-ab-deployment` ⇒ `app_builder_6_4`
    - `YOUR-APP-NAME-cm-deployment` ⇒ `entando_component_manager_6_4`
    - `YOUR-APP-NAME-deployment` ⇒ `entando_de_app_wildfly_6_4` if you originally installed EntandoApp with Wildfly or `entando_de_app_eap_6_4` if you originally installed EntandoApp with EAP

   b. Find the image key in the [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml) and extract the related `sha256`

   c. Scale down the deployment to 0 replicas

   d. In the deployment’s YAML definition, find `spec.template.spec.containers[0].image` and replace the version tag with the extracted `sha256`

   e. Scale up the deployment to the original number of replicas


## Non-OpenShift

Follow the steps below to upgrade your non-OpenShift Entando installation from 7.1.2 to 7.1.3.

1. Connect to your cluster using a client, e.g. kubectl, K9s, Lens, Octant etc.

2. In your EntandoApp namespace, edit the configmap `entando-docker-image-info`:

   a. For each configmap element, open the embedded JSON

   b. Update the `version` property to the corresponding value reported in [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml)

3. Update the version of every `deployment` image in the namespace. For each deployment:

   a. Determine the deployment's image key based on the following (deployment name ⇒ image key), where YOUR-APP-NAME is the placeholder for your application name
    - `entando-k8s-service` ⇒ `entando_k8s_service`
    - `default-sso-in-namespace-deployment` ⇒ `entando_keycloak`
    - `YOUR-APP-NAME-ab-deployment` ⇒ `app_builder_6_4`
    - `YOUR-APP-NAME-cm-deployment` ⇒ `entando_component_manager_6_4`
    - `YOUR-APP-NAME-deployment` ⇒ `entando_de_app_wildfly_6_4` if you originally installed EntandoApp with Wildfly or `entando_de_app_eap_6_4` if you originally installed EntandoApp with EAP

   b. Find the image key in the [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml) and extract the related `version`

   c. Scale down the deployment to 0 replicas

   d. In the deployment’s YAML definition, find `spec.template.spec.containers[0].image` and replace the version tag with the extracted `version`

   e. Scale up the deployment to the original number of replicas
