<template>
  <div class="p-messageWrapper">
    <span class="p-message">お使いのアカウントには閲覧権限がありません。</span>
    <router-link to="/logout"
      ><button class="btn btn-primary">ログアウトする</button></router-link
    >
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null
    }
  }
}
</script>

<style scoped>
.p-messageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p-message {
  margin: 3em 0;
}
</style>
