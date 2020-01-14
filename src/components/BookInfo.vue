<template>
  <div>
    <input v-model="isbn" />
    <input type="button" value="検索" v-on:click="getBookInfo" v-bind:disable="isbn === ''" />
    <div>{{ bookInfo }}</div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      bookInfo: null,
      isbn: ""
    };
  },
  methods: {
    getBookInfo: function() {
      const self = this;
      const isbn = 9784894517806;
      self.bookInfo = $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: "get",
        datatype: "xml"
      }).then(
        function(result) {
          self.bookInfo = result;
        },
        function() {
          alert("error");
        }
      );
    }
  },
  mounted() {
    this.getBookInfo();
  }
};
</script>

<style scoped></style>
