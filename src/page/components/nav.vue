<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="4">
          <router-link tag="div" class="logo" to="/">
            <i class="el-icon-reading"></i>
            BookStore
          </router-link>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keyup.enter.native="search">
          </el-input>
        </el-col>
        <div class="header-right">
          <div v-show="this.status===0">
            <router-link class="link" to="/order">
              <i class="el-icon-document"></i>订单
            </router-link>
            <router-link class="link" to="/cart">
              <i class="el-icon-shopping-cart-1"></i>购物车
            </router-link>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-s-custom"></i>{{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="goToUserCenter">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-show="this.status===1">
            <router-link class="link" to="/login">
              登录
            </router-link>
            <router-link class="link" to="/register">
              注册
            </router-link>
          </div>
        </div>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
var _user = require('@/service/user-service.js')
export default {
  inject: ['reload'],
  data () {
    return {
      status: 1,
      username: '',
      keyword: ''
    }
  },
  mounted () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      var _this = this
      $.ajax({
        url: 'http://localhost:8088/bookstore_war/user/get_user_info.do',
        method: 'POST',
        xhrFields: {
          withCredentials: true
        },
        success: function (res) {
          if (res.status === 0) {
            _this.status = 0
            _this.username = res.data.username
          }
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    logout () {
      var _this = this
      _user.logout(res => {
        _this.reload()
      }, err => {
        alert(err)
      })
    },
    search () {
      console.log(this.keyword)
      this.$router.push({ path: '/search', query: { 'keyword': this.keyword } })
    },
    goToUserCenter () {
      this.$router.push({ path: '/user-center' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  font-size 22px
  color #fff
  background #866ec7
  height 60px
  line-height 60px
  position relative
  .logo
    padding 0 0 0 20px
    .link
      font-size 16px
      color #ffffff
      margin-left 20px
      text-decoration none
  .search
    width 200px
  .header-right
    position absolute
    right 10px
    font-size 16px
    .link
      color #ffffff
      margin-right 20px
      text-decoration none
    .el-dropdown-link
      font-size 16px
      color #fff
      cursor pointer
  .el-icon-arrow-down
    font-size 12px
</style>
