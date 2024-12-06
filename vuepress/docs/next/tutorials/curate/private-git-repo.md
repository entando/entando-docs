---
sidebarDebth: 2
---


# Install Bundles from a Private Git Repository

## Overview
The standard deployment of Entando assumes that bundles are checked out from a public Git or Docker repository. Public repositories do not require user authentication, but a private key is required if repository access is limited to specific user accounts. This tutorial describes how to grant access to a private Git repository from Entando.

For more background information please consult:
1. [Entando custom resource reference](../../docs/reference/custom-resources.md)
2. [Local Hub overview](../../docs/compose/local-hub-overview.md)

## Using SSH keys with Git
Entando supports connecting to Git repositories with SSH keys. While SSH Git URLs are accepted, HTTPS Git URLs are not. For the private key to work correctly, the SSH syntax of `git@github.com:THE-REPO-OWNER-NAME/THE-REPO-NAME.git` must be used (the HTTPS syntax of `https://github.com/THE-REPO-OWNER-NAME/THE-REPO-NAME.git` is not permitted).

Using the SSH method, a developer can generate a public/private key pair, then register the public key with the Git server while securely storing the private key locally. An operation requiring authentication will trigger the Git command line utility to perform a search and compare between the private and public keys. If the two keys match, the operation is allowed to complete.

Entando allows a Kubernetes Secret containing a Git SSH private key to be mounted in the container hosting the Entando Component Manager service. This container is deployed with the EntandoApp and can be configured from the EntandoApp Custom Resource. To prepare a Secret, first generate the key pair locally using a Docker image, then create the Secret from the directory where the key pair was generated.

## Tutorial
Below is the recommended flow on Linux.

1. Navigate to a local folder where you intend to create the Secret.

2. Generate the SSH key pair from the known SSH client Docker image.

    1. Run the Docker container in interactive mode and mount the default user SSH directory to a local directory:

         ```
         docker run -it -v $PWD/entando_ssh:/root/.ssh kroniak/ssh-client /bin/bash 
         ```

    2. Generate the key pair from the shell of the resulting container:

        ```
        ssh-keygen
        ```

        Select all of the default options, e.g. no passphrase, etc.

    3. Attempt to add the fingerprint to the known_hosts file by connecting to your Git server and responding "yes" to the prompt:

        ```
        ssh git@github.com
        ```

        This command is expected to fail.

    4. Run `exit`

3. Create the Secret. Back in the local operating system's shell, navigate to the directory that was mounted using Docker. Then give yourself access to this folder and create the Secret:

    1. Change the folder permissions:
    
        ```
        sudo chmod ag+r entando_ssh -R
        ```
        
    2. Create a Secret from the directory:
    
        ```
        kubectl create secret generic my-git-secret --from-file=entando_ssh -n <<your-namespace>>
        ```
        
    3. Confirm that the Secret exists and has at least two keys: `known_hosts` and `id_rsa`. Without these two keys, Entando cannot log into Git.
        
        ```
        kubectl get secret my-git-secret -n <<your-namespace>> -o yaml
        ```

4. Link the resulting private key to the account of a user who has access to the applicable Git repositories. Ideally,
this should be a dedicated service account with restricted read only access. For GitHub
accounts, you can follow the [official GitHub instructions.](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
When prompted, provide the public key that was generated in the `entando_ssh/id_rsa.pub` directory.   

5. Modify the EntandoApp resource you are deploying to configure the Secret using the `spec.ecrGitSshSecretName` property.
```   
      kind: "EntandoApp"
      metadata:
        annotations: {}
        labels: {}
        name: "quickstart"
      spec:
        dbms: none
        replicas: 1
        ecrGitSshSecretName: my-git-secret
        standardServerImage: tomcat
        ingressPath: /entando-de-app
        ingressHostName: ampie.apps.serv.run
        environmentVariables:
          - name: SPRING_PROFILES_ACTIVE
            value: "default,swagger"
```
