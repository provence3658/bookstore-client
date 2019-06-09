import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index.vue'
import Login from '@/page/login/login.vue'
import Register from '@/page/register/register.vue'
import Message from '@/page/message/message.vue'
import List from '@/page/list/list.vue'
import Detail from '@/page/detail/detail.vue'
import Cart from '@/page/cart/cart.vue'
import UserCenter from '@/page/user-center/user-center.vue'
import ChangePass from '@/page/change-pass/change-pass.vue'
import Shipping from '@/page/shipping/shipping.vue'
import Pay from '@/page/pay/pay.vue'
import Order from '@/page/order/order.vue'
import OrderDetail from '@/page/order-detail/order-detail.vue'
import NavSide from '@/page/components/nav-side.vue'
import Search from '@/page/search/search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/user-center',
      name: 'UserCenter',
      component: UserCenter
    },
    {
      path: '/change-pass',
      name: 'ChangePass',
      component: ChangePass
    },
    {
      path: '/shipping',
      name: 'Shipping',
      component: Shipping
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/order-detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/nav-side',
      name: 'NavSide',
      component: NavSide
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
