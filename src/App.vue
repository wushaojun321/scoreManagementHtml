<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view/>
  </div>
</template>

<script>
import header from './components/Header.vue'
export default {
  name: 'App',
  component: {
    headerNav: header
  }
}
</script>

<style>
</style>
