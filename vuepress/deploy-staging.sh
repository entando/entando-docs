#!/usr/bin/env sh

# abort on errors
set -e

# Update the base URL for the staging site. Have to include the Vuepress theme setting but also the path for any files
# referenced by custom layouts which don't use that setting.
sed -i "s/base: '\/'/base: '\/entando-docs\/'/g" docs/.vuepress/config.js
sed -i "s/'\//'\/entando-docs\//g" docs/.vuepress/components/css/main.css
sed -i "s/=\"\//=\"\/entando-docs\//g" docs/.vuepress/components/SpecialLayout.vue
sed -i "s/'\//'\/entando-docs\//g" docs/.vuepress/styles/index.styl

# build
npm run docs:build

# Restore the original versions of the staged files before continuing
git restore docs/.vuepress/config.js
git restore docs/.vuepress/components/css/main.css
git restore docs/.vuepress/components/SpecialLayout.vue
git restore docs/.vuepress/styles/index.styl

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
#git push -f git@github.com:es-entando/es-entando.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# Publish to Staging site at https://entando.github.io/entando-docs/
git push -f git@github.com:entando/entando-docs.git master:gh-pages

cd -