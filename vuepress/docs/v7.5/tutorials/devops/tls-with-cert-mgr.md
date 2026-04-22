---
sidebarDepth: 2
---
# Manage TLS Certificates using cert-manager
Management of TLS certificates in an Entando instance can be easily managed using the powerful certificate controller [cert-manager](https://cert-manager.io/). This tutorial shows the configuration steps necessary for this setup.

## Prerequisites
- An existing deployment of an Entando App
- Use of the [NGINX ingress controller](https://docs.nginx.com/nginx-ingress-controller/). See the  [cert-manager documentation](https://cert-manager.io/docs/installation/) for other install options.

## Install cert-manager
1. Create a namespace for `cert-manager`:
``` bash
kubectl create namespace cert-manager
```

2. Follow the install instructions to create the `cert-manager` resources in this namespace. The install can be as simple as the following command if the default configuration is acceptable: 
``` bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml -n cert-manager
```

## Prepare an Issuer
An [Issuer](https://cert-manager.io/docs/concepts/issuer) defines **how** `cert-manager` will request TLS certificates. Issuers can be either specific to a single namespace or provided as a cluster-wide `ClusterIssuer`. The following steps are for a cluster-wide configuration using the [Let's Encrypt](https://letsencrypt.org/) automated certificate authority.

1. Create a file `letsencrypt-prod-cluster.yaml` with the following content:
``` yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod-cluster
spec:
  acme:
    # The ACME server URL
    server: https://acme-v02.api.letsencrypt.org/directory
    # Email address used for ACME registration
    email: YOUR-EMAIL-ADDRESS
    # Name of a secret used to store the ACME account private key
    privateKeySecretRef:
      name: letsencrypt-prod
    # Enable the HTTP-01 challenge provider
    solvers:
      - http01:
          ingress:
            ingressClassName: nginx
```
> ACME stands for Automatic Certificate Management Environment which is the protocol used by `Let's Encrypt` and `cert-manager`.

2. Replace `YOUR-EMAIL-ADDRESS` with your own email. This will be used by `Let's Encrypt` for certification expiration and update notifications.

3. (Optional) Change the issuer name from `letsencrypt-prod-cluster` to your preferred name. The name is needed when creating the `Certificate` resource below.

4. Create the `ClusterIssuer`:
``` bash
kubectl apply -f letsencrypt-prod-cluster.yaml 
```
> If a namespace-level Issuer is used then include the namespace parameter in the command. The preceding resource definition and following command should also be changed from `clusterissuer` to `issuer`.

5. Confirm the status of the `ClusterIssuer`:
``` bash
kubectl describe clusterissuer letsencrypt-prod-cluster
```
If the account and configuration is correct, you should see this message in the Status section:
```
The ACME account was registered with the ACME server
```

## Enable cert-manager to generate certificates
The simplest way to have `cert-manager` generate certificates is by creating a `Certificate` resource.

1. Create `certificate.yaml` with the following content:
``` yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: entando-tls-secret
spec:
  secretName: entando-tls-secret
  issuerRef:
    group: cert-manager.io
    kind: ClusterIssuer
    name: letsencrypt-prod-cluster
  dnsNames:
  - YOUR-HOSTNAME
  usages:
  - digital signature
  - key encipherment
```

2. Set `YOUR-HOSTNAME` to match your environment. Update `issuerRef:name` to use the issuer name from above.
3. Create the certificate:
``` bash
kubectl apply -f certificate.yaml -n YOUR-NAMESPACE
```
> It may take a few minutes for `cert-manager` to generate the certificate and configure the new secret.

4.  Confirm the secret was created:
``` bash
kubectl describe secret/entando-tls-secret -n YOUR-NAMESPACE
```

## Activate TLS in the Entando App
Configure the Entando Application to use TLS now that the new secret is available.

1. Edit the `entando-operator-config` ConfigMap and set the following property:
``` yaml
data:
  entando.tls.secret.name: entando-tls-secret
```
> *Tip:* For a new Entando installation, the following steps (steps 2+) can be skipped. The operator will apply the TLS changes as part of the regular install process.

2. Two environment variables need to be updated when switching from a non-TLS configuration to a TLS configuration. Edit the `EntandoApp` custom resource and add the following environment variables with the correct values:
``` yaml
  environmentVariables: 
    - name: KEYCLOAK_AUTH_URL
      value: https://YOUR-HOST-NAME/auth
    - name: SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI
      value: https://YOUR-HOST-NAME/auth/realms/entando
```

3. Also add the following annotation:
``` yaml 
metadata:
   annotations: 
      entando.org/processing-instruction: force
```   

5. Save the changes to the `EntandoApp` resource. The `EntandoApp` phase should change to `requested` then `started` as the Entando Operator proceeds to update the application.

6. Confirm the application is using TLS once the EntandoApp is updated and the deployments have restarted.


## `cert-manager` References
- [Installation](https://cert-manager.io/docs/installation/)
- [Supported releases](https://cert-manager.io/docs/installation/supported-releases/)