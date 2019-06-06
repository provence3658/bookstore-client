<template>
  <div class="shipping">
    <nav-default></nav-default>
    <nav-side page="shipping"></nav-side>
    <div class="col-md-6">
      <div class="have" v-show="!showNo">
        <shipping-list :list="receiverInfo"></shipping-list>
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
      <div class="not-have" v-show="showNo">
        <div id="error" class="alert alert-warning">
          <a href="#" class="close" data-dismiss="alert">&times;</a>
          <strong>你还没有收货地址，先添加把~</strong>
        </div>
      </div>
    </div>
    <add-shipping></add-shipping>
  </div>
</template>

<script>
import ShippingList from "@/page/client/shipping/list.vue"
var _shipping = require("@/service/shipping-service.js")
import NavDefault from '@/page/components/nav.vue'
import AddShipping from '@/page/components/add-shipping.vue'
import NavSide from "@/page/components/nav-side.vue"
export default {
  data () {
    return {
      data: {},
      receiverInfo: {},
      showNo: false
    }
  },
  components: {
    ShippingList,
    NavDefault,
    AddShipping,
    NavSide
  },
  mounted () {
    this.getShippingList()
  },
  methods: {
    getShippingList () {
      var _this = this
      _shipping.getShippingList({},res=>{
        console.log(res)
        _this.data = res
        if (res.total === 0) { //没有地址
          _this.showNo = true
        } else {
          _this.receiverInfo = res.list[0]
        }
      },err=>{
        _this.$message.error(err)
      })
    },
    goToPage (page) {
      var _this = this
      if (page === 0)
        return
      _shipping.getShippingList({
        pageNum: page
        },res=>{
          console.log(res)
          _this.data = res
          _this.receiverInfo = res.list[0]
      },err=>{
        _this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
  text-align center
  .pagination
    cursor pointer
</style>

