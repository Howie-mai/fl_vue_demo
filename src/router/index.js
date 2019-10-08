import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/User'
import UpdateUser from '@/components/user/updateUser'
import AddUser from '@/components/user/addUser'

Vue.use(Router)

export default new Router({
  routes: [
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
