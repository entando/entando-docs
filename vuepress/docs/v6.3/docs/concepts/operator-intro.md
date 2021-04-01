# The Entando Operator

The Entando Operator processes the custom resources in Kubernetes that represent the different [components of an Entando application](./README.md).
The goal of the operator is to provide automation and a set of default configuration options to simplify and accelerate the deployment of an Entando application.

The sections below provide details and assumptions that the operator makes when deploying Entando Custom Resources. If you're using OpenShift these
sections will provide details on how to configure your deployment via the Operator Hub.

For details on the individual custom resources and their configuration check out the [custom resources documentation](./custom-resources.md).

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

[Click here for tutorials on creating secrets and setting up TLS in your Entando Apps.](../../tutorials/devops/installation/open-shift/openshift-install-by-operator-hub.md)

## Database Deployment

Some Entando components include the ability to select a database management system (DBMS) when deploying the component.

- The DBMS field in Entando Custom Resources can be one of mysql, oracle, postgresql or embedded.
  - **IMPORTANT!** -- If embedded is selected for a component only 1 replica for the component can be created.
  - **IMPORTANT!** -- Oracle instances are not supported for automatic deployment in a container. You must create an Oracle instance or use an existing instance and configure it as an [external database](../../tutorials/devops/external-database/README.md) for your Entando app

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
