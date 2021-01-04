<!-- Override the default Layout so we can add hubspot-tracking to all content pages using the theme.
Similar code exists in components/SpecialLayout.vue -->
<template>
  <div>
    <Layout/>
    <hubspot-tracking/>
  </div>
</template>
<script>
import Layout from '@parent-theme/layouts/Layout.vue'
import HubspotTracking from "../../components/HubspotTracking";

export default {
  components: {
    HubspotTracking,
    Layout
  }
}
</script>
