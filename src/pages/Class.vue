<template>
  <div>
    <div class="main">
      <div id="addClassForm" class="form-inline">
        <label>班级名称:</label>
        <input v-model="inputClassName" type="text" class="form-control">
        <label>备注:</label>
        <input v-model="inputClassInfo" type="text" class="form-control">
        <button @click="addClass()" class="btn btn-default">添加</button>
      </div>
      <div id="class-list">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>班级名称</th>
            <th>班级人数</th>
            <th>备注信息</th>
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
  name: 'Class',
  data: function () {
    return {
      'inputClassName': '',
      'inputClassInfo': ''
    }
  },
  methods: {
    addClass: function (state) {
      let that = this
      if (!(this.inputClassName)) {
        alert('班级名称是必须字段')
        return 0
      }
      let postData = {
        'class_name': this.inputClassName,
        'info': this.inputClassInfo
      }
      this.$axios.post('http://47.98.164.173:8081/classList', postData).then(function (resp) {
        if (resp.data.status === 'ok') {
          that.$router.go(0)
        } else {
          alert(resp.data.message)
        }
      })
    }
  },
  mounted () {
    let that = this
    this.$axios.get('http://47.98.164.173:8081/classList').then(function (res) {
      let resp = res.data
      let data = resp.data
      console.log(data)
      let tbody = that.$('table tbody')
      for (let i = 0; i < data.length; i++) {
        let curData = data[i]
        tbody.append('<tr><td>' + curData.class_name + '</td><td>' + curData.student_count + '</td><td>' + curData.info + '</td></tr>')
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
  div#class-list {
    text-align: left;
  }
</style>
