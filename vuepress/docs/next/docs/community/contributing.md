
# Contributing to Entando

There are many ways to contribute to Entando including participating in the [Entando Forum](https://forum.entando.org), opening issues on GitHub, [updating documentation](https://github.com/entando/entando-docs/tree/master/vuepress), building bundles using the [Entando Component Repository](../ecr/ecr-overview.md), and contributing directly to the source.

## Contributing to the Source

Entando welcomes contributions to our source code repositories. This is a brief overview of how to create a pull request for an Entando repository.

If you're new to forks in the git world checkout this guide [Working with Forks](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks)

1. Find the repository you want to edit on the Entando GitHub
    *  <https://github.com/entando>
    *  <https://github.com/entando-k8s>
2. Create a fork of the repository you want to update
3. Make your changes or updates on your fork. We recommend making your changes on a branch so that you can update your commits as needed before creating your PR
4. Submit a PR against the master branch of the repository you're working against. If you're fixing a specific issue reference that issue number in the notes and linked issues
5. Watch the automated builds to make sure everything passes
6. The Entando team will merge your changes!


# Code Style and Formatting
Most Entando repositories enforce code style rules. References and setup for the main
source types are provided below.

## Java
Java rules are based on checkstyle and PMD can be found at in the [entando-code-style](
https://github.com/entando/entando-code-style) project. There are configuration files for Intellij, Eclipse, and Netbeans for automated formatting.

## Javascript

Code style and formatting rules for all Entando javascript projects are enforced by linters in every project. For a reference example see: .sass-lint.yml and .eslintrc.js in the [App builder](https://github.com/entando/app-builder)

In the future these rules will be replaced by Prettier.

# Find the Code

Entando source can be found on GitHub in the following organizations.
* <https://github.com/entando>
* <https://github.com/entando-k8s>

For an overview of the key projects in both GitHub organizations and their role in the architecture see [Entando Deployment Structure](../reference/deployment-structure.md)
