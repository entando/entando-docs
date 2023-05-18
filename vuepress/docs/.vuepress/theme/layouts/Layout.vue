<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #sidebar-top>
        <EntandoVersionLinks/>
      </template>
      <template #page-body>
        <Content class="theme-default-content" />
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
