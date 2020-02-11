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
        <slide right noOverlay width="250" v-if="isBurgerShow">
          <router-link class="p-link" to="/bookRegistration"
            >書籍登録</router-link
          >
          <router-link class="p-link" to="/books">書籍一覧</router-link>
          <router-link v-if="!isLogined" class="p-link" to="/login"
            >ログイン</router-link
          >
          <router-link v-else class="p-link" to="/logout"
            >ログアウト</router-link
          >
        </slide>
        <div v-else>
          <router-link class="p-link" to="/bookRegistration"
            >書籍登録</router-link
          >
          <router-link class="p-link" to="/books">書籍一覧</router-link>
          <router-link v-if="!isLogined" class="p-link" to="/login"
            >ログイン</router-link
          >
          <router-link v-else class="p-link" to="/logout"
            >ログアウト</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import $ from 'jquery'
import { Slide } from 'vue-burger-menu'

export default {
  data () {
    return {
      currentUserName: '',
      isLogined: false,
      isBurgerShow: true
    }
  },
  components: {
    Slide
  },
  methods: {
    resizeHandler () {
      this.isBurgerShow = $(window).width() < 600
    }
  },
  created () {
    const self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        self.currentUserName = ''
        self.isLogined = false
      }
      self.currentUserName = user.displayName
      self.isLogined = true
    })
    this.isBurgerShow = $(window).width() < 600
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style>
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

.bm-menu {
  background-color: #007bff;
}

.bm-cross {
  background: white;
}

.bm-cross-button {
  right: 220px !important;
}

.bm-burger-button {
  top: 8px;
  right: 17px !important;
}

.bm-burger-bars {
  background-color: white;
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

@media screen and (max-width: 350px) {
  .p-userName {
    font-size: 0.8em;
  }
}
</style>
