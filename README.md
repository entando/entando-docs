# Entando-docs
Project to hold the Ascii doc formated documentation for the Entando Digital Experience platform

# Overview
* All of the Asciidoc files are in `src/main/asciidoc`
* The top level file is in docs/index.adoc and the child sections are imported from their respecitve folders

# Editing the Docs
* An Asciidoc editor is recommended. Like Atom or the IntelliJ Asciidoc plugins
* Checkout the documentation with `git clone https://github.com/entando/entando-docs`
* Open with the editor and make changes or add docs. The root of the documentation is `docs/index.adoc`
* Building the docs requires an installation of the asciidoctor tool

# Building the Docs
* Go to the asciidoc folder `cd entando-docs/docs/src/main/asciidoc`
* Run  `asciidoctor index.adoc `
* Generated documentation is placed in `index.html`

# Styling the Docs
* Go to the stylesheets folder `cd entando-docs/docs/src/main/asciidoc/stylesheets/`
* Edit file  `menuoverride.css ` to add or override default css styling

Keep in mind that Fontawesome v.5.3.1 has be added to the project so changing menu icons is fairly easy

 * Go to the asciidoc folder `cd entando-docs/docs/src/main/asciidoc/js/headScript.js`
 * In order to change icons locate `expandButtonText` and `collapseButtonText` variables in  `headScript.js`. Icons can be also entirely removed and text or images can be used to replace them.

# Managing inclusions 

Inclusion are to be set in `index-docinfo.html ` file and its reference must be added to `index.adoc` file.
Check the file for further reference on how to use it

* Go to the asciidoc folder `cd entando-docs/docs/src/main/asciidoc/index-docinfo.html`
* Edit file  `index-docinfo.html ` to change files inclusions ( css , js)

Either project belonging files or external references can be freely added.

For further reference check https://asciidoctor.org/docs/user-manual/#docinfo-file

# Editing Guidelines and Pull Requests

Community contributions and updates to the documentation are welcome and appreciated

* If you want to contribute to the documentation from the community

  * Create a fork of the project
  * Do your work on a branch named with a reasonable description
  * Submit your pull request
  * If your PR contains conflicts you may be requested to resolve them prior to merge

Changes that won't be merged
* Styling changes that alter the identity of the documentation
