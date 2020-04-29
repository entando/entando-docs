# Entando Docs (Vuepress)

## Project setup
```
yarn install
```

### To view docs locally
```
yarn docs:dev
```

### Compiles and generates output files in `.vuepress/dist`
```
yarn docs:build
```

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
