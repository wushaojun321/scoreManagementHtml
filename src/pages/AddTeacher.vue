<template>
  <div>
    <div class="main">
      <form class="form-inline" role="form">
        <div>
          <label>老师名字:</label>
          <input v-model="teacherName" type="text" class="form-control">
        </div>
        <div>
          <label>用户名:</label>
          <input v-model="teacherUserName" type="text" class="form-control">
        </div>
        <div>
          <label>密码:</label>
          <input v-model="password" type="text" class="form-control">
        </div>
        <div>
          <label>确认密码:</label>
          <input v-model="password1" type="text" class="form-control">
        </div>
      </form>
      <button @click="sendData()" class="btn btn-default">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddScore',
  data: function () {
    return {
      'teacherName': null,
      'teacherUserName': null,
      'password': null,
      'password1': null
    }
  },
  methods: {
    sendData: function () {
      let that = this
      if ((!this.teacherName) || (!this.teacherUserName) || (!this.password)) {
        alert('缺少字段')
        return 0
      }
      if (this.password !== this.password1) {
        alert('密码不一致')
        return 0
      }
      let waitSendData = {
        'name': this.teacherName,
        'username': this.teacherUserName,
        'password': this.password
      }
      console.log(waitSendData)
      this.$axios.post('http://47.98.164.173:8081/teacherList', waitSendData).then(function (resp) {
        console.log(resp)
        if (resp.data.status !== 'ok') {
          alert(resp.data.message)
        } else {
          that.$router.go(0)
        }
      })
    },
    calcSumScore: function () {
      console.log(this.scoreList.length)
      console.log(this.scoreList)
      this.sumScore = 0
      for (let i = 0; i < this.scoreList.length; i++) {
        let curValue = parseInt(this.scoreList[i])
        if (!isNaN(curValue)) {
          this.sumScore += curValue
        }
      }
    }
  }
}
</script>

<style scoped>
  div.main {
    margin: auto;
    margin-top: 100px;
    width: 80%;
    text-align:center;
  }
  div.input-score {
    width: 100%;
  }
</style>
