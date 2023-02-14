<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #page-bottom>
        <header>
          <h1 class="post-title" itemprop="name headline">
            {{ $frontmatter.title }}
          </h1>
          <PostMeta
            :tags="$frontmatter.tags"
            :author="$frontmatter.author"
            :date="$frontmatter.date"
            :location="$frontmatter.location"
          />
        </header>
        <footer>
          <Newsletter v-if="$service.email.enabled" />
          <hr />
          <Comment />
        </footer>
      </template>
    </Layout>
    <div id="vuepress-theme-blog__post-layout">
      <article
        class="vuepress-blog-theme-content"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <header>
          <h1 class="post-title" itemprop="name headline">
            {{ $frontmatter.title }}
          </h1>
          <PostMeta
            :tags="$frontmatter.tags"
            :author="$frontmatter.author"
            :date="$frontmatter.date"
            :location="$frontmatter.location"
          />
        </header>
        <Content itemprop="articleBody" />
        <footer>
          <Newsletter v-if="$service.email.enabled" />
          <hr />
          <Comment />
        </footer>
      </article>
      <Toc />
    </div>
    <Tracking/>
    <Toc />
  </div>
</template>

<script>
import Layout from '@parent-theme/layouts/Layout.vue'
import EntandoVersionLinks from "../../components/EntandoVersionLinks";
import Tracking from "../../components/Tracking";
import PostTag from "../../components/PostTag";
import PostMeta from "../../components/PostMeta";
import Toc from "../../components/Toc";
import { Comment } from '@vuepress/plugin-blog/lib/client/components'

export default {
  components: {
    Toc,
    PostMeta,
    PostTag,
    Layout,
    EntandoVersionLinks,
    Tracking,
    Comment,
    Newsletter: () => import('../../components/Newsletter.vue'),
  }
}
</script>

<style lang="stylus">
@require './wrapper.styl'

.vuepress-blog-theme-content
  @extend $wrapper
  font-size 16px
  letter-spacing 0px
  font-family PT Serif, Serif
  color $textColor
  position relative

  @media (min-width: $MQNarrow)
    box-shadow 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.07)

  .post-title
    padding-top 0

@media (max-width: $MQMobile)
  .vuepress-blog-theme-content
    padding-top 0

  .post-title
    margin-top 0
</style>
