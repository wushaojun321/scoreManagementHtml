<template>
  <div id="outside">
    <div class="login">
      <label>用户名</label>
      <input type="email" class="form-control" id="username" placeholder="用户名">
      <label>密码</label>
      <input type="password" class="form-control" id="password" placeholder="密码">
      <button type="submit" class="btn btn-default" @click="login()">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  /*
  * 登录
  * 1、token,username放到window.localStorage中
  * 2、登录状态记录在vuex中
  * 3、其他路由从window.localStorage中获取登录信息
  * 4、每次接收到请求前执行main.js中的beforeEach函数，更新登录状态
  * */
  name: 'Login',
  methods: {
    login: function () {
      const that = this
      let username = document.getElementById('username').value
      let password = document.getElementById('password').value
      this.$axios.post('http://47.98.164.173:8081/token', {'username': username,
        'password': password}).then(function (res) {
        console.log(res.data)
        if (res.data.status === 'ok') {
          window.localStorage.setItem('token', res.data.data)
          window.localStorage.setItem('username', username)
          that.$store.commit('login')
          that.$router.push('/paperList')
        } else {
          alert(res.data.message)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  div.login {
    margin: auto;
    width: 300px;
    margin-top: 100px;
    border:3px solid #f5ebeb
  }
</style>
