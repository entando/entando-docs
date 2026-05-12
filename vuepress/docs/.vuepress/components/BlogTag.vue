<template>
  <router-link class="blog-tag" :to="tag.path">
    {{ tag.name }} ({{ tag.pages.length }})
  </router-link>
</template>

<script>
export default {
  name: 'BlogTag',
  props: ['tag'],
}
</script>

<style lang="stylus">
.blog-tag
  display inline-flex
  align-items center
  height 45px
  word-break break-word
  font-size 14px
  margin-right 20px
  margin-bottom 20px
  padding 0 15px
  border-radius 4px
  font-weight 500
  font-family 'Montserrat', 'Roboto', sans-serif
  text-align left
  box-sizing border-box
  transition background-color 0.3s
  color $darkTextColor
  border 1px solid #E5E8E9
  text-decoration none
  transition all 0.5s

  &:nth-child(4n + 1)
    border-left 4px solid #FDD822

  &:nth-child(4n + 2)
    border-left 4px solid #A4C621

  &:nth-child(4n + 3)
    border-left 4px solid #A27BB5

  &:nth-child(4n + 4)
    border-left 4px solid #EE7957

  &:hover
    color $accentColor !important
    border 1px solid $accentColor
    box-shadow 0 0 0 3px rgba($accentColor, 0.12)

@media screen and (max-width: 768px)
  .blog-tag
    font-size 14px
    padding 3px 10px
    margin-right 10px
    margin-bottom 10px
</style>
