---
sidebarDepth: 2
---

# Create a GitHub Actions Workflow From the Entando Component Generator

## Overview
With the [Entando Component Generator](../../tutorials/backend-developers/generate-microservices-and-micro-frontends.html#overview) (ECG), you can quickly create a ready-to-run Workflow file using the JHipster `ci-cd` sub-generator.

This tutorial shows how to:
1. Build a simple Continuous Integration Workflow on GitHub Actions using the ECG
2. Modify the base file to meet requirements

## Prerequisites
For this tutorial, you will need an existing project or to generate a new one with the Entando Component Generator. Your project must be hosted on a public GitHub repository to qualify for unlimited usage. Using a private repository could lead to restrictions that are not covered here.

Actions features are enabled by default without additional configuration. However, it is good practice to commit and push files remotely to validate changes.

## Start generating a GitHub Action Workflow

From your main project folder:

1. Run `npm install` if needed
2. Run the JHipster `ci-cd` subgenerator and select `GitHub Actions` (e.g. run `ent jhipster ci-cd` in the ent CLI) 
3. Deselect all `tasks/integrations` to generate the default Workflow
4. Check the YAML file content on `.github/workflows/github-ci.yml`

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

- Below are the key and the name of the Job, respectively:
``` yaml
 pipeline
   name: ci pipeline
```
The key can be reused in the file as a reference, while the UI displays the Job using the name. By default, the name is defined as the key. For convenience, rename it to `backend`.

- The Workflow is triggered each time a new commit is added or when a pull request is open:
``` yaml
on: [push, pull_request]
```
However, you can [customize the triggering events](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows). 

- Remove the statement below to ensure the Workflow is not skipped:
``` yaml
 if: "!contains(github.event.head_commit.message, '[ci skip]') &&  
 !contains(github.event.head_commit.message, '[skip ci]') && 
 !contains(github.event.pull_request.title, '[skip ci]') && 
 !contains(github.event.pull_request.title, '[ci skip]')"
```
GitHub [recently announced](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/) a baseline feature where the Workflow is skipped if the pull request title or latest commit message contains either `skip ci` or `ci skip`.

- To avoid conflicts when starting any other MySQL database (e.g. through containers), use the action below to stop the MySQL server pre-installed on the Ubuntu runners:
``` yaml
name: Stop MySQL server 
```


## Configure micro frontends

### Prerequisites
For this part of the tutorial, you will need the code for both the backend and the micro frontends. The micro frontends can be generated with the ECG or created manually.

### Start defining a new Job

To create a Job definition specific to a micro frontend:
1. Add a new entry with the same indentation as the previous Job (e.g `pipeline` or `backend` from the last section)
2. Define the name (e.g. `microfrontends`)
3. Define the runner using the `runs-on` property (e.g. `ubuntu-latest`)
4. Checkout the project and install npm 
5. From your micro frontend root folder, install dependencies and run the tests:
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

The final Job definition looks like this:
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

### Matrix strategy for multiple MFE Job

If you have multiple micro frontends located in the source project, you can use a matrix strategy to define multiple Jobs and avoid repeating definitions. 

Building on the previous example:
1. Insert a `strategy` definition after the `runs-on` property. Please note we are disabling the fail-fast option to allow all the Jobs to run, even if one fails.
``` yaml
strategy:
 fail-fast: false
```
2. Because all the micro frontends are located in the same root folder, you can define your matrix with the MFE names and build paths
``` yaml
matrix:
 mfe:
   - my-mfe-1
   - my-mfe-2
```

The final Job should look like this:
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

Below is the complete Workflow file:

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

