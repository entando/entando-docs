# Entando 6 cluster citizens

## Purpose

Purpose of this guide is to give an overview of the members of an
Entando 6 cluster and their role

## Prerequisites

-   None

## Architecture diagram

Let’s start with a picture of an Entando6 cluster and how the various
members interact with each other.

![Entando6 cluster architecture diagram](Entando-cluster-overview.png)

## Members of the cluster

An Entando 6 cluster is composed of various citizens which interact with
each other. Most of these citizens have a Custom Resource Definition
file associated with them and are deployable on Kubernetes using the
Entando operator and controllers.

### Entando app

An Entando app is composed of three parts:

1.  **App Builder**: the replacement for the Admin Console and entry
    point to customize and build an entando application, as well as
    providing a method to interact with the Entando Component
    Repository.

2.  **Entando core**: the backend APIs providing access to Entando
    services.

3.  **Entando component manager**: the service providing the Entando
    Component Repository functionality, e.g. listing the available
    bundles, install/uninstall a bundle, etc. Check the [dedicated
    section](#ecm-section) for more details

The interaction between these three components (and the rest of the
Entando cluster) use the authorization/authentication features provided
by Keycloak.

### Entando component manager

As briefly introuced before, the Entando component manager is able to
list the EntandoDeBundles accessible from the EntandoApp and provide the
install/uninstall services to install a bundle on an Entando App. All of
these services are made possible by the communication with the Entando
Kubernetes service, the only service of the entando ecosystem (other
than the operator itself) able to interact with the cluster and some of
the Entando custom resources.

### Entando Kubernetes Service

The Entando Kubernetes Service is part of the Entando cluster
infrastructure custom resource, and provides an access point to some of
the custom resources defined by Entando, in particular:

-   Entando applications

-   Entando plugins

-   Entando links

-   Entando Component Repository bundles

Some of the main services provided by the Entando Kubernetes Service
are:

-   Provide a list of the available EntandoDeBundles to the
    component-manager

-   Deploy a plugin during the installation of a bundle or discovery of
    an already available plugin and expose that to an app

-   Create a link between an EntandoApp and an EntandoPlugin to expose
    the plugin’s APIs to the EntandoApp and the micro frontends (MFEs)

### Entando Component Repository bundles

An EntandoDeBundle - or Component Repository bundle - is a package with
a set of Entando components and resources. The Entando component manager
is able to read these kind of packages and install the components to
extend the functionalities of an EntandoApp. For more details on the
EntandoDeBundle and the Entando Component Repository, check the
[digital-exchange
overview](../digital-exchange/digital-exchange-overview.adoc)
documentation

### Entando plugin

An Entando plugin is a microservice that exposes APIs reusable by one or
more Entando apps. Usually the plugin services are exposed to the
Entando developer and the end users via micro frontends. Check the
[micro-frontends](../microfrontends) guides for more details. You can
quickly generate an Entando plugin using the (to-complete
link:../blueprint) Entando JHipster Blueprint. The generated project
will be ready to work in an Entando environment providing the
integration with Keycloak, generating a set of default micro frontends
and exposing the plugin’s logic via an EntandoDeBundle (check the
references for details)

### Keycloak

Keycloak in Entando 6 is responsible for authorization and
authentication All the members of an Entando 6 cluster interact with
keycloak to verify user/service authorization to perform any specific
task. Check out the refereces below for more details on keycloak.

## References

-   [Digital-exchange
    overview](../digital-exchange/digital-exchange-overview.adoc)

-   [Tutorial: From blueprint to the digital-exchange
    bundle](../digital-exchange/tutorials/from-blueprint-to-digital-exchange-bundle/README.adoc)

-   [Create a micro-frontend with
    React](../microfrontes/create-react-microfrontend-widget.adoc)

-   To complete - reference to the blueprint

-   To complete - reference to keycloak overview


