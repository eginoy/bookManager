<template>
  <nav class="p-navbar">
    <div class="p-navbar-links">
      <div class="p-navbar-links-left">
        <router-link to="/">
          <v-fa class="p-bookIcon" icon="book" />
        </router-link>
        <span class="p-userName" v-if="currentUserName !== ''"
          >こんにちは、{{ currentUserName }}さん</span
        >
      </div>
      <div class="p-navbar-links-right">
        <router-link class="p-link" to="/bookRegistration"
          >書籍登録</router-link
        >
        <router-link class="p-link" to="/books">書籍一覧</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  data () {
    return {
      currentUserName: ''
    }
  },
  created () {
    const self = this
    firebase.auth().onAuthStateChanged(function (user) {
      self.currentUserName = user.displayName
    })
  }
}
</script>

<style scoped>
.p-navbar {
  background-color: #007bff;
  height: 3em;
  width: 100%;
}

.p-navbar-links {
  display: flex;
}

.p-navbar-links-left {
  margin-right: auto;
}

.p-userName {
  color: white;
  display: inline-block;
  position: relative;
  top: -25%;
}

.p-navbar-links-right {
  margin-left: auto;
}

.p-bookIcon {
  font-size: 2em;
  margin: 0.2em 0.5em;
  color: white;
}

.p-link {
  color: white;
  text-decoration: none;
  display: inline-block;
  margin: 0.7em 1em;
}
</style>
