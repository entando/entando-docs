---
sidebarDepth: 2
---

# Update the Project Data Model

## Overview

This tutorial explains how to use the [Entando Component Generator](../../../docs/create/component-gen-overview.md) powered by [JHipster](https://www.jhipster.tech/) to quickly update the data model for your Entando project.

## Prerequisites
A [Blueprint-generated project](./generate-microservices-and-micro-frontends.md) 

## Tutorial
The steps below assume you're working out of the root directory of the microservice, e.g. /microservices/conference-ms.

1. Use JHipster to extract the current application description. The resulting JHIpster Domain Language (JDL) file contains your project's application configuration and entity definitions:
```
ent jhipster export-jdl export.jdl
```
2. To strip unnecessary information, create a new JDL file comprising only the elements that describe entities. If you followed the [project generation tutorial](./generate-microservices-and-micro-frontends.md), that could be as simple as creating a file named `conference.jdl` that contains the following:
```
entity Conference {
  name String
}
```
3. Enhance this definition by adding fields, entities, table mappings, field validation, etc. This is easily accomplished with the [online JDL-Studio or corresponding JHipster IDE plugins/extensions](https://www.jhipster.tech/jdl/). For example:
```
entity Conference {
  name String required
  location String
  date ZonedDateTime
}

entity Session {
  name String required
  track Track required
}

enum Track {
  BUSINESS, TECHNICAL
}

relationship OneToMany {
   Conference to Session
}
```
This file content adds two fields to the Conference entity, introduces the Session entity plus an enum, and creates a mapping between the two entities. Below is the updated data model in JDL-Studio:

![conference.jdl](./img/jhipster-jdl.png)

4. Import the JDL file into your application. You will be prompted with the option to generate MFEs if this was requested during project generation.
```
ent jhipster import-jdl conference.jdl
```
If the default project structure has been retained, this step will update your data model, add entries to Liquibase to upgrade database schema during deployment, add service methods to your microservice, add fields to your MFEs, etc.

5. You can now build your updated project and [run it locally](./run-local.md) or [deploy it to Entando](../pb/publish-project-bundle.md). Definition enhancement through build and test can be repeated as many times as needed.



