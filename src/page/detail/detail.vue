<template>
  <div class="detail">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="content">
          <h3 class="title">
            <i class="back el-icon-back" @click="goBack"></i>
            {{ book.name }}
          </h3>
          <hr>
          <div class="book-info">
            <div class="img-wrapper">
              <img class="image" :src="book.image">
            </div>
            <div class="detail-info">
              <el-form class="form" label-width="80px" label-position="left">
                <el-form-item label="作者">
                  <div>{{book.author}}</div>
                </el-form-item>
                <el-form-item label="定价">
                  <div>￥{{book.price}}</div>
                </el-form-item>
                <el-form-item label="类别">
                  <div>{{book.categoryDesc}}</div>
                </el-form-item>
                <el-form-item label="存货量">
                  <div>{{book.stock}}</div>
                </el-form-item>
                <el-form-item label="数量">
                  <el-input-number size="mini" v-model="num" :min="1" :max="10"></el-input-number>
                </el-form-item>
              </el-form>
              <el-button class="add-btn" size="small" type="primary" @click="add">
                <i class="el-icon-shopping-cart-1"></i>
                加入购物车
              </el-button>
            </div>
          </div>
        </div>
        <div class="content">
          <h3>内容简介</h3>
          <hr>
          {{ book.description }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
var _book = require('@/service/book-service.js')
var _cart = require('@/service/cart-service.js')
export default {
  data () {
    return {
      bookId: this.$route.query.bookId,
      book: {},
      num: 1
    }
  },
  mounted () {
    this.getBookDetal()
  },
  methods: {
    getBookDetal () {
      var _this = this
      _book.getBookDetail(
        this.bookId,
        res => {
          _this.book = res
          console.log(res)
        },
        err => {
          _this.$message.error(err)
        }
      )
    },
    add () {
      var _this = this
      console.log(this.num)
      _cart.addToCart({
        count: this.num,
        bookId: _this.bookId
      }, function (res) {
        _this.$message.success('添加到购物车啦')
      }, err => {
        _this.$message.error(err)
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  .content
    background #fff
    padding 20px
    margin-bottom 20px
    .title
      .back
        cursor pointer
    .book-info
      display flex
      flex-direction row
      .img-wrapper
        padding 10px
        width 40%
        .image
          width 100%
      .detail-info
        flex 1
        padding 10px
        margin-left 20px
        position relative
        .form
          .el-form-item
            margin-bottom 0
        .add-btn
          position absolute
          bottom 10px
</style>
