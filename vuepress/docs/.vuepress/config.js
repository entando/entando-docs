module.exports = {
    title: '',
    description: 'Entando Docs',
    dest: 'docs/.vuepress/dist/docs',
    base: '/docs/',
    themeConfig: {
        logo: '/entando-labs.svg',
        repo: 'entando/entando-docs',
        editLinks: true,
        docsDir: 'vuepress/docs',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
            { text: 'Docs', link: 'http://docs.entando.com/' },
            { text: 'Forum', link: 'https://forum.entando.org' },
            { text: 'Blog', link: 'https://www.entando.com/page/en/modern_applications_blog' },
            { text: 'Entando.com', link: 'http://www.entando.com' }
        ],
        serviceWorker: {
            updatePopup: true
        },
        sidebar: {
            '/tutorials/': [
                {
                    title: 'Overview',
                    path: '/tutorials/'
                },
                {
                    title: 'Micro Frontends',
                    path: '/tutorials/micro-frontends/',
                    children: [
                        {
                            title: 'React',
                            path: '/tutorials/micro-frontends/react',
                        },
                        {
                            title: 'Angular',
                            path: '/tutorials/micro-frontends/angular-micro-frontend/',
                        },
                        {
                            title: 'Events',
                            path: '/tutorials/micro-frontends/micro-frontend-communication/',
                        },
                        {
                            title: 'Angular to React',
                            path: '/tutorials/micro-frontends/angular-and-react-communication/',
                        },
                        {
                            title: 'Config',
                            path: '/tutorials/micro-frontends/widget-configuration/',
                        },
                        {
                            title: 'Blueprint',
                            path: '/tutorials/micro-frontends/generate-micro-frontends-from-a-database-entity/',
                        },
                        {
                            title: 'Authentication',
                            path: '/tutorials/micro-frontends/authentication/',
                        },
                    ]
                },
                {
                    title: 'Microservice Applications',
                    // path: '/tutorials/frontend-developers/',
                    children: [
                        {
                            title: 'Generate Microservices and Micro Frontends',
                            path: '/tutorials/backend-developers/generate-microservices-and-micro-frontends',
                        },
                    ]
                },
                {
                    title: 'Content Management',
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
                    title: 'Component Repository',
                    children: [
                        '/ecr/ecr-overview',
                        '/ecr/ecr-bundle-details',
                        '/ecr/ecr-bundle-filters',
                        '/ecr/ecr-troubleshooting-guide',
                        '/ecr/how-to-create-local-npm-registry',
                        '/ecr/how-to-setup-nexus-on-kubernetes-cluster',
                        '/ecr/tutorials/create-ecr-bundle-from-npm',
                        '/ecr/tutorials/create-ecr-bundle-from-git',
                        '/ecr/tutorials/from-blueprint-to-de'
                    ]
                },
                {
                    title: 'Extend the Platform',
                    // path: '/tutorials/customize-the-platform/',
                    children: [
                        {
                            title: 'Change Default Datasource',
                            path: '/tutorials/customize-the-platform/change-default-datasources-and-connections/',
                        },
                        {
                            title: 'Extend App Builder',
                            path: '/tutorials/customize-the-platform/extend-app-builder',
                        },
                        {
                            title: 'Add REST API',
                            path: '/tutorials/customize-the-platform/add-rest-api',
                        },
                    ]
                },
                {
                    title: 'Configuration and Operations',
                    // path: '/tutorials/devops/',
                    children: [
                        {
                            title: 'External Database',
                            path: '/tutorials/devops/external-database/',
                        },
                        {
                            title: 'External Identity Management System',
                            path: '/tutorials/devops/external-keycloak/',
                        },
                        {
                            title: 'Entando Docker Image',
                            path: '/tutorials/devops/build-core-image',
                        },
                        {
                            title: 'Backing Up and Restoring Your Environment',
                            path: '/tutorials/devops/backing-up-and-restoring-your-environment',
                        },
                    ]
                },
            ],
      
            // fallback
            '/': [
                {
                    title: 'Overview',
                    path: '/'
                },
                {
                    title: 'Getting Started',
                    path: 'getting-started/'
                },
                {
                    title: 'Tutorials',
                    path: 'http://localhost:8080/docs/tutorials/',
                },
                {
                    title: 'Concepts',
                    children: [
                        {
                            title: 'Kubernetes',
                            children: [
                                '/k8s-operator/entando6-cluster-citizens',
                                '/k8s-operator/ingresses',
                                '/k8s-operator/databases',
                                '/k8s-operator/add_datasource_to_eap_image'
                            ]
                        }
                    ]
                },
                {
                    title: 'Reference',
                    children: [
                        {
                            title: 'Entando APIs',
                            path: '/reference/core-swagger',
                        },
                        {
                            title: 'Testing Entando APIs',
                            path: '/reference/invoking-api',
                        },
                    ]
                },
                {
                    title: 'Releases',
                    path: '/release-notes/'
                },
                // {
                //     title: 'Old Versions',
                //     path: '/old-versions/'
                // }
            ]
        }
    }
}
