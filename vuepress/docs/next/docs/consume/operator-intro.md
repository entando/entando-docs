# The Entando Operator

The Entando Operator processes the custom resources in Kubernetes that represent the different [components of an Entando application](../README.md).
The goal of the operator is to provide automation and a set of default configuration options to simplify and accelerate the deployment of an Entando application.

The sections below provide details and assumptions that the operator makes when deploying Entando Custom Resources. If you're using OpenShift these
sections will provide details on how to configure your deployment via the Operator Hub.

For details on the individual custom resources and their configuration check out the [custom resources documentation](./custom-resources.md).

## Installation Scope Options

The Entando Operator can be installed in one of two modes. Either cluster scoped or namespace scoped. In a cluster scoped deployment the operator will have
visibility across the cluster and will manage all of the Entando applications in the Kubernetes cluster. In a namespace scoped deployment the operator
will only have visibility to the namespace where it is deployed and will manage only the components in that namespace.  

When installing the operator via OpenShift look for the `Installation Mode` option to select the scoping for the operator.

### When to use Cluster Scoped Deployments
When choosing how to deploy your operator there are no right or wrong answers. Think about the deployment that best fits your goals and team. Here are some items to think about.

- Cluster scoped deployments are common in production clusters and in environments with strong operational support and controls.
- A cluster scoped deployment can saves resources When you want to optimize resource consumption and share Kubernetes infrastructure.
- When you are planning to centralize and share other infrastructure resources like Keycloak and databases a cluster scoped deployment can fit into the same management processes.
   - Sharing infrastructure resources is a recommended approach for medium or large teams and the operator can be treated like other infrastructure services.
- In some cases security requirements will require that the permissions required for the operator are managed separately from the deployed applications. A cluster scoped deployment isolates the operator permissions in a separate namespace.
- Cluster scoped deployments can simplify the deployment of an Entando app by developers or end users because they have fewer resources to manage

###  When to use Namespace Scoped Deployments
When choosing how to deploy your operator there are no right or wrong answers. Think about the deployment that best fits your goals and team. Here are some items to think about.

- Namespace scoped deployments are common in dev clusters. Or in clusters where application naemspaces come and go frequently
- Namespace scoped deployments are useful in scenarios where you plan to, or could have, many different versions of Entando
- Namespace scoped deployments give your teams complete team autonomy and the ability to create and destroy applications
- When teams are small and self managing from an operational perspective a namespace scoped deployment is a simpler architecture
- If you plan to have a small number of applications deployed in the cluster a namespace scoped deployment can be easier to manage

[Click here for tutorials and instructions for deploying via operator hub](../../tutorials/getting-started/openshift-install-by-operator-hub.md)

## TLS Secret Creation

When configuring and deploying Entando via the operator you will be asked to provide a secret for some of the components in the architecture. A few things to be aware of when creating and configuring a secret:

- The secret is assumed to be in the same namespace as the component being created.
- This secret is expected to have a private key, and a certificate for the hostname (or a wildcard cert) that the service
will be exposed on.
- Refer to the 'ingressHostname' property in the custom resource for more information on how the hostname is
determined.
- If a secret isn't provided the Entando Operator will evaluate the value of the `ENTANDO_PATH_TO_TLS_KEYPAIR` which is
expected to contain two files: tls.key and tls.crt.
  - If a key pair is found in the folder specified, it will revert to the keypair found.
  - If a key pair is not found the Entando Operator will evaluate the value of the `ENTANDO_USE_AUTO_CERT_GENERATION`.
    If that property is set to `true` the Entando Operator will assume that the cluster has been configured with a valid CA and leave it to
    the Ingress controller to generate its own certificates.

[Click here for tutorials on creating secrets and setting up TLS in your Entando Apps.](../../tutorials/getting-started/openshift-install-by-operator-hub.md)

## Database Deployment

Some Entando components include the ability to select a database management system (DBMS) when deploying the component.

- The DBMS field in Entando Custom Resources can be one of mysql, oracle, postgresql or embedded.
  - **IMPORTANT!** -- If embedded is selected for a component only 1 replica for the component can be created.
  - **IMPORTANT!** -- Oracle instances are not supported for automatic deployment in a container. You must create an Oracle instance or use an existing instance and configure it as an [external database](../../tutorials/devops/external-db.md) for your Entando app

- If an EntandoDatabaseService has been deployed in the component's namespace, and the DBMS specified on this EntandoDatabaseService
 is the same as the DBMS specified on this EntandoApp, the Entando Operator will create dedicated
 schemas (in the case of PostgreSQL or Oracle), or databases in the case of MySQL.
   - If a matching EntandoDatabaseService does not exist in this namespace, the Entando Operator
     will automatically deploy the appropriate container to host the DBMS specified. This last option is not
     yet supported for Oracle.
- For an EntandoApp three schemas/database will be created: the Entando Port DB, tne Entando Serv DB and a database for
 the Entando Component Manager.
   - If the Port and Serv schemas/databases are empty, the Entando Operator  will use the underlying Entando App to populate these databases with the data backup available in the standard backup path in the WAR deployment.
  - In scenarios where the EntandoApp needs to connect to an existing database that is fully managed
   by the customer, it is best to setup the standard database connection variables using the
   `spec.environmentVariables` property and set this property to 'none'. This will skip any database
   preparations steps in the deployment.

When deploying a component the operator will evaluate the spec and if it supports the standard `spec.dbms`
property, the value of this property will be given to the component's `spec.dbms`. Please consult
the documentation for each component's CRD to determine how each Entando resource uses the dbms (if any).

## Ingress Path Generation

When deploying an Entando Custom Resource that uses an Ingress path:

- The `ingressHostName` property defines the host path that will be used to access this
  service from outside the cluster. The Entando Operator will
  create an ingress reflecting this hostname, and expose the resource at its default path.
    - **IMPORTANT!** -- If omitted, the Entando Operator will automatically generate a hostname
      using the value of the ENTANDO_DEFAULT_ROUTING_SUFFIX environment variable that the Entando Operator was
      configured with. It will prefix the name and namespace of the EntandoKeycloakServer to this default routing suffix.
