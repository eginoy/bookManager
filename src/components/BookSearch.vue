<template>
  <div>
    <div class="p-scanWrapper" v-show="isScan"></div>
    <section class="p-scanButtonWrapper">
      <button
        v-if="!isScan"
        class="p-scanButton btn btn-primary"
        type="button"
        v-on:click="startScan"
      >
        バーコードで検索
      </button>
      <div v-if="!isScan" class="p-scanDescription">
        <p>※動作ブラウザ</p>
        <p>iPhone:Safari</p>
        <p>Android:Chrome</p>
      </div>
    </section>

    <section class="p-isbnSearchInputGroup input-group mb-3" v-if="!isScan">
      <input
        class="form-control"
        v-model="code"
        type="text"
        placeholder="上段バーコードのISBN入力"
      />
      <div class="input-group-append">
        <input
          class="btn btn-primary"
          v-on:click="search"
          value="検索"
          type="button"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Quagga from 'quagga'
import $ from '../../node_modules/jquery'
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      code: null,
      width: 0,
      height: 0
    }
  },
  methods: {
    ...mapMutations(['SetIsScan', 'SetIsSearched', 'SetCode']),
    startScan: function () {
      const self = this
      self.$eventHub.$emit('scan-start')
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('.p-scanWrapper'), // 埋め込んだdivのID
            constraints: {
              facingMode: 'environment'
            },
            area: {
              // 必要ならバーコードの読み取り範囲を調整できる（現在の設定だと下50%は読み取りしない）
              top: '0%',
              right: '0%',
              left: '0%',
              bottom: '50%'
            }
          },
          locator: {
            patchSize: 'medium',
            halfSample: true
          },
          numOfWorkers: 2,
          decoder: {
            readers: ['ean_reader'] // ISBN
          },
          locate: true
        },
        err => {
          if (!err) {
            Quagga.start()
            // alert("started");
          }
        }
      )
      self.SetIsScan(true)
    },
    getEanCode: function () {
      const self = this
      Quagga.onDetected(function (success) {
        const readCode = success.codeResult.code
        if (readCode === undefined) return
        if (self.checkDigit(readCode)) {
          self.code = readCode
          Quagga.stop()
          self.SetIsScan(false)
          self.SetIsSearched(true)
          Quagga.stop()
          self.$eventHub.$emit('success-scan', self.code)
          self.SetCode(readCode)
        } else {
          self.getEanCode()
        }
      })
    },
    checkDigit: function (isbn) {
      const arrIsbn = isbn
        .toString()
        .split('')
        .map(num => parseInt(num))
      let remainder = 0
      const checkDigit = arrIsbn.pop()

      arrIsbn.forEach((num, index) => {
        remainder += num * (index % 2 === 0 ? 1 : 3)
      })
      remainder %= 10
      remainder = remainder === 0 ? 0 : 10 - remainder

      return checkDigit === remainder
    },
    search: function () {
      // 開発時用の検索イベント発行
      //   this.isSearched = true
      this.SetIsSearched(true)
      this.$eventHub.$emit('success-scan', this.code)
      this.SetCode(this.code)
    }
  },
  updated () {
    this.$nextTick(function () {
      this.getEanCode()
    })
  },
  created () {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight

    $('body').css('width', this.w)
  },
  watch: {
    isScan: function () {
      $('video').css({
        'z-index': '-100',
        position: 'absolute',
        width: '90%',
        height: '60%'
      })

      $('.drawingBuffer').css({
        position: 'absolute'
      })
    }
  },
  computed: {
    ...mapState(['isScan', 'isSearched'])
  },
  code: {
    get () {
      return this.$store.state.code
    },
    set (val) {
      this.SetCode(val)
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.p-scanWrapper {
  display: flex;
  justify-content: center;
  margin: 1em auto;
  width: 100%;
  height: 480px;
  box-sizing: border-box;
}

.p-scanButtonWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p-scanButton {
  width: 10em;
}

.p-scanDescription {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 8em;
}

.p-isbnSearchInputGroup {
  max-width: 20em;
  margin: 0 auto;
}

@media screen and (max-width: 350px) {
  .p-isbnSearchInputGroup {
    max-width: 90%;
  }
}
</style>
