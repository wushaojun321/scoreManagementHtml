<template>
  <div>
    <div class="main">
      <h1>
        {{ msg }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '益哥的成绩管理系统'
    }
  }
}
</script>

<style>
  .main {
    margin: auto;
  }
</style>
