<template>
  <div class="p-booksWrapper">
    <Books
      class="c-books"
      v-for="book in books"
      :book="book"
      :key="book.bookLink"
    ></Books>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'
import $ from 'jquery'
import Books from '../components/Books'

export default {
  components: {
    Books
  },
  data () {
    return {}
  },
  methods: {
    createEmptyElement () {
      // flexレイアウトで書籍情報のレイアウトが中央揃えになるように空の要素を生成してる。
      var $books = $('.p-booksWrapper')
      var emptyBookInfo = []
      for (var i = 0; i < $books.find('.p-bookInfo').length; i++) {
        emptyBookInfo.push($('<div>', { class: 'p-bookInfo__empty' }))
      }
      $books.append(emptyBookInfo)
    },
    ...mapMutations(['SetBooks'])
  },
  created: function () {
    const self = this

    var db = firebase.database()
    var ref = db.ref('server/saving-data/books').orderByChild('publishedDate')
    ref.on('value', function (snapshot) {
      self.SetBooks(snapshot.val())
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.createEmptyElement()
    })
  },
  updated () {
    this.$nextTick(function () {
      this.createEmptyElement()
    })
  },
  computed: {
    ...mapState(['books'])
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

.c-books {
  margin: 0.5em;
}
.p-bookInfo__empty {
  margin: 0 0.5em;
}
</style>
