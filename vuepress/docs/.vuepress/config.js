const next  = require('./next.js');
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
      logo: '/theme/logo.svg',
      repo: 'entando/entando-docs',
      editLinks: true,
      docsDir: 'vuepress/docs',
      docsBranch: 'main',
      editLinkText: 'Edit this page on GitHub',
      lastUpdated: 'Last Updated',
      nav: [
          {text: 'Docs', link: 'javascript:Entando.versionedLink("/docs");', target: '_self'},
          {text: 'Tutorials', link: 'javascript:Entando.versionedLink("/tutorials");', target: '_self'},
          {text: 'Forum', link: 'https://forum.entando.org'},
          {text: 'Blog', link: 'https://www.entando.com/page/en/blog'},
          {text: 'Entando.com', link: 'https://www.entando.com'},
      ],
      serviceWorker: {
      updatePopup: true
    },
    sidebar: {
      '/next/docs/': next.docsSidebar('/next/docs/'),
      '/next/tutorials/': next.tutorialsSidebar('/next/tutorials/'),
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
      section: "Docs",
      version: "6.3.2",
      docs: navLinks.links('Docs', '/docs/'),
      tutorials: navLinks.links('Tutorials', '/tutorials/')
    },
  }
}
