const next  = require('./next.js');
const V62  = require('./v62.js');
const V61  = require('./v61.js');

module.exports = {
  title: 'Entando Developers',
  port: 8080,
  description: 'Entando Developers',
  extraWatchFiles: [
      'next.js',
      'v62.js',
      'v61.js'
  ],
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/theme/favicon.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['script', {src: '/theme/javascript/hotjar.js'}],
    <!-- Global site tag (gtag.js) - Google Analytics -->
    ['script', {src: 'https://www.googletagmanager.com/gtag/js?id=UA-17222082-5'}],
    ['script', {src: '/theme/javascript/ga.js'}],
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
          { text: '6.2', link: '/v6.2/docs/' },
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
      '/next/docs/': next.docsSidebar('/next/docs/'),
      '/next/tutorials/': next.tutorialsSidebar('/next/tutorials/'),
      '/v6.2/docs/': V62.docsSidebar('/v6.2/docs/'),
      '/v6.2/tutorials/': V62.tutorialsSidebar('/v6.2/tutorials/'),
      '/v6.1/docs/': V61.docsSidebar('/v6.1/docs/'),
      '/v6.1/tutorials/': V61.tutorialsSidebar('/v6.1/tutorials/'),
    }
  }
}
