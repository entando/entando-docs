#!/usr/bin/env sh

# For now we are using the Vuepress standard force commit model to push code to entando.documentation.github.io. Ideally
# we'd like to improve this to avoid manual steps and to allow easy rollbacks in case of content issues.

# Basic usage: ./deploy-prod.sh main "ENDOC-XYZ updating abc"

BRANCH=$1
MESSAGE=$2
echo "Target branch: ${BRANCH:?Need to specify the target branch}"
echo "Commit message: ${MESSAGE:?Need to specify the commit message}"

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'developer.entando.com' > CNAME

git init
git add -A
git commit -m "$MESSAGE"

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:entando/entando.documentation.github.io.git HEAD:$BRANCH

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git main:gh-pages

cd -