<template>
  <div class="user-center">
    <nav-default></nav-default>
    <nav-side page="user-center"></nav-side>
    <div class="col-md-6">
      <div id="personal" class="card">
        <h2>个人信息</h2>
        <table class="table">
          <tbody>
            <tr class="row">
              <td class="text-muted">用户名</td>
              <td class="text-muted">{{userInfo.username}}</td>
            </tr>
            <tr class="row">
              <td class="text-muted">邮箱</td>
              <td class="text-muted">{{userInfo.email}}</td>
            </tr>
            <tr class="row">
              <td class="text-muted">手机</td>
              <td class="text-muted">{{userInfo.phone}}</td>
            </tr>
            <tr class="row">
              <td class="text-muted">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                  修改
                </button>
              </td>
              <td class="text-muted"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 模态框（Modal） -->
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 class="modal-title" id="myModalLabel">修改个人信息</h4>
            </div>
            <div class="modal-body">
              <li class="list-group-item">
                <div class="input-group">
                  <span class="input-group-addon">昵称</span>
                  <input name="name" type="text" class="form-control" v-model="userInfo.username">
                </div>
              </li>
              <li class="list-group-item">
                <div class="input-group">
                  <span class="input-group-addon">邮箱</span>
                  <input type="text" class="form-control" v-model="userInfo.email">
                </div>
              </li>
              <li class="list-group-item">
                <div class="input-group">
                  <span class="input-group-addon">手机号码</span>
                  <input type="text" class="form-control" v-model="userInfo.phone">
                </div>
              </li>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-primary" @click="updateUserInfo()">提交更改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavDefault from "@/page/components/nav.vue"
import NavSide from "@/page/components/nav-side.vue"
var _util = require('@/common/js/util.js')
var _user = require("@/service/user-service.js")
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  components: {
    NavDefault,
    NavSide
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      var _this = this
      _user.getUserInfo(
        res=>{
          _this.userInfo = res
        },err=>{
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
          _this.$message.success('更新成功');
        },err=>{
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
};
</script>

<style lang="stylus" scoped>
.table
  margin-top 20px
.alert
  display none
</style>
