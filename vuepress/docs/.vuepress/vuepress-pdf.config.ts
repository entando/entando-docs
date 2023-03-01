// .vuepress/vuepress-pdf.config.ts
import { defineUserConfig } from "@condorhero/vuepress-plugin-export-pdf";

export default defineUserConfig({
    theme: "@vuepress/theme-default",
    outFile: 'entando-docs-v71-no-debug.pdf',
    routePatterns: [
        "/v7.1/**",
        "!/",
        "!/{cli,hub,jhipster,openshift}.*",
        "!/{next,v6.*,v7.0}/**",
    ]
});