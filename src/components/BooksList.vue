<template>
  <div class="p-booksWrapper">
    <Books
      v-for="book in books"
      :book="book"
      :key="book.bookIsbnCode10"
    ></Books>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import $ from 'jquery'
import Books from './Books'

export default {
  components: {
    Books
  },
  data () {
    return {
      books: []
    }
  },
  created: function () {
    const self = this

    var db = firebase.database()
    var ref = db.ref('server/saving-data/books').orderByChild('publishedDate')
    ref.on('value', function (snapshot) {
      self.books = snapshot.val()
    })
  },
  updated () {
    this.$nextTick(function () {
      var $books = $('.p-booksWrapper')
      var emptyBookInfo = []
      for (var i = 0; i < $books.find('.p-bookInfo').length; i++) {
        emptyBookInfo.push($('<div>', { class: 'p-bookInfo__empty' }))
      }
      $books.append(emptyBookInfo)
    })
  }
}
</script>

<style>
.p-booksWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
