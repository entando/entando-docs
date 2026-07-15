---
sidebarDepth: 2
---
# Customize Bundle Info Shown in App Builder

To modify what is displayed for your bundles in the Local Hub, there are a few specifications that can be customized. This is helpful when there are many bundles or they are shared across teams and organizations.

Bundles are typically displayed in the Local Hub of the App Builder like this:

![Hub user interface in Entando App Builder](./img/local-hub-page.png)


The corresponding Kubernetes custom resource file looks similar to this:

```
apiVersion: entando.org/v1
kind: EntandoDeBundle
metadata:
  name: simple-entando-bundle
spec:
  details:
    name: Entando Bundle
    description: An example of an Entando Bundle
    dist-tags:
      latest: v0.0.1
    time:
      created: '2020-05-20T15:59:21.946Z'
      modified: '2020-05-20T15:59:21.946Z'
      v0.0.1: '2020-05-20T15:59:21.946Z'
    versions:
      - v0.0.1
    keywords:
      - entando6
    author: Entando
  tags:
   - tarball: docker://registry.hub.docker.com/entando/simple-entando-bundle
     version: 0.0.1
```

These are the specifications that can be customized: 

| Field                           | UI Element                                                                | 
|-------------------------|---------------------------------------------------------------------------|
| `spec.details.name`             | The bundle title                                                      |
| `spec.details.description`      | The bundle description (only visible in list format)                  |
| `spec.details.dist-tags.latest` | The latest version of the bundle                                      |