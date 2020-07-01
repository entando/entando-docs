# Entando 5.x Docs
This directory contains the `asciidocs` source for the older Entando documentation, versions 5.0 - 5.3, 
leveraging the <https://asciidoctor.org/> project. This content is mostly unmaintained and may contain 
broken links or images.   

# Process to re-generate the 5.x docs
1. Run the maven project to generate the html_single formatted document: `mvn`
2. Copy the generated index file into the vuepress location: `cp target/generated-docs/html_single/index.html ../vuepress/docs/.vuepress/public/old-version/old-version.html`
3. If other files were modified (e.g. `css, js`) those can also be moved into vuepress.