<template>
  <div class="detail">
    <div class="col-md-offset-3 col-md-6">
      <div class="detail-heading card">
        <h2>{{ book.name }}</h2>
        <hr>
        <img class="image" :src="book.image">
        <div class="detail-info">
          <p>定 价：￥{{ book.price }}</p>
          <p>作 者：{{ book.author }}</p>
          <p>存 货 量：{{ book.stock }}</p>
          <button class="btn btn-primary" @click="add()">
            <span class="glyphicon glyphicon-shopping-cart"></span>加入购物车
          </button>
        </div>
      </div>
      <div class="detail-content card">
        <h3>内容简介</h3>
        <hr>
        {{ book.description }}
      </div>
    </div>
  </div>
</template>

<script>
var _book = require("@/service/book-service.js")
var _cart = require("@/service/cart-service.js")
export default {
  data() {
    return {
      bookId: this.$route.query.bookId,
      book: {}
    };
  },
  mounted() {
    this.getBookDetal();
  },
  methods: {
    getBookDetal() {
      var _this = this
      _book.getBookDetail(
        this.bookId,
        res => {
          _this.book = res
        },
        err=>{
          _this.$message.error(err)
        }
      )
    },
    add () {
      var _this = this
      _cart.addToCart({
        count: 1,
        bookId: _this.bookId
      },function(res) {
        _this.$message.success('添加到购物车啦');
      },err => {
        _this.$message.error(err)
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail
  margin-top 10px
  .image
    height 300px
    width 200px
    display inline-block
  .detail-info
    display inline-block
    vertical-align bottom
    margin-left 40px
</style>

