import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      'isLogin': false
    }
  },
  mutations: {
    login (state) {
      state.isLogin = true
    },
    logout (state) {
      console.log('233333')
      state.isLogin = false
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
    }
  }
})
