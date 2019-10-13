<template>
  <div>
    <div class="main">
      <div id="genForm">
        <label>请输入新试卷的名称:</label>
        <input v-model="paperName" type="text" class="form-control">
        <label>请输入新试卷的考试时间:</label>
        <input v-model="examDate" type="date" class="form-control">
        <label>请输入新试卷的题目数:</label>
        <input v-model="questionNum" type="number" class="form-control">
        <label>请输入新试卷的总分:</label>
        <input v-model="sumScore" type="number" class="form-control">
        <label>请输入新试卷描述:</label>
        <textarea v-model="paperInfo" class="form-control" rows="3"></textarea>
        <button @click="genForm()" class="btn btn-default">生成表单</button>
      </div>
      <div id="inputScore">
        <button @click="calcSumScore()" class="btn btn-default">计算总分：{{curScore}}/{{sumScore}}</button>
        <button @click="postData()" class="btn btn-default" id="postData">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPaper',
  data: function () {
    return {
      questionNum: 10,
      sumScore: 100,
      curScore: 0,
      paperName: '',
      paperInfo: '',
      examDate: ''
    }
  },
  methods: {
    genForm: function () {
      if (this.paperName === '') {
        alert('试卷名是必须字段')
        return 0
      }
      if (this.examDate === '') {
        alert('考试时间是必须字段')
        return 0
      }
      let questionNum = parseInt(this.questionNum)
      let sumScore = parseInt(this.sumScore)
      if (isNaN(questionNum) || isNaN(sumScore)) {
        alert('请输入正确的题目数和总分')
      }

      for (let i = 1; i <= (this.questionNum); i++) {
        console.log(i)
        let root = this.$('div.main')
        root.append('<div class="form-group"><label>第' + i + '道题分值:</label><input type="number" class="form-control score" questionOrder="' + i + '"></div>')
      }
      console.log(1111)
      console.log(this.questionNum)
      this.$('div#genForm').remove()
      console.log(this.questionNum)
      this.$('#inputScore').css('visibility', 'visible')
    },
    calcSumScore: function () {
      let inputs = this.$('input.score')
      console.log(inputs.length)
      this.curScore = 0
      for (let i = 0; i < inputs.length; i++) {
        let curScore = parseInt(inputs[i].value)
        if (isNaN(curScore)) {
          break
        }
        this.curScore += curScore
      }
    },
    postData: function () {
      let that = this
      this.calcSumScore()
      if (this.curScore !== this.sumScore) {
        alert('总分与输入总分不符，请检查')
        return 0
      }
      let scoreList = []
      let inputs = this.$('input.score')
      for (let i = 0; i < inputs.length; i++) {
        let curScore = parseInt(inputs[i].value)
        if (isNaN(curScore)) {
          alert('第' + (i + 1) + '题的分值为空，请检查')
          return 0
        }
        scoreList.push(curScore)
      }
      console.log('马上发送！~')
      console.log(scoreList)
      let waitSendData = {
        'paper_name': this.paperName,
        'exam_date': this.examDate,
        'sum_score': this.sumScore,
        'info': this.paperInfo,
        'questions': scoreList
      }
      this.$axios.post('http://47.98.164.173:8081/paperList', waitSendData).then(function (res) {
        console.log(res)
        if (res.data.status === 'ok') {
          that.$router.push('/paperList')
        } else {
          if (res.data.message) {
            alert(res.data.message)
          } else {
            alert('未知错误')
          }
        }
      })
    }
  },
  mounted () {

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
  div#inputScore {
    visibility: hidden;
  }
</style>
