<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #sidebar-top>
        <div/>
      </template>
      <template #page-top>
        <div v-if="$pagination" class="vuepress-blog-theme-content">
          <BaseListLayout/>
        </div>
        <div v-else>
          <Content/>
        </div>
      </template>
    </Layout>
    <Tracking/>
  </div>
</template>
<script>
import Layout from './BaseThemeLayout.vue'

export default {
  components: {
    Layout
  }
}
</script>
<style lang="stylus">
@require '../styles/wrapper.styl'

.vuepress-blog-theme-content
  @extend $wrapper

  @media (min-width: $MQNarrow)
    box-shadow 0 10px 20px rgba(0, 0, 0, 0.05), 0 6px 6px rgba(0, 0, 0, 0.07)
</style>