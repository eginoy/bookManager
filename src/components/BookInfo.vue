<template>
  <div>
    <div class="p-bookInfo" v-if="!isSearchResultEmpty">
      <div><img v-bind:src="bookImage" /></div>
      <div class="p-bookInfo-detail">
        <div class="p-bookInfo-detail-title">{{ bookTitle }}</div>
        <a class="p-bookInfo-detail-link" v-bind:href="bookLink"
          >Amazonで検索</a
        >
      </div>
    </div>
    <div v-else>
      <div>{{ bookInfo }}</div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      isbn: "",
      bookInfo: null,
      isSearchResultEmpty: true,
      items: "",
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
      self.bookInfo = $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: "get",
        datatype: "xml"
      }).then(
        function(result) {
          if (result.totalItems === 0) {
            self.isSearchResultEmpty = true;
            return (self.bookInfo = "検索結果:0件");
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
      self.bookInfo = result;
      self.items = result.items[0].volumeInfo;
      self.bookTitle = self.items.title;
      self.bookImage = self.items.imageLinks.smallThumbnail;
      self.bookIsbnCode10 = self.items.industryIdentifiers[0].identifier;
      self.bookIsbnCode13 = self.items.industryIdentifiers[1].identifier;
      self.bookLink = `https://www.amazon.co.jp/s?k=${self.bookIsbnCode10}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`;
    }
  },
  created: function() {
    // this.getBookInfo();
    this.$eventHub.$on("success-scan", this.getBookInfo);
  },
  computed: {}
};
</script>

<style scoped>
.p-bookInfo {
  display: flex;
  justify-content: center;
  margin: 1em 0;
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
