<template>
  <div>
    <div v-if="books.length">
      <Books v-for="book in books" :book="book" :key="book.bookIsbnCode10"></Books>
      <button
        v-if="!isDuplicateBook"
        v-bind:disabled="isRegisterd"
        class="p-bookInfo-registerButton btn btn-primary"
        v-on:click="registerBookInfo"
      >登録</button>
      <div v-else>
        <span>登録済みの書籍です。</span>
      </div>
    </div>
    <div v-else>
      <div>
        <span>検索結果:0件</span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import firebase from "firebase";
import moment from "moment";

import Books from "./Books";

export default {
  components: {
    Books
  },
  data() {
    return {
      isbn: "",
      bookInfo: [],
      books: [],
      isSearchResultEmpty: true,
      isDuplicateBook: false,
      isRegisterd: false,
      bookKeys: [],
      bookTitle: "",
      bookImage: "",
      bookLink: "",
      bookIsbnCode10: "",
      bookIsbnCode13: ""
    };
  },
  methods: {
    getBookInfo: function(isbn) {
      const self = this;
      self.isDuplicateBook = false;
      self.isRegisterd = false;
      self.checkDuplicateBook(isbn);
      $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: "get",
        datatype: "xml"
      }).then(
        function(result) {
          if (result.totalItems === 0) {
            return (self.isSearchResultEmpty = true);
          }
          self.isSearchResultEmpty = false;
          self.setBookInfo(result);
        },
        function() {
          return "error";
        }
      );
    },
    setBookInfo: function(result) {
      const self = this;
      var items = result.items[0].volumeInfo;

      self.books.push({
        bookTitle: items.title,
        bookImage: items.imageLinks.smallThumbnail,
        bookIsbnCode10: items.industryIdentifiers[0].identifier,
        bookIsbnCode13: items.industryIdentifiers[1].identifier,
        bookLink: items.infoLink,
        insertDate: moment(new Date()).format("YYYY/MM/DD")
      });

      self.checkDuplicateBook(
        self.books.bookIsbnCode10,
        self.books.bookIsbnCode13
      );
    },
    registerBookInfo: function() {
      const self = this;
      var db = firebase.database();
      var ref = db.ref("server/saving-data/books");

      ref.push({
        bookTitle: self.bookTitle,
        bookImage: self.bookImage,
        bookIsbnCode10: self.bookIsbnCode10,
        bookIsbnCode13: self.bookIsbnCode13,
        bookLink: self.bookLink,
        insertDate: moment(new Date()).format("YYYY/MM/DD")
      });
      self.isRegisterd = true;
    },
    checkDuplicateBook: function(scanedIsbn) {
      const self = this;
      var db = firebase.database();
      var ref = db.ref("server/saving-data/books");
      ref
        .orderByChild("bookIsbnCode10")
        .startAt(scanedIsbn)
        .endAt(scanedIsbn)
        .once("value", function(snapshot) {
          if (!snapshot.val()) return;
          if (Object.keys(snapshot.val()).length !== 0)
            self.isDuplicateBook = true;
        });

      ref
        .orderByChild("bookIsbnCode13")
        .startAt(scanedIsbn)
        .endAt(scanedIsbn)
        .once("value", function(snapshot) {
          if (!snapshot.val()) return;
          if (Object.keys(snapshot.val()).length !== 0)
            self.isDuplicateBook = true;
        });
    }
  },
  created: function() {
    this.$eventHub.$on("success-scan", this.getBookInfo);
  }
};
</script>

<style scoped>
</style>
