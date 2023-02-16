<template>
  <span class="meta">
    <time datetime="$page.lastUpdated"></time> {{ content() }}
  </span>
</template>

<script>
import { formatPublishDate } from '../theme/layouts/util'

export default {
  props: {
    post: Object,
    showUpdated: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatPublishDate,
    content() {
      const content = [
        this.publishedAt(),
        this.post.readingTime && this.post.readingTime.text,
        this.showUpdated && this.lastUpdated()
      ]
      return content.filter(x => x).join(' • ')
    },
    shouldShowSeparator () {
      return this.post.frontmatter.date && this.post.readingTime
    },
    publishedAt () {
      return this.post.frontmatter.date
    },
    lastUpdated () {
      if (this.$page.lastUpdated) {
        return this.lastUpdatedText()
      }
    },
    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
  }
}
</script>

<style lang="stylus" scoped>
.meta
  color #aaa
  font-size .9rem
</style>