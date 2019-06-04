<template>
  <div class="index">
    <nav-default></nav-default>
    <div class="col-xs-2 col-md-offset-1">
      <category></category>
    </div>
    <div class="main">
      <div class="carousel">
        <carousel class="col-xs-6"></carousel>
      </div>
      <div class="hot-books">
        <hot-books class="col-xs-2"></hot-books>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '@/page/components/carousel.vue'
import HotBooks from '@/page/components/hot-books.vue'
import Category from '@/page/components/category.vue'
import NavDefault from '@/page/components/nav.vue'

export default {
  name: 'Index',
  components: {
    Carousel,
    HotBooks,
    Category,
    NavDefault
  }
}
</script>

<style lang="stylus" scoped>
.index
  margin 0 auto
</style>
