<template>
  <div>
    <div class="main">
      <h1>{{paperName}}：添加成绩</h1>
      <form class="form-inline" role="form">
        <div>
          <label>学生学号:</label>
          <input v-model="studentId" type="text" class="form-control">
        </div>
        <div v-for="questionOrder in questionCount" v-bind:key="questionOrder">
          <label>题目{{ questionOrder }}：</label>
          <input type="number" v-model="scoreList[questionOrder-1]" class="form-control single-question-score">
        </div>
      </form>
      <button @click="sendData()" class="btn btn-default">提交</button>
      <button @click="calcSumScore()" class="btn btn-default">验证总分：{{ sumScore }}</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AddScore',
  data: function () {
    return {
      'questionCount': 0,
      'paperName': null,
      'sumScore': 0,
      'scoreList': [],
      'studentId': null,
      'paperId': null
    }
  },
  methods: {
    sendData: function () {
      let that = this
      let waitSendScore = []
      for (let i = 0; i < this.questionCount; i++) {
        let curValue = parseInt(this.scoreList[i])
        if (isNaN(curValue)) {
          alert('数据不完整')
          return 0
        } else {
          waitSendScore.push(curValue)
        }
      }
      if ((!this.paperId) || (!this.studentId)) {
        alert('试卷id或者学号缺失')
        return 0
      }
      let waitSendData = {
        'student_id': this.studentId,
        'scores': waitSendScore
      }
      console.log(waitSendData)
      this.$axios.post('http://47.98.164.173:8081/paperScore/' + this.paperId, waitSendData).then(function (resp) {
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
  },
  mounted () {
    let that = this
    this.$axios.get('http://47.98.164.173:8081/paper/' + this.$route.params.paperId).then(function (resp) {
      console.log(resp)
      if (resp.data.status !== 'ok') {
        alert('没有获取到此试卷的信息')
        that.$router.push('/paperList')
      }
      let data = resp.data.data
      that.questionCount = data.question_count
      that.paperName = data.name
      that.paperId = data.id
    })
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
