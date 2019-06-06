<template>
  <div class="change-pass">
    <nav-default></nav-default>
    <nav-side page="change-pass"></nav-side>
    <div class="col-md-6">
      <div class="card">
        <h2>修改密码</h2>
        <el-form id="myForm" ref="form" label-width="80px">
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
            <el-button class="submit-btn" type="primary" @click="changePass()">更改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import NavDefault from "@/page/components/nav.vue"
import NavSide from "@/page/components/nav-side.vue"
var _user = require("@/service/user-service.js")
export default {
  data() {
    return {
      passwordOld: '',
      passwordNew1: '',
      passwordNew2: '',
      errMsg: '',
      input:''
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
        },res=>{
          _this.$message.success('更新成功')
        },err=>{
          _this.$message.error(err)
        })
        this.clearForm()
      }
    },
    clearForm () {
      $('#myForm')[0].reset()
    }
  }
}
</script>

<style lang="stylus" scoped>
#myForm
  margin-top 20px
.el-form-item
  width 80%
  .submit-btn
    background #337ab7
    border-color #337ab7
</style>
