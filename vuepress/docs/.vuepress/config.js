module.exports = {
    title: 'Entando | Getting Started Guide',
    description: 'Entando Tutorials',
    themeConfig: {
        repo: 'es-entando/es-entando.github.io',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Docs', link: 'http://docs.entando.com/' },
            { text: 'Getting Started', link: '/' },
            { text: 'Entando.com', link: 'http://www.entando.com' }
        ],
        serviceWorker: {
            updatePopup: true
        },
        sidebar: [
            {
                title: 'Quickstart',
                path: '/',
                children: [
                    '/'
                ]
            },
            {
                title: 'App Builder',
                children: [
                    '/app-builder/hello-world',
                    '/app-builder/tutorial-extending-app-builder'
                ]
            },
            {
                title: 'Micro Frontends',
                path: '/micro-frontends/',
                children: [
                    '/micro-frontends/create-react-microfrontend-widget',
                    '/micro-frontends/create-angular-microfrontend-widget',
                    '/micro-frontends/widget-communication',
                    '/micro-frontends/mixed-widget-communication',
                    '/micro-frontends/create-config-screen-for-appbuilder-widget',
                    '/micro-frontends/display-widget-config-data',
                    '/micro-frontends/generated-widgets',
                    '/micro-frontends/authentication'
                ]
            },
            {
                title: 'Entando Component Repository',
                path: '/ecr/',
                children: [
                    '/ecr/how-to-create-local-npm-registry',
                    '/ecr/how-to-setup-nexus-on-kubernetes-cluster',
                    '/ecr/tutorials/create-ecr-bundle',
                    '/ecr/tutorials/from-blueprint-to-de'
                ]
            },
            {
                title: 'Blueprint',
                children: [
                    '/blueprint/create-plugin-blueprint'
                ]
            },
            {
                title: 'Core App',
                children: [
                    '/core/core-swagger',
                    '/core/adding-a-new-rest-api',
                    '/core/build-core-image',
                    '/core/building-prepackaged-image',
                    '/core/tutorials/invoking-api'
                ]
            },
            {
                title: 'Freemarker Tags',
                children: [
                    '/freemarker-tags/freemarker-core-tags',
                    '/freemarker-tags/freemarker-JACMS-tags'
                ]
            },
            {
                title: 'Kubernetes and Operator',
                children: [
                    '/k8s-operator/entando6-cluster-citizens',
                    '/k8s-operator/tutorials/how-to-connect-to-external-keycloak',
                    '/k8s-operator/databases',
                    '/k8s-operator/connecting-external-db',
                    '/k8s-operator/add_datasource_to_eap_image'
                ]
            },
            {
                title: 'Process Driven Application',
                path: '/pda/',
                children: [
                    '/pda/'
                ]
            },
            {
                title: 'CMS',
                children: [
                    '/cms/content-types-tutorial',
                    '/cms/list-of-Content-attributes',
                    '/cms/content-models-tutorial',
                    '/cms/contents-tutorial',
                    '/cms/digital-assets-tutorial',
                    '/cms/publish-a-content-tutorial'
                ]
            },
            {
                title: 'Release Notes',
                path: '/release-notes/',
            }
        ]
    }
}