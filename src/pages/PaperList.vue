<template>
  <div>
    <div class="table">
      <table class="table">
        <thead>
        <tr>
          <th>试卷名称</th>
          <th>总分</th>
          <th>老师</th>
          <th>题目数</th>
          <th>备注</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="paper in papers" v-bind:key="paper">
          <td><a @click="goPaperScore(paper.id)">{{paper.name}}</a></td>
          <td>{{paper.sum_score}}</td>
          <td>{{paper.teacher_name}}</td>
          <td>{{paper.question_count}}</td>
          <td>{{paper.info}}</td>
          <td><a :href="'/addScore/' + paper.id">添加成绩</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PaperList',
  data: function () {
    return {'papers': [1, 2, 3, 4]}
  },
  methods: {
    goPaperScore: function (paperId) {
      this.$router.push('/paperScore/' + paperId)
    }
  },
  mounted () {
    let that = this
    this.$axios.get('http://47.98.164.173:8081/paperList').then(function (res) {
      console.log(res)
      that.papers = res.data['data']
    })
  }
}
</script>

<style scoped>
  div.table {
    margin: auto;
    width: 80%;
    margin-top: 100px;
    border:3px solid #f5ebeb
  }
</style>
