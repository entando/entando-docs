#!/usr/bin/env sh

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
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m $MESSAGE

# if you are deploying to https://<USERNAME>.github.io
git push git@github.com:entando/entando.documentation.github.io.git $BRANCH

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -