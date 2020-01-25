<template>
  <div>
    <div v-if="books.length">
      <Books
        v-for="book in books"
        :book="book"
        :key="book.bookIsbnCode10"
      ></Books>
      <button
        v-if="!isDuplicateBook"
        v-bind:disabled="isRegisterd"
        class="p-bookInfo-registerButton btn btn-primary"
        v-on:click="registerBookInfo"
      >
        <span>{{ buttonMessage }}</span>
      </button>
      <div v-else>
        <span>登録済みの書籍です。</span>
      </div>
    </div>
    <div v-if="!books.length && isSearched">
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
      books: [],
      isDuplicateBook: false,
      isRegisterd: false,
      isSearched: false
    };
  },
  methods: {
    getBookInfo: function(isbn, isSearched) {
      const self = this;
      self.isDuplicateBook = false;
      self.isRegisterd = false;
      self.isSearched = isSearched;
      self.checkDuplicateBook(isbn);
      $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: "get",
        datatype: "xml"
      }).then(
        function(result) {
          if (result.totalItems === 0) {
            //書籍情報の初期化
            self.books = [];
          }
          self.setBookInfo(result);
        },
        function() {
          return "error";
        }
      );
    },
    setBookInfo: function(result) {
      const self = this;

      //書籍情報の初期化
      self.books = [];
      if (result.totalItems === 0) return;
      var items = result.items[0].volumeInfo;

      self.books.push({
        bookTitle: items.title,
        bookImage: items.imageLinks.smallThumbnail,
        bookIsbnCode10: items.industryIdentifiers[0].identifier,
        bookIsbnCode13: items.industryIdentifiers[1].identifier,
        bookLink: items.infoLink,
        publishedDate: items.publishedDate,
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

      ref.push(self.books[0]);

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
    //バーコード読み込み時のスキャン完了イベントを待機するようセット
    this.$eventHub.$on("success-scan", this.getBookInfo);
  },
  computed: {
    buttonMessage: function() {
      if (this.isRegisterd) return "登録済み";
      return "登録";
    }
  }
};
</script>

<style scoped></style>
