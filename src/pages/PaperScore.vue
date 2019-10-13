<template>
  <div>
    <div class="main">
      <h1>试卷得分详情：{{paperName}}</h1>
      <div id="class-detail">
        <table class="table table-striped">
          <thead>
          <tr id="table-header">
            <th>班级</th>
            <th>学号</th>
            <th>姓名</th>
            <th v-for="questionIndex in questionCount" v-bind:key="questionIndex">题目{{questionIndex}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="score in scoreList" v-bind:key="score">
            <td>{{score.class_name}}</td>
            <td>{{score.student_id}}</td>
            <td>{{score.student_name}}</td>
            <td v-for="(curScore, index) in questionCount" v-bind:key="curScore">{{score[index]}}</td>
          </tr>
          <tr>
            <td>
              <select v-model="curClassId" @change="classInputClick()">
                <option v-for="studentClass in classList" v-bind:key="studentClass"
                        :value="studentClass.id">
                  {{studentClass.class_name}}
                </option>
              </select>
            </td>
            <td>
              <select v-model="curStudentId" @change="studentChange('studentId')">
                <option v-for="student in curClassStudentList" v-bind:key="student"
                        :value="student.student_id">
                  {{student.student_id}}
                </option>
              </select>
            </td>
            <td>
              <select v-model="curStudentName"  @change="studentChange('studentName')">
                <option v-for="student in curClassStudentList" v-bind:key="student"
                        :value="student.name">
                  {{student.name}}
                </option>
              </select>
            </td>
            <td v-for="questionIndex in questionCount" v-bind:key="questionIndex">
              <input type="number" class="in-table" v-model="waitAddScoreList[questionIndex-1]">
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <button @click="sendData()" class="btn btn-default">提交成绩</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaperScore',
  data: function () {
    return {
      'paperId': '',
      'paperName': '',
      'scoreList': [1, 2],
      'questionCount': 2,
      'classList': [],
      'curClassId': null,
      'curStudentId': null,
      'curStudentName': null,
      'curClassStudentList': [{'name': '这个班级为空', 'student_id': '这个班级为空'}],
      'waitAddScoreList': []
    }
  },
  methods: {
    sendData: function () {
      let that = this
      let waitSendScore = []
      for (let i = 0; i < this.questionCount; i++) {
        let curValue = parseInt(this.waitAddScoreList[i])
        if (isNaN(curValue)) {
          alert('数据不完整')
          return 0
        } else {
          waitSendScore.push(curValue)
        }
      }
      if ((!this.paperId) || (!this.curStudentId)) {
        alert('试卷id或者学号缺失')
        return 0
      }
      let waitSendData = {
        'student_id': this.curStudentId,
        'scores': waitSendScore
      }
      console.log(waitSendData)
      this.$axios.post('http://47.98.164.173:8081/paperScore/' + this.paperId, waitSendData).then(function (resp) {
        console.log(resp)
        if (resp.data.status !== 'ok') {
          alert(resp.data.message)
        } else {
          that.updateScoreList()
          that.waitAddScoreList = []
        }
      })
    },
    classInputClick: function () {
      let that = this
      this.$axios.get('http://47.98.164.173:8081/class/' + this.curClassId).then(function (res) {
        let resp = res.data
        let data = resp.data.data
        that.curClassStudentList = data
        if (that.curClassStudentList.length === 0) {
          that.curClassStudentList = [{'name': '这个班级为空', 'student_id': '这个班级为空'}]
        }
      })
    },
    studentChange: function (flag) {
      console.log(flag)
      if (flag === 'studentId') {
        for (let i = 0; i <= this.curClassStudentList.length; i++) {
          let curStudent = this.curClassStudentList[i]
          if (curStudent.student_id === this.curStudentId) {
            this.curStudentName = curStudent.name
            break
          }
        }
      }
      if (flag === 'studentName') {
        for (let i = 0; i <= this.curClassStudentList.length; i++) {
          let curStudent = this.curClassStudentList[i]
          if (curStudent.studentName === this.studentName) {
            this.curStudentId = curStudent.student_id
            break
          }
        }
      }
      console.log(this.curStudentName)
      console.log(this.curStudentId)
    },
    updateScoreList: function () {
      let that = this
      this.$axios.get('http://47.98.164.173:8081/paperScore/' + this.paperId).then(function (resp) {
        console.log(resp)
        let data = resp.data.data
        that.paperName = data.name
        console.log(444)
        console.log(data)
        if (data.length === 0) {
          alert('此试卷暂时没有数据')
          return 0
        }
        that.questionCount = Object.keys(data[0]).length - 3
        that.scoreList = data
      })
    }
  },
  mounted () {
    let that = this
    this.paperId = this.$route.params.paperId
    this.updateScoreList()
    this.$axios.get('http://47.98.164.173:8081/classList').then(function (resp) {
      console.log(resp.data)
      if (resp.data.status !== 'ok') {
        alert('获取班级列表失败')
        return 0
      }
      that.classList = resp.data.data
    })
  }
}
</script>

<style scoped>
  div#addClassForm {
    margin: auto;
    width: 100%;
    margin-top: 100px;
  }
  div.main {
    text-align: center;
    margin: auto;
  }
  div#class-detail {
    margin: auto;
    width: 100%;
    text-align: left;
  }
  input.in-table {
    width: 60%;
  }
  input.in-table-field {
    width: 100%;
  }
</style>
