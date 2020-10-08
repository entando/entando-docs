# ECR: How to checkout Bundles from a private Git repository

The standard deployment of the Entando Component Repository assumes that bundles are checked out from public Git repositories. Public repositories do not require user authentication in order to access content inside the Git repository.

A customer may however choose to strict repository access to specific Git user accounts. This document will
describe the steps that can be followed to allow the ECR to log onto the Git server when pulling content from a
Git repository.

For more background information, please consult the folowing documentation:
1. [Entando custom resource reference](../../docs/concepts/custom-resources.md)
2. [Entando Component Repository overview](./ecr-overview.md)

## Using SSH keys with Git
Entando supports SSH keys to connect to Git repositories. Following the SSH approach, a developer that 
connects to Git would typically generate a public/private keypair. The developer would then register the public
key with the Git server, whilst storing the private key securely in the local filesystem. When the Git command line
utility executes an operation that requires an authenticated user, it will automatically look for the private
key locally and match it with the public key provided by the server. If the two match up, then the operation is allowed
to complete.

Entando currently allows a Kubernetes Secret containing a Git SSH private key to be mounted in the container that hosts 
the Entando Component Manager service. This container is deployed with the EntandoApp and can therefore be configured
from the EntandoApp custom resource. The best approach to prepare such a secret is by generating the keypair on 
your local machine using a Docker image, and creating a Secret from the directory the keypair was generated in.

This is the recommended flow on Linux:

1. Navigate to a folder in your operating system that you would like to create the Secret from

2. Generate the SSH keypair from the known SSH client docker image:

    1. Run the Docker container in interactive mode, mounting the default user ssh directory to a local directory

         ```
         docker run -it -v $PWD/entando_ssh:/root/.ssh kroniak/ssh-client /bin/bash 
         ```

    2. On the shell of the resulting container, generate your own keypair

        ```
        ssh-keygen
        ```

        Select all the default options, e.g. no passphrase, etc.

    3. Add the fingerprint to the known_hosts file by attempting to connect to your git server:

        ```
        ssh git@github.com
        ```

        When prompted to add it to the known hosts, type 'yes'. The command can be expected to fail and that is OK.

    4. Run `exit`

3. Create the Secret. You are now back in your local operating system's shell. You will notice that a new directory has been created due
    to the previous mount that was setup in the Docker command. You may need to give yourself access to this folder before
    you can create a Secret with the content of this folder:

    1. Change the permissions on the folder:
    
        ```
        sudo chmod ag+r entando_ssh -R
        ```
        
    2. Create a secret from the directory:
    
        ```
        kubectl create secret generic my-git-secret --from-file=entando_ssh -n <<your-namespace>>
        ```
        
    3. Confirm that the secret exists and has at least two keys: known_hosts, and id_rsa. Without these two keys in the 
        Secret, Entando cannot log into Git.
        
        ```
        kubectl get secret my-git-secret -n <<your-namespace>> -o yaml
        ```

4. Link the resulting private key to the account of a user that has access to the Git repositories in question. Ideally
this should be a dedicated service account user with restricted read only access to the repositories in question. For Github
accounts, you can follow the official Github instructions: 
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account
Where you are prompted for the content of the public key, please use the one generated in the previously created
entando_ssh directory:
```entando_ssh/id_rsa.pub```   

5. Now modify the EntandoApp resource you are deploying to mount the previously created Secret in the 
`spec.ecrGitSshSecretName` property:
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
        standardServerImage: wildfly
        ingressPath: /entando-de-app
        ingressHostName: ampie.apps.serv.run
        parameters:
          SPRING_PROFILES_ACTIVE: "default,swagger"
```
