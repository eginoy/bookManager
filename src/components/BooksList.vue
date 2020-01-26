<template>
  <div>
    <Books
      v-for="book in books"
      :book="book"
      :key="book.bookIsbnCode10"
    ></Books>
  </div>
</template>

<script>
import firebase from "firebase";

import Books from "./Books";

export default {
  components: {
    Books
  },
  data() {
    return {
      books: []
    };
  },
  created: function() {
    const self = this;

    var db = firebase.database();
    var ref = db.ref("server/saving-data/books").orderByChild("publishedDate");
    ref.on("value", function(snapshot) {
      self.books = snapshot.val();
    });
  }
};
</script>

<style scoped></style>
