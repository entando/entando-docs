<template>
  <div id="base-list-layout">
    <div class="ui-posts" itemscope itemtype="http://schema.org/Blog">
      <h1 class="entando-blog-title">Entando Blog</h1>
      <article
          v-for="page in pages"
          :key="page.key"
          class="ui-post"
          itemprop="blogPost"
          itemscope
          itemtype="https://schema.org/BlogPosting"
      >
        <meta itemprop="mainEntityOfPage" :content="page.path" />

        <header class="ui-post-title" itemprop="name headline">
          <BlogNavLink :link="page.path">{{ page.frontmatter.title }}</BlogNavLink>
        </header>

        <client-only v-if="page.excerpt">
          <!-- eslint-disable vue/no-v-html -->
          <p
              class="ui-post-summary"
              itemprop="description"
              v-html="page.excerpt"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>
        <p v-else class="ui-post-summary" itemprop="description">
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <footer>
          <div
              v-if="page.frontmatter.author"
              class="ui-post-meta ui-post-author"
              itemprop="publisher author"
              itemtype="http://schema.org/Person"
              itemscope
          >
            <NavigationIcon />
            <span itemprop="name">{{ page.frontmatter.author }}</span>
            <span v-if="page.frontmatter.location" itemprop="address">
              &nbsp; in {{ page.frontmatter.location }}
            </span>
          </div>

          <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
            <ClockIcon />
            <time
                pubdate
                itemprop="datePublished"
                :datetime="page.frontmatter.date"
            >
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>

          <div
              v-if="page.frontmatter.tags"
              class="ui-post-meta ui-post-tag"
              itemprop="keywords"
          >
            <router-link  to="/blog/tag/">
              <TagIcon />
            </router-link>
            <template v-for="(tag,index) in resolvePostTags(page.frontmatter.tags)">
              <template v-if="index > 0">,&nbsp;</template>
              <router-link :to="'/blog/tag/' + tag" :key="tag">
                  {{ tag }}
              </router-link>
            </template>
          </div>
        </footer>
      </article>
    </div>

    <component
        :is="paginationComponent"
        v-if="$pagination.length > 1 && paginationComponent"
    ></component>
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'
import { NavigationIcon, ClockIcon, TagIcon } from 'vue-feather-icons'
import {
  Pagination,
  SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components'

dayjs.extend(dayjsPluginUTC)

export default {
  components: { NavigationIcon, ClockIcon, TagIcon },

  data() {
    return {
      paginationComponent: null,
    }
  },

  computed: {
    pages() {
      return this.$pagination.pages
    },
  },

  created() {
    this.paginationComponent = this.getPaginationComponent()
  },

  methods: {
    getPaginationComponent() {
      // const n = THEME_BLOG_PAGINATION_COMPONENT
      const n = 'Pagination'
      if (n === 'Pagination') {
        return Pagination
      }

      if (n === 'SimplePagination') {
        return SimplePagination
      }

      return Vue.component(n) || Pagination
    },

    resolvePostDate(date) {
      return dayjs
          .utc(date)
          .format(this.$themeConfig.dateFormat || 'ddd MMM DD YYYY')
    },

    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags
      return [tags]
    },
  },
}
</script>

<style lang="stylus">
.common-layout
  .content-wrapper
    padding-bottom 80px

.entando-blog-title
  padding-top: $blogNavbarHeight

.ui-post
  padding-bottom 25px
  margin-bottom 25px
  border-bottom 1px solid $borderColor

  &:last-child
    border-bottom 0
    margin-bottom 0

.ui-post-title
  font-size 28px
  border-bottom 0

  a
    cursor pointer
    color $darkTextColor
    transition all 0.2s
    text-decoration none
    font-weight bold

    &:hover
      text-decoration underline

.ui-post-summary
  font-size 14px
  color rgba($textColor, 0.54)
  font-weight 200

.ui-post-meta
  display inline-flex
  align-items center
  font-size 12px
  line-height 12px

  &:not(:last-child)
    margin-bottom 3px
    margin-right 20px

  svg
    margin-right 5px
    width 14px
    height 14px

  @media (max-width: $MQMobile)
    display flex

    &:not(:last-child)
      margin-bottom 10px

.ui-post-author
  color rgba($darkTextColor, 0.84)
  font-weight 400

.ui-post-date
  color rgba($darkTextColor, 0.54)
  font-weight 200

.ui-post-tag
  color rgba($darkTextColor, 0.54)
  font-weight 200

  a
    color inherit
    font-weight 200
    text-decoration none
    margin-right 5px

    &:hover
      color $accentColor
</style>
