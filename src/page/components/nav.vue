<template>
  <div class="nav">
    <nav class="navbar navbar-default my-nav">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">导航栏</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">BookStore</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/">
                <span class="glyphicon glyphicon-home"></span> 首页
              </router-link>
            </li>
          </ul>
          <form class="navbar-form navbar-left">
            <div class="form-group has-feedback">
              <input
                type="text"
                class="form-control"
                placeholder="搜索"
                v-model="keyword"
                v-on:keyup.enter="search">
              <span class="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
          </form>
          <ul class="nav navbar-nav navbar-right" v-show="this.status===1">
            <li>
              <router-link to="login">
                登录
              </router-link>
            </li>
            <li style="display:block;padding:13px 0;" class="text-muted">|</li>
            <li>
              <router-link to="register">
                注册
              </router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right" v-show="this.status===0">
            <li>
              <router-link to="/order">
                <span class="glyphicon glyphicon-list-alt"></span> 订单
              </router-link>
            </li>
            <li>
              <router-link to="cart">
                <span class="glyphicon glyphicon-shopping-cart"></span> 购物车
              </router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle"
                data-toggle="dropdown" role="button"
                aria-haspopup="true" aria-expanded="false">
                {{username}}
              </a>
              <ul class=" dropdown-menu" style="min-width:100%;">
                <li>
                  <router-link to="/user-center">
                    <span class="glyphicon glyphicon-user"></span>个人中心
                  </router-link>
                </li>
                <li>
                  <a @click="logout()">
                    <span class="glyphicon glyphicon-log-out"></span>退出
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
var _user = require('@/service/user-service.js')
export default {
  data () {
    return {
      status: 1,
      username: '',
      keyword:''
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
      _user.logout(res=>{
        alert('你已退出登录，即将返回首页')
        _this.$router.push({path: '/', replace: true})
      }, err=>{
        alert(err)
      })
    },
    search() {
      console.log(this.keyword)
      this.$router.push({path:'/search', query: {'keyword': this.keyword}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-nav
  background-color #fff
  color #666
</style>