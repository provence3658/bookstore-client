<template>
  <div class="login-wrapper">
    <div class="login">
      <el-form ref="form">
        <el-form-item>
          <h2 class="title">BookStore</h2>
          <p class="text-center">阅读是一种生活习惯</p>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="用户名" v-model="user.username" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" v-model="user.password" @keyup.enter.native="login" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <router-link to="/register" tag="el-link" :underline="false">没有账号？立即注册</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
var _user = require('@/service/user-service.js')
var _util = require('@/common/js/util.js')

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      var _this = this
      var formData = {
        username: $.trim(this.user.username),
        password: $.trim(this.user.password)
      }
      var validateResult = this.formValidate(formData)
      if (validateResult.status) {
        _user.login(
          formData, res => {
            _this.$router.push({ path: '/', replace: true })
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
.login-wrapper
  position relative
  display flex
  justify-content center
  .login
    margin-top 80px
    width 460px
    height 400px
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
