const next  = require('./next.js');
const V73  = require('./v73.js');
const V72  = require('./v72.js');
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
      'v73.js',
      'v72.js',
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
    // Custom plugin to manage version in top nav
    require('./plugins/entando-nav-version'),
    // Custom plugin to add metadata using frontmatter
    require('./plugins/entando-dynamic-metadata'),
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
    },
    // https://vuepress.vuejs.org/plugin/official/plugin-blog.html
    // https://github.com/vuepress/vuepress-plugin-blog/tree/master/docs/config
    ['@vuepress/blog',  {
          directories: [
              {
                  // Unique ID of current classification
                  id: 'post',
                  // Target directory
                  dirname: '_posts',
                  // Path of the `entry page` (or `list page`)
                  path: '/blog/',
                  itemPermalink: '/blog/:year/:month/:day/:slug',
                  // Layouts
                  layout: 'IndexPost',
                  itemLayout: 'Post',
                  pagination: {
                      lengthPerPage: 6,
                      layout: 'IndexPost'
                  }
              },
          ],
          frontmatters: [
              {
                  id: "tag",
                  keys: ['tags'],
                  path: '/blog/tag/',
                  layout: 'FrontmatterKey',
                  scopeLayout: 'IndexPost',
                  pagination: {
                      lengthPerPage: 6,
                      layout: 'IndexPost'
                  }
              },
          ],
    }],
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
              text: 'Platform',
              type: 'links',
              link: 'https://entando.com/'
          },
          {
              text: 'Support',
              type: 'links',
              link: 'https://entando.com/en/services.page'
          },
          {
            text: 'Resources',
            type: 'links',
            items: [
                {text: 'News', link: 'https://www.entando.com/page/en/news_and_press'},
                {text: 'Press Releases', link: 'https://entando.com/page/en/news_and_press?metadata_category_frame9=pressrelease'},
                {text: 'Press Kit', link: 'https://www.entando.com/page/en/press-kit'},
                {text: 'Webinars & Events', link: 'https://entando.com/page/en/webinars'},
            ]
        },
          {
              text: 'Developers',
              type: 'links',
              items: [
                  {text: 'Getting Started', link: '/'},
                  {text: 'Docs', link: '/docs/'},
                  {text: 'Tutorials', link: '/tutorials/'},
                  {text: 'Blog', link: '/blog/'},
                  {text: 'Slack', link: 'https://entandocommunity.slack.com/'},
                  {text: 'Forum', link: 'https://forum.entando.com'},
              ]
          },
          {
              text: 'Partners',
              type: 'links',
              link: 'https://entando.com/en/partnerprogram_2023.page'
          },
          
      ],
      landingSecondaryNav: [
          {text: 'Docs', link: '/v7.2/docs/', target: '_self'},
          {text: 'Tutorials', link: '/v7.2/tutorials/', target: '_self'},
          {text: 'Forum', link: 'https://forum.entando.com'},
          {text: 'Blog', link: '/blog/'},
      ],
      secondaryNav: [
          {text: 'Docs', link: 'javascript:Entando.versionedLink("/docs");', target: '_self'},
          {text: 'Tutorials', link: 'javascript:Entando.versionedLink("/tutorials");', target: '_self'},
          {text: 'Forum', link: 'https://forum.entando.com'},
          {text: 'Blog', link: '/blog/'},
      ],
      serviceWorker: {
        updatePopup: true
      },
    sidebar: {
      '/next/docs/': next.docsSidebar('/next/'),
      '/next/tutorials/': next.tutorialsSidebar('/next/'),
      '/v7.3/docs/': V73.docsSidebar('/v7.3/'),
      '/v7.3/tutorials/': V73.tutorialsSidebar('/v7.3/'),
      '/v7.2/docs/': V72.docsSidebar('/v7.2/'),
      '/v7.2/tutorials/': V72.tutorialsSidebar('/v7.2/'),
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
      domain: "https://developer.entando.com",
      fixpack: {
        "v73": "v7.3.0",
        "v72": "v7.2.2",
        "v71": "v7.1.6",
        "v70": "v7.0.2",
        "v632": "v6.5.4"
      },
      logoLink: "https://entando.com",
      section: "Docs",
      version: "7.2",
      docs: navLinks.links('Docs', '/docs/'),
      tutorials: navLinks.links('Tutorials', '/tutorials/'),
    },
  }
}
