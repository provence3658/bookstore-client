<template>
  <div class="shipping">
    <nav-default></nav-default>
    <div class="main">
      <div class="nav-side">
        <nav-side page="shipping"></nav-side>
      </div>
      <div class="content">
        <h2 class="title">收货地址</h2>
        <el-button type="primary" class="add" data-toggle="modal" data-target="#myModal">添加地址</el-button>
        <div class="table-wrapper" v-show="!showNo">
          <el-table :data="receiverInfo" style="width: 100%">
            <el-table-column prop="receiverName" label="姓名">
            </el-table-column>
            <el-table-column prop="receiverPhone" label="电话">
            </el-table-column>
            <el-table-column label="地址">
              <el-table-column prop="receiverProvince" label="省" width="120px">
              </el-table-column>
              <el-table-column prop="receiverCity" label="市" width="120px">
              </el-table-column>
              <el-table-column prop="receiverDistrict" label="区" width="120px">
              </el-table-column>
              <el-table-column prop="receiverAddress" label="详细地址">
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-pagination background layout="prev, pager, next" :total="data.total" :page-size="5" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <div class="showno" v-show="showNo">
          你还没有收货地址哟(＾Ｕ＾)
        </div>
      </div>
      <add-shipping></add-shipping>
    </div>
  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
import AddShipping from '@/page/components/add-shipping.vue'
import NavSide from '@/page/components/nav-side.vue'
var _shipping = require('@/service/shipping-service.js')
export default {
  data () {
    return {
      data: {},
      receiverInfo: [],
      showNo: false
    }
  },
  components: {
    NavDefault,
    AddShipping,
    NavSide
  },
  mounted () {
    this.getShippingList(1)
  },
  methods: {
    getShippingList (page) {
      var _this = this
      _shipping.getShippingList({
        pageNum: page
      }, res => {
        console.log(res)
        _this.data = res
        if (res.total === 0) { // 没有地址
          _this.showNo = true
        } else {
          _this.receiverInfo = res.list
        }
      }, err => {
        _this.$message.error(err)
      })
    },
    goToPage (page) {
      var _this = this
      if (page === 0) { return }
      _shipping.getShippingList({
        pageNum: page
      }, res => {
        console.log(res)
        _this.data = res
        _this.receiverInfo = res.list[0]
      }, err => {
        _this.$message.error(err)
      })
    },
    handleCurrentChange (currentPage) {
      this.getShippingList(currentPage)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  display flex
  flex-direction row
  .nav-side
    width 200px
    height 520px
    margin 0 50px
    background #fff
    border-radius 2px
  .content
    position relative
    flex 1
    padding 20px
    margin-right 50px
    background #fff
    .title
      padding-left 20px
      margin-bottom 30px
    .add
      position absolute
      top 30px
      right 20px
    .table-wrapper
      .el-pagination
        position absolute
        bottom 20px
        left 50%
        transform translateX(-50%)
    .showno
      line-height 360px
      text-align center
      font-size 16px
</style>
