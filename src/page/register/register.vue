<template>
  <div class="register-wrapper">
    <div class="register">
      <el-form ref="form">
        <el-form-item>
          <h2 class="title">BookStore</h2>
          <p class="text-center">阅读是一种生活习惯</p>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="用户名" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="邮箱" v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="电话" v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/login" tag="el-link" :underline="false">已有账号？立即登录</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
var _util = require('@/common/js/util.js')
var _user = require('@/service/user-service.js')
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    register () {
      var _this = this
      var formData = {
        username: $.trim(this.user.username),
        password: $.trim(this.user.password),
        email: $.trim(this.user.email),
        phone: $.trim(this.user.phone)
      }
      var validateResult = this.formValidate(formData)
      if (validateResult.status) {
        _user.register(
          formData,
          res => {
            _this.$message.success('注册成功')
            _this.$router.push({ path: '/login' })
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
      } else if (!_util.validate(formData.password, 'require')) {
        res.msg = '密码不能为空'
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
.register-wrapper
  position relative
  display flex
  justify-content center
  .register
    margin-top 80px
    width 460px
    height 525px
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
    background #fff
    .el-form
      margin 30px 80px auto
      .el-form-item
        width 300px
        position relative
        .title
          text-align center
          font-weight bold
          color #505458
        .text-center
          margin-bottom 0
        .el-button
          width 300px
        .el-link
          position absolute
          top 0
          right 0
          text-decoration none
</style>
