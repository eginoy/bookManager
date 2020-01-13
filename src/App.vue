<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <getBookInfo></getBookInfo>
    <BarcodeReader></BarcodeReader>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import BarcodeReader from "./components/BarcodeReader";
import getBookInfo from "./components/getBookInfo";

export default {
  name: "app",
  components: {
    HelloWorld,
    BarcodeReader,
    getBookInfo
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
