module.exports = {
  title: 'Entando Developers',
  description: 'Entando Developers',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/theme/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['script', {}, `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1658535,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv='); 
    `],
  ],
  plugins: [
    // Enable link checking
    'check-md',
    // Enable redirects configured via frontmatter
   'redirect-frontmatter',
    // Simple plugin to manage version in top nav
    require('./plugins/entando-nav-version'),
  ],
  themeConfig: {
    logo: '/theme/logo.svg',
    repo: 'entando/entando-docs',
    editLinks: true,
    docsDir: 'vuepress/docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Versions',
        items: [
          { text: 'Next', link: '/next/docs/' },
          { text: '6.1', link: '/v6.1/docs/' },
          //  Open new window to avoid SSR issues when moving from Vue to straight html
          { text: '5.3', link: '/old-version/old-version.html', target:'_blank'},
        ]
      },
      { text: 'Docs', link: 'javascript:Entando.versionedLink("/docs");', target: '_self' },
      { text: 'Tutorials', link: 'javascript:Entando.versionedLink("/tutorials");', target: '_self' },
      { text: 'Forum', link: 'https://forum.entando.org' },
      { text: 'Blog', link: 'https://www.entando.com/page/en/blog' },
      { text: 'Entando.com', link: 'https://www.entando.com' },
    ],
    serviceWorker: {
      updatePopup: true
    },
    sidebar: {
      '/next/docs/': v6_2_DocsSidebar('/next/docs/', 'Overview','Getting Started','Concepts','Reference','Releases'),
      '/next/tutorials/': v6_2_TutorialsSidebar('/next/tutorials/', 'Micro Frontends', 'Microservice Applications', 'Content Management', 'Component Repository', 'Extend the Platform', 'Configuration and Operations'),
      '/v6.1/docs/': v6_1_DocsSidebar('/v6.1/docs/','Overview','Getting Started','Concepts','Reference','Releases'),
      '/v6.1/tutorials/': v6_1_TutorialsSidebar('/v6.1/tutorials/','Micro Frontends', 'Microservice Applications', 'Content Management', 'Component Repository', 'Extend the Platform', 'Configuration and Operations'),
    }
  }
}

/* Entando 6.1 docs */

function v6_1_DocsSidebar (path, groupA, groupB, groupC, groupD, groupE) {
  return [
    {
      title: groupA,
      path: path,
    },
    {
      title: groupB,
      path: path  + 'getting-started/'
    },
    {
      title: groupC,
      children: [
        {
          title: 'Overview',
          path: path  + 'concepts/'
        },
        {
          title: 'Custom Resources',
          path: path  + 'concepts/custom-resources'
        },
        {
          title: 'PDA Architecture',
          path: path  + 'concepts/pda-architecture'
        }
      ]
    },
    {
      title: groupD,
      path: path  + 'reference/',
      children: [
        {
          title: 'Entando APIs',
          path: path + 'reference/'
        },
        {
          title: 'Deployment Structure',
          path: path + 'reference/deployment-structure.md'
        },
      ]
    },
    {
      title: groupE,
      path: path  + 'releases/'
    }
  ]
}

function v6_1_TutorialsSidebar (path, groupA, groupB, groupC, groupD, groupE, groupF) {
  return [
    {
      title: groupA,
      children: [
        {
          title: 'React',
          path: path  + 'micro-frontends/react',
        },
        {
          title: 'Angular',
          path: path  + 'micro-frontends/angular',
        },
        {
          title: 'Communication',
          path: path  + 'micro-frontends/micro-frontend-communication/',
        },
        {
          title: 'Angular to React',
          path: path  + 'micro-frontends/angular-and-react-communication/',
        },
        {
          title: 'Config',
          path: path  + 'micro-frontends/widget-configuration/',
        },
        {
          title: 'Blueprint',
          path: path  + 'micro-frontends/generate-micro-frontends-from-a-database-entity/',
        },
        {
          title: 'Authentication',
          path: path  + 'micro-frontends/authentication/',
        },
      ]
    },
    {
      title: groupB,
      children: [
        {
          title: 'Generate Microservices and Micro Frontends',
          path: path  + 'backend-developers/generate-microservices-and-micro-frontends',
        },
      ]
    },
    {
      title: groupC,
      children: [
        path  + 'cms/content-types-tutorial',
        path  + 'cms/list-of-Content-attributes',
        path  + 'cms/content-models-tutorial',
        path  + 'cms/contents-tutorial',
        path  + 'cms/digital-assets-tutorial',
        path  + 'cms/publish-a-content-tutorial'
      ]
    },
    {
      title: groupD,
      children: [
        path  + 'ecr/ecr-overview',
        path  + 'ecr/ecr-bundle-details',
        path  + 'ecr/ecr-bundle-filters',
        path  + 'ecr/ecr-bundle-presentation-config',
        path  + 'ecr/ecr-uninstall-flow',
        path  + 'ecr/ecr-troubleshooting-guide',
        path  + 'ecr/how-to-setup-nexus-on-kubernetes-cluster',
        path  + 'ecr/tutorials/create-ecr-bundle-from-git',
        path  + 'ecr/tutorials/from-blueprint-to-de',
        path  + 'ecr/tutorials/ecr-deploy-use-plugin-and-mfe-without-bundle'
      ]
    },
    {
      title: groupE,
      children: [
        {
          title: "Hello World using the App Builder",
          path: path  + 'customize-the-platform/app-builder/hello-world'
        },
        {
          title: 'Extend App Builder',
          path: path  + 'customize-the-platform/extend-app-builder',
        },
        {
          title: 'Add REST API',
          path: path  + 'customize-the-platform/add-rest-api',
        },
        {
          title: 'Process Driven Applications (PDA)',
          path: path  + 'customize-the-platform/pda-tutorial',
        },
        {
          title: 'Change Default Datasource',
          path: path  + 'customize-the-platform/change-default-datasources-and-connections/',
        },
      ]
    },
    {
      title: groupF,
      children: [
        {
          title: 'External Database',
          path: path  + 'devops/external-database/',
        },
        {
          title: 'External Identity Management System',
          path: path  + 'devops/external-keycloak/',
        },
        {
          title: 'Entando Docker Image',
          path: path  + 'devops/build-core-image',
        },
        {
          title: 'Backing Up and Restoring Your Environment',
          path: path  + 'devops/backing-up-and-restoring-your-environment',
        },
      ]
    },
  ]
}

