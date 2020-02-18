<template>
  <div class="p-bookInfo">
    <div>
      <img class="p-bookInfo-image" v-bind:src="book.bookImage" />
    </div>
    <div class="p-bookInfo-detail">
      <div class="p-bookInfo-detail-title">
        <a
          class="p-bookInfo-detail-link"
          v-bind:href="book.bookLink"
          target="_blank"
          >{{ book.bookTitle }}</a
        >
      </div>
      <span class="p-bookInfo-detail-insertDate"
        >登録日:<br />{{ book.insertDate }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['book'],
  data () {
    return {}
  }
}
</script>

<style>
.p-bookInfo {
  width: 300px;
  height: 200px;
  display: flex;
  margin: 1em;
  border: solid 1px #c0c0c0;
  box-shadow: 0px 0px 10px;
  border-radius: 0.5em;
  padding: 1em;
}

.p-bookInfo__empty {
  height: 0;
  width: 300px;
  padding: 0 1em;
  margin: 0 1em;
}

.p-bookInfo-image {
  max-height: 165px;
  max-width: 128px;
}

.p-bookInfo-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 9em;
  text-align: center;
}

.p-bookInfo-detail-title {
  margin-bottom: 1em;
  overflow-y: auto;
}
.p-bookInfo-detail-link {
  text-decoration: none;
}

.p-bookInfo-detail-insertDate {
}
</style>
