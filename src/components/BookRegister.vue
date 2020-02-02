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
    <BarcodeReader />
  </div>
</template>

<script>
import $ from 'jquery'
import firebase from 'firebase'
import moment from 'moment'
import convert from 'xml-js'

import Books from './Books'
import BarcodeReader from './BarcodeReader'

export default {
  components: {
    Books,
    BarcodeReader
  },
  data () {
    return {
      books: [],
      gb: [],
      cl: [],
      ob: [],
      isDuplicateBook: false,
      isRegisterd: false,
      isSearched: false,
      isScanNow: false
    }
  },
  methods: {
    getBookInfo: function (isbn) {
      const self = this
      self.isDuplicateBook = false
      self.isRegisterd = false
      self.checkDuplicateBook(isbn)

      // 国立図書館への問い合わせ
      $.ajax({
        url: `https://iss.ndl.go.jp/api/sru?operation=searchRetrieve&recordPacking=xml&query=isbn=${isbn}`,
        cache: false,
        type: 'get',
        datatype: 'xml'
      }).then(
        data => {
          var result = JSON.parse(
            convert.xml2json(new XMLSerializer().serializeToString(data))
          )
          self.setBookInfo(result, isbn, 1)
        },
        error => {
          return error
        }
      )

      // Google Books APIへの問い合わせ
      $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: 'get',
        datatype: 'json'
      }).then(
        function (result) {
          self.setBookInfo(result, isbn, 2)
        },
        function () {
          return 'error'
        }
      )

      // OpenBDへの問い合わせ
      $.ajax({
        url: `https://api.openbd.jp/v1/get?isbn=${isbn}`,
        cache: false,
        type: 'get',
        datatype: 'json'
      }).then(
        function (result) {
          self.setBookInfo(result, isbn, 3)
        },
        function () {
          return 'error'
        }
      )
    },
    setBookInfo: function (result, isbn, id) {
      const self = this
      var items

      var bookTitle = ''
      var bookImage = ''
      var bookIsbnCode10 = 0
      var bookIsbnCode13 = 0
      var bookLink = ''
      var publishedDate = ''

      // 書籍情報の初期化
      self.books = []

      switch (id) {
        case 1:
          // 国立図書館
          if (result.elements[0].elements[1].elements[0].text === 0) break

          bookTitle =
            result.elements[0].elements[4].elements[0].elements[2].elements[0]
              .elements[0].elements[0].text

          isbn.length === 10 ? (bookIsbnCode10 = isbn) : (bookIsbnCode13 = isbn)

          bookLink =
            isbn !== undefined
              ? `https://www.amazon.co.jp/s?k=${isbn}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`
              : null

          publishedDate = null

          break
        case 2:
          // Google Books API
          if (result.totalItems === 0) break
          items = result.items[0].volumeInfo

          bookTitle = items.title
          bookImage = items.imageLinks.smallThumbnail
          bookIsbnCode10 = items.industryIdentifiers[0].identifier
          bookIsbnCode13 = items.industryIdentifiers[1].identifier
          bookLink = `https://www.amazon.co.jp/s?k=${isbn}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`
          publishedDate = items.publishedDate
          break
        case 3:
          // OpenBD
          if (result[0] === null) break
          items = result[0].summary

          bookTitle = items.title
          bookImage = items.cover
          isbn.length === 10
            ? (bookIsbnCode10 = items.isbn)
            : (bookIsbnCode13 = items.isbn)
          bookLink = `https://www.amazon.co.jp/s?k=${isbn}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`
          publishedDate = items.pubdate
          break
      }

      if (bookIsbnCode10 === 0 && bookIsbnCode13 === 0) {
        return (self.isSearched = true)
      }

      self.books.push({
        bookTitle: bookTitle,
        bookImage: bookImage,
        bookIsbnCode10: bookIsbnCode10,
        bookIsbnCode13: bookIsbnCode13,
        bookLink: bookLink,
        publishedDate: publishedDate,
        insertDate: moment(new Date()).format('YYYY/MM/DD')
      })

      // 登録済みの書籍情報と照合
      self.checkDuplicateBook(
        self.books.bookIsbnCode10,
        self.books.bookIsbnCode13
      )
    },
    registerBookInfo: function () {
      const self = this
      var db = firebase.database()
      var ref = db.ref('server/saving-data/books')

      ref.push(self.books[0])

      self.isRegisterd = true
    },
    checkDuplicateBook: function (scanedIsbn) {
      const self = this
      var db = firebase.database()
      var ref = db.ref('server/saving-data/books')
      ref
        .orderByChild('bookIsbnCode10')
        .startAt(scanedIsbn)
        .endAt(scanedIsbn)
        .once('value', function (snapshot) {
          if (!snapshot.val()) return
          if (Object.keys(snapshot.val()).length !== 0) {
            self.isDuplicateBook = true
          }
        })

      ref
        .orderByChild('bookIsbnCode13')
        .startAt(scanedIsbn)
        .endAt(scanedIsbn)
        .once('value', function (snapshot) {
          if (!snapshot.val()) return
          if (Object.keys(snapshot.val()).length !== 0) {
            self.isDuplicateBook = true
          }
        })
    },
    resetResult: function () {
      this.books = []
      this.isSearched = false
    }
  },
  created: function () {
    // バーコード読み込み時のスキャン完了イベントを待機するようセット
    this.$eventHub.$on('success-scan', this.getBookInfo)
    this.$eventHub.$on('scan-start', this.resetResult)
  },
  computed: {
    buttonMessage: function () {
      if (this.isRegisterd) return '登録済み'
      return '登録'
    }
  }
}
</script>

<style scoped></style>
