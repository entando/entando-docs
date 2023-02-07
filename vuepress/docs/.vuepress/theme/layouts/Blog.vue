<!-- Override and extend the default theme Layout -->
<template>
  <div>
    <Layout>
      <template #sidebar-top>
        <EntandoVersionLinks/>
      </template>
      <template #page-bottom>
        <PostTag :tag="$frontmatter.tags"/>
      </template>
    </Layout>
    <Tracking/>
  </div>
</template>
<script>
import Layout from '@parent-theme/layouts/Layout.vue'
import EntandoVersionLinks from "../../components/EntandoVersionLinks";
import Tracking from "../../components/Tracking";
import PostTag from "../../components/PostTag";

export default {
  components: {
    PostTag,
    Layout,
    EntandoVersionLinks,
    Tracking
  }
}
</script>
