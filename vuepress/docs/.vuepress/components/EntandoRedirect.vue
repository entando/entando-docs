<template>
</template>

<script>
/** From https://github.com/vuejs/vuepress/issues/239 */
/** Redirects to the given 'to' url, which is relative to the current location. */
export default {
  name: 'Redirect',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  beforeMount() {
    document.location.replace(this.to);
  }
}
</script>