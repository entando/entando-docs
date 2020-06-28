# Release Notes Entando 6.1.0

## Highlights

### Helm Based Getting Started

With the release of 6.1 Entando is using a Helm 2 client to assist in
the generation and installation of the full suite of Entando 6
capability. The new getting started simplifies the process of installing
Entando 6 and automatically generates everything needed to install a
full Entando instance in your Kuberentes environment. Check out the helm
based getting started here: [Getting Started](../getting-started/)

### Micro Frontend Configuration in App Builder

The App Builder now gives developers the ability to create a micro
frontend to render configuration to the App Builder user when you add a
widget to a page. The configuration is stored in the Entando application
database and can be referenced by the runtime micro frontend via custom
tags or an API call. Tutorials and more details in documentation: 
[Widget Configuration](../../tutorials/micro-frontends/widget-configuration)

### New Process Driven Applications Micro Frontends

With the release of Entando 6.1 we are introducing an all new set of
micro frontends for Process Driven Applications (PDAs). The release
includes eight micro frontends (smart task inbox, task details, notes,
attachments, form generation, summary card, and over time dashboard)
that integrate with your underlying process automation engine. The
release also includes a default integration with Red Hat PAM. More on
the new PDA functionality in 6.1.0:
[PDA Architecture](../concepts/pda-architecture)

### Entando Blueprint Bundle Generation

The Entando Blueprint now includes scripts and functionality to assist
developers in automatically generating a bundle for the ECR. The scripts
build micro frontends and generate the Kubernetes custom resource
definitions needed to deploy components created using the blueprint to
the ECR. 

### Entando Blueprint Local Development Updates

With Entando 6.1 developers can now launch their blueprint generated
applications without any changes. In prior versions developers were
required to update CORs settings, add Options call support to security
configuration, and to create environmental configuration to run their
Entando Blueprint generated applications: [Blueprint](../../tutorials/micro-frontends/generate-micro-frontends-from-a-database-entity)

### CMS Enhancements in the App Builder

With Entando 6.1 the Entando CMS has been enhanced to include image
editing and cropping, additional attribute types, updated layouts and
user interaction, an updated editor for hypertext content, and new asset
search. The App Builder CMS also now includes the widgets that will
allow a user to configure and render their content via the app builder
page configuration screen. See documentation on the Entando 6.1 CMS here:
[CMS Content Types](../../tutorials/cms/content-types-tutorial)

### New and Updated CMS REST APIs

Entando 6.1 includes updates to the REST APIs exposed by the Entando
CMS. In particular, updated support for advanced filtering and updates
to APIs for image and document storage. Checkout the Entando Swagger
definition for more details: [Reference](../reference)

### Operator and Kubernetes Infrastructure Updates

The infrastructure in Entando 6.1 includes significant changes to the
deployment workflow internal to the Entando infrastructure. Many of the
jobs performed by the operator have been updated to short lived run to
completion pods to minimize resource utilization and to speed up overall
deployment time.

### Added the Ability to Integrated Google Analytics in Progressive Web App

The Entando Progressive Web App shell now provides support for including
a Google Analytics token to track page and content views in the
application. These changes are available as part of a manual upgrade to
a 5.x version of the PWA.

## Tech Preview

The release of Entando 6.1 also includes a new command line tool to
support all of the operations needed to interact with the Entando
platform. Checkout the tech preview version of the tool and its usage
here <https://github.com/entando/entando-cli>

## Released Image Versions

    app-builder:  Image Version: 6.0.99
    entando-component-manager:  Image Version: 6.0.27
    entando-de-app:  Image Version: 6.0.45
    entando-de-app-eap:  Image Version: 6.0.45
    entando-de-app-wildfly:  Image Version: 6.0.45
    entando-k8s-app-controller:  Image Version: 6.0.33
    entando-k8s-app-plugin-link-controller:  Image Version: 6.0.9
    entando-k8s-cluster-infrastructure-controller:  Image Version: 6.0.27
    entando-k8s-composite-app-controller:  Image Version: 6.0.22
    entando-k8s-controller-coordinator:  Image Version: 6.0.66
    entando-k8s-dbjob:  Image Version: 6.0.32
    entando-k8s-keycloak-controller:  Image Version: 6.0.33
    entando-k8s-plugin-controller:  Image Version: 6.0.19
    entando-k8s-service:  Image Version: 6.0.17
    entando-keycloak:  Image Version: 6.0.11
    entando-plugin-sidecar:  Image Version: 6.0.2
    entando/entando-pam-app-wildfly:  Image Version:  6.1.0
    entando/entando-process-driven-plugin:  Image Version: 6.1.0

## Known Issues

This section includes key known open items against the components
released in Entando 6.1 that can impact user experience. The list is not
comprehensive. Check with your customer or professional services
representative for a full list or for questions.

### Key Open Issues

-   In the App Builder some composite list content types do not render
    or persist correctly ( Tracking ENG - 383, ENG-385, and ENG-363)

-   An available workaround is to use the legacy admin console to
    interact with composite list content types and other content types
    not yet supported

-   Page preview in the app builder when deployed on the default EAP and
    Wildfly images doesn’t render correctly (Tracking ENG-338)

-   The page settings link on the page configuration screen doesn’t
    persist correctly As a workaround use the page settings under Page
    Tree → Select Page → Edit

-   Editing an image that has been uploaded via the app builder can
    result in errors (ENG-382) As a workaround use the image editing
    capability in the legacy admin console

-   Direct Jira Link for Full Up to Date List of Open Items on 6.1
    <https://jira.entando.org/issues/?filter=10904>

## Previous Releases

<a href="/old-version/old-version.html" target="_blank">Documentation for prior versions.
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound">
        <path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon>
    </svg>
</a>