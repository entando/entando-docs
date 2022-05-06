---
sidebarDepth: 2
---

# Enable a Self-Signed SSL/TLS Certificate 

## Overview

Follow the steps below to configure self-signed Secure Sockets Layer (SSL) and Transport Layer Security (TLS) certificates in an Entando quickstart environment. A TLS Kubernetes Secret and Certificate Authority (CA) Kubernetes Secret are created as part of this process.

::: warning
Preserve correct indentation in all YAML files to avoid syntax errors.
:::

## SSL/TLS Certificate Creation

### Prerequisites

This tutorial relies on either a [new quickstart application](../../docs/getting-started/README.md) or [can be modified for an existing application](link to modifications). TODO: where are modification instructions?

### Step 1: Create a self-signed SSL certificate

> Note: There are various ways to create an X.509 self-signed certificate and you can follow your preferred method.

Use [OpenSSL](https://www.openssl.org/) to create a certificate for your application. Adjust the CN value in the following command to match your project.
```
openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -subj "/CN=entando.apps-crc.testing"
```
The output should appear similar to this:
```
Generating a RSA private key
.....................................................................++++
........................................................................................................................................................................................++++
writing new private key to 'tls.key'
-----
```
### Step 2: Create the TLS Kubernetes Secret

Create a TLS Secret by modifying `sample-tls-secret.yaml` with your TLS Secret and private key.

1. Open the sample TLS file: TODO: specify working directory; is "your-reditor" a placeholder?
``` bash
your-reditor sample-secrets/sample-tls-secret.yaml
```

2. Assign an appropriate TLS Secret name under `metadata`:
``` bash
metadata:
  name: YOUR-TLS-SECRET-NAME
```

3. Set your TLS certificate and private key under `stringData`:
``` bash
apiVersion: v1
stringData:
  tls.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
{...}
  tls.key: |-
    -----BEGIN RSA PRIVATE KEY-----
    {...}
    -----END RSA PRIVATE KEY-----
```

4. Apply the TLS Secret, updating the following command with your namespace:
``` bash
kubectl apply -f sample-secrets/sample-tls-secret.yaml -n YOUR-NAMESPACE
```

### Step 3: Create the CA Kubernetes Secret

Create the `entando-ca-cert-secret` Secret by modifying `sample-ca-cert-secret.yaml` . This is required for self-signed certificates or if the root certificate authority (CA) is not present in Entando's directory of trusted images.

1. Open the sample CA file: TODO: specify file location
``` bash
your-reditor sample-secrets/sample-ca-cert-secret.yaml
```

2. Assign an appropriate CA Secret name under `metadata`:
``` bash
metadata:
  name: YOUR-CA-SECRET-NAME
```

3. Set your CA certificate under `stringData`:
``` bash
apiVersion: v1
stringData:
  ca0.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
{...}
```

4. (Optional) Additional certificates can be appended to `ca0.crt` or added to new `ca.cert` keys:
``` bash
apiVersion: v1
stringData:
  ca0.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
  ca1.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
```

5. Apply the CA Secret, updating the following command with your namespace:
``` bash
kubectl apply -f sample-secrets/sample-ca-cert-secret.yaml -n YOUR-NAMESPACE
```

### Step 4: Edit the operator configuration

Modify and apply `entando-operator-config.yaml` to include the TLS and CA Secret names.

1. Open the operator configuration file: TODO: specify file location
``` bash
your-reditor sample-configmaps/entando-operator-config.yaml
```

2. Uncomment and set the TLS Secret name:
``` bash
  entando.tls.secret.name: YOUR-TLS-SECRET-NAME
```

3. Uncomment and set the CA Secret name: 
``` bash
  entando.ca.secret.name: YOUR-CA-SECRET-NAME
```

4. Apply the operator config file, updating the following command with your namespace:
``` bash
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n YOUR-NAMESPACE
```

## Apply a TLS Certificate to Ingress Routes

User-provided TLS certificates that are [standard Kubernetes TLS Secrets](https://kubernetes.io/docs/concepts/services-networking/ingress/#tls) can be associated with Entando ingress routes.

To apply a TLS certificate, edit `values.yaml`: TODO: specify directory; is `values.yaml` the file??
``` yaml
operator:
  tls:
    tlsSecretName: TLS-SECRET-NAME
```

## Trust a CA Certificate

Follow the steps below to trust a user-proved CA certificate.

1. Edit `values.yaml`: TODO: specify directory
``` yaml
operator:
  tls:
    caCertSecretName: CA-SECRET-NAME
```

2. Add the CA Secret name to (TODO: file name) using the following format:
``` yaml
apiVersion: v1
stringData:
  ca0.crt: |-
    -----BEGIN CERTIFICATE-----
    MIIC6j[...]
    -----END CERTIFICATE-----
  ca1.crt: |-
    -----BEGIN CERTIFICATE-----
    MIIFqT[...]
    -----END CERTIFICATE-----
kind: Secret
metadata:
  name: {CA-SECRET-NAME}
type: Opaque
```

> Note: (TODO: file name) does not support certificate chains. Each certificate must be assigned its own `ca<N>.crt` key, where `N` represents subsequent integer values, starting with 0. TODO: this seems to contradict the Notion instructions
##

