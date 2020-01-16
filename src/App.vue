<template>
  <div id="app">
    <CommonHeader></CommonHeader>
    <BookInfo></BookInfo>
    <BarcodeReader></BarcodeReader>
  </div>
</template>

<script>
import CommonHeader from "./components/CommonHeader";
import BarcodeReader from "./components/BarcodeReader";
import BookInfo from "./components/BookInfo";

export default {
  name: "app",
  components: {
    CommonHeader,
    BarcodeReader,
    BookInfo
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
