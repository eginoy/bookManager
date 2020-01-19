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
        class="p-bookInfo-registerButton btn btn-primary"
        v-on:click="registerBookInfo"
      >
        登録
      </button>
      <div v-else>
        登録済みの書籍です。
      </div>
    </div>
    <div v-else>
      <div><span>検索結果:0件</span></div>
    </div>
    <div>
      {{ books }}
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import firebase from "firebase";

export default {
  data() {
    return {
      isbn: "",
      bookInfo: [],
      isSearchResultEmpty: true,
      isDuplicateBook: false,
      duplicateCount: 0,
      books: [],
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
      if (!(isbn.length === 13 || isbn.length === 10)) return;
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
      // var booksRef = ref.child("books");

      ref.push({
        bookTitle: self.bookTitle,
        bookImage: self.bookImage,
        bookIsbnCode10: self.bookIsbnCode10,
        bookIsbnCode13: self.bookIsbnCode13,
        bookLink: self.bookLink
      });
    },
    checkDuplicateBook: function(scanedIsbn10, scanedIsbn13) {
      const self = this;
      var books = JSON.parse(JSON.stringify(self.books));
      self.duplicateCount = 0;
      books.forEach(function(book) {
        var isbn10 = book.bookIsbnCode10;
        var isbn13 = book.bookIsbnCode13;

        if (scanedIsbn10 === isbn10 || scanedIsbn13 === isbn13)
          self.duplicateCount++;
      });
      self.duplicateCount === 0
        ? (self.isDuplicateBook = false)
        : (self.isDuplicateBook = true);
    }
  },
  created: function() {
    const self = this;
    this.$eventHub.$on("success-scan", this.getBookInfo);
    var db = firebase.database();
    var ref = db.ref("server/saving-data/books");
    ref.on("value", function(snapshot) {
      self.books = snapshot.val();
      Object.keys(snapshot.val()).forEach(function(key) {
        self.bookKeys.push(key);
      });
    });
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
