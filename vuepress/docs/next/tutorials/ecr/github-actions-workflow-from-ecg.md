# Create a GitHub Actions Workflow From the Entando Component Generator

## Overview
With the Entando Component Generator, you can quickly create a ready-to-run Workflow file using the JHipster `ci-cd` sub-generator.

This tutorial shows how to build your first, simple Continuous Integration Workflow on GitHub Actions using the Entando Component Generator, then modify the base file to match requirements.

## Prerequisites
To run this tutorial, you need to have an existing project or generate a new one with the [Entando Component Generator](../../tutorials/backend-developers/generate-microservices-and-micro-frontends.html#overview). Your project has to be hosted on a public GitHub repository (for unlimited usage); please note that using a private repository could lead to some restrictions we don’t cover here.

Nothing special is needed to enable the Actions features, but be sure to commit and push the file remotely each time you make a change to test it.

## Start generating a GitHub Action Workflow

From your main project folder:

1. Run the npm install command if needed: `npm install`
2. Run the JHipster CI/CD generator and select `GitHub Actions` (can be performed with the ent CLI via `ent jhipster ci-cd`) 
3. Select no tasks/integrations to generate the default Workflow 
4. Check the YAML file content on .github/workflows/github-ci.yml

``` yaml
name: Application CI
on: [ push, pull_request ]
jobs:
 pipeline:
   name: ci pipeline
   runs-on: ubuntu-latest
   if: "!contains(github.event.head_commit.message, '[ci skip]') && !contains(github.event.head_commit.message, '[skip ci]') && !contains(github.event.pull_request.title, '[skip ci]') && !contains(github.event.pull_request.title, '[ci skip]')"
   timeout-minutes: 40
   env:
     SPRING_OUTPUT_ANSI_ENABLED: DETECT
     SPRING_JPA_SHOW_SQL: false
   steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-java@v1
       with:
         java-version: '11.x'
     - name: Stop MySQL server
       run: sudo /etc/init.d/mysql stop
     - name: Run backend test
       run: |
         chmod +x mvnw
         ./mvnw -ntp clean verify
     - name: Package application
       run: ./mvnw -ntp package -Pprod -DskipTests
```

## Refine the Workflow definition

``` yaml
 pipeline
   name: ci pipeline
```
Respectively, these are the key and the name of the Job. The key can be reused in the file as a reference, while the name is used to display the Job in the UI. By default, the name is defined as the key. For convenience, rename it to `backend`.
``` yaml
on: [push, pull_request]
```
The Workflow is triggered every time a new commit is added or when a pull request is open. You can customize it to your needs by changing the [triggering events](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows). 
``` yaml
 if: "!contains(github.event.head_commit.message, '[ci skip]') &&  
 !contains(github.event.head_commit.message, '[skip ci]') && 
 !contains(github.event.pull_request.title, '[skip ci]') && 
 !contains(github.event.pull_request.title, '[ci skip]')"
```
If the pull request title or latest commit message contains either skip ci or ci skip, the Workflow is skipped, which GitHub [recently announced](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/) as a baseline feature. Remove this statement.
``` yaml
name: Stop MySQL server 
```
This action stops the MySQL server pre-installed on the Ubuntu runners to avoid conflicts when starting any other MySQL database (e.g. through containers).

## Add configuration for micro frontends

### Prerequisites
To run this part of the tutorial, you need to have the micro frontends code source available alongside your backend code. These micro frontends can be generated with the ECG or created manually.

### Start defining a new Job

To create a Job definition specific to a micro frontend:
- Add a new entry at the same indentation level as the previous Job (e.g `pipeline` or `backend` from the previous section)
- Define the name (e.g. `microfrontends`)
- Define the runner by using the `runs-on` property (e.g. `ubuntu-latest`)
- Checkout the project and install npm 
- From your micro frontend root folder install dependencies and run the tests
``` yaml
steps:
 - uses: actions/checkout@v2
 - uses: actions/setup-node@v2.1.4
   with:
     node-version: '14.15.0'
 - name: Run tests
   run: |
     cd <mfe_path>
     npm install
     npm test
```

The final Job definition looks like this
``` yaml
micro-frontends:
 name: micro frontend job
 runs-on: ubuntu-latest
 steps:
   - uses: actions/checkout@v2
   - uses: actions/setup-node@v2.1.4
     with:
       node-version: '14.15.0'
   - name: Run tests
     run: |
       cd <mfe_path>
       npm install
       npm test
```

### Use a matrix strategy for a Job with multiple micro frontends

If you have multiple micro frontends located in the source project, you can use a matrix strategy to define a bunch of Jobs and avoid repeating definitions. 

From the previous example, you need to:
- Insert a `strategy` definition after the `runs-on` property. Please note we are disabling the fail-fast option to allow all the Jobs to run, even if one fails.
``` yaml
strategy:
 fail-fast: false
```
- Because all the micro frontends are located in the same root folder, you can define your matrix with the MFE names and build paths
``` yaml
matrix:
 mfe:
   - my-mfe-1
   - my-mfe-2
```

The final Job should look like this
``` yaml
micro-frontends:
 name: ${{ matrix.mfe }} micro frontend
 runs-on: ubuntu-latest
 strategy:
   fail-fast: false
   matrix:
     mfe:
       - my-mfe-1
       - my-mfe-2
 steps:
   - uses: actions/checkout@v2
   - uses: actions/setup-node@v2.1.4
     with:
       node-version: '14.15.0'
   - name: Run tests
     run: |
       cd $GITHUB_WORKSPACE/$PROJECT_NAME/my_base_path/${{ matrix.mfe }}
       npm install
       npm run test
```

The Workflow file completed

``` yaml
name: Application CI
on: push
env:
 PROJECT_NAME: my-project
jobs:
 backend:
   runs-on: ubuntu-latest
   steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-java@v1
       with:
         java-version: '11.x'
     - name: Stop MySQL server
       run: sudo /etc/init.d/mysql stop
     - name: Run backend test
       run: |
         cd $GITHUB_WORKSPACE/$PROJECT_NAME
         chmod +x mvnw
         ./mvnw -ntp clean test
     - name: Package application
       run: |
         cd $GITHUB_WORKSPACE/$PROJECT_NAME
         ./mvnw -ntp package -Pprod -DskipTests
 micro-frontends:
   name: ${{ matrix.mfe }} micro frontend
   runs-on: ubuntu-latest
   strategy:
     fail-fast: false
     matrix:
       mfe:
         - my-mfe-1
         - my-mfe-2
   steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-node@v2.1.4
       with:
         node-version: '14.15.0'
     - name: Run tests
       run: |
         cd $GITHUB_WORKSPACE/$PROJECT_NAME/my_base_path/${{ matrix.mfe }}
         npm install
         npm run test
```


### Run the Workflow
To run and test this Workflow, commit and push the definition file to a branch in your repository. The Workflow will start according to the events defined for the `on` property (if you have available runners). Completed and in-progress Workflows can be accessed under the "Actions" tab in your repository.

