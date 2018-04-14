# entando-docs
Project to hold the Ascii doc formated documentation for the Entando Digital Experience platform

# Overview
* All of the Asciidoc files are in `src/main/asciidoc`
* The top level file is index.adoc and the child sections are imported from their respecitve folders

# Building the Docs
* Go to the docs folder `cd docs`
* Run  `mvn process-sources`
* Generated documentation is placed in `target/generated-docs/index.html` and `target/generated-docs/pdf/index.pdf`