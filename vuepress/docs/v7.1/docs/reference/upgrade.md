# Upgrade Guide E7.1.2 ⇒ E7.1.3

## Upgrade an OpenShift/OLM Entando Instance

Follow the steps below to upgrade your OpenShift Entando installation from 7.1.2 to 7.1.3.

1. Open the console Web app of your OpenShift cluster

2. In your EntandoApp namespace, click on the sidebar `Installed Operators`

3. Click on `Entando Operator`

4. Click on `YAML`. A text editor containing YAML arrays should open. Modify the YAML as described below:
   
   - For each element of the array `.spec.relatedImages`, ensure the `sha256` of the `image` property matches what's reported in [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml)

   - In the array `.spec.install.spec.deployments`:

     a. Find the first item with `name` set to **entando-operator**

     b. Go to the `.spec.template.spec.containers[0].env` array

     c. For each `name` element starting with **RELATED_IMAGE_**, ensure the `sha256` of every `value` property matches what's reported in [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/develop/values.yaml)

     >Note: A `name` property has no exact match in the image table, but every `name` terminates with the uppercase suffix of its image table key, e.g. `rhel8_mysql_80` maps to `RELATED_IMAGE_RHEL8_MYSQL_80`
    
5. Click `[SAVE]`

6. For each `deployment` in the namespace, follow the steps below to update the image version:

   a. Scale down the deployment to 0 replicas
   
   b. Map the deployment name to its image key based on the following (deployment name ⇒ image key), where YOUR-APP-NAME is the placeholder for your application name:
    - `entando-k8s-service` ⇒ `entando_k8s_service`
    - `default-sso-in-namespace-deployment` ⇒ `entando_keycloak`
    - `YOUR-APP-NAME-ab-deployment` ⇒ `app_builder_6_4`
    - `YOUR-APP-NAME-cm-deployment` ⇒ `entando_component_manager_6_4`
    - `YOUR-APP-NAME-deployment` ⇒ `entando_de_app_wildfly_6_4` if EntandoApp was installed with Wildfly or `entando_de_app_eap_6_4` if EntandoApp was installed with EAP

   c. Find the image key in the [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml) and extract the related `sha256`


   d. In the deployment’s YAML definition, find `spec.template.spec.containers[0].image` and replace the version tag with the extracted `sha256`

   e. Scale up the deployment to the original number of replicas


## Upgrade a Non-OpenShift Entando Instance

Follow the steps below to upgrade your non-OpenShift Entando installation from 7.1.2 to 7.1.3.

1. Connect to your cluster using a client, e.g. kubectl, K9s, Lens, Octant, etc.

2. In your EntandoApp namespace, manually check each element of the ConfigMap `entando-docker-image-info`:

   a. Open the element's embedded JSON

   b. If necessary, update the `version` property to the value reported in [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml)

3. For each `deployment` in the namespace, follow the steps below to update the image version:

   a. Scale down the deployment to 0 replicas
   
   b. Map the deployment name to its image key based on the following (deployment name ⇒ image key), where YOUR-APP-NAME is the placeholder for your application name:
    - `entando-k8s-service` ⇒ `entando_k8s_service`
    - `default-sso-in-namespace-deployment` ⇒ `entando_keycloak`
    - `YOUR-APP-NAME-ab-deployment` ⇒ `app_builder_6_4`
    - `YOUR-APP-NAME-cm-deployment` ⇒ `entando_component_manager_6_4`
    - `YOUR-APP-NAME-deployment` ⇒ `entando_de_app_wildfly_6_4` if EntandoApp was installed with Wildfly or `entando_de_app_eap_6_4` if EntandoApp was installed with EAP

   c. Find the image key in the [the image-set specification](https://github.com/entando-k8s/entando-k8s-operator-bundle/blob/v7.1.3/values.yaml) and extract the related `version`


   d. In the deployment’s YAML definition, find `spec.template.spec.containers[0].image` and replace the version tag with the extracted `version`

   e. Scale up the deployment to the original number of replicas
