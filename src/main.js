// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import store from './store/index'
import $ from 'jquery'

Vue.prototype.$ = $
Vue.prototype.$axios = axios
Vue.prototype.$store = store

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    console.log('interceptor')
    if (window.localStorage.token) {
      config.headers.Authorization = 'Bearer ' + window.localStorage.token

      console.log(config.headers)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type === 'login') {
    if (window.localStorage.getItem('token')) {
      store.commit('login')
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
