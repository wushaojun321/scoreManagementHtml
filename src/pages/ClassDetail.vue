<template>
  <div>
    <div class="main">
      <h1>班级详情： {{className}}</h1>
      <div id="addClassForm" class="form-inline">
        <label>学生名称:</label>
        <input v-model="inputStudentName" type="text" class="form-control">
        <label>学生学号:</label>
        <input v-model="inputStudentId" type="text" class="form-control">
        <button @click="addStudent()" class="btn btn-default">添加</button>
      </div>
      <div id="class-detail">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>学号</th>
            <th>姓名</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ClassDetail',
  data: function () {
    return {
      'inputStudentName': '',
      'inputStudentId': '',
      'classId': '',
      'className': ''
    }
  },
  methods: {
    addStudent: function (state) {
      let that = this
      if (!(this.inputStudentName)) {
        alert('学生姓名是必须字段')
        return 0
      }
      if (!(this.inputStudentId)) {
        alert('学生学号是必须字段')
        return 0
      }
      let postData = {
        'name': this.inputStudentName,
        'student_id': this.inputStudentId,
        'student_class_id': this.classId
      }
      this.$axios.post('http://47.98.164.173:8081/studentList', postData).then(function (resp) {
        let data = resp.data
        if (data.status === 'ok') {
          that.$router.go(0)
        } else {
          alert(data.message)
        }
      })
    }
  },
  mounted () {
    let that = this
    this.classId = this.$route.params.classId
    this.$axios.get('http://47.98.164.173:8081/class/' + this.classId).then(function (res) {
      let resp = res.data
      let data = resp.data.data
      let tbody = that.$('table tbody')
      for (let i = 0; i < data.length; i++) {
        let curData = data[i]
        that.className = curData.class_name
        tbody.append('<tr><td>' + curData.student_id + '</td><td>' + curData.name + '</td></tr>')
      }
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
  }
  div#class-detail {
    margin: auto;
    width: 30%;
    text-align: left;
  }
</style>
