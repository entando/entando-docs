module.exports = {
  title: '',
  description: 'Entando Docs',
  base: '/',
  themeConfig: {
    logo: '/entando-labs.svg',
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
        'cms/content-types-tutorial',
        'cms/list-of-Content-attributes',
        'cms/content-models-tutorial',
        'cms/contents-tutorial',
        'cms/digital-assets-tutorial',
        'cms/publish-a-content-tutorial'
      ]
    },
    {
      title: groupD,
      children: [
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
