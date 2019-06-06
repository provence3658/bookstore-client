<template>
  <div class="cart">
    <nav-default></nav-default>
    <div class="col-md-offset-1 col-md-10">
      <div class="shipping-wrapper" v-show="!showNoBook">
        <div
          class="each-shipping"
          v-for="(item, index) in receiverList"
          :key="index"
          @click="chooseShipping(item.id)"
          :class="item.id === shippingId ?'active': ''"
        >
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
      <table class="table cart-wrapper" v-show="!showNoBook">
        <tbody>
        <tr>
          <td><input type="checkbox" @click="selectAll()" :checked="allChecked">全选</td>
          <td>图片</td>
          <td>信息</td>
          <td>单价（元）</td>
          <td>数量</td>
          <td>小计（元）</td>
          <td>操作</td>
        </tr>
        </tbody>
        <tbody>
        <tr v-for="cart in cartList" :key="cart.bookName">
          <td class="line">
            <input type="checkbox" @click="selectThisBook(cart.bookId, cart.bookCheckded)" :checked="cart.bookCheckded">
          </td>
          <td><img height="72px" width="60px" :src="cart.bookImage"></td>
          <td class="line el-link" @click="goToBookDetail(cart.bookId)">{{cart.bookName}}</td>
          <td class="line">{{cart.bookPrice}}</td>
          <td class="line">
            <a class="update" @click="update(--cart.quantity, cart.bookId)">-</a>
            <input class="number" type="text" :value="cart.quantity">
            <a class="update" @click="update(++cart.quantity, cart.bookId)">+</a>
          </td>
          <td class="line">{{cart.bookTotalPrice}}</td>
          <td class="line"><button type="button" class="btn btn-warning btn-sm"  data-toggle="modal" :data-target="`#${cart.bookId}`">删除</button></td>
          <div class="modal fade" :id="cart.bookId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="myModalLabel">提示框</h4>
                </div>
                <div class="modal-body">确认要删除该书本么</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">我再想想</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteBook(cart.bookId)">确定</button>
                </div>
              </div>
            </div>
          </div>
        </tr>
        <tr>
          <td class="line">
            <button type="button" class="btn btn-danger" @click="deleteSelected()">
              删除选中</button>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="line">总价：{{cartTotalPrice}}</td>
          <td class="line">
            <button type="button" class="btn btn-primary" @click="createOrder()">结算</button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="noBook" v-show="showNoBook">
        <div id="error" class="alert alert-warning">
          <a href="#" class="close" data-dismiss="alert">&times;</a>
          <strong>你的购物车中还没有书哦~</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
var _cart = require('@/service/cart-service.js')
var _order = require('@/service/order-service.js')
var _shipping = require("@/service/shipping-service.js")
import AddShipping from '@/page/components/add-shipping.vue'

export default {
  data () {
    return {
      cartList: [],
      cartTotalPrice: 0,
      allChecked: false,
      showNoBook: true,
      receiverList: [],
      shippingId: 1,
      orderInfo: {},
      orderNo: ''
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
      _cart.getCartList(res=>{
        _this.refresh(res)
      },err=>{
        _this.$message.error(err)
      })
    },
    update (quantity, bookId) {
      var _this = this
      _cart.updateBook({
        count: quantity,
        bookId: bookId
      },res=>{
        _this.refresh(res)
      },err=>{
        _this.$message.error(err)
      })
    },
    deleteBook (bookId) {
      var _this = this
      _cart.deleteBook(bookId,res=>{
        _this.refresh(res)
      },err=>{
        _this.$message.error(err)
      })
    },
    selectThisBook (bookId, isChecked) {
      var _this = this
      if (isChecked === 1) { //反选
        _cart.unselectBook(bookId,res=>{
          _this.refresh(res)
        },err=>{
          _this.$message.error(err)
        })
      } else { //正选
        _cart.selectBook(bookId,res=>{
          _this.refresh(res)
        },err=>{
          _this.$message.error(err)
        })
      }
    },
    selectAll () {
      var _this = this
      if (this.allChecked) {  //全不选
        _cart.unselectAllBook(res=>{
          _this.refresh(res)
        },err=>{
          _this.$message.error(err)
        })
      } else { //全选
        _cart.selectAllBook(res=>{
          _this.refresh(res)
        },err=>{
          _this.$message.error(err)
        })
      }
    },
    deleteSelected () {
      // console.log(this.cartList)
      var dels = ''
      this.cartList.forEach(cart => {
        if (cart.bookCheckded === 1) {
          dels += `${cart.bookId},`
        }
      })
      var _this = this
      _cart.deleteBook(dels,res=>{
        _this.refresh(res)
      },err=>{
        _this.$message.error(err)
      })
    },
    getShippingList () {
      var _this = this
      _shipping.getShippingList({pageSize: 3},res=>{
        console.log(res)
        _this.receiverList = res.list
      },err=>{
        _this.$message.error(err)
      })
    },
    createOrder () {
      var _this = this
      _order.create(this.shippingId,res=>{
        // console.log(res)
        _this.orderInfo = res
        _this.orderNo = res.orderNo
        _this.$router.push({path: '/pay', query: {orderNo: _this.orderNo}})
      }, err=>{
        console.log(err)
      })
    },
    refresh(res) {
      $('#error').hide()
      this.cartList= res.cartBookVoList
      this.cartTotalPrice = res.cartTotalPrice
      this.allChecked = res.allChecked
      if (this.cartList.length === 0) {
        this.showNoBook = true
        $('#error').show()
      } else {
        this.showNoBook = false
      }
    },
    chooseShipping (id) {
      this.shippingId = id
    },
    goToBookDetail(id) {
      this.$router.push({path:'/detail', query: {bookId: id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.cart
  text-align center
  .shipping-wrapper
    padding 0 50px
    .each-shipping
      height: 106px
      float: left
      background url("./mail.jpg") no-repeat
      margin-right: 5px
      padding: 6px 17px
      &.active
        background url("./mail_1.jpg") no-repeat
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
        padding: 10px;
        text-align: center;
        color: #ccc;
        width 203px
        .plus
          height 30px
          line-height 30px
          display block
          font-size 36px
          margin-bottom 10px
  .cart-wrapper
    .line
      height 80px
      line-height 80px    
      .update
        margin 5px
        cursor pointer
      .number
        text-align center
        width 32px
        height 32px
        border solid 1px lightgray
  .noBook
    #error
      display none
</style>

