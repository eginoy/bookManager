<template>
  <div>
    <div>
      読み取りCode:
      <span>{{ code }}</span>
    </div>
    <button class="btn btn-primary" type="button" v-on:click="startScan">
      バーコードで検索
    </button>
    <!-- <input v-model="code" type="text" />
    <input v-on:click="search" value="検索" type="button" /> -->

    <div class="overRay">
      <div v-show="isScan" id="interactive" class="viewport"></div>
    </div>
  </div>
</template>

<script>
import Quagga from "quagga";

export default {
  data() {
    return {
      code: null,
      isScan: false,
      isSearched: false,
      width: 0
    };
  },
  methods: {
    startScan: function() {
      const self = this;
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#interactive"), //埋め込んだdivのID
            constraints: {
              facingMode: "environment",
              width: self.width * 0.9,
              height: 480
            },
            area: {
              //必要ならバーコードの読み取り範囲を調整できる（下50%は読み取りしない）
              top: "0%",
              right: "0%",
              left: "0%",
              bottom: "50%"
            }
          },
          locator: {
            patchSize: "medium",
            halfSample: true
          },
          numOfWorkers: 2,
          decoder: {
            readers: ["ean_reader"] //ISBN
          },
          locate: true
        },
        err => {
          if (!err) {
            Quagga.start();
            // alert("started");
          }
        }
      );
      this.isScan = true;
    },
    getEanCode: function() {
      const self = this;
      Quagga.onDetected(function(success) {
        const readCode = success.codeResult.code;
        if (readCode === undefined) return;
        if (self.checkDigit(readCode)) {
          self.code = readCode;
          Quagga.stop();
          self.isScan = false;
          self.isSearched = true;
          self.$eventHub.$emit("success-scan", self.code, self.isSearched);
        }
        {
          self.getEanCode();
        }
      });
    },
    checkDigit: function(isbn) {
      const arrIsbn = isbn
        .toString()
        .split("")
        .map(num => parseInt(num));
      let remainder = 0;
      const checkDigit = arrIsbn.pop();

      arrIsbn.forEach((num, index) => {
        remainder += num * (index % 2 === 0 ? 1 : 3);
      });
      remainder %= 10;
      remainder = remainder === 0 ? 0 : 10 - remainder;

      return checkDigit === remainder;
    },
    search: function() {
      //開発時用の検索イベント発行
      this.isSearched = true;
      this.$eventHub.$emit("success-scan", this.code, this.isSearched);
    }
  },
  updated() {
    this.$nextTick(function() {
      this.getEanCode();
    });
  },
  created() {
    this.width = document.documentElement.clientWidth;
  }
};
</script>

<style scoped>
video {
  display: flex;
  justify-content: center;
}
</style>
