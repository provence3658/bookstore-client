<template>
  <div class="search">
    <nav-default></nav-default>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="book-wrapper">
          <div v-show="bookList.length>0">
            <book class="books" :books="this.bookList"></book>
            <el-pagination background layout="prev, pager, next" :total="data.total" @current-change="goToPage">
            </el-pagination>
          </div>
          <div class="nothing" v-show="bookList.length === 0">
            这里什么也没有~
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Book from '@/page/components/book.vue'
import NavDefault from '@/page/components/nav.vue'
var _book = require('@/service/book-service.js')
export default {
  data () {
    return {
      data: {},
      bookList: [],
      keyword: ''
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
      }, res => {
        _this.data = res
        _this.bookList = res.list
        console.log(res)
      }, err => {
        _this.$message.error(err)
      })
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.getBookList()
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
  overflow hidden
  .book-wrapper
    padding 20px
    background #fff
    height 520px
    position relative
    .el-pagination
      position absolute
      bottom 10px
      left 50%
      transform translateX(-50%)
    .nothing
      line-height 500px
      text-align center
      font-size 20px
</style>
