<template>
  <el-menu :default-active="page" class="el-menu-vertical-demo">
    <el-menu-item index="user-center" @click="goToPage('/user-center')">
      <i class="el-icon-menu"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
    <el-menu-item index="change-pass" @click="goToPage('/change-pass')">
      <i class="el-icon-document"></i>
      <span slot="title">修改密码</span>
    </el-menu-item>
    <el-menu-item index="shipping" @click="goToPage('/shipping')">
      <i class="el-icon-setting"></i>
      <span slot="title">收货地址</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  methods: {
    goToPage (page) {
      this.$router.push({ path: page })
      // console.log(this.$route.path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-menu
  border none
</style>
