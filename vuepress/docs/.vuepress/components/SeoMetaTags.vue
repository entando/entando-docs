<template>
</template>

<script>
export default {
  name: 'SeoMetaTags',
  mounted: function () {
    const page = this.$page;
    const pageCoverImage = page.frontmatter.cover ? `${window.location.origin}${page.frontmatter.cover}` : undefined;
    const metaTags = [
      {name: 'og:description', content: page.frontmatter.summary},
      {name: 'og:title', content: page.frontmatter.title},
      {name: 'og:image', content: pageCoverImage},
      {name: 'og:type', content: 'article'},
      {name: 'twitter:site', content: '@entando'}
    ]

    if (!page.frontmatter.meta) {
      page.frontmatter.meta = [];
    }
    metaTags.forEach(tag => {
      if (tag.content) {
        page.frontmatter.meta.push(tag);
      }
    });
  },

}
</script>
