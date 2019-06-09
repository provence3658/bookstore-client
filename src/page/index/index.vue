<template>
  <div class="index">
    <nav-default></nav-default>
    <div class="main">
      <div class="category-wrapper">
        <category></category>
      </div>
      <div class="carousel-wrapper">
        <carousel></carousel>
      </div>
      <div class="hot-wrapper">
        <hot-books></hot-books>
      </div>
    </div>
    <div class="recommend">
      <div class="title">
        <h3>为你推荐(未实现)</h3>
      </div>
      <div class="booklist">
        <div class="book">
          <img src="https://img3.doubanio.com/view/subject/m/public/s27264181.jpg" alt="">
          <div class="price">￥39</div>
        </div>
        <div class="book">
          <img src="https://img3.doubanio.com/view/subject/m/public/s4610502.jpg" alt="">
          <div class="price">￥29.8</div>
        </div>
        <div class="book">
          <img src="https://img1.doubanio.com/view/subject/m/public/s29518349.jpg" alt="">
          <div class="price">￥168</div>
        </div>
        <div class="book">
          <img src="https://img3.doubanio.com/view/subject/m/public/s28369176.jpg" alt="">
          <div class="price">￥39</div>
        </div>
        <div class="book">
          <img src="https://img1.doubanio.com/view/subject/l/public/s29979849.jpg" alt="">
          <div class="price">￥65</div>
        </div>
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
  .main
    display flex
    flex-direction row
    .category-wrapper
      width 200px
      border-radius 2px
      margin 0 30px 0 90px
      background #fff
    .carousel-wrapper
      flex 1
      padding 20px
      background #fff
    .hot-wrapper
      width 200px
      margin 0 90px 0 30px
      background #fff
  .recommend
    margin 30px 90px
    background #fff
    .title
      margin 10px
      padding 10px
    .booklist
      padding 0 20px
      box-sizing border-box
      .book
        width 19%
        display inline-block
        padding 0 20px
        img
          width 100%
        .price
          font-size 16px
          text-align center
          padding 10px
</style>
