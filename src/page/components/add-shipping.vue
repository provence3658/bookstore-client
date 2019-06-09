<template>
  <div class="add-shipping">
    <!-- 模态框（Modal） -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">添加收货地址</h4>
          </div>
          <div class="modal-body">
            <el-form ref="form" label-width="80px">
              <el-form-item label="收货人">
                <el-input v-model="newShipping.receiverName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="newShipping.receiverPhone"></el-input>
              </el-form-item>
              <el-form-item label="所在地区">
                <el-col :span="5">
                  <el-select @change="changeProvince" v-model="newShipping.receiverProvince" placeholder="省">
                    <el-option v-for="(item, index) in province" :key="index" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="5">
                  <el-select @change="changeCity" v-model="newShipping.receiverCity" placeholder="市">
                    <el-option v-for="(item, index) in city" :key="index" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="5">
                  <el-select v-model="dd" placeholder="区">
                    <el-option v-for="(item, index) in district" :key="index" :label="item" :value="item"></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input v-model="newShipping.receiverAddress"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <el-button data-dismiss="modal">取消</el-button>
            <el-button @click="addShipping()" type="primary" data-dismiss="modal">添加</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var _shipping = require('@/service/shipping-service.js')
var _util = require('@/common/js/util.js')

export default {
  name: 'AddShiping',
  data () {
    return {
      newShipping: {},
      province: [],
      city: [],
      district: [],
      dd: ''
    }
  },
  inject: ['reload'],
  mounted () {
    this.getProvince()
  },
  methods: {
    addShipping () {
      var _this = this
      this.newShipping.receiverDistrict = this.dd
      var validateResult = this.formValidate(this.newShipping)
      if (validateResult.status) {
        _shipping.addShiping(this.newShipping,
          res => {
            // console.log(res)
            _this.$message.success('添加地址成功！')
          }, err => {
            _this.$message.error(err)
          })
        this.reload()
      } else {
        this.$message.error(validateResult.msg)
      }
    },
    getProvince () {
      this.$axios.get('/static/mock/city.json').then(this.getCityInfoSucc)
    },
    getCityInfoSucc (res) {
      // console.log(res.data)
      this.province = res.data
    },
    changeProvince () {
      var _this = this
      this.city = []
      this.newShipping.receiverCity = ''
      this.province.forEach(i => {
        if (i.name === this.newShipping.receiverProvince) {
          _this.city = i.city
        }
      })
    },
    changeCity () {
      var _this = this
      this.district = []
      // this.newShipping.receiverDistrict = ''
      this.dd = ''
      this.city.forEach(i => {
        if (i.name === this.newShipping.receiverCity) {
          _this.district = i.area
        }
      })
    },
    formValidate (formData) {
      var res = {
        status: false,
        msg: ''
      }
      if (!_util.validate(formData.receiverName, 'require')) {
        res.msg = '收货人不能为空'
      } else if (!_util.validate(formData.receiverPhone, 'require')) {
        res.msg = '手机号码不能为空'
      } else if (!_util.validate(formData.receiverPhone, 'phone')) {
        res.msg = '手机号码格式不正确'
      } else if (!_util.validate(formData.receiverProvince, 'require')) {
        res.msg = '省不能为空'
      } else if (!_util.validate(formData.receiverCity, 'require')) {
        res.msg = '市不能为空'
      } else if (!_util.validate(formData.receiverDistrict, 'require')) {
        res.msg = '区不能为空'
      } else if (!_util.validate(formData.receiverAddress, 'require')) {
        res.msg = '详细地址不能为空'
      } else {
        // 通过验证
        res.status = true
        res.msg = '验证通过'
      }
      return res
    }
  }
}
</script>

<style lang="stylus" scoped>
.line
  text-align center
</style>
