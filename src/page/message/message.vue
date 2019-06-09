<template>
  <div class="message">
    <div class="container">
      <div class="jumbotron register-success">
        <h1>注册成功！</h1>
        <p>
          <router-link to="/login" class="btn btn-primary" role="button">
            去登录
          </router-link>
        </p>
      </div>
      <div class="jumbotron password-reset-success">
        <h1>重置密码成功！</h1>
        <p>
          <router-link to="/login" class="btn btn-primary" role="button">
            去登录
          </router-link>
        </p>
      </div>
      <div class="jumbotron default-success">
        <h1>操作成功！</h1>
        <p>
          <router-link to="/" class="btn btn-primary" role="button">
            去首页
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
var _util = require('@/common/js/util.js')
export default {
  mounted () {
    this.show()
  },
  methods: {
    show () {
      $('.' + this.$route.query.type + '-success').show()
    }
  }
}
</script>

<style lang="stylus" scoped>
.jumbotron
  display none
</style>