/* Entando 6.2 docs */

function v6_2_DocsSidebar (path, groupA, groupB, groupC, groupD, groupE) {
  return [
    {
      title: groupA,
      path: path,
    },
    {
      title: groupB,
      path: path  + 'getting-started/'
    },
    {
      title: groupC,
      children: [
        {
          title: 'Overview',
          path: path  + 'concepts/'
        },
        {
          title: 'Custom Resources',
          path: path  + 'concepts/custom-resources'
        },
        {
          title: 'PDA Architecture',
          path: path  + 'concepts/pda-architecture'
        }
      ]
    },
    {
      title: groupD,
      children: [
        {
          title: 'Entando APIs',
          path: path + 'reference/'
        },
        {
          title: 'Deployment Structure',
          path: path  + 'reference/deployment-structure.md'
        },
        {
          title: 'Cluster Resource Limits',
          path: path + 'reference/cluster-resource-limits'
        }
      ]
    },
    {
      title: groupE,
      path: path  + 'releases/'
    }
  ]
}

function v6_2_TutorialsSidebar (path, groupA, groupB, groupC, groupD, groupE, groupF) {
  return [
    {
      title: groupA,
      children: [
        {
          title: 'React',
          path: path  + 'micro-frontends/react',
        },
        {
          title: 'Angular',
          path: path  + 'micro-frontends/angular',
        },
        {
          title: 'Communication',
          path: path  + 'micro-frontends/micro-frontend-communication/',
        },
        {
          title: 'Angular to React',
          path: path  + 'micro-frontends/angular-and-react-communication/',
        },
        {
          title: 'Config',
          path: path  + 'micro-frontends/widget-configuration/',
        },
        {
          title: 'Blueprint',
          path: path  + 'micro-frontends/generate-micro-frontends-from-a-database-entity/',
        },
        {
          title: 'Authentication',
          path: path  + 'micro-frontends/authentication/',
        },
      ]
    },
    {
      title: groupB,
      children: [
        {
          title: 'Generate Microservices and Micro Frontends',
          path: path  + 'backend-developers/generate-microservices-and-micro-frontends',
        },
      ]
    },
    {
      title: groupC,
      children: [
        path  + 'cms/content-types-tutorial',
        path  + 'cms/list-of-Content-attributes',
        path  + 'cms/content-models-tutorial',
        path  + 'cms/contents-tutorial',
        path  + 'cms/digital-assets-tutorial',
        path  + 'cms/publish-a-content-tutorial'
      ]
    },
    {
      title: groupD,
      children: [
        path  + 'ecr/ecr-overview',
        path  + 'ecr/ecr-bundle-details',
        path  + 'ecr/ecr-bundle-filters',
        path  + 'ecr/ecr-bundle-presentation-config',
        path  + 'ecr/ecr-uninstall-flow',
        path  + 'ecr/ecr-troubleshooting-guide',
        path  + 'ecr/how-to-setup-nexus-on-kubernetes-cluster',
        path  + 'ecr/tutorials/create-ecr-bundle-from-git',
        path  + 'ecr/tutorials/from-blueprint-to-de',
        path  + 'ecr/tutorials/ecr-deploy-use-plugin-and-mfe-without-bundle'
      ]
    },
    {
      title: groupE,
      children: [
        {
          title: "Hello World using the App Builder",
          path: path  + 'customize-the-platform/app-builder/hello-world'
        },
        {
          title: 'Extend App Builder',
          path: path  + 'customize-the-platform/extend-app-builder',
        },
        {
          title: 'Add REST API',
          path: path  + 'customize-the-platform/add-rest-api',
        },
        {
          title: 'Process Driven Applications (PDA)',
          path: path  + 'customize-the-platform/pda-tutorial',
        },
        {
          title: 'Change Default Datasource',
          path: path  + 'customize-the-platform/change-default-datasources-and-connections/',
        },
      ]
    },
    {
      title: groupF,
      children: [
        {
          title: 'Default Database',
          path: path + 'devops/default-database',
        },
        {
          title: 'External Database',
          path: path  + 'devops/external-database/',
        },
        {
          title: 'External Identity Management System',
          path: path  + 'devops/external-keycloak/',
        },
        {
          title: 'Entando Docker Image',
          path: path  + 'devops/build-core-image',
        },
        {
          title: 'Backing Up and Restoring Your Environment',
          path: path  + 'devops/backing-up-and-restoring-your-environment',
        },
        {
          title: 'Installation on Google Kubernetes Engine',
          path: path  + 'devops/installation/google-cloud-platform/',
        },
      ]
    },
  ]
}
