<template>
  <div class="order-detail">
    <nav-default></nav-default>
    <div class="panel col-md-offset-2 col-md-8">
      <div class="panel-title">订单信息</div>
      <div class="panel-body">
        <div class="text-line">
          <span class="text">订单号:{{data.orderNo}}</span>
          <span class="text">订单状态:{{data.statusDesc}}</span>
        </div>
        <div class="text-line">
          <span class="text">收件人:{{data.receiverName}}</span>
          <!-- <span class="text"> {{data.shippingVo.receiverPhone}}</span> -->
        </div>
        <div class="text-line">
          收件地址:
          {{data.shippingVo.receiverProvince}}
          {{data.shippingVo.receiverCity}}
          {{data.shippingVo.receiverDistrict}}
          {{data.shippingVo.receiverAddress}}
        </div>
      </div>
    </div>
    <div class="panel col-md-offset-2 col-md-8">
      <div class="panel-title">书籍清单</div>
      <div class="panel-body">
        <table class="table">
          <tbody>
            <tr class="order-header">
              <td class="cell-img">&nbsp;</td>
              <td class="cell-name">商品信息</td>
              <td class="cell-oneprice">单价</td>
              <td class="cell-quantity">数量</td>
              <td class="cell-total">合计</td>
            </tr>
          </tbody>
          <tbody>
            <tr class="order-content" v-for="(book, index) in data.orderItemVoList" :key="index">
              <td class="cell-img"><img :src="book.bookImage" width="80" height="100"></td>
              <td class="cell-name">{{book.bookName}}</td>
              <td class="cell-oneprice">￥{{book.onePrice}}</td>
              <td class="cell-quantity">{{book.quantity}}</td>
              <td class="cell-total">￥{{book.totalPrice}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
var _order = require("@/service/order-service.js")
export default {
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      data: {}
    }
  },
  components: {
    NavDefault
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      var _this = this
      _order.detail(this.orderNo,res => {
        console.log(res)
        _this.data = res
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.order-detail
  .panel
    padding 10px
    margin-bottom 10px
    background #fff
    .panel-title
      padding 10px
      font-size 14px
      border-bottom 1px solid #eee
      color #666
      font-weight 700
    .panel-body
      padding 10px 20px
      .text-line
        height 30px
        line-height 30px
        .text
          margin-right 20px
      .order-header
        background #eee
        padding 10px
        td
          font-weight bold
      .order-content
        background #fafafa
        td
          line-height 100px
        .cell-img
          width 15%
        .cell-name
          width 35%
        .cell-oneprice
          width 20%
        .cell-quantity
          width 15%
        .cell-total
          width 15%
</style>
