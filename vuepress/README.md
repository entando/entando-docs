# Entando Docs (Vuepress)

## Project setup
```
yarn install
```

### To check internal links in markdown files
```
yarn docs:check-md
```

### To view docs locally
```
yarn docs:dev
```

### Compiles and generates output files in `.vuepress/dist`
```
yarn docs:build
```

### Upgrading dependencies via yarn
```
yarn upgrade MODULE-NAME@MODULE-VERSION
```
Test the custom components (copy code, redirects, version links in left nav, landing pages for jhipster/openshift) and plugins (versioned nav links) following an upgrade of Vuepress or dependencies. Deploying to staging and testing there is also a good idea.

## Contributing
All the docs are markdown files. To add a new documentation file, create a folder in `docs`, then create a markdown file (i.e. `README.md`) in it. Or, you can just add it to an existing related folder.

### Sidebar Configuration
After creating a documentation file, it can then be added to the sidebar. To add it, modify `themeConfig.sidebar` in `docs/.vuepress/config.js`. Each folder in `docs` corresponds to a sidebar element, and the markdown files correspond to the element's `children`. For example, the sidebar config for the `docs/blueprint` folder looks like:

```js
  {
    title: 'Blueprint',
    children: [
        '/blueprint/create-plugin-blueprint'
    ]
  }
```

The `children` elements should match the markdown files names, except when it's named `README.md`, which corresponds to the folder name with a trailing slash (i.e. `/blueprint/`).

For more details regarding vuepress theme configuration: https://vuepress.vuejs.org/theme/default-theme-config.html

### Step by Step Guide
As an example, we'll be adding 2 related documentation files, named `README` and `installing-sample-plugin`.

1. Create the folder `docs/sample-plugin`.
2. Create the files `README.md` and `installing-sample-plugin.md` in `docs/sample-plugin`.
3. Open `docs/.vuepress/config.js` and add this to the `sidebar` array:
```js
  {
    title: 'Sample Plugin',
    path: '/sample-plugin/',
    children: [
      '/sample-plugin/',
      '/sample-plugin/installing-sample-plugin'
    ]
  }
```
4. Save it then run `yarn docs:dev` to view the docs in your browser (defaults to `localhost:8080`).
5. Build and generate the output html and assets by running `yarn docs:build`. It generates the files in `docs/.vuepress/dist/`, which is the one that's going to be deployed to a server.

### Versions
We have a simple versioning system in place currently. Creating a new version involves the following steps:
1. Copy the `/vuepress/docs/next` directory (and contents) to a new version (e.g. `v6.x`).
   1. Remove any frontmatter redirectFrom attributes under the new `v6.x` that redirect from old /next paths
   2. Modify the top-level pages to remove the warnings, e.g. `v6.x/docs/README.md` and `v6.x/tutorials/README.md` 
1. Copy the `.vuepress/next.js` navigation file to the new version `.vuepress/v6.x`
1. Modify `.vuepress/config.js` 
   1. Add the `require` statement at the top for the new navigation file
   1. Add the new version to `extraWatchFiles`
   2. Add the new version to the menu under `themeConfig.nav.items`
   3. Add sidebars for the new version under `themeConfig.sidebar`
1. Modify Getting Started guide (top-level page, docs/getting-started and quick reference) to update references to jhipster, etc. to point to the appropriate build or package versions.
1. Search for `/next` and `/v6.(x-1)` references in the new v6.x docs. If common practices have been followed, all docs should be using relative references so this should result in no additional changes. Please note that custom-resources.md has multiple absolute and relative links that should be checked with any version updates.
1. At launch time
   1. Update config.js:entando.version to point to the new active version. This is used by the left-nav version navigation.
   2. Update the data properties in `SpecialLayout.vue` to point to the new active version of `Docs` and `Tutorials
   3. Modify the 3 manual redirect pages under `docs`, `docs/getting-started` and `tutorials` to point to the new active version 
1. Run `yarn docs:check-md` to check for broken links.

### Publishing
We have two utility scripts used to publish the docs to staging and publishing, `vuepress/deploy-staging.sh` and `vuepress/deploy-prod.sh`, respectively. 
   - `deploy-staging.sh` sends files to a Github Pages site available at <https://entando.github.io/entando-docs/> and the script runs with no commands. You should notify the team via slack when updating staging.
   - `deploy-prod.sh` sends files to a Github Pages site available at <https://developer.entando.com> and the script runs with two commands - the target branch and a comment which should include the list of ticket numbers included in the publish.
   - Both scripts use a Vuepress-typical force-push. You'll need privileges on the corresponding repository and/or branch to complete the publish.
   - After running `deploy-prod.sh` you should tag the current commit with the current date. This will make it easier to rollback to a previous publish if there are issues. 

### Tips
* Run `yarn docs:check-md` before submitting a PR. This will verify internal links are functional.
  -  For a more complete link check consider running a full link checker scan (e.g. via deadlinkchecker.com) against staging or prod. This has been done for major docs releases.
* When referencing a single file, please use `.md` rather than `.html`, per Vuepress guidelines.
* Internal links should use relative paths, e.g. `./getting-started/` rather than 
`/v6.2/docs/getting-started/`. This simplifies creating a new version of the documents by copying the current version's docs and tutorials into a new directory.
* If you rename an existing file, please consider adding a frontmatter redirect so old links continue to work, courtesy <https://github.com/ttskch/vuepress-plugin-redirect-frontmatter>
```
---
redirectFrom: /old-permalink
---
```
* Run `yarn docs:syncNext` to sync `docs/next` to `docs/v6.3` and avoid manually copying more files than needed. This uses rsync and you'll need to compare the differences, especially for top-level files, to make sure no post-6.x changes get synced into the 6.x version. You can accomplish the same thing by directly calling rsync:
```
rsync -av --delete --exclude 'docs/README.md' --exclude 'tutorials/README.md' docs/next/ docs/v6.2/
```
 * To test the Entando docs environment after updating dependencies, check these functions on the website after staging:
    * Version pull-down menu in left navigation bar
    * Docs and Tutorials menu in header
    * Search function
    * copy feature of code blocks
