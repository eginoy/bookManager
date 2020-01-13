<template>
  <div>
    <input v-model="isbn" />
    <input
      type="button"
      value="検索"
      v-on:click="getBookInfo"
      v-bind:disable="isbn === ''"
    />
    <div>{{ bookInfo }}</div>
  </div>
</template>

<script>
import convert from "xml-js";
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
        url: `https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&query=isbn=${isbn}`,
        cache: false,
        type: "get",
        contentType: "application/xml",
        datatype: "xml"
      }).then(
        function(result) {
          var bookInfo = convert.xml2json(result, {
            ignoreComment: true,
            alwaysChildren: true
          });

          return bookInfo;
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
