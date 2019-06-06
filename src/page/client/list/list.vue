<template>
  <div class="list">
    <nav-default></nav-default>
    <div class="aside col-xs-2 col-md-offset-1">
      <category @categoryId="getBookList"></category>
    </div>
    <div class="main">
      <div class="col-xs-6">
        <ul class="breadcrumb" style="margin-top: 10px;">
          <li><a href="#">{{currentName}}</a></li>
        </ul>
        <book class="books" :books="this.bookList"></book>
        <div class="pagination-wrapper">
          <ul class="pagination">
            <li :class="data.hasPreviousPage ? '' : 'disabled'">
              <a @click="goToPage(data.prePage)">&laquo;</a>
            </li>
            <li
              v-for="(page,index) in data.navigatepageNums"
              :key="index"
              :class="data.pageNum===page ? 'active' : '' ">
              <a @click="goToPage(page)">{{page}}</a>
            </li>
            <li :class="data.hasNextPage ? '' : 'disabled'">
              <a @click="goToPage(data.nextPage)">&raquo;</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/page/components/category.vue'
import Book from '@/page/components/book.vue'
var _book = require('@/service/book-service.js')
var _category = require('@/service/category-service.js')
import NavDefault from '@/page/components/nav.vue'

export default {
  components: {
    Category,
    Book,
    NavDefault
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

      _category.getCategoryName(id,res=>{
        _this.currentName = res
      },err=>{
        _this.$message.error(err)
      })
      
      _book.getBookList({
        categoryId: id
        },res=>{
          _this.data = res
        _this.bookList = res.list
      },err=>{
        _this.$message.error(err)
      })
    },
    goToPage (page) {
      var _this = this
      if (page === 0)
        return
      _book.getBookList({
        categoryId: this.currentId,
        pageNum: page
        },res=>{
          _this.data = res
          _this.bookList = res.list
      },err=>{
        _this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.books
  padding 0 20px
  height 400px
.pagination-wrapper
  margin 0 auto
  text-align center
  .pagination
    cursor pointer
</style>
