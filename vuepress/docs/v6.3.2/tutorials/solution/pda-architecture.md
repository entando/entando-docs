# PDA Architecture

The objective of this document is to provide an explanation for the components
that compose the Process Driven Applications plugin (PDA) architecture from a
deployment perspective as well as how they interact with each other.

The image below shows the components in high level:

![PDA Architecture](./pda-images/pda-architecture.png)

## PDA MFEs

The PDA Micro Frontends run on the browser and they render the UI custom
components the user interacts with. These components are written in React and
they fetch data from the PDA API, passing the Keycloak token for authentication.
The MFEs also make calls to the Entando Core API in order to retrieve the
settings required for the configuration UI. These components will be available
on Entando App Builder after the PDA plugin bundle is installed and the user
can create pages with them.

The source code for this component:
<https://github.com/entando/entando-process-driven-plugin/tree/master/widgets>

## PDA API

The Spring Boot application that communicates with the engine and make its data
available in a Rest API. It interacts with Keycloak to validate the token and
with the sidecar to retrieve the connections/sensitive data, depending on how it
was deployed. The application shouldn't call specific engine classes directly,
instead it always calls the abstractions defined in PDA Core library. The engine
implementation to use is decided at runtime based on the connection details
provided. It is important to note that the PDA API application is stateless,
since it doesn't have a database. All data available on the API is retrieved
from the BPM engine. After bundle installation, it will be deployed as a
microservice in the Kubernetes infrastructure and an Ingress will be created to
make the API available to the MFEs, as described by the Entando Plugin custom
resource.

The source code for this component:
<https://github.com/entando/entando-process-driven-plugin>

## Sidecar

The sidecar is another application (docker container) deployed in the same Pod
as the PDA API. It exposes services to manage connection details, which will be
stored as secrets in Kubernetes. The PDA API communicates with the sidecar to
manage BPM engine connection details.

The source code for this component:
<https://github.com/entando/entando-plugin-sidecar>

## PDA Core

This is the library that defines the interfaces and abstractions that should be
implemented to interact with specific BPM engines. This way it is possible to
have multiple engine implementations at the same time.

The source code for this component:
<https://github.com/entando/pda-core-engine>

## PAM Impl

The Red Hat PAM implementation for the PDA Core library. If the connection maps
to a PAM engine, these are the classes that are going to be executed when the
PDA API requests for engine operations. This implementation communicates with
the Kie Server, which executes the defined process operations.

The source code for this component:
<https://github.com/entando/pda-redhatpam-engine>

