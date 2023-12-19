<template>
</template>

<script>
/** From https://github.com/vuejs/vuepress/issues/239 */
/** Redirects to the given 'path' url, which is relative to the current location and based on the active version. */
export default {
  name: 'Redirect',
  props: {
    path: {
      type: String,
      required: true
    }
  },
  beforeMount() {
    const path = '/v7.3/' + this.path;
    document.location.replace(path);
  }
}
</script>