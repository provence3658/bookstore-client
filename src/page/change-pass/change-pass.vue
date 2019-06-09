<template>
  <div class="change-pass">
    <nav-default></nav-default>
    <div class="main">
      <div class="nav-side">
        <nav-side page="change-pass"></nav-side>
      </div>
      <div class="content">
        <h3 class="title">修改密码</h3>
        <el-form ref="form" label-width="80px">
          <el-form-item label="旧密码">
            <el-input placeholder="请输入密码" v-model="passwordOld" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input placeholder="请输入密码" v-model="passwordNew1" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input placeholder="请输入密码" v-model="passwordNew2" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePass()">更改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavDefault from '@/page/components/nav.vue'
import NavSide from '@/page/components/nav-side.vue'
var _user = require('@/service/user-service.js')
export default {
  data () {
    return {
      passwordOld: '',
      passwordNew1: '',
      passwordNew2: '',
      errMsg: '',
      input: ''
    }
  },
  components: {
    NavDefault,
    NavSide
  },
  methods: {
    changePass () {
      if (this.passwordNew1 !== this.passwordNew2) {
        this.$message.error('两次密码不一致')
        this.clearForm()
      } else {
        var _this = this
        _user.updatePassword({
          passwordOld: _this.passwordOld,
          passwordNew: _this.passwordNew1
        }, res => {
          _this.$message.success('更新成功')
        }, err => {
          _this.$message.error(err)
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.change-pass
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
