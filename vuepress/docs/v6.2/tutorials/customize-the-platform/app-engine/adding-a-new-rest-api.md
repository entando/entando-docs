# Adding a new API to the core app

## Prerequisites

-   Java 8

-   maven

## Overview

This guide will take you through adding a new REST API to the Entando
core app. In some cases it is better to add new APIs to the core rather
than creating a new microservice. Some example cases where adding new
APIs to the core is recommended are:

-   When extending or adding functionality to the WCMS

-   When you have a simple use case requiring persistence that is
    specific to only the application you’re working within

-   When exposing configurations that are needed by the portal-ui during
    page rendering

-   For small changes that don’t warrant a full stand-alone microservice

You can build widgets and micro frontends that take advantage of these
APIs in the same way that your micro-frontends can invoke APIs exposed
by other services.

## Tutorial

Creating a controller and services

1.  Create a new java package in the project using your favorite IDE at
    the path `org.entando.training`.

2.  Under that package add packages for `controllers` and `services`.

3.  Create a class called
    [DemoController.java](./demoResources/DemoController.java) from the
    training package into the controllers package.

    -   This is a normal Spring rest controller and it will be
        discovered by annotations.

4.  Copy [DemoService.java](./demoResources/DemoService.java) from the
    training package into the services package.

    -   This is a normal Spring service that will be autowired into the
        controller. The data in this service is hardcoded but this is
        where you can wire in external services or other parts of the
        Entando architecture to fetch the data.

5.  Copy [commonConfig.xml](./demoResources/commonConfig.xml) to
    `src/main/resources/spring/aps/managers`.

    -   The goal is to enable package scanning for annotation driven
        spring services. This includes the package scan for your package
        defined above. If you want to scan another package, then you
        need to add another path to this file. This is the only spring
        XML you will need to change if you want to build annotation
        driven beans in Entando.

    -   See also web.xml for deeper details.

6.  Review the code and annotations in the controller to understand how
    the APIs are protected and integrated.

7.  `@RestAccessControl` is a custom Entando annotation that can be used
    to restrict APIs by role.

    -   The rest of the annotations are normal Spring annotations.

8.  Restart your app using jetty.

    -   if you get an error add the entries below to
        `src/main/conf/systemParams.properties` This is temporary

            # Parameters for Argon2 algorithm encryption
            algo.argon2.type=ARGON2i
            algo.argon2.hash.length=32
            algo.argon2.salt.length=16
            algo.argon2.iterations=4
            algo.argon2.memory=65536
            algo.argon2.parallelism=4
            algo.default.key=changeit

9.  Go to Swagger

10. Find the demo-controller and try your new endpoints out using
    swagger


