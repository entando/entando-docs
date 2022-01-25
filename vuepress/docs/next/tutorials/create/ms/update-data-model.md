---
sidebarDepth: 2
---

# Update the Project Data Model

## Overview

This tutorial shows how you can use the Entando Component Generator powered by [JHipster](https://www.jhipster.tech/) to quickly update the data model for your Entando project.

## Prerequisites
The steps below assume you already have an existing project and are working in the top-level project directory. If you don't have a project yet, please see [this tutorial](./generate-microservices-and-micro-frontends.md).

## Tutorial
1. Start by extracting the current application description using JHipster. The resulting JHIpster Domain Language (JDL) file includes the entity definitions that will be used as a starting point for your design work.
```
ent jhipster export-jdl export.jdl
```
2. This file contains the application configuration as well as entity definitions for your project. For simplicity, we'll create a new file containing just the elements describing the entities. If you followed the tutorial above, that section could be as simple as this:
```
entity Conference {
  name String
}
```
3. You can now take this definition and enhance it by adding fields, additional entities, mappings between tables, field validation, etc. The easiest way to do this is by using the online JDL-Studio or corresponding JHipster IDE plugins/extensions. See [the JHipster docs](https://www.jhipster.tech/jdl/) for more information on those options. Once you're done enhancing your data model, you should create a new file containing it, e.g. `conference.jdl.`
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
In this case we've added two fields to the Conference entity, introduced the Session entity plus an enum, and added a mapping between the two entities. This is the view you'll get in JDL-Studio for the updated data model.

![conference.jdl](./img/jhipster-jdl.png)

4. Now import the jdl file into your application. You may be asked if you want to generate MFEs depended on your options when first generating the project.
```
ent jhipster import-jdl conference.jdl
```
If you kept the original project structure, this step will update your data model, add entries to Liquibase so the database schema can be upgraded at deploy time, add new service methods to your microservice, add fields to your MFEs, etc.

5. You can now build your updated project and [run it locally](./run-local.md) or [deploy it to Entando](../pb/publish-project-bundle.md). For a full local test you can use the following commands to build the project, then start Keycloak, the microservices, and one of the MFEs.
```
ent prj build
ent prj xk start
ent prj be-test-run
ent prj fe-test-run
```

You can repeat steps 3-5 as many times as needed throughout the life of your project.



