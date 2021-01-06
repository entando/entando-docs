<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #sidebar-top>
        <EntandoVersionLinks/>
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
