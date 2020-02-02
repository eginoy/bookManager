<template>
  <div>
    <div class="p-scanWrapper" v-show="isScan"></div>
    <section>
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

    <input v-model="code" type="text" />
    <input v-on:click="search" value="検索" type="button" />
  </div>
</template>

<script>
import Quagga from 'quagga'
import $ from '../../node_modules/jquery'

export default {
  data () {
    return {
      code: null,
      isScan: false,
      isSearched: false,
      width: 0,
      height: 0
    }
  },
  methods: {
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
              // 必要ならバーコードの読み取り範囲を調整できる（下50%は読み取りしない）
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
      this.isScan = true
    },
    getEanCode: function () {
      const self = this
      Quagga.onDetected(function (success) {
        const readCode = success.codeResult.code
        if (readCode === undefined) return
        if (self.checkDigit(readCode)) {
          self.code = readCode
          Quagga.stop()
          self.isScan = false
          self.isSearched = true
          self.$eventHub.$emit('success-scan', self.code, self.isSearched)
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
      this.isSearched = true
      this.$eventHub.$emit('success-scan', this.code, this.isSearched)
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

.p-scanDescription {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

.p-scanButton {
  margin-top: 2em;
}
</style>
