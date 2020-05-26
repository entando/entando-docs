module.exports = {
    title: '',
    description: 'Entando Docs',
    dest: 'docs/.vuepress/dist/docs',
    base: '/docs/',
    themeConfig: {
        logo: '/entando-labs.svg',
        repo: 'https://github.com/entando/entando-docs',
        editLinks: true,
        docsDir: 'vuepress/docs',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Docs', link: 'http://docs.entando.com/' },
            { text: 'Forum', link: 'https://forum.entando.org' },
            { text: 'Blog', link: 'https://www.entando.com/page/en/modern_applications_blog' },
            { text: 'Entando.com', link: 'http://www.entando.com' },
            { text: 'Github', link: 'https://github.com/entando' }
        ],
        serviceWorker: {
            updatePopup: true
        },
        sidebar: [
            {
                title: 'Overview',
                path: '/'
            },
            {
                title: 'Getting Started',
                path: 'getting-started/'
            },
            {
                title: 'Platform Capabilities',
                children: [
                    { title: 'App Builder', children: [
                        '/app-builder/hello-world',
                        '/app-builder/tutorial-extending-app-builder'
                    ] },
                    { title: 'Component Generator', children: [
                        '/component-generator/create-plugin-component-generator'
                    ] },
                    { title: 'App Engine', children: [
                        '/app-engine/core-swagger',
                        '/app-engine/adding-a-new-rest-api',
                        '/app-engine/build-core-image',
                        '/app-engine/building-prepackaged-image',
                        '/app-engine/tutorials/invoking-api',
                    ] },
                    { title: 'Component Repository', children: [
                        '/ecr/ecr-overview',
                        '/ecr/ecr-bundle-details',
                        '/ecr/ecr-bundle-filters',
                        '/ecr/ecr-uninstall-flow',
                        '/ecr/ecr-troubleshooting-guide',
                        '/ecr/how-to-create-local-npm-registry',
                        '/ecr/how-to-setup-nexus-on-kubernetes-cluster',
                        '/ecr/tutorials/create-ecr-bundle-from-npm',
                        '/ecr/tutorials/create-ecr-bundle-from-git',
                        '/ecr/tutorials/from-blueprint-to-de'
                    ] },
                    { title: 'WCMS', children: [
                        '/cms/content-types-tutorial',
                        '/cms/list-of-Content-attributes',
                        '/cms/content-models-tutorial',
                        '/cms/contents-tutorial',
                        '/cms/digital-assets-tutorial',
                        '/cms/publish-a-content-tutorial',
                    ] },
                    // { title: 'Identity Mgmt System' }
                ]
            },
            {
                title: 'Concepts',
                children: [
                    { title: 'Micro Frontends', path: '/micro-frontends/', children: [
                        '/micro-frontends/create-react-microfrontend-widget',
                        '/micro-frontends/create-angular-microfrontend-widget',
                        '/micro-frontends/widget-communication',
                        '/micro-frontends/mixed-widget-communication',
                        '/micro-frontends/create-config-screen-for-appbuilder-widget',
                        '/micro-frontends/display-widget-config-data',
                        '/micro-frontends/generated-widgets',
                        '/micro-frontends/authentication',
                    ] },
                    // { title: 'Microservices' },
                    { title: 'Kubernetes', children: [
                        '/k8s-operator/entando6-cluster-citizens',
                        '/k8s-operator/ingresses',
                        '/k8s-operator/tutorials/how-to-connect-to-external-keycloak',
                        '/k8s-operator/databases',
                        '/k8s-operator/connecting-external-db',
                        '/k8s-operator/add_datasource_to_eap_image'
                    ] }
                ]
            },
            {
                title: 'Release Notes',
                path: '/release-notes/'
            },
            {
                title: 'Old Versions',
                path: '/old-versions/'
            }
        ]
    }
}
