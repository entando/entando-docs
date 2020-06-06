module.exports = {
  title: 'Entando Developers',
  description: 'Entando Docs',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/theme/favicon.png' }]
  ],
  themeConfig: {
    logo: '/theme/logo.svg',
    repo: 'entando/entando-docs',
    editLinks: true,
    docsDir: 'vuepress/docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Docs', link: '/docs/' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'Forum', link: 'https://forum.entando.org' },
      { text: 'Blog', link: 'https://www.entando.com/page/en/modern_applications_blog' },
      { text: 'Entando.com', link: 'http://www.entando.com' }
    ],
    serviceWorker: {
      updatePopup: true
    },
    sidebar: {
      '/docs/': getDocsSidebar(),
      '/tutorials/': getTutorialsSidebar('Micro Frontends', 'Microservice Applications', 'Content Management', 'Component Repository', 'Extend the Platform', 'Configuration and Operations'),
    }
  }
}

function getDocsSidebar () {
  return [
    {
        title: 'Overview',
        path: '/docs/',
    },
    {
        title: 'Getting Started',
        path: '/docs/getting-started/'
    },
    {
        title: 'Concepts',
        path: '/docs/concepts/',
    },
    {
        title: 'Reference',
        path: '/docs/reference/',
    },
    {
        title: 'Releases',
        path: '/docs/releases/'
    }
  ]
}

function getTutorialsSidebar (groupA, groupB, groupC, groupD, groupE, groupF) {
  return [
      // {
      //   title: '← Back to Main',
      //   path: '/'
      // },
      // {
      //   title: 'Tutorials',
      //   collapsable: false,
      // },
      {
      title: groupA,
      children: [
        {
          title: 'React',
          path: '/tutorials/micro-frontends/react',
        },
        {
          title: 'Angular',
          path: '/tutorials/micro-frontends/angular',
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
      title: groupB,
      children: [
        {
          title: 'Generate Microservices and Micro Frontends',
          path: '/tutorials/backend-developers/generate-microservices-and-micro-frontends',
        },
      ]
    },
    {
      title: groupC,
      children: [
        '/tutorials/cms/content-types-tutorial',
        '/tutorials/cms/list-of-Content-attributes',
        '/tutorials/cms/content-models-tutorial',
        '/tutorials/cms/contents-tutorial',
        '/tutorials/cms/digital-assets-tutorial',
        '/tutorials/cms/publish-a-content-tutorial'
      ]
    },
    {
      title: groupD,
      children: [
        '/tutorials/ecr/ecr-overview',
        '/tutorials/ecr/ecr-bundle-details',
        '/tutorials/ecr/ecr-bundle-filters',
        '/tutorials/ecr/ecr-uninstall-flow',
        '/tutorials/ecr/ecr-troubleshooting-guide',
        '/tutorials/ecr/how-to-create-local-npm-registry',
        '/tutorials/ecr/how-to-setup-nexus-on-kubernetes-cluster',
        '/tutorials/ecr/tutorials/create-ecr-bundle-from-npm',
        '/tutorials/ecr/tutorials/create-ecr-bundle-from-git',
        '/tutorials/ecr/tutorials/from-blueprint-to-de'
      ]
    },
    {
      title: groupE,
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
      title: groupF,
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
  ]
}
