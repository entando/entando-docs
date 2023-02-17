const next  = require('./next.js');
const V71  = require('./v71.js');
const V70  = require('./v70.js');
const V632  = require('./v632.js');
const V63  = require('./v63.js');
const V62  = require('./v62.js');
const V61  = require('./v61.js');
const navLinks = require('./navLinks.js');

module.exports = {
  title: 'Entando Developers',
  port: 8080,
  description: 'Entando Developers',
  extraWatchFiles: [
      'next.js',
      'v71.js',
      'v70.js',
      'v632.js',
      'v63.js',
      'v62.js',
      'v61.js'
  ],
  base: '/',
  head: [
      ['link', { rel: 'icon', href: '/theme/favicon.png' }],
      ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      ['script', {src: '/theme/javascript/hotjar.js'}],
      <!-- Global site tag (gtag.js) - Google Analytics GA4 -->
      ['script', {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-1SVVHY8B1N'}],
      ['script', {}, [
          "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-1SVVHY8B1N');",
      ]],
      // <!-- ZoomInfo WebSights embed code -->
      ['script', {src: '/theme/javascript/zoominfo.js'}]
  ],
  plugins: [
    // Enable link checking
    'check-md',
    // Enable redirects configured via frontmatter
   'redirect-frontmatter',
    // Simple plugin to manage version in top nav
    require('./plugins/entando-nav-version'),
    // Add zoom option to images
    'vuepress-plugin-medium-zoom',
    // Add plugin to automatically enable copying code blocks
    'vuepress-plugin-code-copy', {
        align: 'top',
        selector: 'div[class*="language-"] pre'
    },
    // Replaced default search with full-text FlexSearch https://github.com/nextapps-de/flexsearch
    'flexsearch', {
      searchResultLength: 30
    }
  ],
  themeConfig: {
      logo: '/theme/Entando_Logo_Dark_Blue.svg',
      repo: 'entando/entando-docs',
      editLinks: true,
      docsDir: 'vuepress/docs',
      docsBranch: 'main',
      editLinkText: 'Edit this page on GitHub',
      lastUpdated: 'Last Updated',
      nav: [
          {
              text: 'What We Do',
              type: 'links',
              items: [
                  {text: 'Platform Overview', link: 'https://entando.com/page/en/platform-overview'},
                  {text: 'Use Cases', link: 'https://entando.com/page/en/solutions'}
              ]
          },
          {
              text: 'Services',
              type: 'links',
              items: [
                  {text: 'Subscriptions', link: 'https://entando.com/page/en/subscriptions'},
                  {text: 'Professional Services', link: 'http://entando.com/page/en/professional-services'}
              ]
          },
          {
              text: 'Developers',
              type: 'links',
              items: [
                  {text: 'Getting Started', link: 'https://developer.entando.com/'},
                  {text: 'Docs', link: 'https://developer.entando.com/docs/'},
                  {text: 'Tutorials', link: 'https://developer.entando.com/tutorials/'},
                  {text: 'Forum', link: 'https://forum.entando.com'},
                  {text: 'Webinars', link: 'https://entando.com/page/en/webinars'},
              ]
          },
          {
              text: 'Partners',
              type: 'links',
              items: [
                  {text: 'Partner Portal', link: 'https://www.entando.com/page/en/partner-portal'},
                  {text: 'Partner Program', link: 'https://www.entando.com/page/en/partners'},
                  {text: 'OpenShift', link: 'https://www.entando.com/en/openshift.page'},
              ]
          },
          {
              text: 'News',
              type: 'links',
              items: [
                  {text: 'Blog', link: 'https://www.entando.com/page/en/blog'},
                  {text: 'Press Release', link: 'https://www.entando.com/page/en/pr'},
                  {text: 'Press Kit', link: 'https://www.entando.com/page/en/press-kit'},
              ]
          }
      ],
      landingSecondaryNav: [
          {text: 'Docs', link: '/v7.1/docs/', target: '_self'},
          {text: 'Tutorials', link: '/v7.1/tutorials/', target: '_self'},
          {text: 'Forum', link: 'https://forum.entando.com'},
          {text: 'Blog', link: 'https://www.entando.com/page/en/blog'},
      ],
      secondaryNav: [
          {text: 'Docs', link: 'javascript:Entando.versionedLink("/docs");', target: '_self'},
          {text: 'Tutorials', link: 'javascript:Entando.versionedLink("/tutorials");', target: '_self'},
          {text: 'Forum', link: 'https://forum.entando.com'},
          {text: 'Blog', link: 'https://www.entando.com/page/en/blog'},
      ],
      serviceWorker: {
      updatePopup: true
    },
    sidebar: {
      '/next/docs/': next.docsSidebar('/next/'),
      '/next/tutorials/': next.tutorialsSidebar('/next/'),
      '/v7.1/docs/': V71.docsSidebar('/v7.1/'),
      '/v7.1/tutorials/': V71.tutorialsSidebar('/v7.1/'),
      '/v7.0/docs/': V70.docsSidebar('/v7.0/docs/'),
      '/v7.0/tutorials/': V70.tutorialsSidebar('/v7.0/tutorials/'),
      '/v6.3.2/docs/': V632.docsSidebar('/v6.3.2/docs/'),
      '/v6.3.2/tutorials/': V632.tutorialsSidebar('/v6.3.2/tutorials/'),
      '/v6.3/docs/': V63.docsSidebar('/v6.3/docs/'),
      '/v6.3/tutorials/': V63.tutorialsSidebar('/v6.3/tutorials/'),
      '/v6.2/docs/': V62.docsSidebar('/v6.2/docs/'),
      '/v6.2/tutorials/': V62.tutorialsSidebar('/v6.2/tutorials/'),
      '/v6.1/docs/': V61.docsSidebar('/v6.1/docs/'),
      '/v6.1/tutorials/': V61.tutorialsSidebar('/v6.1/tutorials/'),
    },
    // Custom theme config
    entando: {
      fixpack: {
        "v70": "v7.0.2",
        "v71": "v7.1.3"
      },
      logoLink: "https://entando.com",
      section: "Docs",
      version: "7.1",
      docs: navLinks.links('Docs', '/docs/'),
      tutorials: navLinks.links('Tutorials', '/tutorials/'),
    },
  }
}
