# entando-docs
Project to hold the Ascii doc formated documentation for the Entando Digital Experience platform

# Overview
* All of the Asciidoc files are in `src/main/asciidoc`
* The top level file is in docs/index.adoc and the child sections are imported from their respecitve folders

# Editing the Docs
* An Asciidoc editor is recommended. Like Atom or the IntelliJ Asciidoc plugins
* Checkout the documentation with `git clone https://github.com/entando/entando-docs`
* Open with the editor and make changes or add docs. The root of the documentation is `docs/index.adoc`

# Building the Docs
* Go to the docs folder `cd docs`
* Run  `mvn process-sources`
* Generated documentation is placed in `target/generated-docs/index.html` and `target/generated-docs/pdf/index.pdf`

# Editing Guidlines and Pull Requests

Community contributions and updates to the documentation are welcome and appreciated

* If you want to contribute to the documentation from the community
** Create a fork of the project
** Do your work on a branch named with a reasonable description
** Submit your pull request
** If your PR contains conflicts you may be requested to resolve them prior to merge

Changes that won't be merged
* Styling changes that alter the identity of the documentation
