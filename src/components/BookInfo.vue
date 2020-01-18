<template>
  <div>
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
    getBookInfo: function(isbn) {
      const self = this;
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
  created: function() {
    // this.getBookInfo();
    this.$eventHub.$on("success-scan", this.getBookInfo);
  }
};
</script>

<style scoped></style>
