// This plugin was derived from https://www.adamdehaven.com/blog/how-to-add-metadata-canonical-urls-and-structured-data-to-your-vuepress-site
const { path } = require('@vuepress/shared-utils')

module.exports = (options, ctx) => ({
    name: 'entando-dynamic-metadata',
    extendPageData($page) {
        const frontmatter = $page.frontmatter;

        const siteConfig = ctx.siteConfig;        
        const coverUrl = frontmatter.cover ? siteConfig.themeConfig.entando.domain + siteConfig.base + frontmatter.cover : undefined;

        const title = formatForMetaTag(frontmatter.title) ?? formatForMetaTag($page.title);
        const description =  formatForMetaTag(frontmatter.summary);
        let meta_dynamicMeta = [
            // Open Graph
            {property: 'og:title', content: title},
            {property: 'og:description', content: description},
            {property: 'og:image', content: coverUrl},
            {property: 'og:type', content: 'article'},
            // Twitter
            {property: 'twitter:site', content: '@entando'}
        ]

        // Remove tags with empty content values
        meta_dynamicMeta = meta_dynamicMeta.filter((meta) => meta.content && meta.content !== '')
        // Combine frontmatter
        meta_dynamicMeta = [...(frontmatter.meta || []), ...meta_dynamicMeta]

        // Set frontmatter after removing duplicate entries
        meta_dynamicMeta = getUniqueArray(meta_dynamicMeta, ['name', 'content', 'itemprop', 'property'])

        frontmatter.meta = meta_dynamicMeta
    },
})

/**
 * Removes duplicate objects from an Array of JavaScript objects
 * @param {Array} arr Array of Objects
 * @param {Array} keyProps Array of keys to determine uniqueness
 */
function getUniqueArray(arr, keyProps) {
    return Object.values(
      arr.reduce((uniqueMap, entry) => {
        const key = keyProps.map((k) => entry[k]).join('|')
        if (!(key in uniqueMap)) uniqueMap[key] = entry
        return uniqueMap
      }, {}),
    )
  }

/**
 * Format a string for inclusion in a header meta tag
 * @param {*} value 
 * @returns 
 */  
function formatForMetaTag(value) {
    if(!value){
        return null;
    }

    return value.toString().replace(/["|'|\\]/g, ''); 
};