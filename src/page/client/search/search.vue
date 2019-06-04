<template>
  <div class="search">
    <nav-default></nav-default>
    <div class="main">
      <div class="col-md-offset-3 col-xs-6">
        <div class="alert alert-warning" v-show="data.total === 0">没有找到你想要的书~</div>
        <div v-show="data.total>0">
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
  </div>
</template>

<script>
var _book = require('@/service/book-service.js')
import Book from '@/page/components/book.vue'
import NavDefault from '@/page/components/nav.vue'
export default {
  data () {
    return {
      data:{},
      bookList:[],
      keyword:''
    }
  },
  components: {
    NavDefault,
    Book
  },
  mounted () {
    this.getBookList()
  },
  methods: {
    getBookList () {
      var keyword = this.$route.query.keyword
      var _this = this
      _book.getBookList({
        keyword: keyword
        },res=>{  
        _this.data = res
        _this.bookList = res.list
        console.log(res)
        },err=>{
        _this.$message.error(err)
      })
    }
  },
  watch: {
    $route:{
      handler:function(val, oldVal){
        this.getBookList()
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
  margin 0 auto
  text-align center
  .pagination
    cursor pointer
</style>
