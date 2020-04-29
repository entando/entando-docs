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
