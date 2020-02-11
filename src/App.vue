<template>
  <div id="app">
    <CommonHeader></CommonHeader>
    <router-view />
  </div>
</template>

<script>
import CommonHeader from './components/CommonHeader'

export default {
  components: {
    CommonHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.p-booksWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.p-bookInfo__empty {
  height: 0;
  width: 300px;
  padding: 0 1em;
  margin: 0 1em;
}
</style>
