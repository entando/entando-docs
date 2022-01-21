---
sidebarDepth: 2
---

# Enable a Self-Signed SSL/TLS Certificate 

## Overview

Follow the steps below to configure self-signed Secure Sockets Layer (SSL) and Transport Layer Security (TLS) certificates in the Entando 6.3.x quickstart environment. A TLS Kubernetes Secret and Certificate Authority (CA) Kubernetes Secret are created as part of this process.

::: warning
Preserve correct indentation in all YAML files to avoid syntax errors.
:::

## SSL/TLS Certificate Creation

### Prerequisites

This tutorial relies on either a ***new quickstart application - link to quickstart guide*** or ***can be modified for an existing application - link to modifications***. In addition:

- Clone the repository `entando-helm-quickstart`
```
git clone https://github.com/entando-k8s/entando-helm-quickstart
```
- Checkout the appropriate version tag
```
git checkout -b v6.3.2 v6.3.2
```
### Create a Self-Signed SSL Certificate

::: tip
There are various ways to create an X.509 self-signed certificate and you can use your preferred mechanism.
:::

1. Using [OpenSSL](https://www.openssl.org/), create a certificate for your application. You'll need to adjust the CN value to match your project.
```
openssl req -nodes -x509 -newkey rsa:4096 -keyout tls.key -out tls.crt -days 365 -subj "/CN=entando.apps-crc.testing"
```
You should see output similar to this:
```
Generating a RSA private key
.....................................................................++++
........................................................................................................................................................................................++++
writing new private key to 'tls.key'
-----
```
### Create the TLS Secret

Create a TLS Secret using the generated files.

2. Open the sample TLS file:
```
your-reditor sample-secrets/sample-tls-secret.yaml
```

3. Assign an appropriate Secret name:
```
metadata:
  name: {the-secret-name}
```

4. Set your certificate here:
```
apiVersion: v1
stringData:
  tls.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
{...}
```

5. Set your private key here:
```
apiVersion: v1
stringData:
{...}
  tls.key: |-
    -----BEGIN RSA PRIVATE KEY-----
    {...}
    -----END RSA PRIVATE KEY-----
```

6. Apply the Secret:
```
kubectl apply -f sample-secrets/sample-tls-secret.yaml -n {YOUR-NAMESPACE}
```
### Create the CA Secret

Create the `entando-ca-cert-secret` Secret using the self-signed certificate.

7. Open the sample certificate authority (CA) file:
```
your-reditor sample-secrets/sample-ca-cert-secret.yaml
```

8. Assign an appropriate Secret name:
```
metadata:
  name: {the-ca-secret-name}
```

9. Set your first certificate here:
```
apiVersion: v1
stringData:
  ca0.crt: |-
    -----BEGIN CERTIFICATE-----
    {...}
    -----END CERTIFICATE-----
{...}
```

10. (Optional) You can append additional certificates to the `ca0.crt` and `ca-crt` keys:
```
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

11. Apply the Secret:
```
kubectl apply -f sample-secrets/sample-ca-cert-secret.yaml -n {YOUR-NAMESPACE}
```

### Edit the Operator Configuration

1. Open your operator configuration file, e.g.:
```
your-reditor sample-configmaps/entando-operator-config.yaml
```

2. Uncomment and set the TLS Secret name:
```
  entando.tls.secret.name: {the-secret-name}
```

3. (Optional) Uncomment and set the CA Secret name:
```
  entando.ca.secret.name: {the-ca-secret-name}
```

4. Apply the file after making modifications:
```
kubectl apply -f sample-configmaps/entando-operator-config.yaml -n {your-namespace}
```

