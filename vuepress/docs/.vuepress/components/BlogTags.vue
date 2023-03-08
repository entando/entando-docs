<template>
  <div class="blog-tags">
    <BlogTag v-for="tag in sortedTags" :key="tag.name" :tag="tag" />
  </div>
</template>

<script>
export default {
  name: 'BlogTags',
  props: ['tags'],

  computed: {
    sortedTags() {
      return this.tags
          //Frequency sort
          // .sort((a,b) => b.pages.length - a.pages.length);
          //Alpha sort
          .sort((a,b) => a.name.localeCompare(b.name));
    }
  }
}
</script>

<style lang="stylus">
.blog-tags
  width 66%

@media screen and (max-width: 1000px)
  .blog-tags
    width 90%
</style>
