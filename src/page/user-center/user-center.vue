<template>
  <div class="user-center">
    <nav-default></nav-default>
    <div class="main">
      <div class="nav-side">
        <nav-side page="user-center"></nav-side>
      </div>
      <div class="content">
        <h3 class="title">个人信息</h3>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserInfo()">修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
import NavSide from '@/page/components/nav-side.vue'
var _util = require('@/common/js/util.js')
var _user = require('@/service/user-service.js')
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    NavDefault,
    NavSide
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      var _this = this
      _user.getUserInfo(
        res => {
          _this.userInfo = res
        }, err => {
          this.$message.error(err)
        }
      )
    },
    updateUserInfo () {
      var formData = {
        username: $.trim(this.userInfo.username),
        email: $.trim(this.userInfo.email),
        phone: $.trim(this.userInfo.phone)
      }
      var validateResult = this.formValidate(formData)
      var _this = this
      if (validateResult.status) {
        _user.updateUserInfo(formData,
          res => {
            _this.$message.success('更新成功')
          }, err => {
            _this.$message.error(err)
          })
      } else {
        this.$message.error(validateResult.msg)
      }
    },
    formValidate (formData) {
      var res = {
        status: false,
        msg: ''
      }
      if (!_util.validate(formData.username, 'require')) {
        res.msg = '用户名不能为空'
      } else if (!_util.validate(formData.email, 'require')) {
        res.msg = '邮箱不能为空'
      } else if (!_util.validate(formData.phone, 'require')) {
        res.msg = '手机号不能为空'
      } else if (!_util.validate(formData.email, 'email')) {
        res.msg = '邮箱格式不正确'
      } else if (!_util.validate(formData.phone, 'phone')) {
        res.msg = '手机号格式不正确'
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
.user-center
  .main
    display flex
    flex-direction row
    .nav-side
      width 200px
      height 500px
      margin 0 50px
      background #fff
      border-radius 2px
    .content
      flex 1
      padding 20px
      margin-right 50px
      background #fff
      .title
        padding-left 20px
        margin-bottom 30px
      .el-form
        width 50%
</style>
