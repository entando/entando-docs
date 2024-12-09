(window.webpackJsonp=window.webpackJsonp||[]).push([[555],{1759:function(e,t,a){"use strict";a.r(t);var o=a(36),n=Object(o.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"install-bundles-from-a-private-git-repository"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-bundles-from-a-private-git-repository"}},[e._v("#")]),e._v(" Install Bundles from a Private Git Repository")]),e._v(" "),a("h2",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("The standard deployment of the Entando Component Repository (ECR) assumes that bundles are checked out from public Git repositories. Public repositories do not require user authentication, but if a customer chooses to limit repository access to specific Git accounts, a private key is required. This document details how to allow the ECR to access a private Git repository.")]),e._v(" "),a("p",[e._v("For more background information please consult")]),e._v(" "),a("ol",[a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/docs/consume/custom-resources.html"}},[e._v("Entando custom resource reference")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/v6.3.2/docs/compose/ecr-overview.html"}},[e._v("Entando Component Repository overview")])],1)]),e._v(" "),a("h2",{attrs:{id:"using-ssh-keys-with-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-ssh-keys-with-git"}},[e._v("#")]),e._v(" Using SSH keys with Git")]),e._v(" "),a("p",[e._v("Entando supports connecting to Git repositories with SSH keys. While SSH Git URLs are accepted, HTTPS git URLs are not. For the private key to work correctly, the SSH syntax of "),a("code",[e._v("git@github.com:THE-REPO-OWNER-NAME/THE-REPO-NAME.git")]),e._v(" must be used (the HTTPS syntax of "),a("code",[e._v("https://github.com/THE-REPO-OWNER-NAME/THE-REPO-NAME.git")]),e._v(" is not permitted).")]),e._v(" "),a("p",[e._v("Using the SSH method a developer can generate a public/private keypair, then register the public key with the Git server while securely storing the private key locally. An operation requiring authentication will trigger the Git command line utility to perform a search and compare between the local private key and the public key provided by the server. If the two keys are identical, the operation is allowed to complete.")]),e._v(" "),a("p",[e._v("Entando allows a Kubernetes Secret containing a Git SSH private key to be mounted in the container hosting the Entando Component Manager service. This container is deployed with the EntandoApp and can be configured from the EntandoApp Custom Resource. To prepare a Secret, first generate the keypair locally using a Docker image, then create the Secret from the directory where the keypair was generated.")]),e._v(" "),a("h2",{attrs:{id:"tutorial"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tutorial"}},[e._v("#")]),e._v(" Tutorial")]),e._v(" "),a("p",[e._v("Below is the recommended flow on Linux.")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Navigate to a local folder where you intend to create the Secret")])]),e._v(" "),a("li",[a("p",[e._v("Generate the SSH keypair from the known SSH client Docker image")]),e._v(" "),a("ol",[a("li",[a("p",[e._v("Run the Docker container in interactive mode and mount the default user SSH directory to a local directory")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("docker run -it -v $PWD/entando_ssh:/root/.ssh kroniak/ssh-client /bin/bash \n")])])])]),e._v(" "),a("li",[a("p",[e._v("Generate the keypair from the shell of the resulting container")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ssh-keygen\n")])])]),a("p",[e._v("Select all of the default options, e.g. no passphrase, etc.")])]),e._v(" "),a("li",[a("p",[e._v('Attempt to add the fingerprint to the known_hosts file by connecting to your Git server and responding "yes" to the prompt')]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ssh git@github.com\n")])])]),a("p",[e._v("This command is expected to fail.")])]),e._v(" "),a("li",[a("p",[e._v("Run "),a("code",[e._v("exit")])])])])]),e._v(" "),a("li",[a("p",[e._v("Create the Secret.")])])]),e._v(" "),a("p",[e._v("You are now back in the local operating system's shell and can navigate to the directory that was mounted using Docker.")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[e._v("To give yourself access to this folder and create a Secret with the content\n\n1. Change the folder permissions\n\n    ```\n    sudo chmod ag+r entando_ssh -R\n    ```\n    \n2. Create a Secret from the directory\n\n    ```\n    kubectl create secret generic my-git-secret --from-file=entando_ssh -n <<your-namespace>>\n    ```\n    \n3. Confirm that the Secret exists and has at least two keys: known_hosts, and id_rsa. Without these two keys Entando cannot log into Git.\n    \n    ```\n    kubectl get secret my-git-secret -n <<your-namespace>> -o yaml\n    ```\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[a("p",[e._v("Link the resulting private key to the account of a user who has access to the applicable Git repositories. Ideally\nthis should be a dedicated service account user with restricted read only access. For GitHub\naccounts, you can follow the "),a("a",{attrs:{href:"https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account",target:"_blank",rel:"noopener noreferrer"}},[e._v("official GitHub instructions."),a("OutboundLink")],1),e._v("\nWhen prompted, provide the public key that was generated in the entando_ssh directory\n"),a("code",[e._v("entando_ssh/id_rsa.pub")])])]),e._v(" "),a("li",[a("p",[e._v("Modify the EntandoApp resource you are deploying to mount the Secret in the "),a("code",[e._v("spec.ecrGitSshSecretName")]),e._v(" property. Note: In Entando 6.3.2 the EntandoApp resource must be configured prior to installation.")])])]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('      kind: "EntandoApp"\n      metadata:\n        annotations: {}\n        labels: {}\n        name: "quickstart"\n      spec:\n        dbms: none\n        replicas: 1\n        ecrGitSshSecretName: my-git-secret\n        standardServerImage: wildfly\n        ingressPath: /entando-de-app\n        ingressHostName: ampie.apps.serv.run\n        environmentVariables:\n          - name: SPRING_PROFILES_ACTIVE\n            value: "default,swagger"\n')])])])])}),[],!1,null,null,null);t.default=n.exports}}]);