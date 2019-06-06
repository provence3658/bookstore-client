<template>
  <div class="order">
    <nav-default></nav-default>
    <div class="unpay col-md-offset-2 col-md-8" v-show="!payStatus">
      <div class="header">确认收货地址</div>
      <div class="shipping-content">
        <p>{{receiverTitle}}</p>
        <p>{{receiverBody}}</p>
        <p>{{receiverFoot}}</p>
      </div>
      <div class="header">确认订单信息</div>
      <div class="book-content">
        <table class="table">
          <tbody class="order-info">
            <tr>
              <td colspan="5">
                <span class="info-text">订单号：{{data.orderNo}}</span>
                <span class="info-text">总价：{{data.payment}}</span>
              </td>
            </tr>
          </tbody>
          <tbody class="order-desc">
            <tr>
              <td>图片</td>
              <td>信息</td>
              <td>单价（元）</td>
              <td>数量</td>
              <td>小计（元）</td>
            </tr>
            <tr v-for="(item, index) in orderItemVoList" :key="index">
              <td><img :src="item.bookImage"  width="80" height="100"></td>
              <td>{{item.bookName}}</td>
              <td>{{item.onePrice}}</td>
              <td>{{item.quantity}}</td>
              <td>{{item.totalPrice}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="header">支付宝支付</div>
      <img :src="qrUrl">
    </div>
    <!-- todo支付成功的跳转 -->
    <div class="paid" v-show="payStatus">
      <div class="pay-success">
        <img src="./pay-success.png">
        恭喜您，支付成功
      </div>
      <div class="pay-info">
        <p>订单编号：{{data.orderNo}}</p>
        <p>订单金额：{{data.payment}}元</p>
      </div>
      <el-button size="small" @click="goToDetail">查看订单详情</el-button>
    </div>
  </div>
</template>

<script>
var _order = require("@/service/order-service.js")
import NavDefault from "@/page/components/nav.vue"
export default {
  data() {
    return {
      shippingVo: {},
      orderItemVoList: [],
      data: {},
      qrUrl: "",
      orderNo: this.$route.query.orderNo,
      payStatus: false
    }
  },
  components: {
    NavDefault
  },
  mounted() {
    this.getOrderDetail()
    this.pay()
  },
  methods: {
    getOrderDetail() {
      // var orderNo = this.$route.query.orderNo
      var _this = this
      _order.detail(
        this.orderNo,
        res => {
          _this.data = res
          _this.shippingVo = res.shippingVo
          _this.orderItemVoList = res.orderItemVoList
        },
        err => {
          _this.$message.error(err)
        }
      )
    },
    pay() {
      var _this = this
      _order.pay(
        this.orderNo,
        res => {
          _this.qrUrl = res.qrUrl
          setInterval(this.queryPayStatus, 1000)
        },
        err => {
          _this.$message.error(err)
        }
      )
    },
    queryPayStatus() {
      var _this = this
      _order.queryOrderPayStatus(
        this.data.orderNo,
        res => {
          _this.payStatus = res
        },
        err => {
          _this.$message.error(err)
        }
      )
    },
    goToDetail () {
      this.$router.push({path: '/order-detail', query: {orderNo: this.orderNo}})      
    }
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.queryPayStatus);
    console.log("beforeDestroy");
  },
  computed: {
    receiverTitle () {
      if (this.shippingVo != null) {
        return `${this.shippingVo.receiverProvince}
        ${this.shippingVo.receiverCity}
        (${this.shippingVo.receiverName}收)`
      } else {
        return ''
      }
    },
    receiverBody () {
      if (this.shippingVo != null) {
        return `${this.shippingVo.receiverDistrict}
        ${this.shippingVo.receiverAddress}`
      } else {
        return ''
      }
    },
    receiverFoot () {
      if (this.shippingVo != null) {
        return `${this.shippingVo.receiverPhone}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.unpay
  
  .header
    font-size 18px
    font-weight bold
    margin-bottom 5px

  .shipping-content
    padding 20px
    height 106px
    background url(../cart/mail_1.jpg) no-repeat
    margin-bottom 20px
    font-size 12px

  .book-content
    .order-info
      background #eee
      padding 10px
      .info-text
        margin 0 10px
    .order-desc
      background #fafafa
      td
        text-align center
.paid
  text-align center

  .pay-success 
    font-size 18px
    font-weight bold
    color #666

  .pay-info 
    padding 10px
</style>
