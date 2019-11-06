import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/User'
import UpdateUser from '@/components/user/updateUser'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AddUser from '@/components/user/addUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      hidden: true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/user',
      name: User,
      component: User
    },
    {
      path: '/updateUser',
      name: UpdateUser,
      component: UpdateUser
    },
    {
      path: '/addUser',
      name: AddUser,
      component: AddUser
    }
  ]
})
