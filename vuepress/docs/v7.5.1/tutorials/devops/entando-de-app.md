---
sidebarDepth: 2
---

# Configure the Entando App Context
This tutorial describes how to modify the [EntandoApp CR](../../docs/reference/entandoapp-cr.md) to customize the ingress path of an Entando App Engine deployment. 

## Prerequisites
- An existing deployment of an Entando App or the ability to create one.
    - If you haven't created a deployment or don't have a YAML file for an Entando deployment, follow the [Quickstart instructions](../../docs/getting-started/README.md).

## Remove or Replace entando-de-app

The ingress path of the App Engine currently defaults to **/entando-de-app**, which is visible in the URL. Follow the steps below to remove or replace this value.

1. Open the `entando-app.yaml`, which contains several default parameters:

```yaml
apiVersion: entando.org/v1
kind: EntandoApp
metadata:
  namespace: entando
  name: quickstart
spec:
  environmentVariables: null
  dbms: embedded
  ingressHostName: YOUR-HOST-NAME
  standardServerImage: tomcat
  replicas: 1
```

2. Under `spec`, add the parameter `ingressPath`. If this parameter is not present, the path for the EntandoApp defaults to **/entando-de-app**.

3. Input a value for `ingressPath` to change the web context:

   - To remove **/entando-de-app** from the path completely, set the value to empty (e.g.: "" ), blank (e.g.: " "), or "/"

   - To change the visible path of the application, enter a value of "/YOUR-INGRESS-PATH"

