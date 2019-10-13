<template>
  <div>
    <div class="main">
      <class class="form-inline" role="form">
        <div>
          <label>班级：</label>
          <select class="form-control" v-model="classId">
            <option v-for="studentClass in classList" v-bind:key="studentClass"
                    :value="studentClass.id">
              {{studentClass.class_name}}
            </option>
          </select>
          <label>学生学号:</label>
          <input v-model="studentId" type="text" class="form-control">
          <label>学生姓名:</label>
          <input v-model="studentName" type="text" class="form-control">
          <button @click="sendData()" class="btn btn-default">提交</button>

        </div>
      </class>
      <table class="table">
        <thead>
        <tr>
          <th>班级</th>
          <th>学号</th>
          <th>姓名</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="student in studentList" v-bind:key="student">
          <td>{{student.class_name}}</td>
          <td>{{student.student_id}}</td>
          <td>{{student.name}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Student',
  data: function () {
    return {
      'studentList': [],
      'studentName': null,
      'classId': null,
      'classList': [],
      'studentId': null
    }
  },
  methods: {
    sendData: function () {
      let that = this
      console.log(this.classId)
      if ((!this.classId) || (!this.studentName) || (!this.studentId)) {
        alert('缺少必须字段')
        return 0
      }
      let waitSendData = {
        'name': this.studentName,
        'student_id': this.studentId,
        'student_class_id': this.classId
      }
      console.log(waitSendData)
      this.$axios.post('http://47.98.164.173:8081/studentList', waitSendData).then(function (resp) {
        if (resp.data.status !== 'ok') {
          console.log(resp.data)
          alert(resp.data.message)
          return 0
        }
        that.$router.go(0)
      })
    }
  },
  mounted () {
    let that = this
    this.$axios.get('http://47.98.164.173:8081/studentList').then(function (resp) {
      if (resp.data.status !== 'ok') {
        console.log(resp.data)
        alert('获取学生列表失败')
        return 0
      }
      that.studentList = resp.data.data
    })
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
