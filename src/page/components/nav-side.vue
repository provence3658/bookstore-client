<template>
  <div class="col-xs-2 col-md-offset-1">
    <ul class="nav nav-pills nav-stacked">
      <li :class="page === 'user-center' ? 'active' : ''"><router-link to="/user-center">个人信息</router-link></li>
      <li :class="page === 'change-pass' ? 'active' : ''"><router-link to="/change-pass">修改密码</router-link></li>
      <li :class="page === 'shipping' ? 'active' : ''"><router-link to="/shipping">收货地址</router-link></li>
    </ul>
  </div>
</template>


<script>
  export default {
    props: {
      page:{
        type: String,
        default:''
      }
    },
    mounted() {
      console.log(this.page)
    }
  }
</script>

<style lang="stylus" scoped>
.logo
  .title
    font-size 20px
    font-weight bold
</style>

