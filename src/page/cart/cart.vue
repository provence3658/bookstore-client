<template>
  <div class="cart">
    <nav-default></nav-default>
    <el-row :gutter="20">
      <el-col :span="20" :offset="2">
        <div class="shipping-wrapper">
          <div class="each-shipping" v-for="(item, index) in receiverList" :key="index" @click="chooseShipping(item.id)" :class="item.id === shippingId ?'active': ''">
            <p class="header">{{item.receiverProvince}} {{item.receiverCity}}({{item.receiverName}}收)</p>
            <p> {{item.receiverDistrict}} {{item.receiverAddress}}</p>
            <p>{{item.receiverPhone}}</p>
          </div>
          <div class="each-shipping">
            <div class="address-new" data-toggle="modal" data-target="#myModal">
              <span class="plus glyphicon glyphicon-plus" aria-hidden="true"></span>
              <span class="text">使用新地址</span>
            </div>
          </div>
          <add-shipping></add-shipping>
        </div>
        <div class="cart-wrapper">
          <el-table :data="cartList" style="width: 100%">
            <el-table-column width="55">
              <template slot-scope="scope">
                <input type="checkbox" @click="selectThisBook(scope.row.bookId, scope.row.bookCheckded)" :checked="scope.row.bookCheckded">
              </template>
            </el-table-column>
            <el-table-column label="图片" width="120">
              <template slot-scope="scope">
                <el-image :src="scope.row.bookImage"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="bookName" label="书名" width="180">
            </el-table-column>
            <el-table-column prop="bookPrice" label="单价" width="180">
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input-number size="mini" v-model="scope.row.quantity" :min="1" :max="10"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="bookTotalPrice" label="小计">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="deleteBook(scope.row.bookId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="summary" v-show="cartList.length>0">
            <el-col :span="6">
              <el-button type="success" size="small" @click="selectAll(1)">全选</el-button>
              <el-button type="success" size="small" @click="selectAll(0)">全不选</el-button>
              <el-button type="danger" size="small" @click="deleteSelected">删除选中</el-button>
            </el-col>
            <el-col :span="6" :offset="8">
              <span class="price">￥{{cartTotalPrice}}</span>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" @click="createOrder">结算</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
import AddShipping from '@/page/components/add-shipping.vue'
var _cart = require('@/service/cart-service.js')
var _order = require('@/service/order-service.js')
var _shipping = require('@/service/shipping-service.js')

export default {
  data () {
    return {
      cartList: [],
      cartTotalPrice: 0,
      receiverList: [],
      shippingId: 1,
      orderInfo: {},
      orderNo: '',
      allChecked: false
    }
  },
  components: {
    NavDefault,
    AddShipping
  },
  mounted () {
    this.getCart()
    this.getShippingList()
  },
  methods: {
    getCart () {
      var _this = this
      _cart.getCartList(res => {
        _this.refresh(res)
      }, err => {
        _this.$message.error(err)
      })
    },
    update (quantity, bookId) {
      var _this = this
      _cart.updateBook({
        count: quantity,
        bookId: bookId
      }, res => {
        _this.refresh(res)
      }, err => {
        _this.$message.error(err)
      })
    },
    deleteBook (bookId) {
      var _this = this
      _cart.deleteBook(bookId, res => {
        _this.refresh(res)
      }, err => {
        _this.$message.error(err)
      })
    },
    selectThisBook (bookId, isChecked) {
      var _this = this
      console.log(1)
      if (isChecked === 1) { // 反选
        _cart.unselectBook(bookId, res => {
          _this.refresh(res)
        }, err => {
          _this.$message.error(err)
        })
      } else { // 正选
        _cart.selectBook(bookId, res => {
          _this.refresh(res)
        }, err => {
          _this.$message.error(err)
        })
      }
    },
    selectAll (type) {
      var _this = this
      if (type === 0) { // 全不选
        _cart.unselectAllBook(res => {
          _this.refresh(res)
        }, err => {
          _this.$message.error(err)
        })
      } else { // 全选
        _cart.selectAllBook(res => {
          _this.refresh(res)
        }, err => {
          _this.$message.error(err)
        })
      }
    },
    deleteSelected () {
      var dels = ''
      this.cartList.forEach(cart => {
        if (cart.bookCheckded === 1) {
          dels += `${cart.bookId},`
        }
      })
      var _this = this
      _cart.deleteBook(dels, res => {
        _this.refresh(res)
      }, err => {
        _this.$message.error(err)
      })
    },
    getShippingList () {
      var _this = this
      _shipping.getShippingList({ pageSize: 3 }, res => {
        _this.receiverList = res.list
        _this.shippingId = res.list[0].id
        // console.log(_this.shippingId)
        // console.log(res)
      }, err => {
        _this.$message.error(err)
      })
    },
    createOrder () {
      var _this = this
      _order.create(this.shippingId, res => {
        // console.log(res)
        _this.orderInfo = res
        _this.orderNo = res.orderNo
        _this.$router.push({ path: '/pay', query: { orderNo: _this.orderNo } })
      }, err => {
        console.log(err)
      })
    },
    refresh (res) {
      this.cartList = res.cartBookVoList
      this.cartTotalPrice = res.cartTotalPrice
      this.allChecked = res.allChecked
      console.log(res)
    },
    chooseShipping (id) {
      this.shippingId = id
    },
    goToBookDetail (id) {
      this.$router.push({ path: '/detail', query: { bookId: id } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cart
  text-align center
  .shipping-wrapper
    padding 0 20px
    margin-top 20px
    font-size 0
    .each-shipping
      vertical-align top
      height 106px
      display inline-block
      background url('./mail.jpg') no-repeat
      margin-right 5px
      padding 6px 17px
      &.active
        background url('./mail_1.jpg') no-repeat
      p
        font-size 12px
        line-height 20px
        margin-bottom 5px
        color #666
        width 203px
      .header
        border-bottom 1px dashed #ccc
        line-height 28px
      .address-new
        padding 15px
        text-align center
        color #ccc
        width 203px
        font-size 12px
        .plus
          height 30px
          line-height 30px
          display block
          font-size 36px
          margin-bottom 10px
  .cart-wrapper
    padding 20px
    margin-top 10px
    .summary
      width 100%
      height 80px
      background #fff
      line-height 80px
      .price
        font-size 20px
        margin-right 40px
</style>
