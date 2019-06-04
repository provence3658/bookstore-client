<template>
  <div class="order">
    <nav-default></nav-default>
    <div class="col-md-offset-2 col-md-8">
      <table class="table">
        <tbody>
          <tr class="order-info header">
            <td class="cell-img">&nbsp;</td>
            <td class="cell-name">商品信息</td>
            <td class="cell-oneprice">单价</td>
            <td class="cell-quantity">数量</td>
            <td class="cell-total">合计</td>
          </tr>
        </tbody>
      </table>
      <table class="table" v-for="(order, index) in orderList" :key="index">
        <tbody>
          <tr class="order-info">
            <td colspan="6">
              <span class="order-info-text">订单号：{{order.orderNo}}</span>
              <span class="order-info-text">{{order.createTime}}</span>
              <span class="order-info-text">收件人：{{order.receiverName}}</span>
              <span class="order-info-text">订单状态：{{order.statusDesc}}</span>
              <span class="order-info-text">订单总价:￥{{order.payment}}</span>
              <span class="order-info-text link" @click="goToOrderDetail(order.orderNo)">
                查看详情
              </span>
            </td>
          </tr>
          <tr class="order-content" v-for="(book, index) in order.orderItemVoList" :key="index">
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
</template>

<script>
var _order = require('@/service/order-service.js')
import NavDefault from '@/page/components/nav.vue'

export default {
  data () {
    return {
      orderList: []
    }
  },
  components: {
    NavDefault
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      var _this = this
      _order.list(res=>{
        console.log(res)
        _this.orderList = res.list
      }, err=>{
        console.log(err)
      })
    },
    goToOrderDetail (orderNo) {
      this.$router.push({path: '/order-detail', query: {orderNo: orderNo}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.order-info
  background #eee
  padding 10px
  &.header
    td
      font-weight bold
  .order-info-text
    margin-right 25px
    color #999
    &.link
      cursor pointer
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
