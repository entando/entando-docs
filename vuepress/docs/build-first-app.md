## Getting Started

First, let's see what comes out of the box.

``` bash
sudo kubectl get pods -n entando
```

``` shell-session
NAME                                                 READY   STATUS      RESTARTS   AGE
quickstart-composite-app-deployer-6hhfdgr3wv         1/1     Running     0          47m
quickstart-operator-65c58857cb-mcjlt                 1/1     Running     0          48m
quickstart-kc-db-deployment-77f6bc5fb5-tgl47         1/1     Running     0          46m
quickstart-kc-db-preparation-job-b36bd89a-e          0/1     Completed   0          44m
quickstart-kc-server-deployment-58467568b4-rfz5l     1/1     Running     0          44m
quickstart-kc-deployer-wzqwd2e9yq                    0/1     Completed   0          46m
quickstart-eci-k8s-svc-deployment-57545f665c-7hlx7   1/1     Running     0          38m
quickstart-eci-deployer-md0viurw2z                   0/1     Completed   0          38m
quickstart-db-deployment-75d9c9c8bf-dj975            1/1     Running     0          35m
quickstart-db-preparation-job-7de62e75-4             0/1     Completed   0          35m
quickstart-server-deployment-c796c7f8-gfv5l          3/3     Running     0          27m
quickstart-deployer-xocwyq5jbq                       0/1     Completed   0          35m
quickstart-pda-db-deployment-7f45b69789-vp8pc        1/1     Running     0          22m
quickstart-pda-db-preparation-job-64fbecb1-e         0/1     Completed   0          20m
quickstart-pda-server-deployment-6b4685459-t5vgf     2/2     Running     0          19m
quickstart-pda-deployer-tuye2ew301                   0/1     Completed   0          22m
quickstart-pda-apl-deployer-ypxcaw7nmp               1/1     Running     0          16m
```

### Access Entando Servers

Next, let's check out our Ingresses to get the URLs for our server deployments

``` bash
sudo kubectl describe ingress -n entando
```

``` shell-session
Name:             quickstart-kc-ingress
Namespace:        entando
Address:          192.168.64.33
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host                                        Path  Backends
  ----                                        ----  --------
  quickstart-kc-entando.192.168.64.33.nip.io
                                              /auth   quickstart-kc-server-service:8080 (10.42.0.14:8080)
```

The Ingresses provide the `Host` and `Path` to access our servers.

### Identity Management

1. Navigate to Keycloak in your browser

``` shell-session
  Host                                        Path  Backends
  ----                                        ----  --------
  quickstart-kc-entando.192.168.64.33.nip.io
                                              /auth   quickstart-kc-server-service:8080 (10.42.0.14:8080)
```

Example: http://quickstart-kc-entando.192.168.64.33.nip.io/auth/

Replace the first part of the URL with your `Host`

2. Next, get the Kubernetes `Secret` to get the login and password.

``` bash
sudo kubectl get secrets -n entando
```

We're interested in the `keycloak-admin-secret`:

``` shell-session
NAME                                                 TYPE                                  DATA   AGE
quickstart-kc-db-admin-secret                        Opaque                                2      78m
quickstart-kc-db-secret                              Opaque                                2      76m
quickstart-kc-admin-secret                           Opaque                                2      76m
quickstart-kc-realm                                  Opaque                                1      76m
keycloak-admin-secret                                Opaque                                3      70m
```

3. Decode the secret

``` bash
sudo kubectl get secret keycloak-admin-secret -n entando -o go-template=\
"{{println}}Username: {{.data.username | base64decode}}{{println}}Password: {{.data.password | base64decode}}{{println}}{{println}}"
```

``` shell-session
Username: entando_keycloak_admin
Password: MZ8bY4phMd
```

4. In your Keycloak browser, click `Administration Console`

Enter the Username and Password from your shell

#### Configure Client Roles

In this step, we'll configure the required Client Roles to give our user permission to access our pods

1. Click `Users` in the left sidebar

2. Click `View all users`

3. Click on the link next to the `admin` user to select the user

4. Click the `Role Mappings` tab

5. Under the `Client Roles` dropdown:

- Select `quickstart-pda-server`: Add all `Available Roles` to `Assigned Roles`
- Select `quickstart-pda-sidecar`: Add all `Available Roles` to `Assigned Roles`
- Select `quickstart-server`: Add all `Available Roles` to `Assigned Roles`

Your changes are saved automatically

### Entando App Builder

1. Navigate to the Entando App Builder in your browser

``` bash
sudo kubectl describe ingress -n entando
```

``` shell-session
Name:             quickstart-ingress
Namespace:        entando
Address:          192.168.64.33
Default backend:  default-http-backend:80 (<none>)
Rules:
  Host                                     Path  Backends
  ----                                     ----  --------
  quickstart-entando.192.168.64.33.nip.io
                                           /entando-de-app     quickstart-server-service:8080 (10.42.0.22:8080)
                                           /digital-exchange   quickstart-server-service:8083 (10.42.0.22:8083)
                                           /app-builder/       quickstart-server-service:8081 (10.42.0.22:8081)
                                           /pda                quickstart-pda-server-service:8081 (10.42.0.28:8081)
```

Example: http://quickstart-entando.192.168.64.33.nip.io/app-builder/

Replace the first part of the URL with your `Host`

2. Log in to Entando

- Username: admin
- Password: adminadmin

After log in, Entando will ask you to change your password to activate your account

#### What's next?

The App Builder is where you'll be able to compose your micro frontends alongside your CMS pages and content. Take a look at our docs to learn more about how to create micro frontends, add them to a page, and add CMS content.

[Create a Micro Frontend](http://docs.entando.com/#_tutorial_create_a_react_micro_frontend_widget)

[Add Micro Frontends to Your Pages with Entando CMS](http://docs.entando.com/#_publish_a_content_in_your_application_page_tutorial)

### Process Driven Applications

1. Click on `Go to Homepage` at the upper right hand side of your screen

This will open up the process driven application widgets

2. Click on `Connections` in the left sidebar

3. Click `Create new connection`

- Name: staging
- Engine: pam
- Connection URL: http://rhpam7-install-kieserver-rhpam7-install-entando.apps.serv.run/services/rest/server
- Username: pamAdmin
- Password: redhatpam1!
- Timeout: 60000

Next, we'll need to configure each widget to use the new `Connection` you created

#### Configure Smart Inbox Screen

1. Navigate to the Entando App Builder tab

2. Click the `Page Designer` tab at the upper left

3. Click `Page Tree`

4. Next to `PDA Smart Inbox`, click on the `Actions` menu > Click `Configure`

5. In the `PDA - Task List` widget, click on the settings menu at the upper right of the widget > Click `Settings`

6. Under `Knowledge Source` select the connection you created `staging`

- Scroll to the bottom of the screen, and click `Save`

7. Repeat the same steps for `PDA - Task Details`, `PDA - Task Comments`, and `PDA - Task Attachments`

8. Finally, navigate back to the PDA Home Page tab, click `Smart Inbox` on the left sidebar, and you'll be able to see the Smart Inbox, and the corresponding Task Details, Task Notes, and Attachments when you click on a task in the inbox.

#### Configure Dashboard

1. Repeat the same steps to enable access to the dashboard.

Navigate to Entando App Builder > Page Designer > Page Tree > PDA Dashboard > Configure

2. Configure the `PDA - Summary Card` and `PDA Overtime Graph` widgets to use the connection you created and under `Data Type` select `Requests`

3. After navigating back to the PDA Home Page tab, you can now see the Summary Card widgets
