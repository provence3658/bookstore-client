<template>
  <div class="list">
    <nav-default></nav-default>
    <div class="main">
      <div class="category-wrapper">
        <category @categoryId="getBookList"></category>
      </div>
      <div class="book-wrapper">
        <h4 class="title">{{currentName}}</h4>
        <book class="books" :books="this.bookList"></book>
        <el-pagination background layout="prev, pager, next" :total="data.total" @current-change="goToPage">
        </el-pagination>
      </div>
      <div class="hot-wrapper">
        <hot-books></hot-books>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/page/components/category.vue'
import Book from '@/page/components/book.vue'
import NavDefault from '@/page/components/nav.vue'
import HotBooks from '@/page/components/hot-books.vue'
var _book = require('@/service/book-service.js')
var _category = require('@/service/category-service.js')

export default {
  components: {
    Category,
    Book,
    NavDefault,
    HotBooks
  },
  data () {
    return {
      currentId: 0,
      currentName: '',
      bookList: [],
      data: {}
    }
  },
  mounted () {
    this.getBookList()
  },
  methods: {
    getBookList (id) {
      var _this = this
      if (!id) {
        id = this.$route.query.categoryId
      }
      this.currentId = id

      _category.getCategoryName(id, res => {
        _this.currentName = res
      }, err => {
        _this.$message.error(err)
      })

      _book.getBookList({
        categoryId: id
      }, res => {
        _this.data = res
        _this.bookList = res.list
      }, err => {
        _this.$message.error(err)
      })
    },
    goToPage (page) {
      var _this = this
      if (page === 0) { return }
      _book.getBookList({
        categoryId: this.currentId,
        pageNum: page
      }, res => {
        _this.data = res
        _this.bookList = res.list
      }, err => {
        _this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  .main
    display flex
    flex-direction row
    .category-wrapper
      width 200px
      height 520px
      border-radius 2px
      margin 0 30px 0 90px
      background #fff
    .book-wrapper
      flex 1
      padding 20px
      background #fff
      position relative
      .title
        padding-left 20px
      .el-pagination
        position absolute
        bottom 10px
        left 50%
        transform translateX(-50%)
    .hot-wrapper
      width 200px
      margin 0 90px 0 30px
      background #fff
</style>
