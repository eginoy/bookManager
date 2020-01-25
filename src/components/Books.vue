<template>
  <div class="p-bookInfo">
    <div>
      <img v-bind:src="book.bookImage" />
    </div>
    <div class="p-bookInfo-detail">
      <div class="p-bookInfo-detail-title">
        書籍名:
        <a
          class="p-bookInfo-detail-link"
          v-bind:href="book.bookLink"
          target="_blank"
        >{{ book.bookTitle }}</a>
      </div>
      <span>登録日:{{book.insertDate}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"],
  data() {
    return {};
  }
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