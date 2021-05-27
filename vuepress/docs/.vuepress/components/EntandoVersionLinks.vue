<!-- This component is modeled on theme/components/NavLinks.vue but using custom Entando version config -->
<template>
  <div class="entando-version-links">
    <span class="version-wrapper">Entando {{version}}</span>
    <div
        v-for="item in links"
        :key="item.link"
        class="nav-item"
    >
      <DropdownLink
          v-if="item.type === 'links'"
          :item="item"
      />
      <NavLink
          v-else
          :item="item"
      />
    </div>
  </div>
</template>
<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'EntandoVersionLinks',

  components: {
    NavLink,
    DropdownLink
  },

  computed: {
    isDocs () {
      const currentPath = this.$page.path
      //Check for tutorials so the default is docs
      return !currentPath.includes("/tutorials")
    },

    version () {
      const entando = this.$site.themeConfig.entando

      const currentPath = this.$page.path
      if (!currentPath.includes(entando.version)) {
        //Relies on the nav consisting of a parent item with a child set of items, following the NavLinks design
        const item = this.nav[0].items.find(item => {
          return currentPath.startsWith(item.link)
        })
        entando.version = item ? item.text : "NEXT"
      }
      return entando.version
    },

    nav () {
      const entando = this.$site.themeConfig.entando
      return this.isDocs ? entando.docs : entando.tutorials
    },

    links () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
  }
}

//Lifted from @theme/util.js which can't be loaded directly in a child theme.
function resolveNavLinkItem (linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}
</script>

<style lang="stylus">
.entando-version-links
  color grey !important
  font-style italic
  font-weight 500
  padding-left: 1.5rem
  padding-top: 1.0rem
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor

  .nav-item
    position relative
    display inline-block
    line-height 2rem

    &:first-child
      margin-left 0

  .version-wrapper
    font-size 0.9rem
    font-variant small-caps

  .dropdown-wrapper
    .nav-dropdown
      z-index 100

    .dropdown-title span
      color grey
      font-style italic
      font-variant small-caps

  @media (max-width: $MQMobile)
    .nav-links
      .nav-item, .repo-link
        margin-left 0

  @media (min-width: $MQMobile)
    .nav-links a
      &:hover, &.router-link-active
        color $textColor
    .nav-item > a:not(.external)
      &:hover, &.router-link-active
        margin-bottom -2px
        border-bottom 2px solid lighten($accentColor, 8%)

</style>