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
            ['/app-builder/', 'App Builder'],
            ['/micro-frontends/', 'Micro Frontends'],
            ['/ecr/', 'Entando Component Repository'],
            ['/blueprint/', 'Blueprint'],
            ['/core/', 'Core App'],
            ['/freemarker-tags/', 'Freemarker Tags'],
            ['/k8s-operator/', 'Kubernetes and Operator'],
            ['/pda/', 'Process Driven Applications'],
            ['/cms/', 'CMS'],
            ['/release-notes/', 'Release Notes']
        ]
    }
}