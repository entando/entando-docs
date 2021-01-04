<!-- Override the default Layout so we can add the cookie banner and tracking to all content pages using the theme.
Similar code exists in components/SpecialLayout.vue -->
<template>
  <div>
    <Layout/>
    <tracking/>
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
