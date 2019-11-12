// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {initMenu} from './utils/utils'
import {isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
import {Message} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.isNotNullORBlank = isNotNullORBlank
Vue.prototype.Message = Message

Vue.prototype.getNowTime = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var hour = date.getHours();
  var min = date.getMinutes();
  var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + ":" + min;
  return currentdate;
};

router.beforeEach((to, from, next) => {
    //判断目标是不是Login页面，是的话z直接放行
    if (to.name == 'Login') {
      next()
      return
    }
    //登录用户的数据
    var name = store.state.user.name
    if (name == '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next()
      }
    } else {
      initMenu(router, store)
      if (to.path == '/chat') {
        store.commit('updateMsgList', [])
      }
      next()
    }
  }
)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
