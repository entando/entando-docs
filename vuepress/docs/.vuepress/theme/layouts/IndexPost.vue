<!-- Override and extend the default theme Layout -->
<template>
  <div class="theme-default-content content__default">
    <Layout>
      <template #sidebar-top>
        <EntandoVersionLinks/>
      </template>
      <template #page-top>
        <div v-if="$pagination">
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
import Layout from '@parent-theme/layouts/Layout.vue'

export default {
  components: {
    Layout
  }
}
</script>

