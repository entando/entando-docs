---
sidebarDepth: 2
---

# TLS Configuration 

## Overview

This tutorial provides instructions to configure Transport Layer Security (TLS) certificates for Entando 6.3.x.

::: warning
Preserve correct indentation in all YAML files to avoid syntax errors.
:::

## TLS Certificate Creation

### Prerequisites

1. Clone the repository `entando-helm-quickstart`

```
git clone https://github.com/entando-k8s/entando-helm-quickstart
```

2. Checkout the proper version tag

```
git checkout -b v6.3.2 v6.3.2
```

### Create the TLS Kubernetes Secret

1. Open the sample TLS file

```
your-reditor sample-secrets/sample-tls-secret.yaml
```

2. Assign an appropriate Secret name

```
metadata:
  name: {the-secret-name}
```

3. Set the certificate under:

```
apiVersion: v1
stringData:
  tls.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
{...}
```

4. Set the private key under:

```
apiVersion: v1
stringData:
{...}
  tls.key: |-
    -----BEGIN RSA PRIVATE KEY-----
    {...}
    -----END RSA PRIVATE KEY-----
```

5. Apply the Secret

```
kubectl apply -f sample-secrets/sample-tls-secret.yaml -n {YOUR-NAMESPACE}
```

### Create the CA Kubernetes Secret

::: tip
This action is only required if you are using self-signed certificates or for some other reason the root CA cert of you certificate is not present if the trust store of the Entando Images.
:::

