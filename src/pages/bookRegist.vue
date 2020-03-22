<template>
  <div class="p-pageWrapper">
    <div v-show="books.length">
      <div class="c-book">
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
          <span class="p-registeredMessage">登録済みの書籍です。</span>
        </div>
      </div>
    </div>
    <div v-if="isEmptyResult">
      <div class="p-notFound">
        <span>検索結果:0件</span>
      </div>
    </div>
    <div class="c-barcodeReader">
      <BarcodeReader />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import firebase from 'firebase/app'
import 'firebase/database'
import moment from 'moment'
import convert from 'xml-js'

import Books from '../components/Books'
import BarcodeReader from '../components/BarcodeReader'

export default {
  components: {
    Books,
    BarcodeReader
  },
  data () {
    return {
      books: [],
      bookTitle: '',
      bookImage: '',
      bookIsbnCode10: 0,
      bookIsbnCode13: 0,
      bookLink: '',
      publishedDate: '',
      isDuplicateBook: false,
      isRegisterd: false,
      isSearched: false,
      isScanNow: false,
      inquiryCount: 0
    }
  },
  methods: {
    getBookInfo: function (isbn) {
      const self = this
      self.isDuplicateBook = false
      self.isRegisterd = false
      self.checkDuplicateBook(isbn)
      self.isSearched = true
      self.inquiryCount = 0
      self.resetBookData()

      // OpenBD,GoogleBooks,国立図書館の順番に検索していって検索ヒットしない場合のみ次のapiで検索する（応答速度が早いものから検索かけている）
      self.inquiryOpenBd(isbn).done(function (isFind) {
        if (!isFind) {
          self.inquiryGoogleBooks(isbn).done(function (isFind) {
            if (!isFind) self.inquiryNationalLibrary(isbn).done(function () {})
          })
        }
      })
    },
    // 国立図書館への問い合わせ
    inquiryNationalLibrary (isbn) {
      const self = this
      return $.ajax({
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
    }, // Google Books APIへの問い合わせ
    inquiryGoogleBooks (isbn) {
      const self = this
      return $.ajax({
        url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
        cache: false,
        type: 'get',
        datatype: 'json'
      }).then(
        function (result) {
          var isFind = true
          if (result.totalItems === 0) {
            isFind = false
          } else {
            self.setBookInfo(result, isbn, 2)
          }
          return $.Deferred().resolve(isFind)
        },
        function () {
          return 'error'
        }
      )
    }, // OpenBDへの問い合わせ
    inquiryOpenBd (isbn) {
      const self = this
      return $.ajax({
        url: `https://api.openbd.jp/v1/get?isbn=${isbn}`,
        cache: false,
        type: 'get',
        datatype: 'json'
      }).then(
        function (result) {
          var isFind = true
          if (result[0] === null) {
            isFind = false
          } else {
            self.setBookInfo(result, isbn, 3)
          }
          return $.Deferred().resolve(isFind)
        },
        function () {
          return 'error'
        }
      )
    },
    setBookInfo: function (result, isbn, id) {
      const self = this
      var items

      switch (id) {
        case 1:
          // 国立図書館
          if (result.elements[0].elements[1].elements[0].text === '0') {
            self.books = []
            break
          }
          var title =
            result.elements[0].elements[4].elements[0].elements[2].elements[0]
              .elements[0].elements[0].text

          self.setBookData(isbn, title, '', '')
          break
        case 2:
          // Google Books API
          items = result.items[0].volumeInfo
          // 書影が存在しない場合にレスポンス結果のプロパティが変化する。
          if (items.imageLinks === undefined) {
            items.imageLinks = { smallThumbnail: '' }
          }
          self.setBookData(
            isbn,
            items.title,
            items.imageLinks.smallThumbnail,
            items.publishedDate
          )
          break
        case 3:
          // OpenBD
          items = result[0].summary
          self.setBookData(isbn, items.title, items.cover, items.pubdate)
          break
      }

      // 書籍情報で取得できていない項目を別のapiで補完できるか一度だけトライ
      if (
        (self.bookImage === '' ||
          self.bookIsbnCode10 === 0 ||
          self.bookIsbnCode13 === 0 ||
          self.publishedDate === '') &&
        self.inquiryCount === 0
      ) {
        self.inquiryCount++
        self.inquiryGoogleBooks(isbn)
      }

      if (self.bookIsbnCode10 !== 0 || self.bookIsbnCode13 !== 0) {
        self.books = [
          {
            bookTitle: self.bookTitle,
            bookImage:
              self.bookImage === ''
                ? 'http://placehold.jp/24/cccccc/ffffff/128x165.png?text=Image%0D%0ANotFound'
                : self.bookImage,
            bookIsbnCode10: self.bookIsbnCode10,
            bookIsbnCode13: self.bookIsbnCode13,
            bookLink: self.bookLink,
            publishedDate: self.publishedDate,
            insertDate: moment(new Date()).format('YYYY/MM/DD')
          }
        ]
      }
      self.isSearched = true
      if (self.books[0].bookTitle === '') self.resetBookData()
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
    setBookData: function (isbn, bookTitle, bookImage, publishedDate) {
      const self = this
      if (self.bookTitle === '') self.bookTitle = bookTitle
      if (self.bookImage === '') self.bookImage = bookImage

      if (self.bookIsbnCode10 === 0 && isbn.length === 10) {
        self.bookIsbnCode10 = isbn
      }

      if (self.bookIsbnCode13 === 0 && isbn.length === 13) {
        self.bookIsbnCode13 = isbn
      }

      if (self.bookLink === '') {
        self.bookLink = `https://www.amazon.co.jp/s?k=${isbn}&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss`
      }

      if (self.publishedDate === '') {
        self.publishedDate = moment(publishedDate).format('YYYY-MM-DD')
      }
    },
    resetBookData: function () {
      this.books = []
      this.bookTitle = ''
      this.bookImage = ''
      this.bookIsbnCode10 = 0
      this.bookIsbnCode13 = 0
      this.bookLink = ''
      this.publishedDate = ''
      this.isScanNow = true
    }
  },
  created: function () {
    // バーコード読み込み時のスキャン完了イベントを待機するようセット
    this.$eventHub.$on('success-scan', this.getBookInfo)
    this.$eventHub.$on('scan-start', this.resetBookData)
  },
  computed: {
    buttonMessage: function () {
      if (this.isRegisterd) return '登録済み'
      return '登録'
    },
    isEmptyResult: function () {
      if (this.books.length === 0 && this.isSearched && !this.isScanNow) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.p-pageWrapper {
  display: flex;
  flex-direction: column;
}

.c-book {
  width: 300px;
  margin: 1em auto 0 auto;
  display: flex;
  flex-direction: column;
}

.p-registeredMessage {
  display: flex;
  justify-content: center;
  margin: 0.5em 0em;
}

.p-bookInfo-registerButton {
  width: 5em;
  margin: 0.5em auto;
}

.c-barcodeReader {
  width: 20em;
  margin: 1em auto;
}
</style>
