<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #sidebar-top>
        <div/>
      </template>
      <template #page-top>
        <div class="vuepress-theme-blog__tags-layout">
          <h1 class="tag-cloud-title">Entando Blog - Tags</h1>
          <BlogTags :tags="$frontmatterKey.list" />
        </div>
      </template>
    </Layout>
    <Tracking/>
  </div>
</template>
<script>
import Layout from '@parent-theme/layouts/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>
<style lang="stylus">
@require '../styles/wrapper.styl'

.vuepress-theme-blog__tags-layout
  @extend $wrapper

  .tag-cloud-title
    padding-top $blogNavbarHeight

  @media (min-width: $MQNarrow)
    box-shadow 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.07)
</style>