<template>
  <div>
    <div v-if="!isSearchResultEmpty">
      <div class="p-bookInfo">
        <div>
          <img v-bind:src="bookImage" />
        </div>
        <div class="p-bookInfo-detail">
          <div class="p-bookInfo-detail-title">書籍名: {{ bookTitle }}</div>
          <a
            class="p-bookInfo-detail-link"
            v-bind:href="bookLink"
            target="_blank"
            >Amazonで検索</a
          >
        </div>
      </div>
      <button
        v-if="!isDuplicateBook"
        v-bind:disabled="isRegisterd"
        class="p-bookInfo-registerButton btn btn-primary"
        v-on:click="registerBookInfo"
      >
        登録
      </button>
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

export default {
  data() {
    return {
      isbn: "",
      bookInfo: [],
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
      self.bookTitle = items.title;
      self.bookImage = items.imageLinks.smallThumbnail;
      self.bookIsbnCode10 = items.industryIdentifiers[0].identifier;
      self.bookIsbnCode13 = items.industryIdentifiers[1].identifier;
      self.bookLink = `https://www.amazon.co.jp/s?k=${self.bookIsbnCode10}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`;
      self.checkDuplicateBook(self.bookIsbnCode10, self.bookIsbnCode13);
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
          if (Object.keys(snapshot.val()).length !== 0)
            self.isDuplicateBook = true;
        });

      ref
        .orderByChild("bookIsbnCode13")
        .startAt(scanedIsbn)
        .endAt(scanedIsbn)
        .once("value", function(snapshot) {
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
.p-bookInfo {
  display: flex;
  justify-content: center;
  margin: 1em 0;
}

.p-bookInfo-registerButton {
}

.p-bookInfo-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1em;
}

.p-bookInfo-detail-title {
  margin-bottom: 1em;
}
.p-bookInfo-detail-link {
  text-decoration: none;
}
</style>
